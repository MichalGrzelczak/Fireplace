import * as React from "react";
import { FC } from "react";
import { FaArrowDownZA, FaArrowUpAZ } from "react-icons/fa6";

import { Button } from "./ui/button";

export interface SortButtonProps {
  onClick: () => void;
  isSortedAsc: boolean;
}

export const SortButton: FC<SortButtonProps> = ({ onClick, isSortedAsc }) => (
  <Button
    variant="link"
    type={"button"}
    aria-label={"Sort column"}
    onClick={onClick}
  >
    {isSortedAsc ? (
      <FaArrowUpAZ className="text-fontSize-3" />
    ) : (
      <FaArrowDownZA className="text-fontSize-3" />
    )}
  </Button>
);
