import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building, Globe, Users, Link as LinkIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { cards, components } from "@/lib/design-system";

export interface CompanyProps {
  id: number;
  name: string;
  logo: string;
  description: string;
  industry: string;
  location: string;
  website: string;
  yearFounded: number;
  employeeCount: string;
  partnershipLevel: "Gold" | "Silver" | "Bronze";
  partnerSince: number;
  tags: string[];
  featured?: boolean;
}

export function CompanyCard({
  name,
  logo,
  description,
  industry,
  location,
  website,
  yearFounded,
  employeeCount,
  partnershipLevel,
  partnerSince,
  tags,
  featured
}: CompanyProps) {
  // Get partnership level color
  const getPartnershipColor = (level: string) => {
    const levelColors: Record<string, string> = {
      'Gold': "bg-yellow-100 text-yellow-700",
      'Silver': "bg-gray-100 text-gray-700",
      'Bronze': "bg-amber-100 text-amber-700",
    };
    
    return levelColors[level] || "bg-gray-100 text-gray-700";
  };

  return (
    <div className={cn(
      cards.base, 
      "flex flex-col h-full",
      featured && "ring-2 ring-blue-500 ring-offset-2"
    )}>
      {/* Partnership level banner */}
      {partnershipLevel && (
        <div className={cn(
          "py-1 px-4 text-center text-xs font-semibold",
          partnershipLevel === "Gold" ? "bg-yellow-100 text-yellow-700" :
          partnershipLevel === "Silver" ? "bg-gray-200 text-gray-700" :
          "bg-amber-100 text-amber-700"
        )}>
          {partnershipLevel} Partner {partnerSince && `· Since ${partnerSince}`}
        </div>
      )}
      
      {/* Company header */}
      <div className={cn(cards.header, "flex items-center gap-4")}>
        <div className="w-16 h-16 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center border border-gray-200">
          {logo ? (
            <img 
              src={logo} 
              alt={`${name} logo`}
              className="w-full h-full object-contain p-2"
            />
          ) : (
            <Building className="h-8 w-8 text-gray-400" />
          )}
        </div>
        
        <div>
          <h3 className="font-bold text-xl text-gray-900">{name}</h3>
          <p className="text-sm text-gray-500">{industry}</p>
        </div>
      </div>
      
      {/* Company content */}
      <div className={cn(cards.body, "flex-1 flex flex-col")}>
        <p className="text-gray-600 mb-4 line-clamp-3">{description}</p>
        
        {/* Company meta */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Globe size={16} className="text-gray-400" /> 
            <span>{location}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Users size={16} className="text-gray-400" /> 
            <span>{employeeCount} employees</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <LinkIcon size={16} className="text-gray-400" /> 
            <a 
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline truncate"
            >
              {website.replace(/^https?:\/\/(www\.)?/, '')}
            </a>
          </div>
        </div>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
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
        
        {/* Action buttons */}
        <div className="mt-auto pt-4 flex gap-2">
          <Button 
            variant="default"
            className="flex-1"
          >
            View Profile
          </Button>
          <Button 
            variant="outline"
            className="flex-1"
          >
            Partnership
          </Button>
        </div>
      </div>
    </div>
  );
} 