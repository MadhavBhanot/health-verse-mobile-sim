
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import PhoneFrame from '@/components/PhoneFrame';
import PatientNavigation from '@/components/navigation/PatientNavigation';
import DoctorNavigation from '@/components/navigation/DoctorNavigation';
import PharmacyNavigation from '@/components/navigation/PharmacyNavigation';

interface AuthenticatedLayoutProps {
  children: React.ReactNode;
  requiredRole?: 'patient' | 'doctor' | 'pharmacy';
}

const AuthenticatedLayout: React.FC<AuthenticatedLayoutProps> = ({ 
  children, 
  requiredRole 
}) => {
  const { user, isAuthenticated } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (!user?.role) {
      navigate('/role-selection');
      return;
    }

    if (requiredRole && user.role !== requiredRole) {
      // Navigate to appropriate dashboard based on role
      switch (user.role) {
        case 'patient':
          navigate('/patient/dashboard');
          break;
        case 'doctor':
          navigate('/doctor/dashboard');
          break;
        case 'pharmacy':
          navigate('/pharmacy/dashboard');
          break;
        default:
          navigate('/role-selection');
      }
    }
  }, [isAuthenticated, user, navigate, requiredRole]);

  const renderNavigation = () => {
    if (!user?.role) return null;
    
    switch (user.role) {
      case 'patient':
        return <PatientNavigation />;
      case 'doctor':
        return <DoctorNavigation />;
      case 'pharmacy':
        return <PharmacyNavigation />;
      default:
        return null;
    }
  };

  return (
    <PhoneFrame>
      <div className="pb-16 h-full">
        {children}
      </div>
      {renderNavigation()}
    </PhoneFrame>
  );
};

export default AuthenticatedLayout;
