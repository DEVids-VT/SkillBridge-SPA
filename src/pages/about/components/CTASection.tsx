import { Button } from '@/components/ui/button';
import { spacing } from '@/lib/design-system';
import { cn } from '@/lib/utils';

export const CTASection = () => {
  return (
    <section className={cn(spacing.container, 'py-16')}>
      <div className="bg-blue-50 rounded-xl p-8 md:p-12 text-center">
        <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-8">
          Be part of a growing network of professionals, companies, and educators working together
          to shape the future of careers.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg">Sign Up Now</Button>
          <Button variant="outline" size="lg">
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
};
