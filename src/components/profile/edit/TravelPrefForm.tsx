"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import SelectableButtons from "@/components/SelectableButtons";
import { Separator } from "@/components/ui/separator";
import { TbPencil } from "react-icons/tb";

const initialUser = {
  preferredDestinations: ["Colombo", "Galle", "Kandy"],
  travelInterests: [],
  languagesSpoken: ["English", "Hindi"],
};

const TravelPrefForm = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState(initialUser);
  const [draft, setDraft] = useState(initialUser);

  const handleEdit = () => {
    setDraft(user);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setDraft(user);
    setIsEditing(false);
  };

  const handleSave = () => {
    console.log(draft);

    setUser(draft);
    setIsEditing(false);
  };

  const handleChange = (key: keyof typeof initialUser, values: string[]) => {
    setDraft((prev) => ({
      ...prev,
      [key]: values,
    }));
  };

  const isDraftEmpty =
    draft.preferredDestinations.length === 0 &&
    draft.travelInterests.length === 0 &&
    draft.languagesSpoken.length === 0;

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
      <FieldGroup>
        <Field>
          <FieldLabel>Preferred Destinations</FieldLabel>
          <SelectableButtons
            options={[
              "Colombo",
              "Galle",
              "Kandy",
              "Jaffna",
              "Sigiriya",
              "Ella",
              "Nuwara Eliya",
            ]}
            selected={draft.preferredDestinations}
            onChange={(v) => handleChange("preferredDestinations", v)}
            allowAddMore
            placeholder="Add destination..."
            disabled={!isEditing}
          />
        </Field>

        <Field>
          <FieldLabel>Travel Interests</FieldLabel>
          <SelectableButtons
            options={[
              "Adventure",
              "Culture",
              "Sports",
              "Nature",
              "Food",
              "Relaxation",
            ]}
            selected={draft.travelInterests}
            onChange={(v) => handleChange("travelInterests", v)}
            allowAddMore
            placeholder="Add interest..."
            disabled={!isEditing}
          />
        </Field>

        <Field>
          <FieldLabel>Languages Spoken</FieldLabel>
          <SelectableButtons
            options={[
              "English",
              "Sinhala",
              "Tamil",
              "Hindi",
              "French",
              "German",
            ]}
            selected={draft.languagesSpoken}
            onChange={(v) => handleChange("languagesSpoken", v)}
            allowAddMore
            placeholder="Add language..."
            disabled={!isEditing}
          />
        </Field>
      </FieldGroup>

      {/* actions */}
      {isEditing && (
        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={
              draft.preferredDestinations.length === 0 ||
              draft.travelInterests.length === 0 ||
              draft.languagesSpoken.length === 0
            }
          >
            Save
          </Button>
        </div>
      )}
    </div>
  );
};

export default TravelPrefForm;
