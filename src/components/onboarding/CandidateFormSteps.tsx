import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import StepFormWrapper from './StepFormWrapper';
import { useOnboarding } from './OnboardingContext';
import { RoutePage } from '@/types/enums/RoutePage';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

// Skills/interests areas
const skillAreas = [
  'Web Development',
  'Mobile Development',
  'UI/UX Design',
  'Data Science',
  'Machine Learning',
  'DevOps',
  'Cloud Computing',
  'Cybersecurity',
  'Project Management',
  'Digital Marketing',
  'Content Creation',
  'Blockchain',
  'Game Development',
  'IoT',
  'AR/VR',
];

export function CandidateFormSteps() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { updateCandidateData, onboardingData, completeOnboarding } = useOnboarding();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;
  const [selectedSkills, setSelectedSkills] = useState<string[]>(
    onboardingData.candidate?.areaOfInterest || []
  );
  const [skillInput, setSkillInput] = useState('');

  // Form validation states
  const [errors, setErrors] = useState({
    fullName: false,
    dateOfBirth: false,
    areaOfInterest: false,
  });

  // Form data from context
  const formData = onboardingData.candidate || {
    fullName: '',
    dateOfBirth: '',
    cv: null,
    areaOfInterest: [],
  };

  // Handle form field changes
  const handleChange = (field: string, value: string) => {
    updateCandidateData({ [field]: value });

    // Clear error for the field being edited
    if (errors[field as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [field]: false }));
    }
  };

  // Handle file upload for CV
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      updateCandidateData({ cv: event.target.files[0] });
    }
  };

  // Handle adding a skill/interest area
  const handleAddSkill = (skill: string) => {
    if (!selectedSkills.includes(skill)) {
      const newSkills = [...selectedSkills, skill];
      setSelectedSkills(newSkills);
      updateCandidateData({ areaOfInterest: newSkills });

      // Clear error if any
      if (errors.areaOfInterest) {
        setErrors((prev) => ({ ...prev, areaOfInterest: false }));
      }
    }
    setSkillInput('');
  };

  // Handle removing a skill/interest area
  const handleRemoveSkill = (skill: string) => {
    const newSkills = selectedSkills.filter((s) => s !== skill);
    setSelectedSkills(newSkills);
    updateCandidateData({ areaOfInterest: newSkills });
  };

  // Filter skills based on input
  const filteredSkills = skillInput
    ? skillAreas.filter(
        (skill) =>
          skill.toLowerCase().includes(skillInput.toLowerCase()) && !selectedSkills.includes(skill)
      )
    : [];

  // Validate current step
  const validateStep = () => {
    let isValid = true;
    const newErrors = { ...errors };

    if (currentStep === 1) {
      if (!formData.fullName.trim()) {
        newErrors.fullName = true;
        isValid = false;
      }
    } else if (currentStep === 2) {
      if (!formData.dateOfBirth) {
        newErrors.dateOfBirth = true;
        isValid = false;
      }
    } else if (currentStep === 3) {
      if (selectedSkills.length === 0) {
        newErrors.areaOfInterest = true;
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle next step
  const handleNext = () => {
    if (validateStep()) {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
      } else {
        // Complete onboarding on final step
        completeOnboarding();
        navigate(RoutePage.DASHBOARD);
      }
    }
  };

  // Handle previous step
  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Render form step content based on current step
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">
                {t('fullName', 'Full Name')}
                <span className="text-red-500 ml-1">*</span>
              </Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) => handleChange('fullName', e.target.value)}
                className={errors.fullName ? 'border-red-500' : ''}
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">
                  {t('fullNameRequired', 'Full name is required')}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">
                {t('shortBio', 'Short Bio')} ({t('optional', 'optional')})
              </Label>
              <Textarea
                id="bio"
                placeholder={t('bioPlaceholder', 'Tell us a little about yourself...')}
                rows={3}
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">
                {t('dateOfBirth', 'Date of Birth')}
                <span className="text-red-500 ml-1">*</span>
              </Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => handleChange('dateOfBirth', e.target.value)}
                className={errors.dateOfBirth ? 'border-red-500' : ''}
              />
              {errors.dateOfBirth && (
                <p className="text-red-500 text-sm mt-1">
                  {t('dobRequired', 'Date of birth is required')}
                </p>
              )}
            </div>

            <div className="space-y-2 mt-4">
              <Label htmlFor="cv">
                {t('uploadCV', 'Upload your CV')} ({t('optional', 'optional')})
              </Label>
              <Input id="cv" type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} />
              <p className="text-sm text-muted-foreground mt-1">
                {t('cvHelp', 'Accepted formats: PDF, DOC, DOCX (max 5MB)')}
              </p>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>
                {t('areasOfInterest', 'Areas of Interest')}
                <span className="text-red-500 ml-1">*</span>
              </Label>
              <div className="relative">
                <Input
                  placeholder={t('searchSkills', 'Search or select skills')}
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  className={errors.areaOfInterest ? 'border-red-500' : ''}
                />
                {skillInput && filteredSkills.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto">
                    {filteredSkills.map((skill) => (
                      <div
                        key={skill}
                        className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                        onClick={() => handleAddSkill(skill)}
                      >
                        {skill}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {errors.areaOfInterest && (
                <p className="text-red-500 text-sm mt-1">
                  {t('skillsRequired', 'Please select at least one area of interest')}
                </p>
              )}

              <div className="flex flex-wrap gap-2 mt-3">
                {selectedSkills.map((skill) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="px-3 py-1 flex items-center gap-1"
                  >
                    {skill}
                    <X
                      className="h-3 w-3 cursor-pointer hover:text-red-500"
                      onClick={() => handleRemoveSkill(skill)}
                    />
                  </Badge>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <h4 className="font-medium mb-2">{t('suggestedAreas', 'Suggested Areas')}</h4>
              <div className="flex flex-wrap gap-2">
                {skillAreas.slice(0, 8).map(
                  (skill) =>
                    !selectedSkills.includes(skill) && (
                      <Badge
                        key={skill}
                        variant="outline"
                        className="px-3 py-1 cursor-pointer hover:bg-gray-100"
                        onClick={() => handleAddSkill(skill)}
                      >
                        {skill}
                      </Badge>
                    )
                )}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <StepFormWrapper
      title={t('candidateProfileSetup', 'Candidate Profile Setup')}
      currentStep={currentStep}
      totalSteps={totalSteps}
      onNext={handleNext}
      onPrev={handlePrev}
      isLastStep={currentStep === totalSteps}
    >
      {renderStepContent()}
    </StepFormWrapper>
  );
}

export default CandidateFormSteps;
