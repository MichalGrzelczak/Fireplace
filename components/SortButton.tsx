import * as React from "react";
import { FC } from "react";
import { FaArrowDownZA, FaArrowUpAZ } from "react-icons/fa6";

import { Button } from "./ui/button";

export interface SortButtonProps {
  onClick: () => void;
  isSortedAsc: boolean;
}

export const SortButton: FC<SortButtonProps> = ({ onClick, isSortedAsc }) => (
  <Button size={"smIcon"} variant="ghost" onClick={onClick}>
    {isSortedAsc ? (
      <FaArrowUpAZ className="fa-2xs" />
    ) : (
      <FaArrowDownZA className="fa-2xs" />
    )}
  </Button>
);
