import { type Metadata, type Viewport } from "next";

export const metadata: Metadata = {
    title: 'Blog Height Comparison Tool',
    description: 'Read the latest articles about height, body proportions, and interesting comparisons.',
    alternates: {
        canonical: 'https://heightcomparisoncalculator.com/blogs',
    },
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    themeColor: "#3B82F6",
};

export default function BlogsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
