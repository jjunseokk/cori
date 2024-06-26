import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import localFont from "next/font/local";
import Header from "@/component/Header/Header";
import fa from "../../public/favicon.ico";
import AuthContext from "@/util/AuthContext";
import ReactQueryProviders from "@/util/QueryProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CORI",
  description: "모두의 코드 리뷰!",
  icons: {
    icon: "/favicon.png",
  },
};

const myFont = localFont({
  src: "./fonts/PretendardVariable.ttf",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={myFont.className}>
        <ReactQueryProviders>
          <Header />
          <AuthContext>{children}</AuthContext>
        </ReactQueryProviders>
      </body>
    </html>
  );
}
