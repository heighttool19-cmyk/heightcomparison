
import { type Metadata, type Viewport } from "next";

export const metadata: Metadata = {
    title: 'Height and Weight Percentile Calculator for Babies, Kids & Adults',
    description: 'Use our Height and Weight Percentile Calculator to measure growth. Includes baby height percentile calculator and height percentile adults calculator',
    alternates: {
        canonical: '/height-weight-percentile-calculator',
    },
};
export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    themeColor: "#3B82F6",
};

export default function HeightWeightPercentileCalculatorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
