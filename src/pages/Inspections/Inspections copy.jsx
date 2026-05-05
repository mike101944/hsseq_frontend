import React, { useState, useEffect } from 'react';
import {
  CheckCircle, XCircle, Camera, AlertTriangle,
  Calendar, Clock, Search, Filter, Plus, Download,
  BarChart2, Bell, Settings, User, Shield
} from 'lucide-react';

// Mock data for assets
const assets = [
  { id: 'AST-001', name: 'Fire Extinguisher', location: 'Floor 1 - North Wing', type: 'Safety Equipment' },
  { id: 'AST-002', name: 'Forklift #3', location: 'Warehouse A', type: 'Vehicle' },
  { id: 'AST-003', name: 'Electrical Panel B', location: 'Basement', type: 'Electrical' },
  { id: 'AST-004', name: 'Scaffolding Set', location: 'Construction Area', type: 'Construction' },
  { id: 'AST-005', name: 'Company Van', location: 'Parking Lot', type: 'Vehicle' },
];

// Mock inspection templates
const inspectionTemplates = [
  { id: 1, name: 'Daily Safety Round', frequency: 'daily', estimatedTime: '30 min' },
  { id: 2, name: 'Fire Extinguisher Check', frequency: 'monthly', estimatedTime: '15 min' },
  { id: 3, name: 'Vehicle Inspection', frequency: 'weekly', estimatedTime: '45 min' },
  { id: 4, name: 'Electrical Safety Check', frequency: 'monthly', estimatedTime: '60 min' },
];


// Using device camera
// const captureRealImage = async () => {
//   const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  // Implement camera capture logic
// };

// const sendEmergencyAlert = async (inspectionData) => {
//   await fetch('/api/emergency-alert', {
//     method: 'POST',
//     body: JSON.stringify(inspectionData)
//   });
// };

export const Inspections = () => {
  const [inspections, setInspections] = useState([
    { 
      id: 'INS-001', 
      assetId: 'AST-001',
      assetName: 'Fire Extinguisher',
      type: 'Equipment-Specific',
      date: '2024-01-15',
      time: '09:30',
      inspector: 'John Doe',
      status: 'completed',
      result: 'pass',
      priority: 'medium'
    },
    { 
      id: 'INS-002', 
      assetId: 'AST-002',
      assetName: 'Forklift #3',
      type: 'Ad-hoc',
      date: '2024-01-14',
      time: '14:15',
      inspector: 'Jane Smith',
      status: 'completed',
      result: 'fail',
      priority: 'high'
    },
    { 
      id: 'INS-003', 
      assetId: 'AST-005',
      assetName: 'Company Van',
      type: 'Daily Round',
      date: '2024-01-15',
      time: '08:00',
      inspector: 'Robert Chen',
      status: 'in-progress',
      result: null,
      priority: 'low'
    },
  ]);

  const [activeTab, setActiveTab] = useState('daily');
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [showNewInspection, setShowNewInspection] = useState(false);
  const [inspectionForm, setInspectionForm] = useState({
    type: 'daily',
    assetId: '',
    checklist: [],
    notes: '',
    images: [],
    emergencyContact: false
  });

  const [capturedImage, setCapturedImage] = useState(null);

  // Stats calculation
  const stats = {
    total: inspections.length,
    completed: inspections.filter(i => i.status === 'completed').length,
    pending: inspections.filter(i => i.status === 'pending').length,
    passed: inspections.filter(i => i.result === 'pass').length,
    failed: inspections.filter(i => i.result === 'fail').length,
  };

  const handleStartInspection = (type) => {
    setShowNewInspection(true);
    setInspectionForm({
      ...inspectionForm,
      type: type
    });
  };

  const handleAssetSelect = (assetId) => {
    const asset = assets.find(a => a.id === assetId);
    setSelectedAsset(asset);
    setInspectionForm({
      ...inspectionForm,
      assetId: assetId
    });
  };

  const handleChecklistToggle = (itemId) => {
    const updatedChecklist = inspectionForm.checklist.includes(itemId)
      ? inspectionForm.checklist.filter(id => id !== itemId)
      : [...inspectionForm.checklist, itemId];
    
    setInspectionForm({
      ...inspectionForm,
      checklist: updatedChecklist
    });
  };

  const captureImage = () => {
    // In a real app, this would use the device camera
    const mockImage = {
      id: Date.now(),
      url: `https://picsum.photos/seed/${Date.now()}/400/300`,
      timestamp: new Date().toISOString(),
      caption: ''
    };
    setCapturedImage(mockImage);
    setInspectionForm({
      ...inspectionForm,
      images: [...inspectionForm.images, mockImage]
    });
  };

  const handleSubmitInspection = (result) => {
    const newInspection = {
      id: `INS-${String(inspections.length + 1).padStart(3, '0')}`,
      assetId: inspectionForm.assetId,
      assetName: selectedAsset?.name || 'Unknown Asset',
      type: inspectionForm.type === 'daily' ? 'Daily Round' : 
            inspectionForm.type === 'ad-hoc' ? 'Ad-hoc' : 'Equipment-Specific',
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      inspector: 'Current User',
      status: 'completed',
      result: result,
      priority: result === 'fail' ? 'high' : 'low'
    };

    setInspections([newInspection, ...inspections]);
    
    // Trigger emergency alert if failed
    if (result === 'fail' && inspectionForm.emergencyContact) {
      triggerEmergencyAlert(newInspection);
    }

    setShowNewInspection(false);
    setInspectionForm({
      type: 'daily',
      assetId: '',
      checklist: [],
      notes: '',
      images: [],
      emergencyContact: false
    });
  };

  const triggerEmergencyAlert = (inspection) => {
    alert(`🚨 EMERGENCY ALERT SENT!\n\nInspection ${inspection.id} failed for ${inspection.assetName}\nSMS/Email sent to management team.`);
    
    // In a real app, this would call an API endpoint to send notifications
    console.log('Emergency alert triggered:', {
      inspectionId: inspection.id,
      asset: inspection.assetName,
      timestamp: new Date().toISOString(),
      contacts: ['safety@company.com', '+255123456789']
    });
  };

  const QuickActionButton = ({ icon: Icon, label, onClick, color = 'blue' }) => (
    <button
      onClick={onClick}
      className={`
        flex flex-col items-center justify-center p-4 rounded-xl
        bg-white hover:shadow-lg transition-all duration-200
        border border-gray-200 hover:border-${color}-500
        min-w-[120px]
      `}
    >
      <div className={`p-3 rounded-full bg-${color}-50 text-${color}-600 mb-2`}>
        <Icon size={24} />
      </div>
      <span className="text-sm font-medium text-gray-700">{label}</span>
    </button>
  );

  const StatusBadge = ({ status, result }) => {
    if (status === 'in-progress') {
      return (
        <span className="px-3 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
          In Progress
        </span>
      );
    }
    
    return result === 'pass' ? (
      <span className="px-3 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full flex items-center gap-1">
        <CheckCircle size={12} /> Pass
      </span>
    ) : (
      <span className="px-3 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full flex items-center gap-1">
        <XCircle size={12} /> Fail
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Shield className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Inspection Management</h1>
                <p className="text-gray-600 text-sm">
                  Physical Checks for Daily/Weekly/Monthly Safety Assurance
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative p-2 text-gray-600 hover:text-gray-900">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <Settings size={20} />
              </button>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <User size={16} className="text-blue-600" />
                </div>
                <span className="text-sm font-medium">Safety Officer</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="px-6 py-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Inspections</p>
                <p className="text-2xl font-bold mt-1">{stats.total}</p>
              </div>
              <BarChart2 className="text-blue-600" size={24} />
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-bold mt-1">{stats.completed}</p>
              </div>
              <CheckCircle className="text-green-600" size={24} />
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Passed</p>
                <p className="text-2xl font-bold mt-1">{stats.passed}</p>
              </div>
              <CheckCircle className="text-green-600" size={24} />
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Failed</p>
                <p className="text-2xl font-bold mt-1 text-red-600">{stats.failed}</p>
              </div>
              <XCircle className="text-red-600" size={24} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Quick Actions & Templates */}
          <div className="lg:col-span-2">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl p-6 shadow-sm border mb-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock size={16} />
                  <span>Today: {new Date().toLocaleDateString('en-GB')}</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <QuickActionButton
                  icon={Calendar}
                  label="Daily Round"
                  color="blue"
                  onClick={() => handleStartInspection('daily')}
                />
                <QuickActionButton
                  icon={CheckCircle}
                  label="Equipment Check"
                  color="green"
                  onClick={() => handleStartInspection('equipment')}
                />
                <QuickActionButton
                  icon={AlertTriangle}
                  label="Ad-hoc Inspection"
                  color="orange"
                  onClick={() => handleStartInspection('ad-hoc')}
                />
                <QuickActionButton
                  icon={Camera}
                  label="Report Issue"
                  color="red"
                  onClick={captureImage}
                />
              </div>
            </div>

            {/* Recent Inspections */}
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Recent Inspections</h2>
                <button className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1">
                  <Download size={16} />
                  Export
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-sm text-gray-600 border-b">
                      <th className="pb-3">ID</th>
                      <th className="pb-3">Asset</th>
                      <th className="pb-3">Type</th>
                      <th className="pb-3">Date & Time</th>
                      <th className="pb-3">Inspector</th>
                      <th className="pb-3">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inspections.map((inspection) => (
                      <tr key={inspection.id} className="border-b hover:bg-gray-50">
                        <td className="py-4">
                          <span className="font-medium text-gray-900">{inspection.id}</span>
                        </td>
                        <td className="py-4">
                          <div>
                            <div className="font-medium">{inspection.assetName}</div>
                            <div className="text-xs text-gray-500">{inspection.assetId}</div>
                          </div>
                        </td>
                        <td className="py-4">
                          <span className="text-sm text-gray-700">{inspection.type}</span>
                        </td>
                        <td className="py-4">
                          <div className="text-sm">
                            <div>{inspection.date}</div>
                            <div className="text-gray-500">{inspection.time}</div>
                          </div>
                        </td>
                        <td className="py-4">
                          <span className="text-sm">{inspection.inspector}</span>
                        </td>
                        <td className="py-4">
                          <StatusBadge status={inspection.status} result={inspection.result} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Column - Asset List & Templates */}
          <div>
            {/* Available Assets */}
            <div className="bg-white rounded-xl p-6 shadow-sm border mb-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Available Assets</h2>
                <Search size={18} className="text-gray-400" />
              </div>
              
              <div className="space-y-3">
                {assets.map((asset) => (
                  <div
                    key={asset.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                      selectedAsset?.id === asset.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                    }`}
                    onClick={() => handleAssetSelect(asset.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">{asset.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">{asset.location}</p>
                        <span className="inline-block mt-2 px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                          {asset.type}
                        </span>
                      </div>
                      <span className="text-sm font-mono text-gray-500">{asset.id}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Inspection Templates */}
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Inspection Templates</h2>
              
              <div className="space-y-4">
                {inspectionTemplates.map((template) => (
                  <div
                    key={template.id}
                    className="p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">{template.name}</h3>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="text-sm px-2 py-1 bg-gray-100 rounded">
                            {template.frequency}
                          </span>
                          <span className="text-sm text-gray-600 flex items-center gap-1">
                            <Clock size={12} />
                            {template.estimatedTime}
                          </span>
                        </div>
                      </div>
                      <button className="text-blue-600 hover:text-blue-800">
                        <Plus size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* New Inspection Modal */}
      {showNewInspection && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">New Inspection</h2>
                <button
                  onClick={() => setShowNewInspection(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              {/* Asset Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Asset
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {assets.map((asset) => (
                    <button
                      key={asset.id}
                      onClick={() => handleAssetSelect(asset.id)}
                      className={`p-3 rounded-lg border text-left ${
                        inspectionForm.assetId === asset.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="font-medium">{asset.name}</div>
                      <div className="text-sm text-gray-600">{asset.id}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Checklist Section */}
              {selectedAsset && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Checklist Items
                  </label>
                  <div className="space-y-2">
                    {['Pressure gauge in green zone', 'Safety pin intact', 'No visible damage', 'Accessible location', 'Last service date valid'].map((item, index) => (
                      <label key={index} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50">
                        <input
                          type="checkbox"
                          checked={inspectionForm.checklist.includes(index)}
                          onChange={() => handleChecklistToggle(index)}
                          className="rounded text-blue-600"
                        />
                        <span className="text-sm">{item}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Image Capture */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Attach Images
                </label>
                <div className="flex flex-wrap gap-3">
                  {inspectionForm.images.map((img) => (
                    <div key={img.id} className="relative">
                      <img
                        src={img.url}
                        alt="Inspection"
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                    </div>
                  ))}
                  <button
                    onClick={captureImage}
                    className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-400 hover:text-gray-600 hover:border-gray-400"
                  >
                    <Camera size={24} />
                    <span className="text-xs mt-2">Add Photo</span>
                  </button>
                </div>
              </div>

              {/* Emergency Alert Option */}
              <div className="mb-6">
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={inspectionForm.emergencyContact}
                    onChange={(e) => setInspectionForm({
                      ...inspectionForm,
                      emergencyContact: e.target.checked
                    })}
                    className="rounded text-red-600"
                  />
                  <div>
                    <span className="font-medium text-gray-900">Send emergency alert on failure</span>
                    <p className="text-sm text-gray-600">
                      Will send SMS/Email to management team immediately
                    </p>
                  </div>
                </label>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => handleSubmitInspection('pass')}
                  className="flex-1 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 flex items-center justify-center gap-2"
                >
                  <CheckCircle size={20} />
                  Mark as Pass
                </button>
                <button
                  onClick={() => handleSubmitInspection('fail')}
                  className="flex-1 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 flex items-center justify-center gap-2"
                >
                  <XCircle size={20} />
                  Mark as Fail
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

