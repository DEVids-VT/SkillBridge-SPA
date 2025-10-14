import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

export interface OutputTypeSelectorProps {
  onSelect: (type: 'scenario' | 'quiz') => void;
  disabled?: boolean;
  loading?: boolean;
  selectedType?: 'scenario' | 'quiz' | null;
}

export function OutputTypeSelector({ onSelect, disabled = false, loading = false, selectedType = null }: OutputTypeSelectorProps) {
  const { t } = useTranslation('createProject');

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold text-foreground mb-4 text-center">
        {t('outputTypeSelector.title')}
      </h3>
      <p className="text-muted-foreground text-center mb-6">
        {t('outputTypeSelector.subtitle')}
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Scenario Option */}
        <Card 
          className={cn(
            "p-6 cursor-pointer transition-all border-2 relative",
            selectedType === 'scenario' 
              ? "border-primary bg-primary/20" 
              : "border-border bg-card hover:bg-muted",
            (disabled || (loading && selectedType !== 'scenario')) && "opacity-50 cursor-not-allowed"
          )}
          onClick={() => !disabled && !loading && onSelect('scenario')}
        >
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary flex items-center justify-center">
              <span className="text-xl">🎯</span>
            </div>
            <h4 className="text-lg font-semibold text-card-foreground mb-2">
              {t('outputTypeSelector.scenario.title')}
            </h4>
            <p className="text-muted-foreground text-sm">
              {t('outputTypeSelector.scenario.description')}
            </p>
            
            {/* Loading animation inside the card */}
            {loading && selectedType === 'scenario' && (
              <div className="mt-4">
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div>
                  <span className="text-primary text-sm">
                    {t('outputTypeSelector.generateButton.loading')}
                  </span>
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Quiz Option - Coming Soon */}
        <Card 
          className={cn(
            "p-6 transition-all border-2 relative opacity-50 cursor-not-allowed",
            "border-border bg-card"
          )}
        >
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
              <span className="text-xl">❓</span>
            </div>
            <h4 className="text-lg font-semibold text-card-foreground mb-2">
              {t('outputTypeSelector.quiz.title')}
            </h4>
            <p className="text-muted-foreground text-sm mb-3">
              {t('outputTypeSelector.quiz.description')}
            </p>
            
            {/* Coming Soon Badge */}
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-muted border border-border">
              <span className="text-muted-foreground text-xs font-medium">
                Coming Soon
              </span>
            </div>
          </div>
        </Card>
      </div>

      {/* Generate button - only show when type is selected and not loading */}
      {selectedType && !loading && (
        <div className="mt-6 text-center">
          <Button
            disabled={disabled}
            className={cn(
              "px-8 py-3",
              selectedType === 'scenario' ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground"
            )}
          >
            {t(`outputTypeSelector.generateButton.${selectedType}`)}
          </Button>
        </div>
      )}
    </div>
  );
} 