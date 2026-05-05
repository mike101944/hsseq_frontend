import { useState } from "react";
import { 
  Users, 
  ClipboardCheck, 
  BarChart3, 
  Monitor,
  ChevronRight,
  ExternalLink,
  X,
  CheckCircle,
  Zap,
  Eye,
  Activity,
  Target,
  ArrowUpRight
} from "lucide-react";

export function ModulesOverviewCards() {
  const [modalOpen, setModalOpen] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  const mainModules = [
    {
      id: 1,
      title: "Training Portal",
      description: "Comprehensive training management system for HSSEQ compliance and employee development with automated tracking and reporting capabilities.",
      icon: Users,
      color: "green",
      status: "Active",
      stats: { 
        completed: "245", 
        total: "280", 
        activeUsers: "156",
        completionRate: "94%"
      },
      features: [
        "Course Management & Scheduling",
        "Certification Tracking", 
        "Training Analytics",
        "Mobile Learning Support",
        "Automated Reminders"
      ],
      benefits: [
        "65% reduction in compliance violations",
        "40% improved employee engagement",
        "Automated certification renewals"
      ],
      usage: "Daily by HR and Safety departments",
      link: "/training",
      lastUpdated: "2 hours ago"
    },
    {
      id: 2,
      title: "Inspection Management",
      description: "Complete safety inspection workflow with digital checklists, mobile capabilities, and automated corrective action tracking for continuous improvement.",
      icon: ClipboardCheck,
      color: "amber",
      status: "Active",
      stats: { 
        completed: "24", 
        total: "30", 
        pendingActions: "8",
        complianceScore: "92%"
      },
      features: [
        "Digital Checklist Templates",
        "Mobile Inspection App",
        "Corrective Action Tracking",
        "Photo Documentation",
        "Real-time Compliance"
      ],
      benefits: [
        "50% reduction in inspection time",
        "Improved audit readiness",
        "Automated follow-up workflows"
      ],
      usage: "Field teams and safety officers",
      link: "/inspections",
      lastUpdated: "Today, 09:30 AM"
    },
    {
      id: 3,
      title: "Analytics & Reports",
      description: "Advanced analytics platform providing actionable insights through customizable dashboards and automated regulatory reporting features.",
      icon: BarChart3,
      color: "green",
      status: "Active",
      stats: { 
        generated: "18", 
        scheduled: "5", 
        activeDashboards: "12",
        dataSources: "8"
      },
      features: [
        "Custom Report Builder",
        "Real-time Dashboards",
        "Multiple Export Formats",
        "Scheduled Delivery",
        "Predictive Analytics"
      ],
      benefits: [
        "30% faster decision making",
        "Automated regulatory reporting",
        "Executive dashboard customization"
      ],
      usage: "Management and compliance teams",
      link: "/analytics",
      lastUpdated: "Yesterday, 04:15 PM"
    },
    {
      id: 4,
      title: "Monitoring",
      description: "Real-time monitoring system tracking safety parameters and environmental conditions with predictive analytics and instant alert capabilities.",
      icon: Monitor,
      color: "amber",
      status: "Active",
      stats: { 
        active: "156", 
        alerts: "3", 
        sensors: "42",
        uptime: "99.8%"
      },
      features: [
        "Live Monitoring Dashboard",
        "Smart Alert System",
        "Historical Data Analysis",
        "Predictive Maintenance",
        "Mobile Notifications"
      ],
      benefits: [
        "40% reduction in downtime",
        "Proactive issue detection",
        "24/7 monitoring coverage"
      ],
      usage: "Operations and maintenance teams",
      link: "/monitoring",
      lastUpdated: "Just now"
    }
  ];

  // Camel Oil Colors: Green & Yellow/Amber
  const colorClasses = {
    green: { 
      light: "bg-green-50", 
      text: "text-green-700",
      border: "border-green-200",
      bg: "bg-green-500",
      hover: "hover:bg-green-600",
      gradient: "from-green-600 to-emerald-700",
      statBg: "bg-green-100",
      statText: "text-green-800"
    },
    amber: { 
      light: "bg-amber-50", 
      text: "text-amber-700",
      border: "border-amber-200",
      bg: "bg-amber-500",
      hover: "hover:bg-amber-600",
      gradient: "from-amber-600 to-yellow-700",
      statBg: "bg-amber-100",
      statText: "text-amber-800"
    },
  };

  const handleViewMore = (moduleId, e) => {
    e.preventDefault();
    e.stopPropagation();
    setModalOpen(moduleId);
  };

  const closeModal = () => {
    setModalOpen(null);
  };

  const truncateTitle = (title, maxLength = 12) => {
    return title.length > maxLength ? `${title.substring(0, maxLength)}...` : title;
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-gray-50 via-white to-gray-50/50 border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
  <div className="flex flex-col md:flex-row md:items-center justify-between">
    {/* Left Content */}
    <div className="mb-4 md:mb-0">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-1.5 h-7 bg-gradient-to-b from-amber-500 to-amber-600 rounded-full"></div>
        <h2 className="text-xl md:text-xl font-bold text-gray-400">
          System Modules
        </h2>
      </div>
      <p className="text-gray-600 text-sm md:text-xl mt-2 max-w-2xl">
        Complete suite of <span className="font-bold text-green-400/50">hsseq management tools</span>
      </p>
    </div>

    {/* Right Content - Stats */}
    <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row items-start sm:items-center md:items-end lg:items-center gap-4 md:gap-3">
      <div className="flex items-center gap-4">
        {/* Active Modules */}
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">4</div>
          <div className="text-sm text-gray-600">Active Modules</div>
        </div>
        
        {/* Divider */}
        <div className="hidden sm:block h-8 w-px bg-gray-300"></div>
        
        
        {/* Operational Status */}
        <div className="text-center">
          <div className="flex items-center gap-2 justify-center">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <div className="text-lg font-bold text-gray-900">100%</div>
          </div>
          <div className="text-sm text-gray-600">Operational</div>
        </div>
      </div>
      
      {/* Last Updated */}
      <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1.5 rounded-lg">
        <span className="font-medium">Last updated:</span> Just now
      </div>
    </div>
  </div>
  

  <div className="mt-6 pt-6 border-t border-gray-100">
    
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {mainModules.map((module) => {
          const Icon = module.icon;
          const colors = colorClasses[module.color] || colorClasses.green;
          
          return (
            <div 
              key={module.id}
              className="relative group"
              onMouseEnter={() => setHoveredCard(module.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Card Container */}
              <a
                href={module.link}
                className="block bg-white rounded-xl p-2 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border border-gray-200 hover:border-gray-300 hover:-translate-y-1"
              >
                {/* Card Header - Icon, Title, View Button */}
                <div className="flex items-start justify-between mb-2">
                  {/* Icon with Status */}
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-xl ${colors.light} border ${colors.border} shadow-sm`}>
                      <Icon className={`w-4 h-4 ${colors.text}`} />
                    </div>
                    <h3 
                    className="text-sm font-bold text-gray-900 text-center"
                    title={module.title}
                  >
                    {truncateTitle(module.title, 15)}
                  </h3>
                  </div>
                  
                  {/* View More Button */}
                  <button
                    onClick={(e) => handleViewMore(module.id, e)}
                    className="p-2 hover:bg-gray-100 rounded-lg cursor-pointer transition-all duration-200 relative group/btn"
                    title="View details"
                  >
                    <Eye className="w-4 h-4 text-gray-500 group-hover/btn:text-gray-700 transition-colors" />
                    
                    {/* Tooltip */}
                    {hoveredCard === module.id && (
                      <div className="absolute -top-8 -right-2 bg-gray-900 text-white text-xs py-1.5 px-2.5 rounded-lg shadow-lg whitespace-nowrap z-10 animate-fadeIn">
                        View details
                        <div className="absolute -bottom-1 right-3 w-2 h-2 bg-gray-900 rotate-45"></div>
                      </div>
                    )}
                  </button>
                </div>


                {/* Quick Stats - Improved Design */}
                
                <div className="flex items-center justify-between mb-1 p-2 bg-gray-50 rounded-lg">
                  {Object.entries(module.stats).slice(0, 2).map(([key, value], idx) => (
                    <div key={idx} className="text-center">
                      <div className="text-sm font-bold text-gray-900">{value}</div>
                      <div className="text-xs text-gray-500 capitalize">{key}</div>
                    </div>
                  ))}
                </div>

                {/* Footer - Improved */}
                <div className="pt-5 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${colors.bg} animate-pulse`}></div>
                      <span className="text-xs text-gray-500 font-medium">{module.lastUpdated}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm font-semibold text-gray-700 group-hover:text-gray-900 transition-colors">
                      <span>Access</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </a>

              {/* Glow Effect on Hover */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-transparent to-transparent group-hover:via-green-50/20 group-hover:to-amber-50/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 pointer-events-none"></div>
            </div>
          );
        })}
      </div>



    <div className="flex items-center justify-between mt-3">
      <span className="text-sm font-medium text-gray-700">System Health</span>
      <span className="text-sm font-semibold text-green-600">Excellent</span>
    </div>
    <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
      <div className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full" style={{ width: '98%' }}></div>
    </div>
  </div>
</div>

      {/* Main Modules Grid */}
      

      {/* Professional Modal */}
      {modalOpen && (() => {
        const module = mainModules.find(m => m.id === modalOpen);
        if (!module) return null;
        
        const Icon = module.icon;
        const colors = colorClasses[module.color] || colorClasses.green;
        
        return (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black/40 z-50 transition-opacity backdrop-blur-sm  animate-fadeIn"
              onClick={closeModal}
            />
            
            {/* Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl animate-modalSlide">
                {/* Modal Header */}
                <div className={`bg-gradient-to-r ${colors.gradient} p-8 text-white`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-4 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20">
                        <Icon className="w-8 h-8" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold">{module.title}</h2>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="text-white/90 text-sm bg-white/20 px-3 py-1 rounded-full">
                            {module.status}
                          </span>
                          <span className="text-white/70 text-sm">•</span>
                          <span className="text-white/70 text-sm">Updated {module.lastUpdated}</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={closeModal}
                      className="p-2 hover:bg-white/20 rounded-lg transition-colors duration-200"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                </div>

                {/* Modal Content */}
                <div className="p-8 overflow-y-auto max-h-[calc(90vh-200px)]">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Description & Usage */}
                    <div className="lg:col-span-2 space-y-8">
                      {/* Description */}
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <div className={`w-1.5 h-6 ${colors.bg} rounded-full`}></div>
                          <h3 className="text-lg font-semibold text-gray-900">Overview</h3>
                        </div>
                        <p className="text-gray-700 leading-relaxed text-[15px]">{module.description}</p>
                      </div>

                      {/* Usage */}
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <div className={`w-1.5 h-6 ${colors.bg} rounded-full`}></div>
                          <h3 className="text-lg font-semibold text-gray-900">Primary Usage</h3>
                        </div>
                        <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 hover:bg-gray-100 transition-colors duration-200">
                          <div className="flex items-center gap-3 mb-3">
                            <Users className="w-5 h-5 text-gray-600" />
                            <span className="text-gray-800 font-semibold">{module.usage}</span>
                          </div>
                          <p className="text-sm text-gray-600">Optimized for departmental workflow integration with automated reporting</p>
                        </div>
                      </div>

                      {/* Benefits */}
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <div className={`w-1.5 h-6 ${colors.bg} rounded-full`}></div>
                          <h3 className="text-lg font-semibold text-gray-900">Key Benefits</h3>
                        </div>
                        <div className="space-y-3">
                          {module.benefits.map((benefit, idx) => (
                            <div key={idx} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                              <Zap className={`w-5 h-5 ${colors.text} mt-0.5 flex-shrink-0`} />
                              <span className="text-gray-700 font-medium">{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right Column - Stats & Features */}
                    <div className="space-y-8">
                      {/* Stats */}
                      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                        <div className="flex items-center gap-3 mb-6">
                          <Activity className={`w-5 h-5 ${colors.text}`} />
                          <h3 className="text-lg font-semibold text-gray-900">System Statistics</h3>
                        </div>
                        <div className="space-y-5">
                          {Object.entries(module.stats).map(([key, value], idx) => (
                            <div key={idx} className="flex items-center justify-between pb-4 border-b border-gray-200 last:border-0 last:pb-0">
                              <div className="flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${colors.bg}`}></div>
                                <span className="text-sm text-gray-700 font-medium capitalize">
                                  {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                                </span>
                              </div>
                              <span className="text-lg font-bold text-gray-900">{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Features */}
                      <div>
                        <div className="flex items-center gap-3 mb-6">
                          <Target className={`w-5 h-5 ${colors.text}`} />
                          <h3 className="text-lg font-semibold text-gray-900">Core Features</h3>
                        </div>
                        <div className="space-y-4">
                          {module.features.map((feature, idx) => (
                            <div key={idx} className="flex items-start gap-3 group/feature">
                              <CheckCircle className={`w-5 h-5 ${colors.text} mt-0.5 flex-shrink-0 group-hover/feature:scale-110 transition-transform duration-200`} />
                              <span className="text-sm text-gray-700 font-medium">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="border-t border-gray-200 p-8">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="text-sm text-gray-600 font-medium">
                      Ready to access this module?
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={closeModal}
                        className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-all duration-200 font-medium hover:shadow-sm"
                      >
                        Close Preview
                      </button>
                      <a
                        href={module.link}
                        className={`px-6 py-3 ${colors.bg} text-white rounded-lg hover:shadow-lg transition-all duration-200 font-medium flex items-center gap-2 hover:${colors.hover}`}
                      >
                        <ExternalLink className="w-5 h-5" />
                        Open Module
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      })()}
    </div>
  );
}