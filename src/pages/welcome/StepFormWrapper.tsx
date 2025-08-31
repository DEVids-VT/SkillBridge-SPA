import React, { ReactNode } from 'react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, ArrowRight, Check, Loader2 } from 'lucide-react';
import { colors } from '@/lib/design-system';

interface StepFormWrapperProps {
  children: ReactNode;
  title: string;
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrev: () => void;
  isNextDisabled?: boolean;
  isLastStep?: boolean;
  isLoading?: boolean;
  onBackToRoleSelection?: () => void;
}

export function StepFormWrapper({
  children,
  title,
  currentStep,
  totalSteps,
  onNext,
  onPrev,
  isNextDisabled = false,
  isLastStep = false,
  isLoading = false,
  onBackToRoleSelection,
}: StepFormWrapperProps) {
  const { t } = useTranslation('welcome');
  const progress = (currentStep / totalSteps) * 100;
  return (
    <Card
      className="w-full max-w-3xl mx-auto shadow-lg border"
      style={{ backgroundColor: colors.blueDark, borderColor: colors.blue }}
    >
      <CardHeader className="pb-5">
        <CardTitle className="text-2xl" style={{ color: colors.white }}>
          {title}
        </CardTitle>
        <div className="mt-3">
          <div className="flex justify-between text-sm mb-1">
            <span style={{ color: colors.textSecondary }}>
              {t('welcome.stepForm.step')} {currentStep} {t('welcome.stepForm.of')} {totalSteps}
            </span>
            <span
              style={{
                color: currentStep === totalSteps ? colors.yellow : colors.white,
              }}
            >
              {Math.round(progress)}%
            </span>
          </div>
          <Progress
            value={progress}
            className="h-2"
            trackColor={colors.blue}
            indicatorColor={colors.yellow}
          />
        </div>
      </CardHeader>

      <CardContent className="pt-3" style={{ color: colors.textSecondary }}>
        {children}
      </CardContent>

      <CardFooter className="flex justify-between pt-6 pb-6">
        <Button
          variant="outline"
          onClick={currentStep === 1 && onBackToRoleSelection ? onBackToRoleSelection : onPrev}
          disabled={currentStep === 1 && !onBackToRoleSelection}
          className="gap-2 px-4 hover:opacity-90"
          style={{ borderColor: colors.blue, color: colors.white, backgroundColor: 'transparent' }}
        >
          <ArrowLeft className="h-4 w-4" />
          {currentStep === 1 && onBackToRoleSelection
            ? t('welcome.stepForm.changeRole')
            : t('welcome.stepForm.previous')}
        </Button>{' '}
        <Button
          onClick={onNext}
          disabled={isNextDisabled || isLoading}
          className="gap-2 px-5 hover:opacity-90"
          style={{ backgroundColor: colors.orange, color: colors.blueDark, borderColor: colors.orange }}
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              {t('welcome.stepForm.processing')}
            </>
          ) : isLastStep ? (
            <>
              {t('welcome.stepForm.complete')}
              <Check className="h-4 w-4" />
            </>
          ) : (
            <>
              {t('welcome.stepForm.next')}
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default StepFormWrapper;
