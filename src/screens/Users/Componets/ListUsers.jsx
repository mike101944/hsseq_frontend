import React, { useState } from "react";
import ReactDOM from "react-dom";
import { AddUserModal } from "./AddUserModal";
import { BiSearchAlt2 } from "react-icons/bi";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaCircleUser  } from "react-icons/fa6";
import { div, span } from 'framer-motion/client';
import { User } from 'lucide-react';
import { deleteUser } from "../../../redux/action/hhhhhhh";
import { UpdateUserModal } from "./UpdateUserModal";
import { DeleteUserModal } from "./DeleteUser";
import { useDispatch, useSelector } from 'react-redux';

export const ListUsers =({users})=>{


  // Step 2: Set up state for search query and filtered results
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const dispatch = useDispatch();



  const handleDelete = (userId) => {
   
    console.log("Users delete ids :", userId);
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(userId));
    }
  };
  // Open the edit modal
  const handleEdit = (user) => {
    setSelectedUser(user);
    setEditModalOpen(true);
  };
  
 
   const [modalOpen, setModalOpen] = useState(false);
  
    const handleModalOpen = () => {
      setModalOpen((curl) => !curl);
    };


    if (!users || users.length === 0) {
      return (
        <div className="flex flex-col bg-gray-100 flex-grow mt-9 font-serif justify-center items-center">
          <h4 className="text-gray-400 text-[15px]">No users available</h4>
        </div>
      );
    }
  

  return(
    <div className='flex flex-col bg-gray-100 flex-grow mt-9 font-serif'>

    <div className='flex flex-row justify-between items-center bg-gray-100 py-7'>
            <h4 className='text-gray-400 text-[15px]'>List of Users Avalaible</h4>
            <div className='flex flex-row p-1 justify-center items-center relative '>
              <input 
              type='text' 
             
              placeholder='search user ......' className='w-full bg-gray-50 rounded-md border-none outline-none 
             px-4 py-1 pr-12 transition-all duration-700 ease-in-out focus:ring-1 focus:ring-blue-400 focus:ring-opacity-100 focus:border-blue-400'/>
                <span className='absolute translate-x-24 text-gray-500'><BiSearchAlt2 size={17}/></span>
            </div>
            <div className='flex flex-row items-center gap-3'>
              <button 
              onClick={handleModalOpen}
              className='py-2 px-7 rounded-lg bg-blue-300 text-white font-extrabold'>add User</button>
            
            {
              modalOpen && ReactDOM.createPortal(
                <AddUserModal setModalOpen={setModalOpen}/>,
                document.body
              )
            }
              <button className='py-2 px-7 rounded-lg bg-blue-300 text-white font-extrabold'>export</button>
              </div>
    </div>



          <div className='bg-gray-100 h-full '>

                     <table className="  w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden font-sans">
                              <thead className=" bg-blue-400 text-white text-sm">
                                <tr className=''>
                                  <th className="px-4 py-3 text-left">First Name</th>
                                  <th className="px-4 py-3 text-left">Last Name</th>
                                  <th className="px-4 py-3 text-left">E-mail</th>
                                  <th className="px-4 py-3 text-left">position</th>
                                  <th className="px-4 py-3 text-left">Status</th>
                                  <th className="px-4 py-3 text-left">Action</th>
                                  <th className="px-4 py-3 text-left">None</th>
                                
                                </tr>
                              </thead>
                              <tbody className=' '>

                              {
            
                                 

                                  users.map((user)=>(


                                  <tr

                                    key={user.userId}
                                    className=" w-full cursor-pointer border-b text-sm font-normal transition duration-700 ease-in-out hover:bg-blue-50"
                                  >
                                    <td className="px-4 py-2">{user.firstName}</td>
                                    <td className="px-4 py-2">{user.lastName}</td>
                                    <td className="px-4 py-2">{user.email}</td>
                                    <td className="px-4 py-2">{user.role}</td>
                                    <td className="px-4 py-2">
                                      <span
                                        className={` px-2 text-sm font-semibold rounded-md 
                                               ${
                                                 {
                                                   active: "bg-green-200 text-green-700",
                                                   inactive: "bg-red-200 text-red-700",
                                                   pending: "bg-yellow-200 text-yellow-700",
                                                 }[user.name] || "bg-gray-200 text-gray-700"
                                               }
                                          `}
                                      >
                                      user status
                                      </span>
                                    </td>
                                    <td className="px-4 py-2 flex flex-row items-center gap-7 ">
                                      <button
                                        onClick={() => handleEdit(user)}
                                       className=" px-1 py-1 text-[18px] text-gray-500 hover:bg-blue-400 hover:text-white">
                                        <CiEdit />
                                      </button>
                                      <button 
                                      onClick={() => handleDelete(user.userId)}
                                      className="px-1 py-1 text-[18px] text-gray-400 hover:bg-blue-400 hover:text-white">
                                        <RiDeleteBinLine />
                                      </button>
                                    </td>
                                    <td className="px-4 py-2 ">
                                      <button className="px-2 py-1 text-[16px] text-gray-400 hover:bg-blue-400 hover:text-white">
                                        user file
                                      </button>
                                    </td>
                              </tr>
                  )
                )

             
            }

        </tbody>
      </table>

       {/* Update Modal */}
       {editModalOpen &&
        ReactDOM.createPortal(
          <UpdateUserModal
            user={selectedUser}
            setEditModalOpen={setEditModalOpen}
          />,
          document.body
        )}


        {/* Delete Modal */}
       {/* {deleteModalOpen &&
        ReactDOM.createPortal(
          <DeleteUserModal
            user={selectedUser}
            setDeleteModalOpen={setDeleteModalOpen}
          />,
          document.body
        )} */}
      </div>
</div>
  )
}
