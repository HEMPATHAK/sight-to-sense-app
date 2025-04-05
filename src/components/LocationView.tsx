
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation, ArrowLeftRight, ArrowUp, Locate } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const LocationView = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  // Mock location data
  const locationData = {
    latitude: 28.6139,
    longitude: 77.2090,
    address: "Connaught Place, New Delhi, India",
    lastMovement: "15 minutes ago",
    batteryImpact: "Low impact (3%/hour)"
  };

  useEffect(() => {
    // Simulate loading of map and location data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    // Update the "last updated" time every minute
    const updateInterval = setInterval(() => {
      setLastUpdated(new Date());
    }, 60000);

    return () => {
      clearTimeout(timer);
      clearInterval(updateInterval);
    };
  }, []);

  const formatLastUpdated = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const LocationDetails = () => (
    <div className="space-y-4 mt-4">
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
            <Navigation className="h-4 w-4 text-blindapp-primary" />
            <span className="font-medium text-sm">Coordinates</span>
          </div>
          <p className="text-xs">{locationData.latitude.toFixed(4)}, {locationData.longitude.toFixed(4)}</p>
        </div>
        
        <div className="bg-muted p-3 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <ArrowLeftRight className="h-4 w-4 text-blindapp-primary" />
            <span className="font-medium text-sm">Last Movement</span>
          </div>
          <p className="text-xs">{locationData.lastMovement}</p>
        </div>
      </div>
      
      <div className="text-xs text-muted-foreground flex justify-between items-center">
        <span>Battery usage: {locationData.batteryImpact}</span>
        <span>Last updated: {formatLastUpdated(lastUpdated)}</span>
      </div>
    </div>
  );

  return (
    <Card className="blindapp-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center gap-2">
          <Locate className="h-5 w-5 text-blindapp-secondary" />
          Live Location
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <Tabs defaultValue="map" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="map">Map View</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
          </TabsList>
          
          <TabsContent value="map" className="mt-0">
            <div className="relative min-h-[250px] bg-muted rounded-lg overflow-hidden flex items-center justify-center">
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
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blindapp-primary text-white p-1.5 rounded-full animate-pulse">
                    <ArrowUp className="h-6 w-6" />
                  </div>
                </>
              )}
            </div>
            <LocationDetails />
          </TabsContent>
          
          <TabsContent value="details" className="mt-0">
            <div className="bg-muted p-4 rounded-lg mb-4">
              <h3 className="font-medium mb-2">Location History</h3>
              <div className="space-y-3">
                <div className="p-2 bg-background rounded border border-border">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">New Delhi Railway Station</span>
                    <span className="text-xs bg-gray-200 px-1.5 py-0.5 rounded">2 hrs ago</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Stayed for 45 minutes</p>
                </div>
                
                <div className="p-2 bg-background rounded border border-border">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Central Park</span>
                    <span className="text-xs bg-gray-200 px-1.5 py-0.5 rounded">3 hrs ago</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Stayed for 30 minutes</p>
                </div>
                
                <div className="p-2 bg-background rounded border border-border">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Local Market</span>
                    <span className="text-xs bg-gray-200 px-1.5 py-0.5 rounded">Yesterday</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Stayed for 1 hour</p>
                </div>
              </div>
            </div>
            <Button className="w-full">Download Location History</Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default LocationView;
