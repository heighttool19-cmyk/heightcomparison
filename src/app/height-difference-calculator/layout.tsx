import type { Metadata, Viewport } from "next";
export const metadata: Metadata = {
    title: "Height Difference Calculator - Calculate Height Difference Chart",
    description: "Calculate height difference with our height difference calculator. Includes couple height difference calculator with a height difference calculator chart."
};
export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    themeColor: "#3B82F6",
};

export default function HeightDifferenceLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}