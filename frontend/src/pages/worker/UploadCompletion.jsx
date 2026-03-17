import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import PageHeader from '../../components/PageHeader';
import PhotoUpload from '../../components/PhotoUpload';

const UploadCompletion = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (photos.length === 0) {
        alert('Please upload at least one photo');
        setLoading(false);
        return;
      }

      // Mock API call
      const formData = new FormData();
      formData.append('complaint_id', id);
      photos.forEach((photo, idx) => {
        formData.append(`after_photos[${idx}]`, photo);
      });

      await new Promise(resolve => setTimeout(resolve, 1500));
      navigate('/worker/tasks');
    } catch (err) {
      console.error('Upload failed:', err);
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
        title="Upload Completion Photos"
        subtitle={`Complaint ID: ${id}`}
      />

      <div className="max-w-2xl mx-auto">
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl backdrop-blur-xl bg-white/10 border border-white/20 p-8 space-y-6"
        >
          <div className="bg-green-500/10 border border-green-500/50 rounded-xl p-4">
            <p className="text-green-300 text-sm">
              ✓ Upload clear photos of the completed work from multiple angles
            </p>
          </div>

          {/* Photo Upload */}
          <div>
            <label className="block text-sm font-bold text-white mb-4">
              After Photos <span className="text-saffron">*</span>
            </label>
            <PhotoUpload
              maxFiles={5}
              maxSizeMB={5}
              onUpload={setPhotos}
            />
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading || photos.length === 0}
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-green-600 to-green-700 text-white font-bold transition-all disabled:opacity-50"
          >
            {loading ? 'Uploading...' : '📤 Mark Work Done'}
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

export default UploadCompletion;
