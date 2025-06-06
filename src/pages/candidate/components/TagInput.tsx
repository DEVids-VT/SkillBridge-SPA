import { useState, KeyboardEvent } from 'react';
import { Input } from '@/components/ui/input';
import { X } from 'lucide-react';

interface TagInputProps {
  id: string;
  name: string;
  value: string;
  onChange: (name: string, value: string) => void;
  placeholder?: string;
  hasError?: boolean;
}

const TagInput: React.FC<TagInputProps> = ({
  id,
  name,
  value,
  onChange,
  placeholder,
  hasError,
}) => {
  const [inputValue, setInputValue] = useState('');
  const tags = value ? value.split(',').filter((tag) => tag.trim() !== '') : [];

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag();
    }
  };

  const addTag = () => {
    const trimmedInput = inputValue.trim();
    if (trimmedInput) {
      const newValue = [...tags, trimmedInput].join(',');
      onChange(name, newValue);
      setInputValue('');
    }
  };

  const removeTag = (index: number) => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    onChange(name, newTags.join(','));
  };

  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-2 mb-2">
        {tags.map((tag, index) => (
          <div
            key={index}
            className="flex items-center gap-1 px-2 py-1 text-sm rounded-md bg-primary/10 text-primary"
          >
            <span>{tag.trim()}</span>
            <button
              type="button"
              onClick={() => removeTag(index)}
              className="text-primary hover:text-primary/70 focus:outline-none"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ))}
      </div>

      <Input
        id={id}
        placeholder={placeholder || 'Type and press Enter or comma to add'}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={addTag}
        className={hasError ? 'border-red-500' : ''}
      />
    </div>
  );
};

export default TagInput;
