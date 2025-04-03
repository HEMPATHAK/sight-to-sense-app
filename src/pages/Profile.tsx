
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from '@/context/AuthContext';
import { ArrowLeft, Save } from 'lucide-react';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // Form fields for personal mode
  const [name, setName] = useState(user?.name || '');
  const [age, setAge] = useState(user?.age?.toString() || '');
  const [gender, setGender] = useState(user?.gender || '');
  const [caretakerNumber, setCaretakerNumber] = useState(user?.caretakerNumber || '');
  
  // Form fields for NGO mode
  const [ngoName, setNgoName] = useState(user?.ngoName || '');
  const [ngoMobile, setNgoMobile] = useState(user?.ngoMobile || '');
  
  if (!user) return null;
  
  const handleToggleEdit = () => {
    setIsEditing(!isEditing);
  };
  
  const handleSave = async () => {
    try {
      setIsSaving(true);
      
      if (user.mode === 'personal') {
        await updateProfile({
          name,
          age: parseInt(age),
          gender,
          caretakerNumber,
        });
      } else {
        await updateProfile({
          name: ngoName,
          ngoName,
          ngoMobile,
        });
      }
      
      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully.",
      });
      setIsEditing(false);
    } catch (error) {
      toast({
        title: "Update Failed",
        description: error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };
  
  return (
    <Layout>
      <div className="container max-w-xl mx-auto">
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
            <CardTitle className="text-2xl">
              Your Profile
            </CardTitle>
            <CardDescription>
              View and manage your profile information
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            {user.mode === 'personal' ? (
              // Personal profile form
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={!isEditing}
                    className={!isEditing ? "bg-gray-100" : ""}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      type="number"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      disabled={!isEditing}
                      className={!isEditing ? "bg-gray-100" : ""}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    {isEditing ? (
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
                    ) : (
                      <Input
                        value={gender}
                        disabled
                        className="bg-gray-100"
                      />
                    )}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="stickSIM">Stick SIM Number</Label>
                  <Input
                    id="stickSIM"
                    value={user.stickSIM}
                    disabled
                    className="bg-gray-100"
                  />
                  <p className="text-xs text-muted-foreground">
                    The SIM number cannot be changed
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="caretaker">Caretaker Number</Label>
                  <Input
                    id="caretaker"
                    value={caretakerNumber}
                    onChange={(e) => setCaretakerNumber(e.target.value)}
                    disabled={!isEditing}
                    className={!isEditing ? "bg-gray-100" : ""}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    value={user.email}
                    disabled
                    className="bg-gray-100"
                  />
                  <p className="text-xs text-muted-foreground">
                    Email cannot be changed
                  </p>
                </div>
              </div>
            ) : (
              // NGO profile form
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="ngoName">NGO Name</Label>
                  <Input
                    id="ngoName"
                    value={ngoName}
                    onChange={(e) => setNgoName(e.target.value)}
                    disabled={!isEditing}
                    className={!isEditing ? "bg-gray-100" : ""}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">NGO Email</Label>
                  <Input
                    id="email"
                    value={user.email}
                    disabled
                    className="bg-gray-100"
                  />
                  <p className="text-xs text-muted-foreground">
                    Email cannot be changed
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="ngoMobile">NGO Mobile Number</Label>
                  <Input
                    id="ngoMobile"
                    value={ngoMobile}
                    onChange={(e) => setNgoMobile(e.target.value)}
                    disabled={!isEditing}
                    className={!isEditing ? "bg-gray-100" : ""}
                  />
                </div>
              </div>
            )}
          </CardContent>
          
          <CardFooter className="flex justify-between">
            {isEditing ? (
              <>
                <Button 
                  variant="outline" 
                  onClick={handleToggleEdit}
                  disabled={isSaving}
                >
                  Cancel
                </Button>
                <Button 
                  className="flex items-center gap-2 bg-blindapp-primary hover:bg-blindapp-primary/90"
                  onClick={handleSave}
                  disabled={isSaving}
                >
                  <Save className="h-4 w-4" />
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>
              </>
            ) : (
              <Button 
                className="ml-auto bg-blindapp-primary hover:bg-blindapp-primary/90"
                onClick={handleToggleEdit}
              >
                Edit Profile
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default Profile;
