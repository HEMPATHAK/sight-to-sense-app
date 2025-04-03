
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from '@/context/AuthContext';
import { Search, Plus, ChevronRight, UserIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

interface Member {
  id: string;
  name: string;
  age: number;
  gender: string;
  stickSIM: string;
  lastActive: string;
}

const NgoMemberList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedMemberId, setExpandedMemberId] = useState<string | null>(null);
  const { toast } = useToast();

  // Mock member data
  const members: Member[] = [
    { id: '1', name: 'John Doe', age: 65, gender: 'Male', stickSIM: 'SIM123456', lastActive: '10 mins ago' },
    { id: '2', name: 'Jane Smith', age: 42, gender: 'Female', stickSIM: 'SIM789012', lastActive: '3 hrs ago' },
    { id: '3', name: 'Robert Johnson', age: 78, gender: 'Male', stickSIM: 'SIM345678', lastActive: '1 day ago' },
    { id: '4', name: 'Emily Davis', age: 53, gender: 'Female', stickSIM: 'SIM901234', lastActive: '2 days ago' },
    { id: '5', name: 'Michael Wilson', age: 70, gender: 'Male', stickSIM: 'SIM567890', lastActive: '5 hrs ago' },
  ];

  // Filter members based on search query
  const filteredMembers = members.filter(member => 
    member.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleMemberExpand = (id: string) => {
    setExpandedMemberId(expandedMemberId === id ? null : id);
  };

  const handleViewDetails = (member: Member) => {
    // In a real app, this would navigate to the member details page
    console.log('View details for:', member);
    // You'd navigate to a specific route like `/member/${member.id}`
  };

  const handleRemoveMember = (member: Member) => {
    // In a real app, this would remove the member
    console.log('Remove member:', member);
    toast({
      title: "Member Removed",
      description: `${member.name} has been removed from your list.`,
    });
  };

  return (
    <Card className="blindapp-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Member List</CardTitle>
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
                    <div className="bg-blindapp-primary/20 p-2 rounded-full">
                      <UserIcon className="h-5 w-5 text-blindapp-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">{member.name}</h3>
                      <p className="text-xs text-muted-foreground">Last active: {member.lastActive}</p>
                    </div>
                  </div>
                  <ChevronRight className={`h-5 w-5 transition-transform ${
                    expandedMemberId === member.id ? 'rotate-90' : ''
                  }`} />
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
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        className="w-full bg-blindapp-primary hover:bg-blindapp-primary/90"
                        onClick={() => handleViewDetails(member)}
                      >
                        View Details
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="w-full text-destructive hover:bg-destructive/10"
                        onClick={() => handleRemoveMember(member)}
                      >
                        Remove Member
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

      <NgoMemberList />
    </div>
  );
};

export default NgoDashboard;
