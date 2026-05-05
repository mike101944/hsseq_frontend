import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import { useLocation } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";

import { CompanyCertificates } from "./components/compony";
import { EmployeeCertificates } from "./components/employee";
import { PermitToWork } from "./components/permitToWork";


export function ComplianceManagement() {

  const [activeTab, setActiveTab] = useState(0);
  const tabData = [
    { label: "Company Certificate", content: <CompanyCertificates /> },
    { label: "Employees Certificate", content: <EmployeeCertificates /> },
    { label: "Permit Request", content: <PermitToWork/> },
    { label: "Report", content: <Report /> },
  ];

  const location = useLocation();

  return (
    <div className="flex flex-col w-full p-4 gap-5  no-scrollbar ">
      <div className="flex flex-row  justify-between items-center w-full bg-white p-4 shadow-md rounded-xl ">
        <div className="flex flex-row  ">
          <h4 className="text-gray-400 font-semibold">
            Home
            <span className="text-blue-400 font-semibold">
              {location.pathname}
            </span>
          </h4>
        </div>
        <div className="flex flex-row gap-4 items-center justify-center">
          <div className="flex flex-col items-center justify-between">
            <small>active</small>
            <div className="h-2 w-9 bg-green-200"></div>
          </div>

          <div className="flex flex-col items-center justify-between">
            <small>inactive</small>
            <div className="h-2 w-9 bg-red-200"></div>
          </div>

          <div className="flex flex-col items-center justify-between">
            <small>pending</small>
            <div className="h-2 w-9 bg-yellow-200"></div>
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex flex-row items-center justify-end  p-2">
          {tabData.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={` text-sm font-semibold transition-all duration-300 w-[180px] h-[40px]
                        ${
                          activeTab === index
                            ? " border-blue-500 text-white  rounded-lg bg-blue-400"
                            : "text-gray-500 hover:text-blue-500"
                        }
                      `}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}

        <div className="flex flex-col  gap-5">
          {tabData[activeTab]?.content}
        </div>
      </div>
    </div>
  );
}








const PermitRequest = () => {


    const [modalOpen, setModalOpen] = useState(false);

  const handleModalOpen = () => {
    setModalOpen((curl) => !curl);
  };

  const mainDivRef = useRef(null);
  const [isWide, setIsWide] = useState(false);

  useEffect(() => {
    const checkWidth = () => {
      if (mainDivRef.current) {
        setIsWide(mainDivRef.current.clientWidth > "960px");
      }
    };
    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);


  const RequestHistoryData = [
    {
      id: 1,
      AuthorizedPersonnel: "Baraka Nepal",
      WorkPosition: "HSSEQ Manager",
      GrantedBy: "Jornely Burnenge",
      Worksite: "Tanwat Company",
      StartDate: "03-09-2024",
      EndDate: "12-11-2024",
    },
    {
      id: 1,
      AuthorizedPersonnel: "Baraka Nepal",
      WorkPosition: "HSSEQ Manager",
      GrantedBy: "Jornely Burnenge",
      Worksite: "Tanwat Company",
      StartDate: "03-09-2024",
      EndDate: "12-11-2024",
    },
    {
      id: 1,
      AuthorizedPersonnel: "Baraka Nepal",
      WorkPosition: "HSSEQ Manager",
      GrantedBy: "Jornely Burnenge",
      Worksite: "Tanwat Company",
      StartDate: "03-09-2024",
      EndDate: "12-11-2024",
    },
    {
      id: 1,
      AuthorizedPersonnel: "Baraka Nepal",
      WorkPosition: "HSSEQ Manager",
      GrantedBy: "Jornely Burnenge",
      Worksite: "Tanwat Company",
      StartDate: "03-09-2024",
      EndDate: "12-11-2024",
    },
    {
      id: 1,
      AuthorizedPersonnel: "Baraka Nepal",
      WorkPosition: "HSSEQ Manager",
      GrantedBy: "Jornely Burnenge",
      Worksite: "Tanwat Company",
      StartDate: "03-09-2024",
      EndDate: "12-11-2024",
    },
    {
      id: 1,
      AuthorizedPersonnel: "Baraka Nepal",
      WorkPosition: "HSSEQ Manager",
      GrantedBy: "Jornely Burnenge",
      Worksite: "Tanwat Company",
      StartDate: "03-09-2024",
      EndDate: "12-11-2024",
    },
    {
      id: 1,
      AuthorizedPersonnel: "Baraka Nepal",
      WorkPosition: "HSSEQ Manager",
      GrantedBy: "Jornely Burnenge",
      Worksite: "Tanwat Company",
      StartDate: "03-09-2024",
      EndDate: "12-11-2024",
    },
  ];
  return (
    <div ref={mainDivRef} className="flex flex-col relative max-w-full  ">
      <button
        onClick={handleModalOpen}
        className="flex relative text-white font-semibold self-end justify-end bg-blue-400 px-3 py-2 rounded-md items-center gap-2"
      >
        <FaPlus /> Request permit
      </button>

      {/* modal open */}

      {modalOpen &&
        ReactDOM.createPortal(
          <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[9999] transition-opacity duration-300 ease-in-out"
            onClick={() => setModalOpen(false)}
          >
            <div
              className="flex flex-row justify-between bg-white rounded-lg shadow-md  max-w-[840px]  relative overflow-auto opacity-100"
              onClick={(e) => e.stopPropagation()}
            >
              <form
                action=""
                className="flex flex-wrap gap-4 justify-center items-center bg-white px-6 py-5 rounded-lg w-full  relative"
              >
                <span className="flex justify-center rounded-lg text-blue-500 font-serif font-semibold  bg-white items-center px-4 py-2 w-full">
                  Request For Permission
                </span>

                <div className="flex flex-row sm:flex-row items-center bg-white  px-4 py-2 w-full sm:w-auto">
                  <label
                    htmlFor="name1"
                    className="text-gray-600 font-medium mr-2"
                  >
                    First Name:{" "}
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
                    Last Name :
                  </label>
                  <input
                    type="text"
                    placeholder="enter your Last Name"
                    className="border border-gray-300 px-3 py-2 rounded-md outline-none focus:border-blue-500 transition w-full sm:w-64"
                  />
                </div>

                <div className="flex flex-row sm:flex-row items-center bg-white  px-4 py-2 w-full sm:w-auto">
                  <label
                    htmlFor="name1"
                    className="text-gray-600 font-medium mr-2"
                  >
                    name
                  </label>
                  <input
                    type="text"
                    placeholder="enter your worksite"
                    className="border border-gray-300 px-3 py-2 rounded-md outline-none focus:border-blue-500 transition w-full sm:w-64"
                  />
                </div>

                <div className="flex flex-row sm:flex-row items-center bg-white  px-4 py-2 w-full sm:w-auto">
                  <label
                    htmlFor="name1"
                    className="text-gray-600 font-medium mr-2"
                  >
                    name
                  </label>
                  <input
                    type="text"
                    placeholder="enter your worksite"
                    className="border border-gray-300 px-3 py-2 rounded-md outline-none focus:border-blue-500 transition w-full sm:w-64"
                  />
                </div>

                <div className="flex flex-row sm:flex-row items-row bg-white  px-4 py-2 w-full sm:w-auto">
                  <label
                    htmlFor="name1"
                    className="text-gray-600 font-medium mr-2"
                  >
                    Harzards{" "}
                  </label>
                  <input
                    type="text"
                    placeholder="enter your worksite"
                    className="border border-gray-300 px-3 py-2 rounded-md outline-none focus:border-blue-500 transition w-full sm:w-64"
                  />
                </div>

                <div className="flex flex-row sm:flex-row items-center bg-white  px-4 py-2 w-full sm:w-auto">
                  <label
                    htmlFor="name1"
                    className="text-gray-400 font-medium mr-2"
                  >
                    Scope Work
                  </label>
                  <input
                    type="text"
                    placeholder="enter your worksite"
                    className="border border-gray-300 px-3 py-2 rounded-md outline-none focus:border-blue-500 transition w-full sm:w-64"
                  />
                </div>

                <div className="flex flex-row sm:flex-row items-center bg-white  px-4 py-2 w-full sm:w-auto">
                  <label
                    htmlFor="startDate"
                    className="text-gray-400 font-medium mr-2"
                  >
                    Start Date
                  </label>
                  <input
                    type="date"
                    className="border border-gray-300 px-3 py-2 rounded-md outline-none focus:border-blue-500 transition w-full sm:w-64 
                                cursor-pointer"
                  />
                </div>

                <div className="flex flex-row sm:flex-row items-center bg-white  px-4 py-2 w-full sm:w-auto">
                  <label
                    htmlFor="startDate"
                    className="text-gray-400 font-medium mr-2"
                  >
                    End Date
                  </label>
                  <input
                    type="date"
                    className="border border-gray-300 px-3 py-2 rounded-md outline-none focus:border-blue-500 transition w-full sm:w-64
                                cursor-pointer"
                  />
                </div>

                <div className="flex flex-col sm:flex-col items-start bg-white  px-4 py-2 w-full ">
                  <label
                    htmlFor="taskDescription"
                    className="text-gray-400 font-medium mr-2"
                  >
                    Task Description
                  </label>
                  <textarea
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none
                              outline-none focus:ring-blue-500 focus:border-blue-500 resize-none shadow-sm"
                    rows="2"
                    placeholder="Enter your Task Descrption message..."
                  ></textarea>
                </div>

                <button
                  onClick={() => setModalOpen(false)}
                  className="flex justify-center rounded-lg text-white font-serif font-semibold  bg-blue-600 items-center px-4 py-2 w-full"
                >
                  Request
                </button>
              </form>
            </div>
          </div>,
          document.body
        )}

      {/* list start here */}

      <div
        className={`flex flex-col mt-4 ${
          isWide ? " w-full" : "max-w-[960px]"
        } relative`}
        // className="grid grid-cols-1 w-full"
      >
        {RequestHistoryData.map((request, index) => {
          return (
            <div className="bg-blue-400  shadow-xl flex flex-col relative rounded-lg  mt-6  ">
              <div className="relative bg-white w-full  py-1 flex flex-row justify-between px-3 rounded-lg rounded-b-2xl overflow-hidden">
                <div className="absolute font-serif font-extrabold text-sm text-white bg-blue-300 px-4 transform rotate-[-150deg] top-[0px] right-[-25px]">
                  HSSEQ
                </div>

                <div className="grid grid-cols-1 gap-2">
                  <div className="flex items-center">
                    <span className="font-semibold text-blue-400">
                      Authorized Personnel :{" "}
                    </span>
                    <span className=" px-3 py-1 text-sm font-medium text-gray-300">
                      Baraka Nepal
                    </span>
                  </div>

                  <div className="flex items-center">
                    <span className="font-semibold text-blue-400">
                      Start Date:
                    </span>
                    <span className=" px-3 py-1 text-sm font-medium text-gray-300">
                      12-0-2024
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex items-center">
                    <span className="font-semibold text-blue-400">
                      {" "}
                      Work Position :
                    </span>
                    <span className=" px-3 py-1 text-sm font-medium text-gray-300">
                      HSSEQ Manager
                    </span>
                  </div>

                  <div className="flex items-center">
                    <span className="font-semibold text-blue-400">
                      Granted by :
                    </span>
                    <span className=" px-3 py-1 text-sm font-medium text-gray-300">
                      Jornely Burnenge
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center">
                    <span className="font-semibold text-blue-400">
                      Worksite :
                    </span>
                    <span className=" px-3 py-1 text-sm font-medium text-gray-300">
                      Tanwat Company
                    </span>
                  </div>

                  <div className="flex items-center">
                    <span className="font-semibold text-blue-400">
                      End Date :
                    </span>
                    <span className=" px-3 py-1 text-sm font-medium text-gray-300">
                      03-09-2024
                    </span>
                  </div>
                </div>
              </div>
              <div className="font-serif bg-blue-400  w-full rounded-lg gap-4 py-1 px-2 bottom-0  flex flex-row items-center">
                <div className="flex items-center">
                  <small className="font-extrabold text-white font-serif text-[15px]">
                    Permission descriptions
                  </small>
                </div>
                <small className=" text-blue-200 font-serif font-semibold  ">
                  Dear Baraka Nepal, This is to confirm you that a Permit to
                  Work (PTW) has been issued for the above taskPlease ensure
                  that all work is carried out in compliance with company safety
                  policies and procedures. Any deviations must be reported .
                </small>
              </div>
            </div>
          );
        })}

        
      </div>

      {/* list end here */}
    </div>
  );
};



const Report =()=>{
  return(
    <div className="flex justify-center items-center">
      no report found
    </div>
  )
}



