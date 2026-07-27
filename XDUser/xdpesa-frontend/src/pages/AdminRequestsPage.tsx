import type { RequestItem } from "../types";
import StatusBadge from "../components/StatusBadge";

interface AdminRequestsPageProps {
  requests: RequestItem[];
  onUpdateStatus: (id: string, status: RequestItem["status"]) => void;
}

export default function AdminRequestsPage({ requests, onUpdateStatus }: AdminRequestsPageProps) {
  return (
    <main className="admin-requests-page">
      <section className="page-header">
        <div>
          <span className="eyebrow">Admin fund requests</span>
          <h1>Review and manage requests</h1>
          <p>Approve or reject requests with a single action and keep the platform moving.</p>
        </div>
      </section>

      <section className="table-card">
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Amount</th>
                <th>Purpose</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request) => (
                <tr key={request.id}>
                  <td>{request.userName}</td>
                  <td>{request.userEmail}</td>
                  <td>USD {request.amount.toFixed(2)}</td>
                  <td>{request.purpose}</td>
                  <td>{new Date(request.date).toLocaleDateString()}</td>
                  <td>
                    <StatusBadge status={request.status} />
                  </td>
                  <td className="action-buttons">
                    <button
                      type="button"
                      className="button button-small button-approve"
                      onClick={() => onUpdateStatus(request.id, "APPROVED")}
                    >
                      Approve
                    </button>
                    <button
                      type="button"
                      className="button button-small button-reject"
                      onClick={() => onUpdateStatus(request.id, "REJECTED")}
                    >
                      Reject
                    </button>
                    <button
                      type="button"
                      className="button button-small button-secondary"
                      onClick={() =>
                        window.alert(
                          `Request details:\n\nUser: ${request.userName}\nEmail: ${request.userEmail}\nAmount: USD ${request.amount.toFixed(2)}\nPurpose: ${request.purpose}\nDescription: ${request.description}\nStatus: ${request.status}`,
                        )
                      }
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
