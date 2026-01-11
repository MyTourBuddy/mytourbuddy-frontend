"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import {
  TbBabyCarriage,
  TbCalendar,
  TbMan,
  TbMinus,
  TbPlus,
  TbUser,
} from "react-icons/tb";

import { Field, FieldLabel, FieldSet } from "./ui/field";
import { Button } from "./ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "./ui/input-group";
import { Input } from "./ui/input";

import { formatCurrency } from "@/utils/helpers";
import { useCreateBooking } from "@/hooks/useBookingQueries";

type BookingFormProps = {
  maxCount: number;
  pricePerPerson: number;
  packageId: string;
};

const BookingForm = ({
  maxCount,
  pricePerPerson,
  packageId,
}: BookingFormProps) => {
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [bookingDate, setBookingDate] = useState("");

  const createBooking = useCreateBooking();

  const totalCount = adults + children;
  const isFormComplete = bookingDate.trim() !== "" && totalCount > 0;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isFormComplete) return;

    try {
      const result = await createBooking.mutateAsync({
        pkgId: packageId,
        bookingDate,
        totalCount,
        totalPrice: totalCount * pricePerPerson,
      });

      toast.success("Booking created successfully!");
    } catch (error: any) {
      const errorMessage =
        error?.message || "Failed to create booking. Please try again.";
      toast.error(errorMessage);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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

        <Field className="flex flex-col gap-2">
          <FieldLabel>
            <TbCalendar />
            Start Date
          </FieldLabel>

          <Input
            type="date"
            name="bookingDate"
            value={bookingDate}
            onChange={(e) => setBookingDate(e.target.value)}
            min={
              new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
                .toISOString()
                .split("T")[0]
            }
            required
          />
        </Field>

        <div className="rounded-lg text-sm bg-muted/50 p-4 flex flex-col gap-3 border border-border">
          <div className="flex justify-between items-center">
            <p>
              {totalCount} {totalCount === 1 ? "person" : "people"}
            </p>
            <p className="flex items-center">
              {formatCurrency(pricePerPerson)}/<TbMan />
            </p>
          </div>

          <div className="flex justify-between items-center">
            <p>Total:</p>
            <p className="text-lg text-primary font-semibold">
              {formatCurrency(pricePerPerson * totalCount)}
            </p>
          </div>

          <div className="flex justify-between items-center">
            <p>Max Group Size:</p>
            <p>{maxCount} People</p>
          </div>
        </div>
      </FieldSet>

      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={createBooking.isPending || !isFormComplete}
      >
        {createBooking.isPending ? "Creating Booking..." : "Book Now"}
      </Button>
    </form>
  );
};

export default BookingForm;
