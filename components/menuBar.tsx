"use client";

import { DefaultSession } from "next-auth";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { FC } from "react";
import { FaBell } from "react-icons/fa";

import Logo from "@/components/ui/logo";

type MenuBarProps = {
  session: DefaultSession | undefined | null;
};

export const MenuBar: FC<MenuBarProps> = ({ session }) => {
  const onLogoutClick = () => {
    signOut();
  };

  return (
    <div className="flex justify-between py-3 px-4 items-center">
      <Logo width={128} height={30} />
      <div className="flex gap-4 items-center">
        <FaBell width={16} />
        <div className={"w-px h-6 bg-border"}></div>
        <div className={"flex gap-1"}>
          <Image
            alt="logo"
            src={session?.user?.image ?? ""}
            width="16"
            height="16"
            className={"rounded-full shrink-0"}
          />
          <span onClick={onLogoutClick} className="text-sm cursor-pointer">
            {session?.user?.name ?? ""}
          </span>
        </div>
      </div>
    </div>
  );
};
