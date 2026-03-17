import { motion } from 'framer-motion';

const TabBar = ({ activeTab, onTabChange, tabs }) => {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 bg-navy shadow-lg border-b border-navy-light"
    >
      <div className="flex items-stretch overflow-x-auto scrollbar-hide">
        {/* Logo */}
        <div className="flex-shrink-0 flex items-center gap-2 px-6 py-4 border-r border-white/10">
          <div className="flex flex-col gap-0.5">
            <div className="w-5 h-1.5 rounded-sm bg-orange-400"></div>
            <div className="w-5 h-1.5 rounded-sm bg-white"></div>
            <div className="w-5 h-1.5 rounded-sm bg-green-600"></div>
          </div>
          <span className="text-white font-bold text-sm whitespace-nowrap">P-CRM</span>
        </div>

        {/* Tabs */}
        <div className="flex flex-1 overflow-x-auto">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
              whileTap={{ scale: 0.98 }}
              className={`px-6 py-4 text-sm font-bold font-baloo whitespace-nowrap border-b-4 transition-all ${
                activeTab === tab.id
                  ? 'text-white border-saffron'
                  : 'text-white/50 border-transparent hover:text-white/75'
              }`}
            >
              {tab.icon && <span className="mr-2">{tab.icon}</span>}
              <span className="hidden sm:inline">{tab.label}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default TabBar;
