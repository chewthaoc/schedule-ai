# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ScheduleAI is an AI-driven schedule management system built with Next.js 14 (App Router), Supabase, and GitHub Models API (GPT-4o). The application allows users to upload schedule images, automatically extract events using AI, and manage their schedules with full CRUD operations.

**Production URL**: https://schedule-ai-teal.vercel.app

## Development Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## Environment Setup

Required environment variables in `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
GITHUB_TOKEN=your_github_token  # For GitHub Models API
AI_MODEL=gpt-4o
```

### Initial Database Setup

1. Run `database.sql` in Supabase SQL Editor to create tables and RLS policies
2. Run `fix-user-sync.sql` to set up automatic user synchronization trigger
3. Create Storage buckets: `schedule-images` (public) and `avatars` (public)
4. Run Storage policies from `STORAGE_SETUP.md`

### Supabase Configuration

- **Email Provider**: Must be enabled in Authentication → Providers
- **Redirect URLs**: Add `/reset-password` endpoint for password reset flow
- **Storage Buckets**: Both must be public for AI image access and avatar display
- **Google OAuth** (optional): Requires Client ID/Secret from Google Cloud Console

See `EMAIL_SETUP.md` and `GOOGLE_OAUTH_SETUP.md` for detailed configuration.

## Architecture

### Authentication Flow

Uses `@supabase/ssr` (NOT the older `@supabase/auth-helpers-nextjs`):

- **Client-side**: `lib/supabase/browser-client.ts` - Lazy client creation
- **Server-side**: `createServerClient` with cookie handlers in API routes
- **Middleware**: `middleware.ts` protects routes and handles redirects
- **Protected routes**: `/dashboard`, `/schedules`, `/analytics`, `/settings`
- **Public auth pages**: `/login`, `/register`, `/forgot-password`, `/reset-password`

**Critical**: Always use `createServerClient` in API routes and server components. Never use `createBrowserClient` on the server.

### Data Model

Three main tables with cascade deletion:

```
users (extends auth.users)
  └── schedules (user_id FK)
      └── events (schedule_id FK)
```

**Row Level Security (RLS)**: All tables have RLS policies. Users can only access their own data. API routes must authenticate via `supabase.auth.getUser()` before querying.

### AI Image Extraction Flow

**Critical implementation details** (app/api/ai/extract/route.ts):

1. Receives `imageUrl` from Supabase Storage
2. **Must fetch image and convert to base64** - GitHub Models API cannot download external URLs
3. Sends base64 data URL to GitHub Models API
4. Parses JSON response containing extracted events
5. Returns events array to client

**Known issue**: If image URL contains non-ASCII characters, encoding errors occur. Solution: `lib/supabase/storage.ts` generates ASCII-only filenames using MIME type instead of parsing original filename.

### Storage Architecture

Two buckets with specific purposes:

- **schedule-images**: Stores uploaded schedule images for AI processing
  - Filename format: `{userId}/{timestamp}_{random}.{ext}`
  - Must be public for AI API access
  
- **avatars**: Stores user profile pictures
  - Filename format: `{userId}/avatar.{ext}`
  - Uses `upsert: true` to replace existing avatar

**Important**: Storage policies allow authenticated users to upload/delete their own files. Public read access is required for both buckets.

### API Routes Structure

All API routes follow this pattern:

1. Create server Supabase client with cookie handlers
2. Authenticate user via `supabase.auth.getUser()`
3. Return 401 if unauthorized
4. Perform database operations (RLS automatically filters by user)
5. Return JSON response

Example authentication check:
```typescript
const { data: { user }, error: authError } = await supabase.auth.getUser();
if (authError || !user) {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}
```

## Key Technical Decisions

### Why @supabase/ssr?

The older `@supabase/auth-helpers-nextjs` is deprecated. `@supabase/ssr` provides better Next.js 14 App Router support with proper cookie handling.

### Why Base64 for AI Images?

GitHub Models API cannot fetch images from external URLs (returns "Failed to download image" error). Converting to base64 data URLs solves this limitation.

### Why ASCII-Only Filenames?

Non-ASCII characters (e.g., Chinese) in filenames cause "Cannot convert argument to a ByteString" errors when passed to OpenAI SDK. Using MIME type to determine extension avoids this issue.

### Why Lazy Client Creation?

Creating Supabase clients at module level causes build-time errors because environment variables aren't available during build. Always create clients inside functions.

## Common Issues and Solutions

### "Bucket not found" Error

Storage buckets must be manually created in Supabase Dashboard. SQL cannot create buckets - only policies.

### "Failed to extract events from image"

1. Check `GITHUB_TOKEN` is set in Vercel environment variables
2. Verify token has access to GitHub Models (test with `gh auth token`)
3. Ensure image is converted to base64 before sending to API
4. Check Vercel Runtime Logs for detailed error messages

### "Invalid redirect URL" Error

Add the redirect URL to Supabase → Authentication → URL Configuration → Redirect URLs. Must include full URL with protocol.

### Old Data with Encoding Issues

If schedules created before filename fix still have encoding errors, delete them:
```sql
DELETE FROM schedules WHERE created_at < 'YYYY-MM-DD';
```
Storage files must be deleted manually via Dashboard (SQL deletion is blocked).

## Testing AI Functionality

To test AI image extraction:

1. Ensure `GITHUB_TOKEN` is configured in Vercel
2. Create NEW schedule (don't reuse old ones with encoding issues)
3. Upload schedule/timetable image
4. AI should extract events and display them
5. Check browser console and Vercel logs if errors occur

## Deployment

Automatic deployment via Vercel on push to `master` branch.

**After adding environment variables in Vercel**, you MUST redeploy (Deployments → ... → Redeploy) for changes to take effect.

## Documentation Files

- `EMAIL_SETUP.md` - Supabase email configuration for password reset
- `GOOGLE_OAUTH_SETUP.md` - Google OAuth setup instructions
- `STORAGE_SETUP.md` - Storage bucket and policy configuration
- `TROUBLESHOOTING.md` - Common email and authentication issues
- `DELETE_USER_GUIDE.md` - How to delete test users and data
- `cleanup-old-data.sql` - SQL scripts for cleaning test data
- `PROJECT_STATUS.md` - Feature completion status (100%)
- `COMPLETION_SUMMARY.md` - Detailed project summary

## Code Style Notes

- Coffee theme colors: `#8D6E63` (primary), `#2C1810` (dark), `#FAF7F2` (background)
- Use `toast` from `react-hot-toast` for user notifications
- Loading states use `LoadingSpinner` component
- All forms validate before submission
- Error messages are user-friendly, not technical
