import { redirect } from "next/navigation";

import { auth } from "@/app/api/auth/(config)/auth";
import { ButtonLoginWithGoogle } from "@/components/buttonLoginWithGoogle";
import Logo from "@/components/ui/logo";

console.log("Hello from the client side!");

export default async function Home() {
  const session = await auth();

  if (session) {
    redirect("/app/projects");
  }

  return (
    <section
      className={
        "h-screen w-screen grid gap-space-3 place-items-center bg-no-repeat bg-cover space-y-space-4"
      }
      style={{ backgroundImage: "url('./bg-login.svg')" }}
    >
      <div
        className={"space-y-space-4 justify-center flex flex-col items-center"}
      >
        <Logo width={332} height={78} />
        <h1
          className={"text-fontSize-10 block font-fontWeight-light !mb-space-6"}
        >
          Are you looking for an Ignite project?
        </h1>
        <ButtonLoginWithGoogle />
      </div>
    </section>
  );
}
