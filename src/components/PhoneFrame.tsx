
import React from 'react';
import { Battery, Signal, Wifi } from 'lucide-react';

interface PhoneFrameProps {
  children: React.ReactNode;
}

const PhoneFrame: React.FC<PhoneFrameProps> = ({ children }) => {
  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="phone-frame">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-6 bg-black rounded-b-2xl"></div>
        <div className="phone-screen">
          <div className="status-bar bg-white">
            <span>{currentTime}</span>
            <div className="flex space-x-2">
              <Signal className="status-icon" />
              <Wifi className="status-icon" />
              <Battery className="status-icon" />
            </div>
          </div>
          <div className="h-[calc(100%-32px)] overflow-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhoneFrame;
