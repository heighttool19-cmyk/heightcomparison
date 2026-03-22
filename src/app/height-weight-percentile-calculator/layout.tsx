
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Height and Weight Percentile Calculator for Babies, Kids & Adults',
    description: 'Use our Height and Weight Percentile Calculator to measure growth. Includes baby height percentile calculator and height percentile adults calculator',
};
export default function HeightWeightPercentileCalculatorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
