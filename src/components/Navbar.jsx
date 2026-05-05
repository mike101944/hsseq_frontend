
import React, { useState } from 'react';
import { IoIosMenu } from "react-icons/io";
import { Link } from 'react-router-dom';

import { IoNotifications,IoNotificationsOutline  } from "react-icons/io5";
import { FaMessage,FaRegMessage } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";

import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { MegaMenu } from 'primereact/megamenu';
import { Ripple } from 'primereact/ripple';
import { Avatar } from 'primereact/avatar';
import { Badge } from 'primereact/badge';



import { LayoutDashboard,GraduationCap,ChevronRight ,LogOut  ,Gift,BookHeart   } from 'lucide-react';


export function Navbar({ setOpen }) {
  const [openDropdown, setOpenDropdown] = useState(null);

  const [isRightSidebarOpen, setRightSidebarOpen] = useState(false);


  const toggleRightSidebar = () => {
    setRightSidebarOpen(!isRightSidebarOpen);
   
  };

  const closeSidebars = () => {
    setRightSidebarOpen(false);
  };

  const toggleDropdown = (dropdown) => {
    setOpenDropdown((prev) => (prev === dropdown ? null : dropdown));
  };

const notificationsData = [
  {
    id:1,
    fullName:'Felecia Rower',
    issuedTime:'11:23 PM',
    status:true
  },
  {
    id:1,
    fullName:'Felecia Rower',
    issuedTime:'11:23 PM',
    status:true
  },
  {
    id:1,
    fullName:'Felecia Rower',
    issuedTime:'11:23 PM',
    status:false
  },
  {
    id:1,
    fullName:'Felecia Rower',
    issuedTime:'11:23 PM',
    status:true
  },
  {
    id:1,
    fullName:'Felecia Rower',
    issuedTime:'11:23 PM',
    status:true
  },
  {
    id:1,
    fullName:'Felecia Rower',
    issuedTime:'11:23 PM',
    status:false
  },
  {
    id:1,
    fullName:'Felecia Rower',
    issuedTime:'11:23 PM',
    status:true
  },
  {
    id:1,
    fullName:'Felecia Rower',
    issuedTime:'11:23 PM',
    status:true
  },
  {
    id:1,
    fullName:'Felecia Rower',
    issuedTime:'11:23 PM',
    status:false
  }
]

const [visible, setVisible] = useState(false);

  return (
    <nav className="flex items-center justify-between py-3 px-6  bg-white shadow-md">
      {/* Menu Icon */}
      <button 
        onClick={() => setOpen(prev => !prev)}
        className="text-blue-400 size-7 cursor-pointer focus:outline-none"
        aria-label="Toggle Menu"
      >
        <IoIosMenu className='flex size-7 text-blue-400 cursor-pointer' />
      </button>
      
      {/* Right Section */}
      <div className="flex items-center space-x-6 w-2/12 justify-between">


      <div className='flex justify-between items-center gap-4'>
        {/* Notifications */}
        <div className="relative">
          <button onClick={() => toggleDropdown('notifications')} className="focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5" />
          </svg>
            <span className="absolute -top-1 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-cyan-500 border text-white text-[10px]">
              6
            </span>
          </button>
          {openDropdown === 'notifications' && (
            <div className="absolute right-0 mt-2 w-[400px] shadow-md rounded-md  bg-white z-50 mb-3">

              <div className='flex flex-row text-white bg-gradient-to-r from-sky-500 to-slate-400 rounded-t-md items-center py-3 justify-between p-4'>
                <span className='cursor-pointer'>Notifications</span>
                <span className='cursor-pointer hover:text-blue-300' >Mark all as read</span>
              </div>


            <div className='bg-white max-h-[350px] flex flex-col pt-2 overflow-y-auto custom-scrollbar'>
              {
                notificationsData.map((items,index)=>(

                  <div className='flex flex-row justify-between items-center mb-1 hover:bg-slate-300 px-2 cursor-pointer'>

                      <div className='flex flex-row gap-1 items-center'>
                            <div className='w-10 h-10 bg-gray-400 rounded-md flex items-center justify-center'>
                            <FaUserCircle className="text-white size-7 cursor-pointer" />
                            </div>
                            <div className='flex flex-col space-y-0'>
                              <span className='text-[12px] font-serif font-bold'>Felecia Rower</span>
                              <span className='text-[12px]'>text message</span>
                            </div>

                        </div>

                      <div className='flex flex-row gap-4 justify-center items-center' >
                        <span className='text-[12px] text-gray-500'>11:20 PM</span>
                       
                            <div className={`p-1 ${items.status ? "bg-blue-400" : "bg-gray-300"} rounded-full`}></div>
  
                          
                      </div>
                </div>
                ))
              }
            </div>

              <div className='px-3 py-3 border-t border-gray-300 '>
                  <div className='py-1 px-2 cursor-pointer rounded-md hover:bg-sky-400 flex justify-center items-center bg-sky-500 text-white font-serif font-medium'>
                    <Link  to="/charts" className='cursor-pointer ' onClick={() => toggleDropdown('notifications')}  >View All</Link>
                  </div>
              </div>


            </div>
          )}
        </div>
        
        {/* Messages */}
        <div className="relative">
          <button onClick={() => toggleDropdown('messages')} className="focus:outline-none">
         
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
          </svg>


            {/* <FaRegMessage className="text-gray-500 size-6 cursor-pointer" /> */}
            <span className="absolute -top-1 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-cyan-500 border text-white text-[10px]">
              14
            </span>
          </button>
          {openDropdown === 'messages' && (
            <div className="absolute right-0 mt-2 w-[400px] shadow-md rounded-md bg-white z-50">
            <div className='flex flex-row text-white bg-gradient-to-r from-slate-500 to-sky-500 rounded-t-md items-center py-3 justify-between p-4'>
              <span className='cursor-pointer'>Messages</span>
              <span className='cursor-pointer hover:text-blue-300' >View All</span>
            </div>

            <div className='bg-white max-h-[350px] flex flex-col pt-2 overflow-y-auto custom-scrollbar'>
              {
                notificationsData.map((items,index)=>(

                  <div className='flex flex-row justify-between items-center mb-3 hover:bg-slate-300 px-2 cursor-pointer'>

                      <div className='flex flex-row gap-1 items-center'>
                            <div className='w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center'>
                            <FaUserCircle className="text-white size-9 cursor-pointer" />
                            </div>
                            <div className='flex flex-col space-y-0'>
                              <span className='text-[12px] font-serif font-bold'>Felecia Rower</span>
                              <span className='text-[12px]'>text message</span>
                            </div>

                        </div>

                      <div className='flex flex-row gap-4 justify-center items-center' >
                        <span className='text-[12px] text-gray-500'>11:20 PM</span>
                       
                            <div className={`p-1 ${items.status ? "bg-blue-400" : "bg-gray-300"} rounded-full`}></div>
  
                          
                      </div>
                </div>
                ))
              }
            </div>
          </div>
          )}
        </div>

        </div>

        {/* User Profile */}
        <div className="relative">

  <button
    // onClick={() => toggleDropdown('profile')}
    // onClick={toggleRightSidebar}
    onClick={() => setVisible(true)}
    className="focus:outline-none"
    aria-label="Toggle Profile Dropdown"
  >
    <FaUserCircle className="text-gray-400 size-7 cursor-pointer hover:text-gray-500 transition-colors" />
  </button>
</div>

      </div>



     {/* Profile Right SideBar */}
     <SideBar visible={visible} setVisible={setVisible} />
      








    </nav>
  );
}





function SideBar({visible,setVisible}) {

  const handleClose=()=>{
    setVisible(false);
  }

  // <Button icon="pi pi-arrow-right" onClick={handleClose} className='bg-white' >Close</Button>
  return (
     
          <Sidebar 
           visible={visible} 
           position="right" 
           onHide={() => setVisible(false)}
           className='w-64 '
            content={({ closeIconRef, hide }) => (
              <div className='flex-col relative lg:static surface-ground  mt-[58px]  ' >
              <div
        className="flex flex-col justify-between min-h-full bg-white w-64 shadow-lg rounded-md transform " >
        <div className='flex flex-col py-2'>
          <div className='flex flex-row gap-3 items-center px-2 border-b py-2 border-b-gray-300 '>
             
              <FaUserCircle className="text-gray-500 size-[50px] cursor-pointer hover:text-gray-500 transition-colors" />
           
              <div className='flex flex-col '>
                <span className='text-xs font-serif font-bold py-1'>BARAKA AMBOKILE</span>
                <div className='flex items-center gap-1'><span className='text-[15px] font-semibold text-sky-500'>Hsseq Manager</span> <div className=' bg-sky-400 px-3 items-center  flex rounded-lg'><small className='text-white font-bold'>New</small></div></div>
                <div><span className='text-xs font-semibold' >Contract Staff</span></div>

              </div>
          </div>
          <ul className='bg-white px-2 py-2'>
            <Link 
              to='/profile'
              onClick={handleClose}
            className='flex flex-row gap-3 items-center px-2 py-[6px] hover:bg-gray-50 cursor-pointer'>
              <div className=' flex p-[6px] h-8 w-8 bg-gray-300 rounded-full justify-center items-center text-blue-500'><LayoutDashboard /></div>
              <span className='font-semibold text-[14px] text-slate-500'>Profile</span>
            </Link>
            <li className='flex flex-row gap-3 items-center px-2 py-[6px] hover:bg-gray-50 cursor-pointer'>
              <div className=' flex p-[6px] h-8 w-8 bg-gray-300 rounded-full justify-center items-center text-pink-400'><GraduationCap  /></div>
              <span className='font-semibold text-[14px] text-slate-500'>Claim your Certificates</span>
            </li>
            <li className='flex flex-row gap-3 items-center px-2 py-[6px] hover:bg-gray-50 cursor-pointer'>
              <div className=' flex p-[6px] h-8 w-8 bg-gray-300 rounded-full justify-center items-center text-slate-500'><BookHeart  /></div>
              <span className='font-semibold text-[14px] text-slate-500'>Recomended Four You</span>
            </li>
            <li className='flex flex-row gap-3 items-center px-2 py-[6px] hover:bg-gray-50 cursor-pointer'>
              <div className=' flex p-[6px] h-8 w-8 bg-gray-300 rounded-full justify-center items-center text-orange-400'><Gift  /></div>
              <span className='font-semibold text-[14px] text-slate-500'>Journey Management Plan</span>
            </li>
          
          
          </ul>
        </div>


        <button  className='flex flex-row justify-between items-center px-4 hover:bg-gray-50 cursor-pointer py-2 my-2 border-y border-y-gray-300'>
        
              <div className='flex gap-3 items-center'>
              <div className=' flex p-[6px]  rounded-full  items-center text-red-700'><LogOut   /></div>
              <span className='font-bold text-[15px] text-slate-500'>Log Out</span>
              </div>
              <div className=' flex p-[6px]   rounded-full justify-center items-center '><ChevronRight   /></div>
           
        </button>
        


        
      </div>

              </div>
            )}
            >
              
          </Sidebar>
        
   
  )
}









export function TemplateDemo() {
  const itemRenderer = (item, options) => {
    if (item.root) {
        return (
            <a className="flex align-items-center cursor-pointer px-3 py-2 overflow-hidden relative font-semibold text-lg uppercase p-ripple hover:surface-ground" style={{ borderRadius: '2rem' }} onClick={(e) => options.onClick(e)}>
                <span className={item.icon} />
                <span className="ml-2">{item.label}</span>
                <Ripple />
            </a>
        );
    } else if (!item.image) {
        return (
            <a className="flex align-items-center p-3 cursor-pointer mb-2 gap-2" onClick={options.onClick}>
                <span className="inline-flex align-items-center justify-content-center border-circle bg-primary w-3rem h-3rem">
                    <i className={`${item.icon} text-lg`}></i>
                </span>
                <span className="inline-flex flex-column gap-1">
                    <span className="font-medium text-lg text-900">{item.label}</span>
                    <span className="white-space-nowrap">{item.subtext}</span>
                </span>
            </a>
        );
    } else {
        return (
            <div className="flex flex-column align-items-start gap-3" onClick={options.onClick}>
                <img alt="megamenu-demo" src={item.image} className="w-full" />
                <span>{item.subtext}</span>
            </div>
        );
    }
};

const items = [
    { 
        label: 'notification', 
        root: true, 
        template: itemRenderer, 
        items: [
            [
                { label: 'About Us', icon: 'pi pi-info-circle' },
                { label: 'Careers', icon: 'pi pi-briefcase' }
            ]
        ]
    },
    { 
        label: 'message', 
        root: true, 
        template: itemRenderer, 
        items: [
            [
                { label: 'Blog', icon: 'pi pi-file' },
                { label: 'Documentation', icon: 'pi pi-book' }
            ]
        ]
    }
];

return (
    <div className="card shadow-3 surface-card p-4" style={{ borderRadius: '1rem' }}>
        <MegaMenu model={items} orientation="horizontal" breakpoint="960px" className="p-3 surface-0 shadow-2" style={{ borderRadius: '3rem' }} />
    </div>
);
}
