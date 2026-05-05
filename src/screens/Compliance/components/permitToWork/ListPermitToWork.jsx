import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { RiDeleteBinLine } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";



export function ListPermitToWork({filteredData}) {


    useEffect(()=>{
        filteredData
        console.log(" data recieved list of request permit ",filteredData)
    },[])
  
 
  return (
     
        <motion.div
          key="documentList"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >

         
    {filteredData.length > 0 ? (

          
                    
filteredData.map((request, index) => (

    <div key={request.id} className="bg-blue-400  shadow-xl flex flex-col relative rounded-lg max-w-[1000px] mt-6 ">
    <div className="relative bg-white w-full  py-1 flex flex-row justify-between px-3 rounded-lg rounded-b-2xl overflow-hidden">
      <div className="absolute font-serif font-extrabold text-sm text-white bg-blue-300 px-4 transform rotate-[-150deg] top-[0px] right-[-25px]">
        HSSEQ
      </div>

      <div className="grid grid-cols-1 gap-2">
        <div className="flex items-center">
          <span className="font-semibold text-blue-400">
            Authorized Personnel :{" "}
          </span>
          <span className=" px-3 py-1 text-sm font-medium text-gray-400">
          {request.AuthorizedPersonnel}
          </span>
        </div>

        <div className="flex items-center">
          <span className="font-semibold text-blue-400">
            Start Date:
          </span>
          <span className=" px-3 py-1 text-sm font-medium text-gray-400">
            {request.StartDate}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center">
          <span className="font-semibold text-blue-400">
            {" "}
            Work Position :
          </span>
          <span className=" px-3 py-1 text-sm font-medium text-gray-400">
            {request.WorkPosition}
          </span>
        </div>

        <div className="flex items-center">
          <span className="font-semibold text-blue-400">
            Granted by :
          </span>
          <span className=" px-3 py-1 text-sm font-medium text-gray-400">
         
            {request.GrantedBy === null || request.GrantedBy === "" ? (
                 <div className="flex gap-1 items-center">
                    <span>Waiting.....</span> 
                    {/* <input type="checkbox"  /> */}
                 </div>
                 ) :( <span>{request.GrantedBy}</span> ) }
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center">
          <span className="font-semibold text-blue-400">
            Worksite :
          </span>
          <span className=" px-3 py-1 text-sm font-medium text-gray-400">
            {request.Worksite}
          </span>
        </div>

        <div className="flex items-center">
          <span className="font-semibold text-blue-400">
            End Date :
          </span>
          <span className=" px-3 py-1 text-sm font-medium text-gray-400">
            {request.EndDate}
          </span>
        </div>
      </div>
    </div>
    <div className="font-serif bg-blue-400  w-full rounded-lg gap-4 py-1 px-2 bottom-0  flex flex-row items-center">
      <div className="flex items-center">
        <small className="font-extrabold text-white font-serif text-[15px]">
          Permission descriptions:
        </small>
      </div>
      <small className=" text-blue-200 font-serif font-semibold  ">
        {request.PermissionDescriptions === null || request.PermissionDescriptions === "" ? ( <span className="text-red-600">Please wait your request is in progress</span> ) :( <span>{request.PermissionDescriptions}</span> ) }
      </small>
    </div>
  </div>      
      ))
               
                  
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center p-4">
                      No matching documents found.
                    </td>
                  </tr>
                )}
            
        </motion.div>
     
  );
}


