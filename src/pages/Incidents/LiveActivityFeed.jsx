"use client"

import React, { useState, useEffect } from 'react'
import { 
  Activity, Clock, User, MapPin, AlertTriangle, 
  CheckCircle, MessageSquare, TrendingUp, Zap, 
  ChevronRight, X, MoreVertical, Eye, RefreshCw
} from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export const LiveActivityFeed = ({ incidents }) => {
  const [activities, setActivities] = useState([
    {
      id: 1,
      type: 'incident',
      action: 'created',
      incidentId: 'INC-2024-001',
      title: 'Slip and Fall - Warehouse A',
      user: 'John Doe',
      time: '5 minutes ago',
      priority: 'high',
      icon: AlertTriangle,
      color: 'text-red-600 bg-red-50'
    },
    {
      id: 2,
      type: 'assignment',
      action: 'assigned',
      incidentId: 'INC-2024-002',
      title: 'Chemical Spill',
      user: 'Sarah Chen',
      assignedTo: 'Mike Wilson',
      time: '15 minutes ago',
      icon: User,
      color: 'text-blue-600 bg-blue-50'
    },
    {
      id: 3,
      type: 'resolution',
      action: 'resolved',
      incidentId: 'INC-2024-004',
      title: 'Near Miss - Falling Object',
      user: 'John Safety',
      time: '1 hour ago',
      icon: CheckCircle,
      color: 'text-green-600 bg-green-50'
    },
    {
      id: 4,
      type: 'update',
      action: 'updated',
      incidentId: 'INC-2024-003',
      title: 'Electrical Panel Hazard',
      user: 'System',
      time: '2 hours ago',
      icon: Activity,
      color: 'text-purple-600 bg-purple-50'
    },
    {
      id: 5,
      type: 'comment',
      action: 'commented',
      incidentId: 'INC-2024-002',
      title: 'Chemical Spill',
      user: 'Emma Davis',
      time: '3 hours ago',
      icon: MessageSquare,
      color: 'text-amber-600 bg-amber-50'
    }
  ])

  const [isLive, setIsLive] = useState(true)

  const addRandomActivity = () => {
    const actions = ['created', 'updated', 'assigned', 'resolved', 'commented']
    const types = ['incident', 'assignment', 'resolution', 'update', 'comment']
    const users = ['John Doe', 'Sarah Chen', 'Mike Wilson', 'Emma Davis', 'System']
    const icons = [AlertTriangle, User, CheckCircle, Activity, MessageSquare]
    const colors = [
      'text-red-600 bg-red-50',
      'text-blue-600 bg-blue-50',
      'text-green-600 bg-green-50',
      'text-purple-600 bg-purple-50',
      'text-amber-600 bg-amber-50'
    ]

    const randomIncident = incidents[Math.floor(Math.random() * incidents.length)]
    const randomAction = actions[Math.floor(Math.random() * actions.length)]
    const randomType = types[Math.floor(Math.random() * types.length)]
    const randomUser = users[Math.floor(Math.random() * users.length)]
    const randomIndex = Math.floor(Math.random() * icons.length)

    const newActivity = {
      id: activities.length + 1,
      type: randomType,
      action: randomAction,
      incidentId: randomIncident?.id || 'INC-2024-XXX',
      title: randomIncident?.title || 'New Activity',
      user: randomUser,
      time: 'Just now',
      icon: icons[randomIndex],
      color: colors[randomIndex]
    }

    setActivities(prev => [newActivity, ...prev.slice(0, 9)])
  }

  useEffect(() => {
    let interval
    if (isLive) {
      interval = setInterval(() => {
        if (Math.random() > 0.7) { // 30% chance to add activity
          addRandomActivity()
        }
      }, 10000) // Every 10 seconds
    }
    
    return () => clearInterval(interval)
  }, [isLive, incidents])

  const clearActivities = () => {
    setActivities([])
  }

  const getActivityDescription = (activity) => {
    switch(activity.action) {
      case 'created':
        return `New incident reported by ${activity.user}`
      case 'assigned':
        return `${activity.user} assigned incident to ${activity.assignedTo}`
      case 'resolved':
        return `${activity.user} resolved the incident`
      case 'updated':
        return `Incident updated by ${activity.user}`
      case 'commented':
        return `${activity.user} added a comment`
      default:
        return `Activity by ${activity.user}`
    }
  }

  return (
    <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-emerald-50/30">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-emerald-800">
            <div className="p-2 bg-emerald-100 rounded-lg">
              <Activity className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <span className="text-lg font-bold">Live Activity Feed</span>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex items-center gap-1.5">
                  <div className={`w-2 h-2 rounded-full ${isLive ? 'bg-emerald-500 animate-pulse' : 'bg-gray-400'}`}></div>
                  <span className="text-xs text-emerald-600 font-medium">
                    {isLive ? 'Live • Updates every 10s' : 'Paused'}
                  </span>
                </div>
                <Badge variant="outline" className="text-xs">
                  {activities.length} activities
                </Badge>
              </div>
            </div>
          </CardTitle>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsLive(!isLive)}
              className="gap-1.5"
            >
              {isLive ? (
                <>
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                  Live
                </>
              ) : (
                <>
                  <Clock className="h-3.5 w-3.5" />
                  Paused
                </>
              )}
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={addRandomActivity}
              className="gap-1.5"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Simulate
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={clearActivities}
              className="gap-1.5 text-red-600 hover:text-red-700"
            >
              <X className="h-3.5 w-3.5" />
              Clear
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <ScrollArea className="h-72">
          {activities.length === 0 ? (
            <div className="text-center py-12">
              <Activity className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No recent activities</p>
              <p className="text-sm text-gray-400 mt-1">Activities will appear here in real-time</p>
            </div>
          ) : (
            <div className="space-y-3 pr-4">
              {activities.map((activity) => {
                const Icon = activity.icon
                
                return (
                  <div
                    key={activity.id}
                    className="group p-3 rounded-lg border border-gray-200 hover:border-emerald-200 hover:bg-emerald-50/50 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg ${activity.color}`}>
                          <Icon className="h-4 w-4" />
                        </div>
                        
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold">{activity.title}</span>
                            <Badge variant="outline" className="text-xs">
                              {activity.incidentId}
                            </Badge>
                          </div>
                          
                          <p className="text-sm text-gray-600">
                            {getActivityDescription(activity)}
                          </p>
                          
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1.5">
                              <Avatar className="h-5 w-5">
                                <AvatarFallback className="text-xs bg-gray-100">
                                  {activity.user.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-xs text-gray-500">{activity.user}</span>
                            </div>
                            <span className="text-xs text-gray-400">•</span>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3 text-gray-400" />
                              <span className="text-xs text-gray-500">{activity.time}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          <Eye className="h-3.5 w-3.5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          <MoreVertical className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </ScrollArea>

        {/* Stats Footer */}
        {activities.length > 0 && (
          <>
            <Separator className="my-4" />
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-600">
                  {activities.filter(a => a.action === 'created').length}
                </div>
                <div className="text-xs text-gray-500">New Incidents</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {activities.filter(a => a.action === 'assigned').length}
                </div>
                <div className="text-xs text-gray-500">Assignments</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {activities.filter(a => a.action === 'resolved').length}
                </div>
                <div className="text-xs text-gray-500">Resolutions</div>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}