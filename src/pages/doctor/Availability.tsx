
import React, { useState } from 'react';
import AuthenticatedLayout from '@/components/layouts/AuthenticatedLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { mockDoctorAvailability } from '@/utils/mockData';
import { Clock, CalendarDays, Plus, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const DoctorAvailability = () => {
  const [availability, setAvailability] = useState(mockDoctorAvailability);
  const [workDays, setWorkDays] = useState({
    Monday: true,
    Tuesday: true,
    Wednesday: true,
    Thursday: true,
    Friday: true,
    Saturday: false,
    Sunday: false,
  });
  const { toast } = useToast();

  const addTimeSlot = (day, time) => {
    setAvailability(availability.map(d => 
      d.day === day ? { ...d, slots: [...d.slots, time].sort() } : d
    ));
    
    toast({
      title: "Time slot added",
      description: `${time} on ${day} added to your availability`,
    });
  };

  const removeTimeSlot = (day, time) => {
    setAvailability(availability.map(d => 
      d.day === day ? { ...d, slots: d.slots.filter(t => t !== time) } : d
    ));
    
    toast({
      title: "Time slot removed",
      description: `${time} on ${day} removed from your availability`,
    });
  };

  const toggleWorkDay = (day) => {
    setWorkDays({ ...workDays, [day]: !workDays[day] });
    
    toast({
      title: workDays[day] ? "Day marked as unavailable" : "Day marked as available",
      description: `${day} is now ${workDays[day] ? 'unavailable' : 'available'} for appointments`,
    });
  };

  return (
    <AuthenticatedLayout requiredRole="doctor">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-6">Manage Availability</h1>
        
        <Card className="p-4 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold flex items-center">
              <CalendarDays size={20} className="mr-2" />
              Working Days
            </h2>
          </div>
          <div className="space-y-3">
            {Object.entries(workDays).map(([day, isActive]) => (
              <div key={day} className="flex items-center justify-between">
                <span>{day}</span>
                <Switch 
                  checked={isActive} 
                  onCheckedChange={() => toggleWorkDay(day)} 
                />
              </div>
            ))}
          </div>
        </Card>
        
        <h2 className="text-lg font-semibold mb-3 flex items-center">
          <Clock size={20} className="mr-2" />
          Time Slots
        </h2>
        <div className="space-y-4">
          {availability.map((day) => (
            <Card key={day.day} className={`p-4 ${!workDays[day.day] ? 'opacity-50' : ''}`}>
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold">{day.day}</h3>
                {workDays[day.day] && (
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="text-xs flex items-center"
                    onClick={() => addTimeSlot(day.day, prompt('Enter time (HH:MM):', '09:00'))}
                  >
                    <Plus size={14} className="mr-1" />
                    Add Slot
                  </Button>
                )}
              </div>
              {workDays[day.day] ? (
                <div className="flex flex-wrap gap-2">
                  {day.slots.map((time) => (
                    <div 
                      key={`${day.day}-${time}`} 
                      className="relative bg-gray-100 rounded-md px-3 py-1 text-sm group"
                    >
                      {time}
                      <button 
                        className="absolute -top-1 -right-1 bg-health-accent text-white rounded-full p-0.5 hidden group-hover:block"
                        onClick={() => removeTimeSlot(day.day, time)}
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  ))}
                  {day.slots.length === 0 && (
                    <p className="text-sm text-gray-500">No time slots added yet</p>
                  )}
                </div>
              ) : (
                <p className="text-sm text-gray-500">Not available on this day</p>
              )}
            </Card>
          ))}
        </div>
        
        <Button className="w-full mt-6 bg-health-primary">
          Save Changes
        </Button>
      </div>
    </AuthenticatedLayout>
  );
};

export default DoctorAvailability;
