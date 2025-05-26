import { useTranslation } from 'react-i18next';
import { ArrowRight, FileCheck, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

export const FeaturedContentSection = () => {
  const { t } = useTranslation();
  
  // Sample companies and their courses (would be fetched from API in a real app)
  const featuredCompanies = [
    {
      id: 1,
      name: "TechNova Solutions",
      logo: "/images/companies/technova.jpg",
      industry: "Software Development",
      courses: 4,
      projects: 6
    },
    {
      id: 2,
      name: "DesignPulse",
      logo: "/images/companies/designpulse.jpg",
      industry: "UX/UI Design",
      courses: 3,
      projects: 5
    },
    {
      id: 3,
      name: "MarketReach",
      logo: "/images/companies/marketreach.jpg",
      industry: "Digital Marketing",
      courses: 2,
      projects: 4
    }
  ];
  
  // Sample courses (would be fetched from API in a real app)
  const featuredCourses = [
    {
      id: 1,
      title: "Advanced React Architecture",
      company: "TechNova Solutions",
      description: t('coursesPage.sampleCourses.react'),
      image: "/images/courses/react-course.jpg",
      duration: "15 hours",
      level: "Advanced",
      requiredProject: "React Dashboard Application"
    },
    {
      id: 2,
      title: "UX Research Methodologies",
      company: "DesignPulse",
      description: t('coursesPage.sampleCourses.ux'),
      image: "/images/courses/ux-course.jpg",
      duration: "12 hours",
      level: "Intermediate",
      requiredProject: "E-commerce Redesign"
    },
    {
      id: 3,
      title: "Content Marketing Strategy",
      company: "MarketReach",
      description: t('coursesPage.sampleCourses.marketing'),
      image: "/images/courses/marketing-course.jpg",
      duration: "10 hours",
      level: "All Levels",
      requiredProject: "Brand Awareness Campaign"
    }
  ];

  return (
    <section className="mb-16">
      <Tabs defaultValue="courses" className="w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold">{t('coursesPage.featured.title')}</h2>
          <TabsList>
            <TabsTrigger value="courses">{t('coursesPage.featured.courses')}</TabsTrigger>
            <TabsTrigger value="companies">{t('coursesPage.featured.companies')}</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="courses" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCourses.map((course) => (
              <Card key={course.id} className="overflow-hidden">
                <div className="aspect-video bg-gray-100 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-primary/90 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {t('coursesPage.projectRequired')}
                    </div>
                  </div>
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{course.title}</CardTitle>
                      <CardDescription className="mt-1">{course.company}</CardDescription>
                    </div>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      {course.level}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm mb-4">{course.description}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <FileCheck className="mr-2 h-4 w-4" />
                    <span>{t('coursesPage.requiredProject')}: <span className="font-medium">{course.requiredProject}</span></span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-4">
                  <div className="text-sm text-gray-500">
                    <Clock className="inline-block mr-1 h-4 w-4" />
                    {course.duration}
                  </div>
                  <Button variant="ghost" size="sm" className="text-primary" asChild>
                    <a href="/projects">
                      {t('coursesPage.unlockAccess')}
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="companies" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredCompanies.map((company) => (
              <Card key={company.id}>
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gray-100 flex-shrink-0"></div>
                  <div>
                    <CardTitle>{company.name}</CardTitle>
                    <CardDescription>{company.industry}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between text-sm mb-4">
                    <div>
                      <span className="font-semibold text-primary">{company.courses}</span> {t('coursesPage.coursesAvailable')}
                    </div>
                    <div>
                      <span className="font-semibold text-primary">{company.projects}</span> {t('coursesPage.projectsAvailable')}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <a href="/companies">
                      {t('coursesPage.viewCompany')}
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
}; 