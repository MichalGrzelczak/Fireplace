import Image from "next/image";
import Link from "next/link";

import Logo from "@/app/components/logo/Logo";

export default function Home() {
  return (
    <div className="h-screen w-screen grid grid-cols-2 overflow-hidden">
      <div>
        <Image
          alt=""
          src="/left-curve.svg"
          width={100}
          height={100}
          layout="responsive"
          objectFit="contain"
        />
      </div>

      <div className="flex items-center justify-center flex-col">
        <Logo width={333} height={78} />
        <h3>Links</h3>
        <ul>
          <li>
            <Link href="/find-team">Find team</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
