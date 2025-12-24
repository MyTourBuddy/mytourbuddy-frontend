import Link from "next/link";

const UserDashboard = () => {
  return (
    <div className="flex flex-col items-center gap-6 py-10 max-w-md mx-auto w-full">
      <h1>Tourists and Guides dashboard will be here</h1>

      <Link href="/dashboard/packages">Packages</Link>
      <Link href="/dashboard/experiences">Experiences</Link>
      <Link href="/dashboard/settings">Settings</Link>
      <Link href="/">Back to home</Link>
    </div>
  );
};

export default UserDashboard;
