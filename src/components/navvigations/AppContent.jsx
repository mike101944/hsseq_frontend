import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { connect } from 'react-redux';
import { checkAuth } from '../../redux/action/authActions';

// Import Pages
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

  ForgotPassword,
  ResetPassword,
  Auth
} from '../../pages';

// App Component with Redux connect
const AppContent = ({ isAuthenticated, loading, checkAuth }) => {
  useEffect(() => {
    // Check authentication on app load
    checkAuth();
  }, [checkAuth]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Public Routes - No Layout */}
        <Route path="/login" element={
          isAuthenticated ? <Navigate to="/dashboard" replace /> : <Auth />
        } />
        
        <Route path="/register" element={
          isAuthenticated ? <Navigate to="/dashboard" replace /> : <Auth />
        } />
        
        <Route path="/forgot" element={
          isAuthenticated ? <Navigate to="/dashboard" replace /> : <ForgotPassword />
        } />
        
        <Route path="/resetPassword" element={
          isAuthenticated ? <Navigate to="/dashboard" replace /> : <ResetPassword />
        } />

        {/* Protected Routes - With DefaultDashboard Layout */}
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} loading={loading} />}>
          <Route element={<DefaultDashboard />}>
            {/* Dashboard */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            
            {/* JMP Module */}
            <Route path="/jmp" element={<Jmp />} />
            
            {/* Training Module */}
            <Route path="/training" element={<Navigate to="/training/list" replace />} />
            <Route path="/training/list" element={<Training />} />
            <Route path="/training/create" element={<Training />} />
            <Route path="/training/reports" element={<Training />} />
            
            {/* Incidents Module */}
            <Route path="/incidents" element={<Navigate to="/incidents/list" replace />} />
            <Route path="/incidents/list" element={<Incidents />} />
            <Route path="/incidents/create" element={<Incidents />} />
            <Route path="/incidents/analysis" element={<Incidents />} />
            
            {/* Monitoring Module */}
            <Route path="/monitoring" element={<Navigate to="/monitoring/dashboard" replace />} />
            <Route path="/monitoring/dashboard" element={<Monitoring />} />
            <Route path="/monitoring/alerts" element={<Monitoring />} />
            <Route path="/monitoring/reports" element={<Monitoring />} />
            
            {/* Other modules */}
            <Route path="/audits" element={<Audits />} />
            <Route path="/compliance" element={<Complience />} />
            <Route path="/inspections" element={<Inspections />} />
            <Route path="/reports" element={<Reports />} />
          </Route>
        </Route>

        {/* 404 Route */}
        <Route 
  path="*" 
  element={
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center p-6'>
      <div className='text-center max-w-md'>
        {/* Error Number */}
        <div className='text-9xl font-bold text-emerald-500 opacity-20 mb-4'>
          404
        </div>
        
        {/* Icon/Illustration */}
        <div className='mb-8'>
          <div className='w-24 h-24 mx-auto bg-emerald-100 rounded-full flex items-center justify-center mb-4'>
            <svg className="w-12 h-12 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
        </div>
        
        {/* Title */}
        <h1 className='text-3xl font-bold text-gray-800 mb-3'>
          Oops! Page Not Found
        </h1>
        
        {/* Description */}
        <p className='text-gray-600 mb-8'>
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        
        {/* Back Button */}
        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
          <button
            onClick={() => window.history.back()}
            className='px-6 py-3 bg-emerald-500 text-white font-medium rounded-lg hover:bg-emerald-600 transition duration-200 shadow-md hover:shadow-lg'
          >
            Go Back
          </button>
          
          <button
            onClick={() => window.location.href = '/'}
            className='px-6 py-3 bg-white text-emerald-500 font-medium rounded-lg border border-emerald-300 hover:bg-emerald-50 transition duration-200'
          >
            Go to Homepage
          </button>
        </div>
        
        {/* Search Suggestion */}
        <div className='mt-12 pt-8 border-t border-gray-200'>
          <p className='text-gray-500 text-sm mb-3'>Can't find what you're looking for?</p>
          <div className='flex items-center max-w-md mx-auto bg-white rounded-full border border-gray-300 px-4 py-2'>
            <input
              type="text"
              placeholder="Search our site..."
              className='flex-1 outline-none bg-transparent text-gray-700'
            />
            <button className='text-emerald-500 hover:text-emerald-600'>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  } 
/>
      </Routes>
    </Router>
  );
};

// Protected Route Component (STANDALONE - not connected)
const ProtectedRoute = ({ isAuthenticated, loading }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600">
          Authenticating...
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

// Connect AppContent to Redux
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
});

const mapDispatchToProps = {
  checkAuth,
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContent);