import { type Metadata, type Viewport } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/layout/Footer";
import ThemeInitializer from "@/components/ThemeInitializer";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Height Comparison Chart - Person Height, Character Height & More",
  description: "Use Height Comparison Tool to compare heights online. Create a height comparison chart for people or characters with this easy height comparison website",
  alternates: {
    canonical: 'https://heightcomparisoncalculator.com/',
  },
  icons: {
    icon: "/logo.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#3B82F6",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jakarta.variable} ${jetbrainsMono.variable} font-sans antialiased bg-bg text-foreground selection:bg-accent/20 transition-colors duration-500`}>
        <ThemeInitializer />
        <div className="flex flex-col min-h-[100dvh] overflow-x-clip">
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
        <GoogleAnalytics />
      </body>
    </html>
  );
}
