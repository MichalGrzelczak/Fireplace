import type { Metadata } from "next";
import { Suspense } from "react";

import MenuBar from "@/components/ui/menuBar";
import { SearchBar } from "@/components/ui/searchBar";

import Filters from "./Filters";

export const metadata: Metadata = {
  title: "Fireplace",
  description: "Find team for Appfire Ignite",
};

export default function FindTeamLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="px-6 pb-6 bg-neutral-50">
      <MenuBar userName="Andrzej" userIcon="/user-icon.svg" />
      <div className="flex">
        <Suspense>
          <SearchBar />
        </Suspense>
        <Filters />
      </div>
      Content
    </div>
  );
}
