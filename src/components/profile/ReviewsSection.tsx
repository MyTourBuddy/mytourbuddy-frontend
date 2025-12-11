"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { getReviews, getUsers } from "@/lib/api";
import { User } from "@/models/User";
import { Review } from "@/models/Review";

const ReviewsSection = ({ user }: { user: User }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [reviewsData, usersData] = await Promise.all([
          getReviews(user.id, user.role),
          getUsers(),
        ]);
        setReviews(reviewsData);
        setUsers(usersData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user.id, user.role]);

  const getUserById = (userId: string) => {
    return users.find((u) => u.id === userId);
  };

  return (
    <div className="space-y-4 mt-6 md:mt-8">
      {loading ? (
        <Card className="text-center">
          <CardContent>
            <p className="text-muted-foreground">Loading reviews...</p>
          </CardContent>
        </Card>
      ) : reviews.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {reviews.map((review) => {
            const guide = getUserById(review.guideId);
            const tourist = getUserById(review.touristId);

            return (
              <Card key={review.id} className="h-full">
                <CardContent className="px-2 flex flex-col gap-4">
                  <div className="aspect-video bg-muted rounded-lg shrink-0"></div>
                  <div className="text-sm text-muted-foreground">
                    <p>To: @{guide?.username || "unknown"}</p>
                    <p>By: @{tourist?.username || "unknown"}</p>
                  </div>
                  <div className="flex-1 flex flex-col gap-3">
                    <CardTitle>{review.title}</CardTitle>
                    <CardDescription>{review.description}</CardDescription>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card className="text-center">
          <CardContent>
            <p className="text-muted-foreground">
              No reviews yet. Be the first to leave a review!
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ReviewsSection;
