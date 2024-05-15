"use client";

import React, { useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function HackathonDateSelector(props: {
  dates: string[];
  selectedDate: string;
  onChange?: (date: string) => void;
}) {
  const [currentSelectedDate, setCurrentSelectedDate] = useState(
    props.selectedDate,
  );

  return (
    <Select value={currentSelectedDate}>
      <SelectTrigger>
        <SelectValue placeholder="Select hackathon year" />
      </SelectTrigger>
      <SelectContent className="w-fit">
        <SelectGroup>
          {props.dates.map((date) => (
            <SelectItem
              key={date}
              value={date}
              onSelect={() => {
                setCurrentSelectedDate(date);
                props.onChange?.(date);
              }}
            >
              {date}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
