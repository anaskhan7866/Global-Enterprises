# Global Enterprises - Website (HTML5, CSS3, JavaScript)

A modern, high-performance, responsive website built for **Global Enterprises** (`globalcorebox.in`) — Leading Manufacturer of Core Boxes, Exploration Drilling Solutions, Galvanized Core Trays, and Mining Equipment.

---

## 🌟 Key Features

1. **Industrial Grade Aesthetic**:
   - Modern color palette featuring safety/industrial orange (`#f15a24`), dark titanium slate (`#0c0f17`, `#141923`), brushed steel silvers, and glassmorphism accents.
   - Clean Google Fonts typography using **Outfit** (headings) and **Montserrat** (body).
   - High-contrast, accessibility-friendly, fully responsive design across Desktop, Tablet, and Mobile.

2. **Hero & 22-Gauge Flagship Showcase**:
   - High-impact value proposition highlighting 22-Gauge Galvanized Sheet, stackable interlocking lids, zero residual water retention, and Pan-India DAP delivery.
   - Live GI Core Box Video Demonstration Modal with embedded player.

3. **Interactive Geological Core Box Requirement Calculator**:
   - Dynamic planning tool for exploration geologists and drilling engineers.
   - Calculates exact trays required, total tare weight, and locking lids based on drilled meters and model selection (BQ 41mm, NQ 47.5–66mm, HQ 64–86mm, PQ 86mm+).
   - One-click transfer of calculated figures directly into the RFQ/quotation form.

4. **Multi-Image Interactive Product Sliders**:
   - Dedicated interactive image sliders with next/previous arrows, dot indicators, touch swipe support for mobile, and automatic looping.
   - Covers Galvanized Steel BQ (7-Row and 6-Row), NQ (5-Row), HQ (4-Row), and PQ (3-Row).

5. **Plastic Core Boxes &amp; Accessories**:
   - Covers Lightweight Copolymer Plastic Core Trays (BQ, NQ, HQ, PQ), Snap-on Lids, and Drilling Accessories.

6. **Comprehensive Technical Comparison Matrix**:
   - Side-by-side comparison table specifying model, core diameter, dimensions (cm), inseam length, slot width, lattices, core holding capacity, and net weight with lid.

7. **Industrial Services & Expandable FAQs**:
   - Fabrication & Erection Job
   - Civil Construction & Renovation
   - PEB Structures & Portacabins
   - Smooth accordions with ARIA attributes.

8. **Filterable On-Site Visuals & Lightbox Gallery**:
   - Filter by: All Photos, Core Boxes & Lids, Manufacturing Plant, Drilling & Site Visuals, and Digital Catalogs.
   - Fullscreen Lightbox Modal with zoom, image captions, and keyboard navigation (Left/Right arrow keys & ESC).

9. **Digital Catalog & Brochure Viewer**:
   - High-resolution preview of Page 1 & Page 2 mini-catalogs with direct download actions.

10. **Interactive RFQ / Quotation Form & Direct Contacts**:
    - Real-time client-side validation for Name, Work Email, Phone/WhatsApp, Model, Quantity, and Project Details.
    - Simulated asynchronous submission with loading spinner and clean success feedback alert.
    - Google Map embed of the Zawar Mines (Udaipur, Rajasthan) facility.
    - Floating action buttons for instant WhatsApp chat and smooth Scroll-to-Top.

---

## 📁 File Structure

```
Global-ENT/
├── index.html        # Semantic HTML5 markup, Schema.org JSON-LD, SEO meta tags
├── style.css         # Custom Vanilla CSS3 design system, responsive grid/flexbox
├── script.js         # Interactive slider, calculator, tabs, lightbox, form logic
└── README.md         # Documentation & deployment guide
```

---

## 🚀 Running Locally

You can preview the website using any standard local web server:

### Option 1: Using the Built-in Server (Recommended)
Supports clean URLs (`/gi-core-boxes`, `/plastic-core-boxes`, `/trunks`, `/clientele`) and automatic MIME resolution:
```bash
npm start
# or
node server.js
```
Then open [http://localhost:3000](http://localhost:3000) in your web browser.

### Option 2: Using VS Code Live Server
Right-click `index.html` and click **"Open with Live Server"**.

### Option 3: Direct File Opening
Double-click `index.html` to open directly in any modern browser (Chrome, Edge, Firefox, Safari).

---

## 🌐 Deployment

The files are static (`HTML`, `CSS`, `JS`) and can be hosted anywhere:
- **Netlify / Vercel**: Drag and drop the `Global-ENT` folder directly into Netlify Drop or Vercel.
- **GitHub Pages**: Push the repository and enable GitHub Pages on the `main` branch.
- **cPanel / Apache / Nginx**: Upload `index.html`, `style.css`, and `script.js` to `public_html`.
