import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Profile, Application, Document, Approval } from '../lib/supabase';

export type UserRole = 'tehsildar' | 'sdm' | 'rahat-operator' | 'oic' | 'adg' | 'collector';

export interface AuthUser extends Profile {
  name: string; // For backward compatibility
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  updateProfile: (profileData: Partial<Profile>) => Promise<void>;
  applications: Application[];
  addApplication: (application: Omit<Application, 'id' | 'created_at' | 'updated_at'>) => Promise<string>;
  submitApplication: (id: string) => Promise<void>;
  updateApplicationStatus: (id: string, status: Application['status'], notes?: string) => Promise<void>;
  getApplicationsForRole: (role: UserRole) => Application[];
  uploadDocument: (applicationId: string, file: File, documentType: 'finding-report' | 'post-mortem-report') => Promise<void>;
  getDocuments: (applicationId: string) => Document[];
  refreshApplications: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// In-memory storage for demo purposes
let mockApplications: Application[] = [];
let mockDocuments: Document[] = [];
let mockApprovals: Approval[] = [];
let mockProfiles: Profile[] = [];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [applications, setApplications] = useState<Application[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);

  useEffect(() => {
    setLoading(false);
  }, []);

  const getRoleFromEmail = (email: string): UserRole => {
    if (email.includes('tehsildar')) return 'tehsildar';
    if (email.includes('sdm')) return 'sdm';
    if (email.includes('rahat')) return 'rahat-operator';
    if (email.includes('oic')) return 'oic';
    if (email.includes('adg')) return 'adg';
    if (email.includes('collector')) return 'collector';
    return 'tehsildar';
  };

  const getDemoDisplayName = (email: string): string => {
    const names: { [key: string]: string } = {
      'tehsildar@raipur.gov.in': 'Tehsildar Officer',
      'sdm@raipur.gov.in': 'SDM Officer',
      'rahat@raipur.gov.in': 'Rahat Operator',
      'oic@raipur.gov.in': 'OIC Officer',
      'adg@raipur.gov.in': 'ADG Officer',
      'collector@raipur.gov.in': 'District Collector'
    };
    return names[email] || 'Demo User';
  };

  const getDemoPhone = (email: string): string => {
    const phones: { [key: string]: string } = {
      'tehsildar@raipur.gov.in': '+91-9876543210',
      'sdm@raipur.gov.in': '+91-9876543211',
      'rahat@raipur.gov.in': '+91-9876543212',
      'oic@raipur.gov.in': '+91-9876543213',
      'adg@raipur.gov.in': '+91-9876543214',
      'collector@raipur.gov.in': '+91-9876543215'
    };
    return phones[email] || '+91-9876543200';
  };

  const getDemoDepartment = (email: string): string => {
    const departments: { [key: string]: string } = {
      'tehsildar@raipur.gov.in': 'Revenue Department',
      'sdm@raipur.gov.in': 'District Administration',
      'rahat@raipur.gov.in': 'Relief Department',
      'oic@raipur.gov.in': 'Police Department',
      'adg@raipur.gov.in': 'Police Headquarters',
      'collector@raipur.gov.in': 'Collectorate'
    };
    return departments[email] || 'Government Department';
  };

  const getDemoDesignation = (email: string): string => {
    const designations: { [key: string]: string } = {
      'tehsildar@raipur.gov.in': 'Tehsildar',
      'sdm@raipur.gov.in': 'Sub Divisional Magistrate',
      'rahat@raipur.gov.in': 'Relief Operator',
      'oic@raipur.gov.in': 'Officer In Charge',
      'adg@raipur.gov.in': 'Additional Director General',
      'collector@raipur.gov.in': 'District Collector'
    };
    return designations[email] || 'Government Officer';
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const demoEmails = [
        'tehsildar@raipur.gov.in',
        'sdm@raipur.gov.in', 
        'rahat@raipur.gov.in',
        'oic@raipur.gov.in',
        'adg@raipur.gov.in',
        'collector@raipur.gov.in'
      ];
      
      if (demoEmails.includes(email) && password === 'admin123') {
        // Find or create profile
        let profile = mockProfiles.find(p => p.email === email);
        
        if (!profile) {
          profile = {
            id: `profile-${Date.now()}`,
            user_id: `user-${Date.now()}`,
            email: email,
            role: getRoleFromEmail(email),
            display_name: getDemoDisplayName(email),
            phone: getDemoPhone(email),
            department: getDemoDepartment(email),
            designation: getDemoDesignation(email),
            profile_complete: true,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          };
          mockProfiles.push(profile);
        }
        
        const authUser: AuthUser = {
          ...profile,
          name: profile.display_name || 'User',
        };
        
        setUser(authUser);
        await refreshApplications();
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = async () => {
    setUser(null);
    setApplications([]);
    setDocuments([]);
  };

  const updateProfile = async (profileData: Partial<Profile>) => {
    if (!user) return;

    try {
      const profileIndex = mockProfiles.findIndex(p => p.id === user.id);
      if (profileIndex !== -1) {
        mockProfiles[profileIndex] = {
          ...mockProfiles[profileIndex],
          ...profileData,
          profile_complete: true,
          updated_at: new Date().toISOString(),
        };

        const updatedUser: AuthUser = {
          ...user,
          ...profileData,
          name: profileData.display_name || user.name,
          profile_complete: true,
        };
        setUser(updatedUser);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  };

  const refreshApplications = async () => {
    setApplications([...mockApplications]);
    setDocuments([...mockDocuments]);
  };

  const addApplication = async (applicationData: Omit<Application, 'id' | 'created_at' | 'updated_at'>): Promise<string> => {
    if (!user) throw new Error('User not authenticated');

    try {
      const newApplication: Application = {
        id: `app-${Date.now()}`,
        applicant_name: applicationData.applicant_name,
        age: applicationData.age,
        sex: applicationData.sex,
        date_of_birth: applicationData.date_of_birth,
        date_of_death: applicationData.date_of_death,
        location: applicationData.location,
        residential_address: applicationData.residential_address,
        family_details: applicationData.family_details,
        status: applicationData.status,
        current_level: applicationData.current_level,
        created_by: applicationData.created_by,
        patwari_checked: applicationData.patwari_checked,
        thana_incharge_checked: applicationData.thana_incharge_checked,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      mockApplications.push(newApplication);
      await refreshApplications();
      return newApplication.id;
    } catch (error) {
      console.error('Error adding application:', error);
      throw error;
    }
  };

  const submitApplication = async (id: string) => {
    try {
      const appIndex = mockApplications.findIndex(app => app.id === id);
      if (appIndex !== -1) {
        mockApplications[appIndex] = {
          ...mockApplications[appIndex],
          status: 'pending',
          current_level: 'sdm',
          submitted_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        await refreshApplications();
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      throw error;
    }
  };

  const updateApplicationStatus = async (id: string, status: Application['status'], notes?: string) => {
    if (!user) return;

    try {
      // Add approval record
      const newApproval: Approval = {
        id: `approval-${Date.now()}`,
        application_id: id,
        approved_by: user.id,
        role: user.role,
        approved: status === 'approved' || status === 'payment-ready',
        notes,
        created_at: new Date().toISOString(),
      };
      mockApprovals.push(newApproval);

      // Determine next level
      const roleHierarchy: UserRole[] = ['tehsildar', 'sdm', 'rahat-operator', 'oic', 'adg', 'collector'];
      const currentIndex = roleHierarchy.indexOf(user.role);
      const nextLevel = currentIndex < roleHierarchy.length - 1 ? roleHierarchy[currentIndex + 1] : user.role;

      // Update application
      const appIndex = mockApplications.findIndex(app => app.id === id);
      if (appIndex !== -1) {
        mockApplications[appIndex] = {
          ...mockApplications[appIndex],
          status,
          current_level: status === 'approved' ? nextLevel : user.role,
          updated_at: new Date().toISOString(),
        };
        await refreshApplications();
      }
    } catch (error) {
      console.error('Error updating application status:', error);
      throw error;
    }
  };

  const uploadDocument = async (applicationId: string, file: File, documentType: 'finding-report' | 'post-mortem-report') => {
    if (!user) throw new Error('User not authenticated');

    try {
      const newDocument: Document = {
        id: `doc-${Date.now()}`,
        application_id: applicationId,
        document_type: documentType,
        file_name: file.name,
        file_path: `documents/${applicationId}/${documentType}`,
        file_size: file.size,
        mime_type: file.type,
        uploaded_by: user.id,
        created_at: new Date().toISOString(),
      };

      // Remove existing document of same type for this application
      mockDocuments = mockDocuments.filter(doc => 
        !(doc.application_id === applicationId && doc.document_type === documentType)
      );
      
      mockDocuments.push(newDocument);
      await refreshApplications();
    } catch (error) {
      console.error('Error uploading document:', error);
      throw error;
    }
  };

  const getApplicationsForRole = (role: UserRole): Application[] => {
    if (role === 'tehsildar') {
      return applications.filter(app => 
        app.created_by === user?.id || app.status === 'payment-ready'
      );
    } else if (role === 'collector') {
      return applications.filter(app => 
        app.current_level === role || app.status === 'approved'
      );
    } else {
      return applications.filter(app => 
        app.current_level === role && app.status !== 'draft'
      );
    }
  };

  const getDocuments = (applicationId: string): Document[] => {
    return documents.filter(doc => doc.application_id === applicationId);
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      logout,
      updateProfile,
      applications,
      addApplication,
      submitApplication,
      updateApplicationStatus,
      getApplicationsForRole,
      uploadDocument,
      getDocuments,
      refreshApplications,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}