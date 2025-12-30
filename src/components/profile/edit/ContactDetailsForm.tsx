"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { TbPencil, TbPlus, TbX } from "react-icons/tb";
import { ButtonGroup } from "@/components/ui/button-group";
import { auth, userAPI } from "@/lib/api";
import { Guide } from "@/schemas/user.schema";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const ContactDetailsForm = () => {
  const router = useRouter();
  const [draft, setDraft] = useState<Guide | null>(null);
  const [original, setOriginal] = useState<Guide | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const dbUser = auth.getCurrentUser();
    if (!dbUser || !auth.isGuide()) return;

    const guide = dbUser as Guide;
    setDraft(guide);
    setOriginal(guide);
  }, []);

  if (!draft || !original) {
    return (
      <p className="text-sm text-muted-foreground">
        Loading contact details...
      </p>
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

    setIsLoading(true);

    try {
      const updateData = {
        emergencyContact: draft.emergencyContact,
        website: draft.website || "",
        socialMedia: draft.socialMedia || [],
      };

      const updatedUser = await userAPI.update(draft.id, updateData);
      auth.saveSession(updatedUser);
      setOriginal(updatedUser as Guide);
      setDraft(updatedUser as Guide);
      setIsEditing(false);
      router.refresh();

      toast.success("Contact details updated successfully!");
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Failed to update contact details. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Manage your contact details
        </p>

        {!isEditing && (
          <Button variant="outline" size="icon" onClick={handleEdit}>
            <TbPencil />
          </Button>
        )}
      </div>

      <Separator />

      {/* Form */}
      <form onSubmit={handleSave}>
        <FieldGroup className="max-w-md">
          {/* Emergency Contact */}
          <Field>
            <FieldLabel htmlFor="emergencyContact">
              Emergency Contact
            </FieldLabel>
            {draft.emergencyContact.length === 0 && !isEditing ? (
              "--"
            ) : (
              <Input
                id="emergencyContact"
                name="emergencyContact"
                type="text"
                placeholder="Enter Emergency Contact No."
                value={draft.emergencyContact ?? ""}
                readOnly={!isEditing}
                onChange={(e) =>
                  setDraft((prev) => ({
                    ...prev!,
                    emergencyContact: e.target.value,
                  }))
                }
              />
            )}
          </Field>

          {/* Website */}
          <Field>
            <FieldLabel htmlFor="website">Website</FieldLabel>
            {!draft.website && !isEditing ? (
              "--"
            ) : (
              <Input
                id="website"
                name="website"
                type="text"
                placeholder="Enter Website URL"
                value={draft.website || ""}
                readOnly={!isEditing}
                onChange={(e) =>
                  setDraft((prev) => ({
                    ...prev!,
                    website: e.target.value || undefined,
                  }))
                }
              />
            )}
          </Field>

          {/* Social Media */}
          <Field>
            <FieldLabel>Social Media</FieldLabel>

            {(draft.socialMedia || []).length === 0 && !isEditing ? (
              "--"
            ) : (
              <div className="flex flex-col gap-2">
                {(draft.socialMedia || []).map((item, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={item}
                      placeholder="Copy your profile URL and paste here"
                      readOnly={!isEditing}
                      onChange={(e) => {
                        if (!isEditing) return;
                        const updated = [...(draft.socialMedia || [])];
                        updated[index] = e.target.value;
                        setDraft((prev) => ({
                          ...prev!,
                          socialMedia: updated,
                        }));
                      }}
                    />

                    {isEditing && (draft.socialMedia || []).length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          setDraft((prev) => ({
                            ...prev!,
                            socialMedia: (draft.socialMedia || []).filter(
                              (_, i) => i !== index
                            ),
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
                    type="button"
                    variant="ghost"
                    className="w-fit"
                    onClick={() =>
                      setDraft((prev) => ({
                        ...prev!,
                        socialMedia: [...(draft.socialMedia || []), ""],
                      }))
                    }
                  >
                    <TbPlus className="mr-2" />
                    Add social media
                  </Button>
                )}
              </div>
            )}
          </Field>
        </FieldGroup>

        {/* Actions */}
        {isEditing && (
          <ButtonGroup className="ml-auto">
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save"}
            </Button>
          </ButtonGroup>
        )}
      </form>
    </div>
  );
};

export default ContactDetailsForm;
