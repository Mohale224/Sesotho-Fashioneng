/*
  # Create Events Table

  ## Overview
  Creates the events table for Sesotho Fashioneng cultural events and shows,
  storing event information, dates, locations, and artist lineups.

  ## New Tables
  - `events`
    - `id` (uuid, primary key) - Unique event identifier
    - `name` (text) - Event name
    - `description` (text) - Detailed event description
    - `event_date` (timestamptz) - Event date and time
    - `location` (text) - Event venue/location
    - `images` (jsonb) - Array of event image URLs
    - `lineup` (jsonb) - Array of artist IDs performing at event
    - `status` (text) - Event status (upcoming, ongoing, completed, cancelled)
    - `featured` (boolean) - Whether event is featured on homepage
    - `created_at` (timestamptz) - Record creation timestamp
    - `updated_at` (timestamptz) - Record update timestamp

  ## Security
  - Enable RLS on events table
  - Add policy for public read access (anyone can view events)
  - Add policy for authenticated admin insert/update
*/

CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  event_date timestamptz NOT NULL,
  location text NOT NULL,
  images jsonb DEFAULT '[]'::jsonb,
  lineup jsonb DEFAULT '[]'::jsonb,
  status text DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'ongoing', 'completed', 'cancelled')),
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view events"
  ON events FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert events"
  ON events FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update events"
  ON events FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_events_date ON events(event_date);
CREATE INDEX IF NOT EXISTS idx_events_status ON events(status);
CREATE INDEX IF NOT EXISTS idx_events_featured ON events(featured) WHERE featured = true;