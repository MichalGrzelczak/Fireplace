import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen w-screen grid grid-cols-2 overflow-hidden">
      <Link href="/login">Logowanie</Link>
    </div>
  );
}
