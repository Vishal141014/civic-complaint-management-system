import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import PageHeader from '../../components/PageHeader';
import PhotoUpload from '../../components/PhotoUpload';

const ReRaise = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [reason, setReason] = useState('');
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Prepare reraise data with photos
      const reraiseData = {
        id,
        reason,
        photos,
      };

      // Call API to reraise complaint
      console.log('Re-raising with data:', reraiseData);
      await new Promise(resolve => setTimeout(resolve, 1500));
      navigate('/citizen/my-complaints');
    } catch (err) {
      console.error('Re-raise failed:', err);
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
        title="Re-raise Complaint"
        subtitle={`Original ID: ${id}`}
      />

      <div className="max-w-2xl mx-auto">
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl backdrop-blur-xl bg-white/10 border border-white/20 p-8 space-y-6"
        >
          <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-4">
            <p className="text-red-300 text-sm">
              ⚠️ You are re-raising this complaint because the work was not completed properly.
            </p>
          </div>

          {/* Reason */}
          <div>
            <label className="block text-sm font-bold text-white mb-2">
              Reason for Re-raising <span className="text-saffron">*</span>
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Explain why the complaint needs to be re-raised..."
              rows={4}
              required
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-navy-400 focus:border-saffron focus:ring-2 focus:ring-saffron/20 resize-none"
            />
          </div>

          {/* New Photos */}
          <div>
            <label className="block text-sm font-bold text-white mb-4">
              New Photos <span className="text-saffron">*</span>
            </label>
            <PhotoUpload
              maxFiles={3}
              maxSizeMB={5}
              onUpload={setPhotos}
            />
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading || !reason}
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-red-600 to-red-700 text-white font-bold transition-all disabled:opacity-50"
          >
            {loading ? 'Submitting...' : 'Re-raise Complaint'}
          </motion.button>

          <motion.button
            type="button"
            onClick={() => navigate(-1)}
            className="w-full py-3 rounded-xl bg-white/10 border border-white/20 text-white font-bold hover:bg-white/20"
          >
            Cancel
          </motion.button>
        </motion.form>
      </div>
    </motion.div>
  );
};

export default ReRaise;
