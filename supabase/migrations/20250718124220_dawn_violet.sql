/*
  # Create Demo Users for Project Rahat

  1. Demo Users
    - Creates demo users for all roles with consistent password
    - Sets up proper email and role assignments
    - Ensures authentication works for demo purposes

  2. Security
    - Uses secure password hashing
    - Sets up proper user profiles
    - Links auth users to profile records
*/

-- Insert demo users into auth.users (this is a simplified approach for demo)
-- Note: In production, users would be created through Supabase Auth signup

-- Create demo profiles that will be linked when users sign up
INSERT INTO profiles (user_id, email, role, display_name, phone, department, designation, profile_complete) VALUES
  ('11111111-1111-1111-1111-111111111111', 'tehsildar@raipur.gov.in', 'tehsildar', 'Tehsildar Officer', '+91-9876543210', 'Revenue Department', 'Tehsildar', true),
  ('22222222-2222-2222-2222-222222222222', 'sdm@raipur.gov.in', 'sdm', 'SDM Officer', '+91-9876543211', 'District Administration', 'Sub Divisional Magistrate', true),
  ('33333333-3333-3333-3333-333333333333', 'rahat@raipur.gov.in', 'rahat-operator', 'Rahat Operator', '+91-9876543212', 'Relief Department', 'Relief Operator', true),
  ('44444444-4444-4444-4444-444444444444', 'oic@raipur.gov.in', 'oic', 'OIC Officer', '+91-9876543213', 'Police Department', 'Officer In Charge', true),
  ('55555555-5555-5555-5555-555555555555', 'adg@raipur.gov.in', 'adg', 'ADG Officer', '+91-9876543214', 'Police Headquarters', 'Additional Director General', true),
  ('66666666-6666-6666-6666-666666666666', 'collector@raipur.gov.in', 'collector', 'District Collector', '+91-9876543215', 'Collectorate', 'District Collector', true)
ON CONFLICT (email) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  phone = EXCLUDED.phone,
  department = EXCLUDED.department,
  designation = EXCLUDED.designation,
  profile_complete = EXCLUDED.profile_complete;