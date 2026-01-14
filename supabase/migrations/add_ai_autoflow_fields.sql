-- Migration: Add AI AutoFlow fields to products table
-- This adds support for universal product classification and workflow generation

-- Add new columns for AI AutoFlow
ALTER TABLE products
ADD COLUMN IF NOT EXISTS industry_id TEXT,
ADD COLUMN IF NOT EXISTS workflow JSONB,
ADD COLUMN IF NOT EXISTS story TEXT,
ADD COLUMN IF NOT EXISTS features JSONB,
ADD COLUMN IF NOT EXISTS authenticity_features JSONB,
ADD COLUMN IF NOT EXISTS confidence INTEGER;

-- Add index for industry_id for filtering
CREATE INDEX IF NOT EXISTS idx_products_industry_id ON products(industry_id);

-- Add comments for documentation
COMMENT ON COLUMN products.industry_id IS 'Industry classification (cannabis, luxury, electronics, etc.)';
COMMENT ON COLUMN products.workflow IS 'Industry-specific authentication workflow steps';
COMMENT ON COLUMN products.story IS 'AI-generated product origin story';
COMMENT ON COLUMN products.features IS 'Detected product features and characteristics';
COMMENT ON COLUMN products.authenticity_features IS 'Industry-specific authenticity verification features';
COMMENT ON COLUMN products.confidence IS 'AI classification confidence score (0-100)';
