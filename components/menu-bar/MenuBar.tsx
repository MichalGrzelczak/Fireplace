import { DefaultSession } from "next-auth";
import Image from "next/image";
import { FC } from "react";

import Logo from "@/components/logo/Logo";

type MenuBarProps = {
  session: DefaultSession | undefined;
};

export const MenuBar: FC<MenuBarProps> = ({ session }) => {
  return (
    //  TODO take user data from the server
    <div className="flex justify-between py-3 px-4 items-center">
      <Logo width={128} height={30} />
      <div className="flex items-center">
        <span className="mr-3">
          <Image alt="logo" src="/bell-icon.svg" width="16" height="16" />
        </span>
        <span className="mr-1">
          <Image
            alt="logo"
            src={session?.user?.image ?? ""}
            width="16"
            height="16"
          />
        </span>
        <span className="text-sm">{session?.user?.name ?? ""}</span>
      </div>
    </div>
  );
};
