"use client";

import Link from "next/link";
import { usePathname, useSelectedLayoutSegment } from "next/navigation";

import { cn } from "@/lib/utils";

const NavLink = ({
  children,
  href,
  title,
  activeClassName,
  className,
}: {
  children: React.ReactNode;
  href: string;
  activeClassName: string;
  className?: string;
  title?: string;
}) => {
  const segment = useSelectedLayoutSegment();

  return (
    <Link
      href={href}
      title={title}
      className={cn(
        className,
        "/app/" + segment === href ? activeClassName : "",
      )}
    >
      {children}
    </Link>
  );
};

export default NavLink;
