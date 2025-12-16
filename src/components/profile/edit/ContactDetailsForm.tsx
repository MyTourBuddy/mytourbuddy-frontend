"use client";

import React, { useState } from "react";
import SelectableButtons from "@/components/SelectableButtons";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { TbPencil, TbPlus, TbX } from "react-icons/tb";
import { ButtonGroup } from "@/components/ui/button-group";

interface User {
  workingDays: string[];
  emergencyContact: string;
  website: string;
  socialMedia: string[];
}

const initialUser: User = {
  workingDays: [],
  emergencyContact: "",
  website: "",
  socialMedia: [],
};

const ContactDetailsForm = () => {
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

  const handleEmergencyContactChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDraft((prev) => ({
      ...prev,
      emergencyContact: e.target.value,
    }));
  };

  const handleWebsiteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDraft((prev) => ({
      ...prev,
      website: e.target.value,
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

      {/* Form */}
      <FieldGroup className="max-w-md">
        {/* Working Days */}
        <Field>
          <FieldLabel>Working Days</FieldLabel>
          {draft.workingDays.length === 0 && !isEditing ? (
            "--"
          ) : (
            <SelectableButtons
              options={[
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
              ]}
              selected={draft.workingDays}
              onChange={(v) => handleChange("workingDays", v)}
              disabled={!isEditing}
            />
          )}
        </Field>

        {/* Emergency Contact */}
        <Field>
          <FieldLabel htmlFor="emergencyContact">Emergency Contact</FieldLabel>
          {draft.emergencyContact.length === 0 && !isEditing ? (
            "--"
          ) : (
            <Input
              id="emergencyContact"
              type="text"
              placeholder="Enter Emergency Contact No."
              value={draft.emergencyContact}
              readOnly={!isEditing}
              onChange={isEditing ? handleEmergencyContactChange : undefined}
            />
          )}
        </Field>

        {/* Website */}
        <Field>
          <FieldLabel htmlFor="website">Website</FieldLabel>
          {draft.website.length === 0 && !isEditing ? (
            "--"
          ) : (
            <Input
              id="website"
              type="text"
              placeholder="Enter Website URL"
              value={draft.website}
              readOnly={!isEditing}
              onChange={isEditing ? handleWebsiteChange : undefined}
            />
          )}
        </Field>

        {/* Social Media */}
        <Field>
          <FieldLabel htmlFor="socialMedia">Social Media</FieldLabel>
          {draft.socialMedia.length === 0 && !isEditing ? (
            "--"
          ) : (
            <div className="flex flex-col gap-2">
              {draft.socialMedia.map((item, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <Input
                    type="text"
                    value={item}
                    readOnly={!isEditing}
                    placeholder="Enter platform or URL"
                    onChange={(e) => {
                      if (!isEditing) return;
                      const newArr = [...draft.socialMedia];
                      newArr[index] = e.target.value;
                      setDraft((prev) => ({ ...prev, socialMedia: newArr }));
                    }}
                  />
                  {isEditing && (
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        const newArr = draft.socialMedia.filter(
                          (_, i) => i !== index
                        );
                        setDraft((prev) => ({
                          ...prev,
                          socialMedia: newArr,
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
                      socialMedia: [...prev.socialMedia, ""],
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

      {/* Actions */}
      {isEditing && (
        <ButtonGroup className="ml-auto">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={draft.workingDays.length === 0}
          >
            Save
          </Button>
        </ButtonGroup>
      )}
    </div>
  );
};

export default ContactDetailsForm;
