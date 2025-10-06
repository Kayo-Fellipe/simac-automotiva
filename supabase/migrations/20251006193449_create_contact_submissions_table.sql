/*
  # Create Contact Submissions Table

  ## Description
  Creates a table to store contact form submissions from the SIMAC website.
  This allows tracking and managing customer inquiries submitted through the contact form.

  ## Tables Created
  - `contact_submissions`
    - `id` (uuid, primary key) - Unique identifier for each submission
    - `name` (text, required) - Customer's full name
    - `email` (text, required) - Customer's email address
    - `phone` (text, optional) - Customer's phone number
    - `subject` (text, required) - Subject/category of the inquiry
    - `message` (text, required) - Customer's message content
    - `created_at` (timestamptz) - Timestamp when submission was received
    - `status` (text) - Status of the inquiry (new, in_progress, resolved)
    - `notes` (text, optional) - Internal notes for tracking responses

  ## Security
  - Enable Row Level Security (RLS) on the table
  - Add policy allowing public inserts (for form submissions)
  - Add policy allowing authenticated users to read all submissions (for admin access)

  ## Notes
  - The table uses UUID for primary key for better security
  - Timestamps are stored in UTC
  - Status field helps track inquiry workflow
  - Public insert policy allows form submissions without authentication
  - Admin users can read all submissions to manage inquiries
*/

-- Create contact_submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  subject text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  status text DEFAULT 'new' NOT NULL,
  notes text
);

-- Enable Row Level Security
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public insertions (for form submissions)
CREATE POLICY "Allow public form submissions"
  ON contact_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create policy for authenticated users to view all submissions (admin access)
CREATE POLICY "Authenticated users can view all submissions"
  ON contact_submissions
  FOR SELECT
  TO authenticated
  USING (true);

-- Create policy for authenticated users to update submissions (for status tracking)
CREATE POLICY "Authenticated users can update submissions"
  ON contact_submissions
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create index on created_at for efficient querying
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at 
  ON contact_submissions(created_at DESC);

-- Create index on status for filtering
CREATE INDEX IF NOT EXISTS idx_contact_submissions_status 
  ON contact_submissions(status);

-- Create index on email for searching
CREATE INDEX IF NOT EXISTS idx_contact_submissions_email 
  ON contact_submissions(email);
