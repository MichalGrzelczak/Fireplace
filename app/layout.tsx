import {
  faBook,
  faDoorOpen,
  faTrophy,
} from "@fortawesome/free-solid-svg-icons";
import type { Metadata } from "next";

import { Theme } from "@/app/theme";
import MainTabs from "@/components/MainTabs";

import "./globals.css";

export const metadata: Metadata = {
  title: "Fireplace",
  description: "Find team for Appfire Ignite",
};

const navLinks = [
  {
    title: "Projects",
    href: "/projects",
    icon: faDoorOpen,
  },
  {
    title: "Statistics",
    href: "/statistics",
    icon: faTrophy,
  },
  { title: "Knowledge base", href: "/knowledge", icon: faBook },
];

const user = true;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-color-mode="light">
      <body>
        <Theme>
          {user ? (
            <MainTabs links={navLinks}>{children}</MainTabs>
          ) : (
            <>{children}</>
          )}
        </Theme>
      </body>
    </html>
  );
}
