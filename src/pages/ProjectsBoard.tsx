import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Search, Filter, Briefcase, TrendingUp, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Clock, MapPin, Building2 } from "lucide-react";
import { Link } from "react-router-dom";
import { relatedProjects } from "@/data/mock-data";

// Mock company logos (would be replaced with actual images in production)
const companyLogos = [
  "/images/companies/company1.webp",
  "/images/companies/company2.webp",
  "/images/companies/company3.webp",
  "/images/companies/company4.webp",
  "/images/companies/company5.webp",
  "/images/companies/company6.webp",
];

// Mock project requirement data
const projectRequirements = [
  {
    id: 1,
    company: "TechCorp Solutions",
    logo: companyLogos[0],
    title: "Mobile App Development",
    description: "Looking for a talented React Native developer to build a cross-platform mobile application for our health tech startup. The project involves integrating with health APIs and creating an intuitive user interface.",
    category: "development",
    skills: ["React Native", "JavaScript", "API Integration", "UI/UX"],
    postedDate: "2023-05-15",
    deadline: "2023-06-30",
  },
  {
    id: 2,
    company: "CreativeMinds Agency",
    logo: companyLogos[1],
    title: "UX/UI Redesign for SaaS Platform",
    description: "Our client's SaaS platform needs a complete UX/UI overhaul to improve user experience and modernize the interface. Looking for a designer with strong experience in SaaS products.",
    category: "design",
    skills: ["Figma", "UX Design", "UI Design", "SaaS Experience"],
    postedDate: "2023-05-10",
    deadline: "2023-06-15",
  },
  {
    id: 3,
    company: "GrowthMarketing",
    logo: companyLogos[2],
    title: "Content Strategy for Fintech",
    description: "Develop a comprehensive content strategy for our fintech client's blog and social media channels. The ideal candidate has experience in financial content and understands SEO principles.",
    category: "marketing",
    skills: ["Content Strategy", "SEO", "Financial Knowledge", "Social Media"],
    postedDate: "2023-05-18",
    deadline: "2023-06-01",
  },
  {
    id: 4,
    company: "Archiplex Studio",
    logo: companyLogos[3],
    title: "3D Visualization for Commercial Building",
    description: "Create photorealistic 3D renderings of a new commercial building complex. This project requires expertise in architectural visualization and attention to detail.",
    category: "architecture",
    skills: ["3D Modeling", "Rendering", "Architectural Visualization", "Blender"],
    postedDate: "2023-05-05",
    deadline: "2023-07-10",
  },
  {
    id: 5,
    company: "DataSmart Analytics",
    logo: companyLogos[4],
    title: "Data Dashboard Development",
    description: "Build an interactive data dashboard using React and D3.js to visualize complex datasets for our analytics platform. Experience with large data visualization is a must.",
    category: "development",
    skills: ["React", "D3.js", "Data Visualization", "JavaScript"],
    postedDate: "2023-05-12",
    deadline: "2023-06-25",
  },
  {
    id: 6,
    company: "SocialBoost Media",
    logo: companyLogos[5],
    title: "Social Media Campaign for Product Launch",
    description: "Plan and execute a comprehensive social media campaign for a new eco-friendly product launch. Looking for creative marketers with experience in sustainable product marketing.",
    category: "marketing",
    skills: ["Social Media", "Campaign Planning", "Green Marketing", "Analytics"],
    postedDate: "2023-05-20",
    deadline: "2023-06-10",
  },
];

// Category filter options
const categories = [
  { id: "all", name: "All Categories" },
  { id: "development", name: "Development", color: "bg-blue-100 text-blue-700" },
  { id: "design", name: "Design", color: "bg-purple-100 text-purple-700" },
  { id: "marketing", name: "Marketing", color: "bg-green-100 text-green-700" },
  { id: "content", name: "Content", color: "bg-yellow-100 text-yellow-700" },
  { id: "architecture", name: "Architecture", color: "bg-gray-100 text-gray-700" },
];

export default function ProjectsBoard() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  // Filter projects based on selected category
  const filteredProjects = selectedCategory === "all" 
    ? projectRequirements 
    : projectRequirements.filter(project => project.category === selectedCategory);

  return (
    <div className="container mx-auto px-4 py-8 pt-32">
      {/* Header section */}
      <div className="text-center mb-16 relative">
        <div className="absolute -top-44 left-0 right-0 h-52 bg-gradient-to-r from-blue-50 to-purple-50 rounded-b-3xl -z-10"></div>
        <h1 className="text-5xl font-bold mb-6">
          <span className="text-blue-600">Project Requirements</span>{" "}
          <span className="text-gray-600">Board</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-10">
          Find your next project challenge from various industries. Connect with innovative companies looking for your talent and expertise.
        </p>

        {/* Search bar */}
        <form onSubmit={handleSearch} className="max-w-3xl mx-auto relative">
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder={t("searchProjectsPlaceholder", "Search projects by keyword or company name")}
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
            <span className="flex items-center gap-1"><TrendingUp size={14} /> Trending: Mobile App, UX/UI, Content Strategy</span>
            <span className="flex items-center gap-1"><BookOpen size={14} /> 500+ active projects</span>
          </div>
        </form>
      </div>

      {/* Category filters */}
      <div className="flex justify-center mb-12 gap-2 flex-wrap">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            className={cn("rounded-full px-6", 
              selectedCategory === category.id && category.id !== "all" ? category.color : ""
            )}
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.name}
          </Button>
        ))}
      </div>

      {/* Project cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all hover:border-blue-300 group"
          >
            {/* Company info */}
            <div className="p-6 border-b border-gray-100 flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden flex items-center justify-center">
                {/* Replace with actual company logo */}
                <Briefcase className="h-6 w-6 text-gray-500" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{project.company}</h3>
                <p className="text-sm text-gray-500">Posted: {new Date(project.postedDate).toLocaleDateString()}</p>
              </div>
            </div>
            
            {/* Project details */}
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                {project.title}
              </h2>
              <p className="text-gray-600 mb-4 line-clamp-3">
                {project.description}
              </p>
              
              {/* Skills tags */}
              <div className="flex flex-wrap gap-2 mb-5">
                {project.skills.map((skill, index) => (
                  <span 
                    key={index} 
                    className={cn(
                      "px-3 py-1 rounded-full text-xs font-medium",
                      categories.find(c => c.id === project.category)?.color || "bg-gray-100 text-gray-700"
                    )}
                  >
                    {skill}
                  </span>
                ))}
              </div>
              
              {/* Action buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <span className="text-sm text-gray-500">
                  Deadline: {new Date(project.deadline).toLocaleDateString()}
                </span>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-blue-600 border-blue-600 hover:bg-blue-50"
                >
                  View Details
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Load more button */}
      <div className="flex justify-center">
        <Button 
          variant="outline" 
          className="px-8 py-2 rounded-full border-blue-600 text-blue-600 hover:bg-blue-50"
        >
          Load More Projects
        </Button>
      </div>
    </div>
  );
} 