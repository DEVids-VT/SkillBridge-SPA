import { colors } from '@/lib/design-system';

interface CreatePageBackgroundProps {
  variant?: 'persona' | 'manual';
}

export default function CreatePageBackground({ variant = 'persona' }: CreatePageBackgroundProps) {
  return (
    <>
      {/* Background accent elements */}
      <div 
        className="absolute top-20 right-20 w-72 h-72 rounded-full opacity-10 blur-3xl"
        style={{ backgroundColor: variant === 'persona' ? colors.blue : colors.orange }}
      />
      <div 
        className="absolute bottom-20 left-20 w-60 h-60 rounded-full opacity-15 blur-3xl"
        style={{ backgroundColor: colors.blueDark }}
      />
      {variant === 'persona' && (
        <div 
          className="absolute top-1/2 left-1/3 w-32 h-32 rounded-full opacity-15 blur-3xl"
          style={{ backgroundColor: colors.orange }}
        />
      )}
    </>
  );
}
