import { useState } from "react";
import { 
  AlertTriangle, 
  FileCheck, 
  CheckCircle, 
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  MoreVertical,
  Eye,
  Download,
  Settings,
  Trash2
} from "lucide-react";

export function DashboardCards() {
  const [menuOpen, setMenuOpen] = useState(null);

  const handleMenuClick = (index, e) => {
    e.preventDefault();
    e.stopPropagation();
    setMenuOpen(menuOpen === index ? null : index);
  };

  const handleMenuItemClick = (action, statTitle, e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(`${action} clicked for ${statTitle}`);
    setMenuOpen(null);
  };

  const stats = [
    {
      title: "Total Incidents",
      module: "Incident Management",
      value: "12",
      icon: AlertTriangle,
      color: "red",
      colorClasses: {
        bg: "bg-red-500",
        bgLight: "bg-red-50",
        bgHover: "bg-red-100",
        text: "text-red-600",
        textHover: "text-red-700",
      },
      trend: { value: "15%", direction: "up", label: "increase" },
      metric: { label: "Open Cases", value: "3" },
      progress: 75,
      link: "/incidents",
      tooltip: "View detailed incident reports and analytics"
    },
    {
      title: "Audits",
      module: "Audit Management",
      value: "8",
      icon: FileCheck,
      color: "blue",
      colorClasses: {
        bg: "bg-blue-500",
        bgLight: "bg-blue-50",
        bgHover: "bg-blue-100",
        text: "text-blue-600",
        textHover: "text-blue-700",
      },
      trend: { value: "2", direction: "active", label: "in progress" },
      metric: { label: "Scheduled", value: "4" },
      progress: 60,
      link: "/audits",
      tooltip: "Manage audits and track compliance status"
    },
    {
      title: "Compliance Rate",
      module: "Compliance Management",
      value: "94%",
      icon: CheckCircle,
      color: "green",
      colorClasses: {
        bg: "bg-green-500",
        bgLight: "bg-green-50",
        bgHover: "bg-green-100",
        text: "text-green-600",
        textHover: "text-green-700",
      },
      trend: { value: "+2%", direction: "up", label: "this quarter" },
      metric: { label: "Target", value: "95%" },
      progress: 94,
      link: "/compliance",
      tooltip: "Monitor compliance metrics and regulatory requirements"
    },
    {
      title: "Active Risks",
      module: "Risk Management",
      value: "7",
      icon: AlertCircle,
      color: "amber",
      colorClasses: {
        bg: "bg-amber-500",
        bgLight: "bg-amber-50",
        bgHover: "bg-amber-100",
        text: "text-amber-600",
        textHover: "text-amber-700",
      },
      trend: { value: "2 less", direction: "down", label: "this week" },
      metric: { label: "Critical", value: "2" },
      progress: 40,
      link: "/risks",
      tooltip: "Analyze and mitigate operational risks"
    },
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      red: {
        bg: "bg-red-500",
        bgLight: "bg-red-50",
        bgHover: "bg-red-100",
        text: "text-red-600",
        textHover: "text-red-700",
      },
      blue: {
        bg: "bg-blue-500",
        bgLight: "bg-blue-50",
        bgHover: "bg-blue-100",
        text: "text-blue-600",
        textHover: "text-blue-700",
      },
      green: {
        bg: "bg-green-500",
        bgLight: "bg-green-50",
        bgHover: "bg-green-100",
        text: "text-green-600",
        textHover: "text-green-700",
      },
      amber: {
        bg: "bg-amber-500",
        bgLight: "bg-amber-50",
        bgHover: "bg-amber-100",
        text: "text-amber-600",
        textHover: "text-amber-700",
      },
    };
    return colorMap[color] || colorMap.blue;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => {
        const colorClasses = getColorClasses(stat.color);
        
        return (
          <div key={index} className="relative group border-l-4 border-green-500 hover:border-yellow-500 rounded-xl">
            {/* Card Container */}
            <a
              href={stat.link}
              className="block bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
              title={`Go to ${stat.module}`}
            >
              {/* Card Header */}
              <div className="flex items-start justify-between mb-1">
                <div className="flex items-center space-x-2">
                <stat.icon className={`w-6 h-6 ${colorClasses.text}`} />
                  <div className="text-sm   text-gray-500 font-medium ">{stat.title}</div>
                  
                  {/* <div className="text-xs text-gray-500 mt-0.5">{stat.module}</div> */}
                </div>
               
              </div>

              {/* Main Value and Trend */}
              <div className="mb-1 flex flex-row items-center justify-between">
                <div className="text-xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="flex items-center">
                  {stat.trend.direction === "up" ? (
                    <ArrowUpRight className={`w-3 h-3 ${colorClasses.text} mr-1`} />
                  ) : stat.trend.direction === "down" ? (
                    <ArrowDownRight className={`w-3 h-3 ${colorClasses.text} mr-1`} />
                  ) : (
                    <Clock className={`w-3 h-3 ${colorClasses.text} mr-1`} />
                  )}
                  <span className={`text-xs font-medium ${colorClasses.text}`}>
                    {stat.trend.value}
                  </span>
                  <span className="text-xs text-gray-500 ml-1">
                    {stat.trend.label}
                  </span>
                </div>
              </div>

              {/* Progress Section */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-gray-500">{stat.metric.label}</div>
                    <div className="text-sm font-semibold text-gray-900">{stat.metric.value}</div>
                  </div>
                  <div className="text-xs font-medium text-gray-700">
                    {stat.progress}%
                  </div>
                </div>
                
                {/* Full width progress bar */}
                <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${colorClasses.bg} rounded-full transition-all duration-700 ease-out`}
                    style={{ width: `${stat.progress}%` }}
                  />
                </div>
              </div>
            </a>

            {/* Three dots menu - Always visible */}
            <div className="absolute top-2 right-2 z-10  cursor-pointer p-1 w-7 h-7 flex items-center justify-center group-hover:bg-gray-100 transition-colors">
              <button 
                className="rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
                onClick={(e) => handleMenuClick(index, e)}
              >
                <MoreVertical className="w-5 h-4 text-gray-400" />
              </button>

              {/* Dropdown Menu */}
              {menuOpen === index && (
                <>
                  {/* Backdrop */}
                  <div 
                    className="fixed inset-0 z-20"
                    onClick={() => setMenuOpen(null)}
                  />
                  
                  {/* Menu */}
                  <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-30">
                    <div className="py-1">
                      <button
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={(e) => handleMenuItemClick("View Details", stat.module, e)}
                      >
                        <Eye className="w-4 h-4 mr-3 text-gray-400" />
                        View Details
                      </button>
                      <button
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={(e) => handleMenuItemClick("Export Data", stat.module, e)}
                      >
                        <Download className="w-4 h-4 mr-3 text-gray-400" />
                        Export Data
                      </button>
                      <button
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={(e) => handleMenuItemClick("Edit Settings", stat.module, e)}
                      >
                        <Settings className="w-4 h-4 mr-3 text-gray-400" />
                        Settings
                      </button>
                      <div className="border-t border-gray-100 my-1"></div>
                      <button
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                        onClick={(e) => handleMenuItemClick("Delete", stat.module, e)}
                      >
                        <Trash2 className="w-4 h-4 mr-3" />
                        Remove Card
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}