import React, { useState } from 'react';
import {
  Shield,
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Building,
  Phone,
  CheckCircle,
  XCircle,
  AlertCircle,
  ArrowRight,
  ChevronRight,
  Key,
  Smartphone,
  Globe,
  Briefcase,
  FileText,
  Check
} from 'lucide-react';

export const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    department: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
    newsletter: true
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const passwordRequirements = [
    { id: 1, text: 'At least 8 characters', valid: formData.password.length >= 8 },
    { id: 2, text: 'Contains uppercase letter', valid: /[A-Z]/.test(formData.password) },
    { id: 3, text: 'Contains lowercase letter', valid: /[a-z]/.test(formData.password) },
    { id: 4, text: 'Contains number', valid: /\d/.test(formData.password) },
    { id: 5, text: 'Contains special character', valid: /[!@#$%^&*]/.test(formData.password) }
  ];

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.company.trim()) newErrors.company = 'Company is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.agreeTerms) newErrors.agreeTerms = 'You must agree to the terms';
    
    const passwordValid = passwordRequirements.every(req => req.valid);
    if (!passwordValid && formData.password) {
      newErrors.password = 'Password does not meet requirements';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
    }
  };

  const handleBack = () => {
    setCurrentStep(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (currentStep === 2 && validateStep2()) {
      setIsLoading(true);
      
      // Simulate API call
      try {
        // Replace with actual API call
        // const response = await fetch('/api/auth/register', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(formData)
        // });
        
        // const data = await response.json();
        
        await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API delay
        
        setRegistrationSuccess(true);
        // In real app: router.push('/verification')
        
        setTimeout(() => {
          alert('Registration submitted! Awaiting admin approval.');
          // router.push('/verification');
        }, 500);
        
      } catch (error) {
        setErrors({ general: 'Registration failed. Please try again.' });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const InputField = ({ icon: Icon, label, type = 'text', name, value, onChange, error, placeholder, optional = false }) => (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        {optional && <span className="text-xs text-gray-500">Optional</span>}
      </div>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon size={20} className="text-gray-400" />
        </div>
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all ${
            error ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
          }`}
        />
        {(name === 'password' || name === 'confirmPassword') && (
          <button
            type="button"
            onClick={() => name === 'password' ? setShowPassword(!showPassword) : setShowConfirmPassword(!showConfirmPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            {(name === 'password' && showPassword) || (name === 'confirmPassword' && showConfirmPassword) ? (
              <EyeOff size={20} className="text-gray-400 hover:text-gray-600" />
            ) : (
              <Eye size={20} className="text-gray-400 hover:text-gray-600" />
            )}
          </button>
        )}
      </div>
      {error && (
        <div className="flex items-center gap-2 text-sm text-red-600">
          <AlertCircle size={14} />
          {error}
        </div>
      )}
    </div>
  );

  const StepIndicator = () => (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className={`flex items-center gap-2 ${currentStep >= 1 ? 'text-emerald-600' : 'text-gray-400'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 1 ? 'bg-emerald-100' : 'bg-gray-100'}`}>
            {currentStep > 1 ? <Check size={16} /> : '1'}
          </div>
          <span className="text-sm font-medium">Personal Info</span>
        </div>
        <div className="flex-1 h-0.5 mx-4 bg-gray-200"></div>
        <div className={`flex items-center gap-2 ${currentStep >= 2 ? 'text-emerald-600' : 'text-gray-400'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 2 ? 'bg-emerald-100' : 'bg-gray-100'}`}>
            2
          </div>
          <span className="text-sm font-medium">Security</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50/30 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        

        {/* Registration Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-8">
            <StepIndicator />

            {registrationSuccess && (
              <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
                <div className="flex items-center gap-3">
                  <CheckCircle size={20} className="text-emerald-600" />
                  <div>
                    <div className="font-medium text-emerald-800">Registration submitted!</div>
                    <div className="text-sm text-emerald-700">Awaiting admin approval. You'll receive an email confirmation.</div>
                  </div>
                </div>
              </div>
            )}

            {errors.general && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                <div className="flex items-center gap-3">
                  <XCircle size={20} className="text-red-600" />
                  <div className="font-medium text-red-800">{errors.general}</div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {currentStep === 1 ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <InputField
                      icon={User}
                      label="First Name"
                      name="firstName"
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      error={errors.firstName}
                      placeholder="John"
                    />
                    <InputField
                      icon={User}
                      label="Last Name"
                      name="lastName"
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      error={errors.lastName}
                      placeholder="Doe"
                    />
                  </div>

                  <InputField
                    icon={Mail}
                    label="Work Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    error={errors.email}
                    placeholder="john.doe@company.com"
                  />

                  <div className="grid grid-cols-2 gap-6">
                    <InputField
                      icon={Phone}
                      label="Phone Number"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      error={errors.phone}
                      placeholder="+255 123 456 789"
                      optional
                    />
                    <InputField
                      icon={Building}
                      label="Department"
                      name="department"
                      value={formData.department}
                      onChange={(e) => setFormData({...formData, department: e.target.value})}
                      error={errors.department}
                      placeholder="Safety"
                      optional
                    />
                  </div>

                  <InputField
                    icon={Briefcase}
                    label="Company Name"
                    name="company"
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    error={errors.company}
                    placeholder="Your Company Ltd"
                  />

                  <div className="pt-6 border-t border-gray-100">
                    <button
                      type="button"
                      onClick={handleNext}
                      className="w-full py-3 px-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl font-bold hover:from-emerald-600 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                    >
                      Continue to Security
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2">Password Requirements</label>
                    <div className="space-y-2 mb-6">
                      {passwordRequirements.map((req) => (
                        <div key={req.id} className="flex items-center gap-2">
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center ${req.valid ? 'bg-emerald-100' : 'bg-gray-100'}`}>
                            {req.valid ? (
                              <Check size={12} className="text-emerald-600" />
                            ) : (
                              <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
                            )}
                          </div>
                          <span className={`text-sm ${req.valid ? 'text-emerald-700' : 'text-gray-600'}`}>
                            {req.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <InputField
                    icon={Lock}
                    label="Create Password"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    error={errors.password}
                    placeholder="Create strong password"
                  />

                  <InputField
                    icon={Lock}
                    label="Confirm Password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    error={errors.confirmPassword}
                    placeholder="Re-enter your password"
                  />

                  <div className="space-y-4">
                    <label className={`flex items-start gap-3 p-4 border rounded-xl cursor-pointer transition-all ${
                      errors.agreeTerms ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-emerald-300'
                    }`}>
                      <input
                        type="checkbox"
                        checked={formData.agreeTerms}
                        onChange={(e) => setFormData({...formData, agreeTerms: e.target.checked})}
                        className="mt-1 rounded text-emerald-600 focus:ring-emerald-500"
                      />
                      <div className="text-sm">
                        <div className="font-medium text-gray-900 mb-1">
                          I agree to the Terms of Service and Privacy Policy
                        </div>
                        <div className="text-gray-600">
                          By creating an account, you agree to our terms and acknowledge our privacy policy.
                        </div>
                      </div>
                    </label>
                    {errors.agreeTerms && (
                      <div className="flex items-center gap-2 text-sm text-red-600">
                        <AlertCircle size={14} />
                        {errors.agreeTerms}
                      </div>
                    )}

                    <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl hover:border-emerald-300 cursor-pointer transition-all">
                      <input
                        type="checkbox"
                        checked={formData.newsletter}
                        onChange={(e) => setFormData({...formData, newsletter: e.target.checked})}
                        className="rounded text-emerald-600 focus:ring-emerald-500"
                      />
                      <div className="text-sm">
                        <div className="font-medium text-gray-900">
                          Receive safety updates and notifications
                        </div>
                        <div className="text-gray-600">
                          Get important safety alerts and training updates
                        </div>
                      </div>
                    </label>
                  </div>

                  <div className="flex gap-4 pt-6 border-t border-gray-100">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="flex-1 py-3 px-4 bg-white border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="flex-1 py-3 px-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl font-bold hover:from-emerald-600 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                    >
                      {isLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          Processing...
                        </>
                      ) : (
                        <>
                          Submit Request
                          <ArrowRight size={20} />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </form>

            <div className="mt-8 pt-6 border-t border-gray-100 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <a href="/login" className="font-bold text-emerald-600 hover:text-emerald-700">
                  Sign in here
                </a>
              </p>
            </div>
          </div>

          {/* Security Features */}
          <div className="bg-gradient-to-r from-gray-50 to-emerald-50/50 px-8 py-6 border-t border-gray-100">
            <div className="grid grid-cols-3 gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <Shield size={16} className="text-emerald-600" />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-700">Enterprise Security</div>
                  <div className="text-xs text-gray-500">Bank-level encryption</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Key size={16} className="text-yellow-600" />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-700">Admin Approval</div>
                  <div className="text-xs text-gray-500">Required for access</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FileText size={16} className="text-blue-600" />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-700">Compliance</div>
                  <div className="text-xs text-gray-500">ISO, OSHA standards</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-xs text-gray-500">
            © 2024 HSSEQ Management System. All rights reserved.
            <br />
            Need help? <a href="/support" className="text-emerald-600 hover:text-emerald-700">Contact IT Support</a>
          </p>
        </div>
      </div>
    </div>
  );
};