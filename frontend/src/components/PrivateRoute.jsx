import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children, allowedRoles = [] }) => {
  const { isAuthenticated, role, isVerifying } = useAuth();

  if (isVerifying) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-50 to-gray-100 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-orange-500/20 border-t-orange-500 rounded-full animate-spin"></div>
          <p className="text-zinc-700 font-semibold">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    // Redirect to their own dashboard if they try to access wrong role
    const rolePathMap = {
      citizen: '/citizen/my-complaints',
      admin: '/admin/dashboard',
      dept_admin: '/admin/dashboard',
      worker: '/worker/tasks',
      field_worker: '/worker/tasks',
      superadmin: '/superadmin/dashboard',
      super_admin: '/superadmin/dashboard',
    };
    return <Navigate to={rolePathMap[role] || '/unauthorized'} replace />;
  }

  return children;
};

export default PrivateRoute;
