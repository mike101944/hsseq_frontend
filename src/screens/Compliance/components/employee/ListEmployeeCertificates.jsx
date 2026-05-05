import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { RiDeleteBinLine } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";


export function ListEmployeeCertificates({filteredData}) {


    useEffect(()=>{
        filteredData
        console.log(" data recieved list of employee ",filteredData)
    },[])
  
 
  return (
     
        <motion.div
          key="documentList"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <div className="mt-3">
            <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden font-sans">
              <thead className="bg-blue-400 text-white text-sm">
                <tr>
                  <th className="px-4 py-3 text-left">Document Name</th>
                  <th className="px-4 py-3 text-left">Document Owner</th>
                  <th className="px-4 py-3 text-left">Approval</th>
                  <th className="px-4 py-3 text-left">Expiry Date</th>
                  <th className="px-4 py-3 text-left"> Status</th>
                  <th className="px-4 py-3 text-left">Action</th>
                  <th className="px-4 py-3 text-left">View</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((compliance, index) => (
                    <tr
                      key={index}
                      className="border-b text-sm font-normal transition duration-700 ease-in-out hover:bg-blue-50"
                    >
                      <td className="px-4 py-2">{compliance.employeeName}</td>
                      <td className="px-4 py-2">{compliance.DocumentOwner}</td>
                      <td className="px-4 py-2">{compliance.Approval}</td>
                      <td className="px-4 py-2">{compliance.expireDate}</td>
                      <td className="px-4 py-2">
                        <span
                          className={` px-2 text-sm font-semibold rounded-md 
                   ${
                     {
                       active: "bg-green-200 text-green-700",
                       inactive: "bg-red-200 text-red-700",
                       pending: "bg-yellow-200 text-yellow-700",
                     }[compliance.status] || "bg-gray-200 text-gray-700"
                   }
              `}
                        >
                          {compliance.status}
                        </span>
                      </td>
                      <td className="px-4 py-2 flex flex-row items-center gap-7 ">
                        <button className=" px-1 py-1 text-[18px] text-gray-500 hover:bg-blue-400 hover:text-white">
                          <CiEdit />
                        </button>
                        <button className="px-1 py-1 text-[18px] text-gray-400 hover:bg-blue-400 hover:text-white">
                          <RiDeleteBinLine />
                        </button>
                      </td>
                      <td className="px-4 py-2 ">
                        <button className="px-2 py-1 text-[16px] text-gray-400 hover:bg-blue-400 hover:text-white">
                          {compliance.view}
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center p-4">
                      No matching documents found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
     
  );
}
