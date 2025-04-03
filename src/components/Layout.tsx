
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { useAuth } from '@/context/AuthContext';
import { Menu, User, Building2, Key, LogOut } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  if (!user) {
    // Redirect to login if no user
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
    navigate('/');
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="min-h-screen bg-blindapp-background">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <div className="py-6">
                  <div className="flex items-center gap-3 mb-6">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">Hi, {user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  <Separator className="mb-6" />
                  <nav className="space-y-2">
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start" 
                      onClick={() => {
                        setIsSheetOpen(false);
                        navigate('/profile');
                      }}
                    >
                      {user.mode === 'personal' ? (
                        <User className="mr-2 h-4 w-4" />
                      ) : (
                        <Building2 className="mr-2 h-4 w-4" />
                      )}
                      Profile
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start"
                      onClick={() => {
                        setIsSheetOpen(false);
                        navigate('/change-password');
                      }}
                    >
                      <Key className="mr-2 h-4 w-4" />
                      Change Password
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start text-red-500 hover:text-red-500 hover:bg-red-50"
                      onClick={() => {
                        setIsSheetOpen(false);
                        handleLogout();
                      }}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </Button>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
            <span className="font-semibold text-lg hidden md:inline-block">Smart Blind Stick</span>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="font-medium mr-2 hidden md:inline-block">Hi, {user.name}</span>
            <Avatar className="h-9 w-9">
              <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="container py-6">
        {children}
      </div>
    </div>
  );
};

export default Layout;
