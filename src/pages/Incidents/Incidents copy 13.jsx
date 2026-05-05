"use client"

import React, { useState, useEffect } from 'react'
import { 
  Plus, Search, Download, AlertTriangle, CheckCircle, Clock, ChevronRight,
  Eye, Edit, Trash2, User, MapPin, Shield, Activity, Cloud, FileText,
  ClipboardCheck, MoreVertical, RefreshCw, Timer, Users, Check, Send,
  ShieldCheck, Bell, Phone, Loader2, Filter, Calendar, MessageSquare,
  Upload, AlertCircle, CheckSquare, XCircle, FileSpreadsheet, UserPlus,
  Briefcase, BarChart3, TrendingUp, TrendingDown, Smartphone, ChevronDown,
  List, Paperclip, Tag, X, UserMinus, ExternalLink, BarChart, PieChart,
  DownloadCloud, FileUp, FileDown, Save, Printer, Share2, Copy, QrCode,
  Camera, Mic, Video, Image, File, Folder, Database, Server, Network,
  Wifi, Bluetooth, Radio, Satellite, CloudOff, WifiOff, Signal, SignalZero,
  SignalLow, SignalMedium, SignalHigh, Battery, BatteryCharging, BatteryFull,
  BatteryLow, BatteryMedium, BatteryWarning, Power, PowerOff, Zap, ZapOff,
  Sun, Moon, Star, Heart, ThumbsUp, ThumbsDown, Flag, HelpCircle, Info,
  Award, Medal, Trophy, Crown, Target, TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon, DollarSign, CreditCard, Wallet,
  Banknote, Coins, Gift, ShoppingCart, Package, Truck, Home, Building,
  Factory, Warehouse, Store, ShoppingBag, Tag as TagIcon, Percent,
  AlertOctagon, BellRing, MessageCircle, Mail, PhoneCall, Voicemail,
  Video as VideoIcon, Camera as CameraIcon, Mic as MicIcon, Headphones,
  Volume2, Music, Play, Pause, StopCircle, SkipBack, SkipForward, Rewind,
  FastForward, Repeat, Shuffle, VolumeX
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
import { Switch } from '@/components/ui/switch'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Checkbox } from '@/components/ui/checkbox'
import { Slider } from '@/components/ui/slider'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuShortcut,
} from "@/components/ui/context-menu"
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarGroup,
} from "@/components/ui/menubar"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Skeleton } from "@/components/ui/skeleton"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

// Custom Components
import { MobileReportingDialog } from "./MobileReportingDialog"
import { IncidentReportDialog } from "./IncidentReportDialog"
import { IncidentDetailsSheet } from "./IncidentDetailsSheet"
import { ExportDialog } from "./ExportDialog"
import { NotificationBell } from "./NotificationBell"
import { QuickActions } from "./QuickActions"
import { LiveActivityFeed } from "./LiveActivityFeed"

// Incident data
const incidentsData = [
  {
    id: 'INC-2024-001',
    title: 'Slip and Fall - Warehouse A',
    date: '2024-06-15',
    time: '10:30 AM',
    location: 'Warehouse A, Zone 3',
    severity: 'Critical',
    status: 'assigned',
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
    tags: ['injury', 'safety-violation', 'wet-floor'],
    estimatedResolution: '2024-06-20',
    impact: 'Low',
    rootCause: 'Wet floor without warning signs',
    preventiveActions: ['Install warning signs', 'Regular floor checks', 'Staff training'],
    cost: 500
  },
  {
    id: 'INC-2024-002',
    title: 'Chemical Spill - Lab 2',
    date: '2024-06-14',
    time: '02:15 PM',
    location: 'Lab 2, Building B',
    severity: 'High',
    status: 'under-investigation',
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
    tags: ['chemical', 'spill', 'lab-safety'],
    impact: 'Medium',
    cost: 1200
  },
  {
    id: 'INC-2024-003',
    title: 'Electrical Panel Hazard',
    date: '2024-06-13',
    time: '09:45 AM',
    location: 'Maintenance Room',
    severity: 'Medium',
    status: 'pending',
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
    impact: 'High',
    cost: 300
  },
  {
    id: 'INC-2024-004',
    title: 'Near Miss - Falling Object',
    date: '2024-06-12',
    time: '11:20 AM',
    location: 'Assembly Line 3',
    severity: 'Low',
    status: 'resolved',
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
    tags: ['near-miss', 'falling-object', 'production'],
    impact: 'Low',
    cost: 0
  },
  {
    id: 'INC-2024-005',
    title: 'Fire Alarm Test - Building C',
    date: '2024-06-11',
    time: '09:00 AM',
    location: 'Building C, All Floors',
    severity: 'Low',
    status: 'closed',
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
    tags: ['drill', 'fire-safety', 'test'],
    impact: 'None',
    cost: 0
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
    status: 'busy',
    currentLocation: 'Warehouse A',
    lastActive: '2 minutes ago',
    skills: ['First Aid', 'Investigation', 'Report Writing']
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
    status: 'available',
    currentLocation: 'Main Office',
    lastActive: 'Online',
    skills: ['Forensics', 'Data Analysis', 'Interviewing']
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
    status: 'available',
    currentLocation: 'Building B',
    lastActive: '5 minutes ago',
    skills: ['Team Management', 'Compliance', 'Training']
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
    status: 'available',
    currentLocation: 'Analytics Lab',
    lastActive: 'Online',
    skills: ['Data Science', 'Risk Assessment', 'Statistics']
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
  safetyScore: 92.5,
  thisWeek: 8,
  thisMonth: 42,
  highPriority: 5,
  averageResolutionTime: '2.5 days'
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
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [incidents, setIncidents] = useState(incidentsData)
  const [selectedDepartment, setSelectedDepartment] = useState('all')
  const [dateRange, setDateRange] = useState({ from: '', to: '' })
  const [sortBy, setSortBy] = useState('newest')
  const [expandedIncidentId, setExpandedIncidentId] = useState(null)

  // Filter incidents
  const filteredIncidents = incidents.filter(incident => {
    const matchesSearch = searchQuery === '' || 
      incident.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      incident.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      incident.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      incident.reportedBy.toLowerCase().includes(searchQuery.toLowerCase()) ||
      incident.description.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesSeverity = selectedSeverity === 'all' || incident.severity === selectedSeverity
    const matchesStatus = selectedStatus === 'all' || incident.status === selectedStatus
    const matchesDepartment = selectedDepartment === 'all' || incident.department === selectedDepartment

    // Date filtering
    const incidentDate = new Date(incident.date)
    const fromDate = dateRange.from ? new Date(dateRange.from) : null
    const toDate = dateRange.to ? new Date(dateRange.to) : null
    
    const matchesDate = (!fromDate || incidentDate >= fromDate) && 
                       (!toDate || incidentDate <= toDate)

    return matchesSearch && matchesSeverity && matchesStatus && matchesDepartment && matchesDate
  })

  // Sort incidents
  const sortedIncidents = [...filteredIncidents].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      case 'oldest':
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      case 'severity':
        const severityOrder = { 'Critical': 4, 'High': 3, 'Medium': 2, 'Low': 1 }
        return severityOrder[b.severity] - severityOrder[a.severity]
      case 'daysOpen':
        return b.daysOpen - a.daysOpen
      default:
        return 0
    }
  })

  // Get all incidents or filtered based on view mode
  const displayIncidents = viewMode === 'all' ? incidents : sortedIncidents

  // Get severity badge style
  const getSeverityStyle = (severity) => {
    switch (severity) {
      case 'Critical':
        return {
          bg: 'bg-red-500/10',
          text: 'text-red-700',
          border: 'border-red-200',
          icon: 'bg-red-100 text-red-600',
          dot: 'bg-red-500'
        }
      case 'High':
        return {
          bg: 'bg-orange-500/10',
          text: 'text-orange-700',
          border: 'border-orange-200',
          icon: 'bg-orange-100 text-orange-600',
          dot: 'bg-orange-500'
        }
      case 'Medium':
        return {
          bg: 'bg-yellow-500/10',
          text: 'text-yellow-700',
          border: 'border-yellow-200',
          icon: 'bg-yellow-100 text-yellow-600',
          dot: 'bg-yellow-500'
        }
      case 'Low':
        return {
          bg: 'bg-blue-500/10',
          text: 'text-blue-700',
          border: 'border-blue-200',
          icon: 'bg-blue-100 text-blue-600',
          dot: 'bg-blue-500'
        }
      default:
        return {
          bg: 'bg-gray-100',
          text: 'text-gray-700',
          border: 'border-gray-200',
          icon: 'bg-gray-100 text-gray-600',
          dot: 'bg-gray-500'
        }
    }
  }

  // Get status badge style
  const getStatusStyle = (status) => {
    switch (status) {
      case 'pending':
        return {
          bg: 'bg-yellow-500/10',
          text: 'text-yellow-700',
          border: 'border-yellow-200',
          label: 'Pending',
          icon: <Clock className="h-3 w-3" />,
          dot: 'bg-yellow-500'
        }
      case 'under-investigation':
        return {
          bg: 'bg-purple-500/10',
          text: 'text-purple-700',
          border: 'border-purple-200',
          label: 'Under Processing',
          icon: <Activity className="h-3 w-3" />,
          dot: 'bg-purple-500'
        }
      case 'assigned':
        return {
          bg: 'bg-blue-500/10',
          text: 'text-blue-700',
          border: 'border-blue-200',
          label: 'Assigned',
          icon: <User className="h-3 w-3" />,
          dot: 'bg-blue-500'
        }
      case 'resolved':
        return {
          bg: 'bg-green-500/10',
          text: 'text-green-700',
          border: 'border-green-200',
          label: 'Solved',
          icon: <CheckCircle className="h-3 w-3" />,
          dot: 'bg-green-500'
        }
      case 'closed':
        return {
          bg: 'bg-emerald-500/10',
          text: 'text-emerald-700',
          border: 'border-emerald-200',
          label: 'Closed',
          icon: <CheckSquare className="h-3 w-3" />,
          dot: 'bg-emerald-500'
        }
      default:
        return {
          bg: 'bg-gray-100',
          text: 'text-gray-700',
          border: 'border-gray-200',
          label: status,
          icon: <AlertCircle className="h-3 w-3" />,
          dot: 'bg-gray-500'
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
      
      // Update incident in state
      setIncidents(prev => prev.map(incident => 
        incident.id === incidentId 
          ? { 
              ...incident, 
              assignedOfficer: officer.name,
              status: 'assigned',
              assignedTo: officer.role,
              updatedAt: new Date().toISOString()
            } 
          : incident
      ))
      
      setSelectedIncident(prev => ({
        ...prev,
        assignedOfficer: officer.name,
        status: 'assigned',
        assignedTo: officer.role,
        updatedAt: new Date().toISOString()
      }))
      
      setSelectedOfficerId('')
      
      // Show success message
      alert(`Incident ${incidentId} assigned to ${officer.name}`)
      
    } catch (error) {
      console.error('Error assigning incident:', error)
      alert('Failed to assign incident. Please try again.')
    } finally {
      setAssigningOfficer(false)
    }
  }

  // Handle resolve incident
  const handleResolveIncident = async (incidentId) => {
    if (!resolutionNotes.trim() || resolutionNotes.length < 50) {
      alert('Please add resolution notes (minimum 50 characters)')
      return
    }

    setIsLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Update incident in state
      setIncidents(prev => prev.map(incident => 
        incident.id === incidentId 
          ? { 
              ...incident, 
              status: 'resolved',
              resolutionNotes: resolutionNotes,
              resolvedBy: 'Current User',
              resolvedAt: new Date().toISOString(),
              daysOpen: 0,
              updatedAt: new Date().toISOString()
            } 
          : incident
      ))
      
      setSelectedIncident(prev => ({
        ...prev,
        status: 'resolved',
        resolutionNotes: resolutionNotes,
        resolvedBy: 'Current User',
        resolvedAt: new Date().toISOString(),
        daysOpen: 0,
        updatedAt: new Date().toISOString()
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

  // Handle delete incident
  const handleDeleteIncident = async (incidentId) => {
    if (!confirm('Are you sure you want to delete this incident? This action cannot be undone.')) {
      return
    }

    setIsLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Remove incident from state
      setIncidents(prev => prev.filter(incident => incident.id !== incidentId))
      
      // If deleted incident was selected, select another one
      if (selectedIncident?.id === incidentId) {
        const remainingIncidents = incidents.filter(incident => incident.id !== incidentId)
        if (remainingIncidents.length > 0) {
          setSelectedIncident(remainingIncidents[0])
        }
      }
      
      alert('Incident deleted successfully!')
      
    } catch (error) {
      console.error('Error deleting incident:', error)
      alert('Failed to delete incident. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  // Handle export incidents
  const handleExportIncidents = (format = 'csv') => {
    setIsLoading(true)
    
    setTimeout(() => {
      setIsLoading(false)
      
      // Create export data
      const exportData = displayIncidents.map(incident => ({
        'Incident ID': incident.id,
        'Title': incident.title,
        'Date': incident.date,
        'Time': incident.time,
        'Location': incident.location,
        'Severity': incident.severity,
        'Status': incident.status,
        'Category': incident.category,
        'Reported By': incident.reportedBy,
        'Assigned To': incident.assignedTo,
        'Days Open': incident.daysOpen,
        'Department': incident.department
      }))
      
      // Simulate download
      const dataStr = JSON.stringify(exportData, null, 2)
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
      
      const exportFileName = `incidents_export_${format}_${new Date().toISOString().split('T')[0]}.${format}`
      
      const linkElement = document.createElement('a')
      linkElement.setAttribute('href', dataUri)
      linkElement.setAttribute('download', exportFileName)
      linkElement.click()
      
      alert(`Incidents exported successfully as ${format.toUpperCase()}!`)
    }, 1500)
  }

  // Handle refresh data
  const handleRefreshData = () => {
    setIsLoading(true)
    
    setTimeout(() => {
      // Simulate fetching new data
      setIncidents([...incidentsData])
      setStats({...incidentStats})
      setIsLoading(false)
      
      // Show notification
      alert('Data refreshed successfully!')
    }, 1000)
  }

  // Handle create new incident
  const handleCreateNewIncident = (newIncident) => {
    const incidentId = `INC-${new Date().getFullYear()}-${String(incidents.length + 1).padStart(3, '0')}`
    
    const incident = {
      id: incidentId,
      title: newIncident.title || 'New Incident',
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      location: newIncident.location || 'Unknown Location',
      severity: newIncident.severity || 'Low',
      status: 'pending',
      type: newIncident.type || 'injury',
      category: newIncident.category || 'General',
      reportedBy: newIncident.reportedBy || 'System',
      assignedTo: 'Unassigned',
      responseTime: '0 mins',
      investigationStatus: 'Awaiting Review',
      daysOpen: 0,
      priority: 'Low',
      description: newIncident.description || 'No description provided',
      evidence: 0,
      witnesses: 0,
      department: newIncident.department || 'General',
      actionTaken: 'Incident reported, awaiting assignment',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    setIncidents(prev => [incident, ...prev])
    setSelectedIncident(incident)
    
    alert(`New incident ${incidentId} created successfully!`)
  }

  // Calculate incident statistics
  const calculateStats = () => {
    const stats = {
      pending: incidents.filter(i => i.status === 'pending').length,
      investigating: incidents.filter(i => i.status === 'under-investigation').length,
      assigned: incidents.filter(i => i.status === 'assigned').length,
      resolved: incidents.filter(i => i.status === 'resolved').length,
      closed: incidents.filter(i => i.status === 'closed').length,
      total: incidents.length
    }
    return stats
  }

  // Get status count
  const statusCounts = calculateStats()

  // Get officer by ID
  const getOfficerById = (id) => {
    return officers.find(o => o.id === id)
  }

  // Toggle incident details
  const toggleIncidentDetails = (incidentId) => {
    setExpandedIncidentId(expandedIncidentId === incidentId ? null : incidentId)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50/30 p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white rounded-xl shadow-sm border border-emerald-100">
              <Shield className="h-7 w-7 text-emerald-600" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                Incident Management System
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-gray-600">
                  Track, assign, and resolve safety incidents in real-time
                </p>
                <Badge variant="outline" className="text-xs border-emerald-200 text-emerald-700">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse"></div>
                  Live
                </Badge>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 sm:flex-none">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search incidents, locations, ID..."
              className="pl-9 w-full sm:w-64 bg-white/80 backdrop-blur-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="gap-2 cursor-pointer bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                  <Plus className="h-4 w-4" />
                  New Report
                </Button>
              </DialogTrigger>
              <IncidentReportDialog onCreateIncident={handleCreateNewIncident} />
            </Dialog>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="gap-2 cursor-pointer border-emerald-200 hover:border-emerald-300 hover:bg-emerald-50 transition-all duration-300">
                  <Smartphone className="h-4 w-4" />
                  Mobile
                </Button>
              </DialogTrigger>
              <MobileReportingDialog onCreateIncident={handleCreateNewIncident} />
            </Dialog>
            
            <NotificationBell />
          </div>
        </div>
      </div>

      {/* Quick Actions Bar */}
      <QuickActions 
        onRefresh={handleRefreshData}
        onExport={handleExportIncidents}
        isLoading={isLoading}
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-0 bg-gradient-to-br from-white to-emerald-50/50 cursor-pointer hover:shadow-xl transition-all duration-500 hover:-translate-y-1 shadow-lg shadow-emerald-100 border-r-4 border-emerald-400">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Incidents</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{statusCounts.total}</p>
                <div className="flex items-center gap-2 mt-1">
                  <TrendingUpIcon className="h-3 w-3 text-emerald-600" />
                  <span className="text-xs text-emerald-600">+{stats.thisWeek} this week</span>
                </div>
              </div>
              <div className="p-3 bg-emerald-50 rounded-xl">
                <AlertTriangle className="h-6 w-6 text-emerald-600" />
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
                indicatorClassName="bg-emerald-500"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-br from-white to-amber-50/50 cursor-pointer hover:shadow-xl transition-all duration-500 hover:-translate-y-1 shadow-lg shadow-amber-100 border-r-4 border-amber-400">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Review</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{statusCounts.pending}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Clock className="h-3 w-3 text-amber-600" />
                  <span className="text-xs text-amber-600">Requires attention</span>
                </div>
              </div>
              <div className="p-3 bg-amber-50 rounded-xl">
                <Clock className="h-6 w-6 text-amber-600" />
              </div>
            </div>
            <div className="mt-4">
              <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                <div className="w-2 h-2 rounded-full bg-amber-500 mr-1.5 animate-pulse"></div>
                Action Required
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-br from-white to-purple-50/50 cursor-pointer hover:shadow-xl transition-all duration-500 hover:-translate-y-1 shadow-lg shadow-purple-100 border-r-4 border-purple-400">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Under Processing</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{statusCounts.investigating}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Activity className="h-3 w-3 text-purple-600" />
                  <span className="text-xs text-purple-600">In progress</span>
                </div>
              </div>
              <div className="p-3 bg-purple-50 rounded-xl">
                <Activity className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4">
              <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                Investigation Active
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-br from-white to-green-50/50 cursor-pointer hover:shadow-xl transition-all duration-500 hover:-translate-y-1 shadow-lg shadow-green-100 border-r-4 border-green-400">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Resolved</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{statusCounts.resolved + statusCounts.closed}</p>
                <div className="flex items-center gap-2 mt-1">
                  <CheckCircle className="h-3 w-3 text-green-600" />
                  <span className="text-xs text-green-600">+{stats.resolved} this month</span>
                </div>
              </div>
              <div className="p-3 bg-green-50 rounded-xl">
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
          <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg">
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
                    <SelectTrigger className="w-32 cursor-pointer border-0 border-b-2 bg-amber-50 border-emerald-300 shadow-none px-0 focus:ring-0 focus:ring-offset-0">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-3.5 w-3.5" />
                        <SelectValue placeholder="Severity" />
                      </div>
                    </SelectTrigger>
                    <SelectContent className="bg-white cursor-pointer border-none shadow-lg">
                      <SelectItem value="all" className="cursor-pointer hover:bg-gray-50">
                        All Severity
                      </SelectItem>
                      <SelectItem value="Critical" className="cursor-pointer hover:bg-red-50">
                        <div className="flex items-center gap-2 text-red-600">
                          <div className="w-2 h-2 rounded-full bg-red-500"></div>
                          Critical
                        </div>
                      </SelectItem>
                      <SelectItem value="High" className="cursor-pointer hover:bg-orange-50">
                        <div className="flex items-center gap-2 text-orange-600">
                          <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                          High
                        </div>
                      </SelectItem>
                      <SelectItem value="Medium" className="cursor-pointer hover:bg-yellow-50">
                        <div className="flex items-center gap-2 text-yellow-600">
                          <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                          Medium
                        </div>
                      </SelectItem>
                      <SelectItem value="Low" className="cursor-pointer hover:bg-blue-50">
                        <div className="flex items-center gap-2 text-blue-600">
                          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                          Low
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger className="w-40 cursor-pointer border-0 border-b-2 bg-amber-50 border-emerald-300 shadow-none px-0 focus:ring-0 focus:ring-offset-0">
                      <div className="flex items-center gap-2">
                        <Activity className="h-3.5 w-3.5" />
                        <SelectValue placeholder="Status" />
                      </div>
                    </SelectTrigger>
                    <SelectContent className="bg-white border-none shadow-lg">
                      <SelectItem value="all" className="cursor-pointer hover:bg-gray-50">
                        All Status
                      </SelectItem>
                      <SelectItem value="pending" className="cursor-pointer hover:bg-yellow-50">
                        <div className="flex items-center gap-2 text-yellow-600">
                          <Clock className="h-3.5 w-3.5" />
                          Pending
                        </div>
                      </SelectItem>
                      <SelectItem value="under-investigation" className="cursor-pointer hover:bg-purple-50">
                        <div className="flex items-center gap-2 text-purple-600">
                          <Activity className="h-3.5 w-3.5" />
                          Under Processing
                        </div>
                      </SelectItem>
                      <SelectItem value="assigned" className="cursor-pointer hover:bg-blue-50">
                        <div className="flex items-center gap-2 text-blue-600">
                          <User className="h-3.5 w-3.5" />
                          Assigned
                        </div>
                      </SelectItem>
                      <SelectItem value="resolved" className="cursor-pointer hover:bg-green-50">
                        <div className="flex items-center gap-2 text-green-600">
                          <CheckCircle className="h-3.5 w-3.5" />
                          Solved
                        </div>
                      </SelectItem>
                      <SelectItem value="closed" className="cursor-pointer hover:bg-emerald-50">
                        <div className="flex items-center gap-2 text-emerald-600">
                          <CheckSquare className="h-3.5 w-3.5" />
                          Closed
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-32 cursor-pointer border-0 border-b-2 bg-amber-50 border-emerald-300 shadow-none px-0 focus:ring-0 focus:ring-offset-0">
                      <div className="flex items-center gap-2">
                        <Filter className="h-3.5 w-3.5" />
                        <SelectValue placeholder="Sort By" />
                      </div>
                    </SelectTrigger>
                    <SelectContent className="bg-white border-none shadow-lg">
                      <SelectItem value="newest" className="cursor-pointer hover:bg-gray-50">Newest First</SelectItem>
                      <SelectItem value="oldest" className="cursor-pointer hover:bg-gray-50">Oldest First</SelectItem>
                      <SelectItem value="severity" className="cursor-pointer hover:bg-gray-50">Severity (High to Low)</SelectItem>
                      <SelectItem value="daysOpen" className="cursor-pointer hover:bg-gray-50">Days Open</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        className="w-32 cursor-pointer border-0 border-b-2 bg-amber-50 border-emerald-300 shadow-none px-0 focus:ring-0 focus:ring-offset-0"
                        disabled={isLoading}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Export
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-white border-none shadow-lg">
                      <DropdownMenuItem onClick={() => handleExportIncidents('csv')}>
                        <FileSpreadsheet className="h-4 w-4 mr-2" />
                        Export as CSV
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleExportIncidents('excel')}>
                        <FileSpreadsheet className="h-4 w-4 mr-2" />
                        Export as Excel
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleExportIncidents('pdf')}>
                        <FileText className="h-4 w-4 mr-2" />
                        Export as PDF
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Incidents Table */}
          <Card className="shadow-2xl shadow-emerald-200/50 border-0 overflow-hidden bg-white/90 backdrop-blur-sm">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-gradient-to-r from-emerald-50 to-emerald-100/50">
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="w-32 font-semibold text-emerald-900">Incident ID</TableHead>
                    <TableHead className="font-semibold text-emerald-900">Title & Details</TableHead>
                    <TableHead className="w-24 font-semibold text-emerald-900">Severity</TableHead>
                    <TableHead className="w-40 font-semibold text-emerald-900">Status</TableHead>
                    <TableHead className="w-28 font-semibold text-emerald-900">Days</TableHead>
                    <TableHead className="w-24 font-semibold text-emerald-900">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {displayIncidents.map((incident) => {
                    const severityStyle = getSeverityStyle(incident.severity)
                    const statusStyle = getStatusStyle(incident.status)
                    const isExpanded = expandedIncidentId === incident.id
                    
                    return (
                      <React.Fragment key={incident.id}>
                        <TableRow 
                          className={`hover:bg-emerald-50/50 cursor-pointer transition-all duration-300 ${
                            selectedIncident?.id === incident.id ? 'bg-blue-50' : ''
                          }`}
                          onClick={() => toggleIncidentDetails(incident.id)}
                        >
                          <TableCell>
                            <div className="font-semibold text-gray-900">{incident.id}</div>
                            <div className="text-xs text-gray-500">{incident.date}</div>
                          </TableCell>
                          
                          <TableCell>
                            <div className="font-semibold text-gray-900">{incident.title}</div>
                            <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                              <MapPin className="h-3 w-3" />
                              {incident.location}
                            </div>
                            {incident.tags && incident.tags.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-2">
                                {incident.tags.slice(0, 2).map((tag, index) => (
                                  <span key={index} className="text-xs px-2 py-0.5 bg-gray-100 rounded-full">
                                    {tag}
                                  </span>
                                ))}
                                {incident.tags.length > 2 && (
                                  <span className="text-xs px-2 py-0.5 bg-gray-100 rounded-full">
                                    +{incident.tags.length - 2}
                                  </span>
                                )}
                              </div>
                            )}
                          </TableCell>
                          
                          <TableCell>
                            <div 
                              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${severityStyle.bg} ${severityStyle.text} ${severityStyle.border} border`}
                            >
                              <div className={`w-2 h-2 rounded-full ${severityStyle.dot}`}></div>
                              {incident.severity}
                            </div>
                          </TableCell>
                          
                          <TableCell>
                            <div 
                              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border} border`}
                            >
                              {statusStyle.icon}
                              {statusStyle.label}
                            </div>
                          </TableCell>
                          
                          <TableCell>
                            <div className="font-semibold">{incident.daysOpen}d</div>
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
                                      className="h-8 w-8 hover:bg-emerald-100"
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        setSelectedIncident(incident)
                                        setIsSheetOpen(true)
                                      }}
                                    >
                                      <Eye className="h-4 w-4" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>View Details</TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                              
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-8 w-8 hover:bg-blue-100"
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        // Handle edit action
                                        alert(`Edit incident ${incident.id}`)
                                      }}
                                    >
                                      <Edit className="h-4 w-4" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>Edit Incident</TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                              
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 hover:bg-gray-100"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-48">
                                  <DropdownMenuItem onClick={() => {
                                    setSelectedIncident(incident)
                                    setIsSheetOpen(true)
                                  }}>
                                    <Eye className="h-4 w-4 mr-2" />
                                    View Details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => {
                                    // Handle edit
                                    alert(`Edit incident ${incident.id}`)
                                  }}>
                                    <Edit className="h-4 w-4 mr-2" />
                                    Edit Incident
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => {
                                    navigator.clipboard.writeText(incident.id)
                                    alert(`Copied ID: ${incident.id}`)
                                  }}>
                                    <Copy className="h-4 w-4 mr-2" />
                                    Copy ID
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem 
                                    className="text-red-600"
                                    onClick={() => handleDeleteIncident(incident.id)}
                                  >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete Incident
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </TableCell>
                        </TableRow>
                        
                        {isExpanded && (
                          <TableRow className="bg-emerald-50/30">
                            <TableCell colSpan={6} className="p-4">
                              <div className="pl-8 pr-4">
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                  <div>
                                    <p className="text-xs font-medium text-gray-500">Reported By</p>
                                    <p className="text-sm font-medium">{incident.reportedBy}</p>
                                  </div>
                                  <div>
                                    <p className="text-xs font-medium text-gray-500">Department</p>
                                    <p className="text-sm font-medium">{incident.department}</p>
                                  </div>
                                  <div>
                                    <p className="text-xs font-medium text-gray-500">Response Time</p>
                                    <p className="text-sm font-medium">{incident.responseTime}</p>
                                  </div>
                                  <div>
                                    <p className="text-xs font-medium text-gray-500">Evidence</p>
                                    <p className="text-sm font-medium">{incident.evidence} files</p>
                                  </div>
                                </div>
                                <div className="mt-3">
                                  <p className="text-xs font-medium text-gray-500">Description</p>
                                  <p className="text-sm mt-1">{incident.description}</p>
                                </div>
                                <div className="flex gap-2 mt-3">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => {
                                      setSelectedIncident(incident)
                                      setIsSheetOpen(true)
                                    }}
                                  >
                                    <Eye className="h-3.5 w-3.5 mr-1.5" />
                                    Full Details
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => {
                                      setSelectedIncident(incident)
                                      setActiveTab('assign')
                                    }}
                                  >
                                    <UserPlus className="h-3.5 w-3.5 mr-1.5" />
                                    Assign Officer
                                  </Button>
                                </div>
                              </div>
                            </TableCell>
                          </TableRow>
                        )}
                      </React.Fragment>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
            
            <CardFooter className="border-t border-emerald-100 py-3">
              <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-sm text-gray-500">
                  Showing {displayIncidents.length} of {incidents.length} incidents
                </div>
                
                <div className="flex items-center gap-3">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious href="#" />
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#">1</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#" isActive>
                          2
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#">3</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationNext href="#" />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                  
                  <Button
                    variant="outline"
                    className="bg-white hover:bg-emerald-50 border-emerald-200"
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

        {/* Right Column - Officer's Resolution Dashboard */}
        <div className="lg:col-span-1">
          <Card className="shadow-xl shadow-emerald-100 border border-emerald-100 bg-gradient-to-br from-white to-emerald-50/50 h-full">
            <CardHeader className="pb-3 border-b border-emerald-100">
              <CardTitle className="flex items-center gap-2.5 text-emerald-800">
                <div className="p-2 bg-emerald-100 rounded-xl">
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
                      {officers.length} officers • {incidents.filter(i => i.status === 'assigned').length} active incidents
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
                    className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-emerald-200 rounded-lg transition-all"
                  >
                    <UserPlus className="h-4 w-4 mr-2" />
                    Assign
                    <Badge variant="secondary" className="ml-2 h-5 w-5 p-0 text-xs">
                      {incidents.filter(i => i.status === 'pending' || i.status === 'under-investigation').length}
                    </Badge>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="resolve" 
                    className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-emerald-200 rounded-lg transition-all"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Resolve
                    <Badge variant="secondary" className="ml-2 h-5 w-5 p-0 text-xs">
                      {incidents.filter(i => i.status === 'assigned' || i.status === 'under-investigation').length}
                    </Badge>
                  </TabsTrigger>
                </TabsList>
                
                {/* Assign Tab */}
                <TabsContent value="assign" className="space-y-6 mt-6">
                  {/* Quick Stats */}
                  <div className="grid grid-cols-3 gap-2">
                    <div className="p-2 bg-blue-50 rounded-lg border border-blue-100">
                      <div className="text-xs font-medium text-blue-700">Pending</div>
                      <div className="text-lg font-bold text-blue-800">
                        {incidents.filter(i => i.status === 'pending').length}
                      </div>
                    </div>
                    <div className="p-2 bg-amber-50 rounded-lg border border-amber-100">
                      <div className="text-xs font-medium text-amber-700">Investigating</div>
                      <div className="text-lg font-bold text-amber-800">
                        {incidents.filter(i => i.status === 'under-investigation').length}
                      </div>
                    </div>
                    <div className="p-2 bg-emerald-50 rounded-lg border border-emerald-100">
                      <div className="text-xs font-medium text-emerald-700">Available</div>
                      <div className="text-lg font-bold text-emerald-800">
                        {officers.filter(o => o.assignedIncidents < 3).length}
                      </div>
                    </div>
                  </div>

                  {/* Assignment Form */}
                  <div className="space-y-4">
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
                              const availableOfficer = officers.find(o => o.assignedIncidents < 3)
                              if (availableOfficer) setSelectedOfficerId(availableOfficer.id)
                            }
                          }}
                        >
                          <SelectTrigger id="incident-select" className="w-full">
                            <SelectValue placeholder="Select an incident to assign" />
                          </SelectTrigger>
                          <SelectContent className="bg-white border-none shadow-lg">
                            {incidents
                              .filter(i => i.status === 'pending' || i.status === 'under-investigation')
                              .map((incident) => (
                                <SelectItem key={incident.id} value={incident.id} className="py-3">
                                  <div className="flex flex-col">
                                    <div className="flex items-center gap-2">
                                      <Badge variant="outline" className={`text-xs ${
                                        incident.severity === 'Critical' ? 'border-red-200 text-red-700' :
                                        incident.severity === 'High' ? 'border-orange-200 text-orange-700' :
                                        'border-blue-200 text-blue-700'
                                      }`}>
                                        {incident.severity}
                                      </Badge>
                                      <span className="font-medium">{incident.id}</span>
                                    </div>
                                    <span className="text-sm text-gray-600 truncate">{incident.title}</span>
                                  </div>
                                </SelectItem>
                              ))
                            }
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="officer-select" className="flex items-center gap-1.5 mb-1.5">
                          <User className="h-3.5 w-3.5" />
                          Assign to Officer
                        </Label>
                        <Select
                          value={selectedOfficerId}
                          onValueChange={setSelectedOfficerId}
                          disabled={assigningOfficer}
                        >
                          <SelectTrigger id="officer-select" className="w-full">
                            <SelectValue placeholder="Select an officer" />
                          </SelectTrigger>
                          <SelectContent className="bg-white border-none shadow-lg">
                            {officers.map((officer) => (
                              <SelectItem key={officer.id} value={officer.id}>
                                <div className="flex items-center justify-between w-full">
                                  <div className="flex items-center gap-2">
                                    <div className={`w-2 h-2 rounded-full ${
                                      officer.status === 'available' ? 'bg-emerald-500' :
                                      officer.status === 'busy' ? 'bg-amber-500' :
                                      'bg-gray-500'
                                    }`} />
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
                      </div>
                      
                      <Button
                        className="w-full bg-emerald-600 hover:bg-emerald-700"
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
                            Assign Incident
                          </>
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* Officer List */}
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Available Officers
                    </h4>
                    <div className="space-y-2">
                      {officers.map((officer) => (
                        <div
                          key={officer.id}
                          className={`p-3 rounded-lg border cursor-pointer transition-all ${
                            selectedOfficerId === officer.id 
                              ? 'bg-emerald-50 border-emerald-200' 
                              : 'border-gray-200 hover:border-emerald-200'
                          }`}
                          onClick={() => {
                            setSelectedOfficerId(officer.id)
                            if (!selectedIncident) {
                              const assignableIncident = incidents.find(i => 
                                i.status === 'pending' || i.status === 'under-investigation'
                              )
                              if (assignableIncident) {
                                setSelectedIncident(assignableIncident)
                              }
                            }
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-9 w-9">
                                <div className={`h-full w-full rounded-full flex items-center justify-center ${officer.avatarColor} text-white font-bold`}>
                                  {officer.name.charAt(0)}
                                </div>
                              </Avatar>
                              <div>
                                <div className="flex items-center gap-2">
                                  <h5 className="font-semibold text-sm">{officer.name}</h5>
                                  <div className={`w-2 h-2 rounded-full ${
                                    officer.status === 'available' ? 'bg-emerald-500' :
                                    officer.status === 'busy' ? 'bg-amber-500' :
                                    'bg-gray-500'
                                  }`}></div>
                                </div>
                                <p className="text-xs text-gray-600">{officer.role}</p>
                              </div>
                            </div>
                            <Badge 
                              variant={officer.assignedIncidents < 3 ? "outline" : "secondary"} 
                              className="text-xs"
                            >
                              {officer.assignedIncidents}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                
                {/* Resolve Tab */}
                <TabsContent value="resolve" className="space-y-6 mt-6">
                  {/* Resolution Stats */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2 bg-blue-50 rounded-lg border border-blue-100">
                      <div className="text-xs font-medium text-blue-700">Assigned</div>
                      <div className="text-lg font-bold text-blue-800">
                        {incidents.filter(i => i.status === 'assigned').length}
                      </div>
                    </div>
                    <div className="p-2 bg-purple-50 rounded-lg border border-purple-100">
                      <div className="text-xs font-medium text-purple-700">Investigating</div>
                      <div className="text-lg font-bold text-purple-800">
                        {incidents.filter(i => i.status === 'under-investigation').length}
                      </div>
                    </div>
                  </div>

                  {/* Incident Selection */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">Select Incident to Resolve</Label>
                    <ScrollArea className="h-48">
                      <div className="space-y-2 pr-2">
                        {incidents
                          .filter(i => i.status === 'assigned' || i.status === 'under-investigation')
                          .map((incident) => (
                            <div
                              key={incident.id}
                              className={`p-3 rounded-lg border cursor-pointer transition-all ${
                                selectedIncident?.id === incident.id 
                                  ? 'bg-emerald-50 border-emerald-200' 
                                  : 'border-gray-200 hover:border-emerald-200'
                              }`}
                              onClick={() => setSelectedIncident(incident)}
                            >
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <Badge variant="outline" className={`text-xs ${
                                    incident.severity === 'Critical' ? 'border-red-200 text-red-700' :
                                    incident.severity === 'High' ? 'border-orange-200 text-orange-700' :
                                    'border-blue-200 text-blue-700'
                                  }`}>
                                    {incident.severity}
                                  </Badge>
                                  <span className="font-medium text-sm">{incident.id}</span>
                                </div>
                                <h5 className="font-semibold text-sm">{incident.title}</h5>
                                <p className="text-xs text-gray-600 truncate">{incident.description}</p>
                              </div>
                            </div>
                          ))
                        }
                      </div>
                    </ScrollArea>
                  </div>

                  {/* Resolution Form */}
                  {selectedIncident && (
                    <div className="space-y-4">
                      <div className="p-3 bg-gray-50 rounded-lg border">
                        <h5 className="font-semibold text-sm mb-1">{selectedIncident.title}</h5>
                        <p className="text-xs text-gray-600">{selectedIncident.description}</p>
                      </div>
                      
                      <div>
                        <Label htmlFor="resolution-notes" className="flex items-center gap-1.5 mb-1.5">
                          <FileText className="h-3.5 w-3.5" />
                          Resolution Notes *
                        </Label>
                        <Textarea
                          id="resolution-notes"
                          placeholder="Describe resolution steps..."
                          value={resolutionNotes}
                          onChange={(e) => setResolutionNotes(e.target.value)}
                          rows={3}
                          className="resize-none"
                        />
                        <div className="flex justify-between mt-1">
                          <p className="text-xs text-gray-500">Min. 50 characters</p>
                          <span className={`text-xs ${
                            resolutionNotes.length < 50 ? 'text-red-500' : 'text-emerald-500'
                          }`}>
                            {resolutionNotes.length}/50
                          </span>
                        </div>
                      </div>
                      
                      <Button
                        className="w-full bg-emerald-600 hover:bg-emerald-700"
                        onClick={() => handleResolveIncident(selectedIncident.id)}
                        disabled={!resolutionNotes.trim() || resolutionNotes.length < 50 || isLoading}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Mark as Resolved
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Live Activity Feed */}
      <LiveActivityFeed incidents={incidents} />

      {/* Footer Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-0 bg-gradient-to-br from-white to-green-50/50 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-600">System Status</div>
                <div className="text-lg font-bold text-green-600">Operational</div>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <ShieldCheck className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 bg-gradient-to-br from-white to-blue-50/50 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-600">Data Sync</div>
                <div className="text-lg font-bold text-blue-600">Real-time</div>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <Cloud className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 bg-gradient-to-br from-white to-amber-50/50 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-600">Response Time</div>
                <div className="text-lg font-bold text-amber-600">{stats.avgResponseTime}</div>
              </div>
              <div className="p-2 bg-amber-100 rounded-lg">
                <Timer className="h-5 w-5 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Incident Details Sheet */}
      <IncidentDetailsSheet 
        incident={selectedIncident}
        isOpen={isSheetOpen}
        onOpenChange={setIsSheetOpen}
        onAssign={() => setActiveTab('assign')}
        onResolve={() => setActiveTab('resolve')}
      />

      {/* Export Dialog */}
      <ExportDialog onExport={handleExportIncidents} />
    </div>
  )
}