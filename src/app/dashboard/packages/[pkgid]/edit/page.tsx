import { PackageEditForm } from "@/components/profile/edit/PackageForm";

const EditPackage = () => {
  return (
    <section className="max-w-2xl mx-auto">
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl font-bold tracking-tight">
          Edit Package
        </h1>
        <PackageEditForm />
      </div>
    </section>
  );
};

export default EditPackage;
