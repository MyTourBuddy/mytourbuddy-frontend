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
    <div className="flex flex-col items-center justify-center px-4 navbar-offset">
      <div className="flex flex-col items-center text-center gap-y-6 max-w-md">
        <Image
          src={notfound}
          alt={`${username} not found`}
          height={240}
          width={240}
          priority
          className="opacity-80"
        />
        
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            User Not Found
          </h1>
          <p className="text-muted-foreground text-lg">
            We couldn't find a user with the username <span className="font-semibold text-foreground">@{username}</span>
          </p>
        </div>

        <p className="text-sm text-muted-foreground">
          The user may have changed their username or deleted their account.
        </p>

        <div className="flex gap-3 pt-4">
          <Button asChild variant="default">
            <Link href="/">
              <TbHome/>&nbsp;Go to Home
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/packages">
              <TbPackage/>&nbsp;Browse Packages
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserNotFound;
