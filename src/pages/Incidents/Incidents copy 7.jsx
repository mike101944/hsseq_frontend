"use client"

import * as React from "react"
import { 
  Plus, 
  Search, 
  Filter, 
  Download, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  ChevronRight,
  Eye,
  Edit,
  Trash2,
  Calendar,
  User,
  MapPin,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Heart,
  Beaker,
  ChevronDown,
  Mic,
  Shield,
  Activity,
  FileText,
  Smartphone,
  Stethoscope,
  AlertOctagon,
  Leaf,
  Flame,
  Camera,
  AlertCircle,
  ClipboardCheck,
  Target,
  ChartBar,
  Map,
  Lock,
  HelpCircle,
  Upload,
  FileSignature,
  Bell,
  Users,
  FileSpreadsheet,
  Award,
  WifiOff,
  UserX,
  UserPlus,
  FileQuestion,
  Check,
  Save,
  Send,
  ArrowUp,
  ArrowDown,
  Zap,
  Target as TargetIcon,
  Shield as ShieldIcon,
  TrendingUp as TrendingUpIcon,
  Activity as ActivityIcon,
  Clock as ClockIcon,
  AlertTriangle as AlertTriangleIcon,
  RefreshCw,
  MoreVertical,
  ChevronUp,
  PieChart,
  LineChart,
  BarChart,
  Grid3x3,
  Settings,
  BellRing,
  FileBarChart,
  ShieldCheck,
  Sparkles,
  Rocket,
  Target as Target2,
  TrendingDown as TrendingDownIcon,
  Percent,
  Gauge,
  Thermometer,
  Lightbulb,
  Brain,
  AlertOctagon as AlertOctagonIcon,
  AlertCircle as AlertCircleIcon,
  CheckSquare,
  XCircle,
  PauseCircle,
  PlayCircle,
  StopCircle,
  SkipForward,
  SkipBack,
  FastForward,
  Rewind,
  Wifi,
  Cloud,
  CloudOff,
  Database,
  Server,
  HardDrive,
  Cpu,
  MemoryStick,
  ShieldOff,
  ShieldPlus,
  ShieldAlert,
  ShieldMinus,
  ShieldQuestion,
  ShieldX,
  ShieldCheck as ShieldCheckIcon,
  Shield as Shield2,
  Timer,
  Phone ,
  TimerOff,
  TimerReset,
  Hourglass,
  CalendarDays,
  CalendarCheck,
  CalendarX,
  CalendarPlus,
  CalendarMinus,
  CalendarRange,
  CalendarClock,
} from "lucide-react"
import { format, subDays, startOfMonth, endOfMonth, eachDayOfInterval } from "date-fns"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {MobileReportingDialog} from"./MobileReportingDialog"
import {IncidentReportDialog} from"./IncidentReportDialog"

// Statistics data with enhanced metrics
const dashboardStats = {
  totalIncidents: 156,
  activeInvestigations: 12,
  resolvedThisMonth: 42,
  ltiRate: 1.8,
  avgResponseTime: "8m 24s",
  safetyIndex: 92.5,
  trend: "+12.3%",
  complianceScore: 98.7,
  daysWithoutLTI: 45,
  openCAPA: 8,
  anonymousReports: 18,
  riskExposure: 24.3,
}

// Enhanced incident data with more details
const incidentsData = [
  {
    id: "INC-2024-001",
    title: "Slip and Fall - Warehouse A",
    date: "2024-06-15",
    time: "10:30 AM",
    location: "Warehouse A, Zone 3",
    severity: "Critical",
    status: "Investigation",
    type: "injury",
    category: "Slip/Trip",
    reportedBy: "John Doe",
    assignedTo: "Safety Officer 1",
    responseTime: "15 mins",
    investigationStatus: "In Progress",
    daysOpen: 2,
    priority: "Critical",
    ltiDays: 5,
    rcaMethod: "5whys",
    capaStatus: "pending",
    riskScore: 18,
    anonymous: false,
    evidence: 3,
    witnesses: 2,
    temperature: "High",
    humidity: "Normal",
    equipment: "Forklift A",
    shift: "Day",
    department: "Logistics",
    costEstimate: "$5,200",
  },
  {
    id: "INC-2024-002",
    title: "Chemical Spill - Lab 2",
    date: "2024-06-14",
    time: "02:15 PM",
    location: "Lab 2, Building B",
    severity: "High",
    status: "Evidence Collection",
    type: "environmental",
    category: "Chemical",
    reportedBy: "Anonymous",
    assignedTo: "Chem Safety Team",
    responseTime: "8 mins",
    investigationStatus: "Ongoing",
    daysOpen: 3,
    priority: "High",
    ltiDays: 0,
    rcaMethod: "fishbone",
    capaStatus: "in-progress",
    riskScore: 14,
    anonymous: true,
    evidence: 2,
    witnesses: 1,
    temperature: "Controlled",
    humidity: "Low",
    equipment: "Storage Cabinet C",
    shift: "Night",
    department: "R&D",
    costEstimate: "$3,800",
  },
  {
    id: "INC-2024-003",
    title: "Electrical Panel Hazard",
    date: "2024-06-13",
    time: "09:45 AM",
    location: "Maintenance Room",
    severity: "Medium",
    status: "CAPA Planning",
    type: "electrical",
    category: "Electrical",
    reportedBy: "Mike Wilson",
    assignedTo: "Electrical Team",
    responseTime: "12 mins",
    investigationStatus: "Completed",
    daysOpen: 4,
    priority: "Medium",
    ltiDays: 0,
    rcaMethod: "fmea",
    capaStatus: "completed",
    riskScore: 9,
    anonymous: false,
    evidence: 4,
    witnesses: 0,
    temperature: "Normal",
    humidity: "High",
    equipment: "Main Panel B",
    shift: "Day",
    department: "Maintenance",
    costEstimate: "$1,500",
  },
  {
    id: "INC-2024-004",
    title: "Near Miss - Falling Object",
    date: "2024-06-12",
    time: "11:20 AM",
    location: "Assembly Line 3",
    severity: "Low",
    status: "Resolved",
    type: "near-miss",
    category: "Fall Protection",
    reportedBy: "Sarah Chen",
    assignedTo: "Line Supervisor",
    responseTime: "6 mins",
    investigationStatus: "Closed",
    daysOpen: 0,
    priority: "Low",
    ltiDays: 0,
    rcaMethod: "5whys",
    capaStatus: "verified",
    riskScore: 6,
    anonymous: false,
    evidence: 1,
    witnesses: 3,
    temperature: "Normal",
    humidity: "Normal",
    equipment: "Conveyor Belt",
    shift: "Day",
    department: "Production",
    costEstimate: "$0",
  },
]

// Risk trend data for charts
const riskTrendData = [
  { day: "Mon", incidents: 12, risk: 18 },
  { day: "Tue", incidents: 8, risk: 14 },
  { day: "Wed", incidents: 15, risk: 22 },
  { day: "Thu", incidents: 6, risk: 10 },
  { day: "Fri", incidents: 11, risk: 16 },
  { day: "Sat", incidents: 3, risk: 6 },
  { day: "Sun", incidents: 2, risk: 4 },
]

// Severity distribution
const severityDistribution = [
  { level: "Critical", count: 3, color: "bg-red-500" },
  { level: "High", count: 8, color: "bg-orange-500" },
  { level: "Medium", count: 12, color: "bg-yellow-500" },
  { level: "Low", count: 18, color: "bg-blue-500" },
  { level: "Minor", count: 24, color: "bg-green-500" },
]

// Department performance
const departmentPerformance = [
  { name: "Production", incidents: 42, trend: "-12%", score: 85 },
  { name: "Logistics", incidents: 28, trend: "+8%", score: 72 },
  { name: "Maintenance", incidents: 19, trend: "-5%", score: 88 },
  { name: "R&D", incidents: 15, trend: "-15%", score: 92 },
  { name: "Quality", incidents: 8, trend: "-20%", score: 95 },
]

export function Incidents() {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [selectedSeverity, setSelectedSeverity] = React.useState("all")
  const [selectedStatus, setSelectedStatus] = React.useState("all")
  const [activeTab, setActiveTab] = React.useState("overview")
  const [timeRange, setTimeRange] = React.useState("30d")
  const [dashboardView, setDashboardView] = React.useState("standard")

  // Generate recent activity data
  const recentActivity = [
    { id: 1, action: "New incident reported", user: "John Doe", time: "5 min ago", icon: AlertTriangleIcon },
    { id: 2, action: "RCA completed for INC-2024-001", user: "Sarah Chen", time: "1 hour ago", icon: TargetIcon },
    { id: 3, action: "CAPA verified and closed", user: "Mike Wilson", time: "2 hours ago", icon: CheckCircle },
    { id: 4, action: "Safety audit completed", user: "System", time: "4 hours ago", icon: ShieldCheck },
    { id: 5, action: "Training session completed", user: "Safety Team", time: "1 day ago", icon: Users },
  ]

  // Get severity badge color
  const getSeverityColor = (severity) => {
    switch (severity) {
      case "Critical": return "bg-gradient-to-r from-red-500 to-red-600"
      case "High": return "bg-gradient-to-r from-orange-500 to-orange-600"
      case "Medium": return "bg-gradient-to-r from-amber-500 to-amber-600"
      case "Low": return "bg-gradient-to-r from-blue-500 to-blue-600"
      case "Minor": return "bg-gradient-to-r from-emerald-500 to-emerald-600"
      default: return "bg-gradient-to-r from-gray-500 to-gray-600"
    }
  }

  // Get priority badge color
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "Critical": return "text-red-600 bg-red-50 border-red-200"
      case "High": return "text-orange-600 bg-orange-50 border-orange-200"
      case "Medium": return "text-amber-600 bg-amber-50 border-amber-200"
      case "Low": return "text-blue-600 bg-blue-50 border-blue-200"
      default: return "text-gray-600 bg-gray-50 border-gray-200"
    }
  }

  // Filter incidents based on search and filters
  const filteredIncidents = incidentsData.filter(incident => {
    const matchesSearch = searchQuery === "" || 
      incident.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      incident.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      incident.location.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesSeverity = selectedSeverity === "all" || incident.severity === selectedSeverity
    const matchesStatus = selectedStatus === "all" || incident.status === selectedStatus

    return matchesSearch && matchesSeverity && matchesStatus
  })

  // Main dashboard layout
  return (
    <div className="space-y-6 p-6 bg-linear-to-b from-gray-50/50 to-white min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-linear-to-r from-amber-500 to-yellow-500 rounded-lg shadow-lg">
              <ShieldCheck className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight bg-linear-to-r from-amber-900 via-yellow-800 to-amber-800 bg-clip-text text-transparent">
              Safety Intelligence Dashboard
            </h1>
          </div>
          <p className="text-gray-600">
            Real-time incident monitoring, risk analysis, and safety compliance
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search incidents, locations, people..."
              className="pl-9 w-full sm:w-64 bg-white/80 backdrop-blur-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="gap-2 bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white font-semibold shadow-lg hover:shadow-xl">
                  <Plus className="h-4 w-4" />
                  New Report
                </Button>
              </DialogTrigger>
              <IncidentReportDialog />
            </Dialog>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="gap-2 border-amber-200 hover:border-amber-300 hover:bg-amber-50">
                  <Smartphone className="h-4 w-4" />
                  Mobile
                </Button>
              </DialogTrigger>
              <MobileReportingDialog />
            </Dialog>
          </div>
        </div>
      </div>

      {/* Main Stats Cards - 4 Beautiful Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1: Safety Index */}
        <Card className="border-none shadow-lg bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100/50">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-2 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-lg shadow-sm">
                    <ShieldCheckIcon className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-sm font-medium text-amber-700">Safety Index</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-amber-900">{dashboardStats.safetyIndex}</span>
                  <Badge className="bg-green-100 text-green-800 border-green-200">
                    <TrendingUpIcon className="h-3 w-3 mr-1" />
                    +2.3%
                  </Badge>
                </div>
                <p className="text-sm text-amber-600 mt-2">Overall safety performance score</p>
              </div>
              <div className="relative w-20 h-20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-2xl font-bold text-amber-700">
                    {Math.round(dashboardStats.safetyIndex)}%
                  </div>
                </div>
                <svg className="w-20 h-20 transform -rotate-90">
                  <circle
                    cx="40"
                    cy="40"
                    r="36"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    className="text-amber-200"
                  />
                  <circle
                    cx="40"
                    cy="40"
                    r="36"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${dashboardStats.safetyIndex * 2.26} 226`}
                    className="text-amber-500"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-amber-200/50">
              <div className="flex items-center justify-between text-sm">
                <span className="text-amber-600">Target: 95%</span>
                <span className="font-medium text-amber-700">On track</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Card 2: Active Incidents */}
        <Card className="border-none shadow-lg bg-gradient-to-br from-white to-blue-50">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-sm">
                    <ActivityIcon className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-sm font-medium text-blue-700">Active Incidents</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-blue-900">{dashboardStats.activeInvestigations}</span>
                  <Badge className="bg-red-100 text-red-800 border-red-200">
                    <AlertTriangleIcon className="h-3 w-3 mr-1" />
                    +3
                  </Badge>
                </div>
                <p className="text-sm text-blue-600 mt-2">Currently under investigation</p>
              </div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center shadow-inner">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                    <AlertTriangleIcon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="absolute -bottom-2 -right-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-xs font-bold text-white">{dashboardStats.totalIncidents}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-blue-200/50">
              <div className="grid grid-cols-2 gap-2">
                <div className="text-center">
                  <div className="text-lg font-bold text-blue-900">8m 24s</div>
                  <div className="text-xs text-blue-600">Avg Response</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-green-900">42</div>
                  <div className="text-xs text-green-600">Resolved This Month</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Card 3: Risk Exposure */}
        <Card className="border-none shadow-lg bg-gradient-to-br from-red-50 via-orange-50 to-red-50/50">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-2 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg shadow-sm">
                    <Thermometer className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-sm font-medium text-red-700">Risk Exposure</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-red-900">{dashboardStats.riskExposure}</span>
                  <Badge className="bg-green-100 text-green-800 border-green-200">
                    <TrendingDownIcon className="h-3 w-3 mr-1" />
                    -8.2%
                  </Badge>
                </div>
                <p className="text-sm text-red-600 mt-2">Current risk level across sites</p>
              </div>
              <div className="relative">
                <div className="w-16 h-16 relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 rounded-full opacity-20"></div>
                  <div className="absolute inset-2 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                    <Gauge className="h-8 w-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2">
                    <div className="w-6 h-6 bg-gradient-to-r from-red-600 to-orange-600 rounded-full flex items-center justify-center">
                      <span className="text-[10px] font-bold text-white">!</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-red-200/50">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-red-600">Critical Areas</span>
                  <span className="font-bold text-red-700">3</span>
                </div>
                <Progress value={65} className="h-2 bg-red-100 [&>div]:bg-gradient-to-r from-red-500 to-orange-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Card 4: LTI Performance */}
        <Card className="border-none shadow-lg bg-gradient-to-br from-emerald-50 via-green-50 to-emerald-50/50">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-2 bg-gradient-to-r from-emerald-500 to-green-500 rounded-lg shadow-sm">
                    <Award className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-sm font-medium text-emerald-700">LTI-Free Days</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-emerald-900">{dashboardStats.daysWithoutLTI}</span>
                  <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">
                    <Zap className="h-3 w-3 mr-1" />
                    Record
                  </Badge>
                </div>
                <p className="text-sm text-emerald-600 mt-2">Days without lost time injury</p>
              </div>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-green-200 rounded-full flex items-center justify-center shadow-inner">
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full flex items-center justify-center animate-pulse">
                    <Sparkles className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-emerald-200/50">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-lg font-bold text-emerald-900">{dashboardStats.ltiRate}</div>
                  <div className="text-xs text-emerald-600">LTI Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-emerald-900">98.7%</div>
                  <div className="text-xs text-emerald-600">Compliance</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Charts & Analytics */}
        <div className="lg:col-span-2 space-y-6">
          {/* Risk Trend Chart */}
          <Card className="border-none shadow-sm">
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Risk Trend Analysis</CardTitle>
                  <CardDescription>7-day risk exposure and incident correlation</CardDescription>
                </div>
                <Select defaultValue="7d">
                  <SelectTrigger className="w-28">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7d">7 Days</SelectItem>
                    <SelectItem value="30d">30 Days</SelectItem>
                    <SelectItem value="90d">90 Days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full"></div>
                      <span className="text-sm">Risk Score</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
                      <span className="text-sm">Incidents</span>
                    </div>
                  </div>
                  <Badge variant="outline" className="border-amber-200 text-amber-700">
                    <TrendingDownIcon className="h-3 w-3 mr-1" />
                    Risk down 12%
                  </Badge>
                </div>
                <div className="h-64 relative">
                  {/* Chart simulation */}
                  <div className="absolute inset-0 flex items-end justify-between px-4 pb-4">
                    {riskTrendData.map((data, index) => (
                      <div key={index} className="flex flex-col items-center" style={{ width: '14%' }}>
                        <div className="relative w-full">
                          <div 
                            className="w-full bg-gradient-to-t from-blue-500/20 to-blue-600/40 rounded-t"
                            style={{ height: `${(data.incidents / 15) * 100}%` }}
                          />
                          <div 
                            className="absolute bottom-0 w-full bg-gradient-to-t from-amber-500/40 to-yellow-500/60 rounded-t"
                            style={{ height: `${(data.risk / 25) * 100}%` }}
                          />
                        </div>
                        <div className="text-xs text-gray-500 mt-2">{data.day}</div>
                        <div className="text-xs font-medium mt-1">
                          {data.incidents} / {data.risk}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Active Incidents Table */}
          <Card className="border-none shadow-sm">
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Active Investigations</CardTitle>
                  <CardDescription>Real-time incident tracking and status</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Select value={selectedSeverity} onValueChange={setSelectedSeverity}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Severity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Severity</SelectItem>
                      <SelectItem value="Critical">Critical</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="icon">
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-32">Incident ID</TableHead>
                      <TableHead>Details</TableHead>
                      <TableHead className="w-24">Severity</TableHead>
                      <TableHead className="w-32">Status</TableHead>
                      <TableHead className="w-24">Days</TableHead>
                      <TableHead className="w-20">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredIncidents.map((incident) => (
                      <TableRow key={incident.id} className="hover:bg-gray-50/50">
                        <TableCell className="font-mono font-medium">
                          <span className="text-gray-900">{incident.id}</span>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium text-gray-900">{incident.title}</div>
                          <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {incident.location}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {incident.time}
                            </div>
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="outline" className="text-xs">
                              {incident.department}
                            </Badge>
                            {incident.anonymous && (
                              <Badge variant="outline" className="text-xs">
                                <Lock className="h-3 w-3 mr-1" />
                                Anonymous
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-1">
                            <Badge className={`text-white border-0 ${getSeverityColor(incident.severity)}`}>
                              {incident.severity}
                            </Badge>
                            <div className="text-xs font-medium text-gray-500">
                              Score: {incident.riskScore}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-2">
                            <Badge variant="outline" className={getPriorityColor(incident.priority)}>
                              {incident.status}
                            </Badge>
                            <div className="text-xs text-gray-500">
                              {incident.investigationStatus}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="font-medium">{incident.daysOpen}d</span>
                            {incident.ltiDays > 0 && (
                              <span className="text-xs text-red-600">
                                +{incident.ltiDays} LTI days
                              </span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>View Details</TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>Edit Incident</TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-40 p-2">
                                <div className="space-y-1">
                                  <Button variant="ghost" className="w-full justify-start text-sm">
                                    <FileText className="h-3 w-3 mr-2" />
                                    RCA Analysis
                                  </Button>
                                  <Button variant="ghost" className="w-full justify-start text-sm">
                                    <ClipboardCheck className="h-3 w-3 mr-2" />
                                    CAPA Tracking
                                  </Button>
                                  <Button variant="ghost" className="w-full justify-start text-sm">
                                    <Download className="h-3 w-3 mr-2" />
                                    Export
                                  </Button>
                                </div>
                              </PopoverContent>
                            </Popover>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
            <CardFooter className="border-t">
              <div className="w-full flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  Showing {filteredIncidents.length} of {incidentsData.length} incidents
                </div>
                <Button variant="outline" size="sm">
                  View All Incidents
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>

        {/* Right Column - Analytics & Tools */}
        <div className="space-y-6">
          {/* Department Performance */}
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-amber-600" />
                Department Performance
              </CardTitle>
              <CardDescription>Safety performance by department</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {departmentPerformance.map((dept, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">{dept.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold">{dept.incidents}</span>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${
                            dept.trend.startsWith('+') 
                              ? 'border-red-200 text-red-700 bg-red-50'
                              : 'border-green-200 text-green-700 bg-green-50'
                          }`}
                        >
                          {dept.trend}
                        </Badge>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Progress value={dept.score} className="h-2" />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Safety Score</span>
                        <span className="font-medium">{dept.score}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Analytics */}
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <PieChart className="h-5 w-5 text-amber-600" />
                Quick Analytics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-amber-50 to-yellow-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-amber-900">98.7%</div>
                  <div className="text-sm text-amber-600 mt-1">Compliance</div>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-blue-900">8m 24s</div>
                  <div className="text-sm text-blue-600 mt-1">Avg Response</div>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-green-900">42</div>
                  <div className="text-sm text-green-600 mt-1">Resolved</div>
                </div>
                <div className="bg-gradient-to-br from-red-50 to-orange-100 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-red-900">12</div>
                  <div className="text-sm text-red-600 mt-1">Investigating</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Activity className="h-5 w-5 text-amber-600" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div className="p-2 bg-gradient-to-r from-amber-100 to-yellow-100 rounded-lg">
                      <activity.icon className="h-4 w-4 text-amber-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-gray-500">{activity.user}</span>
                        <span className="text-xs text-amber-600">•</span>
                        <span className="text-xs text-gray-500">{activity.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Emergency Contacts */}
          <Card className="border-none shadow-sm bg-gradient-to-br from-red-50/50 to-orange-50/50">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2 text-red-700">
                <AlertCircle className="h-5 w-5" />
                Emergency Contacts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-red-600" />
                  <span className="text-sm font-medium">Site Emergency: 555-0123</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-red-600" />
                  <span className="text-sm font-medium">Safety Officer: 555-0124</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4 text-red-600" />
                  <span className="text-sm font-medium">First Aid: 555-0125</span>
                </div>
              </div>
              <Button variant="outline" className="w-full border-red-200 text-red-700 hover:bg-red-50">
                <Bell className="h-4 w-4 mr-2" />
                Emergency Alert
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer Section */}
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