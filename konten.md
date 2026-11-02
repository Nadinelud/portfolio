# Portfolio Content — Nadine Kay Ludony

> Source of truth for the portfolio website. All website text must come from this file.
> Lines marked **[TODO]** still need to be filled in. Never invent content for them;
> show a visible placeholder on the website instead.

---

## 1. Website goals

- **Purpose:** portfolio for internship applications
- **Positioning:** a student who designs and builds interfaces, with an interest in AI.
  Do NOT use the words "machine learning" or "ML" anywhere on the site; say "AI" instead.
  AI is a supporting point, not the main highlight.
- **Audience:** recruiters and engineers who skim the page in about 30 seconds
- **Language:** English
- **Must have:** single page, responsive on mobile, fast to load, every link working,
  project visuals visible without clicking
- **Stack:** React + Vite + Tailwind CSS
- **Hosting:** GitHub Pages. Repository name: `portofolio`, so the site lives at
  https://nadinelud.github.io/portofolio/ (Vite `base: '/portofolio/'`; every asset path must
  work under that base). Deploy automatically with a GitHub Actions workflow on every push to `main`.
- **Feel:** NOT a plain template. Interactive and dynamic, but no 3D (see section 6)

---

## 2. Personal info

- **Name:** Nadine Kay Ludony
- **Nickname:** Din
- **Status:** 5th-semester Informatics student at Universitas Multimedia Nusantara (UMN), Tangerang, Indonesia
- **Email:** nadineludony@gmail.com
- **GitHub:** https://github.com/Nadinelud
- **LinkedIn:** https://www.linkedin.com/in/nadineludony/
- **CV:** `assets/cv.pdf` [TODO: not ready yet — hide the Download CV button until the file exists]
- **Photo:** `assets/photo.jpg` [TODO: optional]

### Hero tagline

"Student developer at UMN, building web apps and AI projects."

### About

I'm a 5th-semester Informatics student at Universitas Multimedia Nusantara who enjoys working on both
sides of a product: the interface people use, and the AI that can make it smarter. I like
keeping things simple, practical, and pleasant to use.

I'm currently looking for an internship where I can learn from a real team and contribute
to real products. [TODO: optional — add the role and start date, e.g. "Frontend or UI
internship, available from February 2027"]

---

## 3. Projects (in display order)

All four are team projects. Every card must show a clear "My role" line.

### 3.1 ReLa — Volunteer care for elderly people living alone

- **Type:** Hackathon project, Android app, team of 4
- **Event:** Hackathon JOINTS UGM 2026, Healthcare track (do not mention a result)
- **One-liner:** Connects families who live far away with community volunteers through
  foundations, so elderly people living alone get regular visits and families stay informed.
- **How it works (short):**
  - **Family:** registers the elder, accepts a suggested volunteer, follows the elder's
    condition through charts and history, approves visit schedules
  - **Volunteer:** sees schedules per elder and a home timeline, tells the story of each visit
    by typing or voice; AI pulls out key points which the volunteer checks before saving;
    emergency button that alerts family and foundation
  - **Foundation:** verifies volunteers, matches them with elders, follows up on reports
- **My role:** Designed the UI for the **Foundation** and **Volunteer** roles in Figma,
  then turned the designs into the app with AI-assisted coding.
- **Tech (project):** Flutter, Supabase, Google Gemini, Firebase Cloud Messaging
- **Tech (mine):** Figma, UI design, AI-assisted development
- **Highlights:**
  - 3 user roles, each with its own interface
  - 145 Flutter tests + 52 server unit tests
  - Volunteer suggestions based on skills, distance, and workload
- **Links:**
  - Repository: https://github.com/AltoDevv/rela-submission
  - Release / APK: https://github.com/AltoDevv/rela-submission/releases/tag/v1.0.1
  - Figma design: https://www.figma.com/design/x5Vf2BRLgWW5eUmgErV1ul/TemanSenja-%E2%80%94-Prototype?node-id=1-5
    (show as "View design in Figma"; the file must be shared as "Anyone with the link can view")
- **Visuals:** see section 5

---

### 3.2 UMN Festival 2026 — Official festival website

- **Type:** Live public website, team project
- **One-liner:** Official website of UMN's biggest annual festival: concerts, sports and
  esports competitions, exhibitions, and social events.
- **My role:** Built the **Events** page, which shows all the events happening at UFEST:
  Unveiling (opening), Ulympic and E-Ulympic (competitions), U-Care (social activities),
  and Unify (the closing peak event).
- **Tech:** JavaScript, CSS, HTML
- **Highlights:**
  - Public, live website used by the campus community
- **Links:**
  - Website: https://umnfestival.com/
  - Events page: https://umnfestival.com/event
  - Repository: private, do not link
- **Visuals:** see section 5 (save them now — event sites often get replaced next year)

---

### 3.3 WEMEN — Cozy pixel life-sim game

- **Type:** Browser game, team final project
- **One-liner:** A cozy 2D pixel life-sim game with a snake mini game.
- **My role:** Built the snake mini game, designed the UI, and implemented parts of the game logic.
- **Tech:** React, JavaScript, CSS, Vite, deployed on GitHub Pages
- **Highlights:**
  - Playable directly in the browser, no install
- **Links:**
  - Play: https://mikaelgeraldius.github.io/UAS-WEMEN/
  - Repository: https://github.com/mikaelgeraldius/UAS-WEMEN
- **Visuals:** see section 5

### 3.4 Song Mood Classifier — AI project

- **Type:** University final project, group of 5, UMN
- **One-liner:** An AI model that predicts a song's mood (sad, happy, energetic, or calm)
  from its audio features, like energy and tempo.
- **My role:** Built and trained the AI model.
  Web demo built by a teammate (Mikael Geraldius Gunawan).
- **Dataset:** almost 278,000 songs —
  [278k Emotion Labeled Spotify Songs (Moodify)](https://baselight.app/u/kaggle/dataset/abdullahorzan_moodify_dataset)
- **Tech:** Python
- **Highlights:**
  - 92% accuracy on songs the model had never seen
  - Interactive live demo, try it in the browser
- **Links:**
  - Live demo: https://mikaelgeraldius.github.io/mood-classifier/
  - Repository: https://github.com/mikaelgeraldius/mood-classifier
- **Visuals:** see section 5

---

## 4. Skills

Shown as grouped tags. Only skills used in the projects above.

- **Frontend:** React, JavaScript, HTML, CSS, Tailwind CSS, responsive design, Vite
- **UI design:** Figma, designing interfaces for multiple user roles
- **AI:** Python, training and testing an AI model
- **Tools:** Git, GitHub, GitHub Pages, AI-assisted development
- **Working style:** teamwork in 4–5 person teams, building under hackathon time pressure

---

## 5. Visual assets (ready in `assets/`)

| Project | File | What it shows | Use |
|---|---|---|---|
| ReLa | `rela/volunteer-home-design.webp` | Volunteer home screen, Figma design | Card cover (main image) |
| ReLa | `rela/foundation-home.webp` | Foundation dashboard, real app | Gallery |
| ReLa | `rela/foundation-volunteers.webp` | Foundation volunteer list, real app | Gallery |
| ReLa | `rela/foundation-volunteer-profile.webp` | Volunteer profile seen by foundation | Gallery |
| UMN Festival | `umnfest/events-unveiling.webp` | Unveiling event card on the Events page | Card cover |
| UMN Festival | `umnfest/events-header.webp` | Events page header | Gallery |
| UMN Festival | `umnfest/events-countdown.webp` | Countdown to U-Care | Gallery |
| WEMEN | `wemen/snake.mp4` + `wemen/snake-poster.webp` | Snake mini game (Din's part) | Card cover: video, muted, loop, plays on hover / when visible |
| WEMEN | `wemen/gameplay.mp4` + `wemen/gameplay-poster.webp` | Walking around the game world | Gallery |
| WEMEN | `wemen/title-screen.webp` | Title / character select screen | Gallery |
| Mood Classifier | `mood/hero.webp` | Demo page with a mood prediction | Card cover |
| Mood Classifier | `mood/sliders.webp` | Feature sliders and prediction | Gallery |

Phone screenshots (ReLa) are tall: show them inside a simple phone-shaped frame, side by side.
Videos: always `muted`, `playsinline`, `loop`, with the poster image, and no autoplay when
the user prefers reduced motion.

Still missing: `cv.pdf` (later), optional `photo.jpg`.

---

## 6. Design direction (for Claude Code)

- Must not look like a template; the site itself is proof of UI skill
- **No 3D.** Make it interactive and dynamic instead:
  - Hero background that reacts to the mouse (and to touch on phones)
  - Smooth scrolling (Lenis) and scroll-based reveals (GSAP or Motion), kept subtle
  - Project cards: visual first, then title, one-liner, my role, tech tags, links;
    slight tilt or lift on hover, GIF plays on hover
- **Colors (final): "Forest + butter", dark theme only**
  - Background: #0E2B26 (forest green)
  - Card / raised surface: #133731
  - Lines and borders: #1F4239
  - Main text: #E3F4EC
  - Muted text: #9BB8AE
  - Accent: #F3E3A0 (butter yellow) — buttons, links, highlights only; text on accent buttons uses #0E2B26
  - Do not add any other accent color. No orange anywhere.
- **Font (final):** Syne for everything (Google Fonts). Headings weight 700, body weight 500,
  generous line height for body text so it stays easy to read
- **Avoid "AI-looking" design:** no purple/blue gradients, no neon glow, no glassmorphism,
  no emoji icons, no generic stock illustrations. One accent color only, lots of white space,
  real project screenshots do the talking
- **Performance rules:** respect "reduced motion" settings, all text readable even if
  animations fail, fast on phones
- Must look good on a phone screen
