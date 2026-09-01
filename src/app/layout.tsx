import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "G",
  description:
    "A personal timeline of Gabriel Mendonça's work, projects, and ideas.",
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
