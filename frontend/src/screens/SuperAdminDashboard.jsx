import { motion } from 'framer-motion';
import { useState } from 'react';
import { Sidebar, StatCard, Panel, Button } from '../components/common';

const SuperAdminDashboard = () => {
  const [activeMenu, setActiveMenu] = useState('dashboard');

  const sidebarItems = [
    { section: 'OVERVIEW' },
    { id: 'dashboard', icon: '🏙️', label: 'City Dashboard' },
    { id: 'departments', icon: '🏢', label: 'Departments' },
    { id: 'map', icon: '📍', label: 'Hotspot Map' },
    { id: 'citizens', icon: '👥', label: 'All Citizens' },
    { section: 'AI INSIGHTS' },
    { id: 'analytics', icon: '🤖', label: 'ML Analytics' },
    { id: 'trends', icon: '📈', label: 'Trend Reports' },
    { id: 'export', icon: '📤', label: 'Export All' },
  ];

  const deptData = [
    { label: '💧 Jal Board', value: 89, color: 'bg-blue-500', percent: 75 },
    { label: '🛣️ PWD', value: 67, color: 'bg-yellow-500', percent: 55 },
    { label: '💡 BSES', value: 48, color: 'bg-saffron', percent: 40 },
    { label: '🏥 Health', value: 31, color: 'bg-green-500', percent: 25 },
    { label: '🔐 Police', value: 18, color: 'bg-purple-500', percent: 15 },
  ];

  const sentimentData = [
    { emoji: '😡', label: 'Angry', value: 38, color: 'bg-red-500' },
    { emoji: '😟', label: 'Negative', value: 32, color: 'bg-yellow-500' },
    { emoji: '😐', label: 'Neutral', value: 20, color: 'bg-gray-400' },
    { emoji: '😊', label: 'Positive', value: 10, color: 'bg-green-500' },
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
        title="Super Admin"
        subtitle="🛡️ All Departments"
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
              <h2 className="text-4xl font-bold text-navy">🏙️ City-Wide Dashboard</h2>
              <p className="text-xs text-gray-600 font-mono mt-2">All Departments · New Delhi · 22 Feb 2026</p>
            </div>
            <Button variant="primary" icon="📤">
              Export Report
            </Button>
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
              {
                label: 'Total Complaints (City)',
                value: '312',
                icon: '📊',
                change: '↑ 24 aaj',
                changeType: 'up',
                variant: 'default',
              },
              {
                label: 'High Urgency',
                value: '28',
                icon: '⚠️',
                change: 'Immediate action',
                changeType: 'up',
                variant: 'default',
              },
              {
                label: 'Resolved This Month',
                value: '247',
                icon: '✅',
                change: '↓ 79% rate',
                changeType: 'down',
                variant: 'default',
              },
              {
                label: 'Avg Resolution Time',
                value: '42hr',
                icon: '⏱️',
                change: '↓ from 68hr',
                changeType: 'down',
                variant: 'default',
              },
            ].map((stat, i) => (
              <StatCard key={i} delay={i * 0.1} {...stat} />
            ))}
          </motion.div>

          {/* Department wise and Sentiment Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid md:grid-cols-2 gap-6"
          >
            {/* Departments */}
            <Panel title="📊 Department-wise Complaints" subtitle="This Month">
              <div className="space-y-4">
                {deptData.map((dept, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.05 }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-mono w-20 text-gray-600">{dept.label}</span>
                      <div className="flex-1 bg-gray-100 h-2 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full ${dept.color}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${dept.percent}%` }}
                          transition={{ delay: 0.5 + i * 0.1, duration: 0.8 }}
                        />
                      </div>
                      <span className={`text-xs font-bold min-w-8 text-right ${dept.color.replace('bg-', 'text-')}`}>
                        {dept.value}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Panel>

            {/* Sentiment Analysis */}
            <Panel title="🤖 ML Sentiment Overview" subtitle="All Complaints">
              <div className="space-y-4">
                {sentimentData.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.05 }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-lg">{item.emoji}</span>
                      <span className="text-xs font-mono w-16 text-gray-600">{item.label}</span>
                      <div className="flex-1 bg-gray-100 h-2 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full ${item.color}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${item.value}%` }}
                          transition={{ delay: 0.5 + i * 0.1, duration: 0.8 }}
                        />
                      </div>
                      <span className="text-xs font-bold min-w-8 text-right text-gray-600">
                        {item.value}%
                      </span>
                    </div>
                  </motion.div>
                ))}

                {/* AI Alert */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="mt-6 p-4 bg-red-50 border-l-4 border-red-600 rounded-lg"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">🔴</span>
                    <div>
                      <h4 className="font-bold text-red-600 text-sm">AI Alert</h4>
                      <p className="text-xs text-gray-700 font-mono mt-1">
                        Ward 14 — Paani complaints 3x badh gayi. Hotspot risk HIGH.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </Panel>
          </motion.div>

          {/* Hotspot Map */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Panel
              title="📍 AI Hotspot Map — Delhi Wards"
              subtitle="XGBoost predicted · Next 7 days"
            >
              <div className="relative h-64 bg-gradient-to-br from-blue-50 to-green-50 rounded-xl overflow-hidden border border-gray-200">
                {/* Grid Pattern */}
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `
                      linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)
                    `,
                    backgroundSize: '30px 30px',
                  }}
                />

                {/* Hotspots */}
                {[
                  { emoji: 'W14', bg: 'bg-red-500', top: '30%', left: '40%', size: 'w-20 h-20' },
                  { emoji: 'W7', bg: 'bg-saffron', top: '55%', left: '65%', size: 'w-14 h-14' },
                  { emoji: 'W22', bg: 'bg-yellow-500', top: '20%', left: '25%', size: 'w-12 h-12' },
                ].map((hotspot, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.3,
                    }}
                    className={`absolute ${hotspot.size} ${hotspot.bg} rounded-full flex items-center justify-center text-white font-bold text-xs cursor-pointer hover:scale-110 transition-transform`}
                    style={{ top: hotspot.top, left: hotspot.left }}
                  >
                    {hotspot.emoji}
                  </motion.div>
                ))}

                <div className="absolute inset-0 flex items-center justify-center text-center pointer-events-none">
                  <div>
                    <p className="text-sm text-gray-500 font-mono opacity-75">
                      [ Interactive Map — Folium Integration ]
                    </p>
                  </div>
                </div>
              </div>

              {/* Legend */}
              <div className="mt-4 flex gap-6 flex-wrap">
                {[
                  { color: 'bg-red-500', label: 'High Risk' },
                  { color: 'bg-saffron', label: 'Medium Risk' },
                  { color: 'bg-yellow-400', label: 'Low Risk' },
                  { color: 'bg-green-500', label: 'Normal' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${item.color}`} />
                    <span className="text-xs text-gray-600 font-mono">{item.label}</span>
                  </div>
                ))}
              </div>
            </Panel>
          </motion.div>
        </div>
      </motion.main>
    </motion.div>
  );
};

export default SuperAdminDashboard;
