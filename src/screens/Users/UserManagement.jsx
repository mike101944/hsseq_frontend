import React, { useEffect, useState } from 'react'
import ReactDOM from "react-dom";
import { Route, Routes, useLocation,Link } from 'react-router-dom'
import { RiDeleteBinLine } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import { FaCircleUser  } from "react-icons/fa6";
import { BiSearchAlt2 } from "react-icons/bi";
import { space } from 'postcss/lib/list';
import { div, span } from 'framer-motion/client';
import { User } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from "../../redux/action/hhhhhhh";
import { ListUsers } from './Componets/ListUsers';



export function UserManagement() {

  const location = useLocation();
  const dispatch = useDispatch();
   // Fetch users on mount
   useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

 

  const { users, status, error } = useSelector((state) => state.user);

  console.log("Users state:", users); // Debugging state of users
  console.log("Loading status:", status); // Debugging loading status
  console.log("Error:", error); // Debugging error message

 // Fetch users on mount

  


  

  return (
    <div className='bg-gray-100 py-4 px-4 flex flex-col  h-full w-full font-serif overflow-y-auto no-scrollbar'>

      <div className='flex flex-row justify-between py-3 bg-blue-400 rounded-lg shadow-2xl '>

        <div className='flex items-center   font-serif text-[17px] text-white gap-2  cursor-pointer  px-2 py-2'>
          <h4>Home</h4>
          <small className='text-[16px] text-blue-100'>{location.pathname}</small>
        </div>

        <ul className=' flex-grow bg-blue-400 flex flex-col justify-end items-end '>

          <div className=' py-1 flex pl-1 self-center'>
            <span className='text-balance text-1xl text-center font-extrabold text-gray-100 '>Administrations</span>
          </div>

          <div className='flex flex-row items-start justify-start text-blue-50 font-extrabold gap-2 text-[14px] pr-2 '>
              <Link to='/users' className='px-3  cursor-pointer hover:rounded-t-lg hover:py-3 hover:bg-gray-100 hover:text-blue-400 hover:translate-y-4 transition-all duration-700 ease-in-out'><span>All users</span></Link>
              <Link to='/users/access' className='px-3  cursor-pointer hover:rounded-t-lg hover:py-3 hover:bg-gray-100 hover:text-blue-400 hover:translate-y-4 transition-all duration-700 ease-in-out'><span>Glant Access</span></Link>
              <Link to='/users/authorities' className='px-3 cursor-pointer hover:rounded-t-lg hover:py-3 hover:bg-gray-100 hover:text-blue-400 hover:translate-y-4 transition-all duration-700 ease-in-out'><span>Glant Authorities</span></Link>
              <Link to='/users/userActivation' className='px-3 cursor-pointer hover:rounded-t-lg hover:py-3 hover:bg-gray-100 hover:text-blue-400 hover:translate-y-4 transition-all duration-700 ease-in-out'><span>Users Activations</span></Link>
              <Link to='/users/manageTrainee' className='px-3 cursor-pointer hover:rounded-t-lg hover:py-3 hover:bg-gray-100 hover:text-blue-400 hover:translate-y-4 transition-all duration-700 ease-in-out'><span>Manage Trainees</span></Link>
          </div>

        </ul>

      </div>

      <Routes>
        <Route index element={<ListUsers users={users}/>}/>
        {/* <Route index element={<SearchComponent/>}/> */}
        <Route path='access' element={<GlantAccess/>}/>
        <Route path='userActivation' element={<UserActivation/>}/>
        <Route path='authorities' element={<Authorities/>}/>
        <Route path='manageTrainee' element={<ManageTrainee/>}/>
      </Routes>
    </div>
  )
}










const Authorities =()=>{
  return(
    <div className='flex justify-center items-center w-full h-full'>
      hello authority
    </div>
  )
}

const GlantAccess =()=>{
  return(
    <div className='flex justify-center items-center w-full h-full'>
      hello GlantAccess
    </div>
  )
}
const UserActivation =()=>{
  return(
    <div className='flex justify-center items-center w-full h-full'>
      hello UaserActivation
    </div>
  )
}

const ManageTrainee =()=>{
  return(
    <div className='flex justify-center items-center w-full h-full'>
      hello ManageTrainee
    </div>
  )
}