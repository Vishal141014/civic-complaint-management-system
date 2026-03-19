import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { DELHI_DEPARTMENTS, getCategoriesForDepartment } from '../../data/departments';
import { DELHI_REGIONS, getZones, getWards } from '../../data/delhiWards';
import axios from '../../config/axios';

const SubmitComplaint = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    region: '',
    zone: '',
    ward: '',
    department: '',
    category: '',
    description: '',
  });
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Pre-fill with user data
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || '',
        phone: user.phone || ''
      }));
    }
  }, [user]);

  // Get available zones and wards based on selections
  const availableZones = formData.region ? getZones(formData.region) : [];
  const availableWards = formData.zone ? getWards(formData.region, formData.zone) : [];
  const availableCategories = formData.department 
    ? getCategoriesForDepartment(formData.department)
    : [];

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.phone || formData.phone.trim() === '') {
      newErrors.phone = 'Phone number is required. Please enter your 10-digit phone number.';
    } else if (!/^\d{10}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Phone number must be exactly 10 digits. Example: 9876543210';
    }
    
    if (!formData.region) {
      newErrors.region = 'Region is required';
    }
    if (!formData.zone) {
      newErrors.zone = 'Zone is required';
    }
    if (!formData.ward) {
      newErrors.ward = 'Ward is required';
    }
    if (!formData.department) {
      newErrors.department = 'Department is required';
    }
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    if (formData.description.trim().length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // For phone, only allow digits and max 10
    if (name === 'phone') {
      const digitsOnly = value.replace(/\D/g, '').slice(0, 10);
      setFormData(prev => ({ ...prev, [name]: digitsOnly }));
      // Clear error for phone when user starts typing
      if (errors.phone) {
        setErrors(prev => ({ ...prev, phone: '' }));
      }
      return;
    }
    
    // Reset dependent fields when parent changes
    if (name === 'region') {
      setFormData(prev => ({ 
        ...prev, 
        [name]: value,
        zone: '',
        ward: ''
      }));
    } else if (name === 'zone') {
      setFormData(prev => ({ 
        ...prev, 
        [name]: value,
        ward: ''
      }));
    } else if (name === 'department') {
      setFormData(prev => ({ 
        ...prev, 
        [name]: value,
        category: ''
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    // Clear error for this field when user starts editing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.size <= 5 * 1024 * 1024 && ['image/jpeg', 'image/png'].includes(file.type)) {
        setPhotos([file]);
      }
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size <= 5 * 1024 * 1024 && ['image/jpeg', 'image/png'].includes(file.type)) {
        setPhotos([file]);
      }
    }
  };

  const removePhoto = () => {
    setPhotos([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);

    try {
      // Convert photo to base64 if it exists
      let photoBase64 = null;
      if (photos.length > 0) {
        photoBase64 = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(photos[0]);
        });
      }

      const complaintPayload = {
        text: formData.description,
        category: formData.category,
        department: formData.department,
        region: formData.region,
        zone: formData.zone,
        ward: formData.ward,
        area: formData.ward,
        before_photo: photoBase64
      };

      const response = await axios.post('/complaints/submit', complaintPayload);
      
      const complaintId = response.data.id || response.data._id;
      setSuccessMessage(`✅ Complaint Submitted! ID: #${String(complaintId).slice(-6).toUpperCase()}`);
      
      // Reset form
      setFormData({
        name: user?.name || '',
        phone: user?.phone || '',
        region: '',
        zone: '',
        ward: '',
        department: '',
        category: '',
        description: '',
      });
      setPhotos([]);
      setErrors({});
      
      // Redirect after 3 seconds
      setTimeout(() => {
        navigate('/citizen/my-complaints');
      }, 3000);
    } catch (err) {
      console.error('Submit failed:', err);
      setErrors({ submit: err.response?.data?.detail || 'Failed to submit complaint. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-4xl mx-auto"
      >
        {/* Back Button */}
        <motion.button
          onClick={() => navigate('/citizen/my-complaints')}
          className="flex items-center gap-2 text-zinc-600 hover:text-zinc-900 mb-6 font-medium"
        >
          ← Back
        </motion.button>

        {/* Success Message */}
        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 text-green-700 font-semibold"
          >
            {successMessage}
          </motion.div>
        )}

        {/* Submit Error */}
        {errors.submit && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-red-700 font-semibold"
          >
            {errors.submit}
          </motion.div>
        )}

        {/* Header Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm border border-zinc-200 p-8 mb-8"
        >
          <div className="flex items-start gap-4">
            <div className="text-4xl">🗣️</div>
            <div>
              <h1 className="text-3xl font-bold text-zinc-900 mb-2">Submit Complaint / शिकायत दर्ज करें</h1>
              <p className="text-zinc-600">Describe your issue in detail and we'll route it to the right department</p>
            </div>
          </div>
        </motion.div>

        {/* Form Card */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-sm border border-zinc-200 p-8 space-y-8"
        >
          {/* ===== SECTION 1: PERSONAL INFO ===== */}
          <div className="pb-6 border-b border-zinc-200">
            <h2 className="text-lg font-bold text-zinc-900 mb-6 flex items-center gap-2">
              <span className="text-2xl">👤</span> Personal Information
            </h2>
            
            <div className="grid grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-bold text-zinc-900 mb-2">
                  Name / नाम <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  readOnly
                  className="w-full px-4 py-3 rounded-lg border border-zinc-300 text-zinc-900 bg-zinc-100 cursor-not-allowed"
                />
                <p className="text-xs text-zinc-500 mt-1">Auto-filled from your profile</p>
              </div>

              {/* Phone with validation - EDITABLE if missing */}
              <div>
                <label className="block text-sm font-bold text-zinc-900 mb-2">
                  Phone Number / फोन नंबर <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  readOnly={!!formData.phone}
                  placeholder={!formData.phone ? "Enter your 10-digit phone number" : ""}
                  className={`w-full px-4 py-3 rounded-lg border text-zinc-900 ${
                    !formData.phone ? 'bg-white' : 'bg-zinc-100'
                  } ${
                    errors.phone ? 'border-red-500' : 'border-zinc-300'
                  } ${
                    !formData.phone ? 'cursor-text' : 'cursor-not-allowed'
                  }`}
                  maxLength="10"
                />
                {errors.phone && (
                  <p className="text-xs text-red-600 mt-1 font-semibold">{errors.phone}</p>
                )}
                {!errors.phone && formData.phone && (
                  <p className="text-xs text-green-600 mt-1">✓ Phone saved from your profile</p>
                )}
                {!errors.phone && !formData.phone && (
                  <p className="text-xs text-orange-600 mt-1">⚠️ Please enter your 10-digit phone number to continue</p>
                )}
              </div>
            </div>
          </div>

          {/* ===== SECTION 2: LOCATION SELECTION ===== */}
          <div className="pb-6 border-b border-zinc-200">
            <h2 className="text-lg font-bold text-zinc-900 mb-6 flex items-center gap-2">
              <span className="text-2xl">📍</span> Location Selection (3-Level)
            </h2>
            
            <div className="space-y-6">
              {/* Region */}
              <div>
                <label className="block text-sm font-bold text-zinc-900 mb-2">
                  Region / क्षेत्र <span className="text-red-500">*</span>
                </label>
                <select
                  name="region"
                  value={formData.region}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-lg border text-zinc-900 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all appearance-none ${
                    errors.region ? 'border-red-500' : 'border-zinc-300'
                  }`}
                >
                  <option value="">Select a Region</option>
                  {DELHI_REGIONS.map(region => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
                {errors.region && (
                  <p className="text-xs text-red-600 mt-1 font-semibold">{errors.region}</p>
                )}
              </div>

              {/* Zone */}
              <div>
                <label className="block text-sm font-bold text-zinc-900 mb-2">
                  Zone / ज़ोन <span className="text-red-500">*</span>
                </label>
                <select
                  name="zone"
                  value={formData.zone}
                  onChange={handleInputChange}
                  disabled={!formData.region}
                  className={`w-full px-4 py-3 rounded-lg border text-zinc-900 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all appearance-none ${
                    errors.zone ? 'border-red-500' : 'border-zinc-300'
                  } ${!formData.region ? 'bg-zinc-100 text-zinc-500 cursor-not-allowed' : ''}`}
                >
                  <option value="">
                    {!formData.region ? 'Select Region First' : 'Select a Zone'}
                  </option>
                  {availableZones.map(zone => (
                    <option key={zone} value={zone}>{zone}</option>
                  ))}
                </select>
                {errors.zone && (
                  <p className="text-xs text-red-600 mt-1 font-semibold">{errors.zone}</p>
                )}
              </div>

              {/* Ward */}
              <div>
                <label className="block text-sm font-bold text-zinc-900 mb-2">
                  Ward / वार्ड <span className="text-red-500">*</span>
                </label>
                <select
                  name="ward"
                  value={formData.ward}
                  onChange={handleInputChange}
                  disabled={!formData.zone}
                  className={`w-full px-4 py-3 rounded-lg border text-zinc-900 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all appearance-none ${
                    errors.ward ? 'border-red-500' : 'border-zinc-300'
                  } ${!formData.zone ? 'bg-zinc-100 text-zinc-500 cursor-not-allowed' : ''}`}
                >
                  <option value="">
                    {!formData.zone ? 'Select Zone First' : 'Select a Ward'}
                  </option>
                  {availableWards.map(ward => (
                    <option key={ward} value={ward}>{ward}</option>
                  ))}
                </select>
                {errors.ward && (
                  <p className="text-xs text-red-600 mt-1 font-semibold">{errors.ward}</p>
                )}
              </div>

              {/* Location Confirmation */}
              {formData.region && formData.zone && formData.ward && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-green-50 border border-green-200 rounded-lg p-3 text-green-700 font-semibold text-sm"
                >
                  ✓ {formData.ward}, {formData.zone}, {formData.region}
                </motion.div>
              )}
            </div>
          </div>

          {/* ===== SECTION 3: DEPARTMENT & CATEGORY ===== */}
          <div className="pb-6 border-b border-zinc-200">
            <h2 className="text-lg font-bold text-zinc-900 mb-6 flex items-center gap-2">
              <span className="text-2xl">🏢</span> Department & Category
            </h2>
            
            <div className="space-y-6">
              {/* Department */}
              <div>
                <label className="block text-sm font-bold text-zinc-900 mb-2">
                  Department / विभाग <span className="text-red-500">*</span>
                </label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-lg border text-zinc-900 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all appearance-none ${
                    errors.department ? 'border-red-500' : 'border-zinc-300'
                  }`}
                >
                  <option value="">Select a Department</option>
                  {DELHI_DEPARTMENTS.map(dept => (
                    <option key={dept.id} value={dept.id}>{dept.name}</option>
                  ))}
                </select>
                {errors.department && (
                  <p className="text-xs text-red-600 mt-1 font-semibold">{errors.department}</p>
                )}
                {formData.department && !errors.department && (
                  <p className="text-xs text-green-600 mt-2 font-semibold">
                    ✓ Will be routed to {DELHI_DEPARTMENTS.find(d => d.id === formData.department)?.name}
                  </p>
                )}
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-bold text-zinc-900 mb-2">
                  Category / श्रेणी <span className="text-red-500">*</span>
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  disabled={!formData.department}
                  className={`w-full px-4 py-3 rounded-lg border text-zinc-900 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all appearance-none ${
                    errors.category ? 'border-red-500' : 'border-zinc-300'
                  } ${!formData.department ? 'bg-zinc-100 text-zinc-500 cursor-not-allowed' : ''}`}
                >
                  <option value="">
                    {!formData.department ? 'Select Department First' : 'Select Category'}
                  </option>
                  {availableCategories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                {errors.category && (
                  <p className="text-xs text-red-600 mt-1 font-semibold">{errors.category}</p>
                )}
              </div>
            </div>
          </div>

          {/* ===== SECTION 4: DESCRIPTION ===== */}
          <div className="pb-6 border-b border-zinc-200">
            <h2 className="text-lg font-bold text-zinc-900 mb-6 flex items-center gap-2">
              <span className="text-2xl">📝</span> Complaint Description
            </h2>
            
            <div>
              <label className="block text-sm font-bold text-zinc-900 mb-2">
                Description / विवरण <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe your issue in detail... You can write in Hindi, English, or Hinglish. Our AI will automatically detect the language."
                rows={5}
                minLength={10}
                maxLength={1000}
                className={`w-full px-4 py-3 rounded-lg border text-zinc-900 placeholder-zinc-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all resize-none ${
                  errors.description ? 'border-red-500' : 'border-zinc-300'
                }`}
              />
              <div className="flex justify-between items-center mt-2">
                <div>
                  {errors.description && (
                    <p className="text-xs text-red-600 font-semibold">{errors.description}</p>
                  )}
                  {!errors.description && (
                    <p className="text-xs text-zinc-500">Supported: Hindi · English · Hinglish — AI will auto-detect</p>
                  )}
                </div>
                <span className="text-xs text-zinc-600 font-semibold">
                  {formData.description.length}/1000
                </span>
              </div>
            </div>
          </div>

          {/* ===== SECTION 5: PHOTO UPLOAD ===== */}
          <div className="pb-6 border-b border-zinc-200">
            <h2 className="text-lg font-bold text-zinc-900 mb-6 flex items-center gap-2">
              <span className="text-2xl">📸</span> Upload Photo (Optional)
            </h2>
            
            <motion.div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
                dragActive ? 'border-orange-500 bg-orange-50' : 'border-zinc-300 bg-zinc-50'
              }`}
            >
              <input
                type="file"
                accept="image/jpeg,image/png"
                onChange={handleFileInput}
                className="hidden"
                id="photo-input"
              />
              <label htmlFor="photo-input" className="cursor-pointer">
                <div className="text-4xl mb-3">📷</div>
                <p className="font-semibold text-zinc-900 mb-1">Click or drag to upload photo</p>
                <p className="text-sm text-zinc-600">JPG, PNG • Max 5MB</p>
              </label>
            </motion.div>

            {/* Photo Thumbnail */}
            {photos.length > 0 && (
              <div className="mt-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative w-32"
                >
                  <img
                    src={URL.createObjectURL(photos[0])}
                    alt="Complaint Photo"
                    className="w-full h-32 object-cover rounded-lg border border-zinc-300"
                  />
                  <button
                    type="button"
                    onClick={removePhoto}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                  >
                    ✕
                  </button>
                </motion.div>
              </div>
            )}
          </div>

          {/* ===== SUBMIT BUTTON ===== */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
            type="submit"
            className="w-full py-4 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-lg transition-all disabled:opacity-50 hover:shadow-lg"
          >
            🚀 {loading ? 'Submitting...' : 'Submit Complaint / शिकायत दर्ज करें'}
          </motion.button>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default SubmitComplaint;
