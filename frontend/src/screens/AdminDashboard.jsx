import { motion } from 'framer-motion';
import { useState } from 'react';
import { Sidebar, StatCard, Panel, Button, Badge, Chip } from '../components/common';

const AdminDashboard = () => {
  const [activeMenu, setActiveMenu] = useState('dashboard');

  const sidebarItems = [
    { section: 'MAIN' },
    { id: 'dashboard', icon: '📊', label: 'Dashboard', badge: '3', active: true },
    { id: 'complaints', icon: '📋', label: 'All Complaints' },
    { id: 'workers', icon: '👷', label: 'Field Workers' },
    { id: 'review', icon: '📸', label: 'Photo Review', badge: '2' },
    { section: 'REPORTS' },
    { id: 'analytics', icon: '📈', label: 'Analytics' },
    { id: 'map', icon: '📍', label: 'Hotspot Map' },
    { id: 'export', icon: '📤', label: 'Export Report' },
    { section: 'ACCOUNT' },
    { id: 'settings', icon: '⚙️', label: 'Settings' },
    { id: 'logout', icon: '🔐', label: 'Logout' },
  ];

  const complaints = [
    {
      id: '#4821',
      title: 'Paani nahi aa raha 3 din se',
      submitter: 'Ramesh Kumar · Sector 7, Rohini',
      category: 'water',
      urgency: 'HIGH',
      sentiment: '😡 Angry 0.78',
      photo: true,
    },
    {
      id: '#4820',
      title: 'Pipeline leak ho gayi hai',
      submitter: 'Sunita Devi · Block C, Dwarka',
      category: 'water',
      urgency: 'MED',
      sentiment: '😟 Negative',
      photo: true,
    },
    {
      id: '#4818',
      title: 'Water colour is dirty / yellowish',
      submitter: 'Anil Sharma · Saket South',
      category: 'water',
      urgency: 'LOW',
      sentiment: '😐 Neutral',
      photo: false,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex min-h-screen bg-navy-50 pt-20"
    >
      {/* Sidebar */}
      <Sidebar
        items={sidebarItems}
        title="Jal Board Admin"
        subtitle="Dept Dashboard"
        activeItem={activeMenu}
        onItemClick={setActiveMenu}
      />

      {/* Main Content */}
      <motion.main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Top Bar */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between"
          >
            <div>
              <h2 className="text-4xl font-bold text-navy">Dashboard</h2>
              <p className="text-xs text-gray-600 font-mono mt-2">Sunday, 22 Feb 2026 · Jal Board, Delhi</p>
            </div>
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-lg hover:bg-navy-50 transition-colors"
              >
                🔔
                <span className="absolute top-2 right-2 w-4 h-4 bg-red-600 text-white text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-lg"
              >
                📤
              </motion.button>
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-saffron to-saffron-300 text-white font-bold flex items-center justify-center">
                R
              </div>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.1 }}
            className="grid md:grid-cols-4 gap-6"
          >
            {[
              { label: 'Total Complaints', value: '67', icon: '📋', change: '↑ 8 new today', changeType: 'up' },
              { label: 'Pending', value: '12', icon: '⏳', change: '↑ 3 HIGH urgency', changeType: 'up' },
              { label: 'In Progress', value: '8', icon: '🔧', change: '2 pending photo' },
              { label: 'Resolved Today', value: '47', icon: '✅', change: '↑ 94% satisfaction', changeType: 'down' },
            ].map((stat, i) => (
              <StatCard key={i} delay={i * 0.1} {...stat} />
            ))}
          </motion.div>

          {/* Complaints Table */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Panel
              title="🔴 Pending Complaints — Assign Karo"
              headerAction={
                <div className="flex gap-2">
                  {['All', 'HIGH', 'Water', 'Today'].map((filter) => (
                    <motion.button
                      key={filter}
                      whileHover={{ scale: 1.05 }}
                      className={`px-3 py-1 rounded-full text-xs font-bold font-mono transition-colors ${
                        filter === 'All'
                          ? 'bg-navy text-white'
                          : 'border border-gray-200 text-navy hover:bg-gray-50'
                      }`}
                    >
                      {filter}
                    </motion.button>
                  ))}
                </div>
              }
            >
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-xs font-mono font-bold text-gray-600 uppercase">ID</th>
                      <th className="text-left py-3 px-4 text-xs font-mono font-bold text-gray-600 uppercase">Complaint</th>
                      <th className="text-left py-3 px-4 text-xs font-mono font-bold text-gray-600 uppercase">Category</th>
                      <th className="text-left py-3 px-4 text-xs font-mono font-bold text-gray-600 uppercase">Urgency</th>
                      <th className="text-left py-3 px-4 text-xs font-mono font-bold text-gray-600 uppercase">Sentiment</th>
                      <th className="text-left py-3 px-4 text-xs font-mono font-bold text-gray-600 uppercase">Photo</th>
                      <th className="text-left py-3 px-4 text-xs font-mono font-bold text-gray-600 uppercase">Assign</th>
                    </tr>
                  </thead>
                  <tbody>
                    {complaints.map((complaint, i) => (
                      <motion.tr
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * i }}
                        className="border-b border-gray-100 hover:bg-navy-50 transition-colors"
                      >
                        <td className="py-4 px-4 text-sm font-mono text-gray-600">{complaint.id}</td>
                        <td className="py-4 px-4">
                          <p className="font-bold text-navy text-sm">{complaint.title}</p>
                          <p className="text-xs text-gray-600">{complaint.submitter}</p>
                        </td>
                        <td className="py-4 px-4">
                          <Chip variant={complaint.category} icon="💧">
                            {complaint.category === 'water'
                              ? 'Water'
                              : complaint.category === 'road'
                              ? 'Roads'
                              : 'Electricity'}
                          </Chip>
                        </td>
                        <td className="py-4 px-4">
                          <span
                            className={`text-xs font-bold font-mono ${
                              complaint.urgency === 'HIGH'
                                ? 'text-red-600'
                                : complaint.urgency === 'MED'
                                ? 'text-yellow-600'
                                : 'text-green-600'
                            }`}
                          >
                            {complaint.urgency}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-xs text-gray-600">{complaint.sentiment}</td>
                        <td className="py-4 px-4">
                          {complaint.photo ? (
                            <div className="w-8 h-8 rounded bg-gray-200 flex items-center justify-center text-sm">
                              📸
                            </div>
                          ) : (
                            <span className="text-gray-400">—</span>
                          )}
                        </td>
                        <td className="py-4 px-4">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            className="px-3 py-1.5 bg-navy text-white rounded text-xs font-bold hover:bg-navy-dark transition-colors"
                          >
                            Assign →
                          </motion.button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Panel>
          </motion.div>
        </div>
      </motion.main>
    </motion.div>
  );
};

export default AdminDashboard;
