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
  Tag,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { spacing, layouts, colors, typography, components } from '@/lib/design-system';

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
  const { t } = useTranslation('candidateProfile');
  const [isEditing, setIsEditing] = useState(false);
  const [candidateData, setCandidateData] = useState<CandidateProfile>({
    firstName: 'Arafat',
    lastName: 'Nayeem',
    email: 'hello@fillo.co',
    phone: '+880 1631 788 203',
    country: 'Bangladesh',
    city: 'Sylhet',
    zipCode: '3100',
    avatar: '/images/avatar-placeholder.jpg',
  });

  // Mock active project data
  const activeProject: ProjectStatus = {
    id: 1,
    title: 'Mobile App Development',
    company: 'TechCorp Solutions',
    logo: '/images/companies/company1.webp',
    description:
      'Looking for a talented React Native developer to build a cross-platform mobile application for our health tech startup.',
    category: 'development',
    skills: ['React Native', 'JavaScript', 'API Integration', 'UI/UX'],
    startDate: '2023-05-15',
    deadline: '2023-06-30',
    progress: 75,
    status: 'active',
    payment: '$4,500 - $6,000',
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
      payment: '$3,200',
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
      payment: '$2,800',
    },
  ];

  const handleInputChange = (field: keyof CandidateProfile, value: string) => {
    setCandidateData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would save the data to your backend
    console.log('Saving profile data:', candidateData);
  };

  return (
    <div className={cn(spacing.container, spacing.headerOffset, 'py-8')} style={{ backgroundColor: colors.dark }}>
      {/* Page Header */}
      <div className={layouts.pageHeader}>
        <div className={layouts.pageHeaderBackground}></div>
        <h1 className={layouts.pageTitle}>
          <span style={{ color: colors.yellow }}>{t('candidateProfilePage.header.title1')}</span>{' '}
          <span className="text-white">{t('candidateProfilePage.header.title2')}</span>
        </h1>
        <p className={cn('text-lg max-w-2xl mx-auto', typography.body.default)}>
          {t('candidateProfilePage.header.subtitle')}
        </p>
      </div>

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Personal Information Section */}
        <Card className="p-6 md:p-8" style={{ backgroundColor: colors.blueDark, borderColor: colors.blue }}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg" style={{ backgroundColor: colors.blue }}>
                <User className="h-5 w-5" style={{ color: colors.yellow }} />
              </div>
              <h2 className={cn('text-xl font-semibold', typography.heading[4])}>
                {t('candidateProfilePage.personalInfo.title')}
              </h2>
            </div>
            <div className="flex items-center gap-2">
              {isEditing && (
                <span className="text-sm flex items-center gap-1" style={{ color: colors.yellow }}>
                  <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: colors.yellow }}></div>
                  {t('candidateProfilePage.personalInfo.savingChanges')}
                </span>
              )}
              <Button
                variant={isEditing ? 'default' : 'outline'}
                size="sm"
                onClick={isEditing ? handleSave : () => setIsEditing(true)}
                className="flex items-center gap-2"
                style={isEditing ? { backgroundColor: colors.blue, color: colors.white } : { borderColor: colors.blue, color: colors.white }}
              >
                <Edit className="h-4 w-4" />
                {isEditing
                  ? t('candidateProfilePage.personalInfo.save')
                  : t('candidateProfilePage.personalInfo.edit')}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Profile Photo */}
            <div className="lg:col-span-1">
              <div className="flex flex-col items-center">
                <div className="relative group">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 shadow-lg" style={{ backgroundColor: colors.blue, borderColor: colors.white }}>
                    <img
                      src={candidateData.avatar}
                      alt="Profile"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = `https://ui-avatars.com/api/?name=${candidateData.firstName}+${candidateData.lastName}&background=${colors.blue.slice(1)}&color=fff&size=200`;
                      }}
                    />
                  </div>
                  {isEditing && (
                    <button className="absolute inset-0 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                      <Camera className="h-6 w-6 text-white" />
                    </button>
                  )}
                </div>
                <h3 className={cn('mt-4 text-lg font-semibold', typography.heading[4])}>
                  {candidateData.firstName} {candidateData.lastName}
                </h3>
                <p className={cn('text-sm', typography.body.sm)}>{candidateData.email}</p>
              </div>
            </div>

            {/* Form Fields */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* First Name */}
                <div className="space-y-2">
                  <Label htmlFor="firstName" className={cn('text-sm font-medium', typography.body.sm)}>
                    {t('candidateProfilePage.personalInfo.fields.firstName')}
                  </Label>
                  {isEditing ? (
                    <Input
                      id="firstName"
                      value={candidateData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className="w-full"
                    />
                  ) : (
                    <div className="p-3 rounded-lg border" style={{ backgroundColor: colors.blue, borderColor: colors.blue, color: colors.white }}>
                      {candidateData.firstName}
                    </div>
                  )}
                </div>

                {/* Last Name */}
                <div className="space-y-2">
                  <Label htmlFor="lastName" className={cn('text-sm font-medium', typography.body.sm)}>
                    {t('candidateProfilePage.personalInfo.fields.lastName')}
                  </Label>
                  {isEditing ? (
                    <Input
                      id="lastName"
                      value={candidateData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className="w-full"
                    />
                  ) : (
                    <div className="p-3 rounded-lg border" style={{ backgroundColor: colors.blue, borderColor: colors.blue, color: colors.white }}>
                      {candidateData.lastName}
                    </div>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className={cn('text-sm font-medium', typography.body.sm)}>
                    {t('candidateProfilePage.personalInfo.fields.emailAddress')}
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4" style={{ color: colors.yellow }} />
                    {isEditing ? (
                      <Input
                        id="email"
                        type="email"
                        value={candidateData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="pl-10 w-full"
                      />
                    ) : (
                      <div className="pl-10 p-3 rounded-lg border" style={{ backgroundColor: colors.blue, borderColor: colors.blue, color: colors.white }}>
                        {candidateData.email}
                      </div>
                    )}
                  </div>
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone" className={cn('text-sm font-medium', typography.body.sm)}>
                    {t('candidateProfilePage.personalInfo.fields.phoneNumber')}
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4" style={{ color: colors.yellow }} />
                    {isEditing ? (
                      <Input
                        id="phone"
                        value={candidateData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="pl-10 w-full"
                      />
                    ) : (
                      <div className="pl-10 p-3 rounded-lg border" style={{ backgroundColor: colors.blue, borderColor: colors.blue, color: colors.white }}>
                        {candidateData.phone}
                      </div>
                    )}
                  </div>
                </div>

                {/* Country */}
                <div className="space-y-2">
                  <Label htmlFor="country" className={cn('text-sm font-medium', typography.body.sm)}>
                    {t('candidateProfilePage.personalInfo.fields.country')}
                  </Label>
                  {isEditing ? (
                    <Input
                      id="country"
                      value={candidateData.country}
                      onChange={(e) => handleInputChange('country', e.target.value)}
                      className="w-full"
                    />
                  ) : (
                    <div className="p-3 rounded-lg border" style={{ backgroundColor: colors.blue, borderColor: colors.blue, color: colors.white }}>
                      {candidateData.country}
                    </div>
                  )}
                </div>

                {/* City */}
                <div className="space-y-2">
                  <Label htmlFor="city" className={cn('text-sm font-medium', typography.body.sm)}>
                    {t('candidateProfilePage.personalInfo.fields.city')}
                  </Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4" style={{ color: colors.yellow }} />
                    {isEditing ? (
                      <Input
                        id="city"
                        value={candidateData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        className="pl-10 w-full"
                      />
                    ) : (
                      <div className="pl-10 p-3 rounded-lg border" style={{ backgroundColor: colors.blue, borderColor: colors.blue, color: colors.white }}>
                        {candidateData.city}
                      </div>
                    )}
                  </div>
                </div>

                {/* Zip Code */}
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="zipCode" className={cn('text-sm font-medium', typography.body.sm)}>
                    {t('candidateProfilePage.personalInfo.fields.zipCode')}
                  </Label>
                  {isEditing ? (
                    <Input
                      id="zipCode"
                      value={candidateData.zipCode}
                      onChange={(e) => handleInputChange('zipCode', e.target.value)}
                      className="w-full max-w-xs"
                    />
                  ) : (
                    <div className="p-3 rounded-lg border max-w-xs" style={{ backgroundColor: colors.blue, borderColor: colors.blue, color: colors.white }}>
                      {candidateData.zipCode}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Active Project Section */}
        <Card className="p-6 md:p-8" style={{ backgroundColor: colors.blueDark, borderColor: colors.blue }}>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg" style={{ backgroundColor: colors.orange }}>
              <Briefcase className="h-5 w-5" style={{ color: colors.dark }} />
            </div>
            <h2 className={cn('text-xl font-semibold', typography.heading[4])}>
              {t('candidateProfilePage.activeProject.title')}
            </h2>
            <Badge className={cn(components.tag, components.tagColors.orange)}>
              {t('candidateProfilePage.activeProject.badge')}
            </Badge>
          </div>

          <div className="rounded-xl p-6 border" style={{ background: `linear-gradient(to right, ${colors.blue}, ${colors.blueDark})`, borderColor: colors.blue }}>
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg shadow-sm flex items-center justify-center" style={{ backgroundColor: colors.white }}>
                <Building2 className="h-6 w-6" style={{ color: colors.dark }} />
              </div>
              <div className="flex-1">
                <h3 className={cn('text-lg font-semibold mb-1', typography.heading[4])}>{activeProject.title}</h3>
                <p className={cn('mb-2', typography.body.default)}>{activeProject.company}</p>
                <p className={cn('text-sm mb-4', typography.body.sm)}>{activeProject.description}</p>

                {/* Project Details */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                  <div className={cn('flex items-center gap-2 text-sm', typography.body.sm)}>
                    <Calendar className="h-4 w-4" />
                    <span>
                      {t('candidateProfilePage.activeProject.started')}{' '}
                      {new Date(activeProject.startDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className={cn('flex items-center gap-2 text-sm', typography.body.sm)}>
                    <Clock className="h-4 w-4" />
                    <span>
                      {t('candidateProfilePage.activeProject.deadline')}{' '}
                      {new Date(activeProject.deadline).toLocaleDateString()}
                    </span>
                  </div>
                  <div className={cn('flex items-center gap-2 text-sm', typography.body.sm)}>
                    <DollarSign className="h-4 w-4" />
                    <span>{activeProject.payment}</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className={cn('text-sm font-medium', typography.body.sm)}>
                      {t('candidateProfilePage.activeProject.progress')}
                    </span>
                    <span className={cn('text-sm', typography.body.sm)}>{activeProject.progress}%</span>
                  </div>
                  <div className="w-full rounded-full h-2" style={{ backgroundColor: colors.blue }}>
                    <div
                      className="h-2 rounded-full transition-all duration-300"
                      style={{ width: `${activeProject.progress}%`, backgroundColor: colors.orange }}
                    ></div>
                  </div>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {activeProject.skills.map((skill, index) => (
                    <Badge key={index} className={cn(components.tag, 'text-xs', components.tagColors.yellow)}>
                      <Tag className="h-3 w-3 mr-1" />
                      {skill}
                    </Badge>
                  ))}
                </div>

                <Button size="sm" style={{ backgroundColor: colors.orange, color: colors.dark }}>
                  <FileText className="h-4 w-4 mr-2" />
                  {t('candidateProfilePage.activeProject.viewDetails')}
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Past Projects Section */}
        <Card className="p-6 md:p-8" style={{ backgroundColor: colors.blueDark, borderColor: colors.blue }}>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg" style={{ backgroundColor: colors.blue }}>
              <FileText className="h-5 w-5" style={{ color: colors.yellow }} />
            </div>
            <h2 className={cn('text-xl font-semibold', typography.heading[4])}>
              {t('candidateProfilePage.pastProjects.title')}
            </h2>
            <Badge className={cn(components.tag, components.tagColors.blue)}>
              {pastProjects.length} {t('candidateProfilePage.pastProjects.completed')}
            </Badge>
          </div>

          <div className="space-y-4">
            {pastProjects.map((project) => (
              <div
                key={project.id}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                style={{ borderColor: colors.blue, backgroundColor: colors.dark }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: colors.blue }}>
                    <Building2 className="h-5 w-5" style={{ color: colors.yellow }} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className={cn('font-semibold', typography.heading[5])}>{project.title}</h3>
                        <p className={cn('text-sm', typography.body.sm)}>{project.company}</p>
                      </div>
                      <Badge className={cn(components.tag, components.tagColors.orange)}>
                        {t('candidateProfilePage.pastProjects.completed')}
                      </Badge>
                    </div>

                    <p className={cn('text-sm mb-3', typography.body.sm)}>{project.description}</p>

                    <div className={cn('flex flex-wrap items-center gap-4 text-xs mb-3', typography.body.sm)}>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(project.startDate).toLocaleDateString()} -{' '}
                        {new Date(project.deadline).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarSign className="h-3 w-3" />
                        {project.payment}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {project.skills.map((skill, index) => (
                        <Badge key={index} variant="outline" className="text-xs" style={{ borderColor: colors.blue, color: colors.yellow }}>
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
            <Button variant="outline" className="w-full sm:w-auto" style={{ borderColor: colors.blue, color: colors.white }}>
              {t('candidateProfilePage.pastProjects.viewAllProjects')}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default CandidateProfilePage;
