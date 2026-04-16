import { type Metadata, type Viewport } from "next";

export const metadata: Metadata = {
    title: "How to Measure Your Height at Home Without Measuring Tape",
    description: "Do you want to know how tall am I? Click to find out how to measure your own height without a measuring tape using our image to height calculator",
    alternates: {
        canonical: 'https://heightcomparisoncalculator.com/image-to-height',
    },
};
export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    themeColor: "#3B82F6",
};

export default function ImageToHeightLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
