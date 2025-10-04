import { useTranslation } from 'react-i18next';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { HelpCircle } from 'lucide-react';

import { colors } from '@/lib/design-system';
import type { ExperienceLevel, EducationLevel } from '@/types/candidate/requirements';
import type {
  CandidateRequirementsFormState,
  CandidateRequirementsFormErrors,
} from './CandidateRequirementsForm';

interface BasicInfoTabProps {
  formData: CandidateRequirementsFormState;
  errors: CandidateRequirementsFormErrors;
  onFieldChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSelectChange: (name: 'experienceLevel' | 'minEducationLevel', value: string) => void;
  title: string;
  description: string;
}

export function BasicInfoTab({
  formData,
  errors,
  onFieldChange,
  onSelectChange,
  title,
  description,
}: BasicInfoTabProps) {
  const { t } = useTranslation('createProject');

  const experienceOptions: ExperienceLevel[] = [
    'EntryLevel',
    'Junior',
    'MidLevel',
    'Senior',
    'Lead',
    'Executive',
    'Intern',
  ];
  const educationOptions: EducationLevel[] = [
    'None',
    'HighSchool',
    'Vocational',
    'AssociateDegree',
    'BachelorsDegree',
    'MastersDegree',
    'Doctorate',
    'Professional',
  ];

  // Common styles for consistency
  const inputStyle = {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    color: colors.text,
  };

  return (
    <Card
      className="border"
      style={{
        backgroundColor: `${colors.surface}80`, // 50% opacity
        borderColor: colors.border,
      }}
    >
      <CardHeader>
        <CardTitle className="flex items-center gap-2" style={{ color: colors.text }}>
          {title}
          <HelpCircle className="h-4 w-4" style={{ color: colors.textMuted }} />
        </CardTitle>
        <CardDescription style={{ color: colors.textSecondary }}>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Position Title - Required */}
        <div className="space-y-2">
          <Label htmlFor="positionTitle" className="font-medium" style={{ color: colors.text }}>
            {t('createPersonaPage.form.positionTitle.label')}{' '}
            <span style={{ color: colors.error }}>*</span>
          </Label>
          <Input
            id="positionTitle"
            name="positionTitle"
            placeholder={t('createPersonaPage.form.positionTitle.placeholder')}
            value={formData.positionTitle}
            onChange={onFieldChange}
            className="border"
            style={{
              ...inputStyle,
              borderColor: errors.positionTitle ? colors.error : colors.border,
            }}
          />
          {errors.positionTitle && (
            <p className="text-sm" style={{ color: colors.error }}>
              {errors.positionTitle}
            </p>
          )}
        </div>

        {/* Department and Industry */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label
              htmlFor="departmentOrArea"
              className="font-medium"
              style={{ color: colors.text }}
            >
              {t('createPersonaPage.form.departmentOrArea.label')}
            </Label>
            <Input
              id="departmentOrArea"
              name="departmentOrArea"
              placeholder={t('createPersonaPage.form.departmentOrArea.placeholder')}
              value={formData.departmentOrArea}
              onChange={onFieldChange}
              className="border"
              style={inputStyle}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="companyIndustry" className="font-medium" style={{ color: colors.text }}>
              {t('createPersonaPage.form.companyIndustry.label')}
            </Label>
            <Input
              id="companyIndustry"
              name="companyIndustry"
              placeholder={t('createPersonaPage.form.companyIndustry.placeholder')}
              value={formData.companyIndustry}
              onChange={onFieldChange}
              className="border"
              style={inputStyle}
            />
          </div>
        </div>

        {/* Experience Level and Years */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="experienceLevel" className="font-medium" style={{ color: colors.text }}>
              {t('createPersonaPage.form.experienceLevel.label')}{' '}
              <span style={{ color: colors.error }}>*</span>
            </Label>
            <Select
              value={formData.experienceLevel || ''}
              onValueChange={(v) => onSelectChange('experienceLevel', v)}
            >
              <SelectTrigger
                id="experienceLevel"
                className={errors.experienceLevel ? 'border-red-500' : ''}
              >
                <SelectValue
                  placeholder={t('createPersonaPage.form.experienceLevel.placeholder')}
                />
              </SelectTrigger>
              <SelectContent>
                {experienceOptions.map((opt) => (
                  <SelectItem key={opt} value={opt}>
                    {t(`createPersonaPage.form.experienceLevel.options.${opt}`)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.experienceLevel && (
              <p className="text-sm" style={{ color: colors.error }}>
                {errors.experienceLevel}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="minExperienceYears"
              className="font-medium"
              style={{ color: colors.text }}
            >
              {t('createPersonaPage.form.minExperienceYears.label')}{' '}
              <span style={{ color: colors.error }}>*</span>
            </Label>
            <Input
              id="minExperienceYears"
              name="minExperienceYears"
              type="number"
              min="0"
              placeholder={t('createPersonaPage.form.minExperienceYears.placeholder')}
              value={formData.minExperienceYears}
              onChange={onFieldChange}
              className="border"
              style={{
                ...inputStyle,
                borderColor: errors.minExperienceYears ? colors.error : colors.border,
              }}
            />
            {errors.minExperienceYears && (
              <p className="text-sm" style={{ color: colors.error }}>
                {errors.minExperienceYears}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="maxExperienceYears"
              className="font-medium"
              style={{ color: colors.text }}
            >
              {t('createPersonaPage.form.maxExperienceYears.label')}
            </Label>
            <Input
              id="maxExperienceYears"
              name="maxExperienceYears"
              type="number"
              min="0"
              placeholder={t('createPersonaPage.form.maxExperienceYears.placeholder')}
              value={formData.maxExperienceYears}
              onChange={onFieldChange}
              className="border"
              style={inputStyle}
            />
          </div>
        </div>

        {/* Education Level */}
        <div className="space-y-2">
          <Label htmlFor="minEducationLevel" className="font-medium" style={{ color: colors.text }}>
            {t('createPersonaPage.form.minEducationLevel.label')}{' '}
            <span style={{ color: colors.error }}>*</span>
          </Label>
          <Select
            value={formData.minEducationLevel || ''}
            onValueChange={(v) => onSelectChange('minEducationLevel', v)}
          >
            <SelectTrigger
              id="minEducationLevel"
              className={errors.minEducationLevel ? 'border-red-500' : ''}
            >
              <SelectValue
                placeholder={t('createPersonaPage.form.minEducationLevel.placeholder')}
              />
            </SelectTrigger>
            <SelectContent>
              {educationOptions.map((opt) => (
                <SelectItem key={opt} value={opt}>
                  {t(`createPersonaPage.form.minEducationLevel.options.${opt}`)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.minEducationLevel && (
            <p className="text-sm" style={{ color: colors.error }}>
              {errors.minEducationLevel}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
