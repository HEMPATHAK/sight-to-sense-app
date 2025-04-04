
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { MapPin, Eye, Shield } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blindapp-background to-blindapp-soft">
      <div className="text-center max-w-3xl px-4 py-8 blindapp-glass">
        <div className="mb-6 animate-float">
          <Shield className="h-20 w-20 mx-auto text-blindapp-primary opacity-80" />
        </div>
        <h1 className="text-4xl font-bold mb-4 text-blindapp-foreground bg-clip-text text-transparent bg-gradient-purple">Smart Blind Stick</h1>
        <p className="text-xl text-blindapp-foreground/80 mb-8">
          An innovative solution to assist visually impaired individuals navigate safely and stay connected with caregivers
        </p>
        
        <div className="space-y-4">
          <Button 
            className="w-full max-w-md text-lg py-6 bg-blindapp-primary hover:bg-blindapp-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl"
            onClick={() => navigate('/mode-selector')}
          >
            <Eye className="mr-2 h-6 w-6" /> Get Started
          </Button>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="p-4 rounded-lg bg-white/80 shadow-sm">
              <MapPin className="h-8 w-8 mx-auto mb-2 text-blindapp-alert" />
              <h3 className="font-medium">Real-time Location</h3>
              <p className="text-sm text-muted-foreground">Track location with GPS precision</p>
            </div>
            
            <div className="p-4 rounded-lg bg-white/80 shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto mb-2 text-blindapp-success" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 8C20.6569 8 22 6.65685 22 5C22 3.34315 20.6569 2 19 2C17.3431 2 16 3.34315 16 5C16 6.65685 17.3431 8 19 8Z" />
                <path d="M7 16H5C3.34 16 2 14.66 2 13V7C2 5.34 3.34 4 5 4H17.59" />
                <path d="M10 4H5C3.34 4 2 5.34 2 7V19C2 20.66 3.34 22 5 22H19C20.66 22 22 20.66 22 19V14" />
                <path d="M10 20V8H12M10 14H14" />
              </svg>
              <h3 className="font-medium">Emergency Alerts</h3>
              <p className="text-sm text-muted-foreground">Instant notifications for urgent situations</p>
            </div>
            
            <div className="p-4 rounded-lg bg-white/80 shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto mb-2 text-blindapp-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                <line x1="12" y1="18" x2="12" y2="18" />
                <line x1="10" y1="6" x2="14" y2="6" />
              </svg>
              <h3 className="font-medium">Battery Management</h3>
              <p className="text-sm text-muted-foreground">Long-lasting battery with status updates</p>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground mt-6">
            The Smart Blind Stick app connects to a specially designed walking stick with built-in
            GPS and sensors to provide real-time assistance and alerts
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
