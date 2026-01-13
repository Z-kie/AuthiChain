# Supabase Setup Guide

## 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Note down your project URL and anon key

## 2. Set Up Database

1. In your Supabase dashboard, go to the SQL Editor
2. Run the SQL script from `supabase/schema.sql`
3. This will create:
   - `products` table
   - `scans` table
   - Indexes for performance
   - Row Level Security (RLS) policies
   - Storage bucket for product images
   - Storage policies

## 3. Configure Storage

The SQL script automatically creates a `product-images` bucket. Verify in Storage section:
- Bucket name: `product-images`
- Public: Yes
- File size limit: 10MB (recommended)
- Allowed MIME types: image/jpeg, image/png, image/webp

## 4. Enable Authentication

1. Go to Authentication > Providers
2. Enable Email provider
3. Configure email templates (optional)
4. Set up redirect URLs:
   - Site URL: `http://localhost:3000` (development)
   - Redirect URLs: `http://localhost:3000/auth/callback`

## 5. Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
OPENAI_API_KEY=your-openai-api-key
```

## 6. Test the Setup

Run the development server:

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` and test:
- User registration/login
- Product upload
- Image storage
- Database queries

## Security Notes

- RLS policies are enabled for all tables
- Users can only access their own products
- Public verification is allowed via truemark_id
- Storage is restricted to authenticated users
- Service role key should never be exposed to the client
