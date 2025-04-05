
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from '@/context/AuthContext';
import { AlertCircle, Battery, MapPin, ChevronDown, ChevronUp, Activity, Clock } from 'lucide-react';
import { ChartContainer } from "@/components/ui/chart";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import LocationView from './LocationView';

// Mock data for activity chart
const activityData = [
  { time: '9AM', steps: 120, distance: 0.1 },
  { time: '10AM', steps: 400, distance: 0.3 },
  { time: '11AM', steps: 650, distance: 0.5 },
  { time: '12PM', steps: 320, distance: 0.25 },
  { time: '1PM', steps: 230, distance: 0.2 },
  { time: '2PM', steps: 550, distance: 0.4 },
  { time: '3PM', steps: 420, distance: 0.35 },
  { time: '4PM', steps: 380, distance: 0.3 },
  { time: '5PM', steps: 290, distance: 0.25 },
];

const BatteryCard = () => {
  const batteryLevel = 78; // Mock battery level
  
  return (
    <Card className="blindapp-card">
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <Battery className="h-12 w-12 text-blindapp-success" />
          <div className="w-full">
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

const ActivityCard = () => {
  return (
    <Card className="blindapp-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center gap-2">
          <Activity className="h-5 w-5 text-blindapp-primary" />
          Daily Activity
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="h-64">
          <ChartContainer 
            config={{
              steps: { color: "#2563eb" },
              distance: { color: "#8b5cf6" }
            }}
          >
            <AreaChart data={activityData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorSteps" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="colorDistance" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="steps" stroke="#2563eb" fill="url(#colorSteps)" />
              <Area type="monotone" dataKey="distance" stroke="#8b5cf6" fill="url(#colorDistance)" />
            </AreaChart>
          </ChartContainer>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="bg-blue-50 p-3 rounded-lg text-center">
            <p className="text-lg font-bold text-blue-600">3,360</p>
            <p className="text-sm text-blue-700">Steps Today</p>
          </div>
          <div className="bg-purple-50 p-3 rounded-lg text-center">
            <p className="text-lg font-bold text-purple-600">2.65 km</p>
            <p className="text-sm text-purple-700">Distance Today</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const UsageTimeCard = () => {
  return (
    <Card className="blindapp-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center gap-2">
          <Clock className="h-5 w-5 text-blindapp-secondary" />
          Usage Time
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex items-center justify-center mb-4">
          <div className="text-center">
            <p className="text-3xl font-bold text-blindapp-secondary">8h 45m</p>
            <p className="text-sm text-muted-foreground">Total today</p>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm">Morning</span>
            <div className="w-2/3 bg-gray-200 rounded-full h-2.5">
              <div className="bg-blindapp-secondary h-2.5 rounded-full" style={{ width: '40%' }}></div>
            </div>
            <span className="text-sm font-medium">3h 20m</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm">Afternoon</span>
            <div className="w-2/3 bg-gray-200 rounded-full h-2.5">
              <div className="bg-blindapp-secondary h-2.5 rounded-full" style={{ width: '35%' }}></div>
            </div>
            <span className="text-sm font-medium">2h 55m</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm">Evening</span>
            <div className="w-2/3 bg-gray-200 rounded-full h-2.5">
              <div className="bg-blindapp-secondary h-2.5 rounded-full" style={{ width: '30%' }}></div>
            </div>
            <span className="text-sm font-medium">2h 30m</span>
          </div>
        </div>
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <BatteryCard />
        <UsageTimeCard />
      </div>
      <ActivityCard />
      <LocationView />
      <EmergencyAlerts />
    </div>
  );
};

export default PersonalDashboard;
