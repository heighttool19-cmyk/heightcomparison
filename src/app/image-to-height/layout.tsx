import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "How to Measure Your Height at Home Without Measuring Tape",
    description: "Do you want to know how tall am I? Click to find out how to measure your own height without a measuring tape using our image to height calculator",
};

export default function ImageToHeightLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
