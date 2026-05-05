import React, { useEffect } from 'react'
import { Routes, Route ,useLocation,Navigate } from 'react-router-dom'
import {  connect } from 'react-redux';
import {checkAuth} from '../../redux/action/authActions'
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
    Dashboard,
    Jmp,
    Register,
    Login,
    ForgotPassword,
    ResetPassword

 } from '../../pages'
 import { Home, ChevronRight } from "lucide-react";

 import { getPageTitle,getBreadcrumb } from '../navbar/navigationUtils'


export function MainContainer({ activeModule, isAuthenticated, loading, checkAuth
 }) {



  useEffect(() => {
    // Check authentication on app load
    checkAuth();
  }, [checkAuth]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600">Loading ................</div>
      </div>
    );
  }

  const location = useLocation();
  const path = location.pathname;




  return (
    <div className='flex-1 h-full overflow-y-auto bg-gray-50 px-3 py-6'>
      <div className="w-full bg-transparent px-6 py-1">
  <div className="flex flex-col md:flex-row md:items-center justify-between w-full gap-3">
    
    {/* Breadcrumb */}
    <nav className="text-sm text-gray-600">
      <ol className="flex items-center space-x-2">
        <li className="flex items-center">
          <a href="/" className="hover:text-amber-700 transition-colors">Home</a>
          <ChevronRight className="w-4 h-4 mx-2" />
        </li>
        <li className="text-gray-900 font-medium">
          {getPageTitle(path)}
          
        </li>
      </ol>
    </nav>
    
    {/* Page Title - Right Aligned */}
    <div className="ml-auto text-right">
      <h1 className="text-2xl font-bold text-gray-900">
        {getPageTitle(path)}
      </h1>
      <p className="text-gray-600 mt-1 text-sm">
        {/* {getBreadcrumb(path).join(' • ')} */}
        {getBreadcrumb(path)}
      </p>
    </div>
    
  </div>
</div>
{/* return <>{ currentUser ? <SignedInStack/>   : <SignedOutStack/>}</> */}
      <Routes>
        {/* Public Routes */}
        {/* <Route path="/" element={<Dashboard /> } /> */}
        <Route path="/login" element={
          isAuthenticated? <Navigate to="/dashboard" replace/> : <Login />} />

        {/* JMP Module Routes */}
        <Route path="/jmp" element={<Jmp />} />

         {/* Auth Module Routes */}
         <Route path="/register" element={<Register />} />
         
         <Route path="/resetPassword" element={<ResetPassword />} />
         <Route path="/forgot" element={<ForgotPassword />} />


        {/* Training Module Routes */}
        <Route path="/training" element={<Training />} />
        <Route path="/training/list" element={<Training />} />
        <Route path="/training/create" element={<Training />} />
        <Route path="/training/reports" element={<Training />} />
        
        {/* Incidents Module Routes */}
        <Route path="/incidents" element={<Incidents />} />
        <Route path="/incidents/list" element={<Incidents />} />
        <Route path="/incidents/create" element={<Incidents />} />
        <Route path="/incidents/analysis" element={<Incidents />} />
        
        {/* Monitoring Module Routes */}
        <Route path="/monitoring" element={<Monitoring />} />
        <Route path="/monitoring/dashboard" element={<Monitoring />} />
        <Route path="/monitoring/alerts" element={<Monitoring />} />
        <Route path="/monitoring/reports" element={<Monitoring />} />
        
        {/* Other modules without sub-items */}
        <Route path="/audits" element={<Audits />} />
        <Route path="/compliance" element={<Complience />} />
        <Route path="/inspections" element={<Inspections />} />
        <Route path="/jmp" element={<Jmp />} />
        <Route path="/reports" element={<Reports />} />
        
        {/* Fallback route */}
        <Route path="*" element={<div>Page not found</div>} />
      </Routes>
    </div>
  )
}