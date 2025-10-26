"use client";

import { useEffect, useState } from "react";
import { SidebarProvider } from "@/context/SidebarContext";
import { ThemeProvider } from "@/context/ThemeContext";

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <SidebarProvider>{children}</SidebarProvider>
    </ThemeProvider>
  );
}
