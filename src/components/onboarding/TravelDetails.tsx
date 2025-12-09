import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { useState, useCallback, useMemo } from "react";
import { IoMdAdd, IoMdCheckmark, IoMdClose } from "react-icons/io";
import { TbArrowRight } from "react-icons/tb";

interface StepProps {
  stepUp: (data: { country: string; preferences: string }) => void;
  initialData?: { country: string; preferences: string };
}

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

const COUNTRIES = [
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

const TravelDetails = ({ stepUp, initialData }: StepProps) => {
  const [country, setCountry] = useState(initialData?.country ?? "");
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>(
    initialData?.preferences ? initialData.preferences.split(", ") : []
  );
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [otherPreference, setOtherPreference] = useState("");

  const customPreferences = useMemo(
    () =>
      selectedPreferences.filter((pref) => !PRESET_PREFERENCES.includes(pref)),
    [selectedPreferences]
  );

  const togglePreference = useCallback((pref: string) => {
    setSelectedPreferences((prev) =>
      prev.includes(pref) ? prev.filter((p) => p !== pref) : [...prev, pref]
    );
  }, []);

  const removeCustomPreference = useCallback((pref: string) => {
    setSelectedPreferences((prev) => prev.filter((p) => p !== pref));
  }, []);

  const addOtherPreference = useCallback(() => {
    if (otherPreference.trim()) {
      setSelectedPreferences((prev) => [...prev, otherPreference.trim()]);
      setOtherPreference("");
      setShowOtherInput(false);
    }
  }, [otherPreference]);

  const handleSubmit = useCallback(() => {
    if (!country.trim()) return;
    stepUp({ country, preferences: selectedPreferences.join(", ") });
  }, [country, selectedPreferences, stepUp]);

  const isFormValid = useMemo(() => country.trim().length > 0, [country]);

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
            <Select value={country} onValueChange={setCountry}>
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
          </Field>
          <Field>
            <Label>Travel Preferences</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {PRESET_PREFERENCES.map((pref) => (
                <button
                  key={pref}
                  type="button"
                  onClick={() => togglePreference(pref)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedPreferences.includes(pref)
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  {pref}
                </button>
              ))}
              {customPreferences.map((pref) => (
                <button
                  key={pref}
                  type="button"
                  onClick={() => removeCustomPreference(pref)}
                  className="px-4 py-2 rounded-full text-sm font-medium bg-primary text-primary-foreground flex items-center gap-1"
                  aria-label={`Remove ${pref} preference`}
                >
                  {pref}
                  <IoMdClose className="w-3 h-3" />
                </button>
              ))}
              {!showOtherInput ? (
                <button
                  type="button"
                  onClick={() => setShowOtherInput(true)}
                  className="px-4 py-2 rounded-full text-sm font-medium bg-secondary text-secondary-foreground hover:bg-secondary/80 flex items-center gap-1"
                  aria-label="Add custom preference"
                >
                  <IoMdAdd className="w-4 h-4" />
                  Other
                </button>
              ) : (
                <div className="flex items-center gap-2 w-full mt-2">
                  <Input
                    type="text"
                    placeholder="Enter custom preference"
                    value={otherPreference}
                    onChange={(e) => setOtherPreference(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addOtherPreference();
                      }
                    }}
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    size="icon"
                    variant="secondary"
                    onClick={addOtherPreference}
                    disabled={!otherPreference.trim()}
                    aria-label="Add custom preference"
                  >
                    <IoMdCheckmark />
                  </Button>
                  <Button
                    type="button"
                    size="icon"
                    variant="outline"
                    onClick={() => {
                      setShowOtherInput(false);
                      setOtherPreference("");
                    }}
                    aria-label="Cancel"
                  >
                    <IoMdClose />
                  </Button>
                </div>
              )}
            </div>
          </Field>
        </FieldGroup>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleSubmit}
          disabled={!isFormValid}
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
