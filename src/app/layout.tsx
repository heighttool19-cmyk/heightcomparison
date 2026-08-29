import { type Metadata, type Viewport } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/layout/Footer";
import ThemeInitializer from "@/components/ThemeInitializer";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import Script from "next/script";
import { NextIntlClientProvider } from "next-intl";
import enMessages from "../../messages/en.json";

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
  verification: {
    google: [
      "B6wcmRG4Npf23-9HnmQRj0NaUmNnwdKLT2TLCnhDsxo",
      "-txHoa_zl2DLv__Q0mLp1mwwXHdOvVTNIZ6aTHFXTQ4",
    ],
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
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID || "GTM-K8V4XPD3";

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Polyfill defensive DOM patch against browser extension mutations */}
        <Script
          id="dom-defender"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                if (typeof window !== 'undefined') {
                  var origRemoveChild = Node.prototype.removeChild;
                  Node.prototype.removeChild = function(child) {
                    if (child.parentNode !== this) {
                      if (child.parentNode) {
                        return child.parentNode.removeChild(child);
                      }
                      return child;
                    }
                    return origRemoveChild.call(this, child);
                  };
                  var origInsertBefore = Node.prototype.insertBefore;
                  Node.prototype.insertBefore = function(newNode, refNode) {
                    if (refNode && refNode.parentNode !== this) {
                      return this.appendChild(newNode);
                    }
                    return origInsertBefore.call(this, newNode, refNode);
                  };
                }
              })();
            `,
          }}
        />
        {/* Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${gtmId}');
            `,
          }}
        />
        {/* End Google Tag Manager */}
      </head>
      <body
        suppressHydrationWarning
        className={`${jakarta.variable} ${jetbrainsMono.variable} font-sans antialiased bg-bg text-foreground selection:bg-accent/20 transition-colors duration-500`}
      >
        {/* Google Tag Manager (noscript) */}
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${gtmId}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
          }}
        />
        {/* End Google Tag Manager (noscript) */}
        <ThemeInitializer />
        <NextIntlClientProvider locale="en" messages={enMessages}>
          <div className="flex flex-col min-h-[100dvh] overflow-x-clip">
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </NextIntlClientProvider>
        <GoogleAnalytics />
      </body>
    </html>
  );
}
