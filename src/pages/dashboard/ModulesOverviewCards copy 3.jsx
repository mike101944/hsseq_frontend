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
  TrendingUp,
  Target,
  Shield,
  Activity,
  Database
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
      color: "blue",
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
      color: "green",
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
      color: "purple",
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

  const colorClasses = {
    blue: { 
      light: "bg-blue-50", 
      text: "text-blue-600",
      border: "border-blue-200",
      modalHeader: "bg-gradient-to-r from-blue-600 to-blue-700"
    },
    green: { 
      light: "bg-green-50", 
      text: "text-green-600",
      border: "border-green-200",
      modalHeader: "bg-gradient-to-r from-green-600 to-green-700"
    },
    purple: { 
      light: "bg-purple-50", 
      text: "text-purple-600",
      border: "border-purple-200",
      modalHeader: "bg-gradient-to-r from-purple-600 to-purple-700"
    },
    amber: { 
      light: "bg-amber-50", 
      text: "text-amber-600",
      border: "border-amber-200",
      modalHeader: "bg-gradient-to-r from-amber-600 to-amber-700"
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

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">System Modules</h2>
          <p className="text-gray-600 mt-1">Specialized tools for HSSEQ management</p>
        </div>
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <div className="text-sm text-gray-500">
            <span className="font-medium text-gray-900">4</span> core modules available
          </div>
        </div>
      </div>

      {/* Main Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {mainModules.map((module) => {
          const Icon = module.icon;
          const colors = colorClasses[module.color] || colorClasses.blue;
          
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
                className="block bg-white rounded-xl p-5 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer border border-gray-200 hover:border-gray-300"
              >
                {/* Card Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-lg ${colors.light} border ${colors.border}`}>
                      <Icon className={`w-5 h-5 ${colors.text}`} />
                    </div>
                   
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {module.title.length > 15 ? `${module.title.substring(0, 15)}...` : module.title}
                </h3>
                  </div>
            
                  {/* View More Button */}
                  <button
                    onClick={(e) => handleViewMore(module.id, e)}
                    className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors relative"
                    title="View details"
                  >
                    <Eye className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                    
                    {/* Tooltip */}
                    {hoveredCard === module.id && (
                      <div className="absolute -top-8 -right-2 bg-gray-900 text-white text-xs py-1.5 px-2.5 rounded shadow-lg whitespace-nowrap z-10">
                        View details
                        <div className="absolute -bottom-1 right-3 w-2 h-2 bg-gray-900 rotate-45"></div>
                      </div>
                    )}
                  </button>
                </div>

                

                {/* Quick Stats */}
                <div className="space-y-3">
                  {Object.entries(module.stats).slice(0, 2).map(([key, value], idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                      <span className="text-sm font-semibold text-gray-900">{value}</span>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{module.lastUpdated}</span>
                    <div className="flex items-center gap-1 text-xs text-blue-600 font-medium">
                      <span>Open</span>
                      <ChevronRight className="w-3 h-3" />
                    </div>
                  </div>
                </div>
              </a>
            </div>
          );
        })}
      </div>

      {/* Professional Modal */}
      {modalOpen && (() => {
        const module = mainModules.find(m => m.id === modalOpen);
        if (!module) return null;
        
        const Icon = module.icon;
        const colors = colorClasses[module.color] || colorClasses.blue;
        
        return (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black/40 z-50 transition-opacity"
              onClick={closeModal}
            />
            
            {/* Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl">
                {/* Modal Header */}
                <div className={`${colors.modalHeader} p-6 text-white`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                        <Icon className="w-7 h-7" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-semibold">{module.title}</h2>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-white/90 text-sm">{module.status}</span>
                          <span className="text-white/70 text-sm">•</span>
                          <span className="text-white/70 text-sm">Updated {module.lastUpdated}</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={closeModal}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Modal Content */}
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column - Description & Usage */}
                    <div className="lg:col-span-2 space-y-6">
                      {/* Description */}
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-1.5 h-4 bg-gray-300 rounded"></div>
                          <h3 className="font-semibold text-gray-900">Overview</h3>
                        </div>
                        <p className="text-gray-700 leading-relaxed">{module.description}</p>
                      </div>

                      {/* Usage */}
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-1.5 h-4 bg-gray-300 rounded"></div>
                          <h3 className="font-semibold text-gray-900">Primary Usage</h3>
                        </div>
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Users className="w-4 h-4 text-gray-500" />
                            <span className="text-gray-700 font-medium">{module.usage}</span>
                          </div>
                          <p className="text-sm text-gray-600">Optimized for departmental workflow integration</p>
                        </div>
                      </div>

                      {/* Benefits */}
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-1.5 h-4 bg-gray-300 rounded"></div>
                          <h3 className="font-semibold text-gray-900">Key Benefits</h3>
                        </div>
                        <div className="space-y-3">
                          {module.benefits.map((benefit, idx) => (
                            <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                              <Zap className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700">{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right Column - Stats & Features */}
                    <div className="space-y-6">
                      {/* Stats */}
                      <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                        <div className="flex items-center gap-2 mb-4">
                          <Activity className="w-4 h-4 text-gray-500" />
                          <h3 className="font-semibold text-gray-900">System Statistics</h3>
                        </div>
                        <div className="space-y-4">
                          {Object.entries(module.stats).map(([key, value], idx) => (
                            <div key={idx} className="flex items-center justify-between pb-3 border-b border-gray-200 last:border-0 last:pb-0">
                              <span className="text-sm text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                              <span className="font-semibold text-gray-900">{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Features */}
                      <div>
                        <div className="flex items-center gap-2 mb-4">
                          <Target className="w-4 h-4 text-gray-500" />
                          <h3 className="font-semibold text-gray-900">Core Features</h3>
                        </div>
                        <div className="space-y-3">
                          {module.features.map((feature, idx) => (
                            <div key={idx} className="flex items-start gap-3">
                              <CheckCircle className={`w-4 h-4 ${colors.text} mt-0.5 flex-shrink-0`} />
                              <span className="text-sm text-gray-700">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="border-t border-gray-200 p-6">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-sm text-gray-600">
                      Access this module directly or explore details
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={closeModal}
                        className="px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium"
                      >
                        Close Preview
                      </button>
                      <a
                        href={module.link}
                        className="px-4 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium flex items-center gap-2"
                      >
                        <ExternalLink className="w-4 h-4" />
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