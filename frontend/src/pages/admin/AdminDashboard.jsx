import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from '../../config/axios';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeItem, setActiveItem] = useState('dashboard');
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [filter, setFilter] = useState({
    status: 'all',
    urgency: 'all',
  });

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/complaints');
        // Sort by urgency (high first) then by date (newest first)
        const sorted = (response.data.complaints || []).sort((a, b) => {
          const urgencyOrder = { high: 0, medium: 1, low: 2 };
          const urgencyA = urgencyOrder[a.urgency?.toLowerCase()] ?? 3;
          const urgencyB = urgencyOrder[b.urgency?.toLowerCase()] ?? 3;
          if (urgencyA !== urgencyB) return urgencyA - urgencyB;
          return new Date(b.created_at) - new Date(a.created_at);
        });
        setComplaints(sorted);
        setError(null);
      } catch (err) {
        console.error('Error fetching complaints:', err);
        setError('Failed to load complaints');
        setComplaints([]);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      fetchComplaints();
    }
  }, [user?.id]);

  // Calculate metrics from real data
  const calculateMetrics = () => {
    const total = complaints.length;
    const pending = complaints.filter(c => ['submitted', 'dept_assigned'].includes(c.status)).length;
    const inProgress = complaints.filter(c => c.status === 'in_progress').length;
    const resolved = complaints.filter(c => ['completed', 'approved'].includes(c.status)).length;
    const highUrgency = complaints.filter(c => c.urgency?.toLowerCase() === 'high').length;
    
    return [
      { label: 'Total Complaints', value: total.toString(), icon: '📋', color: 'from-blue-500/20 to-blue-600/20', textColor: '#3B82F6' },
      { label: 'Pending', value: pending.toString(), icon: '⏳', color: 'from-yellow-500/20 to-yellow-600/20', textColor: '#F59E0B', detail: `↑ ${highUrgency} HIGH urgency` },
      { label: 'In Progress', value: inProgress.toString(), icon: '⚙️', color: 'from-purple-500/20 to-purple-600/20', textColor: '#A855F7' },
      { label: 'Resolved', value: resolved.toString(), icon: '✓', color: 'from-green-500/20 to-green-600/20', textColor: '#10B981' },
    ];
  };

  const metrics = calculateMetrics();

  const filteredComplaints = complaints.filter(c => {
    if (filter.status !== 'all' && c.status !== filter.status) return false;
    if (filter.urgency !== 'all' && c.urgency?.toLowerCase() !== filter.urgency) return false;
    return true;
  });

  const urgencyColor = {
    high: '🔴',
    medium: '🟡',
    low: '🟢',
  };

  const sentimentEmoji = {
    positive: '😊',
    negative: '😡',
    neutral: '😐',
    angry: '😠'
  };

  if (error && !loading) {
    return (
      <div className="flex h-full items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-red-600 font-bold text-lg mb-4">{error}</p>
          <button onClick={() => window.location.reload()} className="px-4 py-2 bg-orange-500 text-white rounded-lg">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full bg-gray-50">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -250 }}
        animate={{ x: 0 }}
        className="w-64 bg-zinc-950 border-r border-zinc-700 flex flex-col p-6 min-h-screen"
      >
        {/* Logo/Brand */}
        <div className="mb-8">
          <h2 className="text-white font-bold text-lg">Smart CRM</h2>
          <p className="text-zinc-400 text-xs mt-1">Dept. Dashboard</p>
        </div>

        {/* Main Menu */}
        <div className="flex-1">
          <p className="text-zinc-400 text-xs font-bold uppercase tracking-wider mb-4">Main</p>
          <nav className="space-y-2">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: '📊', badge: 3 },
              { id: 'complaints', label: 'All Complaints', icon: '📋' },
              { id: 'workers', label: 'Field Workers', icon: '👷' },
              { id: 'review', label: 'Photo Review', icon: '📸', badge: 1 },
            ].map(item => (
              <motion.button
                key={item.id}
                whileHover={{ x: 4 }}
                onClick={() => setActiveItem(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  activeItem === item.id
                    ? 'bg-orange-500/20 border-l-4 border-orange-500 text-orange-400'
                    : 'text-zinc-300 hover:bg-zinc-700/50'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="flex-1 text-left">{item.label}</span>
                {item.badge && (
                  <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-full font-bold">
                    {item.badge}
                  </span>
                )}
              </motion.button>
            ))}
          </nav>

          {/* Reports */}
          <p className="text-zinc-400 text-xs font-bold uppercase tracking-wider mb-4 mt-8">Reports</p>
          <nav className="space-y-2">
            {[
              { id: 'analytics', label: 'Analytics', icon: '📈' },
              { id: 'hotspot', label: 'Hotspot Map', icon: '🗺️' },
              { id: 'export', label: 'Export Report', icon: '📥' },
            ].map(item => (
              <motion.button
                key={item.id}
                whileHover={{ x: 4 }}
                onClick={() => setActiveItem(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  activeItem === item.id
                    ? 'bg-orange-500/20 border-l-4 border-orange-500 text-orange-400'
                    : 'text-zinc-300 hover:bg-zinc-700/50'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </motion.button>
            ))}
          </nav>
        </div>

        {/* Account */}
        <div className="border-t border-zinc-700 pt-4 space-y-2">
          <p className="text-zinc-400 text-xs font-bold uppercase tracking-wider mb-4">Account</p>
          <motion.button
            whileHover={{ x: 4 }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-zinc-300 hover:bg-zinc-700/50 transition-all"
          >
            <span className="text-lg">⚙️</span>
            <span>Settings</span>
          </motion.button>
          <motion.button
            whileHover={{ x: 4 }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-zinc-300 hover:bg-zinc-700/50 transition-all"
          >
            <span className="text-lg">🚪</span>
            <span>Logout</span>
          </motion.button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex-1 overflow-auto"
      >
        <div className="p-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-bold text-zinc-900 mb-2">Dashboard</h1>
            <p className="text-zinc-600">
              {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} • {user?.name || 'Department'} Admin
            </p>
          </motion.div>

          {/* Metrics Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ staggerChildren: 0.1 }}
            className="grid grid-cols-4 gap-6 mb-8"
          >
            {metrics.map((metric, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`bg-gradient-to-br ${metric.color} rounded-2xl p-6 border border-zinc-200 hover:shadow-lg transition-all`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-sm font-medium text-zinc-600 mb-2">{metric.label}</p>
                    <h3 className="text-4xl font-bold" style={{ color: metric.textColor }}>
                      {metric.value}
                    </h3>
                  </div>
                  <span className="text-3xl">{metric.icon}</span>
                </div>
                {metric.detail && (
                  <p className="text-xs text-zinc-600 mt-3">{metric.detail}</p>
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* Complaints Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {/* Section Header with Filters */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-zinc-900 mb-1">
                  🔴 Complaints ({filteredComplaints.length})
                </h2>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={() => setFilter({ status: 'all', urgency: 'all' })}
                  className={`px-4 py-2 rounded-lg font-bold text-sm transition-colors ${
                    filter.urgency === 'all' ? 'bg-zinc-950 text-white' : 'bg-zinc-100 text-zinc-900 hover:bg-zinc-200'
                  }`}
                >
                  All
                </button>
                <button 
                  onClick={() => setFilter(f => ({ ...f, urgency: 'high' }))}
                  className={`px-4 py-2 rounded-lg font-bold text-sm transition-colors ${
                    filter.urgency === 'high' ? 'bg-red-500 text-white' : 'bg-zinc-100 text-zinc-900 hover:bg-zinc-200'
                  }`}
                >
                  HIGH 🔴
                </button>
                <button 
                  onClick={() => setFilter(f => ({ ...f, urgency: 'medium' }))}
                  className={`px-4 py-2 rounded-lg font-bold text-sm transition-colors ${
                    filter.urgency === 'medium' ? 'bg-yellow-500 text-white' : 'bg-zinc-100 text-zinc-900 hover:bg-zinc-200'
                  }`}
                >
                  MEDIUM 🟡
                </button>
              </div>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 p-12 flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full"
                />
              </div>
            )}

            {/* Complaints Table */}
            {!loading && (
              <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 overflow-hidden">
                {filteredComplaints.length === 0 ? (
                  <div className="p-12 text-center text-zinc-500">
                    <p className="text-lg font-semibold mb-2">No complaints found</p>
                    <p className="text-sm">Try adjusting your filters</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-zinc-50 border-b border-zinc-200">
                        <tr>
                          <th className="px-6 py-4 text-left text-sm font-bold text-zinc-900">ID</th>
                          <th className="px-6 py-4 text-left text-sm font-bold text-zinc-900">CITIZEN</th>
                          <th className="px-6 py-4 text-left text-sm font-bold text-zinc-900">CATEGORY</th>
                          <th className="px-6 py-4 text-center text-sm font-bold text-zinc-900">URGENCY</th>
                          <th className="px-6 py-4 text-left text-sm font-bold text-zinc-900">SENTIMENT</th>
                          <th className="px-6 py-4 text-left text-sm font-bold text-zinc-900">STATUS</th>
                          <th className="px-6 py-4 text-center text-sm font-bold text-zinc-900">ACTIONS</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-100">
                        {filteredComplaints.map((complaint) => (
                          <motion.tr
                            key={complaint._id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className={complaint.urgency?.toLowerCase() === 'high' ? 'bg-red-50/50' : ''}
                          >
                            <td className="px-6 py-4 text-sm font-mono text-zinc-700">#{complaint._id.slice(-6).toUpperCase()}</td>
                            <td className="px-6 py-4 text-sm font-medium text-zinc-900">{complaint.citizen_name || 'Unknown'}</td>
                            <td className="px-6 py-4 text-sm text-zinc-700">{complaint.category}</td>
                            <td className="px-6 py-4 text-center text-lg">
                              {urgencyColor[complaint.urgency?.toLowerCase()] || '⚪'}
                            </td>
                            <td className="px-6 py-4">
                              <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${
                                complaint.sentiment?.toLowerCase() === 'negative' ? 'bg-red-100 text-red-700' :
                                complaint.sentiment?.toLowerCase() === 'positive' ? 'bg-green-100 text-green-700' :
                                complaint.sentiment?.toLowerCase() === 'angry' ? 'bg-red-100 text-red-700' :
                                'bg-gray-100 text-gray-700'
                              }`}>
                                {sentimentEmoji[complaint.sentiment?.toLowerCase()] || '😐'} {complaint.sentiment || 'Neutral'}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                                complaint.status === 'submitted' ? 'bg-blue-100 text-blue-700' :
                                complaint.status === 'dept_assigned' ? 'bg-orange-100 text-orange-700' :
                                complaint.status === 'in_progress' ? 'bg-purple-100 text-purple-700' :
                                complaint.status === 'completed' ? 'bg-green-100 text-green-700' :
                                complaint.status === 'approved' ? 'bg-green-100 text-green-700' :
                                'bg-gray-100 text-gray-700'
                              }`}>
                                {(complaint.status || 'unknown').toUpperCase().replace('_', ' ')}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-center">
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => navigate(`/admin/complaint/${complaint._id}`)}
                                className="px-4 py-2 rounded-lg bg-orange-500 text-white font-bold text-sm hover:bg-orange-600 transition-colors"
                              >
                                View →
                              </motion.button>
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </motion.main>
    </div>
  );
};

export default AdminDashboard;
