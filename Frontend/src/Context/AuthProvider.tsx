import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import type { ReactNode } from "react";

export interface User {
  _id: string;
  firstname: string;
  lastname?: string;
  email: string;
  role: "user" | "admin";
  token: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (
    firstname: string,
    lastname: string,
    email: string,
    password: string
  ) => Promise<void>;
  logout: () => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const { data } = await axios.post<User>("/api/auth/login", {
      email,
      password,
    });
    setUser(data);
    localStorage.setItem("user", JSON.stringify(data));
  };

  const signup = async (
    firstname: string,
    lastname: string,
    email: string,
    password: string
  ) => {
    const { data } = await axios.post<User>("/api/auth/signup", {
      firstname,
      lastname,
      email,
      password,
    });
    setUser(data);
    localStorage.setItem("user", JSON.stringify(data));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signup,
        logout,
        isAdmin: user?.role === "admin",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
};
