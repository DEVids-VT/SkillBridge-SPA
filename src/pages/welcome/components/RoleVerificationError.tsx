import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

interface RoleVerificationErrorProps {
  role: string;
  onBackToRoleSelection: () => void;
}

export function RoleVerificationError({ role, onBackToRoleSelection }: RoleVerificationErrorProps) {
  const { t } = useTranslation('welcome');

  return (
    <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-lg max-w-xl mx-auto">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <AlertCircle className="h-6 w-6 text-red-500" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className="text-lg font-medium text-red-800">{t('roleVerificationError')}</h3>
          <div className="mt-2 text-sm text-red-700">
            <p>{t('roleVerificationErrorMessage', { role })}</p>
          </div>
          <div className="mt-4">
            <Button
              onClick={onBackToRoleSelection}
              variant="outline"
              className="border-red-300 text-red-700 hover:bg-red-50"
            >
              {t('backToRoleSelection')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoleVerificationError;
