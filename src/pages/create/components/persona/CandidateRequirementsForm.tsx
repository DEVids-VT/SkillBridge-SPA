import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { colors } from '@/lib/design-system';
import { BasicInfoTab } from './BasicInfoTab';
import { SkillsTab } from './SkillsTab';
import { DetailsTab } from './DetailsTab';
import type {
  CompetencyRequirement,
  WorkCondition,
  PersonalityTrait,
  ExperienceLevel,
  EducationLevel,
} from '@/types/candidate/requirements';

export interface CandidateRequirementsFormState {
  positionTitle: string;
  departmentOrArea: string;
  companyIndustry: string;
  experienceLevel: ExperienceLevel | '';
  minExperienceYears: string;
  maxExperienceYears: string;
  minEducationLevel: EducationLevel | '';
  preferredEducationFields: string; // CSV
  requiredCertifications: string; // CSV
  preferredCertifications: string; // CSV
  requiredCompetencies: CompetencyRequirement[];
  preferredCompetencies: CompetencyRequirement[];
  workConditions: WorkCondition[];
  languageRequirements: string; // CSV
  positionSummary: string;
  idealCandidateProfile: string;
  keyResponsibilities: string; // CSV
  desiredPersonalityTraits: PersonalityTrait[];
  cultureFitDescription: string;
  customCriteria: { key: string; value: string }[];
}

export interface CandidateRequirementsFormErrors {
  positionTitle?: string;
  experienceLevel?: string;
  minExperienceYears?: string;
  minEducationLevel?: string;
  positionSummary?: string;
}

interface CandidateRequirementsFormProps {
  formData: CandidateRequirementsFormState;
  errors: CandidateRequirementsFormErrors;
  onFieldChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onCSVChange: (name: keyof Pick<CandidateRequirementsFormState,
    'preferredEducationFields' | 'requiredCertifications' | 'preferredCertifications' | 'languageRequirements' | 'keyResponsibilities'>, value: string) => void;
  onSelectChange: (name: 'experienceLevel' | 'minEducationLevel', value: string) => void;
  onUpdateRequiredCompetencies: (list: CompetencyRequirement[]) => void;
  onUpdatePreferredCompetencies: (list: CompetencyRequirement[]) => void;
  onUpdateWorkConditions: (list: WorkCondition[]) => void;
  onUpdatePersonalityTraits: (list: PersonalityTrait[]) => void;
  onUpdateCustomCriteria: (list: { key: string; value: string }[]) => void;
}

const TAB_ORDER = ['basic', 'skills', 'details'] as const;
type TabValue = typeof TAB_ORDER[number];

export function CandidateRequirementsForm(props: CandidateRequirementsFormProps) {
  const { t } = useTranslation('createProject');
  const {
    formData,
    errors,
    onFieldChange,
    onCSVChange,
    onSelectChange,
    onUpdateRequiredCompetencies,
    onUpdatePreferredCompetencies,
    onUpdateWorkConditions,
    onUpdatePersonalityTraits,
    onUpdateCustomCriteria,
  } = props;

  const [activeTab, setActiveTab] = React.useState<TabValue>('basic');
  const formContainerRef = React.useRef<HTMLDivElement>(null);

  const currentTabIndex = TAB_ORDER.indexOf(activeTab);
  const canGoNext = currentTabIndex < TAB_ORDER.length - 1;
  const canGoPrevious = currentTabIndex > 0;

  const scrollToTop = () => {
    // Use ref for better performance and reliability
    if (formContainerRef.current) {
      formContainerRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    } else {
      // Fallback: scroll to top of page
      window.scrollTo({ 
        top: 0, 
        behavior: 'smooth' 
      });
    }
  };

  const handleNext = () => {
    if (canGoNext) {
      setActiveTab(TAB_ORDER[currentTabIndex + 1]);
      // Small delay to ensure tab content has rendered
      setTimeout(() => {
        scrollToTop();
      }, 100);
    }
  };

  const handlePrevious = () => {
    if (canGoPrevious) {
      setActiveTab(TAB_ORDER[currentTabIndex - 1]);
      // Small delay to ensure tab content has rendered
      setTimeout(() => {
        scrollToTop();
      }, 100);
    }
  };

  const getTabTitle = (tab: TabValue) => {
    switch(tab) {
      case 'basic': return t('createPersonaPage.form.tabs.basic');
      case 'skills': return t('createPersonaPage.form.tabs.skills');
      case 'details': return t('createPersonaPage.form.tabs.details');
      default: return '';
    }
  };

  const getTabDescription = (tab: TabValue) => {
    switch(tab) {
      case 'basic': return t('createPersonaPage.form.tabs.basicDescription');
      case 'skills': return t('createPersonaPage.form.tabs.skillsDescription');
      case 'details': return t('createPersonaPage.form.tabs.detailsDescription');
      default: return '';
    }
  };

  return (
    <div className="space-y-6" ref={formContainerRef} data-form-container>
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as TabValue)} className="w-full">
        {/* Progress indicator */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            {TAB_ORDER.map((tab, index) => (
              <div key={tab} className="flex items-center">
                            <div 
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                index <= currentTabIndex 
                  ? "text-white" 
                  : "text-gray-400"
              )}
              style={{
                backgroundColor: index <= currentTabIndex ? colors.accent : colors.borderLight
              }}
            >
              {index + 1}
            </div>
            {index < TAB_ORDER.length - 1 && (
              <div 
                className="w-12 h-1 mx-2 transition-colors"
                style={{
                  backgroundColor: index < currentTabIndex ? colors.accent : colors.borderLight
                }}
              />
            )}
          </div>
            ))}
          </div>
          <div className="text-sm" style={{ color: colors.textMuted }}>
            {t('createPersonaPage.form.stepCounter', { current: currentTabIndex + 1, total: TAB_ORDER.length })}
          </div>
          </div>

        {/* Tab List - Hidden but keeping for accessibility */}
        <TabsList className="hidden">
          <TabsTrigger value="basic">{getTabTitle('basic')}</TabsTrigger>
          <TabsTrigger value="skills">{getTabTitle('skills')}</TabsTrigger>
          <TabsTrigger value="details">{getTabTitle('details')}</TabsTrigger>
        </TabsList>

        {/* Tab Content */}
        <TabsContent value="basic" className="space-y-6 mt-0">
          <BasicInfoTab
            formData={formData}
            errors={errors}
            onFieldChange={onFieldChange}
            onSelectChange={onSelectChange}
            title={getTabTitle('basic')}
            description={getTabDescription('basic')}
          />
        </TabsContent>

        <TabsContent value="skills" className="space-y-6 mt-0">
          <SkillsTab
            formData={formData}
            onCSVChange={onCSVChange}
            onUpdateRequiredCompetencies={onUpdateRequiredCompetencies}
            onUpdatePreferredCompetencies={onUpdatePreferredCompetencies}
            onUpdateWorkConditions={onUpdateWorkConditions}
            title={getTabTitle('skills')}
            description={getTabDescription('skills')}
          />
        </TabsContent>

        <TabsContent value="details" className="space-y-6 mt-0">
          <DetailsTab
            formData={formData}
            errors={errors}
            onFieldChange={onFieldChange}
            onCSVChange={onCSVChange}
            onUpdatePersonalityTraits={onUpdatePersonalityTraits}
            onUpdateCustomCriteria={onUpdateCustomCriteria}
            title={getTabTitle('details')}
            description={getTabDescription('details')}
          />
        </TabsContent>
      </Tabs>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-6 border-t" style={{ borderColor: colors.border }}>
        <Button
          onClick={handlePrevious}
          disabled={!canGoPrevious}
          variant="outline"
          className="border text-white hover:opacity-80"
          style={{ 
            backgroundColor: colors.surface, 
            borderColor: colors.border,
            color: colors.text
          }}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          {t('createPersonaPage.form.navigation.previous')}
        </Button>
        
        <div className="text-sm" style={{ color: colors.textMuted }}>
          {getTabTitle(activeTab)}
        </div>

        <Button
          onClick={handleNext}
          disabled={!canGoNext}
          className="text-white hover:opacity-80"
          style={{ 
            backgroundColor: colors.accent,
            color: colors.text
          }}
        >
          {t('createPersonaPage.form.navigation.next')}
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
        </div>
      </div>
  );
}



export default CandidateRequirementsForm;


