import React from 'react'
import { 
    Training,
    Reports,
    Risk,
    Monitoring,
    Inspections,
    Incidents,
    Audits,
    Complience
 } from '../../pages'

export function MainContainer({ activeModule }) {
  
  const renderModuleContent = () => {
    switch (activeModule) {
      case 'dashboard':
        return (
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h1 className="text-2xl font-bold text-gray-800">HSSEQ Main Dashboard</h1>
            <p className="text-gray-600 mt-2">Welcome to your HSSEQ Management System</p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
              <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-500">
                <h3 className="text-lg font-semibold text-gray-700">Open Incidents</h3>
                <p className="text-3xl font-bold text-gray-900 mt-2">12</p>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
                <h3 className="text-lg font-semibold text-gray-700">Pending Audits</h3>
                <p className="text-3xl font-bold text-gray-900 mt-2">5</p>
              </div>
              
              <div className="bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-500">
                <h3 className="text-lg font-semibold text-gray-700">Training Due</h3>
                <p className="text-3xl font-bold text-gray-900 mt-2">23</p>
              </div>
              
              <div className="bg-red-50 rounded-lg p-4 border-l-4 border-red-500">
                <h3 className="text-lg font-semibold text-gray-700">High Risks</h3>
                <p className="text-3xl font-bold text-gray-900 mt-2">3</p>
              </div>
            </div>
          </div>
        );

      case 'incidents':
        return <Incidents />;

      case 'audits':
        return <Audits />;

      case 'training':
        return <Training />;

      case 'compliance':
        return <Complience />;

      case 'monitoring':
        return <Monitoring />;

      case 'inspections':
        return <Inspections />;

      case 'risk':
        return <Risk />;

      case 'reports':
        return <Reports />;

      default:
        return (
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h1 className="text-2xl font-bold text-gray-800">HSSEQ System</h1>
            <p className="text-gray-600 mt-2">Select a module from the sidebar to get started</p>
          </div>
        );
    }
  };

  return (
    <div className='flex-1 h-full overflow-y-auto bg-gray-50 p-6'>
      {renderModuleContent()}
    </div>
  );
}