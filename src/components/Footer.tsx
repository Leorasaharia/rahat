import React from 'react';

export function Footer() {
  return (
    <footer className="bg-blue-800 text-white mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Project Rahat</h3>
            <p className="text-blue-200">
              A citizen-relief portal for death compensation under RBC4 guidelines,
              developed by the Collector's Office, Raipur.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-blue-200">
              <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="/about" className="hover:text-white transition-colors">About</a></li>
              <li><a href="/login" className="hover:text-white transition-colors">Login</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="text-blue-200 space-y-2">
              <p>Collector's Office</p>
              <p>Raipur, Chhattisgarh</p>
              <p>Email: collector@raipur.gov.in</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-blue-700 mt-8 pt-6 text-center text-blue-200">
          <p>&copy; 2025 Government of Chhattisgarh. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}