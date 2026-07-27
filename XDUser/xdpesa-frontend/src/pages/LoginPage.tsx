import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, LogIn } from "lucide-react";
import type { User } from "../types";

interface LoginPageProps {
  onLogin: (email: string, password: string, remember: boolean) => Promise<{
    success: boolean;
    message: string;
    user?: User;
  }>;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email.trim() || !password) {
      setError("Enter both email and password.");
      return;
    }

    const result = await onLogin(email, password, remember);

    if (!result.success) {
      setError(result.message);
      return;
    }

    setError(null);
    navigate(result.user?.role === "ADMIN" ? "/admin" : "/dashboard");
  };

  return (
    <main className="auth-page">
      <section className="auth-card auth-card-sm">
        <div className="auth-intro">
          <span className="eyebrow">Welcome back</span>
          <h1>Login to XDPesa</h1>
          <p>Access your dashboard, request funds, and review approvals securely.</p>
        </div>

        <form className="form-grid" onSubmit={handleSubmit}>
          <label className="form-field">
            <span>Email</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="jane@example.com"
              required
            />
          </label>

          <label className="form-field password-field">
            <span>Password</span>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter your password"
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

          <label className="checkbox-field">
            <input
              type="checkbox"
              checked={remember}
              onChange={(event) => setRemember(event.target.checked)}
            />
            <span>Remember me</span>
          </label>

          {error ? <div className="form-feedback feedback-error">{error}</div> : null}

          <button className="button button-primary" type="submit">
            <LogIn size={18} />
            <span>Sign in</span>
          </button>

          <p className="auth-footer">
            New to XDPesa? <Link to="/register">Create an account</Link>
          </p>
        </form>
      </section>
    </main>
  );
}
