import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { cards } from '@/lib/design-system';

// Define CourseProps inline for now:
export interface CourseProps {
  title: string;
  instructor: string;
  description: string;
  image: string;
  category: string;
  level: string;
  duration: string;
  studentsCount: number;
  rating: number;
  price: number;
  originalPrice: number;
  tags: string[];
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
        'flex flex-col h-full cursor-pointer hover:-translate-y-1 transition-transform bg-[#001d3d] text-white'
      )}
      onClick={onClick}
    >
      {/* Course thumbnail */}
      <div className="relative aspect-video w-full overflow-hidden rounded-t-xl">
        <img src={image} alt={title} className="object-cover w-full h-full" />
        <Badge className="absolute top-2 left-2 bg-[#ffc300] text-[#001d3d]">{category}</Badge>
      </div>

      {/* Course details */}
      <div className="flex-1 p-5">
        <h3 className="font-bold text-lg mb-2 line-clamp-2 hover:text-[#ffd60a] transition-colors">
          {title}
        </h3>

        <p className="text-sm text-[#ffd60a] mb-2">By {instructor}</p>

        <p className="text-sm text-gray-400 mb-4 line-clamp-2">{description}</p>

        {/* Course metadata */}
        <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4 text-[#ffd60a]" />
            {duration}
          </span>
          <span className="flex items-center gap-1">
            <Users className="h-4 w-4 text-[#ffd60a]" />
            {studentsCount.toLocaleString()}
          </span>
          <span className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-[#ffd60a] text-[#ffd60a]" />
            {rating}
          </span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs bg-[#003566] text-[#ffd60a]">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Price and action */}
      <div className="p-5 pt-0 mt-auto">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-2xl font-bold text-[#ffd60a]">${price}</span>
            {originalPrice > price && (
              <span className="text-sm text-gray-400 line-through ml-2">${originalPrice}</span>
            )}
          </div>
          <Badge variant="secondary" className="bg-[#003566] text-[#ffd60a]">
            {level}
          </Badge>
        </div>

        <Button className="w-full bg-[#ffc300] text-[#001d3d] hover:bg-[#ffd60a]">
          View Course
        </Button>
      </div>
    </div>
  );
}
