/**
 * CRUMBS OF LOVE - CART & WISHLIST MODULE
 * Full e-commerce cart drawer, local storage persistence, free-delivery bar,
 * promo code handler, and WhatsApp checkout generation.
 */

import { STORE_CONFIG, PRODUCTS } from './data.js';

class CartManager {
  constructor() {
    this.cart = this.loadCart();
    this.wishlist = this.loadWishlist();
    this.appliedPromo = this.loadPromo();
    this.initDrawerDOM();
    this.bindEvents();
    this.updateUI();
  }

  loadCart() {
    try {
      const stored = localStorage.getItem('crumbs_cart');
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.warn('Could not read cart from localStorage', e);
      return [];
    }
  }

  saveCart() {
    localStorage.setItem('crumbs_cart', JSON.stringify(this.cart));
    this.updateUI();
    window.dispatchEvent(new CustomEvent('crumbs:cart-updated', { detail: { cart: this.cart } }));
  }

  loadWishlist() {
    try {
      const stored = localStorage.getItem('crumbs_wishlist');
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  }

  saveWishlist() {
    localStorage.setItem('crumbs_wishlist', JSON.stringify(this.wishlist));
    this.updateWishlistCount();
    window.dispatchEvent(new CustomEvent('crumbs:wishlist-updated', { detail: { wishlist: this.wishlist } }));
  }

  loadPromo() {
    try {
      const stored = localStorage.getItem('crumbs_promo');
      return stored ? JSON.parse(stored) : null;
    } catch (e) {
      return null;
    }
  }

  savePromo(promo) {
    this.appliedPromo = promo;
    if (promo) {
      localStorage.setItem('crumbs_promo', JSON.stringify(promo));
    } else {
      localStorage.removeItem('crumbs_promo');
    }
    this.updateUI();
  }

  addItem(productId, packSizeName = null, quantity = 1) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    // Pick pack size or default to first pack
    const selectedPack = packSizeName 
      ? (product.packSizes.find(s => s.size === packSizeName) || product.packSizes[0])
      : product.packSizes[0];

    const itemKey = `${productId}__${selectedPack.size}`;
    const existingIndex = this.cart.findIndex(item => item.key === itemKey);

    if (existingIndex > -1) {
      this.cart[existingIndex].quantity += quantity;
    } else {
      this.cart.push({
        key: itemKey,
        id: product.id,
        name: product.name,
        slug: product.slug,
        image: product.image,
        packSize: selectedPack.size,
        pieces: selectedPack.pieces,
        unitPrice: selectedPack.price,
        quantity: quantity
      });
    }

    this.saveCart();
    this.showToast(`Added ${quantity}x ${product.name} (${selectedPack.size}) to cart!`);
    this.openDrawer();
  }

  updateQuantity(itemKey, delta) {
    const index = this.cart.findIndex(item => item.key === itemKey);
    if (index === -1) return;

    this.cart[index].quantity += delta;
    if (this.cart[index].quantity <= 0) {
      const removed = this.cart.splice(index, 1);
      this.showToast(`Removed ${removed[0].name} from cart.`);
    }
    this.saveCart();
  }

  removeItem(itemKey) {
    const index = this.cart.findIndex(item => item.key === itemKey);
    if (index > -1) {
      const removed = this.cart.splice(index, 1);
      this.saveCart();
      this.showToast(`Removed ${removed[0].name} from cart.`);
    }
  }

  clearCart() {
    this.cart = [];
    this.saveCart();
  }

  toggleWishlist(productId) {
    const index = this.wishlist.indexOf(productId);
    const product = PRODUCTS.find(p => p.id === productId);
    const name = product ? product.name : 'Item';

    if (index > -1) {
      this.wishlist.splice(index, 1);
      this.showToast(`Removed ${name} from your favorites.`);
    } else {
      this.wishlist.push(productId);
      this.showToast(`Saved ${name} to your favorites!`);
    }
    this.saveWishlist();
  }

  isWishlisted(productId) {
    return this.wishlist.includes(productId);
  }

  getTotals() {
    const subtotal = this.cart.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);
    let discount = 0;
    
    if (this.appliedPromo && STORE_CONFIG.promoCodes[this.appliedPromo.code]) {
      const promoRule = STORE_CONFIG.promoCodes[this.appliedPromo.code];
      if (subtotal >= (promoRule.minOrder || 0)) {
        discount = Math.round((subtotal * promoRule.discountPercent) / 100);
      }
    }

    const discountedSubtotal = Math.max(0, subtotal - discount);
    const shipping = subtotal === 0 
      ? 0 
      : (subtotal >= STORE_CONFIG.freeShippingThreshold ? 0 : STORE_CONFIG.flatDeliveryFee);
    const total = discountedSubtotal + shipping;

    return {
      subtotal,
      discount,
      shipping,
      total,
      itemsCount: this.cart.reduce((sum, item) => sum + item.quantity, 0),
      isFreeShipping: subtotal >= STORE_CONFIG.freeShippingThreshold,
      remainingForFreeShipping: Math.max(0, STORE_CONFIG.freeShippingThreshold - subtotal)
    };
  }

  applyPromoCode(code) {
    const cleanCode = code.trim().toUpperCase();
    if (!cleanCode) return { success: false, message: 'Please enter a coupon code.' };

    const promo = STORE_CONFIG.promoCodes[cleanCode];
    if (!promo) {
      return { success: false, message: 'Invalid promo code. Try LOVE10!' };
    }

    const { subtotal } = this.getTotals();
    if (subtotal < (promo.minOrder || 0)) {
      return { 
        success: false, 
        message: `Min order of ${STORE_CONFIG.currency}${promo.minOrder} required for ${cleanCode}.` 
      };
    }

    this.savePromo({ code: cleanCode, discountPercent: promo.discountPercent, label: promo.label });
    return { success: true, message: `Coupon ${cleanCode} applied! You saved ${promo.discountPercent}%.` };
  }

  removePromoCode() {
    this.savePromo(null);
  }

  generateWhatsAppOrderMessage(customerDetails = {}) {
    const totals = this.getTotals();
    if (this.cart.length === 0) return '';

    let lines = [];
    lines.push(`*NEW ORDER — CRUMBS OF LOVE*`);
    lines.push(`Hello Gopika! I would love to place a fresh order:`);
    lines.push(``);
    lines.push(`*ITEMS ORDERED:*`);
    
    this.cart.forEach((item, idx) => {
      lines.push(`${idx + 1}. *${item.name}*`);
      lines.push(`   • Pack: ${item.packSize}`);
      lines.push(`   • Quantity: ${item.quantity} box(es)`);
      lines.push(`   • Price: ${STORE_CONFIG.currency}${item.unitPrice * item.quantity}`);
    });

    lines.push(``);
    lines.push(`*BILLING SUMMARY:*`);
    lines.push(`• Subtotal: ${STORE_CONFIG.currency}${totals.subtotal}`);
    if (totals.discount > 0) {
      lines.push(`• Discount (${this.appliedPromo?.code}): -${STORE_CONFIG.currency}${totals.discount}`);
    }
    lines.push(`• Delivery: ${totals.shipping === 0 ? 'FREE' : `${STORE_CONFIG.currency}${totals.shipping}`}`);
    lines.push(`• *Total Payable: ${STORE_CONFIG.currency}${totals.total}*`);

    if (customerDetails.name) {
      lines.push(``);
      lines.push(`*DELIVERY DETAILS:*`);
      lines.push(`• Name: ${customerDetails.name}`);
      lines.push(`• Phone: ${customerDetails.phone || customerDetails.whatsapp}`);
      if (customerDetails.address) lines.push(`• Address: ${customerDetails.address}`);
      if (customerDetails.deliveryDate) lines.push(`• Preferred Date: ${customerDetails.deliveryDate}`);
      if (customerDetails.timeSlot) lines.push(`• Slot: ${customerDetails.timeSlot}`);
      if (customerDetails.giftMessage) lines.push(`• Handwritten Note: "${customerDetails.giftMessage}"`);
    }

    lines.push(``);
    lines.push(`Please confirm batch availability & payment details. Thank you!`);

    return encodeURIComponent(lines.join('\n'));
  }

  openWhatsAppOrder(customerDetails = {}) {
    const msg = this.generateWhatsAppOrderMessage(customerDetails);
    if (!msg) {
      this.showToast('Your cart is empty! Add brownies first.');
      return;
    }
    const url = `https://wa.me/${STORE_CONFIG.rawPhone}?text=${msg}`;
    window.open(url, '_blank');
  }

  /* DOM Rendering & Interaction */
  initDrawerDOM() {
    if (document.getElementById('crumbs-cart-drawer')) return;

    const drawerHTML = `
      <div id="crumbs-cart-drawer" class="fixed inset-0 z-[1000] overflow-hidden pointer-events-none transition-all duration-300">
        <!-- Backdrop -->
        <div id="cart-drawer-backdrop" class="absolute inset-0 bg-cocoa-deep/60 backdrop-blur-sm opacity-0 transition-opacity duration-300"></div>

        <!-- Slide-out Drawer Panel -->
        <div id="cart-drawer-panel" class="absolute top-0 right-0 h-full w-full max-w-md bg-warm-white shadow-2xl flex flex-col transform translate-x-full transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-auto border-l border-caramel/20">
          
          <!-- Header -->
          <div class="px-6 py-5 border-b border-caramel/15 flex items-center justify-between bg-cream/50">
            <div class="flex items-center space-x-3">
              <span class="font-serif text-xl font-bold text-cocoa tracking-tight">Your Brownie Box</span>
              <span id="drawer-badge-count" class="px-2 py-0.5 text-xs font-semibold rounded-full bg-caramel/15 text-caramel-dark">0</span>
            </div>
            <button id="cart-drawer-close" class="p-2 rounded-full hover:bg-caramel/10 text-cocoa transition-colors" aria-label="Close cart">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>

          <!-- Free Shipping Progress Bar -->
          <div id="free-shipping-container" class="px-6 py-3 bg-amber-50/70 border-b border-caramel/10 text-xs text-cocoa">
            <div class="flex justify-between items-center mb-1.5 font-medium">
              <span id="free-shipping-text">Add items for free delivery</span>
              <span class="font-bold text-caramel-dark">${STORE_CONFIG.currency}${STORE_CONFIG.freeShippingThreshold} Goal</span>
            </div>
            <div class="w-full bg-caramel/15 rounded-full h-2 overflow-hidden">
              <div id="free-shipping-progress" class="bg-gradient-to-r from-caramel to-gold h-full transition-all duration-500 rounded-full" style="width: 0%"></div>
            </div>
          </div>

          <!-- Items List Container (Scrollable) -->
          <div id="cart-items-list" class="flex-1 overflow-y-auto px-6 py-4 space-y-4 divide-y divide-caramel/10">
            <!-- Dynamic Cart Items injected here -->
          </div>

          <!-- Empty State -->
          <div id="cart-empty-state" class="hidden flex-1 flex flex-col items-center justify-center p-8 text-center">
            <div class="w-20 h-20 rounded-full bg-cream-soft flex items-center justify-center mb-4 text-caramel">
              <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
              </svg>
            </div>
            <h3 class="font-serif text-xl font-bold text-cocoa mb-1">Your box is empty</h3>
            <p class="text-sm text-cocoa-muted mb-6">Indulge in fresh, slow-melt chocolate brownies baked just for you.</p>
            <a href="shop.html" class="px-6 py-3 rounded-full bg-cocoa text-warm-white font-medium text-sm hover:bg-brown transition-all shadow-md">
              Explore Fresh Brownies
            </a>
          </div>

          <!-- Footer / Totals & Actions -->
          <div id="cart-drawer-footer" class="p-6 border-t border-caramel/15 bg-cream/30 space-y-4">
            
            <!-- Promo code input -->
            <div id="promo-section" class="flex items-center space-x-2">
              <input type="text" id="promo-input" placeholder="Coupon (e.g. LOVE10)" class="flex-1 px-3 py-2 text-xs uppercase tracking-wider rounded-lg border border-caramel/25 bg-white focus:outline-none focus:border-caramel text-cocoa placeholder:normal-case placeholder:tracking-normal font-mono" />
              <button id="promo-apply-btn" class="px-3.5 py-2 text-xs font-semibold rounded-lg bg-cocoa text-warm-white hover:bg-brown transition-colors">Apply</button>
            </div>
            <div id="applied-promo-tag" class="hidden flex items-center justify-between text-xs px-2.5 py-1.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
              <span id="promo-tag-text">LOVE10 Applied (10% OFF)</span>
              <button id="promo-remove-btn" class="text-xs text-emerald-900 font-bold hover:underline">Remove</button>
            </div>

            <!-- Price Breakdown -->
            <div class="space-y-1.5 text-xs text-cocoa">
              <div class="flex justify-between">
                <span class="text-cocoa-muted">Subtotal</span>
                <span id="drawer-subtotal" class="font-medium text-cocoa">₹0</span>
              </div>
              <div id="drawer-discount-row" class="hidden flex justify-between text-emerald-700">
                <span>Special Discount</span>
                <span id="drawer-discount">-₹0</span>
              </div>
              <div class="flex justify-between">
                <span class="text-cocoa-muted">Delivery</span>
                <span id="drawer-shipping" class="font-medium">Calculated next</span>
              </div>
              <div class="flex justify-between pt-2 border-t border-caramel/15 text-sm font-bold text-cocoa">
                <span>Estimated Total</span>
                <span id="drawer-total" class="text-base text-cocoa font-serif">₹0</span>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="space-y-2 pt-1">
              <a href="checkout.html" class="w-full py-3.5 px-4 rounded-full bg-cocoa hover:bg-brown text-warm-white font-medium text-sm text-center flex items-center justify-center space-x-2 shadow-lg transition-all transform active:scale-[0.98]">
                <span>Proceed to Checkout</span>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
              </a>

              <button id="whatsapp-instant-checkout" class="w-full py-2.5 px-4 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white font-semibold text-xs text-center flex items-center justify-center space-x-2 transition-all shadow-sm">
                <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
                <span>Direct WhatsApp Order</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', drawerHTML);

    // Create Toast Container
    if (!document.getElementById('crumbs-toast-container')) {
      const toastContainer = document.createElement('div');
      toastContainer.id = 'crumbs-toast-container';
      toastContainer.className = 'fixed bottom-6 right-6 z-[10001] flex flex-col space-y-2 pointer-events-none max-w-sm w-full px-4 sm:px-0';
      document.body.appendChild(toastContainer);
    }
  }

  bindEvents() {
    // Open cart buttons anywhere on page
    document.addEventListener('click', (e) => {
      const openBtn = e.target.closest('[data-cart-open], .cart-trigger-btn');
      if (openBtn) {
        e.preventDefault();
        this.openDrawer();
      }

      const closeBtn = e.target.closest('#cart-drawer-close, #cart-drawer-backdrop');
      if (closeBtn) {
        this.closeDrawer();
      }

      // Quantity buttons inside drawer
      const qtyBtn = e.target.closest('[data-cart-qty-delta]');
      if (qtyBtn) {
        const delta = parseInt(qtyBtn.dataset.cartQtyDelta, 10);
        const itemKey = qtyBtn.dataset.itemKey;
        this.updateQuantity(itemKey, delta);
      }

      // Remove item
      const removeBtn = e.target.closest('[data-cart-remove]');
      if (removeBtn) {
        const itemKey = removeBtn.dataset.itemKey;
        this.removeItem(itemKey);
      }

      // WhatsApp Instant Order from drawer
      const waBtn = e.target.closest('#whatsapp-instant-checkout');
      if (waBtn) {
        this.openWhatsAppOrder();
      }

      // Promo Apply
      const promoBtn = e.target.closest('#promo-apply-btn');
      if (promoBtn) {
        const input = document.getElementById('promo-input');
        if (input) {
          const res = this.applyPromoCode(input.value);
          this.showToast(res.message);
          if (res.success) input.value = '';
        }
      }

      // Promo Remove
      const removePromoBtn = e.target.closest('#promo-remove-btn');
      if (removePromoBtn) {
        this.removePromoCode();
        this.showToast('Promo code removed.');
      }
    });

    // ESC key closes drawer
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.closeDrawer();
    });
  }

  openDrawer() {
    const drawer = document.getElementById('crumbs-cart-drawer');
    const backdrop = document.getElementById('cart-drawer-backdrop');
    const panel = document.getElementById('cart-drawer-panel');
    if (!drawer) return;

    drawer.classList.remove('pointer-events-none');
    backdrop.classList.remove('opacity-0');
    backdrop.classList.add('opacity-100');
    panel.classList.remove('translate-x-full');
    panel.classList.add('translate-x-0');
    document.body.style.overflow = 'hidden';
  }

  closeDrawer() {
    const drawer = document.getElementById('crumbs-cart-drawer');
    const backdrop = document.getElementById('cart-drawer-backdrop');
    const panel = document.getElementById('cart-drawer-panel');
    if (!drawer) return;

    drawer.classList.add('pointer-events-none');
    backdrop.classList.add('opacity-0');
    backdrop.classList.remove('opacity-100');
    panel.classList.add('translate-x-full');
    panel.classList.remove('translate-x-0');
    document.body.style.overflow = '';
  }

  updateUI() {
    const totals = this.getTotals();

    // Update navbar badges
    const badges = document.querySelectorAll('.cart-count-badge, #drawer-badge-count');
    badges.forEach(badge => {
      badge.textContent = totals.itemsCount;
      if (totals.itemsCount > 0) {
        badge.classList.remove('hidden');
      } else {
        if (!badge.id.includes('drawer')) badge.classList.add('hidden');
      }
    });

    // Update Wishlist badge
    this.updateWishlistCount();

    // Free shipping progress
    const shippingProgress = document.getElementById('free-shipping-progress');
    const shippingText = document.getElementById('free-shipping-text');
    if (shippingProgress && shippingText) {
      if (totals.isFreeShipping) {
        shippingProgress.style.width = '100%';
        shippingText.innerHTML = `<i data-lucide="sparkles" class="w-4 h-4 text-emerald-700 inline-block mr-1"></i><strong class="text-emerald-800">You've unlocked FREE Express Delivery!</strong>`;
      } else {
        const pct = Math.min(100, Math.round((totals.subtotal / STORE_CONFIG.freeShippingThreshold) * 100));
        shippingProgress.style.width = `${pct}%`;
        shippingText.innerHTML = `Add <span class="font-bold text-caramel-dark">${STORE_CONFIG.currency}${totals.remainingForFreeShipping}</span> more for <strong>FREE Delivery</strong>`;
      }
    }

    // Cart items list render
    const itemsList = document.getElementById('cart-items-list');
    const emptyState = document.getElementById('cart-empty-state');
    const footer = document.getElementById('cart-drawer-footer');
    const shippingBanner = document.getElementById('free-shipping-container');

    if (!itemsList) return;

    if (this.cart.length === 0) {
      itemsList.innerHTML = '';
      emptyState.classList.remove('hidden');
      footer.classList.add('hidden');
      if (shippingBanner) shippingBanner.classList.add('hidden');
      return;
    }

    emptyState.classList.add('hidden');
    footer.classList.remove('hidden');
    if (shippingBanner) shippingBanner.classList.remove('hidden');

    itemsList.innerHTML = this.cart.map(item => `
      <div class="pt-4 first:pt-0 flex items-start space-x-3.5 group">
        <a href="product.html?id=${item.id}" class="w-16 h-16 rounded-xl overflow-hidden bg-cream-soft flex-shrink-0 border border-caramel/15 block">
          <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        </a>
        <div class="flex-1 min-w-0">
          <div class="flex items-start justify-between">
            <a href="product.html?id=${item.id}" class="font-serif font-bold text-sm text-cocoa hover:text-caramel transition-colors line-clamp-1">
              ${item.name}
            </a>
            <button data-cart-remove data-item-key="${item.key}" class="text-cocoa-muted hover:text-red-500 p-0.5 ml-2 transition-colors" title="Remove item">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
            </button>
          </div>
          <div class="text-xs text-caramel-dark font-medium mt-0.5">${item.packSize} (${item.pieces} pcs)</div>
          
          <div class="flex items-center justify-between mt-2.5">
            <!-- Stepper -->
            <div class="flex items-center border border-caramel/20 rounded-full bg-white px-2 py-0.5 space-x-2 shadow-2xs">
              <button data-cart-qty-delta="-1" data-item-key="${item.key}" class="w-5 h-5 flex items-center justify-center text-cocoa hover:text-caramel font-bold text-xs active:scale-90 transition-transform">−</button>
              <span class="text-xs font-semibold text-cocoa min-w-[14px] text-center">${item.quantity}</span>
              <button data-cart-qty-delta="1" data-item-key="${item.key}" class="w-5 h-5 flex items-center justify-center text-cocoa hover:text-caramel font-bold text-xs active:scale-90 transition-transform">+</button>
            </div>
            
            <span class="text-sm font-bold text-cocoa">${STORE_CONFIG.currency}${item.unitPrice * item.quantity}</span>
          </div>
        </div>
      </div>
    `).join('');

    // Update Totals breakdown
    const drawerSubtotal = document.getElementById('drawer-subtotal');
    const drawerDiscountRow = document.getElementById('drawer-discount-row');
    const drawerDiscount = document.getElementById('drawer-discount');
    const drawerShipping = document.getElementById('drawer-shipping');
    const drawerTotal = document.getElementById('drawer-total');
    const appliedPromoTag = document.getElementById('applied-promo-tag');
    const promoTagText = document.getElementById('promo-tag-text');
    const promoSection = document.getElementById('promo-section');

    if (drawerSubtotal) drawerSubtotal.textContent = `${STORE_CONFIG.currency}${totals.subtotal}`;

    if (this.appliedPromo && totals.discount > 0) {
      if (drawerDiscountRow) drawerDiscountRow.classList.remove('hidden');
      if (drawerDiscount) drawerDiscount.textContent = `-${STORE_CONFIG.currency}${totals.discount}`;
      if (appliedPromoTag) {
        appliedPromoTag.classList.remove('hidden');
        if (promoTagText) promoTagText.textContent = `${this.appliedPromo.code} Applied (${this.appliedPromo.discountPercent}% OFF)`;
      }
      if (promoSection) promoSection.classList.add('hidden');
    } else {
      if (drawerDiscountRow) drawerDiscountRow.classList.add('hidden');
      if (appliedPromoTag) appliedPromoTag.classList.add('hidden');
      if (promoSection) promoSection.classList.remove('hidden');
    }

    if (drawerShipping) {
      drawerShipping.textContent = totals.shipping === 0 ? 'FREE' : `${STORE_CONFIG.currency}${totals.shipping}`;
    }

    if (drawerTotal) {
      drawerTotal.textContent = `${STORE_CONFIG.currency}${totals.total}`;
    }
  }

  updateWishlistCount() {
    const badges = document.querySelectorAll('.wishlist-count-badge');
    badges.forEach(b => {
      b.textContent = this.wishlist.length;
      if (this.wishlist.length > 0) {
        b.classList.remove('hidden');
      } else {
        b.classList.add('hidden');
      }
    });

    // Update heart icons fill state
    document.querySelectorAll('[data-wishlist-toggle]').forEach(btn => {
      const pid = btn.dataset.productId;
      if (this.isWishlisted(pid)) {
        btn.classList.add('text-red-500', 'fill-current');
        btn.classList.remove('text-cocoa/40');
      } else {
        btn.classList.remove('text-red-500', 'fill-current');
        btn.classList.add('text-cocoa/40');
      }
    });
  }

  showToast(message, type = 'info') {
    const container = document.getElementById('crumbs-toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `p-4 rounded-2xl bg-cocoa text-warm-white text-xs sm:text-sm font-medium shadow-2xl flex items-center space-x-3 transform translate-y-3 opacity-0 transition-all duration-300 pointer-events-auto border border-caramel/25`;
    
    toast.innerHTML = `
      <div class="w-2 h-2 rounded-full bg-caramel animate-ping"></div>
      <span class="flex-1">${message}</span>
      <button class="text-warm-white/60 hover:text-warm-white p-1" onclick="this.parentElement.remove()">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
      </button>
    `;

    container.appendChild(toast);

    // Trigger enter animation
    requestAnimationFrame(() => {
      toast.classList.remove('translate-y-3', 'opacity-0');
      toast.classList.add('translate-y-0', 'opacity-100');
    });

    // Auto remove after 3.8s
    setTimeout(() => {
      toast.classList.add('opacity-0', 'translate-y-2');
      setTimeout(() => toast.remove(), 300);
    }, 3800);
  }
}

export const cartManager = new CartManager();
