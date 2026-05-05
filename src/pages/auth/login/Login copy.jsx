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
  FileText
} from 'lucide-react';

export const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Validation
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }
    
    // Simulate API call
    try {
      // Replace with actual API call
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });
      
      // const data = await response.json();
      
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API delay
      
      setLoginSuccess(true);
      // In real app: router.push('/dashboard')
      
      // Show success and redirect
      setTimeout(() => {
        alert('Login successful! Redirecting to dashboard...');
        // router.push('/dashboard');
      }, 500);
      
    } catch (error) {
      setErrors({ general: 'Invalid credentials. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const InputField = ({ icon: Icon, label, type = 'text', name, value, onChange, error, placeholder }) => (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>
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
          className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring focus:ring-emerald-500  outline-none transition-all ${
            error ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
          }`}
        />
        {name === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            {showPassword ? (
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50/30 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
   
        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Welcome Back
              </h2>
              <p className="text-gray-600">
                Sign in to your HSSEQ management account
              </p>
            </div>

            {loginSuccess && (
              <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
                <div className="flex items-center gap-3">
                  <CheckCircle size={20} className="text-emerald-600" />
                  <div>
                    <div className="font-medium text-emerald-800">Login successful!</div>
                    <div className="text-sm text-emerald-700">Redirecting to dashboard...</div>
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

            <form onSubmit={handleSubmit} className="space-y-6">
              <InputField
                icon={Mail}
                label="Email Address"
                type="email"
                name="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                error={errors.email}
                placeholder="you@company.com"
              />

              <InputField
                className="border-none focus:ring-0 focus:border-none"
                icon={Lock}
                label="Password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                error={errors.password}
                placeholder="••••••••"
              />

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={(e) => setFormData({...formData, rememberMe: e.target.checked})}
                    className="rounded text-emerald-600 focus:ring-emerald-500"
                  />
                  <span className="text-sm text-gray-700">Remember me</span>
                </label>
                <a href="/forgot-password" className="text-sm font-medium text-emerald-600 hover:text-emerald-700">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 cursor-pointer px-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl font-bold hover:from-emerald-600 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    {/* <ArrowRight size={20} /> */}
                  </>
                )}
              </button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500"> continue with</span>
                </div>
              </div>

             

              <div className="text-center ">
                <p className="text-sm text-gray-600">
                  Don't have an account?{' '}
                  <a href="/register" className="font-bold text-emerald-600 hover:text-emerald-700">
                    Request access
                  </a>
                </p>
              </div>
            </form>
          </div>

          {/* Feature Highlights */}
          <div className="bg-gradient-to-r from-gray-50 to-emerald-50/50 px-8 py-6 border-t border-gray-100">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <Shield size={16} className="text-emerald-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">Secure Login</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Briefcase size={16} className="text-yellow-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">Role-Based Access</span>
              </div>
            </div>
          </div>
        </div>

     
      </div>
    </div>
  );
};