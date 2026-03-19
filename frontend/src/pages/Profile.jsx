import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import axios from '../config/axios';

const Profile = () => {
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // For phone, only allow digits and max 10
    if (name === 'phone') {
      const digitsOnly = value.replace(/\D/g, '').slice(0, 10);
      setFormData(prev => ({ ...prev, [name]: digitsOnly }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      // Validate phone
      if (!formData.phone || formData.phone.length !== 10) {
        setError('Phone number must be exactly 10 digits');
        setLoading(false);
        return;
      }

      // Update profile via API
      const response = await axios.put('/users/profile', {
        name: formData.name,
        phone: formData.phone,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      setSuccess('✅ Profile updated successfully! Phone number saved.');
      
      // Refresh user in context by calling verify endpoint
      const verifyResponse = await axios.get('/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      setTimeout(() => {
        navigate('/citizen/my-complaints');
      }, 2000);
    } catch (err) {
      console.error('Update failed:', err);
      if (err.response?.data?.detail) {
        setError(err.response.data.detail);
      } else if (err.response?.status === 404) {
        // If endpoint doesn't exist yet, show message
        setError('Profile update endpoint not yet implemented on backend. Phone number must be updated during login/registration.');
      } else {
        setError('Failed to update profile. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 pt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-zinc-600 hover:text-zinc-900 mb-6 font-medium"
        >
          ← Back
        </button>

        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 p-8 mb-6">
          <h1 className="text-3xl font-bold text-zinc-900 mb-2 flex items-center gap-3">
            <span className="text-4xl">👤</span> My Profile
          </h1>
          <p className="text-zinc-600">Update your information</p>
        </div>

        {/* Success Message */}
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 text-green-700 font-semibold"
          >
            {success}
          </motion.div>
        )}

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-red-700 font-semibold"
          >
            {error}
          </motion.div>
        )}

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-sm border border-zinc-200 p-8 space-y-6"
        >
          {/* Name */}
          <div>
            <label className="block text-sm font-bold text-zinc-900 mb-2">
              Full Name / पूरा नाम
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-zinc-300 text-zinc-900 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
            />
          </div>

          {/* Email (Read-only) */}
          <div>
            <label className="block text-sm font-bold text-zinc-900 mb-2">
              Email Address / ईमेल
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              readOnly
              className="w-full px-4 py-3 rounded-lg border border-zinc-300 text-zinc-900 bg-zinc-100 cursor-not-allowed"
            />
            <p className="text-xs text-zinc-500 mt-1">Email cannot be changed</p>
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-bold text-zinc-900 mb-2">
              Phone Number / फोन नंबर <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter 10-digit phone number"
              maxLength="10"
              required
              className="w-full px-4 py-3 rounded-lg border border-zinc-300 text-zinc-900 placeholder-zinc-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
            />
            <div className="flex justify-between items-center mt-2">
              <p className="text-xs text-zinc-500">10 digits required. Example: 9876543210</p>
              <span className="text-xs font-semibold text-zinc-600">{formData.phone.length}/10</span>
            </div>
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-700">
              <strong>ℹ️ Important:</strong> Your phone number is required for submitting complaints and communication with authorities. Please ensure it's correct and up-to-date.
            </p>
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-lg transition-all disabled:opacity-50 hover:shadow-lg"
          >
            {loading ? '💾 Saving...' : '💾 Save Changes'}
          </motion.button>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default Profile;
