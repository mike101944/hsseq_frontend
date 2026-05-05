import React, { forwardRef, useState, useEffect } from "react";
import { FiX, FiHome, FiAlertTriangle, FiClipboard, FiBook, FiShield, FiMonitor, FiCheckSquare, FiActivity, FiBarChart2, FiChevronLeft, FiChevronRight } from "react-icons/fi";

export const Sidebar = forwardRef(({ 
  sidebarOpen, 
  setSidebarOpen, 
  activeModule, 
  setActiveModule, 
  sidebarCollapsed, 
  setSidebarCollapsed 
}, ref) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  
  const modules = [
    { id: 'dashboard', name: 'Dashboard', icon: FiHome },
    { id: 'incidents', name: 'Incidents Management', icon: FiAlertTriangle },
    { id: 'audits', name: 'Audits Management', icon: FiClipboard },
    { id: 'training', name: 'Training Portal', icon: FiBook },
    { id: 'compliance', name: 'Compliance Management', icon: FiShield },
    { id: 'monitoring', name: 'Monitoring Management', icon: FiMonitor },
    { id: 'inspections', name: 'Inspections Management', icon: FiCheckSquare },
    { id: 'risk', name: 'Risk Management', icon: FiActivity },
    { id: 'reports', name: 'Report Management', icon: FiBarChart2 }
  ];

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const mobile = width < 768;
      const tablet = width >= 768 && width < 1024;
      
      setIsMobile(mobile);
      setIsTablet(tablet);

      if (tablet) {
        setSidebarCollapsed(true);
      } else {
        setSidebarCollapsed(false);
      }

      if (!mobile) {
        setSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setSidebarCollapsed, setSidebarOpen]);

  const handleModuleClick = (moduleId) => {
    setActiveModule(moduleId);
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  const toggleSidebarCollapse = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const getSidebarClasses = () => {
    const baseClasses = `
      h-full bg-gradient-to-b from-green-700 to-green-800 border-r border-green-600 
      shadow-2xl shadow-green-900/50 flex flex-col p-4 overflow-y-auto transition-all duration-300 z-20
    `;

    if (isMobile) {
      return `
        ${baseClasses} fixed top-0 left-0 w-64
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `;
    }

    if (isTablet) {
      return `
        ${baseClasses} relative
        ${sidebarCollapsed ? "w-20" : "w-64"}
      `;
    }

    // Desktop
    return `
      ${baseClasses} relative
      ${sidebarCollapsed ? "w-20" : "w-72"}
    `;
  };

  return (
    <>
      {/* Overlay for mobile only */}
      {sidebarOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black/50 z-10 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      <div
        ref={ref}
        className={getSidebarClasses()}
      >
        {/* Close button for mobile */}
        {isMobile && (
          <div className="flex justify-end mb-4">
            <button
              className="p-1 rounded-md hover:bg-green-600 transition"
              onClick={() => setSidebarOpen(false)}
            >
              <FiX className="w-6 h-6 text-white" />
            </button>
          </div>
        )}

        {/* Sidebar header - ALWAYS SHOWN, even when collapsed */}
        <div className={`flex items-center gap-3 mb-8 px-2 ${sidebarCollapsed && !isMobile ? 'justify-center' : ''}`}>
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-green-700 font-bold text-lg">H</span>
          </div>
          
          {/* Text part - hidden only when collapsed on tablet/desktop */}
          {(!sidebarCollapsed || isMobile) && (
            <div className="flex-1">
              <h1 className="text-xl font-bold text-white">HSSEQ System</h1>
              <p className="text-green-200 text-xs">Safety First</p>
            </div>
          )}
        </div>

        {/* Collapse toggle button - Hidden on mobile */}
        {/* {!isMobile && (
          <div className="absolute top-4 -right-3 z-30">
            <button
              onClick={toggleSidebarCollapse}
              className="w-6 h-6 bg-green-700 border-2 border-green-600 rounded-full flex items-center justify-center hover:bg-green-600 transition-all shadow-lg"
            >
              {sidebarCollapsed ? (
                <FiChevronRight className="w-3 h-3 text-white" />
              ) : (
                <FiChevronLeft className="w-3 h-3 text-white" />
              )}
            </button>
          </div>
        )} */}

        {/* Navigation modules */}
        <nav className="flex-1">
          <ul className="space-y-2">
            {modules.map((module) => {
              const IconComponent = module.icon;
              const isActive = activeModule === module.id;
              
              return (
                <li key={module.id}>
                  <button
                    onClick={() => handleModuleClick(module.id)}
                    className={`
                      w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 group relative
                      ${isActive 
                        ? 'bg-white text-green-700 shadow-lg' 
                        : 'text-green-100 hover:bg-green-600 hover:text-white'
                      }
                      ${sidebarCollapsed && !isMobile ? 'justify-center' : ''}
                    `}
                    title={sidebarCollapsed && !isMobile ? module.name : ''}
                  >
                    <IconComponent className={`w-5 h-5 ${isActive ? 'text-green-700' : ''}`} />
                    
                    {/* Module name - hidden when collapsed on tablet/desktop */}
                    {(!sidebarCollapsed || isMobile) && (
                      <>
                        <span className="font-medium text-sm whitespace-nowrap">{module.name}</span>
                        {isActive && (
                          <div className="ml-auto w-2 h-2 bg-green-500 rounded-full"></div>
                        )}
                      </>
                    )}

                    {/* Tooltip for collapsed state */}
                    {sidebarCollapsed && !isMobile && (
                      <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50 pointer-events-none">
                        {module.name}
                      </div>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Sidebar footer - Hidden when collapsed except on mobile */}
        {(!sidebarCollapsed || isMobile) && (
          <div className="mt-auto pt-4 border-t border-green-600">
            <div className={`flex items-center gap-3 px-2 py-3 text-green-200 ${sidebarCollapsed && !isMobile ? 'justify-center' : ''}`}>
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-bold">AD</span>
              </div>
              {(!sidebarCollapsed || isMobile) && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">Admin User</p>
                  <p className="text-xs text-green-300 truncate">admin@hsseq.com</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
});