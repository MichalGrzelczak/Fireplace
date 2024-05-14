import Image from "next/image";

import Logo from "@/components/ui/logo";

export default function MenuBar({
  userName,
  userIcon,
}: {
  userName: string;
  userIcon: string;
}) {
  return (
    <div className="flex justify-between py-3 px-4 items-center">
      <Logo width={128} height={30} />
      <div className="flex items-center">
        <span className="mr-3">
          <Image src="/bell-icon.svg" alt="bell" width="24" height="16" />
        </span>
        <span className="mr-1">
          <Image alt="logo" src={userIcon} width="16" height="16" />
        </span>
        <span className="text-sm">{userName}</span>
      </div>
    </div>
  );
}
