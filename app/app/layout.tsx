import { IconType } from "react-icons";
import { FaBook, FaDoorOpen, FaTrophy } from "react-icons/fa";

import { auth } from "@/app/api/auth/(config)/auth";
import MainTabs from "@/components/MainTabs";
import { MenuBar } from "@/components/menuBar";

const navLinks = [
  {
    title: "Projects",
    href: "/app/projects",
    icon: <FaDoorOpen />,
  },
  {
    title: "Statistics",
    href: "/app/statistics",
    icon: <FaTrophy />,
  },
  { title: "Knowledge base", href: "/app/knowledge", icon: <FaBook /> },
];

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <main
      className={"h-screen flex flex-col pb-space-4 px-space-4 overflow-hidden"}
    >
      <MenuBar session={session} />
      <MainTabs links={navLinks}>{children}</MainTabs>
    </main>
  );
}
