This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

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

## Supabase Email Login Setup

If you cannot log in with email OTP, make sure your Supabase project is configured:

1. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` to `.env.local`.
   - The app connects to the Supabase database behind the URL in `NEXT_PUBLIC_SUPABASE_URL` (for example, `https://<your-project-ref>.supabase.co`).
   - If `NEXT_PUBLIC_SUPABASE_URL` is missing, the code falls back to `https://placeholder.supabase.co` (placeholder only).
2. In Supabase Dashboard, go to **Auth → Providers → Email** and enable:
   - **Email provider**
   - **Email signups**
3. In **Auth → Email Templates**, keep the OTP token (`{{ .Token }}`) in your sign-in email template, since this app verifies a 6-digit code on `/verify`.

You do **not** need to manually create users in Supabase Auth. Entering an email in the app creates the user on first sign in.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
