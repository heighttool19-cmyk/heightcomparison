import { useState } from "react";
import { DocumentActionProps, useDocumentOperation } from "sanity";
import { useToast } from "@sanity/ui";
import { TranslateIcon } from "@sanity/icons";

export function AutoTranslateAction(props: DocumentActionProps) {
  const { patch } = useDocumentOperation(props.id, props.type);
  const toast = useToast();
  const [isTranslating, setIsTranslating] = useState(false);

  // Only apply to 'post' documents
  if (props.type !== "post") {
    return null;
  }

  const doc: any = props.draft || props.published;
  const hasContent = Boolean(doc?.title && doc?.body?.length);

  return {
    label: isTranslating ? "Translating to German..." : "🌐 Auto-Translate to German",
    icon: TranslateIcon,
    disabled: !hasContent || isTranslating,
    title: !hasContent
      ? "Add an English title and body before translating"
      : "Automatically translate this post into German using AI",
    onHandle: async () => {
      setIsTranslating(true);
      toast.push({
        status: "info",
        title: "Translating to German...",
        description: "Calling OpenRouter translation engine...",
      });

      try {
        const res = await fetch("/api/sanity/auto-translate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: doc.title,
            excerpt: doc.excerpt,
            body: doc.body,
            targetLocale: "de",
          }),
        });

        const data = await res.json();

        if (!res.ok || !data.success) {
          throw new Error(data.error || "Failed to translate");
        }

        // Patch the translated data into the translations.de object
        patch.execute([
          {
            set: {
              "translations.de": data.translated,
            },
          },
        ]);

        toast.push({
          status: "success",
          title: "German translation complete!",
          description: "Translations have been applied to the German tab.",
        });
      } catch (err: any) {
        console.error("Translation failed:", err);
        toast.push({
          status: "error",
          title: "Translation failed",
          description: err.message || "An unexpected error occurred.",
        });
      } finally {
        setIsTranslating(false);
      }
    },
  };
}
