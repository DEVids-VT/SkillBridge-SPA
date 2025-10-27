import React, {
  ReactNode,
  useRef,
  useEffect,
  useState,
  TouchEvent,
  MouseEvent,
  CSSProperties,
} from 'react';
import { colors, sidebar } from '@/lib/design-system';
import { cn } from '@/lib/utils';
import { useActiveSidebar } from '@/contexts/ActiveSidebarContext';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocation } from 'react-router-dom';

interface ActiveSidebarProps {
  title: string;
  children: ReactNode;
}

export const ActiveSidebar = ({ title, children }: ActiveSidebarProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { isOpen, close } = useActiveSidebar();
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 1024 : false
  );
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const location = useLocation();

  // Track previous path for route change detection
  const prevPathRef = useRef(location.pathname);

  // Debug logging
  useEffect(() => {
    console.log('ActiveSidebar render - isOpen:', isOpen, 'isMobile:', isMobile);
  }, [isOpen, isMobile]);

  // Update mobile state when window resizes
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close sidebar on route change (mobile only)
  useEffect(() => {
    // Only close if we're on mobile, sidebar is open, and route actually changed
    if (isMobile && isOpen && prevPathRef.current !== location.pathname) {
      console.log(
        'Route changed from',
        prevPathRef.current,
        'to',
        location.pathname,
        '- closing ActiveSidebar'
      );
      close();
    }

    // Update the previous path after the check
    prevPathRef.current = location.pathname;
  }, [location.pathname, isMobile, isOpen, close]);

  // Prevent scroll propagation
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // Always stop propagation when scrolling inside the sidebar
    e.stopPropagation();

    const { scrollTop, scrollHeight, clientHeight } = container;
    const isScrollingUp = e.deltaY < 0;
    const isScrollingDown = e.deltaY > 0;
    const isAtTop = scrollTop === 0;
    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;

    // Prevent default browser behavior only at boundaries
    if ((isScrollingUp && isAtTop) || (isScrollingDown && isAtBottom)) {
      e.preventDefault();
    }
  };

  // Handle touch events for mobile
  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    setTouchStartY(e.touches[0].clientY);
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (touchStartY === null || !scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const { scrollTop, scrollHeight, clientHeight } = container;
    const currentY = e.touches[0].clientY;
    const isScrollingUp = currentY > touchStartY;
    const isScrollingDown = currentY < touchStartY;
    const isAtTop = scrollTop <= 0;
    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;

    // Prevent default at boundaries to stop propagation to parent
    if ((isScrollingUp && isAtTop) || (isScrollingDown && isAtBottom)) {
      e.preventDefault();
    }
  };

  // Handle mouse events for drag prevention
  const handleMouseDown = (_e: MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
  };

  const handleMouseUp = (_e: MouseEvent<HTMLDivElement>) => {
    setIsDragging(false);
  };

  const handleMouseLeave = (_e: MouseEvent<HTMLDivElement>) => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      // Prevent any default behavior when dragging inside the sidebar
      e.stopPropagation();
    }
  };

  // Custom style with proper TypeScript typing
  const containerStyle: CSSProperties = {
    willChange: 'transform',
    overscrollBehavior: 'contain',
    msOverflowStyle: 'none' as any,
    scrollbarWidth: 'none' as any,
  };

  // Desktop version - always visible
  if (!isMobile) {
    return (
      <div className="w-64 flex-shrink-0 mr-2">
        <div
          className="sticky top-0 w-64 h-full min-h-0 rounded-xl overflow-hidden"
          style={{ backgroundColor: colors.dark, borderColor: colors.dark }}
        >
          <div className="h-full flex flex-col">
            {/* Header */}
            <div className={cn(sidebar.sections.header)}>
              <h1 className="text-xl font-semibold text-white">{title}</h1>
            </div>

            {/* Content Area */}
            <div
              ref={scrollContainerRef}
              className="flex-1 overflow-y-auto hide-scrollbar"
              style={containerStyle}
              onWheel={handleWheel}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
              onMouseMove={handleMouseMove}
            >
              <div className="p-4 space-y-3">{children}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Mobile version - overlay
  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-slate-900 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={close}
          />
        )}
      </AnimatePresence>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`fixed right-0 top-0 z-50 h-screen flex flex-col`}
            style={{
              backgroundColor: colors.bgSlate900,
              borderColor: colors.bgSlate900,
              width: '100%',
            }}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.25, type: 'spring', stiffness: 300, damping: 25 }}
          >
            {/* Header */}
            <div className={cn(sidebar.sections.header)}>
              <div className="flex items-center min-w-0 flex-1">
                <h1 className="text-xl font-semibold text-white truncate">{title}</h1>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                {/* Close button for mobile */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-slate-800 hover:text-white focus:bg-slate-800 focus:text-white"
                  onClick={close}
                  aria-label="Close sidebar"
                >
                  <X className="h-6 w-6 text-white" />
                </Button>
              </div>
            </div>

            {/* Content Area */}
            <div
              ref={scrollContainerRef}
              className="flex-1 px-4 py-6 space-y-3 overflow-y-auto hide-scrollbar"
              style={containerStyle}
              onWheel={handleWheel}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
              onMouseMove={handleMouseMove}
            >
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
