import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

const DeptAdminDashboard = () => {
  const { user, role } = useAuth();
  const [pendingRequests, setPendingRequests] = useState([
    {
      id: 'worker_1',
      name: 'Raj Kumar',
      email: 'raj@example.com',
      phone: '9876543210',
      department: 'Pothole & Road Damage',
      status: 'pending',
      appliedAt: '2026-03-18T10:30:00Z',
    },
    {
      id: 'worker_2',
      name: 'Priya Singh',
      email: 'priya@example.com',
      phone: '9876543211',
      department: 'Water & Sanitation',
      status: 'pending',
      appliedAt: '2026-03-18T09:15:00Z',
    },
  ]);

  const [approvedWorkers, setApprovedWorkers] = useState([]);
  const [rejectedWorkers, setRejectedWorkers] = useState([]);
  const [selectedTab, setSelectedTab] = useState('pending');

  const handleApprove = (workerId) => {
    const worker = pendingRequests.find((w) => w.id === workerId);
    if (worker) {
      setApprovedWorkers([...approvedWorkers, { ...worker, status: 'approved', approvedAt: new Date().toISOString() }]);
      setPendingRequests(pendingRequests.filter((w) => w.id !== workerId));
      // TODO: Call backend API to update worker status
    }
  };

  const handleReject = (workerId, reason = '') => {
    const worker = pendingRequests.find((w) => w.id === workerId);
    if (worker) {
      setRejectedWorkers([...rejectedWorkers, { ...worker, status: 'rejected', rejectionReason: reason, rejectedAt: new Date().toISOString() }]);
      setPendingRequests(pendingRequests.filter((w) => w.id !== workerId));
      // TODO: Call backend API to reject worker
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-800 to-zinc-950 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 text-white">
            <h1 className="text-4xl font-bold mb-2">👨‍💼 Department Admin Dashboard</h1>
            <p className="text-blue-100">Manage worker registration requests for your department</p>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="grid md:grid-cols-4 gap-4 mb-8"
        >
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
            <p className="text-blue-600 font-semibold text-sm">Pending Requests</p>
            <p className="text-4xl font-bold text-blue-700 mt-2">{pendingRequests.length}</p>
          </div>
          <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
            <p className="text-green-600 font-semibold text-sm">Approved Workers</p>
            <p className="text-4xl font-bold text-green-700 mt-2">{approvedWorkers.length}</p>
          </div>
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
            <p className="text-red-600 font-semibold text-sm">Rejected Applications</p>
            <p className="text-4xl font-bold text-red-700 mt-2">{rejectedWorkers.length}</p>
          </div>
          <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-6">
            <p className="text-purple-600 font-semibold text-sm">Total Workers</p>
            <p className="text-4xl font-bold text-purple-700 mt-2">{approvedWorkers.length}</p>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="mb-6 flex gap-3">
          {['pending', 'approved', 'rejected'].map((tab) => (
            <motion.button
              key={tab}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedTab(tab)}
              className={`px-6 py-3 rounded-lg font-bold transition-all ${
                selectedTab === tab
                  ? 'bg-orange-500 text-white shadow-lg'
                  : 'bg-zinc-700 text-zinc-300 hover:bg-zinc-600'
              }`}
            >
              {tab === 'pending' && `📋 Pending (${pendingRequests.length})`}
              {tab === 'approved' && `✅ Approved (${approvedWorkers.length})`}
              {tab === 'rejected' && `❌ Rejected (${rejectedWorkers.length})`}
            </motion.button>
          ))}
        </div>

        {/* Pending Requests */}
        {selectedTab === 'pending' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            {pendingRequests.length === 0 ? (
              <div className="bg-zinc-800 rounded-xl p-8 text-center">
                <p className="text-zinc-400 text-lg">✨ No pending worker requests</p>
              </div>
            ) : (
              pendingRequests.map((request, idx) => (
                <motion.div
                  key={request.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-zinc-800 border border-zinc-700 rounded-xl p-6 hover:border-orange-500/50 transition-all"
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Worker Info */}
                    <div>
                      <h3 className="text-xl font-bold text-white mb-4">👤 Worker Details</h3>
                      <div className="space-y-2 text-zinc-300">
                        <p>
                          <span className="font-semibold text-zinc-200">Name:</span> {request.name}
                        </p>
                        <p>
                          <span className="font-semibold text-zinc-200">Email:</span> {request.email}
                        </p>
                        <p>
                          <span className="font-semibold text-zinc-200">Phone:</span> {request.phone}
                        </p>
                        <p>
                          <span className="font-semibold text-zinc-200">Department:</span> {request.department}
                        </p>
                        <p className="text-sm text-zinc-400">
                          <span className="font-semibold text-zinc-300">Applied:</span> {formatDate(request.appliedAt)}
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-3 justify-center">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleApprove(request.id)}
                        className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-lg hover:shadow-lg transition-all"
                      >
                        ✅ Approve Worker
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleReject(request.id)}
                        className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold rounded-lg hover:shadow-lg transition-all"
                      >
                        ❌ Reject Application
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        )}

        {/* Approved Workers */}
        {selectedTab === 'approved' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            {approvedWorkers.length === 0 ? (
              <div className="bg-zinc-800 rounded-xl p-8 text-center">
                <p className="text-zinc-400 text-lg">✨ No approved workers yet</p>
              </div>
            ) : (
              approvedWorkers.map((worker, idx) => (
                <motion.div
                  key={worker.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-green-900/20 border border-green-700/50 rounded-xl p-6"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold text-green-400">{worker.name}</h3>
                      <p className="text-green-300">{worker.email}</p>
                      <p className="text-green-300">{worker.phone}</p>
                      <p className="text-xs text-green-400 mt-2">
                        ✅ Approved on: {formatDate(worker.approvedAt)}
                      </p>
                    </div>
                    <div className="bg-green-500 text-white px-4 py-2 rounded-lg font-bold">✓ ACTIVE</div>
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        )}

        {/* Rejected Applications */}
        {selectedTab === 'rejected' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            {rejectedWorkers.length === 0 ? (
              <div className="bg-zinc-800 rounded-xl p-8 text-center">
                <p className="text-zinc-400 text-lg">✨ No rejected applications</p>
              </div>
            ) : (
              rejectedWorkers.map((worker, idx) => (
                <motion.div
                  key={worker.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-red-900/20 border border-red-700/50 rounded-xl p-6"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold text-red-400">{worker.name}</h3>
                      <p className="text-red-300">{worker.email}</p>
                      <p className="text-red-300">{worker.phone}</p>
                      <p className="text-xs text-red-400 mt-2">
                        ❌ Rejected on: {formatDate(worker.rejectedAt)}
                      </p>
                    </div>
                    <div className="bg-red-500 text-white px-4 py-2 rounded-lg font-bold">✗ REJECTED</div>
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default DeptAdminDashboard;
