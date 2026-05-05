import React, { useState, useEffect } from 'react';
import {
  CheckCircle, XCircle, Camera, AlertTriangle,
  Calendar, Clock, Search, Filter, Plus, Download,
  BarChart2, Bell, Settings, User, Shield, Eye,
  FileText, MessageSquare, Printer, Share2, Edit,
  MapPin, Tag, Battery, Thermometer, Zap, HardHat
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
    alert(`🚨 EMERGENCY ALERT SENT!\n\nInspection ${inspection.id} failed for ${inspection.assetName}\nSMS/Email sent to management team.`);
  };

  const QuickActionButton = ({ icon: Icon, label, onClick, color = 'emerald' }) => (
    <button
      onClick={onClick}
      className={`
        flex flex-col items-center justify-center p-5 rounded-2xl
        bg-white hover:shadow-xl transition-all duration-300
        shadow-md hover:-translate-y-1
        min-w-[120px] group
      `}
      style={{
        background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)'
      }}
    >
      <div className={`p-3 rounded-full bg-emerald-50 text-emerald-600 mb-3 
        group-hover:scale-110 transition-transform duration-300
        shadow-sm`}>
        <Icon size={24} />
      </div>
      <span className="text-sm font-semibold text-gray-800">{label}</span>
    </button>
  );

  const StatusBadge = ({ status, result }) => {
    if (status === 'in-progress') {
      return (
        <span className="px-3 py-1 text-xs font-semibold bg-amber-100 text-amber-800 rounded-full shadow-sm">
          In Progress
        </span>
      );
    }
    
    return result === 'pass' ? (
      <span className="px-3 py-1 text-xs font-semibold bg-emerald-100 text-emerald-800 rounded-full shadow-sm flex items-center gap-1">
        <CheckCircle size={12} /> Pass
      </span>
    ) : (
      <span className="px-3 py-1 text-xs font-semibold bg-rose-100 text-rose-800 rounded-full shadow-sm flex items-center gap-1">
        <XCircle size={12} /> Fail
      </span>
    );
  };

  const AssetStatusBadge = ({ status }) => {
    const config = {
      active: { color: 'emerald', text: 'Active' },
      maintenance: { color: 'amber', text: 'Maintenance' },
      inactive: { color: 'gray', text: 'Inactive' }
    };
    
    const { color, text } = config[status] || config.active;
    
    return (
      <span className={`px-2 py-1 text-xs font-medium bg-${color}-100 text-${color}-800 rounded-full`}>
        {text}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-lg">
        <div className="px-8 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl shadow-lg">
                <Shield className="text-white" size={28} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Inspection Management</h1>
                <p className="text-gray-600 text-sm mt-1">
                  Physical Checks for Daily/Weekly/Monthly Safety Assurance
                </p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <button className="relative p-2.5 text-gray-600 hover:text-emerald-600 transition-colors rounded-lg hover:bg-emerald-50">
                <Bell size={22} />
                <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-rose-500 rounded-full"></span>
              </button>
              <button className="p-2.5 text-gray-600 hover:text-emerald-600 transition-colors rounded-lg hover:bg-emerald-50">
                <Settings size={22} />
              </button>
              <div className="flex items-center gap-3 pl-4 border-l">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-full flex items-center justify-center shadow-md">
                  <User size={20} className="text-emerald-700" />
                </div>
                <div className="text-left">
                  <span className="text-sm font-semibold text-gray-900">Safety Officer</span>
                  <span className="text-xs text-gray-500 block">Admin Access</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          {[
            { label: 'Total Inspections', value: stats.total, icon: BarChart2, color: 'emerald' },
            { label: 'Completed', value: stats.completed, icon: CheckCircle, color: 'emerald' },
            { label: 'Passed', value: stats.passed, icon: CheckCircle, color: 'emerald' },
            { label: 'Failed', value: stats.failed, icon: XCircle, color: 'rose' },
          ].map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className={`text-3xl font-bold mt-2 ${
                    stat.color === 'rose' ? 'text-rose-600' : 'text-emerald-600'
                  }`}>
                    {stat.value}
                  </p>
                </div>
                <div className={`p-3 rounded-xl bg-${stat.color}-100 text-${stat.color}-600 shadow-md`}>
                  <stat.icon size={24} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Quick Actions & Templates */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Actions */}
            <div className="bg-white rounded-2xl p-7 shadow-xl">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Quick Actions</h2>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                    <Clock size={14} />
                    <span>Today: {new Date().toLocaleDateString('en-GB')}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <button className="px-4 py-2 text-sm font-medium text-emerald-600 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors">
                    View All
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
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

            {/* Recent Inspections */}
            <div className="bg-white rounded-2xl p-7 shadow-xl">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-gray-900">Recent Inspections</h2>
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-emerald-600 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors">
                    <Download size={16} />
                    Export
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                    <Filter size={16} />
                    Filter
                  </button>
                </div>
              </div>
              
              <div className="overflow-hidden rounded-xl shadow-sm">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-emerald-50 to-gray-50">
                      <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">ID</th>
                      <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">Asset</th>
                      <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">Type</th>
                      <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">Date & Time</th>
                      <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">Status</th>
                      <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {inspections.map((inspection) => (
                      <tr 
                        key={inspection.id} 
                        className="hover:bg-emerald-50/50 transition-colors cursor-pointer"
                        onClick={() => handleViewInspection(inspection)}
                      >
                        <td className="py-5 px-6">
                          <div className="font-mono font-bold text-gray-900">{inspection.id}</div>
                        </td>
                        <td className="py-5 px-6">
                          <div>
                            <div className="font-semibold text-gray-900">{inspection.assetName}</div>
                            <div className="text-xs text-gray-500 mt-1">{inspection.assetId}</div>
                          </div>
                        </td>
                        <td className="py-5 px-6">
                          <span className="text-sm font-medium text-gray-700">{inspection.type}</span>
                        </td>
                        <td className="py-5 px-6">
                          <div className="text-sm">
                            <div className="font-medium">{inspection.date}</div>
                            <div className="text-gray-500">{inspection.time}</div>
                          </div>
                        </td>
                        <td className="py-5 px-6">
                          <StatusBadge status={inspection.status} result={inspection.result} />
                        </td>
                        <td className="py-5 px-6">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleViewInspection(inspection);
                            }}
                            className="px-4 py-2 text-sm font-medium text-emerald-600 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors flex items-center gap-2"
                          >
                            <Eye size={16} />
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Column - Asset List & Templates */}
          <div className="space-y-8">
            {/* Available Assets */}
            <div className="bg-white rounded-2xl p-7 shadow-xl">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-gray-900">Available Assets</h2>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="text" 
                    placeholder="Search assets..." 
                    className="pl-10 pr-4 py-2 text-sm border-0 bg-gray-50 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none w-48"
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                {assets.map((asset) => (
                  <div
                    key={asset.id}
                    className={`p-5 rounded-xl cursor-pointer transition-all duration-300 hover:shadow-lg ${
                      selectedAsset?.id === asset.id 
                        ? 'bg-gradient-to-r from-emerald-50 to-emerald-100 shadow-md' 
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                    onClick={() => handleAssetSelect(asset.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-gray-900">{asset.name}</h3>
                          <AssetStatusBadge status={asset.status} />
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                          <MapPin size={14} />
                          <span>{asset.location}</span>
                        </div>
                        <span className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium bg-white text-gray-700 rounded-full shadow-sm">
                          <Tag size={12} />
                          {asset.type}
                        </span>
                      </div>
                      <span className="text-sm font-mono text-gray-500 bg-white px-3 py-1.5 rounded-lg shadow-sm">
                        {asset.id}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Inspection Templates */}
            <div className="bg-white rounded-2xl p-7 shadow-xl">
              <h2 className="text-xl font-bold text-gray-900 mb-8">Inspection Templates</h2>
              
              <div className="space-y-5">
                {inspectionTemplates.map((template) => (
                  <div
                    key={template.id}
                    className="p-5 rounded-xl bg-gradient-to-r from-gray-50 to-white hover:from-emerald-50 hover:to-white transition-all duration-300 hover:shadow-lg cursor-pointer group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 group-hover:text-emerald-700 transition-colors">
                          {template.name}
                        </h3>
                        <div className="flex items-center gap-4 mt-3">
                          <span className="text-xs px-3 py-1.5 bg-white text-gray-700 rounded-full shadow-sm">
                            {template.frequency}
                          </span>
                          <span className="text-xs text-gray-600 flex items-center gap-1.5">
                            <Clock size={12} />
                            {template.estimatedTime}
                          </span>
                          <span className="text-xs text-gray-600 flex items-center gap-1.5">
                            <FileText size={12} />
                            {template.items} items
                          </span>
                        </div>
                      </div>
                      <button className="p-2.5 text-emerald-600 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors opacity-0 group-hover:opacity-100">
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

      {/* Inspection Detail Sheet */}
      {showDetailSheet && selectedInspection && (
        <div className="fixed inset-0 bg-black/50 flex items-end justify-center z-50">
          <div 
            className="bg-white w-full max-w-4xl h-[90vh] rounded-t-3xl shadow-2xl overflow-hidden animate-slideUp"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="h-full flex flex-col">
              {/* Sheet Header */}
              <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-emerald-50 to-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-emerald-100 rounded-xl">
                      <FileText size={24} className="text-emerald-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        Inspection {selectedInspection.id}
                      </h2>
                      <p className="text-gray-600 mt-1">
                        {selectedInspection.type} • {selectedInspection.date} at {selectedInspection.time}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => setShowDetailSheet(false)}
                      className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
                    >
                      ✕
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
                    <div className="bg-gradient-to-r from-gray-50 to-white rounded-2xl p-6 shadow-sm">
                      <h3 className="text-lg font-semibold text-gray-900 mb-6">Asset Information</h3>
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Asset Name</p>
                          <p className="font-semibold text-gray-900">{selectedInspection.assetName}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Asset ID</p>
                          <p className="font-mono font-semibold text-gray-900">{selectedInspection.assetId}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Inspector</p>
                          <p className="font-semibold text-gray-900">{selectedInspection.inspector}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Inspector ID</p>
                          <p className="font-mono text-gray-900">{selectedInspection.inspectorId}</p>
                        </div>
                      </div>
                    </div>

                    {/* Checklist Results */}
                    <div className="bg-gradient-to-r from-gray-50 to-white rounded-2xl p-6 shadow-sm">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-gray-900">Checklist Results</h3>
                        <StatusBadge status={selectedInspection.status} result={selectedInspection.result} />
                      </div>
                      <div className="space-y-3">
                        {selectedInspection.checklist.map((item, index) => (
                          <div key={index} className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm">
                            <span className="text-gray-800">{item.item}</span>
                            {item.status === 'pass' ? (
                              <CheckCircle size={20} className="text-emerald-500" />
                            ) : (
                              <XCircle size={20} className="text-rose-500" />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Images */}
                    {selectedInspection.images.length > 0 && (
                      <div className="bg-gradient-to-r from-gray-50 to-white rounded-2xl p-6 shadow-sm">
                        <h3 className="text-lg font-semibold text-gray-900 mb-6">Attached Images</h3>
                        <div className="grid grid-cols-2 gap-4">
                          {selectedInspection.images.map((img) => (
                            <div key={img.id} className="relative rounded-xl overflow-hidden shadow-md">
                              <img
                                src={img.url}
                                alt="Inspection"
                                className="w-full h-48 object-cover"
                              />
                              {img.caption && (
                                <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-3 text-sm">
                                  {img.caption}
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
                      <div className="bg-gradient-to-r from-rose-50 to-rose-100 rounded-2xl p-6 shadow-sm border-l-4 border-rose-500">
                        <div className="flex items-start gap-3">
                          <AlertTriangle size={24} className="text-rose-600 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-rose-800 mb-2">Emergency Alert Sent</h4>
                            <p className="text-sm text-rose-700">
                              SMS and email notifications were sent to management team immediately upon failure detection.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Notes */}
                    <div className="bg-gradient-to-r from-gray-50 to-white rounded-2xl p-6 shadow-sm">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Inspector Notes</h3>
                      <div className="bg-white p-4 rounded-xl shadow-inner">
                        <p className="text-gray-700">{selectedInspection.notes}</p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="bg-gradient-to-r from-gray-50 to-white rounded-2xl p-6 shadow-sm">
                      <h3 className="text-lg font-semibold text-gray-900 mb-6">Actions</h3>
                      <div className="space-y-3">
                        <button className="w-full py-3 px-4 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-colors flex items-center justify-center gap-3 shadow-md hover:shadow-lg">
                          <MessageSquare size={20} />
                          Send Follow-up
                        </button>
                        <button className="w-full py-3 px-4 bg-white text-gray-800 rounded-xl font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-3 shadow-md hover:shadow-lg border border-gray-200">
                          <Printer size={20} />
                          Print Report
                        </button>
                        <button className="w-full py-3 px-4 bg-white text-gray-800 rounded-xl font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-3 shadow-md hover:shadow-lg border border-gray-200">
                          <Share2 size={20} />
                          Share Results
                        </button>
                        <button className="w-full py-3 px-4 bg-white text-rose-600 rounded-xl font-semibold hover:bg-rose-50 transition-colors flex items-center justify-center gap-3 shadow-md hover:shadow-lg border border-rose-200">
                          <Edit size={20} />
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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-900">New Inspection</h2>
                <button
                  onClick={() => setShowNewInspection(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  ✕
                </button>
              </div>

              {/* Asset Selection */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-gray-900 mb-4">
                  Select Asset
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {assets.map((asset) => (
                    <button
                      key={asset.id}
                      onClick={() => handleAssetSelect(asset.id)}
                      className={`p-4 rounded-xl text-left transition-all ${
                        inspectionForm.assetId === asset.id
                          ? 'bg-gradient-to-r from-emerald-50 to-emerald-100 shadow-md border-2 border-emerald-500'
                          : 'bg-gray-50 hover:shadow-md hover:bg-gray-100'
                      }`}
                    >
                      <div className="font-semibold text-gray-900">{asset.name}</div>
                      <div className="text-sm text-gray-600 mt-1">{asset.id}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Checklist Section */}
              {selectedAsset && (
                <div className="mb-8">
                  <label className="block text-sm font-semibold text-gray-900 mb-4">
                    Checklist Items
                  </label>
                  <div className="space-y-3">
                    {['Pressure gauge in green zone', 'Safety pin intact', 'No visible damage', 'Accessible location', 'Last service date valid'].map((item, index) => (
                      <label key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={inspectionForm.checklist.includes(index)}
                          onChange={() => handleChecklistToggle(index)}
                          className="rounded-lg text-emerald-600 focus:ring-emerald-500"
                        />
                        <span className="text-gray-800">{item}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Image Capture */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-gray-900 mb-4">
                  Attach Images
                </label>
                <div className="flex flex-wrap gap-4">
                  {inspectionForm.images.map((img) => (
                    <div key={img.id} className="relative">
                      <img
                        src={img.url}
                        alt="Inspection"
                        className="w-28 h-28 object-cover rounded-xl shadow-md"
                      />
                    </div>
                  ))}
                  <button
                    onClick={captureImage}
                    className="w-28 h-28 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center text-gray-400 hover:text-emerald-600 hover:border-emerald-400 hover:bg-emerald-50 transition-colors"
                  >
                    <Camera size={28} />
                    <span className="text-xs mt-3">Add Photo</span>
                  </button>
                </div>
              </div>

              {/* Emergency Alert Option */}
              <div className="mb-10">
                <label className="flex items-start gap-4 p-4 bg-rose-50 rounded-xl">
                  <input
                    type="checkbox"
                    checked={inspectionForm.emergencyContact}
                    onChange={(e) => setInspectionForm({
                      ...inspectionForm,
                      emergencyContact: e.target.checked
                    })}
                    className="rounded-lg text-rose-600 focus:ring-rose-500 mt-1"
                  />
                  <div>
                    <span className="font-semibold text-gray-900">Send emergency alert on failure</span>
                    <p className="text-sm text-gray-600 mt-1">
                      Will send immediate SMS/Email notifications to management team if inspection fails
                    </p>
                  </div>
                </label>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={() => handleSubmitInspection('pass')}
                  className="flex-1 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl font-semibold hover:from-emerald-600 hover:to-emerald-700 shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3"
                >
                  <CheckCircle size={22} />
                  Mark as Pass
                </button>
                <button
                  onClick={() => handleSubmitInspection('fail')}
                  className="flex-1 py-4 bg-gradient-to-r from-rose-500 to-rose-600 text-white rounded-xl font-semibold hover:from-rose-600 hover:to-rose-700 shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3"
                >
                  <XCircle size={22} />
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
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};