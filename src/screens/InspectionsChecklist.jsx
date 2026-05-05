import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { BiSearchAlt2 } from "react-icons/bi";

export function InspectionsChecklist() {
  const locatioin = useLocation();

  const [inspectionType, setInspectionType] = useState("vehicle");
  const [journeyPlan, setJourneyPlan] = useState({
    purpose: "",
    destination: "",
    travelMode: "",
    permitRequired: false,
  });

  const inspectionsData = [
    {
      id: 1,
      type: "vehicle",
    },
    {
      id: 2,
      type: "vehicle",
    },
    {
      id: 3,
      type: "vehicle",
    },
  ];

  // Sample checklists for each inspection type
  const checklists = {
    vehicle: [
      { label: "Tire condition", status: "" },
      { label: "Brakes functionality", status: "" },
      { label: "Lights (headlights, indicators)", status: "" },
      {
        label: "Safety equipment (fire extinguisher, first aid kit)",
        status: "",
      },
    ],
    workaround: [
      { label: "Proper use of PPE", status: "" },
      { label: "Safe storage of hazardous materials", status: "" },
      { label: "Emergency exits unobstructed", status: "" },
    ],
    supplier: [
      { label: "Compliance with HSSEQ standards", status: "" },
      { label: "Valid certifications and permits", status: "" },
      { label: "Quality assurance processes in place", status: "" },
    ],
    site: [
      { label: "Perimeter security intact", status: "" },
      { label: "Hazardous waste disposal compliance", status: "" },
      { label: "First aid facilities available", status: "" },
    ],
  };

  const handleTabChange = (type) => {
    setInspectionType(type);
  };

  const handleJourneyPlanChange = (e) => {
    setJourneyPlan({ ...journeyPlan, [e.target.name]: e.target.value });
  };

  // <div className="p-6 max-w-7xl mx-auto"></div>

  return (
    <div className="p-2 w-full">
      <div className="bg-blue-400 font-semibold py-5 flex flex-row justify-between items-center px-5 shadow-2xl rounded-lg">
        <div className="flex flex-row">
          <h4 className="text-white font-serif ">Home</h4>
          <span className="pl-2 text-white">{location.pathname}</span>
        </div>
        <div className=" text-white">
          <span> Inspectioins</span>
        </div>
      </div>

      {/* Inspection Type Tabs */}
      <div className="h-12"></div>

      <div className="flex flex-row flex-wrap ">
        <div className="flex flex-col  bg-white  rounded-t-2xl justify-items-start">
          <button
            onClick={() => handleTabChange("vehicle")}
            className={` rounded-t-lg ${
              inspectionType === "vehicle"
                ? "px-3 py-3 bg-blue-500 text-white"
                : "px-3 py-3 bg-white text-gray-700"
            }`}
          >
            Vehicle Inspection
          </button>
          <button
            onClick={() => handleTabChange("workaround")}
            className={` rounded-t-lg ${
              inspectionType === "workaround"
                ? "px-3 py-3 bg-blue-500 text-white"
                : "px-3 py-3 bg-white text-gray-700"
            }`}
          >
            Workaround Inspection
          </button>
          <button
            onClick={() => handleTabChange("supplier")}
            className={` rounded-t-lg ${
              inspectionType === "supplier"
                ? "px-3 py-3 bg-blue-500 text-white"
                : "px-3 py-3 bg-white text-gray-700"
            }`}
          >
            Supplier Inspection
          </button>
          <button
            onClick={() => handleTabChange("site")}
            className={` rounded-t-lg ${
              inspectionType === "site"
                ? "px-3 py-3 bg-blue-500 text-white"
                : "px-3 py-3 bg-white text-gray-700"
            }`}
          >
            Site Inspection
          </button>
        </div>

        {/* Inspection Checklist */}
        <div className="flex-grow rounded-lg   px-3">
          <div className="flex justify-center items-center">
            <h2 className="text-xl font-semibold mb-4 text-blue-400 font-sans">
              {inspectionType.charAt(0).toUpperCase() + inspectionType.slice(1)}{" "}
              Inspection Checklist
            </h2>
          </div>
          <div className="flex flex-col p-1 ">
            <div className="flex flex-row w-full justify-between">
              <div className="flex flex-row p-1 justify-center items-center relative ">
                <input
                  type="text"
                  // value={searchQuery}
                  // onChange={handleSearchChange}
                  placeholder="search user ......"
                  className="w-full bg-gray-50 rounded-md border-none outline-none 
                             px-4 py-1 pr-12 transition-all duration-700 ease-in-out focus:ring-1 focus:ring-blue-400 focus:ring-opacity-100 focus:border-blue-400"
                />
                <span className="absolute translate-x-24 text-gray-500">
                  <BiSearchAlt2 size={17} />
                </span>
              </div>
              <button className="py-2 px-4 bg-blue-500 w-3/12 rounded-md text-white font-serif font-medium hover:bg-blue-400 hover:text-blue-200 ">
                + Add Inspection
              </button>
            </div>

            <div className="h-10">{/* divider */}</div>

            {/* test  */}

            {/* end test */}

            {/* lists */}
            {inspectionsData.map((item, index) => (
              <div className="flex flex-col bg-blue-500 rounded-t-xl pt-8 rounded-b-lg mb-8">
                {/* <h3>not approved</h3> */}

                <div className="bg-white rounded-t-xl pt-4">
                  <div className="px-2 flex flex-col py-2">
                    <div className="w-full "> </div>
                    <div className="grid grid-cols-3  gap-2">
                      <div className="py-2 px-2 border border-blue-300 rounded-md flex flex-col bg-gradient-to-b from-blue-400 via-blue-300 to-blue-200 ">
                        <div className="flex flex-row justify-between items-center">
                          <div className="h-4 w-4 rounded-full flex font-extrabold font-serif justify-center items-center bg-white">
                            <span className="text-[10px]">B</span>
                          </div>
                          <span className="font-semibold text-white text-[15px]">
                            Baraka Ambokile
                          </span>
                        </div>
                        <div className="flex flex-row justify-between items-center">
                          <span className="text-white text-[13px] font-semibold font-serif">
                            Driver
                          </span>
                          <span className="text-white text-[13px] font-semibold font-serif">
                            Car Name
                          </span>
                        </div>
                      </div>
                      <div className="  py-2 px-2 border border-blue-300 rounded-md">
                        {/* 2 */}
                      </div>
                      <div className="  py-2 px-2 border border-blue-300 rounded-md">
                        {/* 3 */}
                      </div>
                    </div>
                  </div>

                  {/* Lower container */}

                  <div className="flex flex-row justify-between border-t border-blue-400 p-2 rounded-b-lg">
                    <div className="flex flex-row justify-around items-center">
                      <h6 className="text-sm font-serif font-semibold text-gray-500 pr-3">
                        Auditors(1)
                      </h6>
                      <div className="h-4 w-4 rounded-full bg-blue-500 text-white flex justify-center items-center text-[10px] font-semibold font-serif">
                        B
                      </div>
                    </div>

                    <div className="flex flex-row rounded-b-lg">
                      <div className="flex flex-col text-[13px] mr-4">
                        <span className="font-bold text-gray-600">
                          Need help ?
                        </span>
                        <span className="text-[10px] text-gray-400 font-bold">
                          Get help for approval
                        </span>
                      </div>
                      <button className=" px-4 text-[12px] bg-blue-400 rounded-lg text-white">
                        Get Help
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const ContentModal = ({ checklists }) => {
  return (
    <div className="flex flex-col">
      <ul>
        {checklists[inspectionType]?.map((item, index) => (
          <li
            key={index}
            className="flex items-center my-2 mx-3 justify-between"
          >
            <label className="mr-2 text-blue-400 font-serif font-semibold">
              {item.label}
            </label>
            <select
              className="   border border-gray-300 px-3 py-2 rounded-md outline-none focus:border-blue-500 transition w-4/12"
              defaultValue={item.status}
            >
              <option value="">Select Status</option>
              <option value="pass">Pass</option>
              <option value="fail">Fail</option>
              <option value="needs_attention">Needs Attention</option>
            </select>
          </li>
        ))}
      </ul>
      <textarea
        className="border border-gray-300 px-3 py-2 mt-2 rounded-md outline-none focus:border-blue-500 transition w-full"
        rows={2}
        placeholder="Additional Notes"
      ></textarea>
      <div className="mt-4 flex justify-between">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg w-4/12">
          Save Draft
        </button>
        <button className="bg-green-500 text-white px-4 py-2 rounded-lg w-4/12">
          Submit
        </button>
      </div>
    </div>
  );
};

const JPM = () => {
  return (
    <div>
      {/* Journey Management Plan */}
      <div className="mt-8  p-4 rounded-lg shadow-lg bg-white">
        <div className="flex justify-center items-center">
          <h2 className="text-xl font-semibold mb-4 font-serif text-blue-400">
            Journey Management Plan
          </h2>
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1">Journey Purpose:</label>
          <input
            type="text"
            name="purpose"
            value={journeyPlan.purpose}
            onChange={handleJourneyPlanChange}
            className="w-full border border-gray-300 px-3 py-2 rounded-md outline-none focus:border-blue-500 transition"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1">Destination:</label>
          <input
            type="text"
            name="destination"
            value={journeyPlan.destination}
            onChange={handleJourneyPlanChange}
            className="w-full border border-gray-300 px-3 py-2 rounded-md outline-none focus:border-blue-500 transition"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1">Travel Mode:</label>
          <select
            name="travelMode"
            value={journeyPlan.travelMode}
            onChange={handleJourneyPlanChange}
            className="w-full border border-gray-300 px-3 py-2 rounded-md outline-none focus:border-blue-500 transition"
          >
            <option value="">Select Travel Mode</option>
            <option value="car">Car</option>
            <option value="bus">Bus</option>
            <option value="train">Train</option>
          </select>
        </div>
        <div className="mb-4 flex items-center gap-2">
          <label className="block font-medium mb-1">Permit Required:</label>
          <input
            type="checkbox"
            name="permitRequired"
            checked={journeyPlan.permitRequired}
            onChange={(e) =>
              setJourneyPlan({
                ...journeyPlan,
                permitRequired: e.target.checked,
              })
            }
            className="w-4 h-4"
          />
        </div>
        <div className="flex justify-end">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Request Permit
          </button>
        </div>
      </div>
    </div>
  );
};
