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
