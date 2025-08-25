import { useState, ReactNode, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { colors, typography } from "@/lib/design-system";

interface EditModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (value: string) => void;
    title: string;
    initialValue?: string;
    confirmLabel?: string;
    cancelLabel?: string;
    renderField?: (value: string, setValue: (val: string) => void) => ReactNode;
}

export default function EditModal({
    isOpen,
    onClose,
    onSave,
    title,
    initialValue = "",
    confirmLabel = "Save",
    cancelLabel = "Cancel",
    renderField,
}: EditModalProps) {
    const [value, setValue] = useState(initialValue);

    // Reset value whenever modal reopens
    useEffect(() => {
        if (isOpen) setValue(initialValue);
    }, [isOpen, initialValue]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
            <div
                className="rounded-xl shadow-lg p-6 w-[400px]"
                style={{ backgroundColor: colors.blueDark, color: colors.white }}
            >
                <h2 className={typography.heading[5]}>{title}</h2>

                <div className="mb-6 mt-4">
                    {renderField ? (
                        renderField(value, setValue)
                    ) : (
                        <input
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            className={`w-full bg-transparent border border-[${colors.blue}] px-2 py-1 rounded`}
                        />
                    )}
                </div>

                <div className="flex justify-end gap-3">
                    <Button
                        variant="outline"
                        onClick={onClose}
                        className={`border-[${colors.blue}] text-[${colors.white}]`}
                    >
                        {cancelLabel}
                    </Button>
                    <Button
                        onClick={() => {
                            onSave(value);
                            onClose();
                        }}
                        className={`bg-[${colors.orange}] text-[${colors.blueDark}] hover:bg-[${colors.yellow}]`}
                    >
                        {confirmLabel}
                    </Button>
                </div>
            </div>
        </div>
    );
}