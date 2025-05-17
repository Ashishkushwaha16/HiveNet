/*
  # Initial Schema Setup

  1. New Tables
    - profiles
      - id (uuid, references auth.users)
      - name (text)
      - email (text)
      - phone (text)
      - avatar_url (text)
      - title (text)
      - location (text)
      - linkedin_url (text)
      - github_url (text)
      - rating (numeric)
      - created_at (timestamptz)
      - updated_at (timestamptz)
    
    - skills
      - id (uuid)
      - name (text)
      - category (text)
      - created_at (timestamptz)
    
    - user_skills
      - id (uuid)
      - user_id (uuid, references profiles)
      - skill_id (uuid, references skills)
      - proficiency_level (int)
      - created_at (timestamptz)
    
    - certificates
      - id (uuid)
      - user_id (uuid, references profiles)
      - name (text)
      - issuer (text)
      - issue_date (date)
      - url (text)
      - created_at (timestamptz)
    
    - connections
      - id (uuid)
      - requester_id (uuid, references profiles)
      - recipient_id (uuid, references profiles)
      - status (text)
      - created_at (timestamptz)
      - updated_at (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  avatar_url TEXT,
  title TEXT,
  location TEXT,
  linkedin_url TEXT,
  github_url TEXT,
  rating NUMERIC DEFAULT 5.0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create skills table
CREATE TABLE IF NOT EXISTS skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  category TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create user_skills table
CREATE TABLE IF NOT EXISTS user_skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  skill_id UUID REFERENCES skills(id) ON DELETE CASCADE,
  proficiency_level INTEGER CHECK (proficiency_level BETWEEN 1 AND 5),
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, skill_id)
);

-- Create certificates table
CREATE TABLE IF NOT EXISTS certificates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  issuer TEXT NOT NULL,
  issue_date DATE NOT NULL,
  url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create connections table
CREATE TABLE IF NOT EXISTS connections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  requester_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  recipient_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  status TEXT CHECK (status IN ('pending', 'accepted', 'rejected')) DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(requester_id, recipient_id)
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE connections ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Skills policies
CREATE POLICY "Skills are viewable by everyone"
  ON skills FOR SELECT
  USING (true);

-- User skills policies
CREATE POLICY "User skills are viewable by everyone"
  ON user_skills FOR SELECT
  USING (true);

CREATE POLICY "Users can manage their own skills"
  ON user_skills FOR ALL
  USING (auth.uid() = user_id);

-- Certificates policies
CREATE POLICY "Certificates are viewable by everyone"
  ON certificates FOR SELECT
  USING (true);

CREATE POLICY "Users can manage their own certificates"
  ON certificates FOR ALL
  USING (auth.uid() = user_id);

-- Connections policies
CREATE POLICY "Users can view their own connections"
  ON connections FOR SELECT
  USING (
    auth.uid() = requester_id OR 
    auth.uid() = recipient_id
  );

CREATE POLICY "Users can create connection requests"
  ON connections FOR INSERT
  WITH CHECK (auth.uid() = requester_id);

CREATE POLICY "Users can update their connection status"
  ON connections FOR UPDATE
  USING (auth.uid() = recipient_id);

-- Create function to handle user creation
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, name, email, avatar_url)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'name',
    NEW.email,
    'https://api.dicebear.com/7.x/avataaars/svg?seed=' || NEW.email
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user creation
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Insert initial skill categories
INSERT INTO skills (name, category) VALUES
  ('JavaScript', 'Programming'),
  ('Python', 'Programming'),
  ('React', 'Web Development'),
  ('Node.js', 'Backend Development'),
  ('UI/UX Design', 'Design'),
  ('Digital Marketing', 'Marketing'),
  ('Data Analysis', 'Data Science'),
  ('Machine Learning', 'Artificial Intelligence'),
  ('Content Writing', 'Content'),
  ('Project Management', 'Management')
ON CONFLICT (name) DO NOTHING;