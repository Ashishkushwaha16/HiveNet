
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Bell, Lock, Shield, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

const Settings = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useUser();
  
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [profileVisibility, setProfileVisibility] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      toast.error("You must be logged in to access settings");
    }
  }, [isAuthenticated, navigate]);

  const handleSaveSettings = async () => {
    setSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.success("Settings saved successfully");
    setSaving(false);
  };

  const handleDeleteAccount = async () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      // In a real app, this would call an API to delete the account
      toast.error("Account deletion is disabled in this demo");
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-gray-50 py-12">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-hiveprimary-700">Settings</h1>
            <p className="text-muted-foreground">Manage your account preferences and settings</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="md:col-span-1">
              <div className="space-y-1">
                <h3 className="text-lg font-medium">Account Settings</h3>
                <p className="text-sm text-muted-foreground">Manage your account settings and preferences</p>
              </div>
            </div>
            <div className="md:col-span-2">
              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <div className="space-y-6">
                  <div>
                    <h4 className="mb-4 flex items-center gap-2 text-lg font-medium">
                      <Bell className="h-5 w-5 text-hiveprimary-600" />
                      Notification Settings
                    </h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="emailNotifications" className="block font-medium">
                            Email Notifications
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Receive email notifications about new messages and connections
                          </p>
                        </div>
                        <Switch
                          id="emailNotifications"
                          checked={emailNotifications}
                          onCheckedChange={setEmailNotifications}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="pushNotifications" className="block font-medium">
                            Push Notifications
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Receive push notifications in your browser
                          </p>
                        </div>
                        <Switch
                          id="pushNotifications"
                          checked={pushNotifications}
                          onCheckedChange={setPushNotifications}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <h4 className="mb-4 flex items-center gap-2 text-lg font-medium">
                      <Shield className="h-5 w-5 text-hiveprimary-600" />
                      Privacy Settings
                    </h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="profileVisibility" className="block font-medium">
                            Profile Visibility
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Make your profile visible to other users
                          </p>
                        </div>
                        <Switch
                          id="profileVisibility"
                          checked={profileVisibility}
                          onCheckedChange={setProfileVisibility}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button 
                      className="bg-hiveprimary-600 hover:bg-hiveprimary-700"
                      onClick={handleSaveSettings}
                      disabled={saving}
                    >
                      {saving ? "Saving..." : "Save Settings"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-8 md:grid-cols-3">
            <div className="md:col-span-1">
              <div className="space-y-1">
                <h3 className="text-lg font-medium text-red-600">Danger Zone</h3>
                <p className="text-sm text-muted-foreground">Irreversible and destructive actions</p>
              </div>
            </div>
            <div className="md:col-span-2">
              <div className="rounded-lg border border-red-200 bg-red-50 p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <AlertTriangle className="h-6 w-6 flex-shrink-0 text-red-500" />
                  <div className="flex-1">
                    <h4 className="text-lg font-medium text-red-700">Delete Account</h4>
                    <p className="mb-4 text-sm text-red-700/80">
                      Once you delete your account, there is no going back. Please be certain.
                    </p>
                    <Button 
                      variant="destructive" 
                      onClick={handleDeleteAccount}
                    >
                      Delete Account
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Settings;
