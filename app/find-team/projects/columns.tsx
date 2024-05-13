"use client";

import { StarFilledIcon, StarIcon } from "@radix-ui/react-icons";
import { createColumnHelper } from "@tanstack/react-table";
import Link from "next/link";

import { Avatar, AvatarImage } from "@/components/ui/avatar";

export type Project = {
  id: string;
  projectName: string;
  leader: string;
  isFav: boolean;
  teamMembers: string;
  technologies: string;
  product: string;
};

const columnHelper = createColumnHelper<Project>();

export const columns = [
  columnHelper.accessor("isFav", {
    header: () => <div className="uppercase">Fav</div>,
    cell: (info) => {
      const isFav = info.getValue();
      return isFav ? <StarFilledIcon /> : <StarIcon />;
    },
    size: 5,
  }),
  columnHelper.accessor("projectName", {
    header: () => <div className="uppercase">Project Name</div>,
    cell: (info) => {
      const projectName = info.getValue();
      return (
        <Link href="#" className="text-blue-600">
          {projectName}
        </Link>
      );
    },
    size: 150,
  }),
  columnHelper.accessor("leader", {
    header: () => <div className="uppercase">Leader</div>,
    cell: (info) => {
      const leaderName = info.getValue();
      return (
        <div className="truncate flex items-center gap-1">
          <Avatar className="h-4 w-4">
            <AvatarImage src="https://github.com/shadcn.png"></AvatarImage>
          </Avatar>
          <div className="truncate">{leaderName}</div>
        </div>
      );
    },
    size: 50,
  }),
  columnHelper.accessor("teamMembers", {
    header: () => <div className="uppercase">Team Members</div>,
    size: 100,
  }),
  columnHelper.accessor("technologies", {
    header: () => <div className="uppercase">Needed Skills</div>,
    size: 100,
  }),
  columnHelper.accessor("product", {
    header: () => <div className="uppercase">Product</div>,
    size: 30,
  }),
];
