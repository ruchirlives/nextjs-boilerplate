import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Image from 'next/image'; // Import if using Next.js Image component for optimization
import "./globals.css";

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
    <html lang="en">
      <head>
        {/* Ensure you include any head elements here */}
      </head>
      <body className={inter.className}>
        {/* Banner with SDG logo and title */}
        <div className="banner flex items-center justify-start p-4 bg-blue-100">
          {/* Adjust the path as necessary */}
          <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Sustainable_Development_Goals_-_logo.svg/240px-Sustainable_Development_Goals_-_logo.svg.png" alt="SDG Logo" width={100} height={100} />
          <h1 className="text-xl ml-4">Digital Enablers for Natural Capital</h1>
        </div>

        {/* Your main content */}
        {children}
      </body>
    </html>
  );
}
