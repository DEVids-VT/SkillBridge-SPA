// TypeScript models mirroring backend CandidateRequirementsRequest and related enums

export type ExperienceLevel =
  | 'EntryLevel'
  | 'Junior'
  | 'MidLevel'
  | 'Senior'
  | 'Lead'
  | 'Executive'
  | 'Intern';

export type EducationLevel =
  | 'None'
  | 'HighSchool'
  | 'Vocational'
  | 'AssociateDegree'
  | 'BachelorsDegree'
  | 'MastersDegree'
  | 'Doctorate'
  | 'Professional';

export type CompetencyType =
  | 'Technical'
  | 'Functional'
  | 'Leadership'
  | 'Communication'
  | 'Analytical'
  | 'Creative'
  | 'ProjectManagement'
  | 'CustomerService'
  | 'Financial'
  | 'Regulatory'
  | 'Industry'
  | 'Language'
  | 'Software'
  | 'Hardware'
  | 'Process'
  | 'Safety'
  | 'Quality'
  | 'Other';

export type ProficiencyLevel =
  | 'Beginner'
  | 'Intermediate'
  | 'Advanced'
  | 'Expert'
  | 'Master';

export type ImportanceLevel = 'Low' | 'Medium' | 'High' | 'Critical';

export interface CompetencyRequirement {
  name: string;
  type: CompetencyType;
  requiredLevel: ProficiencyLevel;
  description: string;
  isMandatory: boolean;
}

export interface WorkCondition {
  type: string; // Remote, Travel, Shift, Physical
  description: string;
  isRequired: boolean;
}

export interface PersonalityTrait {
  traitName: string;
  description: string;
  importance: ImportanceLevel;
}

export interface CandidateRequirementsRequest {
  positionTitle: string;
  departmentOrArea: string;
  companyIndustry: string;
  experienceLevel: ExperienceLevel;
  minExperienceYears: number;
  maxExperienceYears?: number | null;
  minEducationLevel: EducationLevel;
  preferredEducationFields: string[];
  requiredCertifications: string[];
  preferredCertifications: string[];
  requiredCompetencies: CompetencyRequirement[];
  preferredCompetencies: CompetencyRequirement[];
  workConditions: WorkCondition[];
  languageRequirements: string[];
  positionSummary: string;
  idealCandidateProfile: string;
  keyResponsibilities: string[];
  desiredPersonalityTraits: PersonalityTrait[];
  cultureFitDescription: string;
  customCriteria: Record<string, unknown>;
  // Extra field allowing the caller to specify desired output (not part of C# model but used by API)
  outputType?: 'scenario' | 'quiz';
}

export interface ScenarioResponse {
  id: string;
}



