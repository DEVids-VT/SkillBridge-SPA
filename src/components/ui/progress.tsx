import * as React from 'react';
import { cn } from '@/lib/utils';

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  trackColor?: string;
  indicatorColor?: string;
}

function Progress({ className, value, trackColor, indicatorColor, ...props }: ProgressProps) {
  return (
    <div
      data-slot="progress"
      className={cn('relative h-2 w-full overflow-hidden rounded-full', className)}
      style={{ backgroundColor: trackColor }}
      {...props}
    >
      <div
        data-slot="progress-indicator"
        className="h-full w-full flex-1 transition-all"
        style={{
          transform: `translateX(-${100 - (value || 0)}%)`,
          backgroundColor: indicatorColor,
        }}
      />
    </div>
  );
}

export { Progress };
