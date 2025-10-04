import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { colors, typography } from '@/lib/design-system';
import { Input } from '@/components/ui/input';
import { useUpdateUserProfile } from '../hooks/useUserProfile';
import { mergeAndSaveUserProfile } from '../hooks/userProfileStorage';

interface CandidateAccountSectionProps {
  user: {
    avatar: string;
    fullName: string;
    email: string;
    username: string;
    cv: string | null;
    githubConnection: string | null;
  };
  setUser: React.Dispatch<React.SetStateAction<any>>;
  onEditField: (field: {
    field: 'fullName' | 'username' | 'githubConnection';
    title: string;
  }) => void;
}

export default function CandidateAccountSection({
  user,
  setUser,
  onEditField,
}: CandidateAccountSectionProps) {
  const updateProfile = useUpdateUserProfile();
  const avatarInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className={`space-y-6 border-b pb-8 border-[${colors.blue}]`}>
      <h2 className={typography.heading[4]}>Account</h2>

      {/* Profile Picture */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            src={user.avatar}
            alt="Avatar"
            className={`w-16 h-16 rounded-full border-2 border-[${colors.white}]`}
          />
          <div>
            <p className="text-sm font-medium">Profile Picture</p>
            <p className={typography.body.sm}>Upload or change your avatar</p>
          </div>
        </div>
        <div>
          <input
            ref={avatarInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              try {
                const updated = await updateProfile.mutateAsync({ profilePicture: file });
                setUser((prev: any) => ({
                  ...prev,
                  avatar: updated.profilePicture || prev.avatar,
                }));
                // also merge into local storage cache
                mergeAndSaveUserProfile({
                  id: updated.id,
                  profilePicture: updated.profilePicture ?? undefined,
                });
              } finally {
                e.currentTarget.value = '';
              }
            }}
          />
          <Button
            variant="outline"
            className={`border-[${colors.blue}] text-[${colors.white}]`}
            onClick={() => avatarInputRef.current?.click()}
          >
            Change avatar
          </Button>
        </div>
      </div>

      {/* Full Name */}
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm font-medium">Full Name</p>
          <p className={typography.body.sm}>{user.fullName}</p>
        </div>
        <Button
          variant="outline"
          className={`border-[${colors.blue}] text-[${colors.white}]`}
          onClick={() => onEditField({ field: 'fullName', title: 'Change full name' })}
        >
          Edit
        </Button>
      </div>

      {/* Email */}
      <div>
        <p className="text-sm font-medium">Email</p>
        <p className={typography.body.sm}>{user.email}</p>
      </div>

      {/* Username */}
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm font-medium">Username</p>
          <p className={typography.body.sm}>{user.username}</p>
        </div>
        <Button
          variant="outline"
          className={`border-[${colors.blue}] text-[${colors.white}]`}
          onClick={() => onEditField({ field: 'username', title: 'Change username' })}
        >
          Change
        </Button>
      </div>

      {/* CV Upload */}
      <div>
        <p className="text-sm font-medium mb-2">CV Upload</p>

        {user.cv ? (
          <div
            className={`flex items-center justify-between border rounded-md p-2 border-[${colors.blue}]`}
          >
            <span className={`text-sm truncate max-w-[250px]`} style={{ color: colors.white }}>
              {user.cv}
            </span>
            <Button
              variant="outline"
              className={`border-[${colors.blue}] text-[${colors.white}]`}
              onClick={() => {
                setUser((prev: any) => ({ ...prev, cv: null }));
                // reflect removal in local storage cache
                mergeAndSaveUserProfile({ cvUpload: null });
              }}
            >
              Remove
            </Button>
          </div>
        ) : (
          <Input
            type="file"
            accept=".pdf,.doc,.docx,image/*"
            className={`bg-transparent border border-[${colors.blue}]`}
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              try {
                const updated = await updateProfile.mutateAsync({ cvUpload: file });
                setUser((prev: any) => ({ ...prev, cv: updated.cvUpload || file.name }));
                // also merge into local storage cache
                mergeAndSaveUserProfile({
                  id: updated.id,
                  cvUpload: updated.cvUpload ?? undefined,
                });
              } finally {
                e.currentTarget.value = '';
              }
            }}
          />
        )}
      </div>

      {/* GitHub Connection */}
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm font-medium">GitHub Connection</p>
          {user.githubConnection ? (
            <p className={typography.body.sm}>{user.githubConnection}</p>
          ) : null}
        </div>
        <Button
          variant="outline"
          className={`border-[${colors.blue}] text-[${colors.white}]`}
          onClick={() => onEditField({ field: 'githubConnection', title: 'Set GitHub connection' })}
        >
          {user.githubConnection ? 'Change' : 'Connect'}
        </Button>
      </div>
    </div>
  );
}
