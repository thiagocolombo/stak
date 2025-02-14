import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"], 
  style: ["normal", "italic"], 
});
 
export const metadata: Metadata = {
  title: "Gerenciamento de Tarefas",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
