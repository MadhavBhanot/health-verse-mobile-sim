
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import PhoneFrame from '@/components/PhoneFrame';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { UserRound, Stethoscope, Building2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const RoleSelection = () => {
  const { setRole, user } = useUser();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleRoleSelection = (role: 'patient' | 'doctor' | 'pharmacy') => {
    setRole(role);
    toast({
      title: "Role selected",
      description: `You are now logged in as a ${role}`,
    });

    // Navigate to appropriate dashboard
    switch (role) {
      case 'Member':
        navigate('/patient/dashboard');
        break;
      case 'doctor':
        navigate('/doctor/dashboard');
        break;
      case 'pharmacy':
        navigate('/pharmacy/dashboard');
        break;
    }
  };

  return (
    <PhoneFrame>
      <div className="flex flex-col h-full p-6">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2">Select Your Role</h1>
          <p className="text-gray-600">
            Welcome {user?.name || 'User'}, please select how you'll use HealthVerse
          </p>
        </div>
        
        <div className="space-y-4 flex-1">
          <Card 
            className="p-4 border-2 hover:border-health-primary cursor-pointer transition-all"
            onClick={() => handleRoleSelection('patient')}
          >
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-full mr-4">
                <UserRound className="text-health-primary" size={24} />
              </div>
              <div>
                <h2 className="font-semibold text-lg"></h2>
                <p className="text-sm text-gray-600">
                  Track health, find recipes, manage medications, book appointments
                </p>
              </div>
            </div>
          </Card>

          <Card 
            className="p-4 border-2 hover:border-health-secondary cursor-pointer transition-all"
            onClick={() => handleRoleSelection('doctor')}
          >
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-full mr-4">
                <Stethoscope className="text-health-secondary" size={24} />
              </div>
              <div>
                <h2 className="font-semibold text-lg">Doctor</h2>
                <p className="text-sm text-gray-600">
                  Manage appointments, set availability, conduct consultations
                </p>
              </div>
            </div>
          </Card>

          <Card 
            className="p-4 border-2 hover:border-health-accent cursor-pointer transition-all"
            onClick={() => handleRoleSelection('pharmacy')}
          >
            <div className="flex items-center">
              <div className="p-3 bg-red-100 rounded-full mr-4">
                <Building2 className="text-health-accent" size={24} />
              </div>
              <div>
                <h2 className="font-semibold text-lg">Pharmacy Owner</h2>
                <p className="text-sm text-gray-600">
                  Manage inventory, process medication orders
                </p>
              </div>
            </div>
          </Card>
        </div>

        <Button 
          variant="outline" 
          className="mt-4"
          onClick={() => navigate('/login')}
        >
          Log Out
        </Button>
      </div>
    </PhoneFrame>
  );
};

export default RoleSelection;
