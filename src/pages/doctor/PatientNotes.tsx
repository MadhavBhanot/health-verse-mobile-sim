
import React, { useState } from 'react';
import AuthenticatedLayout from '@/components/layouts/AuthenticatedLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { mockPatientNotes } from '@/utils/mockData';
import { Search, FileText, Plus, User, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const DoctorPatientNotes = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [notes, setNotes] = useState(mockPatientNotes);
  const [newNote, setNewNote] = useState({
    patientName: '',
    notes: '',
  });
  const { toast } = useToast();

  const filteredNotes = notes.filter(note => 
    note.patientName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addNote = () => {
    if (!newNote.patientName || !newNote.notes) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in all fields",
      });
      return;
    }
    
    const note = {
      id: `n${notes.length + 1}`,
      patientId: 'p1',
      patientName: newNote.patientName,
      date: new Date().toISOString().split('T')[0],
      notes: newNote.notes,
    };
    
    setNotes([note, ...notes]);
    setNewNote({ patientName: '', notes: '' });
    
    toast({
      title: "Note added",
      description: "Patient note has been saved successfully",
    });
  };

  return (
    <AuthenticatedLayout requiredRole="doctor">
      <div className="p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Patient Notes</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="rounded-full bg-health-primary" size="icon">
                <Plus size={20} />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Patient Note</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-2">
                <div className="space-y-2">
                  <label htmlFor="patient-name" className="text-sm font-medium">Patient Name</label>
                  <Input
                    id="patient-name"
                    value={newNote.patientName}
                    onChange={(e) => setNewNote({ ...newNote, patientName: e.target.value })}
                    placeholder="Patient name"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="notes" className="text-sm font-medium">Notes</label>
                  <Textarea
                    id="notes"
                    value={newNote.notes}
                    onChange={(e) => setNewNote({ ...newNote, notes: e.target.value })}
                    placeholder="Enter patient notes..."
                    className="min-h-[150px]"
                  />
                </div>
                <Button onClick={addNote} className="w-full">Save Note</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            placeholder="Search patients..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="space-y-4">
          {filteredNotes.length > 0 ? (
            filteredNotes.map((note) => (
              <Dialog key={note.id}>
                <DialogTrigger asChild>
                  <Card className="p-4 cursor-pointer hover:shadow-md transition-shadow">
                    <div className="flex items-start">
                      <div className="bg-blue-100 p-2 rounded-lg mr-3">
                        <FileText className="text-health-primary" size={20} />
                      </div>
                      <div>
                        <div className="flex items-center">
                          <h3 className="font-semibold">{note.patientName}</h3>
                          <span className="text-xs text-gray-600 ml-2">{note.date}</span>
                        </div>
                        <p className="text-sm text-gray-600 line-clamp-2 mt-1">{note.notes}</p>
                      </div>
                    </div>
                  </Card>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Patient Note</DialogTitle>
                  </DialogHeader>
                  <div className="mt-2 space-y-4">
                    <div className="flex items-center">
                      <User size={18} className="text-health-primary mr-2" />
                      <h3 className="font-semibold">{note.patientName}</h3>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar size={16} className="mr-2" />
                      <span>{note.date}</span>
                    </div>
                    <Card className="p-4 bg-gray-50">
                      <p>{note.notes}</p>
                    </Card>
                    <div className="flex space-x-3">
                      <Button className="flex-1 bg-health-primary">Edit Note</Button>
                      <Button variant="outline" className="flex-1">Print</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              <FileText className="mx-auto mb-2" size={24} />
              <p>No patient notes found</p>
            </div>
          )}
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default DoctorPatientNotes;
