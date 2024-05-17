"use client";

import { Row, createColumnHelper } from "@tanstack/react-table";
import Link from "next/link";
import { useState } from "react";
import { FaStar } from "react-icons/fa";

import { SortButton } from "@/components/SortButton";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

import {
  APPLICATION_STATUS_PROPERTIES,
  RECRUITMENT_STATUS_PROPERTIES,
} from "./consts";
import { ApplicationStatus, ProjectUser, RecruitmentStatus } from "./types";

export type Project = {
  uuid: string;
  projectName: string;
  leader: ProjectUser;
  isFav: boolean;
  teamMembers: string[];
  technologies: string[];
  projectType: string; // change to enum;
  hackKey: string;
  recruitmentStatus: RecruitmentStatus;
  applicationStatus: ApplicationStatus;
};

const columnHelper = createColumnHelper<Project>();

const toggleFav = (id: string, row: Row<Project>) => {
  console.log(id);

  row.pin("top");
};

export const columns = [
  columnHelper.accessor("isFav", {
    header: () => <div className="table__header">Fav</div>,
    enablePinning: true,
    cell: function Cell(row) {
      const isFav = row.getValue();
      const [value, setValue] = useState(isFav);
      const id = row.row.id;
      return (
        <div
          className="flex items-center"
          onClick={() => toggleFav(id, row.row)}
        >
          {isFav ? (
            <FaStar className={"text-scale-yellow-200"} />
          ) : (
            <FaStar className={"text-scale-neutral-400"} />
          )}
        </div>
      );
    },
    size: 5,
  }),
  columnHelper.accessor("projectName", {
    header: ({ column }) => {
      const isSortedAsc = column.getIsSorted() === "asc";
      const onClick = () => column.toggleSorting(isSortedAsc);
      return (
        <div className="flex items-center gap-space-1">
          <span className="table__header">Project Name</span>
          <SortButton onClick={onClick} isSortedAsc={isSortedAsc} />
        </div>
      );
    },
    cell: (info) => {
      const projectName = info.getValue();
      return (
        <Link href="#" className="text-text-brand" title={projectName}>
          {projectName}
        </Link>
      );
    },
    size: 250,
    enableResizing: true,
  }),
  columnHelper.accessor("leader", {
    header: ({ column }) => {
      const isSortedAsc = column.getIsSorted() === "asc";
      const onClick = () => column.toggleSorting(isSortedAsc);
      return (
        <div className="flex items-center gap-space-1">
          <span className="table__header">Leader</span>
          <SortButton onClick={onClick} isSortedAsc={isSortedAsc} />
        </div>
      );
    },
    cell: (info) => {
      const leader = info.getValue();
      const src = leader?.iconUrl
        ? leader?.iconUrl
        : "https://github.com/shadcn.png";
      return (
        <div
          className="truncate flex items-center gap-space-1"
          title={leader.displayName}
        >
          <Avatar className="h-size-16 w-size-16">
            <AvatarImage src={src}></AvatarImage>
          </Avatar>
          <div className="truncate">{leader?.displayName}</div>
        </div>
      );
    },
    size: 100,
  }),
  columnHelper.accessor("hackKey", {
    header: () => (
      <div className="table__header flex items-center">
        <span>Hack Key</span>
      </div>
    ),
    cell: (info) => {
      const hackKey = info.getValue();

      return <span title={hackKey}>{hackKey}</span>;
    },
    size: 50,
  }),
  columnHelper.accessor("recruitmentStatus", {
    header: () => <div className="table__header">Recruitment Status</div>,
    cell: (info) => {
      const status = info.getValue();
      const classNames = `${RECRUITMENT_STATUS_PROPERTIES[status]?.bgColor} ${RECRUITMENT_STATUS_PROPERTIES[status]?.fontColor} uppercase typography--font-heading-xxsmall`;
      return (
        <Badge className={classNames}>
          {RECRUITMENT_STATUS_PROPERTIES[status]?.text}
        </Badge>
      );
    },
    size: 50,
  }),
  columnHelper.accessor("teamMembers", {
    header: () => <div className="table__header">Team Members</div>,
    cell: (info) => {
      const teamMembersFormatted = info.getValue()?.join(", ");

      return <span title={teamMembersFormatted}>{teamMembersFormatted}</span>;
    },
    size: 200,
  }),
  columnHelper.accessor("technologies", {
    header: () => <div className="table__header">Needed Skills</div>,
    enableGrouping: true,
    getGroupingValue: (row) => {
      console.log("joined techno", row.technologies.join());

      return row.technologies.join();
    },
    cell: (info) => {
      const technologies = info.getValue().map((technology) => (
        <Badge key={technology} variant="basic">
          {technology}
        </Badge>
      ));
      const technologiesFormatted = info.getValue().join(", ");

      return <span title={technologiesFormatted}>{technologies}</span>;
    },
    size: 200,
  }),
  columnHelper.accessor("applicationStatus", {
    header: () => <div className="table__header">Application Status</div>,
    cell: (info) => {
      const status = info.getValue();
      const classNames = `${APPLICATION_STATUS_PROPERTIES[status].bgColor} ${APPLICATION_STATUS_PROPERTIES[status].fontColor} uppercase typography--font-heading-xxsmall`;
      return (
        <Badge className={classNames}>
          {APPLICATION_STATUS_PROPERTIES[status].text}
        </Badge>
      );
    },
    size: 50,
  }),
];
