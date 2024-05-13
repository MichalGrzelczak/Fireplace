import type { Metadata } from "next";
import "./globals.css";
import { Theme } from "@/app/theme";

export const metadata: Metadata = {
  title: "Fireplace",
  description: "Find team for Appfire Ignite",
};

export default function RootLayout({
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
