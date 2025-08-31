import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { colors } from '@/lib/design-system';
import { Building2, User, LogOut, Loader2 } from 'lucide-react';
import { UserRole } from '@/types/user/UserOnboarding';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { useAuth0 } from '@auth0/auth0-react';
import { useBecomeCandidate } from '@/hooks/useRoleMutations';
import { useState } from 'react';

interface RoleSelectorProps {
  onRoleSelect: (role: UserRole) => void;
}

export function RoleSelector({ onRoleSelect }: RoleSelectorProps) {
  const { t } = useTranslation('welcome');
  const { completeOnboarding, refreshUserRoles } = useOnboarding();
  const { logout } = useAuth0();
  const [isLoading, setIsLoading] = useState<'company' | 'candidate' | null>(null);
  // Use only the candidate mutation hook since company mutation happens after form completion
  const becomeCandidateMutation = useBecomeCandidate();

  // Handler for company selection - just sets the role, API call will be made after form completion
  const handleCompanySelect = () => {
    setIsLoading('company');
    // Simply select the company role without making API call or completing onboarding
    onRoleSelect('company');
    setIsLoading(null);
    // The API call and token refresh will happen after form completion in CompanyFormSteps.tsx
  };
  // Handler for candidate selection that completes onboarding immediately
  const handleCandidateSelect = async () => {
    try {
      setIsLoading('candidate');
      onRoleSelect('candidate');

      // Call the API to become a candidate
      await becomeCandidateMutation.mutateAsync();

      // Refresh the token to get updated roles
      await refreshUserRoles();

      // Complete onboarding after successful API call
      completeOnboarding();
    } catch (error) {
      console.error('Error becoming a candidate:', error);
      // You might want to show an error message to the user
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto">
      {/* Info Paragraph */}
      <div
        className="text-center p-4 rounded-lg shadow-sm border"
        style={{ backgroundColor: colors.surface, borderColor: colors.blue }}
      >
        <p className="text-sm md:text-base" style={{ color: colors.white }}>
          {t('welcome.onboardingInfo')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {' '}
        {/* Company Card */}
        <div className="cursor-pointer" onClick={handleCompanySelect}>
          <Card
            className="relative h-full min-h-[350px] border shadow-lg"
            style={{ backgroundColor: colors.blueDark, borderColor: colors.blue }}
          >
            <CardContent className="flex flex-col items-center p-6 h-full">
              {/* Icon */}
              <div className="relative mb-6 p-4 rounded-2xl" style={{ backgroundColor: colors.blue }}>
                <Building2 className="h-12 w-12" style={{ color: colors.yellow }} />
              </div>
              {/* Content */}
              <div className="text-center flex-1 flex flex-col justify-center">
                <h3 className="text-xl md:text-2xl font-bold mb-3" style={{ color: colors.white }}>
                  {t('welcome.roleSelector.iAmCompany')}
                </h3>
                <p className="text-sm mb-6" style={{ color: colors.textSecondary }}>
                  {t('welcome.roleSelector.companyDescription')}
                </p>
              </div>
              {/* Button */}
              <Button
                size="default"
                className="w-full py-3 px-6 font-medium rounded-lg shadow-lg border"
                style={{ backgroundColor: colors.blue, color: colors.white, borderColor: colors.blue }}
                disabled={isLoading !== null}
              >
                {isLoading === 'company' ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t('welcome.roleSelector.processing')}
                  </>
                ) : (
                  t('welcome.roleSelector.continueAsCompany')
                )}
              </Button>
            </CardContent>
          </Card>
        </div>{' '}
        {/* Candidate Card */}
        <div className="cursor-pointer" onClick={handleCandidateSelect}>
          <Card
            className="relative h-full min-h-[350px] border shadow-lg"
            style={{ backgroundColor: colors.blueDark, borderColor: colors.blue }}
          >
            <CardContent className="flex flex-col items-center p-6 h-full">
              {/* Icon */}
              <div className="relative mb-6 p-4 rounded-2xl" style={{ backgroundColor: colors.blue }}>
                <User className="h-12 w-12" style={{ color: colors.yellow }} />
              </div>
              {/* Content */}
              <div className="text-center flex-1 flex flex-col justify-center">
                <h3 className="text-xl md:text-2xl font-bold mb-3" style={{ color: colors.white }}>
                  {t('welcome.roleSelector.iAmCandidate')}
                </h3>
                <p className="text-sm mb-6" style={{ color: colors.textSecondary }}>
                  {t('welcome.roleSelector.candidateDescription')}
                </p>
              </div>
              {/* Button */}
              <Button
                size="default"
                className="w-full py-3 px-6 font-medium rounded-lg shadow-lg border"
                style={{ backgroundColor: colors.blue, color: colors.white, borderColor: colors.blue }}
                disabled={isLoading !== null}
              >
                {isLoading === 'candidate' ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t('welcome.roleSelector.processing')}
                  </>
                ) : (
                  t('welcome.roleSelector.continueAsCandidate')
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Logout Button */}
      <div className="flex justify-center mt-4">
        <Button
          variant="outline"
          size="sm"
          className="hover:opacity-90"
          style={{ color: colors.textSecondary, borderColor: colors.blue, backgroundColor: 'transparent' }}
          onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
        >
          <LogOut className="h-4 w-4 mr-2" />
          {t('logout')}
        </Button>
      </div>
    </div>
  );
}

export default RoleSelector;
