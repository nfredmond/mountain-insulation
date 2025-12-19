# Mountain Insulation — Website Development Plan

**Client:** Mountain Insulation  
**Location:** Grass Valley, CA  
**Developer:** Nat Ford Planning & Analysis  
**Date:** December 2024

---

## 1. Project Overview

A premium, fully-featured website for Mountain Insulation — a professional insulation contractor serving Grass Valley and the greater Nevada County/Sierra Foothills region. The site will position the company as the trusted, modern choice for residential and commercial insulation services.

---

## 2. Brand Identity & Design Direction

### Brand Concept: *"Sierra Modern"*
A refined aesthetic that bridges rugged mountain reliability with contemporary professionalism. Clean lines, natural textures, and a color palette inspired by the Sierra Nevada landscape.

### Color Palette

| Role | Color | Hex | Usage |
|------|-------|-----|-------|
| Primary | Slate Charcoal | `#2D3436` | Headers, text, primary buttons |
| Secondary | Forest Pine | `#1E5631` | Accents, CTAs, success states |
| Accent | Copper Ridge | `#B87333` | Highlights, hover states, icons |
| Neutral Light | Granite Mist | `#F5F5F0` | Backgrounds, cards |
| Neutral Mid | Stone Gray | `#95A5A6` | Secondary text, borders |
| White | Snow Peak | `#FFFFFF` | Cards, overlays |

### Typography

| Role | Font | Weight | Usage |
|------|------|--------|-------|
| Display | **Archivo Black** | 400 | Hero headlines, section titles |
| Headings | **Plus Jakarta Sans** | 600–700 | H2–H4, navigation |
| Body | **Plus Jakarta Sans** | 400–500 | Paragraphs, UI text |
| Accent | **JetBrains Mono** | 400 | Stats, metrics, technical specs |

### Design Principles
- **Bold asymmetric layouts** with generous white space
- **Subtle texture overlays** (concrete, paper grain) for depth
- **Micro-interactions** on all interactive elements
- **Photography-forward** with dramatic lighting and Sierra backdrop imagery
- **Trust signals** prominently integrated (licenses, certifications, reviews)

---

## 3. Tech Stack

| Layer | Technology | Rationale |
|-------|------------|-----------|
| **Runtime** | Bun | Fast, modern JS runtime |
| **Framework** | Next.js 14+ (App Router) | SSR, SEO, API routes, image optimization |
| **Styling** | Tailwind CSS + CSS Variables | Utility-first with design tokens |
| **Animation** | Framer Motion | Production-grade motion library |
| **Forms** | React Hook Form + Zod | Type-safe validation |
| **Email** | Resend or SendGrid | Transactional emails |
| **Database** | Supabase (PostgreSQL) | Auth, storage, real-time |
| **CMS** | Payload CMS or Sanity | Headless, client-editable content |
| **Maps** | Mapbox GL JS | Service area visualization |
| **Scheduling** | Cal.com embed or custom | Appointment booking |
| **Payments** | Stripe | Deposits, invoicing |
| **Analytics** | Plausible or PostHog | Privacy-respecting analytics |
| **Hosting** | Vercel | Edge deployment, preview URLs |
| **Domain/DNS** | Cloudflare | CDN, DDoS protection, SSL |

---

## 4. Site Architecture & Features

### 4.1 Public Pages

```
/                       → Home (hero, services overview, trust signals, CTA)
/about                  → Company story, team, certifications
/services               → Services index
  /services/[slug]      → Individual service pages (8-10 services)
/projects               → Project gallery/portfolio
  /projects/[slug]      → Case study detail pages
/service-area           → Interactive map + city pages for SEO
  /service-area/[city]  → City-specific landing pages
/resources              → Educational content hub
  /resources/[slug]     → Blog posts / guides
/contact                → Contact form, phone, location
/quote                  → Multi-step quote request wizard
/faq                    → Accordion FAQ page
/reviews                → Testimonials + Google reviews embed
/careers                → Job listings (if applicable)
/privacy                → Privacy policy
/terms                  → Terms of service
```

### 4.2 Customer Portal (Authenticated)

```
/portal                 → Dashboard overview
/portal/quotes          → View submitted quotes, status
/portal/projects        → Active/completed project tracking
/portal/documents       → Contracts, invoices, warranties
/portal/schedule        → Upcoming appointments
/portal/messages        → Communication thread with team
/portal/settings        → Account settings, notifications
```

### 4.3 Admin Dashboard (Staff Only)

```
/admin                  → Admin overview, KPIs
/admin/leads            → Lead management, pipeline
/admin/quotes           → Quote requests, estimating
/admin/projects         → Project management
/admin/customers        → Customer database
/admin/content          → CMS content editing
/admin/settings         → Business settings
```

---

## 5. Core Features Specification

### 5.1 Quote Request Wizard
A multi-step, mobile-optimized form that captures project details:

**Step 1: Property Type**
- Residential / Commercial / Agricultural
- New Construction / Existing Building / Remodel

**Step 2: Service Selection**
- Insulation Type (Blown-in, Batt, Spray Foam, Radiant Barrier, etc.)
- Areas to insulate (Attic, Walls, Crawlspace, Garage, etc.)

**Step 3: Property Details**
- Square footage (slider + input)
- Year built
- Current insulation status
- Known issues (drafts, energy bills, comfort)

**Step 4: Contact & Scheduling**
- Name, email, phone
- Property address (autocomplete)
- Preferred contact method
- Availability calendar picker

**Step 5: Additional Info**
- Photo upload (optional)
- Additional notes
- How did you hear about us?

**Post-Submit:**
- Confirmation screen with next steps
- Email confirmation with quote reference #
- Auto-notification to admin team
- Lead created in CRM pipeline

### 5.2 Appointment Scheduling
- Embedded Cal.com or custom booking system
- Syncs with Google Calendar
- Automated reminders (email + SMS via Twilio)
- Rescheduling/cancellation self-service

### 5.3 Customer Portal
- Magic link or email/password authentication (Supabase Auth)
- Real-time project status updates
- Document storage (contracts, invoices, warranties, photos)
- Secure messaging with staff
- Notification preferences

### 5.4 Service Area & Local SEO
- Interactive Mapbox map showing coverage area
- Individual city/town pages for local SEO:
  - Grass Valley, Nevada City, Penn Valley, Lake of the Pines, Alta Sierra, Colfax, Auburn, etc.
- Dynamic content based on location
- Schema.org LocalBusiness markup

### 5.5 Project Gallery
- Masonry grid layout with filtering
- Before/after slider comparisons
- Project metadata (type, location, services, year)
- Lightbox with swipe navigation

### 5.6 Content Management
- Headless CMS for client-editable content:
  - Services, projects, blog posts, FAQs, team members
  - SEO metadata per page
  - Draft/publish workflow
- Image optimization pipeline

### 5.7 Reviews & Social Proof
- Google Business Profile reviews API integration
- Video testimonials section
- Trust badges (BBB, contractor licenses, certifications)
- Statistics counters (projects completed, years in business, etc.)

---

## 6. Technical Requirements

### 6.1 Performance Targets
| Metric | Target |
|--------|--------|
| Lighthouse Performance | 95+ |
| Lighthouse Accessibility | 100 |
| Lighthouse SEO | 100 |
| LCP (Largest Contentful Paint) | < 2.5s |
| FID (First Input Delay) | < 100ms |
| CLS (Cumulative Layout Shift) | < 0.1 |
| Time to Interactive | < 3.5s |

### 6.2 SEO Implementation
- Dynamic sitemap.xml generation
- robots.txt configuration
- Canonical URLs
- Open Graph + Twitter Card meta
- Schema.org structured data (LocalBusiness, Service, Review, FAQ)
- Image alt text enforcement
- Internal linking strategy

### 6.3 Accessibility (WCAG 2.1 AA)
- Semantic HTML throughout
- ARIA labels where needed
- Keyboard navigation support
- Focus indicators
- Color contrast compliance
- Screen reader testing

### 6.4 Security
- HTTPS everywhere (Cloudflare SSL)
- CSRF protection on all forms
- Rate limiting on API routes
- Input sanitization
- Secure headers (CSP, HSTS, etc.)
- Regular dependency audits

---

## 7. Development Phases

### Phase 1: Foundation (Week 1–2)
- [ ] Project scaffolding (Next.js + Bun + Tailwind)
- [ ] Design system & component library setup
- [ ] Typography, colors, spacing tokens
- [ ] Base layout components (Header, Footer, Container)
- [ ] Responsive navigation with mobile menu
- [ ] CMS setup (Payload or Sanity)
- [ ] Database schema design (Supabase)
- [ ] Environment configuration

### Phase 2: Core Public Pages (Week 3–4)
- [ ] Home page with hero, sections, animations
- [ ] About page
- [ ] Services index + dynamic service pages
- [ ] Contact page with form
- [ ] FAQ page
- [ ] Privacy & Terms pages
- [ ] 404 and error pages
- [ ] Loading states and skeletons

### Phase 3: Advanced Features (Week 5–6)
- [ ] Multi-step quote wizard
- [ ] Appointment scheduling integration
- [ ] Project gallery with filtering + lightbox
- [ ] Service area map + city pages
- [ ] Blog/resources section
- [ ] Google Reviews integration
- [ ] Email notification system (Resend)

### Phase 4: Customer Portal (Week 7–8)
- [ ] Authentication system (Supabase Auth)
- [ ] Portal dashboard layout
- [ ] Quote history & status tracking
- [ ] Project tracking interface
- [ ] Document management
- [ ] Messaging system
- [ ] Notification preferences

### Phase 5: Admin Dashboard (Week 9–10)
- [ ] Admin authentication & roles
- [ ] Lead/quote management interface
- [ ] Project management tools
- [ ] Customer database
- [ ] Analytics dashboard
- [ ] CMS content editing UI

### Phase 6: Polish & Launch (Week 11–12)
- [ ] Performance optimization (images, code splitting, caching)
- [ ] SEO audit and fixes
- [ ] Accessibility audit and fixes
- [ ] Cross-browser testing
- [ ] Mobile device testing
- [ ] Security audit
- [ ] Analytics setup
- [ ] Documentation
- [ ] Client training
- [ ] DNS/domain configuration
- [ ] Production deployment
- [ ] Post-launch monitoring

---

## 8. Deliverables

| Deliverable | Format |
|-------------|--------|
| Brand Guidelines | PDF + Figma |
| Design Mockups | Figma file |
| Source Code | GitHub repository |
| Deployed Website | Vercel production URL |
| CMS Access | Admin credentials |
| Documentation | Markdown in repo + Notion |
| Training Session | Video recording + live walkthrough |
| Analytics Dashboard | Plausible/PostHog access |

---

## 9. Content Requirements (from Client)

To complete the project, we'll need:

- [ ] Company story / history
- [ ] Team member names, titles, bios, photos
- [ ] Service descriptions and details
- [ ] Project photos (before/after preferred)
- [ ] Customer testimonials (written or video)
- [ ] Contractor license numbers and certifications
- [ ] Service area boundaries
- [ ] Pricing structure (if publishing ranges)
- [ ] FAQ questions and answers
- [ ] Business hours
- [ ] Phone number(s)
- [ ] Email address(es)
- [ ] Physical address
- [ ] Social media handles
- [ ] Google Business Profile access
- [ ] Domain name (purchase or transfer)
- [ ] Logo files (if existing) — or approval on new design

---

## 10. Ongoing Maintenance (Optional Retainer)

| Service | Frequency |
|---------|-----------|
| Security updates | Monthly |
| Dependency updates | Monthly |
| Uptime monitoring | Continuous |
| Backup verification | Weekly |
| Performance monitoring | Continuous |
| Content updates | As needed |
| Feature enhancements | As needed |

---

## 11. Budget Estimate

| Phase | Hours | Rate | Total |
|-------|-------|------|-------|
| Discovery & Design | 20 | $XXX | $X,XXX |
| Phase 1–2: Foundation + Core Pages | 40 | $XXX | $X,XXX |
| Phase 3: Advanced Features | 40 | $XXX | $X,XXX |
| Phase 4: Customer Portal | 30 | $XXX | $X,XXX |
| Phase 5: Admin Dashboard | 30 | $XXX | $X,XXX |
| Phase 6: Polish & Launch | 20 | $XXX | $X,XXX |
| **Total Estimated** | **180 hrs** | | **$XX,XXX** |

*Note: Fill in your rates. Adjust scope to fit budget if needed.*

---

## 12. Project Timeline

```
Week 1–2   ████████░░░░░░░░░░░░░░░░  Foundation
Week 3–4   ░░░░░░░░████████░░░░░░░░  Core Pages
Week 5–6   ░░░░░░░░░░░░░░░░████████  Advanced Features
Week 7–8   ████████░░░░░░░░░░░░░░░░  Customer Portal
Week 9–10  ░░░░░░░░████████░░░░░░░░  Admin Dashboard
Week 11–12 ░░░░░░░░░░░░░░░░████████  Polish & Launch
```

**Estimated Launch:** ~12 weeks from project kickoff

---

## 13. Next Steps

1. **Review this plan** — Adjust scope/features as needed
2. **Client kickoff meeting** — Gather content requirements
3. **Design phase** — Create mockups for approval
4. **Development sprint** — Build iteratively with weekly demos
5. **Launch** — Deploy and celebrate 🎉

---

*Prepared by Nat Ford Planning & Analysis*
