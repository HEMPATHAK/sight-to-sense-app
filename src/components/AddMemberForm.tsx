
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from '@/context/AuthContext';
import { ArrowLeft } from 'lucide-react';

const AddMemberForm = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form fields
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [stickSIM, setStickSIM] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !age || !gender || !stickSIM) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // In a real app, this would call an API to add the member
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      toast({
        title: "Member Added",
        description: `${name} has been added successfully.`,
      });
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "Failed to add member",
        description: error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) return null;

  return (
    <div className="container max-w-md mx-auto px-4 py-8">
      <Button 
        variant="ghost" 
        className="mb-6 pl-0 flex items-center gap-2"
        onClick={() => navigate('/dashboard')}
      >
        <ArrowLeft size={16} />
        Back to Dashboard
      </Button>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            Add New Member
          </CardTitle>
          <CardDescription className="text-center">
            Register a new blind stick user
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <RadioGroup 
                id="gender" 
                value={gender} 
                onValueChange={setGender}
                className="flex space-x-4 pt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Male" id="male" />
                  <Label htmlFor="male">Male</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Female" id="female" />
                  <Label htmlFor="female">Female</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="stickSIM">Stick SIM Number</Label>
              <Input
                id="stickSIM"
                type="text"
                placeholder="Enter SIM number on the stick"
                value={stickSIM}
                onChange={(e) => setStickSIM(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="ngoNumber">NGO Number</Label>
              <Input
                id="ngoNumber"
                type="text"
                value={user.ngoMobile || "Auto-filled from NGO profile"}
                disabled
                className="bg-gray-100"
              />
              <p className="text-xs text-muted-foreground">
                This will be automatically linked to your NGO profile
              </p>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-blindapp-secondary hover:bg-blindapp-secondary/90"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Adding Member..." : "Add Member"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddMemberForm;
