
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, Plus, ChevronRight, UserIcon, 
  Users, Map, BatteryWarning, Activity, Filter, SlidersHorizontal
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { Progress } from "@/components/ui/progress";
import { 
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem
} from "@/components/ui/dropdown-menu";
import { ChartContainer } from "@/components/ui/chart";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

interface Member {
  id: string;
  name: string;
  age: number;
  gender: string;
  stickSIM: string;
  lastActive: string;
  batteryLevel: number;
  status: 'online' | 'away' | 'offline';
  alerts: number;
}

// Mock statistics data
const statisticsData = [
  { name: 'Active', value: 12, color: '#16a34a' },
  { name: 'Away', value: 4, color: '#ca8a04' },
  { name: 'Offline', value: 3, color: '#6b7280' },
];

// Mock alerts data
const alertsData = [
  { type: 'Battery', count: 3, color: '#dc2626' },
  { type: 'Fall', count: 1, color: '#ea580c' },
  { type: 'Location', count: 2, color: '#2563eb' },
];

const MemberStatistics = () => {
  return (
    <Card className="blindapp-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center gap-2">
          <Users className="h-5 w-5 text-blindapp-primary" />
          Member Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium mb-3">Member Status</h3>
            <div className="h-[200px]">
              <ChartContainer
                config={{
                  active: { color: "#16a34a" },
                  away: { color: "#ca8a04" },
                  offline: { color: "#6b7280" },
                }}
              >
                <PieChart>
                  <Pie
                    data={statisticsData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {statisticsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Legend />
                </PieChart>
              </ChartContainer>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-3">Recent Alerts</h3>
            <div className="space-y-4">
              {alertsData.map(alert => (
                <div key={alert.type} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">{alert.type}</span>
                    <span className="text-sm font-medium">{alert.count}</span>
                  </div>
                  <Progress value={alert.count * 15} className="h-2" style={{ backgroundColor: 'rgba(0,0,0,0.1)' }}>
                    <div className="h-full" style={{ backgroundColor: alert.color, width: `${alert.count * 15}%` }} />
                  </Progress>
                </div>
              ))}
              
              <div className="pt-2">
                <Button variant="outline" size="sm" className="w-full">
                  View All Alerts
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const NgoMemberList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedMemberId, setExpandedMemberId] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Mock member data with enhanced information
  const members: Member[] = [
    { 
      id: '1', 
      name: 'John Doe', 
      age: 65, 
      gender: 'Male', 
      stickSIM: 'SIM123456', 
      lastActive: '10 mins ago',
      batteryLevel: 78,
      status: 'online',
      alerts: 0
    },
    { 
      id: '2', 
      name: 'Jane Smith', 
      age: 42, 
      gender: 'Female', 
      stickSIM: 'SIM789012', 
      lastActive: '3 hrs ago',
      batteryLevel: 45,
      status: 'away',
      alerts: 1
    },
    { 
      id: '3', 
      name: 'Robert Johnson', 
      age: 78, 
      gender: 'Male', 
      stickSIM: 'SIM345678', 
      lastActive: '1 day ago',
      batteryLevel: 23,
      status: 'offline',
      alerts: 2
    },
    { 
      id: '4', 
      name: 'Emily Davis', 
      age: 53, 
      gender: 'Female', 
      stickSIM: 'SIM901234', 
      lastActive: '2 days ago',
      batteryLevel: 92,
      status: 'online',
      alerts: 0
    },
    { 
      id: '5', 
      name: 'Michael Wilson', 
      age: 70, 
      gender: 'Male', 
      stickSIM: 'SIM567890', 
      lastActive: '5 hrs ago',
      batteryLevel: 35,
      status: 'away',
      alerts: 3
    },
  ];

  // Filter members based on search query
  const filteredMembers = members.filter(member => 
    member.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleMemberExpand = (id: string) => {
    setExpandedMemberId(expandedMemberId === id ? null : id);
  };

  const handleViewDetails = (member: Member) => {
    navigate(`/member/${member.id}`);
  };

  const handleRemoveMember = (member: Member) => {
    console.log('Remove member:', member);
    toast({
      title: "Member Removed",
      description: `${member.name} has been removed from your list.`,
    });
  };

  const getStatusColor = (status: 'online' | 'away' | 'offline') => {
    switch(status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-400';
    }
  };

  const getBatteryColor = (level: number) => {
    if (level > 60) return 'bg-green-500';
    if (level > 30) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <Card className="blindapp-card">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl">Member List</CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <SlidersHorizontal className="h-4 w-4" />
                <span className="sm:inline hidden">Filter</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Filter By</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  Online
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                  Away
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-gray-400"></div>
                  Offline
                </div>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <div className="flex items-center gap-2">
                  <BatteryWarning className="h-4 w-4 text-red-500" />
                  Low Battery
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-orange-500" />
                  Has Alerts
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search members by name..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="space-y-3">
          {filteredMembers.length === 0 ? (
            <p className="text-center py-4 text-muted-foreground">No members found</p>
          ) : (
            filteredMembers.map(member => (
              <div key={member.id} className="border rounded-lg overflow-hidden">
                <div 
                  className="flex items-center justify-between p-3 cursor-pointer hover:bg-gray-50"
                  onClick={() => toggleMemberExpand(member.id)}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="bg-blindapp-primary/20 p-2 rounded-full">
                        <UserIcon className="h-5 w-5 text-blindapp-primary" />
                      </div>
                      <div className={`absolute -top-1 -right-1 h-3 w-3 rounded-full border-2 border-white ${getStatusColor(member.status)}`}></div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{member.name}</h3>
                        {member.alerts > 0 && (
                          <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-0.5 rounded">
                            {member.alerts} alerts
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">Last active: {member.lastActive}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <div className={`h-2 w-2 rounded-full ${getBatteryColor(member.batteryLevel)}`}></div>
                      <span className="text-xs">{member.batteryLevel}%</span>
                    </div>
                    <ChevronRight className={`h-5 w-5 transition-transform ${
                      expandedMemberId === member.id ? 'rotate-90' : ''
                    }`} />
                  </div>
                </div>
                
                {expandedMemberId === member.id && (
                  <div className="p-3 bg-gray-50 border-t">
                    <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                      <div>
                        <span className="text-muted-foreground">Age:</span> {member.age}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Gender:</span> {member.gender}
                      </div>
                      <div className="col-span-2">
                        <span className="text-muted-foreground">Stick SIM:</span> {member.stickSIM}
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <Button 
                        size="sm" 
                        className="bg-blindapp-primary hover:bg-blindapp-primary/90"
                        onClick={() => handleViewDetails(member)}
                      >
                        Details
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="bg-white"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewDetails(member);
                        }}
                      >
                        <Map className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="text-destructive hover:bg-destructive/10 bg-white"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveMember(member);
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const NgoDashboard = () => {
  const { user } = useAuth();
  
  if (!user) return null;
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <Link to="/add-member">
          <Button className="flex items-center gap-2 bg-blindapp-secondary hover:bg-blindapp-secondary/90">
            <Plus className="h-4 w-4" />
            Add New Member
          </Button>
        </Link>
      </div>

      <MemberStatistics />
      <NgoMemberList />
    </div>
  );
};

export default NgoDashboard;
