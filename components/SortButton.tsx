import { faArrowDownZA, faArrowUpAZ } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";
import { FC } from "react";

import { cn } from "@/lib/utils";

import { Button } from "./ui/button";

export interface SortButtonProps {
  onClick: () => void;
  isSortedAsc: boolean;
}

export const SortButton: FC<SortButtonProps> = ({ onClick, isSortedAsc }) => (
  <Button size={"smIcon"} variant="ghost" onClick={onClick}>
    {isSortedAsc ? (
      <FontAwesomeIcon className="fa-2xs" icon={faArrowUpAZ} />
    ) : (
      <FontAwesomeIcon className="fa-2xs" icon={faArrowDownZA} />
    )}
  </Button>
);
