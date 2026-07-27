import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, ShieldCheck } from "lucide-react";
import type { AuthFormData, User } from "../types";

interface RegisterPageProps {
  onRegister: (data: AuthFormData) => Promise<{ success: boolean; message: string; user?: User }>;
}

export default function RegisterPage({ onRegister }: RegisterPageProps) {
  const [form, setForm] = useState<AuthFormData>({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const navigate = useNavigate();

  const handleChange = (field: keyof AuthFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.fullName.trim() || !form.email.trim() || !form.phoneNumber.trim() || !form.password || !form.confirmPassword) {
      setStatus("error");
      setFeedback("Please complete all fields before you continue.");
      return;
    }

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email)) {
      setStatus("error");
      setFeedback("Enter a valid email address.");
      return;
    }

    if (form.password.length < 8) {
      setStatus("error");
      setFeedback("Password must be at least 8 characters.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setStatus("error");
      setFeedback("Passwords do not match.");
      return;
    }

    const result = await onRegister(form);
    if (!result.success) {
      setStatus("error");
      setFeedback(result.message);
      return;
    }

    setStatus("success");
    setFeedback("Registration successful! Redirecting to your dashboard...");
    setTimeout(() => {
      if (result.user?.role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    }, 500);
  };

  return (
    <main className="auth-page">
      <section className="auth-card">
        <div className="auth-intro">
          <span className="eyebrow">Create your account</span>
          <h1>Register with XDPesa</h1>
          <p>Start requesting funds and tracking approvals in a secure digital workspace.</p>
        </div>

        <form className="form-grid" onSubmit={handleSubmit}>
          <label className="form-field">
            <span>Full Name</span>
            <input
              type="text"
              value={form.fullName}
              onChange={(event) => handleChange("fullName", event.target.value)}
              placeholder="Jane Doe"
              required
            />
          </label>

          <label className="form-field">
            <span>Email</span>
            <input
              type="email"
              value={form.email}
              onChange={(event) => handleChange("email", event.target.value)}
              placeholder="jane@example.com"
              required
            />
          </label>

          <label className="form-field">
            <span>Phone Number</span>
            <input
              type="tel"
              value={form.phoneNumber}
              onChange={(event) => handleChange("phoneNumber", event.target.value)}
              placeholder="07XXXXXXXX"
              required
            />
          </label>

          <label className="form-field password-field">
            <span>Password</span>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={(event) => handleChange("password", event.target.value)}
                placeholder="Create a password"
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword((current) => !current)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </label>

          <label className="form-field password-field">
            <span>Confirm Password</span>
            <div className="password-input-wrapper">
              <input
                type={showConfirm ? "text" : "password"}
                value={form.confirmPassword}
                onChange={(event) => handleChange("confirmPassword", event.target.value)}
                placeholder="Repeat your password"
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowConfirm((current) => !current)}
                aria-label={showConfirm ? "Hide password" : "Show password"}
              >
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </label>

          {feedback ? (
            <div className={`form-feedback ${status === "success" ? "feedback-success" : "feedback-error"}`}>
              <ShieldCheck size={18} />
              <span>{feedback}</span>
            </div>
          ) : null}

          <button className="button button-primary" type="submit">
            Create account
          </button>

          <p className="auth-footer">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </section>
    </main>
  );
}
