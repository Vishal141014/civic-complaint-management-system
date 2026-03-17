const classByStatus = {
  submitted: 'status-submitted',
  assigned: 'status-assigned',
  approved: 'status-approved',
  rejected: 'status-rejected',
  reraise: 'status-reraise',
  'in-progress': 'status-assigned',
  resolved: 'status-approved',
};

export default function StatusPill({ status }) {
  const normalized = (status || 'submitted').toString().toLowerCase();
  const className = classByStatus[normalized] || 'status-submitted';

  return <span className={`status-pill ${className}`}>{status || 'Submitted'}</span>;
}
