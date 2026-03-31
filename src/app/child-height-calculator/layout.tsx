import { type Metadata, type Viewport } from "next";

export const metadata: Metadata = {
    title: "Children's Height Calculator - Height Prediction Calculator",
    description: " Predict your child’s future height with our Height Predictor Calculator. This Projected height calculator uses proven methods to predict adult height.",
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
