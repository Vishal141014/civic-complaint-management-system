import { useEffect, useMemo, useState } from 'react';
import { Pie, PieChart, ResponsiveContainer, Tooltip, Cell } from 'recharts';
import { useAuth } from '../context/AuthContext';
import { submitComplaint, getComplaints, reraiseComplaint, uploadPhoto } from '../api/complaints';
import StatusPill from '../components/StatusPill';

const DELHI_WARDS = [
  'Ward 1', 'Ward 2', 'Ward 3', 'Ward 4', 'Ward 5', 'Ward 6', 'Ward 7', 'Ward 8', 'Ward 9', 'Ward 10',
];

const CATEGORIES = ['Water', 'Roads', 'Electricity', 'Health', 'Other'];

const urgencyColor = (type) => {
  if (type === 'HIGH') return 'var(--red)';
  if (type === 'MEDIUM') return 'var(--yellow)';
  return 'var(--green)';
};

const sentimentEmoji = (type) => {
  if (!type) return '😐';
  const normalized = String(type).toUpperCase();
  if (normalized.includes('POSITIVE')) return '😊';
  if (normalized.includes('NEGATIVE')) return '😞';
  return '😐';
};

const statusColors = {
  submitted: '#2563EB',
  assigned: '#D97706',
  in_progress: '#9333EA',
  pending_approval: '#F97316',
  resolved: '#00875A',
  re_raised: '#DC2626',
};

export default function CitizenDashboard() {
  const { token } = useAuth();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    area: '',
    category: '',
    text: '',
    photos: [],
  });
  const [previewUrls, setPreviewUrls] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [showReraise, setShowReraise] = useState(null);
  const [reraiseReason, setReraiseReason] = useState('');
  const [reraisePhoto, setReraisePhoto] = useState(null);

  useEffect(() => {
    loadComplaints();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const loadComplaints = async () => {
    try {
      setLoading(true);
      const response = await getComplaints({}, token);
      const data = response?.data?.data || response?.data || [];
      const complaintsArray = Array.isArray(data) ? data : [];
      setComplaints(complaintsArray);
    } catch (err) {
      console.error('Failed to load complaints:', err);
      setComplaints([]);
    } finally {
      setLoading(false);
    }
  };

  const handlePhotoChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (formData.photos.length + files.length > 3) {
      setError('Maximum 3 photos allowed');
      return;
    }

    setFormData((prev) => ({
      ...prev,
      photos: [...prev.photos, ...files],
    }));

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewUrls((prev) => [...prev, event.target.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removePhoto = (index) => {
    setFormData((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index),
    }));
    setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmitComplaint = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.area || !formData.category || !formData.text) {
      setError('All fields are required');
      return;
    }

    setSubmitting(true);

    try {
      const photoUrls = [];

      for (const photo of formData.photos) {
        const uploadRes = await uploadPhoto(photo, 'before', token);
        const url = uploadRes.data?.file_path || uploadRes.data?.url || '';
        if (url) photoUrls.push(url);
      }

      const complaintRes = await submitComplaint(
        {
          area: formData.area,
          category: formData.category,
          text: formData.text,
          photos: photoUrls,
        },
        token
      );

      const newComplaint = complaintRes.data?.data || complaintRes.data || {};
      setComplaints((prev) => [newComplaint, ...prev]);
      setFormData({ area: '', category: '', text: '', photos: [] });
      setPreviewUrls([]);
      setError('');
    } catch (err) {
      setError(err?.response?.data?.detail || 'Failed to submit complaint');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSatisfied = (complaintId) => {
    setComplaints((prev) =>
      prev.map((c) =>
        c.id === complaintId || c._id === complaintId ? { ...c, status: 'resolved', satisfaction: 'yes' } : c
      )
    );
  };

  const handleNotSatisfied = (complaintId) => {
    setShowReraise(complaintId);
  };

  const handleReraise = async () => {
    if (!reraiseReason.trim()) {
      setError('Please provide a reason');
      return;
    }

    setError('');
    setSubmitting(true);

    try {
      await reraiseComplaint(showReraise, { reason: reraiseReason, photo: reraisePhoto }, token);
      setComplaints((prev) =>
        prev.map((c) =>
          c.id === showReraise || c._id === showReraise
            ? { ...c, status: 're_raised', reason: reraiseReason }
            : c
        )
      );
      setShowReraise(null);
      setReraiseReason('');
      setReraisePhoto(null);
    } catch (err) {
      setError(err?.response?.data?.detail || 'Failed to reraise complaint');
    } finally {
      setSubmitting(false);
    }
  };

  const complaintsList = Array.isArray(complaints) ? complaints : [];

  const pieData = useMemo(() => {
    const counter = complaintsList.reduce((acc, item) => {
      const status = item.status || 'submitted';
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(counter).map(([name, value]) => ({ name, value }));
  }, [complaintsList]);

  return (
    <section className="citizen-dashboard">
      <h2>Citizen Dashboard</h2>

      {/* Submission Form */}
      <div className="card form-card">
        <h3>Submit a Complaint</h3>
        <form onSubmit={handleSubmitComplaint} className="complaint-form">
          <div className="form-grid">
            <div>
              <label htmlFor="area">Area (Delhi Ward)</label>
              <select
                id="area"
                value={formData.area}
                onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                required
              >
                <option value="">Select Ward...</option>
                {DELHI_WARDS.map((ward) => (
                  <option key={ward} value={ward}>
                    {ward}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="category">Category</label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
              >
                <option value="">Select Category...</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="full-width">
              <label htmlFor="text">Complaint Description</label>
              <textarea
                id="text"
                value={formData.text}
                onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                placeholder="Describe the issue in detail (Hindi/English/Hinglish ok)..."
                rows="5"
                required
              />
            </div>

            <div className="full-width">
              <label>Upload Photos (max 3)</label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handlePhotoChange}
                disabled={formData.photos.length >= 3}
              />
              {formData.photos.length > 0 && (
                <div className="photo-preview-grid">
                  {previewUrls.map((url, idx) => (
                    <div key={idx} className="photo-preview">
                      <img src={url} alt={`Preview ${idx}`} />
                      <button
                        type="button"
                        onClick={() => removePhoto(idx)}
                        className="remove-photo-btn"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {error && <p className="error-text full-width">{error}</p>}

            <button type="submit" className="btn btn-primary full-width" disabled={submitting}>
              {submitting ? 'Submitting...' : 'Submit Complaint'}
            </button>
          </div>
        </form>
      </div>

      {/* Stats */}
      {complaintsList.length > 0 && (
        <div className="card chart-card">
          <h3>Your Complaint Status Overview</h3>
          <div className="chart-wrap">
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={80} label>
                  {pieData.map((item, idx) => (
                    <Cell key={item.name} fill={statusColors[item.name] || '#999'} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* My Complaints */}
      <div>
        <h3>My Complaints</h3>
        {loading ? (
          <p className="muted-text">Loading complaints...</p>
        ) : complaintsList.length === 0 ? (
          <p className="muted-text">No complaints yet. Submit one above!</p>
        ) : (
          <div className="complaints-list">
            {complaintsList.map((complaint) => {
              const cId = complaint.id || complaint._id;
              const isResolved = complaint.status === 'resolved';
              const isReraise = showReraise === cId;

              return (
                <div
                  key={cId}
                  className="card complaint-item"
                  style={{ borderLeft: `4px solid ${statusColors[complaint.status] || '#999'}` }}
                >
                  <div className="complaint-header">
                    <div>
                      <h4>{complaint.title || complaint.category}</h4>
                      <p className="tiny-text">ID: {cId}</p>
                    </div>
                    <div className="complaint-badges">
                      {complaint.urgency && (
                        <span className="badge" style={{ backgroundColor: urgencyColor(complaint.urgency) }}>
                          {complaint.urgency}
                        </span>
                      )}
                      {complaint.sentiment && <span className="badge-emoji">{sentimentEmoji(complaint.sentiment)}</span>}
                      <StatusPill status={complaint.status} />
                    </div>
                  </div>

                  <p>{complaint.text || complaint.description}</p>
                  <p className="tiny-text">{new Date(complaint.created_at || complaint.createdAt).toLocaleDateString()}</p>

                  {isResolved && complaint.satisfaction !== 'yes' && (
                    <div className="satisfaction-buttons">
                      <button
                        type="button"
                        className="btn btn-success"
                        onClick={() => handleSatisfied(cId)}
                      >
                        Satisfied ✓
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => handleNotSatisfied(cId)}
                      >
                        Not Satisfied ✕
                      </button>
                    </div>
                  )}

                  {isReraise && (
                    <div className="reraise-form">
                      <label>Why are you not satisfied?</label>
                      <textarea
                        value={reraiseReason}
                        onChange={(e) => setReraiseReason(e.target.value)}
                        placeholder="Explain the issue..."
                        rows="3"
                      />
                      <label>Add evidence photo (optional)</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setReraisePhoto(e.target.files?.[0] || null)}
                      />
                      <div className="button-group">
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={handleReraise}
                          disabled={submitting}
                        >
                          {submitting ? 'Reraising...' : 'Reraise'}
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline"
                          onClick={() => {
                            setShowReraise(null);
                            setReraiseReason('');
                            setReraisePhoto(null);
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
