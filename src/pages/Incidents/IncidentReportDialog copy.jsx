"use client"

import { useState } from "react"
import { format } from "date-fns"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  Plus,
  AlertTriangle,
  Clock,
  ChevronRight,
  FileText,
  HelpCircle,
  Calendar as CalendarIcon,
  Users,
  User,
  UserPlus,
  Eye,
  CheckCircle,
  Camera,
  Upload,
  FileQuestion,
  Check,
  UserX,
  Lock,
  AlertCircle,
  Shield,
  Save,
  Send,
  Building,
  MapPin,
  ChevronDown,
  ChevronUp,
  FileUp,
  BarChart3,
  Search,
  Filter,
} from "lucide-react"

// Sample data
const incidentTypes = [
  { 
    value: "near-miss", 
    label: "Near Miss", 
    color: "bg-amber-500", 
    code: "NM",
    description: "Incident that could have resulted in injury",
    icon: "⚠️"
  },
  { 
    value: "first-aid", 
    label: "First Aid", 
    color: "bg-orange-500", 
    code: "FA",
    description: "Minor injury requiring first aid treatment",
    icon: "🩹"
  },
  { 
    value: "medical-treatment", 
    label: "Medical Treatment", 
    color: "bg-red-500", 
    code: "MT",
    description: "Injury requiring professional medical treatment",
    icon: "🏥"
  },
  { 
    value: "lost-time", 
    label: "Lost Time Injury", 
    color: "bg-rose-700", 
    code: "LTI",
    description: "Injury resulting in lost work days",
    icon: "⏰"
  },
  { 
    value: "property-damage", 
    label: "Property Damage", 
    color: "bg-blue-500", 
    code: "PD",
    description: "Damage to equipment or property",
    icon: "🔧"
  },
  { 
    value: "environmental", 
    label: "Environmental", 
    color: "bg-emerald-500", 
    code: "ENV",
    description: "Environmental spill or release",
    icon: "🌿"
  },
  { 
    value: "security", 
    label: "Security", 
    color: "bg-violet-500", 
    code: "SEC",
    description: "Security breach or unauthorized access",
    icon: "🔒"
  },
]

const severityLevels = [
  { 
    level: "Critical", 
    color: "#EF4444", 
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    textColor: "text-red-700",
    description: "Life-threatening or multiple serious injuries"
  },
  { 
    level: "High", 
    color: "#F97316", 
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
    textColor: "text-orange-700",
    description: "Serious injury or major property damage"
  },
  { 
    level: "Medium", 
    color: "#EAB308", 
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-200",
    textColor: "text-yellow-700",
    description: "Moderate injury requiring medical treatment"
  },
  { 
    level: "Low", 
    color: "#22C55E", 
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200",
    textColor: "text-emerald-700",
    description: "Minor injury or near miss"
  },
]

const locations = [
  { value: "main-office", label: "Main Office", floor: "Floor 3", zone: "Zone A" },
  { value: "production-a", label: "Production Area A", floor: "Floor 1", zone: "Zone B" },
  { value: "warehouse", label: "Warehouse", floor: "Floor 2", zone: "Zone C" },
  { value: "lab", label: "Research Lab", floor: "Floor 4", zone: "Zone D" },
  { value: "parking", label: "Parking Lot", floor: "Ground", zone: "Zone E" },
]

export function IncidentReportDialog() {
  const [date, setDate] = useState(null)
  const [time, setTime] = useState("")
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [isConfidential, setIsConfidential] = useState(false)
  const [selectedSeverity, setSelectedSeverity] = useState("")
  const [description, setDescription] = useState("")
  const [injuredCount, setInjuredCount] = useState(0)
  const [witnessCount, setWitnessCount] = useState(0)
  const [activeTab, setActiveTab] = useState("basic")
  const [files, setFiles] = useState([])
  const [locationType, setLocationType] = useState("")
  const [customLocation, setCustomLocation] = useState("")

  const generateIncidentId = () => {
    const year = new Date().getFullYear()
    const month = (new Date().getMonth() + 1).toString().padStart(2, '0')
    const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
    return `IR-${year}${month}-${randomNum}`
  }

  const handleFileUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files)
    setFiles(prev => [...prev, ...uploadedFiles])
  }

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
  }

  const progress = {
    basic: 25,
    details: 50,
    evidence: 75,
    review: 100
  }

  const getCurrentProgress = () => {
    switch(activeTab) {
      case "basic": return 25
      case "details": return 50
      case "evidence": return 75
      case "review": return 100
      default: return 0
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="cursor-pointer bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold gap-2 shadow-md hover:shadow-lg transition-all">
          <Plus className="h-4 w-4" />
          Report Incident
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[1000px] max-h-[90vh] overflow-y-auto bg-white p-0 border-0 shadow-2xl">
        {/* Modern Header */}
        <div className="sticky top-0 z-50 bg-gradient-to-r from-slate-900 to-slate-800 text-white px-8 py-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white/10 backdrop-blur-sm rounded-xl">
                <AlertTriangle className="h-8 w-8" />
              </div>
              <div>
                <DialogTitle className="text-2xl font-bold">
                  New Incident Report
                </DialogTitle>
                <DialogDescription className="text-slate-300">
                  Complete all required fields for ISO 45001 compliance
                </DialogDescription>
                <div className="flex items-center gap-4 mt-3">
                  <Badge className="bg-white/20 hover:bg-white/30 border-0">
                    <Shield className="h-3 w-3 mr-1" />
                    Secure Submission
                  </Badge>
                  <div className="text-sm text-slate-300">
                    ID: <span className="font-mono font-bold">{generateIncidentId()}</span>
                  </div>
                </div>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-white hover:bg-white/20"
            >
              <HelpCircle className="h-4 w-4 mr-2" />
              Help
            </Button>
          </div>
        </div>

        {/* Progress Bar & Tabs */}
        <div className="sticky top-[104px] z-40 bg-white border-b">
          <div className="px-8 pt-4">
            <Progress value={getCurrentProgress()} className="h-2" />
            <Tabs 
              value={activeTab} 
              onValueChange={setActiveTab}
              className="mt-4"
            >
              <TabsList className="grid grid-cols-4 bg-transparent p-0 gap-2">
                <TabsTrigger 
                  value="basic" 
                  className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none py-3"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs">
                      1
                    </div>
                    <span className="font-medium">Basic Info</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger 
                  value="details" 
                  className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none py-3"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs">
                      2
                    </div>
                    <span className="font-medium">Details</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger 
                  value="evidence" 
                  className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none py-3"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs">
                      3
                    </div>
                    <span className="font-medium">Evidence</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger 
                  value="review" 
                  className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:border-b-2 data-[state=active]:border-blue-500 rounded-none py-3"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs">
                      4
                    </div>
                    <span className="font-medium">Review</span>
                  </div>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        <div className="px-8 py-6">
          {/* Basic Info Tab */}
          {activeTab === "basic" && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-blue-600" />
                    Incident Classification
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div className="space-y-3">
                        <Label className="text-sm font-semibold flex items-center gap-2">
                          Incident Type
                          <Badge variant="destructive" className="text-xs">Required</Badge>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <HelpCircle className="h-4 w-4 text-gray-400 cursor-help" />
                              </TooltipTrigger>
                              <TooltipContent className="max-w-xs">
                                Select the most appropriate category for this incident
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </Label>
                        <Select>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Select incident type" />
                          </SelectTrigger>
                          <SelectContent className="max-h-[300px]">
                            {incidentTypes.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
                                <div className="flex items-center gap-3 py-2">
                                  <div className={`w-3 h-3 rounded-full ${type.color}`} />
                                  <div className="flex-1">
                                    <div className="font-medium">{type.label}</div>
                                    <div className="text-xs text-gray-500">{type.description}</div>
                                  </div>
                                  <Badge variant="outline" className="text-xs">{type.code}</Badge>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-sm font-semibold">
                          Severity Level
                          <Badge variant="destructive" className="text-xs ml-2">Required</Badge>
                        </Label>
                        <div className="grid grid-cols-2 gap-3">
                          {severityLevels.map((level) => (
                            <button
                              key={level.level}
                              onClick={() => setSelectedSeverity(level.level)}
                              className={`
                                p-4 rounded-xl border-2 transition-all duration-200 text-left
                                hover:scale-[1.02] hover:shadow-md
                                ${selectedSeverity === level.level 
                                  ? `${level.borderColor} ${level.bgColor} ring-2 ring-offset-1 ${level.textColor}`
                                  : 'border-gray-200 hover:border-gray-300'
                                }
                              `}
                            >
                              <div className="flex items-center gap-3">
                                <div 
                                  className="w-4 h-4 rounded-full" 
                                  style={{ backgroundColor: level.color }}
                                />
                                <div>
                                  <div className="font-semibold">{level.level}</div>
                                  <div className="text-xs text-gray-600 mt-1">{level.description}</div>
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <Label className="text-sm font-semibold">
                            Date of Incident
                            <Badge variant="destructive" className="text-xs ml-2">Required</Badge>
                          </Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className="w-full h-12 justify-start text-left font-normal"
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {date ? format(date, "MMM dd, yyyy") : "Select date"}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                initialFocus
                                className="rounded-md border"
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                        <div className="space-y-3">
                          <Label className="text-sm font-semibold">
                            Time of Incident
                            <Badge variant="destructive" className="text-xs ml-2">Required</Badge>
                          </Label>
                          <Input 
                            type="time" 
                            className="h-12" 
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-sm font-semibold">
                          Location
                          <Badge variant="destructive" className="text-xs ml-2">Required</Badge>
                        </Label>
                        <div className="space-y-3">
                          <Select value={locationType} onValueChange={setLocationType}>
                            <SelectTrigger className="h-12">
                              <SelectValue placeholder="Select location from list" />
                            </SelectTrigger>
                            <SelectContent>
                              {locations.map((loc) => (
                                <SelectItem key={loc.value} value={loc.value}>
                                  <div className="flex items-center gap-3">
                                    <Building className="h-4 w-4 text-gray-400" />
                                    <div>
                                      <div className="font-medium">{loc.label}</div>
                                      <div className="text-xs text-gray-500">
                                        {loc.floor} • {loc.zone}
                                      </div>
                                    </div>
                                  </div>
                                </SelectItem>
                              ))}
                              <SelectItem value="custom">
                                <div className="flex items-center gap-3">
                                  <MapPin className="h-4 w-4 text-gray-400" />
                                  <span>Enter custom location</span>
                                </div>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          {locationType === "custom" && (
                            <Input
                              placeholder="Enter specific location details..."
                              className="h-12"
                              value={customLocation}
                              onChange={(e) => setCustomLocation(e.target.value)}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-between pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setActiveTab("details")}
                  className="gap-2"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Details Tab */}
          {activeTab === "details" && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-600" />
                    People Involved
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-4">
                      <Label className="text-sm font-semibold">Reported By</Label>
                      <Card className="border-blue-100 bg-blue-50">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-white rounded-full">
                              <User className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <div className="font-semibold">Alex Johnson</div>
                              <div className="text-sm text-gray-600">Safety Officer</div>
                              <div className="text-xs text-gray-500">Dept: Operations</div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label className="text-sm font-semibold">Injured Persons</Label>
                        <Badge variant={injuredCount > 0 ? "destructive" : "outline"}>
                          {injuredCount} affected
                        </Badge>
                      </div>
                      <div className="space-y-3">
                        <Input 
                          type="number" 
                          min="0" 
                          placeholder="0" 
                          className="h-12"
                          value={injuredCount}
                          onChange={(e) => setInjuredCount(parseInt(e.target.value) || 0)}
                        />
                        {injuredCount > 0 && (
                          <Button variant="outline" className="w-full gap-2">
                            <UserPlus className="h-4 w-4" />
                            Add injury details
                          </Button>
                        )}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label className="text-sm font-semibold">Witnesses</Label>
                        <Badge variant={witnessCount > 0 ? "default" : "outline"}>
                          {witnessCount} present
                        </Badge>
                      </div>
                      <div className="space-y-3">
                        <Input 
                          type="number" 
                          min="0" 
                          placeholder="0" 
                          className="h-12"
                          value={witnessCount}
                          onChange={(e) => setWitnessCount(parseInt(e.target.value) || 0)}
                        />
                        {witnessCount > 0 && (
                          <Button variant="outline" className="w-full gap-2">
                            <Eye className="h-4 w-4" />
                            Record statements
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-blue-600" />
                    Incident Narrative
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-semibold">
                        Detailed Description
                        <Badge variant="destructive" className="text-xs ml-2">Required</Badge>
                      </Label>
                      <span className="text-sm text-gray-500">
                        {description.length}/2000 characters
                      </span>
                    </div>
                    <Textarea 
                      placeholder="Provide a clear, chronological account of what happened..."
                      className="min-h-[200px] resize-y p-4"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        Include sequence of events
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        Note environmental conditions
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        List equipment involved
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <Label className="text-sm font-semibold">Immediate Actions</Label>
                      <Textarea 
                        placeholder="First aid, notifications, area control..."
                        className="min-h-[120px]"
                      />
                    </div>
                    <div className="space-y-4">
                      <Label className="text-sm font-semibold">Equipment Involved</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select equipment type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="machinery">Machinery</SelectItem>
                          <SelectItem value="chemical">Chemical</SelectItem>
                          <SelectItem value="electrical">Electrical</SelectItem>
                          <SelectItem value="vehicle">Vehicle</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input placeholder="Equipment ID or details" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-between pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setActiveTab("basic")}
                  className="gap-2"
                >
                  <ChevronRight className="h-4 w-4 rotate-180" />
                  Back
                </Button>
                <Button 
                  onClick={() => setActiveTab("evidence")}
                  className="gap-2"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Evidence Tab */}
          {activeTab === "evidence" && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Camera className="h-5 w-5 text-blue-600" />
                    Evidence Collection
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                      <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-blue-400 transition-colors bg-gray-50/50">
                        <div className="max-w-md mx-auto">
                          <div className="p-4 bg-blue-100 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                            <FileUp className="h-10 w-10 text-blue-600" />
                          </div>
                          <h4 className="font-semibold text-lg mb-2">Upload Evidence</h4>
                          <p className="text-gray-600 mb-6">
                            Drag & drop files or click to browse
                          </p>
                          <label className="cursor-pointer">
                            <input
                              type="file"
                              multiple
                              className="hidden"
                              onChange={handleFileUpload}
                              accept="image/*,.pdf,.doc,.docx,.mp4"
                            />
                            <Button className="gap-2">
                              <Upload className="h-4 w-4" />
                              Browse Files
                            </Button>
                          </label>
                          <p className="text-sm text-gray-500 mt-4">
                            Supports images, PDF, documents, videos • Max 50MB total
                          </p>
                        </div>
                      </div>

                      {files.length > 0 && (
                        <div className="space-y-4">
                          <h4 className="font-semibold">Uploaded Files ({files.length})</h4>
                          <div className="space-y-2">
                            {files.map((file, index) => (
                              <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                                <div className="flex items-center gap-3">
                                  <FileText className="h-5 w-5 text-gray-400" />
                                  <div>
                                    <div className="font-medium text-sm">{file.name}</div>
                                    <div className="text-xs text-gray-500">
                                      {(file.size / 1024 / 1024).toFixed(2)} MB
                                    </div>
                                  </div>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeFile(index)}
                                  className="text-red-600 hover:text-red-700"
                                >
                                  Remove
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="space-y-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-sm font-semibold">
                            Evidence Checklist
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          {["Site photos", "Witness statements", "Equipment photos", "Medical reports", "Security footage"].map((item, index) => (
                            <div key={index} className="flex items-center gap-3">
                              <div className="w-5 h-5 border-2 border-gray-300 rounded flex items-center justify-center">
                                <Check className="h-3 w-3 text-green-600 hidden" />
                              </div>
                              <span className="text-sm">{item}</span>
                            </div>
                          ))}
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-sm font-semibold">
                            Reporting Options
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-gray-100 rounded-lg">
                                <UserX className="h-4 w-4" />
                              </div>
                              <div>
                                <Label className="font-medium">Anonymous</Label>
                                <p className="text-xs text-gray-500">Hide identity</p>
                              </div>
                            </div>
                            <Switch 
                              checked={isAnonymous}
                              onCheckedChange={setIsAnonymous}
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-gray-100 rounded-lg">
                                <Lock className="h-4 w-4" />
                              </div>
                              <div>
                                <Label className="font-medium">Confidential</Label>
                                <p className="text-xs text-gray-500">Restrict access</p>
                              </div>
                            </div>
                            <Switch 
                              checked={isConfidential}
                              onCheckedChange={setIsConfidential}
                            />
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-between pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setActiveTab("details")}
                  className="gap-2"
                >
                  <ChevronRight className="h-4 w-4 rotate-180" />
                  Back
                </Button>
                <Button 
                  onClick={() => setActiveTab("review")}
                  className="gap-2"
                >
                  Review & Submit
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Review Tab */}
          {activeTab === "review" && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    Review & Submit
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <div className="font-semibold text-blue-900">Review Checklist</div>
                        <div className="text-sm text-blue-700 mt-1">
                          Please review all information before submission
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-4 gap-4">
                    <Card className="text-center p-4">
                      <div className="text-3xl font-bold text-green-600">4</div>
                      <div className="text-sm text-gray-600">Sections Complete</div>
                    </Card>
                    <Card className="text-center p-4">
                      <div className="text-3xl font-bold text-red-600">2</div>
                      <div className="text-sm text-gray-600">Required Fields</div>
                    </Card>
                    <Card className="text-center p-4">
                      <div className="text-3xl font-bold text-blue-600">{files.length}</div>
                      <div className="text-sm text-gray-600">Files Attached</div>
                    </Card>
                    <Card className="text-center p-4">
                      <div className="text-3xl font-bold text-purple-600">
                        {selectedSeverity || "N/A"}
                      </div>
                      <div className="text-sm text-gray-600">Severity Level</div>
                    </Card>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold">Submission Summary</h4>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Incident ID:</span>
                          <span className="font-medium">{generateIncidentId()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Date & Time:</span>
                          <span className="font-medium">
                            {date ? format(date, "MMM dd, yyyy") : "Not set"} {time || ""}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Severity:</span>
                          <span className="font-medium">{selectedSeverity || "Not selected"}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Injured Persons:</span>
                          <span className="font-medium">{injuredCount}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Witnesses:</span>
                          <span className="font-medium">{witnessCount}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Attachments:</span>
                          <span className="font-medium">{files.length} files</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Shield className="h-4 w-4" />
                      <span>This report will be encrypted and stored with enterprise-grade security</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-between pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setActiveTab("evidence")}
                  className="gap-2"
                >
                  <ChevronRight className="h-4 w-4 rotate-180" />
                  Back to Evidence
                </Button>
                <div className="flex gap-3">
                  <Button 
                    variant="outline" 
                    className="gap-2"
                    onClick={() => console.log("Saved as draft")}
                  >
                    <Save className="h-4 w-4" />
                    Save Draft
                  </Button>
                  <Button 
                    className="gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
                    onClick={() => console.log("Submitted")}
                  >
                    <Send className="h-4 w-4" />
                    Submit Report
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}