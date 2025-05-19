import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useOnboarding } from '@/components/onboarding/OnboardingContext';

export function DashboardPage() {
  const { t } = useTranslation();
  const { onboardingData } = useOnboarding();

  const isCompany = onboardingData.role === 'company';
  const userName = isCompany
    ? onboardingData.company?.companyName
    : onboardingData.candidate?.fullName;

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">
        {t('dashboardWelcome', 'Welcome to your dashboard')}, {userName}!
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Overview card */}
        <Card>
          <CardHeader>
            <CardTitle>{t('overview', 'Overview')}</CardTitle>
            <CardDescription>
              {isCompany
                ? t('companyOverviewDesc', 'Your company profile and activity')
                : t('candidateOverviewDesc', 'Your profile and opportunities')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>{t('profileCompleted', 'Profile completed')}</p>
            {/* This would typically have dashboard stats and metrics */}
          </CardContent>
        </Card>

        {/* Recent activity card */}
        <Card>
          <CardHeader>
            <CardTitle>{t('recentActivity', 'Recent Activity')}</CardTitle>
            <CardDescription>{t('recentActivityDesc', 'Your latest interactions')}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              {t('noRecentActivity', 'No recent activity to display.')}
            </p>
            {/* This would typically have a list of recent activities */}
          </CardContent>
        </Card>

        {/* Recommendations card */}
        <Card>
          <CardHeader>
            <CardTitle>
              {isCompany
                ? t('candidateRecommendations', 'Candidate Recommendations')
                : t('jobRecommendations', 'Job Recommendations')}
            </CardTitle>
            <CardDescription>
              {isCompany
                ? t('candidateRecommendationsDesc', 'Potential matches for your needs')
                : t('jobRecommendationsDesc', 'Opportunities that match your skills')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              {t('comingSoon', `Coming soon - We're building this feature!`)}
            </p>
            {/* This would typically have a list of recommendations */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default DashboardPage;
