
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, PackageCheck, ClipboardList } from 'lucide-react';

const PharmacyNavigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: Home, label: 'Home', path: '/pharmacy/dashboard' },
    { icon: PackageCheck, label: 'Inventory', path: '/pharmacy/inventory' },
    { icon: ClipboardList, label: 'Orders', path: '/pharmacy/orders' },
  ];

  return (
    <div className="bg-white border-t border-gray-200 flex justify-between items-center px-2 py-1.5">
      {navItems.map((item) => (
        <button
          key={item.path}
          className={`flex flex-col items-center justify-center p-1 ${
            location.pathname === item.path 
              ? 'text-health-primary' 
              : 'text-gray-400 hover:text-gray-600'
          }`}
          onClick={() => navigate(item.path)}
        >
          <item.icon size={18} />
          <span className="text-[10px] mt-0.5">{item.label}</span>
        </button>
      ))}
    </div>
  );
};

export default PharmacyNavigation;
