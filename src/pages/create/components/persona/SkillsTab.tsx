import { useTranslation } from 'react-i18next';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { HelpCircle } from 'lucide-react';
import { colors } from '@/lib/design-system';
import TagInput from './TagInput';
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
        {/* Skills and Certifications */}
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="preferredEducationFields" className="font-medium" style={{ color: colors.text }}>
              {t('createPersonaPage.form.preferredEducationFields.label')}
            </Label>
            <TagInput 
              id="preferredEducationFields" 
              name="preferredEducationFields" 
              placeholder={t('createPersonaPage.form.preferredEducationFields.placeholder')} 
              value={formData.preferredEducationFields} 
              onChange={(n, v) => onCSVChange('preferredEducationFields', v)} 
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="requiredCertifications" className="font-medium" style={{ color: colors.text }}>
                {t('createPersonaPage.form.requiredCertifications.label')}
              </Label>
              <TagInput 
                id="requiredCertifications" 
                name="requiredCertifications" 
                placeholder={t('createPersonaPage.form.requiredCertifications.placeholder')} 
                value={formData.requiredCertifications} 
                onChange={(n, v) => onCSVChange('requiredCertifications', v)} 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="preferredCertifications" className="font-medium" style={{ color: colors.text }}>
                {t('createPersonaPage.form.preferredCertifications.label')}
              </Label>
              <TagInput 
                id="preferredCertifications" 
                name="preferredCertifications" 
                placeholder={t('createPersonaPage.form.preferredCertifications.placeholder')} 
                value={formData.preferredCertifications} 
                onChange={(n, v) => onCSVChange('preferredCertifications', v)} 
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="languageRequirements" className="font-medium" style={{ color: colors.text }}>
              {t('createPersonaPage.form.languageRequirements.label')}
            </Label>
            <TagInput 
              id="languageRequirements" 
              name="languageRequirements" 
              placeholder={t('createPersonaPage.form.languageRequirements.placeholder')} 
              value={formData.languageRequirements} 
              onChange={(n, v) => onCSVChange('languageRequirements', v)} 
            />
          </div>
        </div>

        {/* Competencies Section */}
        <div className="space-y-6">
          <ImprovedCompetencyList 
            title={t('createPersonaPage.form.requiredCompetencies.title')} 
            list={formData.requiredCompetencies} 
            onChange={onUpdateRequiredCompetencies} 
            requireMandatory 
          />
          <ImprovedCompetencyList 
            title={t('createPersonaPage.form.preferredCompetencies.title')} 
            list={formData.preferredCompetencies} 
            onChange={onUpdatePreferredCompetencies} 
          />
        </div>

        {/* Work Conditions */}
        <ImprovedWorkConditionsList 
          title={t('createPersonaPage.form.workConditions.title')} 
          list={formData.workConditions} 
          onChange={onUpdateWorkConditions} 
        />
      </CardContent>
    </Card>
  );
}
