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
import {ChartPieInteractive}  from './HSSEQPieCharts'

// HSSEQ Data for Safety Incidents and Observations
const hseqChartData = [
    // April
    { date: "2024-04-01", incidents: 42, observations: 85, compliance: 88 },
    { date: "2024-04-02", incidents: 38, observations: 92, compliance: 90 },
    { date: "2024-04-03", incidents: 45, observations: 78, compliance: 85 },
    { date: "2024-04-04", incidents: 52, observations: 105, compliance: 92 },
    { date: "2024-04-05", incidents: 58, observations: 120, compliance: 94 },
    { date: "2024-04-06", incidents: 48, observations: 115, compliance: 93 },
    { date: "2024-04-07", incidents: 41, observations: 88, compliance: 89 },
    { date: "2024-04-08", incidents: 62, observations: 135, compliance: 95 },
    { date: "2024-04-09", incidents: 32, observations: 65, compliance: 82 },
    { date: "2024-04-10", incidents: 50, observations: 102, compliance: 91 },
    { date: "2024-04-11", incidents: 55, observations: 118, compliance: 93 },
    { date: "2024-04-12", incidents: 46, observations: 95, compliance: 90 },
    { date: "2024-04-13", incidents: 53, observations: 122, compliance: 94 },
    { date: "2024-04-14", incidents: 37, observations: 82, compliance: 87 },
    { date: "2024-04-15", incidents: 35, observations: 75, compliance: 85 },
    { date: "2024-04-16", incidents: 39, observations: 80, compliance: 86 },
    { date: "2024-04-17", incidents: 65, observations: 142, compliance: 96 },
    { date: "2024-04-18", incidents: 58, observations: 130, compliance: 94 },
    { date: "2024-04-19", incidents: 44, observations: 92, compliance: 89 },
    { date: "2024-04-20", incidents: 28, observations: 62, compliance: 81 },
    { date: "2024-04-21", incidents: 36, observations: 78, compliance: 86 },
    { date: "2024-04-22", incidents: 42, observations: 88, compliance: 88 },
    { date: "2024-04-23", incidents: 38, observations: 82, compliance: 87 },
    { date: "2024-04-24", incidents: 60, observations: 125, compliance: 95 },
    { date: "2024-04-25", incidents: 48, observations: 105, compliance: 92 },
    { date: "2024-04-26", incidents: 31, observations: 68, compliance: 83 },
    { date: "2024-04-27", incidents: 59, observations: 128, compliance: 94 },
    { date: "2024-04-28", incidents: 34, observations: 72, compliance: 84 },
    { date: "2024-04-29", incidents: 52, observations: 110, compliance: 92 },
    { date: "2024-04-30", incidents: 68, observations: 140, compliance: 97 },
    
    // May
    { date: "2024-05-01", incidents: 40, observations: 85, compliance: 88 },
    { date: "2024-05-02", incidents: 55, observations: 115, compliance: 93 },
    { date: "2024-05-03", incidents: 47, observations: 98, compliance: 91 },
    { date: "2024-05-04", incidents: 61, observations: 130, compliance: 95 },
    { date: "2024-05-05", incidents: 72, observations: 145, compliance: 96 },
    { date: "2024-05-06", incidents: 78, observations: 160, compliance: 98 },
    { date: "2024-05-07", incidents: 62, observations: 125, compliance: 94 },
    { date: "2024-05-08", incidents: 43, observations: 90, compliance: 89 },
    { date: "2024-05-09", incidents: 45, observations: 92, compliance: 90 },
    { date: "2024-05-10", incidents: 56, observations: 120, compliance: 93 },
    { date: "2024-05-11", incidents: 51, observations: 108, compliance: 92 },
    { date: "2024-05-12", incidents: 44, observations: 95, compliance: 90 },
    { date: "2024-05-13", incidents: 41, observations: 85, compliance: 88 },
    { date: "2024-05-14", incidents: 70, observations: 150, compliance: 97 },
    { date: "2024-05-15", incidents: 75, observations: 155, compliance: 96 },
    { date: "2024-05-16", incidents: 54, observations: 118, compliance: 93 },
    { date: "2024-05-17", incidents: 80, observations: 165, compliance: 98 },
    { date: "2024-05-18", incidents: 52, observations: 112, compliance: 92 },
    { date: "2024-05-19", incidents: 44, observations: 92, compliance: 89 },
    { date: "2024-05-20", incidents: 39, observations: 82, compliance: 87 },
    { date: "2024-05-21", incidents: 27, observations: 60, compliance: 82 },
    { date: "2024-05-22", incidents: 26, observations: 58, compliance: 81 },
    { date: "2024-05-23", incidents: 50, observations: 105, compliance: 91 },
    { date: "2024-05-24", incidents: 56, observations: 115, compliance: 93 },
    { date: "2024-05-25", incidents: 48, observations: 100, compliance: 91 },
    { date: "2024-05-26", incidents: 42, observations: 88, compliance: 88 },
    { date: "2024-05-27", incidents: 65, observations: 138, compliance: 95 },
    { date: "2024-05-28", incidents: 44, observations: 92, compliance: 89 },
    { date: "2024-05-29", incidents: 29, observations: 65, compliance: 83 },
    { date: "2024-05-30", incidents: 53, observations: 110, compliance: 92 },
    { date: "2024-05-31", incidents: 40, observations: 85, compliance: 88 },
    
    // June
    { date: "2024-06-01", incidents: 39, observations: 80, compliance: 87 },
    { date: "2024-06-02", incidents: 73, observations: 152, compliance: 97 },
    { date: "2024-06-03", incidents: 33, observations: 70, compliance: 84 },
    { date: "2024-06-04", incidents: 68, observations: 142, compliance: 96 },
    { date: "2024-06-05", incidents: 28, observations: 62, compliance: 82 },
    { date: "2024-06-06", incidents: 56, observations: 118, compliance: 93 },
    { date: "2024-06-07", incidents: 60, observations: 125, compliance: 94 },
    { date: "2024-06-08", incidents: 61, observations: 128, compliance: 95 },
    { date: "2024-06-09", incidents: 70, observations: 148, compliance: 97 },
    { date: "2024-06-10", incidents: 38, observations: 82, compliance: 87 },
    { date: "2024-06-11", incidents: 30, observations: 68, compliance: 84 },
    { date: "2024-06-12", incidents: 77, observations: 158, compliance: 98 },
    { date: "2024-06-13", incidents: 26, observations: 60, compliance: 82 },
    { date: "2024-06-14", incidents: 66, observations: 138, compliance: 96 },
    { date: "2024-06-15", incidents: 52, observations: 112, compliance: 92 },
    { date: "2024-06-16", incidents: 58, observations: 122, compliance: 94 },
    { date: "2024-06-17", incidents: 74, observations: 155, compliance: 97 },
    { date: "2024-06-18", incidents: 34, observations: 75, compliance: 85 },
    { date: "2024-06-19", incidents: 54, observations: 115, compliance: 93 },
    { date: "2024-06-20", incidents: 63, observations: 132, compliance: 95 },
    { date: "2024-06-21", incidents: 40, observations: 85, compliance: 88 },
    { date: "2024-06-22", incidents: 53, observations: 110, compliance: 92 },
    { date: "2024-06-23", incidents: 76, observations: 160, compliance: 98 },
    { date: "2024-06-24", incidents: 35, observations: 78, compliance: 86 },
    { date: "2024-06-25", incidents: 36, observations: 80, compliance: 87 },
    { date: "2024-06-26", incidents: 67, observations: 140, compliance: 96 },
    { date: "2024-06-27", incidents: 70, observations: 145, compliance: 97 },
    { date: "2024-06-28", incidents: 42, observations: 88, compliance: 89 },
    { date: "2024-06-29", incidents: 32, observations: 70, compliance: 84 },
    { date: "2024-06-30", incidents: 69, observations: 142, compliance: 96 }
  ];

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
    // Tarehe ya mwisho ya data yetu ni 2024-06-30
    const referenceDate = new Date("2024-06-30")
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
    return date >= startDate && date <= referenceDate
  })

  // Calculate statistics
  const calculateStats = () => {
    if (filteredData.length === 0) {
      return {
        incidents: { current: 0, change: "0", trend: "up" },
        observations: { current: 0, change: "0", trend: "up" },
        compliance: { current: 0, change: "0", trend: "up" }
      }
    }

    const lastData = filteredData[filteredData.length - 1]
    const firstData = filteredData[0]
    
    if (!lastData || !firstData) {
      return {
        incidents: { current: 0, change: "0", trend: "up" },
        observations: { current: 0, change: "0", trend: "up" },
        compliance: { current: 0, change: "0", trend: "up" }
      }
    }
    
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
    <div className="space-y-0">
      {/* Horizontal Layout: Chart + Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart - Takes 2/3 space */}
        <div className="lg:col-span-2">
          <Card className="border-none shadow-md bg-white ">
           
            
            <CardContent className="pt-1">
                <div className="flex flex-row items-center justify-between rounded-lg ">
                
                        {/* Metric Selector */}
              <div className="mt-4 flex items-center justify-center gap-2">
                <button
                  onClick={() => setSelectedMetric("all")}
                  className={`px-3 py-1.5 text-sm font-medium rounded-lg cursor-pointer ${
                    selectedMetric === "all" 
                      ? 'bg-green-900/50 text-white' 
                      : 'bg-gray-100 text-green-900/50 hover:bg-gray-200'
                  }`}
                >
                  All Metrics
                </button>
                <button
                  onClick={() => setSelectedMetric("incidents")}
                  className={`px-3 py-1.5 text-sm font-medium rounded-lg cursor-pointer ${
                    selectedMetric === "incidents" 
                      ? 'bg-red-100 text-red-700' 
                      : 'bg-gray-100 text-green-900/50 hover:bg-gray-200'
                  }`}
                >
                  Incidents Only
                </button>
                <button
                  onClick={() => setSelectedMetric("compliance")}
                  className={`px-3 py-1.5 text-sm font-medium rounded-lg cursor-pointer ${
                    selectedMetric === "compliance" 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-gray-100 text-green-900/50 hover:bg-gray-200'
                  }`}
                >
                  Compliance Only
                </button>
              </div>
                    
                   
                    <div className="flex items-center gap-3 mt-4 sm:mt-0">
                  <Select value={timeRange} onValueChange={setTimeRange} className="z-10">
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
             

              {/* Chart */}
              <div className="bg-white rounded-xl border-t-none border-gray-200 ">
                <ChartContainer
                  config={chartConfig}
                  className="aspect-auto h-[300px] w-full"
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

              
            </CardContent>
          </Card>
        </div>

        {/* Timeline Sidebar - Takes 1/3 space */}
        <div>
          <Card className="border-none shadow-md h-full bg-white">
           <ChartPieInteractive />
        
          </Card>
        </div>
      </div>
    </div>
  )
}