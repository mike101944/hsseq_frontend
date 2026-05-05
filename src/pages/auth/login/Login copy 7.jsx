import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { login, clearAuthErrors } from '../../../redux/action/authActions';
import {
  Shield,
  Eye,
  EyeOff,
  Mail,
  Lock,
  Briefcase,
  CheckCircle,
  XCircle,
  AlertCircle,
  Users,
  BarChart3,
  Target,
  Award,
  FileCheck,
  Zap,
  Globe,
  Building
} from 'lucide-react';

// Standalone InputField component
const InputField = ({ 
  icon: Icon, 
  label, 
  type = 'text', 
  name, 
  value, 
  onChange, 
  error, 
  placeholder,
  disabled = false,
  showPasswordToggle = false,
  onTogglePassword 
}) => (
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
        disabled={disabled}
        className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 outline-none transition-all ${
          error ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      />
      {showPasswordToggle && (
        <button
          type="button"
          onClick={onTogglePassword}
          disabled={disabled}
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
        >
          {type === 'text' ? (
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

const Login = ({ login, error, loading, clearAuthErrors, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';

  // Use useEffect for navigation
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors({});
    clearAuthErrors();

    // Validation
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    
    if (Object.keys(newErrors).length > 0) {
      setFormErrors(newErrors);
      return;
    }

    try {
      await login(formData.email, formData.password);
      // Navigation will happen in the useEffect above
    } catch (error) {
      console.log('Login failed');
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error for this field when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Don't show anything if authenticated (will redirect)
  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Side - Brand/Content Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-emerald-900 to-emerald-800 text-white p-12 flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-12">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
              <Shield size={28} className="text-emerald-200" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">HSSEQ</h1>
              <p className="text-emerald-200 text-sm">Management System</p>
            </div>
          </div>

          <div className="max-w-lg flex flex-col justify-between h-full">
            <div className='w-full flex flex-col items-center justify-center'>
                <h2 className="text-4xl font-bold  leading-tight text-emerald-200">
                Transforming 
                </h2>
                <h2 className='text-emerald-200 text-2xl font-bold  leading-tight'> Your Health, Safety, Security & Environment</h2>
            

             </div>
            

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-6 mb">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-white/10 rounded-lg">
                  <Target size={20} className="text-emerald-300" />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Journey Management</h4>
                  <p className="text-emerald-200 text-sm">Create & Manage Journey</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-white/10 rounded-lg">
                  <FileCheck size={20} className="text-emerald-300" />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Compliance</h4>
                  <p className="text-emerald-200 text-sm">Stay regulatory compliant</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-white/10 rounded-lg">
                  <BarChart3 size={20} className="text-emerald-300" />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Real-time Analytics</h4>
                  <p className="text-emerald-200 text-sm">Data-driven insights</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-white/10 rounded-lg">
                  <Users size={20} className="text-emerald-300" />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Team Collaboration</h4>
                  <p className="text-emerald-200 text-sm">Seamless teamwork</p>
                </div>
              </div>
            </div>

           
          </div>
        </div>

        {/* Bottom Branding */}
        <div className="border-t border-emerald-700/50 pt-3">
          <div className="flex items-center justify-between">
            <div className="text-emerald-200 text-sm">
              © 2024 HSSEQ Platform. All rights reserved. By Nafiked Themes
            </div>
            <div className="flex items-center gap-6">
              <Globe size={18} className="text-emerald-300 hover:text-white cursor-pointer" />
              <Building size={18} className="text-emerald-300 hover:text-white cursor-pointer" />
              <Award size={18} className="text-emerald-300 hover:text-white cursor-pointer" />
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center mb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-emerald-100 rounded-xl">
                <Shield size={28} className="text-emerald-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">HSSEQ</h1>
                <p className="text-gray-600 text-sm">Management System</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl lg:shadow-none lg:border-none border border-gray-100 shadow-lg p-8">
            <div className="mb-8">
             
              <p className="text-gray-600">
                Sign in to continue to your HSSEQ dashboard
              </p>
            </div>

            {/* Error Messages */}
            

          

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
                <a href="/forgot-password" className="text-sm font-medium text-emerald-600 hover:text-emerald-700">
                  Forgot password?
                </a>
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
                  <>
                    Sign In
                    {/* <Briefcase size={18} /> */}
                  </>
                )}
              </button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">continue with</span>
                </div>
              </div>

              {/* Alternative Login Options */}
             

              <div className="text-center pt-4">
                <p className="text-sm text-gray-600">
                  Don't have an account?{' '}
                  <a href="/register" className="font-bold text-emerald-600 hover:text-emerald-700">
                    Request access
                  </a>
                </p>
              </div>
            </form>

          
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  error: state.auth.error,
  loading: state.auth.loading,
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = {
  login,
  clearAuthErrors,
};

const ConnectedLogin = connect(mapStateToProps, mapDispatchToProps)(Login);
export default ConnectedLogin;
export { ConnectedLogin as Login };