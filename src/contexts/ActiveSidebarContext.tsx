import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ActiveSidebarContextType {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
  open: () => void;
}

const ActiveSidebarContext = createContext<ActiveSidebarContextType | undefined>(undefined);

export function ActiveSidebarProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    console.log('ActiveSidebar toggle called, current state:', isOpen);
    setIsOpen((prev) => !prev);
  };
  const close = () => {
    console.log('ActiveSidebar close called');
    setIsOpen(false);
  };
  const open = () => {
    console.log('ActiveSidebar open called');
    setIsOpen(true);
  };

  return (
    <ActiveSidebarContext.Provider value={{ isOpen, toggle, close, open }}>
      {children}
    </ActiveSidebarContext.Provider>
  );
}

export function useActiveSidebar() {
  const context = useContext(ActiveSidebarContext);
  if (context === undefined) {
    throw new Error('useActiveSidebar must be used within an ActiveSidebarProvider');
  }
  return context;
}
