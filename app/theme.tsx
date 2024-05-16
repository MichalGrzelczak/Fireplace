"use client";

import { SessionProvider } from "next-auth/react";

export const Theme = ({ children }: { children: React.ReactNode }) => {
  return <SessionProvider>{children}</SessionProvider>;
};
