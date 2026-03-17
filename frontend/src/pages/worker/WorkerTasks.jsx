import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import PageHeader from '../../components/PageHeader';
import StatusBadge from '../../components/StatusBadge';

const WorkerTasks = () => {
  const navigate = useNavigate();
  const { userId } = useAuth();
  const [tasks] = useState([
    {
      id: 'CMP-001',
      category: 'Road Damage',
      address: '123 Main Street',
      deadline: '2024-01-25',
      urgency: 'high',
      status: 'assigned',
      daysLeft: 2,
    },
    {
      id: 'CMP-004',
      category: 'Street Light',
      address: '456 Oak Ave',
      deadline: '2024-01-28',
      urgency: 'medium',
      status: 'assigned',
      daysLeft: 5,
    },
    {
      id: 'CMP-005',
      category: 'Water Supply',
      address: '789 Elm Road',
      deadline: '2024-01-20',
      urgency: 'high',
      status: 'in_progress',
      daysLeft: -1,
    },
  ]);

  const isOverdue = (daysLeft) => daysLeft < 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pb-12"
    >
      <PageHeader
        title="My Tasks"
        subtitle={`Worker ID: ${userId || 'Loading...'}`}
      />

      {/* Task Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Pending', value: tasks.filter(t => t.status === 'assigned').length, color: 'from-yellow-600' },
          { label: 'In Progress', value: tasks.filter(t => t.status === 'in_progress').length, color: 'from-blue-600' },
          { label: 'Overdue', value: tasks.filter(t => isOverdue(t.daysLeft)).length, color: 'from-red-600' },
        ].map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`rounded-2xl backdrop-blur-lg bg-gradient-to-br ${stat.color} to-transparent/10 border border-white/20 p-6 text-center`}
          >
            <p className="text-3xl font-bold text-white">{stat.value}</p>
            <p className="text-sm text-navy-300 mt-2">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Tasks List */}
      <div className="space-y-4">
        {tasks.map((task, idx) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ x: 4 }}
            onClick={() => navigate(`/worker/task/${task.id}`)}
            className={`cursor-pointer rounded-2xl backdrop-blur-lg border p-6 transition-all ${
              isOverdue(task.daysLeft)
                ? 'bg-red-500/10 border-red-500/30 hover:border-red-500/50'
                : task.urgency === 'high'
                ? 'bg-orange-500/10 border-orange-500/30 hover:border-orange-500/50'
                : 'bg-white/10 border-white/20 hover:border-white/40'
            }`}
          >
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <p className="text-sm font-mono text-navy-400">{task.id}</p>
                  {isOverdue(task.daysLeft) && <span className="text-red-400 text-xs font-bold">OVERDUE</span>}
                </div>
                <h3 className="text-lg font-bold text-white">{task.category}</h3>
              </div>
              <StatusBadge status={task.status} />
            </div>

            <p className="text-sm text-navy-300 mb-3">📍 {task.address}</p>

            <div className="flex items-center justify-between text-sm">
              <div className="flex gap-2">
                <span className="px-2 py-1 rounded bg-white/10 text-navy-300">
                  Deadline: {new Date(task.deadline).toLocaleDateString()}
                </span>
              </div>
              <span className={`font-bold ${isOverdue(task.daysLeft) ? 'text-red-400' : 'text-green-400'}`}>
                {isOverdue(task.daysLeft) ? `${Math.abs(task.daysLeft)} days overdue` : `${task.daysLeft} days left`}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default WorkerTasks;
