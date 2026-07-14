import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "สภาพอากาศไทย — Weather & PM2.5",
  description: "เช็คสภาพอากาศและค่าฝุ่น PM2.5 ทั้ง 77 จังหวัดของไทยแบบเรียลไทม์",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <body className={`${inter.variable} ${mono.variable} font-display antialiased`}>
        {children}
      </body>
    </html>
  );
}
