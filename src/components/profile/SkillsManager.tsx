
import { useState } from "react";
import { useUser } from "@/context/UserContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SkillBadge from "@/components/SkillBadge";
import { Plus, X, Loader2 } from "lucide-react";
import { mockSkills } from "@/data/mockData";
import { toast } from "sonner";

interface SkillsManagerProps {
  isEditable?: boolean;
}

const SkillsManager = ({ isEditable = false }: SkillsManagerProps) => {
  const { user, addSkill, removeSkill } = useUser();
  const [newSkill, setNewSkill] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const filteredSuggestions = newSkill 
    ? mockSkills.filter(skill => 
        skill.toLowerCase().includes(newSkill.toLowerCase()) && 
        !user?.skills.includes(skill)
      ).slice(0, 5)
    : [];

  const handleAddSkill = async () => {
    if (!newSkill.trim()) {
      toast.error("Please enter a skill name");
      return;
    }
    
    if (user?.skills.includes(newSkill)) {
      toast.error("This skill is already in your profile");
      return;
    }
    
    setIsAdding(true);
    const success = await addSkill(newSkill);
    
    if (success) {
      setNewSkill("");
    }
    
    setIsAdding(false);
    setShowSuggestions(false);
  };

  const handleSelectSuggestion = (skill: string) => {
    setNewSkill(skill);
    setShowSuggestions(false);
  };

  const handleRemoveSkill = async (skill: string) => {
    await removeSkill(skill);
  };

  return (
    <div className="space-y-4">
      {isEditable && (
        <div className="relative space-y-2">
          <div className="flex gap-2">
            <Input
              placeholder="Add a new skill..."
              value={newSkill}
              onChange={(e) => {
                setNewSkill(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              className="flex-1"
            />
            <Button 
              onClick={handleAddSkill} 
              disabled={isAdding}
              className="bg-hiveprimary-600 hover:bg-hiveprimary-700"
            >
              {isAdding ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <Plus className="h-4 w-4" />
                  Add
                </>
              )}
            </Button>
          </div>
          
          {showSuggestions && filteredSuggestions.length > 0 && (
            <div className="absolute z-10 mt-1 w-full rounded-md border bg-white shadow-lg">
              <ul className="py-1">
                {filteredSuggestions.map((skill) => (
                  <li 
                    key={skill} 
                    className="cursor-pointer px-3 py-2 hover:bg-hiveprimary-50"
                    onClick={() => handleSelectSuggestion(skill)}
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
      
      <div className="flex flex-wrap gap-2">
        {user?.skills.map((skill) => (
          <div key={skill} className="group relative">
            <SkillBadge name={skill} />
            {isEditable && (
              <button
                onClick={() => handleRemoveSkill(skill)}
                className="absolute -right-1 -top-1 hidden h-4 w-4 rounded-full bg-red-500 text-white group-hover:flex items-center justify-center"
                aria-label={`Remove ${skill}`}
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </div>
        ))}
        
        {user?.skills.length === 0 && (
          <p className="text-sm text-muted-foreground">No skills added yet.</p>
        )}
      </div>
    </div>
  );
};

export default SkillsManager;
