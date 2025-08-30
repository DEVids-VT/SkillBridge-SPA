import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, X } from 'lucide-react';
import { colors } from '@/lib/design-system';

interface ImprovedKeyValueListProps {
  title: string;
  list: { key: string; value: string }[];
  onChange: (list: { key: string; value: string }[]) => void;
}

export function ImprovedKeyValueList({ title, list, onChange }: ImprovedKeyValueListProps) {
  const { t } = useTranslation('createProject');
  const empty = { key: '', value: '' };
  const [draft, setDraft] = React.useState<{ key: string; value: string }>(empty);

  const add = () => {
    if (!draft.key.trim()) return;
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
          {list.length} {t('createPersonaPage.form.customCriteria.count')}
        </Badge>
      </div>

      {/* Existing Custom Criteria */}
      {list.length > 0 && (
        <div className="space-y-2">
          {list.map((kv, i) => (
            <div 
              key={i} 
              className="flex items-center justify-between p-3 border rounded-lg"
              style={{
                backgroundColor: `${colors.surface}80`,
                borderColor: colors.border,
              }}
            >
              <div className="flex-1">
                <span className="font-medium" style={{ color: colors.text }}>{kv.key}:</span>{' '}
                <span style={{ color: colors.textSecondary }}>{kv.value}</span>
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

      {/* Add New Custom Criteria */}
      <div 
        className="p-4 border rounded-lg space-y-3"
        style={{
          backgroundColor: `${colors.surface}30`,
          borderColor: colors.border,
        }}
      >
        <h5 className="text-sm font-medium" style={{ color: colors.text }}>
          {t('createPersonaPage.form.customCriteria.addNew')}
        </h5>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Input
            placeholder={t('createPersonaPage.form.customCriteria.key')}
            value={draft.key}
            onChange={(e) => setDraft({ ...draft, key: e.target.value })}
            className="border"
            style={inputStyle}
          />
          <Input
            placeholder={t('createPersonaPage.form.customCriteria.value')}
            value={draft.value}
            onChange={(e) => setDraft({ ...draft, value: e.target.value })}
            className="border"
            style={inputStyle}
          />
        </div>
        <div className="flex justify-end">
          <Button 
            onClick={add} 
            disabled={!draft.key.trim()} 
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