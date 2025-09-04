import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { colors, typography } from "@/lib/design-system";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import CandidateEditModal from "@/components/ui/EditProfileModal";
import { useUserCredentials } from "@/hooks/useUserCredentials";
import { useUpdateUserProfile, useUserProfile } from "./hooks/useUserProfile";
import { mergeAndSaveUserProfile } from "./hooks/userProfileStorage";
export default function AccountSettingsPage() {
  const { user: session } = useUserCredentials();
  const { data: profile } = useUserProfile();
  const updateProfile = useUpdateUserProfile();

  const [user, setUser] = useState({
    avatar: "/images/avatar-placeholder.jpg",
    fullName: "",
    email: "",
    username: "",
    interests: ["Finances", "Coding", "Logistics"],
    cv: null as string | null,
    githubConnection: "" as string | null,
    subscription: {
      current: "Free Tier",
      description: "Currently on free tier",
      upcoming: "Pro (Coming Soon)",
      upcomingDescription: "Stay tuned for new features",
    },
    theme: "system",
  });

  const [editField, setEditField] = useState<
    null | { field: "fullName" | "username" | "githubConnection"; title: string }
  >(null);

  // Hidden input for avatar upload
  const avatarInputRef = useRef<HTMLInputElement>(null);

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
      {/* Account Section */}
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
                  setUser((prev) => ({ ...prev, avatar: updated.profilePicture || prev.avatar }));
                  // also merge into local storage cache
                  mergeAndSaveUserProfile({ id: updated.id, profilePicture: updated.profilePicture ?? undefined });
                } finally {
                  e.currentTarget.value = "";
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
            onClick={() => setEditField({ field: "fullName", title: "Change full name" })}
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
            onClick={() => setEditField({ field: "username", title: "Change username" })}
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
                  setUser((prev) => ({ ...prev, cv: null }));
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
                  setUser((prev) => ({ ...prev, cv: updated.cvUpload || file.name }));
                  // also merge into local storage cache
                  mergeAndSaveUserProfile({ id: updated.id, cvUpload: updated.cvUpload ?? undefined });
                } finally {
                  e.currentTarget.value = "";
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
            onClick={() => setEditField({ field: "githubConnection", title: "Set GitHub connection" })}
          >
            {user.githubConnection ? "Change" : "Connect"}
          </Button>
        </div>
      </div>

      {/* Subscription Section */}
      <div className={`space-y-6 border-b pb-8 border-[${colors.blue}]`}>
        <h2 className={typography.heading[4]}>Subscription</h2>

        <div>
          <p className={typography.body.lg}>{user.subscription.current}</p>
          <p className={typography.body.sm}>{user.subscription.description}</p>
        </div>

        <div>
          <p className={typography.body.lg}>{user.subscription.upcoming}</p>
          <p className={typography.body.sm}>{user.subscription.upcomingDescription}</p>
        </div>
      </div>

      {/* System Section */}
      <div className="space-y-6">
        <h2 className={typography.heading[4]}>System</h2>

        {/* Theme Preferences */}
        <div>
          <p className="text-sm font-medium mb-2">Theme Preferences</p>
          <Select
            value={user.theme}
            onValueChange={(val) => setUser((prev) => ({ ...prev, theme: val }))}
          >
            <SelectTrigger className={`w-[200px] bg-transparent border border-[${colors.blue}]`}>
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
        <Button variant="outline" className={`border-[${colors.blue}] text-[${colors.white}]`}>
          Support
        </Button>
      </div>

      {/* Modal */}
      <CandidateEditModal
        isOpen={!!editField}
        onClose={() => setEditField(null)}
        title={editField?.title || ""}
        initialValue={editField ? (user as any)[editField.field] ?? "" : ""}
        onSave={async (newValue) => {
          if (!editField) return;
          if (editField.field === "githubConnection") {
            const updated = await updateProfile.mutateAsync({ gitHubConnection: newValue });
            setUser((prev) => ({ ...prev, githubConnection: updated.gitHubConnection || newValue }));
            mergeAndSaveUserProfile({ id: updated.id, gitHubConnection: updated.gitHubConnection ?? undefined });
          } else {
            setUser((prev) => ({ ...prev, [editField.field]: newValue }));
          }
        }}
      />
    </div>
  );
}
