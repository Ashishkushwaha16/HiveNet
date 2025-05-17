
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Mail, Phone, Loader2, Github, Linkedin } from "lucide-react";
import { toast } from "sonner";

const EditProfile = () => {
  const navigate = useNavigate();
  const { user, updateProfile, loading, isAuthenticated } = useUser();
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [linkedInUrl, setLinkedInUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      toast.error("You must be logged in to edit your profile");
      return;
    }

    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setPhone(user.phone || "");
      setAvatarUrl(user.avatar || "");
      setLinkedInUrl(user.linkedInUrl || "");
      setGithubUrl(user.githubUrl || "");
    }
  }, [user, isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!name) {
      setFormError("Name is required");
      return;
    }

    if (!email) {
      setFormError("Email is required");
      return;
    }

    // Validate LinkedIn URL if provided
    if (linkedInUrl && !linkedInUrl.includes("linkedin.com")) {
      setFormError("Please enter a valid LinkedIn URL");
      return;
    }

    // Validate GitHub URL if provided
    if (githubUrl && !githubUrl.includes("github.com")) {
      setFormError("Please enter a valid GitHub URL");
      return;
    }

    const success = await updateProfile({
      name,
      email,
      phone,
      avatar: avatarUrl,
      linkedInUrl,
      githubUrl
    });

    if (success) {
      navigate(`/profile/${user?.id}`);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-1 items-center justify-center bg-gray-50 py-12">
        <div className="w-full max-w-2xl space-y-8 rounded-lg bg-white p-8 shadow-lg">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-hiveprimary-700">
              Edit Your Profile
            </h2>
            <p className="mt-2 text-muted-foreground">
              Update your personal information and profile settings
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {formError && (
              <div className="rounded-md bg-red-50 p-4 text-sm text-red-700">
                {formError}
              </div>
            )}

            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-24 w-24 border-4 border-hiveprimary-100">
                <AvatarImage src={avatarUrl} alt={name} />
                <AvatarFallback className="bg-hiveprimary-200 text-hiveprimary-700 text-2xl">
                  {name ? getInitials(name) : "U"}
                </AvatarFallback>
              </Avatar>
              <p className="text-sm text-muted-foreground">
                Profile picture is generated from your email. To change it, update your email.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <div className="relative mt-1">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email Address</Label>
                <div className="relative mt-1">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative mt-1">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t">
              <h3 className="text-lg font-medium">Professional Links</h3>
              
              <div>
                <Label htmlFor="linkedin">LinkedIn Profile URL</Label>
                <div className="relative mt-1">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Linkedin className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="linkedin"
                    type="url"
                    value={linkedInUrl}
                    onChange={(e) => setLinkedInUrl(e.target.value)}
                    className="pl-10"
                    placeholder="https://linkedin.com/in/yourusername"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="github">GitHub Profile URL</Label>
                <div className="relative mt-1">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Github className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="github"
                    type="url"
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    className="pl-10"
                    placeholder="https://github.com/yourusername"
                  />
                </div>
              </div>
            </div>

            <div className="flex space-x-4 pt-6">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => navigate(`/profile/${user?.id}`)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-hiveprimary-600 hover:bg-hiveprimary-700"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving Changes...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EditProfile;
