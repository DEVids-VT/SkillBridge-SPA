import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
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
export default function AccountSettingsPage() {
  const [user, setUser] = useState({
    avatar: "/images/avatar-placeholder.jpg",
    fullName: "John Doe",
    email: "johndoe@example.com",
    username: "johndoe",
    interests: ["Finances", "Coding", "Logistics"],
    cv: null as string | null,
    subscription: {
      current: "Free Tier",
      description: "Currently on free tier",
      upcoming: "Pro (Coming Soon)",
      upcomingDescription: "Stay tuned for new features",
    },
    theme: "system",
  });

  const [editField, setEditField] = useState<
    null | { field: "fullName" | "username"; title: string }
  >(null);

  return (
    <div
      className="max-w-4xl mx-auto py-10 space-y-10"
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
          <Button variant="outline" className={`border-[${colors.blue}] text-[${colors.white}]`}>
            Change avatar
          </Button>
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

        {/* Top 3 Interests */}
        <div>
          <p className="text-sm font-medium mb-2">Top 3 Interests</p>
          <div className="flex gap-2">
            {user.interests.map((interest, idx) => (
              <Input
                key={idx}
                placeholder={`Interest ${idx + 1}`}
                defaultValue={interest}
                className={`bg-transparent border border-[${colors.blue}]`}
              />
            ))}
          </div>
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
                onClick={() => setUser((prev) => ({ ...prev, cv: null }))}
              >
                Remove
              </Button>
            </div>
          ) : (
            <Input
              type="file"
              className={`bg-transparent border border-[${colors.blue}]`}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setUser((prev) => ({ ...prev, cv: file.name }));
                }
              }}
            />
          )}
        </div>

        {/* GitHub Connection */}
        <div className="flex justify-between items-center">
          <p className="text-sm font-medium">GitHub Connection</p>
          <Button variant="outline" className={`border-[${colors.blue}] text-[${colors.white}]`}>
            Connect
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
        initialValue={editField ? user[editField.field] : ""}
        onSave={(newValue) => {
          if (!editField) return;
          setUser((prev) => ({ ...prev, [editField.field]: newValue }));
        }}
      />
    </div>
  );
}
