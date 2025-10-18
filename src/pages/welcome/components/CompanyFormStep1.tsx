import { useTranslation } from 'react-i18next';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

// Industry options
const industries = [
  'Technology',
  'Healthcare',
  'Finance',
  'Education',
  'Manufacturing',
  'Retail',
  'Construction',
  'Entertainment',
  'Transportation',
  'Other',
];

interface CompanyFormStep1Props {
  formData: {
    companyName: string;
    industry: string;
    activities: string;
    headquarters: string;
    yearEstablished: number | string;
    technologies: string[];
  };
  errors: {
    companyName?: boolean;
    industry?: boolean;
    activities?: boolean;
    headquarters?: boolean;
    yearEstablished?: boolean;
    technologies?: boolean;
  };
  onFieldChange: (field: string, value: string) => void;
  onTechnologiesChange: (technologies: string[]) => void;
}

export default function CompanyFormStep1({
  formData,
  errors,
  onFieldChange,
  onTechnologiesChange,
}: CompanyFormStep1Props) {
  const { t } = useTranslation('welcome');

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="companyName">
          {t('welcome.companyForm.companyName')}
          <span className="ml-1 text-destructive">*</span>
        </Label>
        <Input
          id="companyName"
          value={formData.companyName}
          onChange={(e) => onFieldChange('companyName', e.target.value)}
          className={errors.companyName ? 'border-destructive' : ''}
        />
        {errors.companyName && (
          <p className="text-sm mt-1 text-destructive">
            {t('welcome.companyForm.companyNameRequired')}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="industry">
          {t('welcome.companyForm.industry')}
          <span className="ml-1 text-destructive">*</span>
        </Label>
        <Select
          value={formData.industry}
          onValueChange={(value) => onFieldChange('industry', value)}
        >
          <SelectTrigger
            id="industry"
            className={`w-full ${errors.industry ? 'border-destructive' : ''}`}
          >
            <SelectValue placeholder={t('welcome.companyForm.selectIndustry') as string} />
          </SelectTrigger>
          <SelectContent>
            {industries.map((industry) => (
              <SelectItem key={industry} value={industry}>
                {industry}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.industry && (
          <p className="text-sm mt-1 text-destructive">
            {t('welcome.companyForm.industryRequired')}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="activities">
          {t('welcome.companyForm.activities')}
          <span className="ml-1 text-destructive">*</span>
        </Label>
        <Textarea
          id="activities"
          placeholder={t('welcome.companyForm.activitiesPlaceholder')}
          value={formData.activities || ''}
          onChange={(e) => onFieldChange('activities', e.target.value)}
          rows={2}
          className={errors.activities ? 'border-destructive' : ''}
        />
        {errors.activities && (
          <p className="text-sm mt-1 text-destructive">
            {t('welcome.companyForm.activitiesRequired')}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="headquarters">
          {t('welcome.companyForm.headquarters')}
          <span className="ml-1 text-destructive">*</span>
        </Label>
        <Input
          id="headquarters"
          placeholder={t('welcome.companyForm.headquartersPlaceholder')}
          value={formData.headquarters || ''}
          onChange={(e) => onFieldChange('headquarters', e.target.value)}
          className={errors.headquarters ? 'border-destructive' : ''}
        />
        {errors.headquarters && (
          <p className="text-sm mt-1 text-destructive">
            {t('welcome.companyForm.headquartersRequired')}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="yearEstablished">
          {t('welcome.companyForm.yearEstablished')}
          <span className="ml-1 text-destructive">*</span>
        </Label>
        <Input
          id="yearEstablished"
          type="number"
          min="1800"
          max={new Date().getFullYear()}
          placeholder={t('welcome.companyForm.placeholders.yearEstablished')}
          value={formData.yearEstablished || ''}
          onChange={(e) => onFieldChange('yearEstablished', e.target.value)}
          className={errors.yearEstablished ? 'border-destructive' : ''}
        />
        {errors.yearEstablished && (
          <p className="text-sm mt-1 text-destructive">
            {t('welcome.companyForm.yearEstablishedRequired')}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="technologies">
          {t('welcome.companyForm.technologies')}
          <span className="ml-1 text-destructive">*</span>
        </Label>
        <Input
          id="technologies"
          placeholder={t('welcome.companyForm.placeholders.technologies')}
          value={formData.technologies?.join(', ') || ''}
          onChange={(e) => {
            const techArray = e.target.value.split(', ').filter(Boolean);
            onTechnologiesChange(techArray);
          }}
          className={errors.technologies ? 'border-destructive' : ''}
        />
        {errors.technologies && (
          <p className="text-sm mt-1 text-destructive">
            {t('welcome.companyForm.technologiesRequired')}
          </p>
        )}
        <p className="text-sm text-muted-foreground">
          {t('welcome.companyForm.technologiesHelp')}
        </p>
      </div>
    </div>
  );
}
