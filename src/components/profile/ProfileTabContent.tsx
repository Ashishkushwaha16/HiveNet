
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Award, FileText } from "lucide-react";
import { Profile } from "@/components/ProfileCard";
import CertificatesSection from "@/components/profile/CertificatesSection";
import SkillsManager from "@/components/profile/SkillsManager";
import ProfileAbout from "@/components/profile/ProfileAbout";

interface ProfileTabContentProps {
  profile: Profile;
  isOwnProfile: boolean;
}

const ProfileTabContent = ({ profile, isOwnProfile }: ProfileTabContentProps) => {
  return (
    <Tabs defaultValue="about">
      <TabsList className="mb-8">
        <TabsTrigger value="about" className="gap-2">
          <User className="h-4 w-4" />
          About
        </TabsTrigger>
        <TabsTrigger value="certificates" className="gap-2">
          <Award className="h-4 w-4" />
          Certificates
        </TabsTrigger>
        <TabsTrigger value="skills" className="gap-2">
          <FileText className="h-4 w-4" />
          Skills
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="about">
        <ProfileAbout profile={profile} isOwnProfile={isOwnProfile} />
      </TabsContent>
      
      <TabsContent value="certificates">
        <div className="rounded-lg border bg-card p-6">
          <CertificatesSection isOwnProfile={isOwnProfile} />
        </div>
      </TabsContent>
      
      <TabsContent value="skills">
        <div className="rounded-lg border bg-card p-6">
          <h2 className="mb-4 text-xl font-semibold">My Skills</h2>
          <SkillsManager isEditable={isOwnProfile} />
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default ProfileTabContent;
