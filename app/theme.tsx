"use client";

import { useLayoutEffect } from "react";

import AtlassianLight from "@/theme/Atlasian/AtlassianLight";
import { Fuego } from "@/theme/fuego";

export const Theme = ({ children }: { children: React.ReactNode }) => {
  useLayoutEffect(() => {
    Fuego.loadTheme(AtlassianLight);
  });

  return <>{children}</>;
};
