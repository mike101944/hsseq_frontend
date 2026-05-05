// RegisterForm.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { InputField } from '../../../components/inputFields/InputField';
import { Mail, Lock, User, Phone, Building, XCircle, Check, ChevronRight, ArrowRight, Shield, Key, FileText } from 'lucide-react';

export const RegisterForm = ({ 
  formData = {}, // ADD DEFAULT EMPTY OBJECT
  showPassword = false, 
  showConfirmPassword=false,
  formErrors = {}, 
  loading = false, 
  error,
  handleSubmit,
  handleInputChange,
  setShowPassword,
  setShowConfirmPassword,
  currentStep = 1,
  handleNextStep,
  handlePrevStep
}) => {
  // Safe destructuring with defaults
  const safeFormData = formData || {};
  
  // Password requirements
  const passwordRequirements = [
    { id: 1, text: 'At least 8 characters', valid: safeFormData.password?.length >= 8 },
    { id: 2, text: 'Contains uppercase letter', valid: /[A-Z]/.test(safeFormData.password || '') },
    { id: 3, text: 'Contains lowercase letter', valid: /[a-z]/.test(safeFormData.password || '') },
    { id: 4, text: 'Contains number', valid: /\d/.test(safeFormData.password || '') },
    { id: 5, text: 'Contains special character', valid: /[!@#$%^&*]/.test(safeFormData.password || '') }
  ];

  // Step Indicator Component
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
    <>



      <StepIndicator />

      <form onSubmit={handleSubmit} className="space-y-2">
        {/* Step 1: Personal Information */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <InputField
                icon={User}
                label="First Name"
                type="text"
                name="firstName"
                value={safeFormData.firstName || ''}
                onChange={handleInputChange}
                error={formErrors.firstName}
                placeholder="John"
                disabled={loading}
              />

              <InputField
                icon={User}
                label="Last Name"
                type="text"
                name="lastName"
                value={safeFormData.lastName || ''}
                onChange={handleInputChange}
                error={formErrors.lastName}
                placeholder="Doe"
                disabled={loading}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
            <InputField
              icon={Mail}
              label="Email Address"
              type="email"
              name="email"
              value={safeFormData.email || ''}
              onChange={handleInputChange}
              error={formErrors.email}
              placeholder="you@company.com"
              disabled={loading}
            />

            <InputField
              icon={Phone}
              label="Phone Number"
              type="tel"
              name="phone"
              value={safeFormData.phone || ''}
              onChange={handleInputChange}
              error={formErrors.phone}
              placeholder="+255 123 456 789"
              disabled={loading}
            />

            </div>

           

            <InputField
              icon={Building}
              label="Company"
              type="text"
              name="company"
              value={safeFormData.company || ''}
              onChange={handleInputChange}
              error={formErrors.company}
              placeholder="Your company name"
              disabled={loading}
            />

            <div className="pt-3 border-t border-gray-100">
              <button
                type="button"
                onClick={handleNextStep}
                disabled={loading}
                className="w-full py-3 px-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl font-bold hover:from-emerald-600 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                Register
                {/* <ChevronRight size={20} /> */}
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Security Information */}
        {currentStep === 2 && (
          <div className="space-y-3">
            {/* Password Requirements */}
            <div>
  <label className="text-sm font-medium text-gray-700 mb-2 block">Password Requirements</label>
  <div className="grid grid-cols-3 gap-3">
    {passwordRequirements.slice(0, 3).map((req) => (   
      <div key={req.id} className="flex items-center gap-2">
        <div className={`w-5 h-5 rounded-full flex items-center justify-center ${req.valid ? 'bg-emerald-100' : 'bg-gray-100'}`}>
          {req.valid ? (
            <Check size={12} className="text-emerald-600" />
          ) : (
            <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
          )}
        </div>
        <span className={`text-xs ${req.valid ? 'text-emerald-700' : 'text-gray-600'}`}>
          {req.text}
        </span>
      </div>
    ))}
    {passwordRequirements.slice(3, 5).map((req) => (   
      <div key={req.id} className="flex items-center gap-2">
        <div className={`w-5 h-5 rounded-full flex items-center justify-center ${req.valid ? 'bg-emerald-100' : 'bg-gray-100'}`}>
          {req.valid ? (
            <Check size={12} className="text-emerald-600" />
          ) : (
            <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
          )}
        </div>
        <span className={`text-xs ${req.valid ? 'text-emerald-700' : 'text-gray-600'}`}>
          {req.text}
        </span>
      </div>
    ))}
    {/* Optional: Add empty div for the 6th cell kama unataka grid ya 3x2 */}
    <div></div>
  </div>
</div>

            <InputField
              icon={Lock}
              label="Password"
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={safeFormData.password || ''}
              onChange={handleInputChange}
              error={formErrors.password}
              placeholder="••••••••"
              disabled={loading}
              showPasswordToggle={true}
              onTogglePassword={() => setShowPassword(!showPassword)}
            />

          <InputField
            icon={Lock}
            label="Confirm Password"
            type={showConfirmPassword ? 'text' : 'password'}
            name="confirmPassword"
            value={safeFormData.confirmPassword || ''}
            onChange={handleInputChange}
            error={formErrors.confirmPassword}
            placeholder="••••••••"
            disabled={loading}
            showPasswordToggle={true}
            onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
          />

            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                name="terms"
                checked={safeFormData.terms || false}
                onChange={handleInputChange}
                disabled={loading}
                className="mt-1 rounded text-emerald-600 focus:ring-emerald-500"
              />
              <label className="text-sm text-gray-700">
                I agree to the{' '}
                <a href="/terms" className="text-emerald-600 hover:text-emerald-700 font-medium">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="/privacy" className="text-emerald-600 hover:text-emerald-700 font-medium">
                  Privacy Policy
                </a>
              </label>
            </div>
            {formErrors.terms && (
              <div className="text-sm text-red-600">
                {formErrors.terms}
              </div>
            )}

            <div className="flex gap-4 pt-6 border-t border-gray-100">
             
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-3 px-4 bg-gradient-to-r cursor-pointer from-emerald-500 to-emerald-600 text-white rounded-xl font-bold hover:from-emerald-600 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Submitting request...
                  </>
                ) : (
                  <>
                    Create Account
                    {/* <ArrowRight size={20} /> */}
                  </>
                )}
              </button>
            </div>
          </div>
        )}



        <div className="text-center pt-4">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-bold text-emerald-600 hover:text-emerald-700">
              Sign in here
            </Link> OR 
            <button
                type="button"
                onClick={handlePrevStep}
                disabled={loading}
                className="bg-white ml-2 border-none border-gray-300 text-emerald-400 cursor-pointer font-semibold hover:bg-gray-50 disabled:opacity-50 transition-colors"
              >
               Back to step 1
              </button>
          </p>
        </div>
      </form>
    </>
  );
};