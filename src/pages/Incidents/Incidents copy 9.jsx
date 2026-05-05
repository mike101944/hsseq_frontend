
"use client"

import React, { useState, useEffect } from 'react'
import { 
  Plus, 
  Search, 
  Download, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  ChevronRight,
  Eye,
  Edit,
  Trash2,
  User,
  MapPin,
  Shield,
  Activity,
  FileText,
  ClipboardCheck,
  MoreVertical,
  RefreshCw,
  Users,
  Check,
  Send,
  ShieldCheck,
  Bell,
  Phone,
  Loader2,
  Filter,
  Calendar,
  MessageSquare,
  Upload,
  AlertCircle,
  CheckSquare,
  XCircle,
  FileSpreadsheet,
  BarChart3,
  TrendingUp,
  TrendingDown
} from 'lucide-react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { Progress } from '@/components/ui/progress'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"

// Types
const IncidentStatus = {
  PENDING: 'pending',
  UNDER_INVESTIGATION: 'under-investigation',
  ASSIGNED: 'assigned',
  RESOLVED: 'resolved',
  CLOSED: 'closed'
}

const IncidentSeverity = {
  CRITICAL: 'Critical',
  HIGH: 'High',
  MEDIUM: 'Medium',
  LOW: 'Low'
}

// Incident data
const incidentsData = [
  {
    id: 'INC-2024-001',
    title: 'Slip and Fall - Warehouse A',
    date: '2024-06-15',
    time: '10:30 AM',
    location: 'Warehouse A, Zone 3',
    severity: IncidentSeverity.CRITICAL,
    status: IncidentStatus.ASSIGNED,
    type: 'injury',
    category: 'Slip/Trip',
    reportedBy: 'John Doe',
    assignedTo: 'Safety Officer 1',
    assignedOfficer: 'John Safety',
    responseTime: '15 mins',
    investigationStatus: 'In Progress',
    daysOpen: 2,
    priority: 'Critical',
    description: 'Employee slipped on wet floor in warehouse area. Minor injuries reported. First aid administered on site.',
    evidence: 3,
    witnesses: 2,
    department: 'Logistics',
    actionTaken: 'Area cordoned off, incident reported to management',
    createdAt: '2024-06-15T10:30:00',
    updatedAt: '2024-06-15T11:45:00'
  },
  {
    id: 'INC-2024-002',
    title: 'Chemical Spill - Lab 2',
    date: '2024-06-14',
    time: '02:15 PM',
    location: 'Lab 2, Building B',
    severity: IncidentSeverity.HIGH,
    status: IncidentStatus.UNDER_INVESTIGATION,
    type: 'environmental',
    category: 'Chemical',
    reportedBy: 'Anonymous',
    assignedTo: 'Chem Safety Team',
    responseTime: '8 mins',
    investigationStatus: 'Evidence Collection',
    daysOpen: 3,
    priority: 'High',
    description: 'Minor chemical spill during experiment. Containment successful, no injuries reported.',
    evidence: 2,
    witnesses: 1,
    department: 'R&D',
    actionTaken: 'Area evacuated, spill contained, safety protocols followed',
    createdAt: '2024-06-14T14:15:00',
    updatedAt: '2024-06-14T15:30:00'
  },
  {
    id: 'INC-2024-003',
    title: 'Electrical Panel Hazard',
    date: '2024-06-13',
    time: '09:45 AM',
    location: 'Maintenance Room',
    severity: IncidentSeverity.MEDIUM,
    status: IncidentStatus.PENDING,
    type: 'electrical',
    category: 'Electrical',
    reportedBy: 'Mike Wilson',
    assignedTo: 'Electrical Team',
    responseTime: '12 mins',
    investigationStatus: 'Awaiting Assignment',
    daysOpen: 4,
    priority: 'Medium',
    description: 'Exposed electrical panel found in maintenance room. Potential safety hazard identified.',
    evidence: 4,
    witnesses: 0,
    department: 'Maintenance',
    actionTaken: 'Warning signs placed, area restricted',
    createdAt: '2024-06-13T09:45:00',
    updatedAt: '2024-06-13T10:00:00'
  },
  {
    id: 'INC-2024-004',
    title: 'Near Miss - Falling Object',
    date: '2024-06-12',
    time: '11:20 AM',
    location: 'Assembly Line 3',
    severity: IncidentSeverity.LOW,
    status: IncidentStatus.RESOLVED,
    type: 'near-miss',
    category: 'Fall Protection',
    reportedBy: 'Sarah Chen',
    assignedTo: 'Line Supervisor',
    assignedOfficer: 'Sarah Chen',
    responseTime: '6 mins',
    investigationStatus: 'Closed',
    daysOpen: 0,
    priority: 'Low',
    description: 'Tool fell from overhead rack, no injuries. Close call incident.',
    evidence: 1,
    witnesses: 3,
    department: 'Production',
    actionTaken: 'Area secured, tools properly stored, safety audit conducted',
    resolutionNotes: 'Completed safety briefing for team, implemented additional securing measures',
    resolvedBy: 'John Safety',
    resolvedAt: '2024-06-12T14:30:00',
    createdAt: '2024-06-12T11:20:00',
    updatedAt: '2024-06-12T14:30:00'
  },
  {
    id: 'INC-2024-005',
    title: 'Fire Alarm Test - Building C',
    date: '2024-06-11',
    time: '09:00 AM',
    location: 'Building C, All Floors',
    severity: IncidentSeverity.LOW,
    status: IncidentStatus.CLOSED,
    type: 'drill',
    category: 'Fire Safety',
    reportedBy: 'System',
    assignedTo: 'Fire Safety Team',
    assignedOfficer: 'Emma Davis',
    responseTime: '2 mins',
    investigationStatus: 'Completed',
    daysOpen: 0,
    priority: 'Low',
    description: 'Monthly fire alarm system test completed successfully.',
    evidence: 0,
    witnesses: 0,
    department: 'Facilities',
    actionTaken: 'System test completed, evacuation drill conducted',
    resolutionNotes: 'All systems functioning properly, drill completed within required time',
    resolvedBy: 'Emma Davis',
    resolvedAt: '2024-06-11T09:30:00',
    createdAt: '2024-06-11T09:00:00',
    updatedAt: '2024-06-11T09:30:00'
  }
]

// Officers data
const officers = [
  { 
    id: 'officer-1', 
    name: 'John Safety', 
    email: 'john@safety.com', 
    role: 'Senior Safety Officer', 
    assignedIncidents: 3,
    phone: '+255 712 345 678',
    department: 'Safety',
    avatarColor: 'bg-blue-500'
  },
  { 
    id: 'officer-2', 
    name: 'Sarah Chen', 
    email: 'sarah@safety.com', 
    role: 'Safety Investigator', 
    assignedIncidents: 2,
    phone: '+255 713 456 789',
    department: 'Investigation',
    avatarColor: 'bg-green-500'
  },
  { 
    id: 'officer-3', 
    name: 'Mike Wilson', 
    email: 'mike@safety.com', 
    role: 'Safety Supervisor', 
    assignedIncidents: 1,
    phone: '+255 714 567 890',
    department: 'Supervision',
    avatarColor: 'bg-purple-500'
  },
  { 
    id: 'officer-4', 
    name: 'Emma Davis', 
    email: 'emma@safety.com', 
    role: 'Safety Analyst', 
    assignedIncidents: 0,
    phone: '+255 715 678 901',
    department: 'Analytics',
    avatarColor: 'bg-amber-500'
  }
]

// Stats data
const incidentStats = {
  total: 156,
  pending: 12,
  investigating: 8,
  assigned: 6,
  resolved: 42,
  closed: 88,
  avgResponseTime: '8m 24s',
  resolutionRate: '85.3%',
  safetyScore: 92.5
}

export const Incidents = () => {
  // State
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSeverity, setSelectedSeverity] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedIncident, setSelectedIncident] = useState(incidentsData[0])
  const [assigningOfficer, setAssigningOfficer] = useState(false)
  const [resolutionNotes, setResolutionNotes] = useState('')
  const [selectedOfficerId, setSelectedOfficerId] = useState('')
  const [viewMode, setViewMode] = useState('list')
  const [isLoading, setIsLoading] = useState(false)
  const [stats, setStats] = useState(incidentStats)
  const [activeTab, setActiveTab] = useState('overview')

  // Filter incidents
  const filteredIncidents = incidentsData.filter(incident => {
    const matchesSearch = searchQuery === '' || 
      incident.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      incident.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      incident.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      incident.reportedBy.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesSeverity = selectedSeverity === 'all' || incident.severity === selectedSeverity
    const matchesStatus = selectedStatus === 'all' || incident.status === selectedStatus

    return matchesSearch && matchesSeverity && matchesStatus
  })

  // Get all incidents or filtered based on view mode
  const displayIncidents = viewMode === 'all' ? incidentsData : filteredIncidents

  // Get severity badge style
  const getSeverityStyle = (severity) => {
    switch (severity) {
      case IncidentSeverity.CRITICAL:
        return {
          bg: 'bg-red-50',
          text: 'text-red-700',
          border: 'border-red-200',
          icon: 'bg-red-100 text-red-600'
        }
      case IncidentSeverity.HIGH:
        return {
          bg: 'bg-orange-50',
          text: 'text-orange-700',
          border: 'border-orange-200',
          icon: 'bg-orange-100 text-orange-600'
        }
      case IncidentSeverity.MEDIUM:
        return {
          bg: 'bg-yellow-50',
          text: 'text-yellow-700',
          border: 'border-yellow-200',
          icon: 'bg-yellow-100 text-yellow-600'
        }
      case IncidentSeverity.LOW:
        return {
          bg: 'bg-blue-50',
          text: 'text-blue-700',
          border: 'border-blue-200',
          icon: 'bg-blue-100 text-blue-600'
        }
      default:
        return {
          bg: 'bg-gray-50',
          text: 'text-gray-700',
          border: 'border-gray-200',
          icon: 'bg-gray-100 text-gray-600'
        }
    }
  }

  // Get status badge style
  const getStatusStyle = (status) => {
    switch (status) {
      case IncidentStatus.PENDING:
        return {
          bg: 'bg-yellow-50',
          text: 'text-yellow-700',
          border: 'border-yellow-200',
          label: 'Pending',
          icon: <Clock className="h-3 w-3" />
        }
      case IncidentStatus.UNDER_INVESTIGATION:
        return {
          bg: 'bg-purple-50',
          text: 'text-purple-700',
          border: 'border-purple-200',
          label: 'Under Processing',
          icon: <Activity className="h-3 w-3" />
        }
      case IncidentStatus.ASSIGNED:
        return {
          bg: 'bg-blue-50',
          text: 'text-blue-700',
          border: 'border-blue-200',
          label: 'Assigned',
          icon: <User className="h-3 w-3" />
        }
      case IncidentStatus.RESOLVED:
        return {
          bg: 'bg-green-50',
          text: 'text-green-700',
          border: 'border-green-200',
          label: 'Solved',
          icon: <CheckCircle className="h-3 w-3" />
        }
      case IncidentStatus.CLOSED:
        return {
          bg: 'bg-emerald-50',
          text: 'text-emerald-700',
          border: 'border-emerald-200',
          label: 'Closed',
          icon: <CheckSquare className="h-3 w-3" />
        }
      default:
        return {
          bg: 'bg-gray-50',
          text: 'text-gray-700',
          border: 'border-gray-200',
          label: status,
          icon: <AlertCircle className="h-3 w-3" />
        }
    }
  }

  // Handle assign incident
  const handleAssignIncident = async (incidentId, officerId) => {
    const officer = officers.find(o => o.id === officerId)
    if (!officer) return

    setAssigningOfficer(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // In a real app, you would update via API
      alert(`Incident assigned to ${officer.name}`)
      
      // Update selected incident
      setSelectedIncident(prev => ({
        ...prev,
        assignedOfficer: officer.name,
        status: IncidentStatus.ASSIGNED,
        assignedTo: officer.role
      }))
      
      setSelectedOfficerId('')
    } catch (error) {
      console.error('Error assigning incident:', error)
      alert('Failed to assign incident. Please try again.')
    } finally {
      setAssigningOfficer(false)
    }
  }

  // Handle resolve incident
  const handleResolveIncident = async (incidentId) => {
    if (!resolutionNotes.trim()) {
      alert('Please add resolution notes')
      return
    }

    setIsLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Update selected incident
      setSelectedIncident(prev => ({
        ...prev,
        status: IncidentStatus.RESOLVED,
        resolutionNotes: resolutionNotes,
        resolvedBy: 'Current User',
        resolvedAt: new Date().toISOString(),
        daysOpen: 0
      }))
      
      setResolutionNotes('')
      alert('Incident marked as resolved successfully!')
    } catch (error) {
      console.error('Error resolving incident:', error)
      alert('Failed to resolve incident. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  // Handle export incidents
  const handleExportIncidents = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      alert('Incidents exported successfully!')
    }, 1500)
  }

  // Handle refresh data
  const handleRefreshData = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      // In real app, fetch new data here
    }, 1000)
  }

  // Get officer by ID
  const getOfficerById = (id) => {
    return officers.find(o => o.id === id)
  }

  // Calculate incident statistics
  const calculateStats = () => {
    const stats = {
      pending: incidentsData.filter(i => i.status === IncidentStatus.PENDING).length,
      investigating: incidentsData.filter(i => i.status === IncidentStatus.UNDER_INVESTIGATION).length,
      assigned: incidentsData.filter(i => i.status === IncidentStatus.ASSIGNED).length,
      resolved: incidentsData.filter(i => i.status === IncidentStatus.RESOLVED).length,
      closed: incidentsData.filter(i => i.status === IncidentStatus.CLOSED).length,
      total: incidentsData.length
    }
    return stats
  }

  // Get status count
  const statusCounts = calculateStats()

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white rounded-lg shadow-sm">
              <Shield className="h-6 w-6 text-gray-700" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                Incident Management System
              </h1>
              <p className="text-gray-600 mt-1">
                Track, assign, and resolve safety incidents in real-time
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search incidents..."
              className="pl-9 w-full sm:w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button className="bg-gray-900 hover:bg-gray-800 text-white">
            <Plus className="h-4 w-4 mr-2" />
            New Incident
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="shadow-sm border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Incidents</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{statusCounts.total}</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4">
              <div className="text-xs text-gray-500 flex justify-between mb-1">
                <span>Active</span>
                <span>{statusCounts.pending + statusCounts.investigating + statusCounts.assigned}</span>
              </div>
              <Progress 
                value={(statusCounts.pending + statusCounts.investigating + statusCounts.assigned) / statusCounts.total * 100} 
                className="h-2"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Review</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{statusCounts.pending}</p>
              </div>
              <div className="p-3 bg-yellow-50 rounded-lg">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
            <div className="mt-4">
              <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                Requires Attention
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Under Processing</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{statusCounts.investigating}</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <Activity className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4">
              <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                In Progress
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Resolved</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{statusCounts.resolved + statusCounts.closed}</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4">
              <div className="text-xs text-gray-500">
                Resolution Rate: {((statusCounts.resolved + statusCounts.closed) / statusCounts.total * 100).toFixed(1)}%
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Incidents Table */}
        <div className="lg:col-span-2 space-y-6">
          {/* Filters and Actions */}
          <Card className="shadow-sm border-0">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold">
                    {viewMode === 'all' ? 'All Incidents' : 'Active Incidents'}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {displayIncidents.length} incidents found
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  <Select value={selectedSeverity} onValueChange={setSelectedSeverity}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Severity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Severity</SelectItem>
                      <SelectItem value={IncidentSeverity.CRITICAL}>Critical</SelectItem>
                      <SelectItem value={IncidentSeverity.HIGH}>High</SelectItem>
                      <SelectItem value={IncidentSeverity.MEDIUM}>Medium</SelectItem>
                      <SelectItem value={IncidentSeverity.LOW}>Low</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value={IncidentStatus.PENDING}>Pending</SelectItem>
                      <SelectItem value={IncidentStatus.UNDER_INVESTIGATION}>Under Processing</SelectItem>
                      <SelectItem value={IncidentStatus.ASSIGNED}>Assigned</SelectItem>
                      <SelectItem value={IncidentStatus.RESOLVED}>Solved</SelectItem>
                      <SelectItem value={IncidentStatus.CLOSED}>Closed</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Button 
                    variant="outline" 
                    onClick={handleRefreshData}
                    disabled={isLoading}
                  >
                    <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                    Refresh
                  </Button>
                  
                  <Button 
                    variant="outline"
                    onClick={handleExportIncidents}
                    disabled={isLoading}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Incidents Table */}
          <Card className="shadow-sm border-0 overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-32">Incident ID</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead className="w-24">Severity</TableHead>
                    <TableHead className="w-40">Status</TableHead>
                    <TableHead className="w-28">Days</TableHead>
                    <TableHead className="w-20">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {displayIncidents.map((incident) => {
                    const severityStyle = getSeverityStyle(incident.severity)
                    const statusStyle = getStatusStyle(incident.status)
                    
                    return (
                      <TableRow 
                        key={incident.id}
                        className={`hover:bg-gray-50 cursor-pointer ${
                          selectedIncident?.id === incident.id ? 'bg-blue-50' : ''
                        }`}
                        onClick={() => setSelectedIncident(incident)}
                      >
                        <TableCell>
                          <div className="font-medium text-gray-900">{incident.id}</div>
                          <div className="text-xs text-gray-500">{incident.date}</div>
                        </TableCell>
                        
                        <TableCell>
                          <div className="font-medium text-gray-900">{incident.title}</div>
                          <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                            <MapPin className="h-3 w-3" />
                            {incident.location}
                          </div>
                        </TableCell>
                        
                        <TableCell>
                          <Badge 
                            className={`${severityStyle.bg} ${severityStyle.text} ${severityStyle.border} border`}
                          >
                            {incident.severity}
                          </Badge>
                        </TableCell>
                        
                        <TableCell>
                          <Badge 
                            variant="outline" 
                            className={`${statusStyle.bg} ${statusStyle.text} ${statusStyle.border} flex items-center gap-1`}
                          >
                            {statusStyle.icon}
                            {statusStyle.label}
                          </Badge>
                        </TableCell>
                        
                        <TableCell>
                          <div className="font-medium">{incident.daysOpen}d</div>
                          <div className="text-xs text-gray-500">{incident.time}</div>
                        </TableCell>
                        
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      setSelectedIncident(incident)
                                    }}
                                  >
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>View Details</TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                            
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-48 p-2">
                                <div className="space-y-1">
                                  <Button
                                    variant="ghost"
                                    className="w-full justify-start text-sm"
                                    onClick={() => setSelectedIncident(incident)}
                                  >
                                    <Eye className="h-3 w-3 mr-2" />
                                    View Details
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    className="w-full justify-start text-sm"
                                  >
                                    <Edit className="h-3 w-3 mr-2" />
                                    Edit Incident
                                  </Button>
                                  <Separator />
                                  <Button
                                    variant="ghost"
                                    className="w-full justify-start text-sm text-red-600"
                                  >
                                    <Trash2 className="h-3 w-3 mr-2" />
                                    Delete
                                  </Button>
                                </div>
                              </PopoverContent>
                            </Popover>
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
            
            <CardFooter className="border-t">
              <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-sm text-gray-500">
                  Showing {displayIncidents.length} of {incidentsData.length} incidents
                </div>
                
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setViewMode(viewMode === 'list' ? 'all' : 'list')}
                  >
                    {viewMode === 'list' ? 'View All Incidents' : 'View Active Only'}
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
            </CardFooter>
          </Card>

          {/* Officer's Area */}
          <Card className="shadow-sm border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ClipboardCheck className="h-5 w-5" />
                Officer's Resolution Area
              </CardTitle>
              <CardDescription>
                Assign incidents to officers and track resolution progress
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="assign">Assign Incidents</TabsTrigger>
                  <TabsTrigger value="resolve">Resolve Incidents</TabsTrigger>
                </TabsList>
                
                {/* Assign Tab */}
                <TabsContent value="assign" className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="incident-select">Select Incident to Assign</Label>
                      <Select
                        value={selectedIncident?.id || ''}
                        onValueChange={(value) => {
                          const incident = incidentsData.find(i => i.id === value)
                          if (incident) setSelectedIncident(incident)
                        }}
                      >
                        <SelectTrigger id="incident-select">
                          <SelectValue placeholder="Select an incident" />
                        </SelectTrigger>
                        <SelectContent>
                          {incidentsData
                            .filter(i => i.status === IncidentStatus.PENDING || i.status === IncidentStatus.UNDER_INVESTIGATION)
                            .map((incident) => (
                              <SelectItem key={incident.id} value={incident.id}>
                                {incident.id} - {incident.title}
                              </SelectItem>
                            ))
                          }
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="officer-select">Assign to Officer</Label>
                      <div className="flex gap-2 mt-2">
                        <Select
                          value={selectedOfficerId}
                          onValueChange={setSelectedOfficerId}
                          disabled={assigningOfficer}
                        >
                          <SelectTrigger id="officer-select" className="flex-1">
                            <SelectValue placeholder="Select an officer" />
                          </SelectTrigger>
                          <SelectContent>
                            {officers.map((officer) => (
                              <SelectItem key={officer.id} value={officer.id}>
                                <div className="flex items-center gap-2">
                                  <div className={`w-2 h-2 rounded-full ${officer.avatarColor}`} />
                                  {officer.name} - {officer.role}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        
                        <Button
                          onClick={() => {
                            if (selectedIncident && selectedOfficerId) {
                              handleAssignIncident(selectedIncident.id, selectedOfficerId)
                            }
                          }}
                          disabled={!selectedIncident || !selectedOfficerId || assigningOfficer}
                        >
                          {assigningOfficer ? (
                            <>
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                              Assigning...
                            </>
                          ) : (
                            <>
                              <Send className="h-4 w-4 mr-2" />
                              Assign
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-4">Available Officers</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {officers.map((officer) => (
                        <Card key={officer.id} className="shadow-sm">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between">
                              <div className="flex items-start gap-3">
                                <div className={`w-10 h-10 rounded-full ${officer.avatarColor} flex items-center justify-center text-white font-semibold`}>
                                  {officer.name.charAt(0)}
                                </div>
                                <div>
                                  <h5 className="font-semibold">{officer.name}</h5>
                                  <p className="text-sm text-gray-600">{officer.role}</p>
                                  <div className="flex items-center gap-2 mt-2">
                                    <Badge variant="outline">
                                      {officer.assignedIncidents} Assigned
                                    </Badge>
                                  </div>
                                </div>
                              </div>
                              
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setSelectedOfficerId(officer.id)
                                  const assignableIncident = incidentsData.find(i => 
                                    i.status === IncidentStatus.PENDING || i.status === IncidentStatus.UNDER_INVESTIGATION
                                  )
                                  if (assignableIncident) {
                                    setSelectedIncident(assignableIncident)
                                  }
                                }}
                              >
                                Select
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                
                {/* Resolve Tab */}
                <TabsContent value="resolve" className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="resolve-incident">Select Incident to Resolve</Label>
                      <Select
                        value={selectedIncident?.id || ''}
                        onValueChange={(value) => {
                          const incident = incidentsData.find(i => i.id === value)
                          if (incident) setSelectedIncident(incident)
                        }}
                      >
                        <SelectTrigger id="resolve-incident">
                          <SelectValue placeholder="Select an incident" />
                        </SelectTrigger>
                        <SelectContent>
                          {incidentsData
                            .filter(i => i.status === IncidentStatus.ASSIGNED || i.status === IncidentStatus.UNDER_INVESTIGATION)
                            .map((incident) => (
                              <SelectItem key={incident.id} value={incident.id}>
                                {incident.id} - {incident.title}
                              </SelectItem>
                            ))
                          }
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {selectedIncident && (
                      <div className="space-y-4">
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <h5 className="font-semibold mb-2">Incident Details</h5>
                          <p className="text-sm text-gray-600">{selectedIncident.description}</p>
                          <div className="flex items-center gap-4 mt-3">
                            <Badge variant="outline">
                              {selectedIncident.severity}
                            </Badge>
                            <Badge variant="outline">
                              {selectedIncident.category}
                            </Badge>
                          </div>
                        </div>
                        
                        <div>
                          <Label htmlFor="resolution-notes">Resolution Notes *</Label>
                          <Textarea
                            id="resolution-notes"
                            placeholder="Describe what actions were taken to resolve this incident..."
                            value={resolutionNotes}
                            onChange={(e) => setResolutionNotes(e.target.value)}
                            rows={4}
                            className="mt-2"
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            Please provide detailed notes about how the incident was resolved
                          </p>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button
                            className="flex-1"
                            onClick={() => handleResolveIncident(selectedIncident.id)}
                            disabled={!resolutionNotes.trim() || isLoading}
                          >
                            {isLoading ? (
                              <>
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                Processing...
                              </>
                            ) : (
                              <>
                                <Check className="h-4 w-4 mr-2" />
                                Mark as Resolved
                              </>
                            )}
                          </Button>
                          
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant="outline">
                                <MoreVertical className="h-4 w-4 mr-2" />
                                More
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-48 p-2">
                              <div className="space-y-1">
                                <Button variant="ghost" className="w-full justify-start text-sm">
                                  <Upload className="h-3 w-3 mr-2" />
                                  Upload Evidence
                                </Button>
                                <Button variant="ghost" className="w-full justify-start text-sm">
                                  <MessageSquare className="h-3 w-3 mr-2" />
                                  Add Comment
                                </Button>
                              </div>
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Incident Details */}
        <div className="space-y-6">
          {/* Incident Details Card */}
          {selectedIncident ? (
            <Card className="shadow-sm border-0 sticky top-6">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5" />
                      Incident Details
                    </CardTitle>
                    <CardDescription>
                      Complete information for {selectedIncident.id}
                    </CardDescription>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Badge className={getSeverityStyle(selectedIncident.severity).bg + ' ' + getSeverityStyle(selectedIncident.severity).text}>
                      {selectedIncident.severity}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Incident Header */}
                <div>
                  <h3 className="font-semibold text-lg mb-2">{selectedIncident.title}</h3>
                  <p className="text-gray-600">{selectedIncident.description}</p>
                </div>
                
                <Separator />
                
                {/* Basic Information */}
                <div className="space-y-4">
                  <h4 className="font-semibold">Basic Information</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm text-gray-500">Incident ID</Label>
                      <p className="font-medium">{selectedIncident.id}</p>
                    </div>
                    <div>
                      <Label className="text-sm text-gray-500">Status</Label>
                      <div className="flex items-center gap-2">
                        {getStatusStyle(selectedIncident.status).icon}
                        <span className="font-medium">{getStatusStyle(selectedIncident.status).label}</span>
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm text-gray-500">Date & Time</Label>
                      <p className="font-medium">{selectedIncident.date} at {selectedIncident.time}</p>
                    </div>
                    <div>
                      <Label className="text-sm text-gray-500">Location</Label>
                      <p className="font-medium">{selectedIncident.location}</p>
                    </div>
                    <div>
                      <Label className="text-sm text-gray-500">Category</Label>
                      <p className="font-medium">{selectedIncident.category}</p>
                    </div>
                    <div>
                      <Label className="text-sm text-gray-500">Department</Label>
                      <p className="font-medium">{selectedIncident.department}</p>
                    </div>
                  </div>
                </div>
                
                {/* Assignment Info */}
                <div className="space-y-4">
                  <h4 className="font-semibold">Assignment Information</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm text-gray-500">Reported By</Label>
                      <p className="font-medium">{selectedIncident.reportedBy}</p>
                    </div>
                    <div>
                      <Label className="text-sm text-gray-500">Assigned Officer</Label>
                      <p className="font-medium">
                        {selectedIncident.assignedOfficer || 'Not assigned'}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm text-gray-500">Response Time</Label>
                      <p className="font-medium">{selectedIncident.responseTime}</p>
                    </div>
                    <div>
                      <Label className="text-sm text-gray-500">Days Open</Label>
                      <p className="font-medium">{selectedIncident.daysOpen} days</p>
                    </div>
                  </div>
                  
                  {selectedIncident.assignedOfficer && (
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <User className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">{selectedIncident.assignedOfficer}</p>
                          <p className="text-sm text-blue-600">Assigned to handle this incident</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Evidence & Details */}
                <div className="space-y-4">
                  <h4 className="font-semibold">Evidence & Investigation</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm text-gray-500">Evidence Files</Label>
                      <p className="font-medium">{selectedIncident.evidence} files</p>
                    </div>
                    <div>
                      <Label className="text-sm text-gray-500">Witnesses</Label>
                      <p className="font-medium">{selectedIncident.witnesses} people</p>
                    </div>
                  </div>
                  
                  {selectedIncident.actionTaken && (
                    <div>
                      <Label className="text-sm text-gray-500">Actions Taken</Label>
                      <p className="font-medium">{selectedIncident.actionTaken}</p>
                    </div>
                  )}
                </div>
                
                {/* Resolution Info */}
                {(selectedIncident.status === IncidentStatus.RESOLVED || selectedIncident.status === IncidentStatus.CLOSED) && (
                  <>
                    <Separator />
                    <div className="space-y-4">
                      <h4 className="font-semibold text-green-700">Resolution Information</h4>
                      
                      {selectedIncident.resolutionNotes && (
                        <div>
                          <Label className="text-sm text-gray-500">Resolution Notes</Label>
                          <p className="font-medium">{selectedIncident.resolutionNotes}</p>
                        </div>
                      )}
                      
                      <div className="grid grid-cols-2 gap-4">
                        {selectedIncident.resolvedBy && (
                          <div>
                            <Label className="text-sm text-gray-500">Resolved By</Label>
                            <p className="font-medium">{selectedIncident.resolvedBy}</p>
                          </div>
                        )}
                        {selectedIncident.resolvedAt && (
                          <div>
                            <Label className="text-sm text-gray-500">Resolved At</Label>
                            <p className="font-medium">
                              {new Date(selectedIncident.resolvedAt).toLocaleDateString()} at{' '}
                              {new Date(selectedIncident.resolvedAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
              
              <CardFooter className="border-t">
                <div className="w-full flex flex-col sm:flex-row gap-2">
                  <Button className="flex-1">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Incident
                  </Button>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ) : (
            <Card className="shadow-sm border-0">
              <CardContent className="p-8 text-center">
                <AlertTriangle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-700 mb-2">No Incident Selected</h3>
                <p className="text-gray-500 text-sm">
                  Select an incident from the list to view detailed information
                </p>
              </CardContent>
            </Card>
          )}

          {/* Emergency Contacts */}
          <Card className="shadow-sm border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Emergency Contacts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <Phone className="h-4 w-4 text-red-600" />
                  </div>
                  <div>
                    <p className="font-medium">Site Emergency</p>
                    <p className="text-sm text-red-600">555-0123</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <User className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">Safety Officer</p>
                    <p className="text-sm text-blue-600">555-0124</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Shield className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">First Aid</p>
                    <p className="text-sm text-green-600">555-0125</p>
                  </div>
                </div>
              </div>
              
              <Button className="w-full" variant="destructive">
                <Bell className="h-4 w-4 mr-2" />
                Emergency Alert
              </Button>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="shadow-sm border-0">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <FileSpreadsheet className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <BarChart3 className="h-4 w-4 mr-2" />
                View Analytics
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Users className="h-4 w-4 mr-2" />
                Manage Officers
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-none shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-600">System Status</div>
                <div className="text-2xl font-bold text-green-600 mt-1">All Systems Operational</div>
              </div>
              <div className="p-3 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full">
                <ShieldCheck className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-none shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-600">Data Sync</div>
                <div className="text-2xl font-bold text-blue-600 mt-1">Real-time</div>
              </div>
              <div className="p-3 bg-gradient-to-r from-blue-100 to-blue-200 rounded-full">
                <Cloud className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-none shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-600">Last Updated</div>
                <div className="text-2xl font-bold text-amber-600 mt-1">Just Now</div>
              </div>
              <div className="p-3 bg-gradient-to-r from-amber-100 to-yellow-100 rounded-full">
                <Timer className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
     
    </div>
  )
}
