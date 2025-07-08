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
    <Card className="w-full max-w-3xl mx-auto shadow-lg bg-[#001d3d] border border-[#003566]">
      <CardHeader className="pb-5">
        <CardTitle className="text-2xl text-white">{title}</CardTitle>
        <div className="mt-3">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-300">
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
            className="h-2 bg-[#003566]"
            style={{
              backgroundColor: colors.blue,
            }}
          />
        </div>
      </CardHeader>

      <CardContent className="pt-3 text-gray-200">{children}</CardContent>

      <CardFooter className="flex justify-between pt-6 pb-6">
        <Button
          variant="outline"
          onClick={currentStep === 1 && onBackToRoleSelection ? onBackToRoleSelection : onPrev}
          disabled={currentStep === 1 && !onBackToRoleSelection}
          className="gap-2 px-4 border-[#003566] text-white hover:bg-[#003566]"
        >
          <ArrowLeft className="h-4 w-4" />
          {currentStep === 1 && onBackToRoleSelection
            ? t('welcome.stepForm.changeRole')
            : t('welcome.stepForm.previous')}
        </Button>{' '}
        <Button
          onClick={onNext}
          disabled={isNextDisabled || isLoading}
          className={`gap-2 px-5 bg-[#ffc300] text-[#001d3d] border-[#ffc300] hover:bg-[#ffd60a]`}
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
