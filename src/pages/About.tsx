import React from 'react';
import { Shield, Target, Users, Award } from 'lucide-react';

export function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-blue-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About Project Rahat
            </h1>
            <p className="text-xl text-blue-100">
              A comprehensive digital initiative by the Collector of Raipur, Chhattisgarh,
              designed to streamline relief management under RBC4 policy guidelines.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">What is Project Rahat?</h2>
              <div className="prose prose-lg text-gray-700">
                <p className="mb-4">
                  Project Rahat is a citizen-relief portal specifically designed for death compensation
                  management under the RBC4 (Revenue Book Circular 4) guidelines. This digital initiative
                  was developed by the Collector's Office in Raipur, Chhattisgarh, to bring transparency,
                  efficiency, and accountability to the relief distribution process.
                </p>
                <p className="mb-4">
                  The platform empowers local officials at various administrative levels to process cases,
                  verify essential documents, and approve relief applications through a structured,
                  multi-level approval system. This ensures that every application receives proper
                  scrutiny while maintaining the speed and efficiency required for relief distribution.
                </p>
                <p>
                  By digitizing the entire process, Project Rahat eliminates paperwork delays,
                  reduces bureaucratic hurdles, and provides real-time tracking of application
                  status for both officials and beneficiaries.
                </p>
              </div>
            </div>

            {/* Key Objectives */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  <Target className="text-blue-800 mr-3" size={24} />
                  <h3 className="text-xl font-semibold text-gray-800">Our Mission</h3>
                </div>
                <p className="text-gray-700">
                  To provide a transparent, efficient, and accessible platform for processing
                  death compensation claims, ensuring timely relief distribution to affected families
                  while maintaining administrative accountability.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  <Shield className="text-green-600 mr-3" size={24} />
                  <h3 className="text-xl font-semibold text-gray-800">Our Vision</h3>
                </div>
                <p className="text-gray-700">
                  To become the benchmark for digital governance in relief management,
                  setting new standards for transparency and efficiency in government
                  service delivery across Chhattisgarh.
                </p>
              </div>
            </div>

            {/* System Features */}
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">System Features</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-1">
                    <span className="text-blue-800 font-semibold text-sm">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Role-Based Access Control</h4>
                    <p className="text-gray-600">Secure login system with designated dashboards for Tehsildar, SDM, Rahat Shucks, OIC, ADG, and Collector.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-1">
                    <span className="text-green-800 font-semibold text-sm">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Document Management</h4>
                    <p className="text-gray-600">Secure upload and verification of finding reports, post-mortem reports, and other essential documents.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3 mt-1">
                    <span className="text-orange-800 font-semibold text-sm">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Multi-Level Approval</h4>
                    <p className="text-gray-600">Structured workflow ensuring proper verification at each administrative level before final approval.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3 mt-1">
                    <span className="text-purple-800 font-semibold text-sm">4</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Real-Time Tracking</h4>
                    <p className="text-gray-600">Live status updates and transparent tracking of application progress from submission to payment approval.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Administrative Hierarchy */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Administrative Workflow</h2>
              <div className="space-y-4">
                <div className="flex items-center p-4 bg-blue-50 rounded-lg">
                  <div className="w-10 h-10 bg-blue-800 text-white rounded-full flex items-center justify-center font-semibold mr-4">1</div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Tehsildar</h4>
                    <p className="text-gray-600">Initial application entry, document upload, and basic verification</p>
                  </div>
                </div>
                
                <div className="flex items-center p-4 bg-green-50 rounded-lg">
                  <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-semibold mr-4">2</div>
                  <div>
                    <h4 className="font-semibold text-gray-800">SDM → Rahat Shucks → OIC → ADG</h4>
                    <p className="text-gray-600">Sequential review, verification, and approval by senior officials</p>
                  </div>
                </div>
                
                <div className="flex items-center p-4 bg-orange-50 rounded-lg">
                  <div className="w-10 h-10 bg-orange-600 text-white rounded-full flex items-center justify-center font-semibold mr-4">3</div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Collector</h4>
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