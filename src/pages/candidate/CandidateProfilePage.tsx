import { useEffect, useState } from 'react';
import { colors } from '@/lib/design-system';
import CandidateEditModal from '@/components/ui/EditProfileModal';
import { CandidateEditDialog } from './components';
import { useUserCredentials } from '@/hooks/useUserCredentials';
import { useUpdateUserProfile, useUserProfile } from './hooks/useUserProfile';
import { mergeAndSaveUserProfile } from './hooks/userProfileStorage';
import {
  CandidateAccountSection,
  CandidateSubscriptionSection,
  CandidateSystemSection,
} from './components';
export default function CandidateProfilePage() {
  const { user: session } = useUserCredentials();
  const { data: profile } = useUserProfile();
  const updateProfile = useUpdateUserProfile();

  const [user, setUser] = useState({
    avatar: '/images/avatar-placeholder.jpg',
    fullName: '',
    email: '',
    username: '',
    interests: ['Finances', 'Coding', 'Logistics'],
    cv: null as string | null,
    githubConnection: '' as string | null,
    subscription: {
      current: 'Free Tier',
      description: 'Currently on free tier',
      upcoming: 'Pro (Coming Soon)',
      upcomingDescription: 'Stay tuned for new features',
    },
    theme: 'system',
  });

  const [editField, setEditField] = useState<null | {
    field: 'fullName' | 'username' | 'githubConnection';
    title: string;
  }>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  // Sync basic session details
  useEffect(() => {
    setUser((prev) => ({
      ...prev,
      fullName: session.name || prev.fullName,
      email: session.email || prev.email,
      username: session.username || prev.username,
      avatar: session.picture || prev.avatar,
    }));
  }, [session.name, session.email, session.username, session.picture]);

  // Sync profile details
  useEffect(() => {
    if (!profile) return;
    setUser((prev) => ({
      ...prev,
      avatar: profile.profilePicture || prev.avatar,
      cv: profile.cvUpload ?? prev.cv,
      githubConnection: profile.gitHubConnection ?? prev.githubConnection,
    }));
  }, [profile]);

  return (
    <div
      className="w-full py-10 px-4 sm:px-8 md:px-16 lg:px-32 xl:px-60 2xl:px-96 space-y-10"
      style={{ backgroundColor: colors.dark, color: colors.white }}
    >
      <CandidateAccountSection
        user={user}
        setUser={setUser}
        onEditDetails={() => setIsEditDialogOpen(true)}
      />

      <CandidateSubscriptionSection subscription={user.subscription} />

      <CandidateSystemSection
        theme={user.theme}
        onThemeChange={(val) => setUser((prev) => ({ ...prev, theme: val }))}
      />

      {/* Image/file-specific modal (avatar, cv) and small field edits if any remain */}
      <CandidateEditModal
        isOpen={!!editField}
        onClose={() => setEditField(null)}
        title={editField?.title || ''}
        initialValue={editField ? ((user as any)[editField.field] ?? '') : ''}
        onSave={async (newValue) => {
          if (!editField) return;
          if (editField.field === 'githubConnection') {
            const updated = await updateProfile.mutateAsync({ gitHubConnection: newValue });
            setUser((prev) => ({
              ...prev,
              githubConnection: updated.gitHubConnection || newValue,
            }));
            mergeAndSaveUserProfile({
              id: updated.id,
              gitHubConnection: updated.gitHubConnection ?? undefined,
            });
          } else {
            setUser((prev) => ({ ...prev, [editField.field]: newValue }));
          }
        }}
      />

      {/* Unified edit dialog */}
      <CandidateEditDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        values={{
          fullName: user.fullName,
          username: user.username,
          githubConnection: user.githubConnection,
        }}
        onSave={async (changes) => {
          // Only GitHub connection needs API; other fields are local-only in this page
          if (typeof changes.githubConnection !== 'undefined') {
            const updated = await updateProfile.mutateAsync({
              gitHubConnection: changes.githubConnection,
            });
            mergeAndSaveUserProfile({
              id: updated.id,
              gitHubConnection: updated.gitHubConnection ?? undefined,
            });
            changes.githubConnection = updated.gitHubConnection ?? changes.githubConnection ?? null;
          }
          setUser((prev) => ({ ...prev, ...changes }));
        }}
      />
    </div>
  );
}
