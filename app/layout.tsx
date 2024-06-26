import "@fuegokit/tokens/dist/css/atlassian/colors/dark.css";
import "@fuegokit/tokens/dist/css/atlassian/colors/light.css";
import type { Metadata } from "next";

import { Theme } from "@/app/theme";
import { Toaster } from "@/components/ui/toaster";

import "./globals.css";

export const metadata: Metadata = {
  title: "Fireplace",
  description: "Find team for Appfire Ignite",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-color-mode="light">
      <body>
        <Theme>{children}</Theme>
        <Toaster />
      </body>
    </html>
  );
}
