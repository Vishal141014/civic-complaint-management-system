import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getComplaints, uploadPhoto } from '../api/complaints';

export default function WorkerDashboard() {
  const { user, token } = useAuth();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadingId, setUploadingId] = useState(null);
  const [uploadPreview, setUploadPreview] = useState(null);
  const [completedTasks, setCompletedTasks] = useState({});

  const loadComplaints = async () => {
    try {
      setLoading(true);
      const response = await getComplaints({ status: 'assigned,in_progress' }, token);
      const data = response?.data?.data || response?.data || [];
      const complaintsList = Array.isArray(data) ? data : [];
      setComplaints(complaintsList);
    } catch (err) {
      console.error('Failed to load complaints:', err);
      setComplaints([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadComplaints();
    const interval = setInterval(loadComplaints, 15000);
    return () => clearInterval(interval);
  }, [token]);

  const handlePhotoUpload = async (complaintId, file) => {
    if (!file) return;
    try {
      setUploadingId(complaintId);
      const response = await uploadPhoto(file, 'after', token);
      if (response.status === 201 || response.status === 200) {
        setUploadPreview({ id: complaintId, url: URL.createObjectURL(file) });
      }
    } catch (err) {
      console.error('Failed to upload photo:', err);
      alert('Photo upload failed');
    } finally {
      setUploadingId(null);
    }
  };

  const handleMarkDone = (complaintId) => {
    setCompletedTasks({ ...completedTasks, [complaintId]: true });
  };

  const complaintsList = Array.isArray(complaints) ? complaints : [];

  // Sort by urgency: HIGH > MEDIUM > LOW
  const urgencyOrder = { HIGH: 0, MEDIUM: 1, LOW: 2 };
  const sortedComplaints = [...complaintsList].sort(
    (a, b) => (urgencyOrder[a.urgency] || 2) - (urgencyOrder[b.urgency] || 2)
  );

  // Stats
  const assigned = complaintsList.filter((c) => c.status === 'assigned').length;
  const inProgress = complaintsList.filter((c) => c.status === 'in_progress').length;
  const doneThisWeek = Object.keys(completedTasks).length;

  // Urgency colors for left border
  const getUrgencyBorderColor = (urgency) => {
    if (urgency === 'HIGH') return '#DC2626';
    if (urgency === 'MEDIUM') return '#D97706';
    return '#00875A';
  };

  return (
    <div style={{ maxWidth: '480px', margin: '0 auto', padding: '20px', fontFamily: 'var(--font-family)' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', margin: '0 0 8px 0', color: 'var(--navy)' }}>
          Namaste, {user?.name || 'Worker'}
        </h1>
        <p style={{ margin: 0, color: 'var(--muted)', fontSize: '14px' }}>
          {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      {/* Stat Boxes */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '32px' }}>
        <div
          style={{
            backgroundColor: '#FEE2E2',
            borderLeft: '4px solid #DC2626',
            padding: '16px',
            borderRadius: '8px',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: '24px', fontWeight: '600', color: '#DC2626' }}>{assigned}</div>
          <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '4px' }}>Assigned</div>
        </div>
        <div
          style={{
            backgroundColor: '#FEF3C7',
            borderLeft: '4px solid #D97706',
            padding: '16px',
            borderRadius: '8px',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: '24px', fontWeight: '600', color: '#D97706' }}>{inProgress}</div>
          <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '4px' }}>In Progress</div>
        </div>
        <div
          style={{
            backgroundColor: '#DCFCE7',
            borderLeft: '4px solid #00875A',
            padding: '16px',
            borderRadius: '8px',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: '24px', fontWeight: '600', color: '#00875A' }}>{doneThisWeek}</div>
          <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '4px' }}>Done This Week</div>
        </div>
      </div>

      {/* Task Cards */}
      {loading ? (
        <p style={{ textAlign: 'center', color: 'var(--muted)' }}>Loading tasks...</p>
      ) : sortedComplaints.length === 0 ? (
        <p style={{ textAlign: 'center', color: 'var(--muted)', padding: '40px 0' }}>No assigned tasks</p>
      ) : (
        <div>
          {sortedComplaints.map((complaint) => {
            const isCompleted = completedTasks[complaint._id];
            const hasUpload = uploadPreview?.id === complaint._id;

            return (
              <div
                key={complaint._id}
                style={{
                  borderLeft: `4px solid ${getUrgencyBorderColor(complaint.urgency)}`,
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  padding: '16px',
                  marginBottom: '12px',
                  opacity: isCompleted ? 0.7 : 1,
                }}
              >
                {/* Header with Checkmark */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--navy)', marginBottom: '4px' }}>
                      {complaint.title || complaint.category}
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--muted)' }}>
                      Area: {complaint.area || 'N/A'}
                    </div>
                  </div>
                  {isCompleted && (
                    <div
                      style={{
                        fontSize: '24px',
                        color: '#00875A',
                        marginLeft: '8px',
                      }}
                    >
                      ✓
                    </div>
                  )}
                </div>

                {/* Complaint Description */}
                <div
                  style={{
                    fontSize: '13px',
                    color: 'var(--navy)',
                    backgroundColor: '#f9fafb',
                    padding: '12px',
                    borderRadius: '6px',
                    marginBottom: '12px',
                    maxHeight: '80px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {complaint.description}
                </div>

                {/* Citizen Photo */}
                {complaint.beforePhoto && (
                  <div style={{ marginBottom: '12px' }}>
                    <div style={{ fontSize: '11px', color: 'var(--muted)', marginBottom: '6px' }}>
                      Before Photo:
                    </div>
                    <img
                      src={complaint.beforePhoto}
                      alt="Before"
                      style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '6px' }}
                    />
                  </div>
                )}

                {/* Upload After Photo Section */}
                {!isCompleted && (
                  <div style={{ marginBottom: '12px' }}>
                    {!hasUpload ? (
                      <label
                        style={{
                          display: 'block',
                          padding: '12px',
                          border: '2px dashed var(--blue)',
                          borderRadius: '6px',
                          textAlign: 'center',
                          cursor: 'pointer',
                          backgroundColor: '#EFF6FF',
                          fontSize: '13px',
                          color: 'var(--blue)',
                          fontWeight: '500',
                          transition: 'all 0.2s',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#DBEAFE';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = '#EFF6FF';
                        }}
                      >
                        📸 Upload After Photo
                        <input
                          type="file"
                          accept="image/*"
                          style={{ display: 'none' }}
                          onChange={(e) => {
                            if (e.target.files[0]) {
                              handlePhotoUpload(complaint._id, e.target.files[0]);
                            }
                          }}
                          disabled={uploadingId === complaint._id}
                        />
                      </label>
                    ) : (
                      <div>
                        <div style={{ fontSize: '11px', color: 'var(--muted)', marginBottom: '6px' }}>
                          After Photo Preview:
                        </div>
                        <img
                          src={uploadPreview.url}
                          alt="After"
                          style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '6px', marginBottom: '12px' }}
                        />
                        <button
                          onClick={() => handleMarkDone(complaint._id)}
                          style={{
                            width: '100%',
                            padding: '12px',
                            backgroundColor: 'var(--green)',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '6px',
                            fontSize: '13px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.opacity = '0.9';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.opacity = '1';
                          }}
                        >
                          Mark as Done
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Status Badge */}
                {isCompleted && (
                  <div
                    style={{
                      display: 'inline-block',
                      padding: '4px 12px',
                      backgroundColor: '#FEF3C7',
                      color: '#D97706',
                      borderRadius: '12px',
                      fontSize: '11px',
                      fontWeight: '600',
                    }}
                  >
                    Pending Approval
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
