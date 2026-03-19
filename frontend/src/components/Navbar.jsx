import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import RoleBadge from './RoleBadge';

const Navbar = () => {
  const { user, role, logout, isAuthenticated } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    setMobileMenuOpen(false);
  }, [navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getNavLinks = () => {
    switch (role) {
      case 'citizen':
        return [
          { label: 'My Complaints', path: '/citizen/my-complaints', icon: '📋' },
          { label: 'Submit New', path: '/citizen/submit', icon: '➕', highlight: true },
        ];
      case 'admin':
        return [
          { label: 'Dashboard', path: '/admin/dashboard', icon: '📊' },
          { label: 'Assign', path: '/admin/assign', icon: '👤' },
          { label: 'Review', path: '/admin/review', icon: '✓' },
        ];
      case 'dept_admin':
        return [
          { label: 'Dashboard', path: '/admin/dept-admin-dashboard', icon: '🏛️' },
          { label: 'Worker Requests', path: '/admin/dept-admin-dashboard', icon: '👷' },
        ];
      case 'worker':
      case 'field_worker':
        return [
          { label: 'My Tasks', path: '/worker/tasks', icon: '✅' },
          { label: 'Dashboard', path: '/worker/dashboard', icon: '📊' },
        ];
      case 'superadmin':
      case 'super_admin':
        return [
          { label: 'Dashboard', path: '/superadmin/dashboard', icon: '👑' },
          { label: 'Analytics', path: '/superadmin/analytics', icon: '📈' },
          { label: 'Dept Admins', path: '/superadmin/dept-admin-create', icon: '🔧' },
        ];
      default:
        return [];
    }
  };

  const navLinks = getNavLinks();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`sticky top-0 z-50 backdrop-blur-xl border-b transition-all ${
        isDark
          ? 'bg-zinc-950/70 border-zinc-700/50'
          : 'bg-white/80 border-zinc-200/50'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate('/')}
            className="cursor-pointer font-bold text-2xl font-syne"
          >
            <span className="text-orange-600">🇮🇳</span>
            <span className={isDark ? 'text-white' : 'text-zinc-900'}> Smart</span>
            <span className="text-orange-600"> P-CRM</span>
          </motion.div>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-4">
            {navLinks.map((link) => (
              link.highlight ? (
                <motion.button
                  key={link.path}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate(link.path)}
                  className="px-5 py-2 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-sm hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg hover:shadow-orange-500/50"
                >
                  <span className="mr-2">{link.icon}</span>{link.label}
                </motion.button>
              ) : (
                <motion.button
                  key={link.path}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => navigate(link.path)}
                  className={`font-semibold text-sm transition-all px-3 py-2 rounded-md ${
                    isDark
                      ? 'text-zinc-300 hover:text-orange-400 hover:bg-zinc-800/50'
                      : 'text-zinc-600 hover:text-orange-600 hover:bg-zinc-100/50'
                  }`}
                >
                  <span className="mr-1">{link.icon}</span>{link.label}
                </motion.button>
              )
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg transition-all"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>

          {/* Right Controls */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-all ${
                isDark
                  ? 'bg-zinc-800 text-yellow-400 hover:bg-zinc-700'
                  : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
              }`}
            >
              {isDark ? '☀️' : '🌙'}
            </motion.button>

            {/* User Info & Logout */}
            <div className="flex items-center gap-4">
              <div className="hidden sm:block text-right">
                <p className={`text-sm font-bold ${isDark ? 'text-white' : 'text-zinc-900'}`}>
                  {user?.name || 'User'}
                </p>
                <RoleBadge role={role} />
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/profile')}
                className={`px-4 py-2 rounded-lg font-bold text-sm transition-colors ${
                  isDark
                    ? 'bg-zinc-700 text-zinc-100 hover:bg-zinc-600'
                    : 'bg-zinc-200 text-zinc-900 hover:bg-zinc-300'
                }`}
              >
                👤 Profile
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg bg-red-600 text-white font-bold text-sm hover:bg-red-700 transition-colors"
              >
                Logout
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={mobileMenuOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={`md:hidden overflow-hidden border-t ${isDark ? 'border-zinc-700/50' : 'border-zinc-200/50'}`}
        >
          <div className={`px-4 py-4 space-y-2 ${isDark ? 'bg-zinc-800/50' : 'bg-zinc-50/50'}`}>
            {navLinks.map((link) => (
              <motion.button
                key={link.path}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  navigate(link.path);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all font-semibold text-sm ${
                  link.highlight
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700'
                    : isDark
                      ? 'text-zinc-300 hover:text-orange-400 hover:bg-zinc-700/50'
                      : 'text-zinc-600 hover:text-orange-600 hover:bg-zinc-100/50'
                }`}
              >
                <span className="mr-2">{link.icon}</span>{link.label}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
