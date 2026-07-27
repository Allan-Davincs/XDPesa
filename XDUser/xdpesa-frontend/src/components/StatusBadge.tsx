interface StatusBadgeProps {
  status: "PENDING" | "APPROVED" | "REJECTED";
}

const statusMap = {
  PENDING: { label: "Pending", className: "badge badge-pending" },
  APPROVED: { label: "Approved", className: "badge badge-approved" },
  REJECTED: { label: "Rejected", className: "badge badge-rejected" },
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const { label, className } = statusMap[status];

  return <span className={className}>{label}</span>;
}
