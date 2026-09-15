# Kvisl

**To attend is to inhabit.**

This repository is a clean-room rewrite of Kvisl for Vercel. It is intentionally independent of the previous implementation and contains no Cloudflare, OpenNext, or vinext deployment path.

## Stack

- Next.js App Router
- React + TypeScript
- PostgreSQL via `postgres`
- Vercel Blob for editorial images
- Resend HTTP API for publication emails
- Vercel Cron for scheduled-article newsletter catch-up

## Local setup

Use Node.js 24.

```sh
npm install
cp .env.example .env.local
npm run dev
```

For a fresh PostgreSQL database, apply `db/schema.sql`. If upgrading an existing installation created before the Kvisl rename, apply `db/migrate-to-kvisl.sql` once before deploying the new code. Set `DATABASE_URL`, `ADMIN_PASSWORD`, and an independent `ADMIN_SESSION_SECRET` of at least 32 random characters. Private access is at `/admin`.

## Vercel configuration

Import this repository as a standard Next.js project. Configure:

- `NEXT_PUBLIC_SITE_URL`
- `DATABASE_URL`
- `ADMIN_PASSWORD`
- `ADMIN_SESSION_SECRET`
- `BLOB_READ_WRITE_TOKEN`
- `RESEND_API_KEY`
- `NEWSLETTER_FROM`
- `CRON_SECRET`

`vercel.json` registers one daily cron. It retries publication emails for articles whose publication time has arrived but whose first-publish announcement has not completed. Editing an already announced article does not send another email.

## Publishing model

All public articles have the fixed umbrella category **Essay** and a custom topic such as History, Science, Politics, or Countries. Public labels render as `Essay / Topic`. The private editor stores the topic separately and supports draft/published status, UTC publication time, cover image, inline images, sources, and homepage featuring.

Newsletter subscriptions store only the email address needed for delivery. Unsubscribe deletes the local subscriber and linked delivery rows. Provider-side delivery/security logs are separate.

## Verification

```sh
npm test
npm run build
```
