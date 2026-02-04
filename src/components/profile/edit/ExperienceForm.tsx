"use client";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Experience } from "@/schemas/experience.schema";
import {
  useCreateExperience,
  useUpdateExperience,
} from "@/hooks/useExperienceQueries";
import { useUploadAvatar } from "@/hooks/useUserQueries";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { TbCamera } from "react-icons/tb";
import Image from "next/image";
import { Spinner } from "@/components/ui/spinner";
import { useRef, useState } from "react";

export const AddExperienceForm = () => {
  const router = useRouter();
  const createExperienceMutation = useCreateExperience();
  const uploadImageMutation = useUploadAvatar();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast.error("Please select an image file");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }

      setIsUploadingImage(true);

      // Convert to base64 for preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setIsUploadingImage(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!date) {
      toast.error("Please select a date");
      return;
    }

    try {
      let imageUrl = imagePreview;

      // If image is base64, upload to imgbb first
      if (imagePreview && imagePreview.startsWith("data:")) {
        try {
          imageUrl = await uploadImageMutation.mutateAsync(imagePreview);
        } catch (error) {
          console.error("Upload error:", error);
          toast.error("Failed to upload image");
          return;
        }
      }

      const experienceData = {
        title,
        description,
        experiencedAt: date,
        image: imageUrl || "",
      };

      await createExperienceMutation.mutateAsync(experienceData);

      toast.success("Experience added successfully!");
      router.push("/dashboard/experiences");
    } catch (error) {
      console.error("Failed to add experience:", error);
      toast.error("Failed to add experience. Please try again.");
    }
  };

  const handleCancel = () => {
    toast("Changes discarded", { icon: "🗑️" });
    router.back();
  };

  return (
    <Card>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="title">
                Title&nbsp;<span className="text-destructive">*</span>
              </FieldLabel>
              <Input
                type="text"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Give your experience a title"
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="description">
                Description&nbsp;<span className="text-destructive">*</span>
              </FieldLabel>
              <Textarea
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Share your story here"
                required
              />
            </Field>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
              <Field>
                <FieldLabel htmlFor="date">
                  When did this happen?&nbsp;
                  <span className="text-destructive">*</span>
                </FieldLabel>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  captionLayout="dropdown"
                  className="rounded-lg border max-w-3xs"
                  disabled={(date) => date > new Date()}
                />
                <Input
                  type="date"
                  name="date"
                  value={date ? date.toISOString().split("T")[0] : ""}
                  hidden
                  required
                  readOnly
                />
              </Field>
              <Field>
                <FieldLabel className="text-center">
                  Experience Image&nbsp;
                  <span className="text-destructive">*</span>
                </FieldLabel>
                <div className="relative aspect-square w-full">
                  <div className="relative w-full h-full rounded-lg border-2 border-dashed border-border overflow-hidden bg-muted">
                    {imagePreview ? (
                      <Image
                        src={imagePreview}
                        alt="Experience preview"
                        fill
                        className="object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        {isUploadingImage ? (
                          <Spinner className="size-8" />
                        ) : (
                          <span className="text-muted-foreground text-sm">
                            No image
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                  <Button
                    type="button"
                    size="icon-lg"
                    variant="outline"
                    className="absolute bottom-2 right-2"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploadingImage}
                  >
                    <TbCamera />
                  </Button>
                </div>
              </Field>
            </div>
          </FieldGroup>

          <ButtonGroup className="ml-auto">
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={
                createExperienceMutation.isPending ||
                !title.trim() ||
                !description.trim() ||
                !date ||
                !imagePreview
              }
            >
              {createExperienceMutation.isPending
                ? "Adding..."
                : "Add Experience"}
            </Button>
          </ButtonGroup>
        </form>
      </CardContent>
    </Card>
  );
};

export const EditExperienceForm = ({ data }: { data: Experience }) => {
  const router = useRouter();
  const updateExperienceMutation = useUpdateExperience();
  const uploadImageMutation = useUploadAvatar();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState(data.title);
  const [description, setDescription] = useState(data.description);
  const [date, setDate] = useState<Date | undefined>(
    new Date(data.experiencedAt)
  );
  const [imagePreview, setImagePreview] = useState<string | null>(
    data.image || null
  );
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast.error("Please select an image file");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }

      setIsUploadingImage(true);

      // Convert to base64 for preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setIsUploadingImage(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!date) {
      toast.error("Please select a date");
      return;
    }

    try {
      let imageUrl = imagePreview;

      // If image is base64, upload to imgbb first
      if (imagePreview && imagePreview.startsWith("data:")) {
        try {
          imageUrl = await uploadImageMutation.mutateAsync(imagePreview);
        } catch (error) {
          console.error("Upload error:", error);
          toast.error("Failed to upload image");
          return;
        }
      }

      const experienceData = {
        title,
        description,
        experiencedAt: date,
        image: imageUrl || "",
      };

      await updateExperienceMutation.mutateAsync({
        experienceId: data.id,
        experienceData,
      });

      toast.success("Experience updated successfully!");
      router.push("/dashboard/experiences");
    } catch (error) {
      console.error("Failed to update experience:", error);
      toast.error("Failed to update experience. Please try again.");
    }
  };

  const handleCancel = () => {
    toast("Changes discarded", { icon: "🗑️" });
    router.back();
  };

  return (
    <Card>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="title">
                Title&nbsp;<span className="text-destructive">*</span>
              </FieldLabel>
              <Input
                type="text"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Update your experience title"
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="description">
                Description&nbsp;<span className="text-destructive">*</span>
              </FieldLabel>
              <Textarea
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Update your story here"
                required
              />
            </Field>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
              <Field>
                <FieldLabel htmlFor="date">
                  When did this happen?&nbsp;
                  <span className="text-destructive">*</span>
                </FieldLabel>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  captionLayout="dropdown"
                  className="rounded-lg border max-w-3xs"
                  disabled={(date) => date > new Date()}
                />
                <Input
                  type="date"
                  name="date"
                  value={date ? date.toISOString().split("T")[0] : ""}
                  hidden
                  required
                  readOnly
                />
              </Field>
              <Field>
                <FieldLabel className="text-center">
                  Experience Image&nbsp;
                  <span className="text-destructive">*</span>
                </FieldLabel>
                <div className="relative aspect-square w-full">
                  <div className="relative w-full h-full rounded-lg border-2 border-dashed border-border overflow-hidden bg-muted">
                    {imagePreview ? (
                      <Image
                        src={imagePreview}
                        alt="Experience preview"
                        fill
                        className="object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        {isUploadingImage ? (
                          <Spinner className="size-8" />
                        ) : (
                          <span className="text-muted-foreground text-sm">
                            No image
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                  <Button
                    type="button"
                    size="icon-lg"
                    variant="outline"
                    className="absolute bottom-2 right-2"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploadingImage}
                  >
                    <TbCamera />
                  </Button>
                </div>
              </Field>
            </div>
          </FieldGroup>
          <ButtonGroup className="ml-auto">
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={
                updateExperienceMutation.isPending ||
                !title.trim() ||
                !description.trim() ||
                !date ||
                !imagePreview
              }
            >
              {updateExperienceMutation.isPending
                ? "Updating..."
                : "Update Experience"}
            </Button>
          </ButtonGroup>
        </form>
      </CardContent>
    </Card>
  );
};
