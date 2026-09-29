/**
 * CRUMBS OF LOVE - MAIN SHARED CONTROLLER
 * Navbar scroll behavior, smart auto-hide, full-screen mobile menu,
 * search modal, and global initialization.
 */

import { cartManager } from './cart.js';
import { animationEngine } from './animations.js';
import { STORE_CONFIG, PRODUCTS } from './data.js';

class MainApp {
  constructor() {
    this.lastScrollY = 0;
    this.initNavbar();
    this.initNavMenu();
    this.initMobileMenu();
    this.initQuickSearch();
    this.bindGlobalEvents();
  }

  /* Smart Sticky Header: subtle shadow/blur on scroll matching Ovena */
  initNavbar() {
    const siteHeader = document.getElementById('site-header');
    const navbar = document.getElementById('main-navbar');
    if (!navbar) return;

    let isScrolled = false;

    const updateHeaderState = (scrollY) => {
      const shouldBeScrolled = scrollY > 20;
      if (shouldBeScrolled !== isScrolled) {
        isScrolled = shouldBeScrolled;
        if (isScrolled) {
          if (siteHeader) {
            siteHeader.classList.add('shadow-sm', 'bg-[#F5EBDD]/98', 'backdrop-blur-md');
          }
          navbar.classList.add('shadow-[0_12px_36px_rgba(44,32,27,0.12)]', 'border-[#981C0A]/20');
        } else {
          if (siteHeader) {
            siteHeader.classList.remove('shadow-sm', 'bg-[#F5EBDD]/98', 'backdrop-blur-md');
          }
          navbar.classList.remove('shadow-[0_12px_36px_rgba(44,32,27,0.12)]', 'border-[#981C0A]/20');
        }
      }
    };

    if (window.lenis) {
      window.lenis.on('scroll', ({ scroll }) => {
        updateHeaderState(scroll);
      });
    } else {
      window.addEventListener('scroll', () => {
        updateHeaderState(window.scrollY);
      }, { passive: true });
    }
  }

  /* Ovena Nav Menu Pill Button Handler */
  initNavMenu() {
    const menuBtn = document.getElementById('nav-menu-btn');
    const menuDropdown = document.getElementById('nav-menu-dropdown');
    const dropdownClose = document.getElementById('nav-menu-dropdown-close');
    const mobileOverlay = document.getElementById('mobile-menu-overlay');

    if (!menuBtn) return;

    const toggleDropdown = (e) => {
      e.stopPropagation();
      if (!menuDropdown) return;
      const isOpen = !menuDropdown.classList.contains('pointer-events-none');
      if (isOpen) {
        closeDropdown();
      } else {
        openDropdown();
      }
    };

    const openDropdown = () => {
      if (window.innerWidth < 640 && mobileOverlay) {
        mobileOverlay.classList.remove('pointer-events-none', 'opacity-0');
        mobileOverlay.classList.add('opacity-100');
        document.body.style.overflow = 'hidden';
        return;
      }
      if (!menuDropdown) return;
      menuDropdown.classList.remove('pointer-events-none', 'opacity-0', '-translate-y-2');
      menuDropdown.classList.add('opacity-100', 'translate-y-0');
    };

    const closeDropdown = () => {
      if (menuDropdown) {
        menuDropdown.classList.add('pointer-events-none', 'opacity-0', '-translate-y-2');
        menuDropdown.classList.remove('opacity-100', 'translate-y-0');
      }
    };

    menuBtn.addEventListener('click', toggleDropdown);
    if (dropdownClose) dropdownClose.addEventListener('click', closeDropdown);

    document.addEventListener('click', (e) => {
      if (menuDropdown && !menuDropdown.contains(e.target) && !menuBtn.contains(e.target)) {
        closeDropdown();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeDropdown();
    });
  }

  /* Fullscreen Animated Mobile Menu */
  initMobileMenu() {
    const toggleBtn = document.getElementById('mobile-menu-toggle');
    const menuOverlay = document.getElementById('mobile-menu-overlay');
    const closeBtn = document.getElementById('mobile-menu-close');
    const menuLinks = document.querySelectorAll('.mobile-nav-link');

    if (!toggleBtn || !menuOverlay) return;

    const openMenu = () => {
      menuOverlay.classList.remove('pointer-events-none', 'opacity-0');
      menuOverlay.classList.add('opacity-100');
      document.body.style.overflow = 'hidden';
    };

    const closeMenu = () => {
      menuOverlay.classList.add('pointer-events-none', 'opacity-0');
      menuOverlay.classList.remove('opacity-100');
      document.body.style.overflow = '';
    };

    toggleBtn.addEventListener('click', openMenu);
    if (closeBtn) closeBtn.addEventListener('click', closeMenu);
    menuLinks.forEach(link => link.addEventListener('click', closeMenu));
  }

  /* Quick Search Modal */
  initQuickSearch() {
    const searchTrigger = document.querySelectorAll('[data-search-trigger]');
    const searchModal = document.getElementById('quick-search-modal');
    const searchClose = document.getElementById('search-modal-close');
    const searchInput = document.getElementById('quick-search-input');
    const searchResults = document.getElementById('quick-search-results');

    if (!searchModal) return;

    const openSearch = () => {
      searchModal.classList.remove('pointer-events-none', 'opacity-0');
      searchModal.classList.add('opacity-100');
      setTimeout(() => searchInput?.focus(), 150);
      document.body.style.overflow = 'hidden';
    };

    const closeSearch = () => {
      searchModal.classList.add('pointer-events-none', 'opacity-0');
      searchModal.classList.remove('opacity-100');
      document.body.style.overflow = '';
    };

    searchTrigger.forEach(t => t.addEventListener('click', (e) => {
      e.preventDefault();
      openSearch();
    }));

    if (searchClose) searchClose.addEventListener('click', closeSearch);

    searchModal.addEventListener('click', (e) => {
      if (e.target === searchModal) closeSearch();
    });

    // ESC to close
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !searchModal.classList.contains('opacity-0')) {
        closeSearch();
      }
    });

    // Live search input
    if (searchInput && searchResults) {
      searchInput.addEventListener('input', (e) => {
        const q = e.target.value.toLowerCase().trim();
        if (!q) {
          searchResults.innerHTML = `
            <div class="py-6 text-center text-xs text-cocoa-muted">
              Start typing to search freshly baked brownies, gift boxes or healthy ingredients...
            </div>
          `;
          return;
        }

        const matches = PRODUCTS.filter(p => 
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.shortDesc.toLowerCase().includes(q)
        );

        if (matches.length === 0) {
          searchResults.innerHTML = `
            <div class="py-6 text-center text-xs text-cocoa-muted">
              No baked goodies found for "${q}". Try "fudge", "walnut", or "eggless".
            </div>
          `;
          return;
        }

        searchResults.innerHTML = matches.map(p => `
          <a href="product.html?id=${p.id}" class="flex items-center space-x-3 p-3 rounded-2xl hover:bg-cream-soft transition-colors group">
            <img src="${p.image}" alt="${p.name}" class="w-12 h-12 rounded-xl object-cover border border-caramel/15" />
            <div class="flex-1 min-w-0">
              <h4 class="font-serif font-bold text-sm text-cocoa group-hover:text-caramel transition-colors truncate">${p.name}</h4>
              <p class="text-xs text-caramel-dark font-medium">${p.category} • From ${STORE_CONFIG.currency}${p.basePrice}</p>
            </div>
            <span class="text-xs text-cocoa-muted group-hover:translate-x-1 transition-transform">→</span>
          </a>
        `).join('');
      });
    }
  }

  bindGlobalEvents() {
    // Lucide Icons (Render once on init, without heavy continuous body subtree MutationObserver)
    if (typeof window !== 'undefined' && window.lucide && typeof window.lucide.createIcons === 'function') {
      try {
        window.lucide.createIcons();
      } catch (e) {}
    }

    // WhatsApp direct click handler
    document.querySelectorAll('[data-direct-whatsapp]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const text = encodeURIComponent(`Hello Gopika! I have a question about Crumbs of Love brownies: `);
        window.open(`https://wa.me/${STORE_CONFIG.rawPhone}?text=${text}`, '_blank');
      });
    });
  }
}

// Instantiate on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  window.mainApp = new MainApp();
});

export { cartManager, animationEngine, STORE_CONFIG };
