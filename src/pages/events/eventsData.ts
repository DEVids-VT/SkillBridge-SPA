import { EventProps, EventType, EventFilter, LocationFilter } from './types';

export const eventsData: EventProps[] = [
  {
    id: 1,
    title: "TechConnect Hackathon 2023",
    description: "Join us for a 48-hour coding challenge to build innovative solutions for sustainability challenges.",
    image: "/images/events/hackathon.jpg",
    type: "hackathon",
    date: "2023-06-15",
    time: "09:00 AM - 6:00 PM",
    location: "Innovation Hub, San Francisco",
    isVirtual: false,
    organizer: "TechConnect Foundation",
    attendeesCount: 120,
    maxAttendees: 150,
    tags: ["Coding", "Innovation", "Sustainability", "Teamwork"]
  },
  {
    id: 2,
    title: "Design Systems Conference",
    description: "A virtual conference focused on design systems, component libraries, and scaling design in organizations.",
    image: "/images/events/conference.jpg",
    type: "conference",
    date: "2023-07-10",
    time: "10:00 AM - 5:00 PM",
    location: "Online",
    isVirtual: true,
    organizer: "DesignOps Global",
    attendeesCount: 450,
    maxAttendees: 1000,
    tags: ["Design Systems", "UX", "DesignOps", "Figma"]
  },
  {
    id: 3,
    title: "AI and Machine Learning Workshop",
    description: "Hands-on workshop about practical applications of AI and ML in business. Bring your laptop!",
    image: "/images/events/workshop.jpg",
    type: "workshop",
    date: "2023-06-22",
    time: "1:00 PM - 5:00 PM",
    location: "Tech Campus, Building 3, New York",
    isVirtual: false,
    organizer: "AI Academy",
    attendeesCount: 35,
    maxAttendees: 40,
    tags: ["AI", "Machine Learning", "Python", "Data Science"]
  },
  {
    id: 4,
    title: "Frontend Developers Meetup",
    description: "Monthly meetup for frontend developers to network, share knowledge, and discuss latest trends.",
    image: "/images/events/meetup.jpg",
    type: "meetup",
    date: "2023-06-08",
    time: "6:30 PM - 9:00 PM",
    location: "Coworking Space XYZ, Austin",
    isVirtual: false,
    organizer: "Frontend Community",
    attendeesCount: 65,
    maxAttendees: 100,
    tags: ["Frontend", "React", "JavaScript", "CSS", "Networking"]
  },
  {
    id: 5,
    title: "Global Data Science Competition",
    description: "A 2-week online competition to solve real-world data challenges and win prizes.",
    image: "/images/events/competition.jpg",
    type: "competition",
    date: "2023-07-01",
    time: "Starts at 12:00 PM",
    location: "Online",
    isVirtual: true,
    organizer: "DataSci Networks",
    attendeesCount: 320,
    maxAttendees: 500,
    tags: ["Data Science", "Competition", "Analytics", "Prizes"]
  },
  {
    id: 6,
    title: "Building Scalable Cloud Architecture",
    description: "Technical lecture on designing scalable and resilient cloud architectures for enterprise applications.",
    image: "/images/events/lecture.jpg",
    type: "lecture",
    date: "2023-06-28",
    time: "3:00 PM - 4:30 PM",
    location: "Online",
    isVirtual: true,
    organizer: "Cloud Professionals Association",
    attendeesCount: 210,
    maxAttendees: 500,
    tags: ["Cloud", "AWS", "Architecture", "Scalability"]
  },
  {
    id: 7,
    title: "Women in Tech Hackathon",
    description: "A hackathon aimed at encouraging women's participation in technology and coding.",
    image: "/images/events/women-hackathon.jpg",
    type: "hackathon",
    date: "2023-07-15",
    time: "9:00 AM - 9:00 PM",
    location: "Diversity Tech Hub, Boston",
    isVirtual: false,
    organizer: "Women in Tech Alliance",
    attendeesCount: 85,
    maxAttendees: 120,
    tags: ["WomenInTech", "Diversity", "Coding", "Mentorship"]
  },
  {
    id: 8,
    title: "Product Management Workshop",
    description: "Learn practical product management skills from industry leaders. Ideal for aspiring and junior PMs.",
    image: "/images/events/pm-workshop.jpg",
    type: "workshop",
    date: "2023-06-18",
    time: "10:00 AM - 4:00 PM",
    location: "Business Center, Chicago",
    isVirtual: false,
    organizer: "Product School",
    attendeesCount: 28,
    maxAttendees: 30,
    tags: ["Product Management", "Agile", "Strategy", "UX"]
  }
];

// Event type filters
export const eventTypeFilters: EventFilter[] = [
  { id: "all", name: "All Events" },
  { id: "hackathon", name: "Hackathons" },
  { id: "conference", name: "Conferences" },
  { id: "workshop", name: "Workshops" },
  { id: "meetup", name: "Meetups" },
  { id: "competition", name: "Competitions" },
  { id: "lecture", name: "Lectures" }
];

// Location filters
export const locationFilters: LocationFilter[] = [
  { id: "all", name: "All Locations" },
  { id: "inperson", name: "In-Person" },
  { id: "virtual", name: "Virtual" }
];
