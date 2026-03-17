import { motion } from 'framer-motion';

const SidebarItem = ({ icon, label, badge, active = false, onClick }) => (
  <motion.button
    whileHover={{ x: 4 }}
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-5 py-3 text-sm font-bold transition-all border-l-4 ${
      active
        ? 'bg-saffron/10 border-saffron text-saffron'
        : 'text-white/50 border-transparent hover:text-white/75 hover:bg-white/5'
    }`}
  >
    <span className="text-lg">{icon}</span>
    <span className="flex-1 text-left">{label}</span>
    {badge && (
      <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-full font-mono">
        {badge}
      </span>
    )}
  </motion.button>
);

const SidebarSection = ({ title }) => (
  <div className="px-5 py-3 text-xs font-mono font-bold text-white/25 uppercase tracking-widest">
    {title}
  </div>
);

const Sidebar = ({ items, title, subtitle, activeItem, onItemClick }) => (
  <motion.aside
    initial={{ x: -100 }}
    animate={{ x: 0 }}
    className="w-56 bg-navy min-h-screen border-r border-navy-light flex flex-col"
  >
    {/* Brand */}
    {title && (
      <div className="px-5 py-6 border-b border-white/10">
        <h3 className="text-white font-bold text-base">{title}</h3>
        {subtitle && <p className="text-xs text-white/40 font-mono mt-1">{subtitle}</p>}
      </div>
    )}

    {/* Items */}
    <nav className="flex-1 overflow-y-auto py-4">
      {items.map((item, idx) => (
        <div key={idx}>
          {item.section && <SidebarSection title={item.section} />}
          {item.id && (
            <SidebarItem
              icon={item.icon}
              label={item.label}
              badge={item.badge}
              active={activeItem === item.id}
              onClick={() => onItemClick?.(item.id)}
            />
          )}
        </div>
      ))}
    </nav>
  </motion.aside>
);

export { Sidebar, SidebarItem, SidebarSection };
