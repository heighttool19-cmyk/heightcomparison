import { type Viewport } from "next";

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    themeColor: "#3B82F6",
};

export default function BlogLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
