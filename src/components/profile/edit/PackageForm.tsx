"use client";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Package } from "@/schemas/package.schema";
import { useCreatePackage, useUpdatePackage } from "@/hooks/usePackageQueries";
import { useCurrentUser } from "@/hooks/useAuthQueries";
import { useUploadAvatar } from "@/hooks/useUserQueries";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { TbCamera, TbPlus, TbX } from "react-icons/tb";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Spinner } from "@/components/ui/spinner";
import { BLURDATA } from "@/data/constants";

export const PackageCreateForm = () => {
  const router = useRouter();
  const { data: currentUser } = useCurrentUser();
  const createPackageMutation = useCreatePackage();
  const uploadImageMutation = useUploadAvatar();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [maxGroupSize, setMaxGroupSize] = useState<number | "">("");
  const [duration, setDuration] = useState("");
  const [location, setLocation] = useState("");
  const [note, setNote] = useState("");
  const [included, setIncluded] = useState<string[]>([""]);
  const [notIncluded, setNotIncluded] = useState<string[]>([""]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const updateItem = (
    index: number,
    value: string,
    list: string[],
    setList: (v: string[]) => void
  ) => {
    const updated = [...list];
    updated[index] = value;
    setList(updated);
  };

  const addItem = (list: string[], setList: (v: string[]) => void) => {
    setList([...list, ""]);
  };

  const removeItem = (
    index: number,
    list: string[],
    setList: (v: string[]) => void
  ) => {
    setList(list.filter((_, i) => i !== index));
  };

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

      const packageData = {
        title,
        description,
        price: Number(price),
        maxGroupSize: Number(maxGroupSize),
        duration,
        location,
        image: imageUrl || "",
        included: included.filter((item) => item.trim() !== ""),
        notIncluded: notIncluded.filter((item) => item.trim() !== ""),
        note,
        guideId: currentUser?.id || "",
      };

      await createPackageMutation.mutateAsync(packageData as any);

      toast.success("Package created successfully!");
      router.push("/dashboard/packages");
    } catch (error) {
      console.error("Failed to create package:", error);
      toast.error("Failed to create package. Please try again.");
    }
  };

  const handleCancel = () => {
    toast("Changes discarded", { icon: "🗑️" });
    router.back();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 md:gap-6">
      <div className="grid grid-cols-1 md:grid-cols-8 gap-x-3">
        <FieldGroup className="col-span-5 order-2 md:order-1">
          <Field>
            <FieldLabel htmlFor="title" className="text-sm md:text-balance">
              Package Title&nbsp;<span className="text-destructive">*</span>
            </FieldLabel>
            <Input
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. 3-Day Ella Adventure"
              className="text-sm md:text-balance h-9 md:h-10"
              required
            />
          </Field>

          <Field>
            <FieldLabel
              htmlFor="description"
              className="text-sm md:text-balance"
            >
              Package Description&nbsp;
              <span className="text-destructive">*</span>
            </FieldLabel>
            <Textarea
              rows={3}
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief overview of the tour"
              className="text-sm md:text-balance"
              required
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="price" className="text-sm md:text-balance">
              Price (USD)&nbsp;<span className="text-destructive">*</span>
            </FieldLabel>
            <Input
              type="number"
              name="price"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              placeholder="e.g. 45,000"
              className="text-sm md:text-balance h-9 md:h-10"
              required
              min="0"
            />
          </Field>

          <Field>
            <FieldLabel>
              Max Group Size&nbsp;<span className="text-destructive">*</span>
            </FieldLabel>
            <Input
              type="number"
              name="maxGroupSize"
              value={maxGroupSize}
              onChange={(e) => setMaxGroupSize(Number(e.target.value))}
              placeholder="e.g. 10"
              min={1}
              required
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="duration" className="text-sm md:text-balance">
              Duration&nbsp;<span className="text-destructive">*</span>
            </FieldLabel>
            <Input
              type="text"
              name="duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="e.g. 3 Days / 2 Nights"
              className="text-sm md:text-balance h-9 md:h-10"
              required
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="location" className="text-sm md:text-balance">
              Location&nbsp;<span className="text-destructive">*</span>
            </FieldLabel>
            <Input
              type="text"
              name="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Ella, Sri Lanka"
              className="text-sm md:text-balance h-9 md:h-10"
              required
            />
          </Field>

          <Field>
            <FieldLabel>
              What’s Included&nbsp;<span className="text-destructive">*</span>
            </FieldLabel>

            <div className="flex flex-col gap-2">
              {included.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={item}
                    placeholder="e.g. Accommodation"
                    onChange={(e) =>
                      updateItem(index, e.target.value, included, setIncluded)
                    }
                    required
                  />

                  {included.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeItem(index, included, setIncluded)}
                    >
                      <TbX />
                    </Button>
                  )}
                </div>
              ))}

              <Button
                type="button"
                variant="ghost"
                className="w-fit"
                onClick={() => addItem(included, setIncluded)}
              >
                <TbPlus className="mr-2" />
                Add item
              </Button>
            </div>
          </Field>

          <Field>
            <FieldLabel>What’s Not Included</FieldLabel>

            <div className="flex flex-col gap-2">
              {notIncluded.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={item}
                    placeholder="e.g. Personal expenses"
                    onChange={(e) =>
                      updateItem(
                        index,
                        e.target.value,
                        notIncluded,
                        setNotIncluded
                      )
                    }
                  />

                  {notIncluded.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        removeItem(index, notIncluded, setNotIncluded)
                      }
                    >
                      <TbX />
                    </Button>
                  )}
                </div>
              ))}

              <Button
                type="button"
                variant="ghost"
                className="w-fit"
                onClick={() => addItem(notIncluded, setNotIncluded)}
              >
                <TbPlus className="mr-2" />
                Add item
              </Button>
            </div>
          </Field>

          <Field>
            <FieldLabel htmlFor="note" className="text-sm md:text-balance">
              Additional Notes
            </FieldLabel>
            <Textarea
              rows={3}
              name="note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Important notes for travelers"
              className="text-sm md:text-balance"
            />
          </Field>
        </FieldGroup>
        <div className="col-span-3 order-1 md:order-2">
          <Field>
            <FieldLabel className="text-center text-sm md:text-balance">
              Package Image&nbsp;<span className="text-destructive">*</span>
            </FieldLabel>
            <div className="relative aspect-square w-full">
              <div className="relative w-full h-full rounded-lg border-2 border-dashed border-border overflow-hidden bg-muted">
                {imagePreview ? (
                  <Image
                    src={imagePreview}
                    alt="Package preview"
                    fill
                    className="object-cover"
                    blurDataURL={BLURDATA}
                    loading="eager"
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
      </div>

      <ButtonGroup className="ml-auto">
        <Button type="button" variant="outline" onClick={handleCancel}>
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={
            createPackageMutation.isPending ||
            !title.trim() ||
            !description.trim() ||
            !price ||
            !maxGroupSize ||
            !duration.trim() ||
            !location.trim() ||
            !imagePreview ||
            included.filter((item) => item.trim() !== "").length === 0
          }
        >
          {createPackageMutation.isPending ? "Creating..." : "Create Package"}
        </Button>
      </ButtonGroup>
    </form>
  );
};

export const PackageEditForm = ({ pkg }: { pkg: Package }) => {
  const router = useRouter();
  const updatePackageMutation = useUpdatePackage();
  const uploadImageMutation = useUploadAvatar();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [draft, setDraft] = useState<Package | null>(null);
  const [included, setIncluded] = useState<string[]>([]);
  const [notIncluded, setNotIncluded] = useState<string[]>([]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  useEffect(() => {
    if (pkg) {
      setDraft(pkg);
      setIncluded(pkg.included || []);
      setNotIncluded(pkg.notIncluded || []);
      setImagePreview(pkg.image || null);
    }
  }, [pkg]);

  const updateItem = (
    index: number,
    value: string,
    list: string[],
    setList: (v: string[]) => void
  ) => {
    const updated = [...list];
    updated[index] = value;
    setList(updated);
  };

  const addItem = (list: string[], setList: (v: string[]) => void) => {
    setList([...list, ""]);
  };

  const removeItem = (
    index: number,
    list: string[],
    setList: (v: string[]) => void
  ) => {
    setList(list.filter((_, i) => i !== index));
  };

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

    if (!draft) return;

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

      const packageData = {
        title: draft.title,
        description: draft.description,
        price: draft.price,
        maxGroupSize: draft.maxGroupSize,
        duration: draft.duration,
        location: draft.location,
        image: imageUrl || "",
        included: included,
        notIncluded: notIncluded,
        note: draft.note,
      };

      await updatePackageMutation.mutateAsync({
        packageId: pkg.id,
        packageData,
      });

      toast.success("Package updated successfully!");
      router.push(`/dashboard/packages`);
      router.refresh();
    } catch (error) {
      console.error("Failed to update package:", error);
      toast.error("Failed to update package. Please try again.");
    }
  };

  const handleCancel = () => {
    toast("Changes discarded", { icon: "🗑️" });
    router.back();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 md:gap-6">
      <div className="grid grid-cols-1 md:grid-cols-8 gap-x-3">
        <FieldGroup className="col-span-5 order-2 md:order-1">
          <Field>
            <FieldLabel htmlFor="title" className="text-sm md:text-balance">
              Package Title&nbsp;<span className="text-destructive">*</span>
            </FieldLabel>
            <Input
              type="text"
              name="title"
              value={draft?.title || ""}
              onChange={(e) => setDraft({ ...draft!, title: e.target.value })}
              placeholder="e.g. 3-Day Ella Adventure"
              className="text-sm md:text-balance h-9 md:h-10"
              required
            />
          </Field>

          <Field>
            <FieldLabel
              htmlFor="description"
              className="text-sm md:text-balance"
            >
              Package Description&nbsp;
              <span className="text-destructive">*</span>
            </FieldLabel>
            <Textarea
              name="description"
              value={draft?.description || ""}
              onChange={(e) =>
                setDraft({ ...draft!, description: e.target.value })
              }
              placeholder="Brief overview of the tour"
              className="text-sm md:text-balance"
              required
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="price" className="text-sm md:text-balance">
              Price (USD)&nbsp;<span className="text-destructive">*</span>
            </FieldLabel>
            <Input
              type="number"
              name="price"
              value={draft?.price || ""}
              onChange={(e) =>
                setDraft({ ...draft!, price: Number(e.target.value) })
              }
              placeholder="e.g. 45,000"
              className="text-sm md:text-balance h-9 md:h-10"
              required
              min="0"
            />
          </Field>

          <Field>
            <FieldLabel>
              Max Group Size&nbsp;<span className="text-destructive">*</span>
            </FieldLabel>
            <Input
              type="number"
              name="maxGroupSize"
              value={draft?.maxGroupSize || ""}
              onChange={(e) =>
                setDraft({ ...draft!, maxGroupSize: Number(e.target.value) })
              }
              placeholder="e.g. 10"
              min={1}
              required
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="duration" className="text-sm md:text-balance">
              Duration&nbsp;<span className="text-destructive">*</span>
            </FieldLabel>
            <Input
              type="text"
              name="duration"
              value={draft?.duration || ""}
              onChange={(e) =>
                setDraft({ ...draft!, duration: e.target.value })
              }
              placeholder="e.g. 3 Days / 2 Nights"
              className="text-sm md:text-balance h-9 md:h-10"
              required
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="location" className="text-sm md:text-balance">
              Location&nbsp;<span className="text-destructive">*</span>
            </FieldLabel>
            <Input
              type="text"
              name="location"
              value={draft?.location || ""}
              onChange={(e) =>
                setDraft({ ...draft!, location: e.target.value })
              }
              placeholder="e.g. Ella, Sri Lanka"
              className="text-sm md:text-balance h-9 md:h-10"
              required
            />
          </Field>

          <Field>
            <FieldLabel>
              What’s Included&nbsp;<span className="text-destructive">*</span>
            </FieldLabel>

            <div className="flex flex-col gap-2">
              {included.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={item}
                    placeholder="e.g. Accommodation"
                    onChange={(e) =>
                      updateItem(index, e.target.value, included, setIncluded)
                    }
                    required
                  />

                  {included.length > 0 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeItem(index, included, setIncluded)}
                    >
                      <TbX />
                    </Button>
                  )}
                </div>
              ))}

              <Button
                type="button"
                variant="ghost"
                className="w-fit"
                onClick={() => addItem(included, setIncluded)}
              >
                <TbPlus className="mr-2" />
                Add item
              </Button>
            </div>
          </Field>

          <Field>
            <FieldLabel>What’s Not Included</FieldLabel>

            <div className="flex flex-col gap-2">
              {notIncluded.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={item}
                    placeholder="e.g. Personal expenses"
                    onChange={(e) =>
                      updateItem(
                        index,
                        e.target.value,
                        notIncluded,
                        setNotIncluded
                      )
                    }
                  />

                  {notIncluded.length > 0 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        removeItem(index, notIncluded, setNotIncluded)
                      }
                    >
                      <TbX />
                    </Button>
                  )}
                </div>
              ))}

              <Button
                type="button"
                variant="ghost"
                className="w-fit"
                onClick={() => addItem(notIncluded, setNotIncluded)}
              >
                <TbPlus className="mr-2" />
                Add item
              </Button>
            </div>
          </Field>

          <Field>
            <FieldLabel htmlFor="note" className="text-sm md:text-balance">
              Additional Notes
            </FieldLabel>
            <Textarea
              rows={3}
              name="note"
              value={draft?.note || ""}
              onChange={(e) => setDraft({ ...draft!, note: e.target.value })}
              placeholder="Important notes for travelers"
              className="text-sm md:text-balance"
            />
          </Field>
        </FieldGroup>
        <div className="col-span-3 order-1 md:order-2">
          <Field>
            <FieldLabel className="text-center text-sm md:text-balance">
              Package Image&nbsp;<span className="text-destructive">*</span>
            </FieldLabel>
            <div className="relative aspect-square w-full">
              <div className="relative w-full h-full rounded-lg border-2 border-dashed border-border overflow-hidden bg-muted">
                {imagePreview ? (
                  <Image
                    src={imagePreview}
                    alt="Package preview"
                    fill
                    className="object-cover"
                    blurDataURL={BLURDATA}
                    loading="eager"
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
      </div>

      <ButtonGroup className="ml-auto">
        <Button type="button" variant="outline" onClick={handleCancel}>
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={
            updatePackageMutation.isPending ||
            !draft?.title?.trim() ||
            !draft?.description?.trim() ||
            !draft?.price ||
            !draft?.maxGroupSize ||
            !draft?.duration?.trim() ||
            !draft?.location?.trim() ||
            !imagePreview ||
            included.filter((item) => item.trim() !== "").length === 0
          }
        >
          {updatePackageMutation.isPending ? "Updating..." : "Update Package"}
        </Button>
      </ButtonGroup>
    </form>
  );
};
