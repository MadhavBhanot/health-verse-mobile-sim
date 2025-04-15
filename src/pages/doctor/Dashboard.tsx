
import React from 'react';
import AuthenticatedLayout from '@/components/layouts/AuthenticatedLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useUser } from '@/contexts/UserContext';
import { mockAppointments } from '@/utils/mockData';
import { Calendar, Clock, Video, Users, CheckCircle2, ClipboardList } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DoctorDashboard = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  
  // Mock data for doctor dashboard
  const todayAppointments = mockAppointments.slice(0, 1);
  const upcomingConsultations = 3;
  const totalPatients = 24;
  const completedAppointments = 8;

  const stats = [
    { icon: Users, label: 'Patients', value: totalPatients, color: 'bg-blue-100 text-health-primary' },
    { icon: Calendar, label: 'Upcoming', value: upcomingConsultations, color: 'bg-green-100 text-health-secondary' },
    { icon: CheckCircle2, label: 'Completed', value: completedAppointments, color: 'bg-purple-100 text-purple-600' },
  ];

  return (
    <AuthenticatedLayout requiredRole="doctor">
      <div className="p-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Hello, Dr. {user?.name?.split(' ')[1] || 'User'}</h1>
            <p className="text-gray-600">Welcome back</p>
          </div>
          <button className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
            {user?.name?.charAt(0) || 'D'}
          </button>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          {stats.map((stat, index) => (
            <Card key={index} className="p-3 flex flex-col items-center justify-center">
              <div className={`p-2 rounded-full mb-2 ${stat.color}`}>
                <stat.icon size={16} />
              </div>
              <span className="text-xl font-bold">{stat.value}</span>
              <span className="text-xs text-gray-600">{stat.label}</span>
            </Card>
          ))}
        </div>

        <h2 className="text-lg font-semibold mb-3">Today's Schedule</h2>
        {todayAppointments.length > 0 ? (
          <div className="space-y-3 mb-6">
            {todayAppointments.map((appointment) => (
              <Card key={appointment.id} className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">Patient: John Doe</h3>
                    <div className="flex items-center mt-1 text-xs text-gray-600">
                      <Clock size={14} className="mr-1" />
                      <span>{appointment.time}</span>
                      {appointment.type === 'Virtual' && (
                        <>
                          <div className="mx-2 w-1 h-1 bg-gray-400 rounded-full"></div>
                          <Video size={14} className="text-health-primary mr-1" />
                          <span className="text-health-primary">Virtual</span>
                        </>
                      )}
                    </div>
                  </div>
                  <Button 
                    className="bg-health-primary text-xs px-3 py-1 h-auto"
                    onClick={() => navigate('/doctor/consultation')}
                  >
                    Start
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-6 text-center mb-6">
            <Calendar className="mx-auto mb-2" size={24} />
            <p className="text-gray-600">No appointments scheduled for today</p>
          </Card>
        )}
         <div className="flex items-center">
          <Button 
          variant="outline" 
          className="mt-4
          flex self-center"
          onClick={() => navigate('/login')}
        >
          Log Out
        </Button></div>
        <div className="grid grid-cols-2 gap-4">
          <Button 
            className="flex-col py-6 bg-health-primary"
            onClick={() => navigate('/doctor/appointments')}
          >
            <Calendar size={24} className="mb-2" />
            <span>Appointments</span>
          </Button>
          <Button 
            className="flex-col py-6 bg-health-secondary"
            onClick={() => navigate('/doctor/patient-notes')}
          >
            <ClipboardList size={24} className="mb-2" />
            <span>Patient Notes</span>
          </Button>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default DoctorDashboard;
