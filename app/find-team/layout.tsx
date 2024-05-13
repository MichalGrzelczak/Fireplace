import type { Metadata } from "next";

import MenuBar from "@/app/components/menu-bar/MenuBar";

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
      Content
    </div>
  );
}
