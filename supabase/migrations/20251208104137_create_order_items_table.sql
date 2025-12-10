/*
  # Create Order Items Table

  ## Overview
  Creates the order_items table to store individual items (products or tickets)
  within each order, enabling detailed order tracking and inventory management.

  ## New Tables
  - `order_items`
    - `id` (uuid, primary key) - Unique order item identifier
    - `order_id` (uuid, foreign key) - Reference to orders table
    - `product_id` (uuid, foreign key, nullable) - Reference to products table
    - `ticket_type_id` (uuid, foreign key, nullable) - Reference to ticket_types table
    - `item_name` (text) - Name of the item (snapshot at purchase time)
    - `item_type` (text) - Type of item (product or ticket)
    - `quantity` (integer) - Quantity ordered
    - `unit_price` (numeric) - Price per unit at purchase time
    - `total_price` (numeric) - Total price for this line item
    - `size` (text, nullable) - Product size (if applicable)
    - `created_at` (timestamptz) - Record creation timestamp

  ## Security
  - Enable RLS on order_items table
  - Add policy for public read access to view items
  - Add policy for anyone to insert items (during checkout)

  ## Notes
  - Either product_id OR ticket_type_id must be set, not both
  - Prices are stored as snapshots to preserve historical pricing
*/

CREATE TABLE IF NOT EXISTS order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id uuid REFERENCES products(id) ON DELETE SET NULL,
  ticket_type_id uuid REFERENCES ticket_types(id) ON DELETE SET NULL,
  item_name text NOT NULL,
  item_type text NOT NULL CHECK (item_type IN ('product', 'ticket')),
  quantity integer NOT NULL CHECK (quantity > 0),
  unit_price numeric(10, 2) NOT NULL CHECK (unit_price >= 0),
  total_price numeric(10, 2) NOT NULL CHECK (total_price >= 0),
  size text,
  created_at timestamptz DEFAULT now(),
  CONSTRAINT item_reference_check CHECK (
    (product_id IS NOT NULL AND ticket_type_id IS NULL) OR
    (product_id IS NULL AND ticket_type_id IS NOT NULL)
  )
);

ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view order items"
  ON order_items FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can insert order items"
  ON order_items FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_order_items_order ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product ON order_items(product_id);
CREATE INDEX IF NOT EXISTS idx_order_items_ticket ON order_items(ticket_type_id);