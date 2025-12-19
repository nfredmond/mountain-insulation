import type { Metadata } from "next";
import {
  Archivo_Black,
  JetBrains_Mono,
  Plus_Jakarta_Sans,
} from "next/font/google";
import "./globals.css";

const fontSans = Plus_Jakarta_Sans({
  variable: "--font-mi-sans",
  subsets: ["latin"],
});

const fontDisplay = Archivo_Black({
  variable: "--font-mi-display",
  subsets: ["latin"],
  weight: "400",
});

const fontMono = JetBrains_Mono({
  variable: "--font-mi-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Mountain Insulation",
    template: "%s | Mountain Insulation",
  },
  description:
    "Premium insulation contractor serving Grass Valley and Nevada County — residential and commercial insulation, energy efficiency, and comfort upgrades.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  openGraph: {
    title: "Mountain Insulation",
    description:
      "Premium insulation contractor serving Grass Valley and Nevada County — residential and commercial insulation, energy efficiency, and comfort upgrades.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fontSans.variable} ${fontDisplay.variable} ${fontMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
