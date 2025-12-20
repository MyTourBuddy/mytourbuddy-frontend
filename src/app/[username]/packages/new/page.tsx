import { PackageCreateForm } from "@/components/profile/edit/PackageForm";

const NewPackage = () => {
  return (
    <section className="max-w-2xl mx-auto">
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl font-bold tracking-tight">
          New Package
        </h1>
        <PackageCreateForm />
      </div>
    </section>
  );
};

export default NewPackage;
