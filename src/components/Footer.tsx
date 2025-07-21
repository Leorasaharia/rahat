import React from 'react';

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-800 to-gray-900 text-white mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">CG</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">Project Rahat</h3>
                <p className="text-gray-300 text-sm">Government of Chhattisgarh</p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed">
              A citizen-relief portal for death compensation under RBC4 guidelines,
              developed by the Collector's Office, Raipur. Transforming government
              service delivery through digital innovation.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3 text-gray-300">
              <li><a href="/" className="hover:text-white transition-colors hover:underline">Home</a></li>
              <li><a href="/about" className="hover:text-white transition-colors hover:underline">About</a></li>
              <li><a href="/login" className="hover:text-white transition-colors hover:underline">Login</a></li>
              <li><a href="#" className="hover:text-white transition-colors hover:underline">Citizen Services</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Contact</h3>
            <div className="text-gray-300 space-y-3">
              <p className="font-medium">Collector's Office</p>
              <p>Raipur, Chhattisgarh</p>
              <p>Email: collector@raipur.gov.in</p>
              <p>Support: 0771-2234567</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; 2025 Government of Chhattisgarh. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
}