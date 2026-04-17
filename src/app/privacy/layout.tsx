import { type Metadata, type Viewport } from "next";

export const metadata: Metadata = {
    title: 'Privacy Policy Height Comparison Tool',
    description: 'Learn about how we protect your privacy and handle your data at Height Comparison Calculator.',
    alternates: {
        canonical: 'https://heightcomparisoncalculator.com/privacy',
    },
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    themeColor: "#3B82F6",
};

export default function PrivacyLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
