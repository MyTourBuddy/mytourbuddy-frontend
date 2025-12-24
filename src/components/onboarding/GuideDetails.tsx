import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Field, FieldGroup } from "@/components/ui/field";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState, useCallback } from "react";
import { TbArrowRight } from "react-icons/tb";
import SelectableButtons from "@/components/SelectableButtons";
import {
  GuideDetailsInput,
  guideDetailsSchema,
} from "@/schemas/onboarding.schema";

const PRESET_LANGUAGES: string[] = [
  "English",
  "Sinhala",
  "Tamil",
  "Hindi",
  "Mandarin",
];

interface StepProps {
  stepUp: (data: GuideDetailsInput) => void;
  initialData?: GuideDetailsInput;
}

type ValidationErrors = Partial<Record<keyof GuideDetailsInput, string>>;

const GuideDetails = ({ stepUp, initialData }: StepProps) => {
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(
    initialData?.languages ?? [] // Starts empty if no initial data
  );

  const [yearsOfExp, setYearsOfExp] = useState<string>(
    initialData?.yearsOfExp?.toString() ?? ""
  );

  const [errors, setErrors] = useState<ValidationErrors>({});

  const validateForm = useCallback(() => {
    const parsedYears = yearsOfExp.trim() === "" ? null : Number(yearsOfExp);

    const result = guideDetailsSchema.safeParse({
      languages: selectedLanguages,
      yearsOfExp: parsedYears,
    });

    if (result.success) {
      setErrors({});
      return result.data;
    } else {
      const formattedErrors: ValidationErrors = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof GuideDetailsInput;
        if (!formattedErrors[field]) {
          formattedErrors[field] = issue.message;
        }
      });
      setErrors(formattedErrors);
      return null;
    }
  }, [selectedLanguages, yearsOfExp]);

  const handleSubmit = useCallback(() => {
    const validatedData = validateForm();
    if (validatedData) {
      stepUp(validatedData);
    }
  }, [validateForm, stepUp]);

  return (
    <Card className="w-full">
      <CardHeader className="text-center mb-3">
        <CardTitle className="text-xl md:text-2xl">Guide Details</CardTitle>
        <CardDescription className="text-sm md:text-base">
          Tell us about your services
        </CardDescription>
      </CardHeader>

      <CardContent>
        <FieldGroup>
          <Field>
            <Label>Languages</Label>
            <div className="mt-3">
              <SelectableButtons
                options={PRESET_LANGUAGES}
                selected={selectedLanguages}
                onChange={setSelectedLanguages}
                allowAddMore={true}
                addMoreLabel="Other"
                placeholder="Enter language (e.g., French, Spanish)"
                className="space-y-4"
              />
            </div>
            {errors.languages && (
              <p className="text-xs text-red-500 mt-1">{errors.languages}</p>
            )}
          </Field>

          <Field>
            <Label htmlFor="yearsOfExp">Years of experience</Label>
            <Input
              type="number"
              id="yearsOfExp"
              placeholder="Years"
              value={yearsOfExp}
              onChange={(e) => {
                setYearsOfExp(e.target.value);
                setErrors((prev) => ({ ...prev, yearsOfExp: undefined }));
              }}
              min="0"
              className="mt-2"
            />
            {errors.yearsOfExp && (
              <p className="text-xs text-red-500 mt-1">{errors.yearsOfExp}</p>
            )}
          </Field>
        </FieldGroup>
      </CardContent>

      <CardFooter>
        <Button
          onClick={handleSubmit}
          className="w-full h-10 md:h-11 text-sm md:text-base group"
        >
          <span>Next</span>
          <TbArrowRight className="transition-transform group-hover:translate-x-1 duration-300" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default GuideDetails;
