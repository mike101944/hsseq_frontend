"use client"

import React, { useState, useEffect, useMemo, useCallback } from 'react'
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
  Cloud,
  FileText,
  ClipboardCheck,
  MoreVertical,
  RefreshCw,
  Timer,
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
  UserPlus,
  Briefcase,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Smartphone,
  ChevronDown,
  List,
  Paperclip,
  Tag,
  X,
  UserMinus,
  Save,
  ExternalLink,
  Copy,
  DownloadCloud,
  Printer,
  Mail,
  Share2,
  Zap,
  Target,
  PieChart,
  BellRing,
  SearchX,
  AlertOctagon,
  FolderOpen,
  Archive,
  History,
  Star,
  Award,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  CheckCheck,
  AlertCircle as AlertCircleIcon,
  FilterX,
  Layers,
  Grid,
  Columns,
  EyeOff,
  Eye as EyeIcon,
  Lock,
  Unlock,
  FileCheck,
  FileWarning,
  ShieldAlert,
  ShieldOff,
  Battery,
  BatteryCharging,
  Signal,
  SignalHigh,
  SignalLow,
  SignalZero,
  Wifi,
  WifiOff,
  CloudOff,
  CloudRain,
  CloudSnow,
  CloudSun,
  Droplets,
  Thermometer,
  Wind,
  Sun,
  Moon,
  Sunrise,
  Sunset,
  CalendarDays,
  CalendarClock,
  CalendarRange,
  CalendarCheck,
  CalendarX,
  CalendarMinus,
  CalendarPlus,
  CalendarSearch
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
  DialogFooter,
  DialogClose,
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
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { MobileReportingDialog } from "./MobileReportingDialog"
import { IncidentReportDialog } from "./IncidentReportDialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Switch } from "@/components/ui/switch"
import { ScrollArea } from "@/components/ui/scroll-area"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"

// Constants
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
    updatedAt: '2024-06-15T11:45:00',
    attachments: ['photo1.jpg', 'report.pdf'],
    tags: ['safety', 'injury', 'warehouse'],
    followUpDate: '2024-06-20',
    cost: 500,
    riskLevel: 8,
    investigationDeadline: '2024-06-18',
    investigationProgress: 65
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
    updatedAt: '2024-06-14T15:30:00',
    attachments: ['spill_photo.jpg'],
    tags: ['chemical', 'spill', 'lab'],
    cost: 1200,
    riskLevel: 7,
    investigationDeadline: '2024-06-17',
    investigationProgress: 40
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
    updatedAt: '2024-06-13T10:00:00',
    tags: ['electrical', 'hazard', 'maintenance'],
    cost: 300,
    riskLevel: 5,
    investigationDeadline: '2024-06-19',
    investigationProgress: 0
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
    updatedAt: '2024-06-12T14:30:00',
    attachments: ['tool_rack.jpg', 'audit_report.pdf'],
    tags: ['near-miss', 'safety', 'production'],
    riskLevel: 3,
    investigationDeadline: '2024-06-12',
    investigationProgress: 100
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
    updatedAt: '2024-06-11T09:30:00',
    tags: ['drill', 'fire', 'safety'],
    riskLevel: 1,
    investigationDeadline: '2024-06-11',
    investigationProgress: 100
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
    avatarColor: 'bg-blue-500',
    isActive: true,
    capacity: 5,
    expertise: ['Injury', 'Electrical', 'Chemical'],
    performance: 92,
    lastActive: '10 minutes ago'
  },
  { 
    id: 'officer-2', 
    name: 'Sarah Chen', 
    email: 'sarah@safety.com', 
    role: 'Safety Investigator', 
    assignedIncidents: 2,
    phone: '+255 713 456 789',
    department: 'Investigation',
    avatarColor: 'bg-green-500',
    isActive: true,
    capacity: 4,
    expertise: ['Investigation', 'Documentation', 'Analysis'],
    performance: 88,
    lastActive: '15 minutes ago'
  },
  { 
    id: 'officer-3', 
    name: 'Mike Wilson', 
    email: 'mike@safety.com', 
    role: 'Safety Supervisor', 
    assignedIncidents: 1,
    phone: '+255 714 567 890',
    department: 'Supervision',
    avatarColor: 'bg-purple-500',
    isActive: false,
    capacity: 3,
    expertise: ['Supervision', 'Training', 'Compliance'],
    performance: 85,
    lastActive: '2 hours ago'
  },
  { 
    id: 'officer-4', 
    name: 'Emma Davis', 
    email: 'emma@safety.com', 
    role: 'Safety Analyst', 
    assignedIncidents: 0,
    phone: '+255 715 678 901',
    department: 'Analytics',
    avatarColor: 'bg-amber-500',
    isActive: true,
    capacity: 6,
    expertise: ['Data Analysis', 'Reporting', 'Risk Assessment'],
    performance: 95,
    lastActive: 'Just now'
  }
]

// Categories for filtering
const incidentCategories = [
  'All',
  'Slip/Trip',
  'Chemical',
  'Electrical',
  'Fire Safety',
  'Fall Protection',
  'Equipment',
  'Environmental',
  'Security',
  'Health'
]

export const Incidents = () => {
  // State
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSeverity, setSelectedSeverity] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedIncident, setSelectedIncident] = useState(incidentsData[0])
  const [assigningOfficer, setAssigningOfficer] = useState(false)
  const [resolutionNotes, setResolutionNotes] = useState('')
  const [selectedOfficerId, setSelectedOfficerId] = useState('')
  const [viewMode, setViewMode] = useState('list')
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')
  const [incidents, setIncidents] = useState(incidentsData)
  const [officersList, setOfficersList] = useState(officers)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [incidentToDelete, setIncidentToDelete] = useState(null)
  const [editMode, setEditMode] = useState(false)
  const [editedIncident, setEditedIncident] = useState(null)
  const [showBulkActions, setShowBulkActions] = useState(false)
  const [selectedIncidents, setSelectedIncidents] = useState(new Set())
  const [autoRefresh, setAutoRefresh] = useState(false)
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
  const [dateRange, setDateRange] = useState({ start: '', end: '' })
  const [sortBy, setSortBy] = useState('date')
  const [sortOrder, setSortOrder] = useState('desc')
  const [showIncidentDetails, setShowIncidentDetails] = useState(false)

  // Load data on mount
  useEffect(() => {
    loadIncidents()
  }, [])

  // Auto-refresh functionality
  useEffect(() => {
    let interval
    if (autoRefresh) {
      interval = setInterval(() => {
        loadIncidents()
        showToast('Data refreshed automatically', 'info')
      }, 30000)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [autoRefresh])

  // Toast notification helper
  const showToast = (message, type = 'success') => {
    const toastConfig = {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    }

    switch(type) {
      case 'success':
        toast.success(message, toastConfig)
        break
      case 'error':
        toast.error(message, toastConfig)
        break
      case 'warning':
        toast.warning(message, toastConfig)
        break
      case 'info':
        toast.info(message, toastConfig)
        break
      default:
        toast(message, toastConfig)
    }
  }

  const loadIncidents = async () => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300))
      // In real app, fetch from API
      setIncidents([...incidentsData])
      showToast('Incidents loaded successfully')
    } catch (error) {
      showToast('Failed to load incidents', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  // Filter incidents
  const filteredIncidents = useMemo(() => {
    let filtered = [...incidents]
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(incident => 
        incident.title.toLowerCase().includes(query) ||
        incident.id.toLowerCase().includes(query) ||
        incident.location.toLowerCase().includes(query) ||
        incident.reportedBy.toLowerCase().includes(query) ||
        incident.description.toLowerCase().includes(query) ||
        incident.tags?.some(tag => tag.toLowerCase().includes(query))
      )
    }
    
    // Apply severity filter
    if (selectedSeverity !== 'all') {
      filtered = filtered.filter(incident => incident.severity === selectedSeverity)
    }
    
    // Apply status filter
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(incident => incident.status === selectedStatus)
    }
    
    // Apply category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(incident => incident.category === selectedCategory)
    }
    
    // Apply date range filter
    if (dateRange.start && dateRange.end) {
      filtered = filtered.filter(incident => {
        const incidentDate = new Date(incident.date)
        const startDate = new Date(dateRange.start)
        const endDate = new Date(dateRange.end)
        return incidentDate >= startDate && incidentDate <= endDate
      })
    }
    
    // Apply sorting
    filtered.sort((a, b) => {
      let aValue, bValue
      
      switch(sortBy) {
        case 'date':
          aValue = new Date(a.date)
          bValue = new Date(b.date)
          break
        case 'severity':
          const severityOrder = { 'Critical': 4, 'High': 3, 'Medium': 2, 'Low': 1 }
          aValue = severityOrder[a.severity] || 0
          bValue = severityOrder[b.severity] || 0
          break
        case 'daysOpen':
          aValue = a.daysOpen
          bValue = b.daysOpen
          break
        case 'riskLevel':
          aValue = a.riskLevel || 0
          bValue = b.riskLevel || 0
          break
        default:
          aValue = a.id
          bValue = b.id
      }
      
      if (sortOrder === 'desc') {
        return bValue - aValue
      } else {
        return aValue - bValue
      }
    })
    
    return filtered
  }, [incidents, searchQuery, selectedSeverity, selectedStatus, selectedCategory, dateRange, sortBy, sortOrder])

  // Calculate statistics
  const stats = useMemo(() => {
    const total = incidents.length
    const pending = incidents.filter(i => i.status === IncidentStatus.PENDING).length
    const investigating = incidents.filter(i => i.status === IncidentStatus.UNDER_INVESTIGATION).length
    const assigned = incidents.filter(i => i.status === IncidentStatus.ASSIGNED).length
    const resolved = incidents.filter(i => i.status === IncidentStatus.RESOLVED).length
    const closed = incidents.filter(i => i.status === IncidentStatus.CLOSED).length
    
    const critical = incidents.filter(i => i.severity === IncidentSeverity.CRITICAL).length
    const high = incidents.filter(i => i.severity === IncidentSeverity.HIGH).length
    const medium = incidents.filter(i => i.severity === IncidentSeverity.MEDIUM).length
    const low = incidents.filter(i => i.severity === IncidentSeverity.LOW).length
    
    // Calculate average response time
    const totalResponseMinutes = incidents.reduce((sum, incident) => {
      const minutes = parseInt(incident.responseTime) || 0
      return sum + minutes
    }, 0)
    const avgResponseTime = incidents.length > 0 
      ? `${Math.round(totalResponseMinutes / incidents.length)}m`
      : '0m'
    
    const resolutionRate = total > 0 
      ? ((resolved + closed) / total * 100).toFixed(1) + '%'
      : '0%'
    
    const safetyScore = 92.5

    return {
      total,
      pending,
      investigating,
      assigned,
      resolved,
      closed,
      critical,
      high,
      medium,
      low,
      avgResponseTime,
      resolutionRate,
      safetyScore
    }
  }, [incidents])

  // Get severity badge style
  const getSeverityStyle = (severity) => {
    switch (severity) {
      case IncidentSeverity.CRITICAL:
        return {
          bg: 'bg-red-50',
          text: 'text-red-700',
          border: 'border-red-200',
          icon: 'bg-red-100 text-red-600',
          iconColor: 'text-red-500'
        }
      case IncidentSeverity.HIGH:
        return {
          bg: 'bg-orange-50',
          text: 'text-orange-700',
          border: 'border-orange-200',
          icon: 'bg-orange-100 text-orange-600',
          iconColor: 'text-orange-500'
        }
      case IncidentSeverity.MEDIUM:
        return {
          bg: 'bg-yellow-50',
          text: 'text-yellow-700',
          border: 'border-yellow-200',
          icon: 'bg-yellow-100 text-yellow-600',
          iconColor: 'text-yellow-500'
        }
      case IncidentSeverity.LOW:
        return {
          bg: 'bg-blue-50',
          text: 'text-blue-700',
          border: 'border-blue-200',
          icon: 'bg-blue-100 text-blue-600',
          iconColor: 'text-blue-500'
        }
      default:
        return {
          bg: 'bg-gray-50',
          text: 'text-gray-700',
          border: 'border-gray-200',
          icon: 'bg-gray-100 text-gray-600',
          iconColor: 'text-gray-500'
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
          icon: <Clock className="h-3 w-3" />,
          progressColor: 'bg-yellow-500'
        }
      case IncidentStatus.UNDER_INVESTIGATION:
        return {
          bg: 'bg-purple-50',
          text: 'text-purple-700',
          border: 'border-purple-200',
          label: 'Under Processing',
          icon: <Activity className="h-3 w-3" />,
          progressColor: 'bg-purple-500'
        }
      case IncidentStatus.ASSIGNED:
        return {
          bg: 'bg-blue-50',
          text: 'text-blue-700',
          border: 'border-blue-200',
          label: 'Assigned',
          icon: <User className="h-3 w-3" />,
          progressColor: 'bg-blue-500'
        }
      case IncidentStatus.RESOLVED:
        return {
          bg: 'bg-green-50',
          text: 'text-green-700',
          border: 'border-green-200',
          label: 'Solved',
          icon: <CheckCircle className="h-3 w-3" />,
          progressColor: 'bg-green-500'
        }
      case IncidentStatus.CLOSED:
        return {
          bg: 'bg-emerald-50',
          text: 'text-emerald-700',
          border: 'border-emerald-200',
          label: 'Closed',
          icon: <CheckSquare className="h-3 w-3" />,
          progressColor: 'bg-emerald-500'
        }
      default:
        return {
          bg: 'bg-gray-50',
          text: 'text-gray-700',
          border: 'border-gray-200',
          label: status,
          icon: <AlertCircle className="h-3 w-3" />,
          progressColor: 'bg-gray-500'
        }
    }
  }

  // Handle assign incident
  const handleAssignIncident = async (incidentId, officerId) => {
    const officer = officersList.find(o => o.id === officerId)
    if (!officer) {
      showToast('Officer not found', 'error')
      return
    }

    if (officer.assignedIncidents >= officer.capacity) {
      showToast('Officer has reached capacity', 'warning')
      return
    }

    setAssigningOfficer(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Update incidents
      setIncidents(prev => prev.map(inc => 
        inc.id === incidentId 
          ? { 
              ...inc, 
              assignedOfficer: officer.name,
              status: IncidentStatus.ASSIGNED,
              assignedTo: officer.role,
              updatedAt: new Date().toISOString()
            }
          : inc
      ))
      
      // Update officers
      setOfficersList(prev => prev.map(off => 
        off.id === officerId
          ? { ...off, assignedIncidents: off.assignedIncidents + 1 }
          : off
      ))
      
      // Update selected incident
      setSelectedIncident(prev => ({
        ...prev,
        assignedOfficer: officer.name,
        status: IncidentStatus.ASSIGNED,
        assignedTo: officer.role
      }))
      
      showToast(`Incident assigned to ${officer.name}`)
      setSelectedOfficerId('')
    } catch (error) {
      showToast('Failed to assign incident', 'error')
    } finally {
      setAssigningOfficer(false)
    }
  }

  // Handle resolve incident
  const handleResolveIncident = async (incidentId) => {
    if (!resolutionNotes.trim() || resolutionNotes.length < 50) {
      showToast('Please add resolution notes (minimum 50 characters)', 'error')
      return
    }

    setIsLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Update incidents
      setIncidents(prev => prev.map(inc => 
        inc.id === incidentId 
          ? { 
              ...inc, 
              status: IncidentStatus.RESOLVED,
              resolutionNotes: resolutionNotes,
              resolvedBy: 'Current User',
              resolvedAt: new Date().toISOString(),
              daysOpen: 0,
              updatedAt: new Date().toISOString()
            }
          : inc
      ))
      
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
      showToast('Incident marked as resolved successfully!')
    } catch (error) {
      showToast('Failed to resolve incident', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  // Handle export incidents
  const handleExportIncidents = async (format = 'excel') => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Simulate download
      const link = document.createElement('a')
      link.href = '#'
      link.download = `incidents_${new Date().toISOString().split('T')[0]}.${format}`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      showToast(`Incidents exported as ${format.toUpperCase()}`)
    } catch (error) {
      showToast('Export failed', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  // Handle delete incident
  const handleDeleteIncident = async (incidentId) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Remove incident
      setIncidents(prev => prev.filter(inc => inc.id !== incidentId))
      setShowDeleteDialog(false)
      setIncidentToDelete(null)
      
      // Reset selected incident if it was deleted
      if (selectedIncident && selectedIncident.id === incidentId) {
        setSelectedIncident(incidents[0] || null)
      }
      
      showToast('Incident deleted successfully')
    } catch (error) {
      showToast('Failed to delete incident', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  // Handle bulk actions
  const handleBulkAction = async (action) => {
    if (selectedIncidents.size === 0) {
      showToast('No incidents selected', 'warning')
      return
    }

    setIsLoading(true)
    try {
      switch (action) {
        case 'assign':
          // Find available officer
          const availableOfficer = officersList.find(o => o.isActive && o.assignedIncidents < o.capacity)
          if (!availableOfficer) {
            showToast('No available officers', 'error')
            break
          }
          
          // Update incidents
          setIncidents(prev => prev.map(inc => 
            selectedIncidents.has(inc.id)
              ? { 
                  ...inc, 
                  assignedOfficer: availableOfficer.name,
                  status: IncidentStatus.ASSIGNED,
                  assignedTo: availableOfficer.role,
                  updatedAt: new Date().toISOString()
                }
              : inc
          ))
          
          // Update officer
          setOfficersList(prev => prev.map(off => 
            off.id === availableOfficer.id
              ? { ...off, assignedIncidents: off.assignedIncidents + selectedIncidents.size }
              : off
          ))
          
          showToast(`Assigned ${selectedIncidents.size} incidents to ${availableOfficer.name}`)
          setSelectedIncidents(new Set())
          break

        case 'export':
          await handleExportIncidents('excel')
          break

        case 'delete':
          // Remove selected incidents
          setIncidents(prev => prev.filter(inc => !selectedIncidents.has(inc.id)))
          setSelectedIncidents(new Set())
          showToast(`Deleted ${selectedIncidents.size} incidents`)
          break
          
        case 'resolve':
          // Mark selected incidents as resolved
          setIncidents(prev => prev.map(inc => 
            selectedIncidents.has(inc.id)
              ? { 
                  ...inc, 
                  status: IncidentStatus.RESOLVED,
                  resolvedBy: 'Current User',
                  resolvedAt: new Date().toISOString(),
                  daysOpen: 0,
                  updatedAt: new Date().toISOString()
                }
              : inc
          ))
          setSelectedIncidents(new Set())
          showToast(`Resolved ${selectedIncidents.size} incidents`)
          break
      }
    } catch (error) {
      showToast(`Bulk ${action} failed`, 'error')
    } finally {
      setIsLoading(false)
    }
  }

  // Toggle incident selection
  const toggleIncidentSelection = (incidentId) => {
    const newSelection = new Set(selectedIncidents)
    if (newSelection.has(incidentId)) {
      newSelection.delete(incidentId)
    } else {
      newSelection.add(incidentId)
    }
    setSelectedIncidents(newSelection)
  }

  // Select all incidents
  const selectAllIncidents = () => {
    if (selectedIncidents.size === filteredIncidents.length) {
      setSelectedIncidents(new Set())
    } else {
      setSelectedIncidents(new Set(filteredIncidents.map(inc => inc.id)))
    }
  }

  // Update incident
  const handleUpdateIncident = async () => {
    if (!editedIncident || !selectedIncident) return

    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Update incidents
      setIncidents(prev => prev.map(inc => 
        inc.id === selectedIncident.id 
          ? { ...inc, ...editedIncident, updatedAt: new Date().toISOString() }
          : inc
      ))
      
      // Update selected incident
      setSelectedIncident({ ...selectedIncident, ...editedIncident })
      setEditMode(false)
      setEditedIncident(null)
      showToast('Incident updated successfully')
    } catch (error) {
      showToast('Failed to update incident', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  // Copy incident ID to clipboard
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    showToast('Copied to clipboard')
  }

  // Quick status update
  const quickStatusUpdate = (incidentId, newStatus) => {
    setIncidents(prev => prev.map(inc => 
      inc.id === incidentId 
        ? { ...inc, status: newStatus, updatedAt: new Date().toISOString() }
        : inc
    ))
    
    // Update selected incident if needed
    if (selectedIncident && selectedIncident.id === incidentId) {
      setSelectedIncident(prev => ({ ...prev, status: newStatus }))
    }
    
    const statusLabel = getStatusStyle(newStatus).label
    showToast(`Status updated to ${statusLabel}`)
  }

  // Toggle auto-refresh
  const toggleAutoRefresh = () => {
    setAutoRefresh(!autoRefresh)
    showToast(`Auto-refresh ${!autoRefresh ? 'enabled' : 'disabled'}`)
  }

  // Clear all filters
  const clearAllFilters = () => {
    setSearchQuery('')
    setSelectedSeverity('all')
    setSelectedStatus('all')
    setSelectedCategory('all')
    setDateRange({ start: '', end: '' })
    setSortBy('date')
    setSortOrder('desc')
    showToast('Filters cleared')
  }

  // Get officer by ID
  const getOfficerById = (id) => {
    return officersList.find(o => o.id === id)
  }

  // Calculate incident statistics
  const calculateStats = () => {
    return {
      pending: incidents.filter(i => i.status === IncidentStatus.PENDING).length,
      investigating: incidents.filter(i => i.status === IncidentStatus.UNDER_INVESTIGATION).length,
      assigned: incidents.filter(i => i.status === IncidentStatus.ASSIGNED).length,
      resolved: incidents.filter(i => i.status === IncidentStatus.RESOLVED).length,
      closed: incidents.filter(i => i.status === IncidentStatus.CLOSED).length,
      total: incidents.length
    }
  }

  const statusCounts = calculateStats()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50/20 p-4 md:p-6 space-y-6">
      <ToastContainer position="top-right" autoClose={3000} />
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white rounded-lg shadow-sm border border-emerald-100">
              <Shield className="h-6 w-6 text-emerald-600" />
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

      {/* Quick Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
        <div className="bg-white p-3 rounded-lg border border-emerald-100 shadow-sm">
          <div className="text-xs text-gray-500">Total</div>
          <div className="text-lg font-bold text-gray-900">{stats.total}</div>
        </div>
        <div className="bg-white p-3 rounded-lg border border-red-100 shadow-sm">
          <div className="text-xs text-gray-500">Critical</div>
          <div className="text-lg font-bold text-red-600">{stats.critical}</div>
        </div>
        <div className="bg-white p-3 rounded-lg border border-orange-100 shadow-sm">
          <div className="text-xs text-gray-500">High</div>
          <div className="text-lg font-bold text-orange-600">{stats.high}</div>
        </div>
        <div className="bg-white p-3 rounded-lg border border-yellow-100 shadow-sm">
          <div className="text-xs text-gray-500">Medium</div>
          <div className="text-lg font-bold text-yellow-600">{stats.medium}</div>
        </div>
        <div className="bg-white p-3 rounded-lg border border-blue-100 shadow-sm">
          <div className="text-xs text-gray-500">Low</div>
          <div className="text-lg font-bold text-blue-600">{stats.low}</div>
        </div>
        <div className="bg-white p-3 rounded-lg border border-emerald-100 shadow-sm">
          <div className="text-xs text-gray-500">Resolved</div>
          <div className="text-lg font-bold text-emerald-600">{stats.resolved + stats.closed}</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Incidents Table */}
        <div className="lg:col-span-2 space-y-6">
          {/* Search and Filters */}
          <Card className="border-0 bg-white shadow-lg shadow-emerald-50">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search incidents by ID, title, location, or description..."
                      className="pl-9 w-full"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                      className="gap-2"
                    >
                      <Filter className="h-4 w-4" />
                      {showAdvancedFilters ? 'Hide Filters' : 'More Filters'}
                    </Button>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="gap-2">
                          <Columns className="h-4 w-4" />
                          View
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => setViewMode('list')}>
                          <List className="h-4 w-4 mr-2" />
                          List View
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setViewMode('grid')}>
                          <Grid className="h-4 w-4 mr-2" />
                          Grid View
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                
                {/* Advanced Filters */}
                {showAdvancedFilters && (
                  <div className="p-4 bg-gray-50 rounded-lg space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-sm">Advanced Filters</h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearAllFilters}
                        className="h-7 text-xs"
                      >
                        <FilterX className="h-3 w-3 mr-1" />
                        Clear All
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label className="text-xs font-medium mb-1 block">Date Range</Label>
                        <div className="flex gap-2">
                          <Input
                            type="date"
                            value={dateRange.start}
                            onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                            className="h-8 text-xs"
                          />
                          <Input
                            type="date"
                            value={dateRange.end}
                            onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                            className="h-8 text-xs"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label className="text-xs font-medium mb-1 block">Sort By</Label>
                        <Select value={sortBy} onValueChange={setSortBy}>
                          <SelectTrigger className="h-8 text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="date">Date</SelectItem>
                            <SelectItem value="severity">Severity</SelectItem>
                            <SelectItem value="daysOpen">Days Open</SelectItem>
                            <SelectItem value="riskLevel">Risk Level</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label className="text-xs font-medium mb-1 block">Sort Order</Label>
                        <div className="flex gap-2">
                          <Button
                            variant={sortOrder === 'desc' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setSortOrder('desc')}
                            className="h-8 text-xs flex-1"
                          >
                            <TrendingDownIcon className="h-3 w-3 mr-1" />
                            Desc
                          </Button>
                          <Button
                            variant={sortOrder === 'asc' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setSortOrder('asc')}
                            className="h-8 text-xs flex-1"
                          >
                            <TrendingUpIcon className="h-3 w-3 mr-1" />
                            Asc
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Quick Filters */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Label className="text-sm font-medium">Categories:</Label>
                    <div className="flex flex-wrap gap-1">
                      {incidentCategories.slice(0, 5).map(category => (
                        <Badge
                          key={category}
                          variant={selectedCategory === category ? "default" : "outline"}
                          className="cursor-pointer hover:bg-gray-50"
                          onClick={() => setSelectedCategory(category)}
                        >
                          {category}
                        </Badge>
                      ))}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Badge variant="outline" className="cursor-pointer hover:bg-gray-50">
                            More <ChevronDown className="h-3 w-3 ml-1" />
                          </Badge>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          {incidentCategories.slice(5).map(category => (
                            <DropdownMenuItem
                              key={category}
                              onClick={() => setSelectedCategory(category)}
                            >
                              {category}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Label className="text-sm font-medium">Auto-refresh:</Label>
                    <Switch
                      checked={autoRefresh}
                      onCheckedChange={toggleAutoRefresh}
                    />
                    <span className="text-xs text-gray-500">
                      {autoRefresh ? 'On (30s)' : 'Off'}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bulk Actions Bar */}
          {selectedIncidents.size > 0 && (
            <Card className="border-0 bg-blue-50 border-l-4 border-blue-500">
              <CardContent className="p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CheckSquare className="h-5 w-5 text-blue-600" />
                    <span className="font-medium">
                      {selectedIncidents.size} incident(s) selected
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedIncidents(new Set())}
                      className="h-7 text-xs"
                    >
                      Clear
                    </Button>
                  </div>
                  
                  <div className="flex gap-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="sm" variant="outline" className="gap-1">
                          <MoreVertical className="h-4 w-4" />
                          Actions
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => handleBulkAction('assign')}>
                          <UserPlus className="h-4 w-4 mr-2" />
                          Assign Selected
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleBulkAction('resolve')}>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Mark as Resolved
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleBulkAction('export')}>
                          <Download className="h-4 w-4 mr-2" />
                          Export Selected
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          onClick={() => handleBulkAction('delete')}
                          className="text-red-600"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete Selected
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Incidents Table */}
          <Card className="shadow-xl shadow-emerald-200 border-0 overflow-hidden bg-white">
            <CardHeader className="pb-3 border-b">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">
                    {viewMode === 'list' ? 'Active Incidents' : 'All Incidents'}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {filteredIncidents.length} incidents found
                  </p>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={loadIncidents}
                    disabled={isLoading}
                    className="gap-1"
                  >
                    <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                    Refresh
                  </Button>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="gap-1">
                        <Download className="h-4 w-4" />
                        Export
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => handleExportIncidents('excel')}>
                        <FileSpreadsheet className="h-4 w-4 mr-2" />
                        Excel (.xlsx)
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleExportIncidents('csv')}>
                        <FileText className="h-4 w-4 mr-2" />
                        CSV (.csv)
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleExportIncidents('pdf')}>
                        <FileText className="h-4 w-4 mr-2" />
                        PDF (.pdf)
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardHeader>
            
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-gray-50">
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox
                        checked={selectedIncidents.size === filteredIncidents.length && filteredIncidents.length > 0}
                        onCheckedChange={selectAllIncidents}
                      />
                    </TableHead>
                    <TableHead className="w-32">Incident ID</TableHead>
                    <TableHead>Title & Description</TableHead>
                    <TableHead className="w-24">Severity</TableHead>
                    <TableHead className="w-40">Status</TableHead>
                    <TableHead className="w-28">Days Open</TableHead>
                    <TableHead className="w-24">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredIncidents.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-12">
                        <SearchX className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                        <h4 className="font-semibold text-gray-600 mb-2">No incidents found</h4>
                        <p className="text-sm text-gray-500">
                          Try adjusting your search or filters
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={clearAllFilters}
                          className="mt-4"
                        >
                          Clear All Filters
                        </Button>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredIncidents.map((incident) => {
                      const severityStyle = getSeverityStyle(incident.severity)
                      const statusStyle = getStatusStyle(incident.status)
                      
                      return (
                        <TableRow 
                          key={incident.id}
                          className={`hover:bg-gray-50 cursor-pointer ${
                            selectedIncident?.id === incident.id ? 'bg-blue-50' : ''
                          }`}
                          onClick={() => {
                            setSelectedIncident(incident)
                            setShowIncidentDetails(true)
                          }}
                        >
                          <TableCell>
                            <Checkbox
                              checked={selectedIncidents.has(incident.id)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  toggleIncidentSelection(incident.id)
                                } else {
                                  toggleIncidentSelection(incident.id)
                                }
                              }}
                              onClick={(e) => e.stopPropagation()}
                            />
                          </TableCell>
                          
                          <TableCell>
                            <div className="font-medium text-gray-900">{incident.id}</div>
                            <div className="text-xs text-gray-500">{incident.date}</div>
                            <div className="flex items-center gap-1 mt-1">
                              <Badge variant="outline" className="text-xs">
                                {incident.category}
                              </Badge>
                            </div>
                          </TableCell>
                          
                          <TableCell>
                            <div className="font-medium text-gray-900">{incident.title}</div>
                            <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                              <MapPin className="h-3 w-3" />
                              {incident.location}
                            </div>
                            <div className="text-xs text-gray-600 mt-1 line-clamp-1">
                              {incident.description}
                            </div>
                            {incident.tags && incident.tags.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-2">
                                {incident.tags.slice(0, 2).map(tag => (
                                  <Badge key={tag} variant="secondary" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                                {incident.tags.length > 2 && (
                                  <span className="text-xs text-gray-500">
                                    +{incident.tags.length - 2} more
                                  </span>
                                )}
                              </div>
                            )}
                          </TableCell>
                          
                          <TableCell>
                            <Badge 
                              className={`${severityStyle.bg} ${severityStyle.text} ${severityStyle.border} border-none flex items-center gap-1`}
                            >
                              <div className={`w-2 h-2 rounded-full ${severityStyle.icon}`}></div>
                              {incident.severity}
                            </Badge>
                            {incident.riskLevel && (
                              <div className="text-xs text-gray-500 mt-1">
                                Risk: {incident.riskLevel}/10
                              </div>
                            )}
                          </TableCell>
                          
                          <TableCell>
                            <div className="space-y-2">
                              <Badge 
                                className={`${statusStyle.bg} ${statusStyle.text} ${statusStyle.border} border-none flex items-center gap-1`}
                              >
                                {statusStyle.icon}
                                {statusStyle.label}
                              </Badge>
                              
                              {incident.assignedOfficer && (
                                <div className="text-xs text-gray-600">
                                  {incident.assignedOfficer}
                                </div>
                              )}
                              
                              {incident.investigationProgress > 0 && (
                                <div className="space-y-1">
                                  <Progress 
                                    value={incident.investigationProgress} 
                                    className="h-1.5"
                                  />
                                  <div className="text-xs text-gray-500">
                                    {incident.investigationProgress}% complete
                                  </div>
                                </div>
                              )}
                            </div>
                          </TableCell>
                          
                          <TableCell>
                            <div className="space-y-1">
                              <div className="font-medium">{incident.daysOpen}d</div>
                              <div className="text-xs text-gray-500">{incident.time}</div>
                              {incident.responseTime && (
                                <div className="text-xs text-blue-600">
                                  Response: {incident.responseTime}
                                </div>
                              )}
                            </div>
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
                                        setShowIncidentDetails(true)
                                      }}
                                    >
                                      <Eye className="h-4 w-4" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>View Details</TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                              
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                  <DropdownMenuItem
                                    onClick={() => {
                                      setSelectedIncident(incident)
                                      setShowIncidentDetails(true)
                                    }}
                                  >
                                    <Eye className="h-4 w-4 mr-2" />
                                    View Details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => {
                                      setSelectedIncident(incident)
                                      setEditMode(true)
                                      setEditedIncident({ ...incident })
                                    }}
                                  >
                                    <Edit className="h-4 w-4 mr-2" />
                                    Edit Incident
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  
                                  <DropdownMenuLabel>Quick Status</DropdownMenuLabel>
                                  <DropdownMenuItem
                                    onClick={() => quickStatusUpdate(incident.id, IncidentStatus.ASSIGNED)}
                                  >
                                    <User className="h-4 w-4 mr-2" />
                                    Mark as Assigned
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => quickStatusUpdate(incident.id, IncidentStatus.RESOLVED)}
                                  >
                                    <CheckCircle className="h-4 w-4 mr-2" />
                                    Mark as Resolved
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => quickStatusUpdate(incident.id, IncidentStatus.CLOSED)}
                                  >
                                    <CheckSquare className="h-4 w-4 mr-2" />
                                    Mark as Closed
                                  </DropdownMenuItem>
                                  
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem
                                    onClick={() => copyToClipboard(incident.id)}
                                  >
                                    <Copy className="h-4 w-4 mr-2" />
                                    Copy ID
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem
                                    onClick={() => {
                                      setIncidentToDelete(incident.id)
                                      setShowDeleteDialog(true)
                                    }}
                                    className="text-red-600"
                                  >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete Incident
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </TableCell>
                        </TableRow>
                      )
                    })
                  )}
                </TableBody>
              </Table>
            </div>
            
            <CardFooter className="border-t py-3">
              <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-sm text-gray-500">
                  Showing {filteredIncidents.length} of {incidents.length} incidents
                  {selectedIncidents.size > 0 && (
                    <span className="ml-2 text-blue-600">
                      ({selectedIncidents.size} selected)
                    </span>
                  )}
                </div>
                
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setViewMode(viewMode === 'list' ? 'grid' : 'list')}
                    className="gap-2"
                  >
                    {viewMode === 'list' ? (
                      <>
                        <Grid className="h-4 w-4" />
                        Grid View
                      </>
                    ) : (
                      <>
                        <List className="h-4 w-4" />
                        List View
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardFooter>
          </Card>
        </div>

        {/* Right Column - Details Panel */}
        <div className="space-y-6">
          {/* Incident Details Panel */}
          <Card className="shadow-lg border-0 bg-white">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Incident Details</CardTitle>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => copyToClipboard(selectedIncident?.id || '')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setEditMode(!editMode)}
                  >
                    {editMode ? <Save className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {selectedIncident ? (
                <div className="space-y-4">
                  {editMode ? (
                    <div className="space-y-4">
                      <div>
                        <Label>Title</Label>
                        <Input
                          value={editedIncident?.title || selectedIncident.title}
                          onChange={(e) => setEditedIncident(prev => ({ ...prev, title: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label>Description</Label>
                        <Textarea
                          value={editedIncident?.description || selectedIncident.description}
                          onChange={(e) => setEditedIncident(prev => ({ ...prev, description: e.target.value }))}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Severity</Label>
                          <Select
                            value={editedIncident?.severity || selectedIncident.severity}
                            onValueChange={(value) => setEditedIncident(prev => ({ ...prev, severity: value }))}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Critical">Critical</SelectItem>
                              <SelectItem value="High">High</SelectItem>
                              <SelectItem value="Medium">Medium</SelectItem>
                              <SelectItem value="Low">Low</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>Status</Label>
                          <Select
                            value={editedIncident?.status || selectedIncident.status}
                            onValueChange={(value) => setEditedIncident(prev => ({ ...prev, status: value }))}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="under-investigation">Under Processing</SelectItem>
                              <SelectItem value="assigned">Assigned</SelectItem>
                              <SelectItem value="resolved">Resolved</SelectItem>
                              <SelectItem value="closed">Closed</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={handleUpdateIncident} disabled={isLoading}>
                          {isLoading ? 'Saving...' : 'Save Changes'}
                        </Button>
                        <Button variant="outline" onClick={() => setEditMode(false)}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-lg">{selectedIncident.title}</h4>
                          <p className="text-sm text-gray-500">{selectedIncident.id}</p>
                        </div>
                        <Badge className={`${getSeverityStyle(selectedIncident.severity).bg} ${getSeverityStyle(selectedIncident.severity).text}`}>
                          {selectedIncident.severity}
                        </Badge>
                      </div>
                      
                      <div>
                        <Label className="text-sm font-medium text-gray-500">Description</Label>
                        <p className="mt-1 text-sm">{selectedIncident.description}</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm font-medium text-gray-500">Location</Label>
                          <div className="flex items-center gap-1 mt-1">
                            <MapPin className="h-4 w-4 text-gray-400" />
                            <span className="text-sm">{selectedIncident.location}</span>
                          </div>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-500">Category</Label>
                          <Badge variant="outline" className="mt-1">
                            {selectedIncident.category}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm font-medium text-gray-500">Reported By</Label>
                          <div className="flex items-center gap-1 mt-1">
                            <User className="h-4 w-4 text-gray-400" />
                            <span className="text-sm">{selectedIncident.reportedBy}</span>
                          </div>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-500">Date & Time</Label>
                          <div className="flex items-center gap-1 mt-1">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            <span className="text-sm">{selectedIncident.date} at {selectedIncident.time}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <Label className="text-sm font-medium text-gray-500">Current Status</Label>
                        <div className="mt-1">
                          <Badge className={`${getStatusStyle(selectedIncident.status).bg} ${getStatusStyle(selectedIncident.status).text} gap-1`}>
                            {getStatusStyle(selectedIncident.status).icon}
                            {getStatusStyle(selectedIncident.status).label}
                          </Badge>
                        </div>
                      </div>
                      
                      {selectedIncident.assignedOfficer && (
                        <div>
                          <Label className="text-sm font-medium text-gray-500">Assigned Officer</Label>
                          <div className="flex items-center gap-2 mt-1">
                            <div className={`w-8 h-8 rounded-full ${getOfficerById(selectedOfficerId)?.avatarColor || 'bg-gray-200'} flex items-center justify-center text-white`}>
                              {selectedIncident.assignedOfficer.charAt(0)}
                            </div>
                            <div>
                              <p className="text-sm font-medium">{selectedIncident.assignedOfficer}</p>
                              <p className="text-xs text-gray-500">{selectedIncident.assignedTo}</p>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {selectedIncident.tags && selectedIncident.tags.length > 0 && (
                        <div>
                          <Label className="text-sm font-medium text-gray-500">Tags</Label>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {selectedIncident.tags.map(tag => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {selectedIncident.resolutionNotes && (
                        <div>
                          <Label className="text-sm font-medium text-gray-500">Resolution Notes</Label>
                          <p className="mt-1 text-sm text-gray-600">{selectedIncident.resolutionNotes}</p>
                        </div>
                      )}
                    </>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <AlertCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h4 className="font-semibold text-gray-600 mb-2">No Incident Selected</h4>
                  <p className="text-sm text-gray-500">
                    Select an incident from the list to view details
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions Panel */}
          <Card className="shadow-lg border-0 bg-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  className="gap-2"
                  onClick={() => {
                    if (selectedIncident) {
                      setActiveTab('assign')
                      document.getElementById('officer-resolutions')?.scrollIntoView({ behavior: 'smooth' })
                    }
                  }}
                  disabled={!selectedIncident}
                >
                  <UserPlus className="h-4 w-4" />
                  Assign
                </Button>
                <Button
                  variant="outline"
                  className="gap-2"
                  onClick={() => {
                    if (selectedIncident) {
                      setActiveTab('resolve')
                      document.getElementById('officer-resolutions')?.scrollIntoView({ behavior: 'smooth' })
                    }
                  }}
                  disabled={!selectedIncident}
                >
                  <CheckCircle className="h-4 w-4" />
                  Resolve
                </Button>
                <Button
                  variant="outline"
                  className="gap-2"
                  onClick={() => handleExportIncidents()}
                >
                  <Download className="h-4 w-4" />
                  Export
                </Button>
                <Button
                  variant="outline"
                  className="gap-2"
                  onClick={loadIncidents}
                  disabled={isLoading}
                >
                  <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                  Refresh
                </Button>
              </div>
              
              {selectedIncident && (
                <div className="pt-4 border-t">
                  <Label className="text-sm font-medium mb-2">Quick Status Update</Label>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => quickStatusUpdate(selectedIncident.id, IncidentStatus.ASSIGNED)}
                      className="text-xs"
                    >
                      Assign
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => quickStatusUpdate(selectedIncident.id, IncidentStatus.RESOLVED)}
                      className="text-xs"
                    >
                      Resolve
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => quickStatusUpdate(selectedIncident.id, IncidentStatus.CLOSED)}
                      className="text-xs"
                    >
                      Close
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* System Status */}
          <Card className="shadow-lg border-0 bg-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">System Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${autoRefresh ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  <span className="text-sm">Auto-refresh</span>
                </div>
                <Switch
                  checked={autoRefresh}
                  onCheckedChange={toggleAutoRefresh}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Data Sync</span>
                  <span className="font-medium text-green-600">Real-time</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Last Updated</span>
                  <span className="font-medium">Just now</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Incident Count</span>
                  <span className="font-medium">{incidents.length}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Active Officers</span>
                  <span className="font-medium">{officersList.filter(o => o.isActive).length}/{officersList.length}</span>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <div className="text-sm font-medium mb-2">Performance</div>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>System Health</span>
                      <span>92%</span>
                    </div>
                    <Progress value={92} className="h-1.5" />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>Response Time</span>
                      <span>8.2s</span>
                    </div>
                    <Progress value={85} className="h-1.5" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Officer Resolution Dashboard */}
      <Card id="officer-resolutions" className="shadow-xl mt-6 shadow-emerald-50 border border-emerald-100 bg-gradient-to-br from-white to-emerald-50/50">
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
                  {officersList.length} officers • {incidents.filter(i => i.status === IncidentStatus.ASSIGNED).length} active incidents
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
                  {incidents.filter(i => i.status === IncidentStatus.PENDING || i.status === IncidentStatus.UNDER_INVESTIGATION).length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger 
                value="resolve" 
                className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-emerald-200 rounded-lg"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Resolve Incidents
                <Badge variant="secondary" className="ml-2 h-5 w-5 p-0 text-xs">
                  {incidents.filter(i => i.status === IncidentStatus.ASSIGNED || i.status === IncidentStatus.UNDER_INVESTIGATION).length}
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
                    {incidents.filter(i => i.status === IncidentStatus.PENDING).length}
                  </div>
                </div>
                <div className="p-3 bg-amber-50 rounded-lg border border-amber-100">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-amber-700">Under Investigation</span>
                    <Search className="h-4 w-4 text-amber-500" />
                  </div>
                  <div className="text-2xl font-bold text-amber-800 mt-1">
                    {incidents.filter(i => i.status === IncidentStatus.UNDER_INVESTIGATION).length}
                  </div>
                </div>
                <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-100">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-emerald-700">Available Officers</span>
                    <Users className="h-4 w-4 text-emerald-500" />
                  </div>
                  <div className="text-2xl font-bold text-emerald-800 mt-1">
                    {officersList.filter(o => o.assignedIncidents < o.capacity).length}
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
                            const incident = incidents.find(i => i.id === value)
                            if (incident) {
                              setSelectedIncident(incident)
                              // Auto-select an available officer
                              const availableOfficer = officersList.find(o => o.assignedIncidents < o.capacity)
                              if (availableOfficer) setSelectedOfficerId(availableOfficer.id)
                            }
                          }}
                        >
                          <SelectTrigger id="incident-select" className="w-full">
                            <SelectValue placeholder="Select an incident to assign" />
                          </SelectTrigger>
                          <SelectContent className="bg-white border-none shadow-md">
                            <div className="p-2 border-b">
                              <Input placeholder="Search incidents..." className="h-8" />
                            </div>
                            {incidents
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
                                      <span>{new Date(incident.date).toLocaleDateString()}</span>
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
                                    <div className={`w-2 h-2 rounded-full ${officersList.find(o => o.id === selectedOfficerId)?.avatarColor}`} />
                                    {officersList.find(o => o.id === selectedOfficerId)?.name}
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
                              {officersList.map((officer) => (
                                <SelectItem key={officer.id} value={officer.id}>
                                  <div className="flex items-center justify-between w-full">
                                    <div className="flex items-center gap-2">
                                      <div className={`w-2 h-2 rounded-full ${officer.avatarColor} ${officer.assignedIncidents < officer.capacity ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                                      <div>
                                        <div className="font-medium">{officer.name}</div>
                                        <div className="text-xs text-gray-500">{officer.role}</div>
                                      </div>
                                    </div>
                                    <Badge variant={officer.assignedIncidents < officer.capacity ? "outline" : "secondary"} className="text-xs">
                                      {officer.assignedIncidents}/{officer.capacity}
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
                        ({officersList.filter(o => o.assignedIncidents < o.capacity).length} available)
                      </span>
                    </h4>
                    <Button variant="outline" size="sm" className="h-8 text-xs" onClick={loadIncidents}>
                      <RefreshCw className="h-3 w-3 mr-1" />
                      Refresh
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {officersList.map((officer) => (
                      <Card 
                        key={officer.id} 
                        className={`shadow-sm hover:shadow-md transition-shadow cursor-pointer border ${
                          selectedOfficerId === officer.id ? 'border-emerald-300 ring-1 ring-emerald-100' : 'border-gray-200'
                        }`}
                        onClick={() => {
                          setSelectedOfficerId(officer.id)
                          if (!selectedIncident) {
                            const assignableIncident = incidents.find(i => 
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
                                  <div className={`w-2 h-2 rounded-full ${officer.isActive ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                </div>
                                <p className="text-xs text-gray-600">{officer.role}</p>
                                <div className="flex items-center gap-2 mt-1.5">
                                  <Badge 
                                    variant={officer.assignedIncidents < officer.capacity ? "outline" : "secondary"} 
                                    className="text-xs h-5"
                                  >
                                    <Briefcase className="h-2.5 w-2.5 mr-1" />
                                    {officer.assignedIncidents}/{officer.capacity}
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
                    {incidents.filter(i => i.status === IncidentStatus.ASSIGNED).length}
                  </div>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg border border-purple-100">
                  <div className="text-xs font-medium text-purple-700">Investigating</div>
                  <div className="text-2xl font-bold text-purple-800 mt-1">
                    {incidents.filter(i => i.status === IncidentStatus.UNDER_INVESTIGATION).length}
                  </div>
                </div>
                <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-100">
                  <div className="text-xs font-medium text-emerald-700">Resolved Today</div>
                  <div className="text-2xl font-bold text-emerald-800 mt-1">
                    {incidents.filter(i => i.status === IncidentStatus.RESOLVED && 
                      new Date(i.date).toDateString() === new Date().toDateString()).length}
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
                        {incidents
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
                                {getStatusStyle(selectedIncident.status).label}
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

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="h-5 w-5" />
              Confirm Deletion
            </DialogTitle>
            <DialogDescription>
              {incidentToDelete === 'bulk' ? (
                <div>
                  Are you sure you want to delete {selectedIncidents.size} selected incidents? This action cannot be undone.
                </div>
              ) : (
                <div>
                  Are you sure you want to delete incident <span className="font-semibold">{incidentToDelete}</span>? This action cannot be undone.
                </div>
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              variant="destructive"
              onClick={() => {
                if (incidentToDelete === 'bulk') {
                  handleBulkAction('delete')
                } else {
                  handleDeleteIncident(incidentToDelete)
                }
              }}
              disabled={isLoading}
            >
              {isLoading ? 'Deleting...' : 'Delete'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Footer Status */}
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