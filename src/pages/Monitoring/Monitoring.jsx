"use client"

import React, { useState, useEffect } from 'react'
import {
  Activity,
  AlertTriangle,
  Battery,
  BatteryCharging,
  Bell,
  Calendar,
  CheckCircle,
  Clock,
  Cloud,
  CloudRain,
  Droplets,
  Eye,
  Filter,
  Flame,
  Gauge,
  Globe,
  Heart,
  Home,
  LineChart,
  MapPin,
  Mic,
  MicOff,
  Monitor,
  Moon,
  PieChart,
  Play,
  RefreshCw,
  Shield,
  ShieldCheck,
  Signal,
  SignalHigh,
  SignalLow,
  SkipForward,
  SkipBack,
  Sun,
  Sunrise,
  Sunset,
  Thermometer,
  TrendingDown,
  TrendingUp,
  Users,
  Wind,
  Zap,
  ChevronRight,
  ChevronDown,
  Settings,
  Download,
  Maximize2,
  Minimize2,
  Volume2,
  VolumeX,
  Wifi,
  WifiOff,
  Lock,
  Unlock,
  AlertCircle,
  Target,
  BarChart3,
  Cpu,
  Database,
  HardDrive,
  MemoryStick,
  Network,
  Server,
  Smartphone,
  Tablet,
  Tv,
  Watch,
  ActivitySquare,
  AirVent,
  BellRing,
  Building,
  Building2,
  Factory,
  Headphones,
  Radio,
  Satellite,
  SatelliteDish,
  ShieldAlert,
  ShieldOff,
  Siren,
  SirenIcon,
  Speaker,
  Video,
  Webcam,
  Waves
} from 'lucide-react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export function Monitoring() {
  const [isAutoRefresh, setIsAutoRefresh] = useState(true)
  const [selectedSite, setSelectedSite] = useState('all')
  const [refreshInterval, setRefreshInterval] = useState([30])
  const [activeTab, setActiveTab] = useState('overview')
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)

  // Mock data
  const systemStats = {
    overallHealth: 94,
    activeAlerts: 12,
    criticalAlerts: 3,
    incidentsToday: 8,
    avgResponseTime: '2m 15s',
    complianceRate: 98.5,
    uptime: 99.9
  }

  const sites = [
    { id: 'site-1', name: 'Main Plant', status: 'online', alerts: 3, health: 92, location: 'Building A' },
    { id: 'site-2', name: 'Warehouse B', status: 'online', alerts: 1, health: 96, location: 'Zone 3' },
    { id: 'site-3', name: 'Lab Complex', status: 'warning', alerts: 5, health: 84, location: 'Building C' },
    { id: 'site-4', name: 'Office Block', status: 'offline', alerts: 0, health: 0, location: 'Main Office' },
    { id: 'site-5', name: 'Remote Site', status: 'online', alerts: 2, health: 88, location: 'Field Site 5' }
  ]

  const alerts = [
    { id: 'alert-1', type: 'critical', title: 'High Temperature Alert', site: 'Main Plant', time: '2 min ago', equipment: 'Reactor Unit 3' },
    { id: 'alert-2', type: 'warning', title: 'Low Pressure Warning', site: 'Lab Complex', time: '5 min ago', equipment: 'Compressor A' },
    { id: 'alert-3', type: 'info', title: 'Maintenance Due', site: 'Warehouse B', time: '15 min ago', equipment: 'HVAC System' },
    { id: 'alert-4', type: 'critical', title: 'Gas Leak Detected', site: 'Remote Site', time: '8 min ago', equipment: 'Storage Tank 2' },
    { id: 'alert-5', type: 'warning', title: 'Power Fluctuation', site: 'Main Plant', time: '12 min ago', equipment: 'Generator B' }
  ]

  const environmentalData = {
    temperature: 24.5,
    humidity: 65,
    airQuality: 85,
    noiseLevel: 45,
    co2Level: 420,
    pm25: 12
  }

  const equipmentStatus = [
    { name: 'HVAC Systems', online: 28, total: 30, status: 'good' },
    { name: 'Fire Systems', online: 15, total: 15, status: 'excellent' },
    { name: 'CCTV Cameras', online: 42, total: 45, status: 'good' },
    { name: 'Gas Detectors', online: 18, total: 20, status: 'warning' },
    { name: 'Access Control', online: 12, total: 12, status: 'excellent' }
  ]

  const getStatusColor = (status) => {
    switch(status) {
      case 'online': return 'text-emerald-500 bg-emerald-50 border-emerald-200'
      case 'warning': return 'text-amber-500 bg-amber-50 border-amber-200'
      case 'offline': return 'text-red-500 bg-red-50 border-red-200'
      default: return 'text-gray-500 bg-gray-50 border-gray-200'
    }
  }

  const getAlertColor = (type) => {
    switch(type) {
      case 'critical': return 'text-red-700 bg-red-50 border-red-200'
      case 'warning': return 'text-amber-700 bg-amber-50 border-amber-200'
      case 'info': return 'text-blue-700 bg-blue-50 border-blue-200'
      default: return 'text-gray-700 bg-gray-50 border-gray-200'
    }
  }

  const getHealthColor = (percentage) => {
    if (percentage >= 90) return 'text-emerald-600'
    if (percentage >= 75) return 'text-amber-600'
    return 'text-red-600'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50/30 to-emerald-100/10 p-4 md:p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-emerald-100 rounded-lg border border-emerald-200">
                <Monitor className="h-6 w-6 text-emerald-700" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                  HSSEQ Monitoring Dashboard
                </h1>
                <p className="text-gray-600 mt-1">
                  Real-time monitoring of safety, health, security, environment and quality metrics
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-4">
              <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                <div className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></div>
                Live Monitoring
              </Badge>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                <Activity className="h-3 w-3 mr-1" />
                15 Systems Active
              </Badge>
              <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                <Shield className="h-3 w-3 mr-1" />
                Security Level: High
              </Badge>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <Label className="text-sm">Auto-refresh</Label>
              <Switch
                checked={isAutoRefresh}
                onCheckedChange={setIsAutoRefresh}
              />
            </div>
            <Select value={selectedSite} onValueChange={setSelectedSite}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Select Site" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sites</SelectItem>
                {sites.map(site => (
                  <SelectItem key={site.id} value={site.id}>{site.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
            <Button size="icon" onClick={() => setIsFullscreen(!isFullscreen)}>
              {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Quick Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-7 gap-3 mb-6">
          <Card className="bg-white/80 backdrop-blur-sm border-emerald-100 shadow-lg shadow-emerald-100/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">System Health</p>
                  <div className="flex items-center gap-2">
                    <p className={`text-2xl font-bold ${getHealthColor(systemStats.overallHealth)}`}>
                      {systemStats.overallHealth}%
                    </p>
                    <TrendingUp className="h-4 w-4 text-emerald-500" />
                  </div>
                </div>
                <div className="p-2 bg-emerald-50 rounded-lg">
                  <Activity className="h-5 w-5 text-emerald-600" />
                </div>
              </div>
              <Progress value={systemStats.overallHealth} className="h-1.5 mt-2 bg-emerald-100" />
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-red-100 shadow-lg shadow-red-100/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Critical Alerts</p>
                  <p className="text-2xl font-bold text-red-600">{systemStats.criticalAlerts}</p>
                </div>
                <div className="p-2 bg-red-50 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                </div>
              </div>
              <div className="text-xs text-red-500 mt-2">Requires Immediate Attention</div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-blue-100 shadow-lg shadow-blue-100/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Response</p>
                  <p className="text-2xl font-bold text-blue-600">{systemStats.avgResponseTime}</p>
                </div>
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Clock className="h-5 w-5 text-blue-600" />
                </div>
              </div>
              <div className="text-xs text-blue-500 mt-2">Within SLA</div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-emerald-100 shadow-lg shadow-emerald-100/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Compliance</p>
                  <p className="text-2xl font-bold text-emerald-600">{systemStats.complianceRate}%</p>
                </div>
                <div className="p-2 bg-emerald-50 rounded-lg">
                  <ShieldCheck className="h-5 w-5 text-emerald-600" />
                </div>
              </div>
              <Progress value={systemStats.complianceRate} className="h-1.5 mt-2 bg-emerald-100" />
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-purple-100 shadow-lg shadow-purple-100/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Sites</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {sites.filter(s => s.status === 'online').length}/{sites.length}
                  </p>
                </div>
                <div className="p-2 bg-purple-50 rounded-lg">
                  <Globe className="h-5 w-5 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-amber-100 shadow-lg shadow-amber-100/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Incidents Today</p>
                  <p className="text-2xl font-bold text-amber-600">{systemStats.incidentsToday}</p>
                </div>
                <div className="p-2 bg-amber-50 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-amber-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-emerald-100 shadow-lg shadow-emerald-100/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Uptime</p>
                  <p className="text-2xl font-bold text-emerald-600">{systemStats.uptime}%</p>
                </div>
                <div className="p-2 bg-emerald-50 rounded-lg">
                  <Zap className="h-5 w-5 text-emerald-600" />
                </div>
              </div>
              <div className="text-xs text-emerald-500 mt-2">30-day average</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Site Status Grid */}
          <Card className="bg-white/80 backdrop-blur-sm border-emerald-100 shadow-lg shadow-emerald-100/50">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-emerald-600" />
                  Site Status Overview
                </div>
                <Button variant="ghost" size="sm" className="h-8">
                  <Eye className="h-4 w-4 mr-1" />
                  View All
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sites.map(site => (
                  <Card key={site.id} className={`border ${getStatusColor(site.status).split(' ')[2]} hover:shadow-md transition-shadow`}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <div className={`w-2 h-2 rounded-full ${site.status === 'online' ? 'bg-emerald-500' : site.status === 'warning' ? 'bg-amber-500' : 'bg-red-500'}`}></div>
                            <Badge variant="outline" className={`capitalize ${getStatusColor(site.status)}`}>
                              {site.status}
                            </Badge>
                          </div>
                          <h4 className="font-semibold text-gray-900">{site.name}</h4>
                          <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                            <MapPin className="h-3 w-3" />
                            {site.location}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className={`text-2xl font-bold ${getHealthColor(site.health)}`}>
                            {site.health}%
                          </div>
                          <div className="text-xs text-gray-500">Health</div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <div className="text-sm">
                          <span className="font-medium">Alerts: </span>
                          <span className={site.alerts > 0 ? 'text-red-600 font-semibold' : 'text-gray-600'}>
                            {site.alerts}
                          </span>
                        </div>
                        <Button variant="ghost" size="sm" className="h-7">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Alerts Feed */}
          <Card className="bg-white/80 backdrop-blur-sm border-red-100 shadow-lg shadow-red-100/50">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-red-600" />
                  Active Alerts
                  <Badge variant="destructive" className="ml-2">{alerts.length}</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setSoundEnabled(!soundEnabled)}
                  >
                    {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8">
                    <Filter className="h-4 w-4 mr-1" />
                    Filter
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {alerts.map(alert => (
                  <div
                    key={alert.id}
                    className={`p-3 rounded-lg border ${getAlertColor(alert.type)} hover:shadow-sm transition-all cursor-pointer`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          {alert.type === 'critical' && <AlertTriangle className="h-4 w-4 text-red-600" />}
                          {alert.type === 'warning' && <AlertCircle className="h-4 w-4 text-amber-600" />}
                          {alert.type === 'info' && <Bell className="h-4 w-4 text-blue-600" />}
                          <h4 className="font-semibold">{alert.title}</h4>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Building2 className="h-3 w-3" />
                            {alert.site}
                          </span>
                          <span className="flex items-center gap-1">
                            <Cpu className="h-3 w-3" />
                            {alert.equipment}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {alert.time}
                          </span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="h-7">
                        Acknowledge
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Environmental Monitoring */}
          <Card className="bg-white/80 backdrop-blur-sm border-emerald-100 shadow-lg shadow-emerald-100/50">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Thermometer className="h-5 w-5 text-emerald-600" />
                Environmental Data
              </CardTitle>
              <CardDescription>Real-time sensor readings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-blue-700">Temperature</span>
                    <Thermometer className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="text-2xl font-bold text-blue-800">{environmentalData.temperature}°C</div>
                  <div className="text-xs text-blue-600 mt-1">Within range</div>
                </div>
                
                <div className="p-3 bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-lg border border-emerald-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-emerald-700">Humidity</span>
                    <Droplets className="h-4 w-4 text-emerald-600" />
                  </div>
                  <div className="text-2xl font-bold text-emerald-800">{environmentalData.humidity}%</div>
                  <div className="text-xs text-emerald-600 mt-1">Optimal</div>
                </div>
                
                <div className="p-3 bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-lg border border-amber-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-amber-700">Air Quality</span>
                    <Wind className="h-4 w-4 text-amber-600" />
                  </div>
                  <div className="text-2xl font-bold text-amber-800">{environmentalData.airQuality}</div>
                  <Progress value={environmentalData.airQuality} className="h-1.5 mt-2" />
                </div>
                
                <div className="p-3 bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-lg border border-purple-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-purple-700">CO₂ Level</span>
                    <Cloud className="h-4 w-4 text-purple-600" />
                  </div>
                  <div className="text-2xl font-bold text-purple-800">{environmentalData.co2Level}ppm</div>
                  <div className="text-xs text-purple-600 mt-1">Safe</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Equipment Status */}
          <Card className="bg-white/80 backdrop-blur-sm border-emerald-100 shadow-lg shadow-emerald-100/50">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Server className="h-5 w-5 text-emerald-600" />
                Equipment Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {equipmentStatus.map(equipment => (
                <div key={equipment.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">{equipment.name}</span>
                    <span className={`text-sm font-semibold ${
                      equipment.status === 'excellent' ? 'text-emerald-600' :
                      equipment.status === 'good' ? 'text-blue-600' :
                      'text-amber-600'
                    }`}>
                      {equipment.online}/{equipment.total}
                    </span>
                  </div>
                  <Progress 
                    value={(equipment.online / equipment.total) * 100} 
                    className={`h-2 ${
                      equipment.status === 'excellent' ? 'bg-emerald-100' :
                      equipment.status === 'good' ? 'bg-blue-100' :
                      'bg-amber-100'
                    }`}
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-white/80 backdrop-blur-sm border-emerald-100 shadow-lg shadow-emerald-100/50">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-emerald-600" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                <Button className="bg-emerald-600 hover:bg-emerald-700 h-12">
                  <Siren className="h-4 w-4 mr-2" />
                  Emergency Call
                </Button>
                <Button variant="outline" className="h-12">
                  <ReportIcon className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
                <Button variant="outline" className="h-12">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh All
                </Button>
                <Button variant="outline" className="h-12">
                  <Download className="h-4 w-4 mr-2" />
                  Export Data
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Live Feed */}
          <Card className="bg-white/80 backdrop-blur-sm border-emerald-100 shadow-lg shadow-emerald-100/50">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Video className="h-5 w-5 text-emerald-600" />
                  Live Feed
                </div>
                <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                  <div className="w-2 h-2 rounded-full bg-red-500 mr-1"></div>
                  LIVE
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Video className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-400">Camera Feed: Main Entrance</p>
                  <div className="flex items-center justify-center gap-4 mt-4">
                    <Button size="icon" variant="outline" className="bg-gray-800 border-gray-700">
                      <SkipBack className="h-4 w-4" />
                    </Button>
                    <Button size="icon" className="bg-emerald-600 hover:bg-emerald-700">
                      <Play className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="outline" className="bg-gray-800 border-gray-700">
                      <SkipForward className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white/80 backdrop-blur-sm border-emerald-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-600">Data Refresh</div>
                <div className="text-lg font-bold text-emerald-600">
                  {isAutoRefresh ? 'Auto' : 'Manual'}
                </div>
              </div>
              <RefreshCw className={`h-5 w-5 text-emerald-600 ${isAutoRefresh ? 'animate-spin' : ''}`} />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/80 backdrop-blur-sm border-blue-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-600">Network Status</div>
                <div className="text-lg font-bold text-blue-600">Stable</div>
              </div>
              <Wifi className="h-5 w-5 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/80 backdrop-blur-sm border-amber-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-600">Last Backup</div>
                <div className="text-lg font-bold text-amber-600">2:30 AM</div>
              </div>
              <Database className="h-5 w-5 text-amber-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/80 backdrop-blur-sm border-emerald-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-600">System Time</div>
                <div className="text-lg font-bold text-emerald-600">
                  {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </div>
              </div>
              <Clock className="h-5 w-5 text-emerald-600" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Helper component
function ReportIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M14 3v4a1 1 0 0 0 1 1h4" />
      <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z" />
      <path d="M9 9h1" />
      <path d="M9 13h6" />
      <path d="M9 17h6" />
    </svg>
  )
}