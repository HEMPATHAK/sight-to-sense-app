
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const Index = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blindapp-background">
      <div className="text-center max-w-3xl px-4">
        <h1 className="text-4xl font-bold mb-4 text-blindapp-foreground">Smart Blind Stick</h1>
        <p className="text-xl text-blindapp-foreground/80 mb-8">
          An innovative solution to assist visually impaired individuals navigate safely and stay connected with caregivers
        </p>
        
        <div className="space-y-4">
          <Button 
            className="w-full max-w-md text-lg py-6 bg-blindapp-primary hover:bg-blindapp-primary/90"
            onClick={() => navigate('/')}
          >
            Get Started
          </Button>
          
          <p className="text-sm text-muted-foreground">
            The Smart Blind Stick app connects to a specially designed walking stick with built-in
            GPS and sensors to provide real-time assistance and alerts
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
