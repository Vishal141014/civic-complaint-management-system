import { motion } from 'framer-motion';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie } from 'recharts';

const SuperDashboard = () => {
  const { user } = useAuth();
  const [activeItem, setActiveItem] = useState('city-dashboard');

  // Chart Data
  const departmentData = [
    { name: 'Jal Board', value: 89, fill: '#3B82F6' },
    { name: 'PWD', value: 67, fill: '#F97316' },
    { name: 'BSES', value: 48, fill: '#F97316' },
    { name: 'Health', value: 31, fill: '#10B981' },
    { name: 'Police', value: 18, fill: '#8B5CF6' },
  ];

  const sentimentData = [
    { name: 'Angry', value: 38, color: '#EF4444' },
    { name: 'Negative', value: 32, color: '#F87171' },
    { name: 'Neutral', value: 20, color: '#6B7280' },
    { name: 'Positive', value: 10, color: '#10B981' },
  ];

  const metrics = [
    { 
      label: 'Total Complaints (City)', 
      value: '312', 
      subtext: '↑ 7.2K',
      icon: '📋',
      borderColor: 'border-orange-500',
      bgColor: 'bg-orange-50'
    },
    { 
      label: 'High Urgency', 
      value: '28', 
      subtext: 'Immediate action needed',
      icon: '🔴',
      textColor: 'text-red-600',
      borderColor: 'border-red-500',
      bgColor: 'bg-red-50'
    },
    { 
      label: 'Resolved This Month', 
      value: '247', 
      subtext: '79% resolution rate',
      icon: '✓',
      textColor: 'text-green-600',
      borderColor: 'border-green-500',
      bgColor: 'bg-green-50'
    },
    { 
      label: 'Avg Resolution Time', 
      value: '42hr', 
      subtext: '↓ Down from 68hr',
      icon: '⏱️',
      textColor: 'text-blue-600',
      borderColor: 'border-blue-500',
      bgColor: 'bg-blue-50'
    },
  ];

  const departments = [
    { name: 'Water Supply', total: 45, resolved: 38, pending: 7, reRaised: 2 },
    { name: 'Roads & Highways', total: 62, resolved: 55, pending: 5, reRaised: 2 },
    { name: 'Electricity', total: 38, resolved: 32, pending: 4, reRaised: 2 },
    { name: 'Waste Management', total: 29, resolved: 25, pending: 3, reRaised: 1 },
  ];

  return (
    <div className="flex h-full bg-gray-50">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: 0 }}
        className="w-72 bg-zinc-950 border-r border-zinc-700 flex flex-col p-6 min-h-screen"
      >
        {/* Logo/Brand */}
        <div className="mb-8">
          <h2 className="text-white font-bold text-lg">Super Admin</h2>
          <p className="text-orange-500 text-sm font-bold mt-1">🟠 All Departments</p>
        </div>

        {/* Navigation */}
        <div className="flex-1">
          <p className="text-zinc-400 text-xs font-bold uppercase tracking-wider mb-4">Cluster</p>
          <nav className="space-y-2 mb-8">
            {[
              { id: 'city-dashboard', label: 'City Dashboard', icon: '🏙️' },
              { id: 'departments', label: 'Departments', icon: '🏢' },
              { id: 'hotspot', label: 'Hotspot Map', icon: '🗺️' },
              { id: 'citizens', label: 'All Citizens', icon: '👥' },
            ].map(item => (
              <motion.button
                key={item.id}
                whileHover={{ x: 4 }}
                onClick={() => setActiveItem(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  activeItem === item.id
                    ? 'bg-orange-500/20 border-l-4 border-orange-500 text-orange-400'
                    : 'text-zinc-300 hover:bg-zinc-700/50'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </motion.button>
            ))}
          </nav>

          {/* AI Insights */}
          <p className="text-zinc-400 text-xs font-bold uppercase tracking-wider mb-4">AI Insights</p>
          <nav className="space-y-2">
            {[
              { id: 'analytics', label: 'ML Analytics', icon: '📊' },
              { id: 'trends', label: 'Trend Reports', icon: '📈' },
              { id: 'export', label: 'Export All', icon: '📥' },
            ].map(item => (
              <motion.button
                key={item.id}
                whileHover={{ x: 4 }}
                onClick={() => setActiveItem(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  activeItem === item.id
                    ? 'bg-orange-500/20 border-l-4 border-orange-500 text-orange-400'
                    : 'text-zinc-300 hover:bg-zinc-700/50'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </motion.button>
            ))}
          </nav>
        </div>

        {/* Admin Info */}
        <div className="border-t border-zinc-700 pt-4">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-zinc-800">
            <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">
              {user?.name?.charAt(0).toUpperCase() || 'S'}
            </div>
            <div className="flex-1">
              <p className="text-white text-sm font-bold">{user?.name || 'Super Admin'}</p>
              <p className="text-zinc-400 text-xs">Super Admin</p>
            </div>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex-1 overflow-auto"
      >
        <div className="p-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-8"
          >
            <div>
              <h1 className="text-4xl font-bold text-zinc-900">
                🏙️ City-Wide Dashboard
              </h1>
              <p className="text-zinc-600 mt-2">
                All Departments • New Delhi • 22 Feb 2026
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 rounded-lg bg-zinc-950 text-white font-bold flex items-center gap-2 hover:bg-zinc-800"
            >
              📥 Export Report
            </motion.button>
          </motion.div>

          {/* Metrics Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ staggerChildren: 0.1 }}
            className="grid grid-cols-4 gap-6 mb-8"
          >
            {metrics.map((metric, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`${metric.bgColor} rounded-2xl p-6 border-t-4 ${metric.borderColor} shadow-sm hover:shadow-md transition-all`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-zinc-600 mb-2">{metric.label}</p>
                    <h3 className={`text-4xl font-bold ${metric.textColor || 'text-orange-600'}`}>
                      {metric.value}
                    </h3>
                  </div>
                  <span className="text-3xl">{metric.icon}</span>
                </div>
                <p className="text-xs text-zinc-600 mt-3">{metric.subtext}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Charts Row */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            {/* Department-wise Complaints */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-zinc-200"
            >
              <h2 className="text-lg font-bold text-zinc-900 mb-6">
                📊 Department-wise Complaints
              </h2>
              <p className="text-xs text-zinc-500 absolute right-6 top-6">This Month</p>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={departmentData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="name" stroke="#6B7280" style={{ fontSize: '12px' }} />
                  <YAxis stroke="#6B7280" style={{ fontSize: '12px' }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #374151',
                      color: '#FFF',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="value" fill="#3B82F6" radius={[8, 8, 0, 0]}>
                    {departmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </motion.div>

            {/* ML Sentiment Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-zinc-200"
            >
              <h2 className="text-lg font-bold text-zinc-900 mb-6">
                😊 ML Sentiment Overview
              </h2>
              <p className="text-xs text-zinc-500 absolute right-6 top-6">All Complaints</p>
              <div className="space-y-4">
                {sentimentData.map(item => (
                  <div key={item.name}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-zinc-700">{item.name}</span>
                      <span className="text-sm font-bold text-zinc-900">{item.value}%</span>
                    </div>
                    <div className="w-full h-3 bg-zinc-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${item.value}%` }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        style={{ backgroundColor: item.color }}
                        className="h-full rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* AI Alert */}
              <div className="mt-6 p-4 bg-red-50 border-l-4 border-red-500 rounded">
                <p className="text-xs font-bold text-red-700 mb-1">🔴 AI Alert</p>
                <p className="text-xs text-red-600">
                  Ward 14 - Paani complaints 3x above average. Hotspot risk HIGH.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Hotspot Map */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-zinc-200 mb-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-zinc-900">
                📍 AI Hotspot Map — Delhi Wards
              </h2>
              <p className="text-xs text-zinc-500">XGBoost predicted • Next 7 days</p>
            </div>
            
            {/* Simplified Map Representation */}
            <div className="h-64 bg-gradient-to-br from-emerald-100 to-blue-100 rounded-xl relative overflow-hidden">
              {/* Risk Zones */}
              <div className="absolute top-1/4 left-1/3 w-12 h-12 rounded-full bg-orange-400/80 flex items-center justify-center text-white font-bold text-sm border-2 border-orange-400 cursor-pointer hover:scale-110 transition-transform">
                W22
              </div>
              <div className="absolute top-2/3 right-1/4 w-16 h-16 rounded-full bg-red-500/80 flex items-center justify-center text-white font-bold text-sm border-2 border-red-500 cursor-pointer hover:scale-110 transition-transform">
                W14
              </div>
              <div className="absolute bottom-1/3 right-1/3 w-10 h-10 rounded-full bg-orange-400/80 flex items-center justify-center text-white font-bold text-xs border-2 border-orange-400 cursor-pointer hover:scale-110 transition-transform">
                W7
              </div>
              
              {/* Map Label */}
              <div className="absolute inset-0 flex items-center justify-center text-zinc-400 font-mono text-sm pointer-events-none">
                Interactive Map — Folium Integration
              </div>
            </div>

            {/* Legend */}
            <div className="flex gap-6 mt-6 justify-center">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-red-500" />
                <span className="text-sm text-zinc-700">High Risk</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-orange-400" />
                <span className="text-sm text-zinc-700">Medium Risk</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-yellow-400" />
                <span className="text-sm text-zinc-700">Low Risk</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-green-500" />
                <span className="text-sm text-zinc-700">Normal</span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.main>
    </div>
  );
};

export default SuperDashboard;
