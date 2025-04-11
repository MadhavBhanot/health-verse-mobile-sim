
import React from 'react';
import AuthenticatedLayout from '@/components/layouts/AuthenticatedLayout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useUser } from '@/contexts/UserContext';
import { mockHealthMetrics, mockMedications, mockAppointments } from '@/utils/mockData';
import { Activity, Heart, Bed, Droplet, Weight, Calendar, Pill } from 'lucide-react';

const PatientDashboard = () => {
  const { user } = useUser();

  return (
    <AuthenticatedLayout requiredRole="patient">
      <div className="p-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Hello, {user?.name?.split(' ')[0]}</h1>
            <p className="text-gray-600">Let's check your health today</p>
          </div>
          <button className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
            {user?.name?.charAt(0) || 'U'}
          </button>
        </div>

        <Card className="bg-health-primary text-white p-4 mb-4 rounded-xl">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold">Today's Activity</h2>
              <div className="flex items-center mt-2">
                <Activity className="mr-2" size={20} />
                <span className="text-xl font-bold">{mockHealthMetrics.steps}</span>
                <span className="ml-1">steps</span>
              </div>
            </div>
            <div>
              <span className="text-sm">{mockHealthMetrics.caloriesBurned} calories</span>
            </div>
          </div>
        </Card>

        <h2 className="text-lg font-semibold mb-3">Health Metrics</h2>
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Card className="p-3 flex flex-col items-center">
            <Heart size={18} className="text-health-accent mb-1" />
            <span className="text-xs text-gray-600">Heart Rate</span>
            <span className="text-lg font-bold">{mockHealthMetrics.heartRate} bpm</span>
          </Card>
          <Card className="p-3 flex flex-col items-center">
            <Droplet size={18} className="text-health-primary mb-1" />
            <span className="text-xs text-gray-600">Blood Pressure</span>
            <span className="text-lg font-bold">{mockHealthMetrics.bloodPressure.systolic}/{mockHealthMetrics.bloodPressure.diastolic}</span>
          </Card>
          <Card className="p-3 flex flex-col items-center">
            <Bed size={18} className="text-indigo-500 mb-1" />
            <span className="text-xs text-gray-600">Sleep</span>
            <span className="text-lg font-bold">{mockHealthMetrics.sleep} hrs</span>
          </Card>
          <Card className="p-3 flex flex-col items-center">
            <Weight size={18} className="text-health-secondary mb-1" />
            <span className="text-xs text-gray-600">Weight</span>
            <span className="text-lg font-bold">{mockHealthMetrics.weight} kg</span>
          </Card>
        </div>

        <h2 className="text-lg font-semibold mb-3">Upcoming</h2>
        <div className="space-y-3 mb-4">
          {mockMedications.length > 0 && (
            <Card className="p-3">
              <div className="flex items-start">
                <div className="bg-red-100 p-2 rounded-lg mr-3">
                  <Pill className="text-health-accent" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold">{mockMedications[0].name}</h3>
                  <p className="text-xs text-gray-600">{mockMedications[0].time} • {mockMedications[0].dosage}</p>
                </div>
              </div>
            </Card>
          )}
          {mockAppointments.length > 0 && (
            <Card className="p-3">
              <div className="flex items-start">
                <div className="bg-blue-100 p-2 rounded-lg mr-3">
                  <Calendar className="text-health-primary" size={20} />
                </div>
                <div>
                  <h3 className="font-semibold">{mockAppointments[0].doctorName}</h3>
                  <p className="text-xs text-gray-600">{mockAppointments[0].date} • {mockAppointments[0].time}</p>
                </div>
              </div>
            </Card>
          )}
        </div>

        <Button className="w-full btn-health-primary">View All Health Data</Button>
      </div>
    </AuthenticatedLayout>
  );
};

export default PatientDashboard;
