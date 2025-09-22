import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '@/components/axios-interceptor/AxiosInterceptor';
import { useCompanyProfile } from '@/pages/company/hooks/useCompanyProfile';

// Update task request interface
export interface UpdateTaskRequest {
  title: string;
  description: string;
  isCompleted: boolean;
  sequence: number;
}

// Create task request interface
export interface CreateTaskRequest {
  title: string;
  description: string;
  isCompleted: boolean;
  sequence: number;
}

// Task response interface
export interface TaskResponse {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  sequence: number;
  projectAssignmentId: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Creates a task via POST /api/p/{projectId}/tasks
 */
const createTask = async (params: {
  projectId: string;
  data: CreateTaskRequest;
}): Promise<TaskResponse> => {
  const response = await axiosInstance.post(`/p/${params.projectId}/tasks`, params.data, {
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

/**
 * Updates a task via PUT /api/p/{projectId}/tasks/{taskId}
 */
const updateTask = async (params: {
  projectId: string;
  taskId: string;
  data: UpdateTaskRequest;
}): Promise<TaskResponse> => {
  const response = await axiosInstance.put(
    `/p/${params.projectId}/tasks/${params.taskId}`,
    params.data,
    {
      headers: { 'Content-Type': 'application/json' },
    }
  );
  return response.data;
};

/**
 * Deletes a task via DELETE /api/p/{projectId}/tasks/{taskId}
 */
const deleteTask = async (params: { projectId: string; taskId: string }): Promise<void> => {
  await axiosInstance.delete(`/p/${params.projectId}/tasks/${params.taskId}`);
};

/**
 * Hook to create a task
 */
export const useCreateTask = () => {
  const queryClient = useQueryClient();
  const { data: companyData } = useCompanyProfile();

  return useMutation<TaskResponse, Error, { projectId: string; data: CreateTaskRequest }>({
    mutationFn: createTask,
    onSuccess: (newTask, variables) => {
      // Update the project detail cache
      queryClient.setQueryData(['project', variables.projectId], (oldData: any) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          tasks: [...(oldData.tasks || []), newTask],
        };
      });

      // Update company projects cache if available
      if (companyData?.id) {
        queryClient.setQueryData(
          ['companyProjects', companyData.id],
          (oldData: any[] | undefined) => {
            if (!oldData) return oldData;
            return oldData.map((project) =>
              project.id === variables.projectId
                ? {
                    ...project,
                    tasks: [...(project.tasks || []), newTask],
                  }
                : project
            );
          }
        );
      }

      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: ['project', variables.projectId] });
      if (companyData?.id) {
        queryClient.invalidateQueries({ queryKey: ['companyProjects', companyData.id] });
      }
    },
  });
};

/**
 * Hook to update a task
 */
export const useUpdateTask = () => {
  const queryClient = useQueryClient();
  const { data: companyData } = useCompanyProfile();

  return useMutation<
    TaskResponse,
    Error,
    { projectId: string; taskId: string; data: UpdateTaskRequest }
  >({
    mutationFn: updateTask,
    onSuccess: (updatedTask, variables) => {
      // Update the project detail cache
      queryClient.setQueryData(['project', variables.projectId], (oldData: any) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          tasks:
            oldData.tasks?.map((task: any) =>
              task.id === variables.taskId ? updatedTask : task
            ) || [],
        };
      });

      // Update company projects cache if available
      if (companyData?.id) {
        queryClient.setQueryData(
          ['companyProjects', companyData.id],
          (oldData: any[] | undefined) => {
            if (!oldData) return oldData;
            return oldData.map((project) =>
              project.id === variables.projectId
                ? {
                    ...project,
                    tasks:
                      project.tasks?.map((task: any) =>
                        task.id === variables.taskId ? updatedTask : task
                      ) || [],
                  }
                : project
            );
          }
        );
      }

      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: ['project', variables.projectId] });
      if (companyData?.id) {
        queryClient.invalidateQueries({ queryKey: ['companyProjects', companyData.id] });
      }
    },
  });
};

/**
 * Hook to delete a task
 */
export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  const { data: companyData } = useCompanyProfile();

  return useMutation<void, Error, { projectId: string; taskId: string }>({
    mutationFn: deleteTask,
    onSuccess: (_, variables) => {
      // Update the project detail cache
      queryClient.setQueryData(['project', variables.projectId], (oldData: any) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          tasks: oldData.tasks?.filter((task: any) => task.id !== variables.taskId) || [],
        };
      });

      // Update company projects cache if available
      if (companyData?.id) {
        queryClient.setQueryData(
          ['companyProjects', companyData.id],
          (oldData: any[] | undefined) => {
            if (!oldData) return oldData;
            return oldData.map((project) =>
              project.id === variables.projectId
                ? {
                    ...project,
                    tasks: project.tasks?.filter((task: any) => task.id !== variables.taskId) || [],
                  }
                : project
            );
          }
        );
      }

      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: ['project', variables.projectId] });
      if (companyData?.id) {
        queryClient.invalidateQueries({ queryKey: ['companyProjects', companyData.id] });
      }
    },
  });
};
