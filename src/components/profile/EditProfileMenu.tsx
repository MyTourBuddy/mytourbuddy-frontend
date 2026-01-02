"use client";

import { TbPencil } from "react-icons/tb";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Link from "next/link";
import { useCurrentUser } from "@/hooks/useAuthQueries";

const EditProfileMenu = () => {
  const { data } = useCurrentUser();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer" asChild>
        <Button size="icon" variant="outline">
          <TbPencil className="text-xl" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <Link href="/dashboard/settings">
          <DropdownMenuItem>Settings</DropdownMenuItem>
        </Link>
        {data?.role === "GUIDE" && (
          <>
            <Link href="/dashboard/packages">
              <DropdownMenuItem>My Packages</DropdownMenuItem>
            </Link>
            <Link href="/dashboard/experiences">
              <DropdownMenuItem>My Experiences</DropdownMenuItem>
            </Link>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default EditProfileMenu;
