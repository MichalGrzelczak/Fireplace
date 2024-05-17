"use client";

import { DefaultSession } from "next-auth";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { FaBell, FaChevronDown } from "react-icons/fa";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Logo from "@/components/ui/logo";

type MenuBarProps = {
  session: DefaultSession | undefined | null;
};

export const MenuBar: FC<MenuBarProps> = ({ session }) => {
  const onLogoutClick = () => {
    signOut();
  };

  return (
    <header className="flex justify-between py-space-3 px-space-3 items-center">
      <Link title={"Projects"} href={"/app/projects"}>
        <Logo width={128} height={30} />
      </Link>
      <div className="flex gap-space-3 items-center">
        <FaBell width={16} />
        <div className={"w-px h-size-24 bg-border"}></div>
        <DropdownMenu>
          <DropdownMenuTrigger
            className={"flex gap-space-2 items-center"}
            aria-label={"Click, to open profile menu"}
          >
            <Image
              alt="logo"
              src={session?.user?.image ?? ""}
              width="16"
              height="16"
              className={"rounded-full w-size-16 h-size-16 shrink-0"}
            />
            {session?.user?.name ?? ""}
            <FaChevronDown />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel
              className={"cursor-pointer"}
              title={"Logout"}
              onClick={onLogoutClick}
            >
              Logout
            </DropdownMenuLabel>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
