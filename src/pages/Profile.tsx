import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { User, Edit3, Save, X, Phone, Mail, Calendar, Building } from 'lucide-react';

export function Profile() {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    displayName: user?.displayName || user?.name || '',
    phone: user?.phone || '',
    department: user?.department || '',
    designation: user?.designation || '',
  });

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Access Denied</h2>
          <p className="text-gray-600">Please log in to access your profile.</p>
        </div>
      </div>
    );
  }

  const handleSave = () => {
    updateProfile(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      displayName: user?.displayName || user?.name || '',
      phone: user?.phone || '',
      department: user?.department || '',
      designation: user?.designation || '',
    });
    setIsEditing(false);
  };

  const getRoleTitle = (role: string) => {
    switch (role) {
      case 'tehsildar': return 'Tehsildar';
      case 'sdm': return 'Sub Divisional Magistrate';
      case 'rahat-shucks': return 'Rahat Operator';
      case 'oic': return 'Officer In-Charge';
      case 'adg': return 'Additional District Collector';
      case 'collector': return 'District Collector';
      default: return role.toUpperCase();
    }
  };

  const getDefaultDepartment = (role: string) => {
    switch (role) {
      case 'tehsildar': return 'Revenue Department';
      case 'sdm': return 'District Administration';
      case 'rahat operator': return 'Relief & Rehabilitation';
      case 'oic': return 'Administrative Services';
      case 'adg': return 'District Collectorate';
      case 'collector': return 'District Collectorate';
      default: return 'Government of Chhattisgarh';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-blue-800 to-blue-900 px-8 py-12">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                  <User className="text-blue-800" size={48} />
                </div>
                <div className="text-white">
                  <h1 className="text-3xl font-bold">
                    {user.displayName || user.name}
                  </h1>
                  <p className="text-blue-200 text-lg">{getRoleTitle(user.role)}</p>
                  <p className="text-blue-300 text-sm">
                    {user.department || getDefaultDepartment(user.role)}
                  </p>
                </div>
              </div>
              
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-white text-blue-800 px-6 py-2 rounded-lg hover:bg-blue-50 transition-colors flex items-center"
                >
                  <Edit3 className="mr-2" size={20} />
                  Edit Profile
                </button>
              ) : (
                <div className="flex space-x-2">
                  <button
                    onClick={handleSave}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center"
                  >
                    <Save className="mr-2" size={18} />
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center"
                  >
                    <X className="mr-2" size={18} />
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Profile Content */}
          <div className="p-8">
            {!user.profileComplete && !isEditing && (
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                    <Edit3 className="text-orange-600" size={16} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-orange-800">Complete Your Profile</h3>
                    <p className="text-orange-700 text-sm">
                      Please update your profile information to personalize your experience.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-8">
              {/* Personal Information */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800 border-b border-gray-200 pb-2">
                  Personal Information
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Display Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.displayName}
                        onChange={(e) => setFormData(prev => ({ ...prev, displayName: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your full name"
                      />
                    ) : (
                      <div className="flex items-center space-x-2">
                        <User className="text-gray-400" size={18} />
                        <span className="text-gray-900">
                          {user.displayName || user.name}
                        </span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your phone number"
                      />
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Phone className="text-gray-400" size={18} />
                        <span className="text-gray-900">
                          {user.phone || 'Not provided'}
                        </span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="flex items-center space-x-2">
                      <Mail className="text-gray-400" size={18} />
                      <span className="text-gray-900">{user.email}</span>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        Official
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Official Information */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800 border-b border-gray-200 pb-2">
                  Official Information
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Role
                    </label>
                    <div className="flex items-center space-x-2">
                      <Building className="text-gray-400" size={18} />
                      <span className="text-gray-900">{getRoleTitle(user.role)}</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Department
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.department}
                        onChange={(e) => setFormData(prev => ({ ...prev, department: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your department"
                      />
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Building className="text-gray-400" size={18} />
                        <span className="text-gray-900">
                          {user.department || getDefaultDepartment(user.role)}
                        </span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Designation
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.designation}
                        onChange={(e) => setFormData(prev => ({ ...prev, designation: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your designation"
                      />
                    ) : (
                      <div className="flex items-center space-x-2">
                        <User className="text-gray-400" size={18} />
                        <span className="text-gray-900">
                          {user.designation || getRoleTitle(user.role)}
                        </span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Join Date
                    </label>
                    <div className="flex items-center space-x-2">
                      <Calendar className="text-gray-400" size={18} />
                      <span className="text-gray-900">
                        {user.joinDate || 'Not specified'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Security Notice */}
            <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-800 mb-2">Security & Privacy</h3>
              <div className="text-blue-700 text-sm space-y-1">
                <p>• Your login credentials are securely encrypted and protected</p>
                <p>• Profile changes are logged for security purposes</p>
                <p>• Contact your system administrator for password changes</p>
                <p>• All data is handled according to government privacy guidelines</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}