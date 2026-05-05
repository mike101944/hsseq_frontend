// LoginForm.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock,XCircle } from 'lucide-react';
import {InputField} from '../../../components/inputFields/InputField';

export const LoginForm = ({ 
  formData, 
  showPassword, 
  formErrors, 
  loading, 
  error,
  handleSubmit,
  handleInputChange,
  setShowPassword 
}) => {
  return (
    <>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h2>
        <p className="text-gray-600">Sign in to continue to your HSSEQ dashboard</p>
      </div>

   

      <form onSubmit={handleSubmit} className="space-y-6">
        <InputField
          icon={Mail}
          label="Email Address"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          error={formErrors.email}
          placeholder="you@company.com"
          disabled={loading}
        />

        <InputField
          icon={Lock}
          label="Password"
          type={showPassword ? 'text' : 'password'}
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          error={formErrors.password}
          placeholder="••••••••"
          disabled={loading}
          showPasswordToggle={true}
          onTogglePassword={() => setShowPassword(!showPassword)}
        />

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleInputChange}
              disabled={loading}
              className="rounded text-emerald-600 focus:ring-emerald-500"
            />
            <span className="text-sm text-gray-700">Remember me</span>
          </label>
          <Link to="/forgot-password" className="text-sm font-medium text-emerald-600 hover:text-emerald-700">
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-4 cursor-pointer bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl font-bold hover:from-emerald-600 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Signing in...
            </>
          ) : (
            'Sign In'
          )}
        </button>

        <div className="text-center pt-4">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="font-bold text-emerald-600 hover:text-emerald-700">
              Create Account
            </Link>
          </p>
        </div>
      </form>
    </>
  );
};

