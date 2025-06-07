import { useAuth0 } from '@auth0/auth0-react';

// Auth0 namespace for custom claims
const AUTH0_NAMESPACE = 'https://skillbridgeapi';

export type Auth0Role = 'Company' | 'Candidate';

export interface UserCredentials {
  userId: string;
  name: string;
  email: string;
  picture: string;
  roles: Auth0Role[];
  isCandidate: boolean;
  isCompany: boolean;
}

export interface UseUserCredentialsReturnData {
  user: UserCredentials;
  isLoading: boolean;
  error: Error | null;
}

export const useUserCredentials = (): UseUserCredentialsReturnData => {
  const { user, isLoading, error } = useAuth0();

  // Log the raw Auth0 user object to see what's available
  console.log('Debug - Auth0 user object:', user);

  // Try multiple possible locations for roles
  const rolesPaths = [
    `${AUTH0_NAMESPACE}/roles`,
    'roles',
    `${AUTH0_NAMESPACE}/role`,
    'role',
    // Add potential variations of the namespace
    'https://skillbridge/roles',
    'https://skillbridge.api/roles',
    'https://auth0.com/roles',
  ];

  let roles: Auth0Role[] = [];

  // Try to find roles in different possible locations
  for (const path of rolesPaths) {
    const foundRoles = user?.[path];
    if (foundRoles) {
      console.log(`Debug - Found roles at path '${path}':`, foundRoles);
      roles = Array.isArray(foundRoles) ? foundRoles : [foundRoles];
      break;
    }
  }

  // If roles not found, try to extract from other potential fields
  if (roles.length === 0 && user) {
    console.log('Debug - Searching for roles in all user fields...');
    Object.keys(user).forEach((key) => {
      console.log(`Debug - Checking field '${key}':`, user[key]);
    });

    // Try looking for app_metadata which often contains roles
    const appMetadata = user?.['app_metadata'] || user?.['https://skillbridgeapi/app_metadata'];
    if (appMetadata && appMetadata.roles) {
      console.log('Debug - Found roles in app_metadata:', appMetadata.roles);
      roles = appMetadata.roles;
    }
  }

  // Case-insensitive role checks
  const hasRole = (roleName: string) =>
    roles.some((r) => typeof r === 'string' && r.toLowerCase() === roleName.toLowerCase());

  return {
    user: {
      userId: user?.sub || '',
      name: user?.name || '',
      email: user?.email || '',
      picture: user?.picture || '',
      roles,
      isCandidate: hasRole('candidate'),
      isCompany: hasRole('company'),
    },
    isLoading,
    error: error || null,
  };
};

export default useUserCredentials;
