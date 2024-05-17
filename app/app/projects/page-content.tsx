"use client";

import { User } from "next-auth";
import { useMemo, useState } from "react";

import { Project } from "@/app/app/projects/columns";
import ProjectDetails from "@/app/app/projects/project-details";
import { ProjectTable } from "@/app/app/projects/project-table";
import { SessionUser } from "@/app/types/types";

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
            isUserLeader={selectedProject.leader.email === user?.email}
            onCloseDetails={() => setSelectedProjects(undefined)}
            allUsers={allUsers}
            leader={selectedProject.leader}
          />
        </div>
      )}
    </div>
  );
}
