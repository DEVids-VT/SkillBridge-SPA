import { useTranslation } from 'react-i18next';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { HelpCircle } from 'lucide-react';
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
  onFieldChange, 
  onCSVChange, 
  onUpdatePersonalityTraits, 
  onUpdateCustomCriteria,
  title,
  description
}: DetailsTabProps) {
  const { t } = useTranslation('createProject');

  return (
    <Card className="border border-border bg-card/80">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-card-foreground">
          {title}
          <HelpCircle className="h-4 w-4 text-muted-foreground" />
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Ideal Candidate Profile */}
        <div className="space-y-2">
          <Label htmlFor="idealCandidateProfile" className="font-medium text-card-foreground">
            {t('createPersonaPage.form.idealCandidateProfile.label')}
          </Label>
          <Textarea
            id="idealCandidateProfile"
            name="idealCandidateProfile"
            placeholder={t('createPersonaPage.form.idealCandidateProfile.placeholder')}
            value={formData.idealCandidateProfile}
            onChange={onFieldChange}
            rows={4}
            className="bg-card border-border text-card-foreground placeholder:text-muted-foreground"
          />
        </div>

        {/* Key Responsibilities */}
        <div className="space-y-2">
          <Label htmlFor="keyResponsibilities" className="font-medium text-card-foreground">
            {t('createPersonaPage.form.keyResponsibilities.label')}
          </Label>
          <Input
            id="keyResponsibilities"
            name="keyResponsibilities"
            placeholder={t('createPersonaPage.form.keyResponsibilities.placeholder')}
            value={formData.keyResponsibilities}
            onChange={(e) => onCSVChange('keyResponsibilities', e.target.value)}
            className="bg-card border-border text-card-foreground placeholder:text-muted-foreground"
          />
          <p className="text-sm text-muted-foreground">
            {t('createPersonaPage.form.keyResponsibilities.help')}
          </p>
        </div>

        {/* Personality Traits */}
        <div className="space-y-3">
          <Label className="font-medium text-card-foreground">
            {t('createPersonaPage.form.desiredPersonalityTraits.label')}
          </Label>
          <ImprovedPersonalityTraitsList
            title=""
            list={formData.desiredPersonalityTraits}
            onChange={onUpdatePersonalityTraits}
          />
        </div>

        {/* Culture Fit Description */}
        <div className="space-y-2">
          <Label htmlFor="cultureFitDescription" className="font-medium text-card-foreground">
            {t('createPersonaPage.form.cultureFitDescription.label')}
          </Label>
          <Textarea
            id="cultureFitDescription"
            name="cultureFitDescription"
            placeholder={t('createPersonaPage.form.cultureFitDescription.placeholder')}
            value={formData.cultureFitDescription}
            onChange={onFieldChange}
            rows={3}
            className="bg-card border-border text-card-foreground placeholder:text-muted-foreground"
          />
        </div>

        {/* Custom Criteria */}
        <div className="space-y-3">
          <Label className="font-medium text-card-foreground">
            {t('createPersonaPage.form.customCriteria.label')}
          </Label>
          <ImprovedKeyValueList
            title=""
            list={formData.customCriteria}
            onChange={onUpdateCustomCriteria}
            keyPlaceholder={t('createPersonaPage.form.customCriteria.keyPlaceholder')}
            valuePlaceholder={t('createPersonaPage.form.customCriteria.valuePlaceholder')}
          />
        </div>
      </CardContent>
    </Card>
  );
}