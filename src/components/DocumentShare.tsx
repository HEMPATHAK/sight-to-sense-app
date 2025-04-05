
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Share2, WhatsApp, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from '@/components/ui/use-toast';

interface DocumentShareProps {
  documentName: string;
}

const DocumentShare = ({ documentName }: DocumentShareProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const { toast } = useToast();

  const handleEmailShare = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real application, this would connect to an API to send the email
    console.log(`Sharing ${documentName} via email to ${email}`);
    
    toast({
      title: "Document Shared",
      description: `${documentName} has been sent to ${email}`,
    });
    
    setEmail('');
    setIsOpen(false);
  };

  const handleWhatsAppShare = () => {
    // Format the message for WhatsApp
    const message = encodeURIComponent(`Sharing document: ${documentName}`);
    
    // Open WhatsApp with the pre-filled message and phone number
    const formattedPhone = phoneNumber.replace(/[^0-9]/g, '');
    const whatsappUrl = `https://wa.me/${formattedPhone}?text=${message}`;
    
    // Open in a new tab
    window.open(whatsappUrl, '_blank');
    
    toast({
      title: "Opening WhatsApp",
      description: `Preparing to share ${documentName} via WhatsApp`,
    });
    
    setPhoneNumber('');
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="ghost" className="text-blindapp-primary">
          <Share2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">Share Document</DialogTitle>
          <DialogDescription>
            Share <span className="font-medium">{documentName}</span> via email or WhatsApp
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-6 py-4">
          <div className="space-y-4">
            <div className="rounded-lg border p-4 bg-white">
              <div className="flex items-center gap-2 mb-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <Mail className="h-4 w-4 text-blue-700" />
                </div>
                <h3 className="font-medium">Email</h3>
              </div>
              
              <form onSubmit={handleEmailShare} className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="email">Recipient Email</Label>
                  <Input 
                    id="email" 
                    placeholder="email@example.com" 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  Send via Email
                </Button>
              </form>
            </div>
            
            <div className="rounded-lg border p-4 bg-white">
              <div className="flex items-center gap-2 mb-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <WhatsApp className="h-4 w-4 text-green-600" />
                </div>
                <h3 className="font-medium">WhatsApp</h3>
              </div>
              
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="phone">Recipient Phone Number</Label>
                  <Input 
                    id="phone" 
                    placeholder="+1 (555) 123-4567" 
                    type="tel" 
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
                <Button 
                  onClick={handleWhatsAppShare}
                  className="w-full bg-green-600 hover:bg-green-700"
                  disabled={!phoneNumber}
                >
                  Share via WhatsApp
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <DialogFooter className="sm:justify-start">
          <Button 
            variant="outline" 
            onClick={() => setIsOpen(false)}
            className="gap-1"
          >
            <X className="h-4 w-4" /> Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentShare;
