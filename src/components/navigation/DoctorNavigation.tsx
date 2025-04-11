
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ClipboardList, Calendar, Home, Video, Clock } from 'lucide-react';

const DoctorNavigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: Home, label: 'Home', path: '/doctor/dashboard' },
    { icon: Calendar, label: 'Appointments', path: '/doctor/appointments' },
    { icon: Clock, label: 'Availability', path: '/doctor/availability' },
    { icon: Video, label: 'Consultation', path: '/doctor/consultation' },
    { icon: ClipboardList, label: 'Patient Notes', path: '/doctor/patient-notes' },
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

export default DoctorNavigation;
