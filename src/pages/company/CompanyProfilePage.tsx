import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { 
  Building2, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Clock,
  DollarSign,
  FileText,
  Edit,
  Camera,
  Briefcase,
  Tag,
  Users,
  Globe,
  Plus,
  TrendingUp
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { spacing, layouts, cards, colors } from '@/lib/design-system';

interface CompanyProfile {
  companyName: string;
  industry: string;
  website: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  companySize: string;
  description: string;
  logo: string;
}

interface CompanyProject {
  id: number;
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
  const [isEditing, setIsEditing] = useState(false);
  const [companyData, setCompanyData] = useState<CompanyProfile>({
    companyName: 'TechCorp Solutions',
    industry: 'Technology & Software',
    website: 'https://techcorp.com',
    email: 'contact@techcorp.com',
    phone: '+1 (555) 123-4567',
    address: '123 Tech Street',
    city: 'San Francisco',
    country: 'United States',
    companySize: '50-200 employees',
    description: 'Leading technology company specializing in innovative software solutions for businesses worldwide.',
    logo: '/images/companies/techcorp-logo.webp'
  });

  // Mock active projects data
  const activeProjects: CompanyProject[] = [
    {
      id: 1,
      title: 'Mobile App Development',
      description: 'Looking for a talented React Native developer to build a cross-platform mobile application for our health tech startup.',
      category: 'development',
      skills: ['React Native', 'JavaScript', 'API Integration', 'UI/UX'],
      postedDate: '2023-05-15',
      deadline: '2023-06-30',
      budget: '$4,500 - $6,000',
      applicants: 12,
      maxApplicants: 20,
      status: 'active',
      priority: 'high'
    },
    {
      id: 2,
      title: 'UI/UX Design for Dashboard',
      description: 'Seeking an experienced designer to create modern, user-friendly interface for our analytics dashboard.',
      category: 'design',
      skills: ['Figma', 'UI/UX', 'Design System', 'Prototyping'],
      postedDate: '2023-05-20',
      deadline: '2023-07-15',
      budget: '$3,000 - $4,500',
      applicants: 8,
      maxApplicants: 15,
      status: 'active',
      priority: 'medium'
    }
  ];

  // Mock past campaigns data
  const pastCampaigns: CompanyProject[] = [
    {
      id: 3,
      title: 'E-commerce Platform Redesign',
      description: 'Complete redesign of our e-commerce platform with modern UI/UX principles and improved user experience.',
      category: 'design',
      skills: ['Figma', 'UI/UX', 'React', 'CSS', 'User Research'],
      postedDate: '2023-02-01',
      deadline: '2023-03-30',
      budget: '$8,000',
      applicants: 25,
      maxApplicants: 25,
      status: 'completed',
      priority: 'high'
    },
    {
      id: 4,
      title: 'API Integration Project',
      description: 'Integration of multiple third-party APIs for data synchronization and automation.',
      category: 'development',
      skills: ['Node.js', 'API Integration', 'Database', 'Testing'],
      postedDate: '2023-01-10',
      deadline: '2023-02-28',
      budget: '$5,500',
      applicants: 18,
      maxApplicants: 20,
      status: 'completed',
      priority: 'medium'
    },
    {
      id: 5,
      title: 'Content Strategy Development',
      description: 'Comprehensive content strategy for social media and blog to increase brand awareness.',
      category: 'marketing',
      skills: ['Content Strategy', 'SEO', 'Social Media', 'Analytics'],
      postedDate: '2022-11-15',
      deadline: '2022-12-31',
      budget: '$2,800',
      applicants: 15,
      maxApplicants: 15,
      status: 'completed',
      priority: 'low'
    }
  ];

  const handleInputChange = (field: keyof CompanyProfile, value: string) => {
    setCompanyData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would save the data to your backend
    console.log('Saving company data:', companyData);
  };

  const getCategoryColor = (category: string) => {
    const categoryColors: { [key: string]: string } = {
      development: 'bg-blue-100 text-blue-700',
      design: 'bg-purple-100 text-purple-700',
      marketing: 'bg-green-100 text-green-700',
      content: 'bg-yellow-100 text-yellow-700',
      architecture: 'bg-gray-100 text-gray-700',
    };
    return categoryColors[category] || 'bg-gray-100 text-gray-700';
  };

  const getPriorityColor = (priority: string) => {
    const priorityColors: { [key: string]: string } = {
      high: 'bg-red-100 text-red-700',
      medium: 'bg-yellow-100 text-yellow-700',
      low: 'bg-green-100 text-green-700',
    };
    return priorityColors[priority] || 'bg-gray-100 text-gray-700';
  };

  const getStatusColor = (status: string) => {
    const statusColors: { [key: string]: string } = {
      active: 'bg-green-100 text-green-700',
      completed: 'bg-blue-100 text-blue-700',
      closed: 'bg-gray-100 text-gray-700',
    };
    return statusColors[status] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className={cn(spacing.container, spacing.headerOffset, "py-8")}>
      {/* Page Header */}
      <div className={layouts.pageHeader}>
        <div className={layouts.pageHeaderBackground}></div>
        <h1 className={layouts.pageTitle}>
          <span className="text-blue-600">{t('company', 'Company')}</span>{' '}
          <span className="text-gray-600">{t('profile', 'Profile')}</span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          {t('manageCompanyProfile', 'Manage your company information and track your project campaigns')}
        </p>
      </div>

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Company Information Section */}
        <Card className="p-6 md:p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Building2 className="h-5 w-5 text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">
                {t('companyInformation', 'Company Information')}
              </h2>
            </div>
            <div className="flex items-center gap-2">
              {isEditing && (
                <span className="text-sm text-blue-600 flex items-center gap-1">
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                  {t('savingChanges', 'Saving changes')}
                </span>
              )}
              <Button
                variant={isEditing ? "default" : "outline"}
                size="sm"
                onClick={isEditing ? handleSave : () => setIsEditing(true)}
                className="flex items-center gap-2"
              >
                <Edit className="h-4 w-4" />
                {isEditing ? t('save', 'Save') : t('edit', 'Edit')}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Company Logo */}
            <div className="lg:col-span-1">
              <div className="flex flex-col items-center">
                <div className="relative group">
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
                  {isEditing && (
                    <button className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                      <Camera className="h-6 w-6 text-white" />
                    </button>
                  )}
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
                {/* Company Name */}
                <div className="space-y-2">
                  <Label htmlFor="companyName" className="text-sm font-medium text-gray-700">
                    {t('companyName', 'Company Name')}
                  </Label>
                  {isEditing ? (
                    <Input
                      id="companyName"
                      value={companyData.companyName}
                      onChange={(e) => handleInputChange('companyName', e.target.value)}
                      className="w-full"
                    />
                  ) : (
                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                      {companyData.companyName}
                    </div>
                  )}
                </div>

                {/* Industry */}
                <div className="space-y-2">
                  <Label htmlFor="industry" className="text-sm font-medium text-gray-700">
                    {t('industry', 'Industry')}
                  </Label>
                  {isEditing ? (
                    <Input
                      id="industry"
                      value={companyData.industry}
                      onChange={(e) => handleInputChange('industry', e.target.value)}
                      className="w-full"
                    />
                  ) : (
                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                      {companyData.industry}
                    </div>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    {t('emailAddress', 'Email Address')}
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    {isEditing ? (
                      <Input
                        id="email"
                        type="email"
                        value={companyData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="pl-10 w-full"
                      />
                    ) : (
                      <div className="pl-10 p-3 bg-gray-50 rounded-lg border border-gray-200">
                        {companyData.email}
                      </div>
                    )}
                  </div>
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                    {t('phoneNumber', 'Phone Number')}
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    {isEditing ? (
                      <Input
                        id="phone"
                        value={companyData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="pl-10 w-full"
                      />
                    ) : (
                      <div className="pl-10 p-3 bg-gray-50 rounded-lg border border-gray-200">
                        {companyData.phone}
                      </div>
                    )}
                  </div>
                </div>

                {/* Website */}
                <div className="space-y-2">
                  <Label htmlFor="website" className="text-sm font-medium text-gray-700">
                    {t('website', 'Website')}
                  </Label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    {isEditing ? (
                      <Input
                        id="website"
                        value={companyData.website}
                        onChange={(e) => handleInputChange('website', e.target.value)}
                        className="pl-10 w-full"
                      />
                    ) : (
                      <div className="pl-10 p-3 bg-gray-50 rounded-lg border border-gray-200">
                        {companyData.website}
                      </div>
                    )}
                  </div>
                </div>

                {/* Company Size */}
                <div className="space-y-2">
                  <Label htmlFor="companySize" className="text-sm font-medium text-gray-700">
                    {t('companySize', 'Company Size')}
                  </Label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    {isEditing ? (
                      <Input
                        id="companySize"
                        value={companyData.companySize}
                        onChange={(e) => handleInputChange('companySize', e.target.value)}
                        className="pl-10 w-full"
                      />
                    ) : (
                      <div className="pl-10 p-3 bg-gray-50 rounded-lg border border-gray-200">
                        {companyData.companySize}
                      </div>
                    )}
                  </div>
                </div>

                {/* Address & Location */}
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address" className="text-sm font-medium text-gray-700">
                    {t('address', 'Address')}
                  </Label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      {isEditing ? (
                        <Input
                          id="address"
                          value={companyData.address}
                          onChange={(e) => handleInputChange('address', e.target.value)}
                          className="pl-10 w-full"
                          placeholder="Street address"
                        />
                      ) : (
                        <div className="pl-10 p-3 bg-gray-50 rounded-lg border border-gray-200">
                          {companyData.address}
                        </div>
                      )}
                    </div>
                    {isEditing ? (
                      <>
                        <Input
                          value={companyData.city}
                          onChange={(e) => handleInputChange('city', e.target.value)}
                          placeholder="City"
                        />
                        <Input
                          value={companyData.country}
                          onChange={(e) => handleInputChange('country', e.target.value)}
                          placeholder="Country"
                        />
                      </>
                    ) : (
                      <>
                        <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                          {companyData.city}
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                          {companyData.country}
                        </div>
                      </>
                    )}
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
            </div>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              {t('postNewProject', 'Post New Project')}
            </Button>
          </div>

          <div className="space-y-4">
            {activeProjects.map((project) => (
              <div key={project.id} className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
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
                  <Badge className={getStatusColor(project.status)}>
                    {project.status}
                  </Badge>
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
                    <span>{project.applicants}/{project.maxApplicants} applicants</span>
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
              <div key={campaign.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900">{campaign.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{campaign.description}</p>
                  </div>
                  <Badge className={getStatusColor(campaign.status)}>
                    {campaign.status}
                  </Badge>
                </div>
                
                <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(campaign.postedDate).toLocaleDateString()} - {new Date(campaign.deadline).toLocaleDateString()}
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