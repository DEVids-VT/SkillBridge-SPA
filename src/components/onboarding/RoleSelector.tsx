import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Building2, User } from 'lucide-react';
import { UserRole } from '@/types/user/UserOnboarding';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface RoleSelectorProps {
  onRoleSelect: (role: UserRole) => void;
}

export function RoleSelector({ onRoleSelect }: RoleSelectorProps) {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full max-w-4xl">
      {' '}
      {/* Company Card */}
      <Card
        className={cn(
          'cursor-pointer border-2 hover:border-blue-500 hover:shadow-lg transition-all',
          'h-full flex flex-col role-card'
        )}
        onClick={() => onRoleSelect('company')}
      >
        <CardContent className="flex flex-col items-center justify-center p-8 h-full">
          <Building2 className="h-16 w-16 text-blue-500 mb-4" />
          <h3 className="text-2xl font-bold text-center mb-3">
            {t('iAmCompany', "I'm a Company")}
          </h3>
          <p className="text-center text-muted-foreground mb-6">
            {t(
              'companyDescription',
              'Looking to hire talent, post projects, or collaborate with skilled professionals'
            )}
          </p>
          <Button variant="default" size="lg" className="w-full mt-auto">
            {t('continueAsCompany', 'Continue as Company')}
          </Button>
        </CardContent>
      </Card>{' '}
      {/* Candidate Card */}
      <Card
        className={cn(
          'cursor-pointer border-2 hover:border-green-500 hover:shadow-lg transition-all',
          'h-full flex flex-col role-card'
        )}
        onClick={() => onRoleSelect('candidate')}
      >
        <CardContent className="flex flex-col items-center justify-center p-8 h-full">
          <User className="h-16 w-16 text-green-500 mb-4" />
          <h3 className="text-2xl font-bold text-center mb-3">
            {t('iAmCandidate', "I'm a Candidate")}
          </h3>
          <p className="text-center text-muted-foreground mb-6">
            {t(
              'candidateDescription',
              'Looking for job opportunities, courses, or to showcase your skills to companies'
            )}
          </p>
          <Button
            variant="default"
            size="lg"
            className="w-full mt-auto bg-green-600 hover:bg-green-700"
          >
            {t('continueAsCandidate', 'Continue as Candidate')}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default RoleSelector;
