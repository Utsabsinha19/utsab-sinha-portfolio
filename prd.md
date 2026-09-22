# Product Requirements Document (PRD)
## Project: Utsab Sinha — AI/ML Engineer Portfolio & Systems Showcase

---

### Document Metadata
- **Project Title:** Utsab Sinha AI/ML Developer Portfolio & Systems Platform
- **Document Version:** 1.0.0
- **Target Audience:** Engineering Recruiters, Technical Hiring Managers, AI/ML Collaborators, End Users
- **Primary Technology Stack:** Next.js 16.3.0 (App Router), React 19.2.6, TypeScript 5.9.3, Tailwind CSS v4, Three.js / React Three Fiber, Framer Motion 13

---

## 1. Executive Summary & Product Vision

### 1.1 Product Vision
The Utsab Sinha Portfolio is an engineering-first personal brand platform designed to present Utsab Sinha as a high-caliber AI/ML engineer. Unlike typical generic developer portfolios consisting of static text and generic screenshot grids, this platform establishes immediate technical credibility through:
1. **Interactive 3D WebGL Neural Visualizations**: Demonstrating real-time 3D rendering and mathematical geometries.
2. **Client-Side Live ML & Computer Vision Lab**: Running browser-based image convolution filters (Sobel edge-detection, tone quantization) and lexical NLP models directly in the user's browser.
3. **Structured Architectural System Maps**: Moving beyond "skills lists" to show holistic pipeline flows from raw data ingestion to deployed inference.
4. **Cinematic Dark/Light "Cyber-Editorial" Aesthetic**: High-contrast, mathematically precise typography (Inter + JetBrains Mono), smooth micro-animations, spring-physics 3D cards, and dynamic custom cursor interactions.

### 1.2 Core Objectives
- **Demonstrate Real Engineering Depth**: Showcase genuine AI/ML architectures, quantitative metrics (e.g. 10,000+ posts processed, sub-100ms CNN latency, 0.88 ROC-AUC, 512K+ records).
- **Interactive Engagement**: Allow hiring managers to interact with live computer vision and NLP models right in the browser without server latency.
- **Conversion & Inquiries**: Provide seamless direct contact channels, instant resume access, verified credentials, and comprehensive project deep-dives.

---

## 2. Target Personas & User Journeys

### 2.1 Target Personas
1. **AI/ML Technical Recruiter / Talent Sourcer**
   - *Needs:* Rapid qualification (education, CGPA, graduation date, core technologies, internship pedigree, resume download).
   - *Journey:* Lands on Hero -> sees status "SYSTEM ONLINE" -> checks About section for CGPA (8.29/10), UEM Jaipur, internships (FlyRank AI, Twidix, Bluestock) -> clicks "Resume PDF" -> downloads verified resume.
2. **Staff / Principal AI Engineer & Hiring Manager**
   - *Needs:* Proof of actual problem solving, mathematical rigor, understanding of machine learning pipelines, code quality, and production readiness.
   - *Journey:* Reviews "Selected Systems" -> inspects system architecture flows (e.g. VADER/TextBlob -> LDA -> complaint detection) -> clicks "View Case Study" modal -> opens AI Lab -> tests interactive Ghibli & Sobel image filters and VADER sentiment analyzer.
3. **Potential Collaborator / Research Partner**
   - *Needs:* Assessing technical synergy in NLP, deep learning, computer vision, or embedded robotics.
   - *Journey:* Explores "The AI Stack" radial graph -> reviews "Process Methodology" -> navigates to Contact section -> sends a collaboration message.

---

## 3. System Architecture & Technical Stack

```
+-------------------------------------------------------------------------+
|                              Client Browser                             |
+-------------------------------------------------------------------------+
       |                                              |
       v                                              v
+-----------------------------+        +----------------------------------+
|      Next.js App Router     |        |      WebGL / Canvas Engine       |
|  - Layout (Inline Theme)    |        |  - Three.js / Fiber Neural Sphere|
|  - Page Composition         |        |  - HTML5 2D Sobel / CV Filter    |
|  - Custom Cursor & Physics  |        |  - Reactive Shaders & Geometry   |
+-----------------------------+        +----------------------------------+
       |                                              |
       +----------------------+-----------------------+
                              |
                              v
+-------------------------------------------------------------------------+
|                       Interactive State & Data                          |
|  - Static Portfolio Data (src/lib/data.ts)                              |
|  - Theme Context (LocalStorage + prefers-color-scheme)                  |
|  - In-Browser ML Engines (Lexical NLP + Tabular Scoring)                |
+-------------------------------------------------------------------------+
                              |
                              v
+-------------------------------------------------------------------------+
|                  [Unused / Orphaned Infrastructure]                     |
|  - PostgreSQL Pool (pg)                                                 |
|  - Drizzle ORM (/api/health route crashing if DB offline)               |
+-------------------------------------------------------------------------+
```

### 3.1 Frontend Stack Details
- **Next.js 16.3.0**: Leveraging React Server Components (RSC) and client boundary modules.
- **React 19.2.6 & React DOM 19.2.6**: Latest React runtime with modern hook paradigms.
- **Tailwind CSS v4.1.17**: CSS-first theming configured via `@theme` variables in `globals.css`.
- **Three.js 0.185.1 & @react-three/fiber 9.7.0 & @react-three/drei 10.7.8**: Declarative WebGL canvas, custom 3D scene graphs, mathematical Fibonacci vertex distributions, and camera parallax.
- **Framer Motion 13.0.0**: Spring-physics transitions, layout animations (`layoutId`), modal dialogs, and interactive gestures.
- **Lucide React 1.31.0**: Modern, optimized SVG icon set.

### 3.2 Backend & Data Layer (Current State)
- **Database Connection**: `pg` pool connecting to PostgreSQL database at `DATABASE_URL` (defaults to `postgres://localhost:5432/postgres`).
- **ORM**: Drizzle ORM 0.45.2.
- **API Endpoints**: `/api/health` performing `select 1` query.
- **Data Source for UI**: Statically imported TypeScript structure in `src/lib/data.ts` (projects, experience, education, capabilities, experiments).

---

## 4. How the Project Works (End-to-End Execution Flow)

### 4.1 Bootstrap & Zero-Flicker Theme System
1. **Head Script Execution**: Inside `src/app/layout.tsx`, an inline JavaScript snippet executes synchronously before DOM render:
   - Reads `localStorage.getItem('portfolio-theme')`.
   - Checks `window.matchMedia('(prefers-color-scheme: dark)').matches`.
   - Injects the `dark` or `light` class and `data-theme` attribute directly into `document.documentElement`.
   - This completely eliminates the Flash of Unstyled Content (FOUT).
2. **React ThemeProvider Hydration**: Mounts on the client, synchronizes React state with local storage, and attaches an event listener to OS color scheme changes if the theme is set to `system`.

### 4.2 Interactive 3D WebGL Neural Core
1. In `src/components/hero/Hero.tsx`, the component checks WebGL2 / WebGL hardware capability via offscreen canvas.
2. If available, `NeuralSphere.tsx` is dynamically imported and mounted inside a Suspense wrapper; otherwise, a CSS radial fallback is rendered.
3. In `NeuralSphere.tsx`:
   - Calculates 220 coordinate points distributed uniformly across a sphere surface using a Fibonacci golden spiral algorithm:
     $$\phi = \arccos\left(-1 + \frac{2i}{N}\right), \quad \theta = \sqrt{N\pi} \cdot \phi$$
   - Determines nearest-neighbor vertex pairs within threshold Euclidean distance ($d < 0.85$) and connects them with dynamic glowing lines.
   - Wraps the core in dual rotating orbital toruses with opposite angular velocities.
   - Attaches `MouseParallax` to smoothly lerp the camera position towards the pointer vector $(x, y)$ on every animation frame.

### 4.3 In-Browser Computer Vision & Image Processing Engine
1. In `src/components/ailab/AILab.tsx`, selecting the "Ghibli & Pencil Sketch Stylizer" allows user image upload via `FileReader` or uses the default profile asset.
2. The image is drawn onto an HTML5 `<canvas>` constrained to a maximum bounding box of $500 \times 500$ px.
3. **Pencil Sketch Mode (Sobel Convolution Filter)**:
   - Converts RGB pixels to Grayscale luminosity:
     $$Y = 0.299R + 0.587G + 0.114B$$
   - Convolves a $3 \times 3$ Sobel kernel across the image matrix to calculate horizontal gradient $G_x$ and vertical gradient $G_y$:
     $$G_x = \begin{bmatrix}-1 & 0 & 1\\ -2 & 0 & 2\\ -1 & 0 & 1\end{bmatrix}, \quad G_y = \begin{bmatrix}-1 & -2 & -1\\ 0 & 0 & 0\\ 1 & 2 & 1\end{bmatrix}$$
   - Computes gradient magnitude $M = \sqrt{G_x^2 + G_y^2} \times \text{factor}$, inverting the result to render pencil charcoal lines ($255 - M$).
4. **Studio Ghibli Anime Mode (Quantization & Color Grading)**:
   - Amplifies red and green channels ($+15\%$ and $+12\%$) while softly attenuating blue channels ($-8\%$) to emulate classic warm anime lighting.
   - Applies color posterization by quantizing RGB channels in 32-step buckets ($R = \lfloor R / 32 \rfloor \times 32$), creating cell-shaded artistic anime flats.

### 4.4 In-Browser NLP & Tabular Inference
1. **VADER Sentiment Engine**: Tokenizes input text into word stems, cross-references positive/negative lexical lexicons, computes compound polarity score $(-1.0 \text{ to } +1.0)$, and derives risk classifications (Low Risk, Moderate, Critical Brand Risk).
2. **Booking Behavior Predictor**: Computes real-time purchase intent probability using multi-feature weighting (lead time, price sensitivity, duration, extra baggage) and benchmarks against baseline ROC-AUC (0.88).

---

## 5. Exhaustive Feature Matrix & Detailed Specifications

| ID | Feature Name | Description | Status |
|---|---|---|---|
| **F-01** | Multi-Theme Engine | Light Pearl, Deep Dark, and System Auto-detection with zero-flicker script | Working |
| **F-02** | 3D WebGL Neural Core | 220-point Fibonacci sphere with dynamic vertex line mesh and mouse parallax | Working |
| **F-03** | Auto-Scrolling Tech Marquee | Infinite animated ticker of 15+ engineering technologies with pause-on-hover | Working |
| **F-04** | Project Case Studies | Interactive 3D tilt cards showcasing 5 major projects with architectural flows and metrics | Working |
| **F-05** | Deep Case Study Modal | Detailed modal dialog with problem/solution, metrics, stack, and escape key listener | Working |
| **F-06** | Interactive AI Stack Graph | Radial SVG graph showing 6 AI/ML domains connected to central engineering node | Working |
| **F-07** | Client-Side CV Studio | Real-time Sobel edge detection & Ghibli tone mapping on HTML5 Canvas | Working |
| **F-08** | Client-Side NLP Analyzer | Real-time sentiment classification with compound score and token-level breakdown | Working |
| **F-09** | Client-Side Booking Predictor | Interactive feature vectors and purchase probability estimation | Working |
| **F-10** | Unimplemented Lab Demos | Biometric Face Recognition & Embeddings/Intent Classifier | **Incomplete / Stubbed** |
| **F-11** | Methodology Loop | 7-stage ML process timeline with scroll-spy progress tracking | Working |
| **F-12** | Chronological Journey | Expandable accordion timeline of internships and leadership milestones | Working |
| **F-13** | Profile & Technical Matrix | Academic profile, CGPA, photo frame, and 5-category interactive capability matrix | Working |
| **F-14** | Direct Contact Form | Name/email/message inputs with regex validation | **Flawed (Fake Submit)** |
| **F-15** | Direct Social/Mail Badges | Clickable links to Email, Phone, LinkedIn, and GitHub | Working |
| **F-16** | Context-Aware Custom Cursor | Blend-mode cursor dot and ring displaying contextual actions (OPEN, GO, EXPLORE) | Working |
| **F-17** | Spring Physics 3D Tilt Cards | Dynamic perspective rotation based on mouse coordinates | Partially Broken Spotlight |
| **F-18** | Health Check API (`/api/health`) | Endpoint verifying system health | **Failing (Requires Postgres)** |

---

## 6. Comprehensive Flaw, Bug & Technical Debt Audit

### 6.1 Critical Severity Flaws (Must Fix)

#### Flaw 1: Disconnected PostgreSQL Dependency & Crashing `/api/health` Route
- **Location:** `src/app/api/health/route.ts`, `src/db/index.ts`, `drizzle.config.json`
- **Issue:** The project includes Drizzle ORM and a `pg` pool connecting to `postgres://localhost:5432/postgres`. The health check route executes `await db.execute(sql'select 1')`.
- **Impact:** When deployed to standard serverless platforms (Vercel, Cloudflare, Netlify) without an active Postgres instance, calling `/api/health` immediately crashes and returns HTTP 500. Furthermore, `src/db/schema.ts` is completely empty (`export {};`). The database is entirely unused across the application.
- **Recommendation:**
  - *Option A (Static / Serverless Portfolio):* Remove `src/db/`, `drizzle.config.json`, and database dependencies (`pg`, `drizzle-orm`, `drizzle-kit`). Make `/api/health` return `{ status: "healthy", timestamp: new Date() }`.
  - *Option B (Full-stack Data Persistence):* Define a `messages` table in `src/db/schema.ts` and use the database to store contact form submissions.

#### Flaw 2: Fake Contact Form (Silent Data Loss for Recruiters)
- **Location:** `src/components/contact/Contact.tsx` (Lines 33–41)
- **Issue:** When the user fills out the contact form and clicks "Send Message", the handler only performs client-side validation, resets state, and displays "Thank you! Message captured successfully".
- **Impact:** The message is never sent to any backend endpoint, email service (e.g. Resend, SendGrid, Formspree), or database. High-value hiring inquiries and recruiter messages are permanently and silently lost.
- **Recommendation:** Implement a real Next.js Server Action or route handler at `src/app/api/contact/route.ts` that dispatches an email via Resend / SendGrid or saves the message to a database.

---

### 6.2 High Severity Flaws

#### Flaw 3: Incomplete / Stubbed-Out AI Lab Experiments
- **Location:** `src/components/ailab/AILab.tsx` (Lines 681–687)
- **Issue:** The lab defines 5 experiments in `data.ts`, but the interactive UI only branches on `gibli-sketch`, `sentiment`, and `prediction`. When a visitor clicks "Biometric Face Recognition" (`classifier`) or "Embeddings & Intent Classifier" (`rag`), the UI renders a static text string with no interactive controls.
- **Impact:** Undermines the credibility of the "Interactive ML Playground" when 40% of the listed models fail to offer interactive demonstrations.
- **Recommendation:**
  - For `classifier`: Add a simulated webcam biometric scanner with face detection landmark overlays and real-time latency benchmark counters.
  - For `rag`: Add an interactive semantic vector search query simulator where users can type a query and visualize cluster distance matching.

#### Flaw 4: Broken Spotlight Animation in `Tilt3DCard.tsx`
- **Location:** `src/components/ui/Tilt3DCard.tsx` (Lines 36–37, 81–84)
- **Issue:** `spotlightX` and `spotlightY` are MotionValues, but inside `<motion.div style={{ background: ... }}>`, the code calls `spotlightX.get()` and `spotlightY.get()`.
- **Impact:** Calling `.get()` evaluates the value once at render time (returning `"50% 50%"`). As the user moves their mouse over the card, the spotlight gradient does NOT follow the mouse cursor; it remains static.
- **Recommendation:** Use Framer Motion's `useMotionTemplate`:
  ```tsx
  import { useMotionTemplate } from "framer-motion";
  // ...
  const background = useMotionTemplate`radial-gradient(600px circle at ${spotlightX} ${spotlightY}, ${glowColor}, transparent 40%)`;
  // apply style={{ opacity: hovered ? 1 : 0, background }}
  ```

#### Flaw 5: Invalid RFC Format in Sitemap and Robots.txt (SEO Violation)
- **Location:** `src/app/sitemap.ts` (Line 6), `public/robots.txt` (Line 4), `src/app/layout.tsx`
- **Issue:**
  - In `sitemap.ts`, the URL is defined as `url: "/"`. According to the official Sitemap XML protocol, all sitemap URLs must be fully qualified absolute URLs (e.g. `https://utsabsinha.com/`).
  - In `robots.txt`, `Sitemap: /sitemap.xml` is relative, which violates RFC 9309.
  - `src/app/layout.tsx` is missing `metadataBase: new URL("https://utsabsinha.com")`, which triggers Next.js build warnings.
- **Impact:** Search engine crawlers (Google, Bing) reject or degrade indexation of relative sitemap URLs.

---

### 6.3 Medium Severity Flaws

#### Flaw 6: Unused / Phantom Dependencies in `package.json`
- **Location:** `package.json`
- **Details:**
  - `recharts: "^3.10.1"`: Installed and listed as a dependency, but never imported in any `.tsx` or `.ts` file in the codebase. Visualizations in `ProjectCard` and `AILab` use custom SVGs and CSS bars.
  - `dotenv: "17.3.1"`: Redundant; Next.js has native `.env` loading built-in.
  - `drizzle-orm`, `drizzle-kit`, `pg`, `@types/pg`: Bloatware if the database is not utilized.
- **Impact:** Increases `node_modules` size by tens of megabytes, bloats the lockfile, and introduces unnecessary security maintenance overhead.

#### Flaw 7: Redundant Duplicate Assets in `public/`
- **Location:** `public/` directory
- **Details:**
  - `utsab_profile.jpg` and `utsab_profile.png` are identical duplicate files (162,039 bytes each).
  - `resume.pdf` and `utsab_sinha_resume.pdf` are identical duplicate files (108,837 bytes each).
- **Impact:** Wastes repository space and creates confusion over which asset is the source of truth.

#### Flaw 8: HTML Accessibility Violation (Nested Interactive Elements in `ProjectCard`)
- **Location:** `src/components/projects/ProjectCard.tsx` (Lines 29–38, 136, 147, 158)
- **Issue:** The outer container has `role="button"` and `tabIndex={0}`, while child elements contain `<button>` and `<a>` tags.
- **Impact:** Nested interactive elements violate W3C HTML specifications and WCAG AA guidelines. Screen readers and keyboard focus cycles encounter conflicting tab stops, causing unpredictable navigation behavior.

#### Flaw 9: Three.js Unhandled WebGL Context Loss & Lack of Error Boundary
- **Location:** `src/components/hero/Hero.tsx`, `NeuralSphere.tsx`
- **Issue:** While `Hero.tsx` checks for initial WebGL support, if WebGL crashes at runtime or loses context (`webglcontextlost`), there is no React Error Boundary around the `<Canvas>` component.
- **Impact:** Can cause a white-screen crash of the entire hero section on low-end GPUs or mobile devices under memory pressure.

---

### 6.4 Low Severity & Polish Issues

#### Flaw 10: 4 Out of 5 Project Demos Have Dead Links (`demo: "#"`)
- **Location:** `src/lib/data.ts`
- **Issue:** Only Antar AI has a live demo (`https://antar-ai-v3.vercel.app/`). The other 4 projects specify `demo: "#"`.
- **Impact:** In `ProjectModal.tsx`, clicking the demo button triggers a disabled button or reloads to top of page (`#`).
- **Recommendation:** Link directly to the GitHub repository folder or notebook if a live deployment is unavailable, or label them as "Research Repository" instead of a dead demo button.

#### Flaw 11: Future Year Timestamp Inconsistencies
- **Location:** `src/lib/data.ts` (Lines 435, 446, 456)
- **Issue:** Work experiences state `July 2026 – Present`, `April 2026 – July 2026`, etc., but education lists graduation in `May 2027` and previous milestones in `2024–2025`. The footer states `© 2026 Utsab Sinha`.
- **Impact:** Dates should match the candidate's actual timeline to prevent confusion during background checks.

#### Flaw 12: Custom Cursor Sticky Lock on Touch Devices
- **Location:** `src/components/ui/CustomCursor.tsx`
- **Issue:** Media query evaluation only runs on initial component mount. If a hybrid device (touchscreen laptop) shifts pointer modes, `globals.css` rule `.custom-cursor * { cursor: none !important; }` can leave the user with an invisible cursor.

---

## 7. Non-Functional Requirements (NFRs)

### 7.1 Performance
- **Lighthouse Performance Score:** Target $\ge 90$ on desktop and $\ge 80$ on mobile.
- **3D Canvas Rendering:** Maintain consistent $60\text{ FPS}$ on desktop and throttled $30\text{ FPS}$ on mobile; utilize DPR clamping `dpr={[1, 2]}`.
- **Bundle Size Optimization:** Three.js and `@react-three/drei` must remain dynamically imported to avoid blocking initial Largest Contentful Paint (LCP).

### 7.2 Accessibility (WCAG 2.1 AA)
- **Keyboard Navigation:** All interactive elements must be focusable with visible focus rings.
- **Screen Readers:** ARIA landmarks (`<main>`, `<header>`, `<nav>`, `<section>`, `<footer>`) must be present with appropriate labels.
- **Contrast Ratios:** Minimum contrast ratio of 4.5:1 for body text against backgrounds in both dark and light modes.
- **Motion Reduction:** Fully honor `prefers-reduced-motion: reduce` by disabling canvas rotations, floating animations, and custom cursor scaling.

### 7.3 Security
- **Strict Headers:** Implement Content-Security-Policy (CSP), X-Frame-Options, X-Content-Type-Options.
- **Form Sanitization:** Any implemented contact endpoint must sanitize input against XSS, inject rate limiting (e.g. 5 requests per IP/hour), and utilize CAPTCHA/honeypot fields.

---

## 8. Implementation & Remediation Roadmap

### Phase 1: Critical Fixes & Infrastructure Cleanup (Immediate)
1. **Decision on Database Layer:**
   - Either remove `src/db`, `pg`, and `drizzle-orm` to make the portfolio a lean, zero-maintenance static Next.js app.
   - OR implement a real message inbox table in PostgreSQL to store contact form submissions.
2. **Implement Real Contact Backend:**
   - Create `src/app/api/contact/route.ts` with Resend/SendGrid email delivery or database insertion.
3. **Correct SEO URLs:**
   - Update `src/app/sitemap.ts` and `public/robots.txt` with the production domain (`https://utsabsinha.com`).
   - Add `metadataBase` to `src/app/layout.tsx`.

### Phase 2: High-Priority UX & AI Lab Enhancements
1. **Complete AI Lab Interactive Demos:**
   - Build interactive simulation for Biometric Face Recognition (live landmark bounding box, latency counter).
   - Build interactive semantic vector query box for the Embeddings & Intent Classifier.
2. **Fix `Tilt3DCard` Spotlight:**
   - Refactor to `useMotionTemplate` so the spotlight follows the cursor in real time.
3. **Fix Accessibility in `ProjectCard`:**
   - Eliminate nested button/anchor structures. Make the card a container that triggers the modal while preserving distinct action buttons.

### Phase 3: Asset Cleanup & Polish
1. Remove duplicate files in `public/` (`utsab_profile.png`, `resume.pdf`).
2. Uninstall unused npm packages (`recharts`, `dotenv`).
3. Add React ErrorBoundary around 3D Canvas.
4. Verify responsive mobile viewports and touch cursor behavior.

---

*Document approved for implementation.*
