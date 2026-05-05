import { 
    TrendingUp, 
    TrendingDown, 
    AlertTriangle,
    CheckCircle,
    Clock,
    Calendar,
    BarChart3,
    LineChart,
    PieChart,
    Download,
    Filter,
    ChevronRight,
    Users,
    Shield,
    Target
  } from "lucide-react";
  import { useState } from "react";
  
  export function HSSEQCharts() {
    const [selectedPeriod, setSelectedPeriod] = useState("month");
    const [selectedMetric, setSelectedMetric] = useState("incidents");
  
    // Chart data
    const incidentData = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      datasets: [
        {
          label: 'Reported Incidents',
          data: [12, 19, 8, 15, 10, 12, 7],
          borderColor: '#EF4444',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
        },
        {
          label: 'Resolved Incidents',
          data: [8, 15, 5, 12, 8, 10, 6],
          borderColor: '#10B981',
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
        }
      ]
    };
  
    const complianceData = {
      labels: ['Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024'],
      data: [82, 88, 91, 94],
      target: 95
    };
  
    const timelineEvents = [
      { id: 1, time: "09:30 AM", title: "Safety Audit - Facility A", type: "audit", status: "completed" },
      { id: 2, time: "11:15 AM", title: "Incident Report Filed", type: "incident", status: "pending" },
      { id: 3, time: "02:00 PM", title: "Monthly Compliance Review", type: "review", status: "in-progress" },
      { id: 4, time: "03:45 PM", title: "Training Session - Safety", type: "training", status: "upcoming" },
      { id: 5, time: "04:30 PM", title: "Risk Assessment Meeting", type: "meeting", status: "completed" },
    ];
  
    const quickStats = [
      { label: "Safety Score", value: "92%", change: "+2.5%", trend: "up", icon: Shield },
      { label: "Training Completion", value: "87%", change: "+5%", trend: "up", icon: Users },
      { label: "Audit Compliance", value: "94%", change: "-1%", trend: "down", icon: CheckCircle },
      { label: "Response Time", value: "2.4h", change: "-0.8h", trend: "up", icon: Clock },
    ];
  
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Performance Analytics</h2>
            <p className="text-gray-600 mt-1">HSSEQ metrics & trends overview</p>
          </div>
          <div className="flex items-center gap-3 mt-4 md:mt-0">
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </button>
            <button className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>
  
        {/* Main Chart Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Large Chart - Left Column */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              {/* Chart Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Incident Trends</h3>
                  <p className="text-sm text-gray-600 mt-1">Last 7 months performance</p>
                </div>
                <div className="flex items-center gap-2 mt-3 sm:mt-0">
                  {['week', 'month', 'quarter', 'year'].map((period) => (
                    <button
                      key={period}
                      onClick={() => setSelectedPeriod(period)}
                      className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                        selectedPeriod === period
                          ? 'bg-amber-100 text-amber-700'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {period.charAt(0).toUpperCase() + period.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
  
              {/* Chart Area */}
              <div className="h-72 flex items-center justify-center">
                {/* Chart Visualization - Replace with actual chart library */}
                <div className="w-full h-full relative">
                  {/* Y-axis */}
                  <div className="absolute left-0 top-0 bottom-0 w-8 flex flex-col justify-between text-xs text-gray-500">
                    <span>20</span>
                    <span>15</span>
                    <span>10</span>
                    <span>5</span>
                    <span>0</span>
                  </div>
                  
                  {/* Chart Bars */}
                  <div className="ml-8 h-full flex items-end justify-between px-4">
                    {incidentData.labels.map((month, idx) => (
                      <div key={month} className="flex flex-col items-center">
                        <div className="flex items-end gap-1 mb-2">
                          {/* Reported Incidents */}
                          <div 
                            className="w-6 bg-red-500 rounded-t-lg hover:bg-red-600 transition-colors"
                            style={{ height: `${(incidentData.datasets[0].data[idx] / 20) * 100}%` }}
                            title={`${incidentData.datasets[0].data[idx]} reported incidents`}
                          ></div>
                          {/* Resolved Incidents */}
                          <div 
                            className="w-6 bg-green-500 rounded-t-lg hover:bg-green-600 transition-colors"
                            style={{ height: `${(incidentData.datasets[1].data[idx] / 20) * 100}%` }}
                            title={`${incidentData.datasets[1].data[idx]} resolved incidents`}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-500">{month}</span>
                      </div>
                    ))}
                  </div>
  
                  {/* Legend */}
                  <div className="absolute bottom-8 left-8 flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded"></div>
                      <span className="text-sm text-gray-700">Reported</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded"></div>
                      <span className="text-sm text-gray-700">Resolved</span>
                    </div>
                  </div>
                </div>
              </div>
  
              {/* Chart Summary */}
              <div className="mt-6 pt-6 border-t border-gray-100 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-red-50 rounded-lg">
                  <div className="text-sm text-red-700 font-medium">Total Reported</div>
                  <div className="text-xl font-bold text-gray-900 mt-1">83</div>
                  <div className="text-xs text-red-600 mt-1">
                    <TrendingUp className="w-3 h-3 inline mr-1" />
                    +12% this period
                  </div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-sm text-green-700 font-medium">Resolved Rate</div>
                  <div className="text-xl font-bold text-gray-900 mt-1">78%</div>
                  <div className="text-xs text-green-600 mt-1">
                    <TrendingUp className="w-3 h-3 inline mr-1" />
                    +5% improvement
                  </div>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-sm text-blue-700 font-medium">Avg Response</div>
                  <div className="text-xl font-bold text-gray-900 mt-1">2.4h</div>
                  <div className="text-xs text-blue-600 mt-1">
                    <TrendingDown className="w-3 h-3 inline mr-1" />
                    -0.8h faster
                  </div>
                </div>
                <div className="text-center p-3 bg-amber-50 rounded-lg">
                  <div className="text-sm text-amber-700 font-medium">Open Cases</div>
                  <div className="text-xl font-bold text-gray-900 mt-1">12</div>
                  <div className="text-xs text-amber-600 mt-1">
                    <TrendingDown className="w-3 h-3 inline mr-1" />
                    -3 from last week
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          {/* Right Column - Timeline & Stats */}
          <div className="space-y-6">
            {/* Compliance Chart */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Compliance Trend</h3>
                  <p className="text-sm text-gray-600 mt-1">Quarterly performance</p>
                </div>
                <div className="p-2 bg-green-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
              </div>
  
              {/* Compliance Progress */}
              <div className="space-y-4">
                {complianceData.labels.map((quarter, idx) => (
                  <div key={quarter}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">{quarter}</span>
                      <span className="text-sm font-semibold text-gray-900">{complianceData.data[idx]}%</span>
                    </div>
                    <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${
                          complianceData.data[idx] >= 90 ? 'bg-green-500' :
                          complianceData.data[idx] >= 80 ? 'bg-amber-500' : 'bg-red-500'
                        } rounded-full transition-all duration-700`}
                        style={{ width: `${complianceData.data[idx]}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
  
              {/* Target Line */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">Annual Target</div>
                  <div className="text-lg font-bold text-gray-900">{complianceData.target}%</div>
                </div>
                <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden mt-2">
                  <div className="h-full bg-gradient-to-r from-green-400 to-emerald-600 rounded-full" style={{ width: '95%' }}></div>
                </div>
              </div>
            </div>
  
            {/* Quick Stats */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Metrics</h3>
              <div className="space-y-3">
                {quickStats.map((stat, idx) => {
                  const Icon = stat.icon;
                  return (
                    <div key={idx} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gray-100 rounded-lg">
                          <Icon className="w-4 h-4 text-gray-600" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{stat.label}</div>
                          <div className={`text-xs flex items-center mt-1 ${
                            stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {stat.trend === 'up' ? (
                              <TrendingUp className="w-3 h-3 mr-1" />
                            ) : (
                              <TrendingDown className="w-3 h-3 mr-1" />
                            )}
                            {stat.change}
                          </div>
                        </div>
                      </div>
                      <div className="text-lg font-bold text-gray-900">{stat.value}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
  
        {/* Additional Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Recent Activity Timeline */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 md:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
                <p className="text-sm text-gray-600 mt-1">Today's HSSEQ events</p>
              </div>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                View All <ChevronRight className="w-4 h-4" />
              </button>
            </div>
  
            <div className="space-y-4">
              {timelineEvents.map((event) => (
                <div key={event.id} className="flex items-start gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="flex-shrink-0">
                    <div className={`p-2 rounded-lg ${
                      event.status === 'completed' ? 'bg-green-100' :
                      event.status === 'in-progress' ? 'bg-blue-100' :
                      'bg-amber-100'
                    }`}>
                      <Clock className={`w-4 h-4 ${
                        event.status === 'completed' ? 'text-green-600' :
                        event.status === 'in-progress' ? 'text-blue-600' :
                        'text-amber-600'
                      }`} />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900">{event.title}</span>
                      <span className="text-xs text-gray-500">{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        event.type === 'audit' ? 'bg-blue-100 text-blue-700' :
                        event.type === 'incident' ? 'bg-red-100 text-red-700' :
                        event.type === 'review' ? 'bg-purple-100 text-purple-700' :
                        event.type === 'training' ? 'bg-green-100 text-green-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {event.type}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        event.status === 'completed' ? 'bg-green-100 text-green-700' :
                        event.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                        'bg-amber-100 text-amber-700'
                      }`}>
                        {event.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
  
          {/* Performance Score */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 text-white">
            <div className="text-center">
              <div className="inline-block p-3 bg-white/10 rounded-xl backdrop-blur-sm mb-4">
                <Target className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Overall Safety Score</h3>
              <div className="text-5xl font-bold my-6">92.5</div>
              <div className="text-sm text-gray-300">Out of 100</div>
              <div className="mt-4 h-2 w-full bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full" style={{ width: '92.5%' }}></div>
              </div>
              <div className="flex items-center justify-between mt-2 text-sm">
                <span className="text-gray-300">Low Risk</span>
                <span className="text-green-400 font-medium">Excellent</span>
                <span className="text-gray-300">High Risk</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }