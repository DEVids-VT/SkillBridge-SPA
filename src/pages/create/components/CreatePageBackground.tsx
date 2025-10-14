import { cn } from '@/lib/utils';

interface CreatePageBackgroundProps {
  variant?: 'persona' | 'manual';
}

export default function CreatePageBackground({ variant = 'persona' }: CreatePageBackgroundProps) {
  return (
    <>
      {/* Background accent elements */}
      <div 
        className={cn(
          "absolute top-20 right-20 w-72 h-72 rounded-full opacity-10 blur-3xl",
          variant === 'persona' ? "bg-primary" : "bg-accent"
        )}
      />
      <div 
        className="absolute bottom-20 left-20 w-60 h-60 rounded-full opacity-15 blur-3xl bg-secondary"
      />
      {variant === 'persona' && (
        <div 
          className="absolute top-1/2 left-1/3 w-32 h-32 rounded-full opacity-15 blur-3xl bg-accent"
        />
      )}
    </>
  );
}
