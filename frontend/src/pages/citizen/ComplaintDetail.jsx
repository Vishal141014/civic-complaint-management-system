import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import StatusBadge from '../../components/StatusBadge';

const ComplaintDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const complaint = {
    id: id,
    category: 'Road Damage',
    address: '123 Main Street, Downtown',
    description: 'Large pothole causing accidents',
    status: 'resolved',
    date: '2024-01-15',
    workerNotes: 'Repaired the pothole on 2024-01-20',
    beforePhoto: 'https://via.placeholder.com/400x300?text=Before',
    afterPhoto: 'https://via.placeholder.com/400x300?text=After',
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pb-12"
    >
      <PageHeader
        title="Complaint Details"
        subtitle={`ID: ${complaint.id}`}
      />

      <div className="max-w-4xl mx-auto space-y-6">
        {/* Main Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl backdrop-blur-xl bg-white/10 border border-white/20 p-8"
        >
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <p className="text-sm text-navy-400">Category</p>
              <p className="text-xl font-bold text-white">{complaint.category}</p>
            </div>
            <div>
              <p className="text-sm text-navy-400">Status</p>
              <StatusBadge status={complaint.status} />
            </div>
            <div>
              <p className="text-sm text-navy-400">Location</p>
              <p className="text-white">{complaint.address}</p>
            </div>
            <div>
              <p className="text-sm text-navy-400">Submitted</p>
              <p className="text-white">{new Date(complaint.date).toLocaleDateString()}</p>
            </div>
          </div>

          <div>
            <p className="text-sm text-navy-400 mb-2">Description</p>
            <p className="text-white">{complaint.description}</p>
          </div>
        </motion.div>

        {/* Photos Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-3xl backdrop-blur-xl bg-white/10 border border-white/20 p-8"
        >
          <h3 className="text-2xl font-bold text-white mb-6">Before & After</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-navy-400 mb-2">Before</p>
              <img
                src={complaint.beforePhoto}
                alt="Before"
                className="w-full rounded-xl"
              />
            </div>
            <div>
              <p className="text-sm text-navy-400 mb-2">After</p>
              <img
                src={complaint.afterPhoto}
                alt="After"
                className="w-full rounded-xl"
              />
            </div>
          </div>
        </motion.div>

        {/* Worker Notes */}
        {complaint.workerNotes && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-3xl backdrop-blur-xl bg-white/10 border border-white/20 p-8"
          >
            <h3 className="text-2xl font-bold text-white mb-4">Work Notes</h3>
            <p className="text-white">{complaint.workerNotes}</p>
          </motion.div>
        )}

        {/* Actions */}
        <div className="flex gap-4 flex-wrap">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/citizen/my-complaints')}
            className="px-6 py-3 rounded-xl bg-white/10 border border-white/20 text-white font-bold hover:bg-white/20"
          >
            ← Back
          </motion.button>
          {complaint.status === 'resolved' && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(`/citizen/reraise/${complaint.id}`)}
              className="px-6 py-3 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700"
            >
              Re-raise Complaint
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ComplaintDetail;
