# Crumbs of Love — Award-Level Artisanal E-Commerce Website 🤎

> **"Baked fresh. Baked better. Baked with love."**  
> Complete production-ready, editorial luxury e-commerce website built for **Crumbs of Love**, a home bakery crafting healthier, small-batch brownies made with single-origin dark cocoa, organic raw jaggery, pure dairy butter, and zero chemical preservatives.

---

## 🌟 Highlights & Features

- **Apple / Nike-Level Aesthetic**: Warm editorial dark chocolate palette (`#1E120C`, `#3B2314`, `#C08552`, `#FAF5EE`, `#C9A66B`), fluid clamp typography, tactile noise film grain, and micro-interactions.
- **Interactive Three.js WebGL Hero**: Custom floating cocoa/crumb particle system with a GLSL displacement shader reacting smoothly to mouse coordinates; gracefully throttled for 60fps and degrades to static visuals on mobile / `prefers-reduced-motion`.
- **Lenis Smooth Scroll & GSAP ScrollTrigger**: Pinned multi-step storytelling ("The Healthier Way"), staggered fluid text reveals, animated numbers counter (`data-counter-target`), and parallax image containers.
- **Custom Interactive Desktop Cursor**: Lerping cursor ring and center dot expanding over buttons, links, and cards.
- **Branded Preloader**: Logo reveal with oven baking progress fill counter (`0% -> 100%`) and split curtain reveal into the hero.
- **Slide-out Cart Drawer**:
  - Live quantity steppers and remove actions with LocalStorage persistence.
  - Dynamic free express delivery progress bar towards the ₹799 threshold.
  - Promo code engine (`LOVE10` for 10% off, `FIRSTCRUMB` for 15% off, `SWEETLOVE` for 20% off).
  - Toast notification engine for instant user feedback.
- **Full E-Commerce Catalog & Filtering (`shop.html`)**:
  - Category filter pills: *All*, *Classic Fudge*, *Roasted Nuts*, *100% Eggless*, *Sugar-Free / Oats*, *Luxury Hampers*.
  - Live search input & sorting (Featured, Price: Low to High, Price: High to Low, Rating).
- **Interactive Product Detail Page (`product.html`)**:
  - Dynamic gallery switcher.
  - Pack size selector pills (*Box of 4*, *Box of 6*, *Box of 12*) with instant price updates and savings badges.
  - Transparent nutritional breakdown (calories, protein, healthy fats, 0g refined sugar) and wholesome ingredient tags.
- **Checkout & Direct WhatsApp Ordering (`checkout.html`)**:
  - Delivery address form, preferred date selector (min next-day fresh batch), time slot dropdown.
  - Complimentary handwritten gift card message textarea.
  - Payment method toggle: Cash on Delivery, Instant Dynamic UPI QR Code, Card simulation.
  - **"Direct WhatsApp Order"**: Generates a pre-formatted, emoji-rich WhatsApp message with items, pack sizes, totals, and address directly sent to Baker Gopika (+91 70109 87334).
- **Celebration Success Page (`success.html`)**:
  - Canvas confetti explosion upon confirmation.
  - Real-time baking stage status tracker.
  - Printable receipt and direct WhatsApp follow-up button.

---

## 📁 Project Structure

```
d:/Crumbs Of Love/
├── index.html            # Main landing page (Three.js Hero, Marquee, Story, FAQ, Contact)
├── shop.html             # Full catalog with dynamic filter pills, search, sorting
├── product.html          # Dynamic PDP (gallery, pack sizes, nutrition facts table, inquiry)
├── checkout.html         # Delivery slots, gift card message, address, UPI QR, COD
├── success.html          # Order confirmation with confetti, status tracker, receipt
├── assets/
│   ├── logo.jpeg         # Provided brand logo
│   └── images/           # High-resolution brownie and ingredients photography
├── css/
│   └── style.css         # Tailwind base/components/utilities + custom grain, cursor, fonts
├── js/
│   ├── data.js           # 🔑 SINGLE SOURCE OF TRUTH (Products, Prices, WhatsApp, Phone, FAQs)
│   ├── cart.js           # Cart drawer, wishlist, free shipping calculations, WhatsApp text builder
│   ├── hero-shader.js    # Three.js WebGL particle field & custom GLSL gradient displacement
│   ├── animations.js     # Lenis smooth scroll, GSAP ScrollTrigger timeline, counters, preloader
│   ├── products.js       # Dynamic product rendering, shop filtering, sorting, PDP builder
│   ├── checkout.js       # Form validation, UPI QR code generator, order submission
│   └── main.js           # Shared navigation, smart header auto-hide, search modal, mobile menu
├── tailwind.config.js    # Tailored brand theme (cocoa, caramel, cream, gold, fluid typography)
├── postcss.config.js     # Tailwind CSS + Autoprefixer config
├── vite.config.js        # Multi-page build configuration
└── package.json          # Node dependencies & build scripts
```

---

## 🛠️ How to Run Locally

1. **Install dependencies** (already completed):
   ```bash
   npm install
   ```

2. **Start the local dev server**:
   ```bash
   npm run dev
   ```
   Open your browser to: **`http://localhost:5173/`**

3. **Build production bundle**:
   ```bash
   npm run build
   ```
   Outputs production-optimized static files to the `/dist` directory.

4. **Preview the production build**:
   ```bash
   npm run preview
   ```

---

## ✏️ How to Edit Content & Store Details

All store configuration, products, prices, and contact details are centralized in **[`js/data.js`](file:///d:/Crumbs%20Of%20Love/js/data.js)**. Anyone can edit this file without touching layout code!

### 1. Changing Phone Number, WhatsApp, or Email
Open [`js/data.js`](file:///d:/Crumbs%20Of%20Love/js/data.js) and look for `STORE_CONFIG`:
```javascript
export const STORE_CONFIG = {
  name: "Crumbs of Love",
  tagline: "Baked fresh. Baked better. Baked with love.",
  phone: "+917010987334",
  displayPhone: "+91 70109 87334",
  rawPhone: "7010987334",           // Used for WhatsApp links and UPI ID
  email: "Gopika6061@gmail.com",
  freeShippingThreshold: 799,       // Free delivery over ₹799
  flatDeliveryFee: 60,
  // ...
};
```

### 2. Adding or Editing Products & Prices
In [`js/data.js`](file:///d:/Crumbs%20Of%20Love/js/data.js), look at the `PRODUCTS` array. Each product has customizable pack sizes, nutrition facts, and descriptions:
```javascript
{
  id: "signature-brownie",
  name: "Signature Brownie",
  category: "Brownies",              // "Brownies" | "Cakes" | "Tres Leches" | "Specials"
  badge: "House Special",
  basePrice: 280,
  packSizes: [
    { size: "Box of 4", pieces: 4, price: 380, isPopular: false },
    { size: "Box of 6", pieces: 6, price: 540, isPopular: true, savings: "Save ₹30" },
    { size: "Box of 12", pieces: 12, price: 980, isPopular: false, savings: "Save ₹160" }
  ],
  image: "https://your-image-url-here.jpg",
  shortDesc: "Our gold standard. Made with 70% single-origin dark cocoa...",
  healthyHighlights: [
    "No refined white sugar (Organic Raw Cane & Jaggery)",
    "70% Single-Origin West African Cocoa",
    "Zero Palm Oil, Artificial Stabilizers or Preservatives"
  ],
  nutrition: {
    servingSize: "1 Brownie Square (75g)",
    calories: "210 kcal",
    protein: "4.8g",
    refinedSugar: "0g"
  }
}
```

### 3. Adding Promo Codes
In [`js/data.js`](file:///d:/Crumbs%20Of%20Love/js/data.js):
```javascript
promoCodes: {
  "LOVE10": { discountPercent: 10, minOrder: 400, label: "10% OFF Welcome Treat" },
  "FESTIVE25": { discountPercent: 25, minOrder: 1000, label: "25% OFF Festival Treats" }
}
```

### 4. Updating FAQs & Reviews
The `FAQS` and `TESTIMONIALS` arrays in [`js/data.js`](file:///d:/Crumbs%20Of%20Love/js/data.js) can be directly updated with real customer reviews or new answers.

---

## 🚀 Free Deployment Guide

### Option 1: Vercel (Recommended & Easiest)
1. Push this repository to GitHub.
2. Sign in to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import your `Crumbs Of Love` repo.
4. Framework Preset will auto-detect as **Vite**.
5. Click **Deploy**. Your site will be live on a fast, global CDN with automatic HTTPS in under 60 seconds!

### Option 2: Netlify
1. Create a `netlify.toml` file (or drag & drop the `dist/` folder after running `npm run build` into [Netlify Drop](https://app.netlify.com/drop)).
2. Build command: `npm run build`
3. Publish directory: `dist`

### Option 3: GitHub Pages
1. In `vite.config.js`, set `base: '/<repository-name>/'` if deploying to a project page, or `base: './'`.
2. Run `npm run build`.
3. Push the `dist/` folder to the `gh-pages` branch.

---

## 📱 Tasteful Design Assumptions Made
1. **WhatsApp Priority**: For an artisanal home bakery in India, WhatsApp is the highest-converting communication channel. We implemented seamless "Order via WhatsApp" handoffs on the cart drawer, the product page, and checkout with full pre-filled details.
2. **UPI Instant Payments**: Integrated dynamic QR code generation for UPI payment schemes (`upi://pay?pa=7010987334@upi&pn=Crumbs+of+Love&am=...`) supporting Google Pay, PhonePe, Paytm, and BHIM.
3. **Packaging Integrity**: Added storage and reheating instructions (15-20s microwave tip) directly on product pages and in the FAQ to guarantee the customer experiences the brownies at their warm, molten best.
