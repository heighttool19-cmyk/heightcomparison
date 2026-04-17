import { type Metadata, type Viewport } from "next";

export const metadata: Metadata = {
    title: 'About Us — Height Comparison Tool',
    description: 'Learn about the story behind Height Comparison Calculator and how we build the most accurate scale-based comparison tool.',
    alternates: {
        canonical: 'https://heightcomparisoncalculator.com/about',
    },
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    themeColor: "#3B82F6",
};

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
