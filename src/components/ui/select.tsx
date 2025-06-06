import * as React from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SelectProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
  disabled?: boolean;
}

interface SelectContextType {
  value: string;
  onValueChange: (value: string) => void;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  disabled?: boolean;
}

const SelectContext = React.createContext<SelectContextType | undefined>(undefined);

function useSelectContext() {
  const context = React.useContext(SelectContext);
  if (!context) {
    throw new Error('Select compound components must be used within a Select component');
  }
  return context;
}

const Select: React.FC<SelectProps> = ({ value, onValueChange, children, disabled }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <SelectContext.Provider value={{ value, onValueChange, open, setOpen, disabled }}>
      {children}
    </SelectContext.Provider>
  );
};

interface SelectTriggerProps {
  className?: string;
  children: React.ReactNode;
  id?: string;
}

const SelectTrigger = React.forwardRef<HTMLButtonElement, SelectTriggerProps>(
  ({ className, children, id, ...props }, ref) => {
    const { open, setOpen, disabled } = useSelectContext();

    return (
      <button
        ref={ref}
        id={id}
        type="button"
        onClick={() => !disabled && setOpen(!open)}
        className={cn(
          'flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        disabled={disabled}
        {...props}
      >
        {children}
        <ChevronDown className="h-4 w-4 opacity-50" />
      </button>
    );
  }
);
SelectTrigger.displayName = 'SelectTrigger';

interface SelectValueProps {
  placeholder?: string;
}

const SelectValue: React.FC<SelectValueProps> = ({ placeholder }) => {
  const { value } = useSelectContext();
  return <span>{value || placeholder}</span>;
};

interface SelectContentProps {
  className?: string;
  children: React.ReactNode;
}

const SelectContent: React.FC<SelectContentProps> = ({ className, children }) => {
  const { open } = useSelectContext();

  if (!open) return null;

  // Use a fixed position to ensure the dropdown is displayed above other elements
  return (
    <div className="relative">
      <div
        className={cn(
          'absolute z-50 min-w-[8rem] w-full overflow-hidden rounded-md border bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-md mt-1',
          className
        )}
      >
        <div className="p-1">{children}</div>
      </div>
    </div>
  );
};

interface SelectItemProps {
  className?: string;
  children: React.ReactNode;
  value: string;
}

const SelectItem: React.FC<SelectItemProps> = ({ className, children, value }) => {
  const { value: selectedValue, onValueChange, setOpen } = useSelectContext();
  const isSelected = selectedValue === value;

  const handleClick = () => {
    onValueChange(value);
    setOpen(false);
  };

  return (
    <div
      role="option"
      aria-selected={isSelected}
      onClick={handleClick}
      className={cn(
        'relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none hover:bg-gray-100 dark:hover:bg-gray-700',
        isSelected && 'bg-gray-100 dark:bg-gray-700',
        className
      )}
    >
      <span>{children}</span>
      {isSelected && (
        <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
          <Check className="h-4 w-4" />
        </span>
      )}
    </div>
  );
};

interface SelectGroupProps {
  className?: string;
  children: React.ReactNode;
}

const SelectGroup: React.FC<SelectGroupProps> = ({ className, children }) => {
  return <div className={cn('py-1.5', className)}>{children}</div>;
};

interface SelectLabelProps {
  className?: string;
  children: React.ReactNode;
}

const SelectLabel: React.FC<SelectLabelProps> = ({ className, children }) => {
  return <div className={cn('px-2 py-1.5 text-sm font-semibold', className)}>{children}</div>;
};

const SelectSeparator: React.FC<{ className?: string }> = ({ className }) => {
  return <div className={cn('-mx-1 my-1 h-px bg-gray-200 dark:bg-gray-700', className)} />;
};

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
};
