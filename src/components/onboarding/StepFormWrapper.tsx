import React, { ReactNode } from 'react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';

interface StepFormWrapperProps {
  children: ReactNode;
  title: string;
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrev: () => void;
  isNextDisabled?: boolean;
  isLastStep?: boolean;
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
}: StepFormWrapperProps) {
  const { t } = useTranslation();
  const progress = (currentStep / totalSteps) * 100;

  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <div className="mt-2">
          <div className="flex justify-between text-sm text-muted-foreground mb-1">
            <span>
              {t('step', 'Step')} {currentStep} {t('of', 'of')} {totalSteps}
            </span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} />
        </div>
      </CardHeader>

      <CardContent>{children}</CardContent>

      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onPrev} disabled={currentStep === 1}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t('previous', 'Previous')}
        </Button>

        <Button onClick={onNext} disabled={isNextDisabled}>
          {isLastStep ? (
            <>
              {t('complete', 'Complete')}
              <Check className="ml-2 h-4 w-4" />
            </>
          ) : (
            <>
              {t('next', 'Next')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default StepFormWrapper;
