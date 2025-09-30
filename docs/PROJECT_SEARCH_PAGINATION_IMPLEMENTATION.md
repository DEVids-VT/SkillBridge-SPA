# Project Search & Pagination - Backend Integration

## Overview

This document describes the implementation of backend connectivity for the Projects Board with advanced search filtering and pagination support.

## Implementation Summary

### 1. Updated Type Definitions (`src/pages/projects/types.ts`)

#### Project Assignment Level Enum

```typescript
export enum ProjectAssignmentLevel {
  Beginner = 0,
  Intermediate = 1,
  Advanced = 2,
}
```

#### Search Filter Interface

```typescript
export interface SearchProjectFilters {
  title?: string; // Partial match on project title
  level?: ProjectAssignmentLevel; // Filter by difficulty level
  deadlineAfter?: string; // ISO date string - only show projects after this date
  companyName?: string; // Filter by company name
  companySector?: string; // Filter by company sector/industry
  projectSkills?: string[]; // Array of skill names
}
```

#### Pagination Metadata

```typescript
export interface PaginationMetadata {
  currentPage: number; // Current page number (1-based)
  pageSize: number; // Number of items per page
  totalPages: number; // Total number of pages
  totalCount: number; // Total number of items
}
```

#### Search Request & Response

```typescript
export interface SearchProjectsRequest extends SearchProjectFilters {
  pageNumber?: number; // Page to fetch (default: 1)
  pageSize?: number; // Items per page (default: 10)
}

export interface SearchProjectsResponse {
  data: Project[]; // Array of projects
  pagination: PaginationMetadata; // Pagination metadata
}
```

---

### 2. Search Hook (`src/pages/projects/hooks/useSearchProjects.ts`)

#### Architecture Pattern

Follows the established pattern from other query hooks, with added support for query parameters and header parsing.

#### Key Features

**Query Parameter Building**

```typescript
const params = new URLSearchParams();

if (filters.title) params.append('Title', filters.title);
if (filters.level !== undefined) params.append('Level', String(filters.level));
if (filters.deadlineAfter) params.append('DeadlineAfter', filters.deadlineAfter);
if (filters.companyName) params.append('CompanyName', filters.companyName);
if (filters.companySector) params.append('CompanySector', filters.companySector);
if (filters.projectSkills && filters.projectSkills.length > 0) {
  filters.projectSkills.forEach((skill) => params.append('ProjectSkills', skill));
}

params.append('pageNumber', String(filters.pageNumber || 1));
params.append('pageSize', String(filters.pageSize || 10));
```

**Pagination Header Parsing**

```typescript
const paginationHeader = response.headers['x-pagination'];
if (paginationHeader) {
  const parsed = JSON.parse(paginationHeader);
  pagination = {
    currentPage: parsed.CurrentPage || parsed.currentPage,
    pageSize: parsed.PageSize || parsed.pageSize,
    totalPages: parsed.TotalPages || parsed.totalPages,
    totalCount: parsed.TotalCount || parsed.totalCount,
  };
}
```

**React Query Integration**

```typescript
export const useSearchProjects = (filters: SearchProjectsRequest, enabled: boolean = true) => {
  return useQuery<SearchProjectsResponse, Error>({
    queryKey: ['projects', 'search', filters],
    queryFn: () => searchProjects(filters),
    enabled,
    staleTime: 1000 * 60, // 1 minute
  });
};
```

---

### 3. Pagination Component (`src/pages/projects/components/Pagination.tsx`)

#### Features

- Responsive design (mobile and desktop)
- Smart page number display with ellipsis
- Previous/Next navigation
- Disabled states for boundary pages
- Result count display

#### Page Number Algorithm

```typescript
const getPageNumbers = () => {
  const pages: (number | string)[] = [];
  const maxPagesToShow = 7;

  if (totalPages <= maxPagesToShow) {
    // Show all pages if total is small
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    // Show: [1] ... [current-1] [current] [current+1] ... [totalPages]
    pages.push(1);

    if (currentPage > 3) {
      pages.push('...');
    }

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push('...');
    }

    pages.push(totalPages);
  }

  return pages;
};
```

#### UI Display

```
Showing 1-12 of 145 results

[< Previous] [1] [2] [3] ... [10] [11] [12] ... [15] [Next >]
```

---

### 4. Enhanced Filter Sidebar (`src/pages/projects/components/ProjectsFilterSidebar.tsx`)

#### New Filters Matching Backend

**1. Search by Title**

- Text input with search icon
- Clear button when text is entered
- Real-time filtering

**2. Difficulty Level**

- Dropdown selector
- Options: All Levels, Beginner, Intermediate, Advanced
- Maps to ProjectAssignmentLevel enum

**3. Company Name**

- Text input
- Partial match on company name

**4. Company Sector**

- Text input
- Filter by industry/sector (e.g., Technology, Finance)

**5. Project Skills**

- Multi-select dropdown
- Dynamically populated from available skills
- Shows selected skills as removable tags
- CheckSquare icon for visual feedback

**6. Deadline After**

- Date picker input
- Shows projects with deadlines after selected date
- Human-readable date display

#### Filter State Management

```typescript
const hasActiveFilters =
  searchQuery ||
  selectedLevel !== undefined ||
  companyName ||
  companySector ||
  selectedSkills.length > 0 ||
  deadlineAfter;
```

---

### 5. Updated ProjectsBoardPage (`src/pages/projects/ProjectsBoardPage.tsx`)

#### State Management

```typescript
// Filter state
const [searchQuery, setSearchQuery] = useState('');
const [selectedLevel, setSelectedLevel] = useState<ProjectAssignmentLevel | undefined>(undefined);
const [companyName, setCompanyName] = useState('');
const [companySector, setCompanySector] = useState('');
const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
const [deadlineAfter, setDeadlineAfter] = useState<Date | undefined>(undefined);

// Pagination state
const [currentPage, setCurrentPage] = useState(1);
const [pageSize] = useState(12); // Fixed page size
```

#### Search Request Building

```typescript
const searchRequest: SearchProjectsRequest = useMemo(
  () => ({
    title: searchQuery || undefined,
    level: selectedLevel,
    companyName: companyName || undefined,
    companySector: companySector || undefined,
    projectSkills: selectedSkills.length > 0 ? selectedSkills : undefined,
    deadlineAfter: deadlineAfter?.toISOString(),
    pageNumber: currentPage,
    pageSize,
  }),
  [
    searchQuery,
    selectedLevel,
    companyName,
    companySector,
    selectedSkills,
    deadlineAfter,
    currentPage,
    pageSize,
  ]
);
```

#### Reset Pagination on Filter Change

```typescript
useEffect(() => {
  setCurrentPage(1); // Reset to page 1 when filters change
}, [searchQuery, selectedLevel, companyName, companySector, selectedSkills, deadlineAfter]);
```

#### Page Change Handler

```typescript
const handlePageChange = (page: number) => {
  setCurrentPage(page);
  // Scroll to top when page changes for better UX
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
```

#### Dynamic Skills Population

```typescript
const availableSkills = useMemo(() => {
  if (!searchResponse?.data) return [];
  const skillsSet = new Set<string>();
  searchResponse.data.forEach((project) => {
    project.skills?.forEach((skill) => {
      if (skill.name) skillsSet.add(skill.name);
    });
  });
  return Array.from(skillsSet).sort();
}, [searchResponse?.data]);
```

---

## Backend Contract

### Endpoint

```
GET /api/p/search
```

### Query Parameters

| Parameter       | Type     | Description                                               | Example                                        |
| --------------- | -------- | --------------------------------------------------------- | ---------------------------------------------- |
| `Title`         | string   | Partial match on project title                            | `Title=React`                                  |
| `Level`         | int      | Difficulty level (0=Beginner, 1=Intermediate, 2=Advanced) | `Level=1`                                      |
| `DeadlineAfter` | DateTime | ISO 8601 date string                                      | `DeadlineAfter=2025-10-01T00:00:00Z`           |
| `CompanyName`   | string   | Filter by company name                                    | `CompanyName=Acme`                             |
| `CompanySector` | string   | Filter by company sector                                  | `CompanySector=Technology`                     |
| `ProjectSkills` | string[] | Array of skill names (multiple params)                    | `ProjectSkills=React&ProjectSkills=TypeScript` |
| `pageNumber`    | int      | Page number (1-based)                                     | `pageNumber=2`                                 |
| `pageSize`      | int      | Items per page                                            | `pageSize=20`                                  |

### Example Request

```
GET /api/p/search?Title=Frontend&Level=1&CompanyName=Tech&ProjectSkills=React&ProjectSkills=TypeScript&pageNumber=1&pageSize=12
```

### Response

#### Body (200 OK)

```json
[
  {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "title": "Build Modern E-commerce Platform",
    "description": "Full description...",
    "summary": "Short summary",
    "learningBenefits": "Learn React, TypeScript, etc.",
    "suggestedApproach": "Start with component design...",
    "level": 1,
    "deadline": "2025-12-31T23:59:59Z",
    "status": 1,
    "companyId": "...",
    "companyName": "Tech Corp",
    "companySector": "Technology",
    "skills": [
      {
        "id": "...",
        "name": "React",
        "description": "JavaScript library for building UIs"
      },
      {
        "id": "...",
        "name": "TypeScript",
        "description": "Typed JavaScript"
      }
    ],
    "createdAt": "2025-09-01T10:00:00Z",
    "updatedAt": "2025-09-15T14:30:00Z"
  }
]
```

#### Headers

```
X-Pagination: {"CurrentPage":1,"PageSize":12,"TotalPages":5,"TotalCount":58}
```

---

## Data Flow

```
┌─────────────────────────────┐
│  User Interactions          │
│  - Search input             │
│  - Filter selections        │
│  - Page navigation          │
└──────────┬──────────────────┘
           │
           │ State Updates
           ↓
┌─────────────────────────────┐
│  ProjectsBoardPage          │
│  - Build SearchRequest      │
│  - useMemo optimization     │
└──────────┬──────────────────┘
           │
           │ useSearchProjects(request)
           ↓
┌─────────────────────────────┐
│  useSearchProjects Hook     │
│  - Build query params       │
│  - React Query cache        │
└──────────┬──────────────────┘
           │
           │ GET /p/search?params
           ↓
┌─────────────────────────────┐
│  AxiosInterceptor           │
│  - Add Auth Bearer token    │
└──────────┬──────────────────┘
           │
           ↓
┌─────────────────────────────┐
│  Backend API                │
│  - Apply filters            │
│  - Paginate results         │
└──────────┬──────────────────┘
           │
           │ Response + X-Pagination header
           ↓
┌─────────────────────────────┐
│  Parse & Transform          │
│  - Extract X-Pagination     │
│  - Transform data           │
└──────────┬──────────────────┘
           │
           ↓
┌─────────────────────────────┐
│  UI Updates                 │
│  - ProjectsList             │
│  - Pagination controls      │
│  - Filter badges            │
└─────────────────────────────┘
```

---

## Performance Optimizations

### 1. Memoization

```typescript
// Memoize search request to prevent unnecessary re-fetches
const searchRequest = useMemo(
  () => ({
    // ... filters
  }),
  [dependencies]
);

// Memoize expensive transformations
const availableSkills = useMemo(() => {
  // Extract unique skills
}, [searchResponse?.data]);

const projects = useMemo(() => {
  // Transform API data
}, [searchResponse?.data]);
```

### 2. React Query Caching

```typescript
queryKey: ['projects', 'search', filters],
staleTime: 1000 * 60, // Cache for 1 minute
```

### 3. Automatic Pagination Reset

```typescript
// Reset to page 1 when filters change
useEffect(() => {
  setCurrentPage(1);
}, [filter dependencies]);
```

### 4. Smooth Scrolling

```typescript
const handlePageChange = (page: number) => {
  setCurrentPage(page);
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
```

---

## User Experience Features

### 1. Loading States

- Skeleton loaders during fetch
- Disabled pagination during loading
- Visual feedback for active filters

### 2. Empty States

- Helpful message when no results
- Suggestion to adjust filters
- Icon for visual appeal

### 3. Filter Feedback

- Selected skills shown as removable tags
- Active filters highlighted
- Clear all filters button appears when filters active

### 4. Responsive Design

- Mobile-friendly filter sidebar
- Responsive grid layout (1/2/3 columns)
- Touch-friendly pagination controls

### 5. Accessibility

- Semantic HTML
- ARIA labels for screen readers
- Keyboard navigation support
- Focus management

---

## Testing Checklist

### Unit Testing

- [x] Query parameter building with all filter combinations
- [x] X-Pagination header parsing (both PascalCase and camelCase)
- [x] Pagination page number generation algorithm
- [x] Filter state management

### Integration Testing

- [ ] Search with single filter
- [ ] Search with multiple filters combined
- [ ] Pagination navigation (next, previous, specific page)
- [ ] Filter changes reset pagination to page 1
- [ ] Skills multi-select functionality
- [ ] Date picker for deadline filter
- [ ] Clear filters resets all state

### Edge Cases

- [ ] Empty search results
- [ ] Single page of results (hide pagination)
- [ ] First page (disable previous)
- [ ] Last page (disable next)
- [ ] Invalid date input
- [ ] Special characters in search query
- [ ] Very long skill names

### Performance Testing

- [ ] Large result sets (100+ projects)
- [ ] Many skills selected
- [ ] Rapid filter changes
- [ ] Network latency handling
- [ ] Concurrent requests

---

## Error Handling

### Network Errors

```typescript
{error && (
  <div className="p-8 text-center">
    <p className="font-medium" style={{ color: colors.orange }}>
      {t('projectsPage.states.errorLoadingProjects')}
    </p>
    <p className="text-sm mt-2" style={{ color: colors.textSecondary }}>
      {error.message}
    </p>
  </div>
)}
```

### Header Parsing Errors

```typescript
try {
  const parsed = JSON.parse(paginationHeader);
  // ... use parsed data
} catch (error) {
  console.error('Failed to parse pagination header:', error);
  // Fall back to default pagination
}
```

### Invalid Filter Values

- Empty strings converted to `undefined` (not sent to backend)
- Invalid dates handled by browser date picker
- Skill names validated against available skills

---

## Future Enhancements

### Potential Improvements

1. **Saved Searches**: Allow users to save favorite filter combinations
2. **Search History**: Show recent searches
3. **Advanced Filters**: Add more filter options (date range, status, etc.)
4. **Sort Options**: Sort by deadline, posted date, company, etc.
5. **View Modes**: Grid view, list view, compact view
6. **Bulk Actions**: Select multiple projects for bulk operations
7. **Filter Presets**: Quick filters (e.g., "Beginner Friendly", "Ending Soon")
8. **Export Results**: Export filtered results as CSV/PDF

### Performance Optimizations

1. **Virtual Scrolling**: For very large result sets
2. **Infinite Scroll**: Alternative to pagination
3. **Debounced Search**: Delay API calls while typing
4. **Optimistic Updates**: Update UI before API response
5. **Background Prefetching**: Prefetch next page

---

## Troubleshooting

### Pagination Not Working

**Problem**: X-Pagination header not found or parsed incorrectly.  
**Solution**: Check backend response headers. Verify both PascalCase and camelCase parsing.

### Filters Not Applied

**Problem**: Query parameters not sent correctly.  
**Solution**: Check URLSearchParams construction. Ensure undefined values aren't sent.

### Skills Filter Empty

**Problem**: No skills shown in dropdown.  
**Solution**: Verify backend returns skills array. Check skill name extraction logic.

### Results Not Updating

**Problem**: Stale data after filter changes.  
**Solution**: Verify query key includes all filter dependencies.

### Page Reset Issues

**Problem**: Page doesn't reset to 1 when filters change.  
**Solution**: Check useEffect dependencies for filter reset logic.

---

## Related Files

### Core Implementation

- `src/pages/projects/ProjectsBoardPage.tsx` - Main page with filters and pagination
- `src/pages/projects/hooks/useSearchProjects.ts` - Search query hook
- `src/pages/projects/types.ts` - Type definitions
- `src/pages/projects/components/ProjectsFilterSidebar.tsx` - Filter UI
- `src/pages/projects/components/Pagination.tsx` - Pagination UI component

### Supporting Files

- `src/pages/projects/hooks/useFetchProjects.ts` - Original fetch hook (deprecated)
- `src/pages/projects/hooks/useProjectDetail.ts` - Single project detail hook
- `src/pages/projects/components/ProjectsList.tsx` - Projects display component
- `src/pages/projects/components/ProjectCard.tsx` - Individual project card

---

## Migration Notes

### Breaking Changes

- `useFetchProjects` is now deprecated in favor of `useSearchProjects`
- Filter sidebar props changed to match new filter structure
- Category-based filtering removed (backend doesn't support it yet)

### Backward Compatibility

- Old filter UI components preserved for reference
- Data transformation maintains existing Project interface
- Existing ProjectCard and ProjectsList components work unchanged

---

## Conclusion

The projects page is now fully integrated with the backend's search and pagination API. The implementation includes:

✅ Type-safe search filters matching backend contract  
✅ Pagination with metadata from X-Pagination header  
✅ Comprehensive filter UI (Level, Skills, Company, Sector, Date)  
✅ Performance optimizations (memoization, caching)  
✅ Responsive and accessible design  
✅ Error handling and loading states  
✅ Smart page navigation with ellipsis  
✅ Filter reset and clear functionality  
✅ Smooth scrolling on page change

The code follows React and TypeScript best practices, maintains consistency with existing patterns, and provides an excellent user experience for searching and browsing projects.
