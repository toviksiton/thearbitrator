# The Arbitrator

An AI-powered dispute resolution platform where two parties can submit arguments and evidence while an AI system acts as a neutral mediator and arbitration assistant.

## Features

- **AI Neutralization** — Removes emotional language from both sides and generates neutral case titles
- **Dispute Classification** — AI automatically categorizes disputes (neighbor, financial, contract, etc.)
- **AI Mediation** — Before arbitration, the AI proposes fair compromise solutions
- **AI Resolution** — Structured, objective arbitration decision with reasoning and recommendations
- **PDF Export** — Professionally formatted case summary and resolution
- **Evidence Upload** — Secure file uploads via Supabase Storage
- **Invite System** — Secure token-based invitation for the other party
- **Legal Agreement** — Required agreement modal before submission
- **RTL Hebrew Support** — Full right-to-left layout for Hebrew users

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14, React 18, TypeScript |
| Styling | TailwindCSS, shadcn/ui |
| Backend | Supabase (PostgreSQL + Auth + Storage) |
| AI | OpenAI GPT-4o |
| Auth | Supabase Auth (Email, Google, Magic Link) |
| Deployment | Vercel |

## Quick Start

### Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com) project
- An [OpenAI](https://platform.openai.com) API key

### 1. Clone and install

```bash
git clone <repo-url>
cd thearbitrator
npm install
```

### 2. Environment variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

Required variables:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
OPENAI_API_KEY=sk-your-openai-api-key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Set up Supabase

#### Option A: Supabase CLI (recommended)

```bash
# Install Supabase CLI
npm install -g supabase

# Link to your project
supabase link --project-ref your-project-ref

# Push migrations
supabase db push
```

#### Option B: Manual

1. Open your [Supabase Dashboard](https://app.supabase.com)
2. Go to **SQL Editor**
3. Run the contents of `supabase/migrations/001_initial_schema.sql`

### 4. Configure Authentication

In your Supabase Dashboard:

1. Go to **Authentication → Providers**
2. Enable **Google** OAuth:
   - Add Client ID and Secret from [Google Cloud Console](https://console.cloud.google.com)
   - Add authorized redirect URL: `https://your-project.supabase.co/auth/v1/callback`
3. Go to **Authentication → URL Configuration**:
   - Set Site URL to your app URL
   - Add redirect URLs: `http://localhost:3000/auth/callback`, `https://yourdomain.com/auth/callback`

### 5. Start development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deployment to Vercel

### 1. Push to GitHub

```bash
git add .
git commit -m "Initial MVP"
git push origin main
```

### 2. Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and import your repository
2. Add all environment variables from `.env.example`
3. Set `NEXT_PUBLIC_APP_URL` to your Vercel domain
4. Deploy

### 3. Update Supabase

After deployment, update your Supabase project:
- **Authentication → URL Configuration**: Add your Vercel domain to redirect URLs
- **Authentication → Providers → Google**: Add your production callback URL

## Project Structure

```
src/
├── app/
│   ├── (auth)/              # Authentication pages
│   │   ├── login/
│   │   ├── signup/
│   │   └── forgot-password/
│   ├── (app)/               # Authenticated app pages
│   │   ├── dashboard/       # Case overview
│   │   └── disputes/
│   │       ├── new/         # Create dispute flow
│   │       └── [id]/        # Dispute detail + respond
│   ├── api/
│   │   ├── disputes/        # Dispute CRUD
│   │   ├── ai/              # AI processing endpoints
│   │   │   ├── neutralize/  # Language neutralization
│   │   │   ├── classify/    # Dispute classification
│   │   │   ├── mediate/     # Mediation proposal
│   │   │   └── resolve/     # Final resolution
│   │   ├── pdf/[id]/        # PDF generation
│   │   └── invites/         # Invite management
│   ├── auth/callback/       # OAuth callback
│   └── invite/[token]/      # Invite acceptance page
├── components/
│   ├── ui/                  # shadcn/ui components
│   ├── landing/             # Landing page sections
│   └── app/                 # Application components
├── lib/
│   ├── supabase/            # Supabase clients
│   ├── openai.ts            # OpenAI integration
│   └── utils.ts             # Utility functions
└── types/                   # TypeScript types
```

## Dispute Flow

```
Party A creates case
        ↓
Party B receives email invite
        ↓
Party B creates account & submits response
        ↓
AI neutralizes language → generates neutral title
        ↓
AI classifies dispute category
        ↓
AI proposes mediation solution
        ↓
Both parties respond to mediation
        ↓
If rejected → AI generates final arbitration
        ↓
PDF summary generated & downloadable
```

## Database Schema

| Table | Description |
|-------|-------------|
| `disputes` | Core dispute data including both party submissions |
| `participants` | Links users to disputes with their role |
| `evidence` | Uploaded files with metadata |
| `ai_outputs` | Stores all AI-generated content |

Row Level Security (RLS) ensures:
- Only participants of a dispute can view its data
- Each party can only modify their own submissions
- Evidence is accessible only to dispute participants

## Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | ✅ | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✅ | Supabase anonymous key |
| `SUPABASE_SERVICE_ROLE_KEY` | ✅ | Supabase service role key (server only) |
| `OPENAI_API_KEY` | ✅ | OpenAI API key |
| `NEXT_PUBLIC_APP_URL` | ✅ | Your app's base URL |

## License

Private — All rights reserved.
