
import { Button } from "@/components/ui/button";
import { ChevronRight, Users, Star, Grid, CheckCircle, ArrowRight, Award, MessageSquare } from "lucide-react";
import SearchBar from "@/components/SearchBar";
import ProfileCard from "@/components/ProfileCard";
import { mockProfiles, mockSkills } from "@/data/mockData";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useUser } from "@/context/UserContext";

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAuthenticated } = useUser();

  const handleSearch = (query: string) => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  const handleConnect = () => {
    if (!isAuthenticated) {
      toast({
        title: "Sign up required",
        description: "Please create an account to connect with others",
        duration: 3000,
      });
      navigate("/register");
    } else {
      navigate("/search");
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-hiveprimary-600 to-hiveprimary-800 py-24 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="h-full w-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRjMC0yLjIwOS0xLjc5LTQtNC00cy00IDEuNzkxLTQgNHYyYzAgMS4xMDUuODk1IDIgMiAyaDRjMS4xMDUgMCAyLS44OTUgMi0ydi0yem0tNCAyYy0xLjEwNSAwLTItLjg5NS0yLTJ2LTJjMC0xLjEwNS44OTUtMiAyLTJzMiAuODk1IDIgMnYyYzAgMS4xMDUtLjg5NSAyLTIgMnoiLz48L2c+PC9nPjwvc3ZnPg==')]"></div>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-hivesecondary-400 via-hivesecondary-500 to-hiveprimary-400"></div>
          
          <div className="container relative z-10 mx-auto px-4 text-center">
            <div className="max-w-4xl mx-auto">
              <h1 className="mb-6 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
                Share Skills, <span className="text-hivesecondary-400">Grow Together</span>
              </h1>
              <p className="mx-auto mb-8 max-w-2xl text-xl text-white/90 leading-relaxed">
                Connect with people who can teach you new skills or learn from your expertise.
                SkillHive makes skill-sharing simple and rewarding.
              </p>
              <div className="mx-auto mb-10 max-w-lg">
                <SearchBar onSearch={handleSearch} />
              </div>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button 
                  size="lg" 
                  className="bg-hivesecondary-500 hover:bg-hivesecondary-600 shadow-lg shadow-hivesecondary-500/20 transition-all duration-300 transform hover:translate-y-[-2px]"
                  onClick={() => navigate(isAuthenticated ? "/search" : "/register")}
                >
                  {isAuthenticated ? "Explore Skills" : "Sign Up Now"}
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="bg-transparent text-white border-white hover:bg-white/10 transition-all duration-300"
                  onClick={() => navigate(isAuthenticated ? "/profile/me" : "/login")}
                >
                  {isAuthenticated ? "My Profile" : "Log In"}
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-white py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-hiveprimary-600">1200+</p>
                <p className="text-sm text-muted-foreground">Active Users</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-hiveprimary-600">350+</p>
                <p className="text-sm text-muted-foreground">Unique Skills</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-hiveprimary-600">5,000+</p>
                <p className="text-sm text-muted-foreground">Connections Made</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-hiveprimary-600">98%</p>
                <p className="text-sm text-muted-foreground">Satisfaction Rate</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gradient-to-b from-white to-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold">How SkillHive Works</h2>
              <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                Our platform makes it easy to connect with others and exchange skills in a community-driven environment.
              </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-3">
              <div className="rounded-xl border bg-white p-8 text-card-foreground shadow-sm transition-all hover:shadow-md">
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-full bg-hiveprimary-100 text-hiveprimary-700">
                  <Users className="h-7 w-7" />
                </div>
                <h3 className="mb-4 text-xl font-semibold">Create Your Profile</h3>
                <p className="text-muted-foreground mb-6">
                  Sign up and showcase your skills, expertise, and what you're looking to learn.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-hiveprimary-600" />
                    <span>Showcase your expertise</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-hiveprimary-600" />
                    <span>List skills you want to learn</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-hiveprimary-600" />
                    <span>Personalized recommendations</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-xl border bg-white p-8 text-card-foreground shadow-sm transition-all hover:shadow-md">
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-full bg-hiveprimary-100 text-hiveprimary-700">
                  <Grid className="h-7 w-7" />
                </div>
                <h3 className="mb-4 text-xl font-semibold">Find Skills & People</h3>
                <p className="text-muted-foreground mb-6">
                  Search for specific skills or browse profiles to find the perfect skill match.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-hiveprimary-600" />
                    <span>Advanced skill search</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-hiveprimary-600" />
                    <span>Filter by location or availability</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-hiveprimary-600" />
                    <span>Browse popular skills</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-xl border bg-white p-8 text-card-foreground shadow-sm transition-all hover:shadow-md">
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-full bg-hiveprimary-100 text-hiveprimary-700">
                  <MessageSquare className="h-7 w-7" />
                </div>
                <h3 className="mb-4 text-xl font-semibold">Connect & Learn</h3>
                <p className="text-muted-foreground mb-6">
                  Message potential mentors or students and arrange skill-sharing sessions.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-hiveprimary-600" />
                    <span>Direct messaging</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-hiveprimary-600" />
                    <span>Scheduling tools</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-hiveprimary-600" />
                    <span>Track learning progress</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-hiveprimary-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="bg-white p-8 rounded-xl shadow-sm relative">
                <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4">
                  <div className="text-hivesecondary-400 text-5xl">"</div>
                </div>
                <p className="italic text-muted-foreground mb-6">
                  SkillHive helped me connect with an expert graphic designer who taught me the basics in just two weeks. Now I'm creating my own designs!
                </p>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-hiveprimary-100 flex items-center justify-center text-hiveprimary-700 font-semibold">
                    JS
                  </div>
                  <div>
                    <p className="font-medium">Jamie Smith</p>
                    <p className="text-sm text-muted-foreground">Marketing Manager</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-sm relative">
                <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4">
                  <div className="text-hivesecondary-400 text-5xl">"</div>
                </div>
                <p className="italic text-muted-foreground mb-6">
                  I've been teaching Spanish for years, but SkillHive gave me a platform to reach more students while learning photography in exchange!
                </p>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-hiveprimary-100 flex items-center justify-center text-hiveprimary-700 font-semibold">
                    MR
                  </div>
                  <div>
                    <p className="font-medium">Maria Rodriguez</p>
                    <p className="text-sm text-muted-foreground">Language Instructor</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-8 rounded-xl shadow-sm relative">
                <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4">
                  <div className="text-hivesecondary-400 text-5xl">"</div>
                </div>
                <p className="italic text-muted-foreground mb-6">
                  The platform made it so easy to find someone to teach me coding basics. The scheduling tools and direct messaging system are fantastic!
                </p>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-hiveprimary-100 flex items-center justify-center text-hiveprimary-700 font-semibold">
                    AK
                  </div>
                  <div>
                    <p className="font-medium">Alex Kim</p>
                    <p className="text-sm text-muted-foreground">College Student</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Users */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="mb-12 flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-3xl font-bold">Featured Skill Sharers</h2>
                <p className="text-muted-foreground mt-2">Connect with our top-rated community members</p>
              </div>
              <Button variant="link" className="text-hiveprimary-600 mt-4 md:mt-0" onClick={() => navigate('/search')}>
                View all users
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {mockProfiles.slice(0, 4).map((profile) => (
                <ProfileCard key={profile.id} profile={profile} />
              ))}
            </div>
          </div>
        </section>

        {/* Popular Skills */}
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h2 className="mb-4 text-3xl font-bold">Popular Skills</h2>
              <p className="mb-10 text-muted-foreground max-w-2xl mx-auto">
                Discover the most sought-after skills on our platform and start learning today
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {mockSkills.slice(0, 15).map((skill) => (
                <Button
                  key={skill}
                  variant="outline"
                  className="rounded-full hover:bg-hiveprimary-50 hover:text-hiveprimary-700 hover:border-hiveprimary-200 transition-colors"
                  onClick={() => navigate(`/search?q=${encodeURIComponent(skill)}`)}
                >
                  {skill}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-hiveprimary-700 to-hiveprimary-900"></div>
          <div className="absolute inset-0 opacity-10">
            <div className="h-full w-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRjMC0yLjIwOS0xLjc5LTQtNC00cy00IDEuNzkxLTQgNHYyYzAgMS4xMDUuODk1IDIgMiAyaDRjMS4xMDUgMCAyLS44OTUgMi0ydi0yem0tNCAyYy0xLjEwNSAwLTItLjg5NS0yLTJ2LTJjMC0xLjEwNS44OTUtMiAyLTJzMiAuODk1IDIgMnYyYzAgMS4xMDUtLjg5NSAyLTIgMnoiLz48L2c+PC9nPjwvc3ZnPg==')]"></div>
          </div>
          
          <div className="container relative z-10 mx-auto px-4 text-center">
            <div className="mx-auto max-w-3xl">
              <Award className="mx-auto mb-6 h-16 w-16 text-hivesecondary-400" />
              <h2 className="mb-4 text-3xl font-bold text-white">Ready to Share Your Skills?</h2>
              <p className="mx-auto mb-8 max-w-2xl text-lg text-white/80">
                Join thousands of people who are already sharing and learning new skills on SkillHive. Start your journey today!
              </p>
              <Button 
                size="lg" 
                className="bg-hivesecondary-500 hover:bg-hivesecondary-600 text-white shadow-lg shadow-hivesecondary-500/20"
                onClick={() => navigate(isAuthenticated ? "/search" : "/register")}
              >
                {isAuthenticated ? "Find Skills Now" : "Create Your Account"}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
