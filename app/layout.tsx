import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "David Youn | Agent Terminal",
  description:
    "A terminal-inspired personal website with an AI portfolio agent.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
