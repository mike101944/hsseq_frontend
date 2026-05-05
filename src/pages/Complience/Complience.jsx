import React, { useState } from 'react';
import {
  FileText, Shield, AlertCircle, CheckCircle, Clock,
  Calendar, Users, Upload, Download, Eye, Edit,
  Trash2, Plus, Search, Filter, ChevronRight,
  BarChart, TrendingUp, XCircle, Settings, ExternalLink,
  MapPin, BookOpen, FileCheck, Award, Bell, RefreshCw,
  PieChart, Target, Lock, History, MessageSquare,
  ChevronLeft, ChevronRight as ChevronRightIcon, Copy, Link,
  Tag, User, Building, AlertTriangle, Zap, ThermometerSun
} from 'lucide-react';

export const Complience = () => {
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showSheet, setShowSheet] = useState(false);

  // Compliance Register Data
  const [laws, setLaws] = useState([
    {
      id: 'LAW-001',
      title: 'Occupational Health and Safety Act, 2003',
      category: 'Safety',
      status: 'active',
      obligations: 15,
      lastReview: '2024-01-15',
      riskLevel: 'high',
      complianceScore: 85
    },
    {
      id: 'LAW-002',
      title: 'Environmental Management Act, 2004',
      category: 'Environmental',
      status: 'active',
      obligations: 22,
      lastReview: '2024-01-10',
      riskLevel: 'medium',
      complianceScore: 92
    },
    {
      id: 'LAW-003',
      title: 'Factories Act',
      category: 'Operations',
      status: 'active',
      obligations: 18,
      lastReview: '2023-12-20',
      riskLevel: 'high',
      complianceScore: 78
    },
    {
      id: 'LAW-004',
      title: 'Fire Safety Regulations',
      category: 'Safety',
      status: 'active',
      obligations: 12,
      lastReview: '2024-01-05',
      riskLevel: 'medium',
      complianceScore: 95
    },
    {
      id: 'LAW-005',
      title: 'Data Protection Act',
      category: 'IT',
      status: 'pending',
      obligations: 8,
      lastReview: '2023-11-30',
      riskLevel: 'low',
      complianceScore: 65
    },
    {
      id: 'LAW-006',
      title: 'Labor Relations Act',
      category: 'HR',
      status: 'active',
      obligations: 20,
      lastReview: '2024-01-18',
      riskLevel: 'medium',
      complianceScore: 88
    },
    {
      id: 'LAW-007',
      title: 'Public Health Act',
      category: 'Health',
      status: 'active',
      obligations: 14,
      lastReview: '2024-01-12',
      riskLevel: 'medium',
      complianceScore: 90
    }
  ]);

  // Permit & License Data
  const [permits, setPermits] = useState([
    {
      id: 'PER-001',
      name: 'Business License',
      authority: 'BRELA',
      expiryDate: '2024-04-15',
      daysRemaining: 45,
      status: 'active',
      reminderSent: true
    },
    {
      id: 'PER-002',
      name: 'Fire Safety Certificate',
      authority: 'Fire Department',
      expiryDate: '2024-03-30',
      daysRemaining: 30,
      status: 'expiring',
      reminderSent: true
    },
    {
      id: 'PER-003',
      name: 'Environmental Impact Certificate',
      authority: 'NEMC',
      expiryDate: '2024-06-20',
      daysRemaining: 111,
      status: 'active',
      reminderSent: false
    },
    {
      id: 'PER-004',
      name: 'Waste Management License',
      authority: 'Local Government',
      expiryDate: '2024-02-28',
      daysRemaining: 8,
      status: 'critical',
      reminderSent: true
    },
    {
      id: 'PER-005',
      name: 'Occupational Health License',
      authority: 'OSHA',
      expiryDate: '2024-12-31',
      daysRemaining: 325,
      status: 'active',
      reminderSent: false
    }
  ]);

  // ISO Standards Data
  const [isoStandards, setIsoStandards] = useState([
    {
      id: 'ISO-001',
      name: 'ISO 9001:2015',
      type: 'Quality Management',
      clauses: 10,
      compliantClauses: 8,
      status: 'partial'
    },
    {
      id: 'ISO-002',
      name: 'ISO 14001:2015',
      type: 'Environmental Management',
      clauses: 10,
      compliantClauses: 6,
      status: 'partial'
    },
    {
      id: 'ISO-003',
      name: 'ISO 45001:2018',
      type: 'Occupational Health & Safety',
      clauses: 10,
      compliantClauses: 9,
      status: 'compliant'
    }
  ]);

  // Compliance Tasks
  const [tasks, setTasks] = useState([
    {
      id: 'TASK-001',
      title: 'Monthly Fire Equipment Inspection',
      lawId: 'LAW-004',
      assignedTo: 'Safety Manager',
      dueDate: '2024-02-15',
      status: 'pending',
      evidence: false,
      priority: 'high'
    },
    {
      id: 'TASK-002',
      title: 'Submit Environmental Quarterly Report',
      lawId: 'LAW-002',
      assignedTo: 'Environmental Officer',
      dueDate: '2024-01-31',
      status: 'overdue',
      evidence: false,
      priority: 'critical'
    },
    {
      id: 'TASK-003',
      title: 'Employee Safety Training Certification',
      lawId: 'LAW-001',
      assignedTo: 'HR Manager',
      dueDate: '2024-03-01',
      status: 'in-progress',
      evidence: true,
      priority: 'medium'
    },
    {
      id: 'TASK-004',
      title: 'Electrical Installation Compliance Check',
      lawId: 'LAW-003',
      assignedTo: 'Electrical Engineer',
      dueDate: '2024-02-28',
      status: 'pending',
      evidence: false,
      priority: 'high'
    }
  ]);

  // Heat Map Data
  const [heatMap, setHeatMap] = useState([
    { department: 'Safety', risk: 8, compliance: 85, color: 'bg-red-500' },
    { department: 'Environmental', risk: 6, compliance: 92, color: 'bg-yellow-500' },
    { department: 'Operations', risk: 7, compliance: 78, color: 'bg-orange-500' },
    { department: 'HR', risk: 4, compliance: 88, color: 'bg-green-500' },
    { department: 'IT', risk: 3, compliance: 65, color: 'bg-blue-500' },
  ]);

  // Stats
  const totalCompliance = Math.round(
    laws.reduce((acc, law) => acc + law.complianceScore, 0) / laws.length
  );
  const expiringPermits = permits.filter(p => p.status === 'expiring' || p.status === 'critical').length;
  const overdueTasks = tasks.filter(t => t.status === 'overdue').length;

  // Pagination Calculations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentLaws = laws.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(laws.length / itemsPerPage);

  const handleViewMore = (item) => {
    setSelectedItem(item);
    setShowSheet(true);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (value) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1);
  };

  const StatCard = ({ icon: Icon, label, value, color, trend }) => (
    <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-2">{label}</p>
          <p className={`text-3xl font-bold ${color}`}>{value}</p>
          {trend && (
            <div className="flex items-center gap-1 mt-2">
              <TrendingUp size={14} className="text-green-500" />
              <span className="text-xs text-green-600 font-medium">{trend}</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg ${
          color.includes('green') ? 'bg-green-100' : 
          color.includes('yellow') ? 'bg-yellow-100' : 'bg-red-100'
        }`}>
          <Icon size={24} className={color} />
        </div>
      </div>
    </div>
  );

  const StatusBadge = ({ status }) => {
    const config = {
      active: { bg: 'bg-green-100', text: 'text-green-800', label: 'Active' },
      pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Pending' },
      expiring: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Expiring' },
      critical: { bg: 'bg-red-100', text: 'text-red-800', label: 'Critical' },
      overdue: { bg: 'bg-red-100', text: 'text-red-800', label: 'Overdue' },
      'in-progress': { bg: 'bg-blue-100', text: 'text-blue-800', label: 'In Progress' },
      partial: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Partial' },
      compliant: { bg: 'bg-green-100', text: 'text-green-800', label: 'Compliant' }
    };
    
    const { bg, text, label } = config[status] || config.active;
    
    return (
      <span className={`px-3 py-1 text-xs font-medium rounded-full ${bg} ${text}`}>
        {label}
      </span>
    );
  };

  const RiskBadge = ({ level }) => {
    const config = {
      high: { bg: 'bg-red-100', text: 'text-red-800', label: 'High Risk' },
      medium: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Medium Risk' },
      low: { bg: 'bg-green-100', text: 'text-green-800', label: 'Low Risk' },
      critical: { bg: 'bg-red-100', text: 'text-red-800', label: 'Critical' }
    };
    
    const { bg, text, label } = config[level] || config.medium;
    
    return (
      <span className={`px-3 py-1 text-xs font-medium rounded-full ${bg} ${text}`}>
        {label}
      </span>
    );
  };

  const PriorityBadge = ({ priority }) => {
    const config = {
      high: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: AlertTriangle },
      critical: { bg: 'bg-red-100', text: 'text-red-800', icon: AlertCircle },
      medium: { bg: 'bg-green-100', text: 'text-green-800', icon: Clock }
    };
    
    const { bg, text, icon: Icon } = config[priority] || config.medium;
    
    return (
      <span className={`px-3 py-1 text-xs font-medium rounded-full flex items-center gap-1 ${bg} ${text}`}>
        <Icon size={12} />
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </span>
    );
  };

  const HeatMapCell = ({ value, max = 10 }) => {
    const intensity = Math.min(Math.round((value / max) * 100), 100);
    const getColor = () => {
      if (intensity >= 80) return 'bg-red-500';
      if (intensity >= 60) return 'bg-orange-500';
      if (intensity >= 40) return 'bg-yellow-500';
      return 'bg-green-500';
    };
    
    return (
      <div className="relative group">
        <div 
          className={`w-8 h-8 ${getColor()} rounded-sm transition-all group-hover:scale-110`}
          style={{ opacity: intensity / 100 }}
        />
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Risk Level: {value}/10
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-green-500 to-yellow-500 rounded-lg">
                <Shield className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Compliance Management</h1>
                <p className="text-gray-600 text-sm">
                  Legal & Regulatory Compliance Tracking System
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-medium hover:from-green-600 hover:to-green-700 transition-all flex items-center gap-2">
                <Plus size={18} />
                New Regulation
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard 
            icon={CheckCircle}
            label="Overall Compliance Score"
            value={`${totalCompliance}%`}
            color={totalCompliance >= 90 ? "text-green-600" : totalCompliance >= 70 ? "text-yellow-600" : "text-red-600"}
            trend={totalCompliance >= 90 ? "Excellent" : totalCompliance >= 70 ? "Good" : "Needs Improvement"}
          />
          <StatCard 
            icon={AlertCircle}
            label="Expiring Permits"
            value={expiringPermits}
            color={expiringPermits === 0 ? "text-green-600" : expiringPermits <= 2 ? "text-yellow-600" : "text-red-600"}
          />
          <StatCard 
            icon={Clock}
            label="Overdue Tasks"
            value={overdueTasks}
            color={overdueTasks === 0 ? "text-green-600" : "text-yellow-600"}
          />
          <StatCard 
            icon={FileText}
            label="Active Regulations"
            value={laws.length}
            color="text-green-600"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Compliance Register Table */}
            <div className="bg-white rounded-xl shadow-lg">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">Compliance Register</h2>
                    <p className="text-sm text-gray-600 mt-1">All applicable laws and regulations</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <input 
                        type="text" 
                        placeholder="Search regulations..." 
                        className="pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent w-48"
                      />
                    </div>
                    <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 flex items-center gap-2">
                      <Filter size={16} />
                      Filter
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="py-3 px-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">ID</th>
                      <th className="py-3 px-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Regulation</th>
                      <th className="py-3 px-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Category</th>
                      <th className="py-3 px-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Obligations</th>
                      <th className="py-3 px-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Risk Level</th>
                      <th className="py-3 px-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Compliance</th>
                      <th className="py-3 px-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {currentLaws.map((law) => (
                      <tr key={law.id} className="hover:bg-gray-50">
                        <td className="py-4 px-6">
                          <div className="font-mono text-sm font-medium text-gray-900">{law.id}</div>
                        </td>
                        <td className="py-4 px-6">
                          <div>
                            <div className="font-medium text-gray-900">{law.title}</div>
                            <StatusBadge status={law.status} />
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span className="text-sm text-gray-700">{law.category}</span>
                        </td>
                        <td className="py-4 px-6">
                          <span className="text-sm font-medium">{law.obligations} items</span>
                        </td>
                        <td className="py-4 px-6">
                          <RiskBadge level={law.riskLevel} />
                        </td>
                        <td className="py-4 px-6">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                law.complianceScore >= 90 ? 'bg-green-500' : 
                                law.complianceScore >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${law.complianceScore}%` }}
                            />
                          </div>
                          <div className="text-xs text-gray-600 mt-1">{law.complianceScore}%</div>
                        </td>
                        <td className="py-4 px-6">
                          <button 
                            onClick={() => handleViewMore(law)}
                            className="px-3 py-1.5 text-sm font-medium text-green-600 bg-green-50 rounded-lg hover:bg-green-100 transition-colors flex items-center gap-2"
                          >
                            <Eye size={14} />
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-700">
                    Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, laws.length)} of {laws.length} entries
                  </span>
                  <select 
                    value={itemsPerPage}
                    onChange={(e) => handleItemsPerPageChange(e.target.value)}
                    className="text-sm border border-gray-300 rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="5">5 per page</option>
                    <option value="10">10 per page</option>
                    <option value="25">25 per page</option>
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`p-2 rounded-lg ${currentPage === 1 ? 'text-gray-400' : 'text-gray-700 hover:bg-gray-100'}`}
                  >
                    <ChevronLeft size={20} />
                  </button>
                  
                  {[...Array(totalPages)].map((_, i) => {
                    const pageNumber = i + 1;
                    const isCurrent = pageNumber === currentPage;
                    const showPage = 
                      pageNumber === 1 || 
                      pageNumber === totalPages || 
                      (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1);
                    
                    if (!showPage) {
                      if (pageNumber === currentPage - 2 || pageNumber === currentPage + 2) {
                        return <span key={i} className="px-3 py-1 text-gray-400">...</span>;
                      }
                      return null;
                    }
                    
                    return (
                      <button
                        key={i}
                        onClick={() => handlePageChange(pageNumber)}
                        className={`px-3 py-1.5 text-sm font-medium rounded-lg ${
                          isCurrent 
                            ? 'bg-green-100 text-green-700' 
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {pageNumber}
                      </button>
                    );
                  })}
                  
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`p-2 rounded-lg ${currentPage === totalPages ? 'text-gray-400' : 'text-gray-700 hover:bg-gray-100'}`}
                  >
                    <ChevronRightIcon size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* Permit & License Tracker */}
            <div className="bg-white rounded-xl shadow-lg">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">Permit & License Tracker</h2>
                    <p className="text-sm text-gray-600 mt-1">Monitor all regulatory permits and licenses</p>
                  </div>
                  <button className="px-4 py-2 text-sm font-medium text-green-600 bg-green-50 rounded-lg hover:bg-green-100 flex items-center gap-2">
                    <Bell size={16} />
                    Set Reminder
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  {permits.map((permit) => (
                    <div key={permit.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-lg ${
                          permit.status === 'critical' ? 'bg-red-100 text-red-600' :
                          permit.status === 'expiring' ? 'bg-yellow-100 text-yellow-600' :
                          'bg-green-100 text-green-600'
                        }`}>
                          <FileText size={20} />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{permit.name}</h3>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-sm text-gray-600">{permit.authority}</span>
                            <span className="text-sm text-gray-600">•</span>
                            <span className={`text-sm font-medium ${
                              permit.daysRemaining <= 30 ? 'text-red-600' : 
                              permit.daysRemaining <= 90 ? 'text-yellow-600' : 'text-green-600'
                            }`}>
                              {permit.daysRemaining} days remaining
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <StatusBadge status={permit.status} />
                        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-lg">
                          <Eye size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Standards Management */}
            <div className="bg-white rounded-xl shadow-lg">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Standards Management</h2>
              </div>
              
              <div className="p-6 space-y-4">
                {isoStandards.map((standard) => (
                  <div key={standard.id} className="p-4 border border-gray-200 rounded-lg hover:border-green-300 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-medium text-gray-900">{standard.name}</h3>
                        <p className="text-sm text-gray-600">{standard.type}</p>
                      </div>
                      <StatusBadge status={standard.status} />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Compliance Progress</span>
                        <span className="font-medium">{standard.compliantClauses}/{standard.clauses} clauses</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            (standard.compliantClauses / standard.clauses) >= 0.9 ? 'bg-green-500' :
                            (standard.compliantClauses / standard.clauses) >= 0.7 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${(standard.compliantClauses / standard.clauses) * 100}%` }}
                        />
                      </div>
                      <button className="w-full mt-2 px-3 py-1.5 text-sm font-medium text-green-600 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                        View Gap Analysis
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Task & Obligation Tracking */}
            <div className="bg-white rounded-xl shadow-lg">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Obligation Tasks</h2>
                  <span className="text-sm font-medium text-red-600">{overdueTasks} overdue</span>
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                {tasks.map((task) => (
                  <div key={task.id} className="p-4 border border-gray-200 rounded-lg hover:border-yellow-300 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-medium text-gray-900">{task.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">Assigned to: {task.assignedTo}</p>
                      </div>
                      <PriorityBadge priority={task.priority} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className={`text-sm font-medium ${
                          task.status === 'overdue' ? 'text-red-600' : 
                          task.status === 'pending' ? 'text-yellow-600' : 'text-green-600'
                        }`}>
                          {task.dueDate}
                        </span>
                        <StatusBadge status={task.status} />
                      </div>
                      <div className="flex items-center gap-2">
                        {task.evidence ? (
                          <CheckCircle size={18} className="text-green-500" />
                        ) : (
                          <Upload size={18} className="text-gray-400 hover:text-green-600 cursor-pointer" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Heat Map */}
            <div className="bg-white rounded-xl shadow-lg">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Risk Heat Map</h2>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-5 gap-4 mb-6">
                  {heatMap.map((dept, index) => (
                    <div key={index} className="text-center">
                      <div className="mb-2">
                        <HeatMapCell value={dept.risk} />
                      </div>
                      <div className="text-xs font-medium text-gray-700">{dept.department}</div>
                      <div className="text-xs text-gray-600">{dept.compliance}% compliant</div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between text-xs text-gray-600">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
                    <span>Low Risk</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-sm"></div>
                    <span>Medium Risk</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-sm"></div>
                    <span>High Risk</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sheet Component */}
      {showSheet && selectedItem && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-transparent" onClick={() => setShowSheet(false)}></div>
          <div className="absolute inset-y-0 right-0 max-w-2xl w-full bg-white shadow-2xl transform transition-transform duration-300 ease-in-out">
            <div className="h-full flex flex-col">
              {/* Sheet Header */}
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{selectedItem.title}</h2>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-sm px-3 py-1 bg-green-100 text-green-800 rounded-full">
                        {selectedItem.category}
                      </span>
                      <RiskBadge level={selectedItem.riskLevel} />
                    </div>
                  </div>
                  <button 
                    onClick={() => setShowSheet(false)}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
                  >
                    <XCircle size={24} />
                  </button>
                </div>
              </div>

              {/* Sheet Content */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="space-y-6">
                  {/* Basic Info */}
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-600 mb-2">Regulation ID</h3>
                      <p className="font-medium text-gray-900">{selectedItem.id}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-600 mb-2">Last Reviewed</h3>
                      <p className="font-medium text-gray-900">{selectedItem.lastReview}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-600 mb-2">Obligations</h3>
                      <p className="font-medium text-gray-900">{selectedItem.obligations} items</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-600 mb-2">Compliance Score</h3>
                      <div className="flex items-center gap-3">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              selectedItem.complianceScore >= 90 ? 'bg-green-500' : 
                              selectedItem.complianceScore >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${selectedItem.complianceScore}%` }}
                          />
                        </div>
                        <span className="font-medium text-gray-900">{selectedItem.complianceScore}%</span>
                      </div>
                    </div>
                  </div>

                  {/* Obligations Section */}
                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Detailed Obligations</h3>
                    <div className="space-y-3">
                      {[...Array(Math.min(selectedItem.obligations, 5))].map((_, i) => (
                        <div key={i} className="p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-medium text-gray-900">
                                Obligation {i + 1}: Fire extinguisher placement
                              </h4>
                              <p className="text-sm text-gray-600 mt-1">
                                Must have fire extinguishers placed every 15 meters in all work areas
                              </p>
                            </div>
                            <StatusBadge status="active" />
                          </div>
                          <div className="mt-3 flex items-center justify-between">
                            <div className="flex items-center gap-4 text-sm">
                              <span className="text-gray-600">Assigned to: Safety Officer</span>
                              <span className="text-gray-600">Due: 2024-02-15</span>
                            </div>
                            <button className="text-sm text-green-600 hover:text-green-800 font-medium">
                              View Evidence
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Related Tasks */}
                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Tasks</h3>
                    <div className="space-y-3">
                      {tasks
                        .filter(task => task.lawId === selectedItem.id)
                        .map(task => (
                          <div key={task.id} className="p-4 border border-gray-200 rounded-lg">
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="font-medium text-gray-900">{task.title}</h4>
                              <PriorityBadge priority={task.priority} />
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <div className="space-y-1">
                                <p className="text-gray-600">Assigned to: {task.assignedTo}</p>
                                <p className={`font-medium ${
                                  task.status === 'overdue' ? 'text-red-600' : 'text-gray-900'
                                }`}>
                                  Due: {task.dueDate}
                                </p>
                              </div>
                              <div className="flex items-center gap-3">
                                <StatusBadge status={task.status} />
                                {task.evidence ? (
                                  <CheckCircle size={18} className="text-green-500" />
                                ) : (
                                  <Upload size={18} className="text-gray-400 cursor-pointer" />
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>

                  {/* Actions */}
                  
                  <div className="border-t border-gray-200 pt-6">
                    <div className="flex items-center gap-4">
                      <button className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-medium hover:from-green-600 hover:to-green-700 transition-all flex items-center gap-2">
                        <Edit size={18} />
                        Edit Regulation
                      </button>
                      <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center gap-2">
                        <Download size={18} />
                        Export Details
                      </button>
                      <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center gap-2">
                        <Link size={18} />
                        Link to Audit
                      </button>
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