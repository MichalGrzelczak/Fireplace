"use client";

import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import Link from "next/link";

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
            <FontAwesomeIcon
              className={"text-scale-yellow-200"}
              icon={faStar}
            />
          ) : (
            <FontAwesomeIcon
              className={"text-scale-neutral-400"}
              icon={faStar}
            />
          )}
        </div>
      );
    },
    size: 5,
  }),
  columnHelper.accessor("projectName", {
    header: () => <div className="table__header">Project Name</div>,
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
  columnHelper.accessor("leader", {
    header: () => <div className="table__header">Leader</div>,
    cell: (info) => {
      const leader = info.getValue();
      return (
        <div className="truncate flex items-center gap-1">
          <Avatar className="h-4 w-4">
            <AvatarImage src="https://github.com/shadcn.png"></AvatarImage>
          </Avatar>
          <div className="truncate">{leader.displayName}</div>
        </div>
      );
    },
    size: 150,
  }),
  columnHelper.accessor("hackKey", {
    header: () => <div className="table__header">Hack Key</div>,
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
