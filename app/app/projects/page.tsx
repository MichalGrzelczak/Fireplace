import { fetchJiraIssues } from "@/app/app/projects/jiraApi";
import Filters from "@/components/filters/filters";
import { SearchBar } from "@/components/searchBar";

// import { db } from "@/db";
// import { users } from "@/db/schema";
import { Project, columns } from "./columns";
import data from "./mockData.json";
import { ProjectTable } from "./project-table";

async function getData(): Promise<Project[]> {
  return data;
}

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
  const data = await getData();
  const issues = await fetchJiraIssues();
  const selectedTechnologies: Array<string> = safeParse(
    searchParams?.technologies || "",
  );
  const selectedStatus: Array<string> = safeParse(searchParams?.status || "");

  const filteredProjects = data
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
        selectedStatus.includes(p.applicationStatus.toString()),
    );

  return (
    <>
      <div className="mb-5 flex items-center justify-start">
        <SearchBar />
        <Filters />
      </div>
      <ProjectTable columns={columns} project={filteredProjects} />

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
