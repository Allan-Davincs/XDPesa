import type { RequestItem, User } from "../types";
import StatusBadge from "../components/StatusBadge";

interface MyRequestsPageProps {
  currentUser: User;
  requests: RequestItem[];
}

export default function MyRequestsPage({ currentUser, requests }: MyRequestsPageProps) {
  const userRequests = requests.filter((item) => item.userId === currentUser.id);

  return (
    <main className="requests-page">
      <section className="page-header">
        <div>
          <span className="eyebrow">My requests</span>
          <h1>Review all funding requests</h1>
          <p>Track the status, amount, and creation date for every request you submitted.</p>
        </div>
      </section>

      <section className="table-card">
        {userRequests.length === 0 ? (
          <div className="empty-state">
            <h2>No requests found</h2>
            <p>You have not submitted any funding requests yet. Use the request form to send a new request.</p>
          </div>
        ) : (
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Amount</th>
                  <th>Purpose</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {userRequests.map((request) => (
                  <tr key={request.id}>
                    <td>USD {request.amount.toFixed(2)}</td>
                    <td>{request.purpose}</td>
                    <td>
                      <StatusBadge status={request.status} />
                    </td>
                    <td>{new Date(request.date).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}
