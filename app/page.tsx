import { redirect } from "next/navigation";

import { auth } from "@/app/api/auth/(config)/auth";
import { ButtonLoginWithGoogle } from "@/components/buttonLoginWithGoogle";
import Logo from "@/components/ui/logo";

export default async function Home() {
  const session = await auth();

  if (session) {
    redirect("/app/projects");
  }

  return (
    <section
      className={
        "h-screen w-screen grid gap-4 place-items-center bg-no-repeat bg-cover space-y-8"
      }
      style={{ backgroundImage: "url('./bg-login.svg')" }}
    >
      <div className={"space-y-8 justify-center flex flex-col items-center"}>
        <Logo width={332} height={78} />
        <h1 className={"text-4xl block font-light !mb-12"}>
          Are you looking for an Ignite project?
        </h1>
        <ButtonLoginWithGoogle />
      </div>
    </section>
  );
}
