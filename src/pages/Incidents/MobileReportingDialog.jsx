"use client"

import React, { useState, useRef, useEffect } from 'react';
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Smartphone,
  Camera,
  WifiOff,
  Lock,
  Upload,
  CheckCircle,
  AlertTriangle,
  Heart,
  Stethoscope,
  AlertOctagon,
  AlertCircle,
  Leaf,
  Shield,
  Flame,
  Beaker,
  ChevronDown,
  MapPin,
  Mic,
  Plus,
  Trash2,
  X,
  Loader2,
  ShieldAlert,
  Clock,
  Send,
  Phone,
  Info,
  ExternalLink,
  Download,
  Compass,
  Calendar,
  FileText,
  ShieldCheck,
  Zap,
  Wifi,
  Save,
  CameraOff,
  Volume2,
  Navigation,
  Eye,
  EyeOff,
  QrCode,
  MessageCircle,
  User,
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
  const [currentStep, setCurrentStep] = useState(1);
  const [showDescriptionHint, setShowDescriptionHint] = useState(false);
  const [useVoiceNote, setUseVoiceNote] = useState(false);
  const [voiceNote, setVoiceNote] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  
  const fileInputRef = useRef(null);
  const formRef = useRef(null);
  const descriptionRef = useRef(null);

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
      color: "text-orange-500", 
      icon: Heart, 
      description: "Minor injury requiring first aid treatment",
      severity: "medium"
    },
    { 
      value: "medical_treatment", 
      label: "Medical Treatment", 
      color: "text-red-500", 
      icon: Stethoscope, 
      description: "Injury requiring professional medical attention",
      severity: "high"
    },
    { 
      value: "lost_time", 
      label: "Lost Time Injury", 
      color: "text-red-600", 
      icon: AlertOctagon, 
      description: "Injury resulting in lost work days",
      severity: "critical"
    },
    { 
      value: "property_damage", 
      label: "Property Damage", 
      color: "text-yellow-600", 
      icon: AlertCircle, 
      description: "Damage to equipment or property",
      severity: "medium"
    },
    { 
      value: "environmental", 
      label: "Environmental", 
      color: "text-emerald-500", 
      icon: Leaf, 
      description: "Environmental spill or contamination",
      severity: "high"
    },
    { 
      value: "security", 
      label: "Security Breach", 
      color: "text-blue-500", 
      icon: Shield, 
      description: "Security or access violation",
      severity: "medium"
    },
    { 
      value: "fire", 
      label: "Fire Hazard", 
      color: "text-orange-600", 
      icon: Flame, 
      description: "Fire or fire-related incident",
      severity: "critical"
    },
    { 
      value: "chemical", 
      label: "Chemical Exposure", 
      color: "text-yellow-700", 
      icon: Beaker, 
      description: "Chemical spill or exposure",
      severity: "high"
    },
  ];

  // Check online status
  useEffect(() => {
    setIsOffline(!navigator.onLine);
    
    const handleOnline = () => {
      setIsOffline(false);
      // Sync any offline reports when coming online
      syncOfflineReports();
    };
    const handleOffline = () => setIsOffline(true);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const syncOfflineReports = () => {
    const offlineReports = JSON.parse(localStorage.getItem('offlineReports') || '[]');
    if (offlineReports.length > 0) {
      console.log('Syncing offline reports:', offlineReports.length);
      // In a real app, you would send these to your backend
      localStorage.removeItem('offlineReports');
    }
  };

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
        setLocation(` ${errorMessages[error.code] || "Failed to get location"}`);
      },
      { 
        enableHighAccuracy: true, 
        timeout: 10000, 
        maximumAge: 0 
      }
    );
  };

  const handleVoiceRecord = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.lang = 'en-US';
      recognition.continuous = false;
      recognition.interimResults = false;
      
      setIsRecording(true);
      
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setVoiceNote(transcript);
        setDescription(prev => prev + (prev ? ' ' : '') + transcript);
        setIsRecording(false);
      };
      
      recognition.onerror = () => {
        setIsRecording(false);
        alert('Voice recognition failed. Please type your description.');
      };
      
      recognition.start();
    } else {
      alert('Voice recognition not supported in this browser.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedIncident || !description.trim()) {
      alert('Please select incident type and provide description.');
      return;
    }

    setIsSubmitting(true);
    
    // Prepare form data
    const formData = new FormData();
    formData.append('incidentType', selectedIncident);
    formData.append('description', description);
    if (voiceNote) formData.append('voiceNote', voiceNote);
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
      
      // Auto-close after 3 seconds
      setTimeout(() => {
        setShowSuccess(false);
        // Reset form
        setSelectedIncident("");
        setDescription("");
        setVoiceNote("");
        setLocation("");
        setTime("");
        setPhotos([]);
        photoUrls.forEach(url => URL.revokeObjectURL(url));
        setPhotoUrls([]);
        setIsSubmitting(false);
        setCurrentStep(1);
      }, 3000);

    } catch (error) {
      alert('Failed to submit report. Please try again or save offline.');
      setIsSubmitting(false);
    }
  };

  // Save report offline
  const saveOffline = () => {
    if (!selectedIncident || !description.trim()) {
      alert('Please provide incident type and description before saving offline.');
      return;
    }

    const report = {
      id: Date.now(),
      incidentType: selectedIncident,
      description,
      voiceNote,
      location,
      time: time || new Date().toISOString(),
      anonymous,
      photos: photos.length,
      timestamp: new Date().toISOString()
    };

    const offlineReports = JSON.parse(localStorage.getItem('offlineReports') || '[]');
    offlineReports.push(report);
    localStorage.setItem('offlineReports', JSON.stringify(offlineReports));
    
    // Clear form after saving
    setSelectedIncident("");
    setDescription("");
    setVoiceNote("");
    setLocation("");
    setTime("");
    setPhotos([]);
    photoUrls.forEach(url => URL.revokeObjectURL(url));
    setPhotoUrls([]);
    
    alert('Report saved offline. It will be submitted automatically when you reconnect.');
  };

  const selectedIncidentType = incidentTypes.find(t => t.value === selectedIncident);

  const steps = [
    { id: 1, title: "Incident Details", icon: <AlertTriangle className="h-4 w-4" /> },
    { id: 2, title: "Evidence", icon: <Camera className="h-4 w-4" /> },
    { id: 3, title: "Location & Time", icon: <MapPin className="h-4 w-4" /> },
    { id: 4, title: "Review", icon: <CheckCircle className="h-4 w-4" /> },
  ];

  const descriptionHints = [
    "Describe what happened in sequence",
    "Mention any equipment involved",
    "Note environmental conditions",
    "List people involved or affected",
    "Describe immediate actions taken",
    "Identify potential root causes"
  ];

  return (
    <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto bg-white p-0 border-0 shadow-2xl 
      [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      
      {showSuccess ? (
        <div className="p-8 text-center space-y-6">
          <div className="mx-auto w-24 h-24 rounded-full bg-gradient-to-br from-amber-100 to-yellow-100 flex items-center justify-center shadow-lg">
            <CheckCircle className="h-12 w-12 text-amber-600" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Report Submitted!
            </h3>
            <p className="text-gray-600 mb-4">
              Your incident report has been received and logged.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 rounded-full">
              <ShieldCheck className="h-4 w-4 text-amber-600" />
              <span className="font-mono font-bold text-amber-700">
                INC-{Date.now().toString().slice(-8)}
              </span>
            </div>
          </div>
          <div className="space-y-3">
            <Button 
              variant="outline" 
              className="w-full gap-2 border-amber-200 hover:border-amber-300 hover:bg-amber-50"
            >
              <Download className="h-4 w-4" />
              Download Report Copy
            </Button>
            <Button 
              variant="outline" 
              className="w-full gap-2 border-amber-200 hover:border-amber-300 hover:bg-amber-50"
            >
              <MessageCircle className="h-4 w-4" />
              Contact Safety Officer
            </Button>
          </div>
        </div>
      ) : (
        <>
          {/* Header */}
          <DialogHeader className="space-y-4 p-6 pb-4 bg-gradient-to-b from-amber-900/90 to-amber-800 text-white border-b border-amber-700 sticky top-0 z-10">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="relative">
                  <div className="absolute -inset-2 bg-gradient-to-r from-amber-400/30 to-yellow-400/30 rounded-2xl blur-sm" />
                  <div className="relative inline-flex items-center justify-center p-3 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-500 shadow-lg">
                    <Smartphone className="h-7 w-7 text-white" />
                  </div>
                </div>
  
                <div>
                  <DialogTitle className="text-2xl font-bold text-white">
                    Mobile Incident Report
                  </DialogTitle>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-white/20 backdrop-blur-sm text-white">
                      <Zap className="h-3 w-3" />
                      Quick Report
                    </span>
                    {isOffline && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-amber-500/30 text-white">
                        <WifiOff className="h-3 w-3" />
                        Offline Mode
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            <DialogDescription className="text-amber-100 space-y-2">
              <p className="text-base leading-relaxed">
                Report safety incidents quickly from your mobile device. Optimized for field use.
              </p>
              
              {/* Progress Steps */}
              <div className="flex items-center justify-between pt-3">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex flex-col items-center">
                    <div className={`
                      w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-medium
                      ${currentStep >= step.id 
                        ? 'bg-amber-500 border-amber-500 text-white' 
                        : 'bg-white/10 border-white/30 text-white/60'
                      }
                    `}>
                      {step.icon}
                    </div>
                    <span className="text-xs mt-1 text-white/80">{step.title}</span>
                  </div>
                ))}
              </div>
            </DialogDescription>
          </DialogHeader>

          {/* Main Form */}
          <div 
            ref={formRef}
            className="max-h-[calc(90vh-220px)] overflow-y-auto px-5 pb-5 pt-4 space-y-5"
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Step 1: Incident Details */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">1. Incident Details</h3>
                  <span className="text-xs text-gray-500">Step 1/4</span>
                </div>

                {/* Anonymous Report */}
                <div className="bg-gradient-to-r from-amber-50/50 to-yellow-50/50 p-4 rounded-xl border border-amber-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Lock className="h-5 w-5 text-amber-600" />
                      <div>
                        <Label htmlFor="anonymous" className="font-medium text-gray-900 cursor-pointer">
                          Anonymous Report
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
                      className="data-[state=checked]:bg-amber-600"
                    />
                  </div>
                </div>

                {/* Incident Type */}
                <div className="space-y-3">
                  <Label className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-600" />
                    Incident Type <span className="text-red-500 ml-1">*</span>
                  </Label>
                  
                  <Select value={selectedIncident} onValueChange={setSelectedIncident}>
                    <SelectTrigger className="h-14 px-4 bg-white border-amber-200 hover:border-amber-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all">
                      <div className="flex items-center gap-3 w-full">
                        {selectedIncidentType ? (
                          <>
                            <div className={`p-2 rounded-lg bg-amber-100`}>
                              <selectedIncidentType.icon className={`h-5 w-5 ${selectedIncidentType.color}`} />
                            </div>
                            <div className="text-left">
                              <span className="font-semibold text-gray-900 block">
                                {selectedIncidentType.label}
                              </span>
                              <span className="text-xs text-amber-600">
                                {selectedIncidentType.severity.toUpperCase()}
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
                    <SelectContent className="max-h-[320px] bg-white overflow-y-auto border-amber-200 shadow-xl">
                      {incidentTypes.map((type) => (
                        <SelectItem 
                          key={type.value} 
                          value={type.value}
                          className="py-3 px-4 hover:bg-amber-50 data-[state=checked]:bg-amber-50 border-l-0 data-[state=checked]:border-l-2 data-[state=checked]:border-amber-500 transition-all"
                        >
                          <div className="flex items-start gap-3">
                            <div className={`p-2 rounded-lg mt-0.5 bg-amber-100`}>
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
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Description */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                      <FileText className="h-4 w-4 text-amber-600" />
                      Description <span className="text-red-500 ml-1">*</span>
                    </Label>
                    <button
                      type="button"
                      onClick={() => setShowDescriptionHint(!showDescriptionHint)}
                      className="text-xs text-amber-600 hover:text-amber-700 font-medium"
                    >
                      {showDescriptionHint ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                      {showDescriptionHint ? 'Hide Hints' : 'Show Hints'}
                    </button>
                  </div>
                  
                  {showDescriptionHint && (
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                      <p className="text-xs font-medium text-amber-800 mb-2">What to include:</p>
                      <div className="space-y-1">
                        {descriptionHints.map((hint, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                            <span className="text-xs text-amber-700">{hint}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="relative">
                    <Textarea
                      ref={descriptionRef}
                      value={description}
                      onChange={(e) => setDescription(e.target.value.slice(0, 1000))}
                      placeholder="Describe what happened, who was involved, immediate actions taken..."
                      className="min-h-[120px] resize-none border-amber-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 pr-24 text-sm"
                    />
                    <div className="absolute bottom-3 right-3 flex gap-2">
                      <button
                        type="button"
                        onClick={handleVoiceRecord}
                        disabled={isRecording}
                        className={`p-2 rounded-full ${isRecording ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'} hover:bg-amber-200 transition-colors`}
                        title="Voice note"
                      >
                        {isRecording ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Mic className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {["Emergency", "Injury", "Equipment", "Fire"].map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => setDescription(prev => prev + (prev ? ' ' : '') + `#${tag}`)}
                          className="text-xs px-2.5 py-1 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-700 hover:text-amber-900 transition-colors"
                        >
                          + {tag}
                        </button>
                      ))}
                    </div>
                    <div className="text-xs text-gray-500">
                      <span className={description.length > 800 ? 'text-red-600' : ''}>
                        {description.length}/1000
                      </span>
                    </div>
                  </div>
                </div>

                <Button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  disabled={!selectedIncident || !description.trim()}
                  className="w-full bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white font-semibold"
                >
                  Next: Add Evidence
                </Button>
              </div>

              {/* Step 2: Evidence */}
              {currentStep >= 2 && (
                <div className="space-y-4 border-t pt-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">2. Evidence Collection</h3>
                    <span className="text-xs text-gray-500">Step 2/4</span>
                  </div>

                  {/* Photo Upload */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                        <Camera className="h-4 w-4 text-amber-600" />
                        Photos & Videos ({photos.length}/5)
                      </Label>
                      {photos.length > 0 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => setPhotos([])}
                          className="text-xs text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-3 w-3 mr-1" />
                          Clear All
                        </Button>
                      )}
                    </div>

                    {/* Photo Preview Grid */}
                    {photos.length > 0 ? (
                      <div className="grid grid-cols-3 gap-2">
                        {photos.map((photo, index) => (
                          <div key={index} className="relative group">
                            <div className="aspect-square rounded-lg overflow-hidden border-2 border-amber-200 hover:border-amber-400 transition-colors bg-amber-50">
                              <img
                                src={photoUrls[index]}
                                alt={`Preview ${index + 1}`}
                                className="w-full h-full object-cover"
                                onLoad={() => URL.revokeObjectURL(photoUrls[index])}
                              />
                              <button
                                type="button"
                                onClick={() => removePhoto(index)}
                                className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </div>
                          </div>
                        ))}
                        {photos.length < 5 && (
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="aspect-square rounded-lg border-2 border-dashed border-amber-300 hover:border-amber-400 hover:bg-amber-50 flex flex-col items-center justify-center transition-all"
                          >
                            <Plus className="h-6 w-6 text-amber-400 mb-1" />
                            <span className="text-xs text-amber-600">
                              Add More
                            </span>
                          </button>
                        )}
                      </div>
                    ) : (
                      <div className={`
                        border-3 border-dashed rounded-xl p-6 text-center transition-all duration-300
                        bg-gradient-to-br from-amber-50/30 to-yellow-50/30 border-amber-300 hover:border-amber-400
                      `}>
                        <Camera className="h-10 w-10 text-amber-400 mx-auto mb-3" />
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
                            className="px-6 border-amber-300 text-amber-700 hover:border-amber-400 hover:bg-amber-50"
                            onClick={() => fileInputRef.current?.click()}
                          >
                            <Upload className="mr-2 h-4 w-4" />
                            Upload Evidence
                          </Button>
                          <div className="text-xs text-gray-500 space-y-1">
                            <p>• Capture photos directly from camera</p>
                            <p>• Max 5MB per file</p>
                            <p>• Photos help investigation</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setCurrentStep(1)}
                      className="flex-1 border-amber-200 text-amber-700 hover:border-amber-300 hover:bg-amber-50"
                    >
                      Back
                    </Button>
                    <Button
                      type="button"
                      onClick={() => setCurrentStep(3)}
                      className="flex-1 bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white font-semibold"
                    >
                      Next: Location
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3: Location & Time */}
              {currentStep >= 3 && (
                <div className="space-y-4 border-t pt-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">3. Location & Time</h3>
                    <span className="text-xs text-gray-500">Step 3/4</span>
                  </div>

                  <div className="space-y-4">
                    {/* Location */}
                    <div className="space-y-3">
                      <Label className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-amber-600" />
                        Location
                      </Label>
                      <div className="relative">
                        <Input
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          placeholder="Enter location or use GPS"
                          className="pr-32 border-amber-200 focus:border-amber-500"
                        />
                        <div className="absolute right-1 top-1/2 -translate-y-1/2 flex gap-1">
                          <button
                            type="button"
                            onClick={getCurrentLocation}
                            className="text-xs text-amber-600 hover:text-amber-700 font-medium px-3 py-1.5 bg-amber-50 hover:bg-amber-100 rounded"
                          >
                            <Navigation className="h-3 w-3" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setLocation("")}
                            className="text-xs text-gray-500 hover:text-gray-700 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded"
                          >
                            Clear
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Time */}
                    <div className="space-y-3">
                      <Label className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                        <Clock className="h-4 w-4 text-amber-600" />
                        Time of Incident
                      </Label>
                      <div className="relative">
                        <Input
                          type="datetime-local"
                          value={time}
                          onChange={(e) => setTime(e.target.value)}
                          className="pr-24 border-amber-200 focus:border-amber-500"
                        />
                        <button
                          type="button"
                          onClick={() => setTime(new Date().toISOString().slice(0, 16))}
                          className="absolute right-1 top-1/2 -translate-y-1/2 text-xs text-amber-600 hover:text-amber-700 font-medium px-3 py-1.5 bg-amber-50 hover:bg-amber-100 rounded"
                        >
                          Set to Now
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setCurrentStep(2)}
                      className="flex-1 border-amber-200 text-amber-700 hover:border-amber-300 hover:bg-amber-50"
                    >
                      Back
                    </Button>
                    <Button
                      type="button"
                      onClick={() => setCurrentStep(4)}
                      className="flex-1 bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white font-semibold"
                    >
                      Next: Review
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 4: Review */}
              {currentStep === 4 && (
                <div className="space-y-4 border-t pt-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">4. Review & Submit</h3>
                    <span className="text-xs text-gray-500">Step 4/4</span>
                  </div>

                  {/* Review Summary */}
                  <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-xl p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Incident Type:</span>
                      <span className="font-semibold text-gray-900">
                        {selectedIncidentType?.label || "Not selected"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Photos:</span>
                      <span className="font-semibold text-gray-900">{photos.length} files</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Location:</span>
                      <span className="font-semibold text-gray-900 truncate max-w-[150px]">
                        {location || "Not specified"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Mode:</span>
                      <span className="font-semibold text-gray-900">
                        {anonymous ? "Anonymous" : "Standard"} • {isOffline ? "Offline" : "Online"}
                      </span>
                    </div>
                  </div>

                  {/* Emergency Contacts */}
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-red-800 mb-1">
                          Emergency Contacts
                        </h4>
                        <div className="space-y-2 text-sm text-red-700">
                          <div className="flex items-center gap-2">
                            <Phone className="h-3 w-3" />
                            <span>Site Emergency: +255 XXX XXX XXX</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <User className="h-3 w-3" />
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
                      disabled={isSubmitting}
                      className="w-full h-12 bg-gradient-to-r from-amber-600 to-yellow-600 text-white font-semibold shadow-lg hover:shadow-xl hover:from-amber-700 hover:to-yellow-700"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          {isOffline ? 'Saving Offline...' : 'Submitting...'}
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          {isOffline ? 'Save Offline Report' : 'Submit Report'}
                        </>
                      )}
                    </Button>
                    
                    {isOffline && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={saveOffline}
                        className="w-full h-10 border-amber-200 text-amber-700 hover:border-amber-300 hover:bg-amber-50"
                      >
                        <Save className="mr-2 h-4 w-4" />
                        Save & Continue Later
                      </Button>
                    )}

                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setCurrentStep(3)}
                      className="w-full h-10 border-amber-200 text-amber-700 hover:border-amber-300 hover:bg-amber-50"
                    >
                      Back to Edit
                    </Button>
                  </div>
                </div>
              )}
            </form>

            {/* Footer */}
            <div className="pt-4 border-t border-amber-100">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="h-3 w-3 text-amber-600" />
                    <span>Encrypted</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-3 w-3 text-amber-600" />
                    <span>Auto-save</span>
                  </div>
                </div>
                <div className="text-gray-400">
                  v2.1.4
                </div>
              </div>
              <p className="text-center text-xs text-amber-600 mt-3 font-medium">
                For emergencies, call your site emergency number immediately
              </p>
            </div>
          </div>
        </>
      )}
    </DialogContent>
  );
}