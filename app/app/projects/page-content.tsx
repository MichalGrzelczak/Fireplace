"use client";

import { useState } from "react";

import { Project } from "@/app/app/projects/columns";
import ProjectDetails from "@/app/app/projects/project-details";
import { ProjectTable } from "@/app/app/projects/project-table";

// @ts-ignore
export function PageContent({ columns, projects }) {
  const [selectedProject, setSelectedProjects] = useState<
    Project | undefined
  >();

  return (
    <div className="flex h-full">
      <div className={`${!!selectedProject ? "w-3/5" : "w-full"}`}>
        <ProjectTable
          columns={columns}
          project={projects}
          onRowClick={(project) => setSelectedProjects(project)}
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
