"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import SelectableButtons from "@/components/SelectableButtons";
import { Separator } from "@/components/ui/separator";
import { TbPencil } from "react-icons/tb";
import { ButtonGroup } from "@/components/ui/button-group";
import { Tourist } from "@/schemas/user.schema";
import { auth, userAPI } from "@/lib/api";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const TravelPrefForm = () => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState<Tourist | null>(null);
  const [original, setOriginal] = useState<Tourist | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const dbUser = auth.getCurrentUser();
    if (!dbUser || dbUser.role !== "TOURIST") return;

    setDraft(dbUser as Tourist);
    setOriginal(dbUser as Tourist);
  }, []);

  if (!draft) {
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

    const user = auth.getCurrentUser();
    if (!user || user.role !== "TOURIST") return;

    setIsLoading(true);

    try {
      const updateData = {
        travelPreferences: draft.travelPreferences || [],
        languagesSpoken: draft.languagesSpoken || [],
      };

      const updatedUser = await userAPI.update(user.id, updateData);

      auth.saveSession(updatedUser);
      setOriginal({ ...draft });
      setIsEditing(false);
      router.refresh();

      toast.success("Travel preferences updated successfully!");
    } catch (error) {
    } finally {
      setIsLoading(false);
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
                isLoading ||
                !draft.travelPreferences ||
                draft.travelPreferences.length === 0
              }
            >
              {isLoading ? "Updating..." : "Update"}
            </Button>
          </ButtonGroup>
        )}
      </form>
    </div>
  );
};

export default TravelPrefForm;
