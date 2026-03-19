import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const UploadCompletion = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [afterPhotos, setAfterPhotos] = useState([]);
  const [workerNotes, setWorkerNotes] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);

  // Mock complaint data - In real app, fetch from API
  const complaint = {
    id: `#${id}`,
    title: 'Street Light Band Hai',
    location: 'Park Lane, Ward 14',
    beforePhoto: '💡',
    beforeDate: '20 Feb 2026, 6:32 PM',
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (afterPhotos.length === 0) {
      alert('Please upload at least one after photo');
      return;
    }
    if (!workerNotes.trim()) {
      alert('Please write notes about the work done');
      return;
    }

    setLoading(true);
    try {
      // In real app, send to backend
      const formData = new FormData();
      formData.append('complaint_id', id);
      formData.append('worker_notes', workerNotes);
      afterPhotos.forEach((photo, idx) => {
        formData.append(`after_photos`, photo);
      });

      console.log('Uploading work completion:', formData);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      navigate('/worker/dashboard');
    } catch (err) {
      console.error('Upload failed:', err);
      alert('Failed to upload. Please try again.');
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
      setAfterPhotos([...afterPhotos, ...imageFiles.slice(0, 5 - afterPhotos.length)]);
    }
  };

  const handleFileInput = (e) => {
    const files = [...e.target.files];
    const imageFiles = files.filter((file) => file.type.startsWith('image/'));
    if (imageFiles.length > 0) {
      setAfterPhotos([...afterPhotos, ...imageFiles.slice(0, 5 - afterPhotos.length)]);
    }
  };

  const removePhoto = (index) => {
    setAfterPhotos(afterPhotos.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-3xl mx-auto"
      >
        {/* Back Button */}
        <motion.button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-zinc-600 hover:text-zinc-900 mb-6 font-medium"
        >
          ← Back to Tasks
        </motion.button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-zinc-900 mb-2">
            ✅ Mark Work as Complete
          </h1>
          <p className="text-zinc-600 text-lg">
            Apna kaam ke baad ke photo upload karo aur notes likho
          </p>
        </motion.div>

        {/* Complaint Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl border border-zinc-200 p-6 mb-8 shadow-sm"
        >
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div>
              <p className="text-zinc-500 text-sm font-mono mb-1">COMPLAINT ID</p>
              <h3 className="text-xl font-bold text-zinc-900 mb-4">{complaint.id}</h3>
              <p className="text-lg font-semibold text-zinc-900 mb-2">
                {complaint.title}
              </p>
              <p className="text-zinc-600 text-sm">
                📍 {complaint.location}
              </p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <div className="text-6xl mb-3">{complaint.beforePhoto}</div>
              <p className="text-xs text-zinc-500 text-center">
                Citizen photo<br />{complaint.beforeDate}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl border border-zinc-200 p-8 shadow-sm space-y-8"
        >
          {/* Worker Notes */}
          <div>
            <label className="block text-base font-bold text-zinc-900 mb-3">
              Kya kaam kiya? Likho notes <span className="text-red-500">*</span>
            </label>
            <textarea
              value={workerNotes}
              onChange={(e) => setWorkerNotes(e.target.value)}
              placeholder="Example: Light bulb replace kar diya. Wire connection bhi theek kiya. Ab sahi kaam kar raha hai."
              rows={5}
              required
              className="w-full px-4 py-3 rounded-lg border border-zinc-300 text-zinc-900 placeholder-zinc-400 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all resize-none"
            />
          </div>

          {/* After Photo Upload */}
          <div>
            <label className="block text-base font-bold text-zinc-900 mb-4">
              📸 Finished Work Photo <span className="text-red-500">*</span>
            </label>

            <motion.div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              animate={{
                borderColor: dragActive
                  ? 'rgb(34, 197, 94)'
                  : 'rgb(203, 213, 225)',
                backgroundColor: dragActive
                  ? 'rgb(240, 253, 244)'
                  : 'rgb(249, 250, 251)',
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
                  Finished work photo drag karo ya click karo
                </p>
                <p className="text-zinc-500 text-sm">
                  Max 5 photos, PNG/JPG (5MB each)
                </p>
              </label>
            </motion.div>

            {/* Photo Previews */}
            {afterPhotos.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6"
              >
                {afterPhotos.map((photo, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative group"
                  >
                    <img
                      src={URL.createObjectURL(photo)}
                      alt={`After ${idx + 1}`}
                      className="w-full h-32 object-cover rounded-lg border border-zinc-200"
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
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading || afterPhotos.length === 0 || !workerNotes.trim()}
            type="submit"
            className="w-full py-4 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white font-bold text-lg transition-all disabled:opacity-50 hover:shadow-lg"
          >
            {loading ? '⏳ Uploading...' : '✅ Mark Work as Done'}
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

export default UploadCompletion;
