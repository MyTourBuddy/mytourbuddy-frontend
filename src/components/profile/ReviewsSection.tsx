"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface Review {
  id: string;
  title: string;
  description: string;
  image?: string;
  guideUsername?: string;
  touristUsername?: string;
}

const ReviewsSection = () => {
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: "1",
      title: "Amazing Cultural Experience",
      description:
        "The ancient cities tour was absolutely incredible! Our guide was knowledgeable and made history come alive. Climbing Sigiriya at sunrise was unforgettable.",
      guideUsername: "rajith_tours",
      touristUsername: "emma_travels",
    },
    {
      id: "2",
      title: "Best Tea Plantation Tour",
      description:
        "Beautiful scenery and amazing tea! The train ride through the hills was breathtaking. Highly recommend this tour to anyone visiting Sri Lanka.",
      guideUsername: "nimali_srilanka",
      touristUsername: "david_explorer",
    },
    {
      id: "3",
      title: "Wildlife Safari Adventure",
      description:
        "We spotted 3 leopards in Yala! The guide knew exactly where to go. Beach time in Mirissa was the perfect way to end our adventure.",
      guideUsername: "chaminda_wildlife",
      touristUsername: "sarah_adventures",
    },
  ]);

  return (
    <div className="space-y-4 mt-6 md:mt-8">
      {/* <div className="flex md:flex-row flex-col md:items-center justify-between gap-y-2">
        <h2 className="text-xl font-semibold">Reviews</h2>
        <Button className="gap-2 w-fit">
          <Plus className="w-4 h-4" />
          Add Review
        </Button>
      </div> */}

      {reviews.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {reviews.map((review) => (
            <Card key={review.id} className="h-full">
              <CardContent className="px-2 flex flex-col gap-4">
                <div className="aspect-video bg-muted rounded-lg shrink-0"></div>
                <div>
                  <p>to @{review?.guideUsername}</p>
                  <p>by @{review?.touristUsername}</p>
                </div>
                <div className="flex-1 flex flex-col gap-3">
                  <CardTitle>
                    {review.title}
                  </CardTitle>
                  <CardDescription>
                    {review.description}
                  </CardDescription>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-12 bg-card border-border text-center">
          <p className="text-muted-foreground">
            No reviews yet. Be the first to leave a review!
          </p>
        </Card>
      )}
    </div>
  );
};

export default ReviewsSection;
