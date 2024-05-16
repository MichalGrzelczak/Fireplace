import { fetchProjects } from "@/app/app/projects/jira-api";
import { mapHackProjectToProject } from "@/app/app/projects/map-jira-fields.helper";
import Filters from "@/components/filters/filters";
import { SearchBar } from "@/components/searchBar";

import { Project, columns } from "./columns";
import { DataTable } from "./data-table";

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

  const filteredProjects = projects.filter(
    (p) =>
      !searchParams?.query?.length ||
      p.projectName
        .toLowerCase()
        .trim()
        .includes(searchParams?.query?.toLowerCase().trim() ?? ""),
  );
  // .filter(
  //   (p) =>
  //     !selectedTechnologies ||
  //     p.technologies.some((technology) =>
  //       selectedTechnologies?.includes(technology),
  //     ),
  // )
  // .filter(
  //   (p) =>
  //     !selectedStatus?.length ||
  //     selectedStatus.includes(p.applicationStatus.toString()),
  // );

  return (
    <>
      <div className="mb-5 flex items-center justify-start">
        <SearchBar />
        <Filters />
      </div>
      <DataTable columns={columns} data={filteredProjects} />
      {/*TODO open on project click*/}
      {/*<ProjectDetails></ProjectDetails>*/}
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
