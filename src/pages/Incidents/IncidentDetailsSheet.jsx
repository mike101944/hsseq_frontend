"use client"

import React from 'react'
import { 
  X, MapPin, Calendar, Clock, User, Shield, AlertTriangle, 
  FileText, CheckCircle, Download, MessageSquare, Paperclip,
  ExternalLink, ChevronRight, BarChart3, TrendingUp, Users,
  Tag, Phone, Mail, Building, Award, Eye, Edit, Trash2,
  Share2, Printer, Copy, BookOpen, Layers, Folder, Link,
  Activity, Timer, DollarSign, Percent, Target, Flag
} from 'lucide-react'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet"
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'

export const IncidentDetailsSheet = ({ 
  incident, 
  isOpen, 
  onOpenChange,
  onAssign,
  onResolve 
}) => {
  if (!incident) return null

  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'Critical': return 'bg-red-500'
      case 'High': return 'bg-orange-500'
      case 'Medium': return 'bg-yellow-500'
      case 'Low': return 'bg-blue-500'
      default: return 'bg-gray-500'
    }
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return 'bg-yellow-500'
      case 'under-investigation': return 'bg-purple-500'
      case 'assigned': return 'bg-blue-500'
      case 'resolved': return 'bg-green-500'
      case 'closed': return 'bg-emerald-500'
      default: return 'bg-gray-500'
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-2xl overflow-y-auto bg-white">
        <SheetHeader>
          <div className="flex items-start justify-between">
            <div>
              <SheetTitle className="text-2xl font-bold">
                {incident.title}
              </SheetTitle>
              <SheetDescription className="mt-2">
                Incident ID: {incident.id}
              </SheetDescription>
            </div>
            <SheetClose asChild>
              <Button variant="ghost" size="icon">
                <X className="h-4 w-4" />
              </Button>
            </SheetClose>
          </div>
        </SheetHeader>

        <div className="mt-6">
          {/* Severity and Status Badges */}
          <div className="flex flex-wrap gap-3 mb-6">
            <Badge 
              className={`px-3 py-1.5 text-white ${getSeverityColor(incident.severity)}`}
            >
              <AlertTriangle className="h-3.5 w-3.5 mr-1.5" />
              {incident.severity} Severity
            </Badge>
            
            <Badge 
              variant="outline"
              className={`px-3 py-1.5 border-2 ${getStatusColor(incident.status)}/20 text-${getStatusColor(incident.status).split('-')[1]}-700`}
            >
              <div className={`w-2 h-2 rounded-full ${getStatusColor(incident.status)} mr-1.5`}></div>
              {incident.status.charAt(0).toUpperCase() + incident.status.slice(1)}
            </Badge>
            
            {incident.priority && (
              <Badge variant="secondary" className="px-3 py-1.5">
                Priority: {incident.priority}
              </Badge>
            )}
          </div>

          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="details">
                <FileText className="h-4 w-4 mr-2" />
                Details
              </TabsTrigger>
              <TabsTrigger value="timeline">
                <Activity className="h-4 w-4 mr-2" />
                Timeline
              </TabsTrigger>
              <TabsTrigger value="evidence">
                <Folder className="h-4 w-4 mr-2" />
                Evidence
              </TabsTrigger>
              <TabsTrigger value="actions">
                <Target className="h-4 w-4 mr-2" />
                Actions
              </TabsTrigger>
            </TabsList>

            {/* Details Tab */}
            <TabsContent value="details" className="space-y-6 mt-6">
              <ScrollArea className="h-[500px] pr-4">
                <div className="space-y-6">
                  {/* Basic Information */}
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <BookOpen className="h-5 w-5" />
                        Basic Information
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-gray-500" />
                            <div>
                              <Label className="text-sm font-medium">Location</Label>
                              <p className="text-sm">{incident.location}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Building className="h-4 w-4 text-gray-500" />
                            <div>
                              <Label className="text-sm font-medium">Department</Label>
                              <p className="text-sm">{incident.department}</p>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-gray-500" />
                            <div>
                              <Label className="text-sm font-medium">Date & Time</Label>
                              <p className="text-sm">{incident.date} • {incident.time}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-gray-500" />
                            <div>
                              <Label className="text-sm font-medium">Days Open</Label>
                              <p className="text-sm">{incident.daysOpen} days</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Reporting & Assignment */}
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        Reporting & Assignment
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <div>
                            <Label className="text-sm font-medium">Reported By</Label>
                            <div className="flex items-center gap-2 mt-1">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback className="bg-blue-100 text-blue-600">
                                  {incident.reportedBy.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="text-sm font-medium">{incident.reportedBy}</p>
                                <p className="text-xs text-gray-500">Reporter</p>
                              </div>
                            </div>
                          </div>
                          <div>
                            <Label className="text-sm font-medium">Assigned To</Label>
                            <div className="flex items-center gap-2 mt-1">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback className="bg-green-100 text-green-600">
                                  {incident.assignedTo?.charAt(0) || 'U'}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="text-sm font-medium">{incident.assignedTo || 'Unassigned'}</p>
                                <p className="text-xs text-gray-500">{incident.assignedOfficer || 'No officer assigned'}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div>
                            <Label className="text-sm font-medium">Response Time</Label>
                            <p className="text-2xl font-bold text-green-600 mt-1">{incident.responseTime}</p>
                            <p className="text-xs text-gray-500">Initial response time</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium">Investigation Status</Label>
                            <div className="mt-1">
                              <Badge variant="outline">
                                {incident.investigationStatus}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Incident Description */}
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        Description
                      </h3>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {incident.description}
                      </p>
                    </CardContent>
                  </Card>

                  {/* Tags */}
                  {incident.tags && incident.tags.length > 0 && (
                    <Card>
                      <CardContent className="pt-6">
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                          <Tag className="h-5 w-5" />
                          Tags
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {incident.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Impact & Cost */}
                  {(incident.impact || incident.cost) && (
                    <Card>
                      <CardContent className="pt-6">
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                          <BarChart3 className="h-5 w-5" />
                          Impact Assessment
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                          {incident.impact && (
                            <div>
                              <Label className="text-sm font-medium">Impact Level</Label>
                              <p className="text-sm mt-1">{incident.impact}</p>
                            </div>
                          )}
                          {incident.cost && (
                            <div>
                              <Label className="text-sm font-medium">Estimated Cost</Label>
                              <p className="text-2xl font-bold text-red-600 mt-1">
                                ${incident.cost.toLocaleString()}
                              </p>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </ScrollArea>
            </TabsContent>

            {/* Timeline Tab */}
            <TabsContent value="timeline" className="space-y-6 mt-6">
              <ScrollArea className="h-[500px] pr-4">
                <div className="space-y-6">
                  <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                    
                    {/* Timeline items */}
                    <div className="space-y-8">
                      {/* Created */}
                      <div className="relative flex items-start">
                        <div className="absolute left-5 w-3 h-3 rounded-full bg-emerald-500 border-4 border-white"></div>
                        <div className="ml-12">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-gray-500" />
                            <span className="text-sm font-semibold">Incident Created</span>
                            <Badge variant="outline" className="text-xs">
                              {incident.date} • {incident.time}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">
                            Incident reported by {incident.reportedBy}
                          </p>
                        </div>
                      </div>

                      {/* Updated */}
                      <div className="relative flex items-start">
                        <div className="absolute left-5 w-3 h-3 rounded-full bg-blue-500 border-4 border-white"></div>
                        <div className="ml-12">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-gray-500" />
                            <span className="text-sm font-semibold">Last Updated</span>
                            <Badge variant="outline" className="text-xs">
                              {formatDate(incident.updatedAt)}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">
                            {incident.actionTaken}
                          </p>
                        </div>
                      </div>

                      {/* Resolution (if resolved) */}
                      {incident.resolvedAt && (
                        <div className="relative flex items-start">
                          <div className="absolute left-5 w-3 h-3 rounded-full bg-green-500 border-4 border-white"></div>
                          <div className="ml-12">
                            <div className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-gray-500" />
                              <span className="text-sm font-semibold">Resolved</span>
                              <Badge variant="outline" className="text-xs">
                                {formatDate(incident.resolvedAt)}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">
                              Resolved by {incident.resolvedBy}
                            </p>
                            {incident.resolutionNotes && (
                              <div className="mt-2 p-3 bg-green-50 rounded-lg">
                                <p className="text-sm text-green-800">
                                  {incident.resolutionNotes}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </TabsContent>

            {/* Evidence Tab */}
            <TabsContent value="evidence" className="space-y-6 mt-6">
              <ScrollArea className="h-[500px] pr-4">
                <div className="space-y-6">
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Folder className="h-5 w-5" />
                        Evidence Files
                      </h3>
                      <div className="space-y-3">
                        {incident.attachments && incident.attachments.length > 0 ? (
                          incident.attachments.map((file, index) => (
                            <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                              <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-50 rounded-lg">
                                  <FileText className="h-5 w-5 text-blue-600" />
                                </div>
                                <div>
                                  <p className="font-medium">{file}</p>
                                  <p className="text-xs text-gray-500">PDF Document • 2.4 MB</p>
                                </div>
                              </div>
                              <Button size="sm" variant="outline">
                                <Download className="h-4 w-4" />
                              </Button>
                            </div>
                          ))
                        ) : (
                          <div className="text-center py-8">
                            <Folder className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                            <p className="text-gray-500">No evidence files attached</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="text-lg font-semibold mb-4">Witnesses</h3>
                      <div className="space-y-3">
                        {Array.from({ length: incident.witnesses || 0 }).map((_, index) => (
                          <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                            <Avatar>
                              <AvatarFallback className="bg-purple-100 text-purple-600">
                                W{index + 1}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">Witness {index + 1}</p>
                              <p className="text-xs text-gray-500">Statement recorded</p>
                            </div>
                          </div>
                        ))}
                        {incident.witnesses === 0 && (
                          <p className="text-gray-500 text-sm">No witnesses reported</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </ScrollArea>
            </TabsContent>

            {/* Actions Tab */}
            <TabsContent value="actions" className="space-y-6 mt-6">
              <ScrollArea className="h-[500px] pr-4">
                <div className="space-y-6">
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Target className="h-5 w-5" />
                        Actions Taken
                      </h3>
                      <p className="text-sm text-gray-700 mb-4">
                        {incident.actionTaken}
                      </p>
                      <div className="space-y-3">
                        {incident.preventiveActions && incident.preventiveActions.map((action, index) => (
                          <div key={index} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                            <CheckCircle className="h-5 w-5 text-green-600" />
                            <p className="text-sm">{action}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {incident.rootCause && (
                    <Card>
                      <CardContent className="pt-6">
                        <h3 className="text-lg font-semibold mb-4">Root Cause</h3>
                        <p className="text-sm text-gray-700">{incident.rootCause}</p>
                      </CardContent>
                    </Card>
                  )}

                  {incident.estimatedResolution && (
                    <Card>
                      <CardContent className="pt-6">
                        <h3 className="text-lg font-semibold mb-4">Estimated Resolution</h3>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-5 w-5 text-blue-600" />
                          <p className="text-sm font-medium">{incident.estimatedResolution}</p>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>

          <SheetFooter className="mt-6 pt-6 border-t">
            <div className="flex flex-col sm:flex-row gap-3 w-full">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => {
                  onOpenChange(false)
                  onAssign && onAssign()
                }}
              >
                <Users className="h-4 w-4 mr-2" />
                Assign Officer
              </Button>
              
              {incident.status !== 'resolved' && incident.status !== 'closed' && (
                <Button 
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                  onClick={() => {
                    onOpenChange(false)
                    onResolve && onResolve()
                  }}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Mark Resolved
                </Button>
              )}
              
              <div className="flex gap-2">
                <Button variant="outline" size="icon">
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Printer className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  )
}