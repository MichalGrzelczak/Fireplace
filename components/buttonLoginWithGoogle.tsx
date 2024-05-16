"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";

export const ButtonLoginWithGoogle = () => {
  const onLoginWithGoogleClick = async () => {
    const res = await signIn("google");

    if (res?.ok) {
      redirect("/");
    }
  };

  return (
    <Button
      size={"lg"}
      className={"w-full gap-space-4"}
      variant="outline"
      onClick={onLoginWithGoogleClick}
    >
      <Image src={"./google.svg"} alt={"Google"} width={32} height={32} />
      Login with Google
    </Button>
  );
};
