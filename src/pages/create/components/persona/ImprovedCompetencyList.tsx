import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, X } from 'lucide-react';
import { colors } from '@/lib/design-system';
import type { CompetencyRequirement, CompetencyType, ProficiencyLevel } from '@/types/candidate/requirements';

interface ImprovedCompetencyListProps {
  title: string;
  list: CompetencyRequirement[];
  onChange: (list: CompetencyRequirement[]) => void;
  requireMandatory?: boolean;
}

export function ImprovedCompetencyList({ title, list, onChange, requireMandatory }: ImprovedCompetencyListProps) {
  const { t } = useTranslation('createProject');
  const types: CompetencyType[] = ['Technical','Functional','Leadership','Communication','Analytical','Creative','ProjectManagement','CustomerService','Financial','Regulatory','Industry','Language','Software','Hardware','Process','Safety','Quality','Other'];
  const levels: ProficiencyLevel[] = ['Beginner','Intermediate','Advanced','Expert','Master'];

  const empty: CompetencyRequirement = { name: '', type: 'Technical', requiredLevel: 'Intermediate', description: '', isMandatory: !!requireMandatory };
  const [draft, setDraft] = React.useState<CompetencyRequirement>(empty);

  const add = () => {
    if (!draft.name.trim()) return;
    onChange([...list, draft]);
    setDraft({ ...empty, isMandatory: !!requireMandatory });
  };

  const remove = (i: number) => {
    const copy = [...list];
    copy.splice(i, 1);
    onChange(copy);
  };

  // Common styles
  const inputStyle = {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    color: colors.text,
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-medium" style={{ color: colors.text }}>{title}</h4>
        <Badge variant="secondary" className="text-xs">
          {list.length} {t('createPersonaPage.form.competency.count')}
        </Badge>
      </div>

      {/* Existing Competencies */}
      {list.length > 0 && (
        <div className="space-y-2">
          {list.map((c, i) => (
            <div 
              key={i} 
              className="flex items-center justify-between p-3 border rounded-lg"
              style={{
                backgroundColor: `${colors.surface}80`,
                borderColor: colors.border,
              }}
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium" style={{ color: colors.text }}>{c.name}</span>
                  <Badge variant={c.isMandatory ? "destructive" : "secondary"} className="text-xs">
                    {c.isMandatory ? t('createPersonaPage.form.required') : t('createPersonaPage.form.optional')}
                  </Badge>
                </div>
                <div className="text-sm" style={{ color: colors.textSecondary }}>
                  {t(`createPersonaPage.form.competencyType.options.${c.type}`)} • {t(`createPersonaPage.form.proficiencyLevel.options.${c.requiredLevel}`)}
                </div>
                {c.description && <div className="text-sm mt-1" style={{ color: colors.textMuted }}>{c.description}</div>}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => remove(i)}
                className="hover:opacity-80"
                style={{ color: colors.error }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Add New Competency */}
      <div 
        className="p-4 border rounded-lg space-y-3"
        style={{
          backgroundColor: `${colors.surface}30`,
          borderColor: colors.border,
        }}
      >
        <h5 className="text-sm font-medium" style={{ color: colors.text }}>
          {t('createPersonaPage.form.competency.addNew')}
        </h5>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Input
            placeholder={t('createPersonaPage.form.competency.name')}
            value={draft.name}
            onChange={(e) => setDraft({ ...draft, name: e.target.value })}
            className="border"
            style={inputStyle}
          />
          <Select value={draft.type} onValueChange={(v) => setDraft({ ...draft, type: v as CompetencyType })}>
            <SelectTrigger>
              <SelectValue placeholder={t('createPersonaPage.form.competency.type')} />
            </SelectTrigger>
            <SelectContent>
              {types.map((opt) => (
                <SelectItem 
                  key={opt} 
                  value={opt}
                >
                  {t(`createPersonaPage.form.competencyType.options.${opt}`)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Select value={draft.requiredLevel} onValueChange={(v) => setDraft({ ...draft, requiredLevel: v as ProficiencyLevel })}>
            <SelectTrigger>
              <SelectValue placeholder={t('createPersonaPage.form.competency.requiredLevel')} />
            </SelectTrigger>
            <SelectContent>
              {levels.map((opt) => (
                <SelectItem 
                  key={opt} 
                  value={opt}
                >
                  {t(`createPersonaPage.form.proficiencyLevel.options.${opt}`)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            placeholder={t('createPersonaPage.form.competency.description')}
            value={draft.description}
            onChange={(e) => setDraft({ ...draft, description: e.target.value })}
            className="border"
            style={inputStyle}
          />
        </div>
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm" style={{ color: colors.text }}>
            <input
              type="checkbox"
              checked={draft.isMandatory}
              onChange={(e) => setDraft({ ...draft, isMandatory: e.target.checked })}
              className="rounded"
            />
            {t('createPersonaPage.form.competency.isMandatory')}
          </label>
          <Button 
            onClick={add} 
            disabled={!draft.name.trim()} 
            className="hover:opacity-80"
            style={{ 
              backgroundColor: colors.accent,
              color: colors.text 
            }}
          >
            <Plus className="h-4 w-4 mr-2" />
            {t('createPersonaPage.form.add')}
          </Button>
        </div>
      </div>
    </div>
  );
}