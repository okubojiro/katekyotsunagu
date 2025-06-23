import type { Metadata } from "next";
import { Inter } from "next/font/google";
// Temporarily disable ClerkProvider to fix localhost connection
// import { ClerkProvider } from '@clerk/nextjs';
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "家庭教師つなぐ | 個人契約マッチングサービス",
  description: "信頼できる家庭教師と生徒をつなぐマッチングサービス。質の高い個人契約で、理想の学習環境を見つけましょう。",
  keywords: ["家庭教師", "個人契約", "マッチング", "学習", "教育"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
