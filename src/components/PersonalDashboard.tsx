
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from '@/context/AuthContext';
import { AlertCircle, Battery, MapPin, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const BatteryCard = () => {
  const batteryLevel = 78; // Mock battery level
  
  return (
    <Card className="blindapp-card">
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <Battery className="h-12 w-12 text-blindapp-success" />
          <div>
            <h3 className="text-xl font-semibold">Battery</h3>
            <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
              <div 
                className="bg-blindapp-success rounded-full h-4 animate-pulse-slow" 
                style={{ width: `${batteryLevel}%` }}
              />
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              {batteryLevel}% - Estimated 14 hours remaining
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const LocationButton = () => {
  return (
    <Card className="blindapp-card">
      <CardContent className="p-6">
        <Button className="w-full flex items-center gap-2 py-6 bg-blindapp-secondary hover:bg-blindapp-secondary/90">
          <MapPin className="h-6 w-6" />
          <span className="text-lg">View Live Location</span>
        </Button>
      </CardContent>
    </Card>
  );
};

const EmergencyAlerts = () => {
  const [showAll, setShowAll] = useState(false);
  
  // Mock alerts
  const alerts = [
    { id: 1, time: '10:45 AM', message: 'Fall detected. User confirmed they are OK.', date: 'Today' },
    { id: 2, time: '02:30 PM', message: 'Unusual movement pattern detected. No response from user.', date: 'Today' },
    { id: 3, time: '09:12 AM', message: 'Low battery warning. Please charge the device.', date: 'Today' },
    { id: 4, time: '06:45 PM', message: 'Location tracking temporarily unavailable.', date: 'Today' },
    { id: 5, time: '11:20 AM', message: 'User manually triggered alert. Caretaker notified.', date: 'Today' },
  ];
  
  // Show only the first 3 alerts unless "View More" is clicked
  const displayedAlerts = showAll ? alerts : alerts.slice(0, 3);
  
  return (
    <Card className="blindapp-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-blindapp-alert" />
          Emergency Alerts
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          {displayedAlerts.map(alert => (
            <div key={alert.id} className="p-3 bg-blindapp-muted rounded-lg border border-gray-200">
              <div className="flex justify-between items-start">
                <span className="font-medium">{alert.time}</span>
                <span className="text-xs bg-gray-200 px-2 py-1 rounded">{alert.date}</span>
              </div>
              <p className="mt-1 text-sm">{alert.message}</p>
            </div>
          ))}
          
          {alerts.length > 3 && (
            <Button
              variant="ghost"
              className="w-full text-blindapp-primary hover:bg-blindapp-primary/10"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? (
                <span className="flex items-center gap-1">
                  Show Less <ChevronUp className="h-4 w-4" />
                </span>
              ) : (
                <span className="flex items-center gap-1">
                  View More <ChevronDown className="h-4 w-4" />
                </span>
              )}
            </Button>
          )}
          
          <p className="text-xs text-muted-foreground">
            Yesterday's alerts have been auto-deleted
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

const PersonalDashboard = () => {
  const { user } = useAuth();
  
  if (!user) return null;
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Main Dashboard</h2>
      <BatteryCard />
      <LocationButton />
      <EmergencyAlerts />
    </div>
  );
};

export default PersonalDashboard;
