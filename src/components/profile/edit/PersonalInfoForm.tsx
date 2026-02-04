"use client";

import { useRef, useState } from "react";
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
import { Spinner } from "@/components/ui/spinner";
import { COUNTRIES } from "@/data/constants";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { TbCamera, TbPencil } from "react-icons/tb";
import { ButtonGroup } from "@/components/ui/button-group";
import toast from "react-hot-toast";
import { Tourist, User } from "@/schemas/user.schema";
import { useCurrentUser } from "@/hooks/useAuthQueries";
import { useUpdateUser, useUploadAvatar } from "@/hooks/useUserQueries";
import { capitalizeFirstLetter } from "@/utils/helpers";

const PersonalInfoForm = () => {
  const router = useRouter();
  const { data: currentUser, isLoading: isLoadingUser } = useCurrentUser();
  const updateUserMutation = useUpdateUser();
  const uploadAvatarMutation = useUploadAvatar();

  const [draft, setDraft] = useState<User | null>(() => currentUser || null);
  const [original, setOriginal] = useState<User | null>(
    () => currentUser || null,
  );
  const [isEditing, setIsEditing] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync currentUser changes to state
  if (currentUser && draft !== currentUser) {
    setDraft(currentUser);
    setOriginal(currentUser);
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast.error("Please select an image file");
        return;
      }

      // Validate file size (e.g., max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }

      // Show loading while processing
      setIsUploadingAvatar(true);

      // Convert to base64 for preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setDraft((prev) =>
          prev ? { ...prev, avatar: reader.result as string } : null,
        );
        setIsUploadingAvatar(false);
      };
      reader.readAsDataURL(file);
    }
  };

  if (isLoadingUser || !draft) {
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

    if (!currentUser || !draft) return;

    let avatarUrl = draft.avatar;

    // If avatar is base64, upload to imgbb first
    if (draft.avatar && draft.avatar.startsWith("data:")) {
      try {
        avatarUrl = await uploadAvatarMutation.mutateAsync(draft.avatar);
      } catch (error) {
        console.error("Upload error:", error);
        toast.error("Failed to upload image");
        return;
      }
    }

    try {
      const updateData = {
        firstName: draft.firstName,
        lastName: draft.lastName,
        age: draft.age,
        phone: draft.phone,
        avatar: avatarUrl,
        ...(currentUser.role === "TOURIST" && {
          country: (draft as Tourist)?.country,
        }),
      };

      console.log("Update data:", updateData);

      await updateUserMutation.mutateAsync({
        userId: currentUser.id,
        userData: updateData,
      });

      setOriginal({ ...draft, avatar: avatarUrl });
      setIsEditing(false);
      router.refresh();

      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Failed to update profile. Please try again.");
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
              {/* First Name */}
              <Field>
                <FieldLabel>
                  First Name&nbsp;<span className="text-destructive">*</span>
                </FieldLabel>
                <Input
                  name="firstName"
                  value={draft.firstName ?? ""}
                  placeholder="Enter first name (e.g. Kasun)"
                  readOnly={!isEditing}
                  onChange={(e) =>
                    setDraft({ ...draft, firstName: e.target.value })
                  }
                  onBlur={(e) =>
                    setDraft({
                      ...draft,
                      firstName: capitalizeFirstLetter(e.target.value),
                    })
                  }
                />
              </Field>

              {/* Last Name */}
              <Field>
                <FieldLabel>
                  Last Name&nbsp;<span className="text-destructive">*</span>
                </FieldLabel>
                <Input
                  name="lastName"
                  value={draft.lastName ?? ""}
                  placeholder="Enter last name (e.g. Perera)"
                  readOnly={!isEditing}
                  onChange={(e) =>
                    setDraft({ ...draft, lastName: e.target.value })
                  }
                  onBlur={(e) =>
                    setDraft({
                      ...draft,
                      lastName: capitalizeFirstLetter(e.target.value),
                    })
                  }
                />
              </Field>
            </div>

            {/* Age */}
            <Field>
              <FieldLabel>
                Age&nbsp;<span className="text-destructive">*</span>
              </FieldLabel>
              <Input
                name="age"
                type="number"
                min={1}
                value={draft.age ?? 1}
                placeholder="Enter age (e.g. 24)"
                readOnly={!isEditing}
                onChange={(e) =>
                  setDraft({
                    ...draft,
                    age: Number(e.target.value) || 1,
                  })
                }
              />
            </Field>

            {/* Phone Number */}
            <Field>
              <FieldLabel>
                Phone Number&nbsp;<span className="text-destructive">*</span>
              </FieldLabel>
              {!draft.phone && !isEditing ? (
                "--"
              ) : (
                <Input
                  name="phone"
                  value={draft.phone ?? ""}
                  placeholder="Enter phone number (e.g. +94 77 123 4567)"
                  onChange={(e) =>
                    setDraft({ ...draft, phone: e.target.value })
                  }
                />
              )}
            </Field>

            {/* Country */}
            {currentUser?.role === "TOURIST" && (
              <Field>
                <FieldLabel>
                  Country&nbsp;<span className="text-destructive">*</span>
                </FieldLabel>
                {!(draft as Tourist)?.country ? (
                  "--"
                ) : (
                  <>
                    {!isEditing ? (
                      <Input
                        name="country"
                        value={(draft as Tourist)?.country ?? ""}
                        readOnly
                      />
                    ) : (
                      <Select
                        value={(draft as Tourist)?.country ?? ""}
                        onValueChange={(value) =>
                          setDraft({ ...draft, country: value } as User)
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
                  </>
                )}
              </Field>
            )}
          </div>

          {/* Avatar */}
          <div className="flex flex-col items-center justify-start md:order-2 order-1">
            <Field className="w-full">
              <FieldLabel className="text-center">Avatar</FieldLabel>
              <div className="flex justify-center md:order-2 order-1">
                <div className="w-40 h-40 md:w-40 md:h-40 relative">
                  <Avatar className="rounded-lg border w-full h-full">
                    {draft.avatar && <AvatarImage src={draft.avatar} />}
                    <AvatarFallback className="text-4xl font-bold rounded-none">
                      {isUploadingAvatar ? (
                        <Spinner className="size-8" />
                      ) : (
                        <>
                          {draft.firstName?.[0] ?? "T"}
                          {draft.lastName?.[0] ?? "B"}
                        </>
                      )}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <>
                      {/* Hidden file input */}
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleAvatarChange}
                      />
                      {/* Camera button */}
                      <Button
                        type="button"
                        size="icon-lg"
                        variant="outline"
                        className="absolute -bottom-2 -right-2"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <TbCamera />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </Field>
          </div>
        </div>

        {/* actions */}
        {isEditing && (
          <ButtonGroup className="ml-auto mt-6">
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={
                updateUserMutation.isPending ||
                !draft.firstName ||
                !draft.lastName ||
                draft.age < 1 ||
                !draft.phone ||
                (currentUser?.role === "TOURIST" &&
                  !(draft as Tourist)?.country)
              }
            >
              {updateUserMutation.isPending ? "Updating..." : "Update"}
            </Button>
          </ButtonGroup>
        )}
      </form>
    </div>
  );
};

export default PersonalInfoForm;
