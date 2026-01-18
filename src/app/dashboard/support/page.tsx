"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { useTickets } from "@/hooks/useTicketQueries";
import Link from "next/link";
import { PiSmileySad } from "react-icons/pi";
import {
  TbCircleCheck,
  TbCircleDot,
  TbClockShield,
  TbDots,
  TbDotsVertical,
  TbFolderCheck,
  TbFolderOpen,
  TbLockOpen,
  TbPlus,
} from "react-icons/tb";

const SupportPage = () => {
  const { data: tickets, isLoading: loading, error } = useTickets();

  if (loading) {
    return (
      <section className="max-w-5xl mx-auto w-full flex justify-center px-4">
        <div className="text-center text-muted-foreground flex md:flex-row flex-col items-center gap-3 md:gap-2 mx-auto py-8">
          <Spinner className="size-6 md:size-4" />
          Loading my tickets...
        </div>
      </section>
    );
  }

  if (!tickets) {
    return (
      <section className="max-w-5xl mx-auto w-full px-4">
        <div className="text-center text-muted-foreground max-w-md flex md:flex-row flex-col justify-center items-center gap-3 md:gap-2 mx-auto py-8">
          <p className="text-2xl md:text-lg">
            <PiSmileySad />
          </p>
          Tickets not found
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
    <section className="max-w-3xl mx-auto w-full pt-3 px-4">
      <div className="flex flex-col gap-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Support</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex flex-col gap-4">
          {/* header */}
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-3 md:flex-row md:items-end justify-between">
              <h1 className="text-3xl font-bold tracking-tight">My Tickets</h1>

              <Button asChild className="w-fit">
                <Link href="/dashboard/support/new">
                  <TbPlus />
                  New Ticket
                </Link>
              </Button>
            </div>
            <Separator />
          </div>

          <div className="flex flex-col gap-3">
            {tickets.map((ticket) => {
              return (
                <Item variant="outline" key={ticket.id}>
                  <ItemMedia className="text-lg">
                    {ticket.status === "OPEN" ? (
                      <TbCircleDot className="text-amber-500" />
                    ) : (
                      <TbCircleCheck className="text-primary" />
                    )}
                  </ItemMedia>
                  <ItemContent>
                    <ItemTitle>{ticket.subject}</ItemTitle>
                  </ItemContent>
                  <ItemActions>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <TbDotsVertical className="text-lg" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <Link href={`/dashboard/support/${ticket.id}`}>
                          <DropdownMenuItem>View Ticket</DropdownMenuItem>
                        </Link>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </ItemActions>
                </Item>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SupportPage;
