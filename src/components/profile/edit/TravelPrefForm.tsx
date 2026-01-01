"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import SelectableButtons from "@/components/SelectableButtons";
import { Separator } from "@/components/ui/separator";
import { TbPencil } from "react-icons/tb";
import { ButtonGroup } from "@/components/ui/button-group";
import { Tourist } from "@/schemas/user.schema";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/hooks/useAuthQueries";
import { useUpdateUser } from "@/hooks/useUserQueries";

const TravelPrefForm = () => {
  const router = useRouter();
  const { data: currentUser, isLoading: isLoadingUser } = useCurrentUser();
  const updateUserMutation = useUpdateUser();

  const [draft, setDraft] = useState<Tourist | null>(null);
  const [original, setOriginal] = useState<Tourist | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (currentUser && currentUser.role === "TOURIST") {
      setDraft(currentUser as Tourist);
      setOriginal(currentUser as Tourist);
    }
  }, [currentUser]);

  if (isLoadingUser || !draft) {
    return (
      <p className="text-sm text-muted-foreground">Loading preferences...</p>
    );
  }

  const handleEdit = () => setIsEditing(true);

  const handleCancel = () => {
    if (original) setDraft({ ...original });
    setIsEditing(false);
    toast("Changes discarded", { icon: "🗑️" });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentUser || currentUser.role !== "TOURIST" || !draft) return;

    try {
      const updateData = {
        travelPreferences: draft.travelPreferences || [],
        languagesSpoken: draft.languagesSpoken || [],
      };

      await updateUserMutation.mutateAsync({
        userId: currentUser.id,
        userData: updateData,
      });

      setOriginal({ ...draft });
      setIsEditing(false);
      router.refresh();

      toast.success("Travel preferences updated successfully!");
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Failed to update preferences. Please try again.");
    }
  };

  const handleChange = (
    key: "travelPreferences" | "languagesSpoken",
    values: string[]
  ) => {
    setDraft((prev) =>
      prev
        ? {
            ...prev,
            [key]: values,
          }
        : null
    );
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Manage your travel preferences
        </p>

        {!isEditing && (
          <Button variant="outline" size="icon" onClick={handleEdit}>
            <TbPencil />
          </Button>
        )}
      </div>

      <Separator />

      {/* form */}
      <form onSubmit={handleSave} method="post">
        <FieldGroup>
          {/* Travel Preferences */}
          <Field>
            <FieldLabel>Travel Preferences</FieldLabel>
            {(!draft.travelPreferences ||
              draft.travelPreferences.length === 0) &&
            !isEditing ? (
              "--"
            ) : (
              <SelectableButtons
                options={[
                  "Adventure",
                  "Culture",
                  "Sports",
                  "Nature",
                  "Food",
                  "Relaxation",
                ]}
                selected={draft.travelPreferences}
                onChange={(v) => handleChange("travelPreferences", v)}
                allowAddMore
                placeholder="Add preferences..."
                disabled={!isEditing}
              />
            )}
          </Field>

          {/* Languages Spoken */}
          <Field>
            <FieldLabel>Languages Spoken</FieldLabel>
            {(!draft.languagesSpoken || draft.languagesSpoken.length === 0) &&
            !isEditing ? (
              "--"
            ) : (
              <SelectableButtons
                options={[
                  "English",
                  "Sinhala",
                  "Tamil",
                  "Hindi",
                  "French",
                  "German",
                ]}
                selected={draft.languagesSpoken || []}
                onChange={(v) => handleChange("languagesSpoken", v)}
                allowAddMore
                placeholder="Add language..."
                disabled={!isEditing}
              />
            )}
          </Field>
        </FieldGroup>

        {/* actions */}
        {isEditing && (
          <ButtonGroup className="ml-auto mt-6">
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={
                updateUserMutation.isPending ||
                !draft.travelPreferences ||
                draft.travelPreferences.length === 0
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

export default TravelPrefForm;
