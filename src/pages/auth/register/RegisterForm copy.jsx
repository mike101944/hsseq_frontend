// RegisterForm.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { InputField } from '../../../components/inputFields/InputField';
import { Mail, Lock, User, Phone, Building, XCircle } from 'lucide-react';

export const RegisterForm = ({ 
  formData = {}, // ADD DEFAULT EMPTY OBJECT
  showPassword = false, 
  formErrors = {}, 
  loading = false, 
  error,
  handleSubmit,
  handleInputChange,
  setShowPassword 
}) => {
  // Safe destructuring with defaults
  const safeFormData = formData || {};
  
  return (
    <>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Request Access</h2>
        <p className="text-gray-600">Create a new account for HSSEQ management</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
          <div className="flex items-center gap-3">
            <XCircle size={20} className="text-red-600" />
            <div className="font-medium text-red-800">{error}</div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <InputField
            icon={User}
            label="First Name"
            type="text"
            name="firstName"
            value={safeFormData.firstName || ''} // ADD DEFAULT VALUE
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
            value={safeFormData.lastName || ''} // ADD DEFAULT VALUE
            onChange={handleInputChange}
            error={formErrors.lastName}
            placeholder="Doe"
            disabled={loading}
          />
        </div>

        <InputField
          icon={Mail}
          label="Email Address"
          type="email"
          name="email"
          value={safeFormData.email || ''} // ADD DEFAULT VALUE
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
          value={safeFormData.phone || ''} // ADD DEFAULT VALUE
          onChange={handleInputChange}
          error={formErrors.phone}
          placeholder="+255 123 456 789"
          disabled={loading}
        />

        <InputField
          icon={Building}
          label="Company"
          type="text"
          name="company"
          value={safeFormData.company || ''} // ADD DEFAULT VALUE
          onChange={handleInputChange}
          error={formErrors.company}
          placeholder="Your company name"
          disabled={loading}
        />

        <InputField
          icon={Lock}
          label="Password"
          type={showPassword ? 'text' : 'password'}
          name="password"
          value={safeFormData.password || ''} // ADD DEFAULT VALUE
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
          type={showPassword ? 'text' : 'password'}
          name="confirmPassword"
          value={safeFormData.confirmPassword || ''} // ADD DEFAULT VALUE
          onChange={handleInputChange}
          error={formErrors.confirmPassword}
          placeholder="••••••••"
          disabled={loading}
        />

        <div className="flex items-start gap-2">
          <input
            type="checkbox"
            name="terms"
            checked={safeFormData.terms || false} // ADD DEFAULT VALUE
            onChange={handleInputChange}
            disabled={loading}
            className="mt-1 rounded text-emerald-600 focus:ring-emerald-500"
          />
          <label className="text-sm text-gray-700">
            I agree to the{' '}
            <a href="/terms" className="text-emerald-600 hover:text-emerald-700 font-medium">
              Terms of Service
            </a>{ ' '}
            and{' '}
            <a href="/privacy" className="text-emerald-600 hover:text-emerald-700 font-medium">
              Privacy Policy
            </a>
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-4 cursor-pointer bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl font-bold hover:from-emerald-600 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Submitting request...
            </>
          ) : (
            'Request Access'
          )}
        </button>

        <div className="text-center pt-4">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-bold text-emerald-600 hover:text-emerald-700">
              Sign in here
            </Link>
          </p>
        </div>
      </form>
    </>
  );
};