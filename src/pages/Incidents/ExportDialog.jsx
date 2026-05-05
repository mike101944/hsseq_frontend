"use client"

import React, { useState } from 'react'
import { 
  Download, FileSpreadsheet, FileText, X, Calendar, 
  Filter, Check, ChevronRight, Loader2 
} from 'lucide-react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

export const ExportDialog = ({ onExport }) => {
  const [format, setFormat] = useState('csv')
  const [selectedFields, setSelectedFields] = useState([
    'id', 'title', 'severity', 'status', 'date', 'location'
  ])
  const [dateRange, setDateRange] = useState('all')
  const [isLoading, setIsLoading] = useState(false)
  const [customFields, setCustomFields] = useState({
    includeAttachments: false,
    includeNotes: false,
    includeCosts: true
  })

  const fieldOptions = [
    { id: 'id', label: 'Incident ID', required: true },
    { id: 'title', label: 'Title', required: true },
    { id: 'severity', label: 'Severity', required: true },
    { id: 'status', label: 'Status', required: true },
    { id: 'date', label: 'Date', required: true },
    { id: 'time', label: 'Time' },
    { id: 'location', label: 'Location', required: true },
    { id: 'category', label: 'Category' },
    { id: 'reportedBy', label: 'Reported By' },
    { id: 'assignedTo', label: 'Assigned To' },
    { id: 'department', label: 'Department' },
    { id: 'daysOpen', label: 'Days Open' },
    { id: 'responseTime', label: 'Response Time' },
    { id: 'witnesses', label: 'Witness Count' },
    { id: 'evidence', label: 'Evidence Count' },
    { id: 'impact', label: 'Impact Level' },
    { id: 'cost', label: 'Estimated Cost' }
  ]

  const formatOptions = [
    { value: 'csv', label: 'CSV', icon: FileSpreadsheet, description: 'Compatible with Excel, Google Sheets' },
    { value: 'excel', label: 'Excel', icon: FileSpreadsheet, description: 'Microsoft Excel format (.xlsx)' },
    { value: 'pdf', label: 'PDF', icon: FileText, description: 'Portable Document Format' }
  ]

  const handleExport = async () => {
    setIsLoading(true)
    
    try {
      await onExport(format, {
        fields: selectedFields,
        dateRange,
        options: customFields
      })
    } finally {
      setIsLoading(false)
    }
  }

  const toggleField = (fieldId) => {
    const requiredFields = fieldOptions.filter(f => f.required).map(f => f.id)
    
    if (requiredFields.includes(fieldId)) {
      return // Don't allow removing required fields
    }
    
    setSelectedFields(prev => 
      prev.includes(fieldId)
        ? prev.filter(id => id !== fieldId)
        : [...prev, fieldId]
    )
  }

  const selectAllFields = () => {
    setSelectedFields(fieldOptions.map(f => f.id))
  }

  const deselectAllFields = () => {
    const requiredFields = fieldOptions.filter(f => f.required).map(f => f.id)
    setSelectedFields(requiredFields)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Export
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Export Incidents
          </DialogTitle>
          <DialogDescription>
            Select format and data to export. Export will include {selectedFields.length} fields.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Format Selection */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Export Format</Label>
            <RadioGroup value={format} onValueChange={setFormat} className="grid grid-cols-3 gap-2">
              {formatOptions.map((option) => (
                <div key={option.value}>
                  <RadioGroupItem
                    value={option.value}
                    id={`format-${option.value}`}
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor={`format-${option.value}`}
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-white p-4 hover:bg-gray-50 hover:border-gray-300 peer-data-[state=checked]:border-emerald-500 peer-data-[state=checked]:bg-emerald-50 cursor-pointer"
                  >
                    <option.icon className="mb-3 h-6 w-6" />
                    <span className="font-medium">{option.label}</span>
                    <span className="text-xs text-gray-500 mt-1">{option.description}</span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <Separator />

          {/* Date Range */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Date Range</Label>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant={dateRange === 'all' ? 'default' : 'outline'}
                className="justify-start"
                onClick={() => setDateRange('all')}
              >
                All Dates
              </Button>
              <Button
                variant={dateRange === 'last30' ? 'default' : 'outline'}
                className="justify-start"
                onClick={() => setDateRange('last30')}
              >
                Last 30 Days
              </Button>
              <Button
                variant={dateRange === 'last7' ? 'default' : 'outline'}
                className="justify-start"
                onClick={() => setDateRange('last7')}
              >
                Last 7 Days
              </Button>
              <Button
                variant={dateRange === 'custom' ? 'default' : 'outline'}
                className="justify-start"
                onClick={() => setDateRange('custom')}
              >
                Custom Range
              </Button>
            </div>
          </div>

          {/* Field Selection */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Fields to Include</Label>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={selectAllFields}>
                  Select All
                </Button>
                <Button variant="outline" size="sm" onClick={deselectAllFields}>
                  Required Only
                </Button>
              </div>
            </div>
            
            <div className="border rounded-lg p-4 max-h-60 overflow-y-auto">
              <div className="grid grid-cols-2 gap-3">
                {fieldOptions.map((field) => (
                  <div key={field.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`field-${field.id}`}
                      checked={selectedFields.includes(field.id)}
                      onCheckedChange={() => toggleField(field.id)}
                      disabled={field.required}
                    />
                    <Label
                      htmlFor={`field-${field.id}`}
                      className="text-sm cursor-pointer flex items-center gap-2"
                    >
                      {field.label}
                      {field.required && (
                        <Badge variant="outline" className="text-xs">
                          Required
                        </Badge>
                      )}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Additional Options */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Additional Options</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="include-notes"
                  checked={customFields.includeNotes}
                  onCheckedChange={(checked) => 
                    setCustomFields(prev => ({ ...prev, includeNotes: checked }))
                  }
                />
                <Label htmlFor="include-notes" className="text-sm cursor-pointer">
                  Include Resolution Notes
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="include-costs"
                  checked={customFields.includeCosts}
                  onCheckedChange={(checked) => 
                    setCustomFields(prev => ({ ...prev, includeCosts: checked }))
                  }
                />
                <Label htmlFor="include-costs" className="text-sm cursor-pointer">
                  Include Cost Estimates
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="include-attachments"
                  checked={customFields.includeAttachments}
                  onCheckedChange={(checked) => 
                    setCustomFields(prev => ({ ...prev, includeAttachments: checked }))
                  }
                />
                <Label htmlFor="include-attachments" className="text-sm cursor-pointer">
                  Include Attachment List
                </Label>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center pt-4 border-t">
          <div className="text-sm text-gray-500">
            {selectedFields.length} fields selected
          </div>
          <div className="flex gap-2">
            <DialogClose asChild>
              <Button variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button 
              onClick={handleExport}
              disabled={isLoading}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Exporting...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4 mr-2" />
                  Export Data
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}