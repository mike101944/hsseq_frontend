import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { 
    DefaultDashboard,
    Training,
    Reports,
    Risk,
    Monitoring,
    Inspections,
    Incidents,
    Audits,
    Complience,
    Dashboard
 } from '../../pages'

export function MainContainer({ activeModule }) {
  return (
    <div className='flex-1 h-full overflow-y-auto bg-gray-50 p-6'>
      <Routes>
        {/* Main Dashboard Route */}
        <Route path="/" element={<div className="bg-white rounded-lg p-6 shadow-sm">
          <h1 className="text-2xl font-bold text-gray-800">HSSEQ Main Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome to your HSSEQ Management System</p>
        </div>} />
        
        {/* Training Module Routes */}
        <Route path="/training" element={<Training />} />
        {/* <Route path="/training/list" element={<Training />} />
        <Route path="/training/create" element={<Training />} />
        <Route path="/training/reports" element={<Training />} /> */}
        
        {/* Incidents Module Routes */}
        <Route path="/incidents" element={<Incidents />} />
        {/* <Route path="/incidents/list" element={<Incidents />} />
        <Route path="/incidents/create" element={<Incidents />} />
        <Route path="/incidents/analysis" element={<Incidents />} /> */}
        
        {/* Monitoring Module Routes */}
        <Route path="/monitoring" element={<Monitoring />} />
        {/* <Route path="/monitoring/dashboard" element={<Monitoring />} />
        <Route path="/monitoring/alerts" element={<Monitoring />} />
        <Route path="/monitoring/reports" element={<Monitoring />} /> */}
        
        {/* Other modules without sub-items */}
        {/* <Route path="/audits" element={<Audits />} />
        <Route path="/compliance" element={<Complience />} />
        <Route path="/inspections" element={<Inspections />} />
        <Route path="/risk" element={<Risk />} />
        <Route path="/reports" element={<Reports />} /> */}
        
        {/* Fallback route */}
        <Route path="*" element={<div>Page not found</div>} />
      </Routes>
    </div>
  )
}