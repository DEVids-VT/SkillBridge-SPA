import { useTranslation } from 'react-i18next';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { colors } from '@/lib/design-system';

interface CompanyFormStep3Props {
  formData: {
    about: string;
    contactPerson: string;
    contactEmail: string;
    contactPhone: string;
    whyWorkWithUs: string;
  };
  errors: {
    about?: boolean;
    contactPerson?: boolean;
    contactEmail?: boolean;
    contactPhone?: boolean;
  };
  onFieldChange: (field: string, value: string) => void;
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function CompanyFormStep3({
  formData,
  errors,
  onFieldChange,
  onFileChange,
}: CompanyFormStep3Props) {
  const { t } = useTranslation('welcome');

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="logo">
          {t('welcome.companyForm.companyLogo')} ({t('welcome.companyForm.optional')})
        </Label>
        <Input id="logo" type="file" accept="image/*" onChange={onFileChange} />
        <p className="text-sm mt-1" style={{ color: colors.textMuted }}>
          {t('welcome.companyForm.logoHelp')}
        </p>
      </div>

      <div className="space-y-2 mt-4">
        <Label htmlFor="about">
          {t('welcome.companyForm.companyAbout')}
          <span className="ml-1" style={{ color: colors.error }}>*</span>
        </Label>
        <Textarea
          id="about"
          placeholder={t('welcome.companyForm.companyAboutPlaceholder')}
          rows={3}
          value={formData.about || ''}
          onChange={(e) => onFieldChange('about', e.target.value)}
          style={errors.about ? { borderColor: colors.error } : undefined}
        />
        {errors.about && (
          <p className="text-sm mt-1" style={{ color: colors.error }}>
            {t('welcome.companyForm.aboutRequired')}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="contactPerson">
          {t('welcome.companyForm.contactPerson')}
          <span className="ml-1" style={{ color: colors.error }}>*</span>
        </Label>
        <Input
          id="contactPerson"
          value={formData.contactPerson || ''}
          onChange={(e) => onFieldChange('contactPerson', e.target.value)}
          style={errors.contactPerson ? { borderColor: colors.error } : undefined}
          placeholder={t('welcome.companyForm.placeholders.contactPerson')}
        />
        {errors.contactPerson && (
          <p className="text-sm mt-1" style={{ color: colors.error }}>
            {t('welcome.companyForm.contactPersonRequired')}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="contactEmail">
          {t('welcome.companyForm.contactEmail')}
          <span className="ml-1" style={{ color: colors.error }}>*</span>
        </Label>
        <Input
          id="contactEmail"
          type="email"
          value={formData.contactEmail || ''}
          onChange={(e) => onFieldChange('contactEmail', e.target.value)}
          style={errors.contactEmail ? { borderColor: colors.error } : undefined}
          placeholder={t('welcome.companyForm.placeholders.contactEmail')}
        />
        {errors.contactEmail && (
          <p className="text-sm mt-1" style={{ color: colors.error }}>
            {t('welcome.companyForm.contactEmailRequired')}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="contactPhone">
          {t('welcome.companyForm.contactPhone')}
          <span className="ml-1" style={{ color: colors.error }}>*</span>
        </Label>
        <Input
          id="contactPhone"
          value={formData.contactPhone || ''}
          onChange={(e) => onFieldChange('contactPhone', e.target.value)}
          style={errors.contactPhone ? { borderColor: colors.error } : undefined}
          placeholder={t('welcome.companyForm.placeholders.contactPhone')}
        />
        {errors.contactPhone && (
          <p className="text-sm mt-1" style={{ color: colors.error }}>
            {t('welcome.companyForm.contactPhoneRequired')}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="whyWorkWithUs">
          {t('welcome.companyForm.whyWorkWithUs')} ({t('welcome.companyForm.optional')})
        </Label>
        <Textarea
          id="whyWorkWithUs"
          value={formData.whyWorkWithUs || ''}
          onChange={(e) => onFieldChange('whyWorkWithUs', e.target.value)}
          placeholder={t('welcome.companyForm.placeholders.whyWorkWithUs')}
          rows={3}
        />
      </div>
    </div>
  );
}
