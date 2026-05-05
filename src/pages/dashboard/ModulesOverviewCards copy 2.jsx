import { useState } from "react";
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
  Settings,
  ChevronRight,
  ExternalLink,
  X,
  CheckCircle,
  Zap,
  BarChart,
  Bell,
  Download,
  Clock,
  UserCheck,
  FileCheck,
  Eye
} from "lucide-react";

export function ModulesOverviewCards() {
  const [modalOpen, setModalOpen] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  const mainModules = [
    {
      id: 1,
      title: "Training Portal",
      description: "Comprehensive employee training management system for HSSEQ compliance, certification tracking, and skills development across all organizational levels.",
      icon: Users,
      color: "purple",
      status: "Active",
      stats: { 
        completed: "245", 
        total: "280", 
        progress: 87,
        activeUsers: "156",
        completionRate: "94%"
      },
      features: [
        "Course Management & Scheduling",
        "Certification & Compliance Tracking", 
        "Training Analytics & Reporting",
        "Mobile Learning Support",
        "Automated Reminders & Notifications"
      ],
      benefits: [
        "Reduced compliance violations by 65%",
        "Improved employee engagement by 40%",
        "Automated certification renewals"
      ],
      link: "/training",
      lastUpdated: "2 hours ago"
    },
    {
      id: 2,
      title: "Inspection Management",
      description: "End-to-end safety inspection workflow management with mobile capabilities, corrective action tracking, and real-time reporting.",
      icon: ClipboardCheck,
      color: "indigo",
      status: "Active",
      stats: { 
        completed: "24", 
        total: "30", 
        progress: 80,
        pendingActions: "8",
        complianceScore: "92%"
      },
      features: [
        "Digital Checklist Templates",
        "Mobile Inspection App",
        "Corrective Action Tracking",
        "Photo & Document Attachment",
        "Real-time Compliance Scoring"
      ],
      benefits: [
        "Reduced inspection time by 50%",
        "Improved audit readiness",
        "Automated follow-up workflows"
      ],
      link: "/inspections",
      lastUpdated: "Today, 09:30 AM"
    },
    {
      id: 3,
      title: "Analytics & Reports",
      description: "Advanced data analytics platform with customizable dashboards, predictive insights, and automated report generation.",
      icon: BarChart3,
      color: "teal",
      status: "Active",
      stats: { 
        generated: "18", 
        scheduled: "5", 
        progress: 65,
        activeDashboards: "12",
        dataSources: "8"
      },
      features: [
        "Custom Report Builder",
        "Real-time Analytics Dashboard",
        "Export to Multiple Formats",
        "Scheduled Report Delivery",
        "Predictive Analytics Engine"
      ],
      benefits: [
        "30% faster decision making",
        "Automated regulatory reporting",
        "Customizable executive dashboards"
      ],
      link: "/analytics",
      lastUpdated: "Yesterday, 04:15 PM"
    },
    {
      id: 4,
      title: "Monitoring",
      description: "Real-time monitoring system for safety parameters, environmental conditions, and equipment status with instant alerting.",
      icon: Monitor,
      color: "cyan",
      status: "Active",
      stats: { 
        active: "156", 
        alerts: "3", 
        progress: 92,
        sensors: "42",
        uptime: "99.8%"
      },
      features: [
        "Live Monitoring Dashboard",
        "Smart Alert System",
        "Historical Data Analysis",
        "Predictive Maintenance",
        "Mobile Alert Notifications"
      ],
      benefits: [
        "Reduced downtime by 40%",
        "Proactive issue detection",
        "24/7 system monitoring"
      ],
      link: "/monitoring",
      lastUpdated: "Just now"
    }
  ];

  const colorClasses = {
    purple: { 
      bg: "bg-purple-500", 
      light: "bg-purple-50", 
      text: "text-purple-600",
      gradient: "from-purple-500 to-purple-600"
    },
    indigo: { 
      bg: "bg-indigo-500", 
      light: "bg-indigo-50", 
      text: "text-indigo-600",
      gradient: "from-indigo-500 to-indigo-600"
    },
    teal: { 
      bg: "bg-teal-500", 
      light: "bg-teal-50", 
      text: "text-teal-600",
      gradient: "from-teal-500 to-teal-600"
    },
    cyan: { 
      bg: "bg-cyan-500", 
      light: "bg-cyan-50", 
      text: "text-cyan-600",
      gradient: "from-cyan-500 to-cyan-600"
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
        {mainModules.map((module) => {
          const Icon = module.icon;
          const colors = colorClasses[module.color] || colorClasses.purple;
          
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
                className="block bg-white rounded-xl p-5 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-100 hover:border-gray-200"
              >
                {/* Card Header with Status */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-lg ${colors.light}`}>
                      <Icon className={`w-6 h-6 ${colors.text}`} />
                    </div>
                    <div>
                      <div className={`text-xs font-medium px-2 py-1 rounded-full ${colors.light} ${colors.text}`}>
                        {module.status}
                      </div>
                    </div>
                  </div>
                  
                  {/* View More Icon with Tooltip */}
                  <button
                    onClick={(e) => handleViewMore(module.id, e)}
                    className="p-1.5 rounded-full hover:bg-gray-100 transition-colors relative"
                    title="View details"
                  >
                    <Eye className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                    
                    {/* Tooltip */}
                    {hoveredCard === module.id && (
                      <div className="absolute -top-8 right-0 bg-gray-900 text-white text-xs py-1 px-2 rounded whitespace-nowrap z-10">
                        View details
                        <div className="absolute -bottom-1 right-2 w-2 h-2 bg-gray-900 rotate-45"></div>
                      </div>
                    )}
                  </button>
                </div>

                {/* Module Title */}
                <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors">
                  {module.title}
                </h3>

                {/* Progress Indicator */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-semibold text-gray-900">{module.stats.progress}%</span>
                  </div>
                  <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${colors.bg} rounded-full transition-all duration-700`}
                      style={{ width: `${module.stats.progress}%` }}
                    />
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="mt-4 grid grid-cols-2 gap-2">
                  {Object.entries(module.stats).slice(0, 2).map(([key, value], idx) => (
                    <div key={idx} className="text-center p-2 bg-gray-50 rounded-lg">
                      <div className="text-sm font-bold text-gray-900">{value}</div>
                      <div className="text-xs text-gray-500 capitalize">{key}</div>
                    </div>
                  ))}
                </div>

                {/* View More Link */}
                <div className="mt-4 flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-xs text-gray-500">Updated {module.lastUpdated}</span>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                </div>
              </a>
            </div>
          );
        })}
      </div>

      {/* Modal for Module Details */}
      {modalOpen && (() => {
        const module = mainModules.find(m => m.id === modalOpen);
        if (!module) return null;
        
        const Icon = module.icon;
        const colors = colorClasses[module.color] || colorClasses.purple;
        
        return (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity"
              onClick={closeModal}
            />
            
            {/* Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl">
                {/* Modal Header */}
                <div className={`bg-gradient-to-r ${colors.gradient} p-6 text-white`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                        <Icon className="w-8 h-8" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold">{module.title}</h2>
                        <p className="text-white/80">{module.status} • Updated {module.lastUpdated}</p>
                      </div>
                    </div>
                    <button
                      onClick={closeModal}
                      className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Modal Content */}
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
                  {/* Description */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                    <p className="text-gray-600">{module.description}</p>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                    {Object.entries(module.stats).map(([key, value], idx) => (
                      <div key={idx} className="bg-gray-50 p-4 rounded-xl">
                        <div className="text-2xl font-bold text-gray-900 mb-1">{value}</div>
                        <div className="text-sm text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                      </div>
                    ))}
                  </div>

                  {/* Features */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Features</h3>
                    <div className="space-y-2">
                      {module.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <CheckCircle className={`w-5 h-5 mt-0.5 ${colors.text} flex-shrink-0`} />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Benefits */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Benefits</h3>
                    <div className="space-y-2">
                      {module.benefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <Zap className={`w-5 h-5 mt-0.5 ${colors.text} flex-shrink-0`} />
                          <span className="text-gray-700">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Progress Section */}
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-900">System Progress</span>
                      <span className="font-bold text-gray-900">{module.stats.progress}%</span>
                    </div>
                    <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${colors.bg} rounded-full transition-all duration-1000`}
                        style={{ width: `${module.stats.progress}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="border-t border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                      Click below to access this module
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={closeModal}
                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        Close
                      </button>
                      <a
                        href={module.link}
                        className="px-4 py-2 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
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