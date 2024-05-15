import Filters from "@/components/filters/filters";
import { SearchBar } from "@/components/searchBar";

import { Project, columns } from "./columns";
import data from "./mockData.json";
import { ProjectTable } from "./project-table";

async function getData(): Promise<Project[]> {
  return data;
}

export default async function DemoPage() {
  const data = await getData();

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
