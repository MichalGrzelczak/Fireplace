import { columns } from "@/app/app/projects/columns";
import { ProjectTable } from "@/app/app/projects/project-table";
import { Skeleton } from "@/components/ui/skeleton";

export default async function ProjectLoading() {
  return (
    <div className="w-full h-full">
      <div className="mb-space-4 flex items-center justify-start gap-[16px]">
        <Skeleton className="h-size-32 w-[720px] rounded"></Skeleton>

        <Skeleton className="h-size-32 w-[272px]  rounded"></Skeleton>

        <Skeleton className="h-size-32 w-[61px] rounded"></Skeleton>
      </div>
      <ProjectTable projects={[]} columns={columns} loading={true} />
    </div>
  );
}
