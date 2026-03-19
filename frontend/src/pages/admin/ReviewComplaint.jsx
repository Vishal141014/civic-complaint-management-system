import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const ReviewComplaint = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [decision, setDecision] = useState('');
  const [rejectReason, setRejectReason] = useState('');
  const [loading, setLoading] = useState(false);

  const complaint = {
    id: '#4815',
    issue: '💡 Street Light Band Hai',
    worker: '👷 Suresh Kumar',
    area: '📍 Park Lane, Ward 14',
    status: 'Pending Review',
    beforePhoto: '/placeholder-before.jpg',
    afterPhoto: '/placeholder-after.jpg',
    beforeDate: '20 Feb 2026, 6:32 PM',
    afterDate: '22 Feb 2026, 3:15 PM',
    beforeUploadedBy: 'Anil Sharma (Citizen)',
    afterUploadedBy: 'Suresh Kumar (Worker)',
    workerNotes: '"Street light bulb replace kar diya gaya hai. Wire connection bhi theek kiya. Ab sahi kaam kar raha hai"',
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-5xl mx-auto"
      >
        {/* Back Button */}
        <motion.button
          onClick={() => navigate('/admin/dashboard')}
          className="flex items-center gap-2 text-zinc-600 hover:text-zinc-900 mb-6 font-medium"
        >
          ← Back to Dashboard
        </motion.button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-zinc-900 mb-2">
            📸 Photo Review — Admin Approval
          </h1>
          <p className="text-zinc-600 text-lg">
            Before vs After compare karke APPROVE ya REJECT karo
          </p>
        </motion.div>

        {/* Complaint Info Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-zinc-950 rounded-2xl p-6 mb-8 text-white"
        >
          <div className="flex items-center justify-between flex-wrap gap-6">
            <div className="flex items-center justify-between flex-1 gap-8">
              <div>
                <p className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-1">COMPLAINT ID</p>
                <p className="text-2xl font-bold">{complaint.id}</p>
              </div>
              <div className="h-12 w-px bg-zinc-700" />
              <div>
                <p className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-1">ISSUE</p>
                <p className="text-lg font-bold">{complaint.issue}</p>
              </div>
              <div className="h-12 w-px bg-zinc-700" />
              <div>
                <p className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-1">WORKER</p>
                <p className="text-lg font-bold">{complaint.worker}</p>
              </div>
              <div className="h-12 w-px bg-zinc-700" />
              <div>
                <p className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-1">AREA</p>
                <p className="text-lg font-bold">{complaint.area}</p>
              </div>
            </div>
            <motion.span
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="px-4 py-2 rounded-full bg-yellow-500 text-zinc-900 font-bold text-sm whitespace-nowrap"
            >
              ⏳ {complaint.status}
            </motion.span>
          </div>
        </motion.div>

        {/* Before vs After Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-sm border border-zinc-200 p-8 mb-8"
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-zinc-900">Before vs After Comparison</h2>
            <p className="text-sm text-zinc-500 font-medium">Uploaded: 2 hours ago</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Before */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="mb-4 flex items-center gap-2">
                <span className="text-red-600 font-mono font-bold text-sm">━━ BEFORE — CITIZEN PHOTO</span>
              </div>
              <div className="h-64 bg-gradient-to-br from-red-100 to-pink-100 rounded-xl flex items-center justify-center mb-4 border-2 border-dashed border-red-200">
                <div className="text-6xl">🔦</div>
              </div>
              <div className="space-y-2">
                <p className="text-xs text-zinc-600 font-medium">
                  <strong>Uploaded by:</strong> {complaint.beforeUploadedBy}
                </p>
                <p className="text-xs text-zinc-600 font-medium">
                  <strong>Date:</strong> {complaint.beforeDate}
                </p>
              </div>
            </motion.div>

            {/* After */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="mb-4 flex items-center gap-2">
                <span className="text-green-600 font-mono font-bold text-sm">✓ AFTER — WORKER PHOTO</span>
              </div>
              <div className="h-64 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl flex items-center justify-center mb-4 border-2 border-dashed border-green-200">
                <div className="text-6xl">💡</div>
              </div>
              <div className="space-y-2">
                <p className="text-xs text-zinc-600 font-medium">
                  <strong>Uploaded by:</strong> {complaint.afterUploadedBy}
                </p>
                <p className="text-xs text-zinc-600 font-medium">
                  <strong>Date:</strong> {complaint.afterDate}
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Worker Notes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl shadow-sm border border-zinc-200 p-8 mb-8"
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg">📝</span>
            <h3 className="text-lg font-bold text-zinc-900">WORKER NOTES</h3>
          </div>
          <p className="text-zinc-700 text-base leading-relaxed font-medium italic">
            {complaint.workerNotes}
          </p>
        </motion.div>

        {/* Decision Form */}
        <motion.form
          onSubmit={handleReview}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-2xl shadow-sm border border-zinc-200 p-8"
        >
          {/* Rejection Reason (if needed) */}
          {decision === 'reject' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mb-8"
            >
              <label className="block text-sm font-bold text-zinc-900 mb-3">
                Rejection Reason <span className="text-red-500">*</span>
              </label>
              <textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="Explain why this work needs to be redone..."
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-zinc-300 text-zinc-900 placeholder-zinc-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all resize-none"
              />
            </motion.div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setDecision('reject')}
              disabled={loading}
              type="button"
              className={`flex-1 py-4 rounded-lg font-bold text-lg transition-all border-2 ${
                decision === 'reject'
                  ? 'bg-red-50 border-red-500 text-red-700'
                  : 'bg-white border-red-300 text-red-600 hover:bg-red-50'
              }`}
            >
              ❌ Reject — Dobara Karo
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setDecision('approve')}
              disabled={loading}
              type="button"
              className={`flex-1 py-4 rounded-lg font-bold text-lg transition-all border-2 ${
                decision === 'approve'
                  ? 'bg-green-500 border-green-500 text-white'
                  : 'bg-white border-green-500 text-green-600 hover:bg-green-50'
              }`}
            >
              ✅ Approve — Resolved!
            </motion.button>
          </div>

          {/* Submit Section */}
          {decision && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 space-y-3"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={loading || (decision === 'reject' && !rejectReason)}
                type="submit"
                className={`w-full py-3 rounded-lg font-bold text-white transition-all ${
                  decision === 'approve'
                    ? 'bg-gradient-to-r from-green-500 to-green-600 hover:shadow-lg disabled:opacity-50'
                    : 'bg-gradient-to-r from-red-500 to-red-600 hover:shadow-lg disabled:opacity-50'
                }`}
              >
                {loading ? 'Processing...' : (decision === 'approve' ? '✅ Confirm Approval' : '❌ Confirm Rejection')}
              </motion.button>

              <motion.button
                type="button"
                onClick={() => {
                  setDecision('');
                  setRejectReason('');
                }}
                className="w-full py-3 rounded-lg border-2 border-zinc-300 text-zinc-700 font-bold hover:bg-zinc-50 transition-all"
              >
                Clear Selection
              </motion.button>
            </motion.div>
          )}
        </motion.form>
      </motion.div>
    </div>
  );
};

export default ReviewComplaint;
