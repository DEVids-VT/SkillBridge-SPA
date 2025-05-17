import { useState } from "react";
import { Book, Clock, Star, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { cards, components } from "@/lib/design-system";

export interface CourseProps {
  id: number;
  title: string;
  instructor: string;
  description: string;
  image: string;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "All Levels";
  duration: string;
  studentsCount: number;
  rating: number;
  price: number;
  originalPrice?: number;
  tags: string[];
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
  tags
}: CourseProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Generate category color
  const getCategoryColor = (category: string) => {
    const categories: Record<string, string> = {
      'development': components.tagColors.blue,
      'design': components.tagColors.purple,
      'marketing': components.tagColors.green,
      'business': components.tagColors.yellow,
      'personal-dev': components.tagColors.gray,
      'technology': components.tagColors.red,
    };
    
    return categories[category.toLowerCase()] || components.tagColors.gray;
  };

  // Format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  return (
    <div 
      className={cn(cards.base, "flex flex-col h-full")}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Course Image */}
      <div className="relative overflow-hidden h-48">
        <img 
          src={image} 
          alt={title}
          className={cn(
            "w-full h-full object-cover transition-transform duration-500", 
            isHovered ? "scale-110" : "scale-100"
          )} 
        />
        <div className="absolute top-3 left-3">
          <Badge 
            className={cn(
              "text-xs font-semibold",
              getCategoryColor(category)
            )}
          >
            {category}
          </Badge>
        </div>
      </div>
      
      {/* Course Content */}
      <div className={cn(cards.body, "flex-1 flex flex-col")}>
        <h3 className="text-xl font-bold mb-2 line-clamp-2">{title}</h3>
        <p className="text-sm text-gray-600 font-medium mb-1">{instructor}</p>
        <p className="text-sm text-gray-500 mb-4 line-clamp-2">{description}</p>
        
        {/* Course Meta */}
        <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
          <span className="flex items-center gap-1">
            <Clock size={14} />
            {duration}
          </span>
          <span className="flex items-center gap-1">
            <Book size={14} />
            {level}
          </span>
        </div>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.slice(0, 3).map((tag, index) => (
            <span 
              key={index}
              className={cn(components.tag, "bg-gray-100 text-gray-700")}
            >
              {tag}
            </span>
          ))}
          {tags.length > 3 && (
            <span className={cn(components.tag, "bg-gray-100 text-gray-700")}>
              +{tags.length - 3}
            </span>
          )}
        </div>
        
        {/* Course Stats */}
        <div className="mt-auto">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{rating.toFixed(1)}</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <Users size={14} />
              {studentsCount > 1000 
                ? `${(studentsCount / 1000).toFixed(1)}k students` 
                : `${studentsCount} students`}
            </div>
          </div>
          
          {/* Price */}
          <div className="flex items-center justify-between">
            <div>
              <span className="font-bold text-lg">{formatPrice(price)}</span>
              {originalPrice && originalPrice > price && (
                <span className="text-sm text-gray-500 line-through ml-2">
                  {formatPrice(originalPrice)}
                </span>
              )}
            </div>
            <Button 
              variant="outline" 
              size="sm"
              className="text-blue-600 border-blue-600 hover:bg-blue-50"
            >
              View Course
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 