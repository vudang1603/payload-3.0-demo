# Handover Documentation: Full Visual & Structural Homepage Redesign

This document summarizes **all** design, visual, copy, and layout structural changes made to the codebase to align the frontend with the official **ACT Grants** designs (`design/Home.png` and `design/Headline.png`).

---

## Phase 1: Brand Identity & Visual Alignment

### A. Logo & Navigation Dropdowns (`Header.tsx`)
1. **Official Logo Image**: Replaced the placeholder collaboration image inside `public/images/logo.png` with the authentic circular ACT Grants logo, downloaded from the live website.
2. **Circular Overlapping Logo Container**: Wrapped the header logo in a circular card container (`bg-white rounded-full p-[3px] border border-gray-200/40 shadow-sm`). Applied absolute positioning (`absolute top-[-19px] left-0 w-[66px] h-[66px] z-50`) and a spacer `div` inside the header flow to create the signature overlapping logo effect.
3. **Chevrons and Dropdown Menus**: Expanded the header navigation to include all 7 dropdown/link items with caret chevrons matching the layout of the live site.
4. **Prevent Link Wrapping**: Applied `whitespace-nowrap` to dropdown links to prevent menu items from wrapping awkwardly on narrower desktops.

### B. Hero Section Backdrop
* **Lighter Vignette Overlay**: Adjusted the linear gradient overlay on the Hero background image from a dark `rgba(0,0,0,0.35)` to a lighter `linear-gradient(rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.45))`, matching the bright look of the design mockup while ensuring white text remains fully readable.

### C. Section Subtitle Synchronization
* Aligned subtitles across all major sections (**"What ACT does"**, **"Focus areas"**, **"How ACT works"**, and **"Latest insights"**) to share the exact copy seen in `design/Home.png`:
  `"As a non-profit tech-led venture philanthropy platform, ACT is built upon the premise that an entrepreneurial mindset, technology & innovation and collective action have the power to create meaningful social impact at scale."`

### D. Focus Areas Accordion Copy & Vertical Text Fix
1. **Vertical Labels Rotation Bug**: Resolved the bug where vertical labels (e.g., "Education") in collapsed cards were flipped completely upside down (`-180deg`).
   - *Cause*: A conflict between Tailwind v4 inline utility properties (which compiles classes like `rotate-[-90deg]` into individual CSS properties like `rotate: -90deg;`) and the legacy stylesheet class `.focus-label-vertical` (which defined `transform: rotate(-90deg)`). The browser applied both, rotating the label twice.
   - *Fix*: Removed all inline Tailwind transform/rotation utility classes from the labels, delegating rotation exclusively to `.focus-label-vertical` in `styles.css`.
2. **Accordion Panel Descriptions**: Updated card tags, titles, and descriptions to match the mockup exactly:
   - **Education**: `"Enabling the bottom three quarters of India's population to learn at home by harnessing the power of affordable, accessible and high-quality ed-tech interventions."`
   - **Environment**: `"Backing tech-led start-ups working to improve air quality, manage water & waste, and accelerate transition to clean energy."`
   - **Healthcare**: `"Strengthening India's healthcare system by funding tech-driven solutions that improve access, quality, and affordability of primary care."`
   - **Women**: `"Enabling women to participate in the workforce and access economic opportunities through tech-led livelihood and skill building."`

---

## Phase 2: Layout Structural & Spacing Fixes

### A. Restructured Page Container Layouts
* **Problem**: The entire page structure was wrapped in a `<div className="container">` block. The `.container` class set a strict `max-width: 1280px` limit, locking the Header and Footer in place. Using viewport calculation hacks (`ml-[calc(-50vw+50%)]`) to break out caused scrollbar offsets and layout clipping on Windows.
* **Solution**:
  - Removed the global `.container` wrapper from all page routes and loading files:
    - `src/app/(frontend)/page.tsx`
    - `src/app/(frontend)/[slug]/page.tsx`
    - `src/app/(frontend)/[slug]/loading.tsx`
    - `src/app/(frontend)/blogs/page.tsx`
    - `src/app/(frontend)/blogs/loading.tsx`
    - `src/app/(frontend)/blogs/[slug]/page.tsx`
    - `src/app/(frontend)/blogs/[slug]/loading.tsx`
  - Wrapped each page in a full-width container: `<div className="min-h-screen flex flex-col bg-white w-full">`.
  - Moved the container layout onto the `<main>` tag: `<main className="main flex-grow container mx-auto px-6 py-10">` to keep page body content centered at 1280px.
  - Modified the `.container` style definition in `styles.css` to only define size boundaries (`max-width: 1280px; margin: 0 auto; padding: 0 1.5rem; width: 100%;`), removing the flexbox layout and `100vh` height constraints which caused nested layout conflicts.
  - Removed duplicate `styles.css` imports from all page files to prevent Next.js from compiling the global CSS multiple times.

### B. Clean Full-Width Header & Footer
* **Header.tsx**: Reworked to set the outer tag to `w-full` with sticky positioning. Wrapped all header links, logo, and buttons in a centered container:
  ```tsx
  <div className="max-w-[1280px] mx-auto px-6 py-3.5 flex justify-between items-center max-[860px]:flex-wrap max-[860px]:gap-4 max-[860px]:py-4 overflow-visible">
  ```
* **Footer.tsx**: Reworked to set the outer `<footer>` to `w-full` with standard background color `bg-[var(--primary)]`. Inner content remains centered inside a `max-w-[1280px] mx-auto flex flex-col text-left` container.

### C. Concentric Circle Diagram Spacing & Text Fit
* **InteractiveHowItWorks.tsx**:
  - **Overlap Fix**: Added a bottom margin of `mb-20` on the concentric circle wrapper. This adds sufficient spacing beneath the absolute bottom "Catalytic" node, completely resolving the collision/overlap with the Portfolio section below it.
  - **Text Overflow Fix**: Resized the center text from `text-[0.78rem]` to `text-[11.5px] leading-snug`, reduced the icon size to `w-6 h-6 mb-1`, and shrunk the padding to `p-4` to fit the description inside the circle without clipping.

### D. Portfolio Section Cleanup
* **InteractivePortfolio.tsx**:
  - **Hidden Supporters**: Removed the non-design "Our Backers & Supporters" VC team grid to match the exact mockup sections of `Home.png`.
  - **Fallback Logo Cards**: Portfolios that do not have a logo uploaded in the CMS now display a clean, light-gray neutral card with the portfolio company name in bold, rather than stretching a sector stock image inside the 110px card.
