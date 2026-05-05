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
  
  const modules = [
    { 
      id: 'dashboard', 
      name: 'Dashboard', 
      icon: FiHome,
      path: '/',
      type: 'single'
    },
    { 
      id: 'incidents', 
      name: 'Incidents Management', 
      icon: FiAlertTriangle,
      type: 'dropdown',
      subItems: [
        { id: 'incidents-list', name: 'All Incidents', path: '/incidents/list' },
        { id: 'incidents-create', name: 'Report Incident', path: '/incidents/create' },
        { id: 'incidents-analysis', name: 'Incident Analysis', path: '/incidents/analysis' }
      ]
    },
    { 
      id: 'audits', 
      name: 'Audits Management', 
      icon: FiClipboard,
      path: '/audits',
      type: 'single'
    },
    { 
      id: 'training', 
      name: 'Training Portal', 
      icon: FiBook,
      type: 'dropdown',
      subItems: [
        { id: 'training-list', name: 'Training Programs', path: '/training/list' },
        { id: 'training-create', name: 'Schedule Training', path: '/training/create' },
        { id: 'training-reports', name: 'Training Reports', path: '/training/reports' }
      ]
    },
    { 
      id: 'compliance', 
      name: 'Compliance Management', 
      icon: FiShield,
      path: '/compliance',
      type: 'single'
    },
    { 
      id: 'monitoring', 
      name: 'Monitoring Management', 
      icon: FiMonitor,
      type: 'dropdown',
      subItems: [
        { id: 'monitoring-dashboard', name: 'Monitoring Dashboard', path: '/monitoring/dashboard' },
        { id: 'monitoring-alerts', name: 'Alerts & Notifications', path: '/monitoring/alerts' },
        { id: 'monitoring-reports', name: 'Monitoring Reports', path: '/monitoring/reports' }
      ]
    },
    { 
      id: 'inspections', 
      name: 'Inspections Management', 
      icon: FiCheckSquare,
      path: '/inspections',
      type: 'single'
    },
    { 
      id: 'risk', 
      name: 'Risk Management', 
      icon: FiActivity,
      path: '/risk',
      type: 'single'
    },
    { 
      id: 'reports', 
      name: 'Report Management', 
      icon: FiBarChart2,
      path: '/reports',
      type: 'single'
    }
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

  // Auto-close dropdowns when sidebar is collapsed
  useEffect(() => {
    if (sidebarCollapsed && !isMobile) {
      setOpenDropdowns({});
    }
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
    
    // Update active module based on path
    const mainModule = modules.find(module => 
      module.path === path || 
      (module.subItems && module.subItems.some(subItem => subItem.path === path))
    );
    
    if (mainModule) {
      // You can use this to highlight active module if needed
    }
    
    // Close sidebar on mobile after selection
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  const isActivePath = (path) => {
    return location.pathname === path || 
           (path !== '/' && location.pathname.startsWith(path));
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

  const renderModuleItem = (module) => {
    const IconComponent = module.icon;
    const isActive = isActivePath(module.path);
    const isDropdownOpen = openDropdowns[module.id];
    const hasSubItems = module.type === 'dropdown' && module.subItems;

    if (sidebarCollapsed && !isMobile && hasSubItems) {
      // For collapsed sidebar with dropdowns, show tooltip on hover
      return (
        <li key={module.id}>
          <button
            onClick={() => toggleDropdown(module.id)}
            className={`
              w-full flex items-center justify-center px-3 py-3 rounded-lg transition-all duration-200 group relative
              ${isActive ? 'bg-white text-green-700 shadow-lg' : 'text-green-100 hover:bg-green-600 hover:text-white'}
            `}
            title={module.name}
          >
            <IconComponent className={`w-5 h-5 ${isActive ? 'text-green-700' : ''}`} />
            
            {/* Tooltip for collapsed state */}
            <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50 pointer-events-none">
              {module.name}
            </div>
          </button>
        </li>
      );
    }

    return (
      <li key={module.id}>
        <div className="space-y-1">
          {/* Main module button */}
          <button
            onClick={() => hasSubItems ? toggleDropdown(module.id) : handleNavigation(module.path, module.id)}
            className={`
              w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 group
              ${isActive ? 'bg-white text-green-700 shadow-lg' : 'text-green-100 hover:bg-green-600 hover:text-white'}
              ${sidebarCollapsed && !isMobile ? 'justify-center' : ''}
            `}
            title={sidebarCollapsed && !isMobile ? module.name : ''}
          >
            <IconComponent className={`w-5 h-5 ${isActive ? 'text-green-700' : ''}`} />
            
            {/* Module name - hidden when collapsed on tablet/desktop */}
            {(!sidebarCollapsed || isMobile) && (
              <>
                <span className="font-medium text-sm whitespace-nowrap flex-1 text-left">
                  {module.name}
                </span>
                {hasSubItems && (
                  <div className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}>
                    {isDropdownOpen ? (
                      <FiChevronUp className="w-4 h-4" />
                    ) : (
                      <FiChevronDown className="w-4 h-4" />
                    )}
                  </div>
                )}
                {!hasSubItems && isActive && (
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                )}
              </>
            )}
          </button>

          {/* Sub-items for dropdown modules */}
          {hasSubItems && isDropdownOpen && (!sidebarCollapsed || isMobile) && (
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
                          : 'text-green-200 hover:bg-green-600 hover:text-white'
                        }
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
        {!isMobile && (
          <div className="absolute top-4 -right-3 z-30">
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="w-6 h-6 bg-green-700 border-2 border-green-600 rounded-full flex items-center justify-center hover:bg-green-600 transition-all shadow-lg"
            >
              {sidebarCollapsed ? (
                <FiChevronRight className="w-3 h-3 text-white" />
              ) : (
                <FiChevronLeft className="w-3 h-3 text-white" />
              )}
            </button>
          </div>
        )}

        {/* Navigation modules */}
        <nav className="flex-1">
          <ul className="space-y-2">
            {modules.map(renderModuleItem)}
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