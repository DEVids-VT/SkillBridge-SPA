import { layouts } from "@/lib/design-system";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useTranslation } from "react-i18next";

interface EventsHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: (e: React.FormEvent) => void;
}

export const EventsHeader = ({ searchQuery, setSearchQuery, handleSearch }: EventsHeaderProps) => {
  const { t } = useTranslation();

  return (
    <div className={layouts.pageHeader}>
      <div className={layouts.pageHeaderBackground}></div>
      <h1 className={layouts.pageTitle}>
        <span className="text-blue-600">Upcoming</span>{" "}
        <span className="text-gray-600">Events</span>
      </h1>
      <p className={layouts.pageDescription}>
        Discover industry events, workshops, hackathons, and meetups to expand your network and learn from experts in your field.
      </p>

      {/* Search bar */}
      <form onSubmit={handleSearch} className="max-w-3xl mx-auto relative">
        <div className="relative flex items-center">
          <Input
            type="text"
            placeholder={t("searchEventsPlaceholder", "Search for events, topics, or locations")}
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
      </form>
    </div>
  );
};
