import { motion } from 'framer-motion';
import PageHeader from '../../components/PageHeader';

const Analytics = () => {
  const sentimentData = [
    { label: 'Positive', value: 45, percentage: 35, color: 'from-green-600' },
    { label: 'Neutral', value: 52, percentage: 42, color: 'from-blue-600' },
    { label: 'Negative', value: 27, percentage: 23, color: 'from-red-600' },
  ];

  const categoryData = [
    { label: 'Road Damage', count: 62, percentage: 36 },
    { label: 'Water Supply', count: 45, percentage: 26 },
    { label: 'Electricity', count: 38, percentage: 22 },
    { label: 'Waste', count: 29, percentage: 16 },
  ];

  const hotspots = [
    { area: 'Downtown Area', complaints: 34, risk: 'high' },
    { area: 'North Side', complaints: 28, risk: 'medium' },
    { area: 'East Zone', complaints: 22, risk: 'medium' },
    { area: 'West End', complaints: 18, risk: 'low' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pb-12"
    >
      <PageHeader
        title="Analytics"
        subtitle="City-wide complaint analytics"
      />

      {/* Sentiment Analysis */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 rounded-2xl backdrop-blur-lg bg-white/10 border border-white/20 p-8"
      >
        <h3 className="text-2xl font-bold text-white mb-6">Citizen Sentiment Analysis</h3>
        <div className="space-y-4">
          {sentimentData.map((item, idx) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-bold">{item.label}</span>
                <span className="text-navy-300 text-sm">{item.value} complaints</span>
              </div>
              <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${item.percentage}%` }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className={`h-full bg-gradient-to-r ${item.color} to-transparent`}
                />
              </div>
              <span className="text-xs text-navy-400 mt-1">{item.percentage}%</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Category Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8 rounded-2xl backdrop-blur-lg bg-white/10 border border-white/20 p-8"
      >
        <h3 className="text-2xl font-bold text-white mb-6">Complaints by Category</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {categoryData.map((item, idx) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="flex items-center gap-4"
            >
              <div className="flex-1">
                <div className="flex justify-between mb-2">
                  <span className="text-white font-bold">{item.label}</span>
                  <span className="text-saffron font-bold">{item.count}</span>
                </div>
                <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.percentage}%` }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="h-full bg-gradient-to-r from-saffron to-orange-600"
                  />
                </div>
              </div>
              <span className="text-sm text-navy-300 w-12 text-right">{item.percentage}%</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Hotspot Map */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="rounded-2xl backdrop-blur-lg bg-white/10 border border-white/20 p-8"
      >
        <h3 className="text-2xl font-bold text-white mb-6">Complaint Hotspots</h3>
        <div className="space-y-3">
          {hotspots.map((spot, idx) => {
            const riskColor = {
              high: 'bg-red-500/20 border-red-500/50',
              medium: 'bg-yellow-500/20 border-yellow-500/50',
              low: 'bg-green-500/20 border-green-500/50',
            };
            return (
              <motion.div
                key={spot.area}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`rounded-lg border p-4 flex items-center justify-between ${riskColor[spot.risk]}`}
              >
                <div>
                  <p className="text-white font-bold">{spot.area}</p>
                  <p className="text-sm text-navy-300">{spot.complaints} complaints</p>
                </div>
                <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 2 }}>
                  <span className={`text-2xl ${spot.risk === 'high' ? '🔴' : spot.risk === 'medium' ? '🟡' : '🟢'}`} />
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Analytics;
