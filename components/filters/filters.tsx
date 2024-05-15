"use client";

import { ReadonlyURLSearchParams } from "next/dist/client/components/navigation.react-server";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useMemo } from "react";
import { FaAngular, FaDoorClosed, FaDoorOpen, FaReact } from "react-icons/fa";

import { FiltersSelect } from "@/components/filters/filtersSelect";
import { MultiSelectOptions } from "@/components/ui/multi-select";

const technologies: MultiSelectOptions = [
  {
    label: "Angular",
    value: "angular",
    icon: FaAngular,
  },
  {
    label: "React",
    value: "react",
    icon: FaReact,
  },
  {
    label: "Euphoria",
    value: "Euphoria",
    icon: FaReact,
  },
];

const status = [
  {
    label: "Open",
    value: "1",
    icon: FaDoorOpen,
  },
  {
    label: "Closed",
    value: "0",
    icon: FaDoorClosed,
  },
];

export enum FiltersEnum {
  technologies = "technologies",
  status = "status",
}

const Filters = () => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const selectedTechnologies = useMemo(() => {
    return getArrayFromParams(searchParams, FiltersEnum.technologies);
  }, [searchParams]);

  const selectedStatus = useMemo(() => {
    return getArrayFromParams(searchParams, FiltersEnum.status);
  }, [searchParams]);

  const addSearchParam = (key: FiltersEnum, options: Array<string>) => {
    const urlSearchParams = new URLSearchParams(searchParams);

    if (!options?.length) {
      urlSearchParams.delete(key);
    } else {
      urlSearchParams.set(key, JSON.stringify(options));
    }

    replace(`${pathname}?${urlSearchParams.toString()}`);
  };

  const handleOnSelectTechnologyClick = (options: string[]) => {
    addSearchParam(FiltersEnum.technologies, options);
  };

  const handleOnSelectStatusClick = (options: string[]) => {
    addSearchParam(FiltersEnum.status, options);
  };

  return (
    <div className="flex gap-4 items-center pl-6">
      <FiltersSelect
        selectedOptions={selectedTechnologies}
        options={technologies}
        placeholder="Technology"
        onClickCallback={handleOnSelectTechnologyClick}
      ></FiltersSelect>

      <FiltersSelect
        selectedOptions={selectedStatus}
        options={status}
        placeholder="Status"
        onClickCallback={handleOnSelectStatusClick}
      ></FiltersSelect>
    </div>
  );
};

function getArrayFromParams(
  searchParams: ReadonlyURLSearchParams,
  key: FiltersEnum,
) {
  const urlSearchParams = new URLSearchParams(searchParams);
  const valueString = urlSearchParams.get(key) ?? "";
  try {
    const parsedData = JSON.parse(valueString);

    return parsedData?.length ? parsedData : [];
  } catch (e) {
    return [];
  }
}

export default Filters;
