# Investor Pitch Deck Page Implementation Plan

## WHY WE'RE CREATING THIS
Franck has an **investor meeting Tuesday** and needs a professional, web-based pitch deck that:
- Functions as a scrollable investor presentation for BookBridge
- Showcases the business opportunity in a modern, interactive format
- Can be shared via URL (easier than PDF, more impressive than slides)
- Maintains brand consistency with the portfolio's Neo-Classic design
- Works perfectly on desktop (investor meeting) and mobile (follow-up sharing)

**DEADLINE:** Live by Monday evening for Tuesday investor meeting

---

## GOALS
1. **Professional Investor Tool:** Create a pitch deck that rivals Y Combinator and top startup presentations
2. **Brand Consistency:** Use Neo-Classic academic design to reinforce BookBridge's education mission
3. **Interactive Experience:** Smooth scrolling, keyboard navigation, slide indicators
4. **Conversion Focus:** Clear CTAs to demo video, live app, and contact information
5. **Shareable:** Easy URL to send to investors after meeting (portfolio-4u8c.vercel.app/pitch)

---

## DESIGN APPROACH: Neo-Classic with Business Clarity

**Base Design:** Use portfolio's Neo-Classic Academic aesthetic
- **Colors:** Oxford blue (#002147), Bronze (#CD7F32), Parchment (#F4F1EB)
- **Fonts:** Playfair Display (headings), Source Serif Pro (body)
- **Exception:** Data-heavy slides (7-9: Traction, Business Model, Market) use WHITE backgrounds for chart readability

**Why Neo-Classic?**
- Differentiates from generic blue startup decks
- Reinforces BookBridge as educational/academic platform
- Maintains brand consistency when investors visit portfolio
- Memorable and sophisticated

---

## INCREMENTAL IMPLEMENTATION PLAN

### **PHASE 1: Setup Page Structure & Routing** ⏳
**Goal:** Create basic page with routing and metadata

**Tasks:**
1. Create `/src/app/pitch/page.tsx`
2. Add SEO metadata:
   ```typescript
   export const metadata = {
     title: "BookBridge Investor Pitch | AI-Powered ESL Reading Platform",
     description: "Investment opportunity: Democratizing reading for 1.5B ESL learners through AI",
   }
   ```
3. Create basic page component structure with styled-jsx
4. Import Neo-Classic CSS variables from About page
5. Test route loads at `localhost:3000/pitch`

**Checkpoint:** Navigate to `/pitch` and see empty page with correct title in browser tab

**COMMIT:** ✅ `feat: Add pitch deck page structure and routing`
**PUSH:** ✅ Push immediately (low risk, just routing setup)

---

### **PHASE 2: Full-Screen Slide Container & CSS Variables** ⏳
**Goal:** Set up scroll-snap system and Neo-Classic design tokens

**Tasks:**
1. Add CSS variables for Neo-Classic palette:
   ```css
   :root {
     --bg-primary: #F4F1EB;
     --bg-secondary: #FFFFFF;
     --text-primary: #2C1810;
     --text-secondary: #5D4E37;
     --text-accent: #002147;
     --accent-primary: #002147;
     --accent-secondary: #CD7F32;
     --border-light: #E5DDD4;
     --shadow-soft: rgba(44, 24, 16, 0.1);
   }
   ```

2. Create slide container with scroll-snap:
   ```css
   .slide-container {
     scroll-snap-type: y mandatory;
     overflow-y: scroll;
     height: 100vh;
   }
   .slide {
     scroll-snap-align: start;
     height: 100vh;
     scroll-snap-stop: always;
   }
   ```

3. Import Google Fonts (Playfair Display + Source Serif Pro)
4. Create 3 test slides to verify scroll-snap works
5. Test smooth scrolling between slides

**Checkpoint:** Can scroll smoothly between 3 test slides, each taking full viewport height

**COMMIT:** ✅ `feat: Add scroll-snap slide system with Neo-Classic design tokens`
**PUSH:** ✅ Push immediately (core foundation working)

---

### **PHASE 3: Slide 1 - Title/Cover Slide** ⏳
**Goal:** Create professional cover slide with branding

**Tasks:**
1. Replace first test slide with cover content
2. Add centered layout with Oxford blue gradient background
3. Add content:
   - **Title:** "BookBridge" (Playfair Display, 64px, white)
   - **Subtitle:** "Democratizing Reading for 1.5 Billion ESL Learners" (Source Serif Pro, 24px)
   - **Name:** "Franck Tshibala" (20px)
   - **Title:** "Founder & CEO" (18px, Bronze)
   - **Email:** bookbridgegap@gmail.com (clickable mailto link)
4. Add two buttons:
   - "Watch Demo" → YouTube video (Bronze primary button)
   - "Try BookBridge" → https://bookbridge.app (Bronze outlined button)
5. Add subtle fade-in animation on page load
6. Test mobile responsive (stack content, reduce font sizes)

**Checkpoint:** Cover slide looks professional, buttons work, responsive on mobile

**COMMIT:** ✅ `feat: Add Slide 1 - Title/Cover with branding and CTAs`
**PUSH:** ⏳ **WAIT** - Hold until Slide 2 is done (keep related content together)

---

### **PHASE 4: Slide 2 - The Problem** ⏳
**Goal:** Present the challenge in clear, visual format

**Tasks:**
1. Create split-screen layout (60% text left, 40% visual right)
2. Add heading: "The Challenge" (Playfair Display, Oxford blue)
3. Add 4 bullet points:
   - 1.5 billion people worldwide learning English
   - Can't afford tutors ($50-100/hour) or graded readers ($10-20/book)
   - Want to read real books but content too difficult
   - Current solutions fragmented
4. Right side: Add icon/illustration (use lucide-react icons: BookOpen, DollarSign, Users)
5. Background: White (for readability)
6. Add fade-in animation on scroll into view
7. Test mobile (stack vertically, visual on top)

**Checkpoint:** Problem slide is clear, visual enhances message, mobile responsive

**COMMIT:** ✅ `feat: Add Slide 2 - The Problem with split-screen layout`
**PUSH:** ✅ Push now (Slides 1-2 complete, natural checkpoint)

---

### **PHASE 5: Slide 3 - Founder's Story** ⏳
**Goal:** Build emotional connection with personal narrative

**Tasks:**
1. Use background image: `/franck.jpg` from portfolio
2. Add dark overlay gradient for text readability (rgba(0,33,71,0.85))
3. Center content with white text:
   - Heading: "My Journey" (Playfair Display, 48px)
   - 3 paragraphs about Congo, discovering libraries, building solution
4. Add subtle text shadow for readability over image
5. Ensure image covers full viewport height
6. Test mobile (adjust padding, font sizes)

**Checkpoint:** Story slide is emotionally engaging, text readable over image

**COMMIT:** ✅ `feat: Add Slide 3 - Founder's Story with background image`
**PUSH:** ⏳ **WAIT** - Hold for Slide 4 (Solution) to complete Problem → Story → Solution arc

---

### **PHASE 6: Slide 4 - The Solution** ⏳
**Goal:** Present BookBridge as the answer

**Tasks:**
1. Parchment background (#F4F1EB)
2. Centered heading: "BookBridge" (Playfair Display, Oxford blue)
3. Subheading: "AI-powered reading platform that makes any book accessible at any level"
4. Three-column layout for "How It Works":
   - Column 1: "Choose Your Book" (icon: BookOpen)
   - Column 2: "AI Adjusts to Your Level" (icon: Sparkles)
   - Column 3: "Read with Support" (icon: Headphones)
5. Add screenshot or iframe preview of https://bookbridge.app (below columns)
6. Test responsive (stack columns vertically on mobile)

**Checkpoint:** Solution is clear, 3-step process easy to understand, app preview visible

**COMMIT:** ✅ `feat: Add Slide 4 - The Solution with 3-step process`
**PUSH:** ✅ Push now (Problem → Story → Solution narrative complete)

---

### **PHASE 7: Slide 5 - Key Features** ⏳
**Goal:** Showcase product completeness

**Tasks:**
1. White background for clarity
2. Heading: "What Makes BookBridge Complete" (Oxford blue)
3. Create 2x3 grid of feature cards (mobile: single column)
4. Each card:
   - Icon (lucide-react)
   - Feature title (bold, 18px)
   - Description (14px, text-secondary)
5. Features:
   - Text Simplification (6 CEFR levels A1-C2)
   - Audio Narration (pronunciation)
   - Integrated Dictionary (definitions + examples)
   - Growing Library (28+ books)
   - Progress Tracking
6. Cards: Bronze border, subtle shadow, hover lift effect
7. Test grid responsiveness

**Checkpoint:** Features presented clearly in scannable grid format

**COMMIT:** ✅ `feat: Add Slide 5 - Key Features grid`
**PUSH:** ⏳ **WAIT** - Hold for Slide 6 (competitive advantage)

---

### **PHASE 8: Slide 6 - Competitive Advantage** ⏳
**Goal:** Show differentiation through comparison

**Tasks:**
1. Parchment background
2. Heading: "The Competitive Advantage"
3. Create comparison table:
   - Columns: Feature | Competitors | BookBridge
   - Rows: Simplified books, Audio sync, Instant dictionary, Full-length books, ALL-IN-ONE
   - Use checkmarks (✓) and dashes (—)
4. Bottom callout (Bronze box):
   - "BookBridge is the only platform that integrates everything an ESL learner needs in one place."
5. Style table with Bronze accents for BookBridge column
6. Mobile: Make table scrollable horizontally or stack differently

**Checkpoint:** Competitive advantage is visually clear, ALL-IN-ONE differentiator stands out

**COMMIT:** ✅ `feat: Add Slide 6 - Competitive Advantage comparison table`
**PUSH:** ✅ Push now (Product slides 4-6 complete)

---

### **PHASE 9: Slide 7 - Early Traction** ⏳
**Goal:** Prove market validation with institutional interest

**Tasks:**
1. **WHITE background** (data clarity for investors)
2. Heading: "Institutional Interest"
3. Create timeline or card layout for 4 institutions:
   - **INX Academy** (San Diego) - Pilot + December expansion
   - **BYU English Language Center** - January 2026 pilot
   - **LDS Church Literacy** - Global deployment discussions (150+ countries)
   - **Salt Lake Community College** - December meeting
4. Each card: Institution name (bold), status, quote if available
5. Bottom stats bar:
   - "59 Active Users"
   - "43 Cities"
6. Optional: Simple map visual showing user distribution
7. Test mobile (stack cards vertically)

**Checkpoint:** Traction is credible, institutional validation clear, numbers visible

**COMMIT:** ✅ `feat: Add Slide 7 - Early Traction with institutional partnerships`
**PUSH:** ⏳ **WAIT** - Hold for business model slide (keep traction + business together)

---

### **PHASE 10: Slide 8 - Business Model** ⏳
**Goal:** Show clear path to revenue

**Tasks:**
1. **WHITE background** (financial clarity)
2. Heading: "Revenue Streams"
3. Three-column layout:
   - **B2B Institutional** (Primary)
     - Icon: Building
     - Price: $10-50/student/year
     - Example: "1,000 students × $30 = $30K contract"
   - **B2C Consumer**
     - Icon: User
     - Price: $5-10/month subscriptions
   - **Partnerships**
     - Icon: Handshake
     - White-label for EdTech platforms
4. Bottom callout (Bronze box):
   - "Current Strategy: Free pilots → convert to paid contracts"
5. Test mobile responsiveness

**Checkpoint:** Revenue model is clear, B2B focus obvious, example calculation helpful

**COMMIT:** ✅ `feat: Add Slide 8 - Business Model with revenue streams`
**PUSH:** ⏳ **WAIT** - Hold for market opportunity (complete business case together)

---

### **PHASE 11: Slide 9 - Market Opportunity** ⏳
**Goal:** Show massive addressable market

**Tasks:**
1. **WHITE background** (data presentation)
2. Heading: "The Opportunity"
3. Create concentric circles diagram (TAM/SAM/SOM):
   - Outer circle: "1.5B ESL learners globally" (Total Addressable Market)
   - Middle circle: "500M institutional learners" (Serviceable Market)
   - Inner circle: "10K-50K users Year 1" (Target)
4. Side stat: "Market Size: $75B+" (based on $50/year average spend)
5. Use Bronze for circle borders, gradient fills
6. Mobile: Stack circles vertically or use simplified visual

**Checkpoint:** Market size is impressive, TAM/SAM/SOM clear, targets realistic

**COMMIT:** ✅ `feat: Add Slide 9 - Market Opportunity with TAM/SAM/SOM`
**PUSH:** ✅ Push now (Business slides 7-9 complete - traction, model, market)

---

### **PHASE 12: Slide 10 - Go-to-Market Strategy** ⏳
**Goal:** Show execution roadmap

**Tasks:**
1. Parchment background
2. Heading: "Scaling Strategy"
3. Create three-phase timeline (horizontal on desktop, vertical on mobile):
   - **Phase 1** (Now - 6 months): "Institutional Pilots"
     - Partner with ESL programs
     - Prove effectiveness with data
     - Target: 10-20 paid contracts
   - **Phase 2** (6-12 months): "Geographic Expansion"
     - Hire teacher-marketers (commission-based)
     - Scale to 50-100 schools across US
     - International: Philippines, Mexico, Latin America
   - **Phase 3** (Year 2+): "Consumer + Global"
     - Launch individual subscriptions
     - Government partnerships
     - Major EdTech integrations
4. Use Bronze accent for timeline connectors
5. Test mobile (vertical timeline, readable text)

**Checkpoint:** GTM strategy is clear, phased approach is logical, milestones are specific

**COMMIT:** ✅ `feat: Add Slide 10 - Go-to-Market Strategy timeline`
**PUSH:** ⏳ **WAIT** - Hold for "The Ask" slide (complete GTM + funding together)

---

### **PHASE 13: Slide 11 - The Ask** ⏳
**Goal:** Present investment opportunity clearly

**Tasks:**
1. **WHITE background** (financial focus)
2. Heading: "Investment Opportunity"
3. Split layout (50/50):
   - **Left:** "Seeking: $50K-$100K Pre-Seed Funding"
     - **Use of Funds** (pie chart or list):
       - 40% Developer hire
       - 30% Book catalog expansion
       - 20% Marketing (teacher-marketers)
       - 10% Operations
   - **Right:** "12-Month Milestones"
     - 50K+ active users
     - 20+ paid institutional contracts
     - $200K+ annual revenue
     - Proof of concept for Series A
4. Use Bronze for pie chart segments or checkmarks
5. Mobile: Stack left/right vertically

**Checkpoint:** Investment ask is clear, use of funds is specific, milestones are measurable

**COMMIT:** ✅ `feat: Add Slide 11 - The Ask with funding breakdown`
**PUSH:** ⏳ **WAIT** - Hold for closing slide (complete pitch narrative)

---

### **PHASE 14: Slide 12 - Why Now + Closing** ⏳
**Goal:** Create urgency and provide contact

**Tasks:**
1. Oxford blue gradient background (bookend with Slide 1)
2. Heading: "Why Now?" (white text)
3. Four checkmarks (white):
   - AI technology makes personalized learning accessible at scale
   - Post-pandemic: schools embracing EdTech
   - Global migration: ESL demand growing
   - Institutional validation ready to scale
4. Vision statement (centered, larger):
   - "Every ESL learner worldwide should have access to books they can understand - regardless of income, location, or background."
5. Closing section:
   - "Let's Make This Happen"
   - Franck Tshibala
   - bookbridgegap@gmail.com
6. Two large buttons:
   - "Watch Demo" (Bronze)
   - "Try BookBridge" (Bronze outlined)
7. Test mobile responsiveness

**Checkpoint:** Closing is compelling, contact clear, CTAs prominent

**COMMIT:** ✅ `feat: Add Slide 12 - Why Now + Closing with vision and CTAs`
**PUSH:** ✅ Push now (All 12 slides complete!)

---

### **PHASE 15: Slide Navigation Dots** ⏳
**Goal:** Add visual indicator of current slide position

**Tasks:**
1. Create fixed position navigation dots (right side of screen)
2. 12 dots representing 12 slides
3. Current slide highlighted in Bronze
4. Inactive dots in light gray
5. Click dot to scroll to that slide (smooth scroll behavior)
6. Update active dot on scroll (intersection observer)
7. Hide on mobile (optional - too cluttered)
8. Style:
   - 10px circles
   - 15px spacing
   - Fixed right: 30px
   - z-index: 100

**Checkpoint:** Can see which slide you're on, clicking dots navigates to slide

**COMMIT:** ✅ `feat: Add slide navigation dots with scroll detection`
**PUSH:** ⏳ **WAIT** - Hold for keyboard navigation (complete navigation system together)

---

### **PHASE 16: Keyboard Navigation** ⏳
**Goal:** Allow arrow key navigation between slides

**Tasks:**
1. Add keyboard event listener (useEffect hook)
2. Arrow Down / Page Down → scroll to next slide
3. Arrow Up / Page Up → scroll to previous slide
4. Home → scroll to Slide 1
5. End → scroll to Slide 12
6. Prevent default scroll behavior on these keys
7. Use smooth scroll API
8. Test all keyboard shortcuts work

**Checkpoint:** Can navigate entire deck with keyboard only

**COMMIT:** ✅ `feat: Add keyboard navigation for slides`
**PUSH:** ✅ Push now (Complete navigation system: scroll + dots + keyboard)

---

### **PHASE 17: Scroll Animations (Fade-In Effects)** ⏳
**Goal:** Add subtle entrance animations as user scrolls

**Tasks:**
1. Add intersection observer for each slide
2. When slide enters viewport, add fade-in class
3. Animate:
   - Opacity: 0 → 1
   - Transform: translateY(30px) → translateY(0)
   - Duration: 0.6s
   - Easing: ease-out
4. Use CSS transitions (no heavy libraries)
5. Test performance (ensure no jank on scroll)
6. Make animations respect prefers-reduced-motion
7. Test on mobile (ensure smooth on slower devices)

**Checkpoint:** Each slide fades in smoothly when scrolled into view

**COMMIT:** ✅ `feat: Add fade-in scroll animations to slides`
**PUSH:** ⏳ **WAIT** - Hold for responsive polish

---

### **PHASE 18: Mobile Responsive Polish** ⏳
**Goal:** Ensure perfect mobile experience

**Tasks:**
1. Test all 12 slides on mobile (iPhone, Android sizes)
2. Fix layout issues:
   - Reduce font sizes for mobile
   - Stack split-screen layouts vertically
   - Ensure buttons are touch-friendly (min 44px height)
   - Adjust padding for smaller screens
3. Test swipe navigation between slides (touch events)
4. Verify all images scale properly
5. Check navigation dots visibility (hide if too cluttered)
6. Test in Chrome DevTools mobile emulator
7. Verify scroll-snap works on iOS Safari

**Checkpoint:** Deck works perfectly on all mobile devices

**COMMIT:** ✅ `feat: Add mobile responsive optimizations for all slides`
**PUSH:** ✅ Push now (Animations + Mobile complete)

---

### **PHASE 19: Add Pitch Link to Portfolio Navigation** ⏳
**Goal:** Make pitch deck discoverable from main portfolio

**Tasks:**
1. Open `/src/components/layout/Header.tsx`
2. Add "Investor Pitch" link to navigation menu:
   - Desktop: Add to nav links
   - Mobile: Add to hamburger menu
3. Position after "About" link, before "Blog"
4. Style consistently with other nav links
5. Test navigation from home → pitch → back
6. Verify active state highlighting (if applicable)

**Checkpoint:** Can navigate to pitch deck from any page via header

**COMMIT:** ✅ `feat: Add Investor Pitch link to navigation menu`
**PUSH:** ⏳ **WAIT** - Hold for final QA

---

### **PHASE 20: Final QA & Testing** ⏳
**Goal:** Ensure everything works flawlessly before investor meeting

**Tasks:**
1. **Content Review:**
   - Proofread all 12 slides for typos
   - Verify all numbers/stats are accurate
   - Check email link works (mailto:bookbridgegap@gmail.com)
   - Verify YouTube demo link works
   - Verify https://bookbridge.app link works

2. **Visual Review:**
   - All colors match Neo-Classic palette
   - Typography consistent throughout
   - Button hover states work
   - Animations are smooth, not janky
   - Images load properly

3. **Technical Testing:**
   - Test in Chrome, Firefox, Safari
   - Test on iPhone (Safari mobile)
   - Test on Android (Chrome mobile)
   - Verify scroll-snap works in all browsers
   - Check page load time (<3 seconds)
   - Verify no console errors

4. **Navigation Testing:**
   - Scroll between all slides smoothly
   - Navigation dots update correctly
   - Keyboard shortcuts work
   - Mobile swipe works (if implemented)
   - "Back to Portfolio" link works

5. **Accessibility:**
   - Check color contrast ratios
   - Verify keyboard navigation works without mouse
   - Test with screen reader (basic test)

**Checkpoint:** Zero bugs, ready for investor presentation

**COMMIT:** ✅ `chore: Final QA and polish for investor pitch deck`
**PUSH:** ✅ Push now - READY FOR PRODUCTION! 🚀

---

### **PHASE 21: Deployment Verification** ⏳
**Goal:** Confirm live site works perfectly

**Tasks:**
1. Verify Vercel deployment succeeded (check deploy logs)
2. Test live site: https://portfolio-4u8c.vercel.app/pitch
3. Test on real devices (phone, tablet, laptop)
4. Share URL with Franck for final approval
5. Prepare backup plan (PDF export if live site has issues during meeting)

**Checkpoint:** Live pitch deck ready for Tuesday investor meeting ✅

**NO COMMIT** - Just verification

---

## GITHUB COMMIT & PUSH STRATEGY

### **Push Immediately (7 times total):**
1. ✅ After Phase 1 (Routing setup - low risk)
2. ✅ After Phase 2 (Scroll-snap foundation - core working)
3. ✅ After Phase 4 (Slides 1-2 complete - natural checkpoint)
4. ✅ After Phase 6 (Slides 3-4 complete - narrative arc done)
5. ✅ After Phase 8 (Slides 5-6 complete - product section done)
6. ✅ After Phase 11 (Slides 7-9 complete - business case done)
7. ✅ After Phase 14 (All 12 slides complete - major milestone)
8. ✅ After Phase 16 (Navigation complete)
9. ✅ After Phase 18 (Animations + Mobile done)
10. ✅ After Phase 20 (Final QA - READY FOR PRODUCTION)

### **Hold Before Pushing (10 commits waiting):**
- Phases 3, 5, 7, 9, 10, 12, 13, 15, 17, 19 (commit locally, wait for checkpoint)

### **Why This Strategy?**
- **Natural checkpoints:** Push when a complete section is done (not mid-feature)
- **Easy rollback:** Each push is a working state, can revert cleanly
- **Progress tracking:** Can see incremental progress on GitHub
- **Collaboration safe:** If multiple people work on it, they get clean checkpoints
- **Deployment safe:** Vercel auto-deploys, so only push when feature is presentable

---

## TECHNICAL SPECIFICATIONS

### **Scroll-Snap System**
```css
.slide-container {
  scroll-snap-type: y mandatory;
  overflow-y: scroll;
  height: 100vh;
  scroll-behavior: smooth;
}

.slide {
  scroll-snap-align: start;
  scroll-snap-stop: always;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
```

### **Neo-Classic Color Palette**
```css
:root {
  --bg-primary: #F4F1EB;        /* Parchment (most slides) */
  --bg-secondary: #FFFFFF;      /* White (data slides 7-9) */
  --text-primary: #2C1810;      /* Rich brown */
  --text-secondary: #5D4E37;    /* Medium brown */
  --text-accent: #002147;       /* Oxford blue */
  --accent-primary: #002147;    /* Oxford blue */
  --accent-secondary: #CD7F32;  /* Bronze */
  --border-light: #E5DDD4;
  --shadow-soft: rgba(44, 24, 16, 0.1);
}
```

### **Typography**
```css
/* Headings */
font-family: 'Playfair Display', Georgia, serif;
font-weight: 700;
color: var(--text-accent);

/* Body Text */
font-family: 'Source Serif Pro', Georgia, serif;
font-weight: 400;
color: var(--text-primary);
line-height: 1.7;
```

### **Button Styles**
```css
/* Primary Button (Bronze) */
.btn-primary {
  background: var(--accent-secondary);
  color: var(--bg-primary);
  border: none;
  border-radius: 8px;
  padding: 14px 32px;
  font-size: 18px;
  cursor: pointer;
  transition: all 0.3s ease;
}
.btn-primary:hover {
  background: #B8722D;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(205, 127, 50, 0.3);
}

/* Secondary Button (Outlined Bronze) */
.btn-secondary {
  background: transparent;
  color: var(--accent-secondary);
  border: 2px solid var(--accent-secondary);
  border-radius: 8px;
  padding: 14px 32px;
  font-size: 18px;
  cursor: pointer;
  transition: all 0.3s ease;
}
.btn-secondary:hover {
  background: var(--accent-secondary);
  color: var(--bg-primary);
  transform: translateY(-2px);
}
```

### **Animations**
```css
/* Fade-in on scroll */
.slide-content {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.slide-content.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Respect reduced motion preference */
@media (prefers-reduced-motion: reduce) {
  .slide-content {
    transition: none;
    opacity: 1;
    transform: translateY(0);
  }
}
```

### **Responsive Breakpoints**
```css
/* Desktop: default styles */
/* Tablet: 768px and below */
@media (max-width: 768px) {
  .split-layout {
    flex-direction: column;
  }
  .grid-3col {
    grid-template-columns: 1fr;
  }
  h1 { font-size: 36px; }
  h2 { font-size: 28px; }
  body { font-size: 16px; }
}

/* Mobile: 480px and below */
@media (max-width: 480px) {
  h1 { font-size: 28px; }
  h2 { font-size: 22px; }
  .btn { padding: 12px 24px; font-size: 16px; }
}
```

---

## SLIDE-BY-SLIDE BACKGROUND COLORS

| Slide | Content | Background |
|-------|---------|------------|
| 1 | Title/Cover | Oxford blue gradient |
| 2 | The Problem | White |
| 3 | Founder's Story | Image with overlay |
| 4 | The Solution | Parchment |
| 5 | Key Features | White |
| 6 | Competitive Advantage | Parchment |
| 7 | Early Traction | **White** (data) |
| 8 | Business Model | **White** (data) |
| 9 | Market Opportunity | **White** (data) |
| 10 | Go-to-Market | Parchment |
| 11 | The Ask | **White** (financial) |
| 12 | Why Now/Closing | Oxford blue gradient |

**Pattern:** Alternating Parchment/White, with data slides forced to White for clarity

---

## SUCCESS CRITERIA

### **Functionality**
✅ All 12 slides render correctly with accurate content
✅ Smooth scroll between sections (no jank)
✅ Keyboard navigation works (arrow keys, Home, End)
✅ Navigation dots show current slide and allow click-to-navigate
✅ All links work (demo video, app, email, external links)
✅ Fade-in animations are subtle and professional

### **Design**
✅ Matches portfolio's Neo-Classic aesthetic
✅ Colors consistent with established palette
✅ Typography uses Playfair Display + Source Serif Pro
✅ Button styles match About/Support pages
✅ Data slides (7-9, 11) use white backgrounds for clarity
✅ Professional appearance suitable for investor meeting

### **Responsive**
✅ Works perfectly on desktop (1920px, 1440px, 1280px)
✅ Works perfectly on tablet (768px)
✅ Works perfectly on mobile (iPhone, Android)
✅ Touch swipe navigation works on mobile
✅ All text readable at mobile sizes
✅ Buttons are touch-friendly (min 44px)

### **Performance**
✅ Page load time < 3 seconds
✅ No console errors
✅ Images optimized and load quickly
✅ Animations don't cause performance issues
✅ Works in Chrome, Firefox, Safari
✅ Works on iOS Safari (scroll-snap compatibility)

### **Content**
✅ All text is accurate and proofread
✅ Stats and numbers are up-to-date
✅ Email link works (mailto:bookbridgegap@gmail.com)
✅ Demo video link works
✅ BookBridge app link works
✅ No typos or grammatical errors

### **Accessibility**
✅ Color contrast ratios meet WCAG AA standards
✅ Keyboard navigation works without mouse
✅ Links have clear focus states
✅ Respects prefers-reduced-motion

---

## FILES TO CREATE/MODIFY

### **New Files:**
- `/src/app/pitch/page.tsx` (main pitch deck page)
- `/src/components/pitch/Slide.tsx` (optional: reusable slide component)
- `/src/components/pitch/SlideNavigation.tsx` (optional: navigation dots component)

### **Files to Modify:**
- `/src/components/layout/Header.tsx` (add "Investor Pitch" link)

### **Optional Enhancements (Post-MVP):**
- `/src/app/pitch/opengraph-image.tsx` (custom OG image for social sharing)
- `/src/components/pitch/PDFExport.tsx` (generate PDF from slides)

---

## TIMELINE ESTIMATE

### **Core Implementation (Phases 1-14):** ~4 hours
- Phase 1-2: 30 min (Setup + scroll-snap)
- Phase 3-6: 90 min (Slides 1-4: Cover → Problem → Story → Solution)
- Phase 7-8: 45 min (Slides 5-6: Features → Competitive advantage)
- Phase 9-11: 60 min (Slides 7-9: Traction → Business → Market)
- Phase 12-14: 45 min (Slides 10-12: GTM → Ask → Closing)

### **Navigation & Polish (Phases 15-20):** ~2 hours
- Phase 15-16: 45 min (Navigation dots + keyboard)
- Phase 17-18: 45 min (Animations + mobile responsive)
- Phase 19-20: 30 min (Nav link + final QA)

### **Total Estimate:** ~6 hours

### **Buffer for Issues:** +2 hours (testing, fixes, iterations)

**REALISTIC TIMELINE:** 8 hours (one work day)

---

## DEPLOYMENT CHECKLIST

**Before Final Push:**
- [ ] All 12 slides have correct content
- [ ] All links tested and working
- [ ] No console errors
- [ ] Mobile tested on real device
- [ ] Desktop tested in Chrome, Firefox, Safari
- [ ] Load time < 3 seconds
- [ ] Proofread all text for typos
- [ ] Email Franck to review
- [ ] Backup PDF generated (just in case)

**After Deployment:**
- [ ] Test live URL: https://portfolio-4u8c.vercel.app/pitch
- [ ] Share URL with Franck
- [ ] Test on Franck's devices (laptop, phone)
- [ ] Confirm ready for Tuesday investor meeting

---

## BACKUP PLAN

**If live site fails during investor meeting:**
1. PDF export of all 12 slides
2. Google Slides version (quick conversion)
3. Screen recording of scrolling through deck (video backup)

**Prepare all backups Sunday night!**

---

## STATUS: ⏳ READY TO START

**Next Step:** Begin Phase 1 - Setup Page Structure & Routing

**Deadline:** Live by Monday evening (2025-11-11) for Tuesday investor meeting

**Priority:** CRITICAL - This is for a real investor meeting! 🚀

---

## NOTES

1. **Keep it simple:** Don't over-engineer. Focus on working > perfect.
2. **Test early, test often:** Check each slide immediately after building it.
3. **Mobile matters:** Investors will share this on phones after the meeting.
4. **Content is king:** Beautiful design won't save inaccurate information.
5. **Backup everything:** Have PDF ready in case live site fails.
6. **Get Franck's approval:** He needs to review before the meeting!

---

**Ready to build! Let's create an investor pitch deck that secures BookBridge's funding.** 🚀📚
