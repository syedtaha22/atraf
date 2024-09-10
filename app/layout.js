import { Poppins } from "next/font/google";
import { Analytics } from "@vercel/analytics/react"
import "./globals.css";

// Import Poppins font from Google Fonts
const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-poppins',
});

export const metadata = {
  title: "Atraf - Empowering Your Business",
  description: "Atraf offers comprehensive services including custom websites, unique logos, and effective marketing strategies to help your business thrive online.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable}`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
