import { useMutation, useQuery } from '@tanstack/react-query';
import { axiosInstance } from '@/components/axios-interceptor/AxiosInterceptor';
import {
  CandidateRequirementsRequest,
  ScenarioResponse,
  CompetencyRequirement,
  ExperienceLevel,
  EducationLevel,
  CompetencyType,
  ProficiencyLevel,
  ImportanceLevel,
  PersonalityTrait,
} from '@/types/candidate/requirements';
import { CompanyProfileData } from '@/pages/company/hooks/useCompanyProfile';

// Fetch company profile data to get the company ID
const fetchCompanyProfile = async (): Promise<CompanyProfileData> => {
  const response = await axiosInstance.get('/c/my');
  return response.data;
};

export const useCreateScenario = () => {
  const { data: companyData, isLoading: isLoadingCompany } = useQuery<CompanyProfileData, Error>({
    queryKey: ['companyProfile'],
    queryFn: fetchCompanyProfile,
    staleTime: 60 * 1000,
  });

  // Map string enums to backend numeric enum values
  const mapExperienceLevel = (value: ExperienceLevel): number => (
    {
      EntryLevel: 0,
      Junior: 1,
      MidLevel: 2,
      Senior: 3,
      Lead: 4,
      Executive: 5,
      Intern: 6,
    }[value]
  );

  const mapEducationLevel = (value: EducationLevel): number => (
    {
      None: 0,
      HighSchool: 1,
      Vocational: 2,
      AssociateDegree: 3,
      BachelorsDegree: 4,
      MastersDegree: 5,
      Doctorate: 6,
      Professional: 7,
    }[value]
  );

  const mapCompetencyType = (value: CompetencyType): number => (
    {
      Technical: 0,
      Functional: 1,
      Leadership: 2,
      Communication: 3,
      Analytical: 4,
      Creative: 5,
      ProjectManagement: 6,
      CustomerService: 7,
      Financial: 8,
      Regulatory: 9,
      Industry: 10,
      Language: 11,
      Software: 12,
      Hardware: 13,
      Process: 14,
      Safety: 15,
      Quality: 16,
      Other: 17,
    }[value]
  );

  const mapProficiencyLevel = (value: ProficiencyLevel): number => (
    {
      Beginner: 0,
      Intermediate: 1,
      Advanced: 2,
      Expert: 3,
      Master: 4,
    }[value]
  );

  const mapImportanceLevel = (value: ImportanceLevel): number => (
    {
      Low: 0,
      Medium: 1,
      High: 2,
      Critical: 3,
    }[value]
  );

  interface BackendCompetencyRequirement extends Omit<CompetencyRequirement, 'type' | 'requiredLevel'> {
    type: number;
    requiredLevel: number;
  }

  interface BackendPersonalityTrait extends Omit<PersonalityTrait, 'importance'> {
    importance: number;
  }

  interface BackendCandidateRequirementsRequest extends Omit<
    CandidateRequirementsRequest,
    'experienceLevel' | 'minEducationLevel' | 'requiredCompetencies' | 'preferredCompetencies' | 'desiredPersonalityTraits' | 'outputType'
  > {
    experienceLevel: number;
    minEducationLevel: number;
    requiredCompetencies: BackendCompetencyRequirement[];
    preferredCompetencies: BackendCompetencyRequirement[];
    desiredPersonalityTraits: BackendPersonalityTrait[];
  }

  const mapToBackendRequest = (
    request: CandidateRequirementsRequest
  ): BackendCandidateRequirementsRequest => {
    return {
      positionTitle: request.positionTitle,
      departmentOrArea: request.departmentOrArea,
      companyIndustry: request.companyIndustry,
      experienceLevel: mapExperienceLevel(request.experienceLevel),
      minExperienceYears: request.minExperienceYears,
      maxExperienceYears: request.maxExperienceYears ?? null,
      minEducationLevel: mapEducationLevel(request.minEducationLevel),
      preferredEducationFields: request.preferredEducationFields,
      requiredCertifications: request.requiredCertifications,
      preferredCertifications: request.preferredCertifications,
      requiredCompetencies: request.requiredCompetencies.map((c) => ({
        name: c.name,
        type: mapCompetencyType(c.type),
        requiredLevel: mapProficiencyLevel(c.requiredLevel),
        description: c.description,
        isMandatory: c.isMandatory,
      })),
      preferredCompetencies: request.preferredCompetencies.map((c) => ({
        name: c.name,
        type: mapCompetencyType(c.type),
        requiredLevel: mapProficiencyLevel(c.requiredLevel),
        description: c.description,
        isMandatory: c.isMandatory,
      })),
      workConditions: request.workConditions,
      languageRequirements: request.languageRequirements,
      positionSummary: request.positionSummary,
      idealCandidateProfile: request.idealCandidateProfile,
      keyResponsibilities: request.keyResponsibilities,
      desiredPersonalityTraits: request.desiredPersonalityTraits.map((p) => ({
        traitName: p.traitName,
        description: p.description,
        importance: mapImportanceLevel(p.importance),
      })),
      cultureFitDescription: request.cultureFitDescription,
      customCriteria: request.customCriteria,
    };
  };

  return useMutation<ScenarioResponse, Error, CandidateRequirementsRequest>({
    mutationFn: async (payload) => {
      if (isLoadingCompany || !companyData) {
        throw new Error('Company data is not available yet');
      }

      const companyId = companyData.id;
      if (!companyId) {
        throw new Error('Company ID is missing');
      }
      // Map enums to numeric values expected by backend and send in body
      const { outputType: _omitOutputType, ...request } = payload as CandidateRequirementsRequest & { outputType?: 'scenario' | 'quiz' };
      const mapped = mapToBackendRequest(request as CandidateRequirementsRequest);
      const response = await axiosInstance.post<ScenarioResponse>(`/g/${companyId}`, mapped, {
        headers: { 'Content-Type': 'application/json' },
      });
      return response.data;
    },
  });
};



