import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { spacing } from "@/lib/design-system";
import { EventsHeader } from "../events/components/EventsHeader";
import { CalendarDays, MapPin, Share2, Calendar, ExternalLink } from "lucide-react";

const EventPage = () => {
  const { t } = useTranslation();
  const [showFullDescription, setShowFullDescription] = useState(false);

  // Simulating a speaker list for the event
  const speakers = [
    {
      name: "Alex Johnson",
      title: "CEO, SkillBridge",
      image: "/images/speakers/speaker1.jpg"
    },
    {
      name: "Maria Garcia",
      title: "Product Director",
      image: "/images/speakers/speaker2.jpg"
    },
    {
      name: "David Chen",
      title: "Head of Partnerships",
      image: "/images/speakers/speaker3.jpg"
    }
  ];

  // Define agenda items directly
  const agendaItems = [
    t("productLaunchEvent.agenda.items.0", "6:00 PM - Registration & Networking"),
    t("productLaunchEvent.agenda.items.1", "6:30 PM - Welcome & Introduction"),
    t("productLaunchEvent.agenda.items.2", "7:00 PM - Product Demo"),
    t("productLaunchEvent.agenda.items.3", "7:45 PM - Q&A Session"),
    t("productLaunchEvent.agenda.items.4", "8:15 PM - Networking & Refreshments")
  ];

  return (
    <div className={cn(spacing.container, spacing.headerOffset, "py-8")}>
      <EventsHeader />
      {/* Event Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{t("productLaunchEvent.title")}</h1>
        <div className="flex flex-wrap gap-4 text-gray-600 mb-4">
          <div className="flex items-center gap-1">
            <CalendarDays className="h-4 w-4" />
            <span>{t("productLaunchEvent.date")}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="inline-block w-1 h-1 bg-gray-400 rounded-full"></span>
            <span>{t("productLaunchEvent.time")}</span>
          </div>
        </div>
        <div className="flex items-center gap-1 text-gray-600 mb-6">
          <MapPin className="h-4 w-4" />
          <span>{t("productLaunchEvent.location")}</span>
          <span className="mx-1">•</span>
          <span>{t("productLaunchEvent.address")}</span>
        </div>
        <div className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
          {t("productLaunchEvent.isVirtual")}
        </div>
      </div>

      {/* Event Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Hero Image */}
          <div className="rounded-xl overflow-hidden mb-8 bg-gray-100 h-80 flex items-center justify-center">
            <img 
              src="/images/product-launch.jpg" 
              alt="Product Launch Event" 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = "https://placehold.co/800x400/e2e8f0/64748b?text=Product+Launch+Event";
              }}
            />
          </div>

          {/* Event Description */}
          <div className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">
              {t("productLaunchEvent.description").split(' ').slice(0, 5).join(' ')}...
            </h2>
            <div className={cn("text-gray-700", !showFullDescription && "line-clamp-4")}>
              {t("productLaunchEvent.description")}
            </div>
            {!showFullDescription && (
              <button 
                onClick={() => setShowFullDescription(true)}
                className="text-blue-600 font-medium mt-2 hover:text-blue-800"
              >
                Read more
              </button>
            )}
          </div>

          {/* Event Agenda */}
          <div className="mb-10">
            <h3 className="text-xl font-semibold mb-4">{t("productLaunchEvent.agenda.title")}</h3>
            <div className="space-y-4">
              {agendaItems.map((item, index) => (
                <div key={index} className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 mr-3"></div>
                  <div>{item}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Speakers */}
          <div className="mb-10">
            <h3 className="text-xl font-semibold mb-2">{t("productLaunchEvent.speakers.title")}</h3>
            <p className="text-gray-600 mb-6">{t("productLaunchEvent.speakers.description")}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {speakers.map((speaker, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4 text-center">
                  <div className="w-20 h-20 mx-auto mb-3 rounded-full overflow-hidden bg-gray-200">
                    <img 
                      src={speaker.image} 
                      alt={speaker.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = `https://placehold.co/200x200/e2e8f0/64748b?text=${speaker.name.charAt(0)}`;
                      }}
                    />
                  </div>
                  <h4 className="font-semibold">{speaker.name}</h4>
                  <p className="text-sm text-gray-600">{speaker.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <div className="bg-gray-50 rounded-xl p-6 mb-6">
              <Button className="w-full mb-4">{t("productLaunchEvent.register")}</Button>
              
              <div className="space-y-4">
                <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {t("productLaunchEvent.addToCalendar")}
                </Button>
                
                <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                  <Share2 className="h-4 w-4" />
                  {t("productLaunchEvent.shareEvent")}
                </Button>
                
                <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                  <ExternalLink className="h-4 w-4" />
                  {t("productLaunchEvent.joinVirtually")}
                </Button>
              </div>
            </div>

            <div className="bg-blue-50 rounded-xl p-6">
              <h3 className="font-semibold mb-3">Event Location</h3>
              <div className="rounded-lg overflow-hidden bg-gray-200 h-40 mb-3">
                {/* Map placeholder */}
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  Map View
                </div>
              </div>
              <div className="text-sm">
                <div className="font-medium">{t("productLaunchEvent.location")}</div>
                <div className="text-gray-600">{t("productLaunchEvent.address")}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventPage;
