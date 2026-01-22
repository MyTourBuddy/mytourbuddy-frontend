"use client";

import ReviewsListCard from "@/components/reviews/ReviewsListCard";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Spinner } from "@/components/ui/spinner";
import { useAuth } from "@/context/AuthContext";
import { useReviewsByTourist } from "@/hooks/useReviewQueries";
import Link from "next/link";
import { PiSmileySad } from "react-icons/pi";

const MyReviews = () => {
  const { user } = useAuth();
  const {
    data: reviews,
    isLoading: loading,
    error,
  } = useReviewsByTourist(user?.id || "", !!user);

  if (loading) {
    return (
      <section className="max-w-5xl mx-auto w-full flex justify-center px-4">
        <div className="text-center text-muted-foreground flex md:flex-row flex-col items-center gap-3 md:gap-2 mx-auto py-8">
          <Spinner className="size-6 md:size-4" />
          Loading my reviews...
        </div>
      </section>
    );
  }

  if (!reviews) {
    return (
      <section className="max-w-5xl mx-auto w-full px-4">
        <div className="text-center text-muted-foreground max-w-md flex md:flex-row flex-col justify-center items-center gap-3 md:gap-2 mx-auto py-8">
          <p className="text-2xl md:text-lg">
            <PiSmileySad />
          </p>
          Reviews not found
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="max-w-5xl mx-auto w-full px-4">
        <div className="text-center max-w-md text-red-500 flex md:flex-row flex-col justify-center items-center gap-3 md:gap-2 mx-auto py-8">
          <p className="text-2xl md:text-lg">
            <PiSmileySad />
          </p>
          {error.message}
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-5xl mx-auto w-full pt-3 px-4">
      <div className="flex flex-col gap-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/dashboard">Dashboard</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Reviews</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2 md:gap-3">
            <h1 className="text-3xl font-bold tracking-tight">My Reviews</h1>
            <p className="text-muted-foreground mt-1">
              View and manage your reviews
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {reviews?.map((review) => (
              <ReviewsListCard key={review.id} data={review} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyReviews;
