
import { useState } from "react";
import { Profile } from "@/components/ProfileCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { MessageSquare, Mail, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useUser } from "@/context/UserContext";
import { useNavigate } from "react-router-dom";

interface ContactOptionsProps {
  profile: Profile;
}

const ContactOptions = ({ profile }: ContactOptionsProps) => {
  const { isAuthenticated } = useUser();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleConnect = () => {
    if (!isAuthenticated) {
      toast.error("Please create an account to connect with others");
      navigate("/register");
      return;
    }
    setIsOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success(`Message sent to ${profile.name}!`);
    setSubject("");
    setMessage("");
    setIsOpen(false);
    setIsSubmitting(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Button 
        onClick={handleConnect} 
        className="w-full bg-hiveprimary-600 hover:bg-hiveprimary-700"
      >
        <MessageSquare className="mr-2 h-4 w-4" />
        Connect with {profile.name.split(" ")[0]}
      </Button>
      
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-hiveprimary-600" />
            Send Message to {profile.name}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <label htmlFor="subject" className="block text-sm font-medium">
              Subject
            </label>
            <Input
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g. Interested in learning React"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="block text-sm font-medium">
              Message
            </label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Introduce yourself and explain why you'd like to connect..."
              rows={5}
              required
            />
          </div>

          <DialogFooter className="pt-4">
            <DialogClose asChild>
              <Button type="button" variant="outline">Cancel</Button>
            </DialogClose>
            <Button 
              type="submit" 
              className="bg-hiveprimary-600 hover:bg-hiveprimary-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                  Sending...
                </>
              ) : (
                <>
                  <MessageSquare className="mr-2 h-4 w-4" /> 
                  Send Message
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ContactOptions;
