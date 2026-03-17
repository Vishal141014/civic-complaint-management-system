const StatusBadge = ({ status }) => {
  const statusConfig = {
    submitted: { label: 'Submitted', color: 'bg-blue-500 text-white', textColor: 'text-blue-600' },
    assigned: { label: 'Assigned', color: 'bg-yellow-500 text-white', textColor: 'text-yellow-600' },
    in_progress: { label: 'In Progress', color: 'bg-purple-500 text-white', textColor: 'text-purple-600' },
    pending_approval: { label: 'Pending Approval', color: 'bg-orange-500 text-white', textColor: 'text-orange-600' },
    resolved: { label: 'Resolved', color: 'bg-green-500 text-white', textColor: 'text-green-600' },
    re_raised: { label: 'Re-raised', color: 'bg-red-500 text-white', textColor: 'text-red-600' },
  };

  const config = statusConfig[status] || { label: status, color: 'bg-gray-500 text-white', textColor: 'text-gray-600' };

  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${config.color}`}>
      {config.label}
    </span>
  );
};

export default StatusBadge;
