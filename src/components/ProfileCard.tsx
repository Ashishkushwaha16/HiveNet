
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import SkillBadge from "./SkillBadge";
import { Link } from "react-router-dom";

export interface Profile {
  id: string;
  name: string;
  avatar?: string;
  title: string;
  location: string;
  skills: string[];
  rating: number;
}

interface ProfileCardProps {
  profile: Profile;
}

const ProfileCard = ({ profile }: ProfileCardProps) => {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="p-0">
        <div className="h-24 bg-gradient-to-r from-hiveprimary-600 to-hiveprimary-400" />
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <div className="-mt-12 flex flex-col items-center">
          <Avatar className="h-24 w-24 border-4 border-background">
            <AvatarImage src={profile.avatar} alt={profile.name} />
            <AvatarFallback className="bg-hiveprimary-200 text-hiveprimary-700">
              {getInitials(profile.name)}
            </AvatarFallback>
          </Avatar>
          <Link to={`/profile/${profile.id}`}>
            <h3 className="mt-4 text-xl font-semibold hover:text-hiveprimary-700">
              {profile.name}
            </h3>
          </Link>
          <p className="text-sm text-muted-foreground">{profile.title}</p>
          <p className="mb-3 text-xs text-muted-foreground">{profile.location}</p>
          
          <div className="mb-4 flex flex-wrap gap-2">
            {profile.skills.slice(0, 3).map((skill) => (
              <SkillBadge key={skill} name={skill} />
            ))}
            {profile.skills.length > 3 && (
              <span className="text-xs text-muted-foreground">
                +{profile.skills.length - 3} more
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className={`h-4 w-4 text-${
                  i < profile.rating ? "hivesecondary" : "gray"
                }-400`}
              >
                ★
              </span>
            ))}
            <span className="ml-1 text-xs text-muted-foreground">
              ({profile.rating.toFixed(1)})
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full gap-2" variant="outline">
          <MessageSquare className="h-4 w-4" />
          Connect
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProfileCard;
