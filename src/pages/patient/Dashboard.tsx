import React from 'react';
import AuthenticatedLayout from '@/components/layouts/AuthenticatedLayout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useUser } from '@/contexts/UserContext';
import { mockHealthMetrics, mockMedications, mockAppointments } from '@/utils/mockData';
import { Activity, Heart, Bed, Droplet, Weight, Calendar, Pill, ChevronRight } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useNavigate } from 'react-router-dom';

const PatientDashboard = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  return (
    <AuthenticatedLayout requiredRole="patient">
      <div className="p-4 pb-0">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-xl font-semibold mb-0.5">Hello, {user?.name?.split(' ')[0]}</h1>
            <p className="text-sm text-gray-600">Let's check your health today</p>
          </div>
          <Avatar className="h-10 w-10 bg-health-primary text-white">
            <AvatarFallback>{user?.name?.charAt(0) || 'U'}</AvatarFallback>
          </Avatar>
        </div>

        <Card className="bg-gradient-to-r from-health-primary to-blue-400 text-white p-4 mb-4 rounded-xl border-none shadow-md">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-base font-medium mb-1">Today's Activity</h2>
              <div className="flex items-center">
                <Activity className="mr-2" size={18} />
                <span className="text-xl font-bold">{mockHealthMetrics.steps}</span>
                <span className="ml-1 text-sm opacity-90">steps</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs opacity-80">Calories</span>
              <p className="text-lg font-semibold">{mockHealthMetrics.caloriesBurned}</p>
            </div>
          </div>
        </Card>

        <h2 className="section-title">Health Metrics</h2>
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="health-metric-card">
            <Heart size={16} className="text-health-accent mb-1" />
            <span className="text-xs text-gray-500 mb-0.5">Heart Rate</span>
            <span className="text-base font-semibold">{mockHealthMetrics.heartRate} bpm</span>
          </div>
          <div className="health-metric-card">
            <Droplet size={16} className="text-health-primary mb-1" />
            <span className="text-xs text-gray-500 mb-0.5">Blood Pressure</span>
            <span className="text-base font-semibold">{mockHealthMetrics.bloodPressure.systolic}/{mockHealthMetrics.bloodPressure.diastolic}</span>
          </div>
          <div className="health-metric-card">
            <Bed size={16} className="text-indigo-500 mb-1" />
            <span className="text-xs text-gray-500 mb-0.5">Sleep</span>
            <span className="text-base font-semibold">{mockHealthMetrics.sleep} hrs</span>
          </div>
          <div className="health-metric-card">
            <Weight size={16} className="text-health-secondary mb-1" />
            <span className="text-xs text-gray-500 mb-0.5">Weight</span>
            <span className="text-base font-semibold">{mockHealthMetrics.weight} kg</span>
          </div>
        </div>

        <h2 className="section-title">Upcoming</h2>
        <div className="space-y-3 mb-4">
          {mockMedications.length > 0 && (
            <div className="upcoming-card">
              <div className="flex items-start">
                <div className="bg-red-50 p-2 rounded-lg mr-3">
                  <Pill className="text-health-accent" size={16} />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-sm">{mockMedications[0].name}</h3>
                  <p className="text-xs text-gray-500">{mockMedications[0].time} • {mockMedications[0].dosage}</p>
                </div>
                <ChevronRight size={16} className="text-gray-400 self-center" />
              </div>
            </div>
          )}
          {mockAppointments.length > 0 && (
            <div className="upcoming-card">
              <div className="flex items-start">
                <div className="bg-blue-50 p-2 rounded-lg mr-3">
                  <Calendar className="text-health-primary" size={16} />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-sm">{mockAppointments[0].doctorName}</h3>
                  <p className="text-xs text-gray-500">{mockAppointments[0].date} • {mockAppointments[0].time}</p>
                </div>
                <ChevronRight size={16} className="text-gray-400 self-center" />
              </div>
            </div>
          )}
        </div>

        <Button className="w-full bg-health-primary hover:bg-health-primary/90 text-sm py-5">
          View All Health Data
        </Button>
      </div>
      <div className="flex items-center">
        <Button 
          variant="outline" 
          className="mt-4 flex self-center"
          onClick={() => navigate('/login')}
        >
          Log Out
        </Button>
      </div>
    </AuthenticatedLayout>
  );
};

export default PatientDashboard;
