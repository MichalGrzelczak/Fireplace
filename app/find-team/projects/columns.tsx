"use client";

import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import Link from "next/link";

import { Avatar, AvatarImage } from "@/components/ui/avatar";

export type Project = {
  uuid: string;
  projectName: string;
  leaderName: string;
  isFav: boolean;
  teamMembers: string[];
  technologies: string[];
  teamName: string;
  recruitmentStatus: number;
  applicationStatus: number;
};

const columnHelper = createColumnHelper<Project>();

const toggleFav = (id: string) => {
  console.log(id);
};

export const columns: ColumnDef<Project, any>[] = [
  columnHelper.accessor("isFav", {
    header: () => <div className="uppercase">Fav</div>,
    cell: (info) => {
      const isFav = info.getValue();
      const id = info.row.id;
      return (
        <div onClick={() => toggleFav(id)}>
          {isFav ? (
            <FontAwesomeIcon icon={faStar} />
          ) : (
            <FontAwesomeIcon icon={faStar} />
          )}
        </div>
      );
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
    size: 250,
  }),
  columnHelper.accessor("leaderName", {
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
    size: 150,
  }),
  columnHelper.accessor("teamMembers", {
    header: () => <div className="uppercase">Team Members</div>,
    size: 200,
  }),
  columnHelper.accessor("technologies", {
    header: () => <div className="uppercase">Needed Skills</div>,
    size: 200,
  }),
  columnHelper.accessor("teamName", {
    header: () => <div className="uppercase">Team Name</div>,
    size: 100,
  }),
  columnHelper.accessor("recruitmentStatus", {
    header: () => <div className="uppercase">Recruitment Status</div>,
    size: 100,
  }),
  columnHelper.accessor("applicationStatus", {
    header: () => <div className="uppercase">Application Status</div>,
    size: 100,
  }),
];
