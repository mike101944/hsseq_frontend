import React, { useState, useRef, useEffect } from "react";

import { TextField, Button, Box } from "@mui/material";
import { FaImage } from "react-icons/fa6";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";




export const AddCompanyCertificates = ({ onCancel }) => {
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
            Add Company Certificate
          </span>

          <div className="flex flex-wrap">
            {/* left container */}
            <div>
              <div className="flex flex-row sm:flex-row items-center bg-white  px-4 py-2 w-full sm:w-auto">
                <div className="flex flex-row sm:flex-row items-center bg-white  px-4 py-2 w-full sm:w-auto">
                  <TextField
                    label="company name"
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
        sx={{
          width: "240px", // Adjust this value to match the other TextField's effective width
          // Alternatively, you could try:
          // minWidth: '200px', // If the other TextField has a minWidth
        }}
      />
    </div>
  );
};
