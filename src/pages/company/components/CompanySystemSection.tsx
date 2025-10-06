import { Button } from "@/components/ui/button";
import { typography } from "@/lib/design-system";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CompanySystemSectionProps {
  theme: string;
  onThemeChange: (theme: string) => void;
}

export default function CompanySystemSection({ theme, onThemeChange }: CompanySystemSectionProps) {
  return (
    <div className="space-y-6">
      <h2 className={typography.heading[4]}>System</h2>

      {/* Theme Preferences */}
      <div>
        <p className="text-sm font-medium mb-2">Theme Preferences</p>
        <Select value={theme} onValueChange={onThemeChange}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Support */}
      <Button variant="outline" className="border-border text-foreground">
        Support
      </Button>
    </div>
  );
}
