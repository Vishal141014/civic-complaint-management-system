const RoleBadge = ({ role }) => {
  const roleConfig = {
    citizen: { label: 'Citizen', color: 'bg-blue-500 text-white' },
    admin: { label: 'Dept Admin', color: 'bg-orange-600 text-white' },
    dept_admin: { label: 'Dept Admin', color: 'bg-orange-600 text-white' },
    worker: { label: 'Field Worker', color: 'bg-green-600 text-white' },
    field_worker: { label: 'Field Worker', color: 'bg-green-600 text-white' },
    superadmin: { label: 'Super Admin', color: 'bg-purple-600 text-white' },
    super_admin: { label: 'Super Admin', color: 'bg-purple-600 text-white' },
  };

  const config = roleConfig[role] || { label: role, color: 'bg-gray-500 text-white' };

  return (
    <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold ${config.color}`}>
      {config.label}
    </span>
  );
};

export default RoleBadge;
