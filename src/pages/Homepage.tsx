import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Users, FileCheck, ArrowRight, Globe, Award, Clock } from 'lucide-react';

export function Homepage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <section className="bg-gradient-to-br from-green-600 via-blue-600 to-purple-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 via-blue-500/20 to-purple-600/20"></div>
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center space-x-4 mb-8">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                <span className="text-green-600 font-bold text-2xl">CG</span>
              </div>
              <div className="text-left">
                <h1 className="text-5xl md:text-6xl font-bold">
                  Project Rahat
                </h1>
                <p className="text-green-100 text-lg">Government of Chhattisgarh</p>
              </div>
            </div>
            
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Chhattisgarh <span className="text-yellow-300">full of Surprises</span>
              </h2>
              <p className="text-xl md:text-2xl mb-6 text-green-100">
                Empowering local officials to process death compensation cases
                under RBC4 guidelines with transparency and efficiency
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/about"
                className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-200 flex items-center justify-center shadow-lg"
              >
                Learn More
                <ArrowRight className="ml-2" size={20} />
              </Link>
              <Link
                to="/login"
                className="bg-white/20 backdrop-blur-sm border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-800 transition-all duration-200"
              >
                Officer Login
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              Key Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Streamlined relief management system designed for government officials
              to efficiently process and approve death compensation applications.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-center border-t-4 border-green-500">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="text-white" size={36} />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">Secure Authentication</h3>
              <p className="text-gray-600 leading-relaxed">
                Role-based access control ensuring only authorized officials
                can access and process applications at their designated level.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-center border-t-4 border-blue-500">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileCheck className="text-white" size={36} />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">Document Management</h3>
              <p className="text-gray-600 leading-relaxed">
                Upload and verify essential documents including finding reports
                and post-mortem reports with secure file handling.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-center border-t-4 border-purple-500">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="text-white" size={36} />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">Multi-level Approval</h3>
              <p className="text-gray-600 leading-relaxed">
                Structured workflow from Tehsildar to Collector ensuring
                proper verification and approval at each administrative level.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="bg-gradient-to-r from-green-50 to-blue-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              Making a Difference
            </h2>
            <p className="text-xl text-gray-600">
              Transforming government service delivery through digital innovation
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center bg-white p-8 rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileCheck className="text-white" size={28} />
              </div>
              <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-600 font-medium">Applications Processed</div>
            </div>
            <div className="text-center bg-white p-8 rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-white" size={28} />
              </div>
              <div className="text-4xl font-bold text-green-600 mb-2">6</div>
              <div className="text-gray-600 font-medium">Officer Levels</div>
            </div>
            <div className="text-center bg-white p-8 rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="text-white" size={28} />
              </div>
              <div className="text-4xl font-bold text-orange-600 mb-2">24/7</div>
              <div className="text-gray-600 font-medium">System Availability</div>
            </div>
            <div className="text-center bg-white p-8 rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="text-white" size={28} />
              </div>
              <div className="text-4xl font-bold text-purple-600 mb-2">100%</div>
              <div className="text-gray-600 font-medium">Digital Process</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-gray-800 to-gray-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-300 mb-10 leading-relaxed">
              Access your dashboard and begin processing relief applications
              with our secure and efficient platform designed for government officials.
            </p>
            <Link
              to="/login"
              className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-10 py-4 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-200 inline-flex items-center shadow-lg text-lg"
            >
              Access Dashboard
              <ArrowRight className="ml-3" size={24} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}