"use client";

import { MouseEvent, useState } from "react";

import { Project } from "@/app/app/projects/columns";
import ProjectDetails from "@/app/app/projects/project-details";
import { ProjectTable } from "@/app/app/projects/project-table";
import { Drawer, DrawerContent } from "@/components/ui/drawer";

// @ts-ignore
export function PageContent({ columns, projects }) {
  const [selectedProject, setSelectedProjects] = useState<
    Project | undefined
  >();

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
    <div className="flex h-[calc(100%-20px)]">
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
            />
          </DrawerContent>
        </Drawer>
      )}
    </div>
  );
}
