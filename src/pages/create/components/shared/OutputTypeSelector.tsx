import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { colors } from '@/lib/design-system';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

export interface OutputTypeSelectorProps {
  onSelect: (type: 'scenario' | 'quiz') => void;
  disabled?: boolean;
  loading?: boolean;
  selectedType?: 'scenario' | 'quiz' | null;
}

export function OutputTypeSelector({
  onSelect,
  disabled = false,
  loading = false,
  selectedType = null,
}: OutputTypeSelectorProps) {
  const { t } = useTranslation('createProject');

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold text-white mb-4 text-center">
        {t('outputTypeSelector.title')}
      </h3>
      <p className="text-gray-300 text-center mb-6">{t('outputTypeSelector.subtitle')}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Scenario Option */}
        <Card
          className={cn(
            'p-6 cursor-pointer transition-all border-2 relative',
            selectedType === 'scenario'
              ? 'border-blue-500 bg-blue-900/20'
              : 'border-gray-700 bg-gray-800 hover:bg-gray-750',
            (disabled || (loading && selectedType !== 'scenario')) &&
              'opacity-50 cursor-not-allowed'
          )}
          onClick={() => !disabled && !loading && onSelect('scenario')}
        >
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-blue-600 flex items-center justify-center">
              <span className="text-xl">🎯</span>
            </div>
            <h4 className="text-lg font-semibold text-white mb-2">
              {t('outputTypeSelector.scenario.title')}
            </h4>
            <p className="text-gray-300 text-sm">{t('outputTypeSelector.scenario.description')}</p>

            {/* Loading animation inside the card */}
            {loading && selectedType === 'scenario' && (
              <div className="mt-4">
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span className="text-blue-300 text-sm">
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
            'p-6 transition-all border-2 relative opacity-50 cursor-not-allowed',
            'border-gray-700 bg-gray-800'
          )}
        >
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gray-600 flex items-center justify-center">
              <span className="text-xl">❓</span>
            </div>
            <h4 className="text-lg font-semibold text-white mb-2">
              {t('outputTypeSelector.quiz.title')}
            </h4>
            <p className="text-gray-300 text-sm mb-3">{t('outputTypeSelector.quiz.description')}</p>

            {/* Coming Soon Badge */}
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-gray-700 border border-gray-600">
              <span className="text-gray-400 text-xs font-medium">Coming Soon</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Generate button - only show when type is selected and not loading */}
      {selectedType && !loading && (
        <div className="mt-6 text-center">
          <Button
            disabled={disabled}
            className="px-8 py-3"
            style={{
              backgroundColor: selectedType === 'scenario' ? colors.blue : colors.orange,
            }}
          >
            {t(`outputTypeSelector.generateButton.${selectedType}`)}
          </Button>
        </div>
      )}
    </div>
  );
}
