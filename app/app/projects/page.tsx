import { fetchJiraIssues } from "@/app/app/projects/jiraApi";
import { PageContent } from "@/app/app/projects/page-content";
import Filters from "@/components/filters/filters";
import { SearchBar } from "@/components/searchBar";

// import { db } from "@/db";
// import { users } from "@/db/schema";
import { Project, columns } from "./columns";
import data from "./mockData.json";

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
        selectedStatus.includes(p.applicationStatus.toString()),
    );

  return (
    <>
      <div className="mb-space-4 flex items-center justify-start">
        <SearchBar />
        <Filters />
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
