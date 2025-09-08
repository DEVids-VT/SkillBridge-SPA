import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { CompetencyRequirement, CompetencyType, ProficiencyLevel } from '@/types/candidate/requirements';

interface CompetencyListProps {
  title: string;
  list: CompetencyRequirement[];
  onChange: (list: CompetencyRequirement[]) => void;
  requireMandatory?: boolean;
}

const typeOptions: CompetencyType[] = [
  'Technical','Functional','Leadership','Communication','Analytical','Creative','ProjectManagement','CustomerService','Financial','Regulatory','Industry','Language','Software','Hardware','Process','Safety','Quality','Other',
];

const levelOptions: ProficiencyLevel[] = ['Beginner','Intermediate','Advanced','Expert','Master'];

export function ImprovedCompetencyList({ title, list, onChange, requireMandatory }: CompetencyListProps) {
  const addItem = () => {
    onChange([
      ...list,
      { name: '', type: 'Technical', requiredLevel: 'Intermediate', description: '', isMandatory: !!requireMandatory },
    ]);
  };

  const updateItem = (index: number, patch: Partial<CompetencyRequirement>) => {
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
      <div className="space-y-4">
        {list.map((item, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-6 gap-3 items-start">
            <div className="md:col-span-2">
              <Input
                placeholder="Competency name"
                value={item.name}
                onChange={(e) => updateItem(index, { name: e.target.value })}
              />
            </div>
            <div>
              <Select value={item.type} onValueChange={(v) => updateItem(index, { type: v as CompetencyType })}>
                <SelectTrigger>
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  {typeOptions.map((opt) => (
                    <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select value={item.requiredLevel} onValueChange={(v) => updateItem(index, { requiredLevel: v as ProficiencyLevel })}>
                <SelectTrigger>
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent>
                  {levelOptions.map((opt) => (
                    <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="md:col-span-1">
              <Input
                placeholder="Short description"
                value={item.description}
                onChange={(e) => updateItem(index, { description: e.target.value })}
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={item.isMandatory}
                  onChange={(e) => updateItem(index, { isMandatory: e.target.checked })}
                />
                Mandatory
              </label>
              <Button type="button" variant="outline" onClick={() => removeItem(index)}>Remove</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImprovedCompetencyList;


