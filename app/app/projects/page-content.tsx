"use client";

import { MouseEvent, useState } from "react";

import { Project } from "@/app/app/projects/columns";
import ProjectDetails from "@/app/app/projects/project-details";
import { ProjectTable } from "@/app/app/projects/project-table";

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
      <div className={`${!!selectedProject ? "w-3/5" : "w-full"}`}>
        <ProjectTable
          columns={columns}
          project={projects}
          onRowClick={handleRowClick}
        />
      </div>

      {selectedProject && (
        <div className="w-2/5 shrink-0">
          <ProjectDetails
            id={selectedProject.uuid}
            projectName={selectedProject.projectName}
            technologyStack={selectedProject.technologies}
            teamMembers={selectedProject.teamMembers}
            product="Unknown"
            rolesNeeded={["FRONTEND", "BACKEND", "QA"]}
            description="Test"
            onCloseDetails={() => setSelectedProjects(undefined)}
          />
        </div>
      )}
    </div>
  );
}
