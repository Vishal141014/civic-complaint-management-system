import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import PageHeader from '../../components/PageHeader';

const AssignComplaint = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedWorker, setSelectedWorker] = useState('');
  const [deadline, setDeadline] = useState('');
  const [loading, setLoading] = useState(false);

  const workers = [
    { id: 'W001', name: 'Worker A', specialization: 'Road & Highways' },
    { id: 'W002', name: 'Worker B', specialization: 'Water Supply' },
    { id: 'W003', name: 'Worker C', specialization: 'Electrical' },
  ];

  const handleAssign = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      navigate('/admin/dashboard');
    } catch (err) {
      console.error('Assign failed:', err);
    } finally {
      setLoading(false);
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
        title="Assign Complaint"
        subtitle={`Complaint ID: ${id}`}
      />

      <div className="max-w-2xl mx-auto">
        <motion.form
          onSubmit={handleAssign}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl backdrop-blur-xl bg-white/10 border border-white/20 p-8 space-y-6"
        >
          {/* Worker Selection */}
          <div>
            <label className="block text-sm font-bold text-white mb-2">
              Assign To Worker <span className="text-saffron">*</span>
            </label>
            <div className="space-y-3">
              {workers.map(worker => (
                <motion.label
                  key={worker.id}
                  whileHover={{ x: 4 }}
                  className="flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all"
                  style={{
                    borderColor: selectedWorker === worker.id ? '#FF6B00' : 'rgba(255, 255, 255, 0.1)',
                    backgroundColor: selectedWorker === worker.id ? 'rgba(255, 107, 0, 0.1)' : 'transparent',
                  }}
                >
                  <input
                    type="radio"
                    name="worker"
                    value={worker.id}
                    checked={selectedWorker === worker.id}
                    onChange={(e) => setSelectedWorker(e.target.value)}
                    className="w-4 h-4"
                  />
                  <div className="ml-4 flex-1">
                    <p className="font-bold text-white">{worker.name}</p>
                    <p className="text-sm text-navy-400">{worker.specialization}</p>
                  </div>
                </motion.label>
              ))}
            </div>
          </div>

          {/* Deadline */}
          <div>
            <label className="block text-sm font-bold text-white mb-2">
              Deadline <span className="text-saffron">*</span>
            </label>
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:border-saffron focus:ring-2 focus:ring-saffron/20"
            />
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading || !selectedWorker || !deadline}
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-saffron to-orange-600 text-white font-bold transition-all disabled:opacity-50"
          >
            {loading ? 'Assigning...' : 'Assign To Worker'}
          </motion.button>

          <motion.button
            type="button"
            onClick={() => navigate('/admin/dashboard')}
            className="w-full py-3 rounded-xl bg-white/10 border border-white/20 text-white font-bold hover:bg-white/20"
          >
            Cancel
          </motion.button>
        </motion.form>
      </div>
    </motion.div>
  );
};

export default AssignComplaint;
