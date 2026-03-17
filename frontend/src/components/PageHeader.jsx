import { motion } from 'framer-motion';

const PageHeader = ({ title, subtitle, actionButton }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-white font-syne">
            {title}
          </h1>
          {subtitle && (
            <p className="text-navy-300 text-lg mt-2 font-syne">{subtitle}</p>
          )}
        </div>
        {actionButton && <div>{actionButton}</div>}
      </div>
    </motion.div>
  );
};

export default PageHeader;
