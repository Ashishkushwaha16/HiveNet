import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { mockProfiles } from "@/data/mockData";
import { Profile } from "@/components/ProfileCard";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileTabContent from "@/components/profile/ProfileTabContent";

const ProfileDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useUser();
  const isOwnProfile = user?.id === id;

  useEffect(() => {
    // Simulate API call
    setIsLoading(true);
    setTimeout(() => {
      if (isOwnProfile && user) {
        // If viewing own profile, use the user data from context
        const userProfile: Profile = {
          id: user.id,
          name: user.name,
          avatar: user.avatar,
          title: "Skill Sharer", // Default title
          location: "Your Location", // Default location
          skills: user.skills,
          rating: 5.0 // Default rating
        };
        setProfile(userProfile);
      } else {
        // Otherwise, find the profile in mock data
        const foundProfile = mockProfiles.find(p => p.id === id);
        setProfile(foundProfile || null);
      }
      setIsLoading(false);
    }, 500);
  }, [id, isOwnProfile, user]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="container mx-auto flex-1 px-4 py-8">
          <div className="animate-pulse">
            <div className="h-40 w-full rounded-lg bg-muted"></div>
            <div className="mt-6 h-8 w-1/3 rounded bg-muted"></div>
            <div className="mt-4 h-4 w-1/4 rounded bg-muted"></div>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <div className="h-40 rounded bg-muted"></div>
              <div className="h-40 rounded bg-muted"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="container mx-auto flex-1 px-4 py-8 text-center">
          <h1 className="mb-4 text-2xl font-bold">Profile Not Found</h1>
          <p className="mb-6 text-muted-foreground">The profile you're looking for doesn't exist or has been removed.</p>
          <Link to="/search">
            <Button>Find Other Profiles</Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <ProfileHeader profile={profile} isOwnProfile={isOwnProfile} />
        <div className="container mx-auto px-4 py-8">
          <ProfileTabContent profile={profile} isOwnProfile={isOwnProfile} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProfileDetail;
