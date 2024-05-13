import data from "../mockData.json";
import { Project, columns } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<Project[]> {
  return data;
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <div className="mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
