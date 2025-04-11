
import React, { useState } from 'react';
import AuthenticatedLayout from '@/components/layouts/AuthenticatedLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { mockAppointments } from '@/utils/mockData';
import { Calendar, Clock, MapPin, Video, Users, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState(mockAppointments);
  const { toast } = useToast();

  const cancelAppointment = (id) => {
    setAppointments(appointments.map(app => 
      app.id === id ? { ...app, status: 'Cancelled' } : app
    ));
    
    toast({
      title: "Appointment cancelled",
      description: "The appointment has been cancelled",
    });
  };

  const completeAppointment = (id) => {
    setAppointments(appointments.map(app => 
      app.id === id ? { ...app, status: 'Completed' } : app
    ));
    
    toast({
      title: "Appointment completed",
      description: "The appointment has been marked as completed",
    });
  };

  // Generate fake upcoming appointments for a week
  const generateUpcomingAppointments = () => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    return days.map((day, idx) => ({
      day,
      appointments: Array.from({ length: Math.floor(Math.random() * 3) + 1 }, (_, i) => ({
        id: `app-${idx}-${i}`,
        patientName: `Patient ${idx + i + 1}`,
        time: `${9 + Math.floor(Math.random() * 8)}:00`,
        type: Math.random() > 0.5 ? 'Virtual' : 'In-person',
      }))
    }));
  };

  const upcomingSchedule = generateUpcomingAppointments();

  return (
    <AuthenticatedLayout requiredRole="doctor">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-6">Appointments</h1>
        
        <Tabs defaultValue="upcoming">
          <TabsList className="w-full mb-4">
            <TabsTrigger value="upcoming" className="flex-1">Upcoming</TabsTrigger>
            <TabsTrigger value="past" className="flex-1">Past</TabsTrigger>
            <TabsTrigger value="patients" className="flex-1">Patients</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming">
            <div className="space-y-6">
              {upcomingSchedule.map((day, index) => (
                <div key={index}>
                  <h2 className="text-lg font-semibold mb-3">{day.day}</h2>
                  {day.appointments.length > 0 ? (
                    <div className="space-y-3">
                      {day.appointments.map((appointment) => (
                        <Card key={appointment.id} className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold">{appointment.patientName}</h3>
                              <div className="flex items-center mt-1 text-xs text-gray-600">
                                <Clock size={14} className="mr-1" />
                                <span>{appointment.time}</span>
                                {appointment.type === 'Virtual' ? (
                                  <>
                                    <div className="mx-2 w-1 h-1 bg-gray-400 rounded-full"></div>
                                    <Video size={14} className="text-health-primary mr-1" />
                                    <span className="text-health-primary">Virtual</span>
                                  </>
                                ) : (
                                  <>
                                    <div className="mx-2 w-1 h-1 bg-gray-400 rounded-full"></div>
                                    <MapPin size={14} className="text-health-accent mr-1" />
                                    <span className="text-health-accent">In-person</span>
                                  </>
                                )}
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="text-xs px-2 py-1 h-auto text-health-accent"
                                onClick={() => cancelAppointment(appointment.id)}
                              >
                                <X size={14} />
                              </Button>
                              <Button 
                                size="sm" 
                                className="bg-health-primary text-xs px-3 py-1 h-auto"
                              >
                                Details
                              </Button>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <Card className="p-3 text-center">
                      <p className="text-gray-600 text-sm">No appointments scheduled</p>
                    </Card>
                  )}
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="past">
            <div className="space-y-3">
              {appointments.filter(app => app.status === 'Completed').length > 0 ? (
                appointments.filter(app => app.status === 'Completed').map((appointment) => (
                  <Card key={appointment.id} className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">Patient: John Doe</h3>
                        <p className="text-sm text-gray-600">{appointment.date} • {appointment.time}</p>
                        <div className="mt-1">
                          <span className="text-xs bg-green-100 text-health-secondary px-2 py-0.5 rounded-full">
                            Completed
                          </span>
                        </div>
                      </div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-xs px-3 py-1 h-auto"
                          >
                            Notes
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Patient Notes</DialogTitle>
                          </DialogHeader>
                          <div className="mt-2 space-y-4">
                            <div>
                              <h3 className="font-semibold">Patient: John Doe</h3>
                              <p className="text-sm text-gray-600">{appointment.date} • {appointment.time}</p>
                            </div>
                            <div className="space-y-2">
                              <p className="text-sm">
                                Patient reported mild discomfort. Prescribed standard medication and advised rest.
                                Follow-up in 2 weeks if symptoms persist.
                              </p>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </Card>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Calendar className="mx-auto mb-2" size={24} />
                  <p>No past appointments</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="patients">
            <div className="relative mb-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full bg-health-primary">
                    <Users className="mr-2" size={18} />
                    View All Patients
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Patient List</DialogTitle>
                  </DialogHeader>
                  <div className="mt-2 space-y-4 max-h-80 overflow-y-auto">
                    {Array.from({ length: 10 }, (_, i) => (
                      <Card key={i} className="p-3">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="font-semibold">Patient {i + 1}</h3>
                            <p className="text-xs text-gray-600">Last visit: 2023-05-0{i + 1}</p>
                          </div>
                          <Button 
                            size="sm" 
                            className="text-xs bg-health-primary"
                          >
                            Details
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                  <DialogClose asChild>
                    <Button variant="outline" className="mt-2">Close</Button>
                  </DialogClose>
                </DialogContent>
              </Dialog>
            </div>

            <h2 className="text-lg font-semibold mb-3">Recent Patients</h2>
            <div className="space-y-3">
              {Array.from({ length: 5 }, (_, i) => (
                <Card key={i} className="p-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold">Patient {i + 1}</h3>
                      <p className="text-xs text-gray-600">Last visit: 2023-05-0{i + 1}</p>
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="text-xs"
                    >
                      History
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AuthenticatedLayout>
  );
};

export default DoctorAppointments;
