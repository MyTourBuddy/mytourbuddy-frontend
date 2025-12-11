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
