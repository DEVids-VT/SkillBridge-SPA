import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, BookOpen, TrendingUp, Sliders } from "lucide-react";
import { CourseCard, type CourseProps } from "@/components/ui/CourseCard";
import { spacing, layouts } from "@/lib/design-system";
import { cn } from "@/lib/utils";

// Mock course data
const coursesData: CourseProps[] = [
  {
    id: 1,
    title: "Complete Web Development Bootcamp 2023",
    instructor: "Dr. Angela Yu",
    description: "Become a full-stack web developer with just one course. HTML, CSS, Javascript, React, Node, MongoDB and more!",
    image: "/images/courses/web-dev.jpg",
    category: "Development",
    level: "All Levels",
    duration: "63 hours",
    studentsCount: 125430,
    rating: 4.7,
    price: 89.99,
    originalPrice: 199.99,
    tags: ["HTML", "CSS", "JavaScript", "React", "Node.js", "MongoDB"]
  },
  {
    id: 2,
    title: "UX/UI Design Essentials: Adobe XD & Figma",
    instructor: "Daniel Scott",
    description: "Master UX/UI Design with Adobe XD and Figma. Complete real-world projects that improve your portfolio.",
    image: "/images/courses/uxui.jpg",
    category: "Design",
    level: "Beginner",
    duration: "32 hours",
    studentsCount: 87542,
    rating: 4.8,
    price: 79.99,
    originalPrice: 149.99,
    tags: ["Figma", "Adobe XD", "UI Design", "UX Design", "Wireframing"]
  },
  {
    id: 3,
    title: "Digital Marketing Strategy: SEO, Social Media & More",
    instructor: "Sarah Johnson",
    description: "Learn to create effective digital marketing campaigns across SEO, PPC, social media, and content marketing.",
    image: "/images/courses/marketing.jpg",
    category: "Marketing",
    level: "Intermediate",
    duration: "28 hours",
    studentsCount: 65234,
    rating: 4.6,
    price: 69.99,
    originalPrice: 129.99,
    tags: ["SEO", "Social Media", "PPC", "Content Marketing"]
  },
  {
    id: 4,
    title: "Machine Learning A-Z: Hands-On Python & R",
    instructor: "Kirill Eremenko",
    description: "Learn to create Machine Learning algorithms in Python and R. Master Data Science, ML, and AI fundamentals.",
    image: "/images/courses/machine-learning.jpg",
    category: "Technology",
    level: "Advanced",
    duration: "44 hours",
    studentsCount: 157890,
    rating: 4.9,
    price: 99.99,
    originalPrice: 189.99,
    tags: ["Python", "R", "Machine Learning", "AI", "Data Science"]
  },
  {
    id: 5,
    title: "Financial Analysis & Financial Modeling",
    instructor: "Chris Haroun",
    description: "Complete Financial Analyst Training: Excel, Financial Statement Analysis, DCF, Accounting, Business Valuation.",
    image: "/images/courses/finance.jpg",
    category: "Business",
    level: "Intermediate",
    duration: "36 hours",
    studentsCount: 42567,
    rating: 4.5,
    price: 84.99,
    originalPrice: 169.99,
    tags: ["Excel", "Financial Analysis", "Accounting", "Valuation"]
  },
  {
    id: 6,
    title: "Photography Masterclass: A Complete Guide",
    instructor: "Phil Ebiner",
    description: "The best online photography course that will teach you how to take amazing photos and sell them.",
    image: "/images/courses/photography.jpg",
    category: "Design",
    level: "All Levels",
    duration: "25 hours",
    studentsCount: 96432,
    rating: 4.6,
    price: 59.99,
    originalPrice: 119.99,
    tags: ["Photography", "Lightroom", "Photoshop", "DSLR", "Editing"]
  },
  {
    id: 7,
    title: "Modern JavaScript From The Beginning",
    instructor: "Brad Traversy",
    description: "Learn and build projects with pure JavaScript (No frameworks or libraries).",
    image: "/images/courses/javascript.jpg",
    category: "Development",
    level: "Beginner",
    duration: "21 hours",
    studentsCount: 83214,
    rating: 4.7,
    price: 74.99,
    originalPrice: 149.99,
    tags: ["JavaScript", "ES6", "DOM", "Fetch API", "Projects"]
  },
  {
    id: 8,
    title: "Public Speaking & Presentation Skills",
    instructor: "TJ Walker",
    description: "Communicate effectively in business presentations, speeches, and meetings. Overcome fear of public speaking.",
    image: "/images/courses/public-speaking.jpg",
    category: "Personal-Dev",
    level: "All Levels",
    duration: "18 hours",
    studentsCount: 37546,
    rating: 4.4,
    price: 49.99,
    originalPrice: 99.99,
    tags: ["Public Speaking", "Communication", "Presentation Skills"]
  },
  {
    id: 9,
    title: "iOS App Development with Swift 5",
    instructor: "Nick Walter",
    description: "Learn iOS app development by building real apps with Swift 5 and Xcode 13.",
    image: "/images/courses/ios-dev.jpg",
    category: "Development",
    level: "Intermediate",
    duration: "39 hours",
    studentsCount: 56789,
    rating: 4.8,
    price: 94.99,
    originalPrice: 179.99,
    tags: ["iOS", "Swift", "Xcode", "UIKit", "ARKit"]
  }
];

// Category options
const categories = [
  { id: "all", name: "All Categories" },
  { id: "development", name: "Development" },
  { id: "design", name: "Design" },
  { id: "marketing", name: "Marketing" },
  { id: "business", name: "Business" },
  { id: "personal-dev", name: "Personal Development" },
  { id: "technology", name: "Technology" },
];

// Level options
const levels = [
  { id: "all", name: "All Levels" },
  { id: "beginner", name: "Beginner" },
  { id: "intermediate", name: "Intermediate" },
  { id: "advanced", name: "Advanced" },
];

export default function CoursesPage() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality
    console.log("Searching for:", searchQuery);
  };

  // Filter courses based on selections
  const filteredCourses = coursesData.filter(course => {
    // Filter by category
    const categoryMatch = selectedCategory === "all" || 
      course.category.toLowerCase() === selectedCategory.toLowerCase();
    
    // Filter by level
    const levelMatch = selectedLevel === "all" || 
      course.level.toLowerCase() === selectedLevel.toLowerCase();
    
    // Return if both conditions are met
    return categoryMatch && levelMatch;
  });

  return (
    <div className={cn(spacing.container, spacing.headerOffset, "py-8")}>
      {/* Header section */}
      <div className={layouts.pageHeader}>
        <div className={layouts.pageHeaderBackground}></div>
        <h1 className={layouts.pageTitle}>
          <span className="text-blue-600">Expand</span>{" "}
          <span className="text-gray-600">Your Knowledge</span>
        </h1>
        <p className={layouts.pageDescription}>
          Browse our library of expert-led courses designed to enhance your skills and advance your career in tech, design, business, and more.
        </p>

        {/* Search bar */}
        <form onSubmit={handleSearch} className="max-w-3xl mx-auto relative mb-8">
          <div className="relative flex items-center">
            <Input
              type="text"
              placeholder={t("searchCoursesPlaceholder", "Search for any course, topic or instructor")}
              className="h-14 pl-6 pr-12 rounded-full shadow-sm"
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
            <span className="flex items-center gap-1"><TrendingUp size={14} /> Trending: React, AI, UX/UI, Python</span>
            <span className="flex items-center gap-1"><BookOpen size={14} /> {coursesData.length}+ courses available</span>
          </div>
        </form>
      </div>

      {/* Filter section */}
      <div className="flex flex-col lg:flex-row gap-6 mb-8">
        <div className="lg:w-1/4 space-y-6">
          <div className="p-6 border border-gray-200 rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Filters</h3>
              <Button variant="ghost" size="sm" className="text-blue-600 h-8 px-2">
                Clear All
              </Button>
            </div>
            
            {/* Category filter */}
            <div className="mb-6">
              <h4 className="text-sm font-medium mb-3">Category</h4>
              <div className="space-y-2">
                {categories.map(category => (
                  <div key={category.id} className="flex items-center">
                    <input
                      type="radio"
                      id={`category-${category.id}`}
                      name="category"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                      checked={selectedCategory === category.id}
                      onChange={() => setSelectedCategory(category.id)}
                    />
                    <label htmlFor={`category-${category.id}`} className="ml-2 text-sm text-gray-700">
                      {category.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Level filter */}
            <div>
              <h4 className="text-sm font-medium mb-3">Level</h4>
              <div className="space-y-2">
                {levels.map(level => (
                  <div key={level.id} className="flex items-center">
                    <input
                      type="radio"
                      id={`level-${level.id}`}
                      name="level"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                      checked={selectedLevel === level.id}
                      onChange={() => setSelectedLevel(level.id)}
                    />
                    <label htmlFor={`level-${level.id}`} className="ml-2 text-sm text-gray-700">
                      {level.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="lg:w-3/4">
          {/* View options for mobile */}
          <div className="flex justify-between items-center mb-6 lg:hidden">
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Filter size={14} /> Filter
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Sliders size={14} /> Sort
            </Button>
          </div>
          
          {/* Sort options (desktop) */}
          <div className="hidden lg:flex justify-between items-center mb-6">
            <p className="text-sm text-gray-500">Showing {filteredCourses.length} results</p>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select className="text-sm border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500">
                <option>Most Popular</option>
                <option>Highest Rated</option>
                <option>Newest</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>
          </div>
          
          {/* Courses grid */}
          <div className={layouts.grid.cards3}>
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} {...course} />
            ))}
          </div>
          
          {/* Load more button */}
          {filteredCourses.length > 0 && (
            <div className="flex justify-center mt-8">
              <Button 
                variant="outline" 
                className="px-8 py-2 rounded-full border-blue-600 text-blue-600 hover:bg-blue-50"
              >
                Load More Courses
              </Button>
            </div>
          )}

          {/* No results */}
          {filteredCourses.length === 0 && (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold mb-2">No courses found</h3>
              <p className="text-gray-500 mb-4">Try adjusting your search or filter criteria</p>
              <Button 
                onClick={() => {
                  setSelectedCategory("all");
                  setSelectedLevel("all");
                  setSearchQuery("");
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 