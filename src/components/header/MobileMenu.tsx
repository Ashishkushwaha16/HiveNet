
import { Link } from "react-router-dom";
import { Mail, Search, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@/context/UserContext";
import NavLinks from "./NavLinks";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const { user, isAuthenticated, logout } = useUser();

  if (!isOpen) return null;

  return (
    <div className="md:hidden bg-white border-t shadow-md animate-in slide-in-from-top duration-300">
      <div className="container py-4 flex flex-col space-y-4">
        <Link 
          to="/search" 
          className="px-4 py-2 text-sm hover:bg-muted rounded-md"
          onClick={onClose}
        >
          Find Skills
        </Link>
        <Link 
          to="/about" 
          className="px-4 py-2 text-sm hover:bg-muted rounded-md"
          onClick={onClose}
        >
          How It Works
        </Link>
        <Link 
          to="/contact" 
          className="px-4 py-2 text-sm hover:bg-muted rounded-md"
          onClick={onClose}
        >
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            <span>Contact Us</span>
          </div>
        </Link>
        <Link 
          to="/search" 
          className="px-4 py-2 text-sm hover:bg-muted rounded-md"
          onClick={onClose}
        >
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            <span>Search</span>
          </div>
        </Link>
        
        <div className="border-t pt-4">
          {isAuthenticated ? (
            <>
              <div className="flex items-center gap-2 px-4 py-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.avatar} alt={user?.name} />
                  <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{user?.name}</p>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                </div>
              </div>
              <Link 
                to={`/profile/${user?.id}`}
                className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted rounded-md"
                onClick={onClose}
              >
                <User className="h-4 w-4" />
                <span>My Profile</span>
              </Link>
              <button 
                onClick={() => {
                  logout();
                  onClose();
                }}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50 rounded-md"
              >
                <LogOut className="h-4 w-4" />
                <span>Log out</span>
              </button>
            </>
          ) : (
            <div className="flex flex-col gap-2 px-4">
              <Link 
                to="/login" 
                onClick={onClose}
              >
                <Button variant="outline" className="w-full">Log in</Button>
              </Link>
              <Link 
                to="/register"
                onClick={onClose}
              >
                <Button className="w-full bg-hiveprimary-600 hover:bg-hiveprimary-700">Sign up</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
