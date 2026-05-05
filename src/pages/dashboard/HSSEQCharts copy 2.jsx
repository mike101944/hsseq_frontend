"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  Download, 
  Filter, 
  TrendingUp, 
  TrendingDown,
  Clock,
  AlertCircle,
  CheckCircle,
  Calendar,
  ChevronRight,
  Users,
  Shield,
  Target,
  Activity
} from "lucide-react"

// HSSEQ Data for Safety Incidents and Observations
const hseqChartData = [
  { date: "2024-01-01", incidents: 12, observations: 45, compliance: 85 },
  { date: "2024-01-08", incidents: 8, observations: 52, compliance: 88 },
  { date: "2024-01-15", incidents: 15, observations: 38, compliance: 82 },
  { date: "2024-01-22", incidents: 6, observations: 61, compliance: 90 },
  { date: "2024-01-29", incidents: 10, observations: 55, compliance: 87 },
  { date: "2024-02-05", incidents: 7, observations: 65, compliance: 92 },
  { date: "2024-02-12", incidents: 9, observations: 48, compliance: 86 },
  { date: "2024-02-19", incidents: 14, observations: 42, compliance: 83 },
  { date: "2024-02-26", incidents: 5, observations: 70, compliance: 94 },
  { date: "2024-03-04", incidents: 11, observations: 58, compliance: 89 },
  { date: "2024-03-11", incidents: 8, observations: 62, compliance: 91 },
  { date: "2024-03-18", incidents: 13, observations: 44, compliance: 84 },
  { date: "2024-03-25", incidents: 4, observations: 75, compliance: 96 },
  { date: "2024-04-01", incidents: 9, observations: 60, compliance: 90 },
  { date: "2024-04-08", incidents: 7, observations: 68, compliance: 93 },
  { date: "2024-04-15", incidents: 16, observations: 40, compliance: 81 },
  { date: "2024-04-22", incidents: 6, observations: 72, compliance: 95 },
  { date: "2024-04-29", incidents: 10, observations: 56, compliance: 88 },
  { date: "2024-05-06", incidents: 8, observations: 64, compliance: 92 },
  { date: "2024-05-13", incidents: 12, observations: 47, compliance: 85 },
  { date: "2024-05-20", incidents: 3, observations: 80, compliance: 98 },
  { date: "2024-05-27", incidents: 9, observations: 59, compliance: 89 },
  { date: "2024-06-03", incidents: 7, observations: 66, compliance: 93 },
  { date: "2024-06-10", incidents: 11, observations: 51, compliance: 87 },
  { date: "2024-06-17", incidents: 5, observations: 73, compliance: 95 },
  { date: "2024-06-24", incidents: 8, observations: 63, compliance: 91 },
  { date: "2024-07-01", incidents: 10, observations: 57, compliance: 88 },
  { date: "2024-07-08", incidents: 6, observations: 69, compliance: 94 },
  { date: "2024-07-15", incidents: 13, observations: 43, compliance: 83 },
  { date: "2024-07-22", incidents: 4, observations: 77, compliance: 97 },
  { date: "2024-07-29", incidents: 9, observations: 61, compliance: 90 },
  { date: "2024-08-05", incidents: 7, observations: 67, compliance: 93 },
  { date: "2024-08-12", incidents: 14, observations: 41, compliance: 82 },
  { date: "2024-08-19", incidents: 5, observations: 74, compliance: 96 },
  { date: "2024-08-26", incidents: 8, observations: 62, compliance: 91 },
  { date: "2024-09-02", incidents: 11, observations: 53, compliance: 87 },
  { date: "2024-09-09", incidents: 6, observations: 71, compliance: 94 },
  { date: "2024-09-16", incidents: 9, observations: 58, compliance: 89 },
  { date: "2024-09-23", incidents: 12, observations: 46, compliance: 85 },
  { date: "2024-09-30", incidents: 4, observations: 78, compliance: 97 },
  { date: "2024-10-07", incidents: 7, observations: 65, compliance: 92 },
  { date: "2024-10-14", incidents: 10, observations: 54, compliance: 88 },
  { date: "2024-10-21", incidents: 8, observations: 64, compliance: 91 },
  { date: "2024-10-28", incidents: 15, observations: 39, compliance: 81 },
  { date: "2024-11-04", incidents: 5, observations: 76, compliance: 96 },
  { date: "2024-11-11", incidents: 9, observations: 60, compliance: 90 },
  { date: "2024-11-18", incidents: 7, observations: 68, compliance: 93 },
  { date: "2024-11-25", incidents: 11, observations: 50, compliance: 86 },
  { date: "2024-12-02", incidents: 6, observations: 72, compliance: 95 },
  { date: "2024-12-09", incidents: 8, observations: 63, compliance: 91 },
  { date: "2024-12-16", incidents: 13, observations: 44, compliance: 84 },
  { date: "2024-12-23", incidents: 3, observations: 82, compliance: 99 },
  { date: "2024-12-30", incidents: 7, observations: 66, compliance: 93 },
]

// Timeline events
const timelineEvents = [
  { id: 1, time: "09:30", title: "Safety Audit Completed", type: "audit", status: "completed", color: "blue" },
  { id: 2, time: "11:15", title: "Incident Investigation", type: "incident", status: "pending", color: "red" },
  { id: 3, time: "14:00", title: "Compliance Review", type: "review", status: "completed", color: "green" },
  { id: 4, time: "15:45", title: "Safety Training Session", type: "training", status: "upcoming", color: "purple" },
  { id: 5, time: "16:30", title: "Risk Assessment", type: "assessment", status: "in-progress", color: "amber" },
]

const chartConfig = {
  date: {
    label: "Date",
  },
  incidents: {
    label: "Safety Incidents",
    color: "#EF4444", // Red
  },
  observations: {
    label: "Safety Observations",
    color: "#3B82F6", // Blue
  },
  compliance: {
    label: "Compliance Rate",
    color: "#10B981", // Green - Vibrant and clear
  },
}

export function HSSEQCharts() {
  const [timeRange, setTimeRange] = React.useState("90d")
  const [selectedMetric, setSelectedMetric] = React.useState("all")

  const filteredData = hseqChartData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date("2024-12-30")
    let daysToSubtract = 90
    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    } else if (timeRange === "1y") {
      daysToSubtract = 365
    }
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  // Calculate statistics
  const calculateStats = () => {
    const lastData = filteredData[filteredData.length - 1]
    const firstData = filteredData[0]
    
    const incidentsChange = ((lastData.incidents - firstData.incidents) / firstData.incidents * 100).toFixed(1)
    const observationsChange = ((lastData.observations - firstData.observations) / firstData.observations * 100).toFixed(1)
    const complianceChange = ((lastData.compliance - firstData.compliance) / firstData.compliance * 100).toFixed(1)

    return {
      incidents: {
        current: lastData.incidents,
        change: incidentsChange,
        trend: parseFloat(incidentsChange) < 0 ? "down" : "up"
      },
      observations: {
        current: lastData.observations,
        change: observationsChange,
        trend: parseFloat(observationsChange) > 0 ? "up" : "down"
      },
      compliance: {
        current: lastData.compliance,
        change: complianceChange,
        trend: parseFloat(complianceChange) > 0 ? "up" : "down"
      }
    }
  }

  const stats = calculateStats()

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">HSSEQ Analytics Dashboard</h2>
          <p className="text-gray-600 mt-1">Performance metrics and activity timeline</p>
        </div>
        <div className="flex items-center gap-3 mt-4 md:mt-0">
          <div className="text-sm text-gray-500">
            <span className="font-medium text-gray-900">Real-time</span> data monitoring
          </div>
        </div>
      </div>

      {/* Horizontal Layout: Chart + Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart - Takes 2/3 space */}
        <div className="lg:col-span-2">
          <Card className="border-none shadow-md">
            <CardHeader className="border-b">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-bold text-gray-900">Performance Trends</CardTitle>
                  <CardDescription>Safety metrics over selected period</CardDescription>
                </div>
                <div className="flex items-center gap-3 mt-4 sm:mt-0">
                  <Select value={timeRange} onValueChange={setTimeRange}>
                    <SelectTrigger className="w-[140px] bg-white">
                      <SelectValue placeholder="Period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7d">Last 7 days</SelectItem>
                      <SelectItem value="30d">Last 30 days</SelectItem>
                      <SelectItem value="90d">Last 3 months</SelectItem>
                      <SelectItem value="1y">Last year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="pt-6">
              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gradient-to-br from-red-50 to-red-100 border border-red-200 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-red-600" />
                        <p className="text-sm font-medium text-red-700">Incidents</p>
                      </div>
                      <p className="text-2xl font-bold text-gray-900 mt-1">{stats.incidents.current}</p>
                    </div>
                    <div className={`flex items-center gap-1 px-2 py-1 rounded-lg ${
                      stats.incidents.trend === 'down' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {stats.incidents.trend === 'down' ? (
                        <TrendingDown className="w-4 h-4" />
                      ) : (
                        <TrendingUp className="w-4 h-4" />
                      )}
                      <span className="text-sm font-medium">{Math.abs(parseFloat(stats.incidents.change))}%</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-blue-600" />
                        <p className="text-sm font-medium text-blue-700">Observations</p>
                      </div>
                      <p className="text-2xl font-bold text-gray-900 mt-1">{stats.observations.current}</p>
                    </div>
                    <div className={`flex items-center gap-1 px-2 py-1 rounded-lg ${
                      stats.observations.trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {stats.observations.trend === 'up' ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : (
                        <TrendingDown className="w-4 h-4" />
                      )}
                      <span className="text-sm font-medium">{Math.abs(parseFloat(stats.observations.change))}%</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <Target className="w-4 h-4 text-green-600" />
                        <p className="text-sm font-medium text-green-700">Compliance</p>
                      </div>
                      <p className="text-2xl font-bold text-gray-900 mt-1">{stats.compliance.current}%</p>
                    </div>
                    <div className={`flex items-center gap-1 px-2 py-1 rounded-lg ${
                      stats.compliance.trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {stats.compliance.trend === 'up' ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : (
                        <TrendingDown className="w-4 h-4" />
                      )}
                      <span className="text-sm font-medium">{Math.abs(parseFloat(stats.compliance.change))}%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chart */}
              <div className="bg-gray-50 rounded-xl border border-gray-200 p-4">
                <ChartContainer
                  config={chartConfig}
                  className="aspect-auto h-[250px] w-full"
                >
                  <AreaChart data={filteredData}>
                    <defs>
                      <linearGradient id="fillIncidents" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#EF4444" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#EF4444" stopOpacity={0.1} />
                      </linearGradient>
                      <linearGradient id="fillObservations" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1} />
                      </linearGradient>
                      <linearGradient id="fillCompliance" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#10B981" stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
                    
                    <CartesianGrid 
                      vertical={false} 
                      strokeDasharray="3 3"
                      stroke="rgba(0,0,0,0.05)"
                    />
                    
                    <XAxis
                      dataKey="date"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      minTickGap={32}
                      tickFormatter={(value) => {
                        const date = new Date(value)
                        return date.toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })
                      }}
                      stroke="#6B7280"
                      fontSize={11}
                    />
                    
                    <ChartTooltip
                      cursor={{ stroke: '#D1D5DB', strokeWidth: 1 }}
                      content={
                        <ChartTooltipContent
                          labelFormatter={(value) => {
                            return new Date(value).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric"
                            })
                          }}
                          indicator="dot"
                          className="bg-white shadow-lg border border-gray-200"
                        />
                      }
                    />
                    
                    {/* Compliance Area - Bright green */}
                    <Area
                      dataKey="compliance"
                      type="natural"
                      fill="url(#fillCompliance)"
                      stroke="#10B981"
                      strokeWidth={2}
                      strokeOpacity={0.9}
                    />
                    
                    {/* Observations Area */}
                    {(selectedMetric === "all" || selectedMetric === "observations") && (
                      <Area
                        dataKey="observations"
                        type="natural"
                        fill="url(#fillObservations)"
                        stroke="#3B82F6"
                        strokeWidth={2}
                        strokeOpacity={0.9}
                      />
                    )}
                    
                    {/* Incidents Area */}
                    {(selectedMetric === "all" || selectedMetric === "incidents") && (
                      <Area
                        dataKey="incidents"
                        type="natural"
                        fill="url(#fillIncidents)"
                        stroke="#EF4444"
                        strokeWidth={2}
                        strokeOpacity={0.9}
                      />
                    )}
                    
                    <ChartLegend 
                      content={<ChartLegendContent />} 
                      className="mt-4"
                    />
                  </AreaChart>
                </ChartContainer>
              </div>

              {/* Metric Selector */}
              <div className="mt-4 flex items-center justify-center gap-2">
                <button
                  onClick={() => setSelectedMetric("all")}
                  className={`px-3 py-1.5 text-sm font-medium rounded-lg ${
                    selectedMetric === "all" 
                      ? 'bg-gray-900 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  All Metrics
                </button>
                <button
                  onClick={() => setSelectedMetric("incidents")}
                  className={`px-3 py-1.5 text-sm font-medium rounded-lg ${
                    selectedMetric === "incidents" 
                      ? 'bg-red-100 text-red-700' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Incidents Only
                </button>
                <button
                  onClick={() => setSelectedMetric("compliance")}
                  className={`px-3 py-1.5 text-sm font-medium rounded-lg ${
                    selectedMetric === "compliance" 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Compliance Only
                </button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Timeline Sidebar - Takes 1/3 space */}
        <div>
          <Card className="border-none shadow-md h-full">
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-bold text-gray-900">Today's Activity</CardTitle>
                  <CardDescription>HSSEQ events timeline</CardDescription>
                </div>
                <Calendar className="w-5 h-5 text-gray-400" />
              </div>
            </CardHeader>
            
            <CardContent className="pt-6">
              {/* Timeline */}
              <div className="space-y-4">
                {timelineEvents.map((event) => (
                  <div key={event.id} className="flex items-start gap-3 group hover:bg-gray-50 p-2 rounded-lg transition-colors">
                    {/* Time */}
                    <div className="flex-shrink-0">
                      <div className="text-sm font-medium text-gray-900 bg-gray-100 px-2 py-1 rounded">
                        {event.time}
                      </div>
                    </div>
                    
                    {/* Event Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <div className={`w-2 h-2 rounded-full bg-${event.color}-500`}></div>
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full bg-${event.color}-100 text-${event.color}-700`}>
                          {event.type}
                        </span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          event.status === 'completed' ? 'bg-green-100 text-green-700' :
                          event.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                          event.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {event.status}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-gray-900">{event.title}</p>
                    </div>
                    
                    {/* Arrow */}
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                  </div>
                ))}
              </div>

              {/* Quick Stats */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <h4 className="text-sm font-semibold text-gray-900 mb-3">Activity Summary</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-lg font-bold text-gray-900">5</div>
                    <div className="text-xs text-gray-600">Total Events</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-lg font-bold text-green-700">3</div>
                    <div className="text-xs text-green-600">Completed</div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-lg font-bold text-blue-700">1</div>
                    <div className="text-xs text-blue-600">In Progress</div>
                  </div>
                  <div className="text-center p-3 bg-amber-50 rounded-lg">
                    <div className="text-lg font-bold text-amber-700">1</div>
                    <div className="text-xs text-amber-600">Pending</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex flex-col gap-2">
                <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 rounded-lg transition-colors">
                  <Download className="w-4 h-4" />
                  Export Timeline
                </button>
                <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                  <Filter className="w-4 h-4" />
                  Filter Activities
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Bottom Section - Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-none shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Response Time</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">2.4h</p>
              </div>
              <Clock className="w-8 h-8 text-blue-500" />
            </div>
            <div className="flex items-center gap-1 mt-2">
              <TrendingDown className="w-4 h-4 text-green-500" />
              <span className="text-sm text-green-600">-0.8h this month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Training Completion</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">87%</p>
              </div>
              <Users className="w-8 h-8 text-green-500" />
            </div>
            <div className="flex items-center gap-1 mt-2">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-sm text-green-600">+5% this quarter</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Risk Assessment</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">12/15</p>
              </div>
              <Activity className="w-8 h-8 text-amber-500" />
            </div>
            <div className="flex items-center gap-1 mt-2">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-sm text-green-600">80% completed</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Safety Score</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">92.5</p>
              </div>
              <CheckCircle className="w-8 h-8 text-purple-500" />
            </div>
            <div className="flex items-center gap-1 mt-2">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-sm text-green-600">+2.5 points</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}