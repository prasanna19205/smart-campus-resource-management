
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SmartCampus | Campus Resource & Event Management",
  description:
    "A smarter campus platform for managing events, venues and resources.",
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
