"use client"

import React from 'react'
import { 
  RefreshCw, Filter, Download, Plus, BarChart3, 
  Printer, Share2, Settings, Zap, TrendingUp, 
  Calendar, Users, Bell, Eye
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import { Separator } from '@/components/ui/separator'

export const QuickActions = ({ onRefresh, onExport, isLoading }) => {
  const quickActions = [
    { icon: Plus, label: 'New Report', variant: 'default', action: () => alert('New report clicked') },
    { icon: Filter, label: 'Advanced Filter', variant: 'outline', action: () => alert('Filter clicked') },
    { icon: BarChart3, label: 'Analytics', variant: 'outline', action: () => alert('Analytics clicked') },
    { icon: Calendar, label: 'Schedule', variant: 'outline', action: () => alert('Schedule clicked') },
    { icon: Users, label: 'Team View', variant: 'outline', action: () => alert('Team view clicked') },
  ]

  const exportOptions = [
    { label: 'Export as CSV', format: 'csv' },
    { label: 'Export as Excel', format: 'excel' },
    { label: 'Export as PDF', format: 'pdf' },
  ]

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-lg border p-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onRefresh}
            disabled={isLoading}
            className="gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>

          <Separator orientation="vertical" className="h-6" />

          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant={action.variant}
              size="sm"
              onClick={action.action}
              className="gap-2"
            >
              <action.icon className="h-4 w-4" />
              {action.label}
            </Button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="h-4 w-4" />
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Export Options</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {exportOptions.map((option) => (
                <DropdownMenuItem 
                  key={option.format}
                  onClick={() => onExport && onExport(option.format)}
                >
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="outline" size="icon" className="relative">
            <Bell className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
          </Button>

          <Button variant="outline" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Status Indicators */}
      <div className="mt-3 pt-3 border-t">
        <div className="flex flex-wrap items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
            <span className="text-gray-600">All Systems Operational</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span className="text-gray-600">85% Resolution Rate</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
            <span className="text-gray-600">Live Updates Active</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Zap className="h-3 w-3 text-amber-500" />
            <span className="text-gray-600">Performance: Excellent</span>
          </div>
        </div>
      </div>
    </div>
  )
}