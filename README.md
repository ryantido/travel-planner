This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# Velora – Travel beautifully

Velora helps you plan, document, and share your journeys with clean itineraries, interactive maps, and a delightful UI.

## Features
- Trips and itineraries: Create trips and manage locations with drag-and-drop.
- Interactive maps: Visualize destinations in context.
- GitHub sign-in: Simple and secure authentication.
- Modern stack: Next.js App Router, Prisma, TypeScript, Tailwind.

## Tech Stack
- Framework: Next.js (App Router)
- DB/ORM: PostgreSQL + Prisma
- Auth: NextAuth with GitHub provider
- Styling: Tailwind CSS
- Maps/Geocoding: LocationIQ

## Prerequisites
- Node.js 18+
- PostgreSQL database
- GitHub OAuth app credentials (for NextAuth)
- LocationIQ API key

## Getting Started

### 1) Install dependencies
```
pnpm install
# or: npm install / yarn / bun
```

### 2) Configure environment
- Copy `.env.example` to `.env.local` and fill secrets:
```
cp .env.example .env.local
```

Required keys:
- `DATABASE_URL`
- `NEXTAUTH_SECRET`
- `AUTH_GITHUB_ID`, `AUTH_GITHUB_SECRET`
- `NEXT_PUBLIC_LOCATION_IQ_API_KEY`
- `NEXT_PUBLIC_SITE_URL`

### 3) Database
```
pnpm prisma migrate dev
```

### 4) Run the dev server
```
pnpm dev
```
Open http://localhost:3000

## Project Scripts
- `pnpm dev`: Start development server
- `pnpm build`: Production build
- `pnpm start`: Start production server
- `pnpm prisma migrate dev`: Run migrations
- `pnpm prisma studio`: Open Prisma Studio

## Architecture Notes
- App Router in `app/`
- API routes under `app/api`
- Prisma schema in `prisma/schema.prisma`
- UI components in `components/`

## Authentication
- NextAuth with GitHub provider: set `AUTH_GITHUB_ID` and `AUTH_GITHUB_SECRET`.
- Set `NEXTAUTH_SECRET` in `.env.local`.

## Fonts and Design
- `next/font/google` with Inter (sans) and Roboto Mono (mono).
- `globals.css` expects variables `--font-geist-sans` and `--font-geist-mono`, which are provided by `app/layout.tsx`.

## Metadata and SEO
- `app/layout.tsx` exports metadata (title templates, Open Graph, Twitter card, theme colors).
- Set `NEXT_PUBLIC_SITE_URL` for absolute URLs.
- OG/Twitter images default to `/placeholder.jpg`; you can add `public/og-image.png` and adjust `layout`.

Optional:
- robots and sitemap: add `app/robots.ts` and `app/sitemap.ts` to improve indexing. Ask a maintainer if you want these generated.

## Contributing
Branching model:
- Code/features/SEO: use a semantic branch name, e.g. `feat/landing-page`, `chore/seo`, `fix/delete-trip`
- Documentation: use a `doc/` branch, e.g. `doc/readme-revamp`

Pull Requests:
- Keep changes scoped and tested
- Include screenshots for UI changes when relevant

## Legacy notes
This project was bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).
For reference, the original quickstart instructions follow.

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
