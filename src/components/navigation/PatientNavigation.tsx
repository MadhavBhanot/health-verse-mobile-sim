
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ActivitySquare, Apple, Calendar, Home, Pill, ShoppingBag } from 'lucide-react';

const PatientNavigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: Home, label: 'Home', path: '/patient/dashboard' },
    { icon: Apple, label: 'Diet', path: '/patient/diet' },
    { icon: ActivitySquare, label: 'Recipes', path: '/patient/recipes' },
    { icon: Pill, label: 'Medications', path: '/patient/medications' },
    { icon: Calendar, label: 'Appointments', path: '/patient/appointments' },
    { icon: ShoppingBag, label: 'Order Meds', path: '/patient/medicine-order' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-between items-center p-2 z-10">
      {navItems.map((item) => (
        <button
          key={item.path}
          className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
          onClick={() => navigate(item.path)}
        >
          <item.icon size={20} />
          <span className="text-[10px] mt-1">{item.label}</span>
        </button>
      ))}
    </div>
  );
};

export default PatientNavigation;
