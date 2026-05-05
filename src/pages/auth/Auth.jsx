// Auth.jsx
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { login, clearAuthErrors } from  '../../redux/action/authActions';
import { LoginForm } from './login/LoginForm';
import { RegisterForm } from './register/RegisterForm';
import { Shield, Target, FileCheck, BarChart3, Users, Globe, Building, Award } from 'lucide-react';

const Auth = ({ login, error, loading, clearAuthErrors, isAuthenticated }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isRegisterPage = location.pathname === '/register';
  const from = location.state?.from?.pathname || '/dashboard';

  // State ya Login
  const [loginFormData, setLoginFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [currentStep, setCurrentStep] = useState(1);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // State ya Register
  const [registerFormData, setRegisterFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    password: '',
    confirmPassword: '',
    terms: false
  });

  // Navigation effect
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  // Login handlers
  const handleLoginInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLoginFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
// Step navigation handlers
const handleNextStep = () => {
    // Validate step 1
    const newErrors = {};
    if (!registerFormData.firstName) newErrors.firstName = 'First name is required';
    if (!registerFormData.lastName) newErrors.lastName = 'Last name is required';
    if (!registerFormData.email) newErrors.email = 'Email is required';
    if (!registerFormData.company) newErrors.company = 'Company is required';
    
    if (Object.keys(newErrors).length > 0) {
      setFormErrors(newErrors);
      return;
    }
    
    setCurrentStep(2);
  };
  
  const handlePrevStep = () => {
    setCurrentStep(1);
  };
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setFormErrors({});
    clearAuthErrors();

    // Validation
    const newErrors = {};
    if (!loginFormData.email) newErrors.email = 'Email is required';
    if (!loginFormData.password) newErrors.password = 'Password is required';
    
    if (Object.keys(newErrors).length > 0) {
      setFormErrors(newErrors);
      return;
    }

    try {
      await login(loginFormData.email, loginFormData.password);
    } catch (error) {
      console.log('Login failed');
    }
  };

  // Register handlers
  const handleRegisterInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRegisterFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    
    // Validation ya register
    const newErrors = {};
    if (!registerFormData.firstName) newErrors.firstName = 'First name is required';
    if (!registerFormData.lastName) newErrors.lastName = 'Last name is required';
    if (!registerFormData.email) newErrors.email = 'Email is required';
    if (!registerFormData.password) newErrors.password = 'Password is required';
    if (registerFormData.password !== registerFormData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!registerFormData.terms) newErrors.terms = 'You must accept the terms';
    
    if (Object.keys(newErrors).length > 0) {
      // Handle validation errors
      console.log('Validation errors:', newErrors);
      return;
    }

    try {
      // Hapa utatumia register API yako
      console.log('Register data:', registerFormData);
      alert('Registration request submitted!');
      // Unaweza kuredirect kwa login page
      navigate('/login');
    } catch (error) {
      console.log('Registration failed');
    }
  };

  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Side - Brand/Content Section */}
       <div className="hidden rounded-tr-full 
          shadow-[25px_0_70px_-12px_rgba(110,231,183,0.5)]
          transition-all duration-300 ease-in-out
        drop-shadow-amber-700 drop-shadow-3xl lg:flex lg:w-1/2 bg-gradient-to-br from-emerald-900 to-emerald-800 text-white p-12 flex-col justify-between">
           
                <div className="flex items-center gap-3 mb-12">
                  <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                    <Shield size={28} className="text-emerald-200" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold">HSSEQ</h1>
                    <p className="text-emerald-200 text-sm">Management System</p>
                  </div>
                </div>
      
                <div className="max-w-lg flex flex-col mb-12 ">
                  <div className='w-full flex flex-col items-center justify-center mb-16'>
                      <h2 className="text-4xl font-bold  leading-tight text-emerald-200 mb-6">
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
              
      
              {/* Bottom Branding */}
              <div className="border-t border-emerald-700/50 pt-3">
                <div className="flex items-center justify-between">
                  <div className="text-emerald-200 text-sm">
                    © 2024 HSSEQ Platform. All rights reserved. By Nafikhed Themes
                  </div>
                  <div className="flex items-center gap-6">
                    <Globe size={18} className="text-emerald-300 hover:text-white cursor-pointer" />
                    <Building size={18} className="text-emerald-300 hover:text-white cursor-pointer" />
                    <Award size={18} className="text-emerald-300 hover:text-white cursor-pointer" />
                  </div>
                </div>
              </div>
            </div>

      {/* Right Side - Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 rounded-tl-3xl">
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
            {/* Conditional rendering based on route */}
            {isRegisterPage ? (
              <RegisterForm
              formData={registerFormData}
              showPassword={showPassword}
              showConfirmPassword={showConfirmPassword}
              formErrors={formErrors}
              loading={loading}
              error={error}
              handleSubmit={handleRegisterSubmit}
              handleInputChange={handleRegisterInputChange}
              setShowPassword={setShowPassword}
              setShowConfirmPassword={setShowConfirmPassword}
              currentStep={currentStep}
              handleNextStep={handleNextStep}
              handlePrevStep={handlePrevStep}
            />
            ) : (
              <LoginForm
                formData={loginFormData}
                showPassword={showPassword}
                formErrors={formErrors}
                loading={loading}
                error={error}
                handleSubmit={handleLoginSubmit}
                handleInputChange={handleLoginInputChange}
                setShowPassword={setShowPassword}
              />
            )}
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

const ConnectedAuth = connect(mapStateToProps, mapDispatchToProps)(Auth);
export default ConnectedAuth;
export { ConnectedAuth as Auth };