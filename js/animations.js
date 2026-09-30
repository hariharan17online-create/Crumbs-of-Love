/**
 * CRUMBS OF LOVE - HIGH PERFORMANCE ANIMATION & SMOOTH MOTION ENGINE
 * Optimized Lenis smooth scroll + GSAP ScrollTrigger sync, preloader sequence,
 * GPU-accelerated rAF-throttled custom cursor with event delegation,
 * and scoped ScrollTrigger animations.
 */

const gsap = typeof window !== 'undefined' ? window.gsap : null;
const ScrollTrigger = typeof window !== 'undefined' ? window.ScrollTrigger : null;
const Lenis = typeof window !== 'undefined' ? window.Lenis : null;

if (gsap && ScrollTrigger) {
  try {
    gsap.registerPlugin(ScrollTrigger);
  } catch (e) {
    console.warn('ScrollTrigger register warning:', e);
  }
}

export class AnimationEngine {
  constructor() {
    this.lenis = null;
    this.ctx = null;
    this.prefersReducedMotion = typeof window !== 'undefined' && 
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.initLenis();
    this.initCustomCursor();
  }

  /* 1. Buttery Smooth Inertia Scroll (Lenis + GSAP ScrollTrigger Unified Integration) */
  initLenis() {
    if (this.prefersReducedMotion || typeof window === 'undefined' || !window.Lenis) return;

    try {
      this.lenis = new window.Lenis({
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1.0,
        touchMultiplier: 1.1,
      });

      window.lenis = this.lenis;

      // Sync Lenis scroll updates with GSAP ScrollTrigger
      if (window.ScrollTrigger) {
        this.lenis.on('scroll', window.ScrollTrigger.update);
      }

      // Single unified render loop driving Lenis via GSAP ticker
      if (window.gsap) {
        window.gsap.ticker.add((time) => {
          this.lenis.raf(time * 1000);
        });
        window.gsap.ticker.lagSmoothing(0);
      } else {
        const raf = (time) => {
          this.lenis.raf(time);
          requestAnimationFrame(raf);
        };
        requestAnimationFrame(raf);
      }

      // Smooth Anchor-Link Navigation Support (e.g. #hero, #story, #why-choose-us)
      const handleAnchorClick = (e, anchor) => {
        const href = anchor.getAttribute('href');
        if (!href || href === '#' || href.length < 2) return;
        
        let hash = '';
        if (href.startsWith('#')) {
          hash = href;
        } else if (href.includes('#')) {
          const parts = href.split('#');
          const page = parts[0];
          const currentPage = window.location.pathname.split('/').pop() || 'index.html';
          if (page === currentPage || (page === 'index.html' && (currentPage === '' || currentPage === '/' || currentPage === 'index.html'))) {
            hash = '#' + parts[1];
          }
        }

        if (hash) {
          const target = document.querySelector(hash);
          if (target) {
            e.preventDefault();
            this.lenis.scrollTo(target, { offset: -88, duration: 1.1 });
          }
        }
      };

      document.querySelectorAll('a[href*="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => handleAnchorClick(e, anchor));
      });

      // Smooth scroll to target if URL opened with a hash
      if (window.location.hash) {
        const initialTarget = document.querySelector(window.location.hash);
        if (initialTarget) {
          setTimeout(() => {
            this.lenis.scrollTo(initialTarget, { offset: -88, duration: 1.1 });
          }, 350);
        }
      }
    } catch (e) {
      console.warn('Lenis smooth scroll initialization skipped:', e);
    }
  }

  /* 2. GPU-Accelerated Custom Cursor (Desktop Only, rAF-Throttled, Zero DOM Writes in Event Handler) */
  initCustomCursor() {
    if (typeof window === 'undefined') return;

    // Strict desktop & touch check: completely skip on touch, mobile, or prefers-reduced-motion
    const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches || 
                    ('ontouchstart' in window) || 
                    (navigator.maxTouchPoints > 0 && window.innerWidth < 1024) ||
                    window.innerWidth < 1024;
    if (isTouch || this.prefersReducedMotion) return;

    let dot = document.querySelector('.custom-cursor-dot');
    let ring = document.querySelector('.custom-cursor-ring');

    if (!dot) {
      dot = document.createElement('div');
      dot.className = 'custom-cursor-dot';
      document.body.appendChild(dot);
    }

    if (!ring) {
      ring = document.createElement('div');
      ring.className = 'custom-cursor-ring';
      document.body.appendChild(ring);
    }

    let targetX = -100;
    let targetY = -100;
    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let isVisible = false;
    let isMoving = false;
    let rafId = null;

    // Tick function: updates DOM via requestAnimationFrame using translate3d
    const updateCursor = () => {
      if (!isVisible) {
        rafId = null;
        return;
      }

      // Smooth trailing ring lerp
      ringX += (targetX - ringX) * 0.18;
      ringY += (targetY - ringY) * 0.18;

      // Cursor dot tracks mouse exactly
      mouseX = targetX;
      mouseY = targetY;

      // GPU hardware accelerated translate3d (avoids layout thrashing)
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;

      // Continue loop only when actively moving or ring is still catching up to target
      const dx = targetX - ringX;
      const dy = targetY - ringY;
      const distSq = dx * dx + dy * dy;

      if (isMoving || distSq > 0.05) {
        isMoving = false;
        rafId = requestAnimationFrame(updateCursor);
      } else {
        rafId = null;
      }
    };

    const scheduleUpdate = () => {
      isMoving = true;
      if (!rafId) {
        rafId = requestAnimationFrame(updateCursor);
      }
    };

    // Passive mousemove handler: ONLY writes coordinates, NEVER mutates DOM directly
    window.addEventListener('mousemove', (e) => {
      targetX = e.clientX;
      targetY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        ringX = targetX;
        ringY = targetY;
        dot.style.opacity = '1';
        ring.style.opacity = '1';
      }

      scheduleUpdate();
    }, { passive: true });

    document.addEventListener('mouseleave', () => {
      isVisible = false;
      dot.style.opacity = '0';
      ring.style.opacity = '0';
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    });

    document.addEventListener('mouseenter', () => {
      isVisible = true;
      dot.style.opacity = '1';
      ring.style.opacity = '1';
      scheduleUpdate();
    });

    // Efficient Event Delegation for hover states (Zero MutationObservers!)
    const interactiveSelector = 'a, button, [role="button"], input, select, textarea, .interactive, .product-card, .faq-item, .pill-btn-solid, .pill-btn-outline, [data-cart-open], #nav-menu-btn, .tab-btn';
    const imageSelector = '.hero-float-1, .hero-float-2, .hero-float-3, .hero-float-4, .aspect-\\[4\\/3\\], .product-card img, #pdp-main-img, .aspect-\\[4\\/5\\]';

    document.addEventListener('mouseover', (e) => {
      const target = e.target;
      if (!target || !(target instanceof Element)) return;

      if (target.closest(imageSelector)) {
        ring.classList.add('hover-image');
        ring.textContent = 'View ↗';
        dot.classList.add('hover-image');
      } else if (target.closest(interactiveSelector)) {
        ring.classList.add('hover-active');
        dot.classList.add('hover-active');
      }
    }, { passive: true });

    document.addEventListener('mouseout', (e) => {
      const target = e.target;
      if (!target || !(target instanceof Element)) return;

      const related = e.relatedTarget;
      const wasImage = target.closest(imageSelector);
      const isStillImage = related && related instanceof Element && related.closest(imageSelector);
      if (wasImage && !isStillImage) {
        ring.classList.remove('hover-image');
        ring.textContent = '';
        dot.classList.remove('hover-image');
      }

      const wasInteractive = target.closest(interactiveSelector);
      const isStillInteractive = related && related instanceof Element && related.closest(interactiveSelector);
      if (wasInteractive && !isStillInteractive) {
        ring.classList.remove('hover-active');
        dot.classList.remove('hover-active');
      }
    }, { passive: true });
  }

  /* 4. Hero Reveal Sequence */
  revealHero() {
    if (this.prefersReducedMotion || !window.gsap) return;

    const heroTl = gsap.timeline({ delay: 0.1 });

    if (document.querySelector('.hero-badge')) {
      heroTl.fromTo('.hero-badge', 
        { y: 25, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
      );
    }

    if (document.querySelector('.hero-title-line')) {
      heroTl.fromTo('.hero-title-line', 
        { y: 60, opacity: 0, rotateZ: 1 }, 
        { y: 0, opacity: 1, rotateZ: 0, stagger: 0.14, duration: 1.1, ease: 'power4.out' }, 
        "-=0.5"
      );
    }

    if (document.querySelector('.hero-subtitle')) {
      heroTl.fromTo('.hero-subtitle', 
        { y: 30, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' }, 
        "-=0.6"
      );
    }

    if (document.querySelector('.hero-cta-wrap')) {
      heroTl.fromTo('.hero-cta-wrap', 
        { y: 25, opacity: 0, scale: 0.96 }, 
        { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.4)' }, 
        "-=0.5"
      );
    }

    if (document.querySelector('.hero-social-proof')) {
      heroTl.fromTo('.hero-social-proof', 
        { opacity: 0, y: 15 }, 
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, 
        "-=0.4"
      );
    }
  }

  /* 5. ScrollTrigger Animations: Reveals, Parallax & Storytelling Scoped with gsap.context() */
  initScrollAnimations() {
    if (this.prefersReducedMotion || !window.gsap || !window.ScrollTrigger) return;

    // Use gsap.context for clean scoping and teardown
    this.ctx = gsap.context(() => {
      // Fade-up elements with data-reveal: play once, remove scroll overhead once visible
      const revealElements = document.querySelectorAll('[data-reveal]');
      revealElements.forEach(el => {
        gsap.fromTo(el, 
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none none',
              once: true
            }
          }
        );
      });

      // Parallax on images with data-parallax (only if elements exist)
      const parallaxEls = document.querySelectorAll('[data-parallax]');
      if (parallaxEls.length > 0) {
        parallaxEls.forEach(el => {
          const speed = parseFloat(el.dataset.parallax) || 0.15;
          gsap.to(el, {
            y: `${speed * 120}px`,
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true
            }
          });
        });
      }

      // "The Healthier Way" Scroll-Pinned Section
      this.initPinnedStorytelling();

      // Stats Counter Animation
      this.initCounterTriggers();
    });
  }

  /* 6. "The Healthier Way" Scroll-Pinned Process Section (if present) */
  initPinnedStorytelling() {
    const section = document.querySelector('#healthier-way-section');
    if (!section || window.innerWidth < 1024) return;

    const cards = gsap.utils.toArray('.process-step-panel');
    const stepTabs = gsap.utils.toArray('.process-indicator-item');

    if (cards.length < 2) return;

    const pinTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        pin: true,
        start: 'top top',
        end: `+=${cards.length * 90}%`,
        scrub: 0.6,
        snap: {
          snapTo: 1 / (cards.length - 1),
          duration: 0.4,
          ease: 'power1.inOut'
        }
      }
    });

    cards.forEach((card, i) => {
      if (i > 0) {
        pinTl.fromTo(card, 
          { yPercent: 100, opacity: 0.2, scale: 0.94 }, 
          { 
            yPercent: 0, 
            opacity: 1, 
            scale: 1, 
            duration: 1, 
            ease: 'power2.inOut',
            onStart: () => this.updateStepIndicators(stepTabs, i),
            onReverseComplete: () => this.updateStepIndicators(stepTabs, i - 1)
          }
        );
      }
    });
  }

  updateStepIndicators(tabs, activeIndex) {
    tabs.forEach((tab, idx) => {
      if (idx === activeIndex) {
        tab.classList.add('bg-caramel', 'text-warm-white', 'scale-105');
        tab.classList.remove('bg-white/10', 'text-cream-dark');
      } else {
        tab.classList.remove('bg-caramel', 'text-warm-white', 'scale-105');
        tab.classList.add('bg-white/10', 'text-cream-dark');
      }
    });
  }

  /* 7. Numbers Counting Up Animation */
  initCounterTriggers() {
    const counters = document.querySelectorAll('[data-counter-target]');
    if (!counters.length) return;

    counters.forEach(counter => {
      const target = parseFloat(counter.dataset.counterTarget) || 0;
      const suffix = counter.dataset.counterSuffix || '';
      const prefix = counter.dataset.counterPrefix || '';

      const countObj = { val: 0 };

      ScrollTrigger.create({
        trigger: counter,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(countObj, {
            val: target,
            duration: 1.8,
            ease: 'power3.out',
            onUpdate: () => {
              counter.textContent = `${prefix}${Math.round(countObj.val)}${suffix}`;
            }
          });
        }
      });
    });
  }

  destroy() {
    if (this.ctx) {
      this.ctx.revert();
    }
  }
}

export const animationEngine = new AnimationEngine();
