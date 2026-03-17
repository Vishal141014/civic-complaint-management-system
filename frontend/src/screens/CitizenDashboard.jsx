import { motion } from 'framer-motion';
import { useState } from 'react';
import { Button, Input, Textarea, Select, Panel, StatusPill, Chip } from '../components/common';

const CitizenDashboard = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    ward: '',
    category: '',
    description: '',
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const mockComplaints = [
    {
      id: '#4821',
      title: 'Paani Nahi Aa Raha — Sector 7',
      category: 'water',
      status: 'assigned',
      hasNotif: true,
      sub: '🚰 Water · Assigned to Jal Board · 2 hours ago',
    },
    {
      id: '#4810',
      title: 'Street Light Band — Park Lane',
      category: 'electricity',
      status: 'review',
      hasNotif: false,
      sub: '💡 Electricity · Work completed · Photo uploaded',
    },
    {
      id: '#4798',
      title: 'Gutter Overflow — Main Road',
      category: 'water',
      status: 'resolved',
      hasNotif: false,
      sub: '✅ Resolved · 3 days ago',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-b from-navy-50 to-white pt-20"
    >
      <div className="max-w-3xl mx-auto px-6 py-12">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
          {/* Header */}
          <motion.div variants={itemVariants} className="space-y-2">
            <p className="text-sm text-gray-600 font-mono">← Wapas Jaao</p>
            <h1 className="text-4xl font-bold text-navy">📝 Shikayat Darj Karo</h1>
            <p className="text-gray-600">Apni complaint Hindi, English ya Hinglish mein likhein</p>
          </motion.div>

          {/* Complaint Form */}
          <motion.div variants={itemVariants}>
            <Panel
              title="Nai Shikayat"
              subtitle="🤖 AI auto-categorize karega"
              className="shadow-lg"
            >
              <div className="space-y-6">
                {/* Name and Phone */}
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    label="Aapka Naam"
                    placeholder="Ramesh Kumar"
                    required
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                  <Input
                    label="Phone Number"
                    type="tel"
                    placeholder="+91 98XXX XXXXX"
                    required
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                {/* Ward and Category */}
                <div className="grid md:grid-cols-2 gap-4">
                  <Select
                    label="Ward / Area"
                    placeholder="Select ward"
                    required
                    options={[
                      { label: 'Ward 14 — Rohini', value: 'rohini' },
                      { label: 'Ward 7 — Dwarka', value: 'dwarka' },
                      { label: 'Ward 22 — Saket', value: 'saket' },
                    ]}
                    onChange={(e) => setFormData({ ...formData, ward: e.target.value })}
                  />
                  <Select
                    label="Problem Type"
                    placeholder="Select category"
                    options={[
                      { label: '🤖 AI decide karega', value: 'auto' },
                      { label: '🚰 Paani (Water)', value: 'water' },
                      { label: '🛣️ Sadak (Roads)', value: 'roads' },
                      { label: '💡 Bijli (Electricity)', value: 'electricity' },
                    ]}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  />
                </div>

                {/* Description */}
                <Textarea
                  label="Shikayat Likhein"
                  placeholder="Meri gali mein 3 din se paani nahi aa raha hai..."
                  required
                  rows={5}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />

                {/* Photo Upload */}
                <div className="space-y-4">
                  <label className="block text-sm font-bold text-navy">
                    📸 Photo Attach Karo
                    <span className="text-xs text-gray-600 font-normal ml-2">(optional but helpful)</span>
                  </label>
                  <motion.div
                    whileHover={{ borderColor: 'currentColor' }}
                    className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer transition-colors"
                  >
                    <div className="text-4xl mb-3">📷</div>
                    <h4 className="font-bold text-navy mb-1">Tap karke photo upload karo</h4>
                    <p className="text-sm text-gray-600 font-mono">Max 3 photos · 5MB each · JPG/PNG</p>
                  </motion.div>
                  <div className="flex gap-3">
                    {['🚰', '🛤️', '+'].map((emoji, i) => (
                      <motion.div
                        key={i}
                        whileHover={{ scale: 1.1 }}
                        className="w-16 h-16 rounded-lg bg-gray-100 border-2 border-gray-200 flex items-center justify-center text-2xl cursor-pointer"
                      >
                        {emoji}
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Submit Button */}
                <Button variant="primary" size="full" icon="🚀">
                  Shikayat Submit Karo
                </Button>
              </div>
            </Panel>
          </motion.div>

          {/* Tracking Section */}
          <motion.div variants={itemVariants}>
            <Panel title="📋 Meri Shikayatein" subtitle="Active complaints tracking">
              <div className="space-y-2">
                {mockComplaints.map((complaint, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * i }}
                    className="flex items-center gap-4 p-4 hover:bg-navy-50 rounded-xl transition-colors cursor-pointer border border-gray-100"
                  >
                    {complaint.hasNotif && (
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-2.5 h-2.5 rounded-full bg-red-600 flex-shrink-0"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-mono text-gray-600 mb-1">{complaint.id}</p>
                      <h4 className="font-bold text-navy truncate">{complaint.title}</h4>
                      <p className="text-sm text-gray-600 font-mono mt-0.5">{complaint.sub}</p>
                    </div>
                    <StatusPill status={complaint.status} />
                  </motion.div>
                ))}
              </div>
            </Panel>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CitizenDashboard;
