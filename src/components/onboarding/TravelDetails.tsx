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

const COUNTRIES: string[] = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Cape Verde",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "East Timor",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "North Korea",
  "South Korea",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Macedonia",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestine",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Togo",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Vatican City",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe",
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
