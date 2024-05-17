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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tag } from "@/components/ui/tag";
import { Textarea } from "@/components/ui/textarea";

export type ProjectDetailsProps = {
  id: string;
  projectName: string;
  technologyStack: string[];
  teamMembers: string[];
  typeOfProject: string;
  rolesNeeded: string[];
  description: string;
  onCloseDetails: () => void;
};

export default function ProjectDetails(props: ProjectDetailsProps) {
  return (
    <div className="px-space-3 ml-space-3 pt-space-2">
      <div className="flex items-center justify-between py-space-2 overflow-y-auto">
        <h2 className="typography--font-heading-large">Project details</h2>

        <div className="flex typography--font-heading-large cursor-pointer items-center">
          <Dialog>
            <DialogTrigger asChild>
              <Button size="default" variant="default">
                Send a request
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Send a request to join the team</DialogTitle>
              </DialogHeader>

              <Textarea placeholder="Enter message..." className="mt-space-2" />
              <div className="mt-space-2">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    {props.rolesNeeded.map((role, index) => (
                      <SelectItem key={index} value={role}>
                        {role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <DialogFooter className="sm:justify-end">
                <DialogClose asChild>
                  <Button type="button" size="default" variant="secondary">
                    Cancel
                  </Button>
                </DialogClose>

                <Button type="submit" size="default" className="px-space-2">
                  Send
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

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
