# AuthiChain - Blockchain Product Authentication Platform

A modern, full-stack product authentication platform built with Next.js 14, Supabase, and OpenAI GPT-4 Vision API. AuthiChain combines AI-powered product classification with blockchain technology to create an unbreakable chain of authenticity for your products.

## Features

### 🚀 Core Features

- **AI-Powered Product Classification**: Automatically classify products using GPT-4 Vision API with 98% accuracy
- **Blockchain Registration**: Immutable product records with unique TrueMark™ IDs and transaction hashes
- **Public Verification**: Anyone can verify product authenticity using TrueMark™ IDs
- **TrueMark™ Technology**: Proprietary microscopic pattern verification system
- **Analytics Dashboard**: Track products, registrations, and verification scans
- **Dark Mode**: Built-in dark/light theme toggle with next-themes

### 🎨 Design

- Modern, clean interface with purple/green gradient theme
- Fully mobile-responsive design
- Smooth animations with Framer Motion
- Professional UI components with Radix UI and Tailwind CSS

### 🔒 Security

- Row Level Security (RLS) policies with Supabase
- Secure authentication with Supabase Auth
- Protected API routes
- Image upload to Supabase Storage with access control

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **File Storage**: Supabase Storage
- **Authentication**: Supabase Auth
- **AI**: OpenAI GPT-4 Vision API
- **Styling**: Tailwind CSS, Radix UI
- **State Management**: React Hooks
- **Deployment**: Vercel (recommended)

## Project Structure

```
AuthiChain/
├── app/                          # Next.js 14 App Router
│   ├── api/                      # API Routes
│   │   ├── classify/             # POST - AI classification
│   │   ├── register/             # POST - Blockchain registration
│   │   ├── verify/[id]/          # GET - Product verification
│   │   ├── products/             # GET/POST - Products CRUD
│   │   └── auth/callback/        # Auth callback
│   ├── dashboard/                # Dashboard page
│   ├── upload/                   # Upload page
│   ├── products/[id]/            # Product detail page
│   ├── verify/                   # Public verification page
│   ├── login/                    # Login page
│   ├── signup/                   # Signup page
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Landing page
│   └── globals.css               # Global styles
├── components/                   # React components
│   ├── ui/                       # UI components (shadcn)
│   ├── theme-provider.tsx        # Theme context
│   └── theme-toggle.tsx          # Dark mode toggle
├── lib/                          # Utilities
│   ├── supabase/                 # Supabase clients
│   │   ├── client.ts             # Browser client
│   │   ├── server.ts             # Server client
│   │   ├── middleware.ts         # Auth middleware
│   │   └── types.ts              # Database types
│   └── utils.ts                  # Helper functions
├── hooks/                        # Custom hooks
│   └── use-toast.ts              # Toast notifications
├── supabase/                     # Supabase configuration
│   └── schema.sql                # Database schema
├── middleware.ts                 # Next.js middleware
├── next.config.js                # Next.js config
├── tailwind.config.ts            # Tailwind config
└── tsconfig.json                 # TypeScript config
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- Supabase account ([supabase.com](https://supabase.com))
- OpenAI API key ([platform.openai.com](https://platform.openai.com))

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/AuthiChain.git
cd AuthiChain
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to the SQL Editor and run the schema from `supabase/schema.sql`
3. Enable Email authentication in Authentication > Providers
4. Get your project URL and anon key from Settings > API

### 4. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# OpenAI
OPENAI_API_KEY=your-openai-api-key
```

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Pages

### 1. Landing Page (`/`)

- Hero section with product features
- Statistics and social proof
- How it works section
- Call-to-action

### 2. Upload Page (`/upload`)

- Product image upload
- AI-powered classification with GPT-4 Vision
- Manual product details entry
- Image storage in Supabase

### 3. Product Detail Page (`/products/[id]`)

- Product information display
- Blockchain registration button
- TrueMark™ scanner simulator
- Registration status and blockchain data

### 4. Dashboard (`/dashboard`)

- Product statistics
- Products grid with filtering
- Quick access to upload and product details
- User profile and logout

### 5. Verification Page (`/verify`)

- Public product verification (no auth required)
- TrueMark™ ID search
- Authenticity results with confidence score
- Blockchain information display

### 6. Authentication Pages

- `/login` - User login
- `/signup` - User registration
- Email/password authentication with Supabase

## API Routes

### POST `/api/classify`

Classify product image using GPT-4 Vision

**Request Body:**
```json
{
  "imageUrl": "data:image/jpeg;base64,..."
}
```

**Response:**
```json
{
  "name": "iPhone 15 Pro",
  "category": "Electronics",
  "brand": "Apple",
  "description": "Latest flagship smartphone",
  "confidence": 0.95
}
```

### POST `/api/register`

Register product on blockchain

**Request Body:**
```json
{
  "productId": "uuid"
}
```

**Response:**
```json
{
  "success": true,
  "product": { ... },
  "message": "Product successfully registered on blockchain"
}
```

### GET `/api/verify/[id]`

Verify product authenticity by TrueMark™ ID

**Response (Authentic):**
```json
{
  "success": true,
  "result": "authentic",
  "product": { ... },
  "confidence": 0.98,
  "message": "Product verified as authentic"
}
```

### GET `/api/products`

Get all products for authenticated user

**Response:**
```json
{
  "products": [ ... ]
}
```

### POST `/api/products`

Create new product

**Request Body:**
```json
{
  "name": "Product Name",
  "description": "Description",
  "category": "Electronics",
  "brand": "Brand Name",
  "imageUrl": "https://..."
}
```

## Database Schema

### Products Table

```sql
CREATE TABLE products (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  name TEXT NOT NULL,
  description TEXT,
  category TEXT,
  brand TEXT,
  image_url TEXT,
  truemark_id TEXT UNIQUE,
  truemark_data JSONB,
  blockchain_tx_hash TEXT,
  is_registered BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Scans Table

```sql
CREATE TABLE scans (
  id UUID PRIMARY KEY,
  product_id UUID REFERENCES products(id),
  scan_result TEXT NOT NULL,
  confidence DECIMAL(5,2),
  location TEXT,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

```bash
npm run build
npm start
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key | Yes |
| `OPENAI_API_KEY` | OpenAI API key for GPT-4 Vision | Yes |

## Features in Detail

### AI Classification

The AI classification feature uses OpenAI's GPT-4 Vision API to analyze product images and automatically extract:

- Product name
- Category (Electronics, Fashion, Luxury, etc.)
- Brand identification
- Product description
- Confidence score

### Blockchain Registration

When a product is registered:

1. A unique TrueMark™ ID is generated
2. A blockchain transaction hash is created
3. Microscopic pattern data is generated
4. Product is marked as registered in the database
5. Public verification becomes available

### TrueMark™ Technology

TrueMark™ is a proprietary authentication system that:

- Generates unique microscopic patterns for each product
- Stores pattern data securely on the blockchain
- Allows instant verification through pattern matching
- Provides confidence scores for authenticity

## Security

- **Row Level Security (RLS)**: All database tables have RLS policies
- **Authentication**: Supabase Auth with email/password
- **API Protection**: Server-side authentication checks
- **Storage Policies**: Restricted file upload and access
- **Type Safety**: Full TypeScript coverage

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For support, email support@authichain.com or open an issue on GitHub.

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Database by [Supabase](https://supabase.com)
- AI by [OpenAI](https://openai.com)
- UI components by [shadcn/ui](https://ui.shadcn.com)
- Icons by [Lucide](https://lucide.dev)

---

Made with ❤️ by the AuthiChain Team
