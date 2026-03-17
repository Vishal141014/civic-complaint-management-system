import { motion } from 'framer-motion';

const Button = ({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  className = '',
  icon,
  disabled = false,
  ...props
}) => {
  const baseClasses = 'font-baloo font-bold transition-smooth flex items-center gap-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-saffron text-white hover:bg-saffron-300 shadow-lg hover:shadow-xl',
    secondary: 'bg-white/10 text-white border border-white/20 hover:bg-white/20 hover:border-white/40 glass-hover',
    success: 'bg-green text-white hover:bg-green-700 shadow-lg',
    danger: 'bg-red-600 text-white hover:bg-red-700',
    ghost: 'text-navy hover:bg-navy/5 border-0',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    full: 'w-full px-6 py-3 text-base',
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {icon && <span className="text-lg">{icon}</span>}
      {children}
    </motion.button>
  );
};

export default Button;
