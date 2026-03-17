import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import RoleBadge from './RoleBadge';

const Navbar = () => {
  const { user, role, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getNavLinks = () => {
    switch (role) {
      case 'citizen':
        return [
          { label: 'Submit', path: '/citizen/submit' },
          { label: 'My Complaints', path: '/citizen/my-complaints' },
        ];
      case 'admin':
      case 'dept_admin':
        return [
          { label: 'Dashboard', path: '/admin/dashboard' },
          { label: 'Assign', path: '/admin/assign' },
          { label: 'Review', path: '/admin/review' },
        ];
      case 'worker':
      case 'field_worker':
        return [
          { label: 'My Tasks', path: '/worker/tasks' },
        ];
      case 'superadmin':
      case 'super_admin':
        return [
          { label: 'Dashboard', path: '/superadmin/dashboard' },
          { label: 'Analytics', path: '/superadmin/analytics' },
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
      className="sticky top-0 z-50 backdrop-blur-xl bg-navy-950/80 border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate('/')}
            className="cursor-pointer font-syne font-bold text-xl text-white"
          >
            CivicComplaints
          </motion.div>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <motion.button
                key={link.path}
                whileHover={{ color: '#FF6B00' }}
                onClick={() => navigate(link.path)}
                className="text-white/80 hover:text-white font-syne font-bold text-sm transition-colors"
              >
                {link.label}
              </motion.button>
            ))}
          </div>

          {/* User Info & Logout */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-bold text-white">{user?.name || 'User'}</p>
              <RoleBadge role={role} />
            </div>
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
    </motion.nav>
  );
};

export default Navbar;
