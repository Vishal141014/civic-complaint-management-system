import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import PageHeader from '../../components/PageHeader';

const ReviewComplaint = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [decision, setDecision] = useState('');
  const [rejectReason, setRejectReason] = useState('');
  const [loading, setLoading] = useState(false);

  const complaint = {
    id: id,
    citizenName: 'John Doe',
    category: 'Road Damage',
    workerName: 'Worker A',
    workerNotes: 'Filled and leveled the pothole',
    beforePhoto: 'https://via.placeholder.com/400x300?text=Before',
    afterPhoto: 'https://via.placeholder.com/400x300?text=After',
  };

  const handleReview = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (decision === 'reject' && !rejectReason) {
        alert('Please provide a reason for rejection');
        setLoading(false);
        return;
      }
      await new Promise(resolve => setTimeout(resolve, 1500));
      navigate('/admin/dashboard');
    } catch (err) {
      console.error('Review failed:', err);
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
        title="Review Complaint"
        subtitle={`Complaint ID: ${complaint.id}`}
      />

      <div className="max-w-4xl mx-auto space-y-6">
        {/* Photo Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl backdrop-blur-xl bg-white/10 border border-white/20 p-8"
        >
          <h3 className="text-2xl font-bold text-white mb-6">Before & After Comparison</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-navy-400 mb-2">Before</p>
              <img src={complaint.beforePhoto} alt="Before" className="w-full rounded-xl" />
            </div>
            <div>
              <p className="text-sm text-navy-400 mb-2">After</p>
              <img src={complaint.afterPhoto} alt="After" className="w-full rounded-xl" />
            </div>
          </div>
        </motion.div>

        {/* Worker Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-3xl backdrop-blur-xl bg-white/10 border border-white/20 p-8"
        >
          <h3 className="text-xl font-bold text-white mb-4">Worker Details</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-navy-400">Worker</p>
              <p className="text-white font-bold">{complaint.workerName}</p>
            </div>
            <div>
              <p className="text-sm text-navy-400">Category</p>
              <p className="text-white">{complaint.category}</p>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm text-navy-400 mb-2">Work Notes</p>
            <p className="text-white">{complaint.workerNotes}</p>
          </div>
        </motion.div>

        {/* Review Form */}
        <motion.form
          onSubmit={handleReview}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-3xl backdrop-blur-xl bg-white/10 border border-white/20 p-8 space-y-6"
        >
          <h3 className="text-xl font-bold text-white">Your Decision</h3>

          {/* Decision Buttons */}
          <div className="flex gap-4">
            <motion.label
              whileHover={{ y: -2 }}
              className="flex-1 flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all"
              style={{
                borderColor: decision === 'approve' ? '#00A86B' : 'rgba(255, 255, 255, 0.1)',
                backgroundColor: decision === 'approve' ? 'rgba(0, 168, 107, 0.1)' : 'transparent',
              }}
            >
              <input
                type="radio"
                name="decision"
                value="approve"
                checked={decision === 'approve'}
                onChange={(e) => setDecision(e.target.value)}
                className="w-4 h-4"
              />
              <span className="ml-3 font-bold text-white">✓ Approve</span>
            </motion.label>

            <motion.label
              whileHover={{ y: -2 }}
              className="flex-1 flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all"
              style={{
                borderColor: decision === 'reject' ? '#EF4444' : 'rgba(255, 255, 255, 0.1)',
                backgroundColor: decision === 'reject' ? 'rgba(239, 68, 68, 0.1)' : 'transparent',
              }}
            >
              <input
                type="radio"
                name="decision"
                value="reject"
                checked={decision === 'reject'}
                onChange={(e) => setDecision(e.target.value)}
                className="w-4 h-4"
              />
              <span className="ml-3 font-bold text-white">✕ Reject</span>
            </motion.label>
          </div>

          {/* Rejection Reason (if needed) */}
          {decision === 'reject' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
            >
              <label className="block text-sm font-bold text-white mb-2">
                Reason for Rejection <span className="text-red-500">*</span>
              </label>
              <textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="Explain why this work is not acceptable..."
                rows={4}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-navy-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 resize-none"
              />
            </motion.div>
          )}

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading || !decision}
            type="submit"
            className={`w-full py-3 rounded-xl text-white font-bold transition-all disabled:opacity-50 ${
              decision === 'approve'
                ? 'bg-gradient-to-r from-green-600 to-green-700'
                : decision === 'reject'
                ? 'bg-gradient-to-r from-red-600 to-red-700'
                : 'bg-gray-600'
            }`}
          >
            {loading ? 'Submitting...' : decision === 'approve' ? 'Approve Work' : decision === 'reject' ? 'Reject & Re-assign' : 'Select Decision'}
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

export default ReviewComplaint;
