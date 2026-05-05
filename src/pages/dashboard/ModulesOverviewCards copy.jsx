



import { 
    Users, 
    ClipboardCheck, 
    BarChart3, 
    Monitor,
    BookOpen,
    Target,
    TrendingUp,
    Shield,
    Calendar,
    FileText,
    AlertCircle,
    Settings
  } from "lucide-react";
  
  export function ModulesOverviewCards() {
    const mainModules = [
      {
        title: "Training Portal",
        description: "Employee training programs, certifications, and compliance training management",
        icon: Users,
        color: "purple",
        stats: { completed: "245", total: "280", progress: 87 },
        features: ["Course Management", "Certification Tracking", "Training Analytics"],
        link: "/training"
      },
      {
        title: "Inspection Management",
        description: "Schedule, conduct, and track safety inspections across all facilities",
        icon: ClipboardCheck,
        color: "indigo",
        stats: { completed: "24", total: "30", progress: 80 },
        features: ["Checklist Templates", "Mobile Inspection", "Corrective Actions"],
        link: "/inspections"
      },
      {
        title: "Analytics & Reports",
        description: "Comprehensive analytics, custom reports, and performance dashboards",
        icon: BarChart3,
        color: "teal",
        stats: { generated: "18", scheduled: "5", progress: 65 },
        features: ["Custom Reports", "Real-time Analytics", "Export Tools"],
        link: "/analytics"
      },
      {
        title: "Monitoring",
        description: "Real-time monitoring of safety parameters and environmental conditions",
        icon: Monitor,
        color: "cyan",
        stats: { active: "156", alerts: "3", progress: 92 },
        features: ["Live Monitoring", "Alert System", "Historical Data"],
        link: "/monitoring"
      }
    ];
  
    const otherModules = [
      {
        title: "Document Management",
        icon: FileText,
        color: "gray",
        count: "1,245",
        link: "/documents"
      },
      {
        title: "Calendar",
        icon: Calendar,
        color: "orange",
        count: "42",
        link: "/calendar"
      },
      {
        title: "Settings",
        icon: Settings,
        color: "slate",
        count: "Updated",
        link: "/settings"
      },
      {
        title: "Help & Support",
        icon: Shield,
        color: "emerald",
        count: "24/7",
        link: "/support"
      }
    ];
  
    return (
      <div className="space-y-6">
        {/* Full-width header */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-6 text-white shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h2 className="text-2xl font-bold mb-2">HSSEQ Modules</h2>
              <p className="text-gray-300">Complete suite of Health, Safety, Security, Environment & Quality tools</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-2xl font-bold">8</div>
                <div className="text-sm text-gray-300">Active Modules</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">4</div>
                <div className="text-sm text-gray-300">Core Systems</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">100%</div>
                <div className="text-sm text-gray-300">Operational</div>
              </div>
            </div>
          </div>
        </div>
  
        {/* Main Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {mainModules.map((module, index) => {
            const Icon = module.icon;
            
            const colorClasses = {
              purple: { bg: "bg-purple-500", light: "bg-purple-50", text: "text-purple-600" },
              indigo: { bg: "bg-indigo-500", light: "bg-indigo-50", text: "text-indigo-600" },
              teal: { bg: "bg-teal-500", light: "bg-teal-50", text: "text-teal-600" },
              cyan: { bg: "bg-cyan-500", light: "bg-cyan-50", text: "text-cyan-600" },
            }[module.color] || { bg: "bg-gray-500", light: "bg-gray-50", text: "text-gray-600" };
  
            return (
              <a
                key={index}
                href={module.link}
                className="group bg-white rounded-xl p-5 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-100 hover:border-gray-200"
              >
                {/* Module Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-white to-gray-50 shadow-xs">
                    <Icon className={`w-6 h-6 ${colorClasses.text}`} />
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-medium text-gray-500">Progress</div>
                    <div className="text-lg font-bold text-gray-900">{module.stats.progress}%</div>
                  </div>
                </div>
  
                {/* Module Title */}
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                  {module.title}
                </h3>
  
                {/* Description */}
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {module.description}
                </p>
  
                {/* Stats */}
                <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 rounded-lg">
                  {Object.entries(module.stats).map(([key, value], idx) => (
                    <div key={idx} className="text-center">
                      <div className="text-sm font-bold text-gray-900">{value}</div>
                      <div className="text-xs text-gray-500 capitalize">{key}</div>
                    </div>
                  ))}
                </div>
  
                {/* Features */}
                <div className="space-y-2">
                  {module.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center">
                      <div className={`w-1.5 h-1.5 rounded-full ${colorClasses.bg} mr-2`}></div>
                      <span className="text-xs text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>
  
                {/* Progress Bar */}
                <div className="mt-4">
                  <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${colorClasses.bg} rounded-full transition-all duration-700`}
                      style={{ width: `${module.stats.progress}%` }}
                    />
                  </div>
                </div>
              </a>
            );
          })}
        </div>
  
        {/* Additional Modules Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Additional Modules</h3>
              <p className="text-sm text-gray-600">Supporting tools and utilities</p>
            </div>
            <div className="text-sm text-gray-500">
              Total: {otherModules.length} modules
            </div>
          </div>
  
          {/* Small Cards Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {otherModules.map((module, index) => {
              const Icon = module.icon;
              
              const colorMap = {
                gray: { bg: "bg-gray-100", text: "text-gray-700" },
                orange: { bg: "bg-orange-100", text: "text-orange-700" },
                slate: { bg: "bg-slate-100", text: "text-slate-700" },
                emerald: { bg: "bg-emerald-100", text: "text-emerald-700" },
              }[module.color] || { bg: "bg-gray-100", text: "text-gray-700" };
  
              return (
                <a
                  key={index}
                  href={module.link}
                  className="group bg-white p-4 rounded-lg border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-200 cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-2 rounded-lg ${colorMap.bg}`}>
                      <Icon className={`w-5 h-5 ${colorMap.text}`} />
                    </div>
                    <div className="text-xs font-medium text-gray-900 bg-gray-50 px-2 py-1 rounded">
                      {module.count}
                    </div>
                  </div>
                  <h4 className="text-sm font-medium text-gray-900 group-hover:text-gray-700 transition-colors">
                    {module.title}
                  </h4>
                  <div className="mt-2 h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${colorMap.bg.replace("100", "500")} rounded-full transition-all duration-300 group-hover:w-full`}
                      style={{ width: "40%" }}
                    />
                  </div>
                </a>
              );
            })}
          </div>
  
          {/* Quick Stats Footer */}
          <div className="mt-6 pt-6 border-t border-gray-100">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-sm font-medium text-gray-900">All Modules</div>
                <div className="text-xs text-gray-600">Integrated Platform</div>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-sm font-medium text-blue-900">24/7 Access</div>
                <div className="text-xs text-blue-600">Always Available</div>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-sm font-medium text-green-900">Secure</div>
                <div className="text-xs text-green-600">Encrypted Data</div>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <div className="text-sm font-medium text-purple-900">Mobile Ready</div>
                <div className="text-xs text-purple-600">Responsive Design</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }