import React, { useState, useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import  {Sidebar}  from "../../components/sidebar/Sidebar";
import { Navbar } from "../../components/navbar/Navbar";
import { MainContainer } from "../../components/mainContainer/MainContainer";

export function DefaultDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeModule, setActiveModule] = useState('dashboard');
  const sidebarRef = useRef(null);

  // Close sidebar when click outside (mobile only)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        sidebarOpen &&
        window.innerWidth < 768
      ) {
        setSidebarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [sidebarOpen]);

  const toggleSidebar = () => {
    if (window.innerWidth < 768) {
      setSidebarOpen(!sidebarOpen);
    } else {
      setSidebarCollapsed(!sidebarCollapsed);
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gray-50 relative">
      {/* Sidebar - HIGHEST Z-INDEX */}
      <Sidebar
        ref={sidebarRef}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activeModule={activeModule}
        setActiveModule={setActiveModule}
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
      />

      {/* Main content area - Takes remaining space - LOWER Z-INDEX */}
      <div className="flex flex-col flex-1 min-w-0 z-10">
        <Navbar 
          toggleSidebar={toggleSidebar} 
          activeModule={activeModule}
          sidebarCollapsed={sidebarCollapsed}
        />
        <MainContainer activeModule={activeModule}>
          <Outlet />
        </MainContainer>
      </div>
    </div>
  );
}