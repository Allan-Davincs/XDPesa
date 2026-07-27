import { useState } from "react";
import { CheckCircle, Loader2 } from "lucide-react";
import type { RequestItem, User } from "../types";

interface RequestFundsPageProps {
  currentUser: User;
  onCreateRequest: (request: Omit<RequestItem, "id" | "date" | "status">) => void;
}

export default function RequestFundsPage({ currentUser, onCreateRequest }: RequestFundsPageProps) {
  const [amount, setAmount] = useState(0);
  const [purpose, setPurpose] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFeedback(null);
    setSuccess(false);

    if (!amount || amount <= 0 || !purpose.trim() || !description.trim()) {
      setFeedback("Please provide a valid amount, purpose, and description.");
      return;
    }

    setLoading(true);
    await new Promise((resolve) => window.setTimeout(resolve, 600));
    onCreateRequest({
      userId: currentUser.id,
      userName: currentUser.fullName,
      userEmail: currentUser.email,
      amount,
      purpose,
      description,
    });
    setLoading(false);
    setSuccess(true);
    setAmount(0);
    setPurpose("");
    setDescription("");
    setFeedback("Your request was submitted successfully and is now pending review.");
  };

  return (
    <main className="request-page">
      <section className="request-card">
        <div className="section-header">
          <span className="eyebrow">Request funds</span>
          <h1>Submit a new funding request</h1>
          <p>Complete the form below to send a request with clear purpose and details.</p>
        </div>

        <form className="request-form" onSubmit={handleSubmit}>
          <label>
            <span>Amount</span>
            <input
              type="number"
              value={amount || ""}
              onChange={(event) => setAmount(Number(event.target.value))}
              placeholder="Enter amount"
              min={1}
              required
            />
          </label>

          <label>
            <span>Purpose</span>
            <input
              type="text"
              value={purpose}
              onChange={(event) => setPurpose(event.target.value)}
              placeholder="Business, medical, or emergency"
              required
            />
          </label>

          <label>
            <span>Description</span>
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Describe how you will use the requested funds"
              rows={4}
              required
            />
          </label>

          {feedback ? (
            <div className={`form-feedback ${success ? "feedback-success" : "feedback-error"}`}>
              {success ? <CheckCircle size={18} /> : <Loader2 size={18} />}
              <span>{feedback}</span>
            </div>
          ) : null}

          <button className="button button-primary" type="submit" disabled={loading}>
            {loading ? (
              <>
                <Loader2 size={18} className="spin" /> Sending...
              </>
            ) : (
              "Submit request"
            )}
          </button>
        </form>
      </section>
    </main>
  );
}
