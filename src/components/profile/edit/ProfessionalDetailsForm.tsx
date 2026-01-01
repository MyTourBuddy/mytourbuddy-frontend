"use client";

import SelectableButtons from "@/components/SelectableButtons";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useCurrentUser } from "@/hooks/useAuthQueries";
import { useUpdateUser } from "@/hooks/useUserQueries";
import { Guide } from "@/schemas/user.schema";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { TbPencil, TbPlus, TbX } from "react-icons/tb";

const ProfessionalDetailsForm = () => {
  const router = useRouter();
  const { data: currentUser, isLoading: isLoadingUser } = useCurrentUser();
  const updateUserMutation = useUpdateUser();

  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState<Guide | null>(null);
  const [original, setOriginal] = useState<Guide | null>(null);

  useEffect(() => {
    if (currentUser && currentUser.role === "GUIDE") {
      const guide = currentUser as Guide;
      setDraft(guide);
      setOriginal(guide);
    }
  }, [currentUser]);

  if (isLoadingUser || !draft) {
    return (
      <p className="text-sm text-muted-foreground">
        Loading professional details...
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
    if (!currentUser || !draft) return;

    try {
      const updateData = {
        bio: draft.bio,
        yearsOfExp: draft.yearsOfExp,
        languages: draft.languages || [],
        specializations: draft.specializations || [],
        certifications: draft.certifications || [],
      };

      await updateUserMutation.mutateAsync({
        userId: currentUser.id,
        userData: updateData,
      });

      setOriginal({ ...draft });
      setIsEditing(false);
      router.refresh();

      toast.success("Professional details updated successfully!");
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Failed to update professional details. Please try again.");
    }
  };
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Manage your professional details
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
        <FieldGroup className="max-w-md">
          {/* Bio */}
          <Field>
            <FieldLabel htmlFor="bio">Bio</FieldLabel>
            {(!draft.bio || draft.bio.length === 0) && !isEditing ? (
              "--"
            ) : (
              <Textarea
                id="bio"
                cols={5}
                value={draft.bio || ""}
                placeholder="A short intro about you as a guide"
                readOnly={!isEditing}
                onChange={(e) => setDraft({ ...draft, bio: e.target.value })}
              />
            )}
          </Field>

          {/* Years of Experience */}
          <Field>
            <FieldLabel htmlFor="yearsOfExp">
              Years of Experience&nbsp;
              <span className="text-destructive">*</span>
            </FieldLabel>
            {draft.yearsOfExp < 0 && !isEditing ? (
              "--"
            ) : (
              <Input
                id="yearsOfExp"
                type="number"
                min={0}
                value={draft.yearsOfExp}
                placeholder="Years of guiding experience (e.g. 5)"
                readOnly={!isEditing}
                onChange={(e) =>
                  setDraft({
                    ...draft,
                    yearsOfExp: Number(e.target.value) || 0,
                  })
                }
              />
            )}
          </Field>

          {/* Languages */}
          <Field>
            <FieldLabel>
              Languages&nbsp;<span className="text-destructive">*</span>
            </FieldLabel>
            {(draft.languages || []).length === 0 && !isEditing ? (
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
                selected={draft.languages || []}
                onChange={(values) => setDraft({ ...draft, languages: values })}
                allowAddMore
                placeholder="Add language (e.g. English)"
                disabled={!isEditing}
              />
            )}
          </Field>

          {/* Specializations */}
          <Field>
            <FieldLabel>
              Specializations&nbsp;<span className="text-destructive">*</span>
            </FieldLabel>
            {(draft.specializations || []).length == 0 && !isEditing ? (
              <p className="text-sm">--</p>
            ) : (
              <SelectableButtons
                options={[
                  "Culture",
                  "Food & Cuisine",
                  "Photography",
                  "Wildlife",
                  "Adventure",
                  "History",
                  "Nature",
                  "Beach",
                ]}
                selected={draft.specializations || []}
                onChange={(values) =>
                  setDraft({ ...draft, specializations: values })
                }
                allowAddMore
                placeholder="Add specialization (e.g. Wildlife)"
                disabled={!isEditing}
              />
            )}
          </Field>

          {/* Certifications */}
          <Field>
            <FieldLabel>Certifications</FieldLabel>
            {(draft.certifications || []).length == 0 && !isEditing ? (
              "--"
            ) : (
              <div className="flex flex-col gap-2">
                {draft.certifications &&
                  draft.certifications.map((item, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={item}
                        placeholder="e.g. Sri Lanka Tourist Guide License"
                        readOnly={!isEditing}
                        onChange={(e) => {
                          const updated = [...(draft.certifications || [])];
                          updated[index] = e.target.value;
                          setDraft({ ...draft, certifications: updated });
                        }}
                      />

                      {isEditing &&
                        draft.certifications &&
                        draft.certifications.length > 0 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() =>
                              setDraft({
                                ...draft,
                                certifications: draft.certifications?.filter(
                                  (_, i) => i !== index
                                ),
                              })
                            }
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
                      setDraft({
                        ...draft,
                        certifications: [...(draft.certifications || []), ""],
                      })
                    }
                  >
                    <TbPlus className="mr-2" />
                    Add certification
                  </Button>
                )}
              </div>
            )}
          </Field>
        </FieldGroup>

        {/* actions */}
        {isEditing && (
          <ButtonGroup className="ml-auto">
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={
                (draft.languages || []).length === 0 ||
                (draft.specializations || []).length === 0 ||
                draft.yearsOfExp < 0 ||
                updateUserMutation.isPending
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

export default ProfessionalDetailsForm;
