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
import { usePathname } from "next/navigation";

const EditProfileMenu = () => {
  const pathname = usePathname();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer" asChild>
        <Button
          size="icon"
          variant="outline"
        >
          <TbPencil className="text-xl" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <Link href={`${pathname}/edit`}>
          <DropdownMenuItem>Edit profile</DropdownMenuItem>
        </Link>
        <Link href={`${pathname}/packages`}>
          <DropdownMenuItem>Edit Packages</DropdownMenuItem>
        </Link>
        <Link href={`${pathname}/experiences`}>
          <DropdownMenuItem>Edit Experiences</DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default EditProfileMenu;
