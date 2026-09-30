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
    id: "signature-brownie",
    slug: "signature-brownie",
    name: "Signature Brownie",
    category: "Brownies",
    badge: "House Special",
    tagline: "Our classic fudgy house-special brownie",
    rating: 4.95,
    reviewCount: 168,
    basePrice: 280, // Box of 4
    packSizes: [
      { size: "Box of 4", pieces: 4, price: 280, isPopular: false },
      { size: "Box of 6", pieces: 6, price: 410, isPopular: true, savings: "Save ₹10" },
      { size: "Box of 12", pieces: 12, price: 790, isPopular: false, savings: "Save ₹50" }
    ],
    /* TODO: replace with real Signature Brownie photo */
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1589218436045-ee320057f443?auto=format&fit=crop&w=900&q=80"
    ],
    shortDesc: "Our classic fudgy house-special brownie made with 70% dark cocoa, pure dairy butter, and raw cane sugar.",
    fullDesc: "The timeless house-special that defines Crumbs of Love. Baked slow at low heat to develop a rich, dense molten center enveloped by a paper-thin glossy crackle crust. Hand-stirred using single-origin dark cocoa, churned dairy butter, and unrefined raw cane sugar for wholesome indulgence.",
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
      "Farm-Fresh Free-Range Eggs",
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
    id: "almond-brownie",
    slug: "almond-brownie",
    name: "Almond Brownie",
    category: "Brownies",
    badge: "Nutty Crunch",
    tagline: "Fudgy brownie topped and mixed with roasted almonds",
    rating: 4.9,
    reviewCount: 114,
    basePrice: 320,
    packSizes: [
      { size: "Box of 4", pieces: 4, price: 320, isPopular: false },
      { size: "Box of 6", pieces: 6, price: 460, isPopular: true, savings: "Save ₹20" },
      { size: "Box of 12", pieces: 12, price: 890, isPopular: false, savings: "Save ₹70" }
    ],
    image: "/assets/menu/almond-brownie.jpg",
    gallery: [
      "/assets/menu/almond-brownie.jpg"
    ],
    shortDesc: "Fudgy dark chocolate brownie generously topped and folded with slow-roasted, crunchy California almonds.",
    fullDesc: "Slow-roasted California almonds toasted until fragrant, folded generously into our rich dark cocoa batter and topped with whole sliced almonds for the ultimate satisfying crunch in every velvety bite.",
    healthyHighlights: [
      "Generously packed with slow-roasted premium almonds",
      "Rich in natural Vitamin E and healthy monounsaturated fats",
      "Sweetened with mineral-rich raw cane sugar",
      "Zero artificial preservatives or trans fats"
    ],
    ingredients: [
      "Slow-Roasted California Almonds",
      "70% Dark Couverture Chocolate",
      "Cold-Churned Farm Butter",
      "Organic Raw Cane Sugar",
      "Stoneground Wheat Flour",
      "Farm Fresh Eggs",
      "Madagascar Vanilla"
    ],
    nutrition: {
      servingSize: "1 Brownie Square (80g)",
      calories: "235 kcal",
      protein: "6.2g",
      carbs: "20g",
      healthyFats: "15g",
      refinedSugar: "0g"
    },
    allergens: "Contains Tree Nuts (Almonds), Dairy, and Wheat.",
    isFeatured: true
  },
  {
    id: "double-chocolate-brownie",
    slug: "double-chocolate-brownie",
    name: "Double Chocolate Brownie",
    category: "Brownies",
    badge: "Intense Cocoa",
    tagline: "Extra cocoa with chocolate chunks baked right in",
    rating: 4.92,
    reviewCount: 96,
    basePrice: 310,
    packSizes: [
      { size: "Box of 4", pieces: 4, price: 310, isPopular: false },
      { size: "Box of 6", pieces: 6, price: 450, isPopular: true, savings: "Save ₹15" },
      { size: "Box of 12", pieces: 12, price: 870, isPopular: false, savings: "Save ₹60" }
    ],
    image: "/assets/menu/double-choco-brownie.jpg",
    gallery: [
      "/assets/menu/double-choco-brownie.jpg"
    ],
    shortDesc: "Deep dark chocolate batter loaded with melted chocolate chunks baked inside for double the richness.",
    fullDesc: "For the uncompromising chocoholic. We double down on 75% dark chocolate couverture and fold in generous hand-cut chocolate chunks that melt into gooey pockets when warmed.",
    healthyHighlights: [
      "Double dose of high-antioxidant cocoa solids",
      "Hand-chopped couverture chunks without paraffin wax",
      "Low GI organic jaggery and brown sugar blend",
      "Freshly baked in micro-batches daily"
    ],
    ingredients: [
      "Double West African Dark Chocolate Couverture",
      "Single-Origin Cocoa Mass",
      "Fresh Churned Country Butter",
      "Unrefined Raw Cane",
      "Whole Wheat Flour",
      "Eggs",
      "Sea Salt"
    ],
    nutrition: {
      servingSize: "1 Brownie Square (80g)",
      calories: "230 kcal",
      protein: "5.1g",
      carbs: "23g",
      healthyFats: "13g",
      refinedSugar: "0g"
    },
    allergens: "Contains Dairy and Wheat.",
    isFeatured: false
  },
  {
    id: "triple-chocolate-brownie",
    slug: "triple-chocolate-brownie",
    name: "Triple Chocolate Brownie",
    category: "Brownies",
    badge: "Decadent Swirl",
    tagline: "Dark, milk, and white chocolate layered and swirled",
    rating: 4.96,
    reviewCount: 132,
    basePrice: 330,
    packSizes: [
      { size: "Box of 4", pieces: 4, price: 330, isPopular: false },
      { size: "Box of 6", pieces: 6, price: 480, isPopular: true, savings: "Save ₹15" },
      { size: "Box of 12", pieces: 12, price: 920, isPopular: false, savings: "Save ₹70" }
    ],
    image: "/assets/menu/triple-choco-brownie.jpg",
    gallery: [
      "/assets/menu/triple-choco-brownie.jpg"
    ],
    shortDesc: "Harmonious layers of dark, milk, and white chocolate swirled for a rich multi-dimensional taste.",
    fullDesc: "A tri-flavor symphony. Deep dark cocoa fudge base layered with creamy milk chocolate drops and swirled with velvety white chocolate for a showstopping contrast of flavor notes.",
    healthyHighlights: [
      "Triple cocoa profile with real cocoa butter",
      "No palm oil or confectionery compound fats",
      "Balanced natural sweetness with raw demerara",
      "Artisan-crafted swirled pattern on every square"
    ],
    ingredients: [
      "Dark Cocoa Couverture (70%)",
      "Whole Milk Chocolate",
      "Pure Cocoa Butter White Chocolate",
      "Farm Butter",
      "Raw Demerara Cane",
      "Wheat Flour",
      "Vanilla Bean"
    ],
    nutrition: {
      servingSize: "1 Brownie Square (80g)",
      calories: "240 kcal",
      protein: "4.9g",
      carbs: "24g",
      healthyFats: "14g",
      refinedSugar: "0g"
    },
    allergens: "Contains Dairy and Wheat.",
    isFeatured: false
  },
  {
    id: "dream-cake",
    slug: "dream-cake",
    name: "Dream Cake",
    category: "Cakes",
    badge: "Celebration Special",
    tagline: "Soft layered celebration-style cake with rich ganache",
    rating: 4.98,
    reviewCount: 184,
    basePrice: 450,
    packSizes: [
      { size: "Petite Tin (500g)", pieces: 1, price: 450, isPopular: true },
      { size: "Grand Tin (1kg)", pieces: 1, price: 850, isPopular: false, savings: "Save ₹50" }
    ],
    image: "/assets/menu/dream-cake.jpg",
    gallery: [
      "/assets/menu/dream-cake.jpg"
    ],
    shortDesc: "Soft multi-layer celebration cake featuring tender chocolate sponge, rich mousse, and crackly chocolate shell.",
    fullDesc: "Our viral 5-in-1 celebration Dream Cake. Layers of moist sponge cake, silky milk chocolate cream, rich dark ganache, and a thin crackling Belgian chocolate top layer that snaps under your spoon.",
    healthyHighlights: [
      "5 luxurious artisanal layers in an airtight reusable keepsake tin",
      "Made with fresh heavy dairy cream and pure Belgian chocolate",
      "Zero artificial stabilizers, gels, or food coloring",
      "Perfect centerpiece for birthdays, anniversaries, and parties"
    ],
    ingredients: [
      "Belgian Chocolate Ganache",
      "Fresh Dairy Cream Mousse",
      "Cocoa Sponge Cake",
      "Cold-Churned Butter",
      "Organic Cane Sugar",
      "Eggs",
      "Cocoa Powder Dusting"
    ],
    nutrition: {
      servingSize: "1 Portion (100g)",
      calories: "280 kcal",
      protein: "5.5g",
      carbs: "29g",
      healthyFats: "16g",
      refinedSugar: "0g"
    },
    allergens: "Contains Dairy, Eggs, and Wheat.",
    isFeatured: true
  },
  {
    id: "rose-milk-tres-leches",
    slug: "rose-milk-tres-leches",
    name: "Rose Milk Tres Leches",
    category: "Tres Leches",
    badge: "Nostalgic Flavor",
    tagline: "Tres leches sponge soaked in rose-flavored milk",
    rating: 4.94,
    reviewCount: 147,
    basePrice: 260,
    packSizes: [
      { size: "Single Tub (300g)", pieces: 1, price: 260, isPopular: true },
      { size: "Party Tub (600g)", pieces: 1, price: 490, isPopular: false, savings: "Save ₹30" }
    ],
    image: "/assets/menu/rose-milk-tres-leches.jpg",
    gallery: [
      "/assets/menu/rose-milk-tres-leches.jpg"
    ],
    shortDesc: "Pillowy sponge cake soaked in fragrant Chennai rose-infused three milks, crowned with fresh whipped cream.",
    fullDesc: "A South Indian love letter to the Latin classic. Feathery-light sponge soaked in chilled milk infused with natural Damascus rose extracts and cardamom, finished with cloud-soft whipped cream and dried edible rose petals.",
    healthyHighlights: [
      "Naturally infused with pure floral Damascus rose petal essence",
      "Soaked in three wholesome fresh farm milks",
      "Light, airy texture with lower sweetness profile",
      "Freshly prepared and chilled for peak refreshment"
    ],
    ingredients: [
      "Pure Farm Whole Milk & Condensed Dairy",
      "Natural Damascus Rose Petal Extract",
      "Cardamom Pods",
      "Whipped Fresh Cream",
      "Chiffon Sponge Flour",
      "Free-Range Eggs",
      "Raw Sugar"
    ],
    nutrition: {
      servingSize: "1 Tub (150g)",
      calories: "215 kcal",
      protein: "6.0g",
      carbs: "26g",
      healthyFats: "10g",
      refinedSugar: "0g"
    },
    allergens: "Contains Dairy and Eggs.",
    isFeatured: true
  },
  {
    id: "paan-tres-leches",
    slug: "paan-tres-leches",
    name: "Paan Tres Leches",
    category: "Tres Leches",
    badge: "Artisanal Fusion",
    tagline: "Tres leches sponge soaked in paan betel-leaf flavored milk",
    rating: 4.91,
    reviewCount: 89,
    basePrice: 270,
    packSizes: [
      { size: "Single Tub (300g)", pieces: 1, price: 270, isPopular: true },
      { size: "Party Tub (600g)", pieces: 1, price: 510, isPopular: false, savings: "Save ₹30" }
    ],
    image: "/assets/menu/paan-tres-leches.jpg",
    gallery: [
      "/assets/menu/paan-tres-leches.jpg"
    ],
    shortDesc: "Airy sponge soaked in sweet betel-leaf paan milk infused with aromatic gulkand and fennel.",
    fullDesc: "An inventive post-dinner fusion dessert. Our delicate chiffon sponge is soaked in chilled milk steeped with fresh Maghai betel leaves, aromatic rose petal gulkand, and slivered pistachios for a soothing, floral finish.",
    healthyHighlights: [
      "Freshly steeped Maghai paan leaves and traditional gulkand",
      "Soothing digestive botanicals: fennel and green cardamom",
      "No artificial food colorings or synthetic essences",
      "Handcrafted dairy soak served ice-cold"
    ],
    ingredients: [
      "Fresh Betel (Paan) Leaf Steep",
      "Artisanal Rose Gulkand",
      "Three Milks Blend",
      "Green Cardamom & Fennel",
      "Pistachio Slivers",
      "Chiffon Sponge",
      "Whipped Cream"
    ],
    nutrition: {
      servingSize: "1 Tub (150g)",
      calories: "220 kcal",
      protein: "5.8g",
      carbs: "27g",
      healthyFats: "10g",
      refinedSugar: "0g"
    },
    allergens: "Contains Dairy, Eggs, and Tree Nuts (Pistachios).",
    isFeatured: false
  },
  {
    id: "tiramisu",
    slug: "tiramisu",
    name: "Tiramisu",
    category: "Specials",
    badge: "Italian Classic",
    tagline: "Classic coffee-mascarpone layered dessert",
    rating: 4.97,
    reviewCount: 160,
    basePrice: 320,
    packSizes: [
      { size: "Single Jar (250g)", pieces: 1, price: 320, isPopular: true },
      { size: "Sharing Box (500g)", pieces: 1, price: 590, isPopular: false, savings: "Save ₹50" }
    ],
    image: "/assets/menu/tiramisu.jpg",
    gallery: [
      "/assets/menu/tiramisu.jpg"
    ],
    shortDesc: "Classic Italian dessert made with fresh espresso-soaked ladyfingers, velvety mascarpone cream, and dark cocoa.",
    fullDesc: "Authentic, airy, and deeply caffeinated. Freshly brewed South Indian filter coffee & espresso soak artisanal sponge biscuits layered with light sweetened mascarpone zabaglione, dusted generously with 100% bitter cocoa powder.",
    healthyHighlights: [
      "Freshly brewed single-estate artisanal espresso",
      "Genuine imported mascarpone cheese & fresh dairy cream",
      "Zero alcohol or artificial coffee syrups",
      "Finished with pure 100% unsweetened Dutch cocoa dust"
    ],
    ingredients: [
      "Artisanal Espresso & Arabica Brew",
      "Imported Mascarpone Cheese",
      "Fresh Dairy Cream",
      "Handmade Savoiardi Sponge",
      "Free-Range Egg Yolks",
      "Raw Sugar",
      "100% Dutch Cocoa"
    ],
    nutrition: {
      servingSize: "1 Serving (125g)",
      calories: "260 kcal",
      protein: "5.2g",
      carbs: "22g",
      healthyFats: "17g",
      refinedSugar: "0g"
    },
    allergens: "Contains Dairy, Eggs, and Wheat.",
    isFeatured: false
  },
  {
    id: "banana-cake",
    slug: "banana-cake",
    name: "Banana Cake",
    category: "Cakes",
    badge: "Naturally Moist",
    tagline: "Moist banana sponge cake baked fresh with ripe bananas",
    rating: 4.88,
    reviewCount: 78,
    basePrice: 290,
    packSizes: [
      { size: "Loaf (450g)", pieces: 1, price: 290, isPopular: true },
      { size: "Family Loaf (900g)", pieces: 1, price: 540, isPopular: false, savings: "Save ₹40" }
    ],
    image: "/assets/menu/banana-cake.jpg",
    gallery: [
      "/assets/menu/banana-cake.jpg"
    ],
    shortDesc: "Wholesome, naturally sweet sponge cake made with caramelized ripe bananas and stoneground wheat.",
    fullDesc: "Sun-ripened local Robusta bananas caramelized naturally and folded into unbleached wheat flour and country butter. Subtly scented with freshly grated nutmeg and cinnamon for a wholesome, comforting tea-time slice.",
    healthyHighlights: [
      "Over 40% real caramelized ripe bananas for natural sweetness",
      "Stoneground whole wheat with healthy prebiotic fiber",
      "No refined white flour, palm oil, or preservatives",
      "Baked to a golden crust with a tender, moist interior"
    ],
    ingredients: [
      "Ripe Natural Robusta Bananas",
      "Stoneground Wheat",
      "Fresh Churned Butter",
      "Organic Jaggery & Raw Cane",
      "Farm Fresh Eggs",
      "Ceylon Cinnamon & Nutmeg",
      "Baking Soda"
    ],
    nutrition: {
      servingSize: "1 Slice (75g)",
      calories: "185 kcal",
      protein: "3.9g",
      carbs: "28g",
      healthyFats: "7g",
      refinedSugar: "0g (Naturally sweetened)"
    },
    allergens: "Contains Dairy, Eggs, and Wheat.",
    isFeatured: false
  },
  {
    id: "lava-cake",
    slug: "lava-cake",
    name: "Lava Cake",
    category: "Cakes",
    badge: "Molten Heart",
    tagline: "Warm chocolate cake with a molten center",
    rating: 4.95,
    reviewCount: 140,
    basePrice: 240,
    packSizes: [
      { size: "Twin Pack (2 pcs)", pieces: 2, price: 240, isPopular: true },
      { size: "Party Pack (4 pcs)", pieces: 4, price: 450, isPopular: false, savings: "Save ₹30" }
    ],
    image: "/assets/menu/lava-cake.jpg",
    gallery: [
      "/assets/menu/lava-cake.jpg"
    ],
    shortDesc: "Warm single-origin dark chocolate cake that reveals a rich, molten chocolate river when sliced.",
    fullDesc: "Pure chocolate drama. Individual dark chocolate cakes baked to a soft outer cake ring while maintaining a luscious molten chocolate lava center. Warm for 20 seconds before serving for chocolate bliss.",
    healthyHighlights: [
      "72% single-origin dark chocolate center with genuine molten flow",
      "Pure dairy butter and free-range egg emulsion",
      "Zero artificial molten fillings, gels, or stabilizers",
      "Best enjoyed warm with a scoop of vanilla ice cream"
    ],
    ingredients: [
      "72% Single-Origin Cocoa Couverture",
      "Cold-Churned Farm Butter",
      "Organic Raw Cane",
      "Free-Range Eggs",
      "Stoneground Wheat",
      "Madagascar Vanilla",
      "Sea Salt"
    ],
    nutrition: {
      servingSize: "1 Lava Cake (90g)",
      calories: "250 kcal",
      protein: "5.0g",
      carbs: "25g",
      healthyFats: "15g",
      refinedSugar: "0g"
    },
    allergens: "Contains Dairy, Eggs, and Wheat.",
    isFeatured: true
  },
  {
    id: "mutta-mittai",
    slug: "mutta-mittai",
    name: "Mutta Mittai",
    category: "Specials",
    badge: "Traditional Heritage",
    tagline: "Traditional egg-based sweet crafted with pure country eggs & cardamom",
    rating: 4.99,
    reviewCount: 124,
    basePrice: 250,
    packSizes: [
      { size: "Box of 6", pieces: 6, price: 250, isPopular: false },
      { size: "Box of 12", pieces: 12, price: 480, isPopular: true, savings: "Save ₹20" },
      { size: "Box of 24", pieces: 24, price: 890, isPopular: false, savings: "Save ₹110" }
    ],
    image: "/assets/menu/muttai-mittai.jpg",
    gallery: [
      "/assets/menu/muttai-mittai.jpg"
    ],
    shortDesc: "Heritage Tamil Nadu egg sweet slow-simmered with farm egg yolks, pure ghee, and cardamom sugar glaze.",
    fullDesc: "An authentic, cherished Tamil heritage delicacy from coastal Tamil Nadu. Handcrafted in small batches using rich farm egg yolks, pure desi ghee, and cardamom-infused sugar syrup cooked gently to achieve that signature golden-brown, glossy melt-in-the-mouth texture.",
    healthyHighlights: [
      "Rare traditional South Indian heritage recipe made from scratch",
      "100% pure desi ghee and free-range country eggs",
      "Fragrant green cardamom and slow-cooked caramelized glaze",
      "Zero artificial food colors, preservatives, or fillers"
    ],
    ingredients: [
      "Farm Fresh Free-Range Egg Yolks",
      "Pure Desi Cow Ghee",
      "Organic Cane Sugar Syrup",
      "Fresh Ground Green Cardamom",
      "A Hint of Saffron"
    ],
    nutrition: {
      servingSize: "2 Sweet Pieces (50g)",
      calories: "170 kcal",
      protein: "4.5g",
      carbs: "18g",
      healthyFats: "9g",
      refinedSugar: "0g (Pure cane syrup)"
    },
    allergens: "Contains Eggs and Dairy (Ghee).",
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
