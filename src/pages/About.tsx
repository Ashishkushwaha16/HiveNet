
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle, Users, Award, Sparkles, ArrowRight } from "lucide-react";

const About = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {/* Hero section */}
        <section className="bg-gradient-to-r from-hiveprimary-600/10 to-hiveprimary-700/10 py-16">
          <div className="container text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">How SkillHive Works</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              SkillHive connects skilled professionals with people who need their expertise. Learn how our platform helps people exchange skills and build communities.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/register">
                <Button size="lg" className="bg-hiveprimary-600 hover:bg-hiveprimary-700">
                  Join SkillHive
                </Button>
              </Link>
              <Link to="/search">
                <Button size="lg" variant="outline">
                  Explore Skills
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-16 container">
          <h2 className="text-3xl font-bold text-center mb-12">Simple Steps to Get Started</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-lg shadow-sm border text-center">
              <div className="w-12 h-12 bg-hiveprimary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-hiveprimary-600 font-bold text-xl">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Create Your Profile</h3>
              <p className="text-muted-foreground mb-4">
                Sign up and create your profile highlighting your skills, experience, and availability. Add examples of your work to showcase your expertise.
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-lg shadow-sm border text-center">
              <div className="w-12 h-12 bg-hiveprimary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-hiveprimary-600 font-bold text-xl">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Discover Skills</h3>
              <p className="text-muted-foreground mb-4">
                Browse through our extensive marketplace of skills. Use filters to find specific skills in your area or connect with remote professionals.
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-lg shadow-sm border text-center">
              <div className="w-12 h-12 bg-hiveprimary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-hiveprimary-600 font-bold text-xl">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Connect & Collaborate</h3>
              <p className="text-muted-foreground mb-4">
                Reach out to professionals, discuss your needs, and collaborate on projects. Rate and review after completion to build community trust.
              </p>
            </div>
          </div>
        </section>

        {/* Benefits section */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose SkillHive</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0 text-hiveprimary-600">
                  <CheckCircle size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Verified Professionals</h3>
                  <p className="text-muted-foreground">
                    All our professionals undergo a verification process to ensure quality and authenticity. You can trust who you're working with.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 text-hiveprimary-600">
                  <Users size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Community-Driven</h3>
                  <p className="text-muted-foreground">
                    Our platform thrives on community feedback and ratings. Find professionals with proven track records.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 text-hiveprimary-600">
                  <Award size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Diverse Skill Range</h3>
                  <p className="text-muted-foreground">
                    From technical skills to creative services, SkillHive hosts professionals across numerous disciplines.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 text-hiveprimary-600">
                  <Sparkles size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Flexible Arrangements</h3>
                  <p className="text-muted-foreground">
                    Work with professionals on your terms - whether it's a one-time project, ongoing collaboration, or skill exchange.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to action */}
        <section className="py-16 bg-hiveprimary-600 text-white">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Join Our Community?</h2>
            <p className="max-w-2xl mx-auto mb-8">
              Whether you want to offer your skills or find professionals to help with your projects, SkillHive is the platform for you.
            </p>
            <Link to="/register">
              <Button size="lg" variant="outline" className="bg-white text-hiveprimary-600 hover:bg-hiveprimary-50 border-white">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
