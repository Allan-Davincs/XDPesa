import { Link } from "react-router-dom";
import { Users, ClipboardList, Clock3, CheckCircle2, XCircle } from "lucide-react";
import type { RequestItem, User } from "../types";

interface AdminDashboardPageProps {
  currentUser: User;
  requests: RequestItem[];
  totalUsers: number;
}

export default function AdminDashboardPage({ currentUser, requests, totalUsers }: AdminDashboardPageProps) {
  const totalRequests = requests.length;
  const pending = requests.filter((item) => item.status === "PENDING").length;
  const approved = requests.filter((item) => item.status === "APPROVED").length;
  const rejected = requests.filter((item) => item.status === "REJECTED").length;
  const recent = requests.slice(0, 4);

  return (
    <main className="admin-page">
      <aside className="admin-sidebar">
        <div className="brand-panel">
          <span>XDPesa Admin</span>
        </div>
        <nav className="admin-nav">
          <Link to="/admin" className="admin-link">
            Dashboard
          </Link>
          <Link to="/admin/requests" className="admin-link">
            Fund requests
          </Link>
        </nav>
      </aside>

      <section className="admin-main">
        <div className="admin-topbar">
          <div>
            <span className="eyebrow">Admin dashboard</span>
            <h1>Welcome back, {currentUser.fullName}</h1>
          </div>
          <p className="admin-subtitle">Manage users, review fund requests, and keep the platform flowing.</p>
        </div>

        <section className="summary-grid">
          <article className="stat-card stat-blue">
            <div className="stat-icon">
              <Users size={20} />
            </div>
            <div>
              <h3>{totalUsers}</h3>
              <p>Total users</p>
            </div>
          </article>
          <article className="stat-card stat-purple">
            <div className="stat-icon">
              <ClipboardList size={20} />
            </div>
            <div>
              <h3>{totalRequests}</h3>
              <p>Total requests</p>
            </div>
          </article>
          <article className="stat-card stat-yellow">
            <div className="stat-icon">
              <Clock3 size={20} />
            </div>
            <div>
              <h3>{pending}</h3>
              <p>Pending requests</p>
            </div>
          </article>
          <article className="stat-card stat-green">
            <div className="stat-icon">
              <CheckCircle2 size={20} />
            </div>
            <div>
              <h3>{approved}</h3>
              <p>Approved requests</p>
            </div>
          </article>
          <article className="stat-card stat-red">
            <div className="stat-icon">
              <XCircle size={20} />
            </div>
            <div>
              <h3>{rejected}</h3>
              <p>Rejected requests</p>
            </div>
          </article>
        </section>

        <section className="recent-activity-card">
          <div className="card-header">
            <div>
              <span className="eyebrow">Recent activity</span>
              <h2>Latest fund requests</h2>
            </div>
            <Link to="/admin/requests" className="button button-secondary">
              View all
            </Link>
          </div>

          {recent.length === 0 ? (
            <div className="empty-state">
              <h3>No recent requests</h3>
              <p>Requests will appear here once users begin submitting them.</p>
            </div>
          ) : (
            <div className="table-scroll">
              <table>
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Purpose</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recent.map((request) => (
                    <tr key={request.id}>
                      <td>{request.userName}</td>
                      <td>{request.purpose}</td>
                      <td>USD {request.amount.toFixed(2)}</td>
                      <td>{request.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </section>
    </main>
  );
}
