import React, { useState } from 'react';
import { useAuth, UserRole } from '../../contexts/AuthContext';
import { Application } from '../../lib/supabase';
import { FileText, CheckCircle, XCircle, Eye, Send } from 'lucide-react';

interface ApprovalDashboardProps {
  role: string;
}

export function ApprovalDashboard({ role }: ApprovalDashboardProps) {
  const { user, updateApplicationStatus, getApplicationsForRole, getDocuments } = useAuth();
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [notes, setNotes] = useState('');
  const [showModal, setShowModal] = useState(false);

  const roleApplications = getApplicationsForRole(user!.role as UserRole);

  const handleApprove = async (app: Application) => {
    try {
      if (user?.role === 'collector') {
        await updateApplicationStatus(app.id, 'payment-ready', notes);
        alert('Application approved! Payment authorization sent to Tehsildar.');
      } else {
        await updateApplicationStatus(app.id, 'approved', notes);
        const nextRole = getNextRole(user.role);
        alert(`Application approved and forwarded to ${nextRole?.replace('-', ' ').toUpperCase()}!`);
      }
      setNotes('');
      setShowModal(false);
      setSelectedApp(null);
    } catch (error) {
      console.error('Error approving application:', error);
      alert('Error approving application. Please try again.');
    }
  };

  const handleReject = async (app: Application) => {
    try {
      await updateApplicationStatus(app.id, 'rejected', notes);
      alert('Application has been rejected.');
      setNotes('');
      setShowModal(false);
      setSelectedApp(null);
    } catch (error) {
      console.error('Error rejecting application:', error);
      alert('Error rejecting application. Please try again.');
    }
  };

  const getNextRole = (currentRole: string) => {
    const roleHierarchy = ['sdm', 'rahat-operator', 'oic', 'adg', 'collector'];
    const currentIndex = roleHierarchy.indexOf(currentRole);
    return currentIndex < roleHierarchy.length - 1 ? roleHierarchy[currentIndex + 1] : null;
  };

  const openModal = (app: Application) => {
    setSelectedApp(app);
    setShowModal(true);
    setNotes('');
  };

  const getRoleTitle = (role: string) => {
    switch (role) {
      case 'sdm': return 'Sub Divisional Magistrate';
      case 'rahat-operator': return 'Rahat Operator';
      case 'oic': return 'Officer In-Charge';
      case 'adg': return 'Additional District Collector';
      case 'collector': return 'District Collector';
      default: return role.toUpperCase();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">{getRoleTitle(role)} Dashboard</h1>
      </div>

      {/* Statistics Cards */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Review</p>
              <p className="text-2xl font-bold text-orange-600">{roleApplications.length}</p>
            </div>
            <FileText className="text-orange-600" size={32} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Processed</p>
              <p className="text-2xl font-bold text-blue-600">0</p>
            </div>
            <CheckCircle className="text-blue-600" size={32} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Approved</p>
              <p className="text-2xl font-bold text-green-600">0</p>
            </div>
            <CheckCircle className="text-green-600" size={32} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Rejected</p>
              <p className="text-2xl font-bold text-red-600">0</p>
            </div>
            <XCircle className="text-red-600" size={32} />
          </div>
        </div>
      </div>

      {/* Applications for Review */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Applications for Review</h2>
        
        {roleApplications.length === 0 ? (
          <p className="text-gray-600 text-center py-8">No applications pending review at your level.</p>
        ) : (
          <div className="space-y-4">
            {roleApplications.map((app) => {
              const appDocuments = getDocuments(app.id);
              const findingReport = appDocuments.find(doc => doc.document_type === 'finding-report');
              const postMortemReport = appDocuments.find(doc => doc.document_type === 'post-mortem-report');

              return (
                <div key={app.id} className="border border-gray-200 rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">{app.applicantName}</h3>
                    <div className="grid md:grid-cols-2 gap-4 mt-2 text-sm text-gray-600">
                      <p><strong>Age:</strong> {app.age}</p>
                      <p><strong>Sex:</strong> {app.sex}</p>
                      <p><strong>Date of Birth:</strong> {new Date(app.dateOfBirth).toLocaleDateString()}</p>
                      <p><strong>Date of Death:</strong> {new Date(app.dateOfDeath).toLocaleDateString()}</p>
                      <p><strong>Location:</strong> {app.location}</p>
                      <p><strong>Submitted:</strong> {app.submitted_at ? new Date(app.submitted_at).toLocaleDateString() : 'N/A'}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      app.status === 'pending' ? 'bg-orange-100 text-orange-800' :
                      app.status === 'under-review' ? 'bg-blue-100 text-blue-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {app.status.replace('-', ' ').toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-600"><strong>Address:</strong> {app.residential_address}</p>
                  <p className="text-sm text-gray-600 mt-1"><strong>Family Details:</strong> {app.family_details}</p>
                </div>

                {/* Document Information */}
                <div className="mb-4 bg-gray-50 p-3 rounded-lg">
                  <h4 className="font-medium text-gray-800 mb-2">Uploaded Documents</h4>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Finding Report: </span>
                      <span className={findingReport ? 'text-green-600' : 'text-red-600'}>
                        {findingReport ? '✓ Uploaded' : '✗ Not uploaded'}
                      </span>
                      {findingReport && (
                        <p className="text-xs text-gray-500">{findingReport.file_name}</p>
                      )}
                    </div>
                    <div>
                      <span className="text-gray-600">Post-Mortem Report: </span>
                      <span className={postMortemReport ? 'text-green-600' : 'text-red-600'}>
                        {postMortemReport ? '✓ Uploaded' : '✗ Not uploaded'}
                      </span>
                      {postMortemReport && (
                        <p className="text-xs text-gray-500">{postMortemReport.file_name}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-600">
                      ✓ Patwari: {app.patwari_checked ? 'Verified' : 'Pending'}
                    </span>
                    <span className="text-sm text-gray-600">
                      ✓ Thana In-charge: {app.thana_incharge_checked ? 'Verified' : 'Pending'}
                    </span>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => openModal(app)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                    >
                      <Eye className="mr-2" size={16} />
                      Review
                    </button>
                  </div>
                </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Review Modal */}
      {showModal && selectedApp && (
        (() => {
          const appDocuments = getDocuments(selectedApp.id);
          const findingReport = appDocuments.find(doc => doc.document_type === 'finding-report');
          const postMortemReport = appDocuments.find(doc => doc.document_type === 'post-mortem-report');

          return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Review Application - {selectedApp.applicant_name}
            </h2>
            
            <div className="space-y-4 mb-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <p className="text-gray-900">{selectedApp.applicant_name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Age</label>
                  <p className="text-gray-900">{selectedApp.age}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Date of Death</label>
                  <p className="text-gray-900">{new Date(selectedApp.date_of_death).toLocaleDateString()}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Location</label>
                  <p className="text-gray-900">{selectedApp.location}</p>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <p className="text-gray-900">{selectedApp.residential_address}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Family Details</label>
                <p className="text-gray-900">{selectedApp.family_details}</p>
              </div>

              {/* Documents Section */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-800 mb-3">Uploaded Documents</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Finding Report</label>
                    {findingReport ? (
                      <div className="flex items-center space-x-2">
                        <span className="text-green-600">✓</span>
                        <span className="text-sm text-gray-700">{findingReport.file_name}</span>
                        <button className="text-blue-600 text-sm hover:underline">View</button>
                      </div>
                    ) : (
                      <span className="text-red-600 text-sm">Not uploaded</span>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Post-Mortem Report</label>
                    {postMortemReport ? (
                      <div className="flex items-center space-x-2">
                        <span className="text-green-600">✓</span>
                        <span className="text-sm text-gray-700">{postMortemReport.file_name}</span>
                        <button className="text-blue-600 text-sm hover:underline">View</button>
                      </div>
                    ) : (
                      <span className="text-red-600 text-sm">Not uploaded</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-800 mb-2">Previous Approvals</h3>
                <div className="space-y-2">
                  <p className="text-gray-600">No previous approvals</p>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {user?.role === 'collector' ? 'Payment Authorization Notes' : 'Review Notes'} (Optional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Add your review comments..."
              />
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => handleApprove(selectedApp)}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center"
              >
                <CheckCircle className="mr-2" size={20} />
                {user?.role === 'collector' ? 'Proceed for Payment Approval' : 'Approve & Forward'}
              </button>
              <button
                onClick={() => handleReject(selectedApp)}
                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center"
              >
                <XCircle className="mr-2" size={20} />
                Reject
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
          );
        })()
      )}
    </div>
  );
}