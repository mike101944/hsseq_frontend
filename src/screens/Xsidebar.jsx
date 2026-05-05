import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronDown, FaBars } from "react-icons/fa";
import { MdDashboard, MdNotifications, MdSettings, MdLogout } from "react-icons/md";
import { IoMdBookmarks, IoMdHelpCircle } from "react-icons/io";
import { IoExtensionPuzzleOutline } from "react-icons/io5";
import { RiFileList3Line } from "react-icons/ri";

export function XSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);
  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  return (
    <>
      {/* Mobile Sidebar Toggle */}
      <button onClick={toggleSidebar} className="fixed top-4 left-4 md:hidden p-2 bg-blue-900 text-white rounded-md">
        <FaBars size={20} />
      </button>

      {/* Sidebar */}
      <aside
        className={`h-screen bg-blue-900 text-white fixed top-0 left-0 transition-all ease-in-out duration-300 ${
          isCollapsed ? "w-20" : "w-64"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4">
          <h1 className={`text-lg font-semibold transition-all ${isCollapsed ? "hidden" : "block"}`}>HSSEQ SYSTEM</h1>
          <button onClick={toggleSidebar} className="p-1 bg-white text-blue-900 rounded-full">
            {/* Hide chevron left when collapsed */}
            {isCollapsed ? (
              <FaChevronLeft size={20} className="rotate-180" />
            ) : (
              <FaChevronLeft size={20} className="rotate-0" />
            )}
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="mt-4">
          <ul className="space-y-2">
            {/* Dashboard */}
            <li>
              <Link to="/" className="flex items-center px-4 py-2 hover:bg-blue-800">
                <MdDashboard size={20} />
                {!isCollapsed && <span className="ml-3">Dashboard</span>}
              </Link>
            </li>

            {/* Dropdown Menu - Services */}
            <li className="relative">
              <button
                onClick={() => toggleDropdown("services")}
                className="w-full flex items-center px-4 py-2 hover:bg-blue-800"
              >
                <RiFileList3Line size={20} />
                {!isCollapsed && <span className="ml-3 flex-grow">Services</span>}
                {!isCollapsed && (
                  <FaChevronDown size={16} className={`transition-transform ${openDropdown === "services" ? "rotate-180" : ""}`} />
                )}
              </button>

              {/* Dropdown - Inside sidebar when expanded, outside when collapsed */}
              <ul
                className={`bg-white text-black rounded-md shadow-md transition-all duration-300 ease-in-out
                    ${isCollapsed ? "absolute left-full top-0 ml-2 w-48" : "relative w-full"}
                    ${openDropdown === "services" ? "max-h-[300px] overflow-y-auto opacity-100" : "max-h-0 overflow-hidden opacity-0"}
                `}
                style={{ minWidth: "12rem", zIndex: isCollapsed ? 1000 : "auto" }}
              >
                <li className="pl-4 py-2 hover:bg-blue-200">
                  <Link to="/services/it">IT Consulting</Link>
                </li>
                <li className="pl-4 py-2 hover:bg-blue-200">
                  <Link to="/services/cloud">Cloud Solutions</Link>
                </li>
                <li className="pl-4 py-2 hover:bg-blue-200">
                  <Link to="/services/mobile">Mobile Apps</Link>
                </li>
              </ul>
            </li>

            {/* Notifications */}
            <li>
              <Link to="/notifications" className="flex items-center px-4 py-2 hover:bg-blue-800">
                <MdNotifications size={20} />
                {!isCollapsed && <span className="ml-3">Notifications</span>}
              </Link>
            </li>

            {/* Bookmarks */}
            <li className="relative">
              <button
                onClick={() => toggleDropdown("bookmarks")}
                className="w-full flex items-center px-4 py-2 hover:bg-blue-800"
              >
                <IoMdBookmarks size={20} />
                {!isCollapsed && <span className="ml-3 flex-grow">Bookmarks</span>}
                {!isCollapsed && (
                  <FaChevronDown size={16} className={`transition-transform ${openDropdown === "bookmarks" ? "rotate-180" : ""}`} />
                )}
              </button>

              <ul
                className={`bg-white text-black rounded-md shadow-md transition-all duration-300 ease-in-out
                    ${isCollapsed ? "absolute left-full top-0 ml-2 w-48" : "relative w-full"}
                    ${openDropdown === "bookmarks" ? "max-h-[300px] overflow-y-auto opacity-100" : "max-h-0 overflow-hidden opacity-0"}
                `}
                style={{ minWidth: "12rem", zIndex: isCollapsed ? 1000 : "auto" }}
              >
                <li className="pl-4 py-2 hover:bg-blue-200">
                  <Link to="/bookmarks/tutorials">Saved Tutorials</Link>
                </li>
                <li className="pl-4 py-2 hover:bg-blue-200">
                  <Link to="/bookmarks/blogs">Favorite Blogs</Link>
                </li>
              </ul>
            </li>

            {/* Extensions */}
            <li>
              <Link to="/extensions" className="flex items-center px-4 py-2 hover:bg-blue-800">
                <IoExtensionPuzzleOutline size={20} />
                {!isCollapsed && <span className="ml-3">Extensions</span>}
              </Link>
            </li>

            {/* Settings */}
            <li>
              <Link to="/settings" className="flex items-center px-4 py-2 hover:bg-blue-800">
                <MdSettings size={20} />
                {!isCollapsed && <span className="ml-3">Settings</span>}
              </Link>
            </li>

            {/* Support */}
            <li>
              <Link to="/support" className="flex items-center px-4 py-2 hover:bg-blue-800">
                <IoMdHelpCircle size={20} />
                {!isCollapsed && <span className="ml-3">Support</span>}
              </Link>
            </li>

            {/* Logout */}
            <li>
              <Link to="/logout" className="flex items-center px-4 py-2 hover:bg-blue-800">
                <MdLogout size={20} />
                {!isCollapsed && <span className="ml-3">Logout</span>}
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
}
