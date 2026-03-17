import { motion } from 'framer-motion';
import PageHeader from '../../components/PageHeader';

const SuperDashboard = () => {
  const departments = [
    { name: 'Water Supply', total: 45, resolved: 38, pending: 7, reRaised: 2 },
    { name: 'Roads & Highways', total: 62, resolved: 55, pending: 5, reRaised: 2 },
    { name: 'Electricity', total: 38, resolved: 32, pending: 4, reRaised: 2 },
    { name: 'Waste Management', total: 29, resolved: 25, pending: 3, reRaised: 1 },
  ];

  const stats = [
    { label: 'Total Complaints', value: 174, icon: '📋' },
    { label: 'Resolved', value: 150, icon: '✓' },
    { label: 'Pending', value: 19, icon: '⏳' },
    { label: 'Re-raised', value: 7, icon: '🔄' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pb-12"
    >
      <PageHeader
        title="Super Admin Dashboard"
        subtitle="City-wide complaint monitoring"
      />

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="rounded-2xl backdrop-blur-lg bg-gradient-to-br from-purple-600 to-transparent/10 border border-white/20 p-6 text-center"
          >
            <p className="text-3xl mb-2">{stat.icon}</p>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
            <p className="text-xs text-navy-300 mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Departments Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="rounded-2xl backdrop-blur-lg bg-white/10 border border-white/20 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/20">
                <th className="px-4 py-4 text-left text-sm font-bold text-white">Department</th>
                <th className="px-4 py-4 text-center text-sm font-bold text-white">Total</th>
                <th className="px-4 py-4 text-center text-sm font-bold text-white">Resolved</th>
                <th className="px-4 py-4 text-center text-sm font-bold text-white">Pending</th>
                <th className="px-4 py-4 text-center text-sm font-bold text-white">Re-raised</th>
                <th className="px-4 py-4 text-center text-sm font-bold text-white">% Complete</th>
              </tr>
            </thead>
            <tbody>
              {departments.map((dept, idx) => {
                const percentage = Math.round((dept.resolved / dept.total) * 100);
                return (
                  <motion.tr
                    key={dept.name}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    className="border-b border-white/10 hover:bg-white/5"
                  >
                    <td className="px-4 py-4 text-sm font-bold text-white">{dept.name}</td>
                    <td className="px-4 py-4 text-center text-sm text-white">{dept.total}</td>
                    <td className="px-4 py-4 text-center text-sm text-green-400">{dept.resolved}</td>
                    <td className="px-4 py-4 text-center text-sm text-yellow-400">{dept.pending}</td>
                    <td className="px-4 py-4 text-center text-sm text-red-400">{dept.reRaised}</td>
                    <td className="px-4 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-16 h-2 rounded-full bg-white/20 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${percentage}%` }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="h-full bg-gradient-to-r from-green-500 to-green-400"
                          />
                        </div>
                        <span className="text-xs font-bold text-white w-8">{percentage}%</span>
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SuperDashboard;
