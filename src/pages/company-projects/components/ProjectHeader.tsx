import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { colors } from '@/lib/design-system';
import { ChevronLeft } from 'lucide-react';

interface ProjectHeaderProps {
  title: string;
  companyName: string;
}

export default function ProjectHeader({ title, companyName }: ProjectHeaderProps) {
  const navigate = useNavigate();

  return (
    <div className="mb-4">
      {/* Desktop layout */}
      <div className="hidden md:flex items-center justify-between">
        <div>
          <h1 className="font-playfair text-3xl font-bold" style={{ color: colors.white }}>
            {title || 'Project'}
          </h1>
          <p className="text-sm" style={{ color: colors.textSecondary }}>
            {companyName}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" onClick={() => navigate(-1)} style={{ backgroundColor: colors.blueDark, color: colors.white }} className="gap-2 h-9">
            <ChevronLeft className="size-4" />
            Back
          </Button>
        </div>
      </div>
      
      {/* Mobile layout */}
      <div className="md:hidden">
        <div>
          <h1 className="font-playfair text-3xl font-bold" style={{ color: colors.white }}>
            {title || 'Project'}
          </h1>
          <p className="text-sm" style={{ color: colors.textSecondary }}>
            {companyName}
          </p>
        </div>
        <div className="flex gap-2 mt-4">
          <Button variant="ghost" onClick={() => navigate(-1)} style={{ backgroundColor: colors.blueDark, color: colors.white }} className="gap-2 h-9">
            <ChevronLeft className="size-4" />
            Back
          </Button>
        </div>
      </div>
    </div>
  );
}
