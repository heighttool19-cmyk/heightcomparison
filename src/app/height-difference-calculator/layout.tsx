import type { Metadata } from "next";
export const metadata: Metadata = {
    title: "Height Difference Calculator - Calculate Height Difference Chart",
    description: "Calculate height difference with our height difference calculator. Includes couple height difference calculator with a height difference calculator chart."
};

export default function HeightDifferenceLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}