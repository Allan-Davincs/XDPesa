import { Link } from "react-router-dom";
import { ArrowRight, CreditCard, ShieldCheck, TrendingUp } from "lucide-react";
import type { RequestItem, User } from "../types";

interface DashboardPageProps {
  currentUser: User;
  requests: RequestItem[];
  onLogout: () => void;
}

export default function DashboardPage({ currentUser, requests, onLogout }: DashboardPageProps) {
  const userRequests = requests.filter((item) => item.userId === currentUser.id);
  const total = userRequests.length;
  const pending = userRequests.filter((item) => item.status === "PENDING").length;
  const approved = userRequests.filter((item) => item.status === "APPROVED").length;
  const rejected = userRequests.filter((item) => item.status === "REJECTED").length;

  return (
    <main className="dashboard-page">
      <section className="dashboard-hero">
        <div>
          <span className="eyebrow">Welcome back</span>
          <h1>Hi, {currentUser.fullName}</h1>
          <p>Manage your requests, track approvals, and stay on top of your digital wallet.</p>
          <div className="hero-actions">
            <Link className="button button-primary" to="/request-funds">
              Request Funds
            </Link>
            <Link className="button button-secondary" to="/my-requests">
              View My Requests
            </Link>
          </div>
        </div>
        <button className="button button-ghost" type="button" onClick={onLogout}>
          Logout
        </button>
      </section>

      <section className="summary-grid">
        <article className="stat-card stat-blue">
          <div className="stat-icon">
            <CreditCard size={24} />
          </div>
          <div>
            <h3>{total}</h3>
            <p>Total requests</p>
          </div>
        </article>
        <article className="stat-card stat-yellow">
          <div className="stat-icon">
            <TrendingUp size={24} />
          </div>
          <div>
            <h3>{pending}</h3>
            <p>Pending requests</p>
          </div>
        </article>
        <article className="stat-card stat-green">
          <div className="stat-icon">
            <ShieldCheck size={24} />
          </div>
          <div>
            <h3>{approved}</h3>
            <p>Approved requests</p>
          </div>
        </article>
        <article className="stat-card stat-red">
          <div className="stat-icon">
            <ArrowRight size={24} />
          </div>
          <div>
            <h3>{rejected}</h3>
            <p>Rejected requests</p>
          </div>
        </article>
      </section>

      <section className="profile-card">
        <div>
          <h2>Your profile</h2>
          <p>Full Name</p>
          <strong>{currentUser.fullName}</strong>
          <p>Email</p>
          <strong>{currentUser.email}</strong>
          <p>Phone</p>
          <strong>{currentUser.phoneNumber}</strong>
        </div>
      </section>
    </main>
  );
}
