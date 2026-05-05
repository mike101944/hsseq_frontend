import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

// Icons
import { 
  AlertTriangle, 
  CheckCircle, 
  TrendingUp, 
  Users, 
  FileCheck, 
  Shield,
  Calendar,
  BarChart,
  Target,
  Bell,
  Download,
  Eye,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  AlertCircle
} from "lucide-react"

export function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50/50 p-4 md:p-6">
      
      {/* Header */}
      <div className="mb-8">
       

        {/* Stats Overview - Clean, borderless design */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Incident Stats */}
          <Card className="bg-gradient-to-br from-white to-gray-50 shadow-sm hover:shadow-md transition-all duration-200">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-600">Total Incidents</CardTitle>
                <div className="p-2 bg-red-50 rounded-lg">
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline justify-between">
                <div>
                  <div className="text-2xl font-bold text-gray-900">12</div>
                  <div className="flex items-center mt-1">
                    <ArrowUpRight className="w-3 h-3 text-red-500 mr-1" />
                    <span className="text-xs text-red-600 font-medium">15% increase</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500">Open</div>
                  <div className="text-sm font-semibold text-gray-900">3</div>
                </div>
              </div>
              <Progress value={75} className="h-1.5 mt-4 bg-gray-100" />
            </CardContent>
          </Card>

          {/* Audit Stats */}
          <Card className="bg-gradient-to-br from-white to-gray-50 shadow-sm hover:shadow-md transition-all duration-200">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-600">Audits</CardTitle>
                <div className="p-2 bg-blue-50 rounded-lg">
                  <FileCheck className="w-4 h-4 text-blue-600" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline justify-between">
                <div>
                  <div className="text-2xl font-bold text-gray-900">8</div>
                  <div className="flex items-center mt-1">
                    <Clock className="w-3 h-3 text-blue-500 mr-1" />
                    <span className="text-xs text-blue-600 font-medium">2 in progress</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500">Scheduled</div>
                  <div className="text-sm font-semibold text-gray-900">4</div>
                </div>
              </div>
              <Progress value={60} className="h-1.5 mt-4 bg-gray-100" />
            </CardContent>
          </Card>

          {/* Compliance Stats */}
          <Card className="bg-gradient-to-br from-white to-gray-50 shadow-sm hover:shadow-md transition-all duration-200">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-600">Compliance Rate</CardTitle>
                <div className="p-2 bg-green-50 rounded-lg">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline justify-between">
                <div>
                  <div className="text-2xl font-bold text-gray-900">94%</div>
                  <div className="flex items-center mt-1">
                    <ArrowUpRight className="w-3 h-3 text-green-500 mr-1" />
                    <span className="text-xs text-green-600 font-medium">+2% this quarter</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500">Target</div>
                  <div className="text-sm font-semibold text-gray-900">95%</div>
                </div>
              </div>
              <Progress value={94} className="h-1.5 mt-4 bg-gray-100" />
            </CardContent>
          </Card>

          {/* Risk Stats */}
          <Card className="bg-gradient-to-br from-white to-gray-50 shadow-sm hover:shadow-md transition-all duration-200">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-600">Active Risks</CardTitle>
                <div className="p-2 bg-amber-50 rounded-lg">
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline justify-between">
                <div>
                  <div className="text-2xl font-bold text-gray-900">7</div>
                  <div className="flex items-center mt-1">
                    <ArrowDownRight className="w-3 h-3 text-amber-500 mr-1" />
                    <span className="text-xs text-amber-600 font-medium">2 less this week</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500">Critical</div>
                  <div className="text-sm font-semibold text-gray-900">2</div>
                </div>
              </div>
              <Progress value={40} className="h-1.5 mt-4 bg-gray-100" />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Alerts & Incidents */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Actions - Clean design */}
          <Card className="bg-gradient-to-r from-gray-50 to-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-gray-900">Quick Actions</CardTitle>
              <CardDescription className="text-gray-500">Execute HSSEQ tasks efficiently</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Button className="h-14 bg-gradient-to-br from-red-50 to-white hover:from-red-100 hover:to-white border border-red-100 text-red-700 hover:text-red-800">
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  <span className="text-sm font-medium">Report Incident</span>
                </Button>
                <Button className="h-14 bg-gradient-to-br from-blue-50 to-white hover:from-blue-100 hover:to-white border border-blue-100 text-blue-700 hover:text-blue-800">
                  <FileCheck className="w-5 h-5 mr-2" />
                  <span className="text-sm font-medium">Start Audit</span>
                </Button>
                <Button className="h-14 bg-gradient-to-br from-green-50 to-white hover:from-green-100 hover:to-white border border-green-100 text-green-700 hover:text-green-800">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  <span className="text-sm font-medium">Check Compliance</span>
                </Button>
                <Button className="h-14 bg-gradient-to-br from-amber-50 to-white hover:from-amber-100 hover:to-white border border-amber-100 text-amber-700 hover:text-amber-800">
                  <Target className="w-5 h-5 mr-2" />
                  <span className="text-sm font-medium">Risk Assessment</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Incidents - Minimal design */}
          <Card className="shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Incidents</CardTitle>
                  <CardDescription className="text-gray-500">Last 7 days activity</CardDescription>
                </div>
                <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                  <Eye className="w-4 h-4 mr-1" />
                  View all
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { id: 1, title: "Oil Spill - Facility A", type: "Environmental", status: "Critical", time: "2h ago" },
                  { id: 2, title: "Safety Violation - Operator", type: "Safety", status: "Medium", time: "1d ago" },
                  { id: 3, title: "Equipment Failure", type: "Technical", status: "Low", time: "2d ago" },
                ].map((incident) => (
                  <div key={incident.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${incident.status === 'Critical' ? 'bg-red-50' : incident.status === 'Medium' ? 'bg-amber-50' : 'bg-blue-50'}`}>
                        <AlertTriangle className={`w-4 h-4 ${incident.status === 'Critical' ? 'text-red-600' : incident.status === 'Medium' ? 'text-amber-600' : 'text-blue-600'}`} />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{incident.title}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-gray-500">{incident.type}</span>
                          <span className="text-xs text-gray-400">•</span>
                          <span className="text-xs text-gray-500">{incident.time}</span>
                        </div>
                      </div>
                    </div>
                    <Badge className={
                      incident.status === 'Critical' ? 'bg-red-100 text-red-700 hover:bg-red-100' :
                      incident.status === 'Medium' ? 'bg-amber-100 text-amber-700 hover:bg-amber-100' :
                      'bg-blue-100 text-blue-700 hover:bg-blue-100'
                    }>
                      {incident.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Analytics Overview */}
          <Card className="shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Compliance Trend</CardTitle>
                  <CardDescription className="text-gray-500">Monthly performance overview</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">This Quarter</Badge>
                  <Badge variant="outline" className="text-xs">Last Quarter</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-white rounded-lg">
                <div className="flex items-end justify-center gap-1 h-32 mb-4">
                  {[65, 72, 80, 85, 89, 94].map((value, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div 
                        className="w-6 bg-gradient-to-t from-green-500 to-green-400 rounded-t-lg"
                        style={{ height: `${value * 0.8}%` }}
                      ></div>
                      <span className="text-xs text-gray-500 mt-1">{['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][index]}</span>
                    </div>
                  ))}
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">Steady improvement from 65% to 94% compliance rate</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Upcoming & Summary */}
        <div className="space-y-6">
          {/* Upcoming Schedule */}
          <Card className="shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Upcoming Schedule</CardTitle>
                  <CardDescription className="text-gray-500">Next 30 days</CardDescription>
                </div>
                <Calendar className="w-4 h-4 text-gray-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { type: "Audit", title: "ISO 45001 Internal Audit", date: "Tomorrow, 10:00 AM", color: "bg-blue-500" },
                  { type: "Inspection", title: "Monthly Safety Inspection", date: "Feb 15, 9:00 AM", color: "bg-green-500" },
                  { type: "Training", title: "HSSEQ Awareness", date: "Feb 18, 2:00 PM", color: "bg-purple-500" },
                  { type: "Review", title: "Quarterly Compliance Review", date: "Feb 22, 11:00 AM", color: "bg-amber-500" },
                ].map((item, index) => (
                  <div key={index} className="p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className={`w-2 h-2 mt-2 rounded-full ${item.color}`}></div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium text-gray-600">{item.type}</span>
                          <Clock className="w-3 h-3 text-gray-400" />
                        </div>
                        <p className="font-medium text-gray-900 text-sm mt-1">{item.title}</p>
                        <p className="text-xs text-gray-500 mt-1">{item.date}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Risk Distribution */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Risk Distribution</CardTitle>
              <CardDescription className="text-gray-500">By severity level</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { level: "Critical", count: 2, total: 43, color: "bg-red-500" },
                  { level: "High", count: 5, total: 43, color: "bg-amber-500" },
                  { level: "Medium", count: 12, total: 43, color: "bg-yellow-500" },
                  { level: "Low", count: 24, total: 43, color: "bg-green-500" },
                ].map((risk, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${risk.color}`}></div>
                        <span className="text-sm text-gray-700">{risk.level}</span>
                      </div>
                      <span className="text-sm font-medium text-gray-900">{risk.count}</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${risk.color} rounded-full transition-all duration-500`}
                        style={{ width: `${(risk.count / risk.total) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* System Status */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>System Status</CardTitle>
              <CardDescription className="text-gray-500">All systems operational</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { module: "Incident Management", status: "active", updates: 3 },
                  { module: "Audit Management", status: "active", updates: 0 },
                  { module: "Risk Management", status: "active", updates: 2 },
                  { module: "Training Portal", status: "active", updates: 5 },
                  { module: "Analytics & Report", status: "active", updates: 1 },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${item.status === 'active' ? 'bg-green-500' : 'bg-amber-500'}`}></div>
                      <span className="text-sm text-gray-700">{item.module}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {item.updates > 0 && (
                        <span className="text-xs font-medium bg-gray-100 text-gray-700 px-2 py-0.5 rounded">
                          {item.updates} new
                        </span>
                      )}
                      <CheckCircle className="w-3 h-3 text-green-500" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-6 rounded-xl bg-gradient-to-r from-gray-50 to-white shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Training Completion</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">87%</p>
              <div className="flex items-center mt-2">
                <Users className="w-4 h-4 text-gray-400 mr-2" />
                <span className="text-xs text-gray-500">245/280 employees</span>
              </div>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="p-6 rounded-xl bg-gradient-to-r from-gray-50 to-white shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Inspections Completed</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">24/30</p>
              <div className="flex items-center mt-2">
                <FileCheck className="w-4 h-4 text-gray-400 mr-2" />
                <span className="text-xs text-gray-500">80% monthly target</span>
              </div>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <Target className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="p-6 rounded-xl bg-gradient-to-r from-gray-50 to-white shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Safety Streak</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">45 days</p>
              <div className="flex items-center mt-2">
                <Shield className="w-4 h-4 text-gray-400 mr-2" />
                <span className="text-xs text-gray-500">Incident-free</span>
              </div>
            </div>
            <div className="p-3 bg-amber-50 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-amber-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}