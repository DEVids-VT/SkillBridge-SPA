import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { colors } from '@/lib/design-system';
import { cn } from '@/lib/utils';

export interface OutputTypeSelectorProps {
  onSelect: (type: 'scenario' | 'quiz') => void;
  disabled?: boolean;
  loading?: boolean;
  selectedType?: 'scenario' | 'quiz' | null;
}

export function OutputTypeSelector({ onSelect, disabled = false, loading = false, selectedType = null }: OutputTypeSelectorProps) {
  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold text-white mb-4 text-center">
        Choose Output Type
      </h3>
      <p className="text-gray-300 text-center mb-6">
        What would you like to generate from your input?
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Scenario Option */}
        <Card 
          className={cn(
            "p-6 cursor-pointer transition-all border-2",
            selectedType === 'scenario' 
              ? "border-blue-500 bg-blue-900/20" 
              : "border-gray-700 bg-gray-800 hover:bg-gray-750",
            disabled && "opacity-50 cursor-not-allowed"
          )}
          onClick={() => !disabled && !loading && onSelect('scenario')}
        >
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-blue-600 flex items-center justify-center">
              <span className="text-xl">🎯</span>
            </div>
            <h4 className="text-lg font-semibold text-white mb-2">Generate Scenario</h4>
            <p className="text-gray-300 text-sm">
              Create a realistic work scenario or project task based on your input
            </p>
          </div>
        </Card>

        {/* Quiz Option */}
        <Card 
          className={cn(
            "p-6 cursor-pointer transition-all border-2",
            selectedType === 'quiz' 
              ? "border-orange-500 bg-orange-900/20" 
              : "border-gray-700 bg-gray-800 hover:bg-gray-750",
            disabled && "opacity-50 cursor-not-allowed"
          )}
          onClick={() => !disabled && !loading && onSelect('quiz')}
        >
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-orange-600 flex items-center justify-center">
              <span className="text-xl">❓</span>
            </div>
            <h4 className="text-lg font-semibold text-white mb-2">Generate Quiz</h4>
            <p className="text-gray-300 text-sm">
              Create assessment questions to test knowledge and skills
            </p>
          </div>
        </Card>
      </div>

      {selectedType && (
        <div className="mt-6 text-center">
          <Button
            disabled={disabled || loading}
            className="px-8 py-3"
            style={{ 
              backgroundColor: selectedType === 'scenario' ? colors.blue : colors.orange 
            }}
          >
            {loading ? 'Generating...' : `Generate ${selectedType === 'scenario' ? 'Scenario' : 'Quiz'}`}
          </Button>
        </div>
      )}
    </div>
  );
} 