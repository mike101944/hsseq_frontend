import React, { forwardRef, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FiX, FiHome, FiAlertTriangle, FiClipboard, FiBook, FiShield,
  FiMonitor, FiCheckSquare, FiActivity, FiBarChart2,
  FiChevronDown, FiChevronUp
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
  const [hoverTimeout, setHoverTimeout] = useState(null);

  const modules = [
    { id: 'dashboard', name: 'Dashboard', icon: FiHome, path: '/dashboard', type: 'single' },
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
    // { id: 'compliance1', name: 'Compliance Management', icon: FiShield, path: '/compliance', type: 'single' },
    // { id: 'compliance2', name: 'Compliance Management', icon: FiShield, path: '/compliance', type: 'single' },
    {
      id: 'monitoring', name: 'Monitoring Management', icon: FiMonitor, type: 'dropdown',
      subItems: [
        { id: 'monitoring-dashboard', name: 'Monitoring Dashboard', path: '/monitoring/dashboard' },
        { id: 'monitoring-alerts', name: 'Alerts & Notifications', path: '/monitoring/alerts' },
        { id: 'monitoring-reports', name: 'Monitoring Reports', path: '/monitoring/reports' }
      ]
    },
    { id: 'inspections', name: 'Inspections Management', icon: FiCheckSquare, path: '/inspections', type: 'single' },
    { id: 'jmp', name: 'Journey Management', icon: FiActivity, path: '/jmp', type: 'single' },
    { id: 'reports', name: 'Report Management', icon: FiBarChart2, path: '/reports', type: 'single' }
  ];

  // ===============================
  // Responsive Layout Handling
  // ===============================
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const mobile = width < 768;
      const tablet = width >= 768 && width < 1024;
      setIsMobile(mobile);
      setIsTablet(tablet);

      if (tablet) setSidebarCollapsed(true);
      else if (width >= 1024) setSidebarCollapsed(false);

      if (!mobile) setSidebarOpen(false);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setSidebarCollapsed, setSidebarOpen]);

  useEffect(() => {
    if (sidebarCollapsed && !isMobile) setOpenDropdowns({});
  }, [sidebarCollapsed, isMobile]);

  const toggleDropdown = (moduleId) => {
    if (sidebarCollapsed && !isMobile) return;
    setOpenDropdowns(prev => ({ ...prev, [moduleId]: !prev[moduleId] }));
  };

  const handleNavigation = (path) => {
    navigate(path);
    setHoveredModule(null);
    if (isMobile) setSidebarOpen(false);
  };

  const handleCollapsedModuleClick = (module) => {
    if (module.type === 'single') handleNavigation(module.path);
    else if (module.subItems?.length) handleNavigation(module.subItems[0].path);
  };

  const isActivePath = (path) =>
    location.pathname === path ||
    (path !== "/" && location.pathname.startsWith(path));

  // ===============================
  // Tooltip Hover Logic
  // ===============================
  const handleMouseEnter = (id) => {
    if (hoverTimeout) clearTimeout(hoverTimeout);
    setHoveredModule(id);
  };

  const handleMouseLeave = (id) => {
    const timeout = setTimeout(() => {
      setHoveredModule((current) => (current === id ? null : current));
    }, 300);
    setHoverTimeout(timeout);
  };

  // ===============================
  // Sidebar Classes
  // ===============================
  const getSidebarClasses = () => {
    const base = `
      h-full bg-white border-r border-gray-200 flex flex-col py-4 transition-all duration-700 ease-in-out
    `;
    if (isMobile)
      return `${base} fixed top-0 left-0 w-64 z-50 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`;
    if (sidebarCollapsed) return `${base} w-20 overflow-visible`;
    return `${base} w-64 overflow-y-auto`;
  };

  // ===============================
  // Render Module Item
  // ===============================
  const renderModuleItem = (module) => {
    const Icon = module.icon;
    const isActive = isActivePath(module.path);
    const isDropdownOpen = openDropdowns[module.id];
    const hasSubItems = module.subItems && module.subItems.length > 0;

    // COLLAPSED VIEW
    if (sidebarCollapsed && !isMobile) {
      return (
        <li key={module.id} className="relative">
          <div
            onMouseEnter={() => handleMouseEnter(module.id)}
            onMouseLeave={() => handleMouseLeave(module.id)}
          >
            <button
              onClick={() => handleCollapsedModuleClick(module)}
              className={`flex items-center justify-center w-full py-3 transition-all duration-200 mx-2 cursor-pointer
                ${isActive ? "bg-gray-50 text-green-700 shadow-sm" : "text-gray-600 hover:bg-gray-50 hover:text-green-600"}`}
            >
              <Icon className="w-5 h-5" />
            </button>


            {/* Tooltip */}
            <div
              className={`absolute left-full top-1/2 -translate-y-1/2 ml-3 z-[9999] transition-all duration-300 ease-in-out transform ${
                hoveredModule === module.id
                  ? "opacity-100 scale-100 translate-x-0"
                  : "opacity-0 scale-95 -translate-x-3 pointer-events-none"
              }`}
              onMouseEnter={() => handleMouseEnter(module.id)}
              onMouseLeave={() => handleMouseLeave(module.id)}
            >
              <div className="bg-gray-900/95 backdrop-blur-md text-white rounded-lg shadow-2xl border border-gray-700 min-w-48 py-2">
                <div
                  className="px-3 py-2 border-b border-gray-700 hover:bg-gray-800 cursor-pointer flex items-center gap-2"
                  onClick={() => handleCollapsedModuleClick(module)}
                >
                  <Icon className="w-4 h-4 text-green-400" />
                  <span className="font-medium text-sm">{module.name}</span>
                </div>
                {hasSubItems && (
                  <div className="py-1">
                    {module.subItems.map((sub) => {
                      const active = isActivePath(sub.path);
                      return (
                        <div
                          key={sub.id}
                          onClick={() => handleNavigation(sub.path)}
                          className={`px-3 py-2 text-sm cursor-pointer flex items-center gap-2 transition-all duration-200 ${
                            active
                              ? "bg-green-600 text-white"
                              : "text-gray-300 hover:bg-gray-800 hover:text-white"
                          }`}
                        >
                          <div className={`w-1 h-1 rounded-full ${active ? "bg-white" : "bg-gray-400"}`} />
                          <span>{sub.name}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </li>
      );
    }

    // EXPANDED VIEW
    return (
      <li key={module.id}>
        <div className="space-y-1">
          <button
            onClick={() => (hasSubItems ? toggleDropdown(module.id) : handleNavigation(module.path))}
            className={`w-full flex items-center gap-3 px-4 py-3 cursor-pointer transition-all duration-300 my-1  ${
              isActive
                ? "bg-green-50/70 text-green-700 border-r-2 border-green-500"
                : "text-gray-700 hover:bg-gray-50 hover:text-green-600"
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="font-medium text-sm flex-1 text-left">{module.name}</span>
            {hasSubItems && (
              <div className={`transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`}>
                {isDropdownOpen ? <FiChevronUp /> : <FiChevronDown />}
              </div>
            )}
          </button>

          {/* Animated Dropdown */}
          <div
            className={`transition-all duration-500 ease-in-out overflow-hidden ${
              isDropdownOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            {hasSubItems && (
              <ul className="ml-9 border-l border-gray-200 space-y-1 mt-1">
                {module.subItems.map((sub) => {
                  const active = isActivePath(sub.path);
                  return (
                    <li key={sub.id}>
                      <button
                        onClick={() => handleNavigation(sub.path)}
                        className={`w-full flex items-center px-4 py-2 cursor-pointer transition-all duration-300 text-sm  ${
                          active
                            ? "bg-green-50 text-green-700 border-r-2 border-dotted border-green-700"
                            : "text-gray-600 hover:bg-gray-50 hover:text-green-600"
                        }`}
                      >
                        <span>{sub.name}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </li>
    );
  };

  return (
    <>
      {sidebarOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div ref={ref} className={getSidebarClasses()}>
        {isMobile && (
          <div className="flex justify-end mb-4">
            <button className="p-1 rounded-md hover:bg-gray-100" onClick={() => setSidebarOpen(false)}>
              <FiX className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        )}

        {/* LOGO */}
        <div className={`flex items-center gap-3 mb-8 px-4 ${sidebarCollapsed && !isMobile ? "justify-center" : ""}`}>
          <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">H</span>
          </div>
          {(!sidebarCollapsed || isMobile) && (
            <div>
              <h1 className="text-xl font-bold text-gray-800">HSSEQ System</h1>
              <p className="text-gray-500 text-xs">Safety First</p>
            </div>
          )}
        </div>

        <nav className={`flex-1 ${!sidebarCollapsed || isMobile ? "overflow-y-auto" : ""}`} 
        style={{
          scrollbarWidth:"none"
        }}
        >
          <ul className="space-y-2">{modules.map(renderModuleItem)}</ul>
        </nav>

        {/* Footer User */}
        <div className="mt-auto pt-4 border-t border-gray-200">
          {sidebarCollapsed && !isMobile ? (
            <div className="flex justify-center items-center py-3">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-white">AD</span>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3 px-4 py-3 text-gray-700">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-white">AD</span>
              </div>
              <div>
                <p className="text-sm font-medium">Admin User</p>
                <p className="text-xs text-gray-500">admin@hsseq.com</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
});
