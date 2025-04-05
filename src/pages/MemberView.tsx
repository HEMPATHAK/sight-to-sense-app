import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from '@/context/AuthContext';
import { 
  AlertCircle, Battery, MapPin, ChevronDown, ChevronUp, 
  FileText, Share2, Activity, Clock, ChevronLeft, Bell
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer } from "@/components/ui/chart";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import DocumentShare from '@/components/DocumentShare';

// Mock data for activity chart
const activityData = [
  { time: '9AM', steps: 80, distance: 0.06 },
  { time: '10AM', steps: 350, distance: 0.25 },
  { time: '11AM', steps: 500, distance: 0.4 },
  { time: '12PM', steps: 250, distance: 0.2 },
  { time: '1PM', steps: 180, distance: 0.15 },
  { time: '2PM', steps: 420, distance: 0.3 },
  { time: '3PM', steps: 380, distance: 0.28 },
  { time: '4PM', steps: 310, distance: 0.22 },
  { time: '5PM', steps: 220, distance: 0.18 },
];

// Reusing components from PersonalDashboard with minor modifications
const BatteryCard = () => {
  const batteryLevel = 65; // Mock battery level
  
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
              {batteryLevel}% - Estimated 9 hours remaining
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const LocationView = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  // Mock location data
  const locationData = {
    latitude: 28.6139,
    longitude: 77.2090,
    address: "Gandhi Nagar, New Delhi, India",
    lastMovement: "35 minutes ago",
    batteryImpact: "Low impact (3%/hour)"
  };

  React.useEffect(() => {
    // Simulate loading of map and location data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const formatLastUpdated = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Card className="blindapp-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center gap-2">
          <MapPin className="h-5 w-5 text-blindapp-secondary" />
          Live Location
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="relative min-h-[200px] bg-muted rounded-lg overflow-hidden flex items-center justify-center mb-4">
          {isLoading ? (
            <div className="text-center">
              <div className="w-8 h-8 border-4 border-t-blindapp-primary border-r-transparent border-b-blindapp-primary border-l-transparent rounded-full animate-spin mx-auto mb-2"></div>
              <p className="text-sm text-muted-foreground">Loading map...</p>
            </div>
          ) : (
            <>
              <div className="absolute inset-0 bg-blindapp-muted">
                {/* This would be replaced with an actual map integration */}
                <div className="w-full h-full bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=28.6139,77.2090&zoom=15&size=600x400&markers=color:red%7C28.6139,77.2090&key=YOUR_API_KEY')] bg-cover bg-center opacity-60"></div>
              </div>
              <Button className="absolute bottom-3 right-3 bg-blindapp-primary hover:bg-blindapp-primary/90">
                Open Full Map
              </Button>
            </>
          )}
        </div>
        
        <div className="space-y-4">
          <div className="bg-muted p-3 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="h-4 w-4 text-blindapp-secondary" />
              <span className="font-medium">Current Location</span>
            </div>
            <p className="text-sm">{locationData.address}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-muted p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Activity className="h-4 w-4 text-blindapp-primary" />
                <span className="font-medium text-sm">Last Movement</span>
              </div>
              <p className="text-xs">{locationData.lastMovement}</p>
            </div>
            
            <div className="bg-muted p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Bell className="h-4 w-4 text-blindapp-primary" />
                <span className="font-medium text-sm">Notifications</span>
              </div>
              <p className="text-xs">Location alerts enabled</p>
            </div>
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
            <p className="text-lg font-bold text-blue-600">2,690</p>
            <p className="text-sm text-blue-700">Steps Today</p>
          </div>
          <div className="bg-purple-50 p-3 rounded-lg text-center">
            <p className="text-lg font-bold text-purple-600">2.04 km</p>
            <p className="text-sm text-purple-700">Distance Today</p>
          </div>
        </div>
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
  const [isUploading, setIsUploading] = useState(false);
  
  // Mock documents data
  const documents = [
    { id: 1, name: 'Medical Report.pdf', uploadDate: '2 weeks ago' },
    { id: 2, name: 'ID Card.jpg', uploadDate: '1 month ago' },
    { id: 3, name: 'Prescription.pdf', uploadDate: '3 days ago' },
    { id: 4, name: 'Insurance Card.pdf', uploadDate: '2 months ago' },
  ];
  
  const handleUpload = () => {
    setIsUploading(true);
    // Simulate upload delay
    setTimeout(() => setIsUploading(false), 1500);
  };
  
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
          {documents.map((doc) => (
            <div 
              key={doc.id} 
              className="p-3 bg-blindapp-muted rounded-lg border border-gray-200 flex justify-between items-center hover:bg-blindapp-muted/80 transition-colors"
            >
              <div>
                <h4 className="font-medium">{doc.name}</h4>
                <p className="text-xs text-muted-foreground">Uploaded {doc.uploadDate}</p>
              </div>
              <div className="flex items-center">
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="text-blindapp-primary"
                  onClick={() => window.open('#', '_blank')}
                >
                  <FileText className="h-4 w-4" />
                </Button>
                <DocumentShare documentName={doc.name} />
              </div>
            </div>
          ))}
          
          <Button 
            className="w-full"
            onClick={handleUpload}
            disabled={isUploading}
          >
            {isUploading ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
                Uploading...
              </>
            ) : (
              'Upload New Document'
            )}
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
  const { id } = useParams<{ id: string }>();
  
  if (!user || user.mode !== 'ngo') {
    navigate('/dashboard');
    return null;
  }
  
  return (
    <Layout>
      <div className="space-y-6">
        <Button 
          variant="ghost" 
          className="mb-6 pl-0 flex items-center gap-2"
          onClick={() => navigate('/dashboard')}
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Members List
        </Button>
        
        <div className="mb-6">
          <h2 className="text-2xl font-bold">{memberData.name}'s Dashboard</h2>
          <p className="text-muted-foreground">Last active: {memberData.lastActive}</p>
        </div>
        
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="w-full mb-6">
            <TabsTrigger value="overview" className="flex-1">Overview</TabsTrigger>
            <TabsTrigger value="activity" className="flex-1">Activity</TabsTrigger>
            <TabsTrigger value="documents" className="flex-1">Documents</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-0 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <BatteryCard />
              <div>
                <Card className="blindapp-card h-full">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl">User Details</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <p className="text-sm text-muted-foreground">Age</p>
                          <p className="font-medium">{memberData.age}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Gender</p>
                          <p className="font-medium">{memberData.gender}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Device SIM</p>
                        <p className="font-medium">{memberData.stickSIM}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Device Status</p>
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                          <p className="font-medium">Active</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            <LocationView />
            <EmergencyAlerts />
          </TabsContent>
          
          <TabsContent value="activity" className="mt-0 space-y-6">
            <ActivityCard />
            <Card className="blindapp-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blindapp-secondary" />
                  Usage Statistics
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Today's Usage</h3>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">Total Active Time</span>
                      <span className="text-sm font-medium">6h 25m</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                      <div className="bg-blindapp-secondary h-2.5 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-muted rounded-lg">
                      <h4 className="text-sm font-medium mb-1">Weekly Average</h4>
                      <p className="text-lg font-bold text-blindapp-secondary">5h 45m</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <h4 className="text-sm font-medium mb-1">Monthly Usage</h4>
                      <p className="text-lg font-bold text-blindapp-secondary">126h</p>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full">View Detailed Statistics</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="documents" className="mt-0">
            <DocumentsSection />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default MemberView;
