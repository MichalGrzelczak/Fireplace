"use client";

import { MouseEvent, useMemo, useState } from "react";

import { Project } from "@/app/app/projects/columns";
import ProjectDetails from "@/app/app/projects/project-details";
import { ProjectTable } from "@/app/app/projects/project-table";
import { SessionUser } from "@/app/types/types";
import { Drawer, DrawerContent } from "@/components/ui/drawer";

interface PageContentProps {
  columns: any;
  projects: Project[];
  user: SessionUser;
}
// @ts-ignore
export function PageContent({ columns, projects, user }: PageContentProps) {
  const [selectedProject, setSelectedProjects] = useState<
    Project | undefined
  >();

  const allUsers = useMemo(() => {
    const allLeaders = projects.map((project) => project.leader);
    const uniqueLeaders = [
      ...new Map(
        allLeaders.map((item) => [item["displayName"], item]),
      ).values(),
    ];

    return uniqueLeaders;
  }, [projects]);
  const handleRowClick = (
    e: MouseEvent<HTMLTableRowElement, globalThis.MouseEvent>,
    project: Project | undefined,
  ) => {
    const target = e.target as HTMLElement;
    const closestTD = target.closest("td");
    if (closestTD === closestTD?.parentElement?.firstChild) {
      return;
    }
    setSelectedProjects(project);
  };

  return (
    <div className="h-[calc(100%-20px)]">
      <ProjectTable
        columns={columns}
        project={projects}
        onRowClick={handleRowClick}
      />

      {selectedProject && (
        <Drawer direction={"right"} open={!!selectedProject}>
          <DrawerContent>
            <ProjectDetails
              id={selectedProject.uuid}
              projectName={selectedProject.projectName}
              technologyStack={selectedProject.technologies}
              teamMembers={selectedProject.teamMembers}
              typeOfProject={projects.typeOfProject}
              rolesNeeded={["FRONTEND", "BACKEND", "QA"]}
              description={selectedProject.description}
              onCloseDetails={() => setSelectedProjects(undefined)}
              isUserLeader={selectedProject.leader.email === user?.email}
              allUsers={allUsers}
              leader={selectedProject.leader}
            />
          </DrawerContent>
        </Drawer>
      )}
    </div>
  );
}
