import React, { useState } from "react";
// import { useLocation } from "react-router-dom";
import { Menu, Bell, MessageSquare, User, Settings, LogOut, HelpCircle, CreditCard, Shield } from "lucide-react";
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
  { id: 1, title: "New order received", message: "Order #1234 has been placed", time: "2 min ago", read: false },
  { id: 2, title: "Payment confirmed", message: "Payment for order #1233 confirmed", time: "1 hour ago", read: false },
  { id: 3, title: "System update", message: "System will be updated tonight", time: "3 hours ago", read: true },
  { id: 4, title: "New user registered", message: "John Doe created an account", time: "5 hours ago", read: true },
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

  const handleLogout = () => {
    logout();
    setAccountOpen(false);
  };

  return (
    <div className="flex items-center justify-between w-full h-20 bg-white  shadow-2xl px-4 shadow-green-200/75  border-border z-10">
      <div className="flex items-center gap-4">
        <button
          className="p-2 rounded-md hover:bg-muted transition"
          onClick={toggleSidebar}
        >
          <Menu className="w-5 h-5 text-primary" />
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
          <PopoverContent className="w-80 p-0 bg-popover border  border-border shadow-lg" align="end">
            <div className="p-4 border-b border-border">
              <h3 className="font-semibold text-foreground">Messages</h3>
              <p className="text-sm text-muted-foreground">You have 3 unread messages</p>
            </div>
            <ScrollArea className="h-72">
              <div className="p-2">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition hover:bg-muted ${
                      msg.unread ? "bg-accent/50" : ""
                    }`}
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={msg.avatar} />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {msg.sender.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm text-foreground">{msg.sender}</p>
                      <p className="text-sm text-muted-foreground truncate">{msg.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">{msg.time}</p>
                    </div>
                    {msg.unread && (
                      <span className="w-2 h-2 bg-primary rounded-full mt-2" />
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="p-3 border-t border-border">
              <button className="w-full text-center text-sm text-primary hover:underline">
                View all messages
              </button>
            </div>
          </PopoverContent>
          
        </Popover>

        {/* Notifications Popup */}
        <Popover open={notificationOpen} onOpenChange={setNotificationOpen}>
          <PopoverTrigger asChild>
            <button className="relative p-2 rounded-full hover:bg-muted transition">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-500 text-white text-xs rounded-full flex items-center justify-center">
                7
              </span>
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0 bg-popover border border-border shadow-lg" align="end">
            <div className="p-4 border-b border-border">
              <h3 className="font-semibold text-foreground">Notifications</h3>
              <p className="text-sm text-muted-foreground">You have 2 unread notifications</p>
            </div>
            <ScrollArea className="h-72">
              <div className="p-2">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={`p-3 rounded-lg cursor-pointer transition hover:bg-muted ${
                      !notif.read ? "bg-accent/50" : ""
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <p className="font-medium text-sm text-foreground">{notif.title}</p>
                      {!notif.read && (
                        <span className="w-2 h-2 bg-primary rounded-full" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{notif.message}</p>
                    <p className="text-xs text-muted-foreground mt-2">{notif.time}</p>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="p-3 border-t border-border">
              <button className="w-full text-center text-sm text-primary hover:underline">
                View all notifications
              </button>
            </div>
          </PopoverContent>
        </Popover>

        {/* Account Menu with Tabs */}
        <Popover open={accountOpen} onOpenChange={setAccountOpen}>
          <PopoverTrigger asChild>
            <button className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted transition">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {/* {user?.username?.charAt(0).toUpperCase() || "A"} */}
                  baraka
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium text-foreground hidden sm:block">
                {/* {user?.username || "Admin"} */}
                admin
              </span>
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-72 p-0 bg-popover border border-border shadow-lg" align="end">
            {/* Header */}
            <div className="p-4 border-b border-border">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                    {/* {user?.username?.charAt(0).toUpperCase() || "A"} */}
                  </AvatarFallback>
                </Avatar>
                <div>
                  {/* <p className="font-semibold text-foreground">{user?.username || "Admin User"}</p>
                  <p className="text-sm text-muted-foreground">{user?.email || "admin@example.com"}</p> */}
                  <p className="font-semibold text-foreground">Admin User</p>

                </div>
              </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="account" className="w-full">
              <TabsList className="w-full grid grid-cols-2 bg-muted/50 rounded-none border-b border-border">
                <TabsTrigger value="account" className="rounded-none data-[state=active]:bg-background">
                  Account
                </TabsTrigger>
                <TabsTrigger value="settings" className="rounded-none data-[state=active]:bg-background">
                  Settings
                </TabsTrigger>
              </TabsList>

              <TabsContent value="account" className="m-0">
                <div className="py-2">
                  <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition">
                    <User className="w-4 h-4 text-muted-foreground" />
                    My Profile
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition">
                    <CreditCard className="w-4 h-4 text-muted-foreground" />
                    Billing
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition">
                    <Shield className="w-4 h-4 text-muted-foreground" />
                    Security
                  </button>
                  <Separator className="my-2" />
                  <button
                    // onClick={handleLogout}
                    className="w-full flex items-center bg-amber-500 gap-3 px-4 py-2.5 text-sm text-destructive hover:bg-muted transition"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              </TabsContent>

              <TabsContent value="settings" className="m-0">
                <div className="py-2">
                  <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition">
                    <Settings className="w-4 h-4 text-muted-foreground" />
                    Preferences
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition">
                    <Bell className="w-4 h-4 text-muted-foreground" />
                    Notifications
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-muted transition">
                    <HelpCircle className="w-4 h-4 text-muted-foreground" />
                    Help & Support
                  </button>
                </div>
              </TabsContent>
            </Tabs>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
