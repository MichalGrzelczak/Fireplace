import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";

import { auth } from "@/app/api/auth/(config)/auth";
import { MenuBar } from "@/components/ui/menuBar";
import { SearchBar } from "@/components/ui/searchBar";

export const metadata: Metadata = {
  title: "Fireplace",
  description: "Find team for Appfire Ignite",
};

export default async function FindTeamLayout<FC>({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }
  return (
    <div className="px-6 pb-6 bg-neutral-50">
      <MenuBar session={session} />
      <div className="max-w-[720px] w-full">
        <Suspense>
          <SearchBar />
        </Suspense>
      </div>
      {children}
    </div>
  );
}
