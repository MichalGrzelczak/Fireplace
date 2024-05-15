import type { Metadata } from "next";

import { Theme } from "@/app/theme";

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
      </body>
    </html>
  );
}
