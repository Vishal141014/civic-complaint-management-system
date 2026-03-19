import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const PublicNavbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Departments', href: '#departments' },
  ];

  const handleScroll = (e, href) => {
    e.preventDefault();
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsOpen(false);
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 w-full z-50 backdrop-blur-xl border-b bg-zinc-950/70 border-zinc-700/50"
    >
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate('/')}
            className="cursor-pointer font-bold text-xl sm:text-2xl font-syne flex-shrink-0"
          >
            <span className="text-orange-600">🇮🇳</span>
            <span className="text-white"> Smart</span>
            <span className="text-orange-600"> P-CRM</span>
          </motion.div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                onClick={(e) => handleScroll(e, link.href)}
                whileHover={{ color: '#FF6B00' }}
                className="text-zinc-300 hover:text-orange-400 font-semibold text-sm transition-colors cursor-pointer"
              >
                {link.label}
              </motion.a>
            ))}
          </div>

          {/* Right Side - Auth Buttons */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg bg-zinc-800 text-white hover:bg-zinc-700 transition-colors"
            >
              {isOpen ? '✕' : '☰'}
            </motion.button>

            {/* Desktop Auth Buttons */}
            <div className="hidden sm:flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/login')}
                className="px-4 py-2 rounded-lg bg-zinc-700/50 border border-zinc-600 text-white font-semibold text-sm hover:bg-zinc-700 transition-all"
              >
                Login
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/register')}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold text-sm hover:shadow-lg transition-all"
              >
                Signup
              </motion.button>
            </div>

            {/* Mobile Auth Buttons */}
            <div className="sm:hidden flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/login')}
                className="px-3 py-1 rounded text-xs bg-zinc-700 text-white font-semibold hover:bg-zinc-600 transition-colors"
              >
                Log In
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden pb-4 border-t border-zinc-700/50"
          >
            <div className="flex flex-col gap-3 mt-4">
              {navLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleScroll(e, link.href)}
                  className="text-zinc-300 hover:text-orange-400 font-semibold text-sm px-4 py-2 rounded-lg hover:bg-zinc-800 transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
              <div className="border-t border-zinc-700/50 mt-2 pt-2 flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/login')}
                  className="flex-1 px-3 py-2 rounded text-sm bg-zinc-700 text-white font-semibold hover:bg-zinc-600 transition-colors"
                >
                  Login
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/register')}
                  className="flex-1 px-3 py-2 rounded text-sm bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold hover:shadow-lg transition-all"
                >
                  Signup
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default PublicNavbar;
