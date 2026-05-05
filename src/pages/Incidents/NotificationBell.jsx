"use client"

import React, { useState, useEffect } from 'react'
import { Bell, BellRing, Check, X, AlertTriangle, CheckCircle, Clock, UserPlus, MessageSquare } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'

export const NotificationBell = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'warning',
      title: 'Critical Incident Reported',
      description: 'Slip and fall in Warehouse A requires immediate attention',
      time: '5 minutes ago',
      read: false,
      icon: AlertTriangle
    },
    {
      id: 2,
      type: 'info',
      title: 'New Assignment',
      description: 'You have been assigned to investigate chemical spill incident',
      time: '1 hour ago',
      read: false,
      icon: UserPlus
    },
    {
      id: 3,
      type: 'success',
      title: 'Incident Resolved',
      description: 'Electrical hazard incident marked as resolved',
      time: '2 hours ago',
      read: true,
      icon: CheckCircle
    },
    {
      id: 4,
      type: 'info',
      title: 'New Message',
      description: 'Sarah Chen sent you a message regarding incident INC-2024-002',
      time: '3 hours ago',
      read: true,
      icon: MessageSquare
    },
    {
      id: 5,
      type: 'warning',
      title: 'Pending Review',
      description: '3 incidents awaiting your review',
      time: '5 hours ago',
      read: true,
      icon: Clock
    }
  ])

  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    const count = notifications.filter(n => !n.read).length
    setUnreadCount(count)
  }, [notifications])

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, read: true }))
    )
  }

  const clearAll = () => {
    setNotifications([])
  }

  const getNotificationIcon = (type) => {
    switch(type) {
      case 'warning': return AlertTriangle
      case 'success': return CheckCircle
      case 'info': return Bell
      default: return Bell
    }
  }

  const getNotificationColor = (type) => {
    switch(type) {
      case 'warning': return 'text-amber-600 bg-amber-50'
      case 'success': return 'text-green-600 bg-green-50'
      case 'info': return 'text-blue-600 bg-blue-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          {unreadCount > 0 ? (
            <>
              <BellRing className="h-5 w-5" />
              <Badge 
                className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs"
                variant="destructive"
              >
                {unreadCount}
              </Badge>
            </>
          ) : (
            <Bell className="h-5 w-5" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="end">
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>Notifications</span>
          <div className="flex gap-2">
            {unreadCount > 0 && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={markAllAsRead}
                className="h-6 text-xs"
              >
                <Check className="h-3 w-3 mr-1" />
                Mark all read
              </Button>
            )}
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={clearAll}
              className="h-6 text-xs text-red-600 hover:text-red-700"
            >
              <X className="h-3 w-3 mr-1" />
              Clear all
            </Button>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <ScrollArea className="h-72">
          {notifications.length === 0 ? (
            <div className="py-8 text-center">
              <Bell className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No notifications</p>
            </div>
          ) : (
            <div className="space-y-1 p-1">
              {notifications.map((notification) => {
                const Icon = notification.icon || getNotificationIcon(notification.type)
                
                return (
                  <DropdownMenuItem 
                    key={notification.id} 
                    className={`p-3 cursor-pointer ${!notification.read ? 'bg-blue-50/50' : ''}`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex items-start gap-3 w-full">
                      <div className={`p-2 rounded-lg ${getNotificationColor(notification.type)}`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-start justify-between">
                          <p className="text-sm font-medium">{notification.title}</p>
                          {!notification.read && (
                            <div className="w-2 h-2 rounded-full bg-blue-500 mt-1"></div>
                          )}
                        </div>
                        <p className="text-xs text-gray-600">{notification.description}</p>
                        <p className="text-xs text-gray-400">{notification.time}</p>
                      </div>
                    </div>
                  </DropdownMenuItem>
                )
              })}
            </div>
          )}
        </ScrollArea>

        <DropdownMenuSeparator />
        <div className="p-2">
          <Button variant="outline" className="w-full" size="sm">
            View All Notifications
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}