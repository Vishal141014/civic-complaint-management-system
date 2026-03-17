import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import PageHeader from '../../components/PageHeader';
import StatusBadge from '../../components/StatusBadge';

const TaskDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [workNotes, setWorkNotes] = useState('');
  const [saving, setSaving] = useState(false);

  const task = {
    id: id,
    category: 'Road Damage',
    address: '123 Main Street, Downtown',
    description: 'Large pothole causing accidents',
    deadline: '2024-01-25',
    status: 'assigned',
    citizenName: 'John Doe',
    beforePhoto: 'https://via.placeholder.com/400x300?text=Before',
  };

  const handleSaveNotes = async () => {
    setSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSaving(false);
    } catch (err) {
      console.error('Save failed:', err);
      setSaving(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pb-12"
    >
      <PageHeader
        title="Task Details"
        subtitle={`Complaint ID: ${task.id}`}
      />

      <div className="max-w-4xl mx-auto space-y-6">
        {/* Task Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl backdrop-blur-xl bg-white/10 border border-white/20 p-8"
        >
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <p className="text-sm text-navy-400">Category</p>
              <p className="text-xl font-bold text-white">{task.category}</p>
            </div>
            <div>
              <p className="text-sm text-navy-400">Status</p>
              <StatusBadge status={task.status} />
            </div>
            <div>
              <p className="text-sm text-navy-400">Deadline</p>
              <p className="text-white">{new Date(task.deadline).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm text-navy-400">Citizen</p>
              <p className="text-white">{task.citizenName}</p>
            </div>
          </div>

          <div>
            <p className="text-sm text-navy-400 mb-2">Location</p>
            <p className="text-white">{task.address}</p>
          </div>

          <div className="mt-4">
            <p className="text-sm text-navy-400 mb-2">Issue Description</p>
            <p className="text-white">{task.description}</p>
          </div>
        </motion.div>

        {/* Before Photo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-3xl backdrop-blur-xl bg-white/10 border border-white/20 p-8"
        >
          <h3 className="text-2xl font-bold text-white mb-4">Current Situation</h3>
          <img src={task.beforePhoto} alt="Current" className="w-full rounded-xl" />
        </motion.div>

        {/* Work Notes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-3xl backdrop-blur-xl bg-white/10 border border-white/20 p-8"
        >
          <h3 className="text-2xl font-bold text-white mb-4">Work Notes</h3>
          <textarea
            value={workNotes}
            onChange={(e) => setWorkNotes(e.target.value)}
            placeholder="Document your work progress, challenges, and next steps..."
            rows={6}
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-navy-400 focus:border-saffron focus:ring-2 focus:ring-saffron/20 resize-none"
          />
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSaveNotes}
            disabled={saving}
            className="mt-4 px-6 py-3 rounded-xl bg-saffron/20 text-saffron font-bold hover:bg-saffron/30 transition-all disabled:opacity-50"
          >
            {saving ? 'Saving...' : '💾 Save Notes'}
          </motion.button>
        </motion.div>

        {/* Actions */}
        <div className="flex gap-4 flex-wrap">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/worker/tasks')}
            className="px-6 py-3 rounded-xl bg-white/10 border border-white/20 text-white font-bold hover:bg-white/20"
          >
            ← Back
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(`/worker/upload/${task.id}`)}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-green-600 to-green-700 text-white font-bold hover:from-green-700 hover:to-green-800"
          >
            📸 Upload Completion Photos
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskDetail;
