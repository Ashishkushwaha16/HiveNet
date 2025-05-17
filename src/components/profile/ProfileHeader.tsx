
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MapPin, Star, User } from "lucide-react";
import { Link } from "react-router-dom";
import { Profile } from "@/components/ProfileCard";
import ContactOptions from "@/components/profile/ContactOptions";

interface ProfileHeaderProps {
  profile: Profile;
  isOwnProfile: boolean;
}

const ProfileHeader = ({ profile, isOwnProfile }: ProfileHeaderProps) => {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="bg-gradient-to-r from-hiveprimary-600 to-hiveprimary-400 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-6 md:flex-row">
          <Avatar className="h-32 w-32 border-4 border-white/90">
            <AvatarImage src={profile.avatar} alt={profile.name} />
            <AvatarFallback className="bg-hiveprimary-200 text-hiveprimary-700 text-2xl">
              {getInitials(profile.name)}
            </AvatarFallback>
          </Avatar>
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold text-white">{profile.name}</h1>
            <p className="text-xl text-white/90">{profile.title}</p>
            <div className="mt-2 flex items-center justify-center gap-2 md:justify-start">
              <MapPin className="h-4 w-4 text-white/90" />
              <span className="text-white/90">{profile.location}</span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className={`h-5 w-5 text-${
                    i < profile.rating ? "hivesecondary" : "white/40"
                  }-400`}
                >
                  ★
                </span>
              ))}
              <span className="ml-1 text-white">
                ({profile.rating.toFixed(1)})
              </span>
            </div>
          </div>
          <div className="ml-auto">
            {isOwnProfile ? (
              <Button 
                className="bg-white text-hiveprimary-700 hover:bg-white/90"
                asChild
              >
                <Link to="/edit-profile">
                  <User className="mr-2 h-4 w-4" />
                  Edit Profile
                </Link>
              </Button>
            ) : (
              <ContactOptions profile={profile} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
