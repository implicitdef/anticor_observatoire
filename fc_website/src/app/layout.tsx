import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "France Corruption",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body
        className={`${inter.className} bg-zinc-200 min-h-screen flex flex-col`}
      >
        <header className="bg-white ">
          <div className="container mx-auto">
            <div className="flex  justify-between">
              <div className="bg-red-900 text-white p-4 m-4 font-bold">
                LOGO
              </div>
              <div className="bg-red-300 min-w-[300px] m-4 flex items-center justify-center">
                social links...
              </div>
            </div>
            <div className="p-4 flex items-center">navigation menu...</div>
          </div>
        </header>
        <div className="container mx-auto grow">{children}</div>
        <footer className="bg-white ">
          <div className="container mx-auto">footer</div>
        </footer>
      </body>
    </html>
  );
}
