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
  const { t } = useTranslation('companyProfile');
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
        contactInfo:
          apiCompanyData.contactInfo ||
          t('companyProfilePage.companyInformation.fallback.notProvided'),
      });
    }
  }, [apiCompanyData, t]); // Helper function to determine a project category based on skills
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
      high: 'bg-[#ffc300] text-[#001d3d]',
      medium: 'bg-[#ffc300] text-[#001d3d]',
      low: 'bg-[#ffc300] text-[#001d3d]',
    };
    return priorityColors[priority] || 'bg-[#ffc300] text-[#001d3d]';
  };

  const getStatusColor = (status: string): string => {
    const statusColors: { [key: string]: string } = {
      active: 'bg-[#ffc300] text-[#001d3d]',
      completed: 'bg-[#003566] text-[#ffd60a]',
      closed: 'bg-[#001d3d] text-[#ffd60a]',
    };
    return statusColors[status] || 'bg-[#001d3d] text-[#ffd60a]';
  };
  // Loading and error states
  if (isLoadingProfile) {
    return (
      <div
        className={cn(
          spacing.container,
          spacing.headerOffset,
          'py-8 flex flex-col items-center justify-center min-h-[60vh] bg-[#000814] text-white'
        )}
      >
        <Loader2 className="h-12 w-12 animate-spin text-[#ffd60a] mb-4" />
        <p className="text-lg font-medium text-[#ffd60a]">
          {t('companyProfilePage.loading.profile')}
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
          'py-8 flex flex-col items-center justify-center min-h-[60vh] bg-[#000814] text-white'
        )}
      >
        <div className="h-12 w-12 bg-[#ffc300] text-[#001d3d] rounded-full flex items-center justify-center mb-4">
          <AlertCircle className="h-6 w-6" />
        </div>
        <p className="text-lg font-medium text-white mb-2">
          {t('companyProfilePage.loading.error.title')}
        </p>
        <p className="text-[#ffd60a] max-w-md text-center">
          {t('companyProfilePage.loading.error.message')}
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
          <span className="text-[#ffd60a]">{t('companyProfilePage.header.title1')}</span>{' '}
          <span className="text-[#ffd60a]">{t('companyProfilePage.header.title2')}</span>
        </h1>
        <p className="text-lg text-[#ffd60a] dark:text-[#ffd60a] max-w-2xl mx-auto">
          {t('companyProfilePage.header.subtitle')}
        </p>
      </div>

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Company Information Section */}
        <Card className="p-6 md:p-8">
          {' '}
          <div className="flex items-center mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#003566] rounded-lg">
                <Building2 className="h-5 w-5 text-[#ffd60a]" />
              </div>
              <h2 className="text-xl font-semibold text-[#ffd60a]">
                {t('companyProfilePage.companyInformation.title')}
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Company Logo */}
            <div className="lg:col-span-1">
              {' '}
              <div className="flex flex-col items-center">
                <div className="relative">
                  <div className="w-32 h-32 rounded-lg overflow-hidden bg-[#001d3d] border-4 border-[#003566] shadow-lg">
                    <img
                      src={companyData.logo}
                      alt={t('companyProfilePage.companyInformation.altText.companyLogo')}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = `https://ui-avatars.com/api/?name=${companyData.companyName}&background=3b82f6&color=fff&size=200`;
                      }}
                    />
                  </div>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-[#ffd60a] text-center">
                  {companyData.companyName}
                </h3>
                <p className="text-sm text-[#ffd60a]">{companyData.industry}</p>
              </div>
            </div>

            {/* Form Fields */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {' '}
                {/* Company Name */}
                <div className="space-y-2">
                  <Label htmlFor="companyName" className="text-sm font-medium text-[#ffd60a]">
                    {t('companyProfilePage.companyInformation.fields.companyName')}
                  </Label>
                  <div className="p-3 bg-[#001d3d] rounded-lg border border-[#003566]">
                    {companyData.companyName}
                  </div>
                </div>
                {/* Industry */}
                <div className="space-y-2">
                  <Label htmlFor="industry" className="text-sm font-medium text-[#ffd60a]">
                    {t('companyProfilePage.companyInformation.fields.industry')}
                  </Label>
                  <div className="p-3 bg-[#001d3d] rounded-lg border border-[#003566]">
                    {companyData.industry}
                  </div>
                </div>
                {/* Contact Info */}
                <div className="space-y-2">
                  <Label htmlFor="contactInfo" className="text-sm font-medium text-[#ffd60a]">
                    {t('companyProfilePage.companyInformation.fields.contactInfo')}
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#ffd60a]" />
                    <div className="pl-10 p-3 bg-[#001d3d] rounded-lg border border-[#003566]">
                      {companyData.contactInfo}
                    </div>
                  </div>
                </div>
                <div className="space-y-2">{/* Empty div to maintain grid layout */}</div>{' '}
                {/* Website */}
                <div className="space-y-2">
                  <Label htmlFor="website" className="text-sm font-medium text-[#ffd60a]">
                    {t('companyProfilePage.companyInformation.fields.website')}
                  </Label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#ffd60a]" />
                    <div className="pl-10 p-3 bg-[#001d3d] rounded-lg border border-[#003566]">
                      {companyData.website}
                    </div>
                  </div>
                </div>{' '}
                {/* Company Size */}
                <div className="space-y-2">
                  <Label htmlFor="companySize" className="text-sm font-medium text-[#ffd60a]">
                    {t('companyProfilePage.companyInformation.fields.companySize')}
                  </Label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#ffd60a]" />
                    <div className="pl-10 p-3 bg-[#001d3d] rounded-lg border border-[#003566]">
                      {companyData.companySize}
                    </div>
                  </div>
                </div>{' '}
                {/* Address & Location */}
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address" className="text-sm font-medium text-[#ffd60a]">
                    {t('companyProfilePage.companyInformation.fields.address')}
                  </Label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#ffd60a]" />
                      <div className="pl-10 p-3 bg-[#001d3d] rounded-lg border border-[#003566]">
                        {companyData.address}
                      </div>
                    </div>
                    <div className="p-3 bg-[#001d3d] rounded-lg border border-[#003566]">
                      {companyData.city}
                    </div>
                    <div className="p-3 bg-[#001d3d] rounded-lg border border-[#003566]">
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
              <div className="p-2 bg-[#ffc300] rounded-lg">
                <Briefcase className="h-5 w-5 text-[#001d3d]" />
              </div>
              <h2 className="text-xl font-semibold text-[#ffd60a]">
                {t('companyProfilePage.activeProjects.title')}
              </h2>
              <Badge variant="secondary" className="bg-[#ffc300] text-[#001d3d]">
                {activeProjects.length} {t('companyProfilePage.activeProjects.badge')}
              </Badge>
            </div>{' '}
            <Button
              size="sm"
              className="bg-[#003566] hover:bg-[#001d3d]"
              onClick={() => navigate(RoutePage.CREATE_PROJECT)}
            >
              <Plus className="h-4 w-4 mr-2" />
              {t('companyProfilePage.activeProjects.postNewProject')}
            </Button>
          </div>

          <div className="space-y-4">
            {activeProjects.map((project) => (
              <div
                key={project.id}
                className="bg-gradient-to-r from-[#001d3d] to-[#003566] rounded-xl p-6 border border-[#003566]"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold text-[#ffd60a]">{project.title}</h3>
                      <Badge className={getPriorityColor(project.priority)}>
                        {t(`companyProfilePage.activeProjects.priority.${project.priority}`)}
                      </Badge>
                    </div>
                    <p className="text-[#ffd60a] mb-3">{project.description}</p>
                  </div>
                  <Badge className={getStatusColor(project.status)}>
                    {t(`companyProfilePage.activeProjects.status.${project.status}`)}
                  </Badge>
                </div>

                {/* Project Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center gap-2 text-sm text-[#ffd60a]">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {t('companyProfilePage.activeProjects.details.posted')}{' '}
                      {new Date(project.postedDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#ffd60a]">
                    <Clock className="h-4 w-4" />
                    <span>
                      {t('companyProfilePage.activeProjects.details.deadline')}{' '}
                      {new Date(project.deadline).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#ffd60a]">
                    <DollarSign className="h-4 w-4" />
                    <span>{project.budget}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#ffd60a]">
                    <Users className="h-4 w-4" />
                    <span>
                      {project.applicants}/{project.maxApplicants}{' '}
                      {t('companyProfilePage.activeProjects.details.applicants')}
                    </span>
                  </div>
                </div>

                {/* Progress Bar for Applicants */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-[#ffd60a]">
                      {t('companyProfilePage.activeProjects.details.applicantProgress')}
                    </span>
                    <span className="text-sm text-[#ffd60a]">
                      {Math.round((project.applicants / project.maxApplicants) * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-[#001d3d] rounded-full h-2">
                    <div
                      className="bg-[#ffc300] h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(project.applicants / project.maxApplicants) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="text-xs text-[#ffd60a]">
                      <Tag className="h-3 w-3 mr-1" />
                      {skill}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="text-[#ffd60a]">
                    <Users className="h-4 w-4 mr-2" />
                    {t('companyProfilePage.activeProjects.actions.viewApplicants')}
                  </Button>
                  <Button size="sm" variant="outline" className="text-[#ffd60a]">
                    <Edit className="h-4 w-4 mr-2" />
                    {t('companyProfilePage.activeProjects.actions.editProject')}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Past Campaigns Section */}
        <Card className="p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-[#001d3d] rounded-lg">
              <TrendingUp className="h-5 w-5 text-[#ffd60a]" />
            </div>
            <h2 className="text-xl font-semibold text-[#ffd60a]">
              {t('companyProfilePage.pastCampaigns.title')}
            </h2>
            <Badge variant="secondary" className="bg-[#001d3d] text-[#ffd60a]">
              {pastCampaigns.length} {t('companyProfilePage.pastCampaigns.completed')}
            </Badge>
          </div>

          <div className="space-y-4">
            {pastCampaigns.map((campaign) => (
              <div
                key={campaign.id}
                className="border border-[#003566] rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-[#ffd60a]">{campaign.title}</h3>
                    <p className="text-sm text-[#ffd60a] mt-1">{campaign.description}</p>
                  </div>
                  <Badge className={getStatusColor(campaign.status)}>
                    {t(`companyProfilePage.activeProjects.status.${campaign.status}`)}
                  </Badge>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs text-[#ffd60a] mb-3">
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
                    {campaign.applicants}{' '}
                    {t('companyProfilePage.activeProjects.details.applicants')}
                  </span>
                </div>

                <div className="flex flex-wrap gap-1">
                  {campaign.skills.map((skill, index) => (
                    <Badge key={index} variant="outline" className="text-xs text-[#ffd60a]">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <Button variant="outline" className="w-full sm:w-auto text-[#ffd60a]">
              {t('companyProfilePage.pastCampaigns.viewAllCampaigns')}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default CompanyProfilePage;
