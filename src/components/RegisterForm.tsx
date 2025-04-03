
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from '@/context/AuthContext';
import { ArrowLeft, UserIcon, MailIcon, LockIcon, PhoneIcon, Building2Icon } from 'lucide-react';

const RegisterForm = () => {
  const { register, selectedMode } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // Common fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Personal mode fields
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [stickSIM, setStickSIM] = useState('');
  const [caretakerNumber, setCaretakerNumber] = useState('');

  // NGO mode fields
  const [ngoName, setNgoName] = useState('');
  const [ngoMobile, setNgoMobile] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords don't match",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsLoading(true);
      
      if (selectedMode === 'personal') {
        await register({
          name,
          email,
          age: parseInt(age),
          gender,
          stickSIM,
          caretakerNumber,
          mode: 'personal'
        }, password);
      } else {
        await register({
          name: ngoName,
          email,
          ngoName,
          ngoEmail: email,
          ngoMobile,
          mode: 'ngo'
        }, password);
      }
      
      toast({
        title: "Account created!",
        description: "Your account has been created successfully.",
      });
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "Registration failed",
        description: error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container max-w-md mx-auto px-4 py-8">
      <Button 
        variant="ghost" 
        className="mb-6 pl-0 flex items-center gap-2"
        onClick={() => navigate('/login')}
      >
        <ArrowLeft size={16} />
        Back to Login
      </Button>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            Create Account
          </CardTitle>
          <CardDescription className="text-center">
            {selectedMode === 'personal' 
              ? 'Register for a personal account' 
              : 'Register your NGO account'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {selectedMode === 'personal' ? (
              // Personal mode registration fields
              <>
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      type="text"
                      className="pl-10"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <MailIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      className="pl-10"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
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
                      className="flex space-x-4"
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
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="stickSIM">Stick SIM Number</Label>
                  <Input
                    id="stickSIM"
                    type="text"
                    placeholder="Enter SIM number on your stick"
                    value={stickSIM}
                    onChange={(e) => setStickSIM(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="caretaker">Caretaker Number</Label>
                  <div className="relative">
                    <PhoneIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="caretaker"
                      type="tel"
                      className="pl-10"
                      placeholder="+1234567890"
                      value={caretakerNumber}
                      onChange={(e) => setCaretakerNumber(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </>
            ) : (
              // NGO mode registration fields
              <>
                <div className="space-y-2">
                  <Label htmlFor="ngoName">NGO Name</Label>
                  <div className="relative">
                    <Building2Icon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="ngoName"
                      type="text"
                      className="pl-10"
                      value={ngoName}
                      onChange={(e) => setNgoName(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">NGO Email</Label>
                  <div className="relative">
                    <MailIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      className="pl-10"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="ngoMobile">NGO Mobile Number</Label>
                  <div className="relative">
                    <PhoneIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="ngoMobile"
                      type="tel"
                      className="pl-10"
                      placeholder="+1234567890"
                      value={ngoMobile}
                      onChange={(e) => setNgoMobile(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <LockIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  className="pl-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <LockIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type="password"
                  className="pl-10"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-blindapp-primary hover:bg-blindapp-primary/90"
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-blindapp-primary hover:underline">
              Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RegisterForm;
