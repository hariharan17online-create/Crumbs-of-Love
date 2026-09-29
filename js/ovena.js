/**
 * CRUMBS OF LOVE - OVENA TEMPLATE CONTROLLER
 * Testimonial carousel, FAQ accordion, and custom order enquiry handler.
 */

import { TESTIMONIALS, STORE_CONFIG } from './data.js';

class OvenaController {
  constructor() {
    this.currentTestimonialIndex = 0;
    this.testimonialTimer = null;
    this.init();
  }

  init() {
    this.initTestimonials();
    this.initFaqAccordion();
    this.initCustomOrderForm();
  }

  /* 1. Testimonial Carousel with Auto-Advance, Arrows & Dots */
  initTestimonials() {
    const quoteEl = document.getElementById('testimonial-quote');
    const authorEl = document.getElementById('testimonial-author');
    const roleEl = document.getElementById('testimonial-role');
    const avatarEl = document.getElementById('testimonial-avatar');
    const dotsContainer = document.getElementById('testimonial-dots');
    const prevBtn = document.getElementById('testimonial-prev-btn');
    const nextBtn = document.getElementById('testimonial-next-btn');

    if (!quoteEl || !TESTIMONIALS.length) return;

    // Create pagination dots
    if (dotsContainer) {
      dotsContainer.innerHTML = TESTIMONIALS.map((_, i) => `
        <button 
          data-index="${i}" 
          class="w-3 h-3 rounded-full transition-all duration-300 ${i === 0 ? 'bg-[#981C0A] w-6' : 'bg-[#E7DDD2] hover:bg-[#D98F4E]'}" 
          aria-label="Go to testimonial ${i + 1}"
        ></button>
      `).join('');

      dotsContainer.addEventListener('click', (e) => {
        const dot = e.target.closest('button');
        if (!dot) return;
        const index = parseInt(dot.getAttribute('data-index'), 10);
        if (!isNaN(index)) {
          this.showTestimonial(index);
          this.resetTimer();
        }
      });
    }

    const next = () => {
      const nextIndex = (this.currentTestimonialIndex + 1) % TESTIMONIALS.length;
      this.showTestimonial(nextIndex);
    };

    const prev = () => {
      const prevIndex = (this.currentTestimonialIndex - 1 + TESTIMONIALS.length) % TESTIMONIALS.length;
      this.showTestimonial(prevIndex);
    };

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        next();
        this.resetTimer();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        prev();
        this.resetTimer();
      });
    }

    // Auto-advance every 5 seconds
    this.startTimer();
  }

  showTestimonial(index) {
    this.currentTestimonialIndex = index;
    const t = TESTIMONIALS[index];
    if (!t) return;

    const card = document.getElementById('testimonial-card-container');
    const quoteEl = document.getElementById('testimonial-quote');
    const authorEl = document.getElementById('testimonial-author');
    const roleEl = document.getElementById('testimonial-role');
    const avatarEl = document.getElementById('testimonial-avatar');
    const dotsContainer = document.getElementById('testimonial-dots');

    if (card) {
      card.style.opacity = '0.3';
      card.style.transform = 'translateY(6px)';
      card.style.transition = 'all 0.25s ease';
    }

    setTimeout(() => {
      if (quoteEl) quoteEl.textContent = `"${t.quote}"`;
      if (authorEl) authorEl.textContent = t.author;
      if (roleEl) roleEl.textContent = `${t.role}, ${t.location}`;
      if (avatarEl) {
        // Use initials
        const initials = t.author.split(' ').map(n => n[0]).join('').slice(0, 2);
        avatarEl.textContent = initials;
      }

      // Update dots
      if (dotsContainer) {
        const dots = dotsContainer.querySelectorAll('button');
        dots.forEach((dot, i) => {
          if (i === index) {
            dot.className = 'w-6 h-3 rounded-full bg-[#981C0A] transition-all duration-300';
          } else {
            dot.className = 'w-3 h-3 rounded-full bg-[#E7DDD2] hover:bg-[#D98F4E] transition-all duration-300';
          }
        });
      }

      if (card) {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }
    }, 200);
  }

  startTimer() {
    this.testimonialTimer = setInterval(() => {
      const nextIndex = (this.currentTestimonialIndex + 1) % TESTIMONIALS.length;
      this.showTestimonial(nextIndex);
    }, 5000);
  }

  resetTimer() {
    if (this.testimonialTimer) clearInterval(this.testimonialTimer);
    this.startTimer();
  }

  /* 2. FAQ Accordion: Smooth Toggle and '+' to '−' Rotation */
  initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    if (!faqItems.length) return;

    faqItems.forEach(item => {
      const btn = item.querySelector('.faq-question');
      const answer = item.querySelector('.faq-answer');
      const icon = item.querySelector('.faq-icon');

      if (!btn || !answer || !icon) return;

      btn.addEventListener('click', () => {
        const isExpanded = btn.getAttribute('aria-expanded') === 'true';

        // Close other open items
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            const otherBtn = otherItem.querySelector('.faq-question');
            const otherAnswer = otherItem.querySelector('.faq-answer');
            const otherIcon = otherItem.querySelector('.faq-icon');
            if (otherBtn && otherAnswer && otherIcon) {
              otherBtn.setAttribute('aria-expanded', 'false');
              otherAnswer.classList.add('hidden');
              otherAnswer.classList.remove('block');
              otherIcon.textContent = '+';
            }
          }
        });

        // Toggle current item
        if (isExpanded) {
          btn.setAttribute('aria-expanded', 'false');
          answer.classList.add('hidden');
          answer.classList.remove('block');
          icon.textContent = '+';
        } else {
          btn.setAttribute('aria-expanded', 'true');
          answer.classList.remove('hidden');
          answer.classList.add('block');
          icon.textContent = '−';
        }
      });
    });
  }

  /* 3. Custom Order Enquiry Submission to WhatsApp */
  initCustomOrderForm() {
    const form = document.getElementById('custom-order-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('order-name')?.value || '';
      const phone = document.getElementById('order-phone')?.value || '';
      const email = document.getElementById('order-email')?.value || 'Not provided';
      const date = document.getElementById('order-date')?.value || 'As soon as possible';
      const quantity = document.getElementById('order-quantity')?.value || 'Standard';
      const diet = document.getElementById('order-diet')?.value || 'Standard';
      const notes = document.getElementById('order-notes')?.value || 'None';

      const message = `*Custom Order / Celebration Enquiry - Crumbs of Love*\n\n` +
        `*Name:* ${name}\n` +
        `*Phone / WhatsApp:* ${phone}\n` +
        `*Email:* ${email}\n` +
        `*Target Delivery Date:* ${date}\n` +
        `*Estimated Quantity:* ${quantity}\n` +
        `*Dietary Choice:* ${diet}\n` +
        `*Special Requests / Notes:*\n${notes}\n\n` +
        `_Sent via Crumbs of Love Website_`;

      const encoded = encodeURIComponent(message);
      window.open(`https://wa.me/${STORE_CONFIG.rawPhone}?text=${encoded}`, '_blank');
    });
  }
}

// Auto-initialize when loaded
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    new OvenaController();
  });
}

export { OvenaController };
