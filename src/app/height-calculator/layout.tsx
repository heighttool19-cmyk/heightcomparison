import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Child Height Predictor — How Tall Will My Child Be? | Free Calculator",
    description: "Use our free child height predictor to estimate how tall your child will be. Based on Khamis-Roche and mid-parental height methods. Includes boys & girls growth charts.",
};

export default function HeightCalculatorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
