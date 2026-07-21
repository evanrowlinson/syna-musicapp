# SYNA

**Your mood. Your music. Your art.**

SYNA is a mood-based music and art experience built with React. You describe how you're feeling — in your own words, with your favorite artists, genres, energy level, and occasion — and SYNA generates a complete aesthetic experience around that moment: an AI-curated playlist, a unique AI-generated cover art image, and a slideshow of real historical artwork from museum collections that shares the same emotional register.

Streaming platforms recommend based on what you've listened to before. SYNA responds to how you feel *right now*, and connects that feeling to centuries of visual art you'd otherwise only encounter in a museum.

**Live app:** https://synamusic.netlify.app

**Course:** MIST 7571E — Client Side Development with AI | Group 2
**Team:** Tyra Bertrand, Amber Blackmon, Ben Lee, Kamsi Okpala, Evan Rowlinson

---

## How It Works

1. The user fills out the mood form: a free-text mood description, favorite artists, genre selections, energy level, occasion, and a "discovery" slider controlling how adventurous the recommendations should be.
2. On submit, a single GPT call (via our serverless proxy) returns three things at once: the playlist, a tailored DALL-E prompt for the cover art, and a set of museum artwork selections matching the mood.
3. Two calls then fire in parallel: DALL-E 3 generates the cover art, and the museum API fetches the selected artworks and their metadata.
4. The results render together — playlist, cover art, and an auto-advancing artwork slideshow.
5. The user can save the full experience to localStorage and revisit it across sessions.

## API Integrations

| API | Purpose | How it's called |
|---|---|---|
| OpenAI Chat Completions (GPT) | Generates the playlist, the DALL-E prompt, and museum artwork selections in a single structured call | Via Netlify serverless function `/.netlify/functions/chat-proxy` |
| OpenAI DALL-E 3 | Generates unique cover art for each session | Via Netlify serverless function `/.netlify/functions/image-proxy` |
| Museum API (Met Museum) | Fetches real historical artwork images and metadata | Called directly from the client (public API, no key required) |

**Security:** The OpenAI API key never appears in client code or this repository. All OpenAI calls route through Netlify serverless functions, and the key lives exclusively in a Netlify environment variable.

## Component Hierarchy

```
App.jsx                      — global state only (no API calls or business logic)
├── Header.jsx               — title, tagline, session reset
├── SYNAForm.jsx             — controlled mood inputs + validation + submit
└── ResultsContainer.jsx     — evaluates loading/error flags, renders the right view
    ├── LoadingSpinner.jsx   — animated indicator with contextual copy
    ├── ErrorMessage.jsx     — identifies which API call failed
    ├── CoverArt.jsx         — DALL-E image with download button
    ├── PlaylistDisplay.jsx  — maps playlist into cards, Save Experience button
    │   └── PlaylistCard.jsx — song title, artist, AI justification
    ├── ArtSlideshow.jsx     — auto-advancing artwork slideshow
    │   └── ArtSlide.jsx     — artwork image, title, artist, period, credit
    └── SavedExperiences.jsx — saved sessions restored from localStorage

Custom hooks:
├── usePlaylist              — GPT call, loading/error state, structured response parsing
└── useArtGen                — DALL-E call, loading/error state, returns image URL

Serverless functions (netlify/functions/):
├── chat-proxy.js            — proxies GPT requests, holds no key in source
└── image-proxy.js           — proxies DALL-E requests, holds no key in source
```

## Local Setup

**Prerequisites:** Node.js 18+ and npm.

1. Clone the repository:
   ```bash
   git clone https://github.com/evanrowlinson/syna-musicapp.git
   cd syna-musicapp
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the project root with your own OpenAI API key:
   ```
   OPENAI_API_KEY=sk-your-key-here
   ```
   This file is git-ignored and never committed. You need your own key from [platform.openai.com](https://platform.openai.com).

4. Run the dev server **with the Netlify CLI** (not plain `npm run dev` — the serverless functions won't be available otherwise):
   ```bash
   npx netlify dev
   ```

5. Open the URL the CLI prints (typically `http://localhost:8888`).

## Deployment

The app deploys automatically to Netlify on every push to `main`. Build settings live in `netlify.toml` (Vite build to `dist`, functions in `netlify/functions`, SPA redirect rule). The OpenAI key is configured as a Netlify environment variable scoped to builds and functions.
