import { motion } from 'framer-motion';

const Input = ({
  type = 'text',
  placeholder = '',
  label = '',
  required = false,
  error = '',
  icon,
  className = '',
  ...props
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full"
    >
      {label && (
        <label className="text-sm font-bold text-navy mb-2 flex items-center gap-1">
          {label}
          {required && <span className="text-saffron">*</span>}
        </label>
      )}
      <div className="relative">
        {icon && <span className="absolute left-4 top-3.5 text-lg">{icon}</span>}
        <input
          type={type}
          placeholder={placeholder}
          className={`w-full px-4 py-3 ${icon ? 'pl-12' : ''} bg-navy-50 border border-gray-200 rounded-xl focus:border-saffron focus:ring-2 focus:ring-saffron/20 transition-colors ${className}`}
          {...props}
        />
      </div>
      {error && <p className="text-red-600 text-xs mt-1 font-mono">{error}</p>}
    </motion.div>
  );
};

const Textarea = ({
  placeholder = '',
  label = '',
  required = false,
  error = '',
  rows = 4,
  className = '',
  ...props
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full"
    >
      {label && (
        <label className="text-sm font-bold text-navy mb-2 flex items-center gap-1">
          {label}
          {required && <span className="text-saffron">*</span>}
        </label>
      )}
      <textarea
        placeholder={placeholder}
        rows={rows}
        className={`w-full px-4 py-3 bg-navy-50 border border-gray-200 rounded-xl focus:border-saffron focus:ring-2 focus:ring-saffron/20 transition-colors resize-none ${className}`}
        {...props}
      />
      {error && <p className="text-red-600 text-xs mt-1 font-mono">{error}</p>}
    </motion.div>
  );
};

const Select = ({
  label = '',
  placeholder = '',
  options = [],
  required = false,
  error = '',
  className = '',
  ...props
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full"
    >
      {label && (
        <label className="text-sm font-bold text-navy mb-2 flex items-center gap-1">
          {label}
          {required && <span className="text-saffron">*</span>}
        </label>
      )}
      <select
        className={`w-full px-4 py-3 bg-navy-50 border border-gray-200 rounded-xl focus:border-saffron focus:ring-2 focus:ring-saffron/20 transition-colors ${className}`}
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-600 text-xs mt-1 font-mono">{error}</p>}
    </motion.div>
  );
};

export { Input, Textarea, Select };
