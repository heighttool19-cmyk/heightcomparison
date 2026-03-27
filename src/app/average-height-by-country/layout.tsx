import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Average Height by Country - Global Human Height Chart",
    description: "Learn the average height of a woman & man worldwide and compare average heights by country. See the average human height around the world in one chart.",
};

export default function AverageHeightLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}