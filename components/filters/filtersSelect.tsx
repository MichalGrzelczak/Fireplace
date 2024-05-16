"use client";

import React, { FC } from "react";

import MultiSelectFormField, {
  MultiSelectOptions,
} from "@/components/ui/multi-select";

type FiltersSelectProps = {
  options: MultiSelectOptions;
  selectedOptions: Array<string>;
  placeholder: string;
  onClickCallback: (value: string[]) => void;
};

export const FiltersSelect: FC<FiltersSelectProps> = ({
  options,
  selectedOptions,
  placeholder,
  onClickCallback,
}) => {
  return (
    <MultiSelectFormField
      defaultValue={selectedOptions}
      options={options}
      onValueChange={onClickCallback}
      placeholder={placeholder}
      variant="secondary"
    />
  );
};
