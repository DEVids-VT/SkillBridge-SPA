import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface CandidateEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  values: {
    fullName: string;
    username: string;
    githubConnection: string | null;
  };
  onSave: (changes: Partial<{ fullName: string; username: string; githubConnection: string | null }>) => Promise<void> | void;
  isSaving?: boolean;
}

export default function CandidateEditDialog({ open, onOpenChange, values, onSave, isSaving = false }: CandidateEditDialogProps) {
  const [form, setForm] = useState(() => initForm(values));

  useEffect(() => {
    if (open) setForm(initForm(values));
  }, [open, values.fullName, values.username, values.githubConnection]);

  const handleSubmit = async () => {
    const changes = buildChanges(values, form);
    if (Object.keys(changes).length === 0) {
      onOpenChange(false);
      return;
    }
    await onSave(changes);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit profile details</DialogTitle>
          <DialogDescription>Update your public profile information.</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 gap-4 pr-2">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full name</Label>
            <Input id="fullName" value={form.fullName} onChange={(e) => setForm((p) => ({ ...p, fullName: e.target.value }))} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" value={form.username} onChange={(e) => setForm((p) => ({ ...p, username: e.target.value }))} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="githubConnection">GitHub connection</Label>
            <Input
              id="githubConnection"
              placeholder="username or profile URL"
              value={form.githubConnection}
              onChange={(e) => setForm((p) => ({ ...p, githubConnection: e.target.value }))}
            />
          </div>
        </div>

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isSaving}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSaving}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function initForm(values: CandidateEditDialogProps['values']) {
  return {
    fullName: values.fullName ?? '',
    username: values.username ?? '',
    githubConnection: values.githubConnection ?? '',
  } as const;
}

function buildChanges(
  prev: CandidateEditDialogProps['values'],
  next: ReturnType<typeof initForm>
): Partial<{ fullName: string; username: string; githubConnection: string | null }> {
  const changes: Partial<{ fullName: string; username: string; githubConnection: string | null }> = {};
  if ((next.fullName ?? '').trim() !== (prev.fullName ?? '').trim()) changes.fullName = next.fullName.trim();
  if ((next.username ?? '').trim() !== (prev.username ?? '').trim()) changes.username = next.username.trim();
  const normalizedPrevGit = prev.githubConnection ?? '';
  if ((next.githubConnection ?? '').trim() !== normalizedPrevGit.trim()) changes.githubConnection = next.githubConnection.trim() || null;
  return changes;
}


