import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useTranslation } from 'react-i18next';
import { cards, colors, typography, components } from '@/lib/design-system';
import { CreateProjectFormProps } from '../../types';
import TagInput from './TagInput';

const CreateProjectForm: React.FC<CreateProjectFormProps> = ({
  formData,
  formErrors,
  onInputChange,
  onTagInputChange,
  onSelectChange,
  onSubmit,
}) => {
  const { t } = useTranslation('createProject');

  return (
    <div className={cards.base}>
      <div className={cards.header}>
        <h2 className={typography.heading[3]} style={{ color: colors.white }}>
          <span 
            className="inline-block w-2 h-6 mr-3 rounded"
            style={{ backgroundColor: colors.orange }}
          ></span>
          {t('createProjectPage.form.title')}
        </h2>
      </div>
      
      <div className={cards.body}>
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="space-y-3">
            <Label htmlFor="roleTitle" style={{ color: colors.white }}>
              {t('createProjectPage.form.roleTitle.label')}
            </Label>
            <Input
              id="roleTitle"
              name="roleTitle"
              placeholder={t('createProjectPage.form.roleTitle.placeholder')}
              value={formData.roleTitle}
              onChange={onInputChange}
              className={formErrors.roleTitle ? 'border-red-500' : ''}
              style={{
                backgroundColor: colors.blueDark,
                borderColor: colors.blue,
                color: colors.white
              }}
            />
            {formErrors.roleTitle && (
              <p className="text-red-400 text-sm mt-1">{formErrors.roleTitle}</p>
            )}
          </div>

          <div className="space-y-3">
            <Label htmlFor="requiredSkills" style={{ color: colors.white }}>
              {t('createProjectPage.form.requiredSkills.label')}
            </Label>
            <TagInput
              id="requiredSkills"
              name="requiredSkills"
              placeholder={t('createProjectPage.form.requiredSkills.placeholder')}
              value={formData.requiredSkills}
              onChange={onTagInputChange}
              hasError={!!formErrors.requiredSkills}
            />
            {formErrors.requiredSkills && (
              <p className="text-red-400 text-sm mt-1">{formErrors.requiredSkills}</p>
            )}
          </div>

          <div className="space-y-3">
            <Label htmlFor="yearsExperience" style={{ color: colors.white }}>
              {t('createProjectPage.form.yearsExperience.label')}
            </Label>
            <div className="relative">
              <Input
                id="yearsExperience"
                name="yearsExperience"
                placeholder={t('createProjectPage.form.yearsExperience.placeholder')}
                type="number"
                min="0"
                value={formData.yearsExperience}
                onChange={onInputChange}
                className={`pl-4 pr-12 ${formErrors.yearsExperience ? 'border-red-500' : ''}`}
                style={{
                  backgroundColor: colors.blueDark,
                  borderColor: colors.blue,
                  color: colors.white
                }}
              />
              <span 
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm"
                style={{ color: colors.yellow }}
              >
                {t('createProjectPage.form.yearsExperience.suffix')}
              </span>
            </div>
            {formErrors.yearsExperience && (
              <p className="text-red-400 text-sm mt-1">{formErrors.yearsExperience}</p>
            )}
          </div>

          <div className="space-y-3">
            <Label htmlFor="seniorityLevel" style={{ color: colors.white }}>
              {t('createProjectPage.form.seniorityLevel.label')}
            </Label>
            <Select value={formData.seniorityLevel} onValueChange={onSelectChange}>
              <SelectTrigger
                id="seniorityLevel"
                className={`${formErrors.seniorityLevel ? 'border-red-500' : ''} bg-[#001d3d] border-[#003566] text-white`}
              >
                <SelectValue placeholder={t('createProjectPage.form.seniorityLevel.placeholder')} />
              </SelectTrigger>
              <SelectContent className="bg-[#001d3d] border-[#003566]">
                <SelectItem 
                  value="junior"
                  className="text-white hover:bg-[#003566] focus:bg-[#003566]"
                >
                  {t('createProjectPage.form.seniorityLevel.options.junior')}
                </SelectItem>
                <SelectItem 
                  value="mid"
                  className="text-white hover:bg-[#003566] focus:bg-[#003566]"
                >
                  {t('createProjectPage.form.seniorityLevel.options.mid')}
                </SelectItem>
                <SelectItem 
                  value="senior"
                  className="text-white hover:bg-[#003566] focus:bg-[#003566]"
                >
                  {t('createProjectPage.form.seniorityLevel.options.senior')}
                </SelectItem>
                <SelectItem 
                  value="lead"
                  className="text-white hover:bg-[#003566] focus:bg-[#003566]"
                >
                  {t('createProjectPage.form.seniorityLevel.options.lead')}
                </SelectItem>
                <SelectItem 
                  value="principal"
                  className="text-white hover:bg-[#003566] focus:bg-[#003566]"
                >
                  {t('createProjectPage.form.seniorityLevel.options.principal')}
                </SelectItem>
              </SelectContent>
            </Select>
            {formErrors.seniorityLevel && (
              <p className="text-red-400 text-sm mt-1">{formErrors.seniorityLevel}</p>
            )}
          </div>

          <div className="space-y-3">
            <Label htmlFor="relevantTechnologies" style={{ color: colors.white }}>
              {t('createProjectPage.form.relevantTechnologies.label')}
            </Label>
            <TagInput
              id="relevantTechnologies"
              name="relevantTechnologies"
              placeholder={t('createProjectPage.form.relevantTechnologies.placeholder')}
              value={formData.relevantTechnologies}
              onChange={onTagInputChange}
              hasError={!!formErrors.relevantTechnologies}
            />
            {formErrors.relevantTechnologies && (
              <p className="text-red-400 text-sm mt-1">{formErrors.relevantTechnologies}</p>
            )}
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Label htmlFor="industryExperience" style={{ color: colors.white }}>
                {t('createProjectPage.form.industryExperience.label')}
              </Label>
              <span 
                className={`${components.tag} ${components.tagColors.orange}`}
              >
                {t('createProjectPage.form.industryExperience.optional')}
              </span>
            </div>
            <TagInput
              id="industryExperience"
              name="industryExperience"
              placeholder={t('createProjectPage.form.industryExperience.placeholder')}
              value={formData.industryExperience}
              onChange={onTagInputChange}
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="description" style={{ color: colors.white }}>
              {t('createProjectPage.form.description.label')}
            </Label>
            <Textarea
              id="description"
              name="description"
              placeholder={t('createProjectPage.form.description.placeholder')}
              value={formData.description}
              onChange={onInputChange}
              className={`min-h-32 ${formErrors.description ? 'border-red-500' : ''}`}
              style={{
                backgroundColor: colors.blueDark,
                borderColor: colors.blue,
                color: colors.white
              }}
            />
            {formErrors.description && (
              <p className="text-red-400 text-sm mt-1">{formErrors.description}</p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProjectForm; 