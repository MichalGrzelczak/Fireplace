import {
  faBook,
  faDoorOpen,
  faTrophy,
} from "@fortawesome/free-solid-svg-icons";

import { auth } from "@/app/api/auth/(config)/auth";
import MainTabs from "@/components/MainTabs";
import { MenuBar } from "@/components/menuBar";

const navLinks = [
  {
    title: "Projects",
    href: "/app/projects",
    icon: faDoorOpen,
  },
  {
    title: "Statistics",
    href: "/app/statistics",
    icon: faTrophy,
  },
  { title: "Knowledge base", href: "/app/knowledge", icon: faBook },
];

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <main
      className={
        "h-screen flex flex-col pb-10 px-10 bg-background overflow-hidden"
      }
    >
      <MenuBar session={session} />
      <MainTabs links={navLinks}>{children}</MainTabs>
    </main>
  );
}
