import Image from "next/image";
import { FaTimes } from "react-icons/fa";

import { JiraUser } from "@/app/app/projects/jira-projects-api-types";
import { ProjectDetailsJoinTeamRequestDialog } from "@/app/app/projects/project-details-join-team-request-dialog";
import { ProjectUser } from "@/app/app/projects/types";
import { Tag } from "@/components/ui/tag";

import { ProjectDetailsTeamLeaderDialog } from "./project-details-team-leader-dialog";

export type ProjectDetailsProps = {
  id: string;
  projectName: string;
  hackKey: string;
  projectMembers: JiraUser[];
  technologyStack: string[];
  teamMembers: string[];
  typeOfProject: string;
  rolesNeeded: string[];
  description: string;
  isUserLeader: boolean;
  allUsers: ProjectUser[];
  isCurrentUserProjectLeader: boolean;
  onCloseDetails: () => void;
  leader: ProjectUser;
};

export default function ProjectDetails(props: ProjectDetailsProps) {
  return (
    <div className="px-space-3 ml-space-3 pt-space-2">
      <div className="flex items-center justify-between py-space-2 overflow-y-auto">
        <h2 className="typography--font-heading-large">Project details</h2>

        <div className="flex typography--font-heading-large cursor-pointer items-center">
          {props.isUserLeader && (
            <ProjectDetailsTeamLeaderDialog
              projectId={props.id}
              hackKey={props.hackKey}
              projectName={props.projectName}
              leader={props.leader}
              teamMembers={props.teamMembers}
              allUsers={props.allUsers}
              projectMembers={props.projectMembers}
            />
          )}

          {/*{!props.isUserLeader && (*/}
          <ProjectDetailsJoinTeamRequestDialog {...props} />
          {/*)}*/}

          <FaTimes
            role={"button"}
            aria-label={"Close project details"}
            className="ml-space-3 text-fontSize-4"
            onClick={props.onCloseDetails}
          />
        </div>
      </div>

      <div className="flex">
        <div className="w-[180px] h-[180px] bg-primary-foreground flex items-center justify-center shrink-0">
          <Image
            alt="Project logo"
            src="/project-icon.svg"
            width="48"
            height="48"
          />
        </div>

        <div className="ml-space-4">
          <section>
            <span className="font-fontWeight-bold">NAME</span>
            <p>{props.projectName}</p>
          </section>

          <section className="mt-space-4">
            <span className="font-fontWeight-bold">TEAM MEMBERS</span>
            <p>
              {props.teamMembers.map((member: string, index: number) => (
                <Tag key={index} className="mr-space-2">
                  {member}
                </Tag>
              ))}
            </p>
          </section>
        </div>
      </div>

      <section className="mt-space-4">
        <span className="font-fontWeight-bold">TECHNOLOGY STACK</span>
        <div className="mt-space-2">
          {!props.technologyStack.length ? (
            <span className="italic">Technology stack not defined yet</span>
          ) : (
            props.technologyStack.map((technology: string, index: number) => (
              <Tag key={index} className="mr-space-2">
                {technology}
              </Tag>
            ))
          )}
        </div>
      </section>

      <section className="mt-space-3 flex">
        {/*<div className="w-1/4 pr-space-2">*/}
        {/*  <span className="font-fontWeight-bold">TYPE OF PROJECT</span>*/}
        {/*  <div className="mt-space-2">*/}
        {/*    <Tag className="mr-space-2">{props.typeOfProject}</Tag>*/}
        {/*  </div>*/}
        {/*</div>*/}

        <div className="w-full">
          <span className="font-fontWeight-bold">ROLES NEEDED</span>
          <div className="mt-space-2">
            {props.rolesNeeded.map((role: string, index: number) => (
              <Tag key={index} className="mr-space-2">
                {role}
              </Tag>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-space-4">
        <span className="font-fontWeight-bold">DESCRIPTION</span>
        <p className="mt-space-2">{props.description}</p>
      </section>
    </div>
  );
}
