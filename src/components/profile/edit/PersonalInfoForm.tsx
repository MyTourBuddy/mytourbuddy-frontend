"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
import { auth, userAPI } from "@/lib/api";
import toast from "react-hot-toast";
import { User } from "@/schemas/user.schema";

const PersonalInfoForm = () => {
  const router = useRouter();
  const [draft, setDraft] = useState<User | null>(null);
  const [original, setOriginal] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const dbUser = auth.getCurrentUser();
    if (!dbUser) return;

    setDraft(dbUser);
    setOriginal(dbUser);
  }, []);

  if (!draft) {
    return <p className="text-sm text-muted-foreground">Loading profile...</p>;
  }

  const handleEdit = () => setIsEditing(true);

  const handleCancel = () => {
    if (original) setDraft({ ...original });
    setIsEditing(false);
    toast("Changes discarded", { icon: "🗑️" });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    const user = auth.getCurrentUser();
    if (!user) return;

    setIsLoading(true);

    try {
      const updateData = {
        firstName: draft.firstName,
        lastName: draft.lastName,
        age: draft.age,
        phone: draft.phone,
        avatar: draft.avatar,
        ...(auth.isTourist() && { country: (draft as any).country }),
      };

      const updatedUser = await userAPI.update(user.id, updateData);

      auth.saveSession(updatedUser);
      setOriginal({ ...draft });
      setIsEditing(false);
      router.refresh();

      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
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
      <form onSubmit={handleSave}>
        <div className="grid md:text-base text-xs grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4 md:order-1 order-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field>
                <FieldLabel>First Name</FieldLabel>
                <Input
                  value={draft.firstName ?? ""}
                  readOnly={!isEditing}
                  onChange={(e) =>
                    setDraft({ ...draft, firstName: e.target.value })
                  }
                />
              </Field>

              <Field>
                <FieldLabel>Last Name</FieldLabel>
                <Input
                  value={draft.lastName ?? ""}
                  readOnly={!isEditing}
                  onChange={(e) =>
                    setDraft({ ...draft, lastName: e.target.value })
                  }
                />
              </Field>
            </div>
            <Field>
              <FieldLabel>Age</FieldLabel>
              <Input
                type="number"
                min={1}
                value={draft.age ?? 1}
                readOnly={!isEditing}
                onChange={(e) =>
                  setDraft({
                    ...draft,
                    age: Number(e.target.value) || 1,
                  })
                }
              />
            </Field>

            <Field>
              <FieldLabel>Phone Number</FieldLabel>
              <Input
                value={draft.phone ?? ""}
                readOnly={!isEditing}
                onChange={(e) => setDraft({ ...draft, phone: e.target.value })}
              />
            </Field>

            {auth.isTourist() && (
              <Field>
                <FieldLabel>Country</FieldLabel>
                {!isEditing ? (
                  <Input
                    name="country"
                    value={(draft as any).country ?? ""}
                    readOnly
                  />
                ) : (
                  <Select
                    value={(draft as any).country ?? ""}
                    onValueChange={(value) =>
                      setDraft({ ...draft, country: value } as any)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      {COUNTRIES.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </Field>
            )}
          </div>

          <div className="flex flex-col items-center justify-start md:order-2 order-1">
            <Field className="w-full">
              <FieldLabel className="text-center">Avatar</FieldLabel>
              <div className="flex justify-center md:order-2 order-1">
                <Avatar className="w-32 h-32 md:w-40 md:h-40 rounded-lg border">
                  {draft.avatar && <AvatarImage src={draft.avatar} />}
                  <AvatarFallback className="text-4xl rounded-none">
                    {draft.firstName?.[0] ?? "T"}
                    {draft.lastName?.[0] ?? "B"}
                  </AvatarFallback>
                </Avatar>
              </div>
            </Field>
          </div>
        </div>
        {isEditing && (
          <ButtonGroup className="ml-auto mt-6">
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Updating..." : "Update"}
            </Button>
          </ButtonGroup>
        )}
      </form>
    </div>
  );
};

export default PersonalInfoForm;
