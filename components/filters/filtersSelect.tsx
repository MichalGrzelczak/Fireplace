"use client";

import React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FiltersSelect = ({
  items,
  placeholder,
  label,
  onClickCallback,
}: {
  items: any[];
  placeholder: string;
  label: string;
  onClickCallback: (name: string) => void;
}) => {
  return (
    <div className="pr-3">
      <Select onValueChange={onClickCallback}>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{label}</SelectLabel>
            {items.map((item) => (
              <SelectItem key={item.id} value={item.id}>
                {item.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default FiltersSelect;
