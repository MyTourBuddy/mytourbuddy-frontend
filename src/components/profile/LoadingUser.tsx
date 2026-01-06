import { Spinner } from "../ui/spinner";

const LoadingUser = ({ username }: { username: string }) => {
  return (
    <section className="max-w-5xl w-full mx-auto navbar-offset h-full flex flex-col items-center justify-center gap-3">
      <Spinner />
      <p className="text-lg mb-20">Loading {username} data...</p>
    </section>
  );
};

export default LoadingUser;
