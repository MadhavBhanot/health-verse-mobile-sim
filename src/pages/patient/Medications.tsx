
import React, { useState } from 'react';
import AuthenticatedLayout from '@/components/layouts/AuthenticatedLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { mockMedications } from '@/utils/mockData';
import { Plus, Bell, Clock, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const PatientMedications = () => {
  const [medications, setMedications] = useState(mockMedications);
  const [newMedication, setNewMedication] = useState({
    name: '',
    dosage: '',
    frequency: '',
    time: '',
    purpose: '',
    refill: '',
  });
  const { toast } = useToast();

  const handleAddMedication = () => {
    const medicationToAdd = {
      id: `med${medications.length + 1}`,
      ...newMedication,
    };

    setMedications([...medications, medicationToAdd]);
    setNewMedication({
      name: '',
      dosage: '',
      frequency: '',
      time: '',
      purpose: '',
      refill: '',
    });

    toast({
      title: "Medication added",
      description: `${medicationToAdd.name} has been added to your reminders`,
    });
  };

  const handleTakeMedication = (id) => {
    toast({
      title: "Medication taken",
      description: "We've recorded that you've taken this medication",
    });
  };

  return (
    <AuthenticatedLayout requiredRole="patient">
      <div className="p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Medications</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="rounded-full bg-health-primary" size="icon">
                <Plus size={20} />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Medication</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-2">
                <div className="space-y-2">
                  <Label htmlFor="med-name">Medication Name</Label>
                  <Input
                    id="med-name"
                    value={newMedication.name}
                    onChange={(e) => setNewMedication({ ...newMedication, name: e.target.value })}
                    placeholder="Medication name"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="dosage">Dosage</Label>
                    <Input
                      id="dosage"
                      value={newMedication.dosage}
                      onChange={(e) => setNewMedication({ ...newMedication, dosage: e.target.value })}
                      placeholder="e.g., 10mg"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="frequency">Frequency</Label>
                    <Input
                      id="frequency"
                      value={newMedication.frequency}
                      onChange={(e) => setNewMedication({ ...newMedication, frequency: e.target.value })}
                      placeholder="Once daily"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="time">Time</Label>
                    <Input
                      id="time"
                      value={newMedication.time}
                      onChange={(e) => setNewMedication({ ...newMedication, time: e.target.value })}
                      placeholder="09:00"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="purpose">Purpose</Label>
                    <Input
                      id="purpose"
                      value={newMedication.purpose}
                      onChange={(e) => setNewMedication({ ...newMedication, purpose: e.target.value })}
                      placeholder="Blood pressure"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="refill">Refill Date</Label>
                  <Input
                    id="refill"
                    value={newMedication.refill}
                    onChange={(e) => setNewMedication({ ...newMedication, refill: e.target.value })}
                    placeholder="YYYY-MM-DD"
                  />
                </div>
                <Button onClick={handleAddMedication} className="w-full">Add Medication</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <h2 className="text-lg font-semibold mb-3">Today's Schedule</h2>
        <div className="space-y-3 mb-6">
          {medications.map((medication) => (
            <Card key={medication.id} className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{medication.name}</h3>
                  <p className="text-sm text-gray-600">{medication.dosage} • {medication.purpose}</p>
                  <div className="flex items-center mt-2 text-xs text-gray-600">
                    <Clock size={14} className="mr-1" />
                    <span>{medication.time}</span>
                    <div className="mx-2 w-1 h-1 bg-gray-400 rounded-full"></div>
                    <Bell size={14} className="mr-1" />
                    <span>{medication.frequency}</span>
                  </div>
                </div>
                <Button 
                  size="sm" 
                  className="bg-health-primary text-xs px-3 py-1 h-auto"
                  onClick={() => handleTakeMedication(medication.id)}
                >
                  Take
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <h2 className="text-lg font-semibold mb-3">Upcoming Refills</h2>
        <div className="space-y-3">
          {medications.map((medication) => (
            <Card key={`refill-${medication.id}`} className="p-3">
              <div className="flex items-center">
                <Calendar size={16} className="text-health-primary mr-2" />
                <div>
                  <h3 className="font-semibold">{medication.name}</h3>
                  <p className="text-xs text-gray-600">Refill by {medication.refill}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default PatientMedications;
