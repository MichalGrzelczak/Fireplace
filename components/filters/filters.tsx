"use client";

import { ReadonlyURLSearchParams } from "next/dist/client/components/navigation.react-server";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { FC, useMemo } from "react";
import * as Icons from "react-icons/fa";

import { FiltersSelect } from "@/components/filters/filtersSelect";
import { MultiSelectOptions } from "@/components/ui/multi-select";

const status = [
  {
    label: "Open",
    value: "1",
    icon: Icons.FaDoorOpen,
  },
  {
    label: "Closed",
    value: "0",
    icon: Icons.FaDoorClosed,
  },
];

export enum FiltersEnum {
  technologies = "technologies",
  status = "status",
}

type FilterProps = {
  technologies: string[];
};

const Filters: FC<FilterProps> = ({ technologies }) => {
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

  const technologiesToDisplay = prepareTechnologiesFilters(technologies);

  return (
    <div className="flex gap-space-3 items-center pl-space-4">
      <FiltersSelect
        selectedOptions={selectedTechnologies}
        options={technologiesToDisplay}
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

function prepareTechnologiesFilters(
  technologies: string[],
): MultiSelectOptions {
  return technologies
    .map((tech) => {
      let icon = Icons.FaFire;

      if (`Fa${tech}` in Icons) {
        icon = Icons[`Fa${tech}` as keyof typeof Icons];
      }

      return {
        label: tech,
        value: tech,
        icon,
      };
    })
    .sort((a, b) => {
      const nameA = a.label.toLowerCase();
      const nameB = b.label.toLowerCase();

      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    });
}

export default Filters;
