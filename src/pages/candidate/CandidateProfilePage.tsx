import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Building2,
  Clock,
  DollarSign,
  FileText,
  Edit,
  Camera,
  Briefcase,
  Tag
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { spacing, layouts, cards, colors } from '@/lib/design-system';

interface CandidateProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  zipCode: string;
  avatar: string;
}

interface ProjectStatus {
  id: number;
  title: string;
  company: string;
  logo: string;
  description: string;
  category: string;
  skills: string[];
  startDate: string;
  deadline: string;
  progress: number;
  status: 'active' | 'completed';
  payment: string;
}

export function CandidateProfilePage() {
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
  const [candidateData, setCandidateData] = useState<CandidateProfile>({
    firstName: 'Arafat',
    lastName: 'Nayeem',
    email: 'hello@fillo.co',
    phone: '+880 1631 788 203',
    country: 'Bangladesh',
    city: 'Sylhet',
    zipCode: '3100',
    avatar: '/images/avatar-placeholder.jpg'
  });

  // Mock active project data
  const activeProject: ProjectStatus = {
    id: 1,
    title: 'Mobile App Development',
    company: 'TechCorp Solutions',
    logo: '/images/companies/company1.webp',
    description: 'Looking for a talented React Native developer to build a cross-platform mobile application for our health tech startup.',
    category: 'development',
    skills: ['React Native', 'JavaScript', 'API Integration', 'UI/UX'],
    startDate: '2023-05-15',
    deadline: '2023-06-30',
    progress: 75,
    status: 'active',
    payment: '$4,500 - $6,000'
  };

  // Mock past projects data
  const pastProjects: ProjectStatus[] = [
    {
      id: 2,
      title: 'E-commerce Website Redesign',
      company: 'ShopSmart Inc',
      logo: '/images/companies/company2.webp',
      description: 'Complete redesign of e-commerce platform with modern UI/UX principles.',
      category: 'design',
      skills: ['Figma', 'UI/UX', 'React', 'CSS'],
      startDate: '2023-03-01',
      deadline: '2023-04-15',
      progress: 100,
      status: 'completed',
      payment: '$3,200'
    },
    {
      id: 3,
      title: 'API Integration Project',
      company: 'DataFlow Systems',
      logo: '/images/companies/company3.webp',
      description: 'Integration of multiple third-party APIs for data synchronization.',
      category: 'development',
      skills: ['Node.js', 'API Integration', 'Database', 'Testing'],
      startDate: '2023-01-20',
      deadline: '2023-02-28',
      progress: 100,
      status: 'completed',
      payment: '$2,800'
    }
  ];

  const handleInputChange = (field: keyof CandidateProfile, value: string) => {
    setCandidateData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would save the data to your backend
    console.log('Saving profile data:', candidateData);
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

  return (
    <div className={cn(spacing.container, spacing.headerOffset, "py-8")}>
      {/* Page Header */}
      <div className={layouts.pageHeader}>
        <div className={layouts.pageHeaderBackground}></div>
        <h1 className={layouts.pageTitle}>
          <span className="text-blue-600">{t('candidate', 'Candidate')}</span>{' '}
          <span className="text-gray-600">{t('profile', 'Profile')}</span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          {t('manageYourProfile', 'Manage your personal information and track your project progress')}
        </p>
      </div>

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Personal Information Section */}
        <Card className="p-6 md:p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <User className="h-5 w-5 text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">
                {t('personalInformation', 'Personal Information')}
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
            {/* Profile Photo */}
            <div className="lg:col-span-1">
              <div className="flex flex-col items-center">
                <div className="relative group">
                  <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100 border-4 border-white shadow-lg">
                    <img 
                      src={candidateData.avatar} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = `https://ui-avatars.com/api/?name=${candidateData.firstName}+${candidateData.lastName}&background=3b82f6&color=fff&size=200`;
                      }}
                    />
                  </div>
                  {isEditing && (
                    <button className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                      <Camera className="h-6 w-6 text-white" />
                    </button>
                  )}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                  {candidateData.firstName} {candidateData.lastName}
                </h3>
                <p className="text-sm text-gray-500">{candidateData.email}</p>
              </div>
            </div>

            {/* Form Fields */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* First Name */}
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                    {t('firstName', 'First Name')}
                  </Label>
                  {isEditing ? (
                    <Input
                      id="firstName"
                      value={candidateData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className="w-full"
                    />
                  ) : (
                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                      {candidateData.firstName}
                    </div>
                  )}
                </div>

                {/* Last Name */}
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                    {t('lastName', 'Last Name')}
                  </Label>
                  {isEditing ? (
                    <Input
                      id="lastName"
                      value={candidateData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className="w-full"
                    />
                  ) : (
                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                      {candidateData.lastName}
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
                        value={candidateData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="pl-10 w-full"
                      />
                    ) : (
                      <div className="pl-10 p-3 bg-gray-50 rounded-lg border border-gray-200">
                        {candidateData.email}
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
                        value={candidateData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="pl-10 w-full"
                      />
                    ) : (
                      <div className="pl-10 p-3 bg-gray-50 rounded-lg border border-gray-200">
                        {candidateData.phone}
                      </div>
                    )}
                  </div>
                </div>

                {/* Country */}
                <div className="space-y-2">
                  <Label htmlFor="country" className="text-sm font-medium text-gray-700">
                    {t('country', 'Country')}
                  </Label>
                  {isEditing ? (
                    <Input
                      id="country"
                      value={candidateData.country}
                      onChange={(e) => handleInputChange('country', e.target.value)}
                      className="w-full"
                    />
                  ) : (
                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                      {candidateData.country}
                    </div>
                  )}
                </div>

                {/* City */}
                <div className="space-y-2">
                  <Label htmlFor="city" className="text-sm font-medium text-gray-700">
                    {t('city', 'City')}
                  </Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    {isEditing ? (
                      <Input
                        id="city"
                        value={candidateData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        className="pl-10 w-full"
                      />
                    ) : (
                      <div className="pl-10 p-3 bg-gray-50 rounded-lg border border-gray-200">
                        {candidateData.city}
                      </div>
                    )}
                  </div>
                </div>

                {/* Zip Code */}
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="zipCode" className="text-sm font-medium text-gray-700">
                    {t('zipCode', 'Zip Code')}
                  </Label>
                  {isEditing ? (
                    <Input
                      id="zipCode"
                      value={candidateData.zipCode}
                      onChange={(e) => handleInputChange('zipCode', e.target.value)}
                      className="w-full max-w-xs"
                    />
                  ) : (
                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 max-w-xs">
                      {candidateData.zipCode}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Active Project Section */}
        <Card className="p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-green-100 rounded-lg">
              <Briefcase className="h-5 w-5 text-green-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">
              {t('activeProject', 'Active Project')}
            </h2>
            <Badge variant="secondary" className="bg-green-100 text-green-700">
              {t('inProgress', 'In Progress')}
            </Badge>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg bg-white shadow-sm flex items-center justify-center">
                <Building2 className="h-6 w-6 text-gray-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {activeProject.title}
                </h3>
                <p className="text-gray-600 mb-2">{activeProject.company}</p>
                <p className="text-sm text-gray-600 mb-4">{activeProject.description}</p>
                
                {/* Project Details */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>Started: {new Date(activeProject.startDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span>Deadline: {new Date(activeProject.deadline).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <DollarSign className="h-4 w-4" />
                    <span>{activeProject.payment}</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Progress</span>
                    <span className="text-sm text-gray-600">{activeProject.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${activeProject.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {activeProject.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      <Tag className="h-3 w-3 mr-1" />
                      {skill}
                    </Badge>
                  ))}
                </div>

                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  <FileText className="h-4 w-4 mr-2" />
                  {t('viewDetails', 'View Details')}
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Past Projects Section */}
        <Card className="p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gray-100 rounded-lg">
              <FileText className="h-5 w-5 text-gray-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">
              {t('pastProjects', 'Past Projects')}
            </h2>
            <Badge variant="secondary" className="bg-gray-100 text-gray-700">
              {pastProjects.length} {t('completed', 'Completed')}
            </Badge>
          </div>

          <div className="space-y-4">
            {pastProjects.map((project) => (
              <div key={project.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                    <Building2 className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900">{project.title}</h3>
                        <p className="text-sm text-gray-600">{project.company}</p>
                      </div>
                      <Badge variant="secondary" className="bg-green-100 text-green-700">
                        {t('completed', 'Completed')}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-3">{project.description}</p>
                    
                    <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(project.startDate).toLocaleDateString()} - {new Date(project.deadline).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarSign className="h-3 w-3" />
                        {project.payment}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {project.skills.map((skill, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <Button variant="outline" className="w-full sm:w-auto">
              {t('viewAllProjects', 'View All Projects')}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default CandidateProfilePage; 