
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent successfully",
        description: "We'll get back to you as soon as possible.",
      });
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {/* Hero section */}
        <section className="bg-gradient-to-r from-hiveprimary-600/10 to-hiveprimary-700/10 py-12">
          <div className="container">
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">Contact Us</h1>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto">
              We'd love to hear from you. Please fill out the form below or reach out to us using the contact information.
            </p>
          </div>
        </section>

        {/* Contact section */}
        <section className="py-12 container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Contact form */}
            <div className="bg-card p-6 rounded-lg shadow-sm border">
              <h2 className="text-xl font-semibold mb-4">Send us a message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    Your Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john.doe@example.com"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-1">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help you?"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    placeholder="Please describe how we can help you..."
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-hiveprimary-600 hover:bg-hiveprimary-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="h-4 w-4" />
                      Send Message
                    </span>
                  )}
                </Button>
              </form>
            </div>

            {/* Contact information */}
            <div className="space-y-8">
              <div className="bg-card p-6 rounded-lg shadow-sm border">
                <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-hiveprimary-100 p-2 rounded-full text-hiveprimary-600">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">Email</h3>
                      <p className="text-muted-foreground">contact@skillhive.com</p>
                      <p className="text-muted-foreground">support@skillhive.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-hiveprimary-100 p-2 rounded-full text-hiveprimary-600">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">Phone</h3>
                      <p className="text-muted-foreground">+1 (555) 123-4567</p>
                      <p className="text-muted-foreground">+1 (555) 765-4321</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-hiveprimary-100 p-2 rounded-full text-hiveprimary-600">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">Office</h3>
                      <p className="text-muted-foreground">123 Tech Avenue, Suite 200</p>
                      <p className="text-muted-foreground">San Francisco, CA 94107</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card p-6 rounded-lg shadow-sm border">
                <h2 className="text-xl font-semibold mb-4">Our Hours</h2>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Monday - Friday:</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday:</span>
                    <span>10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday:</span>
                    <span>Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ section */}
        <section className="py-12 bg-muted/30">
          <div className="container">
            <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="bg-card p-6 rounded-lg shadow-sm border">
                <h3 className="font-semibold mb-2">How do I sign up for SkillHive?</h3>
                <p className="text-muted-foreground">You can sign up by clicking the "Sign Up" button on the homepage or header, and following the registration process.</p>
              </div>
              <div className="bg-card p-6 rounded-lg shadow-sm border">
                <h3 className="font-semibold mb-2">Is SkillHive free to use?</h3>
                <p className="text-muted-foreground">SkillHive offers both free and premium tiers. The basic features are available for free, while advanced features require a subscription.</p>
              </div>
              <div className="bg-card p-6 rounded-lg shadow-sm border">
                <h3 className="font-semibold mb-2">How do I find skills in my area?</h3>
                <p className="text-muted-foreground">Use our search feature with location filters to find skilled professionals in your area who match your requirements.</p>
              </div>
              <div className="bg-card p-6 rounded-lg shadow-sm border">
                <h3 className="font-semibold mb-2">Can I offer multiple skills on my profile?</h3>
                <p className="text-muted-foreground">Yes, you can add multiple skills to your profile, each with its own description, experience level, and portfolio examples.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
