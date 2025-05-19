import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Building2, User } from 'lucide-react';
import { UserRole } from '@/types/user/UserOnboarding';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { colors } from '@/lib/design-system';

interface RoleSelectorProps {
  onRoleSelect: (role: UserRole) => void;
}

export function RoleSelector({ onRoleSelect }: RoleSelectorProps) {
  const { t } = useTranslation();
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-5xl">
      {/* Company Card */}
      <Card
        className={cn(
          'cursor-pointer border-2 hover:border-blue-500 shadow-md hover:shadow-xl transition-all',
          'h-full flex flex-col bg-white/80 backdrop-blur-sm'
        )}
        style={{ borderColor: colors.primary[100] }}
        onClick={() => onRoleSelect('company')}
      >
        <CardContent className="flex flex-col items-center justify-center p-10 h-full">
          <div className="rounded-full p-6 mb-6" style={{ backgroundColor: colors.primary[100] }}>
            <Building2 className="h-16 w-16" style={{ color: colors.primary[600] }} />
          </div>
          <h3
            className="text-3xl font-bold text-center mb-4"
            style={{ color: colors.primary[700] }}
          >
            {t('iAmCompany', "I'm a Company")}
          </h3>
          <p className="text-center text-gray-600 mb-8 text-lg">
            {t(
              'companyDescription',
              'Looking to hire talent, post projects, or collaborate with skilled professionals'
            )}
          </p>
          <Button
            variant="default"
            size="lg"
            className="w-full mt-auto text-lg py-6"
            style={{
              backgroundColor: colors.primary[600],
              borderColor: colors.primary[600],
            }}
          >
            {t('continueAsCompany', 'Continue as Company')}
          </Button>
        </CardContent>
      </Card>

      {/* Candidate Card */}
      <Card
        className={cn(
          'cursor-pointer border-2 hover:border-purple-500 shadow-md hover:shadow-xl transition-all',
          'h-full flex flex-col bg-white/80 backdrop-blur-sm'
        )}
        style={{ borderColor: colors.secondary[100] }}
        onClick={() => onRoleSelect('candidate')}
      >
        <CardContent className="flex flex-col items-center justify-center p-10 h-full">
          <div className="rounded-full p-6 mb-6" style={{ backgroundColor: colors.secondary[100] }}>
            <User className="h-16 w-16" style={{ color: colors.secondary[600] }} />
          </div>
          <h3
            className="text-3xl font-bold text-center mb-4"
            style={{ color: colors.secondary[700] }}
          >
            {t('iAmCandidate', "I'm a Candidate")}
          </h3>
          <p className="text-center text-gray-600 mb-8 text-lg">
            {t(
              'candidateDescription',
              'Looking for job opportunities, courses, or to showcase your skills to companies'
            )}
          </p>
          <Button
            variant="default"
            size="lg"
            className="w-full mt-auto text-lg py-6"
            style={{
              backgroundColor: colors.secondary[600],
              borderColor: colors.secondary[600],
            }}
          >
            {t('continueAsCandidate', 'Continue as Candidate')}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default RoleSelector;
