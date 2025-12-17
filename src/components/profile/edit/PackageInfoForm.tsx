import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Package } from "@/schemas/package.schema";
import { useState } from "react";

interface PackageFormProps {
  onClose: () => void;
  onSubmit: (data: Omit<Package, "id" | "guideId">) => void;
}

export const PackageCreateForm = ({ onClose, onSubmit }: PackageFormProps) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: 0,
    duration: "",
    location: "",
    image: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    console.log(formData);
    onClose();
  };

  return (
    <form
      method="post"
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 md:gap-6"
    >
      <FieldGroup className="flex flex-col gap-2 md:gap-3">
        <Field>
          <FieldLabel htmlFor="title" className="text-sm md:text-balance">
            Title
          </FieldLabel>
          <Input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Package title.."
            className="text-sm md:text-balance h-9 md:h-10"
            required
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="description" className="text-sm md:text-balance">
            Description
          </FieldLabel>
          <Textarea
            rows={3}
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Package description..."
            className="text-sm md:text-balance"
            required
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="price" className="text-sm md:text-balance">
            Price
          </FieldLabel>
          <Input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Package price.. LKR"
            className="text-sm md:text-balance h-9 md:h-10"
            required
            min="0"
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="duration" className="text-sm md:text-balance">
            Duration
          </FieldLabel>
          <Input
            type="text"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            placeholder="Package duration.."
            className="text-sm md:text-balance h-9 md:h-10"
            required
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="location" className="text-sm md:text-balance">
            Location
          </FieldLabel>
          <Input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Package location.."
            className="text-sm md:text-balance h-9 md:h-10"
            required
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="image" className="text-sm md:text-balance">
            Image URL
          </FieldLabel>
          <Input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Image url.."
            className="text-sm md:text-balance h-9 md:h-10"
          />
        </Field>
      </FieldGroup>

      <ButtonGroup className="ml-auto">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">Create</Button>
      </ButtonGroup>
    </form>
  );
};

interface PackageEditFormProps {
  onClose: () => void;
  onSubmit: (data: Omit<Package, "id" | "guideId">) => void;
  initialData: Package;
}

export const PackageEditForm = ({
  onClose,
  onSubmit,
  initialData,
}: PackageEditFormProps) => {
  const [formData, setFormData] = useState({
    title: initialData.title,
    description: initialData.description,
    price: initialData.price,
    duration: initialData.duration,
    location: initialData.location,
    image: initialData.image,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    console.log(formData);
    onClose();
  };

  return (
    <form
      method="post"
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 md:gap-6"
    >
      <FieldGroup className="flex flex-col gap-2 md:gap-3">
        <Field>
          <FieldLabel htmlFor="title" className="text-sm md:text-balance">
            Title
          </FieldLabel>
          <Input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Package title.."
            className="text-sm md:text-balance h-9 md:h-10"
            required
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="description" className="text-sm md:text-balance">
            Description
          </FieldLabel>
          <Textarea
            rows={3}
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Package description..."
            className="text-sm md:text-balance"
            required
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="price" className="text-sm md:text-balance">
            Price
          </FieldLabel>
          <Input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Package price.. LKR"
            className="text-sm md:text-balance h-9 md:h-10"
            required
            min="0"
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="duration" className="text-sm md:text-balance">
            Duration
          </FieldLabel>
          <Input
            type="text"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            placeholder="Package duration.."
            className="text-sm md:text-balance h-9 md:h-10"
            required
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="location" className="text-sm md:text-balance">
            Location
          </FieldLabel>
          <Input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Package location.."
            className="text-sm md:text-balance h-9 md:h-10"
            required
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="image" className="text-sm md:text-balance">
            Image URL
          </FieldLabel>
          <Input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Image url.."
            className="text-sm md:text-balance h-9 md:h-10"
          />
        </Field>
      </FieldGroup>

      <ButtonGroup className="ml-auto">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">Update</Button>
      </ButtonGroup>
    </form>
  );
};
