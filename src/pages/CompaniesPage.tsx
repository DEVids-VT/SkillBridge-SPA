import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, Briefcase, Award, TrendingUp, Building2 } from "lucide-react";
import { CompanyCard, type CompanyProps } from "@/components/ui/CompanyCard";
import { spacing, layouts } from "@/lib/design-system";
import { cn } from "@/lib/utils";

// Mock company data
const companiesData: CompanyProps[] = [
  {
    id: 1,
    name: "TechSolutions Inc.",
    logo: "/images/companies/tech-solutions.jpg",
    description: "A leading technology solutions provider focused on digital transformation, cloud services, and enterprise software development.",
    industry: "Information Technology",
    location: "San Francisco, CA",
    website: "https://www.techsolutions.example",
    yearFounded: 2005,
    employeeCount: "1,000-5,000",
    partnershipLevel: "Gold",
    partnerSince: 2018,
    tags: ["Cloud Computing", "Digital Transformation", "Enterprise Software"],
    featured: true
  },
  {
    id: 2,
    name: "InnovateCorp",
    logo: "/images/companies/innovate-corp.jpg",
    description: "Innovation-focused technology company specializing in AI, machine learning, and data analytics solutions.",
    industry: "Artificial Intelligence",
    location: "Boston, MA",
    website: "https://www.innovatecorp.example",
    yearFounded: 2012,
    employeeCount: "500-1,000",
    partnershipLevel: "Silver",
    partnerSince: 2019,
    tags: ["AI", "Machine Learning", "Data Analytics", "Research"]
  },
  {
    id: 3,
    name: "GreenTech Solutions",
    logo: "/images/companies/green-tech.jpg",
    description: "Sustainable technology company developing eco-friendly solutions for businesses and consumers.",
    industry: "Clean Technology",
    location: "Portland, OR",
    website: "https://www.greentech.example",
    yearFounded: 2015,
    employeeCount: "100-500",
    partnershipLevel: "Bronze",
    partnerSince: 2020,
    tags: ["Sustainability", "Clean Energy", "Green Technology"]
  },
  {
    id: 4,
    name: "FinSecurity Group",
    logo: "/images/companies/fin-security.jpg",
    description: "Financial technology company providing secure payment processing, fraud detection, and cybersecurity services.",
    industry: "FinTech",
    location: "New York, NY",
    website: "https://www.finsecurity.example",
    yearFounded: 2010,
    employeeCount: "1,000-5,000",
    partnershipLevel: "Gold",
    partnerSince: 2017,
    tags: ["Cybersecurity", "Finance", "Fraud Detection", "Payments"]
  },
  {
    id: 5,
    name: "HealthPlus Systems",
    logo: "/images/companies/health-plus.jpg",
    description: "Healthcare technology company creating innovative solutions for patient care, telemedicine, and medical record management.",
    industry: "Healthcare Technology",
    location: "Chicago, IL",
    website: "https://www.healthplus.example",
    yearFounded: 2008,
    employeeCount: "500-1,000",
    partnershipLevel: "Silver",
    partnerSince: 2019,
    tags: ["Healthcare", "Telemedicine", "Patient Care", "MedTech"]
  },
  {
    id: 6,
    name: "CreativeWorks Media",
    logo: "/images/companies/creative-works.jpg",
    description: "Creative digital agency specializing in interactive experiences, digital marketing, and content creation.",
    industry: "Digital Media",
    location: "Los Angeles, CA",
    website: "https://www.creativeworks.example",
    yearFounded: 2013,
    employeeCount: "100-500",
    partnershipLevel: "Bronze",
    partnerSince: 2021,
    tags: ["Digital Marketing", "Content Creation", "Interactive Media"]
  },
  {
    id: 7,
    name: "Quantum Dynamics",
    logo: "/images/companies/quantum-dynamics.jpg",
    description: "Cutting-edge research and development firm focused on quantum computing and advanced algorithms.",
    industry: "Quantum Computing",
    location: "Austin, TX",
    website: "https://www.quantumdynamics.example",
    yearFounded: 2016,
    employeeCount: "100-500",
    partnershipLevel: "Silver",
    partnerSince: 2020,
    tags: ["Quantum Computing", "Research", "Algorithms"]
  },
  {
    id: 8,
    name: "EduTech Innovations",
    logo: "/images/companies/edutech.jpg",
    description: "Educational technology company revolutionizing learning with interactive platforms, AI tutoring, and virtual classrooms.",
    industry: "Education Technology",
    location: "Seattle, WA",
    website: "https://www.edutech.example",
    yearFounded: 2014,
    employeeCount: "100-500",
    partnershipLevel: "Bronze",
    partnerSince: 2021,
    tags: ["Education", "E-Learning", "EdTech", "Virtual Learning"]
  }
];

// Industry filter options
const industryFilters = [
  { id: "all", name: "All Industries" },
  { id: "it", name: "Information Technology" },
  { id: "ai", name: "Artificial Intelligence" },
  { id: "fintech", name: "FinTech" },
  { id: "healthcare", name: "Healthcare" },
  { id: "education", name: "Education" },
  { id: "clean-tech", name: "Clean Technology" }
];

// Partnership level filters
const partnershipLevels = [
  { id: "all", name: "All Partners" },
  { id: "gold", name: "Gold Partners" },
  { id: "silver", name: "Silver Partners" },
  { id: "bronze", name: "Bronze Partners" }
];

export default function CompaniesPage() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("all");
  const [selectedPartnershipLevel, setSelectedPartnershipLevel] = useState("all");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality
    console.log("Searching for:", searchQuery);
  };

  // Filter companies based on selections
  const filteredCompanies = companiesData.filter(company => {
    // Filter by industry (simplified matching)
    const industryMatch = selectedIndustry === "all" || 
      company.industry.toLowerCase().includes(selectedIndustry.toLowerCase());
    
    // Filter by partnership level
    const partnershipMatch = selectedPartnershipLevel === "all" || 
      company.partnershipLevel.toLowerCase() === selectedPartnershipLevel.toLowerCase();
    
    // Return if both conditions are met
    return industryMatch && partnershipMatch;
  });

  return (
    <div className={cn(spacing.container, spacing.headerOffset, "py-8")}>
      {/* Header section */}
      <div className={layouts.pageHeader}>
        <div className={layouts.pageHeaderBackground}></div>
        <h1 className={layouts.pageTitle}>
          <span className="text-blue-600">Our Partner</span>{" "}
          <span className="text-gray-600">Companies</span>
        </h1>
        <p className={layouts.pageDescription}>
          Discover our network of partner companies that collaborate with us to create opportunities, drive innovation, and support talent development.
        </p>

        {/* Search bar */}
        <form onSubmit={handleSearch} className="max-w-3xl mx-auto relative">
          <div className="relative flex items-center">
            <Input
              type="text"
              placeholder={t("searchCompaniesPlaceholder", "Search companies by name, industry, or location")}
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
          <div className="flex justify-center gap-6 mt-4 text-sm text-gray-500">
            <span className="flex items-center gap-1"><Building2 size={14} /> {companiesData.length}+ partner companies</span>
            <span className="flex items-center gap-1"><Award size={14} /> {companiesData.filter(c => c.partnershipLevel === "Gold").length} gold partners</span>
          </div>
        </form>
      </div>

      {/* Featured Partners Section */}
      <div className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Featured Partners</h2>
          <Button variant="link" className="text-blue-600">
            View All Featured
          </Button>
        </div>
        
        <div className={layouts.grid.cards2}>
          {companiesData
            .filter(company => company.featured)
            .map(company => (
              <CompanyCard key={company.id} {...company} />
            ))}
        </div>
      </div>
      
      {/* Filter section */}
      <div className="mb-8 flex flex-col sm:flex-row gap-4 justify-between items-start">
        <div className="flex flex-wrap gap-2">
          <span className="text-sm font-medium self-center">Industry:</span>
          {industryFilters.map(filter => (
            <Button
              key={filter.id}
              variant={selectedIndustry === filter.id ? "default" : "outline"}
              size="sm"
              className="rounded-full"
              onClick={() => setSelectedIndustry(filter.id)}
            >
              {filter.name}
            </Button>
          ))}
        </div>
        
        <div className="flex flex-wrap gap-2">
          <span className="text-sm font-medium self-center">Partnership:</span>
          {partnershipLevels.map(level => (
            <Button
              key={level.id}
              variant={selectedPartnershipLevel === level.id ? "default" : "outline"}
              size="sm"
              className="rounded-full"
              onClick={() => setSelectedPartnershipLevel(level.id)}
            >
              {level.name}
            </Button>
          ))}
        </div>
      </div>

      {/* All Partners Grid */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-6">All Partner Companies</h2>
        <div className={layouts.grid.cards3}>
          {filteredCompanies.map(company => (
            <CompanyCard key={company.id} {...company} />
          ))}
        </div>
        
        {/* No results message */}
        {filteredCompanies.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold mb-2">No companies found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your search or filter criteria</p>
            <Button 
              onClick={() => {
                setSelectedIndustry("all");
                setSelectedPartnershipLevel("all");
                setSearchQuery("");
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
        
        {/* Load more button */}
        {filteredCompanies.length > 0 && filteredCompanies.length >= 6 && (
          <div className="flex justify-center mt-8">
            <Button 
              variant="outline" 
              className="px-8 py-2 rounded-full border-blue-600 text-blue-600 hover:bg-blue-50"
            >
              Load More Companies
            </Button>
          </div>
        )}
      </div>
      
      {/* Partnership Benefits Section */}
      <div className="mb-16 bg-gray-50 p-8 rounded-xl">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Partnership Program Benefits</h2>
          <p className="text-gray-600 mb-8">
            Join our partner network to access exclusive resources, collaboration opportunities, and gain visibility in the tech community.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <Briefcase className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">Talent Access</h3>
              <p className="text-gray-500 text-sm">Connect with skilled professionals and recruit top talent for your organization.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">Brand Visibility</h3>
              <p className="text-gray-500 text-sm">Increase your company's exposure through our platform, events, and marketing channels.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <Award className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">Collaboration</h3>
              <p className="text-gray-500 text-sm">Participate in industry projects, research initiatives, and networking opportunities.</p>
            </div>
          </div>
          
          <Button size="lg" className="px-8">
            Become a Partner
          </Button>
        </div>
      </div>
    </div>
  );
} 