import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { spacing, layouts } from '@/lib/design-system';
import { cn } from '@/lib/utils';

export const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white py-20">
      <div className={cn(spacing.container, 'text-center')}>
        <h1 className={layouts.pageTitle}>
          <span className="text-blue-600">About</span>{' '}
          <span className="text-gray-600">Endorsify</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
          Empowering careers, connecting talent, and building a community of growth-minded
          professionals.
        </p>
        <div className="flex justify-center gap-4">
          <Button>Our Story</Button>
          <Button variant="outline">Join Our Team</Button>
        </div>
      </div>
    </div>
  );
};
