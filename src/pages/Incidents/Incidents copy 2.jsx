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
  Shield,
  Activity,
  FileText,
  Smartphone,
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
  Award
} from "lucide-react"
import { format } from "date-fns"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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

// 1. INCIDENT REPORTING TYPES - ISO 45001 Compliant
const incidentTypes = [
  { value: "injury", label: "Injury/Illness", color: "text-red-600" },
  { value: "near-miss", label: "Near Miss", color: "text-amber-600" },
  { value: "property-damage", label: "Property Damage", color: "text-blue-600" },
  { value: "environmental", label: "Environmental Spill", color: "text-green-600" },
  { value: "security", label: "Security Breach", color: "text-purple-600" },
  { value: "fire", label: "Fire Incident", color: "text-orange-600" },
  { value: "electrical", label: "Electrical Hazard", color: "text-yellow-600" },
  { value: "chemical", label: "Chemical Exposure", color: "text-pink-600" },
  { value: "ergonomic", label: "Ergonomic Issue", color: "text-indigo-600" },
  { value: "quality", label: "Quality Defect", color: "text-cyan-600" }
]

// 2. RISK MATRIX SEVERITY LEVELS
const severityLevels = [
  { level: "Critical", color: "bg-red-500", description: "Fatality/permanent disability" },
  { level: "High", color: "bg-orange-500", description: "Major injury/lost time" },
  { level: "Medium", color: "bg-yellow-500", description: "Medical treatment required" },
  { level: "Low", color: "bg-blue-500", description: "First aid/minor injury" },
  { level: "Minor", color: "bg-green-500", description: "No injury/property damage only" }
]

// 3. RCA METHODS
const rcaMethods = [
  { id: "5whys", name: "5 Whys Method", icon: HelpCircle },
  { id: "fishbone", name: "Fishbone Diagram", icon: Target },
  { id: "fmea", name: "FMEA Analysis", icon: ChartBar },
  { id: "pareto", name: "Pareto Analysis", icon: BarChart3 }
]

// 4. CAPA STATUS
const capaStatus = [
  { id: "pending", label: "Pending", color: "bg-yellow-100 text-yellow-800" },
  { id: "in-progress", label: "In Progress", color: "bg-blue-100 text-blue-800" },
  { id: "completed", label: "Completed", color: "bg-green-100 text-green-800" },
  { id: "verified", label: "Verified", color: "bg-purple-100 text-purple-800" },
  { id: "overdue", label: "Overdue", color: "bg-red-100 text-red-800" }
]

// Sample incidents data with enhanced fields
const incidentsData = [
  {
    id: "INC-2024-001",
    title: "Slip and Fall in Warehouse A",
    date: "2024-06-15",
    time: "10:30 AM",
    location: "Warehouse A, Zone 3",
    severity: "Critical",
    status: "Open",
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
    riskScore: 16,
    anonymous: false,
    evidence: ["photo1.jpg", "witness_statement.pdf"]
  },
  {
    id: "INC-2024-002",
    title: "Chemical Spill - Minor",
    date: "2024-06-14",
    time: "02:15 PM",
    location: "Lab 2, Building B",
    severity: "Medium",
    status: "Under Investigation",
    type: "environmental",
    category: "Chemical",
    reportedBy: "Anonymous",
    assignedTo: "Chem Safety Team",
    responseTime: "8 mins",
    investigationStatus: "Evidence Collection",
    daysOpen: 3,
    priority: "High",
    ltiDays: 0,
    rcaMethod: "fishbone",
    capaStatus: "in-progress",
    riskScore: 9,
    anonymous: true,
    evidence: ["spill_photo.jpg", "msds.pdf"]
  }
]

// Add more sample data...

// Statistics data with ISO metrics
const incidentStats = {
  total: 42,
  open: 12,
  resolved: 28,
  overdue: 2,
  avgResponseTime: "12.4 mins",
  trend: "+8%",
  severityBreakdown: {
    critical: 3,
    high: 8,
    medium: 12,
    low: 11,
    minor: 8
  },
  categoryBreakdown: {
    injury: 15,
    "near-miss": 10,
    environmental: 7,
    security: 5,
    property: 5
  },
  lti: {
    totalCases: 5,
    totalDays: 45,
    frequencyRate: 2.1,
    severityRate: 18.3
  }
}

// Quick actions with HSSEQ features
const quickActions = [
  { icon: Plus, label: "Report New Incident", color: "bg-blue-500", description: "Multi-type reporting" },
  { icon: Smartphone, label: "Mobile Report", color: "bg-green-500", description: "Scan & upload photos" },
  { icon: Target, label: "RCA Analysis", color: "bg-purple-500", description: "Root cause investigation" },
  { icon: ClipboardCheck, label: "CAPA Tracking", color: "bg-amber-500", description: "Corrective actions" },
  { icon: FileSpreadsheet, label: "OSHA Reports", color: "bg-red-500", description: "Regulatory compliance" },
  { icon: Map, label: "Heat Maps", color: "bg-indigo-500", description: "Incident hotspots" }
]

// New Component: Mobile Reporting Dialog
function MobileReportingDialog() {
  const [anonymous, setAnonymous] = React.useState(false)
  const [photos, setPhotos] = React.useState([])

  return (
    <DialogContent className="sm:max-w-125">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <Smartphone className="h-5 w-5" />
          Mobile Incident Report
        </DialogTitle>
        <DialogDescription>
          Report incidents quickly using your mobile device
        </DialogDescription>
      </DialogHeader>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="h-4 w-4" />
            <Label htmlFor="anonymous">Anonymous Report</Label>
          </div>
          <Switch
            id="anonymous"
            checked={anonymous}
            onCheckedChange={setAnonymous}
          />
        </div>

        <div className="space-y-2">
          <Label>Incident Type</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select incident type" />
            </SelectTrigger>
            <SelectContent>
              {incidentTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  <span className={`font-medium ${type.color}`}>{type.label}</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Take Photos (Optional)</Label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
            <Camera className="h-8 w-8 text-gray-400 mx-auto" />
            <Button variant="outline" className="mt-2">
              <Upload className="mr-2 h-4 w-4" />
              Upload Photos
            </Button>
            <p className="text-xs text-gray-500 mt-2">
              Take photos of the incident location
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Voice/Text Description</Label>
          <Textarea placeholder="Describe what happened..." />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Location</Label>
            <Input placeholder="GPS/Area" />
          </div>
          <div className="space-y-2">
            <Label>Time of Incident</Label>
            <Input type="time" />
          </div>
        </div>

        <Button className="w-full">
          <CheckCircle className="mr-2 h-4 w-4" />
          Submit Incident Report
        </Button>
      </div>
    </DialogContent>
  )
}

// New Component: RCA Analysis Dialog
function RCAAnalysisDialog() {
  const [selectedMethod, setSelectedMethod] = React.useState("5whys")

  return (
    <DialogContent className="sm:max-w-175">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <Target className="h-5 w-5" />
          Root Cause Analysis
        </DialogTitle>
        <DialogDescription>
          Select analysis method and investigate root causes
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-6">
        <div>
          <Label>Select RCA Method</Label>
          <div className="grid grid-cols-2 gap-3 mt-2">
            {rcaMethods.map((method) => (
              <div
                key={method.id}
                className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                  selectedMethod === method.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => setSelectedMethod(method.id)}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-100 rounded">
                    <method.icon className="h-4 w-4" />
                  </div>
                  <span className="font-medium">{method.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {selectedMethod === "5whys" && (
          <div className="space-y-4">
            <h4 className="font-semibold">5 Whys Analysis</h4>
            {[1, 2, 3, 4, 5].map((num) => (
              <div key={num} className="space-y-2">
                <Label>Why #{num}</Label>
                <Textarea placeholder={`Enter why #${num}...`} />
              </div>
            ))}
          </div>
        )}

        <div className="space-y-4">
          <h4 className="font-semibold">Evidence Attachments</h4>
          <div className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <Label>Upload Evidence</Label>
                <p className="text-sm text-gray-500">Photos, videos, documents</p>
              </div>
              <Button variant="outline" size="sm">
                <Upload className="mr-2 h-4 w-4" />
                Add Files
              </Button>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span className="text-sm">witness_statement.pdf</span>
                </div>
                <Button variant="ghost" size="sm">View</Button>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Root Cause Summary</Label>
          <Textarea placeholder="Summarize the root cause..." rows={4} />
        </div>

        <Button className="w-full">
          Complete RCA Analysis
        </Button>
      </div>
    </DialogContent>
  )
}

// New Component: CAPA Tracking Dialog
function CAPATrackingDialog() {
  const [tasks, setTasks] = React.useState([
    { id: 1, title: "Install anti-slip mats", assignedTo: "John Doe", dueDate: "2024-06-25", status: "in-progress" },
    { id: 2, title: "Safety training", assignedTo: "Jane Smith", dueDate: "2024-06-20", status: "pending" },
  ])

  return (
    <DialogContent className="sm:max-w-150">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <ClipboardCheck className="h-5 w-5" />
          Corrective & Preventive Actions
        </DialogTitle>
        <DialogDescription>
          Track and manage actions to prevent recurrence
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-semibold">Action Items</h4>
            <p className="text-sm text-gray-500">Assign tasks with due dates</p>
          </div>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Action
          </Button>
        </div>

        <div className="space-y-3">
          {tasks.map((task) => (
            <div key={task.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="font-medium">{task.title}</h5>
                  <div className="flex items-center gap-4 mt-1">
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <User className="h-3 w-3" />
                      {task.assignedTo}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Calendar className="h-3 w-3" />
                      Due: {task.dueDate}
                    </div>
                  </div>
                </div>
                <Badge className={capaStatus.find(s => s.id === task.status)?.color}>
                  {capaStatus.find(s => s.id === task.status)?.label}
                </Badge>
              </div>
              
              <div className="flex items-center gap-2 mt-3">
                <Button variant="outline" size="sm">
                  <Bell className="h-4 w-4 mr-2" />
                  Remind
                </Button>
                <Button variant="outline" size="sm">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Verify
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t">
          <h4 className="font-semibold mb-3">Verification & Effectiveness Check</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Actions Completed?</Label>
              <Switch />
            </div>
            <div className="space-y-2">
              <Label>Effectiveness Comments</Label>
              <Textarea placeholder="Describe how actions prevent recurrence..." />
            </div>
            <div className="space-y-2">
              <Label>Verified By</Label>
              <Input placeholder="Manager/Supervisor name" />
            </div>
          </div>
        </div>

        <Button className="w-full">Close CAPA</Button>
      </div>
    </DialogContent>
  )
}

// New Component: Risk Matrix Display
function RiskMatrix() {
  const matrix = [
    [20, 16, 12, 8, 4],
    [16, 12, 9, 6, 3],
    [12, 9, 6, 4, 2],
    [8, 6, 4, 3, 1],
    [4, 3, 2, 1, 1]
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Risk Matrix</CardTitle>
        <CardDescription>ISO 45001 Risk Assessment</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">Likelihood</span>
            <span className="font-medium">Severity</span>
          </div>
          
          <div className="grid grid-cols-6 gap-1">
            <div className="col-span-1"></div>
            {['Minor', 'Low', 'Medium', 'High', 'Critical'].map((label, idx) => (
              <div key={idx} className="text-xs font-medium text-center p-2">
                {label}
              </div>
            ))}
            
            {['Very Likely', 'Likely', 'Possible', 'Unlikely', 'Rare'].map((likelihood, rowIdx) => (
              <>
                <div key={`label-${rowIdx}`} className="text-xs font-medium p-2">
                  {likelihood}
                </div>
                {matrix[rowIdx].map((score, colIdx) => (
                  <div
                    key={`cell-${rowIdx}-${colIdx}`}
                    className={`p-3 text-center text-sm font-bold rounded ${
                      score >= 16 ? 'bg-red-500 text-white' :
                      score >= 9 ? 'bg-orange-500 text-white' :
                      score >= 6 ? 'bg-yellow-500 text-white' :
                      score >= 3 ? 'bg-blue-500 text-white' :
                      'bg-green-500 text-white'
                    }`}
                  >
                    {score}
                  </div>
                ))}
              </>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// New Component: LTI Tracker
function LTITracker() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="h-5 w-5" />
          Lost Time Injury (LTI) Tracking
        </CardTitle>
        <CardDescription>ISO 45001 Performance Indicators</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-2xl font-bold">{incidentStats.lti.totalCases}</div>
            <div className="text-sm text-gray-600">Total LTI Cases</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="text-2xl font-bold">{incidentStats.lti.totalDays}</div>
            <div className="text-sm text-gray-600">Total Lost Days</div>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Frequency Rate</span>
            <span className="font-bold">{incidentStats.lti.frequencyRate}</span>
          </div>
          <Progress value={incidentStats.lti.frequencyRate * 10} className="h-2" />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Severity Rate</span>
            <span className="font-bold">{incidentStats.lti.severityRate}</span>
          </div>
          <Progress value={incidentStats.lti.severityRate} className="h-2" />
        </div>
        
        <Button variant="outline" className="w-full">
          <FileSignature className="h-4 w-4 mr-2" />
          Generate OSHA Report
        </Button>
      </CardContent>
    </Card>
  )
}

// New Component: Heat Map
function IncidentHeatMap() {
  const locations = [
    { name: "Warehouse A", incidents: 8, risk: "High" },
    { name: "Lab 2", incidents: 5, risk: "Medium" },
    { name: "Production Line", incidents: 12, risk: "Critical" },
    { name: "Loading Dock", incidents: 3, risk: "Low" },
    { name: "Office Building", incidents: 2, risk: "Low" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Map className="h-5 w-5" />
          Incident Heat Map
        </CardTitle>
        <CardDescription>Geographic incident distribution</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {locations.map((location, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">{location.name}</span>
                <Badge className={
                  location.risk === "Critical" ? "bg-red-100 text-red-800" :
                  location.risk === "High" ? "bg-orange-100 text-orange-800" :
                  location.risk === "Medium" ? "bg-yellow-100 text-yellow-800" :
                  "bg-green-100 text-green-800"
                }>
                  {location.risk}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1">
                  <div className="h-2 rounded-full overflow-hidden bg-gray-200">
                    <div 
                      className={`h-full ${
                        location.risk === "Critical" ? "bg-red-500" :
                        location.risk === "High" ? "bg-orange-500" :
                        location.risk === "Medium" ? "bg-yellow-500" :
                        "bg-green-500"
                      }`}
                      style={{ width: `${Math.min(location.incidents * 10, 100)}%` }}
                    />
                  </div>
                </div>
                <span className="text-sm text-gray-600">{location.incidents} incidents</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export function Incidents() {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [selectedSeverity, setSelectedSeverity] = React.useState("all")
  const [selectedStatus, setSelectedStatus] = React.useState("all")
  const [activeTab, setActiveTab] = React.useState("all")

  // Filter incidents based on search and filters
  const filteredIncidents = incidentsData.filter(incident => {
    const matchesSearch = searchQuery === "" || 
      incident.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      incident.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      incident.location.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesSeverity = selectedSeverity === "all" || incident.severity === selectedSeverity
    const matchesStatus = selectedStatus === "all" || incident.status === selectedStatus
    const matchesTab = activeTab === "all" || 
      (activeTab === "open" && incident.status === "Open") ||
      (activeTab === "investigation" && incident.status === "Under Investigation") ||
      (activeTab === "resolved" && incident.status === "Resolved") ||
      (activeTab === "closed" && incident.status === "Closed")

    return matchesSearch && matchesSeverity && matchesStatus && matchesTab
  })

  // Get severity badge color
  const getSeverityColor = (severity) => {
    switch (severity) {
      case "Critical": return "bg-red-100 text-red-800 border-red-200"
      case "High": return "bg-orange-100 text-orange-800 border-orange-200"
      case "Medium": return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Low": return "bg-blue-100 text-blue-800 border-blue-200"
      case "Minor": return "bg-green-100 text-green-800 border-green-200"
      default: return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  // Get status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case "Open": return "bg-red-50 text-red-700 border-red-200"
      case "Under Investigation": return "bg-blue-50 text-blue-700 border-blue-200"
      case "Resolved": return "bg-green-50 text-green-700 border-green-200"
      case "Closed": return "bg-gray-50 text-gray-700 border-gray-200"
      case "Review Pending": return "bg-purple-50 text-purple-700 border-purple-200"
      default: return "bg-gray-50 text-gray-700 border-gray-200"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Incident Management System</h1>
          <p className="text-gray-600 mt-1">ISO 45001 Compliant HSSEQ Incident Management</p>
        </div>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Smartphone className="h-4 w-4" />
                Mobile Report
              </Button>
            </DialogTrigger>
            <MobileReportingDialog />
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700 gap-2">
                <Plus className="h-4 w-4" />
                Report Incident
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-175">
              <DialogHeader>
                <DialogTitle>New Incident Report (ISO 45001)</DialogTitle>
                <DialogDescription>Complete incident reporting with all required fields</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Incident Type *</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {incidentTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            <span className={`font-medium ${type.color}`}>{type.label}</span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Severity *</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select severity" />
                      </SelectTrigger>
                      <SelectContent>
                        {severityLevels.map((level) => (
                          <SelectItem key={level.level} value={level.level.toLowerCase()}>
                            {level.level}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Description *</Label>
                  <Textarea placeholder="Detailed description of the incident..." rows={4} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Location *</Label>
                    <Input placeholder="Exact location" />
                  </div>
                  <div className="space-y-2">
                    <Label>Date & Time *</Label>
                    <div className="flex gap-2">
                      <Input type="date" />
                      <Input type="time" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Attach Evidence (Photos, Videos)</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Upload className="h-8 w-8 text-gray-400" />
                      <Button variant="outline">Browse Files</Button>
                      <p className="text-sm text-gray-500">JPEG, PNG, PDF, MP4 up to 10MB</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Switch id="anonymous-report" />
                  <Label htmlFor="anonymous-report">Submit as Anonymous Report</Label>
                </div>

                <Button className="w-full">Submit Incident Report</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        <Card className="border-none shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600">Total Incidents</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{incidentStats.total}</p>
              </div>
              <div className="p-2 bg-blue-50 rounded-lg">
                <AlertTriangle className="h-4 w-4 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600">LTI Cases</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{incidentStats.lti.totalCases}</p>
              </div>
              <div className="p-2 bg-red-50 rounded-lg">
                <AlertCircle className="h-4 w-4 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600">Avg Response</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{incidentStats.avgResponseTime}</p>
              </div>
              <div className="p-2 bg-green-50 rounded-lg">
                <Activity className="h-4 w-4 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600">Open CAPA</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">8</p>
              </div>
              <div className="p-2 bg-amber-50 rounded-lg">
                <ClipboardCheck className="h-4 w-4 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600">Anonymous</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">12</p>
              </div>
              <div className="p-2 bg-purple-50 rounded-lg">
                <Lock className="h-4 w-4 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-600">Resolved %</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {Math.round((incidentStats.resolved / incidentStats.total) * 100)}%
                </p>
              </div>
              <div className="p-2 bg-indigo-50 rounded-lg">
                <CheckCircle className="h-4 w-4 text-indigo-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {quickActions.map((action, index) => (
          <Dialog key={index}>
            <DialogTrigger asChild>
              <button className="flex flex-col items-center gap-2 p-4 bg-white border border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-sm transition-all cursor-pointer">
                <div className={`p-3 rounded-lg ${action.color} bg-opacity-10`}>
                  <action.icon className={`h-5 w-5 ${action.color.replace('bg-', 'text-')}`} />
                </div>
                <div className="text-center">
                  <h3 className="text-sm font-semibold text-gray-900">{action.label}</h3>
                  <p className="text-xs text-gray-600 mt-1">{action.description}</p>
                </div>
              </button>
            </DialogTrigger>
            {action.label === "RCA Analysis" && <RCAAnalysisDialog />}
            {action.label === "CAPA Tracking" && <CAPATrackingDialog />}
            {action.label === "Mobile Report" && <MobileReportingDialog />}
          </Dialog>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Table */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-none shadow-sm">
            <CardHeader className="border-b">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-bold text-gray-900">Incidents Dashboard</CardTitle>
                  <CardDescription>Real-time incident tracking and management</CardDescription>
                </div>
                <div className="flex items-center gap-2 mt-4 sm:mt-0">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search incidents..."
                      className="pl-9 w-50"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Select value={selectedSeverity} onValueChange={setSelectedSeverity}>
                    <SelectTrigger className="w-30">
                      <SelectValue placeholder="Severity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Severity</SelectItem>
                      {severityLevels.map((level) => (
                        <SelectItem key={level.level} value={level.level}>
                          {level.level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
                <TabsList className="grid grid-cols-5">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="open">Open</TabsTrigger>
                  <TabsTrigger value="investigation">Investigating</TabsTrigger>
                  <TabsTrigger value="capa">CAPA</TabsTrigger>
                  <TabsTrigger value="closed">Closed</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>

            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Incident ID</TableHead>
                      <TableHead>Type & Title</TableHead>
                      <TableHead>Severity/Risk</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>LTI Days</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredIncidents.map((incident) => (
                      <TableRow key={incident.id} className="hover:bg-gray-50">
                        <TableCell className="font-medium">{incident.id}</TableCell>
                        <TableCell>
                          <div className="font-medium">{incident.title}</div>
                          <div className="flex items-center text-sm text-gray-500 mt-1">
                            <MapPin className="h-3 w-3 mr-1" />
                            {incident.location}
                          </div>
                          {incident.anonymous && (
                            <Badge variant="outline" className="mt-1 text-xs">
                              <Lock className="h-3 w-3 mr-1" />
                              Anonymous
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-1">
                            <Badge className={`${getSeverityColor(incident.severity)} border`}>
                              {incident.severity}
                            </Badge>
                            <div className="text-xs text-gray-500">
                              Risk: {incident.riskScore}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={`${getStatusColor(incident.status)} border`}>
                            {incident.status}
                          </Badge>
                          <div className="flex gap-2 mt-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button size="sm" variant="outline" className="h-6 text-xs">
                                  RCA
                                </Button>
                              </DialogTrigger>
                              <RCAAnalysisDialog />
                            </Dialog>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button size="sm" variant="outline" className="h-6 text-xs">
                                  CAPA
                                </Button>
                              </DialogTrigger>
                              <CAPATrackingDialog />
                            </Dialog>
                          </div>
                        </TableCell>
                        <TableCell>
                          {incident.ltiDays > 0 ? (
                            <div className="font-bold text-red-600">{incident.ltiDays} days</div>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <RiskMatrix />
            <LTITracker />
          </div>
        </div>

        {/* Right Column - Analytics & Tools */}
        <div className="space-y-6">
          <IncidentHeatMap />
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Investigation Tools</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <FileText className="mr-2 h-4 w-4" />
                Witness Statements
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Camera className="mr-2 h-4 w-4" />
                Photo Gallery
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Users className="mr-2 h-4 w-4" />
                Investigation Team
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Regulatory Reports</CardTitle>
              <CardDescription>ISO 45001 & OSHA Compliance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <FileSpreadsheet className="mr-2 h-4 w-4" />
                OSHA 300 Log
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <FileSpreadsheet className="mr-2 h-4 w-4" />
                OSHA 300A Summary
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <FileSpreadsheet className="mr-2 h-4 w-4" />
                OSHA 301 Report
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <FileText className="mr-2 h-4 w-4" />
                ISO 45001 Audit Report
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Incident Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">This Month</span>
                  <span className="font-bold">8 incidents</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Last Month</span>
                  <span className="font-bold">6 incidents</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Quarterly Trend</span>
                  <span className="font-bold text-green-600">↓ 12%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Bottom Section - Workflow Status */}
      <Card className="border-none shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-900">Incident Workflow Status</CardTitle>
          <CardDescription>ISO 45001 Complaint Incident Management Workflow</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-5 gap-4">
            {['Draft', 'Review', 'Investigation', 'CAPA', 'Closed'].map((step, index) => (
              <div key={step} className="text-center">
                <div className={`h-2 rounded-full mb-4 ${
                  index === 0 ? 'bg-blue-500' :
                  index === 1 ? 'bg-purple-500' :
                  index === 2 ? 'bg-amber-500' :
                  index === 3 ? 'bg-green-500' :
                  'bg-gray-500'
                }`} />
                <div className="font-medium">{step}</div>
                <div className="text-2xl font-bold mt-2">
                  {index === 0 ? 8 :
                   index === 1 ? 6 :
                   index === 2 ? 4 :
                   index === 3 ? 3 :
                   21}
                </div>
                <div className="text-sm text-gray-500 mt-1">incidents</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}