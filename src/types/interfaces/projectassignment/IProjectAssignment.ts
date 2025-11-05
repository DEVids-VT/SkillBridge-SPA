import { ISkill } from '../skill/ISkill';

export interface IProjectAssignment {
  id: string;
  title: string;
  description: string;
  summary: string;
  learningBenefits: string;
  suggestedApproach: string;
  level: number;
  duration: string;
  status: number;
  companyId: string;
  companyName: string;
  companySector?: string;
  skills: ISkill[];
  createdAt: string;
  updatedAt: string;
}
