// Mock user data for testing

export interface User {
  id: string;
  role: "tourist" | "guide";
  // Personal Info
  firstName: string;
  lastName: string;
  email: string;
  age: string;
  // Account Info
  username: string;
  password: string;
  // Profile
  avatar?: string;
  memberSince: string;
  phone?: string;
  country?: string;
}

export interface Tourist extends User {
  role: "tourist";
  // Travel Details
  travelPreferences?: string[];
  preferredDestinations?: string[];
  travelInterests?: string[];
  languagesSpoken?: string[];
}

export interface Guide extends User {
  role: "guide";
  // Guide Details
  serviceLocation: string;
  languages: string[];
  experience: string;
  // Professional Details
  bio?: string;
  specializations?: string[];
  certifications?: string;
  // Service Information
  hourlyRate?: string;
  dailyRate?: string;
  maxGroupSize?: string;
  transportMode?: string;
  ageGroups?: string[];
  serviceAreas?: string;
  // Contact & Availability
  workingDays?: string;
  workingHours?: string;
  emergencyContact?: string;
  website?: string;
  socialMedia?: string;
}

export interface Package {
  id: string;
  guideId: string;
  title: string;
  description: string;
  image?: string;
}

export interface Experience {
  id: string;
  guideId: string;
  title: string;
  description: string;
  image?: string;
}

export interface Review {
  id: string;
  guideId: string;
  touristId: string;
  title: string;
  description: string;
  rating?: number;
  image?: string;
  createdAt: string;
}

// ============================================
// MOCK DATA
// ============================================

export const touristUser: Tourist = {
  id: "tourist-001",
  role: "tourist",
  // Personal Info
  firstName: "John",
  lastName: "Doe",
  email: "john.tourist@test.com",
  age: "28",
  // Account Info
  username: "johntourist",
  password: "Tourist123",
  // Profile
  memberSince: "2025-12-01",
  phone: "+1 234 567 8900",
  country: "United States",
  // Travel Details
  preferredDestinations: ["Sri Lanka", "Thailand", "Japan", "Italy"],
  travelInterests: ["Adventure", "Culture", "Food & Cuisine", "Photography"],
  languagesSpoken: ["English", "Spanish"],
  travelPreferences: ["Adventure", "Culture", "Photography"],
};

export const guideUser: Guide = {
  id: "guide-001",
  role: "guide",
  // Personal Info
  firstName: "Sarah",
  lastName: "Silva",
  email: "sarah.guide@test.com",
  age: "32",
  // Account Info
  username: "sarahguide",
  password: "Guide123",
  // Profile
  memberSince: "2025-11-15",
  phone: "+94 77 123 4567",
  country: "Sri Lanka",
  // Guide Details
  serviceLocation: "Colombo",
  languages: ["English", "Sinhala", "Tamil"],
  experience: "5",
  // Professional Details
  bio: "Passionate tour guide with extensive knowledge of Sri Lankan culture and history. Specializing in cultural tours and authentic local experiences.",
  specializations: ["Culture", "Food & Cuisine", "Photography"],
  certifications: "Licensed Tour Guide, First Aid Certified",
  // Service Information
  hourlyRate: "2500",
  dailyRate: "15000",
  maxGroupSize: "10",
  transportMode: "Car",
  ageGroups: ["Adults", "Seniors"],
  serviceAreas: "Colombo, Galle, Kandy, Sigiriya",
  // Contact & Availability
  workingDays: "Monday - Saturday",
  workingHours: "8:00 AM - 6:00 PM",
  emergencyContact: "+94 77 987 6543",
  website: "www.sarahtours.com",
  socialMedia: "@sarahtours",
};

export const packages: Package[] = [
  {
    id: "pkg-001",
    guideId: "guide-001",
    title: "Ancient Cities & Cultural Heritage",
    description:
      "5-day tour covering Anuradhapura, Polonnaruwa, and Sigiriya. Explore ancient kingdoms, climb the iconic Rock Fortress, and immerse yourself in Sri Lanka's rich history.",
  },
  {
    id: "pkg-002",
    guideId: "guide-001",
    title: "Hill Country Tea Trail",
    description:
      "3-day journey through Nuwara Eliya and Ella. Visit tea plantations, scenic train rides, waterfalls, and experience the cool climate of Sri Lanka's highlands.",
  },
  {
    id: "pkg-003",
    guideId: "guide-001",
    title: "Wildlife & Beach Paradise",
    description:
      "7-day adventure combining Yala Safari for leopard spotting and relaxing beach time in Mirissa. Perfect blend of wildlife and coastal experiences.",
  },
];

export const experiences: Experience[] = [
  {
    id: "exp-001",
    guideId: "guide-001",
    title: "Sigiriya Rock Fortress Tour",
    description:
      "Guided 150+ tourists through the ancient Sigiriya Rock Fortress, sharing historical insights about the 5th-century palace and its magnificent frescoes. Specialized in early morning climbs to catch the breathtaking sunrise views.",
  },
  {
    id: "exp-002",
    guideId: "guide-001",
    title: "Kandy Cultural Experience",
    description:
      "Led cultural tours in Kandy, including visits to the Temple of the Tooth, traditional dance performances, and local spice gardens. Expert in explaining the rich Buddhist heritage and colonial history of the hill capital.",
  },
  {
    id: "exp-003",
    guideId: "guide-001",
    title: "Yala National Park Safari",
    description:
      "Conducted wildlife safaris in Yala National Park with a focus on leopard tracking and bird watching. Successfully spotted leopards in 80% of tours and identified over 200 bird species for nature enthusiasts.",
  },
];

export const reviews: Review[] = [
  {
    id: "rev-001",
    guideId: "guide-001",
    touristId: "tourist-002",
    title: "Amazing Cultural Experience",
    description:
      "The ancient cities tour was absolutely incredible! Our guide was knowledgeable and made history come alive. Climbing Sigiriya at sunrise was unforgettable.",
    rating: 5,
    createdAt: "2025-11-20",
  },
  {
    id: "rev-002",
    guideId: "guide-001",
    touristId: "tourist-003",
    title: "Best Tea Plantation Tour",
    description:
      "Beautiful scenery and amazing tea! The train ride through the hills was breathtaking. Highly recommend this tour to anyone visiting Sri Lanka.",
    rating: 5,
    createdAt: "2025-11-25",
  },
  {
    id: "rev-003",
    guideId: "guide-001",
    touristId: "tourist-001",
    title: "Wildlife Safari Adventure",
    description:
      "We spotted 3 leopards in Yala! The guide knew exactly where to go. Beach time in Mirissa was the perfect way to end our adventure.",
    rating: 5,
    createdAt: "2025-12-05",
  },
];

export const allUsers: (Tourist | Guide)[] = [touristUser, guideUser];
