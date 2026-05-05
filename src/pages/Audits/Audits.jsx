import React, { useState } from 'react';
import {
  FileText, Shield, Users, Target, Upload,
  Search, Filter, Calendar, CheckCircle, AlertCircle,
  Clock, Download, Eye, Edit, Trash2, Plus,
  ChevronRight, BarChart, PieChart, TrendingUp,
  MessageSquare, Lock, FolderOpen, Link, History,
  ClipboardCheck, FileCheck, XCircle, Settings,
  ArrowRight, RefreshCw, UserCheck, Globe, Award
} from 'lucide-react';

export const Audits = () => {
  const [audits, setAudits] = useState([
    {
      id: 'AUD-2024-001',
      title: 'ISO 9001:2015 Certification Audit',
      department: 'Quality Management',
      type: 'Internal',
      status: 'in-progress',
      stage: 'In Progress',
      framework: 'ISO 9001:2015',
      auditor: 'Dr. Sarah Johnson',
      dueDate: '2024-02-15',
      startDate: '2024-01-20',
      progress: 65,
      priority: 'high',
      findings: 12,
      nonConformances: 3
    },
    {
      id: 'AUD-2024-002',
      title: 'OSHA Workplace Safety Compliance',
      department: 'Health & Safety',
      type: 'External',
      status: 'planned',
      stage: 'Planned',
      framework: 'OSHA Standards',
      auditor: 'Safety First Consultants',
      dueDate: '2024-03-10',
      startDate: '2024-02-25',
      progress: 0,
      priority: 'critical',
      findings: 0,
      nonConformances: 0
    },
    {
      id: 'AUD-2024-003',
      title: 'ISO 14001 Environmental Management',
      department: 'Operations',
      type: 'Internal',
      status: 'review',
      stage: 'Final Review',
      framework: 'ISO 14001:2015',
      auditor: 'Mark Wilson',
      dueDate: '2024-01-31',
      startDate: '2024-01-10',
      progress: 90,
      priority: 'medium',
      findings: 8,
      nonConformances: 1
    },
    {
      id: 'AUD-2024-004',
      title: 'Financial Controls & SOP Compliance',
      department: 'Finance',
      type: 'External',
      status: 'completed',
      stage: 'Closed',
      framework: 'Company SOPs',
      auditor: 'PwC Kenya',
      dueDate: '2024-01-15',
      startDate: '2023-12-01',
      progress: 100,
      priority: 'medium',
      findings: 15,
      nonConformances: 4
    },
    {
      id: 'AUD-2024-005',
      title: 'IT Security & Data Protection',
      department: 'IT',
      type: 'Internal',
      status: 'draft',
      stage: 'Report Drafted',
      framework: 'GDPR & Data Protection',
      auditor: 'James Mwangi',
      dueDate: '2024-02-28',
      startDate: '2024-02-01',
      progress: 75,
      priority: 'high',
      findings: 6,
      nonConformances: 2
    }
  ]);

  const [selectedAudit, setSelectedAudit] = useState(null);
  const [showNewAudit, setShowNewAudit] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [newAuditForm, setNewAuditForm] = useState({
    title: '',
    department: '',
    type: 'Internal',
    framework: '',
    auditor: '',
    dueDate: '',
    scope: '',
    objectives: ''
  });

  // Audit Status Tracker Stages
  const auditStages = [
    { stage: 'Planned', color: 'bg-blue-500', description: 'Audit scope defined and scheduled' },
    { stage: 'In Progress', color: 'bg-amber-500', description: 'Fieldwork and evidence collection' },
    { stage: 'Report Drafted', color: 'bg-purple-500', description: 'Findings documented in draft report' },
    { stage: 'Final Review', color: 'bg-indigo-500', description: 'Management review and validation' },
    { stage: 'Closed', color: 'bg-emerald-500', description: 'Audit completed and archived' }
  ];

  // Compliance Frameworks
  const frameworks = [
    { name: 'ISO 9001:2015', type: 'Quality Management', documents: 24 },
    { name: 'ISO 14001:2015', type: 'Environmental', documents: 18 },
    { name: 'OSHA Standards', type: 'Safety', documents: 32 },
    { name: 'GDPR Compliance', type: 'Data Protection', documents: 15 },
    { name: 'Company SOPs', type: 'Internal', documents: 47 }
  ];

  // Evidence Vault Items
  const evidenceItems = [
    { id: 'EVD-001', name: 'Employee Training Certificates', type: 'pdf', uploaded: '2024-01-15', verified: true },
    { id: 'EVD-002', name: 'Equipment Calibration Records', type: 'excel', uploaded: '2024-01-10', verified: true },
    { id: 'EVD-003', name: 'Safety Inspection Reports', type: 'pdf', uploaded: '2024-01-05', verified: false },
    { id: 'EVD-004', name: 'Supplier Contracts', type: 'pdf', uploaded: '2024-01-12', verified: true },
    { id: 'EVD-005', name: 'Incident Reports', type: 'doc', uploaded: '2024-01-08', verified: false }
  ];

  // Audit History
  const auditHistory = [
    { action: 'Audit Created', user: 'Sarah Johnson', timestamp: '2024-01-15 09:30', auditId: 'AUD-2024-001' },
    { action: 'Scope Updated', user: 'Mark Wilson', timestamp: '2024-01-16 14:15', auditId: 'AUD-2024-003' },
    { action: 'Evidence Uploaded', user: 'James Mwangi', timestamp: '2024-01-17 11:00', auditId: 'AUD-2024-005' },
    { action: 'Findings Documented', user: 'Sarah Johnson', timestamp: '2024-01-18 16:45', auditId: 'AUD-2024-001' },
    { action: 'Report Submitted', user: 'PwC Team', timestamp: '2024-01-19 10:20', auditId: 'AUD-2024-004' }
  ];

  const handleViewAudit = (audit) => {
    setSelectedAudit(audit);
  };

  const handleCreateAudit = () => {
    const newAudit = {
      id: `AUD-2024-${String(audits.length + 1).padStart(3, '0')}`,
      title: newAuditForm.title,
      department: newAuditForm.department,
      type: newAuditForm.type,
      status: 'planned',
      stage: 'Planned',
      framework: newAuditForm.framework,
      auditor: newAuditForm.auditor,
      dueDate: newAuditForm.dueDate,
      startDate: new Date().toISOString().split('T')[0],
      progress: 0,
      priority: 'medium',
      findings: 0,
      nonConformances: 0
    };

    setAudits([newAudit, ...audits]);
    setShowNewAudit(false);
    setNewAuditForm({
      title: '',
      department: '',
      type: 'Internal',
      framework: '',
      auditor: '',
      dueDate: '',
      scope: '',
      objectives: ''
    });
  };

  const updateAuditStage = (auditId, newStage) => {
    setAudits(audits.map(audit => 
      audit.id === auditId ? { 
        ...audit, 
        stage: newStage,
        status: newStage.toLowerCase().replace(' ', '-'),
        progress: newStage === 'Closed' ? 100 : 
                 newStage === 'Final Review' ? 90 :
                 newStage === 'Report Drafted' ? 75 :
                 newStage === 'In Progress' ? 65 : 0
      } : audit
    ));
  };

  const StatCard = ({ icon: Icon, label, value, trend, color }) => (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-gray-600 mb-2">{label}</p>
          <p className={`text-3xl font-bold ${color}`}>{value}</p>
          {trend && (
            <div className="flex items-center gap-1 mt-2">
              <TrendingUp size={14} className="text-emerald-500" />
              <span className="text-xs text-emerald-600 font-medium">{trend}</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-xl bg-gradient-to-br ${color.includes('emerald') ? 'from-emerald-100 to-emerald-200' : 'from-blue-100 to-blue-200'} shadow-md`}>
          <Icon size={24} className={color} />
        </div>
      </div>
    </div>
  );

  const StatusBadge = ({ status, stage }) => {
    const config = {
      planned: { color: 'from-blue-500 to-blue-600', icon: Clock },
      'in-progress': { color: 'from-amber-500 to-amber-600', icon: RefreshCw },
      draft: { color: 'from-purple-500 to-purple-600', icon: FileText },
      review: { color: 'from-indigo-500 to-indigo-600', icon: Eye },
      completed: { color: 'from-emerald-500 to-emerald-600', icon: CheckCircle }
    };
    
    const { color, icon: Icon } = config[status] || config.planned;
    
    return (
      <span className={`px-4 py-1.5 text-xs font-bold bg-gradient-to-r ${color} text-white rounded-full shadow-md flex items-center gap-2`}>
        <Icon size={12} />
        {stage}
      </span>
    );
  };

  const PriorityBadge = ({ priority }) => {
    const config = {
      critical: { color: 'from-rose-500 to-rose-600', label: 'Critical' },
      high: { color: 'from-orange-500 to-orange-600', label: 'High' },
      medium: { color: 'from-blue-500 to-blue-600', label: 'Medium' },
      low: { color: 'from-gray-500 to-gray-600', label: 'Low' }
    };
    
    const { color, label } = config[priority] || config.medium;
    
    return (
      <span className={`px-3 py-1 text-xs font-bold bg-gradient-to-r ${color} text-white rounded-full`}>
        {label}
      </span>
    );
  };

  const ProgressBar = ({ progress, auditId }) => (
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div 
        className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-2.5 rounded-full transition-all duration-500"
        style={{ width: `${progress}%` }}
      />
      <div className="text-xs text-gray-600 mt-1 font-medium">{progress}% complete</div>
    </div>
  );

  const StageTracker = ({ currentStage, auditId }) => (
    <div className="relative">
      <div className="flex justify-between mb-2">
        {auditStages.map((stage, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg ${
              auditStages.findIndex(s => s.stage === currentStage) >= index 
                ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white' 
                : 'bg-gray-200 text-gray-400'
            }`}>
              {index + 1}
            </div>
            <span className="text-xs font-medium mt-2 text-center">{stage.stage}</span>
          </div>
        ))}
      </div>
      <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 -z-10" />
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50/30">
      {/* Header */}
      <header className="bg-gradient-to-r from-white to-blue-50 shadow-2xl">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-5">
              <div className="p-3 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl shadow-xl">
                <Shield className="text-white" size={32} />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent">
                  Audits Management
                </h1>
                <p className="text-gray-600 text-sm mt-2">
                  Ensuring compliance with SOPs, National Laws, and Standards (ISO)
                </p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <button 
                onClick={() => setShowNewAudit(true)}
                className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 cursor-pointer text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center gap-3"
              >
                <Plus size={20} />
                New Audit
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <StatCard 
            icon={ClipboardCheck}
            label="Total Audits"
            value={audits.length}
            trend="+2 this month"
            color="text-blue-600"
          />
          <StatCard 
            icon={AlertCircle}
            label="Open Findings"
            value={audits.reduce((sum, a) => sum + a.findings, 0)}
            color="text-amber-600"
          />
          <StatCard 
            icon={CheckCircle}
            label="Completed Audits"
            value={audits.filter(a => a.status === 'completed').length}
            trend="98% success"
            color="text-emerald-600"
          />
          <StatCard 
            icon={XCircle}
            label="Non-Conformances"
            value={audits.reduce((sum, a) => sum + a.nonConformances, 0)}
            color="text-rose-600"
          />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Audit List & Status Tracker */}
          <div className="lg:col-span-2 space-y-8">
            {/* Audit List */}
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-7 shadow-2xl">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent">
                  Active Audits
                </h2>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input 
                      type="text" 
                      placeholder="Search audits..." 
                      className="pl-10 pr-4 py-2.5 text-sm bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
                    />
                  </div>
                  <button className="px-4 py-2.5 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center gap-2">
                    <Filter size={18} />
                    Filter
                  </button>
                </div>
              </div>

              <div className="overflow-hidden rounded-xl">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-blue-50 to-gray-50">
                      <th className="py-4 px-6 text-left text-sm font-bold text-gray-700">Audit ID</th>
                      <th className="py-4 px-6 text-left text-sm font-bold text-gray-700">Title & Framework</th>
                      <th className="py-4 px-6 text-left text-sm font-bold text-gray-700">Status</th>
                      <th className="py-4 px-6 text-left text-sm font-bold text-gray-700">Progress</th>
                      <th className="py-4 px-6 text-left text-sm font-bold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {audits.map((audit) => (
                      <tr key={audit.id} className="hover:bg-blue-50/50 transition-colors">
                        <td className="py-5 px-6">
                          <div className="font-mono font-bold text-gray-900">{audit.id}</div>
                          <div className="text-xs text-gray-500 mt-1">{audit.department}</div>
                        </td>
                        <td className="py-5 px-6">
                          <div>
                            <div className="font-semibold text-gray-900">{audit.title}</div>
                            <div className="flex items-center gap-2 mt-2">
                              <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded">{audit.framework}</span>
                              <span className={`text-xs px-2 py-1 ${
                                audit.type === 'Internal' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                              } rounded`}>
                                {audit.type}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="py-5 px-6">
                          <div className="space-y-2">
                            <StatusBadge status={audit.status} stage={audit.stage} />
                            <div className="text-xs text-gray-500">
                              Due: {audit.dueDate}
                            </div>
                          </div>
                        </td>
                        <td className="py-5 px-6">
                          <ProgressBar progress={audit.progress} auditId={audit.id} />
                        </td>
                        <td className="py-5 px-6">
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={() => handleViewAudit(audit)}
                              className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded-lg transition-colors"
                              title="View Details"
                            >
                              <Eye size={18} />
                            </button>
                            <button 
                              onClick={() => updateAuditStage(audit.id, auditStages[auditStages.findIndex(s => s.stage === audit.stage) + 1]?.stage || audit.stage)}
                              className="p-2 text-emerald-600 hover:text-emerald-800 hover:bg-emerald-100 rounded-lg transition-colors"
                              title="Advance Stage"
                            >
                              <ArrowRight size={18} />
                            </button>
                            <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
                              <Settings size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Audit Status Tracker */}
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-7 shadow-2xl">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent">
                  Audit Status Tracker
                </h2>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock size={16} />
                  <span>Real-time tracking</span>
                </div>
              </div>

              <div className="space-y-8">
                <StageTracker 
                  currentStage={audits[0]?.stage || 'Planned'} 
                  auditId={audits[0]?.id}
                />
                
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {auditStages.map((stage, index) => (
                    <div key={index} className="bg-gradient-to-br from-gray-50 to-white p-4 rounded-xl shadow-sm">
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`w-3 h-3 rounded-full ${stage.color}`} />
                        <span className="text-sm font-semibold text-gray-900">{stage.stage}</span>
                      </div>
                      <p className="text-xs text-gray-600">{stage.description}</p>
                      <div className="text-lg font-bold text-gray-900 mt-2">
                        {audits.filter(a => a.stage === stage.stage).length}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Compliance & Evidence */}
          <div className="space-y-8">
            {/* Compliance Frameworks */}
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-7 shadow-2xl">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent">
                  Compliance Frameworks
                </h2>
                <button className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded-lg">
                  <Plus size={20} />
                </button>
              </div>

              <div className="space-y-4">
                {frameworks.map((framework, index) => (
                  <div key={index} className="p-4 bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <FileCheck size={20} className="text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{framework.name}</h3>
                          <p className="text-xs text-gray-600">{framework.type}</p>
                        </div>
                      </div>
                      <ChevronRight size={18} className="text-gray-400" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{framework.documents} documents</span>
                      <button className="px-3 py-1 text-xs font-medium text-blue-600 bg-blue-100 rounded-lg hover:bg-blue-200">
                        View SOPs
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Evidence Vault */}
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-7 shadow-2xl">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent">
                  Evidence Vault
                </h2>
                <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-100 rounded-lg hover:bg-blue-200">
                  <Upload size={16} />
                  Upload
                </button>
              </div>

              <div className="space-y-3">
                {evidenceItems.map((item) => (
                  <div key={item.id} className="p-4 bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${item.verified ? 'bg-emerald-100' : 'bg-amber-100'}`}>
                          <FileText size={18} className={item.verified ? 'text-emerald-600' : 'text-amber-600'} />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{item.name}</h3>
                          <p className="text-xs text-gray-500">{item.id} • {item.uploaded}</p>
                        </div>
                      </div>
                      {item.verified ? (
                        <CheckCircle size={18} className="text-emerald-500" />
                      ) : (
                        <AlertCircle size={18} className="text-amber-500" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Audit Trail */}
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-7 shadow-2xl">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent">
                  Audit Trail
                </h2>
                <History size={20} className="text-gray-400" />
              </div>

              <div className="space-y-4">
                {auditHistory.map((entry, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center flex-shrink-0">
                      <UserCheck size={16} className="text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-900">{entry.action}</span>
                        <span className="text-xs text-gray-500">{entry.timestamp}</span>
                      </div>
                      <p className="text-sm text-gray-600">{entry.user} • {entry.auditId}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* New Audit Modal */}
      {showNewAudit && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent">
                  Plan New Audit
                </h2>
                <button
                  onClick={() => setShowNewAudit(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  <XCircle size={24} />
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Audit Title</label>
                    <input
                      type="text"
                      value={newAuditForm.title}
                      onChange={(e) => setNewAuditForm({...newAuditForm, title: e.target.value})}
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., ISO 14001 Certification Audit"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Department</label>
                    <select
                      value={newAuditForm.department}
                      onChange={(e) => setNewAuditForm({...newAuditForm, department: e.target.value})}
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select Department</option>
                      <option value="Quality Management">Quality Management</option>
                      <option value="Health & Safety">Health & Safety</option>
                      <option value="Operations">Operations</option>
                      <option value="Finance">Finance</option>
                      <option value="IT">IT</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Audit Type</label>
                    <div className="flex gap-4">
                      <button
                        onClick={() => setNewAuditForm({...newAuditForm, type: 'Internal'})}
                        className={`flex-1 px-4 py-3 rounded-xl border ${
                          newAuditForm.type === 'Internal' 
                            ? 'border-blue-500 bg-blue-50 text-blue-700' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        Internal Audit
                      </button>
                      <button
                        onClick={() => setNewAuditForm({...newAuditForm, type: 'External'})}
                        className={`flex-1 px-4 py-3 rounded-xl border ${
                          newAuditForm.type === 'External' 
                            ? 'border-blue-500 bg-blue-50 text-blue-700' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        External Audit
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Due Date</label>
                    <input
                      type="date"
                      value={newAuditForm.dueDate}
                      onChange={(e) => setNewAuditForm({...newAuditForm, dueDate: e.target.value})}
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Compliance Framework</label>
                  <select
                    value={newAuditForm.framework}
                    onChange={(e) => setNewAuditForm({...newAuditForm, framework: e.target.value})}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Framework</option>
                    <option value="ISO 9001:2015">ISO 9001:2015</option>
                    <option value="ISO 14001:2015">ISO 14001:2015</option>
                    <option value="OSHA Standards">OSHA Standards</option>
                    <option value="GDPR Compliance">GDPR Compliance</option>
                    <option value="Company SOPs">Company SOPs</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Audit Scope & Objectives</label>
                  <textarea
                    rows={4}
                    value={newAuditForm.scope}
                    onChange={(e) => setNewAuditForm({...newAuditForm, scope: e.target.value})}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Define the audit scope, objectives, and departments to be covered..."
                  />
                </div>

                <div className="flex gap-4 pt-6">
                  <button
                    onClick={handleCreateAudit}
                    className="flex-1 px-6 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl font-bold cursor-pointer shadow-lg hover:shadow-xl transition-all"
                  >
                    Create Audit Plan
                  </button>
                  <button
                    onClick={() => setShowNewAudit(false)}
                    className="px-6 py-4  bg-white border cursor-pointer border-gray-400 text-gray-700 rounded-xl font-semibold hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Audit Detail Modal */}
      {selectedAudit && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl w-full max-w-4xl shadow-3xl max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent">
                    {selectedAudit.title}
                  </h2>
                  <p className="text-gray-600 mt-2">{selectedAudit.id} • {selectedAudit.department}</p>
                </div>
                <button
                  onClick={() => setSelectedAudit(null)}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  <XCircle size={24} />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Audit Details */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-2xl shadow-lg">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Audit Details</h3>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Framework</p>
                        <p className="font-semibold text-gray-900">{selectedAudit.framework}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Auditor</p>
                        <p className="font-semibold text-gray-900">{selectedAudit.auditor}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Start Date</p>
                        <p className="font-semibold text-gray-900">{selectedAudit.startDate}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Due Date</p>
                        <p className="font-semibold text-gray-900">{selectedAudit.dueDate}</p>
                      </div>
                    </div>
                  </div>

                  {/* Root Cause Analysis */}
                  <div className="bg-gradient-to-br from-amber-50 to-white p-6 rounded-2xl shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-gray-900">Root Cause Analysis</h3>
                      <AlertCircle size={20} className="text-amber-600" />
                    </div>
                    <p className="text-sm text-gray-700 mb-4">
                      Document the root cause for any non-conformances identified during the audit.
                    </p>
                    <button className="px-4 py-2 bg-amber-100 text-amber-700 rounded-lg font-medium hover:bg-amber-200">
                      + Add Analysis
                    </button>
                  </div>

                  {/* Closing Meeting Notes */}
                  <div className="bg-gradient-to-br from-emerald-50 to-white p-6 rounded-2xl shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-gray-900">Closing Meeting Notes</h3>
                      <MessageSquare size={20} className="text-emerald-600" />
                    </div>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="Enter recommendations and final observations..."
                    />
                  </div>
                </div>

                {/* Sidebar Actions */}
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-2xl shadow-lg">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Actions</h3>
                    <div className="space-y-3">
                      <button className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700">
                        Download Report
                      </button>
                      <button className="w-full px-4 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50">
                        Share Findings
                      </button>
                      <button className="w-full px-4 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50">
                        Schedule Follow-up
                      </button>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-2xl shadow-lg">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Stats</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Findings</span>
                        <span className="font-bold text-gray-900">{selectedAudit.findings}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Non-Conformances</span>
                        <span className="font-bold text-rose-600">{selectedAudit.nonConformances}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Priority</span>
                        <PriorityBadge priority={selectedAudit.priority} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};