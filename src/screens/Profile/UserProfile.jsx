import React from 'react'
import { FaUserCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { LayoutDashboard,GraduationCap,ChevronRight ,LogOut  ,Gift,BookHeart   } from 'lucide-react';

import { ProfileTabs } from './Componet/ProfileTabs';
export default function UserProfile() {
  return (
    <div className='flex flex-grow'>
        {/* sidebar start */}
        <div className='flex flex-col bg-gray-100 justify-between'>
        <div className='flex flex-col py-2'>
          <div className='flex flex-row gap-3 items-center px-2 border-b py-2 border-b-gray-300 '>
             
              <FaUserCircle className="text-gray-500 size-[50px] cursor-pointer hover:text-gray-500 transition-colors" />
           
              <div className='flex flex-col '>
                <span className='text-xs font-serif font-bold py-1'>BARAKA AMBOKILE</span>
                <div className='flex items-center gap-1'><span className='text-[15px] font-semibold text-sky-500'>Hsseq Manager</span> <div className=' bg-sky-400 px-1 items-center  flex rounded-lg'><small className='text-white font-bold'>New</small></div></div>
                <div><span className='text-xs font-semibold' >Contract Staff</span></div>

              </div>
          </div>
          <ul className=' px-2 py-2'>
            <Link 
              to='/profile'
             
            className='flex flex-row gap-3 items-center px-2 py-[6px] hover:bg-gray-50 cursor-pointer'>
              <div className=' flex p-[6px] h-8 w-8 bg-gray-300 rounded-full justify-center items-center text-blue-500'><LayoutDashboard /></div>
              <span className='font-semibold text-[14px] text-slate-500'>Your Dashboard</span>
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
              <span className='font-semibold text-[14px] text-slate-500'>Jornal Management Plan</span>
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
        {/* sidebar end */}
        <div className='w-3/4'>
            <div className='px-4 py-2 justify-evenly items-center bg-gradient-to-r from-gray-100 to-gray-200'><h4 className='text-sky-500 font-semibold'>Welcome this is Baraka's Dashboard</h4></div>
            <div className=' bg-white h-full rounded-t-md'>
                <ProfileTabs />
            </div>
        </div>


    </div>
  )
}
