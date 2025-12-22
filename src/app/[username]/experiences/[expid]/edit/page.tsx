import { EditExperienceForm } from "@/components/profile/edit/ExperienceForm";

const EditExperience = () => {
  return (
    <section className="max-w-2xl mx-auto">
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl font-bold tracking-tight">Edit Experience</h1>
        <EditExperienceForm />
      </div>
    </section>
  );
};

export default EditExperience;
