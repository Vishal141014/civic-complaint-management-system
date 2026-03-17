import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const navByRole = {
  citizen: [{ label: 'Citizen Dashboard', to: '/citizen' }],
  admin: [{ label: 'Admin Dashboard', to: '/admin' }],
  worker: [{ label: 'Worker Dashboard', to: '/worker' }],
  superadmin: [{ label: 'Super Admin Dashboard', to: '/superadmin' }],
};

export default function Sidebar() {
  const { role } = useAuth();
  const items = navByRole[role] || [];

  return (
    <aside className="sidebar">
      <h3 className="sidebar-title">Navigation</h3>
      <nav>
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `side-link ${isActive ? 'active' : ''}`}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
