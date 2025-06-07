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
  const { t } = useTranslation();
  const progress = (currentStep / totalSteps) * 100;
  return (
    <Card className="w-full max-w-3xl mx-auto shadow-lg bg-white/95 backdrop-blur-sm border-0">
      <CardHeader className="pb-5">
        <CardTitle className="text-2xl" style={{ color: colors.neutral[800] }}>
          {title}
        </CardTitle>
        <div className="mt-3">
          <div className="flex justify-between text-sm mb-1">
            <span style={{ color: colors.neutral[600] }}>
              {t('step', 'Step')} {currentStep} {t('of', 'of')} {totalSteps}
            </span>
            <span
              style={{
                color: currentStep === totalSteps ? colors.primary[600] : colors.neutral[600],
              }}
            >
              {Math.round(progress)}%
            </span>
          </div>
          <Progress
            value={progress}
            className="h-2"
            style={{
              backgroundColor: colors.neutral[200],
            }}
          />
        </div>
      </CardHeader>

      <CardContent className="pt-3">{children}</CardContent>

      <CardFooter className="flex justify-between pt-6 pb-6">
        <Button
          variant="outline"
          onClick={currentStep === 1 && onBackToRoleSelection ? onBackToRoleSelection : onPrev}
          disabled={currentStep === 1 && !onBackToRoleSelection}
          className="gap-2 px-4"
          style={{ borderColor: colors.neutral[300] }}
        >
          <ArrowLeft className="h-4 w-4" />
          {currentStep === 1 && onBackToRoleSelection
            ? t('changeRole', 'Change Role')
            : t('previous', 'Previous')}
        </Button>{' '}
        <Button
          onClick={onNext}
          disabled={isNextDisabled || isLoading}
          className="gap-2 px-5"
          style={{
            backgroundColor: isLastStep ? colors.primary[600] : colors.primary[600],
            borderColor: isLastStep ? colors.primary[600] : colors.primary[600],
          }}
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              {t('processing', 'Processing...')}
            </>
          ) : isLastStep ? (
            <>
              {t('complete', 'Complete')}
              <Check className="h-4 w-4" />
            </>
          ) : (
            <>
              {t('next', 'Next')}
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default StepFormWrapper;
