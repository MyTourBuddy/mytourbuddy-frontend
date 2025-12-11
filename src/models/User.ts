interface User {
  id: string;
  role: "tourist" | "guide";
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  username: string;
  password: string;
  avatar: string;
  memberSince: string;
  phone: string;
}

interface Tourist extends User {
  role: "tourist";
  country: string;
  travelPreferences: string[];
  preferredDestinations?: string[];
  travelInterests?: string[];
  languagesSpoken?: string[];
}

interface Guide extends User {
  role: "guide";
  languages: string[];
  yearsOfExp: number;
  bio?: string;
  specializations: string[];
  certifications?: string;
  dailyRate: number;
  maxGroupSize: number;
  transportMode: string;
  ageGroups: string[];
  workingDays: string[];
  emergencyContact?: string;
  website?: string;
  socialMedia?: string[];
}

export type { User, Tourist, Guide };
