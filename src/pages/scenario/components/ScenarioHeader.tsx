import { Button } from '@/components/ui/button';
import { colors, layouts } from '@/lib/design-system';
import { ArrowLeft, Download, Share2 } from 'lucide-react';

interface ScenarioHeaderProps {
  onBack: () => void;
  onShare: () => void;
  onDownload: () => void;
}

export default function ScenarioHeader({ onBack, onShare, onDownload }: ScenarioHeaderProps) {
  return (
    <div className="text-center mb-8 relative">
      <div className={layouts.pageHeaderBackground}></div>
      <div className="flex items-center justify-between">
        <Button
          onClick={onBack}
          variant="outline"
          className="text-foreground border-border bg-transparent hover:opacity-80"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Create
        </Button>
        
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2 text-foreground">Scenario Generated</h1>
          <p className="text-foreground opacity-70">Ready for implementation and testing</p>
        </div>

        <div className="flex space-x-2">
          <Button
            onClick={onShare}
            variant="outline"
            className="text-foreground border-border bg-transparent hover:opacity-80"
          >
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button
            onClick={onDownload}
            variant="outline"
            className="text-foreground border-border bg-transparent hover:opacity-80"
          >
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </div>
      </div>
    </div>
  );
}
