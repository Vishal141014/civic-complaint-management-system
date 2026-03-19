import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 to-gray-100 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        {/* Icon */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="mb-6 text-6xl"
        >
          🔒
        </motion.div>

        {/* Title */}
        <h1 className="text-5xl font-bold text-zinc-900 font-syne mb-4">
          Access Denied
        </h1>

        {/* Message */}
        <p className="text-xl text-zinc-600 mb-8 max-w-md">
          Aapke paas is page ka access nahi hai. Apne role ke anusar dashboard par jayein.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(-1)}
            className="px-6 py-3 rounded-xl bg-zinc-200 border-2 border-zinc-300 text-zinc-900 font-bold hover:bg-zinc-300 transition-all"
          >
            ← Back
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/')}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold hover:shadow-lg transition-all"
          >
            🏠 Home
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Unauthorized;
