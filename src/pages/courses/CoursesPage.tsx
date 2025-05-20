import { useState } from 'react';
import { cn } from '@/lib/utils';
import { spacing } from '@/lib/design-system';
import { CoursesHeader } from './components/CoursesHeader';
import { FilterSection } from './components/FilterSection';
import { CoursesList } from './components/CoursesList';
import { coursesData, categories, levels, priceRanges } from './coursesData';
import { CourseProps } from '@/pages/courses/components/CourseCard';
import { Button } from '@/components/ui/button';
import { Filter, Sliders } from 'lucide-react';

const CoursesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedPrice, setSelectedPrice] = useState('all');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality
    console.log('Searching for:', searchQuery);
  };

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedLevel('all');
    setSelectedPrice('all');
    setSearchQuery('');
  };

  // Filter courses based on selections
  const filteredCourses = coursesData.filter((course) => {
    // Filter by category
    const categoryMatch =
      selectedCategory === 'all' ||
      course.category.toLowerCase() === selectedCategory.toLowerCase();

    // Filter by level
    const levelMatch =
      selectedLevel === 'all' || course.level.toLowerCase() === selectedLevel.toLowerCase();

    // Filter by price
    const priceRange = priceRanges.find((p) => p.id === selectedPrice)?.range;
    const priceMatch =
      selectedPrice === 'all' ||
      (priceRange && course.price >= priceRange[0] && course.price <= priceRange[1]);

    // Return if all conditions are met
    return categoryMatch && levelMatch && priceMatch;
  });

  const handleLoadMore = () => {
    console.log('Loading more courses...');
    // This would load more courses from an API in a real application
  };

  const handleViewCourseDetails = (course: CourseProps) => {
    console.log('Viewing course details:', course);
    // This would typically navigate to a course detail page
  };

  return (
    <div className={cn(spacing.container, spacing.headerOffset, 'py-8')}>
      {/* Header section */}
      <CoursesHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
      />

      <div className="flex flex-col lg:flex-row gap-8 mb-8">
        {/* Filter section */}
        <FilterSection
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          levels={levels}
          selectedLevel={selectedLevel}
          setSelectedLevel={setSelectedLevel}
          priceRanges={priceRanges}
          selectedPrice={selectedPrice}
          setSelectedPrice={setSelectedPrice}
          resetFilters={resetFilters}
        />

        {/* Main content */}
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

          {/* Courses list */}
          <CoursesList
            courses={filteredCourses}
            loadMore={handleLoadMore}
            onViewDetails={handleViewCourseDetails}
          />
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;
