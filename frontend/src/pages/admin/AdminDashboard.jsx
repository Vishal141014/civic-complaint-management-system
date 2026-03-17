import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import PageHeader from '../../components/PageHeader';
import StatusBadge from '../../components/StatusBadge';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [complaints] = useState([
    {
      id: 'CMP-001',
      citizenName: 'John Doe',
      category: 'Road Damage',
      urgency: 'high',
      sentiment: 'negative',
      status: 'assigned',
      assignedTo: 'Worker A',
      date: '2024-01-15',
    },
    {
      id: 'CMP-002',
      citizenName: 'Jane Smith',
      category: 'Water Supply',
      urgency: 'medium',
      sentiment: 'positive',
      status: 'in_progress',
      assignedTo: 'Worker B',
      date: '2024-01-20',
    },
    {
      id: 'CMP-003',
      citizenName: 'Bob Wilson',
      category: 'Street Light',
      urgency: 'low',
      sentiment: 'neutral',
      status: 'submitted',
      assignedTo: '-',
      date: '2024-01-22',
    },
  ]);

  const [filter, setFilter] = useState({
    status: '',
    category: '',
    urgency: '',
  });

  const urgencyEmoji = {
    high: '🔴',
    medium: '🟡',
    low: '🟢',
  };

  const filteredComplaints = complaints.filter(c => {
    if (filter.status && c.status !== filter.status) return false;
    if (filter.category && c.category !== filter.category) return false;
    if (filter.urgency && c.urgency !== filter.urgency) return false;
    return true;
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pb-12"
    >
      <PageHeader
        title="Admin Dashboard"
        subtitle="Manage all department complaints"
      />

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 rounded-2xl backdrop-blur-lg bg-white/10 border border-white/20 p-4 flex flex-wrap gap-4"
      >
        <select
          value={filter.status}
          onChange={(e) => setFilter({ ...filter, status: e.target.value })}
          className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white text-sm"
        >
          <option value="">All Status</option>
          <option value="submitted">Submitted</option>
          <option value="assigned">Assigned</option>
          <option value="in_progress">In Progress</option>
        </select>

        <select
          value={filter.category}
          onChange={(e) => setFilter({ ...filter, category: e.target.value })}
          className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white text-sm"
        >
          <option value="">All Categories</option>
          <option value="Road Damage">Road Damage</option>
          <option value="Water Supply">Water Supply</option>
          <option value="Street Light">Street Light</option>
        </select>

        <select
          value={filter.urgency}
          onChange={(e) => setFilter({ ...filter, urgency: e.target.value })}
          className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white text-sm"
        >
          <option value="">All Urgency</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </motion.div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-2xl backdrop-blur-lg bg-white/10 border border-white/20 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/20">
                <th className="px-4 py-4 text-left text-sm font-bold text-white">ID</th>
                <th className="px-4 py-4 text-left text-sm font-bold text-white">Citizen</th>
                <th className="px-4 py-4 text-left text-sm font-bold text-white">Category</th>
                <th className="px-4 py-4 text-center text-sm font-bold text-white">Urgency</th>
                <th className="px-4 py-4 text-left text-sm font-bold text-white">Status</th>
                <th className="px-4 py-4 text-left text-sm font-bold text-white">Assigned To</th>
                <th className="px-4 py-4 text-center text-sm font-bold text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredComplaints.map((complaint, idx) => (
                <motion.tr
                  key={complaint.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  className={`border-b border-white/10 transition-colors ${
                    complaint.urgency === 'high' ? 'bg-red-500/10' : 'hover:bg-white/5'
                  }`}
                >
                  <td className="px-4 py-4 text-sm font-mono text-navy-300">{complaint.id}</td>
                  <td className="px-4 py-4 text-sm text-white">{complaint.citizenName}</td>
                  <td className="px-4 py-4 text-sm text-white">{complaint.category}</td>
                  <td className="px-4 py-4 text-center text-lg">{urgencyEmoji[complaint.urgency]}</td>
                  <td className="px-4 py-4 text-sm">
                    <StatusBadge status={complaint.status} />
                  </td>
                  <td className="px-4 py-4 text-sm text-navy-300">{complaint.assignedTo}</td>
                  <td className="px-4 py-4 text-center">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => navigate(`/admin/assign/${complaint.id}`)}
                      className="px-3 py-1 rounded-lg bg-saffron/20 text-saffron font-bold text-xs hover:bg-saffron/30"
                    >
                      Assign
                    </motion.button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AdminDashboard;
