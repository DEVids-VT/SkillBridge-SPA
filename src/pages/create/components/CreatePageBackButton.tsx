import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface CreatePageBackButtonProps {
  onBack: () => void;
  label: string;
}

export default function CreatePageBackButton({ onBack, label }: CreatePageBackButtonProps) {
  return (
    <div className="flex justify-start mb-6">
      <Button onClick={onBack} variant="ghost" className="flex items-center gap-2 text-white">
        <ArrowLeft className="h-5 w-5" />
        {label}
      </Button>
    </div>
  );
}
