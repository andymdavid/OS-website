import type { Metadata } from "next";
import { Figtree, Silkscreen, Inter } from "next/font/google";
import "./globals.css";

// Font: Figtree (Headings)
const figtree = Figtree({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

// Font: Silkscreen (Eyebrows/Labels)
const silkscreen = Silkscreen({
  variable: "--font-eyebrow",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

// Font: Inter (Body Text)
const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Other Stuff | AI Implementation for SME Businesses",
  description: "We help SME businesses design systems where humans and AI do their best work together. From education to implementation, discover your path to AI transformation.",
  keywords: "AI implementation, artificial intelligence consulting, SME AI solutions, business AI systems, AI workshops, Marginal Gains Club",
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/Logo-Main-Icon.png', sizes: '192x192', type: 'image/png' },
    ],
    shortcut: '/favicon-32x32.png',
    apple: '/Logo-Main-Icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${figtree.variable} ${silkscreen.variable} ${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
