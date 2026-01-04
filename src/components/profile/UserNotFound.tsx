import notfound from "@/../public/user-not-found.svg";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TbHome, TbPackage, TbPackages } from "react-icons/tb";

interface UsernamePropes {
  username: string;
}

const UserNotFound = ({ username }: UsernamePropes) => {
  return (
    <div className="flex flex-col items-center justify-center navbar-offset px-4">
      <Image
        src={notfound}
        alt={`${username} not found`}
        priority
        className="opacity-80 h-48 w-48 md:h-60 md:w-60"
      />

      <div className="text-center flex flex-col gap-3">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          User Not Found
        </h1>
        <p className="text-muted-foreground text-base md:text-lg">
          We couldn't find a user with the username&nbsp;
          <span className="font-semibold text-foreground">@{username}</span>
        </p>
      </div>

      <div className="flex md:flex-row flex-col gap-3 pt-4">
        <Button asChild variant="default">
          <Link href="/">
            <TbHome />
            &nbsp;Go to Home
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/packages">
            <TbPackage />
            &nbsp;Browse Packages
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default UserNotFound;
