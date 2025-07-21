import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogIn, Mail, Lock, AlertCircle, User, Eye, EyeOff } from 'lucide-react';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        navigate('/dashboard');
      } else {
        setError('Invalid email address. Please use one of the demo emails provided below.');
      }
    } catch (err) {
      setError('An error occurred during login. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-600 via-blue-600 to-purple-700 flex items-center justify-center py-12 px-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 via-blue-500/20 to-purple-600/20"></div>
      
      <div className="relative z-10 w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Welcome Section */}
        <div className="text-white space-y-6">
          <div className="flex items-center space-x-4 mb-8">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
              <span className="text-green-600 font-bold text-lg">CG</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold">Project Rahat</h1>
              <p className="text-green-100">Government of Chhattisgarh</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-4xl font-bold leading-tight">
              Chhattisgarh<br />
              <span className="text-yellow-300">full of Surprises</span>
            </h2>
            <p className="text-xl text-green-100">
              Welcome to the official portal
            </p>
            <p className="text-green-200">
              Access government services, information, and resources
            </p>
          </div>

          {/* Quick Links */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mt-8">
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-green-100 hover:text-white cursor-pointer">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span>Chhattisgarh Government Portal</span>
              </div>
              <div className="flex items-center space-x-2 text-green-100 hover:text-white cursor-pointer">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Citizen Services</span>
              </div>
              <div className="flex items-center space-x-2 text-green-100 hover:text-white cursor-pointer">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span>Online Applications</span>
              </div>
              <div className="flex items-center space-x-2 text-green-100 hover:text-white cursor-pointer">
                <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                <span>RTI Portal</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 max-w-md mx-auto w-full">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="text-white" size={28} />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Secure Login Portal</h2>
            <p className="text-gray-600 mt-2">Government Officials & Citizens</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center mb-6">
              <AlertCircle className="text-red-600 mr-3" size={20} />
              <span className="text-red-700 text-sm">{error}</span>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Username / Email ID
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                  placeholder="Enter your username"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  Secure Login
                </>
              )}
            </button>

            <div className="text-center">
              <a href="#" className="text-sm text-blue-600 hover:text-blue-800">
                Forgot Password?
              </a>
              <p className="text-xs text-gray-500 mt-2">
                For technical support: 0771-2234567
              </p>
            </div>
          </form>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
            <h3 className="font-semibold text-blue-800 mb-2 text-sm">Demo Credentials</h3>
            <div className="text-xs text-blue-700 space-y-1">
              <p><strong>Email:</strong> Use any demo email from the list below</p>
              <p><strong>Password:</strong> Any password (cannot be empty)</p>
              <div className="mt-2 space-y-1 text-xs">
                <p>• tehsildar@raipur.gov.in</p>
                <p>• sdm@raipur.gov.in</p>
                <p>• rahat@raipur.gov.in</p>
                <p>• oic@raipur.gov.in</p>
                <p>• adg@raipur.gov.in</p>
                <p>• collector@raipur.gov.in</p>
              </div>
              <p className="text-xs text-blue-600 mt-2">
                Note: This is a demo system. You can use any password as long as it's not empty.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}