/**
 * CRUMBS OF LOVE - EDITABLE STORE & BRAND CONFIGURATION
 * All products, pricing, WhatsApp details, testimonials, FAQs and brand copy live here.
 * Anyone can edit this file to update products or store details!
 */

export const STORE_CONFIG = {
  name: "Crumbs of Love",
  tagline: "Baked fresh. Baked better. Baked with love.",
  subTagline: "Home Made With Love",
  phone: "+917010987334",
  displayPhone: "+91 70109 87334",
  rawPhone: "7010987334",
  email: "Gopika6061@gmail.com",
  currency: "₹",
  currencyCode: "INR",
  freeShippingThreshold: 799,
  flatDeliveryFee: 60,
  pickupAddress: "Artisanal Home Bakery Studio, Chennai, Tamil Nadu, India",
  operatingHours: "Tue - Sun: 9:00 AM - 8:00 PM (Fresh batch baked daily)",
  leadTime: "Baked fresh to order. Same-day & next-day dispatch.",
  socials: {
    instagram: "https://instagram.com/crumbsoflove",
    whatsapp: "https://wa.me/917010987334",
  },
  promoCodes: {
    "LOVE10": { discountPercent: 10, minOrder: 400, label: "10% OFF Welcome Treat" },
    "FIRSTCRUMB": { discountPercent: 15, minOrder: 600, label: "15% OFF First Order" },
    "SWEETLOVE": { discountPercent: 20, minOrder: 1200, label: "20% OFF Bulk Celebration" }
  }
};

export const PRODUCTS = [
  {
    id: "classic-fudge",
    slug: "signature-classic-fudge",
    name: "Signature Classic Fudge Brownie",
    category: "Classic",
    badge: "Best Seller",
    tagline: "Dense, molten center with paper-thin crackly top",
    rating: 4.9,
    reviewCount: 142,
    basePrice: 380, // Box of 4
    packSizes: [
      { size: "Box of 4", pieces: 4, price: 380, isPopular: false },
      { size: "Box of 6", pieces: 6, price: 540, isPopular: true, savings: "Save ₹30" },
      { size: "Box of 12", pieces: 12, price: 980, isPopular: false, savings: "Save ₹160" }
    ],
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1607920591413-4ec007e70023?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1589218436045-ee320057f443?auto=format&fit=crop&w=900&q=80"
    ],
    shortDesc: "Our gold standard. Made with 70% single-origin dark cocoa, real dairy butter, and unrefined organic cane sugar.",
    fullDesc: "The brownie that started it all. We slow-melt pure single-origin dark chocolate and fold it with cold-churned fresh dairy butter and raw jaggery crystals. Baked slowly at low temperatures to produce an intensely gooey, velvety center with that coveted glossy, tissue-thin crackly meringue top. Indulgent, yet 40% lighter in refined sugars than commercial brownies.",
    healthyHighlights: [
      "No refined white sugar (Organic Raw Cane & Jaggery)",
      "70% Single-Origin West African Cocoa",
      "Zero Palm Oil, Artificial Stabilizers or Preservatives",
      "Freshly baked only after you order"
    ],
    ingredients: [
      "70% Dark Couverture Chocolate",
      "Organic Jaggery & Raw Demerara Cane",
      "Fresh Country Butter",
      "Farm-Fresh Free-Range Eggs (or Eggless Curd Culture)",
      "Unbleached Stoneground Wheat",
      "Pure Madagascar Vanilla Bean",
      "Himalayan Pink Rock Salt"
    ],
    nutrition: {
      servingSize: "1 Brownie Square (75g)",
      calories: "210 kcal",
      protein: "4.8g",
      carbs: "22g",
      healthyFats: "12g",
      refinedSugar: "0g (All natural cane/jaggery)"
    },
    allergens: "Contains Dairy and Wheat. Handcrafted in a kitchen handling tree nuts.",
    isFeatured: true
  },
  {
    id: "walnut-crunch",
    slug: "roasted-walnut-crunch",
    name: "Roasted Kashmiri Walnut Crunch",
    category: "Nutty",
    badge: "Customer Favorite",
    tagline: "Gooey chocolate loaded with slow-roasted buttery walnuts",
    rating: 4.95,
    reviewCount: 98,
    basePrice: 420,
    packSizes: [
      { size: "Box of 4", pieces: 4, price: 420, isPopular: false },
      { size: "Box of 6", pieces: 6, price: 590, isPopular: true, savings: "Save ₹40" },
      { size: "Box of 12", pieces: 12, price: 1090, isPopular: false, savings: "Save ₹170" }
    ],
    image: "https://images.unsplash.com/photo-1607920591413-4ec007e70023?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1607920591413-4ec007e70023?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=80"
    ],
    shortDesc: "Golden slow-roasted Kashmiri walnuts folded into dense, bittersweet fudge chocolate.",
    fullDesc: "We take handpicked mountain walnuts from Kashmir, slow-toast them in small batches until they release their fragrant essential oils, and fold generous handfuls into our signature rich dark chocolate batter. Every bite has that exquisite contrast: deeply gooey chocolate melting into buttery, crisp nutty crunch.",
    healthyHighlights: [
      "Rich in Omega-3 brain fats from slow-roasted walnuts",
      "Sweetened with unrefined raw jaggery",
      "Antioxidant-rich dark cocoa",
      "No chemical preservatives or artificial aromas"
    ],
    ingredients: [
      "Slow-Roasted Kashmiri Walnuts",
      "Single-Origin 70% Dark Chocolate",
      "Cold-Churned Butter",
      "Organic Jaggery Powder",
      "Stoneground Wheat",
      "Himalayan Pink Salt"
    ],
    nutrition: {
      servingSize: "1 Brownie Square (80g)",
      calories: "235 kcal",
      protein: "5.5g",
      carbs: "20g",
      healthyFats: "15g",
      refinedSugar: "0g"
    },
    allergens: "Contains Tree Nuts (Walnuts), Dairy, and Wheat.",
    isFeatured: true
  },
  {
    id: "dark-sea-salt",
    slug: "85-percent-dark-chocolate-sea-salt",
    name: "85% Noir & Guerande Sea Salt",
    category: "Classic",
    badge: "Chef's Signature",
    tagline: "Intense bittersweet noir with delicate flaky salt crystals",
    rating: 4.88,
    reviewCount: 76,
    basePrice: 440,
    packSizes: [
      { size: "Box of 4", pieces: 4, price: 440, isPopular: false },
      { size: "Box of 6", pieces: 6, price: 620, isPopular: true, savings: "Save ₹40" },
      { size: "Box of 12", pieces: 12, price: 1150, isPopular: false, savings: "Save ₹170" }
    ],
    image: "https://images.unsplash.com/photo-1589218436045-ee320057f443?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1589218436045-ee320057f443?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=80"
    ],
    shortDesc: "For true dark chocolate lovers. 85% single-estate cocoa finished with delicate mineral-rich sea salt flakes.",
    fullDesc: "Created for connoisseurs who appreciate true chocolate depth without overwhelming sweetness. We use intense 85% dark cacao paired with a sprinkle of artisanal flaky sea salt on the crust. The salt crystals accentuate the floral, fruity cacao notes while cutting cleanly through the decadent fudginess.",
    healthyHighlights: [
      "Super high in cocoa flavanols & polyphenols",
      "Very low sugar profile (less than 6g total carbs from sugar per square)",
      "Electrolyte-rich French fleur de sel",
      "Pure clean indulgence"
    ],
    ingredients: [
      "85% Single-Estate Dark Chocolate",
      "Artisanal Sea Salt Flakes",
      "Pure Country Butter",
      "Raw Coconut Sugar",
      "Stoneground Wheat",
      "Bourbon Vanilla"
    ],
    nutrition: {
      servingSize: "1 Brownie Square (75g)",
      calories: "205 kcal",
      protein: "4.9g",
      carbs: "17g",
      healthyFats: "13.5g",
      refinedSugar: "0g"
    },
    allergens: "Contains Dairy and Wheat.",
    isFeatured: true
  },
  {
    id: "date-oat-flour",
    slug: "medjool-date-rolled-oat-brownie",
    name: "Medjool Date & Rolled Oat (Guilt-Free)",
    category: "Guilt-Free",
    badge: "100% Sugar-Free",
    tagline: "Naturally sweetened with whole dates and oat flour",
    rating: 4.92,
    reviewCount: 114,
    basePrice: 450,
    packSizes: [
      { size: "Box of 4", pieces: 4, price: 450, isPopular: false },
      { size: "Box of 6", pieces: 6, price: 640, isPopular: true, savings: "Save ₹35" },
      { size: "Box of 12", pieces: 12, price: 1190, isPopular: false, savings: "Save ₹160" }
    ],
    image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=80"
    ],
    shortDesc: "Zero added sugar or flour! Naturally sweetened with premium Medjool dates and fiber-rich rolled oats.",
    fullDesc: "Our answer to wholesome craving. We purée soft, caramel-like Medjool dates and blend them with fine-milled Scottish rolled oats, pure Dutch cocoa, and cold-pressed organic coconut oil. It delivers all the dense, comforting pleasure of a classic brownie while packing 6g of dietary fiber and zero refined sugar spikes.",
    healthyHighlights: [
      "0g Added Sugars (100% Date Sweetened)",
      "Gluten-conscious rolled oats (no refined wheat flour)",
      "High fiber & steady glycemic release",
      "Dairy-free / Plant-powered recipe"
    ],
    ingredients: [
      "Medjool Date Purée",
      "Whole Rolled Oat Flour",
      "Dutch Cacao Powder",
      "Cold-Pressed Virgin Coconut Oil",
      "Ground Flaxseed & Chia Gel",
      "Madagascar Vanilla",
      "Himalayan Salt"
    ],
    nutrition: {
      servingSize: "1 Brownie Square (80g)",
      calories: "175 kcal",
      protein: "4.5g",
      fiber: "5.8g",
      carbs: "24g",
      healthyFats: "7.5g",
      refinedSugar: "0g (Zero Added Sugar)"
    },
    allergens: "Gluten-free ingredients used. Prepared in a facility handling dairy.",
    isFeatured: true
  },
  {
    id: "eggless-fudge",
    slug: "pure-eggless-silk-fudge",
    name: "Pure Eggless Silk Fudge Brownie",
    category: "Eggless",
    badge: "100% Eggless",
    tagline: "Velvety melt-in-mouth texture using artisanal yogurt culture",
    rating: 4.96,
    reviewCount: 165,
    basePrice: 390,
    packSizes: [
      { size: "Box of 4", pieces: 4, price: 390, isPopular: false },
      { size: "Box of 6", pieces: 6, price: 560, isPopular: true, savings: "Save ₹25" },
      { size: "Box of 12", pieces: 12, price: 1020, isPopular: false, savings: "Save ₹150" }
    ],
    image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=80"
    ],
    shortDesc: "100% vegetarian without compromising on that decadent, glossy crackly brownie crust.",
    fullDesc: "Baking an authentic fudgy brownie without eggs is an art form. We mastered this using a blend of artisanal hung yogurt, cold-pressed dairy cream, and pure cocoa butter. The result is exceptionally moist, intensely chocolaty, and completely egg-free.",
    healthyHighlights: [
      "Strictly 100% Eggless / Vegetarian",
      "Light unrefined jaggery & demerara sugar",
      "No chemical cake gels or emulsifiers",
      "Baked fresh in small batches"
    ],
    ingredients: [
      "70% Dark Couverture Chocolate",
      "Artisanal Hung Yogurt Culture",
      "Fresh Country Butter",
      "Unrefined Raw Cane Sugar",
      "Stoneground Wheat Flour",
      "Natural Vanilla Extract"
    ],
    nutrition: {
      servingSize: "1 Brownie Square (75g)",
      calories: "215 kcal",
      protein: "4.4g",
      carbs: "23g",
      healthyFats: "12g",
      refinedSugar: "0g"
    },
    allergens: "Contains Dairy and Wheat. 100% Egg-Free.",
    isFeatured: true
  },
  {
    id: "hazelnut-praline",
    slug: "roasted-hazelnut-praline",
    name: "Toasted Hazelnut & Gianduja Praline",
    category: "Nutty",
    badge: "Indulgent",
    tagline: "Whole roasted Piedmont hazelnuts with house-ground praline swirl",
    rating: 4.94,
    reviewCount: 82,
    basePrice: 460,
    packSizes: [
      { size: "Box of 4", pieces: 4, price: 460, isPopular: false },
      { size: "Box of 6", pieces: 6, price: 660, isPopular: true, savings: "Save ₹30" },
      { size: "Box of 12", pieces: 12, price: 1220, isPopular: false, savings: "Save ₹160" }
    ],
    image: "https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1607920591413-4ec007e70023?auto=format&fit=crop&w=900&q=80"
    ],
    shortDesc: "Decadent whole Turkish hazelnuts folded into cocoa batter with golden hazelnut praline swirl.",
    fullDesc: "We take whole aromatic hazelnuts, slow-roast them until deep golden brown, and grind half into a silky praline paste while leaving the rest whole for dramatic crunch. Swirled into our dark chocolate batter for an unforgettable Nutella-reminiscent profile without hydrogenated oils.",
    healthyHighlights: [
      "Loaded with vitamin E and heart-healthy fats",
      "No palm oil (unlike commercial hazelnut spreads)",
      "Unrefined raw jaggery sweetening",
      "Fresh small-batch roasted nuts"
    ],
    ingredients: [
      "Slow-Roasted Whole Hazelnuts",
      "House-Made Hazelnut Praline",
      "70% Dark Chocolate",
      "Cold-Churned Butter",
      "Raw Cane Sugar",
      "Stoneground Flour"
    ],
    nutrition: {
      servingSize: "1 Brownie Square (80g)",
      calories: "245 kcal",
      protein: "5.8g",
      carbs: "19g",
      healthyFats: "16.5g",
      refinedSugar: "0g"
    },
    allergens: "Contains Tree Nuts (Hazelnuts), Dairy, and Wheat.",
    isFeatured: false
  },
  {
    id: "salted-caramel-swirl",
    slug: "artisanal-salted-caramel-swirl",
    name: "Gooey Salted Caramel Ribbon Brownie",
    category: "Classic",
    badge: "Staff Pick",
    tagline: "Slow-simmered jaggery butter caramel laced through deep fudge",
    rating: 4.91,
    reviewCount: 91,
    basePrice: 430,
    packSizes: [
      { size: "Box of 4", pieces: 4, price: 430, isPopular: false },
      { size: "Box of 6", pieces: 6, price: 610, isPopular: true, savings: "Save ₹35" },
      { size: "Box of 12", pieces: 12, price: 1140, isPopular: false, savings: "Save ₹150" }
    ],
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=80"
    ],
    shortDesc: "House-made sea salt jaggery caramel ribboned throughout our bittersweet dark chocolate fudge.",
    fullDesc: "We slowly cook raw coconut cream and organic jaggery with sea salt until thick, glossy and deeply caramelized. This amber ribbon is marbled by hand through the chocolate batter before baking so it retains pockets of luscious, flowing molten caramel inside every slice.",
    healthyHighlights: [
      "Caramel made with real coconut milk and jaggery",
      "No corn syrups or synthetic glucose liquids",
      "Pure unrefined minerals",
      "Hand-marbled in small batches"
    ],
    ingredients: [
      "House Salted Jaggery Caramel",
      "70% Dark Chocolate",
      "Country Butter",
      "Coconut Cream",
      "Unrefined Cane Sugar",
      "Flaky Sea Salt"
    ],
    nutrition: {
      servingSize: "1 Brownie Square (80g)",
      calories: "228 kcal",
      protein: "4.1g",
      carbs: "24g",
      healthyFats: "13g",
      refinedSugar: "0g"
    },
    allergens: "Contains Dairy and Wheat.",
    isFeatured: false
  },
  {
    id: "gift-box-tasting",
    slug: "tasting-collection-gift-box-6",
    name: "The Connoisseur Gift Box (6 Assorted)",
    category: "Gift Boxes",
    badge: "Luxury Gift",
    tagline: "Curated 6-flavor discovery box wrapped with gold ribbon & handwritten card",
    rating: 4.98,
    reviewCount: 210,
    basePrice: 650,
    packSizes: [
      { size: "Box of 6 (Assorted)", pieces: 6, price: 650, isPopular: true, savings: "Includes Gift Wrap" },
      { size: "Box of 12 (Double Treats)", pieces: 12, price: 1250, isPopular: false, savings: "Save ₹150 + Free Gift Box" }
    ],
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=80"
    ],
    shortDesc: "The ultimate gifting experience. Six signature brownies in an embossed cocoa keepsake box with personalized note.",
    fullDesc: "Crafted for birthdays, anniversaries, corporate gifts, and heartfelt celebrations. Each keepsake gift box includes 1x Classic Fudge, 1x Walnut Crunch, 1x 85% Sea Salt, 1x Salted Caramel, 1x Hazelnut Praline, and 1x Date & Oat Guilt-Free. Tied with a silk chocolate ribbon and your custom printed love note.",
    healthyHighlights: [
      "6 distinctive artisanal recipes in one box",
      "Custom gift note on heavy textured stock",
      "Recyclable luxury packaging with gold foil seal",
      "Freshly baked and dispatched same day"
    ],
    ingredients: [
      "Assorted single-origin chocolates",
      "Selected dry fruits (walnuts, hazelnuts)",
      "Organic jaggery, raw cane and Medjool dates",
      "Pure country butter and dairy cream"
    ],
    nutrition: {
      servingSize: "Varies by flavor",
      calories: "210-245 kcal avg",
      refinedSugar: "0g across all varieties"
    },
    allergens: "Contains Dairy, Wheat, and Tree Nuts. Can be customized Eggless upon request.",
    isFeatured: true
  },
  {
    id: "grand-celebration-box",
    slug: "grand-celebration-hamper-12",
    name: "The Grand Celebration Hamper (12 Pieces)",
    category: "Gift Boxes",
    badge: "Celebration",
    tagline: "Full assortment with specialty wooden keepsake box & greeting candle",
    rating: 5.0,
    reviewCount: 88,
    basePrice: 1390,
    packSizes: [
      { size: "Grand Box of 12", pieces: 12, price: 1390, isPopular: true, savings: "Complimentary Express Delivery" }
    ],
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=80"
    ],
    shortDesc: "Our grandest showcase. 12 fresh bakery-warm brownies packed in a premium reusable textured magnetic gift trunk.",
    fullDesc: "A statement gift that turns any ordinary day into a feast. Contains pairs of our best-selling brownie creations individually wrapped to preserve that warm bakery freshness. Perfect for festive gifting, corporate appreciation, or family gatherings.",
    healthyHighlights: [
      "All 6 signature recipes included",
      "Individually wrapped to preserve peak moisture",
      "Includes handmade scented soy candle and custom wax-sealed note",
      "Free priority delivery"
    ],
    ingredients: [
      "Full spectrum artisanal ingredients: Single-origin cacaos, churned cream, roasted mountain nuts, raw jaggery"
    ],
    nutrition: {
      servingSize: "12 distinct brownies"
    },
    allergens: "Contains Dairy, Wheat, and Nuts.",
    isFeatured: false
  }
];

export const INGREDIENTS_SHOWCASE = [
  {
    name: "70% Single-Origin Cocoa",
    tagline: "Pure Bean-to-Batch Cacao",
    benefit: "Rich in antioxidants and magnesium, deep earthy notes with zero alkalized chemicals.",
    image: "https://images.unsplash.com/photo-1589218436045-ee320057f443?auto=format&fit=crop&w=700&q=80"
  },
  {
    name: "Organic Raw Jaggery",
    tagline: "Unrefined Native Sweetener",
    benefit: "Retains wholesome iron, calcium, and molasses minerals. Slow-burning energy without refined sugar crashes.",
    image: "https://images.unsplash.com/photo-1621236378699-8597fee6a1ce?auto=format&fit=crop&w=700&q=80"
  },
  {
    name: "Cold-Churned Farm Butter",
    tagline: "Traditional Fresh Dairy",
    benefit: "Freshly churned from grass-fed cows. No hydrogenated oils, palm fat, or trans-fat substitutes.",
    image: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=700&q=80"
  },
  {
    name: "Stoneground Whole Grains",
    tagline: "Oat & Unbleached Wheat",
    benefit: "Milled slowly to protect the natural wheat germ and prebiotic dietary fiber.",
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=700&q=80"
  }
];

export const PROCESS_STEPS = [
  {
    number: "01",
    title: "Honest Ingredients",
    headline: "60% Less Refined Sugar, 100% Real Food",
    desc: "We banish chemical preservatives, corn syrups, and cheap palm shortening. Every batch begins with whole single-origin cocoa, fresh cold-churned butter, and mineral-dense organic jaggery.",
    stat: "60%",
    statLabel: "Less Refined Sugar Than Store Brownies",
    badge: "Ingredient Integrity"
  },
  {
    number: "02",
    title: "Small-Batch Hand Mixing",
    headline: "Folded Gently By Hand, Never Industrial Vats",
    desc: "We melt pure chocolate gently over bain-marie steam and fold it by hand in micro-batches of only 12 trays at a time. This seals in the silky ribbons without beating out the cocoa butter aroma.",
    stat: "12",
    statLabel: "Trays Maximum Per Single Batch",
    badge: "Micro Artisanal"
  },
  {
    number: "03",
    title: "Slow Low-Temp Baking",
    headline: "Molten Center, Paper-Thin Crackle",
    desc: "Baking slow at precise lower temperatures allows the exterior meringue crust to set into delicate gossamer crackles while leaving the core rich, unctuous, and melt-in-the-mouth fudgy.",
    stat: "100%",
    statLabel: "Freshly Baked Fresh to Order",
    badge: "Oven Precision"
  },
  {
    number: "04",
    title: "Artisanal Keepsake Boxing",
    headline: "Hand-Wrapped in Cocoa Paper with Love",
    desc: "Each order is cut cleanly into hearty squares, sealed in compostable moisture wraps, and placed in our embossed cocoa keepsake gift box tied with hand-cut ribbon and your personalized card.",
    stat: "0%",
    statLabel: "Plastic Preservatives or Artificial Additives",
    badge: "Conscious Packaging"
  }
];

export const TESTIMONIALS = [
  {
    quote: "Hands down the most luxurious brownie I’ve tasted in my life. The fact that they use jaggery and zero refined sugar while staying this gooey is nothing short of sorcery!",
    author: "Dr. Ananya Subramanian",
    role: "Nutritionist & Food Critic",
    rating: 5,
    location: "Chennai"
  },
  {
    quote: "We ordered 40 gift boxes for our executive team Diwali hamper. Everyone messaged asking where they were from. The personalized note and packaging feel like a five-star hotel boutique.",
    author: "Vikram Malhotra",
    role: "Founder, TechVentures",
    rating: 5,
    location: "Bangalore"
  },
  {
    quote: "My kids cannot tell the difference between these and ultra-sugary store brownies, but I sleep peacefully knowing they're getting pure cocoa, real butter, and oat fiber. A staple in our house!",
    author: "Pooja Radhakrishnan",
    role: "Mother of Two & Fitness Enthusiast",
    rating: 5,
    location: "Coimbatore"
  }
];

export const FAQS = [
  {
    q: "Where do you deliver and how long does delivery take?",
    a: "We bake fresh to order from our home bakery studio. Within our local radius, we offer same-day and next-day express hand-delivery. For other cities, orders are vacuum-sealed in airtight eco-packaging and shipped via express courier reaching you in 24 to 48 hours."
  },
  {
    q: "How are your brownies healthier than commercial ones?",
    a: "Commercial brownies use cheap palm oil, bleached flour, preservatives, and up to 55g of white sugar per 100g. Crumbs of Love uses 100% dairy butter, organic raw jaggery / dates, stoneground grains, and antioxidant-rich 70%+ dark cocoa. No artificial colors, no palm oil, and zero synthetic preservatives."
  },
  {
    q: "Do you have 100% Eggless options?",
    a: "Yes! Our Pure Eggless Silk Fudge Brownie is strictly 100% vegetarian, made using hung yogurt and cold-pressed dairy cream to create the identical glossy crackly crust and fudgy center."
  },
  {
    q: "What is the shelf life and how should I store them?",
    a: "Since we do not use artificial preservatives, our brownies stay perfectly fresh for 5 days at room temperature in an airtight box, up to 14 days refrigerated, or up to 2 months frozen. Warm them in a microwave for 15-20 seconds before eating for an unforgettable molten chocolate experience!"
  },
  {
    q: "Can I add a custom handwritten message or request corporate bulk orders?",
    a: "Absolutely! During checkout you can enter a personalized gift message printed on our textured cardstock free of charge. For corporate hampers, wedding favors, or orders above 10 boxes, contact us via WhatsApp (+91 70109 87334) for customized sleeve branding and bulk rates."
  }
];

export const OUR_STORY_CARDS = [
  {
    title: "Handcrafted Daily",
    subtitle: "Micro-batch baked every sunrise",
    icon: "sparkles",
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Freshly Baked",
    subtitle: "Warm from our home studio oven",
    icon: "flame",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Made with Love",
    subtitle: "Zero preservatives, 100% wholesome",
    icon: "heart",
    image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&w=800&q=80"
  }
];

export const WHY_CHOOSE_US = [
  {
    title: "70%+ Single-Origin Cocoa",
    desc: "Unprocessed pure chocolate couverture rich in antioxidants and deep, earthy cocoa aroma.",
    icon: "sparkles"
  },
  {
    title: "Unrefined Jaggery & Zero Palm Oil",
    desc: "Sweetened purely with organic raw jaggery and raw cane. Free of refined white sugar, syrups, or hydrogenated oils.",
    icon: "heart"
  },
  {
    title: "Freshly Baked to Order",
    desc: "Every single brownie box is slow-baked specifically for you, never pulled from stale warehouse shelves.",
    icon: "flame"
  }
];

export const GALLERY_PHOTOS = [
  {
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=700&q=80",
    title: "Molten Fudge Pour",
    aspect: "tall"
  },
  {
    image: "https://images.unsplash.com/photo-1607920591413-4ec007e70023?auto=format&fit=crop&w=700&q=80",
    title: "Roasted Kashmiri Walnut",
    aspect: "square"
  },
  {
    image: "https://images.unsplash.com/photo-1589218436045-ee320057f443?auto=format&fit=crop&w=700&q=80",
    title: "Bittersweet Sea Salt Bar",
    aspect: "tall"
  },
  {
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=700&q=80",
    title: "Fresh Baked Oven Trays",
    aspect: "square"
  },
  {
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=700&q=80",
    title: "Artisanal Keepsake Gift Box",
    aspect: "tall"
  }
];

export const INSTAGRAM_POSTS = [
  {
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80",
    caption: "Slow-poured molten chocolate stream. Batch #142 fresh out of the oven.",
    likes: "1.2k"
  },
  {
    image: "https://images.unsplash.com/photo-1607920591413-4ec007e70023?auto=format&fit=crop&w=600&q=80",
    caption: "Golden roasted Kashmiri walnuts meeting 70% dark cocoa. Pure heaven.",
    likes: "890"
  },
  {
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80",
    caption: "Tied with love. 25 celebration hampers heading out this morning!",
    likes: "1.5k"
  },
  {
    image: "https://images.unsplash.com/photo-1589218436045-ee320057f443?auto=format&fit=crop&w=600&q=80",
    caption: "Flaky sea salt flakes over bittersweet 85% single-origin noir.",
    likes: "2.1k"
  }
];
