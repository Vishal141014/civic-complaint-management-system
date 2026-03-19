import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const WorkerDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Mock data - In real app, fetch from API
  const workerStats = {
    assigned: 3,
    inProgress: 1,
    doneThisWeek: 12,
  };

  const todaysTasks = [
    {
      id: '#4821',
      title: 'Paani Nahi Aa Raha',
      location: 'Sector 7, Rohini - Gate No.3 ke paas',
      urgency: 'HIGH',
      status: 'pending',
      citizenPhoto: '🚰',
      citizenMessage: 'Citizen ne photo di hai - Tap to view',
      borderColor: 'border-red-500',
    },
    {
      id: '#4820',
      title: 'Pipeline Leak',
      location: 'Block C, Dwarka - Near Park',
      urgency: 'MED',
      status: 'in_progress',
      citizenPhoto: '💧',
      citizenMessage: 'Details',
      borderColor: 'border-yellow-500',
    },
    {
      id: '#4815',
      title: 'Street Light Fixed',
      location: 'Park Lane - Completed 2hr ago',
      urgency: 'DONE',
      status: 'completed',
      citizenPhoto: '✅',
      citizenMessage: 'Pending Admin Approval',
      borderColor: 'border-green-500',
    },
  ];

  const getUrgencyBadge = (urgency) => {

    switch (urgency) {
      case 'HIGH':
        return 'bg-red-50 text-red-600 border-red-200';
      case 'MED':
        return 'bg-yellow-50 text-yellow-600 border-yellow-200';
      case 'DONE':
        return 'bg-green-50 text-green-600 border-green-200';
      default:
        return 'bg-zinc-50 text-zinc-600 border-zinc-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 to-gray-100 p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-5xl mx-auto"
      >
        {/* Top Navigation Bar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-zinc-950 text-white rounded-2xl px-8 py-4 mb-8 flex items-center justify-between shadow-lg"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">⚙️</span>
            <h1 className="text-2xl font-bold">Mera Kaam</h1>
          </div>
          <motion.div
            animate={{ rotate: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-3xl cursor-pointer"
          >
            🔔
          </motion.div>
        </motion.div>

        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold text-zinc-900 mb-2">
            Namaste, {user?.name || 'Suresh'} Ji 👋
          </h2>
          <p className="text-zinc-600 text-base">
            Jal Board • Field Worker • Ward 14
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-3 gap-6 mb-10"
        >
          {/* Assigned Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-zinc-200">
            <p className="text-red-600 font-bold text-5xl">{workerStats.assigned}</p>
            <p className="text-zinc-600 font-medium text-sm uppercase tracking-wide mt-2">
              Assigned
            </p>
          </div>

          {/* In Progress Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-zinc-200">
            <p className="text-yellow-600 font-bold text-5xl">{workerStats.inProgress}</p>
            <p className="text-zinc-600 font-medium text-sm uppercase tracking-wide mt-2">
              In Progress
            </p>
          </div>

          {/* Done This Week Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-zinc-200">
            <p className="text-green-600 font-bold text-5xl">{workerStats.doneThisWeek}</p>
            <p className="text-zinc-600 font-medium text-sm uppercase tracking-wide mt-2">
              Done This Week
            </p>
          </div>
        </motion.div>

        {/* Today's Tasks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-lg font-bold text-zinc-900 mb-6 uppercase tracking-wider">
            AAJ KA KAAM
          </h3>

          <div className="space-y-4">
            {todaysTasks.map((task, idx) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + idx * 0.1 }}
                className={`bg-white rounded-2xl p-6 border-l-4 ${task.borderColor} shadow-sm border border-zinc-200`}
              >
                <div className="space-y-4">
                  {/* Header Row */}
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-mono text-zinc-500 font-bold">
                          {task.id}
                        </span>
                      </div>
                      <h4 className="text-lg font-bold text-zinc-900">
                        {task.title}
                      </h4>
                      <p className="text-zinc-600 text-sm mt-1">
                        📍 {task.location}
                      </p>
                    </div>
                    <motion.span
                      className={`px-3 py-1 rounded-full border text-sm font-bold ${getUrgencyBadge(
                        task.urgency
                      )}`}
                    >
                      {task.urgency === 'HIGH' && '🔴 HIGH'}
                      {task.urgency === 'MED' && '🟠 MED'}
                      {task.urgency === 'DONE' && '✅ DONE'}
                    </motion.span>
                  </div>

                  {/* Citizen Photo & Info */}
                  <div className="bg-zinc-50 rounded-lg p-4 flex items-center gap-4">
                    <div className="text-4xl">{task.citizenPhoto}</div>
                    <div className="flex-1">
                      <p className="text-zinc-700 text-sm font-medium">
                        {task.citizenMessage}
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    {/* View Details Button */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => navigate(`/worker/task/${task.id.replace('#', '')}`)}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-zinc-300 text-zinc-700 font-bold hover:bg-zinc-50 transition-all"
                    >
                      👁️ Dekho
                    </motion.button>

                    {/* Upload Photo Button */}
                    {task.status !== 'completed' && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate(`/worker/upload/${task.id.replace('#', '')}`)}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 text-white font-bold hover:bg-green-700 transition-all shadow-md"
                      >
                        📸 Photo Upload
                      </motion.button>
                    )}

                    {task.status === 'completed' && (
                      <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-50 text-green-600 font-bold">
                        ✅ Pending Admin Approval
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default WorkerDashboard;
