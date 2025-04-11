
import React, { useState } from 'react';
import AuthenticatedLayout from '@/components/layouts/AuthenticatedLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { User2, MessageCircle, Phone, Video, Mic, MicOff, VideoOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const DoctorConsultation = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, sender: 'patient', text: 'Hello doctor, I have some questions about my medication.', time: '10:01' },
    { id: 2, sender: 'doctor', text: 'Hello! I\'m happy to help. What seems to be the issue?', time: '10:02' },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const { toast } = useToast();

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    
    const message = {
      id: messages.length + 1,
      sender: 'doctor',
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    
    setMessages([...messages, message]);
    setNewMessage('');
  };

  const endConsultation = () => {
    toast({
      title: "Consultation ended",
      description: "The consultation has been successfully completed",
    });
  };

  return (
    <AuthenticatedLayout requiredRole="doctor">
      <div className="p-4 h-full flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Virtual Consultation</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="text-xs">
                <User2 size={14} className="mr-1" />
                Patient Info
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Patient Information</DialogTitle>
              </DialogHeader>
              <div className="mt-2 space-y-4">
                <Card className="p-4">
                  <h3 className="font-semibold mb-2">John Doe</h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Age:</span> 45</p>
                    <p><span className="font-medium">Gender:</span> Male</p>
                    <p><span className="font-medium">Blood Type:</span> O+</p>
                    <p><span className="font-medium">Allergies:</span> Penicillin</p>
                    <p><span className="font-medium">Current Medications:</span> Lisinopril, Vitamin D</p>
                  </div>
                </Card>
                <Card className="p-4">
                  <h3 className="font-semibold mb-2">Medical History</h3>
                  <p className="text-sm">Patient has a history of high blood pressure and mild anxiety. Last visit was on April 15, 2023, for an annual check-up.</p>
                </Card>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        
        <Card className="flex-1 flex flex-col mb-4 overflow-hidden">
          <div className="relative w-full h-64 bg-gray-800 flex justify-center items-center mb-3">
            <div className="absolute top-2 right-2 p-2 bg-gray-900 bg-opacity-70 rounded-lg text-white text-xs">
              John Doe (Patient)
            </div>
            <Video size={64} className="text-gray-500" />
            <div className="absolute bottom-3 right-3 w-24 h-32 bg-gray-900 flex justify-center items-center rounded-lg border border-gray-600">
              <User2 size={32} className="text-gray-500" />
            </div>
          </div>
          
          <div className="flex justify-center space-x-3 mb-3">
            <Button 
              variant="outline" 
              size="icon" 
              className={`rounded-full ${isMuted ? 'bg-health-accent text-white' : ''}`}
              onClick={() => setIsMuted(!isMuted)}
            >
              {isMuted ? <MicOff size={20} /> : <Mic size={20} />}
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className={`rounded-full ${isVideoOff ? 'bg-health-accent text-white' : ''}`}
              onClick={() => setIsVideoOff(!isVideoOff)}
            >
              {isVideoOff ? <VideoOff size={20} /> : <Video size={20} />}
            </Button>
            <Button 
              className="rounded-full bg-red-500 hover:bg-red-600" 
              size="icon"
              onClick={endConsultation}
            >
              <Phone size={20} className="rotate-135" />
            </Button>
          </div>

          <div className="flex-1 border rounded-md p-3 overflow-auto mb-3 min-h-[150px]">
            <div className="space-y-3">
              {messages.map((message) => (
                <div 
                  key={message.id} 
                  className={`flex ${message.sender === 'doctor' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                      message.sender === 'doctor' 
                        ? 'bg-health-primary text-white' 
                        : 'bg-gray-100'
                    }`}
                  >
                    <p>{message.text}</p>
                    <p className="text-xs opacity-70 text-right mt-1">{message.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Textarea 
              placeholder="Type a message..." 
              className="min-h-0"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
            />
            <Button 
              className="bg-health-primary" 
              size="icon"
              onClick={sendMessage}
            >
              <MessageCircle size={20} />
            </Button>
          </div>
        </Card>
        
        <div className="grid grid-cols-2 gap-3">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Prescribe</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Write Prescription</DialogTitle>
              </DialogHeader>
              <div className="mt-2 space-y-4">
                <Textarea placeholder="Enter prescription details..." className="min-h-[150px]" />
                <Button className="w-full">Send Prescription</Button>
              </div>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Add Notes</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Patient Notes</DialogTitle>
              </DialogHeader>
              <div className="mt-2 space-y-4">
                <Textarea placeholder="Enter consultation notes..." className="min-h-[150px]" />
                <Button className="w-full">Save Notes</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default DoctorConsultation;
