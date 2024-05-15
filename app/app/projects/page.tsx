import Filters from "@/components/filters/filters";
import { SearchBar } from "@/components/searchBar";

import { Project, columns } from "./columns";
import { DataTable } from "./data-table";
import data from "./mockData.json";

async function getData(): Promise<Project[]> {
  return data;
}

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
