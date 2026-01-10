"use client";

import { Field, FieldLabel, FieldSet } from "./ui/field";
import { Button } from "./ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "./ui/input-group";
import { TbBabyCarriage, TbMan, TbMinus, TbPlus, TbUser } from "react-icons/tb";
import { useState } from "react";
import { formatCurrency } from "@/utils/helpers";

const BookingForm = ({
  maxCount,
  pricePerPerson,
}: {
  maxCount: number;
  pricePerPerson: number;
}) => {
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

  const totalCount = adults + children;

  return (
    <form className="flex flex-col gap-4">
      <FieldSet className="flex flex-col gap-2">
        <Field className="flex flex-col gap-2">
          <FieldLabel>
            <TbUser />
            Adults
          </FieldLabel>
          <InputGroup className="py-5">
            <InputGroupAddon align="inline-start">
              <InputGroupButton
                onClick={() => setAdults(adults - 1)}
                size="icon-sm"
                variant="secondary"
                disabled={adults <= 1}
              >
                <TbMinus />
              </InputGroupButton>
            </InputGroupAddon>
            <InputGroupInput value={adults} readOnly className="text-center" />
            <InputGroupAddon align="inline-end">
              <InputGroupButton
                onClick={() => setAdults(adults + 1)}
                size="icon-sm"
                variant="secondary"
                disabled={totalCount >= maxCount}
              >
                <TbPlus />
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </Field>
        <Field className="flex flex-col gap-2">
          <FieldLabel>
            <TbBabyCarriage />
            Childs
          </FieldLabel>
          <InputGroup className="py-5">
            <InputGroupAddon align="inline-start">
              <InputGroupButton
                onClick={() => setChildren(children - 1)}
                size="icon-sm"
                variant="secondary"
                disabled={children <= 0}
              >
                <TbMinus />
              </InputGroupButton>
            </InputGroupAddon>
            <InputGroupInput
              value={children}
              readOnly
              className="text-center"
            />
            <InputGroupAddon align="inline-end">
              <InputGroupButton
                onClick={() => setChildren(children + 1)}
                size="icon-sm"
                variant="secondary"
                disabled={totalCount >= maxCount}
              >
                <TbPlus />
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </Field>
        <div className="rounded-lg text-sm bg-muted/50 p-4 flex flex-col gap-3 border border-border">
          <div className="flex flex-wrap justify-between items-center">
            <p>
              {totalCount} {totalCount === 1 ? "person" : "people"}
            </p>
            <p className="flex flex-wrap items-center">
              {formatCurrency(pricePerPerson)}/<TbMan />
            </p>
          </div>
          <div className="flex flex-wrap justify-between items-center">
            <p>Total:</p>
            <p className="text-lg text-primary font-semibold">
              {formatCurrency(pricePerPerson * totalCount)}
            </p>
          </div>
          <div className="flex flex-wrap justify-between items-center">
            <p>Max Group Size:</p>
            <p>{maxCount} People</p>
          </div>
        </div>
      </FieldSet>
      <input name="count" readOnly type="number" value={totalCount} hidden />
      <Button size="lg" className="w-full">
        Book Now
      </Button>
    </form>
  );
};

export default BookingForm;
