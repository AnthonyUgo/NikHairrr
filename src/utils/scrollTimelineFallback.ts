// src/utils/scrollTimelineFallback.ts
// Fallback for browsers without CSS View Timeline support
// Uses IntersectionObserver to trigger scroll-based animations

export function initScrollTimelineFallback() {
  // Check if CSS View Timeline is supported
  const supported =
    typeof CSS !== 'undefined' &&
    CSS.supports &&
    CSS.supports('animation-timeline', 'view()');

  // If supported, no fallback needed
  if (supported) {
    console.log('✅ CSS View Timeline API supported - using native scroll animations');
    return;
  }

  console.log('⚠️ CSS View Timeline API not supported - using fallback');

  // Get all video wipe sections
  const sections = document.querySelectorAll('.nh-section');

  if (sections.length === 0) {
    console.warn('No .nh-section elements found for scroll timeline fallback');
    return;
  }

  // Create IntersectionObserver to track section visibility
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Section is visible - add active class
          entry.target.classList.add('is-active');
        } else {
          // Section is not visible - remove active class
          entry.target.classList.remove('is-active');
        }
      });
    },
    {
      threshold: [0, 0.5, 1], // Trigger at different visibility levels
      rootMargin: '-10% 0px -10% 0px', // Slight offset for better timing
    }
  );

  // Observe all sections
  sections.forEach((section) => {
    observer.observe(section);
  });

  console.log(`📱 Scroll timeline fallback initialized for ${sections.length} sections`);
}

// Auto-initialize when DOM is ready
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollTimelineFallback);
  } else {
    // DOMContentLoaded has already fired
    initScrollTimelineFallback();
  }
}
