import React from "react";
import { FiMenu, FiBell, FiMessageSquare, FiUser } from "react-icons/fi";

export function Navbar({ toggleSidebar, activeModule, sidebarCollapsed }) {
  const getModuleTitle = (moduleId) => {
    const titles = {
      dashboard: 'Main Dashboard',
      incidents: 'Incidents Management',
      audits: 'Audits Management',
      training: 'Training Portal',
      compliance: 'Compliance Management',
      monitoring: 'Monitoring Management',
      inspections: 'Inspections Management',
      risk: 'Risk Management',
      reports: 'Report Management'
    };
    return titles[moduleId] || 'Dashboard';
  };

  // Always show menu button - logic handled in parent
  return (
    <div className="flex items-center justify-between w-full h-16 bg-white px-6 shadow-sm border-b border-gray-200 z-10">
      {/* Left side - Hamburger and title */}
      <div className="flex items-center gap-4">
        {/* ALWAYS show hamburger menu button */}
        <button
          className="p-2 rounded-md hover:bg-gray-100 transition"
          onClick={toggleSidebar}
        >
          <FiMenu className="w-5 h-5 text-green-700" />
        </button>

        <div>
          <h1 className="text-lg font-semibold text-gray-800">
            {getModuleTitle(activeModule)}
          </h1>
          <p className="text-sm text-gray-500">HSSEQ Management System</p>
        </div>
      </div>

      {/* Right side - Icons and profile */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <button className="relative p-2 rounded-full hover:bg-gray-100 transition">
            <FiMessageSquare className="w-5 h-5 text-gray-600" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              3
            </span>
          </button>
          
          <button className="relative p-2 rounded-full hover:bg-gray-100 transition">
            <FiBell className="w-5 h-5 text-gray-600" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-500 text-white text-xs rounded-full flex items-center justify-center">
              7
            </span>
          </button>
          
          <button className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition">
            <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
              <FiUser className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-medium text-gray-700 hidden sm:block">Admin</span>
          </button>
        </div>
      </div>
    </div>
  );
}