import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import type { PersonalityTrait, ImportanceLevel } from '@/types/candidate/requirements';

interface PersonalityTraitsListProps {
  title: string;
  list: PersonalityTrait[];
  onChange: (list: PersonalityTrait[]) => void;
}

const importanceOptions: ImportanceLevel[] = ['Low', 'Medium', 'High', 'Critical'];

export function ImprovedPersonalityTraitsList({
  title,
  list,
  onChange,
}: PersonalityTraitsListProps) {
  const addTrait = () => {
    onChange([...list, { traitName: '', description: '', importance: 'Medium' }]);
  };

  const updateTrait = (index: number, patch: Partial<PersonalityTrait>) => {
    const next = list.map((item, i) => (i === index ? { ...item, ...patch } : item));
    onChange(next);
  };

  const removeTrait = (index: number) => {
    const next = list.filter((_, i) => i !== index);
    onChange(next);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label className="font-medium">{title}</Label>
        <Button type="button" size="sm" onClick={addTrait}>
          + Add
        </Button>
      </div>
      <div className="space-y-4">
        {list.map((item, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-3 items-start">
            <div className="md:col-span-1">
              <Input
                placeholder="Trait name"
                value={item.traitName}
                onChange={(e) => updateTrait(index, { traitName: e.target.value })}
              />
            </div>
            <div className="md:col-span-2">
              <Textarea
                placeholder="Description"
                value={item.description}
                onChange={(e) => updateTrait(index, { description: e.target.value })}
                className="min-h-10"
              />
            </div>
            <div className="flex items-center gap-2 md:col-span-1">
              <Select
                value={item.importance}
                onValueChange={(v) => updateTrait(index, { importance: v as ImportanceLevel })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Importance" />
                </SelectTrigger>
                <SelectContent>
                  {importanceOptions.map((opt) => (
                    <SelectItem key={opt} value={opt}>
                      {opt}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button type="button" variant="outline" onClick={() => removeTrait(index)}>
                Remove
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImprovedPersonalityTraitsList;
