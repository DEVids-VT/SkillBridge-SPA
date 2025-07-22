import React, { ReactNode } from 'react';
import { colors, sidebar } from '@/lib/design-system';
import { cn } from '@/lib/utils';
import './sidebar-scrollbar.css';

interface ActiveSidebarProps {
  title: string;
  children: ReactNode;
}

export const ActiveSidebar = ({ title, children }: ActiveSidebarProps) => {
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className={cn(sidebar.sections.header, "border-b")} style={{ borderBottomColor: colors.dark }}>
        <h1 className="text-xl font-semibold text-white">{title}</h1>
      </div>

      {/* Content Area */}
      <div className={cn(sidebar.sections.navigation, "flex-1 overflow-y-auto custom-scrollbar")}>
        <div className="p-4 space-y-3">
          {children}
        </div>
      </div>
    </div>
  );
}; 