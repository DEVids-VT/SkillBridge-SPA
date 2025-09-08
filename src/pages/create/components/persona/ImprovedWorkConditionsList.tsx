import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { WorkCondition } from '@/types/candidate/requirements';

interface WorkConditionsListProps {
  title: string;
  list: WorkCondition[];
  onChange: (list: WorkCondition[]) => void;
}

export function ImprovedWorkConditionsList({ title, list, onChange }: WorkConditionsListProps) {
  const addItem = () => {
    onChange([...list, { type: '', description: '', isRequired: false }]);
  };

  const updateItem = (index: number, patch: Partial<WorkCondition>) => {
    const next = list.map((item, i) => (i === index ? { ...item, ...patch } : item));
    onChange(next);
  };

  const removeItem = (index: number) => {
    const next = list.filter((_, i) => i !== index);
    onChange(next);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label className="font-medium">{title}</Label>
        <Button type="button" size="sm" onClick={addItem}>+ Add</Button>
      </div>
      <div className="space-y-3">
        {list.map((item, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-3 items-center">
            <Input
              placeholder="Type (e.g., Remote, Shift)"
              value={item.type}
              onChange={(e) => updateItem(index, { type: e.target.value })}
            />
            <Input
              placeholder="Description"
              value={item.description}
              onChange={(e) => updateItem(index, { description: e.target.value })}
            />
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={item.isRequired}
                onChange={(e) => updateItem(index, { isRequired: e.target.checked })}
              />
              Required
            </label>
            <div>
              <Button type="button" variant="outline" onClick={() => removeItem(index)}>Remove</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImprovedWorkConditionsList;


