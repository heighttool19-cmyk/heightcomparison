import { type Metadata, type Viewport } from "next";

export const metadata: Metadata = {
    title: "Height Calculator: Predict Your Adult Height",
    description: "Predict your height with our Height Predictor Calculator. This Projected height calculator uses proven methods to predict adult height.",
    alternates: {
        canonical: 'https://heightcomparisoncalculator.com/height-predictor',
    },
};
export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    themeColor: "#3B82F6",
};

export default function ChildHeightCalculatorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
