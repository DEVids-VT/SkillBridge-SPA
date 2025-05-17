import { useEffect, useRef, ReactNode } from 'react';
import { initSmoothScroll, handleSmoothScroll } from '@/lib/lenis';
import Lenis from '@studio-freight/lenis';

interface LenisProviderProps {
  children: ReactNode;
  options?: Record<string, any>;
}

export function LenisProvider({ children, options = {} }: LenisProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);

  // Initialize Lenis on component mount
  useEffect(() => {
    // Create a new Lenis instance
    const lenis = initSmoothScroll(options);
    
    // Store the Lenis instance
    lenisRef.current = lenis;
    window.__lenis = lenis;

    // Setup smooth scrolling for anchor links
    handleSmoothScroll();

    // Clean up on unmount
    return () => {
      lenis.destroy();
    };
  }, [options]);

  return <>{children}</>;
}

export default LenisProvider; 