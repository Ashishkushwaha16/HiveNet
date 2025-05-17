
import { cn } from "@/lib/utils";

interface SkillBadgeProps {
  name: string;
  className?: string;
}

const SkillBadge = ({ name, className }: SkillBadgeProps) => {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-hiveprimary-100 px-3 py-1 text-sm font-medium text-hiveprimary-800",
        className
      )}
    >
      {name}
    </span>
  );
};

export default SkillBadge;
