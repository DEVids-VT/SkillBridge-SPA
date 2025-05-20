import { useState } from "react";
import { useTranslation } from "react-i18next";
import { spacing } from "@/lib/design-system";
import { ProjectsHeader } from "./components/ProjectsHeader";
import { CategoryFilters } from "./components/CategoryFilters";
import { ProjectsList } from "./components/ProjectsList";
import { projectRequirements } from "./projectsData";
import { CategoryFilter } from "./types";

// Category filter options
const categories: CategoryFilter[] = [
  { id: "all", name: "All Categories" },
  { id: "development", name: "Development", color: "bg-blue-100 text-blue-700" },
  { id: "design", name: "Design", color: "bg-purple-100 text-purple-700" },
  { id: "marketing", name: "Marketing", color: "bg-green-100 text-green-700" },
  { id: "content", name: "Content", color: "bg-yellow-100 text-yellow-700" },
  { id: "architecture", name: "Architecture", color: "bg-gray-100 text-gray-700" },
];

const ProjectsPage = () => {
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

  // Handler for loading more projects
  const handleLoadMore = () => {
    console.log("Loading more projects...");
    // Here you would implement pagination or add more projects to the list
  };

  return (
    <div className={`container mx-auto px-4 py-8 ${spacing.headerOffset}`}>
      <ProjectsHeader 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
      />
      
      <CategoryFilters 
        categories={categories} 
        selectedCategory={selectedCategory} 
        setSelectedCategory={setSelectedCategory} 
      />
      
      <ProjectsList 
        projects={filteredProjects}
        categories={categories}
        onLoadMore={handleLoadMore}
      />
    </div>
  );
};

export default ProjectsPage;
