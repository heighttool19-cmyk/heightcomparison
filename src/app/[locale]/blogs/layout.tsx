import { type Metadata, type Viewport } from "next";
import { getTranslations } from "next-intl/server";

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
    const baseUrl = "https://heightcomparisoncalculator.com";
    const canonical = locale === "en" ? `${baseUrl}/blogs` : `${baseUrl}/${locale}/blogs`;

    return {
        title: t("blogsTitle"),
        description: t("blogsDescription"),
        alternates: {
            canonical,
            languages: {
                en: `${baseUrl}/blogs`,
                de: `${baseUrl}/de/blogs`,
                "x-default": `${baseUrl}/blogs`,
            },
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

