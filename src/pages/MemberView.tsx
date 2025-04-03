
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from '@/context/AuthContext';
import { AlertCircle, Battery, MapPin, ChevronDown, ChevronUp, FileText, Share2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Reusing components from PersonalDashboard with minor modifications
const BatteryCard = () => {
  const batteryLevel = 65; // Mock battery level
  
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
              {batteryLevel}% - Estimated 9 hours remaining
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
  const [showAll, setShowAll] = React.useState(false);
  
  // Mock alerts
  const alerts = [
    { id: 1, time: '08:15 AM', message: 'Low battery warning. Please charge the device.', date: 'Today' },
    { id: 2, time: '07:45 PM', message: 'Location tracking temporarily unavailable.', date: 'Yesterday' },
    { id: 3, time: '01:30 PM', message: 'Fall detected. No response received.', date: 'Yesterday' },
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
            Older alerts have been auto-deleted
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

const DocumentsSection = () => {
  return (
    <Card className="blindapp-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center gap-2">
          <FileText className="h-5 w-5 text-blindapp-primary" />
          Documents
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="p-3 bg-blindapp-muted rounded-lg border border-gray-200 flex justify-between items-center">
            <div>
              <h4 className="font-medium">Medical Report.pdf</h4>
              <p className="text-xs text-muted-foreground">Uploaded 2 weeks ago</p>
            </div>
            <Button size="sm" variant="ghost" className="text-blindapp-primary">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="p-3 bg-blindapp-muted rounded-lg border border-gray-200 flex justify-between items-center">
            <div>
              <h4 className="font-medium">ID Card.jpg</h4>
              <p className="text-xs text-muted-foreground">Uploaded 1 month ago</p>
            </div>
            <Button size="sm" variant="ghost" className="text-blindapp-primary">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
          
          <Button className="w-full">
            Upload New Document
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

// Mock member data
const memberData = {
  id: '1',
  name: 'John Doe',
  age: 65,
  gender: 'Male',
  stickSIM: 'SIM123456',
  lastActive: '10 mins ago',
};

const MemberView = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  if (!user || user.mode !== 'ngo') {
    navigate('/dashboard');
    return null;
  }
  
  return (
    <Layout>
      <div className="container">
        <Button 
          variant="ghost" 
          className="mb-6 pl-0 flex items-center gap-2"
          onClick={() => navigate('/dashboard')}
        >
          <ChevronUp className="rotate-270 h-4 w-4" />
          Back to Members List
        </Button>
        
        <div className="mb-6">
          <h2 className="text-2xl font-bold">{memberData.name}'s Dashboard</h2>
          <p className="text-muted-foreground">Last active: {memberData.lastActive}</p>
        </div>
        
        <div className="space-y-6">
          <BatteryCard />
          <LocationButton />
          <EmergencyAlerts />
          <DocumentsSection />
        </div>
      </div>
    </Layout>
  );
};

export default MemberView;
