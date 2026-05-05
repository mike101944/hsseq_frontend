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
  FileText
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

// Sample incidents data
const incidentsData = [
  {
    id: "INC-2024-001",
    title: "Slip and Fall in Warehouse A",
    date: "2024-06-15",
    time: "10:30 AM",
    location: "Warehouse A, Zone 3",
    severity: "High",
    status: "Open",
    category: "Slip/Trip",
    reportedBy: "John Doe",
    assignedTo: "Safety Officer 1",
    responseTime: "15 mins",
    investigationStatus: "In Progress",
    daysOpen: 2,
    priority: "Critical"
  },
  {
    id: "INC-2024-002",
    title: "Chemical Spill - Minor",
    date: "2024-06-14",
    time: "02:15 PM",
    location: "Lab 2, Building B",
    severity: "Medium",
    status: "Under Investigation",
    category: "Chemical",
    reportedBy: "Jane Smith",
    assignedTo: "Chem Safety Team",
    responseTime: "8 mins",
    investigationStatus: "Evidence Collection",
    daysOpen: 3,
    priority: "High"
  },
  {
    id: "INC-2024-003",
    title: "Equipment Malfunction",
    date: "2024-06-13",
    time: "09:45 AM",
    location: "Production Line 4",
    severity: "Low",
    status: "Resolved",
    category: "Equipment",
    reportedBy: "Mike Johnson",
    assignedTo: "Maintenance Team",
    responseTime: "25 mins",
    investigationStatus: "Completed",
    daysOpen: 0,
    priority: "Medium"
  },
  {
    id: "INC-2024-004",
    title: "Near Miss - Forklift Operation",
    date: "2024-06-12",
    time: "03:30 PM",
    location: "Loading Dock",
    severity: "Medium",
    status: "Review Pending",
    category: "Vehicle",
    reportedBy: "Sarah Williams",
    assignedTo: "Vehicle Safety",
    responseTime: "12 mins",
    investigationStatus: "Report Writing",
    daysOpen: 4,
    priority: "High"
  },
  {
    id: "INC-2024-005",
    title: "Fire Alarm False Positive",
    date: "2024-06-11",
    time: "11:20 AM",
    location: "Office Building",
    severity: "Low",
    status: "Closed",
    category: "Fire Safety",
    reportedBy: "Robert Chen",
    assignedTo: "Fire Safety Team",
    responseTime: "5 mins",
    investigationStatus: "Closed",
    daysOpen: 0,
    priority: "Low"
  },
  {
    id: "INC-2024-006",
    title: "Electrical Hazard Identified",
    date: "2024-06-10",
    time: "08:45 AM",
    location: "Control Room",
    severity: "High",
    status: "Open",
    category: "Electrical",
    reportedBy: "Lisa Brown",
    assignedTo: "Electrical Safety",
    responseTime: "18 mins",
    investigationStatus: "Initial Assessment",
    daysOpen: 6,
    priority: "Critical"
  },
  {
    id: "INC-2024-007",
    title: "First Aid Required - Minor Injury",
    date: "2024-06-09",
    time: "01:15 PM",
    location: "Workshop Area",
    severity: "Medium",
    status: "Under Investigation",
    category: "Medical",
    reportedBy: "Tom Wilson",
    assignedTo: "First Aid Team",
    responseTime: "7 mins",
    investigationStatus: "Witness Interviews",
    daysOpen: 7,
    priority: "Medium"
  },
  {
    id: "INC-2024-008",
    title: "Safety Guard Missing",
    date: "2024-06-08",
    time: "10:00 AM",
    location: "Machine Shop",
    severity: "Low",
    status: "Resolved",
    category: "Equipment Safety",
    reportedBy: "Emily Davis",
    assignedTo: "Machine Safety",
    responseTime: "30 mins",
    investigationStatus: "Completed",
    daysOpen: 0,
    priority: "Low"
  }
]

// Statistics data
const incidentStats = {
  total: 42,
  open: 12,
  resolved: 28,
  overdue: 2,
  avgResponseTime: "12.4 mins",
  trend: "+8%",
  severityBreakdown: {
    high: 8,
    medium: 18,
    low: 16
  },
  categoryBreakdown: {
    equipment: 15,
    chemical: 7,
    slipTrip: 6,
    electrical: 5,
    vehicle: 4,
    fire: 3,
    medical: 2
  }
}

// Quick actions
const quickActions = [
  { icon: Plus, label: "Report New Incident", color: "bg-blue-500", description: "Create new incident report" },
  { icon: FileText, label: "Generate Report", color: "bg-green-500", description: "Export incidents data" },
  { icon: BarChart3, label: "Analytics", color: "bg-purple-500", description: "View trends & insights" },
  { icon: Shield, label: "Safety Audit", color: "bg-amber-500", description: "Conduct safety review" }
]

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
      case "High": return "bg-red-100 text-red-800 border-red-200"
      case "Medium": return "bg-amber-100 text-amber-800 border-amber-200"
      case "Low": return "bg-green-100 text-green-800 border-green-200"
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

  // Get priority color
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "Critical": return "text-red-600"
      case "High": return "text-amber-600"
      case "Medium": return "text-blue-600"
      case "Low": return "text-green-600"
      default: return "text-gray-600"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Incidents Management</h1>
          <p className="text-gray-600 mt-1">Track, investigate, and resolve safety incidents across the organization</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="mr-2 h-4 w-4" />
              Report New Incident
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Report New Safety Incident</DialogTitle>
              <DialogDescription>
                Fill in the details below to report a new safety incident.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Incident Title</label>
                <Input placeholder="Brief description of the incident" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Severity</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select severity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="slip">Slip/Trip</SelectItem>
                      <SelectItem value="chemical">Chemical</SelectItem>
                      <SelectItem value="equipment">Equipment</SelectItem>
                      <SelectItem value="electrical">Electrical</SelectItem>
                      <SelectItem value="fire">Fire Safety</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Location</label>
                <Input placeholder="Where did the incident occur?" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <textarea 
                  className="w-full min-h-[100px] border border-gray-300 rounded-lg p-3 text-sm"
                  placeholder="Provide detailed description of the incident..."
                />
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Submit Incident Report
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-none shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Incidents</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{incidentStats.total}</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-4">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <span className="text-sm text-green-600">{incidentStats.trend} this month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Open Incidents</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{incidentStats.open}</p>
              </div>
              <div className="p-3 bg-red-50 rounded-lg">
                <Clock className="h-6 w-6 text-red-600" />
              </div>
            </div>
            <div className="mt-4">
              <Progress value={(incidentStats.open / incidentStats.total) * 100} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Response Time</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{incidentStats.avgResponseTime}</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <Activity className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-4">
              <TrendingDown className="h-4 w-4 text-green-500" />
              <span className="text-sm text-green-600">-2.3 mins from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Resolved Rate</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {Math.round((incidentStats.resolved / incidentStats.total) * 100)}%
                </p>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <CheckCircle className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-4">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <span className="text-sm text-green-600">+5% improvement</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActions.map((action, index) => (
          <button
            key={index}
            className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-sm transition-all cursor-pointer"
          >
            <div className={`p-3 rounded-lg ${action.color} bg-opacity-10`}>
              <action.icon className={`h-5 w-5 ${action.color.replace('bg-', 'text-')}`} />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-gray-900">{action.label}</h3>
              <p className="text-sm text-gray-600 mt-1">{action.description}</p>
            </div>
            <ChevronRight className="h-4 w-4 text-gray-400 ml-auto" />
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Incidents Table - Takes 2/3 space */}
        <div className="lg:col-span-2">
          <Card className="border-none shadow-sm">
            <CardHeader className="border-b">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-bold text-gray-900">All Incidents</CardTitle>
                  <CardDescription>Track and manage all safety incidents</CardDescription>
                </div>
                <div className="flex items-center gap-2 mt-4 sm:mt-0">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search incidents..."
                      className="pl-9 w-[200px]"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Select value={selectedSeverity} onValueChange={setSelectedSeverity}>
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Severity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Severity</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="Open">Open</SelectItem>
                      <SelectItem value="Under Investigation">Investigating</SelectItem>
                      <SelectItem value="Resolved">Resolved</SelectItem>
                      <SelectItem value="Closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Tabs */}
              <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
                <TabsList className="grid grid-cols-5">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="open">Open ({incidentsData.filter(i => i.status === "Open").length})</TabsTrigger>
                  <TabsTrigger value="investigation">Investigating ({incidentsData.filter(i => i.status === "Under Investigation").length})</TabsTrigger>
                  <TabsTrigger value="resolved">Resolved ({incidentsData.filter(i => i.status === "Resolved").length})</TabsTrigger>
                  <TabsTrigger value="closed">Closed ({incidentsData.filter(i => i.status === "Closed").length})</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>

            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[180px]">Incident ID</TableHead>
                      <TableHead>Title & Location</TableHead>
                      <TableHead>Severity</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredIncidents.map((incident) => (
                      <TableRow key={incident.id} className="hover:bg-gray-50">
                        <TableCell>
                          <div className="font-medium text-gray-900">{incident.id}</div>
                          <div className="text-sm text-gray-500 mt-1">
                            {incident.date} • {incident.time}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium text-gray-900">{incident.title}</div>
                          <div className="flex items-center text-sm text-gray-500 mt-1">
                            <MapPin className="h-3 w-3 mr-1" />
                            {incident.location}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={`${getSeverityColor(incident.severity)} border`}>
                            {incident.severity}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={`${getStatusColor(incident.status)} border`}>
                            {incident.status}
                          </Badge>
                          {incident.daysOpen > 0 && (
                            <div className="text-xs text-gray-500 mt-1">
                              {incident.daysOpen} day{incident.daysOpen !== 1 ? 's' : ''} open
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className={`font-medium ${getPriorityColor(incident.priority)}`}>
                            {incident.priority}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600 hover:text-red-700">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              {filteredIncidents.length === 0 && (
                <div className="text-center py-12">
                  <AlertTriangle className="h-12 w-12 text-gray-300 mx-auto" />
                  <h3 className="mt-4 text-lg font-medium text-gray-900">No incidents found</h3>
                  <p className="mt-1 text-gray-500">Try adjusting your search or filter criteria</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - Analytics & Actions */}
        <div className="space-y-6">
          {/* Severity Breakdown */}
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Severity Breakdown</CardTitle>
              <CardDescription>Distribution by severity level</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-red-700">High</span>
                  <span className="text-sm font-medium">{incidentStats.severityBreakdown.high}</span>
                </div>
                <Progress value={(incidentStats.severityBreakdown.high / incidentStats.total) * 100} 
                  className="h-2 bg-red-100 [&>div]:bg-red-500" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-amber-700">Medium</span>
                  <span className="text-sm font-medium">{incidentStats.severityBreakdown.medium}</span>
                </div>
                <Progress value={(incidentStats.severityBreakdown.medium / incidentStats.total) * 100} 
                  className="h-2 bg-amber-100 [&>div]:bg-amber-500" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-green-700">Low</span>
                  <span className="text-sm font-medium">{incidentStats.severityBreakdown.low}</span>
                </div>
                <Progress value={(incidentStats.severityBreakdown.low / incidentStats.total) * 100} 
                  className="h-2 bg-green-100 [&>div]:bg-green-500" />
              </div>
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Recent Activities</CardTitle>
              <CardDescription>Latest incident updates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { id: 1, action: "INC-2024-006 assigned to Electrical Safety", time: "2 hours ago", user: "Lisa Brown" },
                { id: 2, action: "INC-2024-004 investigation completed", time: "4 hours ago", user: "Sarah Williams" },
                { id: 3, action: "New incident reported: INC-2024-008", time: "Yesterday", user: "Emily Davis" },
                { id: 4, action: "INC-2024-002 severity upgraded to Medium", time: "2 days ago", user: "Safety Officer" },
              ].map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className="h-2 w-2 bg-blue-500 rounded-full mt-2" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{activity.action}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <User className="h-3 w-3 text-gray-400" />
                      <span className="text-xs text-gray-500">{activity.user}</span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-500">{activity.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Metrics */}
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Quick Metrics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-sm text-gray-600">Overdue</div>
                  <div className="text-2xl font-bold text-gray-900 mt-1">{incidentStats.overdue}</div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-sm text-gray-600">Avg Days Open</div>
                  <div className="text-2xl font-bold text-gray-900 mt-1">2.4</div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-sm text-gray-600">This Month</div>
                  <div className="text-2xl font-bold text-gray-900 mt-1">8</div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-sm text-gray-600">Top Category</div>
                  <div className="text-2xl font-bold text-gray-900 mt-1">Equipment</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Export Actions */}
          <Card className="border-none shadow-sm">
            <CardContent className="p-6">
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Download className="mr-2 h-4 w-4" />
                  Export to Excel
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  Generate PDF Report
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Filter className="mr-2 h-4 w-4" />
                  Advanced Filters
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Bottom Section - Category Breakdown */}
      <Card className="border-none shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-bold text-gray-900">Incident Categories</CardTitle>
              <CardDescription>Breakdown by incident type</CardDescription>
            </div>
            <Select defaultValue="month">
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4">
            {Object.entries(incidentStats.categoryBreakdown).map(([category, count]) => (
              <div key={category} className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">{count}</div>
                <div className="text-sm text-gray-600 capitalize mt-1">{category}</div>
                <div className="text-xs text-gray-500 mt-2">
                  {Math.round((count / incidentStats.total) * 100)}% of total
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}