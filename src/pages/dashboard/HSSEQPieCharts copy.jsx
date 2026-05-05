"use client"

import * as React from "react"
import { Label, Pie, PieChart, Sector } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartStyle,
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
import { TrendingUp, TrendingDown, Activity, BookOpen, Search, Eye, FileText } from "lucide-react"

// Data for modules: training, inspections, monitoring, reports - Camel Oil Colors (Green/Yellow theme)
const modulesData = [
  { module: "training", value: 305, fill: "#22C55E" }, // Bright Green
  { module: "inspections", value: 237, fill: "#84CC16" }, // Lime Green
  { module: "monitoring", value: 173, fill: "#EAB308" }, // Amber Yellow
  { module: "reports", value: 209, fill: "#F59E0B" }, // Yellow
]

// Custom CSS variables for camel oil colors
const camelOilColors = {
  '--color-training': '#22C55E',
  '--color-inspections': '#84CC16',
  '--color-monitoring': '#EAB308',
  '--color-reports': '#F59E0B',
  '--color-training-light': '#DCFCE7',
  '--color-inspections-light': '#ECFCCB',
  '--color-monitoring-light': '#FEF9C3',
  '--color-reports-light': '#FEF3C7',
}

const chartConfig = {
  activities: {
    label: "Activities",
  },
  value: {
    label: "Value",
  },
  training: {
    label: "Training Portal",
    color: "#22C55E",
    icon: BookOpen,
  },
  inspections: {
    label: "Inspections",
    color: "#84CC16",
    icon: Search,
  },
  monitoring: {
    label: "Monitoring",
    color: "#EAB308",
    icon: Eye,
  },
  reports: {
    label: "Reports",
    color: "#F59E0B",
    icon: FileText,
  },
}

// Module stats for quick view
const moduleStats = {
  training: { 
    total: 1290, 
    trend: "up", 
    change: "+12%",
    subtitle: "Course Completions"
  },
  inspections: { 
    total: 420, 
    trend: "up", 
    change: "+8%",
    subtitle: "Checks Completed"
  },
  monitoring: { 
    total: 165, 
    trend: "down", 
    change: "-15%",
    subtitle: "Alerts Resolved"
  },
  reports: { 
    total: 1850, 
    trend: "up", 
    change: "+22%",
    subtitle: "Documents Generated"
  }
}

export function ChartPieInteractive() {
  const id = "pie-interactive"
  const [activeModule, setActiveModule] = React.useState(modulesData[0].module)

  const activeIndex = React.useMemo(
    () => modulesData.findIndex((item) => item.module === activeModule),
    [activeModule]
  )
  const modules = React.useMemo(() => modulesData.map((item) => item.module), [])

  // Apply camel oil colors to CSS variables
  React.useEffect(() => {
    Object.entries(camelOilColors).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value)
    })
    
    return () => {
      Object.keys(camelOilColors).forEach(key => {
        document.documentElement.style.removeProperty(key)
      })
    }
  }, [])

  const getIcon = (module) => {
    const Icon = chartConfig[module]?.icon || Activity
    return <Icon className="w-4 h-4" />
  }

  const getBgColor = (module, isActive) => {
    const colors = {
      training: isActive ? 'bg-green-50' : 'hover:bg-green-50',
      inspections: isActive ? 'bg-lime-50' : 'hover:bg-lime-50',
      monitoring: isActive ? 'bg-amber-50' : 'hover:bg-amber-50',
      reports: isActive ? 'bg-yellow-50' : 'hover:bg-yellow-50',
    }
    return colors[module] || 'hover:bg-gray-50'
  }

  const getBorderColor = (module, isActive) => {
    if (!isActive) return 'border-gray-200'
    
    const colors = {
      training: 'border-green-200',
      inspections: 'border-lime-200',
      monitoring: 'border-amber-200',
      reports: 'border-yellow-200',
    }
    return colors[module] || 'border-gray-200'
  }

  const getTextColor = (module, isActive) => {
    if (!isActive) return 'text-gray-600'
    
    const colors = {
      training: 'text-green-600',
      inspections: 'text-lime-600',
      monitoring: 'text-amber-600',
      reports: 'text-yellow-600',
    }
    return colors[module] || 'text-gray-600'
  }

  const getTrendColor = (trend) => {
    return trend === 'down' ? 'text-green-600' : 'text-yellow-600'
  }

  const getTrendBgColor = (trend) => {
    return trend === 'down' ? 'bg-green-100' : 'bg-yellow-100'
  }

  return (
    <div className="space-y-4">
      <style jsx>{`
        :root {
          --color-training: #22C55E;
          --color-inspections: #84CC16;
          --color-monitoring: #EAB308;
          --color-reports: #F59E0B;
        }
      `}</style>
      
      <Card data-chart={id} className="flex flex-col border-none shadow-none bg-white">
        <ChartStyle id={id} config={chartConfig} />
        <CardHeader className="flex-row items-start space-y-0 pb-0">
          <div className="grid gap-1">
            <CardTitle className="text-sm font-semibold text-gray-900">Modules Activity Distribution</CardTitle>
            <CardDescription className="text-gray-500">Performance across all HSSEQ modules</CardDescription>
          </div>
          <Select value={activeModule} onValueChange={setActiveModule}>
            <SelectTrigger
              className="ml-auto h-7 w-[130px] rounded-lg pl-2.5 bg-white border-gray-200"
              aria-label="Select a module"
            >
              <SelectValue placeholder="Select module" />
            </SelectTrigger>
            <SelectContent align="end" className="rounded-xl bg-white">
              {modules.map((key) => {
                const config = chartConfig[key]
                if (!config) return null

                return (
                  <SelectItem
                    key={key}
                    value={key}
                    className="rounded-lg [&_span]:flex hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-2 text-xs">
                      <span
                        className="flex h-3 w-3 shrink-0 rounded-xs"
                        style={{
                          backgroundColor: config.color,
                        }}
                      />
                      <span className="text-gray-700">{config?.label}</span>
                    </div>
                  </SelectItem>
                )
              })}
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent className="flex flex-1 justify-center pb-0">
          <ChartContainer
            id={id}
            config={chartConfig}
            className="mx-auto aspect-square w-full max-w-[300px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={modulesData}
                dataKey="value"
                nameKey="module"
                innerRadius={60}
                strokeWidth={5}
                activeIndex={activeIndex}
                activeShape={(props) => {
                  const { outerRadius = 0, ...restProps } = props
                  return (
                    <g>
                      <Sector {...restProps} outerRadius={outerRadius + 10} />
                      <Sector
                        {...restProps}
                        outerRadius={outerRadius + 25}
                        innerRadius={outerRadius + 12}
                      />
                    </g>
                  )
                }}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      const activeModuleData = modulesData[activeIndex]
                      const stats = moduleStats[activeModuleData.module]
                      const color = chartConfig[activeModuleData.module]?.color || '#000'
                      
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-2xl font-bold"
                            style={{ fill: color }}
                          >
                            {activeModuleData.value}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 20}
                            className="fill-muted-foreground text-xs"
                          >
                            Activities
                          </tspan>
                          {stats && (
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 40}
                              className="fill-muted-foreground text-xs"
                            >
                              {stats.subtitle}
                            </tspan>
                          )}
                        </text>
                      )
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Module Quick Stats */}
      <Card className="border-none shadow-none bg-white">
        <CardContent className="p-4">
          <div className="grid grid-cols-2 gap-3">
            {modulesData.map((item) => {
              const config = chartConfig[item.module]
              const stats = moduleStats[item.module]
              const isActive = item.module === activeModule
              const Icon = config?.icon || Activity
              
              return (
                <button
                  key={item.module}
                  onClick={() => setActiveModule(item.module)}
                  className={`flex flex-col items-start p-3 rounded-lg border transition-all cursor-pointer ${getBgColor(item.module, isActive)} ${getBorderColor(item.module, isActive)} ${
                    isActive ? 'border-2 transform scale-[1.02]' : ''
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`p-1.5 rounded-md ${getTrendBgColor(stats?.trend)}`}>
                      <Icon className="w-3 h-3" style={{ color: config.color }} />
                    </div>
                    <span className={`text-xs font-medium ${getTextColor(item.module, isActive)}`}>
                      {config?.label}
                    </span>
                  </div>
                  <div className="text-lg font-bold text-gray-900">{item.value}</div>
                  <div className="flex items-center gap-1 mt-1">
                    {stats?.trend === 'down' ? (
                      <TrendingDown className="w-3 h-3 text-green-500" />
                    ) : (
                      <TrendingUp className="w-3 h-3 text-yellow-500" />
                    )}
                    <span className={`text-xs ${getTrendColor(stats?.trend)}`}>
                      {stats?.change}
                    </span>
                  </div>
                </button>
              )
            })}
          </div>
          
          {/* Current Module Stats */}
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-semibold text-gray-900">
                {chartConfig[activeModule]?.label} Performance
              </h4>
              <div className={`p-1.5 rounded-md ${getTrendBgColor(moduleStats[activeModule]?.trend)}`}>
                {getIcon(activeModule)}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">{moduleStats[activeModule]?.subtitle}</p>
                <p className="text-lg font-bold text-gray-900">
                  {moduleStats[activeModule]?.total.toLocaleString()}
                </p>
              </div>
              <div className={`px-2 py-1 rounded-lg ${getTrendBgColor(moduleStats[activeModule]?.trend)} ${getTrendColor(moduleStats[activeModule]?.trend)}`}>
                <span className="text-xs font-medium">{moduleStats[activeModule]?.change}</span>
              </div>
            </div>
            <div className="mt-3 text-xs text-gray-500">
              <span style={{ color: chartConfig[activeModule]?.color, fontWeight: 500 }}>
                {modulesData[activeIndex]?.value} current activities
              </span>
              <span className="mx-2">•</span>
              <span>Jan-Jun 2024</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}