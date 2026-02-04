import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Field, FieldGroup } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  TouristDetailsInput,
  touristDetailsSchema,
} from "@/schemas/onboarding.schema";
import { COUNTRIES } from "@/data/constants";

const PRESET_PREFERENCES = [
  "Adventure",
  "Culture",
  "Nature",
  "Beach",
  "Food & Cuisine",
  "Photography",
  "Wildlife",
  "Relaxation",
];

interface StepProps {
  stepUp: (data: TouristDetailsInput) => void;
  initialData?: TouristDetailsInput;
}

type ValidationErrors = Partial<Record<keyof TouristDetailsInput, string>>;

const TravelDetails = ({ stepUp, initialData }: StepProps) => {
  const [country, setCountry] = useState(initialData?.country ?? "");
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>(
    initialData?.travelPreferences ?? []
  );

  const [errors, setErrors] = useState<ValidationErrors>({});

  const validateForm = useCallback(() => {
    const result = touristDetailsSchema.safeParse({
      country,
      travelPreferences: selectedPreferences,
    });

    if (result.success) {
      setErrors({});
      return true;
    } else {
      const formattedErrors: ValidationErrors = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof TouristDetailsInput;
        if (!formattedErrors[field]) {
          formattedErrors[field] = issue.message;
        }
      });
      setErrors(formattedErrors);
      return false;
    }
  }, [country, selectedPreferences]);

  const handleSubmit = useCallback(() => {
    if (validateForm()) {
      stepUp({ country, travelPreferences: selectedPreferences });
    }
  }, [country, selectedPreferences, stepUp, validateForm]);

  return (
    <Card className="w-full">
      <CardHeader className="text-center mb-3">
        <CardTitle className="text-xl md:text-2xl">Travel Details</CardTitle>
        <CardDescription className="text-sm md:text-base">
          Share your travel preferences
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FieldGroup>
          <Field>
            <Label htmlFor="country">Country</Label>
            <Select
              value={country}
              onValueChange={(value) => {
                setCountry(value);
                if (errors.country) {
                  setErrors((prev) => ({ ...prev, country: undefined }));
                }
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a country" />
              </SelectTrigger>
              <SelectContent>
                {COUNTRIES.map((countryName) => (
                  <SelectItem key={countryName} value={countryName}>
                    {countryName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.country && (
              <p className="text-red-500 text-sm mt-1">{errors.country}</p>
            )}
          </Field>

          <Field>
            <Label>Travel Preferences</Label>
            <div className="mt-3">
              <SelectableButtons
                options={PRESET_PREFERENCES}
                selected={selectedPreferences}
                onChange={setSelectedPreferences}
                allowAddMore={true}
                addMoreLabel="Other"
                placeholder="Enter custom preference"
              />
            </div>
            {errors.travelPreferences && (
              <p className="text-red-500 text-sm mt-2">
                {errors.travelPreferences}
              </p>
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

export default TravelDetails;
