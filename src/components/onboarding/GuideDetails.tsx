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
import { useState, useCallback, useMemo } from "react";
import { IoMdAdd, IoMdCheckmark, IoMdClose } from "react-icons/io";
import { TbArrowRight } from "react-icons/tb";

const PRESET_LANGUAGES = ["English", "Sinhala", "Tamil", "Hindi", "Mandarin"];

interface StepProps {
  stepUp: (data: {
    languages: string;
    experience: string;
  }) => void;
  initialData?: { languages: string; experience: string };
}

const GuideDetails = ({ stepUp, initialData }: StepProps) => {
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(
    initialData?.languages ? initialData.languages.split(", ") : []
  );
  const [experience, setExperience] = useState(initialData?.experience ?? "");
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [otherLanguage, setOtherLanguage] = useState("");

  const customLanguages = useMemo(
    () => selectedLanguages.filter((lang) => !PRESET_LANGUAGES.includes(lang)),
    [selectedLanguages]
  );

  const toggleLanguage = useCallback((lang: string) => {
    setSelectedLanguages((prev) =>
      prev.includes(lang) ? prev.filter((l) => l !== lang) : [...prev, lang]
    );
  }, []);

  const removeCustomLanguage = useCallback((lang: string) => {
    setSelectedLanguages((prev) => prev.filter((l) => l !== lang));
  }, []);

  const addOtherLanguage = useCallback(() => {
    if (otherLanguage.trim()) {
      setSelectedLanguages((prev) => [...prev, otherLanguage.trim()]);
      setOtherLanguage("");
      setShowOtherInput(false);
    }
  }, [otherLanguage]);

  const handleSubmit = useCallback(() => {
    stepUp({
      languages: selectedLanguages.join(", "),
      experience,
    });
  }, [selectedLanguages, experience, stepUp]);

  const isFormValid = useMemo(() => true, []);
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
            <div className="flex flex-wrap gap-2 mt-2">
              {PRESET_LANGUAGES.map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => toggleLanguage(lang)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedLanguages.includes(lang)
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  {lang}
                </button>
              ))}
              {customLanguages.map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => removeCustomLanguage(lang)}
                  className="px-4 py-2 rounded-full text-sm font-medium bg-primary text-primary-foreground flex items-center gap-1"
                  aria-label={`Remove ${lang} language`}
                >
                  {lang}
                  <IoMdClose className="w-3 h-3" />
                </button>
              ))}
              {!showOtherInput ? (
                <button
                  type="button"
                  onClick={() => setShowOtherInput(true)}
                  className="px-4 py-2 rounded-full text-sm font-medium bg-secondary text-secondary-foreground hover:bg-secondary/80 flex items-center gap-1"
                  aria-label="Add custom language"
                >
                  <IoMdAdd className="w-4 h-4" />
                  Other
                </button>
              ) : (
                <div className="flex items-center gap-2 w-full mt-2">
                  <Input
                    type="text"
                    placeholder="Enter language"
                    value={otherLanguage}
                    onChange={(e) => setOtherLanguage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addOtherLanguage();
                      }
                    }}
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    size="icon"
                    variant="secondary"
                    onClick={addOtherLanguage}
                    disabled={!otherLanguage.trim()}
                    aria-label="Add custom language"
                  >
                    <IoMdCheckmark />
                  </Button>
                  <Button
                    type="button"
                    size="icon"
                    variant="outline"
                    onClick={() => {
                      setShowOtherInput(false);
                      setOtherLanguage("");
                    }}
                    aria-label="Cancel"
                  >
                    <IoMdClose />
                  </Button>
                </div>
              )}
            </div>
          </Field>
          <Field>
            <Label htmlFor="experience">Years of experience</Label>
            <Input
              type="number"
              id="experience"
              name="experience"
              placeholder="Years"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
            />
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

export default GuideDetails;
