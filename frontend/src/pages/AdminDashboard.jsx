import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getComplaints, assignComplaint, approveComplaint, rejectComplaint } from '../api/complaints';
import StatusPill from '../components/StatusPill';
import PhotoCompare from '../components/PhotoCompare';

const urgencyColor = (type) => {
  if (type === 'HIGH') return 'var(--red)';
  if (type === 'MEDIUM') return 'var(--yellow)';
  return 'var(--green)';
};

const sentimentEmoji = (type) => {
  if (!type) return '😐';
  const norm = String(type).toUpperCase();
  if (norm.includes('POSITIVE')) return '😊';
  if (norm.includes('NEGATIVE')) return '😞';
  return '😐';
};

// Note: statusColors used in styles and complaint items
const statusColorMap = {
  submitted: '#2563EB',
  assigned: '#D97706',
  in_progress: '#9333EA',
  pending_approval: '#F97316',
  resolved: '#00875A',
  re_raised: '#DC2626',
};

export default function AdminDashboard() {
  const { token } = useAuth();
  const [complaints, setComplaints] = useState([]);
  const [tab, setTab] = useState('dashboard');
  const [assignModal, setAssignModal] = useState(null);
  const [selectedWorker, setSelectedWorker] = useState('');
  const [deadline, setDeadline] = useState('');
  const [error, setError] = useState('');
  const [workers] = useState([
    { id: 'W001', name: 'Ram Kumar' },
    { id: 'W002', name: 'Priya Singh' },
    { id: 'W003', name: 'Amit Patel' },
  ]);

  useEffect(() => {
    loadComplaints();
    const interval = setInterval(loadComplaints, 15000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const loadComplaints = async () => {
    try {
      const response = await getComplaints({}, token);
      const data = response?.data?.data || response?.data || [];
      const complaintsArray = Array.isArray(data) ? data : [];
      setComplaints(complaintsArray);
    } catch (err) {
      console.error('Failed to load complaints:', err);
      setComplaints([]);
    }
  };

  const handleAssign = async () => {
    if (!selectedWorker || !deadline) {
      setError('Select worker and deadline');
      return;
    }

    try {
      await assignComplaint(assignModal, { worker_id: selectedWorker, deadline }, token);
      setComplaints((prev) =>
        prev.map((c) =>
          c.id === assignModal || c._id === assignModal
            ? { ...c, status: 'assigned', assigned_to: selectedWorker, deadline }
            : c
        )
      );
      setAssignModal(null);
      setSelectedWorker('');
      setDeadline('');
      setError('');
    } catch (err) {
      setError(err?.response?.data?.detail || 'Failed to assign');
    }
  };

  const handleApprove = async (id) => {
    try {
      await approveComplaint(id, token);
      setComplaints((prev) =>
        prev.map((c) => (c.id === id || c._id === id ? { ...c, status: 'resolved' } : c))
      );
    } catch (err) {
      setError(err?.response?.data?.detail || 'Failed to approve');
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectComplaint(id, token);
      setComplaints((prev) =>
        prev.map((c) => (c.id === id || c._id === id ? { ...c, status: 're_raised' } : c))
      );
    } catch (err) {
      setError(err?.response?.data?.detail || 'Failed to reject');
    }
  };

  const complaintsList = Array.isArray(complaints) ? complaints : [];
  
  const stats = {
    pending: complaintsList.filter((c) => c.status === 'submitted').length,
    assigned: complaintsList.filter((c) => c.status === 'assigned').length,
    in_progress: complaintsList.filter((c) => c.status === 'in_progress').length,
    resolved: complaintsList.filter((c) => c.status === 'resolved').length,
  };

  const pendingApproval = complaintsList.filter((c) => c.status === 'pending_approval');

  return (
    <section className="admin-dashboard-section">
      <div className="admin-tabs">
        <button
          className={`admin-tab ${tab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setTab('dashboard')}
        >
          📊 Dashboard
        </button>
        <button
          className={`admin-tab ${tab === 'all' ? 'active' : ''}`}
          onClick={() => setTab('all')}
        >
          📋 All Complaints
        </button>
        <button
          className={`admin-tab ${tab === 'photos' ? 'active' : ''}`}
          onClick={() => setTab('photos')}
        >
          📸 Photo Review
        </button>
      </div>

      <div className="admin-content">
        {tab === 'dashboard' && (
          <>
            <h2>Admin Dashboard</h2>
            
            {/* Stats Row */}
            <div className="stats-grid">
              <div className="stat-card" style={{ borderTop: `4px solid var(--red)` }}>
                <h4>Pending</h4>
                <p className="stat-number">{stats.pending}</p>
              </div>
              <div className="stat-card" style={{ borderTop: `4px solid var(--yellow)` }}>
                <h4>Assigned</h4>
                <p className="stat-number">{stats.assigned}</p>
              </div>
              <div className="stat-card" style={{ borderTop: `4px solid #9333EA` }}>
                <h4>In Progress</h4>
                <p className="stat-number">{stats.in_progress}</p>
              </div>
              <div className="stat-card" style={{ borderTop: `4px solid var(--green)` }}>
                <h4>Resolved</h4>
                <p className="stat-number">{stats.resolved}</p>
              </div>
            </div>
          </>
        )}

        {tab === 'all' && (
          <>
            <h2>All Complaints</h2>
            {error && <p className="error-text">{error}</p>}
            
            <div className="table-wrapper card">
              <table className="complaints-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Citizen</th>
                    <th>Category</th>
                    <th>Urgency</th>
                    <th>Sentiment</th>
                    <th>Photo</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {complaintsList.map((complaint) => {
                    const cId = complaint.id || complaint._id;
                    const isHighUrgency = complaint.urgency === 'HIGH';
                    return (
                      <tr key={cId} style={isHighUrgency ? { borderLeft: '4px solid ' + statusColorMap.re_raised } : {}}>
                        <td>{cId}</td>
                        <td>{complaint.citizen_name || 'User'}</td>
                        <td>
                          <span className="category-chip">{complaint.category}</span>
                        </td>
                        <td>
                          <span
                            className="badge"
                            style={{ backgroundColor: urgencyColor(complaint.urgency) }}
                          >
                            {complaint.urgency || 'N/A'}
                          </span>
                        </td>
                        <td className="sentiment-emoji">{sentimentEmoji(complaint.sentiment)}</td>
                        <td>
                          {complaint.before_photo ? (
                            <img
                              src={complaint.before_photo}
                              alt="Complaint"
                              className="photo-thumbnail"
                            />
                          ) : (
                            <span className="muted-text">—</span>
                          )}
                        </td>
                        <td>
                          <StatusPill status={complaint.status} />
                        </td>
                        <td>
                          {complaint.status === 'submitted' && (
                            <button
                              className="btn btn-small"
                              onClick={() => setAssignModal(cId)}
                            >
                              Assign
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}

        {tab === 'photos' && (
          <>
            <h2>Photo Review</h2>
            {pendingApproval.length === 0 ? (
              <p className="muted-text">No complaints pending photo approval.</p>
            ) : (
              <div className="photo-review-grid">
                {pendingApproval.map((complaint) => {
                  const cId = complaint.id || complaint._id;
                  return (
                    <div key={cId} className="card photo-review-item">
                      <h4>{complaint.category}</h4>
                      <p className="tiny-text">ID: {cId}</p>
                      
                      <PhotoCompare
                        beforeUrl={complaint.before_photo || 'https://via.placeholder.com/300'}
                        afterUrl={complaint.after_photo || 'https://via.placeholder.com/300'}
                      />
                      
                      {complaint.worker_notes && (
                        <div className="worker-notes">
                          <strong>Worker Notes:</strong>
                          <p>{complaint.worker_notes}</p>
                        </div>
                      )}

                      <div className="button-group">
                        <button
                          className="btn btn-success"
                          onClick={() => handleApprove(cId)}
                        >
                          ✓ Approve
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleReject(cId)}
                        >
                          ✕ Reject
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>

      {/* Assign Modal */}
      {assignModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Assign Complaint</h3>
            <div className="form-grid">
              <label htmlFor="worker">Select Worker</label>
              <select
                id="worker"
                value={selectedWorker}
                onChange={(e) => setSelectedWorker(e.target.value)}
              >
                <option value="">Choose worker...</option>
                {workers.map((w) => (
                  <option key={w.id} value={w.id}>
                    {w.name}
                  </option>
                ))}
              </select>

              <label htmlFor="deadline">Deadline</label>
              <input
                id="deadline"
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
              />

              {error && <p className="error-text">{error}</p>}

              <div className="button-group">
                <button className="btn btn-primary" onClick={handleAssign}>
                  Assign
                </button>
                <button
                  className="btn btn-outline"
                  onClick={() => {
                    setAssignModal(null);
                    setSelectedWorker('');
                    setDeadline('');
                    setError('');
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
