import React from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';
import { colors } from '@/lib/design-system';

interface CandidateFormStep1Props {
  formData: {
    username: string;
    cv: File | null;
  };
  errors: {
    username: boolean;
    cv: boolean;
  };
  onFieldChange: (field: string, value: string) => void;
  onCvChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function CandidateFormStep1({ formData, errors, onFieldChange, onCvChange }: CandidateFormStep1Props) {
  const { t } = useTranslation('welcome');

  return (
    <div className="space-y-6">
      {/* Username Field */}
      <div className="space-y-2">
        <Label htmlFor="username" className="text-sm font-medium" style={{ color: colors.white }}>
          {t('welcome.candidateForm.username')} *
        </Label>
        <Input
          id="username"
          type="text"
          value={formData.username}
          onChange={(e) => onFieldChange('username', e.target.value)}
          placeholder={t('welcome.candidateForm.placeholders.username')}
          className={`w-full ${errors.username ? 'border-red-500' : ''}`}
          style={{ 
            backgroundColor: colors.blueDark, 
            borderColor: errors.username ? '#ef4444' : colors.blue,
            color: colors.white 
          }}
        />
        {errors.username && (
          <div className="flex items-center gap-2 text-red-400 text-sm">
            <AlertCircle className="h-4 w-4" />
            {t('welcome.candidateForm.usernameRequired')}
          </div>
        )}
      </div>

      {/* CV Upload Field */}
      <div className="space-y-2">
        <Label className="text-sm font-medium mb-2" style={{ color: colors.white }}>
          {t('welcome.candidateForm.cvUpload')} *
        </Label>

        {formData.cv ? (
          <div
            className={`flex items-center justify-between border rounded-md p-2 ${
              errors.cv ? 'border-red-500' : 'border-blue-400'
            }`}
            style={{ borderColor: errors.cv ? '#ef4444' : colors.blue }}
          >
            <span className="text-sm truncate max-w-[250px]" style={{ color: colors.white }}>
              {formData.cv.name}
            </span>
            <Button
              type="button"
              variant="outline"
              size="sm"
              style={{ 
                borderColor: colors.red, 
                color: colors.red, 
                backgroundColor: 'transparent' 
              }}
              onClick={() => onCvChange({ target: { files: null } } as React.ChangeEvent<HTMLInputElement>)}
            >
              Remove
            </Button>
          </div>
        ) : (
          <Input
            type="file"
            accept=".pdf,.doc,.docx"
            className={`bg-transparent ${
              errors.cv ? 'border-red-500' : 'border-blue-400'
            }`}
            style={{ 
              borderColor: errors.cv ? '#ef4444' : colors.blue,
              color: colors.white 
            }}
            onChange={onCvChange}
          />
        )}
        
        {errors.cv && (
          <div className="flex items-center gap-2 text-red-400 text-sm">
            <AlertCircle className="h-4 w-4" />
            {t('welcome.candidateForm.cvRequired')}
          </div>
        )}
      </div>
    </div>
  );
}

export default CandidateFormStep1;
