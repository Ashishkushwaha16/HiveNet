
import { Building, Calendar, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Profile } from "@/components/ProfileCard";
import ContactOptions from "@/components/profile/ContactOptions";

interface ProfileAboutProps {
  profile: Profile;
  isOwnProfile: boolean;
}

const ProfileAbout = ({ profile, isOwnProfile }: ProfileAboutProps) => {
  return (
    <div className="grid gap-8 md:grid-cols-3">
      <div className="md:col-span-2">
        <div className="rounded-lg border bg-card p-6">
          <h2 className="mb-4 text-xl font-semibold">About</h2>
          <p className="text-muted-foreground">
            {profile.title} with a passion for sharing knowledge and continuous learning. 
            Experienced in various projects and always looking to connect with others 
            interested in similar fields. I believe in the power of collaboration and 
            how sharing skills can benefit everyone involved.
          </p>

          <h2 className="mb-4 mt-8 text-xl font-semibold">Experience</h2>
          <div className="space-y-4">
            <div className="rounded-md border bg-card p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium">Senior {profile.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Building className="h-4 w-4" />
                    <span>Example Company Inc.</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Jan 2020 - Present</span>
                  </div>
                </div>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Led teams and projects in {profile.skills.join(", ")} to deliver high-quality solutions.
              </p>
            </div>
            <div className="rounded-md border bg-card p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium">{profile.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Building className="h-4 w-4" />
                    <span>Previous Company LLC</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Mar 2017 - Dec 2019</span>
                  </div>
                </div>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Developed expertise in {profile.skills.slice(0, 2).join(" and ")}.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="rounded-lg border bg-card p-6">
          <h2 className="mb-4 text-xl font-semibold">Connect</h2>
          {!isOwnProfile && (
            <ContactOptions profile={profile} />
          )}
          
          <h3 className="mb-2 mt-6 font-medium">Availability</h3>
          <p className="text-sm text-muted-foreground">
            Available for skill sharing on weekends and weekday evenings.
          </p>
          
          <h3 className="mb-2 mt-6 font-medium">Teaching Methods</h3>
          <p className="text-sm text-muted-foreground">
            Prefers online video calls for initial sessions, followed by in-person meetings if local.
          </p>
          
          <h3 className="mb-2 mt-6 font-medium">Links</h3>
          <div className="space-y-2">
            <Button variant="ghost" className="w-full justify-start text-hiveprimary-600" asChild>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                Personal Website
              </a>
            </Button>
            <Button variant="ghost" className="w-full justify-start text-hiveprimary-600" asChild>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                LinkedIn
              </a>
            </Button>
          </div>
        </div>

        <div className="mt-6 rounded-lg border bg-card p-6">
          <h2 className="mb-4 text-xl font-semibold">Skills I Want to Learn</h2>
          <div className="flex flex-wrap gap-2">
            <div className="rounded-full bg-hiveprimary-50 px-3 py-1 text-sm text-hiveprimary-600">
              Public Speaking
            </div>
            <div className="rounded-full bg-hiveprimary-50 px-3 py-1 text-sm text-hiveprimary-600">
              Photography
            </div>
            <div className="rounded-full bg-hiveprimary-50 px-3 py-1 text-sm text-hiveprimary-600">
              Financial Planning
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileAbout;
