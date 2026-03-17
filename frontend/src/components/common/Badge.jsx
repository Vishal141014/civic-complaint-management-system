import { motion } from 'framer-motion';

const Badge = ({ variant = 'red', icon, children, className = '' }) => {
  const variants = {
    red: 'bg-red-50 text-red-600 border border-red-200',
    yellow: 'bg-amber-50 text-amber-600 border border-amber-200',
    green: 'bg-green-50 text-green-600 border border-green-200',
    blue: 'bg-blue-50 text-blue-600 border border-blue-200',
  };

  return (
    <motion.span
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-bold ${variants[variant]} ${className}`}
    >
      {icon && <span className="text-sm">{icon}</span>}
      {children}
    </motion.span>
  );
};

const StatusPill = ({ status = 'pending', children }) => {
  const statusStyles = {
    pending: 'bg-yellow-50 text-yellow-600 border border-yellow-200',
    assigned: 'bg-blue-50 text-blue-600 border border-blue-200',
    inProgress: 'bg-amber-50 text-amber-600 border border-amber-200',
    review: 'bg-purple-50 text-purple-600 border border-purple-200',
    resolved: 'bg-green-50 text-green-600 border border-green-200',
    rejected: 'bg-red-50 text-red-600 border border-red-200',
  };

  return (
    <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-mono font-bold ${statusStyles[status]}`}>
      {children || status}
    </span>
  );
};

const Chip = ({ variant = 'water', icon, children }) => {
  const chipStyles = {
    water: 'bg-blue-100 text-blue-700',
    road: 'bg-amber-100 text-amber-700',
    electricity: 'bg-orange-100 text-orange-700',
    health: 'bg-green-100 text-green-700',
  };

  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-mono font-bold ${chipStyles[variant]}`}>
      {icon && <span>{icon}</span>}
      {children}
    </span>
  );
};

export { Badge, StatusPill, Chip };
