# Mountain Insulation

Next.js (App Router) + Tailwind + Payload CMS + Supabase.

## Repo layout
- `apps/web`: Next.js app (public site, portal, admin, CMS)
- `supabase/migrations`: Postgres migrations applied to Supabase
- `env.example`: environment variable template (copy to `.env.local`)

## Local setup
1. Copy environment template:

```bash
cp env.example apps/web/.env.local
```

2. Fill in values in `apps/web/.env.local` (do not commit).
3. Install and run:

```bash
cd apps/web
npm install
npm run dev
```

## Key URLs
- Public site: `/`
- Quote wizard: `/quote`
- Customer portal: `/portal` (requires login)
- Staff admin: `/admin` (requires `profiles.role` = `staff` or `admin`)
- Payload CMS admin: `/cms`
- Payload REST API: `/api/payload/*`
- Payload GraphQL: `/api/payload/graphql`

