import type { UserProfileResponse } from '@/pages/candidate/types';

const STORAGE_KEY = 'sb_user_profile';

export function loadUserProfileFromStorage(): UserProfileResponse | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as UserProfileResponse;
  } catch {
    return null;
  }
}

export function saveUserProfileToStorage(profile: UserProfileResponse): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  } catch {
    // ignore storage errors
  }
}

export function mergeAndSaveUserProfile(
  partial: Partial<UserProfileResponse>
): UserProfileResponse | null {
  const existing = loadUserProfileFromStorage();
  if (existing) {
    const merged: UserProfileResponse = {
      id: partial.id ?? existing.id,
      profilePicture:
        partial.profilePicture !== undefined
          ? partial.profilePicture === ''
            ? existing.profilePicture
            : partial.profilePicture
          : existing.profilePicture,
      cvUpload:
        partial.cvUpload !== undefined
          ? partial.cvUpload === ''
            ? existing.cvUpload
            : partial.cvUpload
          : existing.cvUpload,
      gitHubConnection:
        partial.gitHubConnection !== undefined
          ? partial.gitHubConnection
          : existing.gitHubConnection,
    };
    saveUserProfileToStorage(merged);
    return merged;
  }

  // No existing profile in storage; only save if we have at least an id
  if (partial.id) {
    const initial: UserProfileResponse = {
      id: partial.id,
      profilePicture: partial.profilePicture ?? null,
      cvUpload: partial.cvUpload ?? null,
      gitHubConnection: partial.gitHubConnection ?? null,
    };
    saveUserProfileToStorage(initial);
    return initial;
  }
  return null;
}

export function clearUserProfileStorage(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}
