'use client'

import SelectableButtons from "@/components/SelectableButtons";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { TbPencil, TbPlus, TbX } from "react-icons/tb";

interface User {
  bio: string;
  yearsOfExp: number;
  languages: string[];
  certifications: string[];
  specializations: string[];
}

const initialUser: User = {
  bio: "Passionate tour guide with extensive knowledge of Sri Lankan culture and history. Specializing in cultural tours and authentic local experiences.",
  yearsOfExp: 5,
  languages: ["English", "Sinhala"],
  certifications: [],
  specializations: [],
};

const ProfessionalDetailsForm = () => {
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

  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDraft((prev) => ({
      ...prev,
      bio: e.target.value,
    }));
  };

  const handleYearsOfExpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDraft((prev) => ({
      ...prev,
      yearsOfExp: value === "" ? 0 : Number(value),
    }));
  };

  const handleCertificationsChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDraft((prev) => ({
      ...prev,
      certifications: e.target.value
        .split(",")
        .map((c) => c.trim())
        .filter((c) => c),
    }));
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
      <FieldGroup className="max-w-md">
        <Field>
          <FieldLabel htmlFor="bio">Bio</FieldLabel>
          <Textarea
            id="bio"
            cols={5}
            value={draft.bio}
            readOnly={!isEditing}
            onChange={isEditing ? handleBioChange : undefined}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="yearsOfExp">Years of Experience</FieldLabel>
          <Input
            id="yearsOfExp"
            type="number"
            value={draft.yearsOfExp}
            readOnly={!isEditing}
            onChange={isEditing ? handleYearsOfExpChange : undefined}
          />
        </Field>
        <Field>
          <FieldLabel>Languages</FieldLabel>
          <p>{user.languages.length === 0 && !isEditing && "--"}</p>
          <SelectableButtons
            options={[
              "English",
              "Sinhala",
              "Tamil",
              "Hindi",
              "French",
              "German",
            ]}
            selected={draft.languages}
            onChange={(v) => handleChange("languages", v)}
            allowAddMore
            placeholder="Add language..."
            disabled={!isEditing}
          />
        </Field>

        <Field>
          <FieldLabel>Specializations</FieldLabel>
          <p>{user.specializations.length === 0 && !isEditing && "--"}</p>
          <SelectableButtons
            options={[
              "Culture",
              "Food & Cuisine",
              "Photography",
              "Wildlife",
              "Adventure",
            ]}
            selected={draft.specializations}
            onChange={(v) => handleChange("specializations", v)}
            allowAddMore
            placeholder="Add Specialization..."
            disabled={!isEditing}
          />
        </Field>
        <Field>
          <FieldLabel>Certifications</FieldLabel>

          {draft.certifications.length === 0 && !isEditing ? (
            "--"
          ) : (
            <div className="flex flex-col gap-2">
              {draft.certifications.map((item, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <Input
                    type="text"
                    value={item}
                    readOnly={!isEditing}
                    placeholder="Enter certification"
                    onChange={(e) => {
                      if (!isEditing) return;
                      const newArr = [...draft.certifications];
                      newArr[index] = e.target.value;
                      setDraft((prev) => ({
                        ...prev,
                        certifications: newArr,
                      }));
                    }}
                  />

                  {isEditing && (
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        const newArr = draft.certifications.filter(
                          (_, i) => i !== index
                        );
                        setDraft((prev) => ({
                          ...prev,
                          certifications: newArr,
                        }));
                      }}
                    >
                      <TbX />
                    </Button>
                  )}
                </div>
              ))}

              {isEditing && (
                <Button
                  variant="outline"
                  size="sm"
                  className="w-fit mt-1"
                  onClick={() =>
                    setDraft((prev) => ({
                      ...prev,
                      certifications: [...prev.certifications, ""],
                    }))
                  }
                >
                  <TbPlus className="mr-1" /> Add new
                </Button>
              )}
            </div>
          )}
        </Field>
      </FieldGroup>

      {/* actions */}
      {isEditing && (
        <ButtonGroup className="ml-auto">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={
              draft.languages.length === 0 ||
              draft.specializations.length === 0 ||
              draft.yearsOfExp < 0
            }
          >
            Save
          </Button>
        </ButtonGroup>
      )}
    </div>
  );
};

export default ProfessionalDetailsForm;
