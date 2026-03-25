import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Calculate Ideal Body Weight & Adjusted body weight calculator",
    description: "Use our Ideal Weight Calculator in kg to calculate ideal body weight. Includes adjusted ideal body weight calculator for male and female weight calculations.",
};

export default function IdealBodyWeightLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
