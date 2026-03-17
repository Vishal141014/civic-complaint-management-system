import StatusPill from './StatusPill';

export default function ComplaintCard({ complaint }) {
  return (
    <article className="card complaint-card">
      <div className="card-row">
        <h4>{complaint?.title || 'Complaint'}</h4>
        <StatusPill status={complaint?.status} />
      </div>
      <p className="muted-text">{complaint?.description || 'No description provided.'}</p>
      <p className="tiny-text">ID: {complaint?.id || complaint?._id || 'N/A'}</p>
    </article>
  );
}
