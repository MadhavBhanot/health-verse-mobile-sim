
import React, { useState } from 'react';
import AuthenticatedLayout from '@/components/layouts/AuthenticatedLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockDoctors, mockAppointments } from '@/utils/mockData';
import { Calendar, Video, MapPin, Clock, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const PatientAppointments = () => {
  const [appointments, setAppointments] = useState(mockAppointments);
  const { toast } = useToast();

  const bookAppointment = (doctor, date, time, type) => {
    const newAppointment = {
      id: `a${appointments.length + 1}`,
      doctorId: doctor.id,
      doctorName: doctor.name,
      specialty: doctor.specialty,
      date,
      time,
      status: 'Confirmed',
      type,
    };

    setAppointments([...appointments, newAppointment]);
    
    toast({
      title: "Appointment booked",
      description: `Your appointment with ${doctor.name} has been confirmed`,
    });
  };

  const cancelAppointment = (id) => {
    setAppointments(appointments.map(app => 
      app.id === id ? { ...app, status: 'Cancelled' } : app
    ));
    
    toast({
      title: "Appointment cancelled",
      description: "Your appointment has been cancelled",
    });
  };

  return (
    <AuthenticatedLayout requiredRole="patient">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-6">Appointments</h1>
        
        <Tabs defaultValue="upcoming">
          <TabsList className="w-full mb-4">
            <TabsTrigger value="upcoming" className="flex-1">Upcoming</TabsTrigger>
            <TabsTrigger value="past" className="flex-1">Past</TabsTrigger>
            <TabsTrigger value="book" className="flex-1">Book New</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming" className="space-y-4">
            {appointments.filter(app => app.status !== 'Cancelled').map((appointment) => (
              <Card key={appointment.id} className="p-4">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-semibold">{appointment.doctorName}</h3>
                    <p className="text-sm text-gray-600">{appointment.specialty}</p>
                    <div className="flex items-center mt-2 text-xs text-gray-600">
                      <Calendar size={14} className="mr-1" />
                      <span>{appointment.date}</span>
                      <div className="mx-2 w-1 h-1 bg-gray-400 rounded-full"></div>
                      <Clock size={14} className="mr-1" />
                      <span>{appointment.time}</span>
                    </div>
                    <div className="flex items-center mt-1 text-xs">
                      {appointment.type === 'Virtual' ? (
                        <>
                          <Video size={14} className="text-health-primary mr-1" />
                          <span className="text-health-primary">Virtual Consultation</span>
                        </>
                      ) : (
                        <>
                          <MapPin size={14} className="text-health-accent mr-1" />
                          <span className="text-health-accent">In-person Visit</span>
                        </>
                      )}
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-xs px-3 py-1 h-auto text-health-accent hover:text-health-accent"
                    onClick={() => cancelAppointment(appointment.id)}
                  >
                    Cancel
                  </Button>
                </div>
              </Card>
            ))}
            {appointments.filter(app => app.status !== 'Cancelled').length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <Calendar className="mx-auto mb-2" size={24} />
                <p>No upcoming appointments</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="past" className="space-y-4">
            <div className="text-center py-8 text-gray-500">
              <Calendar className="mx-auto mb-2" size={24} />
              <p>No past appointments</p>
            </div>
          </TabsContent>
          
          <TabsContent value="book" className="space-y-4">
            <h2 className="text-lg font-semibold mb-3">Available Doctors</h2>
            {mockDoctors.map((doctor) => (
              <Dialog key={doctor.id}>
                <DialogTrigger asChild>
                  <Card className="p-4 cursor-pointer hover:shadow-md transition-shadow">
                    <div className="flex items-center">
                      <div 
                        className="w-12 h-12 bg-cover bg-center rounded-full mr-3"
                        style={{ backgroundImage: `url(${doctor.photo})` }}
                      ></div>
                      <div>
                        <h3 className="font-semibold">{doctor.name}</h3>
                        <p className="text-sm text-gray-600">{doctor.specialty}</p>
                        <div className="flex items-center mt-1">
                          <Star size={14} className="text-yellow-500 mr-1" fill="currentColor" />
                          <span className="text-xs">{doctor.rating}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Book an Appointment</DialogTitle>
                  </DialogHeader>
                  <div className="mt-4 space-y-4">
                    <div className="flex items-center">
                      <div 
                        className="w-16 h-16 bg-cover bg-center rounded-full mr-4"
                        style={{ backgroundImage: `url(${doctor.photo})` }}
                      ></div>
                      <div>
                        <h3 className="font-semibold text-lg">{doctor.name}</h3>
                        <p className="text-sm text-gray-600">{doctor.specialty}</p>
                        <div className="flex items-center mt-1">
                          <Star size={14} className="text-yellow-500 mr-1" fill="currentColor" />
                          <span className="text-xs">{doctor.rating}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Select Date</h4>
                      <div className="grid grid-cols-3 gap-2">
                        {['2023-05-20', '2023-05-21', '2023-05-22'].map((date) => (
                          <Button 
                            key={date} 
                            variant="outline" 
                            className="text-xs"
                            onClick={() => bookAppointment(doctor, date, '10:00', 'Virtual')}
                          >
                            {date}
                          </Button>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Select Time</h4>
                      <div className="grid grid-cols-3 gap-2">
                        {['09:00', '10:30', '13:00', '14:30', '16:00', '17:30'].map((time) => (
                          <Button 
                            key={time} 
                            variant="outline" 
                            className="text-xs"
                            onClick={() => bookAppointment(doctor, '2023-05-20', time, 'Virtual')}
                          >
                            {time}
                          </Button>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Appointment Type</h4>
                      <div className="grid grid-cols-2 gap-2">
                        <Button 
                          variant="outline" 
                          className="text-xs flex items-center justify-center"
                          onClick={() => bookAppointment(doctor, '2023-05-20', '10:00', 'Virtual')}
                        >
                          <Video size={14} className="mr-2" />
                          Virtual
                        </Button>
                        <Button 
                          variant="outline" 
                          className="text-xs flex items-center justify-center"
                          onClick={() => bookAppointment(doctor, '2023-05-20', '10:00', 'In-person')}
                        >
                          <MapPin size={14} className="mr-2" />
                          In-person
                        </Button>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </AuthenticatedLayout>
  );
};

export default PatientAppointments;
