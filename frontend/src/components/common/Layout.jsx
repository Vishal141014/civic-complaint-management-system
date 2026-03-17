import { motion } from 'framer-motion';

const StatCard = ({ label, value, icon, change, changeType = 'up', variant = 'default', delay = 0 }) => {
  const variants = {
    default: 'bg-white border border-gray-100',
    glass: 'glass glass-card text-white',
    saffron: 'bg-saffron/10 border border-saffron/20',
  };

  const changeColor = changeType === 'up' ? 'text-red-600' : 'text-green-600';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className={`rounded-2xl p-6 shadow-sm ${variants[variant]}`}
    >
      <div className="flex items-start justify-between mb-4">
        <span className="text-xs font-mono font-bold text-gray-500 uppercase">{label}</span>
        {icon && <span className="text-2xl">{icon}</span>}
      </div>
      <div className="text-3xl font-bold font-baloo mb-2">{value}</div>
      {change && (
        <p className={`text-xs font-mono font-bold ${changeColor}`}>
          {changeType === 'up' ? '↑' : '↓'} {change}
        </p>
      )}
    </motion.div>
  );
};

const GlassCard = ({ children, className = '' }) => (
  <div className={`glass glass-card p-6 ${className}`}>
    {children}
  </div>
);

const Panel = ({ title, subtitle = '', children, headerAction, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className={`bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm ${className}`}
  >
    {title && (
      <div className="border-b border-gray-100 px-6 py-4 flex items-center justify-between bg-navy-50">
        <div>
          <h3 className="text-lg font-bold text-navy">{title}</h3>
          {subtitle && <p className="text-xs text-gray-600 font-mono mt-1">{subtitle}</p>}
        </div>
        {headerAction}
      </div>
    )}
    <div className="p-6">{children}</div>
  </motion.div>
);

export { StatCard, GlassCard, Panel };
