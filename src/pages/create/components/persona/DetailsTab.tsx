import { useTranslation } from 'react-i18next';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { colors } from '@/lib/design-system';
import { Input } from '@/components/ui/input';
import { ImprovedPersonalityTraitsList } from './ImprovedPersonalityTraitsList';
import { ImprovedKeyValueList } from './ImprovedKeyValueList';
import type { PersonalityTrait } from '@/types/candidate/requirements';
import type { CandidateRequirementsFormState, CandidateRequirementsFormErrors } from './CandidateRequirementsForm';

interface DetailsTabProps {
  formData: CandidateRequirementsFormState;
  errors: CandidateRequirementsFormErrors;
  onFieldChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onCSVChange: (name: keyof Pick<CandidateRequirementsFormState,
    'preferredEducationFields' | 'requiredCertifications' | 'preferredCertifications' | 'languageRequirements' | 'keyResponsibilities'>, value: string) => void;
  onUpdatePersonalityTraits: (list: PersonalityTrait[]) => void;
  onUpdateCustomCriteria: (list: { key: string; value: string }[]) => void;
  title: string;
  description: string;
}

export function DetailsTab({ 
  formData, 
  errors, 
  onFieldChange, 
  onCSVChange, 
  onUpdatePersonalityTraits, 
  onUpdateCustomCriteria,
  title,
  description
}: DetailsTabProps) {
  const { t } = useTranslation('createProject');

  // Common styles for consistency
  const textareaStyle = {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    color: colors.text,
  };

  return (
    <Card 
      className="border"
      style={{ 
        backgroundColor: `${colors.surface}80`, // 50% opacity
        borderColor: colors.border 
      }}
    >
      <CardHeader>
        <CardTitle className="flex items-center gap-2" style={{ color: colors.text }}>
          {title}
          <HelpCircle className="h-4 w-4" style={{ color: colors.textMuted }} />
        </CardTitle>
        <CardDescription style={{ color: colors.textSecondary }}>
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Position Summary - Required */}
        <div className="space-y-2">
          <Label htmlFor="positionSummary" className="font-medium" style={{ color: colors.text }}>
            {t('createPersonaPage.form.positionSummary.label')} <span style={{ color: colors.error }}>*</span>
          </Label>
          <Textarea 
            id="positionSummary" 
            name="positionSummary" 
            placeholder={t('createPersonaPage.form.positionSummary.placeholder')} 
            value={formData.positionSummary} 
            onChange={onFieldChange} 
            className={cn(
              "border min-h-24",
              errors.positionSummary && "border-red-500"
            )}
            style={{
              ...textareaStyle,
              borderColor: errors.positionSummary ? colors.error : colors.border,
            }}
          />
          {errors.positionSummary && <p className="text-sm" style={{ color: colors.error }}>{errors.positionSummary}</p>}
        </div>

        {/* Ideal Candidate Profile */}
        <div className="space-y-2">
          <Label htmlFor="idealCandidateProfile" className="font-medium" style={{ color: colors.text }}>
            {t('createPersonaPage.form.idealCandidateProfile.label')}
          </Label>
          <Textarea 
            id="idealCandidateProfile" 
            name="idealCandidateProfile" 
            placeholder={t('createPersonaPage.form.idealCandidateProfile.placeholder')} 
            value={formData.idealCandidateProfile} 
            onChange={onFieldChange} 
            className="border min-h-24"
            style={textareaStyle}
          />
        </div>

        {/* Key Responsibilities */}
        <div className="space-y-2">
          <Label htmlFor="keyResponsibilities" className="font-medium" style={{ color: colors.text }}>
            {t('createPersonaPage.form.keyResponsibilities.label')}
          </Label>
          <Input 
            id="keyResponsibilities" 
            name="keyResponsibilities" 
            placeholder={t('createPersonaPage.form.keyResponsibilities.placeholder')} 
            value={formData.keyResponsibilities} 
            onChange={(e) => onCSVChange('keyResponsibilities', e.target.value)} 
          />
        </div>

        {/* Personality Traits */}
        <ImprovedPersonalityTraitsList 
          title={t('createPersonaPage.form.desiredPersonalityTraits.title')} 
          list={formData.desiredPersonalityTraits} 
          onChange={onUpdatePersonalityTraits} 
        />

        {/* Culture Fit */}
        <div className="space-y-2">
          <Label htmlFor="cultureFitDescription" className="font-medium" style={{ color: colors.text }}>
            {t('createPersonaPage.form.cultureFitDescription.label')}
          </Label>
          <Textarea 
            id="cultureFitDescription" 
            name="cultureFitDescription" 
            placeholder={t('createPersonaPage.form.cultureFitDescription.placeholder')} 
            value={formData.cultureFitDescription} 
            onChange={onFieldChange} 
            className="border min-h-24"
            style={textareaStyle}
          />
        </div>

        {/* Custom Criteria */}
        <ImprovedKeyValueList 
          title={t('createPersonaPage.form.customCriteria.title')} 
          list={formData.customCriteria} 
          onChange={onUpdateCustomCriteria} 
        />
      </CardContent>
    </Card>
  );
}