
import { Link } from "react-router-dom";
import { LogOut, User, Settings, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser } from "@/context/UserContext";

export interface UserMenuProps {
  onMobileClose?: () => void;
}

const UserMenu = ({ onMobileClose }: UserMenuProps) => {
  const { user, isAuthenticated, logout } = useUser();

  const handleLinkClick = () => {
    if (onMobileClose) onMobileClose();
  };

  const handleLogout = () => {
    logout();
    if (onMobileClose) onMobileClose();
  };

  if (isAuthenticated) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8 ring-2 ring-offset-2 ring-hiveprimary-200">
              <AvatarImage src={user?.avatar} alt={user?.name} />
              <AvatarFallback className="bg-hiveprimary-100 text-hiveprimary-700">
                {user?.name?.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <div className="flex items-center justify-start gap-2 p-2 border-b">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user?.avatar} alt={user?.name} />
              <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <p className="text-sm font-medium">{user?.name}</p>
              <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
            </div>
          </div>
          <DropdownMenuItem asChild>
            <Link 
              to={`/profile/${user?.id}`} 
              className="flex cursor-pointer items-center"
              onClick={handleLinkClick}
            >
              <User className="mr-2 h-4 w-4" />
              <span>My Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link 
              to="/edit-profile" 
              className="flex cursor-pointer items-center"
              onClick={handleLinkClick}
            >
              <Edit className="mr-2 h-4 w-4" />
              <span>Edit Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link 
              to="/settings" 
              className="flex cursor-pointer items-center"
              onClick={handleLinkClick}
            >
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-500 focus:text-red-500">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <>
      <Link to="/login" onClick={handleLinkClick}>
        <Button variant="ghost" className="font-medium">Log in</Button>
      </Link>
      <Link to="/register" onClick={handleLinkClick}>
        <Button className="bg-hiveprimary-600 hover:bg-hiveprimary-700 font-medium">Sign up</Button>
      </Link>
    </>
  );
};

export default UserMenu;
