import { motion } from 'framer-motion';

const Card = ({
  children,
  variant = 'default',
  className = '',
  hover = true,
  delay = 0,
  ...props
}) => {
  const variants = {
    default: 'bg-white border border-gray-100 shadow-sm',
    glass: 'glass glass-card',
    glassDark: 'glass-light',
    gradient: 'bg-gradient-to-br from-white to-gray-50 border border-gray-100 shadow-sm',
  };

  const motionClass = hover ? 'hover:-translate-y-1' : '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`rounded-2xl overflow-hidden transition-smooth ${variants[variant]} ${motionClass} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;
