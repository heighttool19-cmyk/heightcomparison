import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Children's Height Calculator - Height Prediction Calculator",
    description: " Predict your child’s future height with our Height Predictor Calculator. This Projected height calculator uses proven methods to predict adult height.",
};

export default function HeightCalculatorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
