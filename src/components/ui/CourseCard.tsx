import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { cards, colors } from '@/lib/design-system';

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
        'flex flex-col h-full cursor-pointer transition-colors text-white'
      )}
      style={{ backgroundColor: colors.blueDark }}
      onClick={onClick}
    >
      {/* Course thumbnail */}
      <div className="relative aspect-video w-full overflow-hidden rounded-t-xl">
        <img src={image} alt={title} className="object-cover w-full h-full" />
        <Badge 
          className="absolute top-2 left-2"
          style={{ backgroundColor: colors.orange, color: colors.dark }}
        >
          {category}
        </Badge>
      </div>

      {/* Course details */}
      <div className="flex-1 p-5">
        <h3 
          className="font-bold text-lg mb-2 line-clamp-2 transition-colors hover:opacity-80"
          style={{ color: colors.white }}
        >
          {title}
        </h3>

        <p className="text-sm mb-2" style={{ color: colors.yellow }}>By {instructor}</p>

        <p 
          className="text-sm mb-4 line-clamp-2"
          style={{ color: colors.white, opacity: 0.7 }}
        >
          {description}
        </p>

        {/* Course metadata */}
        <div 
          className="flex items-center gap-4 text-sm mb-4"
          style={{ color: colors.white, opacity: 0.7 }}
        >
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" style={{ color: colors.yellow }} />
            {duration}
          </span>
          <span className="flex items-center gap-1">
            <Users className="h-4 w-4" style={{ color: colors.yellow }} />
            {studentsCount.toLocaleString()}
          </span>
          <span className="flex items-center gap-1">
            <Star 
              className="h-4 w-4" 
              style={{ color: colors.yellow, fill: colors.yellow }} 
            />
            {rating}
          </span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.slice(0, 3).map((tag, index) => (
            <Badge 
              key={index} 
              variant="secondary" 
              className="text-xs"
              style={{ backgroundColor: colors.blue, color: colors.yellow }}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Price and action */}
      <div className="p-5 pt-0 mt-auto">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span 
              className="text-2xl font-bold"
              style={{ color: colors.yellow }}
            >
              ${price}
            </span>
            {originalPrice > price && (
              <span 
                className="text-sm line-through ml-2"
                style={{ color: colors.white, opacity: 0.5 }}
              >
                ${originalPrice}
              </span>
            )}
          </div>
          <Badge 
            variant="secondary" 
            style={{ backgroundColor: colors.blue, color: colors.yellow }}
          >
            {level}
          </Badge>
        </div>

        <Button 
          className="w-full hover:opacity-80"
          style={{
            backgroundColor: colors.orange,
            color: colors.dark,
            border: 'none'
          }}
        >
          View Course
        </Button>
      </div>
    </div>
  );
}
