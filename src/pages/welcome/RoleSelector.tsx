import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Building2, User } from 'lucide-react';
import { UserRole } from '@/types/user/UserOnboarding';

interface RoleSelectorProps {
  onRoleSelect: (role: UserRole) => void;
}

export function RoleSelector({ onRoleSelect }: RoleSelectorProps) {
  const { t } = useTranslation();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mx-auto">
      {/* Company Card */}
      <div
        className="cursor-pointer"
        onClick={() => onRoleSelect('company')}
      >
        <div className="relative flex flex-col items-center p-6 h-full min-h-[350px] bg-white/70 dark:bg-slate-800/50 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200/50 dark:border-slate-700/50">
          {/* Icon */}
          <div className="relative mb-6 p-4 bg-blue-50 rounded-2xl">
            <Building2 className="h-12 w-12 text-blue-600" />
          </div>
          
          {/* Content */}
          <div className="text-center flex-1 flex flex-col justify-center">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3">
              {t('iAmCompany', "I'm a Company")}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
              {t(
                'companyDescription',
                'Looking to hire talent, post projects, or collaborate with skilled professionals'
              )}
            </p>
          </div>
          
          {/* Button */}
          <Button
            size="default"
            className="w-full py-3 px-6 bg-blue-600 text-white font-medium rounded-lg shadow-lg border-0"
          >
            {t('continueAsCompany', 'Continue as Company')}
          </Button>
        </div>
      </div>

      {/* Candidate Card */}
      <div
        className="cursor-pointer"
        onClick={() => onRoleSelect('candidate')}
      >
        <div className="relative flex flex-col items-center p-6 h-full min-h-[350px] bg-white/70 dark:bg-slate-800/50 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200/50 dark:border-slate-700/50">
          {/* Icon */}
          <div className="relative mb-6 p-4 bg-blue-50 rounded-2xl">
            <User className="h-12 w-12 text-blue-600" />
          </div>
          
          {/* Content */}
          <div className="text-center flex-1 flex flex-col justify-center">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3">
              {t('iAmCandidate', "I'm a Candidate")}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
              {t(
                'candidateDescription',
                'Looking for job opportunities, courses, or to showcase your skills to companies'
              )}
            </p>
          </div>
          
          {/* Button */}
          <Button
            size="default"
            className="w-full py-3 px-6 bg-blue-600 text-white font-medium rounded-lg shadow-lg border-0"
          >
            {t('continueAsCandidate', 'Continue as Candidate')}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default RoleSelector;
