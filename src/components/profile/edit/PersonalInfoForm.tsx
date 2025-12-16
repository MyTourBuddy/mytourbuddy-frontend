"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { COUNTRIES } from "@/data/constants";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { TbPencil } from "react-icons/tb";
import { ButtonGroup } from "@/components/ui/button-group";

interface User {
  firstname: string;
  lastname: string;
  age: number;
  phone: string;
  country: string;
  avatar: string;
}

const initialUser: User = {
  firstname: "Sasmitha",
  lastname: "Perera",
  age: 22,
  phone: "",
  country: "",
  avatar: "",
};

const PersonalInfoForm = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState<User>(initialUser);
  const [draft, setDraft] = useState<User>(initialUser);

  const handleEdit = () => {
    setDraft(user);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setDraft(user);
    setIsEditing(false);
  };

  const handleChange = (key: keyof User, value: string | number) => {
    setDraft((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSave = () => {
    setUser(draft);
    setIsEditing(false);
    console.log("Profile saved:", draft);
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Edit Personal Information
        </p>
        {!isEditing && (
          <Button variant="outline" size="icon" onClick={handleEdit}>
            <TbPencil />
          </Button>
        )}
      </div>
      <Separator />

      <form>
        <div className="grid md:text-base text-xs grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4 md:order-1 order-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field>
                <FieldLabel htmlFor="firstname">Firstname</FieldLabel>

                {draft.firstname.length === 0 && !isEditing ? (
                  "--"
                ) : (
                  <Input
                    id="firstname"
                    type="text"
                    placeholder="Enter Firstname"
                    value={draft.firstname}
                    readOnly={!isEditing}
                    onChange={(e) => handleChange("firstname", e.target.value)}
                  />
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="lastname">Lastname</FieldLabel>
                {draft.lastname.length === 0 && !isEditing ? (
                  "--"
                ) : (
                  <Input
                    id="lastname"
                    type="text"
                    placeholder="Enter Lastname"
                    value={draft.lastname}
                    readOnly={!isEditing}
                    onChange={(e) => handleChange("lastname", e.target.value)}
                  />
                )}
              </Field>
            </div>

            <Field>
              <FieldLabel htmlFor="age">Age</FieldLabel>
              {draft.age < 1 && !isEditing ? (
                "--"
              ) : (
                <Input
                  id="age"
                  type="number"
                  placeholder="Enter Age"
                  value={draft.age}
                  readOnly={!isEditing}
                  onChange={(e) => handleChange("age", Number(e.target.value))}
                />
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="phone">Phone Number</FieldLabel>
              {draft.phone.length === 0 && !isEditing ? (
                "--"
              ) : (
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter Phone No."
                  value={draft.phone}
                  readOnly={!isEditing}
                  onChange={(e) => handleChange("phone", e.target.value)}
                />
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="country">Country</FieldLabel>
              {draft.country.length === 0 && !isEditing ? (
                "--"
              ) : (
                <Select
                  value={draft.country}
                  onValueChange={(value) => handleChange("country", value)}
                  disabled={!isEditing}
                >
                  <SelectTrigger id="country" className="w-full">
                    <SelectValue placeholder="Select Country" />
                  </SelectTrigger>
                  <SelectContent>
                    {COUNTRIES.map((country) => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </Field>
          </div>

          <div className="flex flex-col items-center justify-start md:order-2 order-1">
            <Field className="w-full">
              <FieldLabel className="text-center">Avatar</FieldLabel>
              <div className="flex justify-center mt-2">
                <Avatar className="rounded-lg w-30 h-30 md:w-40 md:h-40 border-2">
                  <AvatarImage src={draft.avatar} />
                  <AvatarFallback className="rounded-lg w-30 h-30 md:w-40 md:h-40 font-semibold text-4xl text-primary">
                    {draft.firstname[0]}
                    {draft.lastname[0]}
                  </AvatarFallback>
                </Avatar>
              </div>
              <Input
                value={draft.avatar}
                readOnly={!isEditing}
                className="hidden"
                onChange={(e) => handleChange("avatar", e.target.value)}
              />
            </Field>
          </div>
        </div>

        {isEditing && (
          <ButtonGroup className="ml-auto">
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={
                draft.firstname.length === 0 ||
                draft.lastname.length === 0 ||
                draft.age < 1 ||
                draft.country.length === 0 ||
                draft.phone.length === 0 ||
                draft.avatar.length === 0
              }
            >
              Save
            </Button>
          </ButtonGroup>
        )}
      </form>
    </div>
  );
};

export default PersonalInfoForm;
