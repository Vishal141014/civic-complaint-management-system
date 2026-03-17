import { motion } from 'framer-motion';
import { Button, StatusPill } from '../components/common';

const WorkerDashboard = () => {
  const tasks = [
    {
      id: '#4821',
      emoji: '🚰',
      title: 'Paani Nahi Aa Raha',
      location: 'Sector 7, Rohini · Gate No. 3',
      urgency: 'urgent',
      status: 'assigned',
    },
    {
      id: '#4820',
      emoji: '🔧',
      title: 'Pipeline Leak',
      location: 'Block C, Dwarka · Near Park',
      urgency: 'medium',
      status: 'assigned',
    },
    {
      id: '#4815',
      emoji: '💡',
      title: 'Street Light Fixed',
      location: 'Park Lane · Completed 2hr ago',
      urgency: 'done',
      status: 'done',
    },
  ];

  const urgencyColors = {
    urgent: 'border-l-4 border-red-600',
    medium: 'border-l-4 border-yellow-600',
    done: 'border-l-4 border-green-600 opacity-70',
  };

  const statusStyles = {
    urgent: 'sp-red',
    medium: 'sp-yellow',
    done: 'sp-green',
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-b from-navy-50 to-white pt-20 pb-8"
    >
      <div className="max-w-sm mx-auto px-4">
        {/* Mobile Frame */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white rounded-3xl overflow-hidden shadow-2xl border-8 border-gray-300"
        >
          {/* Status Bar */}
          <div className="bg-navy text-white p-4 flex items-center justify-between">
            <h3 className="font-bold">⚙️ Mera Kaam</h3>
            <div className="relative">
              <span className="text-lg">🔔</span>
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-600 text-white text-xs rounded-full flex items-center justify-center font-bold">
                2
              </span>
            </div>
          </div>

          {/* Greeting Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-r from-saffron-50 to-white p-5 border-b border-gray-100"
          >
            <h2 className="text-xl font-bold text-navy mb-1">Namaste, Suresh Ji 👋</h2>
            <p className="text-xs text-gray-600 font-mono">Jal Board · Field Worker · Ward 14</p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-3 border-b border-gray-100"
          >
            {[
              { num: 3, label: 'ASSIGNED', color: 'text-red-600' },
              { num: 1, label: 'IN PROGRESS', color: 'text-yellow-600' },
              { num: 12, label: 'DONE', color: 'text-green-600' },
            ].map((stat, i) => (
              <div key={i} className="py-4 text-center border-r last:border-r-0 border-gray-100">
                <div className={`text-2xl font-bold ${stat.color}`}>{stat.num}</div>
                <p className="text-xs text-gray-600 font-mono mt-1 uppercase">{stat.label}</p>
              </div>
            ))}
          </motion.div>

          {/* Tasks */}
          <div className="p-6 space-y-4">
            <h3 className="text-xs font-mono font-bold text-gray-600 uppercase tracking-wider">Aaj Ka Kaam</h3>

            {tasks.map((task, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className={`bg-navy-50 rounded-2xl p-4 ${urgencyColors[task.urgency]} transition-all hover:shadow-md`}
              >
                <div className="flex items-start justify-between mb-2">
                  <span className="text-xs font-mono font-bold text-gray-600">{task.id}</span>
                  <StatusPill status={task.status}>
                    {task.urgency === 'urgent' && '🔴'}
                    {task.urgency === 'medium' && '🟡'}
                    {task.urgency === 'done' && '✅'}
                  </StatusPill>
                </div>
                <div className="flex gap-3">
                  <span className="text-2xl">{task.emoji}</span>
                  <div className="flex-1">
                    <h4 className="font-bold text-navy text-sm">{task.title}</h4>
                    <p className="text-xs text-gray-600 mt-1">📍 {task.location}</p>
                  </div>
                </div>

                {task.urgency !== 'done' && (
                  <div className="mt-3 flex gap-2">
                    <Button variant="ghost" size="sm" className="flex-1 text-blue-600 border border-blue-200">
                      📋 Details
                    </Button>
                    <Button
                      variant="success"
                      size="sm"
                      className="flex-1"
                      icon="📷"
                    >
                      Upload
                    </Button>
                  </div>
                )}

                {task.urgency === 'done' && (
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-2xl">✅</span>
                    <span className="text-xs text-green-600 font-mono font-bold">Pending Admin Approval</span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Footer */}
          <div className="p-4 text-center border-t border-gray-100 text-xs text-gray-600 font-mono">
            📱 Mobile App View
          </div>
        </motion.div>

        {/* Info Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center text-xs text-gray-600 font-mono mt-8"
        >
          Field Worker Dashboard — Mobile First Experience
        </motion.p>
      </div>
    </motion.div>
  );
};

export default WorkerDashboard;
