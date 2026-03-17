import { Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';

// Pages
import Login from './pages/Login';
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

// Worker Pages
import WorkerTasks from './pages/worker/WorkerTasks';
import WorkerDetail from './pages/worker/TaskDetail';
import WorkerUpload from './pages/worker/UploadCompletion';

// Super Admin Pages
import SuperAdminDashboard from './pages/superadmin/SuperDashboard';
import SuperAdminAnalytics from './pages/superadmin/Analytics';

import './styles/globals.css';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-900 via-navy-950 to-navy-900">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <AnimatePresence mode="wait">
              <Routes>
                {/* Public Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/unauthorized" element={<Unauthorized />} />

                {/* Citizen Routes */}
                <Route
                  path="/citizen/my-complaints"
                  element={
                    <PrivateRoute allowedRoles={['citizen']}>
                      <CitizenMyComplaints />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/citizen/submit"
                  element={
                    <PrivateRoute allowedRoles={['citizen']}>
                      <CitizenSubmit />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/citizen/complaint/:id"
                  element={
                    <PrivateRoute allowedRoles={['citizen']}>
                      <CitizenDetail />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/citizen/reraise/:id"
                  element={
                    <PrivateRoute allowedRoles={['citizen']}>
                      <CitizenReRaise />
                    </PrivateRoute>
                  }
                />

                {/* Admin Routes */}
                <Route
                  path="/admin/dashboard"
                  element={
                    <PrivateRoute allowedRoles={['admin', 'dept_admin']}>
                      <AdminDashboard />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/admin/assign/:id"
                  element={
                    <PrivateRoute allowedRoles={['admin', 'dept_admin']}>
                      <AdminAssign />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/admin/review/:id"
                  element={
                    <PrivateRoute allowedRoles={['admin', 'dept_admin']}>
                      <AdminReview />
                    </PrivateRoute>
                  }
                />

                {/* Worker Routes */}
                <Route
                  path="/worker/tasks"
                  element={
                    <PrivateRoute allowedRoles={['worker', 'field_worker']}>
                      <WorkerTasks />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/worker/task/:id"
                  element={
                    <PrivateRoute allowedRoles={['worker', 'field_worker']}>
                      <WorkerDetail />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/worker/upload/:id"
                  element={
                    <PrivateRoute allowedRoles={['worker', 'field_worker']}>
                      <WorkerUpload />
                    </PrivateRoute>
                  }
                />

                {/* Super Admin Routes */}
                <Route
                  path="/superadmin/dashboard"
                  element={
                    <PrivateRoute allowedRoles={['superadmin', 'super_admin']}>
                      <SuperAdminDashboard />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/superadmin/analytics"
                  element={
                    <PrivateRoute allowedRoles={['superadmin', 'super_admin']}>
                      <SuperAdminAnalytics />
                    </PrivateRoute>
                  }
                />

                {/* Default Route */}
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="*" element={<Navigate to="/unauthorized" replace />} />
              </Routes>
            </AnimatePresence>
        </main>
    </div>
  );
}

export default App;
