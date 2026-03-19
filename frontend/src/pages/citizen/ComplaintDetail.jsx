import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';

const ComplaintDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const complaint = {
    id: id,
    title: 'Paani Nahi Aa Raha',
    location: 'Sector 7, Rohini - Gate No.3',
    description: 'Tap se pani nahi aa raha, line pressure low hai',
    status: 'resolved',
    date: '20 Feb 2026',
    workerNotes: 'Pipeline repair complete. Water pressure restored.',
    beforePhoto: '🚰',
    afterPhoto: '💧',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 to-gray-100 p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-3xl mx-auto"
      >
        {/* Back Button */}
        <motion.button
          onClick={() => navigate('/citizen/my-complaints')}
          className="flex items-center gap-2 text-zinc-600 hover:text-zinc-900 mb-6 font-medium"
        >
          ← Back to My Complaints
        </motion.button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-zinc-900 mb-2">
            📋 Complaint Details
          </h1>
          <p className="text-zinc-600 text-lg">
            ID: <span className="font-mono font-bold">#{complaint.id}</span>
          </p>
        </motion.div>

        {/* Main Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl border border-zinc-200 p-8 shadow-sm mb-8"
        >
          <div className="space-y-6">
            {/* Title */}
            <div>
              <p className="text-zinc-500 text-sm font-mono uppercase tracking-wider mb-2">
                Problem
              </p>
              <p className="text-2xl font-bold text-zinc-900">{complaint.title}</p>
            </div>

            {/* Location */}
            <div>
              <p className="text-zinc-500 text-sm font-mono uppercase tracking-wider mb-2">
                Location
              </p>
              <p className="text-lg text-zinc-900">📍 {complaint.location}</p>
            </div>

            {/* Description */}
            <div>
              <p className="text-zinc-500 text-sm font-mono uppercase tracking-wider mb-2">
                Description
              </p>
              <p className="text-zinc-900 leading-relaxed">{complaint.description}</p>
            </div>

            {/* Meta Information */}
            <div className="grid md:grid-cols-3 gap-6 pt-6 border-t border-zinc-200">
              <div>
                <p className="text-zinc-500 text-sm font-mono uppercase tracking-wider mb-2">
                  Status
                </p>
                <span className="inline-block px-4 py-2 rounded-full bg-green-100 text-green-700 font-bold">
                  ✅ Resolved
                </span>
              </div>
              <div>
                <p className="text-zinc-500 text-sm font-mono uppercase tracking-wider mb-2">
                  Submitted On
                </p>
                <p className="text-zinc-900 font-medium">{complaint.date}</p>
              </div>
              <div>
                <p className="text-zinc-500 text-sm font-mono uppercase tracking-wider mb-2">
                  Resolution Time
                </p>
                <p className="text-zinc-900 font-medium">2 Days</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Before & After Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl border border-zinc-200 p-8 shadow-sm mb-8"
        >
          <h3 className="text-2xl font-bold text-zinc-900 mb-6">
            Before & After Comparison
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Before */}
            <div>
              <p className="text-zinc-600 font-bold mb-4">
                🔴 BEFORE — Citizen Photo
              </p>
              <div className="h-48 bg-gradient-to-br from-red-100 to-pink-100 rounded-xl flex items-center justify-center border-2 border-dashed border-red-200">
                <div className="text-6xl">{complaint.beforePhoto}</div>
              </div>
            </div>

            {/* After */}
            <div>
              <p className="text-zinc-600 font-bold mb-4">
                ✅ AFTER — Resolved
              </p>
              <div className="h-48 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl flex items-center justify-center border-2 border-dashed border-green-200">
                <div className="text-6xl">{complaint.afterPhoto}</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Worker Notes */}
        {complaint.workerNotes && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl border border-zinc-200 p-8 shadow-sm mb-8"
          >
            <h3 className="text-2xl font-bold text-zinc-900 mb-4">
              👷 Worker Notes
            </h3>
            <p className="text-zinc-700 leading-relaxed text-lg italic">
              "{complaint.workerNotes}"
            </p>
          </motion.div>
        )}

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex gap-4 flex-col sm:flex-row"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/citizen/my-complaints')}
            className="flex-1 px-6 py-3 rounded-lg border-2 border-zinc-300 text-zinc-700 font-bold hover:bg-zinc-50 transition-all"
          >
            ← Back to List
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(`/citizen/reraise/${complaint.id}`)}
            className="flex-1 px-6 py-3 rounded-lg bg-gradient-to-r from-red-500 to-red-600 text-white font-bold hover:shadow-lg transition-all"
          >
            📋 Re-Raise Complaint (Not Satisfied)
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ComplaintDetail;
