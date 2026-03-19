import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const WorkerTasks = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [tasks] = useState([
    {
      id: '#4821',
      title: 'Paani Nahi Aa Raha',
      location: 'Sector 7, Rohini - Gate No.3 ke paas',
      urgency: 'HIGH',
      status: 'assigned',
      days: 2,
      icon: '🚰',
      color: 'red',
    },
    {
      id: '#4820',
      title: 'Pipeline Leak',
      location: 'Block C, Dwarka - Near Park',
      urgency: 'MED',
      status: 'in_progress',
      days: 1,
      icon: '💧',
      color: 'yellow',
    },
    {
      id: '#4819',
      title: 'Road Damage - Pothole',
      location: 'Main Market Road - Sector 5',
      urgency: 'HIGH',
      status: 'assigned',
      days: 3,
      icon: '🛣️',
      color: 'orange',
    },
    {
      id: '#4818',
      title: 'Electricity Wire Down',
      location: 'Residential Area - Ward 12',
      urgency: 'HIGH',
      status: 'assigned',
      days: 1,
      icon: '⚡',
      color: 'red',
    },
  ]);

  const pendingTasks = tasks.filter(t => t.status === 'assigned').length;
  const inProgressTasks = tasks.filter(t => t.status === 'in_progress').length;
  const urgentCount = tasks.filter(t => t.urgency === 'HIGH').length;

  const getColorScheme = (color) => {
    switch (color) {
      case 'red':
        return {
          bg: 'bg-red-50',
          border: 'border-red-200',
          badge: 'bg-red-100 text-red-700',
          hover: 'hover:border-red-400',
        };
      case 'yellow':
        return {
          bg: 'bg-yellow-50',
          border: 'border-yellow-200',
          badge: 'bg-yellow-100 text-yellow-700',
          hover: 'hover:border-yellow-400',
        };
      case 'orange':
        return {
          bg: 'bg-orange-50',
          border: 'border-orange-200',
          badge: 'bg-orange-100 text-orange-700',
          hover: 'hover:border-orange-400',
        };
      default:
        return {
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          badge: 'bg-blue-100 text-blue-700',
          hover: 'hover:border-blue-400',
        };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 to-gray-100 p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-5xl mx-auto"
      >
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h1 className="text-4xl font-bold text-zinc-900 mb-2">
            ✅ Mera Assignments
          </h1>
          <p className="text-zinc-600 text-lg">
            Aaj ke tasks dekho aur kaam complete karo
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid md:grid-cols-3 gap-6 mb-10"
        >
          {/* Pending Card */}
          <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-6 text-white shadow-lg">
            <p className="text-red-100 text-sm font-mono uppercase tracking-wider mb-2">Pending</p>
            <p className="text-5xl font-bold">{pendingTasks}</p>
            <p className="text-red-100 text-sm mt-2">Tasks assigned</p>
          </div>

          {/* In Progress Card */}
          <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl p-6 text-white shadow-lg">
            <p className="text-yellow-100 text-sm font-mono uppercase tracking-wider mb-2">In Progress</p>
            <p className="text-5xl font-bold">{inProgressTasks}</p>
            <p className="text-yellow-100 text-sm mt-2">Being worked on</p>
          </div>

          {/* Urgent Card */}
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white shadow-lg">
            <p className="text-orange-100 text-sm font-mono uppercase tracking-wider mb-2">🚨 Urgent</p>
            <p className="text-5xl font-bold">{urgentCount}</p>
            <p className="text-orange-100 text-sm mt-2">High priority</p>
          </div>
        </motion.div>

        {/* Tasks List Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <h2 className="text-2xl font-bold text-zinc-900 uppercase tracking-wider">
            📋 All Tasks ({tasks.length})
          </h2>
        </motion.div>

        {/* Tasks Grid */}
        <div className="space-y-4">
          {tasks.map((task, idx) => {
            const scheme = getColorScheme(task.color);
            return (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + idx * 0.08 }}
                whileHover={{ scale: 1.02, y: -4 }}
                onClick={() => navigate(`/worker/task/${task.id.replace('#', '')}`)}
                className={`${scheme.bg} ${scheme.border} border-2 rounded-2xl p-6 cursor-pointer transition-all shadow-sm ${scheme.hover}`}
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-start gap-4 flex-1">
                    {/* Icon */}
                    <div className="text-4xl">{task.icon}</div>

                    {/* Task Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-mono text-sm font-bold text-zinc-600">
                          ID: {task.id}
                        </span>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${scheme.badge}`}
                        >
                          {task.urgency === 'HIGH' && '🔴 HIGH'}
                          {task.urgency === 'MED' && '🟠 MEDIUM'}
                        </span>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${
                            task.status === 'assigned'
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-green-100 text-green-700'
                          }`}
                        >
                          {task.status === 'assigned' ? '⏳ Assigned' : '⚙️ In Progress'}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-zinc-900 mb-2">
                        {task.title}
                      </h3>
                      <p className="text-zinc-600 font-medium">
                        📍 {task.location}
                      </p>
                    </div>
                  </div>

                  {/* Days Left Badge */}
                  <div className="text-center">
                    <p className="text-3xl font-bold text-zinc-900">
                      {task.days}
                    </p>
                    <p className="text-xs text-zinc-600 font-medium">
                      days left
                    </p>
                  </div>
                </div>

                {/* Action Area */}
                <div className="flex gap-3 pt-4 border-t border-current border-opacity-20">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/worker/task/${task.id.replace('#', '')}`);
                    }}
                    className="flex-1 px-4 py-2 rounded-lg bg-white border-2 border-current border-opacity-30 font-bold text-zinc-900 hover:bg-zinc-50 transition-all"
                  >
                    👁️ View Details
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/worker/upload/${task.id.replace('#', '')}`);
                    }}
                    className="flex-1 px-4 py-2 rounded-lg bg-green-600 text-white font-bold hover:bg-green-700 transition-all"
                  >
                    📸 Upload Work
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default WorkerTasks;
