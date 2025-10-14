import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface KeyValueListProps {
  title: string;
  list: { key: string; value: string }[];
  onChange: (list: { key: string; value: string }[]) => void;
}

export function ImprovedKeyValueList({ title, list, onChange }: KeyValueListProps) {
  const addPair = () => {
    onChange([...list, { key: '', value: '' }]);
  };

  const updatePair = (index: number, patch: Partial<{ key: string; value: string }>) => {
    const next = list.map((item, i) => (i === index ? { ...item, ...patch } : item));
    onChange(next);
  };

  const removePair = (index: number) => {
    const next = list.filter((_, i) => i !== index);
    onChange(next);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label className="font-medium">{title}</Label>
        <Button type="button" size="sm" onClick={addPair}>+ Add</Button>
      </div>
      <div className="space-y-3">
        {list.map((item, index) => (
          <div key={index} className="space-y-3 p-4 border border-border rounded-lg bg-card/50">
            {/* First row: Key and Value */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <Input
                  placeholder="Key"
                  value={item.key}
                  onChange={(e) => updatePair(index, { key: e.target.value })}
                />
              </div>
              <div>
                <Input
                  placeholder="Value"
                  value={item.value}
                  onChange={(e) => updatePair(index, { value: e.target.value })}
                />
              </div>
            </div>
            
            {/* Second row: Remove button */}
            <div className="flex justify-end">
              <Button type="button" variant="outline" size="sm" onClick={() => removePair(index)}>
                Remove
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImprovedKeyValueList;


