import React, { useState, useRef, useEffect } from 'react';


import { DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";


import {
  Smartphone, Camera, WifiOff, Lock, Upload, CheckCircle,
  AlertTriangle, Heart, Stethoscope, AlertOctagon, AlertCircle,
  Leaf, Shield, Flame, Beaker, ChevronDown, MapPin, Mic,
  Plus, Trash2, X, Loader2, ShieldAlert, Clock,
  Send, QrCode, Phone, Info, ExternalLink, Download
} from 'lucide-react';

export function MobileReportingDialog() {
  const [anonymous, setAnonymous] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [selectedIncident, setSelectedIncident] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isOffline, setIsOffline] = useState(false);
  const [photoUrls, setPhotoUrls] = useState([]);
  
  const fileInputRef = useRef(null);
  const formRef = useRef(null);

  const incidentTypes = [
    { 
      value: "near_miss", 
      label: "Near Miss", 
      color: "text-amber-600", 
      icon: AlertTriangle, 
      description: "Potential incident that didn't result in injury",
      severity: "low"
    },
    { 
      value: "first_aid", 
      label: "First Aid Case", 
      color: "text-orange-600", 
      icon: Heart, 
      description: "Minor injury requiring first aid treatment",
      severity: "medium"
    },
    { 
      value: "medical_treatment", 
      label: "Medical Treatment", 
      color: "text-red-600", 
      icon: Stethoscope, 
      description: "Injury requiring professional medical attention",
      severity: "high"
    },
    { 
      value: "lost_time", 
      label: "Lost Time Injury", 
      color: "text-red-700", 
      icon: AlertOctagon, 
      description: "Injury resulting in lost work days",
      severity: "critical"
    },
    { 
      value: "property_damage", 
      label: "Property Damage", 
      color: "text-purple-600", 
      icon: AlertCircle, 
      description: "Damage to equipment or property",
      severity: "medium"
    },
    { 
      value: "environmental", 
      label: "Environmental", 
      color: "text-emerald-600", 
      icon: Leaf, 
      description: "Environmental spill or contamination",
      severity: "high"
    },
    { 
      value: "security", 
      label: "Security Breach", 
      color: "text-blue-600", 
      icon: Shield, 
      description: "Security or access violation",
      severity: "medium"
    },
    { 
      value: "fire", 
      label: "Fire Hazard", 
      color: "text-red-600", 
      icon: Flame, 
      description: "Fire or fire-related incident",
      severity: "critical"
    },
    { 
      value: "chemical", 
      label: "Chemical Exposure", 
      color: "text-amber-700", 
      icon: Beaker, 
      description: "Chemical spill or exposure",
      severity: "high"
    },
  ];

  // Check online status
  useEffect(() => {
    setIsOffline(!navigator.onLine);
    
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Handle photo upload with validation
  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter(file => {
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        alert(`File ${file.name} is too large. Maximum size is 5MB.`);
        return false;
      }
      return true;
    });

    setPhotos(prev => {
      const newPhotos = [...prev, ...validFiles].slice(0, 5);
      // Create URLs for preview
      const urls = newPhotos.map(file => URL.createObjectURL(file));
      setPhotoUrls(urls);
      return newPhotos;
    });
  };

  const removePhoto = (index) => {
    setPhotos(prev => {
      const newPhotos = prev.filter((_, i) => i !== index);
      // Revoke URL to prevent memory leak
      URL.revokeObjectURL(photoUrls[index]);
      setPhotoUrls(prevUrls => prevUrls.filter((_, i) => i !== index));
      return newPhotos;
    });
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocation("Geolocation not supported");
      return;
    }

    setLocation("Getting location...");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const accuracy = position.coords.accuracy;
        setLocation(`📍 GPS: ${latitude.toFixed(6)}, ${longitude.toFixed(6)} (Accuracy: ${Math.round(accuracy)}m)`);
      },
      (error) => {
        const errorMessages = {
          1: "Location permission denied",
          2: "Location unavailable",
          3: "Location request timeout"
        };
        setLocation(`❌ ${errorMessages[error.code] || "Failed to get location"}`);
      },
      { 
        enableHighAccuracy: true, 
        timeout: 10000, 
        maximumAge: 0 
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedIncident || !description.trim()) {
      return;
    }

    setIsSubmitting(true);
    
    // Prepare form data
    const formData = new FormData();
    formData.append('incidentType', selectedIncident);
    formData.append('description', description);
    formData.append('location', location);
    formData.append('time', time || new Date().toISOString());
    formData.append('anonymous', anonymous);
    formData.append('offline', isOffline);
    
    photos.forEach((photo, index) => {
      formData.append(`photo_${index}`, photo);
    });

    try {
      // Simulate API call with better error handling
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() > 0.1) { // 90% success rate for demo
            resolve();
          } else {
            reject(new Error('Simulated network error'));
          }
        }, 1500);
      });

      setShowSuccess(true);
      
      // Auto-close after 2 seconds
      setTimeout(() => {
        setShowSuccess(false);
        // Reset form
        setSelectedIncident("");
        setDescription("");
        setLocation("");
        setTime("");
        setPhotos([]);
        photoUrls.forEach(url => URL.revokeObjectURL(url));
        setPhotoUrls([]);
        setIsSubmitting(false);
      }, 2000);

    } catch (error) {
      alert('Failed to submit report. Please try again or save offline.');
      setIsSubmitting(false);
    }
  };

  // Save report offline
  const saveOffline = () => {
    const report = {
      id: Date.now(),
      incidentType: selectedIncident,
      description,
      location,
      time: time || new Date().toISOString(),
      anonymous,
      photos: photos.length,
      timestamp: new Date().toISOString()
    };

    const offlineReports = JSON.parse(localStorage.getItem('offlineReports') || '[]');
    offlineReports.push(report);
    localStorage.setItem('offlineReports', JSON.stringify(offlineReports));
    
    alert('Report saved offline. It will be submitted when you reconnect.');
  };

  const selectedIncidentType = incidentTypes.find(t => t.value === selectedIncident);

  return (
    <DialogContent className="sm:max-w-123 md:max-w-137.5 bg-white p-0  max-h-[90vh]">
      {showSuccess ? (
        <div className="p-8 text-center space-y-6">
          <div className="mx-auto w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Report Submitted Successfully!
            </h3>
            <p className="text-gray-600">
              Your incident report has been received. Reference ID: INC-{Date.now().toString().slice(-6)}
            </p>
          </div>
          <div className="space-y-3">
            <Button variant="outline" className="w-full">
              <Download className="mr-2 h-4 w-4" />
              Download Report Copy
            </Button>
            <Button variant="outline" className="w-full">
              <Phone className="mr-2 h-4 w-4" />
              Contact Safety Officer
            </Button>
          </div>
        </div>
      ) : (
        <>
          {/* Header */}
          <DialogHeader className="space-y-4 p-6 pb-4 bg-gradient-to-b from-white to-blue-50/30 border-b border-gray-100 sticky top-0 z-10">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="relative">
                  <div className="absolute -inset-2 bg-gradient-to-r from-emerald-400/20 to-emerald-500/20 rounded-2xl blur-sm" />
                  <div className="relative inline-flex items-center justify-center p-3 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg">
                    <Smartphone className="h-7 w-7 text-white" />
                  </div>
                </div>
  
                <div>
                  <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                    Mobile Incident Report
                  </DialogTitle>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-emerald-100 to-emerald-50 text-amber-500 border border-blue-200">
                      <div className="relative flex h-2 w-2">
                        <div className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <div className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                      </div>
                      Mobile-Optimized
                    </span>
                    <span className="text-sm text-gray-500 font-medium">
                      <Clock className="inline h-3.5 w-3.5 mr-1" />
                      <span className="align-middle">~2 min completion</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <DialogDescription className="text-gray-600 space-y-3">
              <p className="text-base leading-relaxed">
                Quickly report safety incidents using your mobile device. This streamlined form is designed for fast, accurate reporting in the field.
              </p>
              
              {isOffline && (
                <Alert className="bg-amber-50 border-amber-200">
                  <AlertTriangle className="h-4 w-4 text-amber-600" />
                  <AlertDescription className="text-amber-700 font-medium">
                    You are offline. Reports will be saved locally and synced when you reconnect.
                  </AlertDescription>
                </Alert>
              )}
            </DialogDescription>
          </DialogHeader>

          {/* Main Form */}
          <div 
            ref={formRef}
            className="max-h-[calc(90vh-220px)] overflow-y-auto px-6 pb-6 pt-4 space-y-5"
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Anonymous Report */}
              <div className="bg-gradient-to-r from-gray-50/50 to-white p-4 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Lock className="h-5 w-5 text-gray-600" />
                    <div>
                      <Label htmlFor="anonymous" className="font-medium text-gray-900 cursor-pointer">
                        Submit Anonymously
                      </Label>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Your identity will be kept confidential
                      </p>
                    </div>
                  </div>
                  <Switch
                    id="anonymous"
                    checked={anonymous}
                    onCheckedChange={setAnonymous}
                    className="data-[state=checked]:bg-blue-600"
                  />
                </div>
              </div>

              {/* Incident Type - Enhanced */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                    <ShieldAlert className="h-4 w-4 text-blue-600" />
                    Incident Type
                    <span className="text-red-500">*</span>
                  </Label>
                  <span className="text-xs text-gray-500">
                    {selectedIncident ? "Selected" : "Required"}
                  </span>
                </div>
                
                <Select value={selectedIncident} onValueChange={setSelectedIncident}>
                  <SelectTrigger className="h-14 px-4 bg-white border-gray-300 hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all">
                    <div className="flex items-center gap-3 w-full">
                      {selectedIncidentType ? (
                        <>
                          <div className={`p-2 rounded-lg ${selectedIncidentType.color.replace('text-', 'bg-')}/10`}>
                            <selectedIncidentType.icon className={`h-5 w-5 ${selectedIncidentType.color}`} />
                          </div>
                          <div className="text-left">
                            <span className="font-semibold text-gray-900 block">
                              {selectedIncidentType.label}
                            </span>
                            <span className="text-xs text-gray-500">
                              Click to change
                            </span>
                          </div>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="h-5 w-5 text-gray-400" />
                          <span className="text-gray-500">Select incident type</span>
                        </>
                      )}
                      <ChevronDown className="h-4 w-4 text-gray-400 ml-auto" />
                    </div>
                  </SelectTrigger>
                  <SelectContent className="max-h-[320px] bg-white overflow-y-auto border-gray-200 shadow-xl">
                    <div className="sticky top-0 bg-white z-10 px-3 py-2 border-b border-gray-100">
                      <p className="text-xs font-semibold text-gray-700">SELECT INCIDENT TYPE</p>
                    </div>
                    {incidentTypes.map((type) => (
                      <SelectItem 
                        key={type.value} 
                        value={type.value}
                        className="py-3 px-4 hover:bg-gray-50 data-[state=checked]:bg-blue-50 border-l-0 data-[state=checked]:border-l-2 data-[state=checked]:border-blue-500 transition-all"
                      >
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-lg mt-0.5 ${type.color.replace('text-', 'bg-')}/10`}>
                            <type.icon className={`h-4 w-4 ${type.color}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className={`font-semibold ${type.color}`}>
                                {type.label}
                              </span>
                              {type.value === selectedIncident && (
                                <CheckCircle className="h-4 w-4 text-green-500 ml-auto flex-shrink-0" />
                              )}
                            </div>
                            <p className="text-xs text-gray-500 mt-1 leading-tight">
                              {type.description}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                                type.severity === 'critical' ? 'bg-red-100 text-red-800' :
                                type.severity === 'high' ? 'bg-orange-100 text-orange-800' :
                                type.severity === 'medium' ? 'bg-blue-100 text-blue-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {type.severity.toUpperCase()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Photo Upload */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                    <Camera className="h-4 w-4 text-blue-600" />
                    Incident Photos
                  </Label>
                  <span className="text-xs text-gray-500">
                    {photos.length}/5 photos
                  </span>
                </div>

                {/* Photo Preview Grid */}
                {photos.length > 0 && (
                  <div className="grid grid-cols-3 gap-3">
                    {photos.map((photo, index) => (
                      <div key={index} className="relative group">
                        <div className="aspect-square rounded-lg overflow-hidden border-2 border-gray-200 hover:border-blue-400 transition-colors bg-gray-100">
                          <img
                            src={photoUrls[index]}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                            onLoad={() => URL.revokeObjectURL(photoUrls[index])}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                          <button
                            type="button"
                            onClick={() => removePhoto(index)}
                            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                          >
                            <X className="h-3 w-3" />
                          </button>
                          <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                            <p className="text-xs text-white truncate">
                              {photo.name.length > 20 
                                ? photo.name.substring(0, 20) + '...' 
                                : photo.name}
                            </p>
                            <p className="text-[10px] text-gray-300">
                              {(photo.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                    {photos.length < 5 && (
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="aspect-square rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-400 hover:bg-blue-50/50 flex flex-col items-center justify-center transition-all group"
                      >
                        <Plus className="h-8 w-8 text-gray-400 group-hover:text-blue-400 mb-2" />
                        <span className="text-xs text-gray-500 group-hover:text-blue-600">
                          Add More
                        </span>
                      </button>
                    )}
                  </div>
                )}

                {/* Upload Zone */}
                <div className={`
                  border-3 border-dashed rounded-xl p-6 text-center transition-all duration-300
                  ${photos.length > 0 
                    ? 'border-gray-200 bg-gray-50/50' 
                    : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50/30 hover:shadow-sm'
                  }
                `}>
                  <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*,video/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                    capture="environment"
                  />
                  <div className="space-y-3">
                    <Button
                      type="button"
                      variant="outline"
                      className="px-6"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      {photos.length === 0 ? 'Upload Photos/Videos' : 'Add More Media'}
                    </Button>
                    <div className="text-xs text-gray-500 space-y-1">
                      <p>• Max 5 files (photos or videos)</p>
                      <p>• Max 5MB per file</p>
                      <p>• Supported: JPG, PNG, MP4</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                    <Info className="h-4 w-4 text-blue-600" />
                    Description
                    <span className="text-red-500">*</span>
                  </Label>
                  <div className="text-xs text-gray-500">
                    <span className={description.length > 800 ? 'text-red-600' : ''}>
                      {description.length}/1000
                    </span>
                  </div>
                </div>
                <div className="relative">
                  <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value.slice(0, 1000))}
                    placeholder="Provide clear details: What happened? Who was involved? Immediate actions taken? Any witnesses?"
                    className="min-h-[140px] resize-none border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 pr-12 text-sm"
                  />
                  <div className="absolute bottom-3 right-3 flex gap-2">
                    <button
                      type="button"
                      className="p-2 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-600 transition-colors"
                      title="Voice note"
                    >
                      <Mic className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {["Emergency", "Injury", "Equipment", "Weather", "Chemical", "Fire", "Spill", "Near Miss"].map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => setDescription(prev => prev + (prev ? ' ' : '') + `#${tag}`)}
                      className="text-xs px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900 transition-colors"
                    >
                      + {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Location & Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <Label className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-blue-600" />
                    Location
                  </Label>
                  <div className="relative">
                    <Input
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Enter location or use GPS"
                      className="pr-24 border-gray-300"
                    />
                    <button
                      type="button"
                      onClick={getCurrentLocation}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-blue-600 hover:text-blue-700 font-medium px-3 py-1.5 bg-blue-50 hover:bg-blue-100 rounded"
                    >
                      <MapPin className="h-3 w-3 inline mr-1" />
                      GPS
                    </button>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Label className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                    <Clock className="h-4 w-4 text-blue-600" />
                    Time of Incident
                  </Label>
                  <div className="relative">
                    <Input
                      type="datetime-local"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="border-gray-300"
                    />
                    <button
                      type="button"
                      onClick={() => setTime(new Date().toISOString().slice(0, 16))}
                      className="absolute right-1 cursor-pointer top-1/2 -translate-y-1/2 text-xs text-blue-600 hover:text-blue-700 font-medium px-3 py-1.5 bg-blue-50 hover:bg-blue-100 rounded"
                    >
                      Now
                    </button>
                  </div>
                </div>
              </div>

              {/* Emergency Contacts */}
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-red-800 mb-1">
                      Emergency Contact Information
                    </h4>
                    <div className="space-y-2 text-sm text-red-700">
                      <div className="flex items-center gap-2">
                        <Phone className="h-3 w-3" />
                        <span>Site Emergency: +255 XXX XXX XXX</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Shield className="h-3 w-3" />
                        <span>Safety Officer: +255 XXX XXX XXX</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="space-y-3 pt-2">
                <Button
                  type="submit"
                  disabled={!selectedIncident || !description.trim() || isSubmitting}
                  className="w-full h-12 bg-gradient-to-r from-emerald-600 to-emerald-600 text-white font-semibold shadow-lg hover:shadow-xl cursor-pointer transition-all disabled:opacity-70 "
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting Report...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      {isOffline ? 'Save Offline Report' : 'Submit Incident Report'}
                    </>
                  )}
                </Button>
                
                {isOffline && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={saveOffline}
                    className="w-full h-10"
                  >
                    <WifiOff className="mr-2 h-4 w-4" />
                    Save for Later Sync
                  </Button>
                )}
              </div>
            </form>

            {/* Footer */}
            <div className="pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <Shield className="h-3 w-3" />
                    <span>Encrypted</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <ExternalLink className="h-3 w-3" />
                    <span>Secure Transmission</span>
                  </div>
                </div>
                <div className="text-gray-400">
                  v2.1.4
                </div>
              </div>
              <p className="text-center text-xs text-gray-400 mt-3">
                For immediate emergencies, call your site emergency number first
              </p>
            </div>
          </div>
        </>
      )}
    </DialogContent>
  );
}