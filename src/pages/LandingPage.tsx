import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const LandingPage = () => {
  const { t } = useTranslation();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  // Ensure video plays automatically when component mounts
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error("Video autoplay failed:", error);
      });
    }
  }, []);

  // Categories with sample counts and image paths
  const jobCategories = [
    { 
      id: "development", 
      name: t("categories.development", "Development"), 
      count: 1026, 
      color: "bg-blue-100 text-blue-700",
      description: t("categories.developmentDesc", "Build digital products with cutting-edge technologies"),
      skills: [
        t("skills.backend", "Backend"), 
        t("skills.frontend", "Frontend"), 
        t("skills.mobile", "Mobile"), 
        t("skills.fullstack", "Fullstack")
      ]
    },
    { 
      id: "design", 
      name: t("categories.design", "Design"), 
      count: 458, 
      color: "bg-purple-100 text-purple-700",
      description: t("categories.designDesc", "Create beautiful user experiences and visual identities"),
      skills: [
        t("skills.uiDesign", "UI Design"), 
        t("skills.uxDesign", "UX Design"), 
        t("skills.graphicDesign", "Graphic Design"), 
        t("skills.productDesign", "Product Design")
      ]
    },
    { 
      id: "marketing", 
      name: t("categories.marketing", "Marketing"), 
      count: 326, 
      color: "bg-green-100 text-green-700",
      description: t("categories.marketingDesc", "Drive growth and engagement through creative campaigns"),
      skills: [
        t("skills.digitalMarketing", "Digital Marketing"), 
        t("skills.seo", "SEO"), 
        t("skills.socialMedia", "Social Media"), 
        t("skills.contentMarketing", "Content Marketing")
      ]
    },
    { 
      id: "content", 
      name: t("categories.content", "Content Creation"), 
      count: 294, 
      color: "bg-yellow-100 text-yellow-700",
      description: t("categories.contentDesc", "Craft compelling stories across various media formats"),
      skills: [
        t("skills.contentWriting", "Content Writing"), 
        t("skills.videoProduction", "Video Production"), 
        t("skills.podcasts", "Podcasts"), 
        t("skills.photography", "Photography")
      ]
    },
    { 
      id: "architecture", 
      name: t("categories.architecture", "Architecture"), 
      count: 142, 
      color: "bg-gray-100 text-gray-700",
      description: t("categories.architectureDesc", "Design innovative spaces and sustainable structures"),
      skills: [
        t("skills.residential", "Residential"), 
        t("skills.commercial", "Commercial"), 
        t("skills.interiorDesign", "Interior Design"), 
        t("skills.landscape", "Landscape")
      ]
    },
    { 
      id: "agencies", 
      name: t("categories.agencies", "Agencies"), 
      count: 231, 
      color: "bg-red-100 text-red-700",
      description: t("categories.agenciesDesc", "Collaborate with full-service creative and technical agencies"),
      skills: [
        t("skills.creativeAgencies", "Creative Agencies"), 
        t("skills.digitalAgencies", "Digital Agencies"), 
        t("skills.advertising", "Advertising"), 
        t("skills.prAgencies", "PR Agencies")
      ]
    },
  ];

  // Subcategories for each main category
  const subcategories = {
    development: [
      { id: "backend", name: t("skills.backend", "Backend"), count: 182, icon: "🔧" },
      { id: "frontend", name: t("skills.frontend", "Frontend"), count: 244, icon: "🎨" },
      { id: "fullstack", name: t("skills.fullstack", "Fullstack"), count: 156, icon: "🔄" },
      { id: "mobile", name: t("skills.mobile", "Mobile Dev"), count: 128, icon: "📱" },
    ],
    design: [
      { id: "ui", name: t("skills.uiDesign", "UI Design"), count: 142, icon: "🖌️" },
      { id: "ux", name: t("skills.uxDesign", "UX Design"), count: 124, icon: "🧠" },
      { id: "graphic", name: t("skills.graphicDesign", "Graphic Design"), count: 86, icon: "🎭" },
      { id: "product", name: t("skills.productDesign", "Product Design"), count: 68, icon: "📱" },
    ],
    marketing: [
      { id: "digital", name: t("skills.digitalMarketing", "Digital Marketing"), count: 108, icon: "💻" },
      { id: "seo", name: t("skills.seo", "SEO"), count: 76, icon: "🔍" },
      { id: "social", name: t("skills.socialMedia", "Social Media"), count: 64, icon: "📱" },
      { id: "content-marketing", name: t("skills.contentMarketing", "Content Marketing"), count: 48, icon: "📝" },
    ],
    content: [
      { id: "writing", name: t("skills.contentWriting", "Content Writing"), count: 96, icon: "✍️" },
      { id: "video", name: t("skills.videoProduction", "Video Production"), count: 78, icon: "🎥" },
      { id: "podcasts", name: t("skills.podcasts", "Podcasts"), count: 42, icon: "🎙️" },
      { id: "photography", name: t("skills.photography", "Photography"), count: 38, icon: "📷" },
    ],
    architecture: [
      { id: "residential", name: t("skills.residential", "Residential"), count: 54, icon: "🏠" },
      { id: "commercial", name: t("skills.commercial", "Commercial"), count: 36, icon: "🏢" },
      { id: "interior", name: t("skills.interiorDesign", "Interior Design"), count: 30, icon: "🛋️" },
      { id: "landscape", name: t("skills.landscape", "Landscape"), count: 22, icon: "🌳" },
    ],
    agencies: [
      { id: "creative", name: t("skills.creativeAgencies", "Creative Agencies"), count: 84, icon: "🎨" },
      { id: "digital", name: t("skills.digitalAgencies", "Digital Agencies"), count: 76, icon: "💻" },
      { id: "advertising", name: t("skills.advertising", "Advertising"), count: 42, icon: "📣" },
      { id: "pr", name: t("skills.prAgencies", "PR Agencies"), count: 29, icon: "🔊" },
    ],
  };

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
            {t("videoNotSupported", "Your browser does not support the video tag.")}
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-white z-10"></div>
        </div>

        {/* Content Positioned on top of video - Hero Section */}
        <div className="container px-4 lg:px-8 mx-auto relative z-30 flex flex-col h-full">
          <div className="flex-1 flex flex-col items-center justify-center pt-20 pb-16">
            <div className="w-full max-w-4xl mx-auto text-center">
              <div className="flex justify-center mb-6">
                <img 
                  src="/images/svgsblogo.svg" 
                  alt={t("logoAlt", "SkillBridge Logo")} 
                  className="h-20 md:h-28 drop-shadow-lg"
                />
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-700 drop-shadow-md">
                {t("landingPage.hero.title", "Bridge the Gap Between Learning and Employment")}
              </h1>
              
              <p className="text-xl md:text-2xl mt-2 mb-8 text-gray-500 font-medium max-w-3xl mx-auto drop-shadow-md">
                {t("landingPage.hero.newSubtitle", "Platform for internships through real company projects and verified paths to employment")}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <Button asChild size="lg" className="gap-2 bg-blue-600 hover:bg-blue-700 font-medium text-white border-2 border-blue-500 shadow-lg">
                  <Link to="/register">
                    {t("landingPage.hero.primaryCta", "Get Started")}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-2 border-gray-500 text-gray-500 bg-transparent hover:bg-white/20 font-medium shadow-lg">
                  <Link to="/projects">
                    {t("landingPage.hero.secondaryCta", "Explore Projects")}
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Featured Categories Preview - Teaser before main categories section */}
          <div className="relative pb-16 md:pb-24 w-full">
            <div className="w-full px-4 lg:px-0 mx-auto">
              <div className="flex flex-col items-center">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-500 text-center mb-8 drop-shadow-md">
                  {t("topCategories", "Top Categories")}
                </h2>
                
                <div className="flex justify-center items-center w-full">
                  <div className="flex flex-wrap w-full max-w-4xl gap-4">
                    {jobCategories.slice(0, 3).map((category) => (
                      <Link
                        to={`/categories/${category.id}`}
                        key={category.id}
                        className="group flex flex-col items-center justify-center p-4 rounded-xl bg-white/90 backdrop-blur shadow-lg hover:bg-white transition-all hover:scale-105 hover:shadow-xl w-1/2 md:w-1/4 flex-grow m-2"
                        style={{ minWidth: "150px", maxWidth: "250px", flex: "1 0 auto" }}
                      >
                        <div className={cn("w-12 h-12 rounded-full overflow-hidden flex items-center justify-center mb-2", category.color.split(" ")[0])}>
                          <span className="text-xl font-bold">{category.name.charAt(0)}</span>
                        </div>
                        <h3 className="text-sm md:text-base font-semibold text-center line-clamp-1">{category.name}</h3>
                        <p className="text-xs text-gray-500">{category.count}+ {t("projects", "projects")}</p>
                      </Link>
                    ))}
                  </div>
                </div>
                
              </div>
            </div>
          </div>
        </div>

        {/* Transition curve element for smooth flow to categories section */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-blue-50 rounded-t-[50%] z-20"></div>
      </section>

      {/* Categories Section - Full Featured */}
      <section className="py-16 bg-blue-50 relative z-30">
        <div className="container px-4 lg:px-8 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
              <span className="text-blue-600">{t("landingPage.categories.title", "Discover Projects by Category")}</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t("landingPage.categories.subtitle", "Explore opportunities in different industries and find your path")}
            </p>
          </div>

          {/* Categories grid with enhanced card design */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {jobCategories.map((category) => (
              <div
                key={category.id}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all hover:border-blue-300 group transform hover:-translate-y-1"
              >
                {/* Category header */}
                <div className="p-6 border-b border-gray-100 flex items-center gap-4">
                  <div className={cn("w-14 h-14 rounded-lg overflow-hidden flex items-center justify-center", category.color.split(" ")[0])}>
                    <span className="text-2xl font-bold">{category.name.charAt(0)}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">{category.name}</h3>
                    <p className="text-sm text-gray-500">{category.count} {t("projects", "projects")}</p>
                  </div>
                </div>
                
                {/* Category details */}
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {category.name}
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {category.description}
                  </p>
                  
                  {/* Skills tags */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {category.skills.map((skill, index) => (
                      <span 
                        key={index} 
                        className={cn(
                          "px-3 py-1 rounded-full text-xs font-medium",
                          category.color
                        )}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  
                  {/* Action button */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-sm text-gray-500">
                      {category.count} {t("availableProjects", "available projects")}
                    </span>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-blue-600 border-blue-600 hover:bg-blue-50"
                      asChild
                    >
                      <Link to={`/categories/${category.id}`}>
                        {t("viewProjects", "View Projects")}
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 bg-blue-600 text-white relative">
        {/* Top curved transition */}
        <div className="absolute top-0 left-0 right-0 h-16 bg-blue-50 rounded-b-[50%] -translate-y-full"></div>
        
        <div className="container px-4 lg:px-8 mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
            <span>{t("landingPage.cta.title", "Ready to Transform the Internship and Hiring Process?")}</span>
          </h2>
          <p className="text-xl max-w-3xl mx-auto mb-8 text-white/90">
            {t("landingPage.cta.subtitle", "Join SkillBridge today and be part of the future of education and hiring")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="gap-2 bg-white text-blue-600 hover:bg-white/90 font-medium">
              <Link to="/register">
                {t("landingPage.cta.primaryButton", "Get Started Now")}
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="gap-2 border-white text-white hover:bg-white/10 font-medium">
              <Link to="/projects">
                {t("landingPage.cta.secondaryButton", "Explore Projects")}
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage; 