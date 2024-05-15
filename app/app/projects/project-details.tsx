import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Tag } from "@/components/ui/tag";

export type ProjectDetailsProps = {
  id: string;
  projectName: string;
  technologyStack: string[];
  teamName: string;
  teamMembers: string[];
  product: string;
  rolesNeeded: string[];
  description: string;
};

export default function ProjectDetails(props: ProjectDetailsProps) {
  return (
    //   TODO change span title to h3??
    <div className="p-4">
      <div className="flex items-center justify-between py-2 overflow-y-auto">
        <h2>Project details</h2>
        <Button size={"default"} variant="default">
          Send a request
        </Button>
      </div>

      <div className="flex">
        <div className="w-[180px] h-[180px] bg-scale-blue-000 flex items-center justify-center shrink-0">
          <Image
            alt="Project logo"
            src="/project-icon.svg"
            width="48"
            height="48"
          />
        </div>

        <div className="ml-6">
          <section>
            <span className="font-bold">NAME</span>
            <p>{props.projectName}</p>
          </section>

          <section className="mt-6">
            <span className="font-bold">TEAM MEMBERS</span>
            <p>
              {props.teamMembers.map((member: string, index: number) => (
                <Tag key={index} className="mr-2">
                  {member}
                </Tag>
              ))}
            </p>
          </section>
        </div>
      </div>

      <section className="mt-6">
        <span className="font-bold">TECHNOLOGY STACK</span>
        <div className="mt-2">
          {props.technologyStack.map((technology: string, index: number) => (
            <Tag key={index} className="mr-2">
              {technology}
            </Tag>
          ))}
        </div>
      </section>

      <section className="mt-4 flex">
        <div className="w-1/4 pr-3">
          <span className="font-bold">PRODUCT</span>
          <div className="mt-2">
            <Tag className="mr-2">BigPicture</Tag>
          </div>
        </div>

        <div className="w-3/4">
          <span className="font-bold">ROLES NEEDED</span>
          <div className="mt-2">
            {props.rolesNeeded.map((role: string, index: number) => (
              <Tag key={index} className="mr-2">
                {role}
              </Tag>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-6">
        <span className="font-bold">DESCRIPTION</span>
        <p className="mt-2">{props.description}</p>
      </section>
    </div>
  );
}