"use client";

import SelectableButtons from "@/components/SelectableButtons";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { TbPencil } from "react-icons/tb";

interface User {
  dailyRate: number;
  transportMode: string;
  maxGroupSize: number;
  ageGroups: string[];
}

const initialUser: User = {
  dailyRate: 0,
  transportMode: "",
  maxGroupSize: 0,
  ageGroups: [],
};

const ServiceInfoForm = () => {
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

  const handleTransportModeChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDraft((prev) => ({
      ...prev,
      transportMode: e.target.value,
    }));
  };

  const handleDailyRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDraft((prev) => ({
      ...prev,
      dailyRate: value === "" ? 0 : Number(value),
    }));
  };
  const handleMaxGroupSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDraft((prev) => ({
      ...prev,
      maxGroupSize: value === "" ? 0 : Number(value),
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
          <FieldLabel htmlFor="dailyRate">Daily Rate</FieldLabel>
          {draft.dailyRate < 1 && !isEditing ? (
            "--"
          ) : (
            <Input
              id="dailyRate"
              type="number"
              placeholder="Enter Daily Rates"
              value={draft.dailyRate}
              readOnly={!isEditing}
              onChange={isEditing ? handleDailyRateChange : undefined}
            />
          )}
        </Field>
        <Field>
          <FieldLabel htmlFor="maxGroupSize">Max Group Size</FieldLabel>
          {draft.maxGroupSize < 1 && !isEditing ? (
            "--"
          ) : (
            <Input
              id="maxGroupSize"
              type="number"
              placeholder="Enter Max Group Size"
              value={draft.maxGroupSize}
              readOnly={!isEditing}
              onChange={isEditing ? handleMaxGroupSizeChange : undefined}
            />
          )}
        </Field>
        <Field>
          <FieldLabel htmlFor="transportMode">Transport Mode</FieldLabel>
          {draft.transportMode.length === 0 && !isEditing ? (
            "--"
          ) : (
            <Input
              id="transportMode"
              type="text"
              placeholder="Enter Transport Mode"
              value={draft.transportMode}
              readOnly={!isEditing}
              onChange={isEditing ? handleTransportModeChange : undefined}
            />
          )}
        </Field>
        <Field>
          <FieldLabel>Age Groups</FieldLabel>
          <p>{user.ageGroups.length === 0 && !isEditing && "--"}</p>
          <SelectableButtons
            options={["Childs", "Adults", "Seniors"]}
            selected={draft.ageGroups}
            onChange={(v) => handleChange("ageGroups", v)}
            disabled={!isEditing}
          />
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
              draft.dailyRate < 1 ||
              draft.maxGroupSize < 1 ||
              draft.transportMode.length === 0 ||
              draft.ageGroups.length === 0
            }
          >
            Save
          </Button>
        </ButtonGroup>
      )}
    </div>
  );
};

export default ServiceInfoForm;
