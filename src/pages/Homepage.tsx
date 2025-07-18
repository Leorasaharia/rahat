import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Users, FileCheck, ArrowRight } from 'lucide-react';

export function Homepage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-blue-800 to-blue-900 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Project Rahat
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Empowering local officials to process death compensation cases
              under RBC4 guidelines with transparency and efficiency
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/about"
                className="bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors flex items-center justify-center"
              >
                Learn More
                <ArrowRight className="ml-2" size={20} />
              </Link>
              <Link
                to="/login"
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-800 transition-colors"
              >
                Officer Login
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Key Features
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Streamlined relief management system designed for government officials
              to efficiently process and approve death compensation applications.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="text-blue-800" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Secure Authentication</h3>
              <p className="text-gray-600">
                Role-based access control ensuring only authorized officials
                can access and process applications at their designated level.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileCheck className="text-green-800" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Document Management</h3>
              <p className="text-gray-600">
                Upload and verify essential documents including finding reports
                and post-mortem reports with secure file handling.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-orange-800" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Multi-level Approval</h3>
              <p className="text-gray-600">
                Structured workflow from Tehsildar to Collector ensuring
                proper verification and approval at each administrative level.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="bg-blue-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Making a Difference
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-800 mb-2">500+</div>
              <div className="text-gray-600">Applications Processed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">6</div>
              <div className="text-gray-600">Officer Levels</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">24/7</div>
              <div className="text-gray-600">System Availability</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">100%</div>
              <div className="text-gray-600">Digital Process</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Access your dashboard and begin processing relief applications
            with our secure and efficient platform.
          </p>
          <Link
            to="/login"
            className="bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors inline-flex items-center"
          >
            Access Dashboard
            <ArrowRight className="ml-2" size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}