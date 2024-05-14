import Link from "next/link";

import { auth } from "@/app/api/auth/(config)/auth";

export default async function Home() {
  return (
    <div className="h-screen w-screen grid grid-cols-2 overflow-hidden">
      <ul>
        <li>
          <Link href="/login">Logowanie</Link>
        </li>
        <li>
          <Link href="/find-team">Find-team</Link>
        </li>
      </ul>
    </div>
  );
}
