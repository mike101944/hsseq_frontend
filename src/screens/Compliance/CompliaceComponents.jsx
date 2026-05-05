import React,{useState,useRef } from 'react'

import { TextField, Button, Box } from "@mui/material";
import { FaImage } from "react-icons/fa6";
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';





export const EmployeeCertificateModal =({setModalOpen})=>{

    const [selectedOption, setSelectedOption] = useState("");
    const options = ["Option 1", "Option 2", "Option 3", "Option 4"];

    return(


        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[9999] transition-opacity duration-300 ease-in-out" 
                onClick={()=>setModalOpen(false)} >
              <div className="flex flex-row justify-between bg-white rounded-lg shadow-md  max-w-[840px]  relative overflow-auto opacity-100" 
                    onClick={(e)=>e.stopPropagation()}>
                      {/* <button className="modal-close" onClick={() => setModalOpen(false)}>&times;</button> */}
                      <form
                action=""
                className="flex flex-wrap gap-4 justify-center items-center bg-white px-6 py-5 rounded-lg w-full  relative"
              >
                <span className="flex justify-center rounded-lg text-blue-500 font-serif font-semibold  bg-white items-center px-4 py-2 w-full">
                  Employee Certificate 
                </span>


                <div className="flex flex-row sm:flex-row items-center bg-white  px-4 py-2 w-full sm:w-auto">
                  <label
                    htmlFor="name1"
                    className="text-gray-600 font-medium mr-2"
                  >
                    Full Name:{" "}
                  </label>
                  <input
                    type="text"
                    placeholder="enter first and Last name  "
                    className="border border-gray-300 px-3 py-2 rounded-md outline-none focus:border-blue-500 transition w-full sm:w-64"
                  />
                </div>

               

                <div className="flex flex-row sm:flex-row items-center bg-white  px-4 py-2 w-full sm:w-auto">
                  <label
                    htmlFor="name1"
                    className="text-gray-600 font-medium mr-2"
                  >
                    Approval :{" "}
                  </label>
                  <select className='border border-gray-300 px-3 py-2 rounded-md outline-none focus:border-blue-500 transition w-full sm:w-64'>

                  {options.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                    ))}

                  </select>
                </div>

                <div className="flex flex-row sm:flex-row items-center bg-white  px-4 py-2 w-full sm:w-auto">
                  <label
                    htmlFor="name1"
                    className="text-gray-600 font-medium mr-2"
                  >
                    Document :{" "}
                  </label>
                  <input
                    type="file"
                    placeholder="enter your first Name"
                    className="border border-gray-300 px-3 py-2 rounded-md outline-none focus:border-blue-500 transition w-full sm:w-64"
                  />
                </div>

                <div className="flex flex-row sm:flex-row items-center bg-white  px-4 py-2 w-full sm:w-auto">
                  <label
                    htmlFor="name1"
                    className="text-gray-600 font-medium mr-2"
                  >
                    Doc Type:{" "}
                  </label>
                  <input
                    type="text"
                    placeholder="enter your first Name"
                    className="border border-gray-300 px-3 py-2 rounded-md outline-none focus:border-blue-500 transition w-full sm:w-64"
                  />
                </div>


                <div className="flex flex-row sm:flex-row items-center bg-white  px-4 py-2 w-full sm:w-auto">
                  <label
                    htmlFor="name1"
                    className="text-gray-600 font-medium mr-2"
                  >
                    Doc Owner:{" "}
                  </label>
                  <input
                    type="text"
                    placeholder="enter owner of document  "
                    className="border border-gray-300 px-3 py-2 rounded-md outline-none focus:border-blue-500 transition w-full sm:w-64"
                  />
                </div>

                <div className="flex flex-row sm:flex-row items-center bg-white  px-4 py-2 w-full sm:w-auto">
                  <label
                    htmlFor="name1"
                    className="text-gray-600 font-medium mr-2"
                  >
                    Expire Date:{" "}
                  </label>
                  <input
                    type="date"
                   
                    className="border border-gray-300 px-3 py-2 rounded-md outline-none focus:border-blue-500 transition w-full sm:w-64"
                  />
                </div>



                <button
                  onClick={() => setModalOpen(false)}
                  className="flex justify-center rounded-lg text-white font-serif font-semibold  bg-blue-600 items-center px-4 py-2 w-full"
                >
                  Save
                </button>

                
               




                </form>
                    
                

              </div>
            </div>


    )
}


