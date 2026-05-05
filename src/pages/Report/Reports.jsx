import React, { useState } from 'react';
import {
  FileText, BarChart, TrendingUp, Download, Calendar,
  Filter, Plus, Search, Clock, Eye, Edit, Trash2,
  Share2, Mail, Zap, Brain, MessageSquare, Upload,
  ChevronRight, ChevronLeft, X, Settings, Printer,
  FileSpreadsheet, Presentation, RefreshCw,
  AlertCircle, CheckCircle, PieChart, Target, Users,
  Shield, Thermometer, Database, Sparkles, Mic,
  Bot, History, BookOpen, Hash, Grid, Columns,
  Smartphone, Monitor, Tablet, Cloud, File
} from 'lucide-react';

export const Reports = () => {
  // State Management
  const [reports, setReports] = useState([
    {
      id: 'REP-2024-001',
      title: 'Monthly Safety Performance Report',
      type: 'Executive Summary',
      source: 'Incidents + Inspections',
      frequency: 'Monthly',
      lastRun: '2024-01-31',
      status: 'generated',
      downloads: 142,
      schedule: 'Every 1st Monday',
      aiAssisted: true
    },
    {
      id: 'REP-2024-002',
      title: 'Q4 Compliance Dashboard',
      type: 'Compliance',
      source: 'Audits + Regulations',
      frequency: 'Quarterly',
      lastRun: '2024-01-15',
      status: 'scheduled',
      downloads: 89,
      schedule: 'Quarterly',
      aiAssisted: true
    },
    {
      id: 'REP-2024-003',
      title: 'Incident Analysis - January',
      type: 'Analysis',
      source: 'Incidents',
      frequency: 'Monthly',
      lastRun: '2024-01-30',
      status: 'generated',
      downloads: 203,
      schedule: 'End of Month',
      aiAssisted: false
    },
    {
      id: 'REP-2024-004',
      title: 'Training Effectiveness Report',
      type: 'Performance',
      source: 'Training + Incidents',
      frequency: 'Bi-Monthly',
      lastRun: '2024-01-25',
      status: 'draft',
      downloads: 56,
      schedule: 'Bi-Monthly',
      aiAssisted: true
    },
    {
      id: 'REP-2024-005',
      title: 'Site Safety Heat Map',
      type: 'Visual',
      source: 'Inspections + Audits',
      frequency: 'Weekly',
      lastRun: '2024-01-29',
      status: 'generated',
      downloads: 178,
      schedule: 'Weekly',
      aiAssisted: true
    },
    {
      id: 'REP-2024-006',
      title: 'Regulatory Submission Report',
      type: 'Compliance',
      source: 'Regulations',
      frequency: 'Annual',
      lastRun: '2023-12-31',
      status: 'generated',
      downloads: 45,
      schedule: 'Annually',
      aiAssisted: false
    }
  ]);

  const [aiPrompts, setAiPrompts] = useState([
    {
      id: 'PROMPT-001',
      title: 'Root Cause Analysis',
      description: 'Analyze last 5 incidents and suggest common root causes',
      category: 'Incidents',
      used: 42,
      favorite: true
    },
    {
      id: 'PROMPT-002',
      title: 'Predictive Risk Assessment',
      description: 'Predict high-risk areas for next month based on trends',
      category: 'Risk',
      used: 31,
      favorite: true
    },
    {
      id: 'PROMPT-003',
      title: 'Compliance Gap Detection',
      description: 'Identify OSHA regulation violations in recent inspections',
      category: 'Compliance',
      used: 28,
      favorite: false
    },
    {
      id: 'PROMPT-004',
      title: 'Sentiment Analysis',
      description: 'Analyze worker feedback for burnout or dissatisfaction',
      category: 'Workforce',
      used: 19,
      favorite: false
    },
    {
      id: 'PROMPT-005',
      title: 'KPI Trend Analysis',
      description: 'Compare lagging vs leading indicators performance',
      category: 'Performance',
      used: 37,
      favorite: true
    }
  ]);

  const [activeTab, setActiveTab] = useState('reports');
  const [selectedReport, setSelectedReport] = useState(null);
  const [showReportBuilder, setShowReportBuilder] = useState(false);
  const [showAiChat, setShowAiChat] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [aiMessage, setAiMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { id: 1, sender: 'ai', message: 'Hello! I\'m your AI Safety Assistant. How can I help you analyze safety data today?' },
    { id: 2, sender: 'user', message: 'Show me near misses trend for last month' },
    { id: 3, sender: 'ai', message: 'Analyzing... Near misses increased by 15% in Shipping Department. Would you like root cause analysis?' }
  ]);

  // KPI Data
  const kpiData = {
    laggingIndicators: [
      { label: 'Total Incidents', value: 24, change: -8, trend: 'down' },
      { label: 'Lost Time Injuries', value: 3, change: -25, trend: 'down' },
      { label: 'Near Misses', value: 142, change: 15, trend: 'up' }
    ],
    leadingIndicators: [
      { label: 'Inspections Completed', value: 189, change: 12, trend: 'up' },
      { label: 'Training Hours', value: 2450, change: 8, trend: 'up' },
      { label: 'Safety Observations', value: 324, change: 5, trend: 'up' }
    ]
  };

  // Report Builder State
  const [reportBuilder, setReportBuilder] = useState({
    name: '',
    dataSource: [],
    filters: {
      dateRange: 'lastMonth',
      department: 'all',
      incidentType: 'all',
      severity: 'all'
    },
    columns: [
      { id: 'date', name: 'Date', selected: true },
      { id: 'type', name: 'Incident Type', selected: true },
      { id: 'location', name: 'Location', selected: true },
      { id: 'severity', name: 'Severity', selected: true },
      { id: 'status', name: 'Status', selected: true },
      { id: 'assigned', name: 'Assigned To', selected: false },
      { id: 'cost', name: 'Estimated Cost', selected: false }
    ],
    format: 'pdf',
    schedule: 'none'
  });

  // Pagination Calculations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentReports = reports.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(reports.length / itemsPerPage);

  // Component Functions
  const generateReport = () => {
    const newReport = {
      id: `REP-2024-${String(reports.length + 1).padStart(3, '0')}`,
      title: reportBuilder.name || 'Custom Report',
      type: 'Custom',
      source: 'Multiple Sources',
      frequency: 'One-time',
      lastRun: new Date().toISOString().split('T')[0],
      status: 'generated',
      downloads: 0,
      schedule: reportBuilder.schedule === 'none' ? 'One-time' : reportBuilder.schedule,
      aiAssisted: true
    };
    
    setReports([newReport, ...reports]);
    setShowReportBuilder(false);
    setReportBuilder({
      name: '',
      dataSource: [],
      filters: {
        dateRange: 'lastMonth',
        department: 'all',
        incidentType: 'all',
        severity: 'all'
      },
      columns: [
        { id: 'date', name: 'Date', selected: true },
        { id: 'type', name: 'Incident Type', selected: true },
        { id: 'location', name: 'Location', selected: true },
        { id: 'severity', name: 'Severity', selected: true },
        { id: 'status', name: 'Status', selected: true },
        { id: 'assigned', name: 'Assigned To', selected: false },
        { id: 'cost', name: 'Estimated Cost', selected: false }
      ],
      format: 'pdf',
      schedule: 'none'
    });
  };

  const sendToAi = () => {
    if (!aiMessage.trim()) return;
    
    const newMessage = {
      id: chatHistory.length + 1,
      sender: 'user',
      message: aiMessage
    };
    
    setChatHistory([...chatHistory, newMessage]);
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: chatHistory.length + 2,
        sender: 'ai',
        message: `Analyzing your query about "${aiMessage}". Based on recent data, I've identified patterns and prepared recommendations.`
      };
      setChatHistory(prev => [...prev, aiResponse]);
    }, 1000);
    
    setAiMessage('');
  };

  const StatusBadge = ({ status }) => {
    const config = {
      generated: { bg: 'bg-green-100', text: 'text-green-800', label: 'Generated' },
      scheduled: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Scheduled' },
      draft: { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Draft' },
      running: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Running' }
    };
    
    const { bg, text, label } = config[status] || config.generated;
    
    return (
      <span className={`px-3 py-1 text-xs font-medium rounded-full ${bg} ${text}`}>
        {label}
      </span>
    );
  };

  const FormatBadge = ({ format }) => {
    const icons = {
      pdf: File,
      excel: FileSpreadsheet,
      powerpoint: Presentation,
      word: FileText
    };
    
    const Icon = icons[format] || FileText;
    
    return (
      <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-lg">
        <Icon size={14} className="text-gray-600" />
        <span className="text-xs font-medium text-gray-700 uppercase">{format}</span>
      </div>
    );
  };

  const StatCard = ({ icon: Icon, label, value, change, trend, color }) => (
    <div className="bg-white rounded-xl p-5 shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className={`p-2 rounded-lg ${color === 'green' ? 'bg-green-100' : 'bg-yellow-100'}`}>
              <Icon size={20} className={color === 'green' ? 'text-green-600' : 'text-yellow-600'} />
            </div>
            <span className="text-sm font-medium text-gray-600">{label}</span>
          </div>
          <div className="flex items-baseline gap-3">
            <span className="text-2xl font-bold text-gray-900">{value}</span>
            {change && (
              <span className={`text-sm font-medium ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {trend === 'up' ? '↗' : '↘'} {Math.abs(change)}%
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const AIPromptCard = ({ prompt }) => (
    <div className="bg-white rounded-xl p-5 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles size={16} className="text-yellow-600" />
            <span className="text-xs font-medium px-2 py-1 bg-yellow-100 text-yellow-800 rounded">
              {prompt.category}
            </span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">{prompt.title}</h3>
          <p className="text-sm text-gray-600">{prompt.description}</p>
        </div>
        {prompt.favorite && (
          <div className="p-1 text-yellow-500">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
        )}
      </div>
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500">{prompt.used} uses</span>
        <button className="px-3 py-1 text-xs font-medium text-green-600 bg-green-50 rounded-lg hover:bg-green-100">
          Use Prompt
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50/30">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-green-500 to-yellow-500 rounded-lg">
                <BarChart className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Reports & AI Analysis</h1>
                <p className="text-gray-600 text-sm">
                  Advanced reporting and intelligent data analysis
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setShowReportBuilder(true)}
                className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-medium hover:from-green-600 hover:to-green-700 transition-all flex items-center gap-2"
              >
                <Plus size={18} />
                Build Report
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Tabs Navigation */}
        <div className="flex space-x-1 bg-white rounded-lg p-1 shadow-sm mb-8">
          <button
            onClick={() => setActiveTab('reports')}
            className={`flex-1 px-4 py-2.5 text-sm font-medium rounded-md transition-all ${activeTab === 'reports' ? 'bg-gradient-to-r from-green-500 to-green-600 text-white' : 'text-gray-600 hover:text-gray-900'}`}
          >
            <div className="flex items-center justify-center gap-2">
              <FileText size={18} />
              Reports
            </div>
          </button>
          <button
            onClick={() => setActiveTab('kpi')}
            className={`flex-1 px-4 py-2.5 text-sm font-medium rounded-md transition-all ${activeTab === 'kpi' ? 'bg-gradient-to-r from-green-500 to-green-600 text-white' : 'text-gray-600 hover:text-gray-900'}`}
          >
            <div className="flex items-center justify-center gap-2">
              <Target size={18} />
              KPI Dashboard
            </div>
          </button>
          <button
            onClick={() => setActiveTab('ai')}
            className={`flex-1 px-4 py-2.5 text-sm font-medium rounded-md transition-all ${activeTab === 'ai' ? 'bg-gradient-to-r from-green-500 to-green-600 text-white' : 'text-gray-600 hover:text-gray-900'}`}
          >
            <div className="flex items-center justify-center gap-2">
              <Brain size={18} />
              AI Assistant
            </div>
          </button>
        </div>

        {/* Main Content */}
        {activeTab === 'reports' && (
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <StatCard 
                icon={FileText}
                label="Total Reports"
                value={reports.length}
                change={12}
                trend="up"
                color="green"
              />
              <StatCard 
                icon={Brain}
                label="AI-Generated"
                value={reports.filter(r => r.aiAssisted).length}
                change={25}
                trend="up"
                color="yellow"
              />
              <StatCard 
                icon={Download}
                label="Total Downloads"
                value={reports.reduce((sum, r) => sum + r.downloads, 0)}
                change={8}
                trend="up"
                color="green"
              />
              <StatCard 
                icon={Calendar}
                label="Scheduled Reports"
                value={reports.filter(r => r.schedule !== 'One-time').length}
                change={-3}
                trend="down"
                color="yellow"
              />
            </div>

            {/* Reports Table */}
            <div className="bg-white rounded-xl shadow-lg">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">All Reports</h2>
                    <p className="text-sm text-gray-600 mt-1">Generated and scheduled reports</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <input 
                        type="text" 
                        placeholder="Search reports..." 
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
                      <th className="py-3 px-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Report ID</th>
                      <th className="py-3 px-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Title & Type</th>
                      <th className="py-3 px-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Source</th>
                      <th className="py-3 px-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Frequency</th>
                      <th className="py-3 px-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Status</th>
                      <th className="py-3 px-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {currentReports.map((report) => (
                      <tr key={report.id} className="hover:bg-gray-50">
                        <td className="py-4 px-6">
                          <div className="font-mono text-sm font-medium text-gray-900">{report.id}</div>
                          <div className="text-xs text-gray-500 mt-1">{report.lastRun}</div>
                        </td>
                        <td className="py-4 px-6">
                          <div>
                            <div className="font-medium text-gray-900">{report.title}</div>
                            <div className="flex items-center gap-2 mt-2">
                              <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded">
                                {report.type}
                              </span>
                              {report.aiAssisted && (
                                <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded flex items-center gap-1">
                                  <Brain size={10} />
                                  AI
                                </span>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2">
                            <Database size={14} className="text-gray-400" />
                            <span className="text-sm text-gray-700">{report.source}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2">
                            <Calendar size={14} className="text-gray-400" />
                            <span className="text-sm text-gray-700">{report.frequency}</span>
                          </div>
                          <div className="text-xs text-gray-500 mt-1">{report.schedule}</div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="space-y-2">
                            <StatusBadge status={report.status} />
                            <div className="text-xs text-gray-500">
                              Downloads: {report.downloads}
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2">
                            <button className="p-2 text-green-600 hover:text-green-800 hover:bg-green-100 rounded-lg transition-colors" title="Download">
                              <Download size={18} />
                            </button>
                            <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors" title="View">
                              <Eye size={18} />
                            </button>
                            <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors" title="Schedule">
                              <Calendar size={18} />
                            </button>
                            <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors" title="Share">
                              <Share2 size={18} />
                            </button>
                          </div>
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
                    Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, reports.length)} of {reports.length} reports
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
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
                        onClick={() => setCurrentPage(pageNumber)}
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
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className={`p-2 rounded-lg ${currentPage === totalPages ? 'text-gray-400' : 'text-gray-700 hover:bg-gray-100'}`}
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* Export Formats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <File size={24} className="text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">PDF Export</h3>
                    <p className="text-sm text-gray-600">For official records and documentation</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <button className="w-full px-4 py-2 bg-red-50 text-red-700 rounded-lg font-medium hover:bg-red-100 transition-colors flex items-center justify-center gap-2">
                    <Download size={16} />
                    Export as PDF
                  </button>
                  <button className="w-full px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                    <Printer size={16} />
                    Print Report
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <FileSpreadsheet size={24} className="text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Excel Export</h3>
                    <p className="text-sm text-gray-600">For data analysis and calculations</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <button className="w-full px-4 py-2 bg-green-50 text-green-700 rounded-lg font-medium hover:bg-green-100 transition-colors flex items-center justify-center gap-2">
                    <Download size={16} />
                    Export as Excel
                  </button>
                  <button className="w-full px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                    <TrendingUp size={16} />
                    Advanced Analysis
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <Presentation size={24} className="text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">PowerPoint</h3>
                    <p className="text-sm text-gray-600">For presentations and meetings</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <button className="w-full px-4 py-2 bg-yellow-50 text-yellow-700 rounded-lg font-medium hover:bg-yellow-100 transition-colors flex items-center justify-center gap-2">
                    <Download size={16} />
                    Export as PPT
                  </button>
                  <button className="w-full px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                    <Share2 size={16} />
                    Share Presentation
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* KPI Dashboard Tab */}
        {activeTab === 'kpi' && (
          <div className="space-y-6">
            {/* KPI Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Lagging Indicators */}
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-100 rounded-lg">
                      <AlertCircle size={24} className="text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Lagging Indicators</h3>
                      <p className="text-sm text-gray-600">Reactive safety metrics</p>
                    </div>
                  </div>
                  <span className="text-xs font-medium px-3 py-1 bg-red-100 text-red-800 rounded-full">
                    Past Performance
                  </span>
                </div>
                <div className="space-y-4">
                  {kpiData.laggingIndicators.map((kpi, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <span className="text-sm font-medium text-gray-700">{kpi.label}</span>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-2xl font-bold text-gray-900">{kpi.value}</span>
                          <span className={`text-sm font-medium ${kpi.trend === 'down' ? 'text-green-600' : 'text-red-600'}`}>
                            {kpi.trend === 'down' ? '↓' : '↑'} {Math.abs(kpi.change)}%
                          </span>
                        </div>
                      </div>
                      <div className={`p-2 rounded-lg ${kpi.trend === 'down' ? 'bg-green-100' : 'bg-red-100'}`}>
                        {kpi.trend === 'down' ? (
                          <TrendingUp size={20} className="text-green-600" />
                        ) : (
                          <TrendingUp size={20} className="text-red-600" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Leading Indicators */}
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <CheckCircle size={24} className="text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Leading Indicators</h3>
                      <p className="text-sm text-gray-600">Proactive safety activities</p>
                    </div>
                  </div>
                  <span className="text-xs font-medium px-3 py-1 bg-green-100 text-green-800 rounded-full">
                    Future Prevention
                  </span>
                </div>
                <div className="space-y-4">
                  {kpiData.leadingIndicators.map((kpi, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <span className="text-sm font-medium text-gray-700">{kpi.label}</span>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-2xl font-bold text-gray-900">{kpi.value}</span>
                          <span className="text-sm font-medium text-green-600">
                            ↗ {kpi.change}%
                          </span>
                        </div>
                      </div>
                      <div className="p-2 bg-green-100 rounded-lg">
                        <TrendingUp size={20} className="text-green-600" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Automated Executive Summaries */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Executive Summaries</h3>
                  <p className="text-sm text-gray-600 mt-1">One-page safety performance overviews</p>
                </div>
                <button className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-medium hover:from-green-600 hover:to-green-700 transition-all flex items-center gap-2">
                  <Sparkles size={18} />
                  Generate Summary
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { title: 'Weekly Safety Snapshot', period: 'This Week', score: 92, trend: 3 },
                  { title: 'Monthly Compliance Review', period: 'January 2024', score: 88, trend: -2 },
                  { title: 'Quarterly Performance', period: 'Q4 2023', score: 95, trend: 5 }
                ].map((summary, index) => (
                  <div key={index} className="border border-gray-200 rounded-xl p-5 hover:border-green-300 transition-colors">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="font-medium text-gray-900">{summary.title}</h4>
                        <p className="text-sm text-gray-600">{summary.period}</p>
                      </div>
                      <div className={`px-3 py-1 rounded-full ${summary.score >= 90 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        <span className="font-bold">{summary.score}%</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="text-xs text-gray-600 flex items-center gap-2">
                        <TrendingUp size={12} className={summary.trend > 0 ? 'text-green-600' : 'text-red-600'} />
                        <span>{Math.abs(summary.trend)}% from last period</span>
                      </div>
                      <button className="w-full px-3 py-2 text-sm font-medium text-green-600 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                        View Summary
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* AI Assistant Tab */}
        {activeTab === 'ai' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* AI Chat Interface */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg h-[600px] flex flex-col">
                {/* Chat Header */}
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gradient-to-br from-green-500 to-yellow-500 rounded-lg">
                        <Brain className="text-white" size={24} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">AI Safety Assistant</h3>
                        <p className="text-sm text-gray-600">Powered by advanced analytics</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                        <Mic size={20} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                        <Upload size={20} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto p-6">
                  <div className="space-y-4">
                    {chatHistory.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-2xl p-4 ${
                            message.sender === 'user'
                              ? 'bg-gradient-to-r from-green-500 to-green-600 text-white'
                              : 'bg-gray-100 text-gray-900'
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            {message.sender === 'ai' && (
                              <Bot size={16} className="text-yellow-600" />
                            )}
                            <span className="text-sm font-medium">
                              {message.sender === 'user' ? 'You' : 'AI Assistant'}
                            </span>
                          </div>
                          <p className="text-sm">{message.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Chat Input */}
                <div className="p-6 border-t border-gray-200">
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      value={aiMessage}
                      onChange={(e) => setAiMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendToAi()}
                      placeholder="Ask about safety trends, predictions, or analysis..."
                      className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                    <button
                      onClick={sendToAi}
                      className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-medium hover:from-green-600 hover:to-green-700 transition-all flex items-center gap-2"
                    >
                      <Zap size={18} />
                      Analyze
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Prompts Sidebar */}
            <div className="space-y-6">
              {/* Prompt Library */}
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold text-gray-900">Prompt Library</h3>
                  <BookOpen size={20} className="text-gray-400" />
                </div>
                <div className="space-y-4">
                  {aiPrompts.map((prompt) => (
                    <AIPromptCard key={prompt.id} prompt={prompt} />
                  ))}
                </div>
              </div>

              {/* AI Capabilities */}
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="font-semibold text-gray-900 mb-6">AI Capabilities</h3>
                <div className="space-y-4">
                  {[
                    { icon: Brain, label: 'Root Cause Suggestion', color: 'green' },
                    { icon: TrendingUp, label: 'Predictive Analytics', color: 'yellow' },
                    { icon: Shield, label: 'Compliance Gap Detection', color: 'green' },
                    { icon: MessageSquare, label: 'Sentiment Analysis', color: 'yellow' }
                  ].map((capability, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className={`p-2 rounded-lg ${capability.color === 'green' ? 'bg-green-100' : 'bg-yellow-100'}`}>
                        <capability.icon size={18} className={capability.color === 'green' ? 'text-green-600' : 'text-yellow-600'} />
                      </div>
                      <span className="text-sm font-medium text-gray-700">{capability.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Report Builder Modal */}
      {showReportBuilder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Custom Report Builder</h2>
                  <p className="text-gray-600 mt-2">Create personalized reports from multiple data sources</p>
                </div>
                <button
                  onClick={() => setShowReportBuilder(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-8">
                {/* Report Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Report Name</label>
                  <input
                    type="text"
                    value={reportBuilder.name}
                    onChange={(e) => setReportBuilder({...reportBuilder, name: e.target.value})}
                    placeholder="e.g., Warehouse Incidents Analysis - May 2024"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                {/* Data Sources */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Data Sources</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { id: 'incidents', label: 'Incidents', icon: AlertCircle },
                      { id: 'inspections', label: 'Inspections', icon: Shield },
                      { id: 'audits', label: 'Audits', icon: CheckCircle },
                      { id: 'training', label: 'Training', icon: Users }
                    ].map((source) => (
                      <button
                        key={source.id}
                        onClick={() => {
                          const updated = reportBuilder.dataSource.includes(source.id)
                            ? reportBuilder.dataSource.filter(s => s !== source.id)
                            : [...reportBuilder.dataSource, source.id];
                          setReportBuilder({...reportBuilder, dataSource: updated});
                        }}
                        className={`p-4 border rounded-xl text-center transition-all ${
                          reportBuilder.dataSource.includes(source.id)
                            ? 'border-green-500 bg-green-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <source.icon size={24} className={`mx-auto mb-2 ${
                          reportBuilder.dataSource.includes(source.id) ? 'text-green-600' : 'text-gray-400'
                        }`} />
                        <span className="text-sm font-medium">{source.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Filters */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Filters</label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Date Range</label>
                      <select
                        value={reportBuilder.filters.dateRange}
                        onChange={(e) => setReportBuilder({
                          ...reportBuilder,
                          filters: {...reportBuilder.filters, dateRange: e.target.value}
                        })}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      >
                        <option value="lastWeek">Last Week</option>
                        <option value="lastMonth">Last Month</option>
                        <option value="lastQuarter">Last Quarter</option>
                        <option value="lastYear">Last Year</option>
                        <option value="custom">Custom Range</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Department</label>
                      <select
                        value={reportBuilder.filters.department}
                        onChange={(e) => setReportBuilder({
                          ...reportBuilder,
                          filters: {...reportBuilder.filters, department: e.target.value}
                        })}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      >
                        <option value="all">All Departments</option>
                        <option value="warehouse">Warehouse</option>
                        <option value="production">Production</option>
                        <option value="shipping">Shipping</option>
                        <option value="office">Office</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Columns Selection */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Select Columns</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {reportBuilder.columns.map((column) => (
                      <label key={column.id} className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={column.selected}
                          onChange={() => {
                            const updatedColumns = reportBuilder.columns.map(c =>
                              c.id === column.id ? {...c, selected: !c.selected} : c
                            );
                            setReportBuilder({...reportBuilder, columns: updatedColumns});
                          }}
                          className="rounded text-green-600 focus:ring-green-500"
                        />
                        <span className="text-sm text-gray-700">{column.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Export Format & Schedule */}
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Export Format</label>
                    <div className="flex gap-3">
                      {['pdf', 'excel', 'powerpoint'].map((format) => (
                        <button
                          key={format}
                          onClick={() => setReportBuilder({...reportBuilder, format})}
                          className={`flex-1 px-4 py-2 rounded-lg border ${
                            reportBuilder.format === format
                              ? 'border-green-500 bg-green-50 text-green-700'
                              : 'border-gray-200 text-gray-700 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-center justify-center gap-2">
                            {format === 'pdf' && <File size={16} />}
                            {format === 'excel' && <FileSpreadsheet size={16} />}
                            {format === 'powerpoint' && <Presentation size={16} />}
                            <span className="text-sm font-medium uppercase">{format}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Schedule Report</label>
                    <select
                      value={reportBuilder.schedule}
                      onChange={(e) => setReportBuilder({...reportBuilder, schedule: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="none">No Schedule</option>
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly (Monday)</option>
                      <option value="monthly">Monthly (1st)</option>
                      <option value="quarterly">Quarterly</option>
                    </select>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-6">
                  <button
                    onClick={generateReport}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-bold hover:from-green-600 hover:to-green-700 transition-all flex items-center justify-center gap-3"
                  >
                    <Sparkles size={20} />
                    Generate Report with AI
                  </button>
                  <button
                    onClick={() => setShowReportBuilder(false)}
                    className="px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};