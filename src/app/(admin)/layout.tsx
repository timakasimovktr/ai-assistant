"use client";

import Backdrop from "@/layout/Backdrop";
import AppHeader from "@/layout/AppHeader";
import { CookiesProvider } from "react-cookie";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  // const mainContentMargin = isMobileOpen
  //   ? "ml-0"
  //   : isExpanded || isHovered
  //   ? "lg:ml-[290px]"
  //   : "lg:ml-[90px]";

  return (
    <CookiesProvider>
      <div className="position-fixed top-0 right-0 z-999">
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
      <div className="min-h-screen xl:flex">
        {/* Sidebar and Backdrop */}
        {/* <AppSidebar /> */}
        <Backdrop />
        {/* Main Content Area */}
        <div
          // className={`flex-1 transition-all  duration-300 ease-in-out ${mainContentMargin}`}
          className={`flex-1 transition-all  duration-300 ease-in-out ml-0`}
        >
          {/* Header */}
          <AppHeader />
          {/* Page Content */}
          <div className="p-4 mx-auto md:p-6">{children}</div>
        </div>
      </div>
    </CookiesProvider>
  );
}
