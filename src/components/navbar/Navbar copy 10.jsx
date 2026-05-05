import React, { useState } from "react";
// import { useLocation } from "react-router-dom";
import {
  Menu,
  Bell,
  MessageSquare,
  User,
  Settings,
  LogOut,
  HelpCircle,
  CreditCard,
  Shield,
  Filter,
  Archive,
  MoreVertical,
  Package, 
  Check,
  Edit,
  Globe,
  Users,
   
  Cpu, 
  ChevronDown ,
  ChevronRight,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
// import { useAuth } from "@/contexts/AuthContext";

import PropTypes from "prop-types";

Navbar.propTypes = {
  toggleSidebar: PropTypes.func,
  sidebarCollapsed: PropTypes.bool,
};


const notifications = [
  {
    id: 1,
    title: "New order received",
    message: "Order #1234 has been placed",
    time: "2 min ago",
    read: false,
    type: 'order',
  },
  {
    id: 2,
    title: "Payment confirmed",
    message: "Payment for order #1233 confirmed",
    time: "1 hour ago",
    read: false,
    type: 'payment',
  },
  {
    id: 3,
    title: "System update",
    message: "System will be updated tonight",
    time: "3 hours ago",
    read: true,
    type: 'system',
  },
  {
    id: 4,
    title: "New user registered",
    message: "John Doe created an account",
    time: "5 hours ago",
    read: true,
    type: 'user',
  },
];

const messages = [
  { id: 1, sender: "John Doe", avatar: "", message: "Hey, can you check the report?", time: "5 min ago", unread: true },
  { id: 2, sender: "Jane Smith", avatar: "", message: "Meeting at 3pm today", time: "30 min ago", unread: true },
  { id: 3, sender: "Support Team", avatar: "", message: "Ticket #456 has been resolved", time: "2 hours ago", unread: false },
];

export function Navbar({ toggleSidebar }) {
  // const location = useLocation();
  // const { user, logout } = useAuth();
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [messageOpen, setMessageOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);


  const username = "baraka"; // Replace with actual user data
  const email = "baraka@gmail.com"
  const handleLogout = () => {
    logout();
    setAccountOpen(false);
  };


  const [activeTab, setActiveTab] = useState('account');
  const markAsRead = (id) => {
    // Logic to mark notification as read
    console.log('Mark as read:', id);
  };
  
  const markAllAsRead = () => {
    // Logic to mark all notifications as read
    console.log('Mark all as read');
  };
  return (
    <div className="flex items-center justify-between w-full h-20 bg-white  shadow-2xl px-4 shadow-green-200/75  border-border z-10">
      <div className="flex items-center gap-4">
        <button
          className="p-2 rounded-md hover:bg-muted transition"
          onClick={toggleSidebar}
        >
          <Menu className="w-5 h-5 text-primary cursor-pointer" />
        </button>
      </div>

      {/* Right side - Icons and profile */}
      <div className="flex items-center gap-2">
        {/* Messages Popup */}
        <Popover open={messageOpen} onOpenChange={setMessageOpen}>
          <PopoverTrigger asChild>
            <button className="relative p-2 rounded-full hover:bg-muted transition">
              <MessageSquare className="w-5 h-5 text-muted-foreground" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-96 p-0 bg-white border border-gray-100 shadow-lg rounded-lg overflow-hidden" align="end">
  {/* Header - Clean & Professional */}
  <div className="p-4 border-b border-gray-100 bg-linear-to-r from-[#F8FDF9] to-white">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-[#F0F8F2] rounded-lg">
          <MessageSquare className="w-5 h-5 text-[#00A859]" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 text-base">Messages</h3>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-sm text-gray-500">
              {messages.filter(m => m.unread).length} unread
            </span>
            <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
            <span className="text-sm text-gray-500">
              {messages.length} total
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button className="p-1.5 text-gray-400 hover:text-[#00A859] transition-colors">
          <Settings className="w-4 h-4" />
        </button>
        <button className="p-1.5 text-gray-400 hover:text-[#00A859] transition-colors">
          <Filter className="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>

  {/* Messages List - Clean & Readable */}
  <ScrollArea className="max-h-105">
    <div className="p-2">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`group relative flex items-start gap-3 p-3 mx-2 my-1 rounded-lg transition-all duration-150 hover:bg-gray-50 ${
            msg.unread 
              ? 'bg-[#F8FDF9] border border-[#00A859]/10' 
              : ''
          }`}
        >
          {/* Avatar with subtle indicator */}
          <div className="relative">
            <Avatar className="h-10 w-10 border border-gray-200">
              <AvatarImage src={msg.avatar} alt={msg.sender} />
              <AvatarFallback className={`${msg.unread ? 'bg-[#00A859]' : 'bg-gray-100'} text-white font-medium`}>
                {msg.sender.charAt(0)}
              </AvatarFallback>
            </Avatar>
            {msg.unread && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#FF8C00] border-2 border-white rounded-full animate-pulse" />
            )}
          </div>

          {/* Message Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <p className="font-medium text-gray-900 text-sm">
                  {msg.sender}
                </p>
                {msg.unread && (
                  <span className="px-1.5 py-0.5 bg-[#00A859]/10 text-[#00A859] text-xs font-medium rounded">
                    New
                  </span>
                )}
              </div>
              <span className="text-xs text-gray-400 whitespace-nowrap">
                {msg.time}
              </span>
            </div>
            
            <p className="text-sm text-gray-600 mt-1 line-clamp-2 leading-relaxed">
              {msg.message}
            </p>
            
            {/* Subtle action buttons */}
            <div className="flex items-center gap-3 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <button className="text-xs text-[#00A859] hover:text-[#00A859]/80 font-medium px-2 py-1 rounded hover:bg-[#00A859]/5 transition-colors">
                Reply
              </button>
              <button className="text-xs text-gray-500 hover:text-gray-700 font-medium px-2 py-1 rounded hover:bg-gray-100 transition-colors">
                Archive
              </button>
            </div>
          </div>

          {/* Quick status indicator */}
          {!msg.unread && (
            <div className="w-2 h-2 bg-gray-300 rounded-full mt-2"></div>
          )}
        </div>
      ))}
    </div>
  </ScrollArea>

  {/* Footer - Subtle & Functional */}
  <div className="p-4 border-t border-gray-100 bg-gray-50/30">
    <div className="flex items-center justify-between">
      <button className="text-sm text-gray-600 hover:text-[#00A859] font-medium px-3 py-2 rounded-lg hover:bg-white transition-colors flex items-center gap-2">
        <MessageSquare className="w-4 h-4" />
        Compose
      </button>
      <div className="flex items-center gap-3">
        <button className="text-sm text-gray-500 hover:text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors">
          Mark all read
        </button>
        <button className="text-sm text-white bg-[#00A859] hover:bg-[#00A859]/90 font-medium px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
          View all
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
</PopoverContent>

        </Popover>

        {/* Notifications Popup */}
        <Popover open={notificationOpen} onOpenChange={setNotificationOpen}>
        <PopoverTrigger asChild>
  <button
    className="relative p-2.5 rounded-full hover:bg-muted/90 active:scale-95 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 group cursor-pointer select-none"
    aria-label="Notifications (7 unread)"
  >
    {/* Animated bell icon */}
    <div className="relative">
      <Bell className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-all duration-300 group-hover:rotate-12" />
    </div>
    
    {/* Advanced badge with gradient */}
    <span className="absolute -top-1 -right-1 min-w-5.5 h-5.5 bg-linear-to-br from-yellow-500 to-orange-500 text-white text-xs font-medium rounded-full flex items-center justify-center px-1 shadow-lg border-2 border-background shadow-yellow-500/25">
      <span className="animate-pulse">7</span>
    </span>
    
    {/* Subtle pulse effect */}
    <span className="absolute inset-0 rounded-full bg-linear-to-r from-yellow-500/10 to-orange-500/5 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    
    {/* Optional tooltip hint */}
    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-foreground text-background text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
      Notifications
    </div>
  </button>
</PopoverTrigger>
          <PopoverContent className="w-96 p-0 bg-white border border-gray-100 shadow-lg rounded-lg overflow-hidden" align="end">
  {/* Header - Clean & Informative */}
  <div className="p-4 border-b border-gray-100 bg-linear-to-r from-[#F8FDF9] to-white">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-[#90ca9f] rounded-lg cursor-pointer">
          <Bell className="w-5 h-5 text-[#00A859]" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 text-base">Notifications</h3>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-sm text-gray-500">
              {notifications.filter(n => !n.read).length} unread
            </span>
            <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
            <span className="text-sm text-gray-500">
              {notifications.length} total
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button 
          onClick={() => markAllAsRead()}
          className="text-xs text-gray-500 hover:text-[#00A859] font-medium px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
        >
          Mark all read
        </button>
        <button className="p-1.5 text-gray-400 hover:text-[#00A859] transition-colors">
          <Settings className="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>

  {/* Notifications List - Organized & Readable */}
  <ScrollArea className="max-h-105">
    <div className="p-2">
      {notifications.map((notif) => (
        <div
          key={notif.id}
          className={`group relative p-3 mx-2 my-1 rounded-lg transition-all duration-150 hover:bg-gray-50 ${
            !notif.read 
              ? 'bg-[#F8FDF9] border border-[#00A859]/10' 
              : ''
          }`}
        >
          {/* Notification Icon based on type */}
          <div className="flex items-start gap-3">
            <div className={`p-2 rounded-lg mt-0.5 ${
              notif.type === 'order' ? 'bg-blue-50 text-blue-600' :
              notif.type === 'payment' ? 'bg-green-50 text-green-600' :
              notif.type === 'system' ? 'bg-purple-50 text-purple-600' :
              'bg-gray-100 text-gray-600'
            }`}>
              {notif.type === 'order' && <Package className="w-4 h-4" />}
              {notif.type === 'payment' && <CreditCard className="w-4 h-4" />}
              {notif.type === 'system' && <Cpu className="w-4 h-4" />}
              {notif.type === 'user' && <User className="w-4 h-4" />}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-gray-900 text-sm">
                    {notif.title}
                  </p>
                  {!notif.read && (
                    <span className="px-1.5 py-0.5 bg-[#FF8C00]/10 text-[#FF8C00] text-xs font-medium rounded">
                      New
                    </span>
                  )}
                </div>
                <span className="text-xs text-gray-400 whitespace-nowrap">
                  {notif.time}
                </span>
              </div>
              
              <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                {notif.message}
              </p>
              
              {/* Action buttons - appear on hover */}
              <div className="flex items-center gap-3 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                {!notif.read && (
                  <button 
                    onClick={() => markAsRead(notif.id)}
                    className="text-xs text-[#00A859] hover:text-[#00A859]/80 font-medium px-2 py-1 rounded hover:bg-[#00A859]/5 transition-colors"
                  >
                    Mark as read
                  </button>
                )}
                <button className="text-xs text-gray-500 hover:text-gray-700 font-medium px-2 py-1 rounded hover:bg-gray-100 transition-colors">
                  Dismiss
                </button>
              </div>
            </div>

            {/* Quick status indicator */}
            {!notif.read && (
              <div className="w-2 h-2 bg-[#FF8C00] rounded-full mt-2 animate-pulse"></div>
            )}
          </div>
        </div>
      ))}
    </div>
  </ScrollArea>

  {/* Footer - Clear Actions */}
  <div className="p-4 border-t border-gray-100 bg-gray-50/30">
    <div className="flex items-center justify-center gap-4">
      <button className="text-sm text-gray-600 hover:text-gray-900 font-medium px-3 py-2 rounded-lg hover:bg-white transition-colors">
        Notification settings
      </button>
      <button className="text-sm text-white bg-[#00A859] hover:bg-[#00A859]/90 font-medium px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
        View all notifications
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  </div>
</PopoverContent>
        </Popover>

        {/* Account Menu with Tabs */}
        <Popover open={accountOpen} onOpenChange={setAccountOpen}>
        <PopoverTrigger asChild>
  <button className="flex items-center gap-3 p-2 cursor-pointer rounded-lg hover:bg-gray-100 bg-green-500/5 dark:hover:bg-green-400/20 transition-all duration-200 group relative">
    {/* Online Status Indicator */}
    <div className="relative">
      <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-300 rounded-full z-10" />
      <Avatar className="h-9 w-9 ring-2 ring-white dark:ring-gray-800 shadow-sm group-hover:ring-[#00A859]/20 transition-all">
        <AvatarFallback className="bg-linear-to-br from-[#00A859] to-[#1E3A34] text-white font-semibold text-sm group-hover:scale-105 transition-transform">
          {/* {user?.username?.charAt(0).toUpperCase() || "A"} */}
          {username?.charAt(0).toUpperCase() || "A"}
        </AvatarFallback>
      </Avatar>
    </div>

    {/* User Info - Hidden on mobile, visible on larger screens */}
    <div className="hidden md:flex md:flex-col md:items-start">
      <div className="flex items-center gap-2">
        
        <div className="px-2 py-0.5 bg-[#00A859]/10 text-[#00A859] text-xs font-medium rounded-full">
          Admin
        </div>
      </div>
      <span className="text-xs text-gray-700 dark:text-gray-400 truncate max-w-30">
        {/* {user?.email || "admin@system.com"} */}
        admin@system.com
      </span>
    </div>

    {/* Chevron Icon */}
    <ChevronDown className="w-4 h-4 text-gray-400 dark:text-gray-500 ml-1 group-hover:text-[#00A859] transition-colors" />

    {/* Hover Glow Effect */}
    <div className="absolute inset-0 rounded-lg bg-linear-to-r from-transparent via-[#00A859]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
  </button>
</PopoverTrigger>
          <PopoverContent className="w-80 p-0 bg-white border border-gray-100 shadow-xl rounded-lg overflow-hidden" align="end">
  {/* Header - Clean User Info */}
  <div className="p-5 bg-linear-to-br from-[#F8FDF9] to-white border-b border-gray-100">
    <div className="flex items-start gap-3">
      <div className="relative">
        <Avatar className="h-14 w-14 border-2 border-white shadow-sm">
          <AvatarFallback className="bg-linear-to-br from-[#00A859] to-[#1E3A34] text-white font-semibold text-lg">
            AU
          </AvatarFallback>
        </Avatar>
        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#FF8C00] border-2 border-white rounded-full flex items-center justify-center">
          <Check className="w-2.5 h-2.5 text-white" />
        </div>
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-gray-900 text-base">Admin User</h3>
            <p className="text-sm text-gray-500 mt-0.5">admin@hseqsystem.com</p>
          </div>
          <button className="p-1.5 text-gray-400 hover:text-[#00A859] transition-colors rounded-lg hover:bg-gray-100">
            <Edit className="w-4 h-4" />
          </button>
        </div>
        
        <div className="flex items-center gap-3 mt-3">
          <div className="px-2.5 py-1 bg-[#00A859]/10 text-[#00A859] text-xs font-medium rounded-full">
            Administrator
          </div>
          <div className="text-xs text-gray-500">
            Last login: 2h ago
          </div>
        </div>
      </div>
    </div>
  </div>

  {/* Navigation Tabs */}
  <div className="border-b border-gray-100">
    <div className="flex">
      <button className={`flex-1 py-3 text-sm font-medium text-center transition-colors border-b-2 ${
        activeTab === 'account' 
          ? 'text-[#00A859] border-[#00A859] bg-[#00A859]/5' 
          : 'text-gray-500 border-transparent hover:text-gray-700 hover:bg-gray-50'
      }`}
        onClick={() => setActiveTab('account')}
      >
        <div className="flex items-center justify-center gap-2">
          <User className="w-4 h-4" />
          Account
        </div>
      </button>
      <button className={`flex-1 py-3 text-sm font-medium text-center transition-colors border-b-2 ${
        activeTab === 'settings' 
          ? 'text-[#00A859] border-[#00A859] bg-[#00A859]/5' 
          : 'text-gray-500 border-transparent hover:text-gray-700 hover:bg-gray-50'
      }`}
        onClick={() => setActiveTab('settings')}
      >
        <div className="flex items-center justify-center gap-2">
          <Settings className="w-4 h-4" />
          Settings
        </div>
      </button>
    </div>
  </div>

  {/* Content Area */}
  <div className="max-h-95 overflow-y-auto">
    {activeTab === 'account' ? (
      <div className="p-2">
        <div className="space-y-0.5">
          <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors group">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                <User className="w-4 h-4" />
              </div>
              <div className="text-left">
                <p className="font-medium text-gray-900 text-sm">Profile</p>
                <p className="text-xs text-gray-500">Update your personal information</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#00A859]" />
          </button>

          <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors group">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-50 text-green-600 rounded-lg">
                <CreditCard className="w-4 h-4" />
              </div>
              <div className="text-left">
                <p className="font-medium text-gray-900 text-sm">Billing & Plans</p>
                <p className="text-xs text-gray-500">Manage subscription and invoices</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#00A859]" />
          </button>

          <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors group">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                <Shield className="w-4 h-4" />
              </div>
              <div className="text-left">
                <p className="font-medium text-gray-900 text-sm">Security</p>
                <p className="text-xs text-gray-500">Password, 2FA, and sessions</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#00A859]" />
          </button>

          <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors group">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-50 text-yellow-600 rounded-lg">
                <Users className="w-4 h-4" />
              </div>
              <div className="text-left">
                <p className="font-medium text-gray-900 text-sm">Team Members</p>
                <p className="text-xs text-gray-500">Manage team access and roles</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#00A859]" />
          </button>
        </div>
      </div>
    ) : (
      <div className="p-2">
        <div className="space-y-0.5">
          <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors group">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                <Settings className="w-4 h-4" />
              </div>
              <div className="text-left">
                <p className="font-medium text-gray-900 text-sm">Preferences</p>
                <p className="text-xs text-gray-500">Customize your workspace</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#00A859]" />
          </button>

          <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors group">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-pink-50 text-pink-600 rounded-lg">
                <Bell className="w-4 h-4" />
              </div>
              <div className="text-left">
                <p className="font-medium text-gray-900 text-sm">Notifications</p>
                <p className="text-xs text-gray-500">Configure alerts and emails</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#00A859]" />
          </button>

          <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors group">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-cyan-50 text-cyan-600 rounded-lg">
                <HelpCircle className="w-4 h-4" />
              </div>
              <div className="text-left">
                <p className="font-medium text-gray-900 text-sm">Help & Support</p>
                <p className="text-xs text-gray-500">Documentation and contact</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#00A859]" />
          </button>
        </div>
      </div>
    )}

    {/* Logout Section */}
    <div className="p-4 border-t border-gray-100 bg-gray-50/50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Globe className="w-4 h-4" />
          English • GMT+3
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-linear-to-r from-[#FF8C00] to-[#FF6B00] hover:from-[#FF6B00] hover:to-[#FF8C00] rounded-lg transition-all shadow-sm hover:shadow"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </div>
  </div>
</PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
