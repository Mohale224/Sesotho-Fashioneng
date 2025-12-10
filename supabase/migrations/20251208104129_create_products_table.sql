/*
  # Create Products Table

  ## Overview
  Creates the products table for the Sesotho Fashioneng e-commerce platform,
  storing clothing items and fashion products with full details for the online store.

  ## New Tables
  - `products`
    - `id` (uuid, primary key) - Unique product identifier
    - `name` (text) - Product name
    - `description` (text) - Detailed product description
    - `price` (numeric) - Product price
    - `images` (jsonb) - Array of product image URLs
    - `category` (text) - Product category (Traditional Wear, Modern Fusion, Accessories, Limited Editions)
    - `sizes` (jsonb) - Available sizes array
    - `stock` (integer) - Available quantity
    - `featured` (boolean) - Whether product is featured on homepage
    - `created_at` (timestamptz) - Record creation timestamp
    - `updated_at` (timestamptz) - Record update timestamp

  ## Security
  - Enable RLS on products table
  - Add policy for public read access (anyone can view products)
  - Add policy for authenticated admin insert/update (future admin panel)
*/

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  price numeric(10, 2) NOT NULL CHECK (price >= 0),
  images jsonb DEFAULT '[]'::jsonb,
  category text NOT NULL,
  sizes jsonb DEFAULT '[]'::jsonb,
  stock integer DEFAULT 0 CHECK (stock >= 0),
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view products"
  ON products FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert products"
  ON products FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update products"
  ON products FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(featured) WHERE featured = true;