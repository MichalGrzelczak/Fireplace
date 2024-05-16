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

export default async function DemoPage() {
  const data = await getData();
  const issues = await fetchJiraIssues();

  return (
    <>
      <div className="mb-5 flex items-center justify-start">
        <SearchBar />
        <Filters />
      </div>
      <ProjectTable columns={columns} data={data} />

      {/*TODO open on project click*/}
      {/*<ProjectDetails></ProjectDetails>*/}
    </>
  );
}
