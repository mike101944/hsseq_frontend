import React, { useState } from 'react';
import {
  MapPin, Navigation, Car, Clock, AlertCircle,
  CheckCircle, Shield, User, Calendar, Filter,
  Plus, Search, Eye, Edit, Download, Upload,
  BarChart, TrendingUp, RefreshCw, Settings, X,
  ChevronRight, ChevronLeft, Bell, MessageSquare,
  Battery, Thermometer, Zap, Users, FileText,
  Smartphone, Wifi, Cloud, Award, Target,
  Camera, Mic, Phone, Mail, Home, Building,
  ChevronDown, ChevronUp, Play, Pause, StopCircle
} from 'lucide-react';

export const Jmp = () => {
  // State Management
  const [journeys, setJourneys] = useState([
    {
      id: 'JMP-2024-001',
      driver: 'John Kamau',
      vehicle: 'KCD 123A (Toyota Hilux)',
      destination: 'Nairobi → Mombasa',
      startTime: '2024-01-15 06:00',
      estimatedEnd: '2024-01-15 14:00',
      status: 'in-progress',
      safetyScore: 92,
      speed: 85,
      distance: 320,
      duration: '8h 00m',
      alerts: 2,
      riskLevel: 'low'
    },
    {
      id: 'JMP-2024-002',
      driver: 'Sarah Mwangi',
      vehicle: 'KBC 456B (Isuzu Truck)',
      destination: 'Nairobi → Nakuru',
      startTime: '2024-01-15 08:30',
      estimatedEnd: '2024-01-15 12:00',
      status: 'approved',
      safetyScore: 88,
      speed: 0,
      distance: 160,
      duration: '3h 30m',
      alerts: 0,
      riskLevel: 'medium'
    },
    {
      id: 'JMP-2024-003',
      driver: 'Robert Otieno',
      vehicle: 'KAA 789C (Mitsubishi Canter)',
      destination: 'Nairobi → Kisumu',
      startTime: '2024-01-14 07:00',
      estimatedEnd: '2024-01-14 16:00',
      status: 'completed',
      safetyScore: 95,
      speed: 0,
      distance: 360,
      duration: '9h 00m',
      alerts: 1,
      riskLevel: 'low'
    },
    {
      id: 'JMP-2024-004',
      driver: 'Jane Wambui',
      vehicle: 'KAB 012D (Toyota Land Cruiser)',
      destination: 'Nairobi → Arusha',
      startTime: '2024-01-15 10:00',
      estimatedEnd: '2024-01-15 19:00',
      status: 'rejected',
      safetyScore: 75,
      speed: 0,
      distance: 0,
      duration: '0h 00m',
      alerts: 3,
      riskLevel: 'high'
    },
    {
      id: 'JMP-2024-005',
      driver: 'Michael Ochieng',
      vehicle: 'KCA 345E (Mercedes Truck)',
      destination: 'Nairobi → Eldoret',
      startTime: '2024-01-16 05:00',
      estimatedEnd: '2024-01-16 10:00',
      status: 'pending',
      safetyScore: 85,
      speed: 0,
      distance: 0,
      duration: '0h 00m',
      alerts: 0,
      riskLevel: 'medium'
    }
  ]);

  const [vehicles, setVehicles] = useState([
    {
      id: 'VEH-001',
      registration: 'KCD 123A',
      model: 'Toyota Hilux',
      status: 'active',
      lastInspection: '2024-01-14',
      fuelLevel: 85,
      speed: 85,
      location: 'Near Naivasha',
      driver: 'John Kamau'
    },
    {
      id: 'VEH-002',
      registration: 'KBC 456B',
      model: 'Isuzu Truck',
      status: 'idle',
      lastInspection: '2024-01-13',
      fuelLevel: 60,
      speed: 0,
      location: 'Nairobi Depot',
      driver: 'Sarah Mwangi'
    },
    {
      id: 'VEH-003',
      registration: 'KAA 789C',
      model: 'Mitsubishi Canter',
      status: 'maintenance',
      lastInspection: '2024-01-10',
      fuelLevel: 20,
      speed: 0,
      location: 'Workshop',
      driver: 'Robert Otieno'
    }
  ]);

  const [drivers, setDrivers] = useState([
    {
      id: 'DRV-001',
      name: 'John Kamau',
      license: 'Valid',
      rating: 4.8,
      trips: 42,
      safetyScore: 92,
      status: 'active',
      hoursDriven: 156
    },
    {
      id: 'DRV-002',
      name: 'Sarah Mwangi',
      license: 'Valid',
      rating: 4.5,
      trips: 38,
      safetyScore: 88,
      status: 'active',
      hoursDriven: 142
    },
    {
      id: 'DRV-003',
      name: 'Robert Otieno',
      license: 'Expires Soon',
      rating: 4.9,
      trips: 56,
      safetyScore: 95,
      status: 'warning',
      hoursDriven: 210
    }
  ]);

  const [activeTab, setActiveTab] = useState('live');
  const [selectedJourney, setSelectedJourney] = useState(null);
  const [showTripRequest, setShowTripRequest] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [aiPrompt, setAiPrompt] = useState('');

  // Trip Request Form State
  const [tripRequest, setTripRequest] = useState({
    driver: '',
    vehicle: '',
    destination: '',
    purpose: '',
    startTime: '',
    estimatedHours: '',
    passengers: 0,
    riskAssessment: {
      driverFatigue: false,
      vehicleCheck: false,
      weatherCheck: false,
      routePlanning: false
    }
  });

  // AI Analysis Results
  const [aiAnalysis, setAiAnalysis] = useState([
    { id: 1, type: 'weather', alert: 'Heavy rain expected in Northern region', severity: 'high' },
    { id: 2, type: 'fatigue', alert: 'Driver approaching 4-hour limit', severity: 'medium' },
    { id: 3, type: 'route', alert: 'Road construction on Mombasa Road', severity: 'low' }
  ]);

  // Live Tracking Data
  const [liveTracking, setLiveTracking] = useState({
    speed: 85,
    fuel: 65,
    temperature: 24,
    driverAlert: false,
    lastUpdate: '2 minutes ago',
    location: 'Along Nairobi-Mombasa Highway'
  });

  // Stats
  const activeJourneys = journeys.filter(j => j.status === 'in-progress').length;
  const completedToday = journeys.filter(j => j.status === 'completed').length;
  const alertsCount = journeys.reduce((sum, j) => sum + j.alerts, 0);
  const averageScore = Math.round(journeys.reduce((sum, j) => sum + j.safetyScore, 0) / journeys.length);

  // Pagination Calculations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentJourneys = journeys.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(journeys.length / itemsPerPage);

  // Component Functions
  const requestTrip = () => {
    const newJourney = {
      id: `JMP-2024-${String(journeys.length + 1).padStart(3, '0')}`,
      driver: tripRequest.driver,
      vehicle: tripRequest.vehicle,
      destination: tripRequest.destination,
      startTime: tripRequest.startTime,
      estimatedEnd: calculateEndTime(tripRequest.startTime, tripRequest.estimatedHours),
      status: 'pending',
      safetyScore: 85,
      speed: 0,
      distance: 0,
      duration: `${tripRequest.estimatedHours}h 00m`,
      alerts: 0,
      riskLevel: 'medium'
    };

    setJourneys([newJourney, ...journeys]);
    setShowTripRequest(false);
    setTripRequest({
      driver: '',
      vehicle: '',
      destination: '',
      purpose: '',
      startTime: '',
      estimatedHours: '',
      passengers: 0,
      riskAssessment: {
        driverFatigue: false,
        vehicleCheck: false,
        weatherCheck: false,
        routePlanning: false
      }
    });
  };

  const calculateEndTime = (start, hours) => {
    const startDate = new Date(start);
    startDate.setHours(startDate.getHours() + parseInt(hours));
    return startDate.toISOString().slice(0, 16).replace('T', ' ');
  };

  const updateJourneyStatus = (journeyId, status) => {
    setJourneys(journeys.map(journey => 
      journey.id === journeyId ? { ...journey, status } : journey
    ));
  };

  const StatusBadge = ({ status }) => {
    const config = {
      'in-progress': { bg: 'bg-emerald-100', text: 'text-emerald-800', label: 'Live' },
      approved: { bg: 'bg-emerald-100', text: 'text-emerald-800', label: 'Approved' },
      pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Pending' },
      completed: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Completed' },
      rejected: { bg: 'bg-red-100', text: 'text-red-800', label: 'Rejected' }
    };
    
    const { bg, text, label } = config[status] || config.pending;
    
    return (
      <span className={`px-3 py-1 text-xs font-medium rounded-full ${bg} ${text}`}>
        {label}
      </span>
    );
  };

  const RiskBadge = ({ level }) => {
    const config = {
      low: { bg: 'bg-emerald-100', text: 'text-emerald-800', label: 'Low Risk' },
      medium: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Medium Risk' },
      high: { bg: 'bg-red-100', text: 'text-red-800', label: 'High Risk' }
    };
    
    const { bg, text, label } = config[level] || config.medium;
    
    return (
      <span className={`px-3 py-1 text-xs font-medium rounded-full ${bg} ${text}`}>
        {label}
      </span>
    );
  };

  const DriverScore = ({ score }) => {
    const getColor = () => {
      if (score >= 90) return 'text-emerald-600';
      if (score >= 80) return 'text-yellow-600';
      return 'text-red-600';
    };

    const getBgColor = () => {
      if (score >= 90) return 'bg-emerald-100';
      if (score >= 80) return 'bg-yellow-100';
      return 'bg-red-100';
    };

    return (
      <div className={`px-3 py-1 rounded-full ${getBgColor()} ${getColor()} text-xs font-bold`}>
        {score}%
      </div>
    );
  };

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

  const VehicleStatus = ({ status }) => {
    const config = {
      active: { bg: 'bg-emerald-100', text: 'text-emerald-800', icon: Car },
      idle: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: Pause },
      maintenance: { bg: 'bg-red-100', text: 'text-red-800', icon: Settings }
    };
    
    const { bg, text, icon: Icon } = config[status] || config.idle;
    
    return (
      <div className={`px-3 py-1.5 rounded-full ${bg} ${text} flex items-center gap-2`}>
        <Icon size={12} />
        <span className="text-xs font-medium capitalize">{status}</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50/30">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-emerald-500 to-yellow-500 rounded-lg">
                <Navigation className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Journey Management Plan (JMP)</h1>
                <p className="text-gray-600 text-sm">
                  Real-time vehicle tracking & safety management
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setShowTripRequest(true)}
                className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg font-medium hover:from-emerald-600 hover:to-emerald-700 transition-all flex items-center gap-2"
              >
                <Plus size={18} />
                New Journey
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard 
            icon={Navigation}
            label="Active Journeys"
            value={activeJourneys}
            color="emerald"
            trend={12}
          />
          <StatCard 
            icon={CheckCircle}
            label="Completed Today"
            value={completedToday}
            color="emerald"
            trend={5}
          />
          <StatCard 
            icon={AlertCircle}
            label="Active Alerts"
            value={alertsCount}
            color="yellow"
            trend={-3}
          />
          <StatCard 
            icon={Shield}
            label="Avg Safety Score"
            value={`${averageScore}%`}
            color="emerald"
            trend={2}
          />
        </div>

        {/* Main Content Tabs */}
        <div className="flex space-x-1 bg-white rounded-lg p-1 shadow-sm mb-8">
          <button
            onClick={() => setActiveTab('live')}
            className={`flex-1 px-4 py-2.5 text-sm font-medium rounded-md transition-all ${activeTab === 'live' ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white' : 'text-gray-600 hover:text-gray-900'}`}
          >
            <div className="flex items-center justify-center gap-2">
              <MapPin size={18} />
              Live Tracking
            </div>
          </button>
          <button
            onClick={() => setActiveTab('journeys')}
            className={`flex-1 px-4 py-2.5 text-sm font-medium rounded-md transition-all ${activeTab === 'journeys' ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white' : 'text-gray-600 hover:text-gray-900'}`}
          >
            <div className="flex items-center justify-center gap-2">
              <Calendar size={18} />
              All Journeys
            </div>
          </button>
          <button
            onClick={() => setActiveTab('drivers')}
            className={`flex-1 px-4 py-2.5 text-sm font-medium rounded-md transition-all ${activeTab === 'drivers' ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white' : 'text-gray-600 hover:text-gray-900'}`}
          >
            <div className="flex items-center justify-center gap-2">
              <User size={18} />
              Driver Management
            </div>
          </button>
          <button
            onClick={() => setActiveTab('ai')}
            className={`flex-1 px-4 py-2.5 text-sm font-medium rounded-md transition-all ${activeTab === 'ai' ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white' : 'text-gray-600 hover:text-gray-900'}`}
          >
            <div className="flex items-center justify-center gap-2">
              <Zap size={18} />
              AI Analysis
            </div>
          </button>
        </div>

        {/* Live Tracking Tab */}
        {activeTab === 'live' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Live Map & Tracking */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">Live Vehicle Tracking</h2>
                      <p className="text-sm text-gray-600 mt-1">Real-time GPS monitoring of all active journeys</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full">
                        Last updated: {liveTracking.lastUpdate}
                      </span>
                      <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg">
                        <RefreshCw size={18} />
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Map Simulation */}
                <div className="p-6">
                  <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 h-96 relative overflow-hidden">
                    {/* Simulated Map */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <MapPin size={48} className="text-emerald-400 mx-auto mb-4 animate-pulse" />
                        <div className="text-white font-medium">Live GPS Tracking Active</div>
                        <div className="text-gray-400 text-sm mt-2">{liveTracking.location}</div>
                      </div>
                    </div>
                    
                    {/* Vehicle Indicators */}
                    <div className="absolute top-6 right-6">
                      <div className="bg-black/50 backdrop-blur-sm rounded-lg p-4 text-white">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="p-2 bg-emerald-500 rounded-lg">
                            <Car size={20} />
                          </div>
                          <div>
                            <div className="font-medium">KCD 123A</div>
                            <div className="text-xs text-gray-300">Toyota Hilux</div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-300">Speed</span>
                            <span className="font-medium">{liveTracking.speed} km/h</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-300">Fuel</span>
                            <span className="font-medium">{liveTracking.fuel}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Live Metrics */}
                  <div className="grid grid-cols-3 gap-4 mt-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-emerald-100 rounded-lg">
                          <Thermometer size={18} className="text-emerald-600" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">Temperature</div>
                          <div className="text-2xl font-bold text-gray-900">{liveTracking.temperature}°C</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-yellow-100 rounded-lg">
                          <Battery size={18} className="text-yellow-600" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">Vehicle Health</div>
                          <div className="text-2xl font-bold text-gray-900">92%</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Clock size={18} className="text-blue-600" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">Drive Time</div>
                          <div className="text-2xl font-bold text-gray-900">4h 22m</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Active Journeys Sidebar */}
            <div className="space-y-6">
              {/* Active Journeys */}
              <div className="bg-white rounded-xl shadow-lg">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-900">Active Journeys</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {journeys
                      .filter(j => j.status === 'in-progress')
                      .map(journey => (
                        <div key={journey.id} className="p-4 border border-gray-200 rounded-lg hover:border-emerald-300 transition-colors">
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <div className="font-medium text-gray-900">{journey.driver}</div>
                              <div className="text-sm text-gray-600">{journey.vehicle}</div>
                            </div>
                            <StatusBadge status={journey.status} />
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600">Destination</span>
                              <span className="font-medium">{journey.destination}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600">Speed</span>
                              <span className={`font-medium ${journey.speed > 100 ? 'text-red-600' : 'text-emerald-600'}`}>
                                {journey.speed} km/h
                              </span>
                            </div>
                            <button 
                              onClick={() => {
                                setSelectedJourney(journey);
                                setShowDetails(true);
                              }}
                              className="w-full mt-2 px-3 py-2 text-sm font-medium text-emerald-600 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors"
                            >
                              View Details
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              {/* Emergency SOS */}
              <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-red-500 rounded-lg">
                    <AlertCircle size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Emergency SOS</h3>
                    <p className="text-sm text-gray-600">Panic button for drivers in distress</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <button className="w-full px-4 py-3 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 transition-colors flex items-center justify-center gap-2">
                    <Phone size={20} />
                    Activate Emergency Response
                  </button>
                  <button className="w-full px-4 py-2 bg-white border border-red-300 text-red-600 rounded-lg font-medium hover:bg-red-50 transition-colors">
                    View Emergency Contacts
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* All Journeys Tab */}
        {activeTab === 'journeys' && (
          <div className="space-y-6">
            {/* Journeys Table */}
            <div className="bg-white rounded-xl shadow-lg">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">All Journeys</h2>
                    <p className="text-sm text-gray-600 mt-1">Complete journey history and management</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <input 
                        type="text" 
                        placeholder="Search journeys..." 
                        className="pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent w-48"
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
                      <th className="py-3 px-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Journey ID</th>
                      <th className="py-3 px-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Driver & Vehicle</th>
                      <th className="py-3 px-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Route</th>
                      <th className="py-3 px-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Status</th>
                      <th className="py-3 px-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Safety Score</th>
                      <th className="py-3 px-6 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {currentJourneys.map((journey) => (
                      <tr key={journey.id} className="hover:bg-gray-50">
                        <td className="py-4 px-6">
                          <div className="font-mono text-sm font-medium text-gray-900">{journey.id}</div>
                          <div className="text-xs text-gray-500 mt-1">{journey.startTime}</div>
                        </td>
                        <td className="py-4 px-6">
                          <div>
                            <div className="font-medium text-gray-900">{journey.driver}</div>
                            <div className="text-sm text-gray-600">{journey.vehicle}</div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div>
                            <div className="font-medium text-gray-900">{journey.destination}</div>
                            <div className="text-xs text-gray-500">{journey.duration} • {journey.distance}km</div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="space-y-2">
                            <StatusBadge status={journey.status} />
                            <RiskBadge level={journey.riskLevel} />
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <DriverScore score={journey.safetyScore} />
                          <div className="text-xs text-gray-500 mt-1">{journey.alerts} alerts</div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={() => {
                                setSelectedJourney(journey);
                                setShowDetails(true);
                              }}
                              className="p-2 text-emerald-600 hover:text-emerald-800 hover:bg-emerald-100 rounded-lg transition-colors"
                              title="View Details"
                            >
                              <Eye size={18} />
                            </button>
                            {journey.status === 'pending' && (
                              <>
                                <button 
                                  onClick={() => updateJourneyStatus(journey.id, 'approved')}
                                  className="p-2 text-emerald-600 hover:text-emerald-800 hover:bg-emerald-100 rounded-lg transition-colors"
                                  title="Approve"
                                >
                                  <CheckCircle size={18} />
                                </button>
                                <button 
                                  onClick={() => updateJourneyStatus(journey.id, 'rejected')}
                                  className="p-2 text-red-600 hover:text-red-800 hover:bg-red-100 rounded-lg transition-colors"
                                  title="Reject"
                                >
                                  <X size={18} />
                                </button>
                              </>
                            )}
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

              {/* Pagination */}
              <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-700">
                    Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, journeys.length)} of {journeys.length} journeys
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
            </div>

            {/* Vehicles Status */}
            <div className="bg-white rounded-xl shadow-lg">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Fleet Status</h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {vehicles.map((vehicle) => (
                    <div key={vehicle.id} className="p-4 border border-gray-200 rounded-lg hover:border-emerald-300 transition-colors">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <div className="font-medium text-gray-900">{vehicle.registration}</div>
                          <div className="text-sm text-gray-600">{vehicle.model}</div>
                        </div>
                        <VehicleStatus status={vehicle.status} />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Driver</span>
                          <span className="font-medium">{vehicle.driver}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Fuel</span>
                          <span className={`font-medium ${vehicle.fuelLevel < 20 ? 'text-red-600' : 'text-emerald-600'}`}>
                            {vehicle.fuelLevel}%
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Speed</span>
                          <span className="font-medium">{vehicle.speed} km/h</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Last Inspection</span>
                          <span className="font-medium">{vehicle.lastInspection}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Driver Management Tab */}
        {activeTab === 'drivers' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Drivers List */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">Driver Management</h2>
                      <p className="text-sm text-gray-600 mt-1">Monitor and manage driver performance</p>
                    </div>
                    <button className="px-4 py-2 text-sm font-medium text-emerald-600 bg-emerald-50 rounded-lg hover:bg-emerald-100 flex items-center gap-2">
                      <Plus size={16} />
                      Add Driver
                    </button>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="space-y-4">
                    {drivers.map((driver) => (
                      <div key={driver.id} className="p-4 border border-gray-200 rounded-lg hover:border-emerald-300 transition-colors">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-yellow-100 rounded-full flex items-center justify-center">
                              <User size={24} className="text-emerald-600" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900">{driver.name}</h3>
                              <div className="flex items-center gap-3 mt-2">
                                <span className={`text-xs px-2 py-1 rounded-full ${
                                  driver.license === 'Valid' ? 'bg-emerald-100 text-emerald-800' : 
                                  driver.license === 'Expires Soon' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                                }`}>
                                  {driver.license}
                                </span>
                                <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                                  {driver.trips} trips
                                </span>
                              </div>
                            </div>
                          </div>
                          <DriverScore score={driver.safetyScore} />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <div className="text-xs text-gray-600 mb-1">Rating</div>
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <svg key={i} className={`w-4 h-4 ${i < Math.floor(driver.rating) ? 'text-yellow-500' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                              <span className="text-sm font-medium ml-1">{driver.rating}</span>
                            </div>
                          </div>
                          
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <div className="text-xs text-gray-600 mb-1">Hours Driven</div>
                            <div className="text-lg font-bold text-gray-900">{driver.hoursDriven}h</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3 mt-4">
                          <button className="flex-1 px-3 py-2 text-sm font-medium text-emerald-600 bg-emerald-50 rounded-lg hover:bg-emerald-100">
                            View Performance
                          </button>
                          <button className="flex-1 px-3 py-2 text-sm font-medium text-yellow-600 bg-yellow-50 rounded-lg hover:bg-yellow-100">
                            Schedule Training
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Driver Performance Metrics */}
            <div className="space-y-6">
              {/* Fatigue Monitoring */}
              <div className="bg-white rounded-xl shadow-lg">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">Fatigue Monitoring</h3>
                    <AlertCircle size={20} className="text-yellow-600" />
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Clock size={20} className="text-yellow-600" />
                        <div>
                          <div className="font-medium text-gray-900">John Kamau</div>
                          <div className="text-sm text-gray-600">Approaching 4-hour limit</div>
                        </div>
                      </div>
                      <button className="w-full mt-3 px-3 py-2 text-sm font-medium text-yellow-600 bg-yellow-100 rounded-lg hover:bg-yellow-200">
                        Send Rest Alert
                      </button>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-medium text-gray-900">Safe Driving Hours</div>
                          <div className="text-xs text-gray-600">Recommended maximum</div>
                        </div>
                        <div className="text-2xl font-bold text-emerald-600">4h</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Behavior Analytics */}
              <div className="bg-white rounded-xl shadow-lg">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-900">Driver Behavior</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-3">
                    {[
                      { behavior: 'Harsh Braking', count: 2, severity: 'medium' },
                      { behavior: 'Sudden Acceleration', count: 1, severity: 'low' },
                      { behavior: 'Speeding Violations', count: 5, severity: 'high' },
                      { behavior: 'Seatbelt Compliance', count: 98, severity: 'good' }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm font-medium text-gray-700">{item.behavior}</span>
                        <span className={`text-sm font-bold ${
                          item.severity === 'high' ? 'text-red-600' :
                          item.severity === 'medium' ? 'text-yellow-600' :
                          item.severity === 'good' ? 'text-emerald-600' : 'text-gray-600'
                        }`}>
                          {item.count} {item.severity === 'good' ? '%' : 'events'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* AI Analysis Tab */}
        {activeTab === 'ai' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* AI Assistant */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gradient-to-br from-emerald-500 to-yellow-500 rounded-lg">
                        <Zap className="text-white" size={24} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">AI Journey Assistant</h3>
                        <p className="text-sm text-gray-600">Predictive analytics and risk assessment</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  {/* AI Prompts */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">Ask AI Assistant</label>
                    <div className="flex gap-3">
                      <input
                        type="text"
                        value={aiPrompt}
                        onChange={(e) => setAiPrompt(e.target.value)}
                        placeholder="E.g., Analyze journeys for next week based on weather predictions..."
                        className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                      <button className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl font-medium hover:from-emerald-600 hover:to-emerald-700 transition-all flex items-center gap-2">
                        <Zap size={18} />
                        Analyze
                      </button>
                    </div>
                  </div>

                  {/* Quick Prompts */}
                  <div className="grid grid-cols-2 gap-3 mb-8">
                    {[
                      'Predict high-risk routes next week',
                      'Analyze driver fatigue patterns',
                      'Suggest optimal departure times',
                      'Check vehicle maintenance schedule'
                    ].map((prompt, index) => (
                      <button
                        key={index}
                        onClick={() => setAiPrompt(prompt)}
                        className="px-4 py-2 text-sm text-left bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>

                  {/* AI Analysis Results */}
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-900">AI Risk Analysis</h4>
                    {aiAnalysis.map((analysis) => (
                      <div key={analysis.id} className={`p-4 rounded-lg ${
                        analysis.severity === 'high' ? 'bg-red-50 border border-red-200' :
                        analysis.severity === 'medium' ? 'bg-yellow-50 border border-yellow-200' :
                        'bg-blue-50 border border-blue-200'
                      }`}>
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-lg ${
                            analysis.severity === 'high' ? 'bg-red-100' :
                            analysis.severity === 'medium' ? 'bg-yellow-100' : 'bg-blue-100'
                          }`}>
                            <AlertCircle size={18} className={
                              analysis.severity === 'high' ? 'text-red-600' :
                              analysis.severity === 'medium' ? 'text-yellow-600' : 'text-blue-600'
                            } />
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-gray-900">{analysis.alert}</div>
                            <div className="text-sm text-gray-600 mt-1">
                              {analysis.severity === 'high' ? 'Critical - Immediate action required' :
                               analysis.severity === 'medium' ? 'Warning - Monitor closely' :
                               'Information - Plan accordingly'}
                            </div>
                          </div>
                          <RiskBadge level={analysis.severity} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* AI Features */}
            <div className="space-y-6">
              {/* Predictive Analytics */}
              <div className="bg-white rounded-xl shadow-lg">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-900">Predictive Features</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {[
                      { icon: Cloud, label: 'Weather Prediction', color: 'emerald' },
                      { icon: TrendingUp, label: 'Route Optimization', color: 'yellow' },
                      { icon: Shield, label: 'Risk Assessment', color: 'emerald' },
                      { icon: Target, label: 'Driver Scoring', color: 'yellow' }
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className={`p-2 rounded-lg ${feature.color === 'emerald' ? 'bg-emerald-100' : 'bg-yellow-100'}`}>
                          <feature.icon size={18} className={feature.color === 'emerald' ? 'text-emerald-600' : 'text-yellow-600'} />
                        </div>
                        <span className="text-sm font-medium text-gray-700">{feature.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Geofencing */}
              <div className="bg-white rounded-xl shadow-lg">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">Geofencing Zones</h3>
                    <MapPin size={20} className="text-emerald-600" />
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-3">
                    {[
                      { zone: 'Restricted Area', status: 'active', alerts: 2 },
                      { zone: 'Safe Parking Zones', status: 'active', alerts: 0 },
                      { zone: 'High Risk Routes', status: 'monitoring', alerts: 5 }
                    ].map((zone, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium text-gray-900">{zone.zone}</div>
                          <div className="text-xs text-gray-600">{zone.alerts} alerts today</div>
                        </div>
                        <div className={`px-2 py-1 text-xs rounded-full ${
                          zone.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {zone.status}
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="w-full mt-4 px-4 py-2 text-sm font-medium text-emerald-600 bg-emerald-50 rounded-lg hover:bg-emerald-100">
                    Manage Geofences
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Trip Request Modal */}
      {showTripRequest && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Digital Trip Request</h2>
                  <p className="text-gray-600 mt-2">Complete risk assessment before journey approval</p>
                </div>
                <button
                  onClick={() => setShowTripRequest(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-8">
                {/* Basic Information */}
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Driver</label>
                    <select
                      value={tripRequest.driver}
                      onChange={(e) => setTripRequest({...tripRequest, driver: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    >
                      <option value="">Select Driver</option>
                      <option value="John Kamau">John Kamau</option>
                      <option value="Sarah Mwangi">Sarah Mwangi</option>
                      <option value="Robert Otieno">Robert Otieno</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Vehicle</label>
                    <select
                      value={tripRequest.vehicle}
                      onChange={(e) => setTripRequest({...tripRequest, vehicle: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    >
                      <option value="">Select Vehicle</option>
                      <option value="KCD 123A (Toyota Hilux)">KCD 123A (Toyota Hilux)</option>
                      <option value="KBC 456B (Isuzu Truck)">KBC 456B (Isuzu Truck)</option>
                      <option value="KAA 789C (Mitsubishi Canter)">KAA 789C (Mitsubishi Canter)</option>
                    </select>
                  </div>
                </div>

                {/* Journey Details */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Destination & Route</label>
                  <input
                    type="text"
                    value={tripRequest.destination}
                    onChange={(e) => setTripRequest({...tripRequest, destination: e.target.value})}
                    placeholder="E.g., Nairobi → Mombasa via A109"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Start Time</label>
                    <input
                      type="datetime-local"
                      value={tripRequest.startTime}
                      onChange={(e) => setTripRequest({...tripRequest, startTime: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Estimated Hours</label>
                    <input
                      type="number"
                      value={tripRequest.estimatedHours}
                      onChange={(e) => setTripRequest({...tripRequest, estimatedHours: e.target.value})}
                      placeholder="Hours"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Risk Assessment */}
                <div className="border-t border-gray-200 pt-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Pre-Journey Risk Assessment</h3>
                  <div className="space-y-4">
                    {Object.entries(tripRequest.riskAssessment).map(([key, value]) => (
                      <label key={key} className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={value}
                          onChange={(e) => setTripRequest({
                            ...tripRequest,
                            riskAssessment: {
                              ...tripRequest.riskAssessment,
                              [key]: e.target.checked
                            }
                          })}
                          className="rounded text-emerald-600 focus:ring-emerald-500 w-5 h-5"
                        />
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">
                            {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                          </div>
                          <div className="text-sm text-gray-600 mt-1">
                            {key === 'driverFatigue' && 'Driver has had adequate rest (minimum 8 hours)'}
                            {key === 'vehicleCheck' && 'Vehicle passed pre-trip inspection checklist'}
                            {key === 'weatherCheck' && 'Weather conditions checked and suitable for travel'}
                            {key === 'routePlanning' && 'Route mapped with alternative safe routes identified'}
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-6">
                  <button
                    onClick={requestTrip}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl font-bold hover:from-emerald-600 hover:to-emerald-700 transition-all"
                  >
                    Submit Trip Request
                  </button>
                  <button
                    onClick={() => setShowTripRequest(false)}
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

      {/* Journey Details Side Panel */}
      {showDetails && selectedJourney && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-transparent" onClick={() => setShowDetails(false)}></div>
          <div className="absolute inset-y-0 right-0 max-w-2xl w-full bg-white shadow-2xl">
            <div className="h-full flex flex-col">
              {/* Panel Header */}
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Journey Details</h2>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="font-mono text-sm text-gray-600">{selectedJourney.id}</span>
                      <StatusBadge status={selectedJourney.status} />
                    </div>
                  </div>
                  <button 
                    onClick={() => setShowDetails(false)}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>

              {/* Panel Content */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="space-y-6">
                  {/* Journey Info */}
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-600 mb-2">Driver</h3>
                      <p className="font-medium text-gray-900">{selectedJourney.driver}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-600 mb-2">Vehicle</h3>
                      <p className="font-medium text-gray-900">{selectedJourney.vehicle}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-600 mb-2">Start Time</h3>
                      <p className="font-medium text-gray-900">{selectedJourney.startTime}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-600 mb-2">Estimated End</h3>
                      <p className="font-medium text-gray-900">{selectedJourney.estimatedEnd}</p>
                    </div>
                  </div>

                  {/* Safety Metrics */}
                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Safety Metrics</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="text-sm text-gray-600 mb-1">Safety Score</div>
                        <DriverScore score={selectedJourney.safetyScore} />
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="text-sm text-gray-600 mb-1">Current Speed</div>
                        <div className="text-2xl font-bold text-gray-900">{selectedJourney.speed} km/h</div>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="text-sm text-gray-600 mb-1">Alerts</div>
                        <div className="text-2xl font-bold text-gray-900">{selectedJourney.alerts}</div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="border-t border-gray-200 pt-6">
                    <div className="space-y-3">
                      <button className="w-full px-4 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg font-semibold hover:from-emerald-600 hover:to-emerald-700">
                        Live Tracking View
                      </button>
                      <button className="w-full px-4 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50">
                        Download Journey Report
                      </button>
                      <button className="w-full px-4 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50">
                        Contact Driver
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