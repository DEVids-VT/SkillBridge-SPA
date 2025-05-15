import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, GraduationCap, Building, Award, Users, Briefcase, FileCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";

const LandingPage = () => {
  const { t } = useTranslation();
  const videoRef = useRef<HTMLVideoElement>(null);

  // Ensure video plays automatically when component mounts
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error("Video autoplay failed:", error);
      });
    }
  }, []);

  const features = [
    {
      icon: FileCheck,
      title: "Реални проектни задания",
      description: "Компаниите публикуват истински проекти с ясни изисквания и очаквания"
    },
    {
      icon: Briefcase,
      title: "Развивай портфолио",
      description: "Кандидатите избират проекти и изграждат решения под提醒大家 на ментори"
    },
    {
      icon: Award,
      title: "Онбординг курсове",
      description: "Одобрените кандидати преминават фирмени курсове, валидиращи знания и умения"
    },
    {
      icon: Building,
      title: "Директен път към работа",
      description: "Успешно завършилите получават възможност за интервю и стаж с потенциал за наемане"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/* Hero Section with Video Background */}
      <section className="relative min-h-[600px] md:min-h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full z-0">
          <video 
            ref={videoRef}
            className="absolute top-0 left-0 w-full h-full object-cover" 
            autoPlay 
            muted 
            loop 
            playsInline
            poster="/placeholder-poster.jpg"
          >
            <source src="/videos/bridgevideo3.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-white z-10"></div>
        </div>

        {/* Content Positioned on top of video */}
        <div className="container px-4 lg:px-8 mx-auto relative z-30 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <img 
                src="/images/svgsblogo.svg" 
                alt="SkillBridge Logo" 
                className="h-16 md:h-24"
              />
            </div>
            <p className="text-xl md:text-2xl mt-2 mb-6 text-black font-medium">
              {t("landingPage.hero.newSubtitle", "Платформа за стажове чрез реални фирмени проекти и верифицирани пътища към наемане")}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button asChild size="lg" className="gap-2 bg-blue-600 hover:bg-blue-700 font-medium">
                <Link to="/register">
                  {t("landingPage.hero.primaryCta", "Започни сега")}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-black text-black bg-transparent hover:bg-white/20 font-medium">
                <Link to="/projects">
                  {t("landingPage.hero.secondaryCta", "Разгледай проекти")}
                </Link>
              </Button>
            </div>
          </div>
        
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section className="py-16 bg-white">
        <div className="container px-4 lg:px-8 mx-auto">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2 space-y-4">
              <h2 className="text-3xl font-bold tracking-tight">
                {t("landingPage.problem.title", "Проблемът, който решаваме")}
              </h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                  <p className="text-lg">Компаниите трудно намират подходящи стажанти и начинаещи кадри с реални практически умения.</p>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                  <p className="text-lg">Младежи и кариерно ориентирани кандидати нямат лесен достъп до смислени стажове.</p>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                  <p className="text-lg">Традиционните курсове не осигуряват пряка връзка с реален бизнес опит и наемане.</p>
                </li>
              </ul>
            </div>
            <div className="md:w-1/2 space-y-4">
              <h2 className="text-3xl font-bold tracking-tight">
                {t("landingPage.solution.title", "Нашето решение")}
              </h2>
              <p className="text-lg">
                SkillBridge е платформа, в която компаниите публикуват реални проектни задания, 
                достъпни като project board с project requirement задания. Кандидати избират задание, 
                разработват решение и го качват в системата. Одобрените кандидати получават достъп до 
                фирмен курс за култура и onboarding с валидационни тестове.
              </p>
              <p className="text-lg">
                След курса резултатите се изпращат към компанията, която може да покани най-добрите 
                за интервю и наемане.
              </p>
              <Button asChild className="gap-2 bg-blue-600 hover:bg-blue-700 mt-4 font-medium">
                <Link to="/about">
                  {t("landingPage.solution.cta", "Научи повече")}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-16 bg-blue-50">
        <div className="container px-4 lg:px-8 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              <span className="text-blue-600">{t("landingPage.features.title", "Как работи SkillBridge")}</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t("landingPage.features.subtitle", "От проектно задание до наемане в четири стъпки")}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="overflow-hidden border-border/40 h-full">
                <CardContent className={cn(
                  "p-6 flex flex-col items-center text-center h-full",
                  index % 2 === 0 ? "bg-blue-50" : "bg-white"
                )}>
                  <div className="mb-4 p-3 rounded-full bg-blue-100">
                    <feature.icon className="h-8 w-8 text-blue-600" />
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
      <section className="py-16 bg-white">
        <div className="container px-4 lg:px-8 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              <span className="text-blue-600">{t("landingPage.audience.title", "За кого е SkillBridge")}</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* For Learners */}
            <div className="bg-background rounded-lg shadow-sm p-8 border border-border/40">
              <div className="flex flex-col items-center text-center">
                <GraduationCap className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-2xl font-bold mb-4">
                  {t("landingPage.audience.learners.title", "B2C - За кандидати")}
                </h3>
                <ul className="space-y-3 text-left">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-lg">Студенти, завършващи, търсещи смислена входна точка към индустрията.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-lg">Преквалифициращи се кадри, търсещи път към нова кариера.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-lg">Самоуки разработчици, дизайнери, маркетинг стажанти и други.</span>
                  </li>
                </ul>
                <Button asChild className="mt-6 gap-2 bg-blue-600 hover:bg-blue-700 font-medium">
                  <Link to="/register">
                    {t("landingPage.audience.learners.cta", "Регистрирай се")}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* For Companies */}
            <div className="bg-background rounded-lg shadow-sm p-8 border border-border/40">
              <div className="flex flex-col items-center text-center">
                <Building className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-2xl font-bold mb-4">
                  {t("landingPage.audience.companies.title", "B2B - За компании")}
                </h3>
                <ul className="space-y-3 text-left">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-lg">Технологични компании, стартъпи, агенции и корпорации, търсещи начинаещи кадри.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-lg">HR екипи, които искат да въведат предефиниран процес за стажове и наемане.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-lg">Организации, търсещи иновативен подход към привличането на таланти.</span>
                  </li>
                </ul>
                <Button asChild className="mt-6 gap-2 bg-blue-600 hover:bg-blue-700 font-medium">
                  <Link to="/business">
                    {t("landingPage.audience.companies.cta", "Станете партньор")}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works / Customer Journey */}
      <section className="py-16 bg-blue-50">
        <div className="container px-4 lg:px-8 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              <span className="text-blue-600">{t("landingPage.journey.title", "Пътят на потребителя")}</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t("landingPage.journey.subtitle", "От регистрация до успешно наемане")}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-white">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <span className="text-blue-600 font-bold">1</span>
                  </div>
                  <h3 className="text-xl font-semibold">Задание</h3>
                </div>
                <p>Фирмата качва проектно задание – с цели, срокове, изисквания.</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <span className="text-blue-600 font-bold">2</span>
                  </div>
                  <h3 className="text-xl font-semibold">Разработка</h3>
                </div>
                <p>Кандидатите избират проект и качват решение – във вид на код, презентация, видео и др.</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <span className="text-blue-600 font-bold">3</span>
                  </div>
                  <h3 className="text-xl font-semibold">Одобрение</h3>
                </div>
                <p>Фирмата преглежда и одобрява кандидати – получават достъп до фирмен курс.</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <span className="text-blue-600 font-bold">4</span>
                  </div>
                  <h3 className="text-xl font-semibold">Обучение</h3>
                </div>
                <p>Курсът съдържа видеа + тестове – валидиращи знания и soft skills.</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <span className="text-blue-600 font-bold">5</span>
                  </div>
                  <h3 className="text-xl font-semibold">Резултати</h3>
                </div>
                <p>След завършване платформата споделя резултатите и изпраща сертификати.</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <span className="text-blue-600 font-bold">6</span>
                  </div>
                  <h3 className="text-xl font-semibold">Наемане</h3>
                </div>
                <p>Фирмата решава дали да направи оферта за стаж или директно наемане.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container px-4 lg:px-8 mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
            <span>{t("landingPage.cta.title", "Готови ли сте да промените процеса на стажове и наемане?")}</span>
          </h2>
          <p className="text-xl max-w-3xl mx-auto mb-8 text-white/90">
            {t("landingPage.cta.subtitle", "Присъединете се към SkillBridge днес и бъдете част от бъдещето на обучението и наемането")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="gap-2 bg-white text-blue-600 hover:bg-white/90 font-medium">
              <Link to="/register">
                {t("landingPage.cta.primaryButton", "Започни сега")}
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="gap-2 border-white text-white hover:bg-white/10 font-medium">
              <Link to="/projects">
                {t("landingPage.cta.secondaryButton", "Разгледай проекти")}
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage; 