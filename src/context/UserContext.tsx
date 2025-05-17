
import React, { createContext, useState, useContext, useEffect } from "react";
import { toast } from "sonner";

interface Certificate {
  id: string;
  name: string;
  issuer: string;
  date: string;
  url: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  linkedInUrl?: string;
  githubUrl?: string;
  skills: string[];
  certificates: Certificate[];
}

interface UserContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string, phone?: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => Promise<boolean>;
  addSkill: (skill: string) => Promise<boolean>;
  removeSkill: (skill: string) => Promise<boolean>;
  addCertificate: (certificate: Omit<Certificate, "id">) => Promise<boolean>;
  removeCertificate: (certificateId: string) => Promise<boolean>;
  isAuthenticated: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem("skillhive_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse stored user", e);
        localStorage.removeItem("skillhive_user");
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      // This is a mock implementation - in a real app, this would call a backend API
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      // For demo purposes, accept any login with valid format
      if (email && password.length >= 6) {
        const mockUser = {
          id: "user_" + Math.random().toString(36).substr(2, 9),
          name: email.split('@')[0],
          email: email,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
          skills: ["JavaScript", "React"],
          certificates: []
        };
        
        setUser(mockUser);
        localStorage.setItem("skillhive_user", JSON.stringify(mockUser));
        toast.success("Login successful!");
        return true;
      } else {
        toast.error("Invalid email or password");
        return false;
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed. Please try again.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string, phone?: string) => {
    try {
      setLoading(true);
      // This is a mock implementation - in a real app, this would call a backend API
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      if (name && email && password.length >= 6) {
        const mockUser = {
          id: "user_" + Math.random().toString(36).substr(2, 9),
          name: name,
          email: email,
          phone: phone || "",
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
          skills: [],
          certificates: []
        };
        
        setUser(mockUser);
        localStorage.setItem("skillhive_user", JSON.stringify(mockUser));
        toast.success("Registration successful!");
        return true;
      } else {
        toast.error("Please fill all fields correctly");
        return false;
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Registration failed. Please try again.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<User>) => {
    try {
      setLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (!user) {
        toast.error("You must be logged in to update your profile");
        return false;
      }
      
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem("skillhive_user", JSON.stringify(updatedUser));
      toast.success("Profile updated successfully!");
      return true;
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error("Failed to update profile. Please try again.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const addSkill = async (skill: string) => {
    try {
      setLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (!user) {
        toast.error("You must be logged in to add skills");
        return false;
      }
      
      if (user.skills.includes(skill)) {
        toast.error("This skill is already in your profile");
        return false;
      }
      
      const updatedUser = { 
        ...user, 
        skills: [...user.skills, skill] 
      };
      
      setUser(updatedUser);
      localStorage.setItem("skillhive_user", JSON.stringify(updatedUser));
      toast.success(`${skill} added to your skills!`);
      return true;
    } catch (error) {
      console.error("Add skill error:", error);
      toast.error("Failed to add skill. Please try again.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const removeSkill = async (skill: string) => {
    try {
      setLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (!user) {
        toast.error("You must be logged in to remove skills");
        return false;
      }
      
      const updatedUser = { 
        ...user, 
        skills: user.skills.filter(s => s !== skill) 
      };
      
      setUser(updatedUser);
      localStorage.setItem("skillhive_user", JSON.stringify(updatedUser));
      toast.success(`${skill} removed from your skills!`);
      return true;
    } catch (error) {
      console.error("Remove skill error:", error);
      toast.error("Failed to remove skill. Please try again.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const addCertificate = async (certificate: Omit<Certificate, "id">) => {
    try {
      setLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      if (!user) {
        toast.error("You must be logged in to add certificates");
        return false;
      }
      
      const newCertificate = {
        ...certificate,
        id: "cert_" + Math.random().toString(36).substr(2, 9)
      };
      
      const updatedUser = { 
        ...user, 
        certificates: [...user.certificates, newCertificate] 
      };
      
      setUser(updatedUser);
      localStorage.setItem("skillhive_user", JSON.stringify(updatedUser));
      toast.success(`Certificate added successfully!`);
      return true;
    } catch (error) {
      console.error("Add certificate error:", error);
      toast.error("Failed to add certificate. Please try again.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const removeCertificate = async (certificateId: string) => {
    try {
      setLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (!user) {
        toast.error("You must be logged in to remove certificates");
        return false;
      }
      
      const updatedUser = { 
        ...user, 
        certificates: user.certificates.filter(c => c.id !== certificateId) 
      };
      
      setUser(updatedUser);
      localStorage.setItem("skillhive_user", JSON.stringify(updatedUser));
      toast.success(`Certificate removed successfully!`);
      return true;
    } catch (error) {
      console.error("Remove certificate error:", error);
      toast.error("Failed to remove certificate. Please try again.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("skillhive_user");
    setUser(null);
    toast.success("Logged out successfully");
  };

  return (
    <UserContext.Provider 
      value={{ 
        user, 
        loading, 
        login, 
        register, 
        updateProfile,
        addSkill,
        removeSkill,
        addCertificate,
        removeCertificate,
        logout, 
        isAuthenticated: !!user 
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
