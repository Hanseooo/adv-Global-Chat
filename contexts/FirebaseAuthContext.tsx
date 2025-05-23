import React, { createContext, useContext, useState, useEffect } from "react";
import {
  onAuthStateChanged,
  User,
  getIdToken,
  setPersistence,
  browserLocalPersistence,
  getAuth, // Import getAuth
} from "firebase/auth";
import { auth } from "../app/firebase/firebase";

// Define a more comprehensive type for the context
interface AuthContextType {
  user: User | null;
  loading: boolean;
  getToken: () => Promise<string | null>;
  isAuthenticated: boolean;
}

// Create Authentication Context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  getToken: async () => null,
  isAuthenticated: false,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        await setPersistence(auth, browserLocalPersistence);
        console.log("Successfully set persistence to local storage.");
      } catch (error: any) {
        console.error("Error setting persistence:", error.code, error.message);
      }
    };

    initializeAuth();
  }, []);

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  // Function to get the current user's ID token
  const getToken = async (): Promise<string | null> => {
    if (!user) return null;
    try {
      return await user.getIdToken(true); // Force refresh to ensure token is up-to-date
    } catch (error) {
      console.error("Error getting token:", error);
      return null;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        getToken,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook to Use Authentication Context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
