import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const ReRaise = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [reason, setReason] = useState('');
  const [photos, setPhotos] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!reason.trim()) {
      alert('Please describe the problem');
      return;
    }
    setLoading(true);

    try {
      const reraiseData = {
        complaintId: id,
        reason,
        photos,
      };
      console.log('Re-raising with data:', reraiseData);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      navigate('/citizen/my-complaints');
    } catch (err) {
      console.error('Re-raise failed:', err);
      alert('Failed to re-raise complaint. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = [...e.dataTransfer.files];
    const imageFiles = files.filter((file) => file.type.startsWith('image/'));
    if (imageFiles.length > 0) {
      setPhotos([...photos, ...imageFiles.slice(0, 3 - photos.length)]);
    }
  };

  const handleFileInput = (e) => {
    const files = [...e.target.files];
    const imageFiles = files.filter((file) => file.type.startsWith('image/'));
    if (imageFiles.length > 0) {
      setPhotos([...photos, ...imageFiles.slice(0, 3 - photos.length)]);
    }
  };

  const removePhoto = (index) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-orange-50 p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-2xl mx-auto"
      >
        {/* Back Button */}
        <motion.button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-zinc-600 hover:text-zinc-900 mb-6 font-medium"
        >
          ← Back to My Complaints
        </motion.button>

        {/* Header Card */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-rose-100 to-pink-100 rounded-2xl p-6 mb-8 border border-rose-200 shadow-sm"
        >
          <div className="flex items-start gap-4">
            <div className="text-3xl">📋</div>
            <div>
              <h1 className="text-2xl font-bold text-rose-700 mb-1">Citizen Re-Raise Form</h1>
              <p className="text-rose-600 text-base">
                Agar citizen satisfied nahi hai – ye form bharta hai
              </p>
            </div>
          </div>
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl border border-zinc-200 p-8 shadow-sm space-y-8"
        >
          {/* Problem Description */}
          <div>
            <label className="block text-base font-bold text-zinc-900 mb-3">
              Kya problem abhi bhi hai? <span className="text-red-500">*</span>
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Light thodi der baad band ho jati hai, puri tarah fix nahi hui..."
              rows={5}
              required
              className="w-full px-4 py-3 rounded-lg border border-zinc-300 text-zinc-900 placeholder-zinc-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 transition-all resize-none"
            />
          </div>

          {/* Photo Upload */}
          <div>
            <label className="flex items-center gap-2 text-base font-bold text-zinc-900 mb-4">
              📸 Naya Photo <span className="text-zinc-500 font-normal">(optional)</span>
            </label>

            <motion.div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              animate={{
                borderColor: dragActive ? 'rgb(168, 85, 247)' : 'rgb(203, 213, 225)',
                backgroundColor: dragActive ? 'rgb(243, 232, 255)' : 'rgb(249, 250, 251)',
              }}
              className="border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all"
            >
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileInput}
                className="hidden"
                id="photo-input"
              />
              <label htmlFor="photo-input" className="cursor-pointer block">
                <div className="text-4xl mb-3">📷</div>
                <p className="text-zinc-900 font-semibold mb-1">
                  Current situation ki photo attach karo
                </p>
                <p className="text-zinc-500 text-sm">
                  Max 3 photos, PNG/JPG (5MB each)
                </p>
              </label>
            </motion.div>

            {/* Photo Previews */}
            {photos.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-3 gap-4 mt-6"
              >
                {photos.map((photo, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative group"
                  >
                    <img
                      src={URL.createObjectURL(photo)}
                      alt={`Preview ${idx + 1}`}
                      className="w-full h-24 object-cover rounded-lg border border-zinc-200"
                    />
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => removePhoto(idx)}
                      type="button"
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ✕
                    </motion.button>
                    <p className="text-xs text-zinc-500 mt-1 truncate">
                      {photo.name}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading || !reason.trim()}
            type="submit"
            className="w-full py-4 rounded-xl bg-gradient-to-r from-red-500 to-red-600 text-white font-bold text-lg transition-all disabled:opacity-50 hover:shadow-lg"
          >
            {loading ? '⏳ Submitting...' : '📋 Re-Raise Complaint'}
          </motion.button>

          <motion.button
            type="button"
            onClick={() => navigate(-1)}
            className="w-full py-3 rounded-xl border-2 border-zinc-300 text-zinc-700 font-bold hover:bg-zinc-50 transition-all"
          >
            Cancel
          </motion.button>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default ReRaise;
