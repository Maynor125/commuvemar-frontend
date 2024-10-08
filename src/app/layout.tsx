import "./globals.css";
import { Inter } from "next/font/google";
import { Open_Sans } from "next/font/google";

import ReduxProvider from "@/redux/Provider";
import AuthProvider from "@/auth/authProvider";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

//! exportacion de la fuente open_sans que sera la principal para textos exepto titulos.
export const open_Sans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "700"],
});

export const metadata:Metadata = {
  title: "Commuvemar",
  description: "Cooperativa multisectorial veintinueve de maarzo.",
  icons:{
    icon:'/favicon-v2.ico'
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReduxProvider>
      <AuthProvider>
        <html data-theme lang="en">
        <body className={open_Sans.className}>{children}</body>
      </html>
      </AuthProvider>
    </ReduxProvider>
  );
}
