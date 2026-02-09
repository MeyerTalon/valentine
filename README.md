# 💕 Valentine's Day Website

A cute, interactive Valentine's Day site built with Next.js: collect a name, ask “Will you be my Valentine?”, and celebrate with confetti and an optional email notification.

## Features

- **Screen 1 – Name:** Soft pink/red theme, floating hearts, “What’s your name?” input and submit.
- **Screen 2 – The question:** “Will you be my Valentine, [Name]?” with a prominent **Yes! 💕** button and a **No** button that playfully runs away from the cursor (stays in viewport).
- **Screen 3 – Thanks:** Celebration animation (hearts + confetti), thank-you message, and email notification when they say yes.

## Tech Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Resend** for sending the “they said yes!” email

## Setup

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Environment variables**

   Copy the example env file and fill in your values:

   ```bash
   cp .env.example .env
   ```

   - `RESEND_API_KEY` – [Resend](https://resend.com) API key.
   - `VALENTINE_NOTIFICATION_EMAIL` – Email that receives the notification when someone says yes.
   - Optional: `RESEND_FROM_EMAIL` – Verified sender in Resend (defaults to Resend’s onboarding address).

3. **Run locally**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

## Deploy on Vercel

1. Push the repo to GitHub and import the project in [Vercel](https://vercel.com).
2. In the project **Settings → Environment Variables**, add:
   - `RESEND_API_KEY`
   - `VALENTINE_NOTIFICATION_EMAIL`
   - (Optional) `RESEND_FROM_EMAIL`
3. Deploy; the existing `vercel.json` and Next.js config are already set for Vercel.

If the env vars are missing, the site still works; the “they said yes!” email is simply skipped and a friendly message is shown.

## Scripts

- `npm run dev` – Development server
- `npm run build` – Production build
- `npm run start` – Run production build
- `npm run lint` – Run ESLint
