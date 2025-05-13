import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Search, ExternalLink, TrendingUp, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

export function JobBoardPage() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // All categories with sample counts and image paths
  const jobCategories = [
    { 
      id: "development", 
      name: "Development", 
      count: 1026, 
      color: "bg-blue-100", 
      textColor: "text-blue-700",
      iconBg: "bg-blue-500",
      description: "Build digital products with cutting-edge technologies",
      image: "/images/categories/development.webp"
    },
    { 
      id: "design", 
      name: "Design", 
      count: 458, 
      color: "bg-purple-100", 
      textColor: "text-purple-700",
      iconBg: "bg-purple-500",
      description: "Create beautiful user experiences and visual identities",
      image: "/images/categories/design.webp"
    },
    { 
      id: "marketing", 
      name: "Marketing", 
      count: 326, 
      color: "bg-green-100", 
      textColor: "text-green-700", 
      iconBg: "bg-green-500",
      description: "Drive growth and engagement through creative campaigns",
      image: "/images/categories/marketing.webp"
    },
    { 
      id: "content", 
      name: "Content Creation", 
      count: 294, 
      color: "bg-yellow-100", 
      textColor: "text-yellow-700", 
      iconBg: "bg-yellow-500",
      description: "Craft compelling stories across various media formats",
      image: "/images/categories/content.webp"
    },
    { 
      id: "architecture", 
      name: "Architecture", 
      count: 142, 
      color: "bg-gray-100", 
      textColor: "text-gray-700", 
      iconBg: "bg-gray-500",
      description: "Design innovative spaces and sustainable structures",
      image: "/images/categories/architecture.webp"
    },
    { 
      id: "agencies", 
      name: "Agencies", 
      count: 231, 
      color: "bg-red-100", 
      textColor: "text-red-700", 
      iconBg: "bg-red-500",
      description: "Collaborate with full-service creative and technical agencies",
      image: "/images/categories/agencies.webp"
    },
  ];

  // Subcategories for each main category
  const subcategories = {
    development: [
      { id: "backend", name: "Backend", count: 182, icon: "🔧" },
      { id: "frontend", name: "Frontend", count: 244, icon: "🎨" },
      { id: "fullstack", name: "Fullstack", count: 156, icon: "🔄" },
      { id: "mobile", name: "Mobile Dev", count: 128, icon: "📱" },
      { id: "data", name: "Data Science", count: 104, icon: "📊" },
      { id: "devops", name: "DevOps", count: 86, icon: "⚙️" },
      { id: "blockchain", name: "Blockchain", count: 74, icon: "🔗" },
      { id: "gamedev", name: "Game Dev", count: 52, icon: "🎮" },
    ],
    design: [
      { id: "ui", name: "UI Design", count: 142, icon: "🖌️" },
      { id: "ux", name: "UX Design", count: 124, icon: "🧠" },
      { id: "graphic", name: "Graphic Design", count: 86, icon: "🎭" },
      { id: "product", name: "Product Design", count: 68, icon: "📱" },
      { id: "branding", name: "Branding", count: 38, icon: "🏷️" },
    ],
    marketing: [
      { id: "digital", name: "Digital Marketing", count: 108, icon: "💻" },
      { id: "seo", name: "SEO", count: 76, icon: "🔍" },
      { id: "social", name: "Social Media", count: 64, icon: "📱" },
      { id: "content-marketing", name: "Content Marketing", count: 48, icon: "📝" },
      { id: "analytics", name: "Marketing Analytics", count: 30, icon: "📊" },
    ],
    content: [
      { id: "writing", name: "Content Writing", count: 96, icon: "✍️" },
      { id: "video", name: "Video Production", count: 78, icon: "🎥" },
      { id: "podcasts", name: "Podcasts", count: 42, icon: "🎙️" },
      { id: "photography", name: "Photography", count: 38, icon: "📷" },
      { id: "animation", name: "Animation", count: 40, icon: "🎬" },
    ],
    architecture: [
      { id: "residential", name: "Residential", count: 54, icon: "🏠" },
      { id: "commercial", name: "Commercial", count: 36, icon: "🏢" },
      { id: "interior", name: "Interior Design", count: 30, icon: "🛋️" },
      { id: "landscape", name: "Landscape", count: 22, icon: "🌳" },
    ],
    agencies: [
      { id: "creative", name: "Creative Agencies", count: 84, icon: "🎨" },
      { id: "digital", name: "Digital Agencies", count: 76, icon: "💻" },
      { id: "advertising", name: "Advertising", count: 42, icon: "📣" },
      { id: "pr", name: "PR Agencies", count: 29, icon: "🔊" },
    ],
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search logic here
    console.log("Searching for:", searchQuery);
  };

  return (
    <div className="container mx-auto px-4 py-8 pt-32">
      {/* Header section with enhanced styling */}
      <div className="text-center mb-16 relative">
        <div className="absolute -top-44 left-0 right-0 h-52 bg-gradient-to-r from-blue-50 to-purple-50 rounded-b-3xl -z-10"></div>
        <h1 className="text-5xl font-bold mb-6">
          <span className="text-blue-600">Project Board</span>{" "}
          <span className="text-gray-600">за GenZ общността</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-10">
          Открий своята следваща възможност сред хиляди проекти от различни индустрии. 
          Свързваме амбициозни таланти с иновативни компании.
        </p>

        {/* Enhanced search bar */}
        <form onSubmit={handleSearch} className="max-w-3xl mx-auto relative">
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder={t("searchJobsPlaceholder", "Търси по ключова дума в текстовете на всички обяви")}
              className="w-full px-6 py-4 pr-12 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type="submit"
              className="absolute right-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2 transition-colors"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>
          </div>
          <div className="flex justify-center gap-4 mt-4 text-sm text-gray-500">
            <span className="flex items-center gap-1"><TrendingUp size={14} /> Trending: UX/UI, React, TypeScript</span>
            <span className="flex items-center gap-1"><BookOpen size={14} /> 2000+ active projects</span>
          </div>
        </form>
      </div>

      {/* Category filters */}
      <div className="flex justify-center mb-12 gap-2 flex-wrap">
        <Button
          variant={selectedCategory === "all" ? "default" : "outline"}
          className="rounded-full px-6"
          onClick={() => setSelectedCategory("all")}
        >
          All Categories
        </Button>
        {jobCategories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            className={cn("rounded-full px-6", 
              selectedCategory === category.id ? `bg-${category.iconBg.replace("bg-", "")}` : ""
            )}
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.name}
          </Button>
        ))}
      </div>

      {/* View recent jobs button with enhanced styling */}
      <div className="flex justify-center mb-16">
        <Button
          variant="outline"
          className="rounded-full bg-gradient-to-r from-blue-600 to-blue-800 text-white hover:from-blue-700 hover:to-blue-900 py-6 px-8 shadow-md"
        >
          <span className="font-semibold">Виж обявите подредени</span>
          <span className="ml-2 animate-bounce">↓</span>
        </Button>
      </div>

      {/* Categories grid with enhanced card design */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {jobCategories.map((category) => (
          <div 
            key={category.id} 
            className="border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
          >
            {/* Category header with image */}
            <div className="relative h-48 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
              <div 
                className="absolute inset-0 bg-cover bg-center z-0"
                style={{ backgroundImage: `url(${category.image})` }}
              ></div>
              <div className="absolute bottom-0 left-0 p-5 z-20 w-full">
                <div className="flex justify-between items-end">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-1">{category.name}</h2>
                    <p className="text-white/90 text-sm line-clamp-2">{category.description}</p>
                  </div>
                  <span className={cn("px-3 py-1 rounded-full text-sm font-medium", category.color, category.textColor)}>
                    {category.count}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Subcategories list */}
            <div className="p-5">
              <div className="space-y-2">
                {subcategories[category.id as keyof typeof subcategories]?.slice(0, 4).map(subcat => (
                  <div key={subcat.id} className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-md transition-colors cursor-pointer">
                    <div className={cn("w-8 h-8 flex items-center justify-center rounded-md", category.color)}>
                      <span className="text-lg">{subcat.icon}</span>
                    </div>
                    <span className="font-medium">{subcat.name}</span>
                    <span className="ml-auto text-gray-500 text-sm">{subcat.count}</span>
                  </div>
                ))}
                
                <div className="text-center py-4 mt-2">
                  <Button variant="link" className={cn(category.textColor)}>
                    Виж всички <ExternalLink className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Statistics section */}
      <div className="mt-20 mb-12">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2">Расте всеки ден</h2>
          <p className="text-gray-600">Нашата общност от таланти и компании се разраства</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-6 rounded-lg bg-blue-50">
            <p className="text-3xl font-bold text-blue-600 mb-2">2,477+</p>
            <p className="text-gray-600">Активни проекти</p>
          </div>
          <div className="p-6 rounded-lg bg-purple-50">
            <p className="text-3xl font-bold text-purple-600 mb-2">12,846+</p>
            <p className="text-gray-600">Регистрирани таланти</p>
          </div>
          <div className="p-6 rounded-lg bg-green-50">
            <p className="text-3xl font-bold text-green-600 mb-2">1,482+</p>
            <p className="text-gray-600">Компании</p>
          </div>
          <div className="p-6 rounded-lg bg-yellow-50">
            <p className="text-3xl font-bold text-yellow-600 mb-2">8,924+</p>
            <p className="text-gray-600">Успешни проекта</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobBoardPage; 