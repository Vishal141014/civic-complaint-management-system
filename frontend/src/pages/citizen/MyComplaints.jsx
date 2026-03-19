import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from '../../config/axios';

const MyComplaints = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/complaints');
        setComplaints(response.data.complaints || []);
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

  const defaultSelected = complaints.length > 0 ? complaints[0] : null;
  const current = selectedComplaint || defaultSelected;

  const urgencyIcon = {
    high: '🔴',
    medium: '🟡',
    low: '🟢',
  };

  const statusColors = {
    submitted: 'bg-blue-100 text-blue-700',
    assigned: 'bg-yellow-100 text-yellow-700',
    in_progress: 'bg-purple-100 text-purple-700',
    completed: 'bg-green-100 text-green-700',
    dept_assigned: 'bg-orange-100 text-orange-700',
    approved: 'bg-green-100 text-green-700',
    rejected: 'bg-red-100 text-red-700',
    reraised: 'bg-blue-100 text-blue-700',
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border-b border-zinc-200 sticky top-0 z-10 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-zinc-900">My Complaints</h1>
              <p className="text-zinc-600 mt-1">Track all your submitted complaints</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/citizen/submit')}
              className="px-6 py-3 rounded-lg bg-orange-500 text-white font-bold hover:bg-orange-600 transition-colors"
            >
              + Submit New
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-3 gap-8">
          {/* Left: Complaints List */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="col-span-1 space-y-3"
          >
            <h2 className="text-lg font-bold text-zinc-900 mb-4">Complaints ({complaints.length})</h2>
            {complaints.length === 0 ? (
              <div className="text-center py-8 text-zinc-500">
                <p className="text-lg font-semibold mb-2">Aapki koi shikayat nahi hai</p>
                <p className="text-sm">आपकी कोई शिकायत नहीं है</p>
              </div>
            ) : (
              complaints.map((complaint) => (
                <motion.button
                  key={complaint._id}
                  onClick={() => setSelectedComplaint(complaint)}
                  whileHover={{ x: 4 }}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                    current?._id === complaint._id
                      ? 'bg-orange-50 border-orange-500 shadow-md'
                      : 'bg-white border-zinc-200 hover:border-zinc-300'
                  }`}
                >
                  {/* Status Indicator */}
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <p className="font-semibold text-zinc-900 text-sm">{complaint.category}</p>
                      <p className="text-xs text-zinc-600 mt-1">
                        ID: {complaint._id.slice(-6).toUpperCase()} • {complaint.department || 'Not Assigned'}
                      </p>
                    </div>
                    <span className="text-xl">{urgencyIcon[complaint.urgency?.toLowerCase()] || '⚪'}</span>
                  </div>

                  {/* Status Badge */}
                  <div className="flex items-center justify-between mt-3">
                    <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold ${statusColors[complaint.status] || 'bg-gray-100 text-gray-700'}`}>
                      {(complaint.status || 'submitted').toUpperCase().replace('_', ' ')}
                    </span>
                    <span className="text-xs text-zinc-500">
                      {new Date(complaint.created_at).toLocaleDateString('en-IN')}
                    </span>
                  </div>
                </motion.button>
              ))
            )}
          </motion.div>

          {/* Right: Complaint Details & Progress */}
          {current ? (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="col-span-2"
            >
              {/* Detail Card */}
              <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 p-8 mb-8">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-zinc-900">Complaint #{current._id.slice(-6).toUpperCase()}</h3>
                    <p className="text-zinc-600 mt-2">{current.category}</p>
                  </div>
                  <span className={`px-4 py-2 rounded-lg font-bold text-sm ${statusColors[current.status] || 'bg-gray-100 text-gray-700'}`}>
                    {(current.status || 'submitted').toUpperCase().replace('_', ' ')}
                  </span>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-6 mb-6 pb-6 border-b border-zinc-200">
                  <div>
                    <p className="text-xs text-zinc-600 font-semibold uppercase mb-1">Category</p>
                    <p className="text-lg font-bold text-zinc-900">{current.category}</p>
                  </div>
                  <div>
                    <p className="text-xs text-zinc-600 font-semibold uppercase mb-1">Urgency</p>
                    <p className="text-lg font-bold flex items-center gap-2">
                      {urgencyIcon[current.urgency?.toLowerCase()] || '⚪'} {(current.urgency || 'Unknown').toUpperCase()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-zinc-600 font-semibold uppercase mb-1">Department</p>
                    <p className="text-lg font-bold text-zinc-900">{current.department || 'Not Assigned'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-zinc-600 font-semibold uppercase mb-1">Submitted Date</p>
                    <p className="text-lg font-bold text-zinc-900">
                      {new Date(current.created_at).toLocaleDateString('en-IN')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Progress Timeline */}
              <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 p-8">
                <h4 className="text-lg font-bold text-zinc-900 mb-6">📍 Status Timeline</h4>
                
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-4 h-4 rounded-full bg-green-500 border-2 border-green-500" />
                    </div>
                    <div className="pb-4 flex-1">
                      <p className="font-bold text-zinc-900">Submitted</p>
                      <p className="text-sm text-zinc-600 mt-1">
                        {new Date(current.created_at).toLocaleString('en-IN')}
                      </p>
                    </div>
                  </div>

                  {current.assigned_to && (
                    <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-1 h-8 bg-green-500" />
                        <div className="w-4 h-4 rounded-full bg-green-500 border-2 border-green-500" />
                      </div>
                      <div className="pb-4 flex-1">
                        <p className="font-bold text-zinc-900">Assigned</p>
                        <p className="text-sm text-zinc-600 mt-1">Department: {current.department}</p>
                      </div>
                    </div>
                  )}

                  {['in_progress', 'completed', 'approved'].includes(current.status) && (
                    <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-1 h-8 bg-green-500" />
                        <div className="w-4 h-4 rounded-full bg-green-500 border-2 border-green-500" />
                      </div>
                      <div className="pb-4 flex-1">
                        <p className="font-bold text-zinc-900">In Progress</p>
                        <p className="text-sm text-zinc-600 mt-1">Work is being done</p>
                      </div>
                    </div>
                  )}

                  {current.status === 'completed' && (
                    <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-1 h-8 bg-green-500" />
                        <div className="w-4 h-4 rounded-full bg-green-500 border-2 border-green-500" />
                      </div>
                      <div className="pb-4 flex-1">
                        <p className="font-bold text-zinc-900">Completed</p>
                        <p className="text-sm text-zinc-600 mt-1">Work has been completed</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Re-raise Button (if rejected) */}
                {current.status === 'rejected' && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    onClick={() => navigate(`/citizen/reraise/${current._id}`)}
                    className="w-full mt-6 py-3 rounded-lg bg-red-500 text-white font-bold hover:bg-red-600 transition-colors"
                  >
                    🔄 Re-raise Complaint
                  </motion.button>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="col-span-2 flex items-center justify-center"
            >
              <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 p-12 text-center w-full">
                <p className="text-xl font-bold text-zinc-600 mb-2">Koi shikayat select nahi hai</p>
                <p className="text-zinc-500">कोई शिकायत चुनें या नई शिकायत दर्ज करें</p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyComplaints;
