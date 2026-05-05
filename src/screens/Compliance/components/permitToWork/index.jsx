
import React,{useEffect,useState} from 'react'
import { motion } from "framer-motion";
import { FaPlus } from "react-icons/fa6";
import { BiSearchAlt2 } from "react-icons/bi";


import { AddPermitToWork } from './AddPernitToWork';
import { ListPermitToWork } from './ListPermitToWork';
import { PermitRequestHistoryData } from '@/assets/images/PermitRequestHistoryData';



export function PermitToWork() {

      const [searchTerm, setSearchTerm] = useState("");
      const [pmtRequest, setPmtRequest] = useState(PermitRequestHistoryData);
    
      const [isAddingNewDocument, setIsAddingNewDocument] = useState(false);
    console.log("request before filtered ",pmtRequest);

      const handleSearchTerm = (e) => {
        setSearchTerm(e.target.value);
        console.log("trigger request on change  ",searchTerm)
      };
    
      const filteredData = pmtRequest.filter((doc) => {
       return doc.AuthorizedPersonnel.toLowerCase().includes(searchTerm.toLowerCase());
      });


      console.log(" request after filtered ", filteredData);
    
      const handleAddDocumentClick = () => {
        setIsAddingNewDocument(true);
      };
    
      const handleCancelAddDocument = () => {
        setIsAddingNewDocument(false);
      };
    
      useEffect((e) => {
        filteredData;
       
      }, []);


  return (
    <div className="flex flex-col  overflow-y-auto mt-2">
        
    <div className="flex justify-end items-center ">
      <div className=" min-w-[500px]">
        {!isAddingNewDocument &&(
            <div className="flex relative p-1 justify-center max-w-[350px] items-center  ">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchTerm}
              placeholder="search by name ......"
              className="w-full bg-gray-50 rounded-md border-none outline-none 
                     px-4 py-1 pr-12 transition-all duration-700 ease-in-out focus:ring-1 focus:ring-blue-400 focus:ring-opacity-100 focus:border-blue-400"
            />
            <span className="absolute translate-x-36 cursor-pointer text-gray-500">
              <BiSearchAlt2 size={17} />
            </span>
          </div>
        )}
      </div>

      <div className="flex w-[200px]  justify-end ">
        {!isAddingNewDocument && (
          <button
            onClick={handleAddDocumentClick}
            className="flex  text-white font-semibold self-end justify-end bg-blue-400 right-1 px-3 py-2 rounded-md items-center gap-2"
          >
            <FaPlus /> Request PTM
          </button>
        )}
      </div>
    </div>

    {/* render table */}
    {isAddingNewDocument ? (


<motion.div
key="addDocumentList"
initial={{ scale: 0.9, opacity: 0 }}
animate={{ scale: 1, opacity: 1 }}
exit={{ scale: 0.9, opacity: 0 }}
transition={{ duration: 0.4, ease: "easeInOut" }}
>
        <AddPermitToWork onCancel={handleCancelAddDocument}/>

</motion.div>
    ):(
        <ListPermitToWork filteredData={filteredData}/>
      
    )}


    </div>



  )
}
