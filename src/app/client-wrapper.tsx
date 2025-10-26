"use client";

import { useEffect, useState } from "react";
import { SidebarProvider } from "@/context/SidebarContext";
import { ThemeProvider } from "@/context/ThemeContext";

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const lastLogin = localStorage.getItem("lastLogin");

    if (lastLogin) {
      const lastLoginTime = new Date(lastLogin).getTime();
      const now = Date.now();

      if (now - lastLoginTime < 24 * 60 * 60 * 1000) {
        setAuthorized(true);
        return;
      }
    }

    localStorage.setItem("lastLogin", new Date().toISOString());
  }, []);

  if (!authorized) return null;

  return (
    <ThemeProvider>
      <SidebarProvider>{children}</SidebarProvider>
    </ThemeProvider>
  );
}
