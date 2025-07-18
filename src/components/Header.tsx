import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LogOut, User, Home, Info, UserCircle } from 'lucide-react';

export function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white shadow-md border-b-4 border-orange-500">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo and Title */}
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-blue-800 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">CG</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-blue-800">Project Rahat</h1>
              <p className="text-sm text-gray-600">Government of Chhattisgarh</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className="flex items-center space-x-1 text-gray-700 hover:text-blue-800 transition-colors"
            >
              <Home size={18} />
              <span>Home</span>
            </Link>
            <Link 
              to="/about" 
              className="flex items-center space-x-1 text-gray-700 hover:text-blue-800 transition-colors"
            >
              <Info size={18} />
              <span>About</span>
            </Link>
            
            {user ? (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/profile" 
                  className="flex items-center space-x-1 text-gray-700 hover:text-blue-800 transition-colors"
                >
                  <UserCircle size={18} />
                  <span>Profile</span>
                </Link>
                <Link 
                  to="/dashboard" 
                  className="flex items-center space-x-2 bg-blue-800 text-white px-4 py-2 rounded-md hover:bg-blue-900 transition-colors"
                >
                  <User size={18} />
                  <span>{user.displayName || user.name}</span>
                </Link>
                <button 
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-gray-700 hover:text-red-600 transition-colors"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <Link 
                to="/login" 
                className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 transition-colors"
              >
                Login
              </Link>
            )}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            {user ? (
              <button 
                onClick={handleLogout}
                className="text-gray-700 hover:text-red-600"
              >
                <LogOut size={24} />
              </button>
            ) : (
              <Link 
                to="/login" 
                className="bg-orange-500 text-white px-4 py-2 rounded-md"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}