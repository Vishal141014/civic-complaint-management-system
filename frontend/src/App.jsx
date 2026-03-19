import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import { useAuth } from './context/AuthContext';
import { useTheme } from './context/ThemeContext';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Unauthorized from './pages/Unauthorized';

// Citizen Pages
import CitizenMyComplaints from './pages/citizen/MyComplaints';
import CitizenSubmit from './pages/citizen/SubmitComplaint';
import CitizenDetail from './pages/citizen/ComplaintDetail';
import CitizenReRaise from './pages/citizen/ReRaise';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminAssign from './pages/admin/AssignComplaint';
import AdminReview from './pages/admin/ReviewComplaint';
import DeptAdminDashboard from './pages/admin/DeptAdminDashboard';

// Worker Pages
import WorkerDashboard from './pages/worker/WorkerDashboard';
import WorkerTasks from './pages/worker/WorkerTasks';
import WorkerDetail from './pages/worker/TaskDetail';
import WorkerUpload from './pages/worker/UploadCompletion';

// Super Admin Pages
import SuperAdminDashboard from './pages/superadmin/SuperDashboard';
import SuperAdminAnalytics from './pages/superadmin/Analytics';
import SuperAdminDeptAdminCreate from './pages/superadmin/DeptAdminCreate';

import LandingPage from './pages/LandingPage';

import './styles/globals.css';

function App() {
  const { isDark } = useTheme();
  const location = useLocation();

  // Smooth scroll on route change
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-zinc-950 text-zinc-100' : 'bg-white text-zinc-900'}`} style={{ scrollBehavior: 'smooth' }}>
      <AnimatePresence mode="wait">
        <Routes>
          {/* Public Routes - Manage their own navbar */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Citizen Routes with Navbar */}
          <Route
            path="/citizen/my-complaints"
            element={
              <PrivateRoute allowedRoles={['citizen']}>
                <>
                  <Navbar />
                  <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <CitizenMyComplaints />
                  </main>
                </>
              </PrivateRoute>
            }
          />
          <Route
            path="/citizen/submit"
            element={
              <PrivateRoute allowedRoles={['citizen']}>
                <>
                  <Navbar />
                  <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <CitizenSubmit />
                  </main>
                </>
              </PrivateRoute>
            }
          />
          <Route
            path="/citizen/complaint/:id"
            element={
              <PrivateRoute allowedRoles={['citizen']}>
                <>
                  <Navbar />
                  <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <CitizenDetail />
                  </main>
                </>
              </PrivateRoute>
            }
          />
          <Route
            path="/citizen/reraise/:id"
            element={
              <PrivateRoute allowedRoles={['citizen']}>
                <>
                  <Navbar />
                  <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <CitizenReRaise />
                  </main>
                </>
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute allowedRoles={['citizen', 'worker', 'admin', 'dept_admin', 'superadmin']}>
                <>
                  <Navbar />
                  <Profile />
                </>
              </PrivateRoute>
            }
          />

          {/* Admin Routes with Navbar */}
          <Route
            path="/admin/dashboard"
            element={
              <PrivateRoute allowedRoles={['admin', 'dept_admin']}>
                <>
                  <Navbar />
                  <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <AdminDashboard />
                  </main>
                </>
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/assign/:id"
            element={
              <PrivateRoute allowedRoles={['admin', 'dept_admin']}>
                <>
                  <Navbar />
                  <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <AdminAssign />
                  </main>
                </>
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/review/:id"
            element={
              <PrivateRoute allowedRoles={['admin', 'dept_admin']}>
                <>
                  <Navbar />
                  <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <AdminReview />
                  </main>
                </>
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/dept-admin-dashboard"
            element={
              <PrivateRoute allowedRoles={['dept_admin']}>
                <>
                  <Navbar />
                  <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <DeptAdminDashboard />
                  </main>
                </>
              </PrivateRoute>
            }
          />

          {/* Worker Routes with Navbar */}
          <Route
            path="/worker/dashboard"
            element={
              <PrivateRoute allowedRoles={['worker', 'field_worker']}>
                <>
                  <Navbar />
                  <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <WorkerDashboard />
                  </main>
                </>
              </PrivateRoute>
            }
          />
          <Route
            path="/worker/tasks"
            element={
              <PrivateRoute allowedRoles={['worker', 'field_worker']}>
                <>
                  <Navbar />
                  <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <WorkerTasks />
                  </main>
                </>
              </PrivateRoute>
            }
          />
          <Route
            path="/worker/task/:id"
            element={
              <PrivateRoute allowedRoles={['worker', 'field_worker']}>
                <>
                  <Navbar />
                  <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <WorkerDetail />
                  </main>
                </>
              </PrivateRoute>
            }
          />
          <Route
            path="/worker/upload/:id"
            element={
              <PrivateRoute allowedRoles={['worker', 'field_worker']}>
                <>
                  <Navbar />
                  <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <WorkerUpload />
                  </main>
                </>
              </PrivateRoute>
            }
          />

          {/* Super Admin Routes with Navbar */}
          <Route
            path="/superadmin/dashboard"
            element={
              <PrivateRoute allowedRoles={['superadmin', 'super_admin']}>
                <>
                  <Navbar />
                  <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <SuperAdminDashboard />
                  </main>
                </>
              </PrivateRoute>
            }
          />
          <Route
            path="/superadmin/analytics"
            element={
              <PrivateRoute allowedRoles={['superadmin', 'super_admin']}>
                <>
                  <Navbar />
                  <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <SuperAdminAnalytics />
                  </main>
                </>
              </PrivateRoute>
            }
          />
          <Route
            path="/superadmin/dept-admin-create"
            element={
              <PrivateRoute allowedRoles={['superadmin', 'super_admin']}>
                <>
                  <Navbar />
                  <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <SuperAdminDeptAdminCreate />
                  </main>
                </>
              </PrivateRoute>
            }
          />

          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/unauthorized" replace />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
