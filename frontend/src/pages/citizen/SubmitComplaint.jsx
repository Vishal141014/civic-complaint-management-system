import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import PageHeader from '../../components/PageHeader';
import PhotoUpload from '../../components/PhotoUpload';

const SubmitComplaint = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    category: '',
    address: '',
    description: '',
  });
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);

  const categories = [
    'Road Damage',
    'Water Supply',
    'Street Light',
    'Electricity',
    'Waste Management',
    'Other',
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotosUpload = (files) => {
    setPhotos(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Mock API call
      const formDataToSend = new FormData();
      formDataToSend.append('category', formData.category);
      formDataToSend.append('address', formData.address);
      formDataToSend.append('description', formData.description);
      photos.forEach((photo, idx) => {
        formDataToSend.append(`photos[${idx}]`, photo);
      });

      await new Promise(resolve => setTimeout(resolve, 1500)); // Mock delay
      navigate('/citizen/my-complaints');
    } catch (err) {
      console.error('Submit failed:', err);
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
        title="Submit Complaint"
        subtitle="Report a civic issue in your area"
      />

      <div className="max-w-2xl mx-auto">
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl backdrop-blur-xl bg-white/10 border border-white/20 p-8 space-y-6"
        >
          {/* Category */}
          <div>
            <label className="block text-sm font-bold text-white mb-2">
              Category <span className="text-saffron">*</span>
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:border-saffron focus:ring-2 focus:ring-saffron/20"
            >
              <option value="">Select Category</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-bold text-white mb-2">
              Location / Address <span className="text-saffron">*</span>
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Enter complete address"
              required
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-navy-400 focus:border-saffron focus:ring-2 focus:ring-saffron/20"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-bold text-white mb-2">
              Description <span className="text-saffron">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe the issue in detail..."
              rows={4}
              required
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-navy-400 focus:border-saffron focus:ring-2 focus:ring-saffron/20 resize-none"
            />
          </div>

          {/* Photos */}
          <div>
            <label className="block text-sm font-bold text-white mb-4">
              Before Photos <span className="text-saffron">*</span>
            </label>
            <PhotoUpload
              maxFiles={3}
              maxSizeMB={5}
              onUpload={handlePhotosUpload}
            />
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading || !formData.category || !formData.address || !formData.description}
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold transition-all disabled:opacity-50"
          >
            {loading ? 'Submitting...' : 'Submit Complaint'}
          </motion.button>
        </motion.form>
      </div>
    </motion.div>
  );
};

export default SubmitComplaint;
