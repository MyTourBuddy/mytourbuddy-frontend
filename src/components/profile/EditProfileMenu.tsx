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
        <DropdownMenuItem asChild>
          <Link href="/dashboard/settings">Settings</Link>
        </DropdownMenuItem>
        {data?.role === "GUIDE" && (
          <>
            <DropdownMenuItem asChild>
              <Link href="/dashboard/packages">My Packages</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/dashboard/experiences">My Experiences</Link>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default EditProfileMenu;
