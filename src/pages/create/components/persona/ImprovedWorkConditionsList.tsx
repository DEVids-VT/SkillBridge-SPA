import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, X } from 'lucide-react';
import { colors } from '@/lib/design-system';
import type { WorkCondition } from '@/types/candidate/requirements';

interface ImprovedWorkConditionsListProps {
  title: string;
  list: WorkCondition[];
  onChange: (list: WorkCondition[]) => void;
}

export function ImprovedWorkConditionsList({ title, list, onChange }: ImprovedWorkConditionsListProps) {
  const { t } = useTranslation('createProject');
  const empty: WorkCondition = { type: '', description: '', isRequired: true };
  const [draft, setDraft] = React.useState<WorkCondition>(empty);

  const add = () => {
    if (!draft.type.trim()) return;
    onChange([...list, draft]);
    setDraft(empty);
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
          {list.length} {t('createPersonaPage.form.workCondition.count')}
        </Badge>
      </div>

      {/* Existing Work Conditions */}
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
                  <span className="font-medium" style={{ color: colors.text }}>{c.type}</span>
                  <Badge variant={c.isRequired ? "destructive" : "secondary"} className="text-xs">
                    {c.isRequired ? t('createPersonaPage.form.required') : t('createPersonaPage.form.optional')}
                  </Badge>
                </div>
                {c.description && <div className="text-sm" style={{ color: colors.textMuted }}>{c.description}</div>}
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

      {/* Add New Work Condition */}
      <div 
        className="p-4 border rounded-lg space-y-3"
        style={{
          backgroundColor: `${colors.surface}30`,
          borderColor: colors.border,
        }}
      >
        <h5 className="text-sm font-medium" style={{ color: colors.text }}>
          {t('createPersonaPage.form.workCondition.addNew')}
        </h5>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Input
            placeholder={t('createPersonaPage.form.workCondition.type')}
            value={draft.type}
            onChange={(e) => setDraft({ ...draft, type: e.target.value })}
            className="border"
            style={inputStyle}
          />
          <Input
            placeholder={t('createPersonaPage.form.workCondition.description')}
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
              checked={draft.isRequired}
              onChange={(e) => setDraft({ ...draft, isRequired: e.target.checked })}
              className="rounded"
            />
            {t('createPersonaPage.form.workCondition.isRequired')}
          </label>
          <Button 
            onClick={add} 
            disabled={!draft.type.trim()} 
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