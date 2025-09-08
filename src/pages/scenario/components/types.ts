export interface ScenarioData {
  id: string;
  title: string;
  description: string;
  roleTitle: string;
  seniorityLevel: string;
  estimatedDuration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  objectives: string[];
  scenario: string;
  requirements: string[];
  evaluationCriteria: string[];
  createdAt: string;
  status: 'draft' | 'published' | 'archived';
}
