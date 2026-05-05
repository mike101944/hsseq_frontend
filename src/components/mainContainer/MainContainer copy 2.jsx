import React from 'react'
import { Routes,Route } from 'react-router-dom'
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


function MainContainer() {
  return (
    <Routes>
       <Routes>
        {/* Main Dashboard Route */}
        <Route path="/" element={<DefaultDashboard />} />
        
        {/* Training Module Routes */}
        <Route path="/training" element={<DefaultDashboard />} />
        <Route path="/training/list" element={<DefaultDashboard />} />
        <Route path="/training/create" element={<DefaultDashboard />} />
        <Route path="/training/reports" element={<DefaultDashboard />} />
        
        {/* Incidents Module Routes */}
        <Route path="/incidents" element={<DefaultDashboard />} />
        <Route path="/incidents/list" element={<DefaultDashboard />} />
        <Route path="/incidents/create" element={<DefaultDashboard />} />
        <Route path="/incidents/analysis" element={<DefaultDashboard />} />
        
        {/* Monitoring Module Routes */}
        <Route path="/monitoring" element={<DefaultDashboard />} />
        <Route path="/monitoring/dashboard" element={<DefaultDashboard />} />
        <Route path="/monitoring/alerts" element={<DefaultDashboard />} />
        <Route path="/monitoring/reports" element={<DefaultDashboard />} />
        
        {/* Other modules without sub-items */}
        <Route path="/audits" element={<DefaultDashboard />} />
        <Route path="/compliance" element={<DefaultDashboard />} />
        <Route path="/inspections" element={<DefaultDashboard />} />
        <Route path="/risk" element={<DefaultDashboard />} />
        <Route path="/reports" element={<DefaultDashboard />} />
      </Routes>
    </Routes>
  )
}

export default MainContainer