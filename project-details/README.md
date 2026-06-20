# Project Details & Technical Documentation

This directory contains key knowledge and architectural patterns of this project to help future developers and AI agents understand the codebase.

---

## 1. Tech Stack Overview
- **Framework**: Next.js 15 (App Router)
- **CMS**: Payload CMS 3.0 (Lexical rich-text editor)
- **Styling**: Custom CSS (`src/app/(frontend)/styles.css`) + Outfit & Inter typography
- **Production Server**: Deployed on **Netlify** (Serverless functions)

---

## 2. Multi-Database Setup (PostgreSQL & SQLite)
To allow zero-configuration local development while keeping a robust cloud database in production, `src/payload.config.ts` dynamically switches database adapters:

- **Production**: Connects to **Supabase PostgreSQL** via `DATABASE_URI` (configured on Netlify dashboard).
- **Localhost**: Connects to local **SQLite** (`file:./payload.db`) automatically when the `DATABASE_URI` variable does not start with `postgres`.

```typescript
const isPostgres = process.env.DATABASE_URI?.startsWith('postgres') || process.env.DATABASE_URI?.startsWith('postgresql')

export default buildConfig({
  // ...
  db: isPostgres
    ? postgresAdapter({
        pool: { connectionString: process.env.DATABASE_URI || '' },
        schemaName: 'payload',
      })
    : sqliteAdapter({
        client: { url: process.env.DATABASE_URI || 'file:./payload.db' },
      }),
})
```

---

## 3. Media Files Sourcing & Fallback
Since Netlify functions run in a stateless, read-only environment, standard runtime file uploads to the local filesystem are disabled.

We implemented a custom utility `src/utils/imageUrl.ts` to resolve media paths:
1. When dynamic CMS images are queried, they are resolved against static assets in `public/images/`.
2. **Normalizing filenames**: Seeding or re-seeding databases generates names like `healthcare-3.png`. The `normalizeFilename` function strips these numeric suffixes (`-3.png` -> `.png`) so they map directly to original static assets in `public/images/`.

```typescript
const normalizeFilename = (filename: string): string => {
  return filename.replace(/-[0-9]+(?=\.[a-z0-9]+$)/i, '');
};
```

---

## 4. Homepage Redesign & Brand Assets
The homepage layout and styles have been overhauled to match the official **ACT Grants** branding (`https://actgrants.in/`):

- **Branding**: Pink primary color (`#B30B7E`), custom Outfit font for headings, Inter for body.
- **Header**: Renders the official `act-logo.png` image with a clean design.
- **Local Assets**: All key images (logo, hero backgrounds, animated gifs like `boy.gif`, `globe.gif`, `heart.gif` for What ACT does cards) were downloaded from the live site and saved to `public/images/`.

### Interactive Client Components:
- **`InteractivePortfolio.tsx`**: Renders dynamic portfolios with sector filters and filters people/community members by Venture Capitalists, Startups & Strategy, Ecosystem, and Experts tabs.
- **`InteractivePathways.tsx`**: Renders toggleable panels showing different engagement pathways (Founder, Partner, Expert, Career seeker).

---

## 5. Local Development Commands
Run the following commands in the root directory:
```bash
# Install dependencies
npm install

# Run Next.js local development server (automatically uses SQLite)
npm run dev

# Seed local SQLite database with fresh mock data
npm run seed
```
