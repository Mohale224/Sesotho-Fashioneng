/*
  # Create Ticket Types Table

  ## Overview
  Creates the ticket_types table for event ticketing system,
  storing different ticket tiers and pricing for each event.

  ## New Tables
  - `ticket_types`
    - `id` (uuid, primary key) - Unique ticket type identifier
    - `event_id` (uuid, foreign key) - Reference to events table
    - `name` (text) - Ticket type name (e.g., General Admission, VIP, Early Bird)
    - `description` (text) - Ticket type description
    - `price` (numeric) - Ticket price
    - `quantity_available` (integer) - Total tickets available
    - `quantity_sold` (integer) - Number of tickets sold
    - `created_at` (timestamptz) - Record creation timestamp
    - `updated_at` (timestamptz) - Record update timestamp

  ## Security
  - Enable RLS on ticket_types table
  - Add policy for public read access (anyone can view ticket types)
  - Add policy for authenticated admin insert/update
*/

CREATE TABLE IF NOT EXISTS ticket_types (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  price numeric(10, 2) NOT NULL CHECK (price >= 0),
  quantity_available integer NOT NULL CHECK (quantity_available >= 0),
  quantity_sold integer DEFAULT 0 CHECK (quantity_sold >= 0),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT quantity_check CHECK (quantity_sold <= quantity_available)
);

ALTER TABLE ticket_types ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view ticket types"
  ON ticket_types FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert ticket types"
  ON ticket_types FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update ticket types"
  ON ticket_types FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_ticket_types_event ON ticket_types(event_id);