import Link from "next/link";

const AdminDashboard = () => {
  return (
    <div className="flex flex-col items-center gap-6 py-10 max-w-md mx-auto w-full">
      <h1>Admin dashboard will be here</h1>
      <Link href="/">Back to home</Link>
    </div>
  );
};

export default AdminDashboard;
