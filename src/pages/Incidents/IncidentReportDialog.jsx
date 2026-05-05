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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  Plus,
  AlertTriangle,
  Clock,
  ChevronRight,
  ChevronLeft,
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
  FileUp,
  Check,
  UserX,
  Lock,
  AlertCircle,
  Shield,
  Save,
  Send,
  Building,
  MapPin,
  FileText as FileTextIcon,
  Image,
  Video,
  File,
  X,
  Download,
  BarChart,
  Bell,
  ExternalLink,
  Edit,
  Trash2,
  MessageSquare,
} from "lucide-react"

// Sample data
const incidentTypes = [
  { 
    value: "near-miss", 
    label: "Near Miss", 
    color: "bg-amber-500", 
    code: "NM",
    description: "Incident that could have resulted in injury"
  },
  { 
    value: "first-aid", 
    label: "First Aid Injury", 
    color: "bg-amber-400", 
    code: "FAI",
    description: "Minor injury requiring first aid treatment"
  },
  { 
    value: "medical-treatment", 
    label: "Medical Treatment", 
    color: "bg-orange-500", 
    code: "MTI",
    description: "Injury requiring professional medical treatment"
  },
  { 
    value: "lost-time", 
    label: "Lost Time Injury", 
    color: "bg-orange-600", 
    code: "LTI",
    description: "Injury resulting in lost work days"
  },
  { 
    value: "property-damage", 
    label: "Property Damage", 
    color: "bg-yellow-600", 
    code: "PD",
    description: "Damage to equipment or property"
  },
  { 
    value: "environmental", 
    label: "Environmental", 
    color: "bg-yellow-500", 
    code: "ENV",
    description: "Environmental spill or release"
  },
  { 
    value: "security", 
    label: "Security", 
    color: "bg-yellow-700", 
    code: "SEC",
    description: "Security breach or unauthorized access"
  },
  { 
    value: "fire", 
    label: "Fire", 
    color: "bg-red-500", 
    code: "FIRE",
    description: "Fire or explosion incident"
  },
]

const severityLevels = [
  { 
    level: "Critical", 
    color: "#DC2626", 
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    textColor: "text-red-700",
    icon: "🚨",
    description: "Life-threatening injuries or fatalities"
  },
  { 
    level: "High", 
    color: "#F97316", 
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
    textColor: "text-orange-700",
    icon: "⚠️",
    description: "Serious injuries or major damage"
  },
  { 
    level: "Medium", 
    color: "#EAB308", 
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
    textColor: "text-amber-700",
    icon: "📋",
    description: "Moderate injuries requiring treatment"
  },
  { 
    level: "Low", 
    color: "#22C55E", 
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200",
    textColor: "text-emerald-700",
    icon: "ℹ️",
    description: "Minor injuries or near misses"
  },
]

const locations = [
  { value: "main-office", label: "Main Office Building", floor: "3rd Floor", zone: "Zone A" },
  { value: "production-a", label: "Production Area A", floor: "1st Floor", zone: "Zone B" },
  { value: "production-b", label: "Production Area B", floor: "1st Floor", zone: "Zone C" },
  { value: "warehouse", label: "Warehouse Facility", floor: "2nd Floor", zone: "Zone D" },
  { value: "laboratory", label: "Research Laboratory", floor: "4th Floor", zone: "Zone E" },
  { value: "parking", label: "Parking Area", floor: "Ground Level", zone: "Zone F" },
  { value: "cafeteria", label: "Cafeteria", floor: "Ground Floor", zone: "Zone G" },
]

const equipmentTypes = [
  { value: "machinery", label: "Machinery & Equipment", icon: "⚙️" },
  { value: "chemical", label: "Chemical Substances", icon: "🧪" },
  { value: "electrical", label: "Electrical Systems", icon: "⚡" },
  { value: "vehicle", label: "Vehicles & Mobile Equipment", icon: "🚗" },
  { value: "hand-tools", label: "Hand Tools", icon: "🔨" },
  { value: "ppe", label: "Personal Protective Equipment", icon: "🛡️" },
  { value: "scaffolding", label: "Scaffolding & Platforms", icon: "🪜" },
  { value: "other", label: "Other Equipment", icon: "📦" },
]

const fileTypes = {
  'image/jpeg': { icon: <Image className="h-5 w-5" />, color: "bg-blue-100 text-blue-600" },
  'image/png': { icon: <Image className="h-5 w-5" />, color: "bg-blue-100 text-blue-600" },
  'application/pdf': { icon: <FileTextIcon className="h-5 w-5" />, color: "bg-red-100 text-red-600" },
  'video/mp4': { icon: <Video className="h-5 w-5" />, color: "bg-purple-100 text-purple-600" },
  'default': { icon: <File className="h-5 w-5" />, color: "bg-gray-100 text-gray-600" }
}

export function IncidentReportDialog() {
  const [date, setDate] = useState(null)
  const [time, setTime] = useState("")
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [isConfidential, setIsConfidential] = useState(false)
  const [selectedSeverity, setSelectedSeverity] = useState("")
  const [description, setDescription] = useState("")
  const [injuredCount, setInjuredCount] = useState(0)
  const [witnessCount, setWitnessCount] = useState(0)
  const [currentStep, setCurrentStep] = useState(1)
  const [files, setFiles] = useState([])
  const [location, setLocation] = useState("")
  const [customLocation, setCustomLocation] = useState("")
  const [equipmentType, setEquipmentType] = useState("")
  const [equipmentDetails, setEquipmentDetails] = useState("")
  const [immediateActions, setImmediateActions] = useState("")
  const [incidentType, setIncidentType] = useState("")
  const [injuredPersons, setInjuredPersons] = useState([])
  const [witnesses, setWitnesses] = useState([])
  const [showInjuredDetails, setShowInjuredDetails] = useState(false)
  const [showWitnessDetails, setShowWitnessDetails] = useState(false)

  const steps = [
    { id: 1, title: "Basic Info", icon: <FileText className="h-4 w-4" /> },
    { id: 2, title: "Details", icon: <Users className="h-4 w-4" /> },
    { id: 3, title: "Evidence", icon: <Camera className="h-4 w-4" /> },
    { id: 4, title: "Review", icon: <CheckCircle className="h-4 w-4" /> },
  ]

  const generateIncidentId = () => {
    const year = new Date().getFullYear()
    const month = (new Date().getMonth() + 1).toString().padStart(2, '0')
    const day = new Date().getDate().toString().padStart(2, '0')
    const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
    return `IR-${year}${month}${day}-${randomNum}`
  }

  const handleFileUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files)
    if (uploadedFiles.some(file => file.size > 50 * 1024 * 1024)) {
      alert("File size exceeds 50MB limit")
      return
    }
    setFiles(prev => [...prev, ...uploadedFiles])
  }

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
  }

  const getFileIcon = (fileType) => {
    return fileTypes[fileType] || fileTypes.default
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const progressPercentage = (currentStep / steps.length) * 100

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleAddInjuredDetails = () => {
    if (injuredCount > 0) {
      setShowInjuredDetails(true)
      // In a real app, you would open a modal or form for adding injured person details
      console.log("Opening injured person details form")
      
      // For demo, let's add some sample injured persons
      if (injuredPersons.length === 0) {
        const sampleInjured = Array.from({ length: injuredCount }, (_, i) => ({
          id: i + 1,
          name: `Injured Person ${i + 1}`,
          injury: "Minor abrasion",
          status: "Treated",
        }))
        setInjuredPersons(sampleInjured)
      }
    }
  }

  const handleAddWitnessDetails = () => {
    if (witnessCount > 0) {
      setShowWitnessDetails(true)
      console.log("Opening witness details form")
      
      // For demo, let's add some sample witnesses
      if (witnesses.length === 0) {
        const sampleWitnesses = Array.from({ length: witnessCount }, (_, i) => ({
          id: i + 1,
          name: `Witness ${i + 1}`,
          department: "Operations",
          statement: "Available for interview",
        }))
        setWitnesses(sampleWitnesses)
      }
    }
  }

  const handleRemoveInjuredPerson = (id) => {
    setInjuredPersons(prev => prev.filter(person => person.id !== id))
    setInjuredCount(prev => prev - 1)
  }

  const handleRemoveWitness = (id) => {
    setWitnesses(prev => prev.filter(witness => witness.id !== id))
    setWitnessCount(prev => prev - 1)
  }

  const handleSubmit = () => {
    // Validate required fields
    const errors = []
    
    if (!incidentType) errors.push("Incident type is required")
    if (!selectedSeverity) errors.push("Severity level is required")
    if (!date) errors.push("Date is required")
    if (!time) errors.push("Time is required")
    if (!location && !customLocation) errors.push("Location is required")
    if (!description.trim()) errors.push("Description is required")
    
    if (errors.length > 0) {
      alert("Please complete all required fields:\n" + errors.join("\n"))
      // Go back to first step with errors
      setCurrentStep(1)
      return
    }
    
    // Handle form submission
    const incidentData = {
      incidentId: generateIncidentId(),
      date: format(date, "yyyy-MM-dd"),
      time,
      incidentType,
      severity: selectedSeverity,
      location: location === "custom" ? customLocation : locations.find(l => l.value === location)?.label,
      description,
      injuredCount,
      witnessCount,
      injuredPersons,
      witnesses,
      files: files.map(f => ({ name: f.name, size: f.size, type: f.type })),
      equipmentType,
      equipmentDetails,
      immediateActions,
      isAnonymous,
      isConfidential,
      submittedAt: new Date().toISOString(),
    }
    
    console.log("Incident report submitted:", incidentData)
    
    // Show success message
    alert(`Incident Report ${incidentData.incidentId} submitted successfully!\n\nYour report has been logged and will be reviewed by the safety team.`)
    
    // Reset form (in a real app, you would close the dialog)
    // setCurrentStep(1)
    // resetForm()
  }

  const handleSaveDraft = () => {
    const draftData = {
      incidentId: generateIncidentId(),
      date,
      time,
      incidentType,
      severity: selectedSeverity,
      location: location === "custom" ? customLocation : location,
      description,
      injuredCount,
      witnessCount,
      injuredPersons,
      witnesses,
      files: files.length,
      equipmentType,
      equipmentDetails,
      immediateActions,
      isAnonymous,
      isConfidential,
      savedAt: new Date().toISOString(),
    }
    
    console.log("Draft saved:", draftData)
    alert("Draft saved successfully! You can continue later.")
  }

  const resetForm = () => {
    setDate(null)
    setTime("")
    setIncidentType("")
    setSelectedSeverity("")
    setDescription("")
    setInjuredCount(0)
    setWitnessCount(0)
    setInjuredPersons([])
    setWitnesses([])
    setFiles([])
    setLocation("")
    setCustomLocation("")
    setEquipmentType("")
    setEquipmentDetails("")
    setImmediateActions("")
    setIsAnonymous(false)
    setIsConfidential(false)
    setCurrentStep(1)
  }

  return (
     
      <DialogContent className="sm:max-w-[1000px] max-h-[100vh] overflow-y-auto bg-white p-0 border-0 shadow-2xl scrollbar-hide">
        {/* Header */}
        <div className="sticky top-0 z-50 bg-gradient-to-r from-amber-800 via-amber-400 to-yellow-400 text-white px-8 py-6 border-b border-amber-700">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white/10 backdrop-blur-sm rounded-xl shadow-lg">
                <AlertTriangle className="h-8 w-8" />
              </div>
              <div>
                <DialogTitle className="text-2xl font-bold tracking-tight">
                  Incident Report Form
                </DialogTitle>
                <DialogDescription className="text-amber-100 mt-1">
                  Complete all required fields for safety compliance and investigation
                </DialogDescription>
                <div className="flex items-center gap-4 mt-3">
                  <Badge className="bg-white/20 hover:bg-white/30 border-0 backdrop-blur-sm">
                    <Shield className="h-3 w-3 mr-1" />
                    ISO 45001 Compliant
                  </Badge>
                  <div className="text-sm text-amber-100">
                    <span className="font-mono font-bold">{generateIncidentId()}</span>
                    <span className="ml-2 opacity-75">• {format(new Date(), 'MMM dd, yyyy')}</span>
                  </div>
                </div>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-white hover:bg-white/20 backdrop-blur-sm"
              onClick={() => console.log("Help clicked")}
            >
              <HelpCircle className="h-4 w-4 mr-2" />
              Help Guide
            </Button>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="sticky top-[120px] z-40 bg-white border-b">
          <div className="px-8 pt-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex-1">
                <Progress value={progressPercentage} className="h-2 bg-amber-100" />
              </div>
              <div className="ml-4 text-sm font-medium text-amber-700">
                Step {currentStep} of {steps.length}
              </div>
            </div>
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex flex-col items-center relative">
                  <button
                    onClick={() => setCurrentStep(step.id)}
                    className={`
                      flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300
                      ${currentStep >= step.id 
                        ? 'bg-amber-600 border-amber-600 text-white shadow-lg' 
                        : 'bg-white border-gray-300 text-gray-400'
                      }
                      ${currentStep === step.id ? 'ring-4 ring-amber-100 scale-110' : ''}
                    `}
                  >
                    {step.icon}
                  </button>
                  <span className={`
                    mt-2 text-sm font-medium transition-colors
                    ${currentStep >= step.id ? 'text-amber-700' : 'text-gray-500'}
                  `}>
                    {step.title}
                  </span>
                  {index < steps.length - 1 && (
                    <div className={`
                      absolute top-5 left-full w-16 h-0.5 transform -translate-y-1/2
                      ${currentStep > step.id ? 'bg-amber-600' : 'bg-gray-300'}
                    `} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="px-8 py-8">
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <div className="space-y-8">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-6">
                  <Card className="border-amber-100 shadow-sm">
                    <CardHeader className="bg-gradient-to-r from-amber-50 to-yellow-50 border-b border-amber-100">
                      <CardTitle className="text-amber-800 flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        Incident Classification
                      </CardTitle>
                      <CardDescription className="text-amber-600">
                        Select the type and severity of the incident
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-6">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Label className="text-sm font-semibold text-gray-700">
                            Incident Type <span className="text-red-500 ml-1">*</span>
                          </Label>
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
                        </div>
                        <Select value={incidentType} onValueChange={setIncidentType}>
                          <SelectTrigger className="h-12 border-gray-300 focus:ring-2 focus:ring-amber-500/20">
                            <SelectValue placeholder="Select incident type" />
                          </SelectTrigger>
                          <SelectContent className="max-h-[300px] bg-white">
                            {incidentTypes.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
                                <div className="flex items-center gap-3 py-2">
                                  <div className={`w-3 h-3 rounded-full ${type.color}`} />
                                  <div className="flex-1">
                                    <div className="font-medium">{type.label}</div>
                                    <div className="text-xs text-gray-500">{type.description}</div>
                                  </div>
                                  <Badge  className="text-xs bg-amber-50">
                                    {type.code}
                                  </Badge>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-sm font-semibold text-gray-700">
                          Severity Level <span className="text-red-500 ml-1">*</span>
                        </Label>
                        <div className="grid grid-cols-2 gap-3">
                          {severityLevels.map((level) => (
                            <button
                              key={level.level}
                              type="button"
                              onClick={() => setSelectedSeverity(level.level)}
                              className={`
                                p-4 rounded-lg border-2 transition-all duration-200 text-left
                                hover:shadow-md hover:-translate-y-0.5
                                ${selectedSeverity === level.level 
                                  ? `${level.borderColor} ${level.bgColor} ring-2 ring-offset-2 ring-amber-200`
                                  : 'border-gray-200 hover:border-gray-300'
                                }
                              `}
                            >
                              <div className="flex items-start gap-3">
                                <div className="text-xl">{level.icon}</div>
                                <div className="flex-1">
                                  <div className="font-semibold">{level.level}</div>
                                  <div className="text-xs text-gray-600 mt-1">{level.description}</div>
                                </div>
                                {selectedSeverity === level.level && (
                                  <CheckCircle className="h-5 w-5 text-green-500" />
                                )}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  <Card className="border-amber-100 shadow-sm">
                    <CardHeader className="bg-gradient-to-r from-amber-50 to-yellow-50 border-b border-amber-100">
                      <CardTitle className="text-amber-800 flex items-center gap-2">
                        <Clock className="h-5 w-5" />
                        Time & Location
                      </CardTitle>
                      <CardDescription className="text-amber-600">
                        When and where did the incident occur?
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <Label className="text-sm font-semibold text-gray-700">
                            Date <span className="text-red-500 ml-1">*</span>
                          </Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className="w-full h-12 justify-start text-left font-normal border-gray-300 hover:border-amber-300"
                              >
                                <CalendarIcon className="mr-2 h-4 w-4 text-emerald-400" />
                                {date ? format(date, "MMM dd, yyyy") : "Select date"}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto bg-white p-0 border-none" align="start">
                              <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                        <div className="space-y-3">
                          <Label className="text-sm font-semibold text-gray-700">
                            Time <span className="text-red-500 ml-1">*</span>
                          </Label>
                          <Input 
                            type="time" 
                            className="h-12" 
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Label className="text-sm font-semibold text-gray-700">
                            Location <span className="text-red-500 ml-1">*</span>
                          </Label>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <HelpCircle className="h-4 w-4 text-gray-400 cursor-help" />
                              </TooltipTrigger>
                              <TooltipContent className="max-w-xs">
                                Select from pre-defined locations or enter custom location
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                        <Select value={location} onValueChange={setLocation}>
                          <SelectTrigger className="h-12 border-gray-300">
                            <SelectValue placeholder="Select location" />
                          </SelectTrigger>
                          <SelectContent className="max-h-[300px] bg-white border-none">
                            <div className="px-2 py-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                              Pre-defined Locations
                            </div>
                            {locations.map((loc) => (
                              <SelectItem key={loc.value} value={loc.value}>
                                <div className="flex items-center gap-3">
                                  <Building className="h-4 w-4 text-gray-400" />
                                  <div className="flex-1">
                                    <div className="font-medium">{loc.label}</div>
                                    <div className="text-xs text-gray-500">
                                      {loc.floor} • {loc.zone}
                                    </div>
                                  </div>
                                </div>
                              </SelectItem>
                            ))}
                            <div className="px-2 py-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wider mt-2">
                              Custom Location
                            </div>
                            <SelectItem value="custom">
                              <div className="flex items-center gap-3">
                                <MapPin className="h-4 w-4 text-gray-400" />
                                <span>Enter custom location</span>
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        {location === "custom" && (
                          <Input
                            placeholder="Building, floor, room, GPS coordinates, etc."
                            className="h-12 mt-2"
                            value={customLocation}
                            onChange={(e) => setCustomLocation(e.target.value)}
                            required
                          />
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="flex justify-end pt-4 ">
                <Button 
                  onClick={handleNext}
                  disabled={!incidentType || !selectedSeverity || !date || !time || (!location && !customLocation)}
                  className="bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next: People Involved
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Details */}
          {currentStep === 2 && (
            <div className="space-y-8">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-6">
                  <Card className="border-amber-100 shadow-sm">
                    <CardHeader className="bg-gradient-to-r from-amber-50 to-yellow-50 border-b border-amber-100">
                      <CardTitle className="text-amber-800 flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        People Involved
                      </CardTitle>
                      <CardDescription className="text-amber-600">
                        Information about affected persons and witnesses
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <Label className="text-sm font-semibold text-gray-700">
                            Injured Persons
                          </Label>
                          <Badge variant={injuredCount > 0 ? "destructive" : "outline"}>
                            {injuredCount} affected
                          </Badge>
                        </div>
                        <div className="space-y-3">
                          <div className="flex gap-2">
                            <Input 
                              type="number" 
                              min="0" 
                              placeholder="0" 
                              className="h-12 flex-1"
                              value={injuredCount}
                              onChange={(e) => {
                                const value = parseInt(e.target.value) || 0
                                setInjuredCount(value)
                                // Clear injured persons if count is reduced
                                if (value < injuredPersons.length) {
                                  setInjuredPersons(prev => prev.slice(0, value))
                                }
                              }}
                            />
                            <Button 
                              variant="outline" 
                              className="gap-2 text-amber-700 hover:text-amber-800 hover:border-amber-300"
                              onClick={handleAddInjuredDetails}
                              disabled={injuredCount === 0}
                            >
                              <UserPlus className="h-4 w-4" />
                              Add Details
                            </Button>
                          </div>
                          
                          {showInjuredDetails && injuredPersons.length > 0 && (
                            <div className="mt-4 space-y-3">
                              <div className="text-sm font-medium text-gray-700">Injured Persons Details:</div>
                              {injuredPersons.map((person) => (
                                <div key={person.id} className="flex items-center justify-between p-3 bg-amber-50 border border-amber-100 rounded-lg">
                                  <div>
                                    <div className="font-medium">{person.name}</div>
                                    <div className="text-xs text-gray-600">{person.injury} • {person.status}</div>
                                  </div>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                                    onClick={() => handleRemoveInjuredPerson(person.id)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <Label className="text-sm font-semibold text-gray-700">
                            Witnesses Present
                          </Label>
                          <Badge variant={witnessCount > 0 ? "default" : "outline"}>
                            {witnessCount} witnesses
                          </Badge>
                        </div>
                        <div className="space-y-3">
                          <div className="flex gap-2">
                            <Input 
                              type="number" 
                              min="0" 
                              placeholder="0" 
                              className="h-12 flex-1"
                              value={witnessCount}
                              onChange={(e) => {
                                const value = parseInt(e.target.value) || 0
                                setWitnessCount(value)
                                // Clear witnesses if count is reduced
                                if (value < witnesses.length) {
                                  setWitnesses(prev => prev.slice(0, value))
                                }
                              }}
                            />
                            <Button 
                              variant="outline" 
                              className="gap-2 text-amber-700 hover:text-amber-800 hover:border-amber-300"
                              onClick={handleAddWitnessDetails}
                              disabled={witnessCount === 0}
                            >
                              <Eye className="h-4 w-4" />
                              Add Statements
                            </Button>
                          </div>
                          
                          {showWitnessDetails && witnesses.length > 0 && (
                            <div className="mt-4 space-y-3">
                              <div className="text-sm font-medium text-gray-700">Witness Details:</div>
                              {witnesses.map((witness) => (
                                <div key={witness.id} className="flex items-center justify-between p-3 bg-blue-50 border border-blue-100 rounded-lg">
                                  <div>
                                    <div className="font-medium">{witness.name}</div>
                                    <div className="text-xs text-gray-600">{witness.department} • {witness.statement}</div>
                                  </div>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                                    onClick={() => handleRemoveWitness(witness.id)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  <Card className="border-amber-100 shadow-sm">
                    <CardHeader className="bg-gradient-to-r from-amber-50 to-yellow-50 border-b border-amber-100">
                      <CardTitle className="text-amber-800 flex items-center gap-2">
                        <BarChart className="h-5 w-5" />
                        Equipment & Materials
                      </CardTitle>
                      <CardDescription className="text-amber-600">
                        Equipment involved in the incident
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-6">
                      <div className="space-y-3">
                        <Label className="text-sm font-semibold text-gray-700">
                          Equipment Type
                        </Label>
                        <Select value={equipmentType} onValueChange={setEquipmentType}>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Select equipment type" />
                          </SelectTrigger>
                          <SelectContent>
                            {equipmentTypes.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
                                <div className="flex items-center gap-3">
                                  <span className="text-lg">{type.icon}</span>
                                  <span>{type.label}</span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-sm font-semibold text-gray-700">
                          Equipment Details
                        </Label>
                        <Textarea 
                          placeholder="Equipment ID, serial number, specific details..."
                          className="min-h-[120px]"
                          value={equipmentDetails}
                          onChange={(e) => setEquipmentDetails(e.target.value)}
                        />
                      </div>

                      <div className="space-y-3">
                        <Label className="text-sm font-semibold text-gray-700">
                          Immediate Actions Taken <span className="text-red-500 ml-1">*</span>
                        </Label>
                        <Textarea 
                          placeholder="First aid administered, emergency services contacted, area secured..."
                          className="min-h-[120px]"
                          value={immediateActions}
                          onChange={(e) => setImmediateActions(e.target.value)}
                          required
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <Button 
                  variant="outline" 
                  onClick={handleBack}
                  className="gap-2 border-gray-300 hover:border-amber-300 cursor-pointer"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Back
                </Button>
                <Button 
                  onClick={handleNext}
                  className="bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 gap-2 cursor-pointer"
                >
                  Next: Evidence
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Evidence */}
          {currentStep === 3 && (
            <div className="space-y-8">
              <Card className="border-amber-100 shadow-sm">
                <CardHeader className="bg-gradient-to-r from-amber-50 to-yellow-50 border-b border-amber-100">
                  <CardTitle className="text-amber-800 flex items-center gap-2">
                    <Camera className="h-5 w-5" />
                    Evidence Collection
                  </CardTitle>
                  <CardDescription className="text-amber-600">
                    Upload photos, videos, documents, and other evidence
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                      <div 
                        className="border-2 border-dashed border-amber-300 rounded-xl p-8 text-center hover:border-amber-400 transition-colors bg-gradient-to-br from-amber-50/50 to-yellow-50/50 cursor-pointer"
                        onClick={() => document.getElementById('file-upload')?.click()}
                      >
                        <div className="max-w-md mx-auto">
                          <div className="p-4 bg-gradient-to-r from-amber-100 to-yellow-100 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                            <Upload className="h-10 w-10 text-amber-600" />
                          </div>
                          <h4 className="font-semibold text-lg text-gray-900 mb-2">Upload Evidence Files</h4>
                          <p className="text-gray-600 mb-6">
                            Drag & drop files or click to browse
                          </p>
                          <input
                            id="file-upload"
                            type="file"
                            multiple
                            className="hidden"
                            onChange={handleFileUpload}
                            accept="image/*,.pdf,.doc,.docx,.mp4,.mov,.avi"
                          />
                          <Button className="gap-2 bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700">
                            <Upload className="h-4 w-4" />
                            Browse Files
                          </Button>
                          <p className="text-sm text-gray-500 mt-4">
                            Supports JPG, PNG, PDF, DOC, MP4 • Max 50MB per file
                          </p>
                        </div>
                      </div>

                      {files.length > 0 && (
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <h4 className="font-semibold text-gray-900">Uploaded Files ({files.length})</h4>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-amber-700 hover:text-amber-800"
                              onClick={() => setFiles([])}
                            >
                              Clear All
                            </Button>
                          </div>
                          <div className="space-y-3">
                            {files.map((file, index) => {
                              const fileInfo = getFileIcon(file.type)
                              return (
                                <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                                  <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-lg ${fileInfo.color}`}>
                                      {fileInfo.icon}
                                    </div>
                                    <div className="flex-1">
                                      <div className="font-medium text-sm truncate max-w-[300px]">
                                        {file.name}
                                      </div>
                                      <div className="text-xs text-gray-500">
                                        {formatFileSize(file.size)}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-8 w-8 p-0"
                                      onClick={() => removeFile(index)}
                                    >
                                      <X className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="space-y-6 ">
                      <Card className="border-none cursor-grab shadow-2xl hover:translate-1 transition-discrete duration-1000">
                        <CardHeader>
                          <CardTitle className="text-sm font-semibold text-gray-900">
                            Evidence Checklist
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          {[
                            { label: "Site photographs", checked: files.some(f => f.type.startsWith('image/')) },
                            { label: "Witness statements", checked: witnesses.length > 0 },
                            { label: "Equipment photos", checked: files.some(f => f.name.includes('equipment')) },
                            { label: "Medical reports", checked: files.some(f => f.type.includes('pdf')) },
                            { label: "Video evidence", checked: files.some(f => f.type.startsWith('video/')) },
                          ].map((item, index) => (
                            <div key={index} className="flex items-center gap-3">
                              <div className={`
                                w-5 h-5 border-2 rounded flex items-center justify-center
                                ${item.checked 
                                  ? 'border-green-500 bg-green-500 text-white' 
                                  : 'border-gray-300'
                                }
                              `}>
                                {item.checked && <Check className="h-3 w-3" />}
                              </div>
                              <span className="text-sm">{item.label}</span>
                            </div>
                          ))}
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-sm font-semibold text-gray-900">
                            Reporting Options
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-amber-100 rounded-lg">
                                <UserX className="h-4 w-4 text-amber-700" />
                              </div>
                              <div>
                                <Label htmlFor="anonymous-switch" className="font-medium text-gray-900 cursor-pointer">
                                  Anonymous Report
                                </Label>
                                <p className="text-xs text-gray-500">Your identity will not be recorded</p>
                              </div>
                            </div>
                            <Switch 
                              id="anonymous-switch"
                              checked={isAnonymous}
                              onCheckedChange={setIsAnonymous}
                              className="data-[state=checked]:bg-amber-600"
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-amber-100 rounded-lg">
                                <Lock className="h-4 w-4 text-amber-700" />
                              </div>
                              <div>
                                <Label htmlFor="confidential-switch" className="font-medium text-gray-900 cursor-pointer">
                                  Confidential
                                </Label>
                                <p className="text-xs text-gray-500">Restrict access to authorized personnel</p>
                              </div>
                            </div>
                            <Switch 
                              id="confidential-switch"
                              checked={isConfidential}
                              onCheckedChange={setIsConfidential}
                              className="data-[state=checked]:bg-amber-600"
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
                  onClick={handleBack}
                  className="gap-2 cursor-pointer border-gray-300 hover:border-amber-300"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Back
                </Button>
                <Button 
                  onClick={handleNext}
                  className="bg-gradient-to-r cursor-pointer from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 gap-2"
                >
                  Next: Review & Submit
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 4: Review */}
          {currentStep === 4 && (
            <div className="space-y-8">
              <Card className="border-amber-100 shadow-sm">
                <CardHeader className="bg-gradient-to-r from-amber-50 to-yellow-50 border-b border-amber-100">
                  <CardTitle className="text-amber-800 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    Review & Submit
                  </CardTitle>
                  <CardDescription className="text-amber-600">
                    Review all information before submission
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6 space-y-8">
                  <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-amber-900">Ready to Submit</div>
                        <div className="text-sm text-amber-700 mt-1">
                          Please review all information carefully. Once submitted, this report cannot be edited.
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card className="text-center p-4 border-amber-100 bg-gradient-to-br from-amber-50 to-white">
                      <div className="text-3xl font-bold text-amber-600">4</div>
                      <div className="text-sm text-gray-600 mt-1">Sections Complete</div>
                    </Card>
                    <Card className="text-center p-4 border-amber-100 bg-gradient-to-br from-amber-50 to-white">
                      <div className="text-3xl font-bold text-amber-600">{files.length}</div>
                      <div className="text-sm text-gray-600 mt-1">Files Attached</div>
                    </Card>
                    <Card className="text-center p-4 border-amber-100 bg-gradient-to-br from-amber-50 to-white">
                      <div className="text-3xl font-bold text-amber-600">
                        {selectedSeverity ? selectedSeverity.charAt(0) : "-"}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">Severity Level</div>
                    </Card>
                    <Card className="text-center p-4 border-amber-100 bg-gradient-to-br from-amber-50 to-white">
                      <div className="text-3xl font-bold text-amber-600">
                        {injuredCount + witnessCount}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">People Involved</div>
                    </Card>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-900">Incident Summary</h4>
                      <div className="space-y-3 text-sm">
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
                          <span className="text-gray-600">Location:</span>
                          <span className="font-medium text-right">
                            {location === "custom" ? customLocation : 
                             locations.find(l => l.value === location)?.label || "Not set"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Severity:</span>
                          <span className="font-medium">{selectedSeverity || "Not selected"}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-900">People & Evidence</h4>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Injured Persons:</span>
                          <span className="font-medium">{injuredCount}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Witnesses:</span>
                          <span className="font-medium">{witnessCount}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Files Attached:</span>
                          <span className="font-medium">{files.length}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Reporting Mode:</span>
                          <span className="font-medium">
                            {isAnonymous ? "Anonymous" : "Standard"}
                            {isConfidential ? " • Confidential" : ""}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-gradient-to-r from-amber-100 to-yellow-100 rounded-lg">
                        <Shield className="h-5 w-5 text-amber-700" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">Secure Submission</div>
                        <div className="text-sm text-gray-600 mt-1">
                          This report will be encrypted and stored securely in compliance with ISO 45001 standards.
                          Submitting confirms accuracy of all provided information.
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-between pt-4">
                <div className="flex gap-3">
                  <Button 
                    variant="outline" 
                    onClick={handleBack}
                    className="gap-2 border-gray-300 hover:border-amber-300"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Back to Evidence
                  </Button>
                  <Button 
                    variant="outline" 
                    className="gap-2 border-gray-300 hover:border-amber-300"
                    onClick={handleSaveDraft}
                  >
                    <Save className="h-4 w-4" />
                    Save as Draft
                  </Button>
                </div>
                <Button 
                  className="gap-2 bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 shadow-lg"
                  onClick={handleSubmit}
                >
                  <Send className="h-4 w-4" />
                  Submit Incident Report
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
  )
}