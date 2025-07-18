import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase, Profile, Application, Document, Approval } from '../lib/supabase';
import { User, Session } from '@supabase/supabase-js';

export type UserRole = 'tehsildar' | 'sdm' | 'rahat-operator' | 'oic' | 'adg' | 'collector';

export interface AuthUser extends Profile {
  name: string; // For backward compatibility
}

interface AuthContextType {
  user: AuthUser | null;
  session: Session | null;
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

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState<Application[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        loadUserProfile(session.user);
      } else {
        setLoading(false);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      if (session?.user) {
        await loadUserProfile(session.user);
      } else {
        setUser(null);
        setApplications([]);
        setDocuments([]);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const loadUserProfile = async (authUser: User) => {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', authUser.id)
        .single();

      if (error && error.code === 'PGRST116') {
        // Profile doesn't exist, create one
        const newProfile = {
          user_id: authUser.id,
          email: authUser.email!,
          role: getRoleFromEmail(authUser.email!),
          display_name: 'User',
          profile_complete: false,
        };

        const { data: createdProfile, error: createError } = await supabase
          .from('profiles')
          .insert(newProfile)
          .select()
          .single();

        if (createError) throw createError;
        
        const authUserData: AuthUser = {
          ...createdProfile,
          name: createdProfile.display_name || 'User',
        };
        setUser(authUserData);
      } else if (error) {
        throw error;
      } else {
        const authUserData: AuthUser = {
          ...profile,
          name: profile.display_name || 'User',
        };
        setUser(authUserData);
      }

      await refreshApplications();
    } catch (error) {
      console.error('Error loading user profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRoleFromEmail = (email: string): UserRole => {
    if (email.includes('tehsildar')) return 'tehsildar';
    if (email.includes('sdm')) return 'sdm';
    if (email.includes('rahat')) return 'rahat-operator';
    if (email.includes('oic')) return 'oic';
    if (email.includes('adg')) return 'adg';
    if (email.includes('collector')) return 'collector';
    return 'tehsildar';
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Demo mode: Check if it's a demo email and use demo password
      const demoEmails = [
        'tehsildar@raipur.gov.in',
        'sdm@raipur.gov.in', 
        'rahat@raipur.gov.in',
        'oic@raipur.gov.in',
        'adg@raipur.gov.in',
        'collector@raipur.gov.in'
      ];
      
      if (demoEmails.includes(email)) {
        // For demo users, we'll simulate authentication
        if (password === 'admin123') {
          // Create a mock session for demo purposes
          const mockUser = {
            id: getDemoUserId(email),
            email: email,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            email_confirmed_at: new Date().toISOString(),
            app_metadata: {},
            user_metadata: {},
            aud: 'authenticated',
            role: 'authenticated'
          };
          
          // Load or create profile for demo user
          await loadDemoUserProfile(mockUser);
          return true;
        } else {
          console.error('Demo login failed: incorrect password');
          return false;
        }
      }
      
      // Regular Supabase authentication for non-demo users
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Login error:', error);
        return false;
      }

      return !!data.user;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const getDemoUserId = (email: string): string => {
    const demoUserIds: { [key: string]: string } = {
      'tehsildar@raipur.gov.in': '11111111-1111-1111-1111-111111111111',
      'sdm@raipur.gov.in': '22222222-2222-2222-2222-222222222222',
      'rahat@raipur.gov.in': '33333333-3333-3333-3333-333333333333',
      'oic@raipur.gov.in': '44444444-4444-4444-4444-444444444444',
      'adg@raipur.gov.in': '55555555-5555-5555-5555-555555555555',
      'collector@raipur.gov.in': '66666666-6666-6666-6666-666666666666'
    };
    return demoUserIds[email] || email;
  };

  const loadDemoUserProfile = async (authUser: any) => {
    try {
      // Check if profile exists
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('email', authUser.email)
        .single();

      if (error && error.code === 'PGRST116') {
        // Profile doesn't exist, create one
        const newProfile = {
          user_id: authUser.id,
          email: authUser.email,
          role: getRoleFromEmail(authUser.email),
          display_name: getDemoDisplayName(authUser.email),
          phone: getDemoPhone(authUser.email),
          department: getDemoDepartment(authUser.email),
          designation: getDemoDesignation(authUser.email),
          profile_complete: true,
        };

        const { data: createdProfile, error: createError } = await supabase
          .from('profiles')
          .insert(newProfile)
          .select()
          .single();

        if (createError) throw createError;
        
        const authUserData: AuthUser = {
          ...createdProfile,
          name: createdProfile.display_name || 'User',
        };
        setUser(authUserData);
      } else if (error) {
        throw error;
      } else {
        const authUserData: AuthUser = {
          ...profile,
          name: profile.display_name || 'User',
        };
        setUser(authUserData);
      }

      // Create mock session
      const mockSession = {
        access_token: 'demo-token',
        refresh_token: 'demo-refresh',
        expires_in: 3600,
        expires_at: Date.now() + 3600000,
        token_type: 'bearer',
        user: authUser
      };
      setSession(mockSession as any);

      await refreshApplications();
    } catch (error) {
      console.error('Error loading demo user profile:', error);
      throw error;
    }
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

  const logout = async () => {
    await supabase.auth.signOut();
  };

  const updateProfile = async (profileData: Partial<Profile>) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          ...profileData,
          profile_complete: true,
        })
        .eq('id', user.id);

      if (error) throw error;

      const updatedUser: AuthUser = {
        ...user,
        ...profileData,
        name: profileData.display_name || user.name,
        profile_complete: true,
      };
      setUser(updatedUser);
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  };

  const refreshApplications = async () => {
    if (!user) return;

    try {
      // Get applications with related data
      const { data: appsData, error: appsError } = await supabase
        .from('applications')
        .select(`
          *,
          approvals (*)
        `)
        .order('created_at', { ascending: false });

      if (appsError) throw appsError;

      // Get documents
      const { data: docsData, error: docsError } = await supabase
        .from('documents')
        .select('*');

      if (docsError) throw docsError;

      setApplications(appsData || []);
      setDocuments(docsData || []);
    } catch (error) {
      console.error('Error refreshing applications:', error);
    }
  };

  const addApplication = async (applicationData: Omit<Application, 'id' | 'created_at' | 'updated_at'>): Promise<string> => {
    if (!user) throw new Error('User not authenticated');

    try {
      const { data, error } = await supabase
        .from('applications')
        .insert({
          ...applicationData,
          created_by: user.id,
        })
        .select()
        .single();

      if (error) throw error;

      await refreshApplications();
      return data.id;
    } catch (error) {
      console.error('Error adding application:', error);
      throw error;
    }
  };

  const submitApplication = async (id: string) => {
    try {
      const { error } = await supabase
        .from('applications')
        .update({
          status: 'pending',
          current_level: 'sdm',
          submitted_at: new Date().toISOString(),
        })
        .eq('id', id);

      if (error) throw error;

      await refreshApplications();
    } catch (error) {
      console.error('Error submitting application:', error);
      throw error;
    }
  };

  const updateApplicationStatus = async (id: string, status: Application['status'], notes?: string) => {
    if (!user) return;

    try {
      // Add approval record
      const { error: approvalError } = await supabase
        .from('approvals')
        .insert({
          application_id: id,
          approved_by: user.id,
          role: user.role,
          approved: status === 'approved' || status === 'payment-ready',
          notes,
        });

      if (approvalError) throw approvalError;

      // Determine next level
      const roleHierarchy: UserRole[] = ['tehsildar', 'sdm', 'rahat-operator', 'oic', 'adg', 'collector'];
      const currentIndex = roleHierarchy.indexOf(user.role);
      const nextLevel = currentIndex < roleHierarchy.length - 1 ? roleHierarchy[currentIndex + 1] : user.role;

      // Update application
      const { error: updateError } = await supabase
        .from('applications')
        .update({
          status,
          current_level: status === 'approved' ? nextLevel : user.role,
        })
        .eq('id', id);

      if (updateError) throw updateError;

      await refreshApplications();
    } catch (error) {
      console.error('Error updating application status:', error);
      throw error;
    }
  };

  const uploadDocument = async (applicationId: string, file: File, documentType: 'finding-report' | 'post-mortem-report') => {
    if (!user) throw new Error('User not authenticated');

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${applicationId}/${documentType}.${fileExt}`;

      // Upload file to storage
      const { error: uploadError } = await supabase.storage
        .from('documents')
        .upload(fileName, file, {
          upsert: true,
        });

      if (uploadError) throw uploadError;

      // Save document record
      const { error: docError } = await supabase
        .from('documents')
        .upsert({
          application_id: applicationId,
          document_type: documentType,
          file_name: file.name,
          file_path: fileName,
          file_size: file.size,
          mime_type: file.type,
          uploaded_by: user.id,
        });

      if (docError) throw docError;

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
      session,
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