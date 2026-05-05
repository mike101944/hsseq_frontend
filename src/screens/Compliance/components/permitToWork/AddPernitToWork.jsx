import React, { useState, useRef, useEffect } from "react";

import { TextField, Button, Box } from "@mui/material";
import { FaImage } from "react-icons/fa6";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import MenuItem from '@mui/material/MenuItem';

export const AddPermitToWork1 = ({ onCancel }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setIsDatePickerOpen(false);
  };

  const handleOpenDatePicker = () => {
    setIsDatePickerOpen(true);
  };

  const handleCloseDatePicker = () => {
    setIsDatePickerOpen(false);
  };

  return (
    <div className="  flex items-center justify-center transition-opacity duration-300 ease-in-out">
      <div className="flex-col   justify-between  rounded-lg  opacity-100">
        <div className="h-12 " />

        {/* <button className="modal-close" onClick={() => setModalOpen(false)}>&times;</button> */}

        <form
          action=""
          className="flex-col flex-wrap gap-4 justify-center items-center bg-white py-5 rounded-lg max-w-[800px]  "
        >
          <span className="flex justify-center rounded-lg text-blue-500 font-serif font-semibold  bg-white items-center px-4 py-2 w-full">
            Permit To work Request Form
          </span>

          <div className="flex flex-wrap">
            {/* left container */}
            <div>
              <div className="flex flex-row sm:flex-row items-center bg-white  px-4 py-2 w-full sm:w-auto">
                <div className="flex flex-row sm:flex-row items-center bg-white  px-4 py-2 w-full sm:w-auto">
                  <TextField
                    label="employee full name"
                    id="outlined-size-small"
                    defaultValue=""
                    size="small"
                    sx={{
                      width: "240px", // Adjust this value to match the other TextField's effective width
                      // Alternatively, you could try:
                      // minWidth: '200px', // If the other TextField has a minWidth
                    }}
                  />
                </div>
              </div>

              <div className="flex flex-row sm:flex-row items-center bg-white  px-4 py-2 w-full sm:w-auto">
                <div className="flex flex-row sm:flex-row items-center bg-white px-4  py-2 w-full sm:w-auto">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Insert Expire Date"
                      name="startDate"
                      size="small"
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          size="small"
                          InputLabelProps={{
                            style: {
                              color: "#d7d7d7", // Label color
                            },
                          }}
                          sx={{
                            width: "270px", // Set the width of the input
                            "& .MuiOutlinedInput-root": {
                              height: "36px", // Set height for the entire input
                              padding: "0px", // Remove extra padding
                              "& .MuiInputBase-input": {
                                padding: "8px 12px", // Adjust internal padding
                                fontSize: "14px",
                              },
                            },
                          }}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </div>
              </div>
            </div>

            {/* right container */}
            <div>
              <div className="flex flex-row sm:flex-row items-center bg-white  px-4 py-2 w-full sm:w-auto">
                <div className="flex flex-row sm:flex-row items-center bg-white px-4  py-2 w-full sm:w-auto">
                  <FilePicker />
                </div>
              </div>

              <div className="flex flex-row sm:flex-row items-center bg-white  px-4 py-2 w-full sm:w-auto">
                <div className="flex flex-row sm:flex-row items-center bg-white px-4  py-2 w-full sm:w-auto">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Insert issue Date"
                      name="startDate"
                      size="small"
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          size="small"
                          InputLabelProps={{
                            style: {
                              color: "#d7d7d7", // Label color
                            },
                          }}
                          sx={{
                            width: "270px", // Set the width of the input
                            "& .MuiOutlinedInput-root": {
                              height: "36px", // Set height for the entire input
                              padding: "0px", // Remove extra padding
                              "& .MuiInputBase-input": {
                                padding: "8px 12px", // Adjust internal padding
                                fontSize: "14px",
                              },
                            },
                          }}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </div>
              </div>
            </div>
          </div>
          {/* last container */}
          <div className="w-full px-7">
            <button
              onClick={onCancel}
              className="flex justify-center rounded-lg text-white font-serif font-semibold  bg-blue-600 items-center px-4 py-2 w-full"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const FilePicker = () => {
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    if (event.target.files?.length) {
      setFileName(event.target.files[0].name);
    }
  };

  const handleClickButton = () => {
    fileInputRef.current.click(); // Programmatically trigger the file input
  };

  return (
    <div>
      <input
        type="file"
        id="file-input"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      <TextField
        label="Attach File"
        value={fileName}
        size="small"
        InputProps={{
          readOnly: true,
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                component="span"
                onClick={handleClickButton}
                sx={{ padding: 0.5 }}
              >
                <FaImage color="gray" size={24} />
              </IconButton>
            </InputAdornment>
          ),
        }}
        InputLabelProps={{
          style: {
            color: "#d7d7d7", // Change 'green' to your desired color
          },
        }}
       className="w-full border p-2 rounded"
      />
    </div>
  );
};







export const AddPermitToWork = ({onCancel}) => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    dob: "",
    address: "",
    pinCode: "",
  });

  const steps = ["1", "2", "3", "4"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => {
    if (step < steps.length - 1) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleSubmit = () => {
    alert("Form submitted successfully! 🎉");
    console.log(formData);
  };


const currencies = [
    {
        value: 'Norbet',
        label: 'Eng. Norbet Kamwendi',
    },
    {
        value: 'John',
        label: 'Mr. John Doe',
    },
    {
        value: 'Jane',
        label: 'Eng. Jane Smith',
    },
    {
        value: 'Alice',
        label: 'Ms. Alice Johnson',
    },
];

const [option, setOption] = useState("one"); 
 

  return (
    <div className="flex items-center justify-center transition-opacity duration-300 ease-in-out mt-3">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        {/* Stepper */}
        <div className="flex justify-between mb-6 font-bold text-lg text-center">
          {steps.map((num, index) => (
            <span
              key={index}
              className={`w-8 h-8 flex items-center justify-center rounded-full ${
                index === step ? "bg-blue-500 text-white" : "bg-gray-300"
              }`}
            >
              {/* {num} */}
            </span>
          ))}
        </div>

        {/* Form Steps */}
        {step === 0 && (
          <div className="flex-col ">

            <div className="flex justify-center items-center py-5">
                <span className="text-blue-500 font-bold">Authorized Personel</span>
            </div>
        
            <TextField
                    label="write name of authorized supervisor"
                    id="outlined-size-small"
                    defaultValue=""
                    size="small"
                    className="w-full border p-2 rounded"
                   
                  />
                  <div className="h-6"/>


    <TextField
          id="outlined-select-currency"
          select
        
          label="Select safety officer "
          defaultValue=""
          size="small"
          className="w-full border p-2 rounded"
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
            
          </div>
        )}

        {step === 1 && (
          <div className="flex-col  ">
            <div className="flex justify-center gap-2 items-center py-5">
                <span className="text-blue-500 font-bold">Task Description</span>
                <span className="text-blue-500 font-bold">and Scope of work</span>
            </div>
             <TextField
                    label="Describe Task in details"
                    id="outlined-size-small"
                    defaultValue=""
                    size="small"
                    className="w-full border p-2 rounded"
                    multiline
                    rows={3}
                   
                  />
                  <div className="h-6"/>
            <TextField
                    label="Specify the work area or process"
                    id="outlined-size-small"
                    defaultValue=""
                    size="small"
                    className="w-full border p-2 rounded"
                    multiline
                    rows={2}
                   
                  />
          </div>
        )}

        {step === 2 && (
          <div className="flex-col  ">
          <div className="flex justify-center gap-2 items-center py-5">
              <span className="text-blue-500 font-bold">Risk Assessment</span>
              
          </div>

          <div className="mb-4">
        <label className="mr-4">
          <input
            type="radio"
            value="one"
            checked={option === "one"}
            onChange={(e) => setOption(e.target.value)}
            className="mr-2"
          />
          Use File
        </label>
        <label>
          <input
            type="radio"
            value="two"
            checked={option === "two"}
            onChange={(e) => setOption(e.target.value)}
            className="mr-2"
          />
          Dont have file
        </label>
      </div>
      {option === "one" && (
            <FilePicker />
      )}
        
          <div className="h-6"/>

          {option === "two" &&(

            <div>

                
                <TextField
                    label="write safety equipments"
                    id="outlined-size-small"
                    defaultValue=""
                    size="small"
                    className="w-full border p-2 rounded"
                    multiline
                    rows={2}
                  
                  />
                  <div className="h-6"/>

                  <TextField
                    label="write hazard identification"
                    id="outlined-size-small"
                    defaultValue=""
                    size="small"
                    className="w-full border p-2 rounded"
                    multiline
                    rows={2}
                  
                  />
                  <div className="h-6"/>

                  <TextField
                    label="write specific safety procedures"
                    id="outlined-size-small"
                    defaultValue=""
                    size="small"
                    className="w-full border p-2 rounded"
                    multiline
                    rows={2}
                  
                  />
                  <div className="h-6"/>
                  <TextField
                    label="write control measures"
                    id="outlined-size-small"
                    defaultValue=""
                    size="small"
                    className="w-full border p-2 rounded"
                    multiline
                    rows={2}
                  
                  />

            </div>

          )}

          
            
          </div>
        )}

        {step === 3 && (
          <div className="flex-col  ">
          <div className="flex justify-center gap-2 items-center py-5">
              <span className="text-blue-500 font-bold">Emergence Procedures</span>
              
          </div>
          <TextField
                    label="Write emergency control"
                    id="outlined-size-small"
                    defaultValue=""
                    size="small"
                    className="w-full border p-2 rounded"
                    multiline
                    rows={1}
                   
                  />
                  <div className="h-6"/>
            <TextField
                    label="write evacution plan"
                    id="outlined-size-small"
                    defaultValue=""
                    size="small"
                    className="w-full border p-2 rounded"
                    multiline
                    rows={1}
                   
                  />
                    <div className="h-6"/>
                  <div className="flex items-center gap-4 pr-7">
                    <span className="font-serif text-slate-500 font-bold text-xs">Have you use First Aid</span>
                    <input type="checkbox" />

                  </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-4">
          {step > 0 && (
            <button
              onClick={prevStep}
              className="px-4 py-2 bg-gray-500 text-white rounded"
            >
              Previous
            </button>
          )}

          {step < steps.length - 1 ? (
            <button
              onClick={nextStep}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Next
            </button>
          ) : (
            <button
              onClick={onCancel}
              className="px-6 py-2 bg-sky-800 text-white rounded"
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};



