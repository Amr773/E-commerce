"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface UserContextType  {
  userId: string | null;
  setuserId: (id: string) => void;
};

export const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [userId, setuserId] = useState<string | null>(null);

  return (
    <UserContext.Provider value={{ userId, setuserId }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) {
    throw new Error("useUser must be used inside <UserProvider>");
  }
  return ctx;
}
