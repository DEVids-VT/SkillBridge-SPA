import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, X } from 'lucide-react';
import { colors } from '@/lib/design-system';
import type { PersonalityTrait, ImportanceLevel } from '@/types/candidate/requirements';

interface ImprovedPersonalityTraitsListProps {
  title: string;
  list: PersonalityTrait[];
  onChange: (list: PersonalityTrait[]) => void;
}

export function ImprovedPersonalityTraitsList({ title, list, onChange }: ImprovedPersonalityTraitsListProps) {
  const { t } = useTranslation('createProject');
  const importance: ImportanceLevel[] = ['Low','Medium','High','Critical'];
  const empty: PersonalityTrait = { traitName: '', description: '', importance: 'Medium' };
  const [draft, setDraft] = React.useState<PersonalityTrait>(empty);

  const add = () => {
    if (!draft.traitName.trim()) return;
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
          {list.length} {t('createPersonaPage.form.personality.count')}
        </Badge>
      </div>

      {/* Existing Traits */}
      {list.length > 0 && (
        <div className="space-y-2">
          {list.map((p, i) => (
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
                  <span className="font-medium" style={{ color: colors.text }}>{p.traitName}</span>
                  <Badge variant="outline" className="text-xs">
                    {t(`createPersonaPage.form.importanceLevel.options.${p.importance}`)}
                  </Badge>
                </div>
                {p.description && <div className="text-sm" style={{ color: colors.textMuted }}>{p.description}</div>}
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

      {/* Add New Trait */}
      <div 
        className="p-4 border rounded-lg space-y-3"
        style={{
          backgroundColor: `${colors.surface}30`,
          borderColor: colors.border,
        }}
      >
        <h5 className="text-sm font-medium" style={{ color: colors.text }}>
          {t('createPersonaPage.form.personality.addNew')}
        </h5>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Input
            placeholder={t('createPersonaPage.form.personality.traitName')}
            value={draft.traitName}
            onChange={(e) => setDraft({ ...draft, traitName: e.target.value })}
            className="border"
            style={inputStyle}
          />
          <Input
            placeholder={t('createPersonaPage.form.personality.description')}
            value={draft.description}
            onChange={(e) => setDraft({ ...draft, description: e.target.value })}
            className="border"
            style={inputStyle}
          />
          <Select value={draft.importance} onValueChange={(v) => setDraft({ ...draft, importance: v as ImportanceLevel })}>
            <SelectTrigger>
              <SelectValue placeholder={t('createPersonaPage.form.personality.importance')} />
            </SelectTrigger>
            <SelectContent>
              {importance.map((opt) => (
                <SelectItem 
                  key={opt} 
                  value={opt}
                >
                  {t(`createPersonaPage.form.importanceLevel.options.${opt}`)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex justify-end">
          <Button 
            onClick={add} 
            disabled={!draft.traitName.trim()} 
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