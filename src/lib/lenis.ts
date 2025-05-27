import Lenis from '@studio-freight/lenis';

// Default Lenis instance options
const defaultOptions = {
  duration: 1.2,
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
  orientation: 'vertical', // 'vertical' | 'horizontal'
  gestureOrientation: 'vertical', // 'vertical' | 'horizontal'
  smoothWheel: true,
  wheelMultiplier: 1,
  smoothTouch: false,
  touchMultiplier: 2,
  infinite: false,
};

// Create and initialize a Lenis instance
export const initSmoothScroll = (
  options = {},
  scrollFn?: (props: {
    scroll: number;
    limit: number;
    velocity: number;
    direction: number;
    progress: number;
  }) => void
) => {
  // Merge default options with provided options
  const lenis = new Lenis({
    ...defaultOptions,
    ...options,
  });

  // Connect lenis to requestAnimationFrame
  function raf(time: number) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  // Start the animation loop
  requestAnimationFrame(raf);

  // Add scroll callback if provided
  if (scrollFn) {
    lenis.on('scroll', scrollFn);
  }

  return lenis;
};

// Scroll to an element or position
export const scrollTo = (target: string | number | HTMLElement, options = {}) => {
  const lenis = window.__lenis;
  if (!lenis) return;

  lenis.scrollTo(target, options);
};

// Utility to handle anchor links
export const handleSmoothScroll = () => {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      if (!targetId || targetId === '#') return;

      scrollTo(targetId);
    });
  });
};

// Declare a global Lenis instance
declare global {
  interface Window {
    __lenis: Lenis;
  }
}
