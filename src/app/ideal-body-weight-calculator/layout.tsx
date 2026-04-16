import { type Metadata, type Viewport } from "next";

export const metadata: Metadata = {
    title: "Calculate Ideal Body Weight & Adjusted body weight calculator",
    description: "Use our Ideal Weight Calculator in kg to calculate ideal body weight. Includes adjusted ideal body weight calculator for male and female weight calculations.",
    alternates: {
        canonical: '/ideal-body-weight-calculator',
    },
};
export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    themeColor: "#3B82F6",
};

export default function IdealBodyWeightLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
