# Next.js New Tube

> A modern, full-stack starter for building a YouTube-style video platform with Next.js, typed APIs, and a production-grade video pipeline.

## 👇 Problem statement

Building a video platform is deceptively hard. Beyond the UI, you need reliable uploads, background processing, adaptive streaming, thumbnails, a database schema that won’t crumble as features grow, and an authz model that keeps private videos private. Teams often reinvent this infrastructure from scratch, gluing together SDKs and CLIs with brittle scripts.

**Next.js New Tube** exists to remove that toil. It gives you a coherent, typed, and production-oriented foundation—so you can focus on product, not plumbing.

---

## ✨ Features

- **Fast, framework-native app** – Next.js App Router with TypeScript for a robust developer experience. ([GitHub][1])
- **Video pipeline ready** – Integration points for **Mux** (transcoding, streaming, thumbnails) and **UploadThing** (reliable uploads). ([GitHub][1])
- **Type-safe server APIs** – **tRPC** for end-to-end types from client to server. ([GitHub][1])
- **Typed data layer** – **Drizzle ORM** for schema-first migrations and SQL you can reason about. ([GitHub][1])
- **Clean, modern UI** – **Tailwind CSS** + **shadcn/ui** components for accessible, consistent styling. ([GitHub][1])
- **Ready to ship** – First-class **Vercel** deploys out of the box (demo URL already configured in the repo’s “About”). ([GitHub][1])

> Note: The repository was bootstrapped with `create-next-app`, so standard Next.js conventions apply. ([GitHub][1])

---

## 🧱 Tech stack

- **Frontend & runtime:** Next.js (App Router), React, TypeScript
- **Styling & UI:** Tailwind CSS, shadcn/ui
- **APIs:** tRPC (type-safe RPC)
- **Data:** Drizzle ORM (+ your SQL database)
- **Uploads & video:** UploadThing (uploads), Mux (encoding/streaming)

---

## 🗺️ Architecture at a glance

```text
Client (Next.js app)
   │
   ├─ UI: Tailwind + shadcn/ui
   │
   ├─ tRPC router (server actions / API routes)
   │         │
   │         ├─ Drizzle ORM  ──► SQL database
   │         │
   │         └─ UploadThing ──► (file intake) ─┐
   │                                           │
   └──────────────────────────────────────────► Mux (ingest → encode → HLS/MP4)
                                               │
                                       Player embeds / thumbnails
```

---

## 🚀 Getting started

### Prerequisites

- Node.js 20+ (or Bun if you prefer)
- A SQL database (PostgreSQL recommended)
- Accounts/keys for:

  - **Mux** (for video processing/streaming)
  - **UploadThing** (for uploads)

### 1) Install dependencies

```bash
# with bun
bun install

# or with pnpm
pnpm install

# or with npm
npm install
```

### 2) Configure environment variables

Create a `.env.local` file at the project root:

```bash
# Database
DATABASE_URL="postgresql://USER:PASS@HOST:PORT/DB_NAME"

# Mux (example names; use your dashboard values)
MUX_TOKEN_ID="..."
MUX_TOKEN_SECRET="..."
MUX_WEBHOOK_SECRET="..."          # if you handle webhooks

# UploadThing (example names)
UPLOADTHING_SECRET="..."
UPLOADTHING_APP_ID="..."
```

> The exact variable names can differ based on how you wire services in your code. Check the integration files and `drizzle.config.ts` for specifics.

### 3) Database setup

Run your Drizzle migrations (commands depend on how the repo is configured):

```bash
# Common patterns (pick the one your project uses)
# bunx drizzle-kit push
# npx drizzle-kit push
# pnpm drizzle:push
```

### 4) Start the dev server

```bash
# bun
bun dev

# or
pnpm dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## 🧪 Scripts (typical)

```jsonc
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

> Exact scripts may vary slightly—check `package.json` in your repo.

---

## 📦 Deployment

- **Vercel** is the default target for Next.js apps; connect your repo and set the env vars in the project settings. ([GitHub][1])
- Make sure **MUX** and **UPLOADTHING** environment variables are configured for the Production environment.
- Ensure your database is reachable from the deployment (use managed Postgres or Vercel Postgres/Supabase).

---

## 🧭 Roadmap (suggested)

- [ ] Public/Unlisted/Private video visibility
- [ ] Channel pages & subscriptions
- [ ] Search & categories/tags
- [ ] Likes, comments, and watch history
- [ ] Playlists & queues
- [ ] Creator analytics (views, retention, CTR)
- [ ] Webhooks for Mux status updates + background jobs
- [ ] E2E tests (Playwright) + unit tests (Vitest)

---

## 🤝 Contributing

1. Fork the repo and create a feature branch.
2. Keep PRs focused (one feature/fix per PR).
3. Add tests where it makes sense.
4. Describe **what** and **why** in the PR body.

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

---

## 📚 References

- Repo topics (stack used): Next.js, TypeScript, Mux, Tailwind, tRPC, shadcn/ui, Drizzle ORM, UploadThing. ([GitHub][1])
- Repo bootstrapped with `create-next-app`; Vercel deployment is first-class. ([GitHub][1])

---

[1]: https://github.com/zntb/nextjs-new-tube 'GitHub - zntb/nextjs-new-tube'
