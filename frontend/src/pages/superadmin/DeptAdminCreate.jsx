import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

const SuperAdminDeptAdminCreate = () => {
  const { user } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    password: '',
  });
  const [deptAdmins, setDeptAdmins] = useState([
    {
      id: 'DA001',
      name: 'Sharma Ji',
      email: 'sharma@example.com',
      department: 'Pothole & Road Damage',
      password: 'DeptAdmin@123',
      createdAt: '2026-03-15T10:30:00Z',
    },
    {
      id: 'DA002',
      name: 'Patel Ma',
      email: 'patel@example.com',
      department: 'Water & Sanitation',
      password: 'WaterAdmin@456',
      createdAt: '2026-03-16T14:15:00Z',
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');

  const departments = [
    'Pothole & Road Damage',
    'Water & Sanitation',
    'Electricity & Power',
    'Health & Hygiene',
    'Public Safety',
    'Parks & Public Spaces',
  ];

  const generateDeptAdminId = () => {
    const nextId = deptAdmins.length + 1;
    return `DA${String(nextId).padStart(3, '0')}`;
  };

  const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (!formData.name.trim() || !formData.email.trim() || !formData.department) {
      setError('Please fill all required fields');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email');
      return;
    }

    setLoading(true);

    try {
      // Generate credentials
      const deptAdminId = generateDeptAdminId();
      const generatedPassword = generatePassword();

      const newDeptAdmin = {
        id: deptAdminId,
        name: formData.name,
        email: formData.email,
        department: formData.department,
        password: generatedPassword,
        createdAt: new Date().toISOString(),
      };

      setDeptAdmins([...deptAdmins, newDeptAdmin]);

      setSuccessMessage(
        `✅ Department Admin Created Successfully!\n\nID: ${deptAdminId}\nPassword: ${generatedPassword}\n\n📧 Send these credentials to: ${formData.email}\n\nNote: Share password securely. User should change it on first login.`
      );

      // Reset form
      setFormData({
        name: '',
        email: '',
        department: '',
        password: '',
      });

      setLoading(false);

      // Auto-hide form after success
      setTimeout(() => {
        setShowForm(false);
        setSuccessMessage('');
      }, 3000);
    } catch (err) {
      setError('Failed to create department admin. Please try again.');
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-800 to-zinc-950 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl p-6 text-white">
            <h1 className="text-4xl font-bold mb-2">👑 SuperAdmin - Department Admin Management</h1>
            <p className="text-purple-100">Create and manage department administrator accounts</p>
          </div>
        </motion.div>

        {/* Create Button */}
        {!showForm && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowForm(true)}
            className="mb-8 px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-lg hover:shadow-lg transition-all"
          >
            ➕ Create New Department Admin
          </motion.button>
        )}

        {/* Creation Form */}
        {showForm && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8 bg-zinc-800 border border-zinc-700 rounded-2xl p-8"
          >
            <h2 className="text-2xl font-bold text-white mb-6">📋 Create Department Admin</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-bold text-zinc-300 mb-2">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Sharma Ji"
                  className="w-full px-4 py-3 rounded-xl bg-zinc-700 border border-zinc-600 text-white placeholder-zinc-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-bold text-zinc-300 mb-2">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="sharma@example.com"
                  className="w-full px-4 py-3 rounded-xl bg-zinc-700 border border-zinc-600 text-white placeholder-zinc-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
                />
              </div>

              {/* Department */}
              <div>
                <label className="block text-sm font-bold text-zinc-300 mb-2">Department *</label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-700 border border-zinc-600 text-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
                >
                  <option value="">Select Department...</option>
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>

              {/* Info Box */}
              <div className="bg-blue-900/30 border border-blue-700/50 rounded-xl p-4 text-xs text-blue-300">
                <p>
                  ℹ️ <strong>Auto-Generated Password:</strong> A strong password will be automatically generated and displayed after creation.
                </p>
              </div>

              {/* Success Message */}
              {successMessage && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-green-900/30 border border-green-700/50 rounded-xl p-4 text-green-300 text-sm font-medium whitespace-pre-wrap"
                >
                  {successMessage}
                </motion.div>
              )}

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-red-900/30 border border-red-700/50 rounded-xl p-4 text-red-300 text-sm font-medium"
                >
                  {error}
                </motion.div>
              )}

              {/* Buttons */}
              <div className="flex gap-3 mt-6">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setError('');
                    setSuccessMessage('');
                  }}
                  className="flex-1 px-6 py-3 rounded-xl bg-zinc-700 text-zinc-300 font-bold hover:bg-zinc-600 transition-all"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={loading}
                  type="submit"
                  className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold hover:shadow-lg transition-all disabled:opacity-50"
                >
                  {loading ? 'Creating...' : '✅ Create Department Admin'}
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Existing Department Admins */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">
            👥 Existing Department Admins ({deptAdmins.length})
          </h2>

          <div className="grid gap-4">
            {deptAdmins.map((admin, idx) => (
              <motion.div
                key={admin.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-zinc-800 border border-zinc-700 rounded-xl p-6 hover:border-purple-500/50 transition-all"
              >
                <div className="grid md:grid-cols-5 gap-4 items-center">
                  {/* ID Badge */}
                  <div className="bg-purple-500 text-white px-4 py-3 rounded-lg text-center font-bold">
                    ID: {admin.id}
                  </div>

                  {/* Info */}
                  <div>
                    <p className="text-zinc-400 text-xs">Name</p>
                    <p className="text-white font-bold">{admin.name}</p>
                  </div>
                  <div>
                    <p className="text-zinc-400 text-xs">Email</p>
                    <p className="text-white font-bold">{admin.email}</p>
                  </div>
                  <div>
                    <p className="text-zinc-400 text-xs">Department</p>
                    <p className="text-white font-bold">{admin.department}</p>
                  </div>

                  {/* Date */}
                  <div className="text-center">
                    <p className="text-zinc-400 text-xs">Created On</p>
                    <p className="text-white font-bold">{formatDate(admin.createdAt)}</p>
                  </div>
                </div>

                {/* Credentials Note */}
                <div className="mt-4 bg-yellow-900/20 border border-yellow-700/50 rounded-lg p-3 text-xs text-yellow-300">
                  ⚠️ <strong>Password:</strong> {admin.password}
                  <br />
                  📧 <strong>Action:</strong> Send ID and password to {admin.email} via secure channel
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Info Box */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-12 bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-700/50 rounded-2xl p-6 text-zinc-300"
        >
          <h3 className="text-lg font-bold text-white mb-4">ℹ️ Department Admin Creation Process</h3>
          <ul className="space-y-2 text-sm">
            <li>✓ Fill in the department admin details above</li>
            <li>✓ System auto-generates a strong password</li>
            <li>✓ ID and password are generated and shown</li>
            <li>✓ Manually share credentials with the dept admin via secure channel</li>
            <li>✓ Dept admin can then login and approve/reject workers for their department</li>
            <li>✓ Workers can only login after their request is approved</li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default SuperAdminDeptAdminCreate;
