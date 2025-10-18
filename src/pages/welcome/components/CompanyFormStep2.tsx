import { useTranslation } from 'react-i18next';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { colors } from '@/lib/design-system';

// Company size options
const companySizes = ['1-10', '11-50', '51-200', '201-500', '501-1000', '1000+'];

interface CompanyFormStep2Props {
  formData: {
    companySize: string;
    website: string;
    globalEmployees: number | string;
    hasOfficesInBulgaria: boolean;
    employeesInBulgaria: number | string;
    bulgarianOffices: string[];
  };
  errors: {
    companySize?: boolean;
    website?: boolean;
    globalEmployees?: boolean;
  };
  onFieldChange: (field: string, value: string) => void;
  onCheckboxChange: (field: string, checked: boolean) => void;
  onBulgarianOfficesChange: (offices: string[]) => void;
}

export default function CompanyFormStep2({
  formData,
  errors,
  onFieldChange,
  onCheckboxChange,
  onBulgarianOfficesChange,
}: CompanyFormStep2Props) {
  const { t } = useTranslation('welcome');

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="companySize">
          {t('welcome.companyForm.companySize')}
          <span className="ml-1 text-destructive">*</span>
        </Label>
        <Select
          value={formData.companySize}
          onValueChange={(value) => onFieldChange('companySize', value)}
        >
          <SelectTrigger
            id="companySize"
            className="w-full"
            style={errors.companySize ? { borderColor: colors.error } : undefined}
          >
            <SelectValue placeholder={t('welcome.companyForm.selectCompanySize') as string} />
          </SelectTrigger>
          <SelectContent>
            {companySizes.map((size) => (
              <SelectItem key={size} value={size}>
                {size} {t('welcome.companyForm.employees')}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.companySize && (
          <p className="text-sm mt-1 text-destructive">
            {t('welcome.companyForm.companySizeRequired')}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="website">
          {t('welcome.companyForm.website')}
          <span className="ml-1 text-destructive">*</span>
        </Label>
        <Input
          id="website"
          type="url"
          placeholder={t('welcome.companyForm.placeholders.website')}
          value={formData.website}
          onChange={(e) => onFieldChange('website', e.target.value)}
          style={errors.website ? { borderColor: colors.error } : undefined}
        />
        {errors.website && (
          <p className="text-sm mt-1 text-destructive">
            {t('welcome.companyForm.websiteRequired')}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="employeesWorldwide">
          {t('welcome.companyForm.globalEmployees')}
          <span className="ml-1 text-destructive">*</span>
        </Label>
        <Input
          id="employeesWorldwide"
          type="number"
          min="1"
          placeholder={t('welcome.companyForm.placeholders.globalEmployees')}
          value={formData.globalEmployees || ''}
          onChange={(e) => onFieldChange('globalEmployees', e.target.value)}
          style={errors.globalEmployees ? { borderColor: colors.error } : undefined}
        />
        {errors.globalEmployees && (
          <p className="text-sm mt-1 text-destructive">
            {t('welcome.companyForm.globalEmployeesRequired')}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="hasOfficesInBulgaria">
          {t('welcome.companyForm.hasOfficesInBulgaria')} ({t('welcome.companyForm.optional')})
        </Label>
        <div className="flex items-center space-x-3">
          <Checkbox
            id="hasOfficesInBulgaria"
            checked={formData.hasOfficesInBulgaria || false}
            onCheckedChange={(checked) => onCheckboxChange('hasOfficesInBulgaria', Boolean(checked))}
          />
          <span className="text-sm text-muted-foreground">
            {t('welcome.companyForm.hasOfficesInBulgaria')}
          </span>
        </div>
      </div>

      {formData.hasOfficesInBulgaria && (
        <div className="space-y-2">
          <Label htmlFor="employeesInBulgaria">
            {t('welcome.companyForm.employeesInBulgaria')} ({t('welcome.companyForm.optional')})
          </Label>
          <Input
            id="employeesInBulgaria"
            type="number"
            placeholder={t('welcome.companyForm.placeholders.employeesInBulgaria')}
            value={formData.employeesInBulgaria || ''}
            onChange={(e) => onFieldChange('employeesInBulgaria', e.target.value)}
          />
        </div>
      )}

      {formData.hasOfficesInBulgaria && (
        <div className="space-y-2">
          <Label htmlFor="bulgarianOffices">
            {t('welcome.companyForm.bulgarianOffices')} ({t('welcome.companyForm.optional')})
          </Label>
          <Input
            id="bulgarianOffices"
            placeholder={t('welcome.companyForm.placeholders.bulgarianOffices')}
            value={formData.bulgarianOffices?.join(', ') || ''}
            onChange={(e) => {
              const officesArray = e.target.value.split(', ');
              onBulgarianOfficesChange(officesArray);
            }}
          />
          <p className="text-sm text-muted-foreground">
            {t('welcome.companyForm.bulgarianOfficesHelp')}
          </p>
        </div>
      )}
    </div>
  );
}
