import type { Metadata } from "next";
import "./theme.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "ZamRoam | Roam Zambia — Experience More",
  description: "Experience the majesty of Victoria Falls, world-class safaris in South Luangwa & Lower Zambezi, traditional ceremonies across 10 provinces, and verified Zambian hospitality.",
  icons: { icon: "/favicon.svg" }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
