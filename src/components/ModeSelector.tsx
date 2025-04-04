
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from '@/context/AuthContext';
import { UserIcon, Building2Icon, ArrowRight } from 'lucide-react';

const ModeSelector = () => {
  const { setSelectedMode } = useAuth();
  const navigate = useNavigate();

  const handleModeSelect = (mode: 'personal' | 'ngo') => {
    setSelectedMode(mode);
    navigate('/login');
  };

  return (
    <div className="container max-w-md mx-auto px-4 py-10 h-screen flex flex-col justify-center bg-gradient-to-br from-blindapp-background to-blindapp-soft">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-blindapp-foreground mb-4 bg-clip-text text-transparent bg-gradient-purple">Smart Blind Stick</h1>
        <p className="text-muted-foreground">Please select your mode to continue</p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card 
          className="flex flex-col border-2 hover:border-blindapp-primary cursor-pointer transition-all bg-gradient-to-br from-white to-blindapp-soft/30 shadow-md hover:shadow-lg"
          onClick={() => handleModeSelect('personal')}
        >
          <CardHeader>
            <CardTitle className="flex justify-center">
              <div className="p-3 rounded-full bg-blindapp-primary/10">
                <UserIcon size={40} className="text-blindapp-primary" />
              </div>
            </CardTitle>
            <CardDescription className="text-center font-medium text-lg">Personal Mode</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-center text-sm text-muted-foreground">
              For individuals using the smart stick personally
            </p>
          </CardContent>
          <CardFooter className="flex justify-center mt-auto">
            <Button 
              variant="ghost" 
              className="text-blindapp-primary hover:bg-blindapp-primary/10 group"
              onClick={(e) => {
                e.stopPropagation();
                handleModeSelect('personal');
              }}
            >
              Select <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </CardFooter>
        </Card>

        <Card 
          className="flex flex-col border-2 hover:border-blindapp-secondary cursor-pointer transition-all bg-gradient-to-br from-white to-blindapp-soft/30 shadow-md hover:shadow-lg"
          onClick={() => handleModeSelect('ngo')}
        >
          <CardHeader>
            <CardTitle className="flex justify-center">
              <div className="p-3 rounded-full bg-blindapp-secondary/10">
                <Building2Icon size={40} className="text-blindapp-secondary" />
              </div>
            </CardTitle>
            <CardDescription className="text-center font-medium text-lg">NGO Mode</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-center text-sm text-muted-foreground">
              For organizations managing multiple smart sticks
            </p>
          </CardContent>
          <CardFooter className="flex justify-center mt-auto">
            <Button 
              variant="ghost" 
              className="text-blindapp-secondary hover:bg-blindapp-secondary/10 group"
              onClick={(e) => {
                e.stopPropagation();
                handleModeSelect('ngo');
              }}
            >
              Select <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ModeSelector;
