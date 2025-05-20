import { Button } from '@/components/ui/button';
import { layouts } from '@/lib/design-system';
import { CourseCard, type CourseProps } from './CourseCard';

interface CoursesListProps {
  courses: CourseProps[];
  loadMore: () => void;
  onViewDetails?: (course: CourseProps) => void;
}

export const CoursesList = ({ courses, loadMore, onViewDetails }: CoursesListProps) => {
  return (
    <div>
      {courses.length > 0 ? (
        <>
          <div className={layouts.grid.cards3}>
            {' '}
            {courses.map((course) => (
              <CourseCard key={course.id} {...course} onClick={() => onViewDetails?.(course)} />
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <Button variant="outline" className="rounded-full px-8" onClick={loadMore}>
              Load More Courses
            </Button>
          </div>
        </>
      ) : (
        <div className="text-center py-16">
          <h3 className="text-xl font-semibold mb-2">No courses found</h3>
          <p className="text-gray-500 mb-6">Try adjusting your search or filter criteria</p>
          <Button onClick={() => window.location.reload()}>Clear Filters</Button>
        </div>
      )}
    </div>
  );
};
