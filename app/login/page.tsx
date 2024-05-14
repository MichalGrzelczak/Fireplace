import Image from "next/image";

import { Button } from "@/components/ui/button";
import Logo from "@/components/ui/logo";

export default function Login() {
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
        <Button size={"lg"} className={"w-full gap-4"} variant="outline">
          <Image src={"./google.svg"} alt={"Google"} width={32} height={32} />
          Login with Google
        </Button>
      </div>
    </section>
  );
}
