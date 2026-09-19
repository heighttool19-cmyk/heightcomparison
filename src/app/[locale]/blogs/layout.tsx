import { type Metadata, type Viewport } from "next";
import { getTranslations } from "next-intl/server";
import { getAlternateLanguages, getCanonicalUrl } from "@/i18n/config";

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    themeColor: "#3B82F6",
};

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "metadata" });

    return {
        title: t("blogsTitle"),
        description: t("blogsDescription"),
        alternates: {
            canonical: getCanonicalUrl('/blogs', locale),
            languages: getAlternateLanguages('/blogs'),
        },
    };
}

export default function BlogsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}

