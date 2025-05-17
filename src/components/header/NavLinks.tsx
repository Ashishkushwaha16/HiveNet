
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";

export interface NavLinksProps {
  onClick?: () => void;
}

const NavLinks = ({ onClick }: NavLinksProps) => {
  const { isAuthenticated } = useUser();
  
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) onClick();
  };

  return (
    <>
      <Link 
        to="/search" 
        className="text-muted-foreground hover:text-hiveprimary-600 transition-colors"
        onClick={handleClick}
      >
        Find Skills
      </Link>
      <Link 
        to="/about" 
        className="text-muted-foreground hover:text-hiveprimary-600 transition-colors"
        onClick={handleClick}
      >
        How It Works
      </Link>
      <Link 
        to="/contact" 
        className="text-muted-foreground hover:text-hiveprimary-600 transition-colors"
        onClick={handleClick}
      >
        Contact Us
      </Link>
      {isAuthenticated && (
        <Link 
          to="/settings" 
          className="text-muted-foreground hover:text-hiveprimary-600 transition-colors"
          onClick={handleClick}
        >
          Settings
        </Link>
      )}
      <Link to="/search" onClick={handleClick}>
        <Button variant="ghost" size="icon">
          <Search className="h-5 w-5" />
          <span className="sr-only">Search</span>
        </Button>
      </Link>
    </>
  );
};

export default NavLinks;
