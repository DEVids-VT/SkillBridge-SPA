import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { RoutePage } from '@/types/enums/RoutePage';
import {
  Building2,
  Mail,
  MapPin,
  Calendar,
  Clock,
  DollarSign,
  Briefcase,
  Tag,
  Users,
  Globe,
  Plus,
  TrendingUp,
  Loader2,
  AlertCircle,
  Edit,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { spacing, layouts } from '@/lib/design-system';
import { useCompanyProfile } from './hooks/useCompanyProfile';
import { useCompanyProjects } from './hooks/useCompanyProjects';

interface CompanyProfile {
  companyName: string;
  industry: string;
  website: string;
  address: string;
  city: string;
  country: string;
  companySize: string;
  description: string;
  logo: string;
  contactInfo: string;
}

interface UICompanyProject {
  id: string;
  title: string;
  description: string;
  category: string;
  skills: string[];
  postedDate: string;
  deadline: string;
  budget: string;
  applicants: number;
  maxApplicants: number;
  status: 'active' | 'completed' | 'closed';
  priority: 'high' | 'medium' | 'low';
}

export function CompanyProfilePage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Fetch company profile data
  const {
    data: apiCompanyData,
    isLoading: isLoadingProfile,
    error: profileError,
  } = useCompanyProfile(); // Set up local state for company data
  const [companyData, setCompanyData] = useState<CompanyProfile>({
    companyName: '',
    industry: '',
    website: '',
    address: '',
    city: '',
    country: '',
    companySize: '',
    description: '',
    logo: '',
    contactInfo: '',
  });
  // Fetch company projects once we have the company ID
  const { data: apiProjects } = useCompanyProjects(apiCompanyData?.id);
  // Update local state when API data is loaded
  useEffect(() => {
    if (apiCompanyData) {
      setCompanyData({
        companyName: apiCompanyData.name,
        industry: apiCompanyData.sector,
        website: apiCompanyData.websiteUrl,
        address: apiCompanyData.headOfficeLocation,
        city: apiCompanyData.bulgarianOfficeLocations,
        country: '',
        companySize: `${apiCompanyData.employeesWorldwide} employees worldwide, ${apiCompanyData.employeesInBulgaria} in Bulgaria`,
        description: apiCompanyData.about,
        logo: apiCompanyData.logoUrl || '/images/companies/techcorp-logo.webp',
        contactInfo: apiCompanyData.contactInfo || 'Not provided',
      });
    }
  }, [apiCompanyData]); // Helper function to determine a project category based on skills
  const determineCategory = (
    skills: { id: string; name: string; description: string }[]
  ): string => {
    const skillNames = skills.map((skill) => skill.name.toLowerCase());

    if (
      skillNames.some((s) =>
        ['react', 'javascript', 'typescript', 'node', 'api', 'backend', 'frontend'].includes(s)
      )
    ) {
      return 'development';
    } else if (skillNames.some((s) => ['design', 'ui', 'ux', 'figma', 'photoshop'].includes(s))) {
      return 'design';
    } else if (
      skillNames.some((s) => ['marketing', 'social media', 'seo', 'content'].includes(s))
    ) {
      return 'marketing';
    } else if (
      skillNames.some((s) => ['architecture', 'system design', 'infrastructure'].includes(s))
    ) {
      return 'architecture';
    } else {
      return 'content';
    }
  };

  // Transform API project data to match the UI requirements
  const transformProject = (project: any): UICompanyProject => {
    // Map status number to string status
    const statusMap: { [key: number]: 'active' | 'completed' | 'closed' } = {
      0: 'active',
      1: 'active',
      2: 'completed',
      3: 'closed',
    };

    // Assign a random priority for UI display purposes
    const priorities = ['high', 'medium', 'low'];
    const randomPriority = priorities[Math.floor(Math.random() * priorities.length)] as
      | 'high'
      | 'medium'
      | 'low';

    return {
      id: project.id,
      title: project.title,
      description: project.description,
      category: determineCategory(project.skills), // Determine a category based on skills
      skills: project.skills.map(
        (skill: { id: string; name: string; description: string }) => skill.name
      ),
      postedDate: project.createdAt,
      deadline: project.deadline,
      budget: '$3,000 - $6,000', // Placeholder as this isn't in the API
      applicants: Math.floor(Math.random() * 20) + 1, // Placeholder
      maxApplicants: 20, // Placeholder
      status: statusMap[project.status] || 'active',
      priority: randomPriority,
    };
  };

  // Process API projects data
  const activeProjects = apiProjects
    ? apiProjects
        .filter((project) => project.status === 0 || project.status === 1)
        .map(transformProject)
    : [];

  const pastCampaigns = apiProjects
    ? apiProjects
        .filter((project) => project.status === 2 || project.status === 3)
        .map(transformProject)
    : []; // UI helper functions for styling

  const getPriorityColor = (priority: string): string => {
    const priorityColors: { [key: string]: string } = {
      high: 'bg-red-100 text-red-700',
      medium: 'bg-yellow-100 text-yellow-700',
      low: 'bg-green-100 text-green-700',
    };
    return priorityColors[priority] || 'bg-gray-100 text-gray-700';
  };

  const getStatusColor = (status: string): string => {
    const statusColors: { [key: string]: string } = {
      active: 'bg-green-100 text-green-700',
      completed: 'bg-blue-100 text-blue-700',
      closed: 'bg-gray-100 text-gray-700',
    };
    return statusColors[status] || 'bg-gray-100 text-gray-700';
  };
  // Loading and error states
  if (isLoadingProfile) {
    return (
      <div
        className={cn(
          spacing.container,
          spacing.headerOffset,
          'py-8 flex flex-col items-center justify-center min-h-[60vh]'
        )}
      >
        <Loader2 className="h-12 w-12 animate-spin text-blue-600 mb-4" />
        <p className="text-lg font-medium text-gray-600">
          {t('loadingCompanyProfile', 'Loading company profile...')}
        </p>
      </div>
    );
  }

  if (profileError) {
    return (
      <div
        className={cn(
          spacing.container,
          spacing.headerOffset,
          'py-8 flex flex-col items-center justify-center min-h-[60vh]'
        )}
      >
        <div className="h-12 w-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4">
          <AlertCircle className="h-6 w-6" />
        </div>
        <p className="text-lg font-medium text-gray-900 mb-2">
          {t('errorLoadingProfile', 'Error Loading Profile')}
        </p>
        <p className="text-gray-600 max-w-md text-center">
          {t('unableToLoadProfile', 'Unable to load company profile. Please try again later.')}
        </p>
      </div>
    );
  }

  return (
    <div className={cn(spacing.container, spacing.headerOffset, 'py-8')}>
      {/* Page Header */}
      <div className={layouts.pageHeader}>
        <div className={layouts.pageHeaderBackground}></div>{' '}
        <h1 className={layouts.pageTitle}>
          <span className="text-blue-600">{t('company', 'Company')}</span>{' '}
          <span className="text-gray-600">{t('profile', 'Profile')}</span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          {t(
            'viewCompanyProfile',
            'View your company information and track your project campaigns'
          )}
        </p>
      </div>

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Company Information Section */}
        <Card className="p-6 md:p-8">
          {' '}
          <div className="flex items-center mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Building2 className="h-5 w-5 text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">
                {t('companyInformation', 'Company Information')}
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Company Logo */}
            <div className="lg:col-span-1">
              {' '}
              <div className="flex flex-col items-center">
                <div className="relative">
                  <div className="w-32 h-32 rounded-lg overflow-hidden bg-gray-100 border-4 border-white shadow-lg">
                    <img
                      src={companyData.logo}
                      alt="Company Logo"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = `https://ui-avatars.com/api/?name=${companyData.companyName}&background=3b82f6&color=fff&size=200`;
                      }}
                    />
                  </div>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900 text-center">
                  {companyData.companyName}
                </h3>
                <p className="text-sm text-gray-500">{companyData.industry}</p>
              </div>
            </div>

            {/* Form Fields */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {' '}
                {/* Company Name */}
                <div className="space-y-2">
                  <Label htmlFor="companyName" className="text-sm font-medium text-gray-700">
                    {t('companyName', 'Company Name')}
                  </Label>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    {companyData.companyName}
                  </div>
                </div>
                {/* Industry */}
                <div className="space-y-2">
                  <Label htmlFor="industry" className="text-sm font-medium text-gray-700">
                    {t('industry', 'Industry')}
                  </Label>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    {companyData.industry}
                  </div>
                </div>
                {/* Contact Info */}
                <div className="space-y-2">
                  <Label htmlFor="contactInfo" className="text-sm font-medium text-gray-700">
                    {t('contactInfo', 'Contact Information')}
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <div className="pl-10 p-3 bg-gray-50 rounded-lg border border-gray-200">
                      {companyData.contactInfo}
                    </div>
                  </div>
                </div>
                <div className="space-y-2">{/* Empty div to maintain grid layout */}</div>{' '}
                {/* Website */}
                <div className="space-y-2">
                  <Label htmlFor="website" className="text-sm font-medium text-gray-700">
                    {t('website', 'Website')}
                  </Label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <div className="pl-10 p-3 bg-gray-50 rounded-lg border border-gray-200">
                      {companyData.website}
                    </div>
                  </div>
                </div>{' '}
                {/* Company Size */}
                <div className="space-y-2">
                  <Label htmlFor="companySize" className="text-sm font-medium text-gray-700">
                    {t('companySize', 'Company Size')}
                  </Label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <div className="pl-10 p-3 bg-gray-50 rounded-lg border border-gray-200">
                      {companyData.companySize}
                    </div>
                  </div>
                </div>{' '}
                {/* Address & Location */}
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address" className="text-sm font-medium text-gray-700">
                    {t('address', 'Address')}
                  </Label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <div className="pl-10 p-3 bg-gray-50 rounded-lg border border-gray-200">
                        {companyData.address}
                      </div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                      {companyData.city}
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                      {companyData.country}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Active Projects Section */}
        <Card className="p-6 md:p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Briefcase className="h-5 w-5 text-green-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">
                {t('activeProjects', 'Active Projects')}
              </h2>
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                {activeProjects.length} {t('active', 'Active')}
              </Badge>
            </div>{' '}
            <Button
              size="sm"
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => navigate(RoutePage.DESCRIBE_CANDIDATE)}
            >
              <Plus className="h-4 w-4 mr-2" />
              {t('postNewProject', 'Post New Project')}
            </Button>
          </div>

          <div className="space-y-4">
            {activeProjects.map((project) => (
              <div
                key={project.id}
                className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{project.title}</h3>
                      <Badge className={getPriorityColor(project.priority)}>
                        {project.priority}
                      </Badge>
                    </div>
                    <p className="text-gray-600 mb-3">{project.description}</p>
                  </div>
                  <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
                </div>

                {/* Project Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>Posted: {new Date(project.postedDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span>Deadline: {new Date(project.deadline).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <DollarSign className="h-4 w-4" />
                    <span>{project.budget}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="h-4 w-4" />
                    <span>
                      {project.applicants}/{project.maxApplicants} applicants
                    </span>
                  </div>
                </div>

                {/* Progress Bar for Applicants */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Applicant Progress</span>
                    <span className="text-sm text-gray-600">
                      {Math.round((project.applicants / project.maxApplicants) * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(project.applicants / project.maxApplicants) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      <Tag className="h-3 w-3 mr-1" />
                      {skill}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Users className="h-4 w-4 mr-2" />
                    {t('viewApplicants', 'View Applicants')}
                  </Button>
                  <Button size="sm" variant="outline">
                    <Edit className="h-4 w-4 mr-2" />
                    {t('editProject', 'Edit Project')}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Past Campaigns Section */}
        <Card className="p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gray-100 rounded-lg">
              <TrendingUp className="h-5 w-5 text-gray-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">
              {t('pastCampaigns', 'Past Campaigns')}
            </h2>
            <Badge variant="secondary" className="bg-gray-100 text-gray-700">
              {pastCampaigns.length} {t('completed', 'Completed')}
            </Badge>
          </div>

          <div className="space-y-4">
            {pastCampaigns.map((campaign) => (
              <div
                key={campaign.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900">{campaign.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{campaign.description}</p>
                  </div>
                  <Badge className={getStatusColor(campaign.status)}>{campaign.status}</Badge>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(campaign.postedDate).toLocaleDateString()} -{' '}
                    {new Date(campaign.deadline).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <DollarSign className="h-3 w-3" />
                    {campaign.budget}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {campaign.applicants} applicants
                  </span>
                </div>

                <div className="flex flex-wrap gap-1">
                  {campaign.skills.map((skill, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <Button variant="outline" className="w-full sm:w-auto">
              {t('viewAllCampaigns', 'View All Campaigns')}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default CompanyProfilePage;
