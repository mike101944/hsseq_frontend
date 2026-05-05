import React, { forwardRef, useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  FiX, FiHome, FiAlertTriangle, FiClipboard, FiBook, FiShield, 
  FiMonitor, FiCheckSquare, FiActivity, FiBarChart2, 
  FiChevronLeft, FiChevronRight, FiChevronDown, FiChevronUp 
} from "react-icons/fi";

export const Sidebar = forwardRef(({ 
  sidebarOpen, 
  setSidebarOpen, 
  sidebarCollapsed, 
  setSidebarCollapsed 
}, ref) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState({});
  const [hoveredModule, setHoveredModule] = useState(null);
  
  const modules = [
    { id: 'dashboard', name: 'Dashboard', icon: FiHome, path: '/', type: 'single' },
    { 
      id: 'incidents', name: 'Incidents Management', icon: FiAlertTriangle, type: 'dropdown',
      subItems: [
        { id: 'incidents-list', name: 'All Incidents', path: '/incidents/list' },
        { id: 'incidents-create', name: 'Report Incident', path: '/incidents/create' },
        { id: 'incidents-analysis', name: 'Incident Analysis', path: '/incidents/analysis' }
      ]
    },
    { id: 'audits', name: 'Audits Management', icon: FiClipboard, path: '/audits', type: 'single' },
    { 
      id: 'training', name: 'Training Portal', icon: FiBook, type: 'dropdown',
      subItems: [
        { id: 'training-list', name: 'Training Programs', path: '/training/list' },
        { id: 'training-create', name: 'Schedule Training', path: '/training/create' },
        { id: 'training-reports', name: 'Training Reports', path: '/training/reports' }
      ]
    },
    { id: 'compliance', name: 'Compliance Management', icon: FiShield, path: '/compliance', type: 'single' },
    { 
      id: 'monitoring', name: 'Monitoring Management', icon: FiMonitor, type: 'dropdown',
      subItems: [
        { id: 'monitoring-dashboard', name: 'Monitoring Dashboard', path: '/monitoring/dashboard' },
        { id: 'monitoring-alerts', name: 'Alerts & Notifications', path: '/monitoring/alerts' },
        { id: 'monitoring-reports', name: 'Monitoring Reports', path: '/monitoring/reports' }
      ]
    },
    { id: 'inspections', name: 'Inspections Management', icon: FiCheckSquare, path: '/inspections', type: 'single' },
    { id: 'risk', name: 'Risk Management', icon: FiActivity, path: '/risk', type: 'single' },
    { id: 'reports', name: 'Report Management', icon: FiBarChart2, path: '/reports', type: 'single' }
  ];

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const mobile = width < 768;
      const tablet = width >= 768 && width < 1024;
      
      setIsMobile(mobile);
      setIsTablet(tablet);

      if (tablet) setSidebarCollapsed(true);
      else setSidebarCollapsed(false);

      if (!mobile) setSidebarOpen(false);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setSidebarCollapsed, setSidebarOpen]);

  useEffect(() => {
    if (sidebarCollapsed && !isMobile) setOpenDropdowns({});
  }, [sidebarCollapsed, isMobile]);

  const toggleDropdown = (moduleId) => {
    if (sidebarCollapsed && !isMobile) return;
    setOpenDropdowns(prev => ({
      ...prev,
      [moduleId]: !prev[moduleId]
    }));
  };

  const handleNavigation = (path, moduleId) => {
    navigate(path);
    setHoveredModule(null);
    if (isMobile) setSidebarOpen(false);
  };

  const handleCollapsedModuleClick = (module) => {
    if (module.type === 'single') {
      handleNavigation(module.path, module.id);
    } else if (module.type === 'dropdown' && module.subItems?.length > 0) {
      handleNavigation(module.subItems[0].path, module.id);
    }
  };

  const isActivePath = (path) => {
    return location.pathname === path || 
           (path !== '/' && location.pathname.startsWith(path));
  };

  const getSidebarClasses = () => {
    const baseClasses = `
      h-full bg-gradient-to-b from-green-700 to-green-800 border-r border-green-600 
      shadow-2xl shadow-green-900/50 flex flex-col p-4 transition-all duration-300
      overflow-x-hidden
    `;

    if (isMobile) {
      return `${baseClasses} fixed top-0 left-0 w-64 overflow-y-auto z-50 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`;
    }
    if (isTablet) {
      return `${baseClasses} relative z-40 ${sidebarCollapsed ? "w-20" : "w-64 overflow-y-auto"}`;
    }
    return `${baseClasses} relative z-40 ${sidebarCollapsed ? "w-20" : "w-72 overflow-y-auto"}`;
  };

  // ==============================
  // RENDER MODULE ITEMS
  // ==============================
  const renderModuleItem = (module) => {
    const IconComponent = module.icon;
    const isActive = isActivePath(module.path);
    const isDropdownOpen = openDropdowns[module.id];
    const hasSubItems = module.type === 'dropdown' && module.subItems;

    // COLLAPSED STATE
    if (sidebarCollapsed && !isMobile) {
      return (
        <li key={module.id}>
          <div className="relative">
            <button
              onClick={() => handleCollapsedModuleClick(module)}
              onMouseEnter={() => setHoveredModule(module.id)}
              onMouseLeave={() => {
                setTimeout(() => {
                  if (hoveredModule === module.id) setHoveredModule(null);
                }, 150);
              }}
              className={`
                w-full flex items-center justify-center px-3 py-3 rounded-lg transition-all duration-200
                ${isActive ? 'bg-white text-green-700 shadow-lg' : 'text-green-100 hover:bg-green-600 hover:text-white'}
              `}
            >
              <IconComponent className="w-5 h-5" />
            </button>

            {/* CLICKABLE TOOLTIP */}
            {hoveredModule === module.id && (
              <div
                className="absolute left-full top-0 ml-2 z-[9999]"
                onMouseEnter={() => setHoveredModule(module.id)}
                onMouseLeave={() => setHoveredModule(null)}
              >
                <div className="bg-gray-900/95 backdrop-blur-sm text-white rounded-lg shadow-2xl border border-gray-700 min-w-48 py-1">
                  {/* Main header clickable */}
                  <div
                    className="px-3 py-2 border-b border-gray-700 hover:bg-gray-800 cursor-pointer flex items-center gap-2"
                    onClick={() => handleCollapsedModuleClick(module)}
                  >
                    <IconComponent className="w-4 h-4 text-green-400" />
                    <span className="font-medium text-sm">{module.name}</span>
                  </div>

                  {/* Sub-items */}
                  {hasSubItems && (
                    <div className="py-1">
                      {module.subItems.map((subItem) => {
                        const isSubItemActive = isActivePath(subItem.path);
                        return (
                          <div
                            key={subItem.id}
                            className={`
                              px-3 py-2 text-sm cursor-pointer flex items-center gap-2 transition-all
                              ${isSubItemActive
                                ? "bg-green-600 text-white"
                                : "text-gray-300 hover:bg-gray-800 hover:text-white"
                              }
                            `}
                            onClick={() => handleNavigation(subItem.path, module.id)}
                          >
                            <div
                              className={`w-1 h-1 rounded-full ${
                                isSubItemActive ? "bg-white" : "bg-gray-400"
                              }`}
                            ></div>
                            <span>{subItem.name}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </li>
      );
    }

    // EXPANDED STATE
    return (
      <li key={module.id}>
        <div className="space-y-1">
          <button
            onClick={() => hasSubItems ? toggleDropdown(module.id) : handleNavigation(module.path, module.id)}
            className={`
              w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 group
              ${isActive ? 'bg-white text-green-700 shadow-lg' : 'text-green-100 hover:bg-green-600 hover:text-white'}
            `}
          >
            <IconComponent className={`w-5 h-5 ${isActive ? 'text-green-700' : ''}`} />
            <span className="font-medium text-sm whitespace-nowrap flex-1 text-left">{module.name}</span>
            {hasSubItems && (
              <div className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}>
                {isDropdownOpen ? <FiChevronUp className="w-4 h-4" /> : <FiChevronDown className="w-4 h-4" />}
              </div>
            )}
            {!hasSubItems && isActive && <div className="w-2 h-2 bg-green-500 rounded-full"></div>}
          </button>

          {hasSubItems && isDropdownOpen && (
            <ul className="ml-4 space-y-1 border-l-2 border-green-600 pl-2">
              {module.subItems.map((subItem) => {
                const isSubItemActive = isActivePath(subItem.path);
                return (
                  <li key={subItem.id}>
                    <button
                      onClick={() => handleNavigation(subItem.path, module.id)}
                      className={`
                        w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 text-sm
                        ${isSubItemActive 
                          ? 'bg-green-600 text-white shadow-md' 
                          : 'text-green-200 hover:bg-green-600 hover:text-white'}
                      `}
                    >
                      <div className={`w-1 h-1 rounded-full ${isSubItemActive ? 'bg-white' : 'bg-green-400'}`}></div>
                      <span>{subItem.name}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </li>
    );
  };

  return (
    <>
      {sidebarOpen && isMobile && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setSidebarOpen(false)}></div>
      )}

      <div
        ref={ref}
        className={getSidebarClasses()}
        style={{
          maxWidth: "100%",
          boxSizing: "border-box",
          overflow: "visible", // 👈 IMPORTANT for visible tooltips
        }}
      >
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

        <div className={`flex items-center gap-3 mb-8 px-2 ${sidebarCollapsed && !isMobile ? 'justify-center' : ''}`}>
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-green-700 font-bold text-lg">H</span>
          </div>
          {(!sidebarCollapsed || isMobile) && (
            <div className="flex-1 min-w-0">
              <h1 className="text-xl font-bold text-white truncate">HSSEQ System</h1>
              <p className="text-green-200 text-xs truncate">Safety First</p>
            </div>
          )}
        </div>

        {!isMobile && (
          <div className="absolute top-4 -right-3 z-50">
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="w-6 h-6 bg-green-700 border-2 border-green-600 rounded-full flex items-center justify-center hover:bg-green-600 transition-all shadow-lg"
            >
              {sidebarCollapsed ? <FiChevronRight className="w-3 h-3 text-white" /> : <FiChevronLeft className="w-3 h-3 text-white" />}
            </button>
          </div>
        )}

        <nav className="flex-1 min-w-0">
          <ul className="space-y-2 min-w-0">{modules.map(renderModuleItem)}</ul>
        </nav>

        {(!sidebarCollapsed || isMobile) && (
          <div className="mt-auto pt-4 border-t border-green-600 min-w-0">
            <div className="flex items-center gap-3 px-2 py-3 text-green-200">
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
