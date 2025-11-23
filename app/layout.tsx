import type { Metadata } from "next";
import { Inter, Crimson_Text, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const flecha = Crimson_Text({
  variable: "--font-flecha",
  subsets: ["latin"],
  weight: ["600", "600"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Rube",
  description: "Get something done today",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script src="https://js.puter.com/v2/"></script>
      </head>
      <body
        className={`${inter.variable} ${flecha.variable} ${poppins.variable} font-inter antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
