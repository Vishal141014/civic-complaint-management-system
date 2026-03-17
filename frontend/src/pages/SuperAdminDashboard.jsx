import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { getComplaints } from '../api/complaints';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function SuperAdminDashboard() {
  const { token } = useAuth();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(false);
  const [unreadNotifications] = useState(3);

  const loadComplaints = async () => {
    try {
      setLoading(true);
      const response = await getComplaints({}, token);
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
    const interval = setInterval(loadComplaints, 20000);
    return () => clearInterval(interval);
  }, [token]);

  const complaintsList = Array.isArray(complaints) ? complaints : [];

  // City Stats
  const cityStats = useMemo(() => {
    const total = complaintsList.length;
    const resolved = complaintsList.filter((c) => c.status === 'resolved').length;
    const pending = complaintsList.filter((c) => c.status === 'submitted').length;
    const inProgress = complaintsList.filter((c) => ['assigned', 'in_progress'].includes(c.status)).length;
    return { total, resolved, pending, inProgress };
  }, [complaintsList]);

  // Department Bar Chart Data
  const departmentData = useMemo(() => {
    const deptMap = {};
    complaintsList.forEach((c) => {
      const dept = c.department || 'General';
      deptMap[dept] = (deptMap[dept] || 0) + 1;
    });
    return Object.entries(deptMap).map(([name, value]) => ({ name, value }));
  }, [complaintsList]);

  // Sentiment Pie Chart Data
  const sentimentData = useMemo(() => {
    const sentiments = { angry: 0, negative: 0, neutral: 0 };
    complaintsList.forEach((c) => {
      const sentiment = c.sentiment || 'neutral';
      if (sentiment === 'angry' || sentiment === 'angry_emoji') sentiments.angry++;
      else if (sentiment === 'negative' || sentiment === 'sad' || sentiment === 'sad_emoji') sentiments.negative++;
      else sentiments.neutral++;
    });
    return [
      { name: 'Angry', value: sentiments.angry, fill: '#DC2626' },
      { name: 'Negative', value: sentiments.negative, fill: '#D97706' },
      { name: 'Neutral', value: sentiments.neutral, fill: '#6B7C93' },
    ].filter((item) => item.value > 0);
  }, [complaintsList]);

  // Department Performance Table Data
  const departmentTable = useMemo(() => {
    const deptMap = {};
    complaintsList.forEach((c) => {
      const dept = c.department || 'General';
      if (!deptMap[dept]) {
        deptMap[dept] = { name: dept, total: 0, pending: 0, resolved: 0, avgTime: 0 };
      }
      deptMap[dept].total++;
      if (c.status === 'resolved') deptMap[dept].resolved++;
      if (c.status === 'submitted') deptMap[dept].pending++;
    });
    return Object.values(deptMap).map((dept) => ({
      ...dept,
      avgTime: Math.floor(Math.random() * 8 + 2), // Mock average time in days
    }));
  }, [complaintsList]);

  const DEPT_COLORS = {
    'Water': '#2563EB',
    'Roads': '#FF6B00',
    'Sanitation': '#00875A',
    'Electricity': '#D97706',
    'General': '#9333EA',
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'var(--font-family)', backgroundColor: '#f9fafb', minHeight: '100vh' }}>
      {/* Header with Notification Bell */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '32px', margin: '0 0 8px 0', color: 'var(--navy)' }}>City Dashboard</h1>
          <p style={{ margin: 0, color: 'var(--muted)', fontSize: '14px' }}>
            Real-time complaint analytics and department performance
          </p>
        </div>
        <div style={{ position: 'relative' }}>
          <button
            style={{
              fontSize: '24px',
              border: 'none',
              backgroundColor: 'transparent',
              cursor: 'pointer',
              padding: '8px',
            }}
          >
            🔔
          </button>
          {unreadNotifications > 0 && (
            <div
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                backgroundColor: '#DC2626',
                color: '#fff',
                borderRadius: '50%',
                width: '20px',
                height: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '11px',
                fontWeight: '600',
              }}
            >
              {unreadNotifications}
            </div>
          )}
          <button
            style={{
              marginLeft: '12px',
              padding: '8px 16px',
              backgroundColor: 'var(--blue)',
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
            📥 Export
          </button>
        </div>
      </div>

      {/* City Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '32px' }}>
        <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', borderLeft: '4px solid #2563EB', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '8px', fontWeight: '500' }}>Total Complaints</div>
          <div style={{ fontSize: '36px', fontWeight: '700', color: '#2563EB' }}>{cityStats.total}</div>
        </div>
        <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', borderLeft: '4px solid #00875A', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '8px', fontWeight: '500' }}>Resolved</div>
          <div style={{ fontSize: '36px', fontWeight: '700', color: '#00875A' }}>{cityStats.resolved}</div>
        </div>
        <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', borderLeft: '4px solid #DC2626', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '8px', fontWeight: '500' }}>Pending</div>
          <div style={{ fontSize: '36px', fontWeight: '700', color: '#DC2626' }}>{cityStats.pending}</div>
        </div>
        <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', borderLeft: '4px solid #D97706', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '8px', fontWeight: '500' }}>In Progress</div>
          <div style={{ fontSize: '36px', fontWeight: '700', color: '#D97706' }}>{cityStats.inProgress}</div>
        </div>
      </div>

      {/* Charts Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px', marginBottom: '32px' }}>
        {/* Bar Chart */}
        <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ margin: '0 0 16px 0', color: 'var(--navy)', fontSize: '16px', fontWeight: '600' }}>
            Complaints by Department
          </h3>
          {departmentData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={departmentData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" style={{ fontSize: '12px' }} />
                <YAxis style={{ fontSize: '12px' }} />
                <Tooltip />
                <Bar
                  dataKey="value"
                  fill="#2563EB"
                  radius={[8, 8, 0, 0]}
                  shape={(props) => {
                    const { x, y, width, height } = props;
                    const dept = props.payload?.name || '';
                    const color = DEPT_COLORS[dept] || '#2563EB';
                    return (
                      <rect
                        x={x}
                        y={y}
                        width={width}
                        height={height}
                        fill={color}
                        rx={8}
                        ry={8}
                      />
                    );
                  }}
                />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p style={{ color: 'var(--muted)', textAlign: 'center', padding: '40px 0' }}>No data available</p>
          )}
        </div>

        {/* Pie Chart */}
        <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ margin: '0 0 16px 0', color: 'var(--navy)', fontSize: '16px', fontWeight: '600' }}>
            Sentiment Breakdown
          </h3>
          {sentimentData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={sentimentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {sentimentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p style={{ color: 'var(--muted)', textAlign: 'center', padding: '40px 0' }}>No data available</p>
          )}
        </div>
      </div>

      {/* Department Performance Table */}
      <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <h3 style={{ margin: '0 0 16px 0', color: 'var(--navy)', fontSize: '16px', fontWeight: '600' }}>
          Department Performance
        </h3>
        {departmentTable.length > 0 ? (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
                  <th style={{ textAlign: 'left', padding: '12px 8px', color: 'var(--muted)', fontWeight: '600' }}>
                    Department
                  </th>
                  <th style={{ textAlign: 'center', padding: '12px 8px', color: 'var(--muted)', fontWeight: '600' }}>
                    Total
                  </th>
                  <th style={{ textAlign: 'center', padding: '12px 8px', color: 'var(--muted)', fontWeight: '600' }}>
                    Pending
                  </th>
                  <th style={{ textAlign: 'center', padding: '12px 8px', color: 'var(--muted)', fontWeight: '600' }}>
                    Resolved
                  </th>
                  <th style={{ textAlign: 'center', padding: '12px 8px', color: 'var(--muted)', fontWeight: '600' }}>
                    Avg Time (days)
                  </th>
                </tr>
              </thead>
              <tbody>
                {departmentTable.map((dept, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid #f3f4f6' }}>
                    <td style={{ padding: '12px 8px', color: 'var(--navy)', fontWeight: '600' }}>
                      {dept.name}
                    </td>
                    <td style={{ textAlign: 'center', padding: '12px 8px', color: 'var(--navy)' }}>
                      {dept.total}
                    </td>
                    <td style={{ textAlign: 'center', padding: '12px 8px' }}>
                      <span
                        style={{
                          display: 'inline-block',
                          backgroundColor: '#FEE2E2',
                          color: '#DC2626',
                          padding: '4px 8px',
                          borderRadius: '4px',
                          fontSize: '12px',
                          fontWeight: '600',
                        }}
                      >
                        {dept.pending}
                      </span>
                    </td>
                    <td style={{ textAlign: 'center', padding: '12px 8px' }}>
                      <span
                        style={{
                          display: 'inline-block',
                          backgroundColor: '#DCFCE7',
                          color: '#00875A',
                          padding: '4px 8px',
                          borderRadius: '4px',
                          fontSize: '12px',
                          fontWeight: '600',
                        }}
                      >
                        {dept.resolved}
                      </span>
                    </td>
                    <td style={{ textAlign: 'center', padding: '12px 8px', color: 'var(--navy)', fontWeight: '500' }}>
                      {dept.avgTime}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p style={{ color: 'var(--muted)', textAlign: 'center', padding: '40px 0' }}>No departments available</p>
        )}
      </div>
    </div>
  );
}
