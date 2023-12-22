import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "@/styles/globals.scss";
import Provider from "./_trpc/Provider";

export const metadata: Metadata = {
  title: "Eclipse Expos",
  description: "Eclipse Expos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-montserrat">
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
