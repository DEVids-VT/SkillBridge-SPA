import { useTranslation } from 'react-i18next';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { HelpCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { ImprovedCompetencyList } from './ImprovedCompetencyList';
import { ImprovedWorkConditionsList } from './ImprovedWorkConditionsList';
import type { CompetencyRequirement, WorkCondition } from '@/types/candidate/requirements';
import type { CandidateRequirementsFormState } from './CandidateRequirementsForm';

interface SkillsTabProps {
  formData: CandidateRequirementsFormState;
  onCSVChange: (name: keyof Pick<CandidateRequirementsFormState,
    'preferredEducationFields' | 'requiredCertifications' | 'preferredCertifications' | 'languageRequirements' | 'keyResponsibilities'>, value: string) => void;
  onUpdateRequiredCompetencies: (list: CompetencyRequirement[]) => void;
  onUpdatePreferredCompetencies: (list: CompetencyRequirement[]) => void;
  onUpdateWorkConditions: (list: WorkCondition[]) => void;
  title: string;
  description: string;
}

export function SkillsTab({ 
  formData, 
  onCSVChange, 
  onUpdateRequiredCompetencies, 
  onUpdatePreferredCompetencies, 
  onUpdateWorkConditions,
  title,
  description
}: SkillsTabProps) {
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
        
        {/* Preferred Education Fields */}
        <div className="space-y-2">
          <Label htmlFor="preferredEducationFields" className="font-medium text-card-foreground">
            {t('createPersonaPage.form.preferredEducationFields.label')}
          </Label>
          <Input
            id="preferredEducationFields"
            name="preferredEducationFields"
            placeholder={t('createPersonaPage.form.preferredEducationFields.placeholder')}
            value={formData.preferredEducationFields}
            onChange={(e) => onCSVChange('preferredEducationFields', e.target.value)}
            className="bg-card border-border text-card-foreground placeholder:text-muted-foreground"
          />
          <p className="text-sm text-muted-foreground">
            {t('createPersonaPage.form.preferredEducationFields.help')}
          </p>
        </div>

        {/* Required Certifications */}
        <div className="space-y-2">
          <Label htmlFor="requiredCertifications" className="font-medium text-card-foreground">
            {t('createPersonaPage.form.requiredCertifications.label')}
          </Label>
          <Input
            id="requiredCertifications"
            name="requiredCertifications"
            placeholder={t('createPersonaPage.form.requiredCertifications.placeholder')}
            value={formData.requiredCertifications}
            onChange={(e) => onCSVChange('requiredCertifications', e.target.value)}
            className="bg-card border-border text-card-foreground placeholder:text-muted-foreground"
          />
          <p className="text-sm text-muted-foreground">
            {t('createPersonaPage.form.requiredCertifications.help')}
          </p>
        </div>

        {/* Preferred Certifications */}
        <div className="space-y-2">
          <Label htmlFor="preferredCertifications" className="font-medium text-card-foreground">
            {t('createPersonaPage.form.preferredCertifications.label')}
          </Label>
          <Input
            id="preferredCertifications"
            name="preferredCertifications"
            placeholder={t('createPersonaPage.form.preferredCertifications.placeholder')}
            value={formData.preferredCertifications}
            onChange={(e) => onCSVChange('preferredCertifications', e.target.value)}
            className="bg-card border-border text-card-foreground placeholder:text-muted-foreground"
          />
          <p className="text-sm text-muted-foreground">
            {t('createPersonaPage.form.preferredCertifications.help')}
          </p>
        </div>

        {/* Required Competencies */}
        <div className="space-y-3">
          <Label className="font-medium text-card-foreground">
            {t('createPersonaPage.form.requiredCompetencies.label')}
          </Label>
          <ImprovedCompetencyList
            title=""
            list={formData.requiredCompetencies}
            onChange={onUpdateRequiredCompetencies}
          />
        </div>

        {/* Preferred Competencies */}
        <div className="space-y-3">
          <Label className="font-medium text-card-foreground">
            {t('createPersonaPage.form.preferredCompetencies.label')}
          </Label>
          <ImprovedCompetencyList
            title=""
            list={formData.preferredCompetencies}
            onChange={onUpdatePreferredCompetencies}
          />
        </div>

        {/* Work Conditions */}
        <div className="space-y-3">
          <Label className="font-medium text-card-foreground">
            {t('createPersonaPage.form.workConditions.label')}
          </Label>
          <ImprovedWorkConditionsList
            title=""
            list={formData.workConditions}
            onChange={onUpdateWorkConditions}
          />
        </div>

        {/* Language Requirements */}
        <div className="space-y-2">
          <Label htmlFor="languageRequirements" className="font-medium text-card-foreground">
            {t('createPersonaPage.form.languageRequirements.label')}
          </Label>
          <Input
            id="languageRequirements"
            name="languageRequirements"
            placeholder={t('createPersonaPage.form.languageRequirements.placeholder')}
            value={formData.languageRequirements}
            onChange={(e) => onCSVChange('languageRequirements', e.target.value)}
            className="bg-card border-border text-card-foreground placeholder:text-muted-foreground"
          />
          <p className="text-sm text-muted-foreground">
            {t('createPersonaPage.form.languageRequirements.help')}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}