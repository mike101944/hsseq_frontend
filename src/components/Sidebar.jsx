import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { SidebarItemData } from "./DummyData";
import LogoImage from "../assets/images/logo-image.webp";

export function Sidebar({ open, setOpen }) {
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const location = useLocation();
  const submenuRefs = useRef({});

  const [activeItem, setActiveItem] = useState(() => {
    return localStorage.getItem("activeItem") || SidebarItemData[0]?.id || null;
  });

  useEffect(() => {
    const matchingItem = SidebarItemData.find((item) => item.link === location.pathname);
    if (matchingItem) {
      setActiveItem(matchingItem.id);
    }
  }, [location]);

  useEffect(() => {
    localStorage.setItem("activeItem", activeItem);
  }, [activeItem]);

  const handleItemClick = (id) => {
    setActiveItem(id);
    if (SidebarItemData.find((item) => item.id === id)?.subItems) {
      setActiveSubmenu(activeSubmenu === id ? null : id);
    }
  };

  return (
    <aside
      className={`h-screen bg-sky-700 ${open ? "w-60" : "w-16"} 
      relative transition-all duration-300 ease-in-out flex flex-col top-0 left-0 shadow-lg`}
    >
      {/* Logo Section */}
      <div className={`flex items-center justify-between py-3 ${open ? "px-3" : "px-2"} bg-sky-700`}>
        <img src={LogoImage} alt="hsseq-logo" className="w-10 h-10" />
        {open && (
          <h3 className="text-white text-xl font-semibold ml-2 transition-all duration-300">
            HSEQ SYSTEM
          </h3>
        )}
      </div>

      {/* Menu Items */}
      <ul className="flex flex-col space-y-2 py-2 pl-2 flex-grow overflow-y-auto no-scrollbar">
        {SidebarItemData.map((item) => {
          const isActive = activeItem === item.id;
          const isSubmenuOpen = activeSubmenu === item.id;

          if (!submenuRefs.current[item.id]) {
            submenuRefs.current[item.id] = React.createRef();
          }

          useEffect(() => {
            if (submenuRefs.current[item.id]?.current) {
              const submenu = submenuRefs.current[item.id].current;
              submenu.style.height = isSubmenuOpen ? `${submenu.scrollHeight}px` : "0px";
            }
          }, [isSubmenuOpen]);

          return (
            <div key={item.id} className="flex flex-col">
              {/* Main Menu Item */}
              <div
                className={`flex items-center rounded-l-md cursor-pointer transition-all duration-300 ${
                  isActive ? "bg-gray-200" : "hover:bg-blue-300"
                }`}
                onClick={() => handleItemClick(item.id)}
              >
                <Link
                  to={item.link}
                  className={`flex items-center gap-3 py-3 ${open ? "pl-3" : "pl-2"} w-full `}
                >
                  <span className={`text-xl ${isActive ? "text-gray-500" : "text-blue-200"}`}>
                    {item.icon}
                  </span>
                  {open && (
                    <>
                      <span className={`text-sm font-semibold ${isActive ? "text-gray-400" : "text-blue-200"}`}>
                        {item.itemName}
                      </span>
                      {item.subItems && (
                        <span className="ml-auto transition-transform duration-300">
                          {item.chevIcon}
                        </span>
                      )}
                    </>
                  )}
                </Link>
              </div>

              {/* Submenu */}
              {item.subItems && (
                <ul
                  ref={submenuRefs.current[item.id]}
                  className={`pl-6 overflow-hidden transition-all duration-300 ease-in-out ${
                    !open && "hidden"
                  }`}
                  style={{
                    height: "0px",
                  }}
                >
                  {item.subItems.map((subItem, index) => (
                    <li
                      key={index}
                      className="text-sm cursor-pointer rounded-l-md transition-all duration-300 "
                       
                     
                    >
                      <Link to={subItem.link} className={`block px-3 py-2 ${isActive ? "bg-sky-700" : "hover:bg-blue-300"} hover:bg-blue-300 text-blue-100 hover:text-white`}>
                        {subItem.itemName}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </ul>
    </aside>
  );
}