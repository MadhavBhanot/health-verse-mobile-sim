
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import PhoneFrame from '@/components/PhoneFrame';
import { Button } from '@/components/ui/button';
import { Activity } from 'lucide-react';

const Index = () => {
  const { isAuthenticated, user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      if (!user?.role) {
        navigate('/role-selection');
      } else {
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
        }
      }
    }
  }, [isAuthenticated, user, navigate]);

  return (
    <PhoneFrame>
      <div className="flex flex-col items-center justify-center h-full px-6 text-center">
        <div className="mb-8 text-health-primary animate-pulse-light">
          <Activity size={72} />
        </div>
        <h1 className="text-3xl font-bold mb-2">HealthVerse</h1>
        <p className="text-gray-600 mb-8">Your comprehensive health & wellness companion</p>
        <div className="space-y-4 w-full">
          <Button 
            className="w-full btn-health-primary" 
            onClick={() => navigate('/login')}
          >
            Login
          </Button>
          <Button 
            className="w-full btn-health-secondary" 
            onClick={() => navigate('/register')}
          >
            Register
          </Button>
        </div>
      </div>
    </PhoneFrame>
  );
};

export default Index;
