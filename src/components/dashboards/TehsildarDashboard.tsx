import React, { useState } from 'react';
import { useAuth, UserRole } from '../../contexts/AuthContext';
import { Upload, FileText, Send, Plus, CheckCircle } from 'lucide-react';
import { Application } from '../../lib/supabase';

export function TehsildarDashboard() {
  const { user, addApplication, submitApplication, updateApplicationStatus, getApplicationsForRole, uploadDocument } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [newApplicationId, setNewApplicationId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    applicantName: '',
    age: '',
    sex: 'male' as 'male' | 'female' | 'other',
    dateOfBirth: '',
    dateOfDeath: '',
    location: '',
    residentialAddress: '',
    familyDetails: '',
    patwariChecked: false,
    thanaInchargeChecked: false,
  });
  const [uploadedFiles, setUploadedFiles] = useState({
    'finding-report': null as File | null,
    'post-mortem-report': null as File | null,
  });

  const userApplications = getApplicationsForRole('tehsildar' as UserRole);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.patwariChecked || !formData.thanaInchargeChecked) {
      alert('Please ensure both Patwari and Thana In-charge verifications are completed.');
      return;
    }

    try {
      const applicationId = await addApplication({
        ...formData,
        age: parseInt(formData.age),
        status: 'draft',
        current_level: 'tehsildar',
        created_by: user?.id || '',
      });

      // Upload documents if they exist
      if (uploadedFiles['finding-report']) {
        await uploadDocument(applicationId, uploadedFiles['finding-report'], 'finding-report');
      }
      if (uploadedFiles['post-mortem-report']) {
        await uploadDocument(applicationId, uploadedFiles['post-mortem-report'], 'post-mortem-report');
      }

      setNewApplicationId(applicationId);
      setShowSuccessModal(true);

      // Reset form
      setFormData({
        applicantName: '',
        age: '',
        sex: 'male',
        dateOfBirth: '',
        dateOfDeath: '',
        location: '',
        residentialAddress: '',
        familyDetails: '',
        patwariChecked: false,
        thanaInchargeChecked: false,
      });
      setUploadedFiles({
        'finding-report': null,
        'post-mortem-report': null,
      });
      setShowForm(false);
    } catch (error) {
      console.error('Error creating application:', error);
      alert('Error creating application. Please try again.');
    }
  };

  const handleProceedFurther = async () => {
    if (newApplicationId) {
      try {
        await submitApplication(newApplicationId);
          applicant_name: formData.applicantName,
          age: parseInt(formData.age),
          sex: formData.sex,
          date_of_birth: formData.dateOfBirth,
          date_of_death: formData.dateOfDeath,
          location: formData.location,
          residential_address: formData.residentialAddress,
          family_details: formData.familyDetails,
          patwari_checked: formData.patwariChecked,
          thana_incharge_checked: formData.thanaInchargeChecked,
        alert('Application successfully submitted to SDM for review!');
      } catch (error) {
        console.error('Error submitting application:', error);
        alert('Error submitting application. Please try again.');
      }
    }
  };

  const handlePaymentApproval = async (appId: string) => {
    try {
      await updateApplicationStatus(appId, 'payment-approved', 'Payment processed and approved by Tehsildar');
      alert('Payment approval completed successfully!');
    } catch (error) {
      console.error('Error approving payment:', error);
      alert('Error approving payment. Please try again.');
    }
  };

  const handleFileUpload = (type: 'finding-report' | 'post-mortem-report') => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFiles(prev => ({ ...prev, [type]: file }));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Tehsildar Dashboard</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-800 text-white px-6 py-2 rounded-lg hover:bg-blue-900 transition-colors flex items-center"
        >
          <Plus className="mr-2" size={20} />
          New Application
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Applications</p>
              <p className="text-2xl font-bold text-gray-900">{userApplications.length}</p>
            </div>
            <FileText className="text-blue-600" size={32} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Draft</p>
              <p className="text-2xl font-bold text-orange-600">
                {userApplications.filter(app => app.status === 'draft').length}
              </p>
            </div>
            <Upload className="text-orange-600" size={32} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Submitted</p>
              <p className="text-2xl font-bold text-blue-600">
                {userApplications.filter(app => app.status === 'pending' || app.status === 'under-review').length}
              </p>
            </div>
            <Send className="text-blue-600" size={32} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Payment Ready</p>
              <p className="text-2xl font-bold text-green-600">
                {userApplications.filter(app => app.status === 'payment-ready').length}
              </p>
            </div>
            <CheckCircle className="text-green-600" size={32} />
          </div>
        </div>
      </div>

      {/* Application Form */}
      {showForm && (
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Applicant</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Verification Checkboxes */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Verification Required</h3>
              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.patwariChecked}
                    onChange={(e) => setFormData(prev => ({ ...prev, patwariChecked: e.target.checked }))}
                    className="mr-3 h-4 w-4 text-blue-600"
                  />
                  <span className="text-gray-700">Patwari Verification Completed</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.thanaInchargeChecked}
                    onChange={(e) => setFormData(prev => ({ ...prev, thanaInchargeChecked: e.target.checked }))}
                    className="mr-3 h-4 w-4 text-blue-600"
                  />
                  <span className="text-gray-700">Thana In-charge Verification Completed</span>
                </label>
              </div>
            </div>

            {/* Document Upload */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Document Upload</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Finding Report
                  </label>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileUpload('finding-report')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {uploadedFiles['finding-report'] && (
                    <p className="text-sm text-green-600 mt-1">
                      ✓ {uploadedFiles['finding-report'].name}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Post-Mortem Report
                  </label>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileUpload('post-mortem-report')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {uploadedFiles['post-mortem-report'] && (
                    <p className="text-sm text-green-600 mt-1">
                      ✓ {uploadedFiles['post-mortem-report'].name}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Applicant Details */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Applicant Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.applicantName}
                  onChange={(e) => setFormData(prev => ({ ...prev, applicantName: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Age *
                </label>
                <input
                  type="number"
                  required
                  value={formData.age}
                  onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sex *
                </label>
                <select
                  required
                  value={formData.sex}
                  onChange={(e) => setFormData(prev => ({ ...prev, sex: e.target.value as 'male' | 'female' | 'other' }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date of Birth *
                </label>
                <input
                  type="date"
                  required
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date of Death *
                </label>
                <input
                  type="date"
                  required
                  value={formData.dateOfDeath}
                  onChange={(e) => setFormData(prev => ({ ...prev, dateOfDeath: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location *
                </label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Residential Address *
              </label>
              <textarea
                required
                value={formData.residentialAddress}
                onChange={(e) => setFormData(prev => ({ ...prev, residentialAddress: e.target.value }))}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Family Details *
              </label>
              <textarea
                required
                value={formData.familyDetails}
                onChange={(e) => setFormData(prev => ({ ...prev, familyDetails: e.target.value }))}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Include family members, dependents, and relationship to deceased"
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-blue-800 text-white px-6 py-2 rounded-lg hover:bg-blue-900 transition-colors flex items-center"
              >
                <Send className="mr-2" size={20} />
                Submit Application
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="text-green-600" size={32} />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Applicant Added Successfully!
              </h2>
              <p className="text-gray-600 mb-6">
                The applicant details have been saved. Click "Proceed Further" to submit 
                the application to SDM for review.
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={handleProceedFurther}
                  className="bg-blue-800 text-white px-6 py-2 rounded-lg hover:bg-blue-900 transition-colors flex items-center"
                >
                  <Send className="mr-2" size={20} />
                  Proceed Further
                </button>
                <button
                  onClick={() => setShowSuccessModal(false)}
                  className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Applications List */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">My Applications</h2>
        
        {userApplications.length === 0 ? (
          <p className="text-gray-600 text-center py-8">No applications found. Create your first application using the "New Application" button.</p>
        ) : (
          <div className="space-y-4">
            {userApplications.map((app) => (
              <div key={app.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{app.applicant_name}</h3>
                    <p className="text-gray-600">Age: {app.age} | Location: {app.location}</p>
                    <p className="text-sm text-gray-500">
                      Created: {new Date(app.created_at).toLocaleDateString()}
                      {app.submitted_at && (
                        <span> | Submitted: {new Date(app.submitted_at).toLocaleDateString()}</span>
                      )}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      app.status === 'draft' ? 'bg-gray-100 text-gray-800' :
                      app.status === 'pending' ? 'bg-orange-100 text-orange-800' :
                      app.status === 'under-review' ? 'bg-blue-100 text-blue-800' :
                      app.status === 'approved' ? 'bg-green-100 text-green-800' :
                      app.status === 'rejected' ? 'bg-red-100 text-red-800' :
                      app.status === 'payment-ready' ? 'bg-purple-100 text-purple-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {app.status.replace('-', ' ').toUpperCase()}
                    </span>
                    <p className="text-sm text-gray-500 mt-1">
                      Current Level: {app.current_level.replace('-', ' ').toUpperCase()}
                    </p>
                    {app.status === 'payment-ready' && (
                      <button
                        onClick={() => handlePaymentApproval(app.id)}
                        className="mt-2 bg-green-600 text-white px-4 py-1 rounded text-sm hover:bg-green-700 transition-colors"
                      >
                        Approve Payment
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}