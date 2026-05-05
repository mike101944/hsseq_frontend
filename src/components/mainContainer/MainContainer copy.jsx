import React from "react";

export function MainContainer({ activeModule }) {
  const renderModuleContent = () => {
    const moduleContents = {
      dashboard: (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">HSSEQ Main Dashboard</h2>
            <p className="text-gray-600">Welcome to your HSSEQ Management System. Select a module from the sidebar to get started.</p>
          </div>
          
          {/* Quick stats overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-green-500">
              <h3 className="text-lg font-semibold text-gray-700">Open Incidents</h3>
              <p className="text-3xl font-bold text-gray-900 mt-2">12</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-blue-500">
              <h3 className="text-lg font-semibold text-gray-700">Pending Audits</h3>
              <p className="text-3xl font-bold text-gray-900 mt-2">5</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-yellow-500">
              <h3 className="text-lg font-semibold text-gray-700">Training Due</h3>
              <p className="text-3xl font-bold text-gray-900 mt-2">23</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-red-500">
              <h3 className="text-lg font-semibold text-gray-700">High Risks</h3>
              <p className="text-3xl font-bold text-gray-900 mt-2">3</p>
            </div>
          </div>
        </div>
      ),
      
      incidents: (
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Incidents Management</h2>
          <p className="text-gray-600">Manage and track all safety incidents, near misses, and investigations.</p>
          {/* Incident-specific content will go here */}
        </div>
      ),
      
      audits: (
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Audits Management</h2>
          <p className="text-gray-600">Schedule, conduct, and track internal and external audits.</p>
        </div>
      ),
      
      // Add similar content for other modules...
      training: <div>Training Portal Content</div>,
      compliance: <div>Compliance Management Content</div>,
      monitoring: <div>Monitoring Management Content</div>,
      inspections: <div>Inspections Management Content</div>,
      risk: <div>Risk Management Content</div>,
      reports: <div>Report Management Content</div>
    };

    return moduleContents[activeModule] || moduleContents.dashboard;
  };

  return (
    <div className='flex-1 w-full h-full overflow-y-auto bg-gray-50 p-6'>
      {renderModuleContent()}
    </div>
  );
}