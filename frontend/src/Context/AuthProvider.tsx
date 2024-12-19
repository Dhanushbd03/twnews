import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "@/api/axios";
import { toast } from "sonner";

type User = {
  message: string;
  id: string;
  username: string;
  email: string;
};

type loginData = {
  username: string;
  password: string;
};

type AuthContextType = {
  user: User | null;
  login: (user: loginData) => Promise<void>;
  logout: () => Promise<void>;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  // login function
  const login = async (user: loginData) => {
    try {
      const response = await axios.post("/auth/login", user, {
        withCredentials: true,
      });
      setUser(response.data);
    } catch (error) {
      console.error("Login failed:", error);
      throw new Error("Login failed");
    }
  };

  const logout = async () => {
    await axios.post("/auth/logout", { withCredentials: true });
    toast.warning("User logged out");
    setUser(null);
  };

  // verify user (run only once on component mount)
  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await axios.get("/auth/verify", {
          withCredentials: true,
        });
        setUser(response.data);
      } catch (error) {
        console.error("User verification failed:", error);
      }
    };
    verifyUser();
  }, []); // Empty dependency array ensures this only runs once on mount
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
