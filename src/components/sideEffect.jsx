import React, { useState, useRef, useEffect } from "react";
import { Link,useLocation  } from "react-router-dom";
import { SidebarItemData } from "./DummyData";
import LogoImage from "../assets/images/logo-image.webp";


import { MdDashboard} from "react-icons/md";
import { TbReport } from "react-icons/tb";
import { GrCompliance } from "react-icons/gr";
import { FaUsers } from "react-icons/fa";
import { VscChecklist } from "react-icons/vsc";
import { SiSimpleanalytics } from "react-icons/si";
import { IoSchoolSharp,IoChevronForward } from "react-icons/io5";
import { BiSolidHelpCircle } from "react-icons/bi";

export function Sidebar({ open, setOpen }) {
  const [activeSubmenu, setActiveSubmenu] = useState(null);

  const location = useLocation(); // Get current URL
  const submenuRefs = useRef({}); // Store all submenu refs


  const [activeItem, setActiveItem] = useState(() => {
    return localStorage.getItem("activeItem") || SidebarItemData[0]?.id || null;
  });

  useEffect(() => {
    // Find the menu item that matches the current URL
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
      className={`h-screen bg-blue-400 ${open ? "w-[210px]" : "w-[65px]"} 
      relative transition-all duration-700 ease-in-out flex flex-col top-0 left-0`}
    >
      <div
        className={`inline-flex justify-between py-6 h-20 p-5 w-full items-center ${
          open ? "bg-white" : "bg-white-400" 
        }`}
      >
        <img src={LogoImage} alt="hsseq-logo" className="w-10 h-10" />
        <h3
          className={`text-blue-300 text-1xl font-semibold transition-all duration-700 ${
            !open && "scale-0"
          }`}
        >
          HSEQ SYSTEM
        </h3>
      </div>

      <ul
        className={`flex flex-col space-y-1 pl-1 py-3 ${
          open ? "bg-white " : "bg-blue-400 text-gray-700"
        } flex-grow left-0 overflow-y-auto no-scrollbar`}
      >
        <Link
          className={`flex flex-row text-sm items-center px-3 py-3 font-semibold ${
            open ? " hover:bg-gray-100 hover:text-blue-400 text-gray-400 " : "bg-blue-400 text-white hover:bg-blue-200"
          }  rounded-l-lg`}
        >
          <MdDashboard size={20} />
          {open && <span className="ml-2">Dashboard</span>}
        </Link>
        <Link
          className={`flex flex-row text-[15] font-semibold items-center px-3 py-3 ${
            open ? " hover:bg-gray-100 hover:text-blue-400 text-gray-400 " : "bg-blue-400 text-white hover:bg-blue-200"
          }  rounded-l-lg`}
        >
          <TbReport size={20} />
          {open && <span className="ml-2">Report Incidents</span>}
        </Link>
        <Link
          className={`flex flex-row text-[14px] font-semibold items-center pl-3 py-3 ${
            open ? " hover:bg-gray-100 hover:text-blue-400 text-gray-400 " : "bg-blue-400 text-white hover:bg-blue-200"
          } rounded-l-lg`}
        >
          <GrCompliance size={20} />
          {open && <span className="ml-2">Compliance Management</span>}
        </Link>
        <Link
          className={`flex relative  font-semibold text-[15] flex-row items-center px-3 py-3 ${
            open ? " hover:bg-gray-100 hover:text-blue-400 text-gray-400 " : "bg-blue-400 text-white hover:bg-blue-200"
          } rounded-l-lg`}
        >
          <FaUsers size={20} />
          {open && <span className="ml-2">User Management</span>}
        </Link>
        <Link
          className={`flex flex-row  font-semibold text-[15] items-center px-3 py-3 ${
            open ? " hover:bg-gray-100 hover:text-blue-400 text-gray-400 " : "bg-blue-400 text-white hover:bg-blue-200"
          } rounded-l-lg`}
        >
          <VscChecklist size={20} />
          {open && <span className="ml-2">Inspection Checklist</span>}
        </Link>
        <Link
          className={`flex flex-row  font-semibold text-[15] items-center px-3 py-3 ${
            open ? " hover:bg-gray-100 hover:text-blue-400 text-gray-400 " : "bg-blue-400 text-white hover:bg-blue-200"
          }  rounded-l-lg`}
        >
          <SiSimpleanalytics size={18} />
          {open && <span className="ml-2">Analytics & Report</span>}
        </Link>
        <Link
          className={`flex flex-row  font-semibold text-[15] items-center px-3 py-3 ${
            open ? " hover:bg-gray-100 hover:text-blue-400 text-gray-400 " : "bg-blue-400 text-white hover:bg-blue-200"
          }  rounded-l-lg`}
        >
          <IoSchoolSharp size={20} />
          {open && <span className="ml-2">Training Portal</span>}
        </Link>
        <Link
          className={`flex flex-row  font-semibold text-[15] items-center px-3 py-3 ${
            open ? "hover:bg-gray-100 hover:text-blue-400 text-gray-400  " : "bg-blue-400 text-white hover:bg-blue-200"
          } rounded-l-lg`}
        >
          <BiSolidHelpCircle size={20} />
          {open && <span className="ml-2">Help & Support</span>}
        </Link>
      </ul>
    </aside>
  );
}






// {SidebarItemData.map((item) => {
//   const isActive = activeItem === item.id;
//   const isSubmenuOpen = activeSubmenu === item.id;

//   if (!submenuRefs.current[item.id]) {
//     submenuRefs.current[item.id] = React.createRef();
//   }

//   useEffect(() => {
//     if (submenuRefs.current[item.id]?.current) {
//       const submenu = submenuRefs.current[item.id].current;
//       submenu.style.height = isSubmenuOpen ? `${submenu.scrollHeight}px` : "0px";
//     }
//   }, [isSubmenuOpen]);


// return (
//   <div key={item.id} className="flex flex-col">
//     {/* Main Menu Item */}
//     <div
//       className='flex font-semibold rounded-md cursor-pointer transition-all duration-500'
//       onClick={() => handleItemClick(item.id)}
//     >
//       <Link to={item.link} className={`flex items-center justify-start space-x-2 py-2 pl-3 w-full rounded-bl-md rounded-tl-md ${isActive ? "bg-gray-100 text-blue-400 w-full" : "hover:bg-gray-100"}`}>
//         <span className={`${!open ? "text-white text-2xl" : "text-1xl text-gray-500"}`}>
//           {item.icon}
//         </span>
//         <span className={`text-[11px] font-extrabold font-serif transition-all duration-700 ease-in-out ${!open ? "opacity-0 hidden w-0" : "opacity-100 w-auto"}`}>
//           {item.itemName}
//         </span>
//         <span>{item.chevIcon}</span>
//       </Link>
//     </div>

//     {/* Submenu with Smooth Transition */}
//     {item.subItems && (
//       <ul
//         ref={submenuRefs.current[item.id]}
//         className="pl-8 mt-2 overflow-hidden transition-all duration-700 ease-in-out"
//         style={{
//           height: "0px",
//           opacity: isSubmenuOpen ? 1 : 0,
//         }}
//       >
//         {item.subItems.map((subItem, index) => (
//           <li
//             key={index}
//             className="py-2 text-sm cursor-pointer bg-white opacity-100 transition-opacity duration-700 ease-in-out transform hover:bg-blue-200"
//           >
//             <Link to={subItem.link} className="hover:text-white">
//               {subItem.itemName}
//             </Link>
//           </li>
//         ))}
//       </ul>
//     )}
//   </div>
// );

// })}













































// import React, { useState } from "react";
// import { FaArrowLeft } from "react-icons/fa";
// import { IoIosMenu } from "react-icons/io";
// import { motion } from "framer-motion";

// export function Sidebar() {
//   const [open, setOpen] = useState(false);

//   return (
//     <motion.aside
//       initial={{ width: "5rem" }}
//       animate={{ width: open ? "18rem" : "5rem" }}
//       transition={{ duration: 0.8, ease: "easeInOut" }}
//       className="h-screen bg-blue-800 p-5 pt-8 relative"
//     >
//       <motion.div
//         animate={{ rotate: open ? 180 : 0 }}
//         transition={{ duration: 0.8 }}
//       >
//         <IoIosMenu
//           className="bg-white rounded-full border border-gray-800 text-3xl top-9 -right-3 absolute cursor-pointer"
//           onClick={() => setOpen(!open)}
//         />
//       </motion.div>

//       <motion.div
//         animate={{ rotate: open ? 360 : 0 }}
//         transition={{ duration: 0.8 }}
//       >
//         <IoIosMenu
//           className="bg-white rounded-full border border-gray-800 text-3xl top-9 -right-3 absolute cursor-pointer"
//           onClick={() => setOpen(!open)}
//         />
//       </motion.div>

//     </motion.aside>
//   );
// }
