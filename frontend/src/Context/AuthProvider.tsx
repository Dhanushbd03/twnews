import React, { createContext, useEffect, useState } from "react";
import axios from "@/api/axios";

type User = {
  message: string;
  id: string;
  username: string;
  email: string;
};
type loginData = {
  username: string;
  password: string
};

type AuthContextType = {
user: User | null;
login:(user:loginData)=>void
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
        withCredentials: true
      })
      setUser(response.data)
      return response.data;
    } catch {
      throw new Error("login failed")
    }
  };
  // verify user
  useEffect(() => {
    const verifyUser = async () => {
      const response = await axios.get("/auth/verify", {
        withCredentials: true
      })
      setUser(response.data)
    }
    verifyUser()
  }, [user])

  console.log(user)
  return (
    <AuthContext.Provider value={{user , login}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext;