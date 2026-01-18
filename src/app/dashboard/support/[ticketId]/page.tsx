"use client";

import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { useTicket } from "@/hooks/useTicketQueries";
import Link from "next/link";
import { useParams } from "next/navigation";
import { PiSmileySad } from "react-icons/pi";
import { TbCircleCheck, TbCircleDot } from "react-icons/tb";

const TicketPage = () => {
  const { ticketId } = useParams<{ ticketId: string }>();

  const { data: ticket, isLoading: loading, error } = useTicket(ticketId);

  if (loading) {
    return (
      <section className="max-w-5xl mx-auto w-full flex justify-center px-4">
        <div className="text-center text-muted-foreground flex md:flex-row flex-col items-center gap-3 md:gap-2 mx-auto py-8">
          <Spinner className="size-6 md:size-4" />
          Fetching your support ticket...
        </div>
      </section>
    );
  }

  if (!ticket) {
    return (
      <section className="max-w-5xl mx-auto w-full px-4">
        <div className="text-center text-muted-foreground max-w-md flex md:flex-row flex-col justify-center items-center gap-3 md:gap-2 mx-auto py-8">
          <p className="text-2xl md:text-lg">
            <PiSmileySad />
          </p>
          Sorry, we couldn't find this support ticket.
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
          Oops! Something went wrong: {error.message}
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-3xl mx-auto w-full pt-3 px-4">
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
                <Link href="/dashboard/support">Support</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{ticketId}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <Card>
          <CardContent className="flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              {ticket.status === "OPEN" ? (
                <Badge variant="outline">
                  <TbCircleDot className="text-amber-500" />
                  <span>{ticket.status}</span>
                </Badge>
              ) : (
                <Badge>
                  <TbCircleCheck />
                  <span>{ticket.status}</span>
                </Badge>
              )}
              <h1 className="text-lg md:text-xl font-semibold">
                {ticket.subject}
              </h1>
              <p className="text-muted-foreground">{ticket.description}</p>
            </div>
            <Separator />
            <div className="flex flex-col gap-2">
              <h2 className="text-sm font-semibold">Admin Response</h2>
              {ticket.adminResponse ? (
                ticket.adminResponse
              ) : (
                <span className="text-muted-foreground">
                  No response from admin yet. Please check back later.
                </span>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default TicketPage;
