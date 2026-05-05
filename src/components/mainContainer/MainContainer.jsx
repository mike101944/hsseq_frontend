import React from 'react';
import { useLocation } from 'react-router-dom';
import { ChevronRight } from "lucide-react";
import { getPageTitle, getBreadcrumb } from '../navbar/navigationUtils';

export function MainContainer({ activeModule, children }) {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div className='flex-1 h-full overflow-y-auto bg-gray-50 px-0 py-6'>
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
            <h1 className="text-sm font-bold text-gray-900">
              {getPageTitle(path)}
            </h1>
            <p className="text-gray-600 mt-1 text-sm">
              {getBreadcrumb(path)}
            </p>
          </div>
          
        </div>
      </div>
      
      {/* Page Content - Render children or Outlet content */}
      <div className="px-3 py-4">
        {children}
      </div>
    </div>
  );
}