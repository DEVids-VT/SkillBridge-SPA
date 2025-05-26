import { useState } from "react";
import { useTranslation } from "react-i18next";
import { spacing } from "@/lib/design-system";
import { cn } from "@/lib/utils";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

import { ProjectsHeader } from "./components/ProjectsHeader";
import { ProjectsList } from "./components/ProjectsList";
import { FilterSidebar } from "./components/FilterSidebar";
import { projectRequirements } from "./projectsData";
import { CategoryFilter } from "./types";

const ProjectsPage = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const categories: CategoryFilter[] = [
    { id: "all", name: t('projectsPage.filters.allCategories') },
    { id: "development", name: t('projectsPage.filters.development'), color: "bg-blue-100 text-blue-700" },
    { id: "design", name: t('projectsPage.filters.design'), color: "bg-purple-100 text-purple-700" },
    { id: "marketing", name: t('projectsPage.filters.marketing'), color: "bg-green-100 text-green-700" },
    { id: "content", name: t('projectsPage.filters.content'), color: "bg-yellow-100 text-yellow-700" },
    { id: "architecture", name: t('projectsPage.filters.architecture'), color: "bg-gray-100 text-gray-700" },
  ];

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  // Filter projects based on selected category and search query
  const filteredProjects = projectRequirements.filter(project => {
    // Category filter
    if (selectedCategory !== "all" && project.category !== selectedCategory) {
      return false;
    }
    
    // Search filter
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      return (
        project.title.toLowerCase().includes(query) ||
        project.company.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.skills.some(skill => skill.toLowerCase().includes(query))
      );
    }
    
    return true;
  });

  // Handle category change
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  // Clear all filters
  const handleClearFilters = () => {
    setSelectedCategory("all");
    setSearchQuery("");
  };

  // Handle loading more projects
  const handleLoadMore = () => {
    console.log("Loading more projects...");
    // Here you would implement pagination or add more projects to the list
  };

  return (
    <div className={cn(spacing.headerOffset, "py-8")}>
      <ProjectsHeader 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
      />
      
      <div className={cn(spacing.container, "mt-6")}>
        {/* Mobile filter toggle */}
        <div className="lg:hidden mb-4">
          <Button 
            variant="outline" 
            className="w-full flex items-center justify-center gap-2 text-gray-700"
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
          >
            <Filter className="h-4 w-4" />
            <span>Filters</span>
          </Button>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters sidebar - desktop view */}
          <div className={cn(
            "lg:w-64 flex-shrink-0",
            !mobileFiltersOpen && "hidden lg:block",
            mobileFiltersOpen && "block lg:block"
          )}>
            <FilterSidebar 
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
              onClearFilters={handleClearFilters}
            />
          </div>
          
          {/* Main content */}
          <div className="flex-1">
            <ProjectsList 
              projects={filteredProjects}
              categories={categories}
              onLoadMore={handleLoadMore}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
