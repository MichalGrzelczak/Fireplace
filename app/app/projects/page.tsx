import { fetchProjects } from "@/app/app/projects/jira-api";
import { mapHackProjectToProject } from "@/app/app/projects/map-jira-fields.helper";
import { PageContent } from "@/app/app/projects/page-content";
import Filters from "@/components/filters/filters";
import { SearchBar } from "@/components/searchBar";

import { Project, columns } from "./columns";

// export async function test() {

// export async function test() {
//   let usersResult = db.select().from(users).get();
//   console.log(usersResult);
//   if (!usersResult) {
//     db.insert(users)
//       .values({
//         id: "test",
//         firstName: "test",
//         lastName: "test",
//         email: "test",
//       })
//       .run();
//   }
// }

export default async function DemoPage({
  searchParams,
}: {
  searchParams?: { query?: string; technologies?: string; status?: string };
}) {
  const projects: Project[] = await fetchProjects().then((hackProjects) =>
    hackProjects.map((hackProject) => mapHackProjectToProject(hackProject)),
  );
  const selectedTechnologies: Array<string> = safeParse(
    searchParams?.technologies || "",
  );
  const selectedStatus: Array<string> = safeParse(searchParams?.status || "");

  const technolgies: string[] = [
    ...new Set(projects.map((tech) => tech.technologies).flat()),
  ];

  const filteredProjects = projects
    .filter(
      (p) =>
        !searchParams?.query?.length ||
        p.projectName
          .toLowerCase()
          .trim()
          .includes(searchParams?.query?.toLowerCase().trim() ?? ""),
    )
    .filter(
      (p) =>
        !selectedTechnologies ||
        p.technologies.some((technology) =>
          selectedTechnologies?.includes(technology),
        ),
    )
    .filter(
      (p) =>
        !selectedStatus?.length ||
        selectedStatus.includes(p.recruitmentStatus.toString()),
    );

  return (
    <>
      <div className="mb-space-4 flex items-center justify-start">
        <SearchBar />
        <Filters technologies={technolgies} />
      </div>
      <PageContent columns={columns} projects={filteredProjects} />
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
