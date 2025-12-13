import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useEditMode } from "./EditableCard";

const sampleUser = {
  firstname: "Sasmitha",
  lastname: "Perera",
  age: 22,
  phone: "+94719077818",
  country: "Sri Lanka",
  avatar: "https://github.com/shadcn.png",
};

const PersonalInfoForm = () => {
  const isEditing = useEditMode();

  return (
    <div className="grid md:text-base text-xs grid-cols-1 md:grid-cols-3 gap-6">
      {/* Left side - Form fields (2/3 width) */}
      <div className="md:col-span-2 space-y-4 md:order-1 order-2">
        {/* First and Last Name Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field>
            <FieldLabel htmlFor="firstname">Firstname</FieldLabel>
            <Input
              id="firstname"
              name="firstname"
              defaultValue={sampleUser.firstname}
              readOnly={!isEditing}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="lastname">Lastname</FieldLabel>
            <Input
              id="lastname"
              name="lastname"
              defaultValue={sampleUser.lastname}
              readOnly={!isEditing}
            />
          </Field>
        </div>
        {/* Age */}
        <Field>
          <FieldLabel htmlFor="age">Age</FieldLabel>
          <Input
            id="age"
            name="age"
            type="number"
            defaultValue={sampleUser.age}
            readOnly={!isEditing}
          />
        </Field>
        {/* Phone Number */}
        <Field>
          <FieldLabel htmlFor="phone">Phone Number</FieldLabel>
          <Input
            id="phone"
            name="phone"
            type="tel"
            defaultValue={sampleUser.phone}
            readOnly={!isEditing}
          />
        </Field>
        {/* Country */}
        <Field>
          <FieldLabel htmlFor="country">Country</FieldLabel>
          <Input
            id="country"
            name="country"
            defaultValue={sampleUser.country}
            readOnly={!isEditing}
          />
        </Field>
      </div>
      {/* Avatar section */}
      <div className="flex flex-col items-center justify-start md:order-2 order-1">
        <Field className="w-full">
          <FieldLabel htmlFor="avatar" className="text-center">
            Avatar
          </FieldLabel>
          <div className="flex justify-center mt-2">
            <Avatar className="rounded-lg w-30 h-30 md:w-40 md:h-40 border-2">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback className="rounded-lg w-30 h-30 md:w-40 md:h-40 font-semibold text-4xl text-primary">
                {sampleUser.firstname[0]}
                {sampleUser.lastname[0]}
              </AvatarFallback>
            </Avatar>
          </div>
          <Input
            id="avatar"
            name="avatar"
            defaultValue={sampleUser.avatar}
            className="hidden"
          />
        </Field>
      </div>
    </div>
  );
};

export default PersonalInfoForm;
