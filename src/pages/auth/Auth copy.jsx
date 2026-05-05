// Auth.jsx
import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import {LoginForm} from './login/LoginForm';
import {RegisterForm} from './register/RegisterForm';
import { Shield} from 'lucide-react';

export const Auth = () => {
  const location = useLocation();
  const isRegisterPage = location.pathname === '/register';
 

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Side - Brand/Content Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-emerald-900 to-emerald-800 text-white p-12 flex-col justify-between">
        {/* Sawa na left side ya login yako */}
        {/* ... */}
      </div>

      {/* Right Side - Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center mb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-emerald-100 rounded-xl">
                <Shield size={28} className="text-emerald-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">HSSEQ</h1>
                <p className="text-gray-600 text-sm">Management System</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl lg:shadow-none lg:border-none border border-gray-100 shadow-lg p-8">
            {/* Routes */}
            <Routes>
              <Route path="/login" element={<LoginForm />} />
              <Route path="/register" element={<RegisterForm />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

