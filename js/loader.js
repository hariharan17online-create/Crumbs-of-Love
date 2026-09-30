/**
 * CRUMBS OF LOVE — AWARD-LEVEL BRANDED PRELOADER
 * Driven by real page & font load, rAF mathematical easing, and dual curtain lift.
 */

(function initLoader() {
  const loaderEl = document.getElementById('cl-preloader');
  if (!loaderEl) return;

  // Immediately lock scrolling on <html>
  document.documentElement.classList.add('is-loading');

  // Pause Lenis smooth scroll if present
  if (window.lenis && typeof window.lenis.stop === 'function') {
    window.lenis.stop();
  }

  // Check repeat visit in same session (sessionStorage wrapped in try/catch)
  let isRepeatVisit = false;
  try {
    isRepeatVisit = Boolean(sessionStorage.getItem('cl-seen'));
  } catch (err) {
    isRepeatVisit = false;
  }

  const minDuration = isRepeatVisit ? 900 : 2800; // ms: 2.8s first visit, 0.9s repeat visit
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Elements
  const progressRing = document.getElementById('cl-progress-ring');
  const dotGroup = document.getElementById('cl-ring-dot');
  const statusEl = document.getElementById('cl-status');
  const percentEl = document.getElementById('cl-percent');

  const RING_CIRCUMFERENCE = 590.62; // 2 * Math.PI * 94

  // Status text milestones
  const stages = [
    { threshold: 0.00, text: 'Melting the chocolate' },
    { threshold: 0.28, text: 'Folding in the batter' },
    { threshold: 0.55, text: 'Into the oven' },
    { threshold: 0.82, text: 'Cooling on the rack' },
    { threshold: 1.00, text: 'Fresh out of the oven' }
  ];

  let currentStageIndex = 0;
  let isCrossFading = false;

  function updateStatus(p) {
    if (!statusEl) return;
    let targetIndex = 0;
    for (let i = stages.length - 1; i >= 0; i--) {
      if (p >= stages[i].threshold) {
        targetIndex = i;
        break;
      }
    }

    if (targetIndex !== currentStageIndex && !isCrossFading) {
      currentStageIndex = targetIndex;
      isCrossFading = true;
      statusEl.classList.add('cl-fade');
      setTimeout(() => {
        statusEl.textContent = stages[targetIndex].text;
        statusEl.classList.remove('cl-fade');
        setTimeout(() => {
          isCrossFading = false;
        }, 180);
      }, 180);
    }
  }

  // Track Real Page & Font Readiness
  let pageAndFontsReady = false;
  const onReady = () => {
    pageAndFontsReady = true;
  };

  const checkReadiness = () => {
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(onReady).catch(onReady);
    } else {
      onReady();
    }
  };

  if (document.readyState === 'complete') {
    checkReadiness();
  } else {
    window.addEventListener('load', checkReadiness, { once: true });
  }

  // Smooth easing simulation curve: easeOutCubic
  const easeProgress = (x) => 1 - Math.pow(1 - x, 2.2);

  const startTime = performance.now();
  let completed = false;

  function tick(now) {
    if (completed) return;

    const elapsed = now - startTime;
    const timeRatio = Math.min(1, elapsed / minDuration);

    let progress = 0;

    if (!pageAndFontsReady) {
      // Firmly capped at 0.88 (88%) until window 'load' and document.fonts.ready have both fired
      progress = Math.min(0.88, easeProgress(timeRatio) * 0.88);
    } else {
      if (elapsed < minDuration) {
        // Page is ready early; progress smoothly to 100% aligned with minDuration
        progress = easeProgress(timeRatio);
      } else {
        // Page is ready and minimum display time elapsed -> Complete!
        progress = 1.0;
      }
    }

    // Clamp progress between 0 and 1
    progress = Math.max(0, Math.min(1, progress));

    // Update Progress Ring (stroke-dashoffset from 590.62 to 0)
    if (progressRing) {
      const offset = RING_CIRCUMFERENCE * (1 - progress);
      progressRing.style.strokeDashoffset = offset.toFixed(2);
    }

    // Update Leading Edge Dot Position: (100 + 94*sin, 100 - 94*cos)
    if (dotGroup) {
      const angle = progress * 2 * Math.PI;
      const x = 100 + 94 * Math.sin(angle);
      const y = 100 - 94 * Math.cos(angle);
      dotGroup.setAttribute('transform', `translate(${x.toFixed(2)}, ${y.toFixed(2)})`);
    }

    // Update Oven Glow & Container Progress CSS variable
    loaderEl.style.setProperty('--p', progress.toFixed(4));

    // Update Percentage Text
    const pct = Math.round(progress * 100);
    if (percentEl) {
      percentEl.textContent = `${pct}%`;
    }
    loaderEl.setAttribute('aria-valuenow', pct.toString());

    // Update Status Stage
    updateStatus(progress);

    // Completion Trigger at 100%
    if (progress >= 1.0) {
      completed = true;
      if (statusEl) {
        statusEl.textContent = 'Fresh out of the oven';
      }
      // Hold for 650ms at 100%, then initiate exit animation
      setTimeout(startExitAnimation, 650);
      return;
    }

    requestAnimationFrame(tick);
  }

  // Start rAF loop
  requestAnimationFrame(tick);

  function startExitAnimation() {
    // 1. Stage content fades out and moves up
    // 2. Dual curtain lift: cream at delay 0.12s, maroon at delay 0.30s
    loaderEl.classList.add('cl-exiting');

    const exitDuration = prefersReduced ? 360 : 1300; // ms

    setTimeout(() => {
      // 3. Remove loader from view, restore scrolling, dispatch event
      loaderEl.style.display = 'none';
      loaderEl.setAttribute('aria-busy', 'false');
      loaderEl.setAttribute('hidden', '');

      document.documentElement.classList.remove('is-loading');
      document.body.style.overflow = '';

      if (window.lenis && typeof window.lenis.start === 'function') {
        window.lenis.start();
      }

      // Mark global completion flag
      window.__loaderDone = true;

      // Store seen flag for shorter repeat visits
      try {
        sessionStorage.setItem('cl-seen', '1');
      } catch (e) {}

      // Dispatch 'loader:done' window event
      window.dispatchEvent(new CustomEvent('loader:done'));
    }, exitDuration);
  }
})();
