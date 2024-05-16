"use client";

import { faStar as faStarFilled } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createColumnHelper } from "@tanstack/react-table";
import Link from "next/link";

import { SortButton } from "@/components/SortButton";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

import {
  APPLICATION_STATUS_PROPERTIES,
  RECRUITMENT_STATUS_PROPERTIES,
} from "./consts";
import { ApplicationStatus, RecruitmentStatus } from "./types";

export type Project = {
  uuid: string;
  projectName: string;
  leaderName: string;
  isFav: boolean;
  teamMembers: string[];
  technologies: string[];
  teamName: string;
  recruitmentStatus: RecruitmentStatus;
  applicationStatus: ApplicationStatus;
};

const columnHelper = createColumnHelper<Project>();

const toggleFav = (id: string) => {
  console.log(id);
};

export const columns = [
  columnHelper.accessor("isFav", {
    header: () => <div className="table__header">Fav</div>,
    cell: (info) => {
      const isFav = info.getValue();
      const id = info.row.id;
      return (
        <div onClick={() => toggleFav(id)}>
          {isFav ? (
            <FontAwesomeIcon icon={faStarFilled} />
          ) : (
            <FontAwesomeIcon
              className={"text-scale-neutral-400"}
              icon={faStarFilled}
            />
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
        <div className="flex items-center gap-1">
          <span className="table__header">Project Name</span>
          <SortButton onClick={onClick} isSortedAsc={isSortedAsc} />
        </div>
      );
    },
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
    header: ({ column }) => {
      const isSortedAsc = column.getIsSorted() === "asc";
      const onClick = () => column.toggleSorting(isSortedAsc);
      return (
        <div className="flex items-center gap-1">
          <span className="table__header">Leader</span>
          <SortButton onClick={onClick} isSortedAsc={isSortedAsc} />
        </div>
      );
    },
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
  columnHelper.accessor("teamName", {
    header: ({ column }) => {
      const isSortedAsc = column.getIsSorted() === "asc";
      const onClick = () => column.toggleSorting(isSortedAsc);
      return (
        <div className="flex items-center gap-1">
          <span className="table__header">Team Name</span>
          <SortButton onClick={onClick} isSortedAsc={isSortedAsc} />
        </div>
      );
    },
    size: 100,
  }),
  columnHelper.accessor("recruitmentStatus", {
    header: () => <div className="table__header">Recruitment Status</div>,
    cell: (info) => {
      const status = info.getValue();
      const classNames = `${RECRUITMENT_STATUS_PROPERTIES[status].bgColor} ${RECRUITMENT_STATUS_PROPERTIES[status].fontColor} uppercase typography--font-heading-xxsmall`;
      return (
        <Badge className={classNames}>
          {RECRUITMENT_STATUS_PROPERTIES[status].text}
        </Badge>
      );
    },
    size: 150,
  }),
  columnHelper.accessor("teamMembers", {
    header: () => <div className="table__header">Team Members</div>,
    cell: (info) => {
      const teamMembersFormatted = info.getValue().join(", ");

      return <span>{teamMembersFormatted}</span>;
    },
    size: 200,
  }),
  columnHelper.accessor("technologies", {
    header: () => <div className="table__header">Needed Skills</div>,
    cell: (info) => {
      const technologies = info.getValue().map((technology) => (
        <Badge key={technology} variant="basic">
          {technology}
        </Badge>
      ));

      return <span>{technologies}</span>;
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
    size: 200,
  }),
];
