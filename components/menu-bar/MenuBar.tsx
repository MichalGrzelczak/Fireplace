import Image from "next/image";

import Logo from "@/components/logo/Logo";

export default function MenuBar() {
  return (
    //  TODO take user data from the server
    <div className="flex justify-between py-3 px-4 items-center">
      <Logo width={128} height={30} />
      <div className="flex items-center">
        <span className="mr-3">
          <Image alt="logo" src="/bell-icon.svg" width="16" height="16" />
        </span>
        <span className="mr-1">
          <Image alt="logo" src="/user-icon.svg" width="16" height="16" />
        </span>
        <span className="text-sm">Andrzej</span>
      </div>
    </div>
  );
}
