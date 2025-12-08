import Image from "next/image";
import logo from "@/../public/mytourbuddy.svg";
import Link from "next/link";

const HomePage = () => {
  return (
    <div className="flex flex-col max-w-md w-full mx-auto items-center py-10 gap-8">
      <Image src={logo} alt="tourbuddy logo" width={100} height={100} />
      <p>Heyy im your tour buddy 🦧</p>

      <div className="flex flex-col gap-6">
        <Link href="/signin">Signin page</Link>
        <Link href="/signup">Signup onboarding</Link>
        <Link href="/admin">Admin Dashboard</Link>
        <Link href="/dashboard">Tourists and Guides Dashboard</Link>
      </div>
    </div>
  );
};

export default HomePage;
