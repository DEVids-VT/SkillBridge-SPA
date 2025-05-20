import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { cards } from '@/lib/design-system';

import { Course } from '@/pages/courses/types';

export interface CourseProps extends Course {
  onClick?: () => void;
}

export function CourseCard({
  title,
  instructor,
  description,
  image,
  category,
  level,
  duration,
  studentsCount,
  rating,
  price,
  originalPrice,
  tags,
  onClick,
}: CourseProps) {
  return (
    <div
      className={cn(
        cards.base,
        'flex flex-col h-full cursor-pointer hover:-translate-y-1 transition-transform'
      )}
      onClick={onClick}
    >
      {/* Course thumbnail */}
      <div className="relative aspect-video w-full overflow-hidden rounded-t-xl">
        <img src={image} alt={title} className="object-cover w-full h-full" />
        <Badge className="absolute top-2 left-2 bg-white/90">{category}</Badge>
      </div>

      {/* Course details */}
      <div className="flex-1 p-5">
        <h3 className="font-bold text-lg mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
          {title}
        </h3>

        <p className="text-sm text-gray-600 mb-2">By {instructor}</p>

        <p className="text-sm text-gray-500 mb-4 line-clamp-2">{description}</p>

        {/* Course metadata */}
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {duration}
          </span>
          <span className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            {studentsCount.toLocaleString()}
          </span>
          <span className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            {rating}
          </span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Price and action */}
      <div className="p-5 pt-0 mt-auto">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-2xl font-bold">${price}</span>
            {originalPrice > price && (
              <span className="text-sm text-gray-500 line-through ml-2">${originalPrice}</span>
            )}
          </div>
          <Badge variant="secondary">{level}</Badge>
        </div>

        <Button className="w-full">View Course</Button>
      </div>
    </div>
  );
}
