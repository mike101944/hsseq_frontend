import { div, tr } from "framer-motion/client";
import React, { useState, useEffect,useMemo } from "react";
import { Mail, Phone, Clock } from "lucide-react";

import { BsThreeDots } from "react-icons/bs";
import { FaGraduationCap } from "react-icons/fa6";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";


import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import { Label, Pie, PieChart, Sector } from "recharts";


import { Slider } from "../../../components/ui/slider";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import {
  ChartContainer,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
} from "../../../components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";


import AlcoholImage1 from '../../../assets/image/alcohol1.png'


import { motion } from "framer-motion";
// import { Code, Settings, User } from 'lucide-react';

import { CircularProgress } from "../new/charts/Circular";
import { Training } from "../new/components/TrainingComponents/Training";

// UPPER COMPONENTS


const SliderCard = ({ className, ...props }) => {
  return (
    <Slider
      defaultValue={[50]}
      max={100}
      step={1}
      className={`w-full ${className || ""}`.trim()} // ✅ Fix: className is now defined
      {...props}
    />
  );
};


export function IncidentsCard() {
  const [totalIncidents, setTotalIncidents] = useState(56);
  return (
    // min-w-22p5 sm-w-[250px] p-4
    //  w-full sm:w-[250px] p-4

    <div
      className=" gap-0 
            flex flex-col justify-between
             w-[32%]
             bg-white rounded-lg
            transition-transform duration-500 ease-in-out
            box-border shadow-lg hover:translate-y-[-5px] hover:shadow-md  cursor-pointer"
    >
      <div className="flex flex-row-reverse justify-between px-2 pt-2">
        <small
          className="
                      flex justify-center items-center rounded-full
                       text-white font-semibold h-[22px] w-[22px]
                        bg-gradient-to-l from-[#92b0eb] to-[#e4aee6] font-poppins"
        >
          {totalIncidents}
        </small>

        <p className="text-gray-400 font-poppins text-sm font-bold">
          Total Incidents
        </p>
      </div>

      <div className="px-2">
      <SliderCard/>
      </div>
      

      <h2 className="text-gray-400 text-sm self-center mt-1 ">
        Incidents Reported
      </h2>

      <ul className="mb-[6px] flex flex-row justify-between px-2 text-sm">
        <li className="flex items-center text-sm font-semibold text-gray-400">
          5 Critical
        </li>
        <li className="flex items-center text-sm font-semibold text-gray-400">
          27 Near Misses
        </li>
      </ul>

      <div
        className="flex flex-row justify-between items-center 
                      text-[16px] font-bold text-white px-2 font-sans bg-gradient-to-tr from-blue-400 via-cyan-400 to-blue-400 py-2 rounded-b-lg"
      >
        <span className="hover:text-blue-200 text-sm font-extrabold">
          View Details
        </span>
        <BsThreeDots className="text-[#fff] text-[23px]" />
      </div>
    </div>
  );
}

export function ComplianceCard() {
  return (
    <div
      className=" 
    
          flex flex-col justify-between
          w-[32%]
           bg-white rounded-lg
          transition-transform duration-500 ease-in-out
          box-border shadow-lg cursor-pointer hover:translate-y-[-5px] hover:shadow-md"
    >
      <div className="flex flex-row justify-between px-2 pt-2">
        <CircularProgress endValue={28} speed={41} size={50} />
        <h4 className="flex flex-col items-center text-sm text-gray-400 font-semibold font-sans ">
          <span>Compliance</span> Status
        </h4>
        <small
          className="flex justify-center items-center rounded-full
                       text-white font-semibold h-[22px] w-[22px]
                        bg-gradient-to-r from-[#92b0eb] to-[#e4aee6]"
        >
          28
        </small>
      </div>
      <small className="text-sm font-semibold text-gray-400 flex flex-row-reverse justify-between px-2 ">
        2 <p>Overdue Certifications:</p>
      </small>

      <div className="flex flex-row justify-between text-[16px] px-2 font-sans bg-gradient-to-tr from-blue-300 via-sky-500 to-blue-300 py-2  font-semibold text-blue-300 rounded-b-lg">
        <span className=" text-white text-sm font-extrabold">
          Update Compliance
        </span>
        <BsThreeDots className="text-[#fff] text-[23px]" />
      </div>
    </div>
  );
}

export function TrainingCard({ endValue, size, speed }) {
  const [progressValue, setProgressValue] = useState(0);

  useEffect(() => {
    let progress = setInterval(() => {
      setProgressValue((prev) => {
        if (prev < endValue) {
          return prev + 1;
        } else {
          clearInterval(progress);
          return prev;
        }
      });
    }, speed);
    return () => clearInterval(progress);
  }, [endValue, speed]);

  return (
    <div
      className=" 
              flex flex-col justify-between
              w-[32%]
               bg-white rounded-lg 
              transition-transform duration-500 ease-in-out
              box-border shadow-lg cursor-pointer hover:translate-y-[-5px] hover:shadow-md"
    >
      <div className="flex flex-row justify-between items-center px-2 pt-2">
        <h5 className="font-serif font-bold text-gray-400 text-sm">
          Training Progress
        </h5>
        <div
          className="flex justify-center items-center rounded-full
                       text-white font-semibold h-[22px] w-[22px]
                        bg-gradient-to-l from-[#92b0eb] to-[#e4aee6]"
        >
          <FaGraduationCap className="text-white" color="white" />
        </div>
      </div>

      <div className="middle-part  px-2">
        <div
          className="circularProgress-round"
          style={{
            height: size,
            width: size,
            background: `conic-gradient(
                    #0055ffb7 ${progressValue * 0.8}deg,
                    rgb(212, 94, 123) 0 ${progressValue * 1.7}deg,
                    rgb(236, 138, 245) 0 ${progressValue * 4}deg,
                    #cadcff 0 ${progressValue * 5}deg
                    )`,
          }}
        >
          <div className="circular-value"></div>
        </div>
        <div
          className="circularProgress-round2"
          style={{
            height: size,
            width: size,
            background: `conic-gradient(
                    #0055ffb7 ${progressValue * 0.8}deg,
                    rgb(212, 94, 123) 0 ${progressValue * 1.7}deg,
                    rgb(236, 138, 245) 0 ${progressValue * 4}deg,
                    #cadcff 0 ${progressValue * 5}deg
                    )`,
          }}
        >
          <div className="font-serif text-[16px]">{endValue}%</div>
        </div>
      </div>

      <div className="lower-part px-2">
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <div
              style={{
                backgroundColor: "#0055ffb7",
                height: "1px",
                width: "1px",
                padding: "3px",
                borderRadius: "5px",
              }}
            ></div>
            <span style={{ fontSize: "13px", fontWeight: 600, color: "#888" }}>
              Active users
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <div
              style={{
                backgroundColor: "rgb(212, 94, 123)",
                height: "1px",
                width: "1px",
                padding: "3px",
                borderRadius: "5px",
              }}
            ></div>
            <span style={{ fontSize: "13px", fontWeight: 600, color: "#888" }}>
              inactive users
            </span>
          </div>
        </div>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <div
              style={{
                backgroundColor: "rgb(236, 138, 245)",
                height: "1px",
                width: "1px",
                padding: "3px",
                borderRadius: "5px",
              }}
            ></div>
            <span style={{ fontSize: "13px", fontWeight: 600, color: "#888" }}>
              enrolled users
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <div
              style={{
                backgroundColor: "#cadcff",
                height: "1px",
                width: "1px",
                padding: "3px",
                borderRadius: "5px",
              }}
            ></div>
            <span style={{ fontSize: "13px", fontWeight: 600, color: "#888" }}>
              none
            </span>
          </div>
        </div>
      </div>

      <div className="flex px-2 flex-row justify-between items-center bg-gradient-to-tr from-blue-300 via-sky-500 to-blue-300 py-2  font-bold text-blue-300 rounded-b-lg">
        <span className="text-white">Manage Training</span>
        <BsThreeDots className="text-[#fff] text-[23px]" />
      </div>
    </div>
  );
}

export function InspectionsCard() {
  return (
    <div
      className=" 
      h-full
              flex flex-col justify-between
              w-full sm:w-23p5 
               bg-white rounded-lg
              transition-transform duration-500 ease-in-out
              box-border shadow-lg cursor-pointer hover:translate-y-[-5px] hover:shadow-md"
    >
      <div className="flex flex-row justify-between px-2 pt-2">
        <h5 className="font-serif font-semibold text-gray-400">
          Inspections checklist
        </h5>
        <div className="h-7 w-7 rounded-full bg-slate-200"></div>
      </div>
      <div className="flex px-2 bottom-0 flex-row justify-between items-center bg-gradient-to-tr from-blue-300 via-sky-500 to-blue-300 py-2  font-bold text-blue-300 rounded-b-lg"></div>
    </div>
  );
}

// MIDDLE COMPONENTS

export const TabsComponents = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div className="w-full p-2 h-full bg-white  flex flex-col rounded-md shadow-md">
      <div className="flex relative h-12 rounded-md">
        {[
          "Recently inspections",
          "Resolved incident",
          "RecentlyEnrolled Users",
        ].map((tab, index) => (
          <div
            key={index}
            className={` font-semibold py-2 w-full transition-colors duration-700 ease-in-out
               font-sans bg-white cursor-pointer text-center 
              ${
                activeTab === index
                  ? "text-blue-400 font-semibold"
                  : "text-gray-400"
              }`}
            // color: #63a3e7;
            // font-weight: bold;
            onClick={() => handleTabClick(index)}
          >
            {tab}
          </div>
        ))}
        <div
          className=" bottom-0 h-1px w-1/3 mx-0 bg-blue-500 absolute"
          style={{ left: `${(activeTab * 100) / 3}%` }}
        ></div>
      </div>
      <div className="bg-white  max-w-[563px] min-h-[200px] max-h-[220px]  overflow-y-auto overflow-x-auto no-scrollbar">
        {activeTab === 0 && <RecentInspections />}
        {activeTab === 1 && <ResolveIncidents />}
        {activeTab === 2 && <RecentlyEnrolled />}
      </div>
    </div>
  );
};

export function NewsComponent() {
  return (
    <div className="w-full sm:w-37pc  bg-white shadow-md mb-2 h-full rounded-md">
      News
    </div>
  );
}

export function MaterialUiReactTabs() {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const inspectionData = [
    {
      id: 1,
      plateNo: "KCA 123",
      driver: "John Doe",
      location: "Nairobi",
      date: "12-12-2021",
      status: "Resolved",
      checkIn: "12:00 PM",
      checkOut: "12:30 AM",
      checkedBy: "Jane Doe",
      remarks: "Good",
    },
    {
      id: 2,
      plateNo: "KCB 456",
      driver: "Alice Smith",
      location: "Mombasa",
      date: "13-12-2021",
      status: "Pending",
      checkIn: "13:00 PM",
      checkOut: "13:30 PM",
      checkedBy: "Bob Johnson",
      remarks: "Fair",
    },
    {
      id: 3,
      plateNo: "KCC 789",
      driver: "Michael Brown",
      location: "Kisumu",
      date: "14-12-2021",
      status: "Resolved",
      checkIn: "14:00 PM",
      checkOut: "14:30 PM",
      checkedBy: "Sarah Lee",
      remarks: "Excellent",
    },
    {
      id: 4,
      plateNo: "KCD 012",
      driver: "Emily Davis",
      location: "Nakuru",
      date: "15-12-2021",
      status: "Pending",
      checkIn: "15:00 PM",
      checkOut: "15:30 PM",
      checkedBy: "Chris Martin",
      remarks: "Poor",
    },
    {
      id: 5,
      plateNo: "KCE 345",
      driver: "David Wilson",
      location: "Eldoret",
      date: "16-12-2021",
      status: "Resolved",
      checkIn: "16:00 PM",
      checkOut: "16:30 PM",
      checkedBy: "Laura White",
      remarks: "Good",
    },
    {
      id: 6,
      plateNo: "KCF 678",
      driver: "Sophia Taylor",
      location: "Thika",
      date: "17-12-2021",
      status: "Pending",
      checkIn: "17:00 PM",
      checkOut: "17:30 PM",
      checkedBy: "James Green",
      remarks: "Fair",
    },
    {
      id: 7,
      plateNo: "KCG 901",
      driver: "Daniel Harris",
      location: "Nyeri",
      date: "18-12-2021",
      status: "Resolved",
      checkIn: "18:00 PM",
      checkOut: "18:30 PM",
      checkedBy: "Emma Brown",
      remarks: "Excellent",
    },
    {
      id: 8,
      plateNo: "KCH 234",
      driver: "Olivia Martinez",
      location: "Machakos",
      date: "19-12-2021",
      status: "Pending",
      checkIn: "19:00 PM",
      checkOut: "19:30 PM",
      checkedBy: "Liam Johnson",
      remarks: "Poor",
    },
  ];

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            onChange={handleChange}
            aria-label="lab API tabs example"
            className="bg-white rounded-t-md"
          >
            <Tab
              label="Recently Inspections"
              value="1"
              sx={{ textTransform: "none" }}
              className="font-extrabold"
            />
            <Tab
              label="Enrolled Users"
              value="2"
              sx={{ textTransform: "none" }}
            />
            <Tab
              label="Resolved Incidents"
              value="3"
              sx={{ textTransform: "none" }}
            />
          </TabList>
        </Box>
        <TabPanel
          value="1"
          sx={{ p: 0 }}
          className="bg-white overflow-y-auto no-scrollbar  max-h-[278px]"
        >

          {inspectionData.map((item) => (
            <div
              key={item.id}
              // className="flex py-2 my-2 items-center justify-between border-b text-sm font-normal
              //           hover:translate-y-[-5px] hover:shadow-xl  cursor-pointer
              //              transition duration-1500 ease-in-out hover:bg-white pl-2"
                           className={
                            item.id % 1 === 0 ? 
                            "flex py-2 my-2 items-center justify-between border-b text-sm font-normal translate-y-[-5px] shadow-xl  cursor-pointer  hover:bg-white pl-2"  : "flex py-2 my-2 items-center justify-between border-b text-sm font-normal    cursor-pointer    hover:bg-white pl-2"
}
            >
              <input type="checkbox" />
              <div className="flex  space-y-0">
                <div className="flex h-9 w-9 rounded-full bg-gray-200 p-1"></div>
                <div className="flex flex-col space-y-1">
                  <span className="px-4 font-extrabold text-xs text-blue-500 font-sans">
                    #{item.plateNo}
                  </span>
                  <span className="px-4 font-bold text-xs font-sans text-gray-600">
                    {item.driver.length >= 11
                      ? item.driver.slice(0, 9) + ".."
                      : item.driver}
                  </span>
                </div>
              </div>

              <div className="flex flex-col justify-start items-start">
                <span className="px-4 font-bold text-xs font-sans text-blue-500">
                  Check In{" "}
                </span>
                <span className="px-4 font-bold text-xs font-sans text-gray-600">
                  {item.date}
                </span>
                <span className="px-4 font-bold text-xs font-sans text-gray-400">
                  {item.checkIn}
                </span>
              </div>
              <div className="flex flex-col justify-start items-start">
                <span className="px-4 font-bold text-xs font-sans text-blue-500">
                  Check Out{" "}
                </span>
                <span className="px-4 font-bold text-xs font-sans text-gray-600">
                  {item.date}
                </span>
                <span className="px-4 font-bold text-xs font-sans text-gray-400">
                  {item.checkOut}
                </span>
              </div>
              <div className="flex flex-col justify-start items-start">
                <span className="px-4 font-bold text-xs font-sans text-blue-500">
                  Checked By
                </span>
                <span className="px-4 font-bold text-xs font-sans text-gray-600">
                  {item.location}
                </span>
                <span className="px-4 font-bold text-xs font-sans text-gray-400">
                  {item.checkedBy}
                </span>
              </div>
              <div className="flex flex-col justify-start items-start space-y-3">
                <span className="px-4 font-bold text-xs font-sans text-blue-500">
                  Status{" "}
                </span>
                <span className="px-4 font-bold text-xs font-sans text-gray-400">
                  {item.status}
                </span>
              </div>
              <div className="flex flex-col justify-start items-start space-y-3">
                <span className="px-4 font-bold text-xs font-sans text-blue-500">
                  Remarks{" "}
                </span>
                <span className="px-4 font-bold text-xs font-sans text-gray-400">
                  {item.remarks}
                </span>
              </div>
            </div>
          ))}


        </TabPanel>
        <TabPanel value="2" className="bg-white overflow-y-auto no-scrollbar  max-h-[278px]">
          Item Two
        </TabPanel>
        <TabPanel value="3" className="bg-white overflow-y-auto no-scrollbar  max-h-[278px]">
          Item Three
        </TabPanel>
      </TabContext>
    </Box>
  );
}


export const NotesCard = ()=>{
  return(
    <div className="w-full mx-auto px-4 sm:px-0">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex ">
             
              1
            
            </div>

            <div className="flex items-start space-x-4">

              2

            </div>
            <div className="flex items-start space-x-4">
              3


            </div>
          </div>
        </div>
      </div>
  )
}


"use client";

const desktopData = [
  { month: "january", desktop: 186, fill: "var(--color-january)" },
  { month: "february", desktop: 305, fill: "var(--color-february)" },
  { month: "march", desktop: 237, fill: "var(--color-march)" },
  { month: "april", desktop: 173, fill: "var(--color-april)" },
  { month: "may", desktop: 209, fill: "var(--color-may)" },
];

const chartConfig = {
  visitors: { label: "Visitors" },
  desktop: { label: "Desktop" },
  mobile: { label: "Mobile" },
  january: { label: "January", color: "hsl(var(--chart-1))" },
  february: { label: "February", color: "hsl(var(--chart-2))" },
  march: { label: "March", color: "hsl(var(--chart-3))" },
  april: { label: "April", color: "hsl(var(--chart-4))" },
  may: { label: "May", color: "hsl(var(--chart-5))" },
};

export function InspectionTrendCard() {
  const id = "pie-interactive";
  const [activeMonth, setActiveMonth] = useState(desktopData[0].month);

  const activeIndex = useMemo(
    () => desktopData.findIndex((item) => item.month === activeMonth),
    [activeMonth]
  );

  const months = useMemo(() => desktopData.map((item) => item.month), []);

  return (
    <Card data-chart={id} className="flex flex-col">
      <ChartStyle id={id} config={chartConfig} />
      <CardHeader className="flex-row items-start space-y-0 pb-0">
        <div className="grid gap-1">
          {/* <CardTitle>Pie Chart - Interactive</CardTitle> */}
          <CardDescription>January - June 2025</CardDescription>
        </div>
        <Select value={activeMonth} onValueChange={setActiveMonth}>
          <SelectTrigger
            className="ml-auto h-7 w-[130px] rounded-lg pl-2.5"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Select month" />
          </SelectTrigger>
          <SelectContent align="end" className="rounded-xl">
            {months.map((key) => {
              const config = chartConfig[key];

              return (
                config && (
                  <SelectItem key={key} value={key} className="rounded-lg">
                    <div className="flex items-center gap-2 text-xs">
                      <span
                        className="flex h-3 w-3 shrink-0 rounded-sm"
                        style={{ backgroundColor: `var(--color-${key})` }}
                      />
                      {config.label}
                    </div>
                  </SelectItem>
                )
              );
            })}
          </SelectContent>
        </Select>
      </CardHeader>
      {/* <CardContent className="flex flex-1 justify-center p-0 bg-red-500"> */}
      <CardContent className="flex flex-1 justify-center p-0">
        <ChartContainer
          id={id}
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[230px] "
          // className="mx-auto aspect-square w-full max-h-[150px] max-w-[200px]  bg-green-300"
        >
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={desktopData}
              dataKey="desktop"
              nameKey="month"
              innerRadius={60}
              strokeWidth={5}
              activeIndex={activeIndex}
              activeShape={({ outerRadius = 0, ...props }) => (
                <g>
                  <Sector {...props} outerRadius={outerRadius + 10} />
                  <Sector {...props} outerRadius={outerRadius + 25} innerRadius={outerRadius + 12} />
                </g>
              )}
            >
              <Label
                content={({ viewBox }) =>
                  viewBox && "cx" in viewBox && "cy" in viewBox ? (
                    <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                      <tspan className="fill-foreground text-3xl font-bold">
                        {desktopData[activeIndex].desktop.toLocaleString()}
                      </tspan>
                      <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground">
                        Inspections
                      </tspan>
                    </text>
                  ) : null
                }
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}





const steps = [
  {
    id:1,
    owner: 'Azam Tabora',
    eventName:'Call For PTW',
    description: `Vehicle Inspections Checkup`,
    issuedTime:'12:03 PM'
  },
  {
    id:2,
    owner: 'Bongo ltd Dar',
    eventName: 'Safety Training',
    description: 'Safety Training for all employees',
    issuedTime: '2 days ago'
  },
  {
    id:3,
    owner: 'Mwanza Corp',
    eventName: 'Fire Drill',
    description: 'Monthly fire drill exercise',
    issuedTime: '10:30 AM'
  },
  {
    id:4,
    owner: 'Arusha Inc',
    eventName: 'Health Checkup',
    description: 'Annual health checkup for staff',
    issuedTime: '11:45 AM'
  },
  {
    id:5,
    owner: 'Dodoma Ltd',
    eventName: 'Equipment Maintenance',
    description: 'Routine maintenance of equipment',
    issuedTime: '01:15 PM'
  },
  {
    id:6,
    owner: 'Kigoma Enterprises',
    eventName: 'Emergency Response',
    description: 'Emergency response training',
    issuedTime: '02:30 PM'
  }

  

];

export  function VerticalLinearStepper() {


  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ maxWidth: 288}}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.id}>
            <StepLabel
              optional={
                index === steps.length - 1 ? (
                  <Typography variant="caption">Last step</Typography>
                ) : null
              }
            >
              {/* {step.label} */}
              <div className="flex flex-row items-center gap-3">
                <div className="h-10 w-12 rounded-full p-1 bg-gray-400 items-center justify-center">
                  
                </div>
                <div className="flex flex-row items-center justify-between w-full">
                    <div className="flex flex-col items-center justify-start">
                      <h3 className="font-bold text-slate-500">{step.eventName}</h3>
                      <span className="font-extrabold text-sky-500">{step.owner}</span>
                    
                    </div>
                    <span className="font-bold text-xs text-slate-300">{step.issuedTime}</span>

                </div>
              </div>
            </StepLabel>
            <StepContent>
              <Typography>
                {/* {step.description} */}
                <div className="py-1">
                  <div className="flex leading-tight">
                    <span className="font-bold text-[15px]">Commented on Task <span className="text-gray-400 text-[15px]">{step.description}</span></span>
                  
                  </div>
                  <div className="bg-gray-200 text-slate-500 leading-tight text-[14px] p-3 rounded-md">
                      <span>Ability to work in different Areas and time accordingly</span>
                  </div>

                </div>

              </Typography>
             
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )}
    </Box>
  );
}
