import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { colors, cards, typography } from '@/lib/design-system';
import { useTranslation } from 'react-i18next';
import { CreateManualForm, CreateManualFormErrors } from '../types';

interface CreateManualFormProps {
  formData: CreateManualForm;
  formErrors: CreateManualFormErrors;
  onInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function CreateManualFormComponent({
  formData,
  formErrors,
  onInputChange,
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
