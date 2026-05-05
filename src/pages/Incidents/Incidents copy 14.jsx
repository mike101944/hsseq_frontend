
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
  Cloud ,
  FileText,
  ClipboardCheck,
  MoreVertical,
  RefreshCw,
  Timer ,
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
  UserPlus ,
  Briefcase ,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Smartphone ,
  ChevronDown ,
  List,
  Paperclip ,
  Tag ,
  X,
  UserMinus 
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
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
import {MobileReportingDialog} from"./MobileReportingDialog"
import {IncidentReportDialog} from"./IncidentReportDialog"


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
          {/* <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search incidents..."
              className="pl-9 w-full sm:w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div> */}
          <div className="flex gap-2">
            <Dialog>
              <DialogTrigger asChild>
              <Button variant="outline" className="gap-2 cursor-pointer border-amber-200 hover:border-amber-300 hover:text-emerald-600 bg-emerald-500 text-white hover:bg-amber-50">
                  <Smartphone className="h-4 w-4" />
                  Mobile
                </Button>

                
              </DialogTrigger>
              <IncidentReportDialog />
            </Dialog>
            <Dialog>
              <DialogTrigger asChild>
              <Button className="gap-2 cursor-pointer bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white font-semibold shadow-lg hover:shadow-xl">
                  <Plus className="h-4 w-4" />
                  New Incident
                </Button>

              </DialogTrigger>
              <MobileReportingDialog />
            </Dialog>
          </div>
         
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className=" border-0 bg-white cursor-pointer border-r-4 shadow-md shadow-emerald-100 hover:translate-y-2 transform-view transition-all duration-1000 border-emerald-400">
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

        <Card className="border-0 bg-white cursor-pointer border-r-4 shadow-xl shadow-emerald-200 hover:translate-y-2 transform-view transition-all duration-1000 border-emerald-400">
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

        <Card className="border-0 bg-white cursor-pointer border-r-4 shadow-md shadow-emerald-100 hover:translate-y-2 transform-view transition-all duration-1000 border-emerald-400">
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

        <Card className="border-0 bg-white cursor-pointer border-r-4 shadow-xl shadow-emerald-200 hover:translate-y-2 transform-view transition-all duration-1000 border-emerald-400">
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
      <div className="grid grid-cols-1  gap-6 w-full ">
        {/* Left Column - Incidents Table */}
        <div className="lg:col-span-2 space-y-6 w-ful">
          {/* Filters and Actions */}
          <Card className=" border-0 bg-white shadow-md  shadow-emerald-200 min-w-full">
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
  <SelectTrigger className="w-32  cursor-pointer border-0 border-b-3 bg-amber-50 border-emerald-300 shadow-none px-0 focus:ring-0 focus:ring-offset-0">
    <div className="flex items-center gap-2">
      <SelectValue placeholder="Severity" />
    </div>
  </SelectTrigger>
  <SelectContent className="bg-white cursor-pointer border-none shadow-md mt-1">
    <SelectItem value="all" className="cursor-pointer hover:bg-gray-50">
      All Severity
    </SelectItem>
    <SelectItem value={IncidentSeverity.CRITICAL} className="cursor-pointer hover:bg-gray-50">
      <div className="flex items-center gap-2">
        Critical
      </div>
    </SelectItem>
    <SelectItem value={IncidentSeverity.HIGH} className="cursor-pointer hover:bg-gray-50">
      <div className="flex items-center gap-2">
        High
      </div>
    </SelectItem>
    <SelectItem value={IncidentSeverity.MEDIUM} className="cursor-pointer hover:bg-gray-50">
      <div className="flex items-center gap-2">
        Medium
      </div>
    </SelectItem>
    <SelectItem value={IncidentSeverity.LOW} className="cursor-pointer hover:bg-gray-50">
      <div className="flex items-center gap-2">
        Low
      </div>
    </SelectItem>
  </SelectContent>
</Select>
                  
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger className="w-40 cursor-pointer border-0 border-b-3 bg-amber-50 border-emerald-300 shadow-none px-0 focus:ring-0 focus:ring-offset-0">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-none shadow-md">
                      <SelectItem value="all" className="cursor-pointer hover:bg-gray-50">
                        All Status
                        </SelectItem>
                      <SelectItem value={IncidentStatus.PENDING} className="cursor-pointer hover:bg-gray-50">
                      Pending
                      </SelectItem>
                      <SelectItem value={IncidentStatus.UNDER_INVESTIGATION} className="cursor-pointer hover:bg-gray-50">
                      Under Processing
                      </SelectItem>
                      <SelectItem value={IncidentStatus.ASSIGNED} className="cursor-pointer hover:bg-gray-50">
                        Assigned
                        </SelectItem>
                      <SelectItem value={IncidentStatus.RESOLVED} className="cursor-pointer hover:bg-gray-50">
                        Solved
                        </SelectItem>
                      <SelectItem value={IncidentStatus.CLOSED} className="cursor-pointer hover:bg-gray-50">
                        Closed
                        </SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Button 
                    className="w-32 border-0 cursor-pointer border-b-3 bg-amber-50 border-emerald-300 shadow-none px-0 focus:ring-0 focus:ring-offset-0"
                    onClick={handleRefreshData}
                    disabled={isLoading}
                  >
                    <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                    Refresh
                  </Button>
                  
                  <Button 
                    className="w-32 cursor-pointer border-0 border-b-3 bg-amber-50 border-emerald-300 shadow-none px-0 focus:ring-0 focus:ring-offset-0"
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
          <Card className="shadow-2xl shadow-emerald-200 border-0 overflow-hidden bg-white">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="h-12.5 bg-white text-emerald-500 font-bold border-b-0 ">
                  <TableRow>
                    <TableHead className="w-32">Incident ID</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead className="w-24">Severity</TableHead>
                    <TableHead className="w-40">Status</TableHead>
                    <TableHead className="w-28">Days</TableHead>
                    <TableHead className="w-20">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="border-none">
                  {displayIncidents.map((incident) => {
                    const severityStyle = getSeverityStyle(incident.severity)
                    const statusStyle = getStatusStyle(incident.status)
                    
                    return (
                      <TableRow 
                        key={incident.id}
                        className={`hover:bg-amber-50 hover:translate-y transition-all duration-1000 hover:shadow-xs cursor-pointer border-none space-y ${
                          selectedIncident?.id === incident.id ? 'bg-blue-50' : 'bg-white'
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
                          <div 
                            className={` ${severityStyle.text} ${severityStyle.border} border-none`}
                          >
                            {incident.severity}
                          </div>
                        </TableCell>
                        
                        <TableCell>
                          <div 
                            // variant="outline"
                            className={` ${statusStyle.text} ${statusStyle.border} flex items-center gap-1`}
                          >
                            {statusStyle.icon}
                            {statusStyle.label}
                          </div>
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
            
            <CardFooter className="border-none py-2">
              <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-sm text-gray-500">
                  Showing {displayIncidents.length} of {incidentsData.length} incidents
                </div>
                
                <div className="flex items-center gap-3">
                  <Button
                    // variant="outline"
                    className="bg-emerald-500 text-white hover:bg-emerald-600 cursor-pointer"
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
        </div>
      </div>

      {/* Officer's Resolution Dashboard */}
<Card className="shadow-xl mt-4 shadow-emerald-50 border border-emerald-100 bg-gradient-to-br from-white to-emerald-50/50">
  <CardHeader className="pb-3 border-b border-emerald-100">
    <CardTitle className="flex items-center gap-2.5 text-emerald-700">
      <div className="p-2 bg-emerald-100 rounded-lg">
        <ClipboardCheck className="h-5 w-5 text-emerald-600" />
      </div>
      <div>
        <span className="text-xl font-bold">Officer Resolution Hub</span>
        <div className="flex items-center gap-2 mt-1">
          <Badge variant="outline" className="text-xs px-2 py-0.5 border-emerald-200 text-emerald-700">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5"></div>
            Active Dashboard
          </Badge>
          <span className="text-xs text-emerald-600 font-medium">
            {officers.length} officers • {incidentsData.filter(i => i.status === IncidentStatus.ASSIGNED).length} active incidents
          </span>
        </div>
      </div>
    </CardTitle>
    <CardDescription className="pt-2 text-gray-600">
      Assign incidents to officers and track resolution progress in real-time
    </CardDescription>
  </CardHeader>
  
  <CardContent className="pt-6">
    <Tabs 
      value={activeTab} 
      onValueChange={setActiveTab} 
      className="w-full"
    >
      <TabsList className="grid w-full grid-cols-2 bg-emerald-50 p-1.5 rounded-xl">
        <TabsTrigger 
          value="assign" 
          className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-emerald-200 rounded-lg"
        >
          <UserPlus className="h-4 w-4 mr-2" />
          Assign Incidents
          <Badge variant="secondary" className="ml-2 h-5 w-5 p-0 text-xs">
            {incidentsData.filter(i => i.status === IncidentStatus.PENDING || i.status === IncidentStatus.UNDER_INVESTIGATION).length}
          </Badge>
        </TabsTrigger>
        <TabsTrigger 
          value="resolve" 
          className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-emerald-200 rounded-lg"
        >
          <CheckCircle className="h-4 w-4 mr-2" />
          Resolve Incidents
          <Badge variant="secondary" className="ml-2 h-5 w-5 p-0 text-xs">
            {incidentsData.filter(i => i.status === IncidentStatus.ASSIGNED || i.status === IncidentStatus.UNDER_INVESTIGATION).length}
          </Badge>
        </TabsTrigger>
      </TabsList>
      
      {/* Assign Tab */}
      <TabsContent value="assign" className="space-y-6 mt-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-blue-700">Pending Assignments</span>
              <Clock className="h-4 w-4 text-blue-500" />
            </div>
            <div className="text-2xl font-bold text-blue-800 mt-1">
              {incidentsData.filter(i => i.status === IncidentStatus.PENDING).length}
            </div>
          </div>
          <div className="p-3 bg-amber-50 rounded-lg border border-amber-100">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-amber-700">Under Investigation</span>
              <Search className="h-4 w-4 text-amber-500" />
            </div>
            <div className="text-2xl font-bold text-amber-800 mt-1">
              {incidentsData.filter(i => i.status === IncidentStatus.UNDER_INVESTIGATION).length}
            </div>
          </div>
          <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-100">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-emerald-700">Available Officers</span>
              <Users className="h-4 w-4 text-emerald-500" />
            </div>
            <div className="text-2xl font-bold text-emerald-800 mt-1">
              {officers.filter(o => o.assignedIncidents < 3).length}
            </div>
          </div>
        </div>

        {/* Assignment Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column: Assignment Form */}
          <Card className="border border-gray-200 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Send className="h-4 w-4" />
                Assign Incident
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <Label htmlFor="incident-select" className="flex items-center gap-1.5 mb-1.5">
                    <AlertCircle className="h-3.5 w-3.5" />
                    Select Incident
                  </Label>
                  <Select
                    value={selectedIncident?.id || ''}
                    onValueChange={(value) => {
                      const incident = incidentsData.find(i => i.id === value)
                      if (incident) {
                        setSelectedIncident(incident)
                        // Auto-select an available officer
                        const availableOfficer = officers.find(o => o.assignedIncidents < 3)
                        if (availableOfficer) setSelectedOfficerId(availableOfficer.id)
                      }
                    }}
                  >
                    <SelectTrigger id="incident-select" className="w-full">
                      <SelectValue placeholder="Select an incident to assign" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-none shadow-md ">
                      <div className="p-2 border-b">
                        <Input placeholder="Search incidents..." className="h-8" />
                      </div>
                      {incidentsData
                        .filter(i => i.status === IncidentStatus.PENDING || i.status === IncidentStatus.UNDER_INVESTIGATION)
                        .map((incident) => (
                          <SelectItem key={incident.id} value={incident.id} className="py-3">
                            <div className="flex flex-col">
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className={`text-xs ${
                                  incident.severity === 'HIGH' ? 'border-red-200 text-red-700' :
                                  incident.severity === 'MEDIUM' ? 'border-amber-200 text-amber-700' :
                                  'border-blue-200 text-blue-700'
                                }`}>
                                  {incident.severity}
                                </Badge>
                                <span className="font-medium">{incident.id}</span>
                              </div>
                              <span className="text-sm text-gray-600 truncate">{incident.title}</span>
                              <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                                <span>{incident.category}</span>
                                <span>•</span>
                                <span>{new Date(incident.timestamp).toLocaleDateString()}</span>
                              </div>
                            </div>
                          </SelectItem>
                        ))
                      }
                    </SelectContent>
                  </Select>
                </div>
                
                {selectedIncident && (
                  <div className="p-3 bg-gray-50 rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Selected Incident</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedIncident(null)}
                        className="h-6 px-2"
                      >
                        Clear
                      </Button>
                    </div>
                    <div className="space-y-1.5">
                      <h4 className="font-semibold text-sm">{selectedIncident.title}</h4>
                      <p className="text-xs text-gray-600 line-clamp-2">{selectedIncident.description}</p>
                    </div>
                  </div>
                )}
                
                <div>
                  <Label htmlFor="officer-select" className="flex items-center gap-1.5 mb-1.5">
                    <User className="h-3.5 w-3.5" />
                    Assign to Officer
                  </Label>
                  <div className="flex gap-2">
                    <Select
                      value={selectedOfficerId}
                      onValueChange={setSelectedOfficerId}
                      disabled={assigningOfficer}
                    >
                      <SelectTrigger id="officer-select" className="flex-1">
                        <SelectValue placeholder="Select an officer">
                          {selectedOfficerId && (
                            <div className="flex items-center gap-2">
                              <div className={`w-2 h-2 rounded-full ${officers.find(o => o.id === selectedOfficerId)?.avatarColor}`} />
                              {officers.find(o => o.id === selectedOfficerId)?.name}
                            </div>
                          )}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <div className="p-2 border-b">
                          <div className="text-xs font-medium text-gray-500 mb-1">Officer Availability</div>
                          <div className="flex gap-2">
                            <div className="flex items-center gap-1">
                              <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                              <span className="text-xs">Available</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                              <span className="text-xs">Busy</span>
                            </div>
                          </div>
                        </div>
                        {officers.map((officer) => (
                          <SelectItem key={officer.id} value={officer.id}>
                            <div className="flex items-center justify-between w-full">
                              <div className="flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${officer.avatarColor} ${officer.assignedIncidents < 3 ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                                <div>
                                  <div className="font-medium">{officer.name}</div>
                                  <div className="text-xs text-gray-500">{officer.role}</div>
                                </div>
                              </div>
                              <Badge variant={officer.assignedIncidents < 3 ? "outline" : "secondary"} className="text-xs">
                                {officer.assignedIncidents} assigned
                              </Badge>
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
                      className="min-w-25 bg-emerald-600 hover:bg-emerald-700"
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
            </CardContent>
          </Card>

          {/* Right Column: Officer Grid */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-gray-700 flex items-center gap-2">
                <Users className="h-4 w-4" />
                Available Officers
                <span className="text-xs font-normal text-gray-500">
                  ({officers.filter(o => o.assignedIncidents < 3).length} available)
                </span>
              </h4>
              <Button variant="outline" size="sm" className="h-8 text-xs">
                <RefreshCw className="h-3 w-3 mr-1" />
                Refresh
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {officers.map((officer) => (
                <Card 
                  key={officer.id} 
                  className={`shadow-sm hover:shadow-md transition-shadow cursor-pointer border ${
                    selectedOfficerId === officer.id ? 'border-emerald-300 ring-1 ring-emerald-100' : 'border-gray-200'
                  }`}
                  onClick={() => {
                    setSelectedOfficerId(officer.id)
                    if (!selectedIncident) {
                      const assignableIncident = incidentsData.find(i => 
                        i.status === IncidentStatus.PENDING || i.status === IncidentStatus.UNDER_INVESTIGATION
                      )
                      if (assignableIncident) {
                        setSelectedIncident(assignableIncident)
                      }
                    }
                  }}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-11 h-11 rounded-full ${officer.avatarColor} flex items-center justify-center text-white font-bold shadow-sm`}>
                          {officer.name.charAt(0)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h5 className="font-semibold text-sm">{officer.name}</h5>
                            <div className={`w-2 h-2 rounded-full ${officer.assignedIncidents < 3 ? 'bg-emerald-500' : 'bg-amber-500'}`}></div>
                          </div>
                          <p className="text-xs text-gray-600">{officer.role}</p>
                          <div className="flex items-center gap-2 mt-1.5">
                            <Badge 
                              variant={officer.assignedIncidents < 3 ? "outline" : "secondary"} 
                              className="text-xs h-5"
                            >
                              <Briefcase className="h-2.5 w-2.5 mr-1" />
                              {officer.assignedIncidents} assigned
                            </Badge>
                            {officer.assignedIncidents === 0 && (
                              <Badge variant="outline" className="text-xs h-5 border-green-200 text-green-700">
                                Available
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <Button
                        variant={selectedOfficerId === officer.id ? "default" : "outline"}
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedOfficerId(officer.id)
                        }}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </TabsContent>
      
      {/* Resolve Tab */}
      <TabsContent value="resolve" className="space-y-6 mt-6">
        {/* Resolution Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
            <div className="text-xs font-medium text-blue-700">Assigned</div>
            <div className="text-2xl font-bold text-blue-800 mt-1">
              {incidentsData.filter(i => i.status === IncidentStatus.ASSIGNED).length}
            </div>
          </div>
          <div className="p-3 bg-purple-50 rounded-lg border border-purple-100">
            <div className="text-xs font-medium text-purple-700">Investigating</div>
            <div className="text-2xl font-bold text-purple-800 mt-1">
              {incidentsData.filter(i => i.status === IncidentStatus.UNDER_INVESTIGATION).length}
            </div>
          </div>
          <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-100">
            <div className="text-xs font-medium text-emerald-700">Resolved Today</div>
            <div className="text-2xl font-bold text-emerald-800 mt-1">
              {incidentsData.filter(i => i.status === IncidentStatus.RESOLVED && 
                new Date(i.timestamp).toDateString() === new Date().toDateString()).length}
            </div>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
            <div className="text-xs font-medium text-gray-700">Avg. Resolution Time</div>
            <div className="text-2xl font-bold text-gray-800 mt-1">4.2h</div>
          </div>
        </div>

        {/* Resolution Form */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Incident Selection */}
          <div className="lg:col-span-1">
            <Card className="border border-gray-200 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <List className="h-4 w-4" />
                  Select Incident to Resolve
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {incidentsData
                    .filter(i => i.status === IncidentStatus.ASSIGNED || i.status === IncidentStatus.UNDER_INVESTIGATION)
                    .map((incident) => (
                      <div
                        key={incident.id}
                        className={`p-3 rounded-lg border cursor-pointer transition-all hover:bg-gray-50 ${
                          selectedIncident?.id === incident.id 
                            ? 'bg-emerald-50 border-emerald-200' 
                            : 'border-gray-200'
                        }`}
                        onClick={() => setSelectedIncident(incident)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className={`text-xs ${
                                incident.severity === 'HIGH' ? 'border-red-200 text-red-700' :
                                incident.severity === 'MEDIUM' ? 'border-amber-200 text-amber-700' :
                                'border-blue-200 text-blue-700'
                              }`}>
                                {incident.severity}
                              </Badge>
                              <span className="font-medium text-sm">{incident.id}</span>
                            </div>
                            <h5 className="font-semibold text-sm">{incident.title}</h5>
                            <p className="text-xs text-gray-600 line-clamp-1">{incident.description}</p>
                          </div>
                          <ChevronRight className={`h-4 w-4 text-gray-400 ${
                            selectedIncident?.id === incident.id ? 'text-emerald-500' : ''
                          }`} />
                        </div>
                      </div>
                    ))
                  }
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Resolution Details */}
          <div className="lg:col-span-2">
            <Card className="border border-gray-200 shadow-sm h-full">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Resolution Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedIncident ? (
                  <div className="space-y-6">
                    {/* Incident Details */}
                    <div className="p-4 bg-gray-50 rounded-lg space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-semibold text-lg">{selectedIncident.title}</h5>
                          <p className="text-sm text-gray-600">ID: {selectedIncident.id}</p>
                        </div>
                        <Badge variant="outline" className="text-sm">
                          {selectedIncident.status}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-xs font-medium text-gray-500">Category</Label>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="secondary">{selectedIncident.category}</Badge>
                          </div>
                        </div>
                        <div>
                          <Label className="text-xs font-medium text-gray-500">Severity</Label>
                          <div className="mt-1">
                            <Badge 
                              variant="outline" 
                              className={`${
                                selectedIncident.severity === 'HIGH' ? 'border-red-200 text-red-700 bg-red-50' :
                                selectedIncident.severity === 'MEDIUM' ? 'border-amber-200 text-amber-700 bg-amber-50' :
                                'border-blue-200 text-blue-700 bg-blue-50'
                              }`}
                            >
                              {selectedIncident.severity}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <Label className="text-xs font-medium text-gray-500">Description</Label>
                        <p className="text-sm mt-1">{selectedIncident.description}</p>
                      </div>
                    </div>

                    {/* Resolution Form */}
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="resolution-notes" className="flex items-center gap-1.5 mb-1.5">
                          <FileText className="h-3.5 w-3.5" />
                          Resolution Notes *
                        </Label>
                        <Textarea
                          id="resolution-notes"
                          placeholder="Describe what actions were taken to resolve this incident. Include details about investigation steps, evidence collected, and final resolution..."
                          value={resolutionNotes}
                          onChange={(e) => setResolutionNotes(e.target.value)}
                          rows={5}
                          className="resize-none"
                        />
                        <div className="flex items-center justify-between mt-1">
                          <p className="text-xs text-gray-500">
                            Minimum 50 characters required
                          </p>
                          <span className={`text-xs ${
                            resolutionNotes.length < 50 ? 'text-red-500' : 'text-emerald-500'
                          }`}>
                            {resolutionNotes.length}/50
                          </span>
                        </div>
                      </div>

                      {/* Additional Actions */}
                      <div>
                        <Label className="text-xs font-medium text-gray-500 mb-2 block">
                          Additional Actions (Optional)
                        </Label>
                        <div className="flex flex-wrap gap-2">
                          <Button variant="outline" size="sm" className="gap-1.5">
                            <Upload className="h-3.5 w-3.5" />
                            Upload Evidence
                          </Button>
                          <Button variant="outline" size="sm" className="gap-1.5">
                            <Paperclip className="h-3.5 w-3.5" />
                            Attach Files
                          </Button>
                          <Button variant="outline" size="sm" className="gap-1.5">
                            <MessageSquare className="h-3.5 w-3.5" />
                            Add Comment
                          </Button>
                          <Button variant="outline" size="sm" className="gap-1.5">
                            <Tag className="h-3.5 w-3.5" />
                            Add Tags
                          </Button>
                        </div>
                      </div>

                      {/* Resolution Actions */}
                      <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
                        <Button
                          className="flex-1 bg-emerald-600 hover:bg-emerald-700 h-12"
                          onClick={() => handleResolveIncident(selectedIncident.id)}
                          disabled={!resolutionNotes.trim() || resolutionNotes.length < 50 || isLoading}
                          size="lg"
                        >
                          {isLoading ? (
                            <>
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                              Processing Resolution...
                            </>
                          ) : (
                            <>
                              <CheckCircle className="h-5 w-5 mr-2" />
                              Mark as Resolved
                            </>
                          )}
                        </Button>
                        
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            className="h-12"
                            onClick={() => {
                              setResolutionNotes('')
                              setSelectedIncident(null)
                            }}
                          >
                            <X className="h-4 w-4 mr-2" />
                            Cancel
                          </Button>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant="outline" className="h-12">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-48">
                              <div className="space-y-1">
                                <Button variant="ghost" className="w-full justify-start text-sm">
                                  <Clock className="h-3.5 w-3.5 mr-2" />
                                  Request Extension
                                </Button>
                                <Button variant="ghost" className="w-full justify-start text-sm">
                                  <UserMinus className="h-3.5 w-3.5 mr-2" />
                                  Reassign Incident
                                </Button>
                                <Button variant="ghost" className="w-full justify-start text-sm text-red-600">
                                  <AlertTriangle className="h-3.5 w-3.5 mr-2" />
                                  Escalate Incident
                                </Button>
                              </div>
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <AlertCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <h4 className="font-semibold text-gray-600 mb-2">No Incident Selected</h4>
                    <p className="text-sm text-gray-500 max-w-sm mx-auto">
                      Select an incident from the list to view details and mark it as resolved
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  </CardContent>
</Card>

      {/* Footer */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-none shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-600">System Status</div>
                <div className="text-2xl font-bold text-green-600 mt-1">All Systems Operational</div>
              </div>
              <div className="p-3 bg-linear-to-r from-green-100 to-emerald-100 rounded-full">
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
              <div className="p-3 bg-linear-to-r from-blue-100 to-blue-200 rounded-full">
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
              <div className="p-3 bg-linear-to-r from-amber-100 to-yellow-100 rounded-full">
                <Timer className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
     
    </div>
  )
}
