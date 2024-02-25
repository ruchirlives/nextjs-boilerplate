import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Image from 'next/image';
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Ensure you include any head elements here */}
      </head>
      <body className={`${inter.className} bg-white dark:bg-black text-black dark:text-white`}>
        {/* Fixed banner with SDG logo and title */}
        <div className="fixed top-0 left-0 w-full z-10 bg-blue-100 dark:bg-gray-800 flex items-center justify-start p-4 shadow-md">
          <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Sustainable_Development_Goals_-_logo.svg/240px-Sustainable_Development_Goals_-_logo.svg.png" alt="SDG Logo" width={100} height={100} unoptimized={true} />
          <h1 className="text-xl ml-4">Digital Enablers for Natural Capital</h1>
        </div>

        {/* Padding-top for main content to ensure it doesn't get hidden behind the fixed header */}
        <div className="pt-[100px]">
          {children}
        </div>
      </body>
    </html>
  );
}