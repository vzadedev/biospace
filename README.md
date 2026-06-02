# BioSpace AI

Responsive web MVP for biophilic room redesign using AI. Built with Next.js (App Router), TypeScript, and Tailwind CSS.

## Features

- **Home** — Greeting, new project CTA, recent projects from `localStorage`
- **Create project flow** — Upload photo → style → mood → AI generation
- **Result** — Before/after slider, save & share
- **Suggestions** — Mock plant recommendations
- **Project items** — Shopping list with quantity controls
- **Persistence** — Projects saved in `localStorage` (no auth, no database)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Optional: AI generation

Copy `.env.example` to `.env.local` and add your OpenAI API key:

```bash
cp .env.example .env.local
```

Set `GOOGLE_API_KEY` (Google AI Studio) or `OPENAI_API_KEY` in `.env.local`. Without a key, the app runs in demo mode (same photo as "after").

## Deploy na Vercel

### Opção A — GitHub (recomendado)

1. Crie um repositório no GitHub e envie o código:
   ```bash
   git add .
   git commit -m "BioSpace AI MVP"
   git remote add origin https://github.com/SEU_USUARIO/biospace.git
   git push -u origin master
   ```
2. Acesse [vercel.com/new](https://vercel.com/new) e importe o repositório.
3. Framework: **Next.js** (detectado automaticamente).
4. Em **Environment Variables**, adicione:
   - `GOOGLE_API_KEY` = sua chave do [Google AI Studio](https://aistudio.google.com/apikey)
5. Clique em **Deploy**.

### Opção B — CLI

```bash
npm i -g vercel
vercel login
vercel
```

Na primeira vez, siga o assistente. Depois, para produção:

```bash
vercel --prod
```

Configure a variável de ambiente:

```bash
vercel env add GOOGLE_API_KEY
```

Escolha **Production**, cole a chave e faça redeploy (`vercel --prod`).

### Notas

- `.env.local` **não** sobe para a Vercel — use o painel ou `vercel env`.
- A rota `/api/generate` usa `maxDuration = 60` (Gemini ~10–30s). No plano Hobby o limite pode ser 10s; se der timeout, use Pro ou otimize.
- Fotos muito grandes no upload podem falhar (limite ~4,5 MB no body da função serverless).

## Project structure

```
app/
  page.tsx                 # Home
  splash/page.tsx          # Splash screen (first visit)
  project/new/page.tsx     # Step 1: Upload
  project/preferences/     # Steps 2–3: Style & mood
  result/page.tsx          # Before/after + save
  project/[id]/page.tsx    # Saved project detail
  projects/page.tsx        # All projects
  suggestions/page.tsx     # Plant suggestions
  items/page.tsx           # Shopping list
  success/page.tsx         # Save confirmation
  api/generate/route.ts    # AI generation API

components/                # UI components
lib/
  storage.ts               # localStorage helpers
  flow.ts                  # Session flow state
  ai.ts                    # Client AI + prompt builder
  constants.ts             # Styles, moods, mock data
```

## Tech stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- react-compare-slider
- lucide-react

## Scripts

| Command        | Description          |
|----------------|----------------------|
| `npm run dev`  | Development server   |
| `npm run build`| Production build     |
| `npm start`    | Start production     |
| `npm run lint` | ESLint               |
