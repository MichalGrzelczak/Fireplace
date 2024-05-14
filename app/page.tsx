import Link from "next/link";
import { redirect } from "next/navigation";

import { auth } from "@/app/api/auth/(config)/auth";

export default async function Home() {
  return (
    <div className="h-screen w-screen grid grid-cols-2 overflow-hidden">
      <ul>
        <li>
          <Link href="/login">Logowanie</Link>
          <Link href="/app/projects">App</Link>
        </li>
      </ul>
    </div>
  );
}
