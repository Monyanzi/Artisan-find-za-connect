
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { Artisan } from '@/utils/data';

interface ContactArtisanModalProps {
  artisan: Artisan;
  isOpen: boolean;
  onClose: () => void;
}

const ContactArtisanModal: React.FC<ContactArtisanModalProps> = ({
  artisan,
  isOpen,
  onClose,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    serviceType: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate required fields
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields (Name, Email, and Message).",
        variant: "destructive",
        duration: 4000,
      });
      setIsSubmitting(false);
      return;
    }

    try {
      // Simulate API call with realistic delay
      console.log('Sending contact request:', {
        artisanId: artisan.id,
        artisanName: artisan.name,
        clientName: formData.name,
        clientEmail: formData.email,
        clientPhone: formData.phone,
        serviceType: formData.serviceType,
        message: formData.message,
        timestamp: new Date().toISOString(),
      });

      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      toast({
        title: "Message Sent Successfully!",
        description: `Your message has been sent to ${artisan.name}. They typically respond within ${artisan.responseTime || '24 hours'}.`,
        duration: 6000,
      });

      // Reset form and close modal
      setFormData({ name: '', email: '', phone: '', message: '', serviceType: '' });
      onClose();
    } catch (error) {
      toast({
        title: "Failed to Send Message",
        description: "There was an error sending your message. Please try again or contact the artisan directly.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setFormData({ name: '', email: '', phone: '', message: '', serviceType: '' });
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Contact {artisan.name}</DialogTitle>
          <DialogDescription>
            Send a message to {artisan.name} about your project. They typically respond within {artisan.responseTime || '24 hours'}.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Your Name *</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Enter your name"
                disabled={isSubmitting}
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+27 XX XXX XXXX"
                disabled={isSubmitting}
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder="your.email@example.com"
              disabled={isSubmitting}
            />
          </div>
          
          <div>
            <Label htmlFor="serviceType">Service Needed</Label>
            <Input
              id="serviceType"
              name="serviceType"
              value={formData.serviceType}
              onChange={handleInputChange}
              placeholder="e.g., Kitchen renovation, Plumbing repair"
              disabled={isSubmitting}
            />
          </div>
          
          <div>
            <Label htmlFor="message">Project Description *</Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              placeholder="Describe your project, timeline, and any specific requirements..."
              rows={4}
              disabled={isSubmitting}
            />
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ContactArtisanModal;
