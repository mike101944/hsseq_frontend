import React, { useState } from "react";
import { Mail, Phone, Clock } from "lucide-react";
import { BsThreeDots } from "react-icons/bs";


import {
  IncidentsCard,
  TrainingCard,
  ComplianceCard,
  MaterialUiReactTabs,
  InspectionTrendCard,
  VerticalLinearStepper,
  NotesCard

} from "./components/DashboardComponents";
import { useLocation } from "react-router-dom";

export function Dashboard({ size, endValue, speed }) {
  const [totalIncidents, setTotalIncidents] = useState(56);
  const location = useLocation();

  return (
    <div className="flex flex-col h-full overflow-y-auto no-scrollbar gap-2 pt-3">
      <div className="flex flex-row gap-5 ">
        <div className="flex flex-col w-[72%] gap-5">
          <div className="flex flex-row flex-wrap justify-between py-0 ">
            <IncidentsCard />
            <ComplianceCard />
            <TrainingCard size={50} endValue={50} speed={34} />
          </div>
          {/* <div className="h-5" /> */}

          <MaterialUiReactTabs />

          <NotesCard/>


        </div>

        <div className="flex flex-col gap-3 flex-grow rounded-md ">
          {/* <InspectionsCard/> */}
      
          <div className="flex  flex-col  rounded-md  ">
              
              <InspectionTrendCard/>
          </div>

          <div className=" rounded-md flex-col  bg-white">
            
          <div className="flex  px-3 border-b border-gray-600 items-center justify-between py-3 ">
                <h2 className="font-bold text-slate-500">Events Feed</h2>
                <BsThreeDots/>

            </div>

              <div className="max-h-[340px] no-scrollbar overflow-y-auto px-2">
                  <VerticalLinearStepper/>
             

              </div>
        
          </div>

        </div>
      </div>

      {/* Lower part  */}
      
    </div>
  );
}
