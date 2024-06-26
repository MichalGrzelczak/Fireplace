import { Suspense } from "react";

import { auth } from "@/app/api/auth/(config)/auth";
import { fetchProjects } from "@/app/app/projects/jira-projects-api";
import { HackProject } from "@/app/app/projects/jira-projects-api-types";
import { mapHackProjectToProject } from "@/app/app/projects/map-jira-fields.helper";
import { PageContent } from "@/app/app/projects/page-content";
import Filters from "@/components/filters/filters";
import { SearchBar } from "@/components/searchBar";

import { Project, columns } from "./columns";

export default async function DemoPage({
  searchParams,
}: {
  searchParams?: { query?: string; technologies?: string; status?: string };
}) {
  const session = await auth();
  const user = session?.user;

  const hackProjects: HackProject[] = await fetchProjects();
  const projects: Project[] = hackProjects.map((hackProject) =>
    mapHackProjectToProject(hackProject, user?.email ?? ""),
  );

  const selectedTechnologies: Array<string> = safeParse(
    searchParams?.technologies || "",
  );
  const selectedStatus: Array<string> = safeParse(searchParams?.status || "");

  const technologies: string[] = [
    ...new Set(projects.map((tech) => tech.technologies).flat()),
  ];

  const filteredProjects = projects.filter(
    (p) =>
      (!searchParams?.query?.length ||
        p.projectName
          .toLowerCase()
          .trim()
          .includes(searchParams?.query?.toLowerCase().trim() ?? "")) &&
      (!selectedTechnologies ||
        p.technologies.some((technology) =>
          selectedTechnologies?.includes(technology),
        )) &&
      (!selectedStatus?.length ||
        selectedStatus.includes(p.recruitmentStatus.toString())),
  );

  return (
    <>
      <div className="mb-space-4 flex items-center justify-start">
        <SearchBar />
        <Suspense>
          <Filters technologies={technologies} />
        </Suspense>
      </div>

      <PageContent columns={columns} projects={filteredProjects} user={user} />
    </>
  );
}

function safeParse(valueToParse: string) {
  try {
    return JSON.parse(valueToParse);
  } catch {
    return null;
  }
}
