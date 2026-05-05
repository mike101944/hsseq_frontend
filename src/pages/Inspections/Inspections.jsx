import React, { useState } from 'react';

import {
  CheckCircle, XCircle, Camera, AlertTriangle,
  Calendar, Clock, Search, Filter, Plus, Download,
  BarChart2, Bell, Settings, User, Shield, Eye,
  FileText, MessageSquare, Printer, Share2, Edit,
  MapPin, Tag, Battery, Thermometer, Zap, HardHat,
  ChevronRight, ExternalLink
} from 'lucide-react';


// Mock data for assets
const assets = [
  { id: 'AST-001', name: 'Fire Extinguisher', location: 'Floor 1 - North Wing', type: 'Safety Equipment', status: 'active' },
  { id: 'AST-002', name: 'Forklift #3', location: 'Warehouse A', type: 'Vehicle', status: 'maintenance' },
  { id: 'AST-003', name: 'Electrical Panel B', location: 'Basement', type: 'Electrical', status: 'active' },
  { id: 'AST-004', name: 'Scaffolding Set', location: 'Construction Area', type: 'Construction', status: 'inactive' },
  { id: 'AST-005', name: 'Company Van', location: 'Parking Lot', type: 'Vehicle', status: 'active' },
];

// Mock inspection templates
const inspectionTemplates = [
  { id: 1, name: 'Daily Safety Round', frequency: 'daily', estimatedTime: '30 min', items: 12 },
  { id: 2, name: 'Fire Extinguisher Check', frequency: 'monthly', estimatedTime: '15 min', items: 8 },
  { id: 3, name: 'Vehicle Inspection', frequency: 'weekly', estimatedTime: '45 min', items: 15 },
  { id: 4, name: 'Electrical Safety Check', frequency: 'monthly', estimatedTime: '60 min', items: 20 },
];

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
      inspectorId: 'EMP-001',
      status: 'completed',
      result: 'pass',
      priority: 'medium',
      notes: 'All safety checks passed. Pressure gauge shows optimal level.',
      checklist: [
        { item: 'Pressure gauge in green zone', status: 'pass' },
        { item: 'Safety pin intact', status: 'pass' },
        { item: 'No visible damage', status: 'pass' },
        { item: 'Accessible location', status: 'pass' },
        { item: 'Last service date valid', status: 'pass' }
      ],
      images: [
        { id: 1, url: 'https://picsum.photos/seed/fire001/400/300', caption: 'Front view' },
        { id: 2, url: 'https://picsum.photos/seed/fire002/400/300', caption: 'Pressure gauge' }
      ],
      emergencyAlertSent: false
    },
    { 
      id: 'INS-002', 
      assetId: 'AST-002',
      assetName: 'Forklift #3',
      type: 'Ad-hoc',
      date: '2024-01-14',
      time: '14:15',
      inspector: 'Jane Smith',
      inspectorId: 'EMP-002',
      status: 'completed',
      result: 'fail',
      priority: 'high',
      notes: 'Brake failure detected. Requires immediate maintenance.',
      checklist: [
        { item: 'Brakes functioning properly', status: 'fail' },
        { item: 'Lights operational', status: 'pass' },
        { item: 'Horn working', status: 'pass' },
        { item: 'Tire pressure optimal', status: 'pass' },
        { item: 'Safety belt intact', status: 'fail' }
      ],
      images: [
        { id: 1, url: 'https://picsum.photos/seed/fork001/400/300', caption: 'Brake issue' },
        { id: 2, url: 'https://picsum.photos/seed/fork002/400/300', caption: 'Safety belt damage' }
      ],
      emergencyAlertSent: true
    },
    { 
      id: 'INS-003',
      assetId: 'AST-005',
      assetName: 'Company Van',
      type: 'Daily Round',
      date: '2024-01-15',
      time: '08:00',
      inspector: 'Robert Chen',
      inspectorId: 'EMP-003',
      status: 'in-progress',
      result: null,
      priority: 'low',
      notes: 'Inspection in progress...',
      checklist: [],
      images: [],
      emergencyAlertSent: false
    },
  ]);

  const [selectedInspection, setSelectedInspection] = useState(null);
  const [showDetailSheet, setShowDetailSheet] = useState(false);
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


  // Stats calculation
  const stats = {
    total: inspections.length,
    completed: inspections.filter(i => i.status === 'completed').length,
    pending: inspections.filter(i => i.status === 'pending').length,
    passed: inspections.filter(i => i.result === 'pass').length,
    failed: inspections.filter(i => i.result === 'fail').length,
  };


  const handleViewInspection = (inspection) => {
    setSelectedInspection(inspection);
    setShowDetailSheet(true);
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
    const mockImage = {
      id: Date.now(),
      url: `https://picsum.photos/seed/${Date.now()}/400/300`,
      timestamp: new Date().toISOString(),
      caption: ''
    };
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
      inspectorId: 'EMP-CURRENT',
      status: 'completed',
      result: result,
      priority: result === 'fail' ? 'high' : 'low',
      notes: inspectionForm.notes,
      checklist: inspectionForm.checklist.map(item => ({
        item: `Checklist item ${item + 1}`,
        status: result
      })),
      images: inspectionForm.images,
      emergencyAlertSent: result === 'fail' && inspectionForm.emergencyContact
    };

    setInspections([newInspection, ...inspections]);
    
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
    alert(` EMERGENCY ALERT SENT!\n\nInspection ${inspection.id} failed for ${inspection.assetName}\nSMS/Email sent to management team.`);
  };

  const QuickActionButton = ({ icon: Icon, label, onClick, color = 'emerald' }) => (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center p-2 cursor-pointer hover:border-l-2 hover:border-emerald-300 rounded-2xl bg-white  hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 min-w-[140px] group"
      style={{
        background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)'
      }}
    >
      <div className="p-4 rounded-full bg-gradient-to-br from-emerald-50 to-emerald-100 text-emerald-600 mb-4 group-hover:scale-110 transition-transform duration-300 shadow-md">
        <Icon size={28} />
      </div>
      <span className="text-sm font-bold text-gray-900">{label}</span>
    </button>
  );

  const StatusBadge = ({ status, result }) => {
    if (status === 'in-progress') {
      return (
        <span className="px-4 py-1.5 text-xs font-bold bg-gradient-to-r from-amber-100 to-amber-200 text-amber-800 rounded-full shadow-md">
          In Progress
        </span>
      );
    }
    
    return result === 'pass' ? (
      <span className="px-4 py-1.5 text-xs font-bold bg-gradient-to-r from-emerald-100 to-emerald-200 text-emerald-800 rounded-full shadow-md flex items-center gap-2">
        <CheckCircle size={14} /> Pass
      </span>
    ) : (
      <span className="px-4 py-1.5 text-xs font-bold bg-gradient-to-r from-rose-100 to-rose-200 text-rose-800 rounded-full shadow-md flex items-center gap-2">
        <XCircle size={14} /> Fail
      </span>
    );
  };

  const AssetStatusBadge = ({ status }) => {
    const config = {
      active: { bg: 'from-emerald-500 to-emerald-600', text: 'Active' },
      maintenance: { bg: 'from-amber-500 to-amber-600', text: 'Maintenance' },
      inactive: { bg: 'from-gray-500 to-gray-600', text: 'Inactive' }
    };
    
    const { bg, text } = config[status] || config.active;
    
    return (
      <span className={`px-3 py-1.5 text-xs font-bold bg-gradient-to-r ${bg} text-white rounded-full shadow-sm`}>
        {text}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50/30">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-7 mb-12">
          {[
            { label: 'Total Inspections', value: stats.total, icon: BarChart2, color: 'from-emerald-500 to-emerald-600' },
            { label: 'Completed', value: stats.completed, icon: CheckCircle, color: 'from-emerald-500 to-emerald-600' },
            { label: 'Passed', value: stats.passed, icon: CheckCircle, color: 'from-emerald-500 to-emerald-600' },
            { label: 'Failed', value: stats.failed, icon: XCircle, color: 'from-rose-500 to-rose-600' },
          ].map((stat, index) => (
            <div key={index} className="bg-gradient-to-br from-white p-4 to-gray-50 rounded-[8px] border-l-2 border-green-600  shadow-xl hover:shadow-3xl transition-all duration-400 hover:-translate-y-2">
              <div className="flex  flex-col  justify-between">
                  <div className="flex flex-row justify-between">
                      <div className={`p-1 rounded bg-gradient-to-br ${stat.color} text-white shadow-lg`}>
                          <stat.icon size={20} />
                    </div>
                   
                    <p className="text-sm font-semibold text-gray-600 mb-3">{stat.label}</p>

                    
              </div>
                <div>
                <div className="flex items-center justify-center">
                  <p className={`text-xl font-black ${stat.color.includes('rose') ? 'bg-gradient-to-r from-rose-600 to-rose-700 bg-clip-text text-transparent' : 'bg-gradient-to-r from-emerald-600 to-emerald-700 bg-clip-text text-transparent'}`}>
                    {stat.value}
                  </p>
                  </div>
                </div>
                
              </div>
            </div>
          ))}
        </div>
       
          <div className="grid grid-cols-1  bg-gradient-to-r rounded-tr-xl rounded-tl-xl from-emerald-50 to-emerald-100">
            {/* Header */}
       <header className="bg-gradient-to-r from-emerald-50 rounded-tl-xl rounded-tr-xl to-emerald-100">
        <div className="px-5 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-5">
              <div className="p-2 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl shadow-xl">
                <Shield className="text-white" size={26} />
              </div>
              <div className=''>
                <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-emerald-800 bg-clip-text text-transparent">
                Quick Inspections
                </h1>
                <div>
                  
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-500 mt-2">
                    <Clock size={16} />
                    <span className="font-medium">Today: {new Date().toLocaleDateString('en-GB')}</span>
                  </div>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <button className="relative p-3 text-gray-600 hover:text-emerald-600 transition-colors rounded-xl hover:bg-gradient-to-br hover:from-emerald-50 hover:to-white shadow-sm hover:shadow-md">
                <Bell size={24} />
                <span className="absolute top-2.5 right-2.5 w-3 h-3 bg-gradient-to-r from-rose-500 to-rose-600 rounded-full shadow"></span>
              </button>
              <button className="p-3 text-gray-600 hover:text-emerald-600 transition-colors rounded-xl hover:bg-gradient-to-br hover:from-emerald-50 hover:to-white shadow-sm hover:shadow-md">
                <Settings size={24} />
              </button>
              <div className="flex items-center gap-4 pl-5 border-l border-gray-200">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-full flex items-center justify-center shadow-lg">
                  <User size={24} className="text-emerald-700" />
                </div>
                <div className="text-left">
                  <span className="text-base font-bold text-gray-900">Safety Officer</span>
                  <span className="text-xs text-gray-500 block mt-1">Admin Access • Level 3</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
       {/* Quick Actions */}
       <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-3 shadow-xl">
             
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <QuickActionButton
                  icon={Calendar}
                  label="Daily Round"
                  onClick={() => handleStartInspection('daily')}
                />
                <QuickActionButton
                  icon={CheckCircle}
                  label="Equipment Check"
                  onClick={() => handleStartInspection('equipment')}
                />
                <QuickActionButton
                  icon={AlertTriangle}
                  label="Ad-hoc Inspection"
                  onClick={() => handleStartInspection('ad-hoc')}
                />
                <QuickActionButton
                  icon={Camera}
                  label="Report Issue"
                  onClick={captureImage}
                />
              </div>
        </div>

          </div>

            
            {/* Recent Inspections */}
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl  mt-7 shadow-md">
              <div className="flex items-center justify-between  px-7 py-7">
                <h2 className="text-2xl font-black bg-gradient-to-r from-gray-900 to-emerald-800 bg-clip-text text-transparent">Recent Inspections</h2>
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-3 px-5 py-2.5 text-sm font-bold text-emerald-600 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl hover:from-emerald-100 hover:to-emerald-200 transition-all shadow-md hover:shadow-lg">
                    <Download size={18} />
                    Export
                  </button>
                  <button className="flex items-center gap-3 px-5 py-2.5 text-sm font-bold text-gray-600 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl hover:from-gray-100 hover:to-gray-200 transition-all shadow-md hover:shadow-lg">
                    <Filter size={18} />
                    Filter
                  </button>
                </div>
              </div>
              
              <div className="overflow-hidden rounded-md">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-emerald-100 via-emerald-50 to-emerald-100">
                      <th className="py-5 px-7 text-left text-sm font-black text-gray-700">ID</th>
                      <th className="py-5 px-7 text-left text-sm font-black text-gray-700">Asset</th>
                      <th className="py-5 px-7 text-left text-sm font-black text-gray-700">Type</th>
                      <th className="py-5 px-4 text-left text-sm font-black text-gray-700">Date & Time</th>
                      <th className="py-5 px-7 text-left text-sm font-black text-gray-700">Status</th>
                      <th className="py-5 px-7 text-left text-sm font-black text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {inspections.map((inspection) => (
                      <tr 
                        key={inspection.id} 
                        className="hover:bg-gradient-to-r hover:from-emerald-50/80 hover:via-white hover:to-emerald-50/80 transition-all duration-300 cursor-pointer group"
                        onClick={() => handleViewInspection(inspection)}
                      >
                        <td className="py-6 px-7">
                          <div className="font-mono font-black text-gray-900 group-hover:text-emerald-700 transition-colors">{inspection.id}</div>
                        </td>
                        <td className="py-6 px-7">
                          <div>
                            <div className="font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">{inspection.assetName}</div>
                            <div className="text-xs font-medium text-gray-500 mt-1.5">{inspection.assetId}</div>
                          </div>
                        </td>
                        <td className="py-6 px-7">
                          <span className="text-sm font-semibold text-gray-700 group-hover:text-emerald-700 transition-colors">{inspection.type}</span>
                        </td>
                        <td className="py-6 px-7">
                          <div className="text-sm">
                            <div className="font-semibold text-gray-900">{inspection.date}</div>
                            <div className="text-gray-500 font-medium">{inspection.time}</div>
                          </div>
                        </td>
                        <td className="py-6 px-4">
                          <StatusBadge status={inspection.status} result={inspection.result} />
                        </td>
                        <td className="py-6 px-7">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleViewInspection(inspection);
                            }}
                            className="px-5 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl hover:from-emerald-600 hover:to-emerald-700 transition-all shadow-md hover:shadow-lg flex items-center gap-3"
                          >
                            <Eye size={18} />
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

       {/* Right Column - Asset List & Templates */}
       <div className=" bg-red-400 justify-between flex flex-row ">
            {/* Available Assets */}
            <div className="bg-gradient-to-br from-white to-gray-50  px-4 shadow-xl w-full">
              <div className="flex items-center justify-between my-7">
                <h2 className="text-2xl font-black bg-gradient-to-r from-gray-900 to-emerald-800 bg-clip-text text-transparent">Available Assets</h2>
                <div className="relative">
                  <div className="flex items-center bg-gradient-to-r from-gray-50 to-white rounded-xl shadow-lg pl-4 pr-3 py-2.5">
                    <Search className="text-gray-400 mr-3" size={20} />
                    <input 
                      type="text" 
                      placeholder="Search assets..." 
                      className="bg-transparent text-sm font-medium text-gray-700 placeholder-gray-400 focus:outline-none w-40"
                    />
                  </div>
                </div>
              </div>
              
              <div className=" gap-5 flex flex-col justify-between">
                {assets.map((asset) => (
                  <div
                    key={asset.id}
                    className={`p-6 rounded-xl cursor-pointer transition-all duration-300 ${
                      selectedAsset?.id === asset.id 
                        ? 'bg-gradient-to-r from-emerald-50 via-white to-emerald-50 shadow-2xl scale-[1.02]' 
                        : 'bg-gradient-to-br from-gray-50 to-white shadow-lg hover:shadow-2xl hover:scale-[1.02]'
                    }`}
                    onClick={() => handleAssetSelect(asset.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="font-bold text-gray-900">{asset.name}</h3>
                          <AssetStatusBadge status={asset.status} />
                        </div>
                        <div className="flex items-center gap-3 text-sm font-medium text-gray-600 mb-4">
                          <MapPin size={16} />
                          <span>{asset.location}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold bg-gradient-to-r from-gray-100 to-white text-gray-700 rounded-full shadow-sm">
                            <Tag size={14} />
                            {asset.type}
                          </span>
                          <ChevronRight size={18} className="text-emerald-500" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Inspection Templates */}
            <div className="bg-gradient-to-b from-white to-gray-50  p-8 shadow-xl">
              <h2 className="text-2xl font-black bg-gradient-to-r from-gray-900 to-emerald-800 bg-clip-text text-transparent mb-9">Inspection Templates</h2>
              
              <div className="space-y-6">
                {inspectionTemplates.map((template) => (
                  <div
                    key={template.id}
                    className="p-6 rounded-xl bg-gradient-to-br from-gray-50 to-white shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 mb-4">{template.name}</h3>
                        <div className="flex items-center gap-5">
                          <span className="text-xs font-bold px-3 py-1.5 bg-gradient-to-r from-emerald-50 to-emerald-100 text-emerald-700 rounded-full shadow-sm">
                            {template.frequency}
                          </span>
                          <span className="text-xs font-medium text-gray-600 flex items-center gap-2">
                            <Clock size={14} />
                            {template.estimatedTime}
                          </span>
                          <span className="text-xs font-medium text-gray-600 flex items-center gap-2">
                            <FileText size={14} />
                            {template.items} items
                          </span>
                        </div>
                      </div>
                      <button className="p-3 text-emerald-600 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl hover:from-emerald-100 hover:to-emerald-200 transition-all shadow-md">
                        <Plus size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
      <div className=" py-8">
        
            
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Quick Actions & Templates */}
           

         

         
        </div>
      </div>





      {/* Inspection Detail Sheet */}
      {showDetailSheet && selectedInspection && (
        <div className="fixed inset-0 bg-gradient-to-br from-black/60 via-black/50 to-black/60 flex items-end justify-center z-50">
          <div 
            className="bg-gradient-to-br from-white via-white to-emerald-50 w-full max-w-5xl h-[92vh] rounded-t-3xl shadow-3xl overflow-hidden animate-slideUp"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="h-full flex flex-col">
              {/* Sheet Header */}
              <div className="p-7 bg-gradient-to-r from-emerald-50 via-white to-emerald-50 shadow-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-5">
                    <div className="p-4 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl shadow-lg">
                      <FileText size={28} className="text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-black bg-gradient-to-r from-gray-900 to-emerald-800 bg-clip-text text-transparent">
                        Inspection  {selectedInspection.id}
                      </h2>
                      <p className="text-gray-600 font-medium mt-2">
                        {selectedInspection.type} • {selectedInspection.date} at {selectedInspection.time}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => setShowDetailSheet(false)}
                      className="p-3 text-gray-400 hover:text-gray-600 hover:bg-gradient-to-br hover:from-gray-100 hover:to-gray-50 rounded-xl shadow-sm hover:shadow-md"
                    >
                      <XCircle size={24} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Sheet Content */}
              <div className="flex-1 overflow-y-auto p-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Left Column - Main Details */}
                  <div className="lg:col-span-2 space-y-8">
                    {/* Asset Information */}
                    <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-7 shadow-2xl">
                      <h3 className="text-xl font-black bg-gradient-to-r from-gray-900 to-emerald-800 bg-clip-text text-transparent mb-7">Asset Information</h3>
                      <div className="grid grid-cols-2 gap-6">
                        <div className="p-5 bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-sm">
                          <p className="text-sm font-semibold text-gray-600 mb-2">Asset Name</p>
                          <p className="font-bold text-gray-900 text-lg">{selectedInspection.assetName}</p>
                        </div>
                        <div className="p-5 bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-sm">
                          <p className="text-sm font-semibold text-gray-600 mb-2">Asset ID</p>
                          <p className="font-mono font-bold text-gray-900 text-lg">{selectedInspection.assetId}</p>
                        </div>
                        <div className="p-5 bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-sm">
                          <p className="text-sm font-semibold text-gray-600 mb-2">Inspector</p>
                          <p className="font-bold text-gray-900 text-lg">{selectedInspection.inspector}</p>
                        </div>
                        <div className="p-5 bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-sm">
                          <p className="text-sm font-semibold text-gray-600 mb-2">Inspector ID</p>
                          <p className="font-mono font-bold text-gray-900">{selectedInspection.inspectorId}</p>
                        </div>
                      </div>
                    </div>

                    {/* Checklist Results */}
                    <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-7 shadow-2xl">
                      <div className="flex items-center justify-between mb-7">
                        <h3 className="text-xl font-black bg-gradient-to-r from-gray-900 to-emerald-800 bg-clip-text text-transparent">Checklist Results</h3>
                        <StatusBadge status={selectedInspection.status} result={selectedInspection.result} />
                      </div>
                      <div className="space-y-4">
                        {selectedInspection.checklist.map((item, index) => (
                          <div key={index} className="flex items-center justify-between p-5 bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                            <span className="font-medium text-gray-800">{item.item}</span>
                            {item.status === 'pass' ? (
                              <div className="p-3 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-xl shadow-sm">
                                <CheckCircle size={22} className="text-emerald-600" />
                              </div>
                            ) : (
                              <div className="p-3 bg-gradient-to-br from-rose-100 to-rose-200 rounded-xl shadow-sm">
                                <XCircle size={22} className="text-rose-600" />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Images */}
                    {selectedInspection.images.length > 0 && (
                      <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-7 shadow-2xl">
                        <h3 className="text-xl font-black bg-gradient-to-r from-gray-900 to-emerald-800 bg-clip-text text-transparent mb-7">Attached Images</h3>
                        <div className="grid grid-cols-2 gap-5">
                          {selectedInspection.images.map((img) => (
                            <div key={img.id} className="relative rounded-2xl overflow-hidden shadow-xl group">
                              <img
                                src={img.url}
                                alt="Inspection"
                                className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                              {img.caption && (
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white p-5">
                                  <p className="font-medium">{img.caption}</p>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>



                  {/* Right Column - Actions & Notes */}
                  <div className="space-y-8">
                    {/* Emergency Alert */}
                    {selectedInspection.emergencyAlertSent && (
                      <div className="bg-gradient-to-br from-rose-50 via-white to-rose-50 rounded-2xl p-6 shadow-2xl">
                        <div className="flex items-start gap-4">
                          <div className="p-4 bg-gradient-to-br from-rose-500 to-rose-600 rounded-xl shadow-lg">
                            <AlertTriangle size={28} className="text-white" />
                          </div>
                          <div>
                            <h4 className="font-bold text-rose-800 text-lg mb-3">Emergency Alert Sent</h4>
                            <p className="text-sm text-rose-700 font-medium">
                              SMS and email notifications were sent to management team immediately upon failure detection.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Notes */}
                    <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-7 shadow-2xl">
                      <h3 className="text-xl font-black bg-gradient-to-r from-gray-900 to-emerald-800 bg-clip-text text-transparent mb-6">Inspector Notes</h3>
                      <div className="p-5 bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-inner min-h-[180px]">
                        <p className="text-gray-700 font-medium leading-relaxed">{selectedInspection.notes}</p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-7 shadow-2xl">
                      <h3 className="text-xl font-black bg-gradient-to-r from-gray-900 to-emerald-800 bg-clip-text text-transparent mb-7">Actions</h3>
                      <div className="space-y-4">
                        <button className="w-full py-4 px-6 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl font-bold hover:from-emerald-600 hover:to-emerald-700 transition-all shadow-lg hover:shadow-2xl flex items-center justify-center gap-4">
                          <MessageSquare size={22} />
                          Send Follow-up
                        </button>
                        <button className="w-full py-4 px-6 bg-gradient-to-br from-gray-50 to-white text-gray-800 rounded-xl font-bold hover:from-gray-100 hover:to-white transition-all shadow-lg hover:shadow-2xl flex items-center justify-center gap-4 border border-gray-200">
                          <Printer size={22} />
                          Print Report
                        </button>
                        <button className="w-full py-4 px-6 bg-gradient-to-br from-gray-50 to-white text-gray-800 rounded-xl font-bold hover:from-gray-100 hover:to-white transition-all shadow-lg hover:shadow-2xl flex items-center justify-center gap-4 border border-gray-200">
                          <Share2 size={22} />
                          Share Results
                        </button>
                        <button className="w-full py-4 px-6 bg-gradient-to-br from-rose-50 to-white text-rose-600 rounded-xl font-bold hover:from-rose-100 hover:to-white transition-all shadow-lg hover:shadow-2xl flex items-center justify-center gap-4 border border-rose-200">
                          <Edit size={22} />
                          Edit Inspection
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Inspection Modal */}
      {showNewInspection && (
        <div className="fixed inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-gradient-to-br from-white via-white to-emerald-50 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-3xl">
            <div className="p-9">
              <div className="flex items-center justify-between mb-9">
                <h2 className="text-3xl font-black bg-gradient-to-r from-gray-900 to-emerald-800 bg-clip-text text-transparent">New Inspection</h2>
                <button
                  onClick={() => setShowNewInspection(false)}
                  className="p-3 text-gray-400 hover:text-gray-600 hover:bg-gradient-to-br hover:from-gray-100 hover:to-gray-50 rounded-xl shadow-sm hover:shadow-md"
                >
                  <XCircle size={28} />
                </button>
              </div>

              {/* Asset Selection */}
              <div className="mb-9">
                <label className="block text-base font-black text-gray-900 mb-6">Select Asset</label>
                <div className="grid grid-cols-2 gap-5">
                  {assets.map((asset) => (
                    <button
                      key={asset.id}
                      onClick={() => handleAssetSelect(asset.id)}
                      className={`p-5 rounded-xl text-left transition-all ${
                        inspectionForm.assetId === asset.id
                          ? 'bg-gradient-to-r from-emerald-50 via-white to-emerald-50 shadow-2xl scale-[1.02] border-2 border-emerald-500'
                          : 'bg-gradient-to-br from-gray-50 to-white shadow-lg hover:shadow-2xl hover:scale-[1.02]'
                      }`}
                    >
                      <div className="font-bold text-gray-900 text-lg">{asset.name}</div>
                      <div className="text-sm text-gray-600 mt-2 font-medium">{asset.id}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Checklist Section */}
              {selectedAsset && (
                <div className="mb-9">
                  <label className="block text-base font-black text-gray-900 mb-6">Checklist Items</label>
                  <div className="space-y-4">
                    {['Pressure gauge in green zone', 'Safety pin intact', 'No visible damage', 'Accessible location', 'Last service date valid'].map((item, index) => (
                      <label key={index} className="flex items-center gap-5 p-5 bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-lg hover:shadow-xl cursor-pointer">
                        <input
                          type="checkbox"
                          checked={inspectionForm.checklist.includes(index)}
                          onChange={() => handleChecklistToggle(index)}
                          className="rounded-xl text-emerald-600 focus:ring-emerald-500 w-6 h-6"
                        />
                        <span className="font-medium text-gray-800">{item}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Image Capture */}
              <div className="mb-9">
                <label className="block text-base font-black text-gray-900 mb-6">Attach Images</label>
                <div className="flex flex-wrap gap-5">
                  {inspectionForm.images.map((img) => (
                    <div key={img.id} className="relative">
                      <img
                        src={img.url}
                        alt="Inspection"
                        className="w-32 h-32 object-cover rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
                      />
                    </div>
                  ))}
                  <button
                    onClick={captureImage}
                    className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center text-gray-400 hover:text-emerald-600 hover:border-emerald-400 hover:bg-gradient-to-br hover:from-emerald-50 hover:to-white transition-all"
                  >
                    <Camera size={32} />
                    <span className="text-sm font-medium mt-4">Add Photo</span>
                  </button>
                </div>
              </div>

              {/* Emergency Alert Option */}
              <div className="mb-12">
                <label className="flex items-start gap-5 p-6 bg-gradient-to-br from-rose-50 via-white to-rose-50 rounded-2xl shadow-xl">
                  <input
                    type="checkbox"
                    checked={inspectionForm.emergencyContact}
                    onChange={(e) => setInspectionForm({
                      ...inspectionForm,
                      emergencyContact: e.target.checked
                    })}
                    className="rounded-xl text-rose-600 focus:ring-rose-500 w-6 h-6 mt-1"
                  />
                  <div>
                    <span className="font-bold text-gray-900 text-lg">Send emergency alert on failure</span>
                    <p className="text-sm text-gray-600 mt-2 font-medium">
                      Will send immediate SMS/Email notifications to management team if inspection fails
                    </p>
                  </div>
                </label>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-5">
                <button
                  onClick={() => handleSubmitInspection('pass')}
                  className="flex-1 py-5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl font-black hover:from-emerald-600 hover:to-emerald-700 shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-4 text-lg"
                >
                  <CheckCircle size={24} />
                  Mark as Pass
                </button>
                <button
                  onClick={() => handleSubmitInspection('fail')}
                  className="flex-1 py-5 bg-gradient-to-r from-rose-500 to-rose-600 text-white rounded-xl font-black hover:from-rose-600 hover:to-rose-700 shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-4 text-lg"
                >
                  <XCircle size={24} />
                  Mark as Fail
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        .animate-slideUp {
          animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </div>
  );
};