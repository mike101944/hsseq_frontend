import React, { useState } from 'react';
import {
  GraduationCap, Users, BookOpen, Award, Clock,
  AlertCircle, CheckCircle, FileText, Filter,
  Plus, Search, Eye, Edit, Download, Upload,
  BarChart, TrendingUp, Settings, X, ChevronRight,
  ChevronLeft, Video, File, Presentation, Target,
  User, Calendar, Shield, Zap, RefreshCw, Printer,
  MessageSquare, ExternalLink, Play, Pause, Home,
  Building, ChevronDown, ChevronUp, Star, DownloadCloud
} from 'lucide-react';

export const Training = () => {
  // State Management
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [showAssignmentModal, setShowAssignmentModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Training Matrix Data
  const [trainingMatrix, setTrainingMatrix] = useState([
    {
      id: 'TM-001',
      role: 'Driver',
      requiredCourses: 8,
      completedCourses: 6,
      compliance: 75,
      overdue: 2,
      nextTraining: '2024-02-15'
    },
    {
      id: 'TM-002',
      role: 'Engineer',
      requiredCourses: 12,
      completedCourses: 10,
      compliance: 83,
      overdue: 1,
      nextTraining: '2024-02-20'
    },
    {
      id: 'TM-003',
      role: 'Safety Officer',
      requiredCourses: 15,
      completedCourses: 14,
      compliance: 93,
      overdue: 0,
      nextTraining: '2024-03-01'
    },
    {
      id: 'TM-004',
      role: 'Manager',
      requiredCourses: 10,
      completedCourses: 8,
      compliance: 80,
      overdue: 2,
      nextTraining: '2024-02-25'
    },
    {
      id: 'TM-005',
      role: 'Operator',
      requiredCourses: 6,
      completedCourses: 4,
      compliance: 67,
      overdue: 3,
      nextTraining: '2024-02-10'
    }
  ]);

  // Courses Data
  const [courses, setCourses] = useState([
    {
      id: 'CRS-001',
      title: 'Defensive Driving',
      category: 'Safety',
      duration: '8 hours',
      type: 'Required',
      expiry: '12 months',
      enrolled: 24,
      capacity: 30,
      status: 'active',
      progress: 85,
      instructor: 'John Safety',
      nextSession: '2024-02-15'
    },
    {
      id: 'CRS-002',
      title: 'First Aid & CPR',
      category: 'Medical',
      duration: '16 hours',
      type: 'Required',
      expiry: '24 months',
      enrolled: 18,
      capacity: 20,
      status: 'active',
      progress: 92,
      instructor: 'Dr. Sarah',
      nextSession: '2024-02-18'
    },
    {
      id: 'CRS-003',
      title: 'Fire Safety & Evacuation',
      category: 'Emergency',
      duration: '4 hours',
      type: 'Required',
      expiry: '12 months',
      enrolled: 32,
      capacity: 40,
      status: 'active',
      progress: 78,
      instructor: 'Fire Chief',
      nextSession: '2024-02-20'
    },
    {
      id: 'CRS-004',
      title: 'Electrical Safety',
      category: 'Technical',
      duration: '6 hours',
      type: 'Required',
      expiry: '12 months',
      enrolled: 15,
      capacity: 20,
      status: 'active',
      progress: 65,
      instructor: 'Eng. Robert',
      nextSession: '2024-02-22'
    },
    {
      id: 'CRS-005',
      title: 'Incident Investigation',
      category: 'Compliance',
      duration: '8 hours',
      type: 'Optional',
      expiry: 'N/A',
      enrolled: 10,
      capacity: 15,
      status: 'upcoming',
      progress: 0,
      instructor: 'Safety Manager',
      nextSession: '2024-03-01'
    },
    {
      id: 'CRS-006',
      title: 'Hazard Identification',
      category: 'Safety',
      duration: '4 hours',
      type: 'Required',
      expiry: '12 months',
      enrolled: 28,
      capacity: 30,
      status: 'completed',
      progress: 100,
      instructor: 'Safety Officer',
      nextSession: '2024-01-30'
    }
  ]);

  // Employees Data
  const [employees, setEmployees] = useState([
    {
      id: 'EMP-001',
      name: 'John Kamau',
      role: 'Driver',
      department: 'Transport',
      trainingCompleted: 6,
      trainingRequired: 8,
      compliance: 75,
      certifications: 4,
      status: 'warning',
      nextExpiry: '2024-03-15'
    },
    {
      id: 'EMP-002',
      name: 'Sarah Mwangi',
      role: 'Engineer',
      department: 'Operations',
      trainingCompleted: 10,
      trainingRequired: 12,
      compliance: 83,
      certifications: 6,
      status: 'compliant',
      nextExpiry: '2024-04-20'
    },
    {
      id: 'EMP-003',
      name: 'Robert Ochieng',
      role: 'Safety Officer',
      department: 'HSSEQ',
      trainingCompleted: 14,
      trainingRequired: 15,
      compliance: 93,
      certifications: 8,
      status: 'compliant',
      nextExpiry: '2024-05-01'
    },
    {
      id: 'EMP-004',
      name: 'Jane Wambui',
      role: 'Manager',
      department: 'Administration',
      trainingCompleted: 8,
      trainingRequired: 10,
      compliance: 80,
      certifications: 5,
      status: 'warning',
      nextExpiry: '2024-02-28'
    },
    {
      id: 'EMP-005',
      name: 'Michael Njoroge',
      role: 'Operator',
      department: 'Production',
      trainingCompleted: 4,
      trainingRequired: 6,
      compliance: 67,
      certifications: 3,
      status: 'overdue',
      nextExpiry: '2024-02-10'
    }
  ]);

  // Certifications Data
  const [certifications, setCertifications] = useState([
    {
      id: 'CERT-001',
      employee: 'John Kamau',
      course: 'Defensive Driving',
      issued: '2023-02-15',
      expiry: '2024-02-15',
      status: 'expiring',
      daysLeft: 30,
      downloadUrl: '#'
    },
    {
      id: 'CERT-002',
      employee: 'Sarah Mwangi',
      course: 'First Aid & CPR',
      issued: '2023-04-20',
      expiry: '2025-04-20',
      status: 'valid',
      daysLeft: 400,
      downloadUrl: '#'
    },
    {
      id: 'CERT-003',
      employee: 'Robert Ochieng',
      course: 'Fire Safety',
      issued: '2023-05-01',
      expiry: '2024-05-01',
      status: 'valid',
      daysLeft: 90,
      downloadUrl: '#'
    },
    {
      id: 'CERT-004',
      employee: 'Jane Wambui',
      course: 'Incident Investigation',
      issued: '2023-01-30',
      expiry: '2024-01-30',
      status: 'expired',
      daysLeft: -10,
      downloadUrl: '#'
    }
  ]);

  // Reports Data
  const [reports, setReports] = useState([
    {
      id: 'RPT-001',
      title: 'Monthly Compliance Report',
      type: 'Compliance',
      generated: '2024-01-31',
      records: 245,
      status: 'ready'
    },
    {
      id: 'RPT-002',
      title: 'Training Hours Summary',
      type: 'Analytics',
      generated: '2024-01-30',
      records: 124,
      status: 'ready'
    },
    {
      id: 'RPT-003',
      title: 'Certification Expiry Report',
      type: 'Alert',
      generated: '2024-01-29',
      records: 15,
      status: 'ready'
    },
    {
      id: 'RPT-004',
      title: 'Skills Gap Analysis',
      type: 'Analysis',
      generated: '2024-01-28',
      records: 89,
      status: 'processing'
    }
  ]);

  // Stats
  const totalEmployees = employees.length;
  const totalCourses = courses.length;
  const activeCourses = courses.filter(c => c.status === 'active').length;
  const overallCompliance = Math.round(employees.reduce((sum, emp) => sum + emp.compliance, 0) / employees.length);
  const expiringCertifications = certifications.filter(c => c.status === 'expiring').length;
  const expiredCertifications = certifications.filter(c => c.status === 'expired').length;

  // Pagination Calculations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCourses = courses.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(courses.length / itemsPerPage);

  // Component Functions
  const assignCourse = (employeeId, courseId) => {
    // In real app, would call API: POST /api/training/assign
    console.log(`Assigning course ${courseId} to employee ${employeeId}`);
    setShowAssignmentModal(false);
    // Show success notification
    alert('Course assigned successfully! Notification sent to employee.');
  };

  const generateCertificate = (employeeId, courseId) => {
    // In real app, would call API: POST /api/certificates/generate
    console.log(`Generating certificate for ${employeeId}, course ${courseId}`);
    alert('Certificate generated successfully! Available for download.');
  };

  const sendExpiryAlert = (certificationId) => {
    // In real app, would call API: POST /api/alerts/send
    console.log(`Sending expiry alert for certification ${certificationId}`);
    alert('Expiry alert sent to employee and supervisor!');
  };

  const StatusBadge = ({ status }) => {
    const config = {
      active: { bg: 'bg-emerald-100', text: 'text-emerald-800', label: 'Active' },
      upcoming: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Upcoming' },
      completed: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Completed' },
      compliant: { bg: 'bg-emerald-100', text: 'text-emerald-800', label: 'Compliant' },
      warning: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Warning' },
      overdue: { bg: 'bg-red-100', text: 'text-red-800', label: 'Overdue' },
      valid: { bg: 'bg-emerald-100', text: 'text-emerald-800', label: 'Valid' },
      expiring: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Expiring Soon' },
      expired: { bg: 'bg-red-100', text: 'text-red-800', label: 'Expired' },
      ready: { bg: 'bg-emerald-100', text: 'text-emerald-800', label: 'Ready' },
      processing: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Processing' }
    };
    
    const { bg, text, label } = config[status] || config.active;
    
    return (
      <span className={`px-3 py-1 text-xs font-medium rounded-full ${bg} ${text}`}>
        {label}
      </span>
    );
  };

  const ProgressBar = ({ progress }) => (
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div 
        className={`h-2 rounded-full ${progress >= 80 ? 'bg-emerald-500' : progress >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
        style={{ width: `${progress}%` }}
      />
      <div className="text-xs text-gray-600 mt-1">{progress}%</div>
    </div>
  );

  const StatCard = ({ icon: Icon, label, value, color, trend }) => (
    <div className="bg-white rounded-xl p-5 shadow-lg hover:shadow-xl transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-2">{label}</p>
          <p className={`text-2xl font-bold ${color === 'emerald' ? 'text-emerald-600' : 'text-yellow-600'}`}>
            {value}
          </p>
          {trend && (
            <div className="flex items-center gap-1 mt-2">
              <TrendingUp size={14} className={trend > 0 ? 'text-emerald-500' : 'text-red-500'} />
              <span className={`text-xs ${trend > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
              </span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg ${color === 'emerald' ? 'bg-emerald-100' : 'bg-yellow-100'}`}>
          <Icon size={24} className={color === 'emerald' ? 'text-emerald-600' : 'text-yellow-600'} />
        </div>
      </div>
    </div>
  );

  const CourseTypeBadge = ({ type }) => (
    <span className={`px-2 py-1 text-xs font-medium rounded ${
      type === 'Required' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
    }`}>
      {type}
    </span>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50/30">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-emerald-500 to-yellow-500 rounded-lg">
                <GraduationCap className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">HSSEQ Training Portal</h1>
                <p className="text-gray-600 text-sm">
                  Learning Management System for Safety & Compliance
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setShowCourseModal(true)}
                className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg font-medium hover:from-emerald-600 hover:to-emerald-700 transition-all flex items-center gap-2"
              >
                <Plus size={18} />
                New Course
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <StatCard 
            icon={Users}
            label="Total Employees"
            value={totalEmployees}
            color="emerald"
            trend={5}
          />
          <StatCard 
            icon={BookOpen}
            label="Active Courses"
            value={activeCourses}
            color="emerald"
            trend={12}
          />
          <StatCard 
            icon={Award}
            label="Compliance Rate"
            value={`${overallCompliance}%`}
            color={overallCompliance >= 80 ? "emerald" : "yellow"}
            trend={overallCompliance >= 80 ? 3 : -2}
          />
          <StatCard 
            icon={AlertCircle}
            label="Expiring Certs"
            value={expiringCertifications}
            color="yellow"
            trend={-8}
          />
          <StatCard 
            icon={Clock}
            label="Training Hours"
            value="1,245"
            color="emerald"
            trend={15}
          />
        </div>

        {/* Main Content Tabs */}
        <div className="flex space-x-1 bg-white rounded-lg p-1 shadow-sm mb-8">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex-1 px-4 py-2.5 text-sm font-medium rounded-md transition-all ${activeTab === 'dashboard' ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white' : 'text-gray-600 hover:text-gray-900'}`}
          >
            <div className="flex items-center justify-center gap-2">
              <BarChart size={18} />
              Dashboard
            </div>
          </button>
          <button
            onClick={() => setActiveTab('matrix')}
            className={`flex-1 px-4 py-2.5 text-sm font-medium rounded-md transition-all ${activeTab === 'matrix' ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white' : 'text-gray-600 hover:text-gray-900'}`}
          >
            <div className="flex items-center justify-center gap-2">
              <Target size={18} />
              Training Matrix
            </div>
          </button>
          <button
            onClick={() => setActiveTab('courses')}
            className={`flex-1 px-4 py-2.5 text-sm font-medium rounded-md transition-all ${activeTab === 'courses' ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white' : 'text-gray-600 hover:text-gray-900'}`}
          >
            <div className="flex items-center justify-center gap-2">
              <BookOpen size={18} />
              Courses
            </div>
          </button>
          <button
            onClick={() => setActiveTab('certifications')}
            className={`flex-1 px-4 py-2.5 text-sm font-medium rounded-md transition-all ${activeTab === 'certifications' ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white' : 'text-gray-600 hover:text-gray-900'}`}
          >
            <div className="flex items-center justify-center gap-2">
              <Award size={18} />
              Certifications
            </div>
          </button>
          <button
            onClick={() => setActiveTab('reports')}
            className={`flex-1 px-4 py-2.5 text-sm font-medium rounded-md transition-all ${activeTab === 'reports' ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white' : 'text-gray-600 hover:text-gray-900'}`}
          >
            <div className="flex items-center justify-center gap-2">
              <FileText size={18} />
              Reports
            </div>
          </button>
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Training Matrix Overview */}
            <div className="bg-white rounded-xl shadow-lg">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">Training Matrix Overview</h2>
                    <p className="text-sm text-gray-600 mt-1">Role-based training requirements and compliance</p>
                  </div>
                  <button className="px-4 py-2 text-sm font-medium text-emerald-600 bg-emerald-50 rounded-lg hover:bg-emerald-100">
                    View Full Matrix
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  {trainingMatrix.map((role) => (
                    <div key={role.id} className="p-4 border border-gray-200 rounded-lg hover:border-emerald-300 transition-colors">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-gray-900">{role.role}</h3>
                          <div className="text-sm text-gray-600">{role.requiredCourses} required courses</div>
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs font-bold ${
                          role.compliance >= 80 ? 'bg-emerald-100 text-emerald-800' :
                          role.compliance >= 60 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {role.compliance}%
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Completed</span>
                          <span className="font-medium">{role.completedCourses}/{role.requiredCourses}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Overdue</span>
                          <span className="font-medium text-red-600">{role.overdue}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Next Training</span>
                          <span className="font-medium">{role.nextTraining}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Compliance Chart */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-lg">
                  <div className="p-6 border-b border-gray-200">
                    <h3 className="font-semibold text-gray-900">Compliance Rate by Department</h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      {[
                        { department: 'Transport', compliance: 75, employees: 24 },
                        { department: 'Operations', compliance: 83, employees: 18 },
                        { department: 'HSSEQ', compliance: 93, employees: 8 },
                        { department: 'Administration', compliance: 80, employees: 12 },
                        { department: 'Production', compliance: 67, employees: 32 }
                      ].map((dept, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <span className="text-sm font-medium text-gray-700">{dept.department}</span>
                              <span className="text-xs text-gray-500">({dept.employees} employees)</span>
                            </div>
                            <span className={`text-sm font-bold ${
                              dept.compliance >= 80 ? 'text-emerald-600' :
                              dept.compliance >= 60 ? 'text-yellow-600' : 'text-red-600'
                            }`}>
                              {dept.compliance}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                dept.compliance >= 80 ? 'bg-emerald-500' :
                                dept.compliance >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${dept.compliance}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-lg">
                  <div className="p-6 border-b border-gray-200">
                    <h3 className="font-semibold text-gray-900">Quick Actions</h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-3">
                      <button className="w-full px-4 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg font-medium hover:from-emerald-600 hover:to-emerald-700 flex items-center justify-center gap-2">
                        <Plus size={18} />
                        Assign Training
                      </button>
                      <button className="w-full px-4 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 flex items-center justify-center gap-2">
                        <Upload size={18} />
                        Upload Attendance
                      </button>
                      <button className="w-full px-4 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 flex items-center justify-center gap-2">
                        <DownloadCloud size={18} />
                        Export Reports
                      </button>
                      <button className="w-full px-4 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 flex items-center justify-center gap-2">
                        <AlertCircle size={18} />
                        Send Alerts
                      </button>
                    </div>
                  </div>
                </div>

                {/* Induction Portal */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-lg">
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 bg-blue-500 rounded-lg">
                        <Home size={24} className="text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Induction Portal</h3>
                        <p className="text-sm text-gray-600">New hires onboarding</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                        <div>
                          <div className="font-medium text-gray-900">Pending Induction</div>
                          <div className="text-sm text-gray-600">5 new employees</div>
                        </div>
                        <ChevronRight size={20} className="text-gray-400" />
                      </div>
                      <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600">
                        Manage Induction
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Training Matrix Tab */}
        {activeTab === 'matrix' && (
          <div className="space-y-6">
            {/* Skills Gap Analysis */}
            <div className="bg-white rounded-xl shadow-lg">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">Skills Gap Analysis</h2>
                    <p className="text-sm text-gray-600 mt-1">Identify employees needing specific training</p>
                  </div>
                  <button className="px-4 py-2 text-sm font-medium text-emerald-600 bg-emerald-50 rounded-lg hover:bg-emerald-100 flex items-center gap-2">
                    <Download size={16} />
                    Export Gaps
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="py-3 px-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Employee</th>
                        <th className="py-3 px-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Role</th>
                        <th className="py-3 px-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Missing Training</th>
                        <th className="py-3 px-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Days Overdue</th>
                        <th className="py-3 px-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Priority</th>
                        <th className="py-3 px-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {employees
                        .filter(emp => emp.status !== 'compliant')
                        .map((employee) => (
                          <tr key={employee.id} className="hover:bg-gray-50">
                            <td className="py-4 px-6">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                                  <User size={16} className="text-emerald-600" />
                                </div>
                                <div>
                                  <div className="font-medium text-gray-900">{employee.name}</div>
                                  <div className="text-xs text-gray-500">{employee.department}</div>
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-6">
                              <span className="text-sm text-gray-700">{employee.role}</span>
                            </td>
                            <td className="py-4 px-6">
                              <span className="font-medium text-red-600">
                                {employee.trainingRequired - employee.trainingCompleted} courses
                              </span>
                            </td>
                            <td className="py-4 px-6">
                              {employee.status === 'overdue' ? (
                                <span className="text-sm font-medium text-red-600">15 days</span>
                              ) : employee.status === 'warning' ? (
                                <span className="text-sm font-medium text-yellow-600">30 days</span>
                              ) : (
                                <span className="text-sm text-gray-600">-</span>
                              )}
                            </td>
                            <td className="py-4 px-6">
                              <StatusBadge status={employee.status} />
                            </td>
                            <td className="py-4 px-6">
                              <button 
                                onClick={() => {
                                  setSelectedEmployee(employee);
                                  setShowAssignmentModal(true);
                                }}
                                className="px-3 py-1.5 text-sm font-medium text-emerald-600 bg-emerald-50 rounded-lg hover:bg-emerald-100"
                              >
                                Assign Training
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Employees Compliance */}
            <div className="bg-white rounded-xl shadow-lg">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Employee Training Status</h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {employees.map((employee) => (
                    <div key={employee.id} className="p-4 border border-gray-200 rounded-lg hover:border-emerald-300 transition-colors">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-emerald-100 to-yellow-100 rounded-full flex items-center justify-center">
                            <User size={20} className="text-emerald-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{employee.name}</h4>
                            <p className="text-sm text-gray-600">{employee.role}</p>
                          </div>
                        </div>
                        <StatusBadge status={employee.status} />
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Compliance</span>
                          <span className={`font-bold ${
                            employee.compliance >= 80 ? 'text-emerald-600' :
                            employee.compliance >= 60 ? 'text-yellow-600' : 'text-red-600'
                          }`}>
                            {employee.compliance}%
                          </span>
                        </div>
                        <ProgressBar progress={employee.compliance} />
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Certifications</span>
                          <span className="font-medium">{employee.certifications}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Next Expiry</span>
                          <span className={`font-medium ${employee.nextExpiry === '2024-02-10' ? 'text-red-600' : 'text-gray-700'}`}>
                            {employee.nextExpiry}
                          </span>
                        </div>
                        <button 
                          onClick={() => setSelectedEmployee(employee)}
                          className="w-full px-3 py-2 text-sm font-medium text-emerald-600 bg-emerald-50 rounded-lg hover:bg-emerald-100"
                        >
                          View Transcript
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Courses Tab */}
        {activeTab === 'courses' && (
          <div className="space-y-6">
            {/* Courses Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentCourses.map((course) => (
                <div key={course.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <CourseTypeBadge type={course.type} />
                          <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded">
                            {course.category}
                          </span>
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">{course.title}</h3>
                        <p className="text-sm text-gray-600 mb-4">{course.duration} • Expires: {course.expiry}</p>
                      </div>
                      <StatusBadge status={course.status} />
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-gray-600">Progress</span>
                          <span className="font-medium">{course.progress}%</span>
                        </div>
                        <ProgressBar progress={course.progress} />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="text-xs text-gray-600 mb-1">Enrolled</div>
                          <div className="font-bold text-gray-900">{course.enrolled}/{course.capacity}</div>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="text-xs text-gray-600 mb-1">Instructor</div>
                          <div className="font-medium text-gray-900">{course.instructor}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Next Session</span>
                        <span className="font-medium">{course.nextSession}</span>
                      </div>
                      
                      <div className="flex gap-2">
                        <button 
                          onClick={() => setSelectedCourse(course)}
                          className="flex-1 px-3 py-2 text-sm font-medium text-emerald-600 bg-emerald-50 rounded-lg hover:bg-emerald-100"
                        >
                          View Details
                        </button>
                        <button className="px-3 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200">
                          <Eye size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">
                Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, courses.length)} of {courses.length} courses
              </span>
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
                          ? 'bg-emerald-100 text-emerald-700' 
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

            {/* Course Content Management */}
            <div className="bg-white rounded-xl shadow-lg">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Course Content Management</h3>
                    <p className="text-sm text-gray-600 mt-1">Upload and manage training materials</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="px-4 py-2 text-sm font-medium text-emerald-600 bg-emerald-50 rounded-lg hover:bg-emerald-100 flex items-center gap-2">
                      <Video size={16} />
                      Add Video
                    </button>
                    <button className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 flex items-center gap-2">
                      <Upload size={16} />
                      Upload File
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-emerald-400 transition-colors">
                    <Video size={32} className="text-gray-400 mx-auto mb-3" />
                    <div className="font-medium text-gray-900 mb-2">Training Videos</div>
                    <div className="text-sm text-gray-600 mb-4">Upload safety training videos</div>
                    <button className="px-4 py-2 text-sm font-medium text-emerald-600 bg-emerald-50 rounded-lg hover:bg-emerald-100">
                      Browse Videos
                    </button>
                  </div>
                  
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-emerald-400 transition-colors">
                    <File size={32} className="text-gray-400 mx-auto mb-3" />
                    <div className="font-medium text-gray-900 mb-2">PDF Materials</div>
                    <div className="text-sm text-gray-600 mb-4">Upload course materials & guides</div>
                    <button className="px-4 py-2 text-sm font-medium text-emerald-600 bg-emerald-50 rounded-lg hover:bg-emerald-100">
                      Upload PDF
                    </button>
                  </div>
                  
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-emerald-400 transition-colors">
                    <Presentation size={32} className="text-gray-400 mx-auto mb-3" />
                    <div className="font-medium text-gray-900 mb-2">Quizzes</div>
                    <div className="text-sm text-gray-600 mb-4">Create assessments & tests</div>
                    <button className="px-4 py-2 text-sm font-medium text-emerald-600 bg-emerald-50 rounded-lg hover:bg-emerald-100">
                      Create Quiz
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Certifications Tab */}
        {activeTab === 'certifications' && (
          <div className="space-y-6">
            {/* Certification Management */}
            <div className="bg-white rounded-xl shadow-lg">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">Certification Management</h2>
                    <p className="text-sm text-gray-600 mt-1">Track and manage employee certifications</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="px-4 py-2 text-sm font-medium text-emerald-600 bg-emerald-50 rounded-lg hover:bg-emerald-100 flex items-center gap-2">
                      <Award size={16} />
                      Issue Certificate
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="py-3 px-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Employee</th>
                        <th className="py-3 px-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Course</th>
                        <th className="py-3 px-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Issued</th>
                        <th className="py-3 px-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Expiry</th>
                        <th className="py-3 px-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Status</th>
                        <th className="py-3 px-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {certifications.map((cert) => (
                        <tr key={cert.id} className="hover:bg-gray-50">
                          <td className="py-4 px-6">
                            <div className="font-medium text-gray-900">{cert.employee}</div>
                          </td>
                          <td className="py-4 px-6">
                            <div className="text-sm text-gray-700">{cert.course}</div>
                          </td>
                          <td className="py-4 px-6">
                            <div className="text-sm text-gray-700">{cert.issued}</div>
                          </td>
                          <td className="py-4 px-6">
                            <div className={`text-sm font-medium ${
                              cert.status === 'expired' ? 'text-red-600' :
                              cert.status === 'expiring' ? 'text-yellow-600' : 'text-gray-700'
                            }`}>
                              {cert.expiry}
                              {cert.status === 'expiring' && (
                                <div className="text-xs text-yellow-600">({cert.daysLeft} days left)</div>
                              )}
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <StatusBadge status={cert.status} />
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-2">
                              <button 
                                onClick={() => alert(`Downloading certificate for ${cert.employee}`)}
                                className="p-2 text-emerald-600 hover:text-emerald-800 hover:bg-emerald-100 rounded-lg"
                                title="Download Certificate"
                              >
                                <Download size={16} />
                              </button>
                              {cert.status === 'expiring' && (
                                <button 
                                  onClick={() => sendExpiryAlert(cert.id)}
                                  className="p-2 text-yellow-600 hover:text-yellow-800 hover:bg-yellow-100 rounded-lg"
                                  title="Send Expiry Alert"
                                >
                                  <AlertCircle size={16} />
                                </button>
                              )}
                              {cert.status === 'expired' && (
                                <button 
                                  onClick={() => generateCertificate(cert.employee, cert.course)}
                                  className="px-3 py-1.5 text-xs font-medium text-emerald-600 bg-emerald-50 rounded-lg hover:bg-emerald-100"
                                >
                                  Renew
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Expiry Alerts Configuration */}
            <div className="bg-white rounded-xl shadow-lg">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Auto-Expiry Alerts</h3>
                    <p className="text-sm text-gray-600 mt-1">Configure automatic notifications before certificates expire</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">{expiringCertifications} certificates expiring soon</span>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 bg-yellow-500 rounded-lg">
                        <AlertCircle size={24} className="text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">90-Day Alert</div>
                        <div className="text-sm text-gray-600">Notify 3 months before expiry</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">Active</span>
                      <div className="relative inline-block w-12 h-6">
                        <input type="checkbox" className="sr-only" defaultChecked />
                        <div className="block w-12 h-6 bg-emerald-500 rounded-full"></div>
                        <div className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 bg-red-500 rounded-lg">
                        <AlertCircle size={24} className="text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">30-Day Alert</div>
                        <div className="text-sm text-gray-600">Notify 1 month before expiry</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">Active</span>
                      <div className="relative inline-block w-12 h-6">
                        <input type="checkbox" className="sr-only" defaultChecked />
                        <div className="block w-12 h-6 bg-emerald-500 rounded-full"></div>
                        <div className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 bg-emerald-500 rounded-lg">
                        <MessageSquare size={24} className="text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">Alert Channels</div>
                        <div className="text-sm text-gray-600">Email & SMS notifications</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-700">Email</span>
                        <span className="font-medium text-emerald-600">Active</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-700">SMS</span>
                        <span className="font-medium text-emerald-600">Active</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Reports Tab */}
        {activeTab === 'reports' && (
          <div className="space-y-6">
            {/* Reports Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {reports.map((report) => (
                <div key={report.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full mb-2">
                        {report.type}
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">{report.title}</h3>
                      <div className="text-sm text-gray-600">{report.records} records</div>
                    </div>
                    <StatusBadge status={report.status} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Generated: {report.generated}</span>
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg">
                        <Download size={16} />
                      </button>
                      <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg">
                        <Printer size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Training Hours Dashboard */}
            <div className="bg-white rounded-xl shadow-lg">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Training Hours Dashboard</h3>
                    <p className="text-sm text-gray-600 mt-1">Total training hours by department (ISO Auditing)</p>
                  </div>
                  <select className="px-4 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
                    <option>Last Month</option>
                    <option>Last Quarter</option>
                    <option>Last Year</option>
                  </select>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {[
                    { department: 'Transport', hours: 420, target: 500, trend: 15 },
                    { department: 'Operations', hours: 380, target: 400, trend: 8 },
                    { department: 'HSSEQ', hours: 280, target: 300, trend: 12 },
                    { department: 'Administration', hours: 150, target: 200, trend: 5 },
                    { department: 'Production', hours: 310, target: 400, trend: 10 }
                  ].map((dept, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-medium text-gray-700">{dept.department}</span>
                          <span className="text-xs px-2 py-1 bg-emerald-100 text-emerald-800 rounded-full">
                            {dept.trend}% growth
                          </span>
                        </div>
                        <span className="text-sm font-bold text-gray-900">{dept.hours} hours</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full bg-gradient-to-r from-emerald-500 to-yellow-500"
                          style={{ width: `${(dept.hours / dept.target) * 100}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>Target: {dept.target} hours</span>
                        <span>{Math.round((dept.hours / dept.target) * 100)}% complete</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Integration with Incident Management */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-blue-500 rounded-lg">
                  <Zap size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Incident Integration</h3>
                  <p className="text-sm text-gray-600">Automatic refresher training based on incident reports</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="font-medium text-gray-900">Recent Incidents Analysis</div>
                      <div className="text-sm text-gray-600">3 incidents requiring refresher training</div>
                    </div>
                    <span className="text-xs px-2 py-1 bg-red-100 text-red-800 rounded-full">High Priority</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Near Miss - Slip Hazard</span>
                      <button className="px-3 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100">
                        Assign Refresher
                      </button>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">PPE Violation</span>
                      <button className="px-3 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100">
                        Assign Refresher
                      </button>
                    </div>
                  </div>
                </div>
                
                <button className="w-full px-4 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 flex items-center justify-center gap-2">
                  <RefreshCw size={18} />
                  Schedule All Refresher Training
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Course Modal */}
      {showCourseModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Create New Course</h2>
                  <p className="text-gray-600 mt-2">Add a new training course to the system</p>
                </div>
                <button
                  onClick={() => setShowCourseModal(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Course Title</label>
                  <input
                    type="text"
                    placeholder="e.g., Advanced Defensive Driving"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                    <select className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
                      <option>Safety</option>
                      <option>Technical</option>
                      <option>Medical</option>
                      <option>Emergency</option>
                      <option>Compliance</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Duration</label>
                    <select className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
                      <option>2 hours</option>
                      <option>4 hours</option>
                      <option>8 hours</option>
                      <option>16 hours</option>
                      <option>24 hours</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Course Type</label>
                    <select className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
                      <option>Required</option>
                      <option>Optional</option>
                      <option>Refresher</option>
                      <option>Induction</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Expiry Period</label>
                    <select className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
                      <option>6 months</option>
                      <option>12 months</option>
                      <option>24 months</option>
                      <option>36 months</option>
                      <option>N/A</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Applicable Roles</label>
                  <div className="grid grid-cols-3 gap-3">
                    {['Driver', 'Engineer', 'Safety Officer', 'Manager', 'Operator', 'Supervisor'].map((role) => (
                      <label key={role} className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                        <input type="checkbox" className="rounded text-emerald-600 focus:ring-emerald-500" />
                        <span className="text-sm text-gray-700">{role}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Course Description</label>
                  <textarea
                    rows={4}
                    placeholder="Describe the course objectives, content, and learning outcomes..."
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>

                <div className="flex gap-4 pt-6">
                  <button
                    onClick={() => {
                      // In real app: POST /api/courses
                      setShowCourseModal(false);
                      alert('Course created successfully!');
                    }}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl font-bold hover:from-emerald-600 hover:to-emerald-700"
                  >
                    Create Course
                  </button>
                  <button
                    onClick={() => setShowCourseModal(false)}
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

      {/* Assignment Modal */}
      {showAssignmentModal && selectedEmployee && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl">
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Assign Training</h2>
                  <p className="text-gray-600 mt-2">Assign training courses to {selectedEmployee.name}</p>
                </div>
                <button
                  onClick={() => setShowAssignmentModal(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Select Courses</label>
                  <div className="space-y-3">
                    {courses.map((course) => (
                      <label key={course.id} className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                        <input type="checkbox" className="rounded text-emerald-600 focus:ring-emerald-500 w-5 h-5" />
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">{course.title}</div>
                          <div className="text-sm text-gray-600">{course.duration} • {course.category}</div>
                        </div>
                        <CourseTypeBadge type={course.type} />
                      </label>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Due Date</label>
                    <input
                      type="date"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Priority</label>
                    <select className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
                      <option>Normal</option>
                      <option>High</option>
                      <option>Urgent</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-4 pt-6">
                  <button
                    onClick={() => {
                      assignCourse(selectedEmployee.id, 'selected-course-id');
                    }}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl font-bold hover:from-emerald-600 hover:to-emerald-700"
                  >
                    Assign Training
                  </button>
                  <button
                    onClick={() => setShowAssignmentModal(false)}
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