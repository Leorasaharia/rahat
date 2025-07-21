import React from 'react';
import { Shield, Target, Users, Award, Globe, FileCheck } from 'lucide-react';

export function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 via-blue-600 to-purple-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center space-x-4 mb-8">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                <span className="text-green-600 font-bold text-2xl">CG</span>
              </div>
              <div className="text-left">
                <h1 className="text-4xl md:text-5xl font-bold">
                  About Project Rahat
                </h1>
                <p className="text-green-100 text-lg">Government of Chhattisgarh</p>
              </div>
            </div>
            <p className="text-xl text-green-100 leading-relaxed">
              A comprehensive digital initiative by the Collector of Raipur, Chhattisgarh,
              designed to streamline relief management under RBC4 policy guidelines.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-10 mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-8">What is Project Rahat?</h2>
              <div className="prose prose-lg text-gray-700 leading-relaxed">
                <p className="mb-6 text-lg">
                  Project Rahat is a citizen-relief portal specifically designed for death compensation
                  management under the RBC4 (Revenue Book Circular 4) guidelines. This digital initiative
                  was developed by the Collector's Office in Raipur, Chhattisgarh, to bring transparency,
                  efficiency, and accountability to the relief distribution process.
                </p>
                <p className="mb-6 text-lg">
                  The platform empowers local officials at various administrative levels to process cases,
                  verify essential documents, and approve relief applications through a structured,
                  multi-level approval system. This ensures that every application receives proper
                  scrutiny while maintaining the speed and efficiency required for relief distribution.
                </p>
                <p className="text-lg">
                  By digitizing the entire process, Project Rahat eliminates paperwork delays,
                  reduces bureaucratic hurdles, and provides real-time tracking of application
                  status for both officials and beneficiaries.
                </p>
              </div>
            </div>

            {/* Key Objectives */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <div className="bg-white rounded-2xl shadow-lg p-8 border-t-4 border-blue-500">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mr-4">
                    <Target className="text-white" size={24} />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-800">Our Mission</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  To provide a transparent, efficient, and accessible platform for processing
                  death compensation claims, ensuring timely relief distribution to affected families
                  while maintaining administrative accountability.
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-8 border-t-4 border-green-500">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mr-4">
                    <Shield className="text-white" size={24} />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-800">Our Vision</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  To become the benchmark for digital governance in relief management,
                  setting new standards for transparency and efficiency in government
                  service delivery across Chhattisgarh.
                </p>
              </div>
            </div>

            {/* System Features */}
            <div className="bg-white rounded-2xl shadow-lg p-10 mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-10">System Features</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-white font-semibold">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3 text-lg">Role-Based Access Control</h4>
                    <p className="text-gray-600 leading-relaxed">Secure login system with designated dashboards for Tehsildar, SDM, Rahat Operator, OIC, ADG, and Collector.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-white font-semibold">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3 text-lg">Document Management</h4>
                    <p className="text-gray-600 leading-relaxed">Secure upload and verification of finding reports, post-mortem reports, and other essential documents.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-white font-semibold">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3 text-lg">Multi-Level Approval</h4>
                    <p className="text-gray-600 leading-relaxed">Structured workflow ensuring proper verification at each administrative level before final approval.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-white font-semibold">4</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3 text-lg">Real-Time Tracking</h4>
                    <p className="text-gray-600 leading-relaxed">Live status updates and transparent tracking of application progress from submission to payment approval.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Administrative Hierarchy */}
            <div className="bg-white rounded-2xl shadow-lg p-10">
              <h2 className="text-4xl font-bold text-gray-800 mb-10">Administrative Workflow</h2>
              <div className="space-y-6">
                <div className="flex items-center p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border-l-4 border-blue-500">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-full flex items-center justify-center font-semibold mr-6">1</div>
                  <div>
                    <h4 className="font-semibold text-gray-800 text-lg">Tehsildar</h4>
                    <p className="text-gray-600">Initial application entry, document upload, and basic verification</p>
                  </div>
                </div>
                
                <div className="flex items-center p-6 bg-gradient-to-r from-green-50 to-green-100 rounded-xl border-l-4 border-green-500">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 text-white rounded-full flex items-center justify-center font-semibold mr-6">2</div>
                  <div>
                    <h4 className="font-semibold text-gray-800 text-lg">SDM → Rahat Operator → OIC → ADG</h4>
                    <p className="text-gray-600">Sequential review, verification, and approval by senior officials</p>
                  </div>
                </div>
                
                <div className="flex items-center p-6 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border-l-4 border-orange-500">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-full flex items-center justify-center font-semibold mr-6">3</div>
                  <div>
                    <h4 className="font-semibold text-gray-800 text-lg">Collector</h4>
                    <p className="text-gray-600">Final approval and payment authorization</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}