import type { Metadata } from "next";

import MenuBar from "@/app/components/menu-bar/MenuBar";
import { SearchBar } from "@/components/ui/searchBar";

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
      <MenuBar />
      <div className="max-w-[720px] w-full">
        <SearchBar />
      </div>
      Content
    </div>
  );
}
