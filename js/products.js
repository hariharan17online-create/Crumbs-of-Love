/**
 * CRUMBS OF LOVE - PRODUCT RENDERING, FILTERING & PDP ENGINE
 * Handles shop catalog filtering, sorting, product card generation,
 * and the complete interactive Product Detail Page (PDP).
 */

import { PRODUCTS, STORE_CONFIG } from './data.js';
import { cartManager } from './cart.js';

const gsap = typeof window !== 'undefined' ? window.gsap : null;

export class ProductEngine {
  constructor() {
    this.currentCategory = 'All';
    this.searchQuery = '';
    this.currentSort = 'featured';
  }

  /* Generate standard product card HTML */
  createCardHTML(product) {
    const isWish = cartManager.isWishlisted(product.id);
    const minPrice = product.basePrice || product.packSizes[0].price;
    const categoryIconName = product.category === 'Nutty' ? 'cookie' : product.category === 'Guilt-Free' ? 'leaf' : 'award';

    return `
      <div class="product-card bg-[#FCFCFA] rounded-3xl pt-16 pb-6 px-6 border border-[#E7DDD2] shadow-sm hover:shadow-lg transition-all duration-300 relative flex flex-col justify-between items-center text-center group mt-12" data-product-id="${product.id}" data-category="${product.category}">
        
        <!-- Floating Circular Product Image sitting above card -->
        <a href="product.html?id=${product.id}" class="absolute -top-12 inset-x-0 mx-auto w-24 h-24 rounded-full border-4 border-[#FCFCFA] shadow-md overflow-hidden bg-[#F6EBDD] group-hover:scale-105 transition-transform duration-500 block">
          <img 
            src="${product.image}" 
            alt="${product.name}" 
            loading="lazy"
            class="w-full h-full object-cover"
          />
        </a>

        <!-- Wishlist Button in Top-Right -->
        <button 
          data-wishlist-toggle 
          data-product-id="${product.id}"
          class="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#F6EBDD] text-[#2C201B]/50 hover:text-[#981C0A] flex items-center justify-center transition-all ${isWish ? 'text-[#981C0A] fill-current' : ''}"
          aria-label="Save to favorites"
        >
          <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-width="1.8" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
          </svg>
        </button>

        <div class="w-full space-y-2 mt-2">
          <div class="flex items-center justify-center space-x-1.5 text-2xs font-bold text-[#D98F4E] uppercase tracking-wider">
            <i data-lucide="${categoryIconName}" class="w-3.5 h-3.5 text-[#D98F4E]"></i>
            <span>${product.badge || product.category}</span>
          </div>

          <h3 class="font-display text-base font-bold text-[#2C201B] uppercase tracking-wide group-hover:text-[#981C0A] transition-colors line-clamp-1">
            <a href="product.html?id=${product.id}">${product.name}</a>
          </h3>

          <p class="text-xs text-[#72665D] line-clamp-2 leading-relaxed">
            ${product.shortDesc}
          </p>
        </div>

        <div class="w-full pt-4 mt-4 border-t border-[#E7DDD2]/60 flex flex-col items-center gap-3">
          <div class="flex items-baseline space-x-1">
            <span class="text-2xs text-[#72665D] font-medium">From</span>
            <span class="font-display text-lg font-bold text-[#981C0A]">${STORE_CONFIG.currency}${minPrice}</span>
          </div>
          
          <a href="product.html?id=${product.id}" class="w-full py-2.5 px-4 rounded-full bg-[#981C0A] hover:bg-[#801708] text-[#FCFCFA] font-bold text-xs flex items-center justify-center space-x-1.5 transition-all shadow-sm">
            <span>Order Now</span>
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
          </a>
        </div>

      </div>
    `;
  }

  /* Shop Grid Controller */
  initShopPage() {
    const grid = document.getElementById('shop-product-grid');
    if (!grid) return;

    // Render initially
    this.renderShopGrid();

    // Bind Category Filter Pills
    const filterPills = document.querySelectorAll('[data-filter-category]');
    filterPills.forEach(pill => {
      pill.addEventListener('click', (e) => {
        e.preventDefault();
        filterPills.forEach(p => {
          p.classList.remove('bg-[#981C0A]', 'text-[#FCFCFA]', 'shadow-sm');
          p.classList.add('bg-[#FCFCFA]', 'text-[#2C201B]', 'hover:bg-[#F6EBDD]');
        });
        pill.classList.remove('bg-[#FCFCFA]', 'text-[#2C201B]', 'hover:bg-[#F6EBDD]');
        pill.classList.add('bg-[#981C0A]', 'text-[#FCFCFA]', 'shadow-sm');

        this.currentCategory = pill.dataset.filterCategory;
        this.renderShopGrid();
      });
    });

    // Search input
    const searchInput = document.getElementById('shop-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value.toLowerCase().trim();
        this.renderShopGrid();
      });
    }

    // Sort select
    const sortSelect = document.getElementById('shop-sort-select');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        this.currentSort = e.target.value;
        this.renderShopGrid();
      });
    }

    // Quick add delegation
    document.addEventListener('click', (e) => {
      const qAdd = e.target.closest('[data-quick-add]');
      if (qAdd) {
        e.preventDefault();
        const pid = qAdd.dataset.quickAdd;
        cartManager.addItem(pid);
      }

      const wishBtn = e.target.closest('[data-wishlist-toggle]');
      if (wishBtn) {
        e.preventDefault();
        const pid = wishBtn.dataset.productId;
        cartManager.toggleWishlist(pid);
      }
    });
  }

  renderShopGrid() {
    const grid = document.getElementById('shop-product-grid');
    const countDisplay = document.getElementById('shop-results-count');
    if (!grid) return;

    // Filter
    let filtered = PRODUCTS.filter(p => {
      const matchesCat = this.currentCategory === 'All' || p.category.toLowerCase() === this.currentCategory.toLowerCase();
      const matchesSearch = !this.searchQuery || 
        p.name.toLowerCase().includes(this.searchQuery) ||
        p.shortDesc.toLowerCase().includes(this.searchQuery) ||
        p.ingredients.some(ing => ing.toLowerCase().includes(this.searchQuery));
      return matchesCat && matchesSearch;
    });

    // Sort
    if (this.currentSort === 'price-low') {
      filtered.sort((a, b) => a.basePrice - b.basePrice);
    } else if (this.currentSort === 'price-high') {
      filtered.sort((a, b) => b.basePrice - a.basePrice);
    } else if (this.currentSort === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    if (countDisplay) {
      countDisplay.textContent = `Showing ${filtered.length} healthy treats`;
    }

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="col-span-full py-16 text-center">
          <div class="w-16 h-16 mx-auto mb-3 rounded-full bg-cream-soft flex items-center justify-center text-caramel">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          </div>
          <h3 class="font-serif text-2xl font-bold text-cocoa mb-1">No brownies found</h3>
          <p class="text-sm text-cocoa-muted mb-4">Try clearing your search terms or picking another category.</p>
          <button onclick="document.getElementById('shop-search-input').value=''; window.productEngine.currentCategory='All'; window.productEngine.renderShopGrid();" class="px-5 py-2.5 rounded-full bg-cocoa text-warm-white text-xs font-semibold">
            Reset Filters
          </button>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map(p => this.createCardHTML(p)).join('');

    // Smooth subtle entrance
    if (window.gsap) {
      try {
        window.gsap.fromTo(grid.children, 
          { y: 20, opacity: 0 }, 
          { y: 0, opacity: 1, duration: 0.45, stagger: 0.04, ease: 'power2.out' }
        );
      } catch (e) {}
    }
  }

  /* Product Detail Page (PDP) Builder */
  initDetailPage() {
    const pdpContainer = document.getElementById('product-detail-container');
    if (!pdpContainer) return;

    // Get product ID from query parameter: ?id=classic-fudge
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id') || 'classic-fudge';
    const product = PRODUCTS.find(p => p.id === productId) || PRODUCTS[0];

    // State for PDP
    let selectedPack = product.packSizes[0];
    let currentQty = 1;

    // Update document title & metadata
    document.title = `${product.name} | Crumbs of Love`;

    // Render PDP
    pdpContainer.innerHTML = `
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        
        <!-- Left: Image Gallery -->
        <div class="lg:col-span-7 space-y-4">
          <!-- Main Zoomable Image -->
          <div class="relative w-full aspect-[4/3] sm:aspect-square rounded-3xl overflow-hidden bg-[#FCFCFA] border border-[#E7DDD2] shadow-sm group">
            <img 
              id="pdp-main-image" 
              src="${product.image}" 
              alt="${product.name}" 
              class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            
            ${product.badge ? `
              <span class="absolute top-4 left-4 px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full bg-[#981C0A] text-[#FCFCFA] shadow-md">
                ${product.badge}
              </span>
            ` : ''}

            <button 
              data-wishlist-toggle 
              data-product-id="${product.id}"
              class="absolute top-4 right-4 w-11 h-11 rounded-full bg-[#FCFCFA]/90 backdrop-blur-md flex items-center justify-center text-[#2C201B]/60 hover:text-[#981C0A] shadow-md transition-all hover:scale-110 active:scale-95 ${cartManager.isWishlisted(product.id) ? 'text-[#981C0A] fill-current' : ''}"
              aria-label="Save to favorites"
            >
              <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path stroke="currentColor" stroke-width="1.8" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
            </button>
          </div>

          <!-- Thumbnails Strip -->
          <div class="flex space-x-3 overflow-x-auto pb-2">
            ${(product.gallery || [product.image]).map((img, i) => `
              <button 
                class="pdp-thumb-btn w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all flex-shrink-0 ${i === 0 ? 'border-[#981C0A] scale-95 shadow-sm' : 'border-transparent opacity-70 hover:opacity-100'}"
                data-thumb-src="${img}"
              >
                <img src="${img}" alt="${product.name} view ${i+1}" class="w-full h-full object-cover" />
              </button>
            `).join('')}
          </div>

          <!-- Health Highlights Badge Grid -->
          <div class="grid grid-cols-2 gap-3 pt-4">
            ${product.healthyHighlights.map(highlight => `
              <div class="p-3.5 rounded-2xl bg-[#FCFCFA] border border-[#E7DDD2] flex items-start space-x-2.5">
                <i data-lucide="check" class="w-4 h-4 text-[#981C0A] flex-shrink-0 mt-0.5"></i>
                <span class="text-xs text-[#2C201B] font-medium leading-relaxed">${highlight}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Right: Purchase Controls & Story -->
        <div class="lg:col-span-5 space-y-6">
          
          <!-- Header -->
          <div>
            <div class="flex items-center space-x-2 text-xs font-bold text-[#D98F4E] uppercase tracking-wider mb-2">
              <span>${product.category}</span>
              <span>•</span>
              <div class="flex items-center text-[#D98F4E] space-x-1">
                <i data-lucide="star" class="w-3.5 h-3.5 text-[#D98F4E] fill-current"></i>
                <span class="text-[#2C201B] font-bold ml-1">${product.rating}</span>
                <span class="text-[#72665D] ml-1">(${product.reviewCount} reviews)</span>
              </div>
            </div>

            <h1 class="font-display text-2xl sm:text-4xl font-black text-[#2C201B] leading-tight uppercase tracking-tight">
              ${product.name}
            </h1>
            
            <p class="text-sm text-[#72665D] font-medium italic mt-2">
              "${product.tagline}"
            </p>
          </div>

          <!-- Price Display -->
          <div class="p-5 rounded-3xl bg-[#FCFCFA] border border-[#E7DDD2] flex items-center justify-between shadow-sm">
            <div>
              <span class="text-xs text-[#72665D] block">Selected Pack Total</span>
              <span id="pdp-calculated-price" class="font-display text-3xl font-black text-[#981C0A]">
                ${STORE_CONFIG.currency}${selectedPack.price * currentQty}
              </span>
            </div>
            <span class="text-xs font-bold text-[#FCFCFA] bg-[#981C0A] px-3.5 py-1.5 rounded-full shadow-sm">
              Freshly Baked to Order
            </span>
          </div>

          <!-- Pack Size Selector -->
          <div class="space-y-2.5">
            <label class="block text-xs font-bold uppercase tracking-wider text-[#2C201B]">
              Select Pack Size:
            </label>
            <div class="grid grid-cols-3 gap-2.5">
              ${product.packSizes.map((pack, idx) => `
                <button 
                  data-pack-select="${pack.size}" 
                  class="pdp-pack-btn p-3 rounded-2xl border text-center transition-all flex flex-col justify-between ${idx === 0 ? 'border-[#981C0A] bg-[#981C0A] text-[#FCFCFA] shadow-md' : 'border-[#E7DDD2] bg-[#FCFCFA] text-[#2C201B] hover:border-[#D98F4E]'}"
                >
                  <span class="text-xs font-bold block">${pack.size}</span>
                  <span class="text-2xs opacity-80 block">${pack.pieces} squares</span>
                  <span class="text-xs font-display font-bold mt-1 block">${STORE_CONFIG.currency}${pack.price}</span>
                  ${pack.savings ? `<span class="text-[10px] text-[#D98F4E] font-bold mt-0.5">${pack.savings}</span>` : ''}
                </button>
              `).join('')}
            </div>
          </div>

          <!-- Quantity Stepper & Add to Cart -->
          <div class="space-y-3 pt-2">
            <div class="flex items-center space-x-3">
              <!-- Stepper -->
              <div class="flex items-center border border-[#E7DDD2] rounded-full bg-[#FCFCFA] p-1 shadow-sm">
                <button id="pdp-qty-minus" class="w-10 h-10 rounded-full flex items-center justify-center text-[#2C201B] hover:bg-[#F6EBDD] font-bold transition-colors">
                  −
                </button>
                <span id="pdp-qty-display" class="w-10 text-center font-bold text-[#2C201B] text-sm">
                  1
                </span>
                <button id="pdp-qty-plus" class="w-10 h-10 rounded-full flex items-center justify-center text-[#2C201B] hover:bg-[#F6EBDD] font-bold transition-colors">
                  +
                </button>
              </div>

              <!-- Main Add to Cart Button -->
              <button 
                id="pdp-add-cart-btn" 
                class="flex-1 py-4 px-6 rounded-full bg-[#981C0A] hover:bg-[#801708] text-[#FCFCFA] font-bold text-sm shadow-md flex items-center justify-center space-x-2 transform active:scale-[0.98] transition-all hover:scale-[1.02]"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
                <span id="pdp-add-label">Add to Brownie Box • ${STORE_CONFIG.currency}${selectedPack.price}</span>
              </button>
            </div>

            <!-- WhatsApp Inquire Button -->
            <button 
              id="pdp-whatsapp-btn"
              class="w-full py-3 px-4 rounded-full bg-[#FCFCFA] hover:bg-[#F6EBDD] border border-[#E7DDD2] text-[#2C201B] font-bold text-xs flex items-center justify-center space-x-2 transition-all shadow-sm"
            >
              <svg class="w-4 h-4 fill-[#25D366]" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
              <span>Ask Baker Gopika on WhatsApp (${STORE_CONFIG.displayPhone})</span>
            </button>
          </div>

          <!-- Description Accordion / Tabs -->
          <div class="space-y-3 pt-4 border-t border-[#E7DDD2] text-sm text-[#2C201B]">
            
            <!-- Full Story -->
            <div class="p-5 rounded-2xl bg-[#FCFCFA] border border-[#E7DDD2] space-y-2">
              <h4 class="font-display font-bold text-sm text-[#2C201B] uppercase tracking-wide">The Baker's Story</h4>
              <p class="text-xs text-[#72665D] leading-relaxed">${product.fullDesc}</p>
            </div>

            <!-- Ingredients breakdown -->
            <div class="p-5 rounded-2xl bg-[#FCFCFA] border border-[#E7DDD2] space-y-2">
              <h4 class="font-display font-bold text-sm text-[#2C201B] uppercase tracking-wide">Wholesome Ingredients</h4>
              <div class="flex flex-wrap gap-1.5 pt-1">
                ${product.ingredients.map(ing => `
                  <span class="px-3 py-1 text-2xs font-semibold rounded-full bg-[#F6EBDD] text-[#2C201B] border border-[#E7DDD2]">
                    ${ing}
                  </span>
                `).join('')}
              </div>
            </div>

            <!-- Nutrition Facts Table -->
            <div class="p-5 rounded-2xl bg-[#FCFCFA] border border-[#E7DDD2] space-y-2">
              <div class="flex justify-between items-center">
                <h4 class="font-display font-bold text-sm text-[#2C201B] uppercase tracking-wide">Nutrition Transparency</h4>
                <span class="text-2xs text-[#72665D]">${product.nutrition.servingSize}</span>
              </div>
              <div class="grid grid-cols-2 gap-2 text-xs pt-1">
                <div class="p-2.5 rounded-xl bg-[#F6EBDD]/60 flex justify-between">
                  <span class="text-[#72665D]">Energy</span>
                  <span class="font-bold text-[#2C201B]">${product.nutrition.calories}</span>
                </div>
                <div class="p-2.5 rounded-xl bg-[#F6EBDD]/60 flex justify-between">
                  <span class="text-[#72665D]">Protein</span>
                  <span class="font-bold text-[#2C201B]">${product.nutrition.protein}</span>
                </div>
                <div class="p-2.5 rounded-xl bg-[#F6EBDD]/60 flex justify-between">
                  <span class="text-[#72665D]">Carbohydrates</span>
                  <span class="font-bold text-[#2C201B]">${product.nutrition.carbs}</span>
                </div>
                <div class="p-2.5 rounded-xl bg-[#F6EBDD]/60 flex justify-between">
                  <span class="text-[#72665D]">Refined Sugar</span>
                  <span class="font-bold text-[#981C0A]">${product.nutrition.refinedSugar}</span>
                </div>
              </div>
              <p class="text-[11px] text-[#72665D] italic mt-1">Allergens: ${product.allergens}</p>
            </div>

          </div>

        </div>

      </div>

      <!-- Related Products Section -->
      <div class="mt-20 pt-16 border-t border-[#E7DDD2]">
        <div class="flex items-center justify-between mb-8">
          <div>
            <span class="text-xs font-bold uppercase tracking-widest text-[#981C0A]">Handcrafted Pairings</span>
            <h2 class="font-display text-2xl sm:text-3xl font-black text-[#2C201B] uppercase tracking-tight mt-1">You Might Also Crave</h2>
          </div>
          <a href="shop.html" class="text-xs font-bold text-[#981C0A] hover:underline uppercase tracking-wide">View Full Menu →</a>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          ${PRODUCTS.filter(p => p.id !== product.id).slice(0, 3).map(p => this.createCardHTML(p)).join('')}
        </div>
      </div>
    `;

    // Bind Gallery Thumbnails
    const mainImg = document.getElementById('pdp-main-image');
    const thumbBtns = document.querySelectorAll('.pdp-thumb-btn');
    thumbBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        thumbBtns.forEach(b => {
          b.classList.remove('border-[#981C0A]', 'scale-95');
          b.classList.add('border-transparent', 'opacity-70');
        });
        btn.classList.add('border-[#981C0A]', 'scale-95');
        btn.classList.remove('border-transparent', 'opacity-70');
        if (mainImg) mainImg.src = btn.dataset.thumbSrc;
      });
    });

    // Bind Pack Size Switcher
    const packBtns = document.querySelectorAll('.pdp-pack-btn');
    const priceDisplay = document.getElementById('pdp-calculated-price');
    const addLabel = document.getElementById('pdp-add-label');

    const updatePrice = () => {
      const total = selectedPack.price * currentQty;
      if (priceDisplay) priceDisplay.textContent = `${STORE_CONFIG.currency}${total}`;
      if (addLabel) addLabel.textContent = `Add to Brownie Box • ${STORE_CONFIG.currency}${total}`;
    };

    packBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        packBtns.forEach(b => {
          b.classList.remove('border-[#981C0A]', 'bg-[#981C0A]', 'text-[#FCFCFA]', 'shadow-md');
          b.classList.add('border-[#E7DDD2]', 'bg-[#FCFCFA]', 'text-[#2C201B]');
        });
        btn.classList.remove('border-[#E7DDD2]', 'bg-[#FCFCFA]', 'text-[#2C201B]');
        btn.classList.add('border-[#981C0A]', 'bg-[#981C0A]', 'text-[#FCFCFA]', 'shadow-md');

        selectedPack = product.packSizes.find(p => p.size === btn.dataset.packSelect);
        updatePrice();
      });
    });


    // Bind Quantity Steppers
    const qtyDisplay = document.getElementById('pdp-qty-display');
    const plusBtn = document.getElementById('pdp-qty-plus');
    const minusBtn = document.getElementById('pdp-qty-minus');

    if (plusBtn) {
      plusBtn.addEventListener('click', () => {
        currentQty++;
        if (qtyDisplay) qtyDisplay.textContent = currentQty;
        updatePrice();
      });
    }

    if (minusBtn) {
      minusBtn.addEventListener('click', () => {
        if (currentQty > 1) {
          currentQty--;
          if (qtyDisplay) qtyDisplay.textContent = currentQty;
          updatePrice();
        }
      });
    }

    // Add To Cart Action
    const addCartBtn = document.getElementById('pdp-add-cart-btn');
    if (addCartBtn) {
      addCartBtn.addEventListener('click', () => {
        cartManager.addItem(product.id, selectedPack.size, currentQty);
      });
    }

    // WhatsApp Direct Inquiry
    const waBtn = document.getElementById('pdp-whatsapp-btn');
    if (waBtn) {
      waBtn.addEventListener('click', () => {
        const text = encodeURIComponent(`Hi Gopika! I'm interested in ordering the *${product.name}* (${selectedPack.size}, qty: ${currentQty}). Could you please share the baking schedule and delivery availability?`);
        window.open(`https://wa.me/${STORE_CONFIG.rawPhone}?text=${text}`, '_blank');
      });
    }
  }
}

export const productEngine = new ProductEngine();
window.productEngine = productEngine;
