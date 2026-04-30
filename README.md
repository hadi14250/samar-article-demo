# Samar Article Demo

A React + Vite web app featuring a public cultural hub, resources section, and article pages, with a protected admin dashboard backed by Supabase.

## Tech Stack

- **React 19** with **React Router 7** for routing
- **Vite 8** for dev server and bundling
- **Tailwind CSS 4** for styling
- **Framer Motion** for animations
- **Swiper** for carousels
- **Supabase** for auth and data
- Deployed via **Vercel**

## Project Structure

```
src/
├── components/    # Navbar, Footer, HeroSection, ResourceTabs, etc.
├── context/       # AuthContext for Supabase auth state
├── lib/           # Supabase client and helpers
├── pages/         # Home, CulturalHub, Resources, ArticlePage, Contact
│   └── admin/     # AdminLogin, AdminDashboard (protected)
├── App.jsx        # Routes and layout
└── main.jsx       # Entry point
```

## Getting Started

### Prerequisites

- Node.js 18+
- A Supabase project

### Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env` and fill in your Supabase credentials:
   ```bash
   cp .env.example .env
   ```

3. Start the dev server:
   ```bash
   npm run dev
   ```

## Scripts

- `npm run dev` — start the Vite dev server
- `npm run build` — build for production
- `npm run preview` — preview the production build locally
- `npm run lint` — run ESLint

## Routes

| Path | Description |
| --- | --- |
| `/` | Home page |
| `/cultural-hub` | Cultural hub landing |
| `/resources` | Resource tabs and listings |
| `/articles/:slug` | Individual article view |
| `/contact` | Contact page |
| `/admin` | Admin login |
| `/admin/dashboard` | Protected admin dashboard |

## Deployment

The project includes a `vercel.json` and is configured for deployment on Vercel. Push to `main` to trigger a deploy.
