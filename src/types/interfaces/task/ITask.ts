export interface ITask {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  sequence: number;
  projectAssignmentId: string;
  createdAt: string;
  updatedAt: string;
}
