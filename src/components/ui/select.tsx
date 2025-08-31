import * as React from 'react';
import { createPortal } from 'react-dom';
import { ChevronDown, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { colors } from '@/lib/design-system';

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
  triggerRef: React.RefObject<HTMLButtonElement | null>;
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
  const triggerRef = React.useRef<HTMLButtonElement>(null);

  return (
    <SelectContext.Provider value={{ value, onValueChange, open, setOpen, disabled, triggerRef }}>
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
  ({ className, children, id, ...props }, _ref) => {
    const { open, setOpen, disabled, triggerRef } = useSelectContext();

    return (
      <button
        ref={triggerRef}
        id={id}
        type="button"
        onClick={() => !disabled && setOpen(!open)}
        className={cn(
          'flex h-9 w-full items-center justify-between rounded-md border px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        style={{
          backgroundColor: colors.surface,
          borderColor: colors.border,
          color: colors.text,
        }}
        disabled={disabled}
        {...props}
      >
        {children}
        <ChevronDown 
          className="h-4 w-4 opacity-70" 
          style={{ color: colors.textMuted }}
        />
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
  return (
    <span style={{ color: value ? colors.text : colors.textMuted }}>
      {value || placeholder}
    </span>
  );
};

interface SelectContentProps {
  className?: string;
  children: React.ReactNode;
}

const SelectContent: React.FC<SelectContentProps> = ({ className, children }) => {
  const { open, setOpen, triggerRef } = useSelectContext();
  const contentRef = React.useRef<HTMLDivElement>(null);
  const [position, setPosition] = React.useState<{ top: number; left: number; width: number }>({ top: 0, left: 0, width: 0 });

  React.useLayoutEffect(() => {
    if (!open) return;
    const update = () => {
      const rect = triggerRef.current?.getBoundingClientRect();
      if (rect) {
        // Use viewport coordinates for fixed positioning; do not add scroll offsets
        setPosition({ top: rect.bottom, left: rect.left, width: rect.width });
      }
    };
    update();
    window.addEventListener('resize', update);
    window.addEventListener('scroll', update, true);
    return () => {
      window.removeEventListener('resize', update);
      window.removeEventListener('scroll', update, true);
    };
  }, [open, triggerRef]);

  React.useEffect(() => {
    if (!open) return;
    const onDocMouseDown = (e: MouseEvent) => {
      const target = e.target as Node;
      if (contentRef.current?.contains(target)) return;
      if (triggerRef.current?.contains(target)) return;
      setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDocMouseDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDocMouseDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open, setOpen, triggerRef]);

  if (!open) return null;

  return createPortal(
    <div
      ref={contentRef}
      className={cn(
        'fixed z-[9999] min-w-[8rem] overflow-hidden rounded-md border shadow-md',
        className
      )}
      style={{ 
        top: position.top, 
        left: position.left, 
        width: position.width,
        backgroundColor: colors.surface,
        borderColor: colors.border,
        color: colors.text,
      }}
    >
      <div className="p-1">{children}</div>
    </div>,
    document.body
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
        'relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none transition-colors',
        className
      )}
      style={{
        backgroundColor: isSelected ? colors.surfaceLight : 'transparent',
        color: colors.text,
      }}
      onMouseEnter={(e) => {
        if (!isSelected) {
          e.currentTarget.style.backgroundColor = `${colors.surfaceLight}80`; // 50% opacity
        }
      }}
      onMouseLeave={(e) => {
        if (!isSelected) {
          e.currentTarget.style.backgroundColor = 'transparent';
        }
      }}
    >
      <span>{children}</span>
      {isSelected && (
        <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
          <Check className="h-4 w-4" style={{ color: colors.accent }} />
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
  return (
    <div 
      className={cn('px-2 py-1.5 text-sm font-semibold', className)}
      style={{ color: colors.textSecondary }}
    >
      {children}
    </div>
  );
};

const SelectSeparator: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div 
      className={cn('-mx-1 my-1 h-px', className)} 
      style={{ backgroundColor: colors.border }}
    />
  );
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
