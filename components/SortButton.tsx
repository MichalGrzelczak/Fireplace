import * as React from "react";
import { FC } from "react";
import { FaArrowDownZA, FaArrowUpAZ } from "react-icons/fa6";

import { Button } from "./ui/button";

export interface SortButtonProps {
  onClick: () => void;
  isSortedAsc: boolean;
  column: string;
}

export const SortButton: FC<SortButtonProps> = ({
  column,
  onClick,
  isSortedAsc,
}) => (
  <Button
    variant="link"
    type={"button"}
    title={`Sort by ${column}`}
    aria-label={`Sort by ${column}`}
    aria-sort={isSortedAsc ? "ascending" : "descending"}
    onClick={onClick}
  >
    {isSortedAsc ? (
      <FaArrowUpAZ className="text-fontSize-3" />
    ) : (
      <FaArrowDownZA className="text-fontSize-3" />
    )}
  </Button>
);
