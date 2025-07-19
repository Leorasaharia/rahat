// Mock data types for the application
export interface Profile {
  id: string;
  user_id: string;
  email: string;
  role: 'tehsildar' | 'sdm' | 'rahat-operator' | 'oic' | 'adg' | 'collector';
  display_name?: string;
  phone?: string;
  department?: string;
  designation?: string;
  profile_complete: boolean;
  created_at: string;
  updated_at: string;
}

export interface Application {
  id: string;
  applicant_name: string;
  age: number;
  sex: 'male' | 'female' | 'other';
  date_of_birth: string;
  date_of_death: string;
  location: string;
  residential_address: string;
  family_details: string;
  status: 'draft' | 'pending' | 'under-review' | 'approved' | 'rejected' | 'payment-ready' | 'payment-approved';
  current_level: 'tehsildar' | 'sdm' | 'rahat-operator' | 'oic' | 'adg' | 'collector';
  created_by: string;
  patwari_checked: boolean;
  thana_incharge_checked: boolean;
  created_at: string;
  updated_at: string;
  submitted_at?: string;
}

export interface Document {
  id: string;
  application_id: string;
  document_type: 'finding-report' | 'post-mortem-report';
  file_name: string;
  file_path: string;
  file_size?: number;
  mime_type?: string;
  uploaded_by: string;
  created_at: string;
}

export interface Approval {
  id: string;
  application_id: string;
  approved_by: string;
  role: 'tehsildar' | 'sdm' | 'rahat-operator' | 'oic' | 'adg' | 'collector';
  approved: boolean;
  notes?: string;
  created_at: string;
}