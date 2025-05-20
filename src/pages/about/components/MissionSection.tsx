import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { spacing } from '@/lib/design-system';
import { cn } from '@/lib/utils';

export const MissionSection = () => {
  return (
    <section className={cn(spacing.container, spacing.section)}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-gray-600 mb-4">
            At Endorsify, we believe that everyone deserves access to opportunities that help them
            grow their careers and achieve their full potential.
          </p>
          <p className="text-gray-600 mb-4">
            Our mission is to bridge the gap between talent and opportunity by creating a platform
            that connects professionals with projects, courses, events, and companies that can help
            them advance their careers.
          </p>
          <p className="text-gray-600 mb-6">
            We're dedicated to fostering a community where skills are recognized, knowledge is
            shared, and connections are meaningful.
          </p>
          <Button variant="outline" className="flex items-center gap-2">
            Learn More <ArrowRight size={16} />
          </Button>
        </div>
        <div className="relative">
          <img
            src="/images/mission.jpg"
            alt="Endorsify mission visualization"
            className="rounded-xl shadow-lg w-full"
          />
          <div className="absolute -top-6 -right-6 bg-blue-100 rounded-xl p-8 shadow-lg hidden md:block">
            <p className="font-bold text-3xl text-blue-600">10k+</p>
            <p className="text-gray-600">Professionals connected</p>
          </div>
        </div>
      </div>
    </section>
  );
};
