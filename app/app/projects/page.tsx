import Filters from "@/components/filters/filters";
import { SearchBar } from "@/components/searchBar";

// import { db } from "@/db";
// import { users } from "@/db/schema";
import { Project, columns } from "./columns";
import { DataTable } from "./data-table";
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
  searchParams?: { query?: string };
}) {
  const data = await getData();
  let filteredProjects = data;

  if (searchParams?.query) {
    filteredProjects = data.filter((project) => {
      return project.projectName
        .toLowerCase()
        .trim()
        .includes(searchParams?.query?.toLowerCase().trim() ?? "");
    });
  }

  console.log("query", searchParams);

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
