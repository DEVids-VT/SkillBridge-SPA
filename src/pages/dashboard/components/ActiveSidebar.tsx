import React, { ReactNode, useRef, useEffect, useState } from 'react';
import { colors, sidebar } from '@/lib/design-system';
import { cn } from '@/lib/utils';
import { useActiveSidebar } from '@/contexts/ActiveSidebarContext';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import './sidebar-scrollbar.css';

interface ActiveSidebarProps {
  title: string;
  children: ReactNode;
}

export const ActiveSidebar = ({ title, children }: ActiveSidebarProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { isOpen, close } = useActiveSidebar();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  // Handle wheel events to enable mouse scrolling
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const handleWheel = (e: WheelEvent) => {
      // Prevent the default scroll behavior
      e.preventDefault();
      
      // Manually scroll the container
      scrollContainer.scrollTop += e.deltaY;
    };

    // Add event listener
    scrollContainer.addEventListener('wheel', handleWheel, { passive: false });

    // Clean up
    return () => {
      scrollContainer.removeEventListener('wheel', handleWheel);
    };
  }, []);

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
    if (isMobile && isOpen) {
      close();
    }
  }, [isMobile, isOpen, close]);

  // Desktop version - always visible
  if (!isMobile) {
    return (
      <div className="w-64 flex-shrink-0 bg-slate-900 border-r border-slate-700">
        <div className="sticky top-0 h-screen">
          <div className="h-full flex flex-col">
            {/* Header */}
            <div className={cn(sidebar.sections.header, "border-b")}>
              <h1 className="text-xl font-semibold text-white">{title}</h1>
            </div>

            {/* Content Area */}
            <div 
              ref={scrollContainerRef}
              className="flex-1 overflow-y-auto invisible-scrollbar"
            >
              <div className="p-4 space-y-3">
                {children}
              </div>
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
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
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
            className="fixed left-0 top-0 z-50 h-screen w-80 max-w-[90vw] flex flex-col bg-slate-900 border-r border-slate-700"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.25, type: "spring", stiffness: 300, damping: 25 }}
          >
            {/* Header */}
            <div className={cn(sidebar.sections.header, "border-b", "justify-between")}>
              <h1 className="text-xl font-semibold text-white">{title}</h1>
              
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

            {/* Content Area */}
            <div 
              ref={scrollContainerRef}
              className="flex-1 overflow-y-auto sidebar-scrollbar"
            >
              <div className="p-4 space-y-3">
                {children}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}; 