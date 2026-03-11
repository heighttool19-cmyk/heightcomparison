import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "How to Measure Your Height Without a Measuring Tape — Free Photo Tool",
    description: "No tape measure? Upload a photo and measure your height instantly. Our free tool calibrates from any known object and gives you an accurate result in seconds.",
};

export default function ImageToHeightLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
