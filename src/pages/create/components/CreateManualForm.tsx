import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { colors, cards } from '@/lib/design-system';
import { useTranslation } from 'react-i18next';
import { CreateManualForm, CreateManualFormErrors, DURATION_OPTIONS } from '../types';

interface CreateManualFormProps {
  formData: CreateManualForm;
  formErrors: CreateManualFormErrors;
  onInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onDurationChange: (value: string) => void;
}

export default function CreateManualFormComponent({
  formData,
  formErrors,
  onInputChange,
  onDurationChange,
}: CreateManualFormProps) {
  const { t } = useTranslation('createProject');

  return (
    <div className={cards.base}>
      <div className={cards.header}>
        <h2 className="text-2xl font-bold text-white">
          <span
            className="inline-block w-2 h-6 mr-3 rounded"
            style={{ backgroundColor: colors.orange }}
          />
          {t('createManualPage.form.title')}
        </h2>
      </div>

      <div className={cards.body}>
        <div className="space-y-6">
          <div className="space-y-3">
            <Label htmlFor="description" className="text-white font-medium">
              {t('createManualPage.form.description.label')}
            </Label>
            <Textarea
              id="description"
              name="description"
              placeholder={t('createManualPage.form.description.placeholder')}
              value={formData.description}
              onChange={onInputChange}
              className={`min-h-40 resize-none ${formErrors.description ? 'border-red-500' : ''}`}
              style={{
                backgroundColor: colors.blueDark,
                borderColor: formErrors.description ? '#ef4444' : colors.blue,
                color: colors.white,
              }}
            />
            {formErrors.description && (
              <p className="text-red-400 text-sm mt-1">{formErrors.description}</p>
            )}
            <p className="text-gray-400 text-sm">{t('createManualPage.form.description.help')}</p>
          </div>

          {/* Duration Select */}
          <div className="space-y-3">
            <Label className="text-white font-medium">Project Duration</Label>
            <Select value={formData.duration} onValueChange={onDurationChange}>
              <SelectTrigger
                className={`bg-transparent text-white ${formErrors.duration ? 'border-red-500' : ''}`}
                style={{
                  backgroundColor: colors.blueDark,
                  borderColor: formErrors.duration ? '#ef4444' : colors.blue,
                }}
              >
                <SelectValue placeholder="Select project duration" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-600">
                {DURATION_OPTIONS.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    className="text-white hover:bg-slate-700 focus:bg-slate-700 cursor-pointer"
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {formErrors.duration && (
              <p className="text-red-400 text-sm mt-1">{formErrors.duration}</p>
            )}
            <div className="text-gray-400 text-sm">
              <p>
                Selected TimeSpan:{' '}
                <span className="text-white font-mono">{formData.duration || 'None selected'}</span>
              </p>
              <p className="text-xs mt-1">Format: Days.Hours:Minutes:Seconds</p>
            </div>
          </div>

          {/* Character Count */}
          <div className="text-right">
            <span
              className="text-sm"
              style={{ color: formData.description.length > 50 ? colors.yellow : colors.white }}
            >
              {formData.description.length} {t('createManualPage.form.characters')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
