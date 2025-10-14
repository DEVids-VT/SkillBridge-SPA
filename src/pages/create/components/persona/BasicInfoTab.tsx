import { useTranslation } from 'react-i18next';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

import type { ExperienceLevel, EducationLevel } from '@/types/candidate/requirements';
import type { CandidateRequirementsFormState, CandidateRequirementsFormErrors } from './CandidateRequirementsForm';

interface BasicInfoTabProps {
  formData: CandidateRequirementsFormState;
  errors: CandidateRequirementsFormErrors;
  onFieldChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSelectChange: (name: 'experienceLevel' | 'minEducationLevel', value: string) => void;
  title: string;
  description: string;
}

export function BasicInfoTab({ formData, errors, onFieldChange, onSelectChange, title, description }: BasicInfoTabProps) {
  const { t } = useTranslation('createProject');

  const experienceOptions: ExperienceLevel[] = [
    'EntryLevel', 'Junior', 'MidLevel', 'Senior', 'Lead', 'Executive', 'Intern',
  ];
  const educationOptions: EducationLevel[] = [
    'None','HighSchool','Vocational','AssociateDegree','BachelorsDegree','MastersDegree','Doctorate','Professional',
  ];

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
        {/* Position Title - Required */}
        <div className="space-y-2">
          <Label htmlFor="positionTitle" className="font-medium text-card-foreground">
            {t('createPersonaPage.form.positionTitle.label')} <span className="text-destructive">*</span>
          </Label>
          <Input 
            id="positionTitle" 
            name="positionTitle" 
            placeholder={t('createPersonaPage.form.positionTitle.placeholder')} 
            value={formData.positionTitle} 
            onChange={onFieldChange} 
            className={cn(
              "bg-card border-border text-card-foreground",
              errors.positionTitle && "border-destructive"
            )}
          />
          {errors.positionTitle && <p className="text-sm text-destructive">{errors.positionTitle}</p>}
        </div>

        {/* Department and Industry */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="departmentOrArea" className="font-medium text-card-foreground">
              {t('createPersonaPage.form.departmentOrArea.label')}
            </Label>
            <Input 
              id="departmentOrArea" 
              name="departmentOrArea" 
              placeholder={t('createPersonaPage.form.departmentOrArea.placeholder')} 
              value={formData.departmentOrArea} 
              onChange={onFieldChange} 
              className="bg-card border-border text-card-foreground"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="companyIndustry" className="font-medium text-card-foreground">
              {t('createPersonaPage.form.companyIndustry.label')}
            </Label>
            <Input 
              id="companyIndustry" 
              name="companyIndustry" 
              placeholder={t('createPersonaPage.form.companyIndustry.placeholder')} 
              value={formData.companyIndustry} 
              onChange={onFieldChange} 
              className="bg-card border-border text-card-foreground"
            />
          </div>
        </div>

        {/* Experience Level and Years */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="experienceLevel" className="font-medium text-card-foreground">
              {t('createPersonaPage.form.experienceLevel.label')} <span className="text-destructive">*</span>
            </Label>
            <Select value={formData.experienceLevel || ''} onValueChange={(v) => onSelectChange('experienceLevel', v)}>
              <SelectTrigger 
                id="experienceLevel" 
                className={cn(
                  "bg-card border-border text-card-foreground",
                  errors.experienceLevel && "border-destructive"
                )}
              >
                <SelectValue placeholder={t('createPersonaPage.form.experienceLevel.placeholder')} />
              </SelectTrigger>
              <SelectContent>
                {experienceOptions.map((opt) => (
                  <SelectItem 
                    key={opt} 
                    value={opt}
                  >
                    {t(`createPersonaPage.form.experienceLevel.options.${opt}`)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.experienceLevel && <p className="text-sm text-destructive">{errors.experienceLevel}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="minExperienceYears" className="font-medium text-card-foreground">
              {t('createPersonaPage.form.minExperienceYears.label')} <span className="text-destructive">*</span>
            </Label>
            <Input 
              id="minExperienceYears" 
              name="minExperienceYears" 
              type="number" 
              placeholder={t('createPersonaPage.form.minExperienceYears.placeholder')} 
              value={formData.minExperienceYears} 
              onChange={onFieldChange} 
              className={cn(
                "bg-card border-border text-card-foreground",
                errors.minExperienceYears && "border-destructive"
              )}
            />
            {errors.minExperienceYears && <p className="text-sm text-destructive">{errors.minExperienceYears}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="maxExperienceYears" className="font-medium text-card-foreground">
              {t('createPersonaPage.form.maxExperienceYears.label')}
            </Label>
            <Input 
              id="maxExperienceYears" 
              name="maxExperienceYears" 
              type="number" 
              placeholder={t('createPersonaPage.form.maxExperienceYears.placeholder')} 
              value={formData.maxExperienceYears} 
              onChange={onFieldChange} 
              className="bg-card border-border text-card-foreground"
            />
          </div>
        </div>

        {/* Education Level */}
        <div className="space-y-2">
          <Label htmlFor="minEducationLevel" className="font-medium text-card-foreground">
            {t('createPersonaPage.form.minEducationLevel.label')} <span className="text-destructive">*</span>
          </Label>
          <Select value={formData.minEducationLevel || ''} onValueChange={(v) => onSelectChange('minEducationLevel', v)}>
            <SelectTrigger 
              id="minEducationLevel" 
              className={cn(
                "bg-card border-border text-card-foreground",
                errors.minEducationLevel && "border-destructive"
              )}
            >
              <SelectValue placeholder={t('createPersonaPage.form.minEducationLevel.placeholder')} />
            </SelectTrigger>
            <SelectContent>
              {educationOptions.map((opt) => (
                <SelectItem 
                  key={opt} 
                  value={opt}
                >
                  {t(`createPersonaPage.form.minEducationLevel.options.${opt}`)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.minEducationLevel && <p className="text-sm text-destructive">{errors.minEducationLevel}</p>}
        </div>

        {/* Position Summary - Required */}
        <div className="space-y-2">
          <Label htmlFor="positionSummary" className="font-medium text-card-foreground">
            {t('createPersonaPage.form.positionSummary.label')} <span className="text-destructive">*</span>
          </Label>
          <textarea
            id="positionSummary"
            name="positionSummary"
            placeholder={t('createPersonaPage.form.positionSummary.placeholder')}
            value={formData.positionSummary}
            onChange={onFieldChange}
            rows={4}
            className={cn(
              "w-full px-3 py-2 rounded-md border bg-card border-border text-card-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none",
              errors.positionSummary && "border-destructive"
            )}
          />
          {errors.positionSummary && <p className="text-sm text-destructive">{errors.positionSummary}</p>}
        </div>
      </CardContent>
    </Card>
  );
}