
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import PhoneFrame from '@/components/PhoneFrame';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Activity, Info } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Register = () => {
  const [name, setName] = useState('New User');
  const [email, setEmail] = useState('newuser@example.com');
  const [password, setPassword] = useState('password123');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useUser();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await register(name, email, password);
      if (success) {
        toast({
          title: "Registration successful",
          description: "Welcome to HealthVerse",
        });
        navigate('/role-selection');
      } else {
        toast({
          variant: "destructive",
          title: "Registration failed",
          description: "Please check your information and try again",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Registration error",
        description: "An unexpected error occurred",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PhoneFrame>
      <div className="flex flex-col h-full">
        <div className="flex items-center p-4 border-b">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate('/')}
          >
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-lg font-semibold ml-2">Create Account</h1>
        </div>
        <div className="flex flex-col items-center justify-center flex-1 p-6">
          <div className="text-health-primary mb-6">
            <Activity size={48} />
          </div>
          <h2 className="text-2xl font-bold mb-6">Join HealthVerse</h2>
          
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md flex items-start gap-2 w-full">
            <Info size={18} className="text-blue-500 mt-0.5" />
            <div className="text-sm text-gray-700">
              <p>For demo purposes, any non-empty values will work for registration</p>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="w-full space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button 
              type="submit" 
              className="w-full btn-health-primary"
              disabled={isLoading}
            >
              {isLoading ? 'Creating account...' : 'Register'}
            </Button>
          </form>
          <div className="mt-4 text-sm text-center">
            <span className="text-gray-600">Already have an account? </span>
            <button 
              className="text-health-primary font-medium"
              onClick={() => navigate('/login')}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
};

export default Register;
