import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, GraduationCap, Building, Award, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: GraduationCap,
      title: "Course Upload & Management",
      description: "Experts and companies upload courses tailored to industry needs"
    },
    {
      icon: Building,
      title: "Evaluation & Approval",
      description: "Companies review and validate courses, ensuring relevance and quality"
    },
    {
      icon: Award,
      title: "Learning & Certificates",
      description: "Learners complete courses and earn industry-endorsed certificates"
    },
    {
      icon: Users,
      title: "Skills Validation",
      description: "Employers trust the certifications, leading to faster, better hiring"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="py-12 md:py-24 bg-gradient-to-b from-primary-50 to-background">
        <div className="container px-4 mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
            {t("landingPage.hero.title", "Bridge the Gap Between Learning and Employment")}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8">
            {t("landingPage.hero.subtitle", "Connect with industry-validated courses and certifications that truly matter to employers")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="gap-2">
              <Link to="/register">
                {t("landingPage.hero.primaryCta", "Get Started")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/courses">
                {t("landingPage.hero.secondaryCta", "Explore Courses")}
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section className="py-16 bg-muted/50">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2 space-y-4">
              <h2 className="text-3xl font-bold tracking-tight">
                {t("landingPage.problem.title", "The Problem")}
              </h2>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <span>{t("landingPage.problem.point1", "Companies struggle to find candidates with verified, practical skills")}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <span>{t("landingPage.problem.point2", "Existing courses often fail to meet real-world business needs")}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <span>{t("landingPage.problem.point3", "Hiring processes are slow and costly due to skills mismatches")}</span>
                </li>
              </ul>
            </div>
            <div className="md:w-1/2 space-y-4">
              <h2 className="text-3xl font-bold tracking-tight">
                {t("landingPage.solution.title", "Our Solution")}
              </h2>
              <p className="text-lg text-muted-foreground">
                {t("landingPage.solution.description", "Endorsify creates a closed feedback loop between skills development and industry validation — drastically improving the efficiency of talent acquisition and career growth.")}
              </p>
              <Button asChild className="gap-2">
                <Link to="/about">
                  {t("landingPage.solution.cta", "Learn More")}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-16">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              {t("landingPage.features.title", "How Endorsify Works")}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t("landingPage.features.subtitle", "A seamless ecosystem combining education, validation, and employment")}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="overflow-hidden border-border/40">
                <CardContent className={cn(
                  "p-6 flex flex-col items-center text-center",
                  index % 2 === 0 ? "bg-primary-50/50" : "bg-secondary-50/50"
                )}>
                  <div className="mb-4 p-3 rounded-full bg-background">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {t(`landingPage.features.feature${index + 1}.title`, feature.title)}
                  </h3>
                  <p className="text-muted-foreground">
                    {t(`landingPage.features.feature${index + 1}.description`, feature.description)}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Target Audience Section */}
      <section className="py-16 bg-muted/50">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              {t("landingPage.audience.title", "Who Benefits from Endorsify")}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* For Learners */}
            <div className="bg-background rounded-lg shadow-sm p-8 border border-border/40">
              <div className="flex flex-col items-center text-center">
                <GraduationCap className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-2xl font-bold mb-4">
                  {t("landingPage.audience.learners.title", "For Learners")}
                </h3>
                <ul className="space-y-3 text-left">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <span>{t("landingPage.audience.learners.point1", "Young professionals seeking qualification upgrades")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <span>{t("landingPage.audience.learners.point2", "Career changers needing practical, recognized skills")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <span>{t("landingPage.audience.learners.point3", "Students aiming for industry readiness")}</span>
                  </li>
                </ul>
                <Button asChild className="mt-6 gap-2">
                  <Link to="/register">
                    {t("landingPage.audience.learners.cta", "Start Learning")}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* For Companies */}
            <div className="bg-background rounded-lg shadow-sm p-8 border border-border/40">
              <div className="flex flex-col items-center text-center">
                <Building className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-2xl font-bold mb-4">
                  {t("landingPage.audience.companies.title", "For Companies")}
                </h3>
                <ul className="space-y-3 text-left">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <span>{t("landingPage.audience.companies.point1", "HR departments verifying candidate skills")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <span>{t("landingPage.audience.companies.point2", "Enterprises filling skill gaps faster")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <span>{t("landingPage.audience.companies.point3", "Educational institutions updating curricula for modern business needs")}</span>
                  </li>
                </ul>
                <Button asChild className="mt-6 gap-2">
                  <Link to="/business">
                    {t("landingPage.audience.companies.cta", "Partner With Us")}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 bg-primary-50">
        <div className="container px-4 mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
            {t("landingPage.cta.title", "Ready to Validate Skills and Transform Hiring?")}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            {t("landingPage.cta.subtitle", "Join Endorsify today and be part of the future of workforce readiness")}
          </p>
          <Button asChild size="lg" className="gap-2">
            <Link to="/register">
              {t("landingPage.cta.primaryButton", "Get Started Today")}
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage; 