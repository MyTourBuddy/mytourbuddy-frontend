import { Experience } from "@/schemas/experience.schema";
import { Package } from "@/schemas/package.schema";
import { Review } from "@/schemas/review.schema";
import { Guide, Tourist } from "@/schemas/user.schema";

export const touristUser: Tourist = {
  id: "tourist-001",
  role: "tourist",
  firstName: "John",
  lastName: "Doe",
  email: "john.tourist@test.com",
  age: 28,
  username: "johntourist",
  password: "Tourist123",
  avatar: "",
  memberSince: "2025-12-01",
  phone: "+1 234 567 8900",
  isProfileComplete: false,
  country: "United States",
  travelPreferences: ["Adventure", "Culture", "Photography"],
  preferredDestinations: ["Sri Lanka", "Thailand", "Japan", "Italy"],
  travelInterests: ["Adventure", "Culture", "Food & Cuisine", "Photography"],
  languagesSpoken: ["English", "Spanish"],
};

export const guideUser: Guide = {
  id: "guide-001",
  role: "guide",
  firstName: "Sarah",
  lastName: "Silva",
  email: "sarah.guide@test.com",
  age: 32,
  username: "sarahguide",
  password: "Guide123",
  avatar: "",
  memberSince: "2025-11-15",
  phone: "+94 77 123 4567",
  isProfileComplete: false,
  languages: ["English", "Sinhala", "Tamil"],
  yearsOfExp: 5,
  bio: "Passionate tour guide with extensive knowledge of Sri Lankan culture and history. Specializing in cultural tours and authentic local experiences.",
  specializations: ["Culture", "Food & Cuisine", "Photography"],
  certifications: "Licensed Tour Guide, First Aid Certified",
  dailyRate: 15000,
  maxGroupSize: 10,
  transportMode: "Car",
  ageGroups: ["Adults", "Seniors"],
  workingDays: ["Monday", "Saturday"],
  emergencyContact: "+94 77 987 6543",
  website: "www.sarahtours.com",
  socialMedia: ["@sarahtours"],
};

export const packages: Package[] = [
  {
    id: "pkg-001",
    guideId: "guide-001",

    title: "Ancient Cities & Cultural Heritage",
    description:
      "5-day tour covering Anuradhapura, Polonnaruwa, and Sigiriya. Explore ancient kingdoms, climb the iconic Rock Fortress, and immerse yourself in Sri Lanka's rich history.",
    price: 4000,

    duration: "5 days / 4 nights",
    location: "Anuradhapura, Polonnaruwa, Sigiriya",
    image: "https://i.ibb.co/Xk52Wk9t/testpkgcover.jpg",

    maxGroupSize: 8,

    included: [
      "Accommodation (4 nights)",
      "Daily breakfast",
      "Private transport",
      "English-speaking guide",
      "Entrance fees to sites",
    ],
    notIncluded: [
      "International flights",
      "Travel insurance",
      "Personal expenses",
    ],
    note: "Moderate fitness required for Sigiriya climb. Best time: December–April.",

    status: "PUBLISHED",
    createdAt: new Date("2025-01-15"),
  },

  {
    id: "pkg-002",
    guideId: "guide-001",

    title: "Hill Country Tea Trail",
    description:
      "3-day journey through Nuwara Eliya and Ella. Visit tea plantations, scenic train rides, waterfalls, and experience the cool climate of Sri Lanka's highlands.",
    price: 2800,

    duration: "3 days / 2 nights",
    location: "Nuwara Eliya, Ella",
    image: "",

    maxGroupSize: 6,

    included: [
      "Train tickets (Kandy to Ella)",
      "Tea factory tour",
      "Accommodation",
      "Transport",
      "Guide",
    ],
    notIncluded: ["Meals except breakfast", "Tips"],
    note: "Pack warm clothes — nights can be cold!",

    status: "PUBLISHED",
    createdAt: new Date("2025-02-20"),
  },

  {
    id: "pkg-003",
    guideId: "guide-002",

    title: "Wildlife & Beach Paradise",
    description:
      "7-day adventure combining Yala Safari for leopard spotting and relaxing beach time in Mirissa. Perfect blend of wildlife and coastal experiences.",
    price: 6500,

    duration: "7 days / 6 nights",
    location: "Yala National Park, Mirissa",
    image: "",

    included: [
      "2x Jeep safaris in Yala",
      "Beachfront accommodation",
      "Whale watching tour (seasonal)",
      "All transport",
    ],
    notIncluded: ["Alcohol", "Water sports"],
    note: "Best for leopard sightings: May–August",

    status: "PUBLISHED",
    createdAt: new Date("2025-03-10"),
  },
];

export const experiences: Experience[] = [
  {
    id: "exp-001",
    guideId: "guide-001",
    title: "Sigiriya Rock Fortress Tour",
    description:
      "Guided 150+ tourists through the ancient Sigiriya Rock Fortress, sharing historical insights about the 5th-century palace and its magnificent frescoes. Specialized in early morning climbs to catch the breathtaking sunrise views.",
    experiencedAt: new Date("2023-08-15"),
    createdAt: new Date("2023-08-20"),
  },
  {
    id: "exp-002",
    guideId: "guide-001",
    title: "Kandy Cultural Experience",
    description:
      "Led cultural tours in Kandy, including visits to the Temple of the Tooth, traditional dance performances, and local spice gardens. Expert in explaining the rich Buddhist heritage and colonial history of the hill capital.",
    experiencedAt: new Date("2023-10-05"),
    createdAt: new Date("2023-10-08"),
  },
  {
    id: "exp-003",
    guideId: "guide-001",
    title: "Yala National Park Safari",
    description:
      "Conducted wildlife safaris in Yala National Park with a focus on leopard tracking and bird watching. Successfully spotted leopards in 80% of tours and identified over 200 bird species for nature enthusiasts.",
    experiencedAt: new Date("2024-01-12"),
    createdAt: new Date("2024-01-15"),
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
