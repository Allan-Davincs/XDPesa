import { Link } from "react-router-dom";
import type { User } from "../types";

interface LandingPageProps {
  currentUser: User | null;
}

export default function LandingPage({ currentUser }: LandingPageProps) {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <div className="hero-copy">
          <span className="eyebrow">Fintech you can trust</span>
          <h1>Move money faster with secure digital finance.</h1>
          <p>
            XDPesa makes requesting funds, tracking payments, and managing approvals simple with a
            modern dashboard built for everyday users and trusted administrators.
          </p>
          <div className="hero-actions">
            {currentUser ? (
              <Link className="button button-primary" to={currentUser.role === "ADMIN" ? "/admin" : "/dashboard"}>
                Go to dashboard
              </Link>
            ) : (
              <>
                <Link className="button button-primary" to="/register">
                  Register now
                </Link>
                <Link className="button button-secondary" to="/login">
                  Login
                </Link>
              </>
            )}
          </div>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="hero-card">
            <div className="hero-card-header">
              <div>
                <h3>Secure digital banking</h3>
                <p>Trusted transfers, instant approvals, and transparent status tracking.</p>
              </div>
            </div>
            <div className="hero-metrics">
              <div>
                <strong>98%</strong>
                <span>Approval confidence</span>
              </div>
              <div>
                <strong>24/7</strong>
                <span>Real-time support</span>
              </div>
            </div>
          </div>
          <div className="hero-illustration">
            <svg viewBox="0 0 640 420" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="heroTitle heroDesc">
              <title id="heroTitle">Digital banking illustration</title>
              <desc id="heroDesc">Abstract illustration of smartphone payment and secure data.</desc>
              <rect x="20" y="40" width="260" height="340" rx="35" fill="#e0f2fe" />
              <rect x="40" y="64" width="220" height="48" rx="16" fill="#ffffff" />
              <rect x="46" y="140" width="188" height="26" rx="12" fill="#bae6fd" />
              <rect x="46" y="182" width="146" height="26" rx="12" fill="#7dd3fc" />
              <rect x="46" y="224" width="126" height="26" rx="12" fill="#38bdf8" />
              <rect x="46" y="266" width="172" height="26" rx="12" fill="#0ea5e9" />
              <circle cx="470" cy="180" r="84" fill="#eff6ff" />
              <path d="M430 160h60a14 14 0 0114 14v58a14 14 0 01-14 14h-60a14 14 0 01-14-14v-58a14 14 0 0114-14z" fill="#2563eb" />
              <path d="M446 184h28v10h-28zM446 204h52v10h-52zM446 224h40v10h-40z" fill="#dbeafe" />
              <circle cx="522" cy="90" r="32" fill="#10b981" opacity="0.25" />
            </svg>
          </div>
        </div>
      </div>

      <section id="features" className="feature-strip">
        <div className="feature-card">
          <strong>Request Funds Easily</strong>
          <p>Submit fund requests with just a few clicks and monitor approval status in real time.</p>
        </div>
        <div className="feature-card">
          <strong>Secure Digital Payments</strong>
          <p>Encrypted payment workflows and user-first controls keep every transaction safe.</p>
        </div>
        <div className="feature-card">
          <strong>Actionable Insights</strong>
          <p>Track outstanding requests and approval trends in a modern dashboard experience.</p>
        </div>
      </section>

      <section id="benefits" className="benefits-section">
        <div className="section-header">
          <span className="eyebrow">Build trust in every transfer</span>
          <h2>Designed for fast-growing teams and modern mobile users.</h2>
        </div>
        <div className="benefits-grid">
          <article className="benefit-card">
            <h3>Instant approvals</h3>
            <p>Review requests quickly and approve or reject with a single tap.</p>
          </article>
          <article className="benefit-card">
            <h3>Clear request history</h3>
            <p>View every submission with status updates, dates, and request details.</p>
          </article>
          <article className="benefit-card">
            <h3>Friendly dashboards</h3>
            <p>Simple, responsive panels help users and admins make decisions faster.</p>
          </article>
        </div>
      </section>
    </section>
  );
}
