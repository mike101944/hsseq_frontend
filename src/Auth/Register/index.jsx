import React, { useState } from 'react';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../index";


export function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName :'',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    login();
    navigate("/");
  };

  const {login} = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    login();
    navigate("/dashboard");
  };

  return (
    <div className="
    fixed inset-0 flex items-center justify-center bg-opacity-50 z-[9999] transition-opacity duration-300 ease-in-out
    min-h-screen bg-gradient-to-t from-slate-100 to-slate-200  p-4">



   

        <div className="h-[100%] w-full max-w-md px-3 justify-center items-center flex flex-col">

              <h2 className="text-3xl font-bold text-center text-white mb-8 ">
                {isLogin ? 'Welcome Back' : 'Create Account'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {!isLogin && (
                  <>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                     placeholder="First Name"
                     className="w-full pl-12 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-sky-700"
                     value={formData.firstName}
                     onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                   />
                 </div>

                <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                 placeholder="Last Name"
                 className="w-full pl-12 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-sky-700"
                 value={formData.lastName}
                 onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                />
                </div>

                </>

               )}
  
              <div className="relative justify-center items-center">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full pl-12 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-sky-700"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
  
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full pl-12 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-sky-700"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>

              {isLogin && (
                <div className="text-right">
                  <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div>
              )}
  
                <button
                  type="submit"
                  className="w-full bg-indigo-400 text-white py-1 rounded-lg font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-300"
                >
                  <div className="flex items-center justify-center space-x-2">
                    <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                    {/* <ArrowRight size={20} /> */}
                  </div>
                </button>
              </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-sm font-medium text-gray-600 hover:text-indigo-500 transition-colors duration-300"
              >
                {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
              </button>
            </div>
            </div>

        



      
    </div>
  );
}