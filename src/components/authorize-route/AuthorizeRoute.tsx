import { useAuth0 } from '@auth0/auth0-react';
import { PropsWithChildren, useEffect } from 'react';

interface AuthorizeRouteProps extends PropsWithChildren {
  onlyGuardChildren?: boolean;
}

export default function AuthorizeRoute({
  children,
  onlyGuardChildren = false,
}: AuthorizeRouteProps) {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  useEffect(() => {
    if (!isLoading && !isAuthenticated && !onlyGuardChildren) {
      loginWithRedirect();
    }
  }, [isAuthenticated, isLoading, loginWithRedirect, onlyGuardChildren]);

  // If onlyGuardChildren is true, we'll pass through regardless of auth state
  // This is used for Layout where we want layout to render but protect its children
  if (onlyGuardChildren) {
    return <>{children}</>;
  }

  return isAuthenticated ? <>{children}</> : null;
}
