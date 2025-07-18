import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { TehsildarDashboard } from '../components/dashboards/TehsildarDashboard';
import { ApprovalDashboard } from '../components/dashboards/ApprovalDashboard';

export function Dashboard() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Access Denied</h2>
          <p className="text-gray-600">Please log in to access your dashboard.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {user.role === 'tehsildar' ? (
          <TehsildarDashboard />
        ) : (
          <ApprovalDashboard role={user.role} />
        )}
      </div>
    </div>
  );
}