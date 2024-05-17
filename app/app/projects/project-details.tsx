import Image from "next/image";
import { FaTimes } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tag } from "@/components/ui/tag";

import {
  DialogContentLeader,
  DialogContentMember,
} from "./project-details-dialog-content";
import { ProjectUser } from "./types";

// const requestMemberMock: ProjectUser[] = [
//   {
//     email: "1",
//     displayName: "Jacek Jacek",
//     jiraUser: null,
//     iconUrl: "",
//   },
//   {
//     email: "2",
//     displayName: "Jaro Kaczo",
//     iconUrl: "",
//   },
//   {
//     email: "3",
//     displayName: "Donek Ma Domek",
//     iconUrl: "",
//   },
// ];

export type ProjectDetailsProps = {
  id: string;
  projectName: string;
  technologyStack: string[];
  teamMembers: string[];
  typeOfProject: string;
  rolesNeeded: string[];
  description: string;
  isUserLeader: boolean;
  allUsers: ProjectUser[];
  onCloseDetails: () => void;
  leader: ProjectUser;
};

export default function ProjectDetails({
  isUserLeader,
  rolesNeeded,
  onCloseDetails,
  projectName,
  teamMembers,
  description,
  technologyStack,
  allUsers,
  leader,
  typeOfProject,
}: ProjectDetailsProps) {
  const dialogButtonLabel = isUserLeader ? "Manage members" : "Send a request";
  const dialogTitle = isUserLeader
    ? "Manage team members"
    : "Send a request to join the team";
  const dialogButtonFooterLabel = isUserLeader ? "Save" : "Send";

  return (
    <div className="px-space-3 ml-space-3 pt-space-2">
      <div className="flex items-center justify-between py-space-2 overflow-y-auto">
        <h2 className="typography--font-heading-large">Project details</h2>

        <div className="flex typography--font-heading-large cursor-pointer items-center">
          <Dialog>
            <DialogTrigger asChild>
              <Button size="default" variant="default">
                {dialogButtonLabel}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{dialogTitle}</DialogTitle>
              </DialogHeader>
              {isUserLeader ? (
                <DialogContentLeader
                  currentTeamMembers={teamMembers}
                  userRequests={undefined}
                  allUsers={allUsers}
                  leader={leader}
                />
              ) : (
                <DialogContentMember rolesNeeded={rolesNeeded} />
              )}
              <DialogFooter className="sm:justify-end">
                <DialogClose asChild>
                  <Button type="button" size="default" variant="secondary">
                    Cancel
                  </Button>
                </DialogClose>

                <Button type="submit" size="default" className="px-space-2">
                  {dialogButtonFooterLabel}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <FaTimes
            role={"button"}
            aria-label={"Close project details"}
            className="ml-space-3 text-fontSize-4"
            onClick={onCloseDetails}
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
            <p>{projectName}</p>
          </section>

          <section className="mt-space-4">
            <span className="font-fontWeight-bold">TEAM MEMBERS</span>
            <p>
              {teamMembers.map((member: string, index: number) => (
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
          {!technologyStack.length ? (
            <span className="italic">Technology stack not defined yet</span>
          ) : (
            technologyStack.map((technology: string, index: number) => (
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
        {/*    <Tag className="mr-space-2">{typeOfProject}</Tag>*/}
        {/*  </div>*/}
        {/*</div>*/}

        <div className="w-full">
          <span className="font-fontWeight-bold">ROLES NEEDED</span>
          <div className="mt-space-2">
            {rolesNeeded.map((role: string, index: number) => (
              <Tag key={index} className="mr-space-2">
                {role}
              </Tag>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-space-4">
        <span className="font-fontWeight-bold">DESCRIPTION</span>
        <p className="mt-space-2">{description}</p>
      </section>
    </div>
  );
}
