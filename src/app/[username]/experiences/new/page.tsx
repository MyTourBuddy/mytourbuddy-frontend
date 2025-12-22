import { AddExperienceForm } from "@/components/profile/edit/ExperienceForm";

const NewExperience = () => {
  return (
    <section className="max-w-2xl mx-auto">
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl font-bold tracking-tight">New Experience</h1>
        <AddExperienceForm />
      </div>
    </section>
  );
};

export default NewExperience;
