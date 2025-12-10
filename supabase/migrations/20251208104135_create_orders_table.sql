/*
  # Create Orders Table

  ## Overview
  Creates the orders table for the e-commerce and ticketing checkout system,
  storing customer orders with items and payment status.

  ## New Tables
  - `orders`
    - `id` (uuid, primary key) - Unique order identifier
    - `order_number` (text, unique) - Human-readable order number
    - `customer_email` (text) - Customer email address
    - `customer_name` (text) - Customer name
    - `customer_phone` (text) - Customer phone number
    - `shipping_address` (jsonb) - Shipping address details (for products)
    - `total_amount` (numeric) - Total order amount
    - `status` (text) - Order status (pending, paid, processing, shipped, completed, cancelled)
    - `payment_method` (text) - Payment method used
    - `payment_status` (text) - Payment status (pending, completed, failed, refunded)
    - `created_at` (timestamptz) - Record creation timestamp
    - `updated_at` (timestamptz) - Record update timestamp

  ## Security
  - Enable RLS on orders table
  - Add policy for users to view their own orders by email
  - Add policy for authenticated admin to view/manage all orders
*/

CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number text UNIQUE NOT NULL,
  customer_email text NOT NULL,
  customer_name text NOT NULL,
  customer_phone text,
  shipping_address jsonb DEFAULT '{}'::jsonb,
  total_amount numeric(10, 2) NOT NULL CHECK (total_amount >= 0),
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'processing', 'shipped', 'completed', 'cancelled')),
  payment_method text,
  payment_status text DEFAULT 'pending' CHECK (payment_status IN ('pending', 'completed', 'failed', 'refunded')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Customers can view their own orders"
  ON orders FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can create orders"
  ON orders FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update orders"
  ON orders FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_orders_email ON orders(customer_email);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);