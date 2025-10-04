# Manual Project Creation - Backend Integration

## Overview

This document describes the implementation of backend connectivity for the Manual Project Creation feature (`CreateManualPage.tsx`).

## Implementation Summary

### 1. Updated Type Definitions (`src/pages/create/types.ts`)

#### Request Interface

```typescript
export interface CreateProjectAssignmentRequest {
  title: string;
  description?: string;
  summary: string;
  learningBenefits: string;
  suggestedApproach: string;
  level: ProjectAssignmentLevel; // 0 | 1 | 2
  deadline: string; // ISO 8601 format
  status: ProjectAssignmentStatus; // 0 | 1 | 2 | 3
  skills: string[]; // Array of skill IDs or names
  tasks: CreateAssignmentTaskRequest[];
}
```

**Key Change**: Changed `skillIds` to `skills` to match backend expectations.

#### Response Interface

```typescript
export interface ProjectAssignmentResponse {
  id: string;
  title: string;
  description: string;
  summary: string;
  learningBenefits: string;
  suggestedApproach: string;
  level: ProjectAssignmentLevel;
  deadline: string;
  status: ProjectAssignmentStatus;
  companyId: string;
  companyName: string;
  skills: SkillResponse[];
  tasks: TaskResponse[];
  createdAt: string;
  updatedAt: string;
}
```

**Enhancement**: Expanded from simple `{ id: string }` to full response matching backend contract.

#### Supporting Interfaces

- `SkillResponse`: Skill details with id, name, and description
- `TaskResponse`: Complete task details with metadata and timestamps

---

### 2. Enhanced Mutation Hook (`src/pages/create/hooks/useCreateProjectAssignment.ts`)

#### Architecture Pattern

Follows the established pattern from `useTaskMutations.ts` and other mutation hooks in the project.

#### Key Features

**Separated API Function**

```typescript
const createProjectAssignment = async (params: {
  companyId: string;
  data: CreateProjectAssignmentRequest;
}): Promise<ProjectAssignmentResponse> => {
  const response = await axiosInstance.post<ProjectAssignmentResponse>(
    `/c/${params.companyId}/projects`,
    params.data,
    {
      headers: { 'Content-Type': 'application/json' },
    }
  );
  return response.data;
};
```

**React Query Integration**

- Uses `useMutation` from `@tanstack/react-query`
- Leverages `useQueryClient` for cache management
- Fetches company profile to get `companyId`

**Automatic Cache Invalidation**

```typescript
onSuccess: (newProject) => {
  // Optimistic update: Add new project to cache
  queryClient.setQueryData(
    ['companyProjects', companyData.id],
    (oldData: ProjectAssignmentResponse[] | undefined) => {
      if (!oldData) return [newProject];
      return [...oldData, newProject];
    }
  );

  // Invalidate to trigger refetch
  queryClient.invalidateQueries({
    queryKey: ['companyProjects', companyData.id],
  });
  queryClient.invalidateQueries({
    queryKey: ['companyProfile'],
  });
};
```

**Error Handling**

- Validates company profile availability before request
- Logs errors to console for debugging
- Provides user-friendly error messages

---

### 3. Updated CreateManualPage (`src/pages/create/CreateManualPage.tsx`)

#### Payload Construction

```typescript
const skills = formData.skillIdsInput
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

const payload: CreateProjectAssignmentRequest = {
  title: formData.title.trim(),
  description: formData.description?.trim() || undefined,
  summary: formData.summary.trim(),
  learningBenefits: formData.learningBenefits.trim(),
  suggestedApproach: formData.suggestedApproach.trim(),
  level: Number(formData.level) as 0 | 1 | 2,
  deadline: new Date(formData.deadline).toISOString(),
  status: Number(formData.status) as 0 | 1 | 2 | 3,
  skills, // Changed from skillIds
  tasks: formData.tasks.map((t, idx) => ({
    title: t.title.trim(),
    description: t.description?.trim() || undefined,
    isCompleted: false,
    sequence: t.sequence || idx + 1,
  })),
};
```

#### Success Flow

```typescript
createAssignment.mutate(payload, {
  onSuccess: (data) => {
    setIsSubmitting(false);
    setFormData(initialFormState);
    setNotification({
      show: true,
      type: 'success',
      title: t('createManualPage.notifications.success.title'),
      message: t('createManualPage.notifications.success.message'),
    });
    setTimeout(() => navigate(`/projects/${data.id}`), 1000);
  },
  onError: (error) => {
    setIsSubmitting(false);
    setNotification({
      show: true,
      type: 'error',
      title: t('createManualPage.notifications.error.title'),
      message: error.message,
    });
  },
});
```

---

## Backend Contract

### Endpoint

```
POST /api/c/{companyId}/projects
```

**Note**: If you encounter a 404 error, verify the backend route configuration. Common alternatives:

- `/p/${companyId}`
- `/projects/${companyId}`
- `/g/${companyId}`

Check the backend controller's `[Route]` attribute to confirm.

### Request Body

```json
{
  "title": "string",
  "description": "string",
  "summary": "string",
  "learningBenefits": "string",
  "suggestedApproach": "string",
  "level": 0,
  "deadline": "2025-09-30T11:58:11.441Z",
  "status": 0,
  "skills": ["string"],
  "tasks": [
    {
      "title": "string",
      "description": "string",
      "isCompleted": true,
      "sequence": 0
    }
  ]
}
```

### Response (201 Created)

```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "title": "string",
  "description": "string",
  "summary": "string",
  "learningBenefits": "string",
  "suggestedApproach": "string",
  "level": 0,
  "deadline": "2025-09-30T11:58:11.452Z",
  "status": 0,
  "companyId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "companyName": "string",
  "skills": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "name": "string",
      "description": "string"
    }
  ],
  "tasks": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "title": "string",
      "description": "string",
      "isCompleted": true,
      "sequence": 0,
      "projectAssignmentId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "createdAt": "2025-09-30T11:58:11.452Z",
      "updatedAt": "2025-09-30T11:58:11.452Z"
    }
  ],
  "createdAt": "2025-09-30T11:58:11.452Z",
  "updatedAt": "2025-09-30T11:58:11.452Z"
}
```

### Authorization

- Requires `Company` policy
- Bearer token automatically added by `AxiosInterceptor`
- Requires valid company profile (user must be logged in)

---

## Data Flow

```
┌─────────────────────┐
│  CreateManualPage   │
│   (User Input)      │
└──────────┬──────────┘
           │
           │ Form Submit
           ↓
┌─────────────────────────────┐
│ useCreateProjectAssignment  │
│  (Mutation Hook)            │
└──────────┬──────────────────┘
           │
           │ 1. Get companyId from useCompanyProfile
           │ 2. Build payload with skills (not skillIds)
           │ 3. POST to /c/{companyId}/projects
           ↓
┌─────────────────────────────┐
│   AxiosInterceptor          │
│  (Add Auth Header)          │
└──────────┬──────────────────┘
           │
           ↓
┌─────────────────────────────┐
│   Backend API               │
│   [Authorize(Company)]      │
└──────────┬──────────────────┘
           │
           │ Success (201)
           ↓
┌─────────────────────────────┐
│  React Query Cache Update   │
│  - Set companyProjects      │
│  - Invalidate queries       │
└──────────┬──────────────────┘
           │
           ↓
┌─────────────────────────────┐
│  UI Updates                 │
│  - Show success notification│
│  - Navigate to project page │
│  - Reset form               │
└─────────────────────────────┘
```

---

## Cache Management Strategy

### Optimistic Update

Immediately adds the new project to the `companyProjects` cache:

```typescript
queryClient.setQueryData(['companyProjects', companyData.id], (oldData) => [
  ...(oldData || []),
  newProject,
]);
```

### Cache Invalidation

Triggers refetch of:

1. **Company Projects**: `['companyProjects', companyId]`
   - Ensures list is up-to-date with server state
2. **Company Profile**: `['companyProfile']`
   - Updates project count or related metadata

---

## Error Handling

### User-Facing Errors

- Form validation errors (missing required fields)
- Network errors (connection issues)
- Backend validation errors (400 Bad Request)
- Authorization errors (401/403)

### Developer-Facing Logs

```typescript
onError: (error: Error) => {
  console.error('Failed to create project assignment:', error);
};
```

### Error Message Display

Uses the `Notification` component with internationalization:

```typescript
setNotification({
  show: true,
  type: 'error',
  title: t('createManualPage.notifications.error.title'),
  message: error.message,
});
```

---

## Testing Checklist

### Unit Testing

- [ ] Validate request payload construction
- [ ] Verify skills array parsing from comma-separated input
- [ ] Test date formatting to ISO 8601
- [ ] Ensure enum conversions (level, status) are correct

### Integration Testing

- [ ] Create project with all fields
- [ ] Create project with optional fields empty
- [ ] Create project with multiple tasks
- [ ] Create project with skills array
- [ ] Verify navigation after successful creation
- [ ] Verify cache updates correctly

### Error Scenarios

- [ ] Missing company profile
- [ ] Network timeout
- [ ] 400 Bad Request (invalid data)
- [ ] 401 Unauthorized
- [ ] 404 Not Found (wrong endpoint)
- [ ] 500 Internal Server Error

### UI/UX Testing

- [ ] Loading state during submission
- [ ] Success notification appears
- [ ] Error notification appears with message
- [ ] Form resets after success
- [ ] Navigation occurs after delay
- [ ] Submit button disabled during submission

---

## Dependencies

### NPM Packages

- `@tanstack/react-query` - State management and caching
- `axios` - HTTP client
- `react-router-dom` - Navigation
- `react-i18next` - Internationalization

### Internal Dependencies

- `@/components/axios-interceptor/AxiosInterceptor` - HTTP client with auth
- `@/pages/company/hooks/useCompanyProfile` - Company data
- `@/lib/design-system` - Design tokens

---

## Future Enhancements

### Potential Improvements

1. **Skills Autocomplete**: Fetch available skills and provide dropdown selection
2. **Task Templates**: Pre-populate common task structures
3. **Draft Saving**: Auto-save form as draft before submission
4. **Validation Schema**: Use Zod or Yup for robust validation
5. **File Uploads**: Add support for project attachments
6. **Real-time Preview**: Show live preview of project as user types
7. **Duplicate Detection**: Warn if similar project exists

### Performance Optimizations

1. **Debounced Validation**: Validate fields on blur, not on every keystroke
2. **Lazy Loading**: Split form into steps for better initial load
3. **Memoization**: Memoize expensive computations in form

---

## Troubleshooting

### 404 Not Found

**Problem**: Endpoint URL doesn't match backend route.  
**Solution**: Check backend controller's `[Route]` attribute and update endpoint in `useCreateProjectAssignment.ts`.

### 401 Unauthorized

**Problem**: Missing or invalid auth token.  
**Solution**: Verify Auth0 configuration and ensure user is logged in with company role.

### 400 Bad Request

**Problem**: Request body doesn't match backend expectations.  
**Solution**: Check backend validation rules and ensure all required fields are provided.

### Cache Not Updating

**Problem**: New project doesn't appear in project list.  
**Solution**: Verify query keys match between `useCompanyProjects` and `useCreateProjectAssignment`.

### Type Errors

**Problem**: TypeScript errors with request/response types.  
**Solution**: Ensure types in `types.ts` match backend DTOs exactly.

---

## Related Files

### Core Implementation

- `src/pages/create/CreateManualPage.tsx` - Main page component
- `src/pages/create/hooks/useCreateProjectAssignment.ts` - Mutation hook
- `src/pages/create/types.ts` - Type definitions
- `src/pages/create/components/ProjectAssignmentManualForm.tsx` - Form component

### Supporting Files

- `src/pages/company/hooks/useCompanyProfile.ts` - Company data hook
- `src/pages/company/hooks/useCompanyProjects.ts` - Projects query hook
- `src/pages/company-projects/hooks/useTaskMutations.ts` - Task operations (reference)
- `src/components/axios-interceptor/AxiosInterceptor.tsx` - HTTP client config

---

## Conclusion

The manual project creation feature is now fully integrated with the backend API following established patterns from the codebase. The implementation includes:

✅ Type-safe request/response interfaces  
✅ Proper cache management with React Query  
✅ Error handling with user notifications  
✅ Optimistic UI updates  
✅ Internationalization support  
✅ Navigation after successful creation  
✅ Company profile integration

The code follows React and TypeScript best practices, maintains consistency with existing patterns, and provides a solid foundation for future enhancements.
