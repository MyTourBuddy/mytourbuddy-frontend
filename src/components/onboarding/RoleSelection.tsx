// step 1 - common

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import img1 from "@/../public/img1.svg";
import Image from "next/image";
import { TbMap, TbWorld } from "react-icons/tb";
import { RoleSelectionInput } from "@/schemas/onboarding.schema";

interface RoleSelectionProps {
  onRoleSelect: (role: RoleSelectionInput["role"]) => void;
}

const RoleSelection = ({ onRoleSelect }: RoleSelectionProps) => {
  return (
    <Card className="w-full text-center">
      <CardHeader className="space-y-3 md:space-y-4">
        <div className="flex flex-col items-center text-center mb-2 md:mb-4">
          <div className="w-24 h-24 md:w-32 md:h-32 mb-3 md:mb-4 relative">
            <Image
              src={img1}
              alt="Welcome to MyTourBuddy"
              fill
              className="object-contain"
              priority
            />
          </div>
          <CardTitle className="text-xl md:text-2xl lg:text-3xl mb-1.5 md:mb-2">
            Welcome to MyTourBuddy! 👋
          </CardTitle>
          <CardDescription className="text-sm md:text-base">
            Let&apos;s get you started in just a few steps
          </CardDescription>
        </div>
        <CardTitle className="text-base md:text-lg">Who are you?</CardTitle>
        <CardDescription className="text-xs md:text-sm">
          Choose how you&apos;d like to use MyTourBuddy
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ButtonGroup className="w-full">
          <Button
            variant="outline"
            className="flex-1 h-10 md:h-11 text-sm md:text-base"
            onClick={() => onRoleSelect("tourist")}
          >
            <TbWorld />
            <span>Tourist</span>
          </Button>
          <Button
            variant="outline"
            className="flex-1 h-10 md:h-11 text-sm md:text-base"
            onClick={() => onRoleSelect("guide")}
          >
            <TbMap />
            <span>Guide</span>
          </Button>
        </ButtonGroup>
      </CardContent>
    </Card>
  );
};

export default RoleSelection;
