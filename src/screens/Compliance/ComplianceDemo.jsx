import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField } from "@mui/material";




export const ComplianceDemo = () => {
  const [isAddingNewDocument, setIsAddingNewDocument] = useState(false);
  const [documents, setDocuments] = useState([
    { id: 1, name: "Company Certificate", owner: "John Doe", approval: "HSEQ.M", expiry: "12-12-2022", status: "active" },
    { id: 2, name: "Tax Certificate", owner: "Jane Smith", approval: "Finance", expiry: "01-05-2023", status: "active" }
  ]);



  const handleAddDocumentClick = () => {
    setIsAddingNewDocument(true);
  };


  const handleSaveDocument = () => {
    setDocuments([...documents, { id: Date.now(), name: "New Document", owner: "Admin", approval: "Pending", expiry: "N/A", status: "active" }]);
    setIsAddingNewDocument(false);
  };

  const handleCancelAddDocument = () => {
    setIsAddingNewDocument(false);
  };

  return (
    <div className="relative max-w-[800px] min-w-[800px] mx-auto p-6 bg-white rounded-md shadow-md overflow-hidden">
         <button onClick={handleAddDocumentClick} className="bg-blue-500 w-[300px] text-white px-4 py-2 rounded">
          {isAddingNewDocument ? "Add New Document" : "View All users"}
      </button>
      <div className="w-full overflow-hidden">
        <AnimatePresence mode="wait">
          {!isAddingNewDocument && (
            <motion.div
              key="documentList"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <DocumentList documents={documents} />
            </motion.div>
          )}

          {isAddingNewDocument && (
            <motion.div
              key="addDocumentForm"

              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}

            //   initial={{ scale: 0.8, opacity: 0 }}
            // animate={{ scale: 1, opacity: 1 }}
            // exit={{ scale: 0.8, opacity: 0 }}


            // transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <AddDocumentForm onSave={handleSaveDocument} onCancel={handleCancelAddDocument} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}



const AddDocumentForm = ({ onSave, onCancel }) => (
  <div className="mt-4 p-6 bg-gray-100 rounded-lg shadow-md w-full">
    <h2 className="text-lg font-semibold mb-4">welcomDocument</h2>
    {/* Your form input fields here */}

    <div className="max-w-xs">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="insert date"
      renderInput={(params) => (
    <TextField
      {...params}
      size="small"
      sx={{
        fontSize: 14, // As you have
        '& .MuiInputBase-root': {
          paddingTop: '6px',   // Adjust top padding
          paddingBottom: '6px',// Adjust bottom padding
        },
      }}
    />
  )}
/>
      </LocalizationProvider>
    </div>
    <button onClick={onSave} className="bg-blue-500 text-white px-4 py-2 rounded mt-4">Save</button>
    <button onClick={onCancel} className="ml-2 text-gray-600">Cancel</button>
  </div>
);

const DocumentList = ({ documents }) => (
  <div className="mt-4 overflow-x-auto">
    <table className="w-full border border-gray-200">
      <thead className="bg-gray-100">
        <tr>
          <th className="py-2 px-4 border">Document Name</th>
          <th className="py-2 px-4 border">Owner</th>
          <th className="py-2 px-4 border">Approval</th>
          <th className="py-2 px-4 border">Expiry</th>
          <th className="py-2 px-4 border">Status</th>
        </tr>
      </thead>
      <tbody>
        {documents.map((doc) => (
          <tr key={doc.id} className="text-center border">
            <td className="py-2 px-4 border">{doc.name}</td>
            <td className="py-2 px-4 border">{doc.owner}</td>
            <td className="py-2 px-4 border">{doc.approval}</td>
            <td className="py-2 px-4 border">{doc.expiry}</td>
            <td className="py-2 px-4 border">{doc.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
