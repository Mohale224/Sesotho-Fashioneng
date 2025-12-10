/*
  # Create Artists Table

  ## Overview
  Creates the artists table for Sesotho Fashioneng artist profiles,
  storing artist information, bios, images, and social media links.

  ## New Tables
  - `artists`
    - `id` (uuid, primary key) - Unique artist identifier
    - `name` (text) - Artist name
    - `bio` (text) - Artist biography
    - `image` (text) - Artist profile image URL
    - `gallery` (jsonb) - Array of artist work/gallery image URLs
    - `social_links` (jsonb) - Object containing social media links
    - `genre` (text) - Artist genre/category
    - `featured` (boolean) - Whether artist is featured on homepage
    - `created_at` (timestamptz) - Record creation timestamp
    - `updated_at` (timestamptz) - Record update timestamp

  ## Security
  - Enable RLS on artists table
  - Add policy for public read access (anyone can view artists)
  - Add policy for authenticated admin insert/update
*/

CREATE TABLE IF NOT EXISTS artists (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  bio text NOT NULL,
  image text,
  gallery jsonb DEFAULT '[]'::jsonb,
  social_links jsonb DEFAULT '{}'::jsonb,
  genre text,
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE artists ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view artists"
  ON artists FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert artists"
  ON artists FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update artists"
  ON artists FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_artists_featured ON artists(featured) WHERE featured = true;