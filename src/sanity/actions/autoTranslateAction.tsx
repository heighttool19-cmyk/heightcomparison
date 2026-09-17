import { useState } from "react";
import { DocumentActionProps, useDocumentOperation, DocumentActionComponent } from "sanity";
import { useToast } from "@sanity/ui";
import { TranslateIcon, EarthGlobeIcon } from "@sanity/icons";
import { TARGET_LANGUAGES, TranslationLanguage } from "../languages";

/** Helper to call the auto-translate API for a specific target language */
async function translatePost(doc: any, lang: TranslationLanguage) {
  const res = await fetch("/api/sanity/auto-translate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: doc.title,
      excerpt: doc.excerpt,
      body: doc.body,
      targetLocale: lang.id,
      targetLocaleName: lang.title,
    }),
  });

  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.error || `Failed to translate to ${lang.title}`);
  }

  return data.translated;
}

/**
 * Master Action: Auto-Translate All Configured Target Languages
 *
 * Runs translation for all TARGET_LANGUAGES concurrently in parallel,
 * applying all translated fields to the document in one batch.
 */
export function AutoTranslateAllAction(props: DocumentActionProps) {
  const { patch } = useDocumentOperation(props.id, props.type);
  const toast = useToast();
  const [isTranslating, setIsTranslating] = useState(false);

  if (props.type !== "post") {
    return null;
  }

  const doc: any = props.draft || props.published;
  const hasContent = Boolean(doc?.title && doc?.body?.length);
  const langCodes = TARGET_LANGUAGES.map((l) => l.id.toUpperCase()).join(", ");

  return {
    label: isTranslating ? "Translating all languages..." : `🌐 Auto-Translate All (${langCodes})`,
    icon: EarthGlobeIcon,
    disabled: !hasContent || isTranslating,
    title: !hasContent
      ? "Add an English title and body before translating"
      : `Automatically translate into all languages (${langCodes}) using AI`,
    onHandle: async () => {
      setIsTranslating(true);
      toast.push({
        status: "info",
        title: `Translating all languages (${langCodes})...`,
        description: "Calling OpenRouter AI engine in parallel...",
      });

      try {
        const results = await Promise.allSettled(
          TARGET_LANGUAGES.map(async (lang) => {
            const translated = await translatePost(doc, lang);
            return { lang, translated };
          })
        );

        const patchSet: Record<string, any> = {};
        const successLangs: string[] = [];
        const failedLangs: string[] = [];

        results.forEach((res, index) => {
          const lang = TARGET_LANGUAGES[index];
          if (res.status === "fulfilled") {
            patchSet[`translations.${res.value.lang.id}`] = res.value.translated;
            successLangs.push(`${lang.flag} ${lang.title}`);
          } else {
            console.error(`Translation failed for ${lang.title}:`, res.reason);
            failedLangs.push(`${lang.flag} ${lang.title}`);
          }
        });

        if (Object.keys(patchSet).length > 0) {
          patch.execute([{ set: patchSet }]);
        }

        if (failedLangs.length === 0) {
          toast.push({
            status: "success",
            title: "All translations completed!",
            description: `Successfully translated into: ${successLangs.join(", ")}`,
          });
        } else {
          toast.push({
            status: "warning",
            title: "Partial translation completed",
            description: `Succeeded: ${successLangs.join(", ")}. Failed: ${failedLangs.join(", ")}`,
          });
        }
      } catch (err: any) {
        console.error("Batch translation failed:", err);
        toast.push({
          status: "error",
          title: "Translation failed",
          description: err.message || "An unexpected error occurred during batch translation.",
        });
      } finally {
        setIsTranslating(false);
      }
    },
  };
}

/**
 * Factory for creating an individual single-language translate action button.
 */
export function createAutoTranslateAction(lang: TranslationLanguage): DocumentActionComponent {
  return function SingleLanguageTranslateAction(props: DocumentActionProps) {
    const { patch } = useDocumentOperation(props.id, props.type);
    const toast = useToast();
    const [isTranslating, setIsTranslating] = useState(false);

    if (props.type !== "post") {
      return null;
    }

    const doc: any = props.draft || props.published;
    const hasContent = Boolean(doc?.title && doc?.body?.length);

    return {
      label: isTranslating
        ? `Translating to ${lang.title}...`
        : `${lang.flag} Auto-Translate ${lang.title}`,
      icon: TranslateIcon,
      disabled: !hasContent || isTranslating,
      title: !hasContent
        ? "Add an English title and body before translating"
        : `Automatically translate this post into ${lang.title} (${lang.nativeLabel}) using AI`,
      onHandle: async () => {
        setIsTranslating(true);
        toast.push({
          status: "info",
          title: `Translating to ${lang.title}...`,
          description: "Calling OpenRouter translation engine...",
        });

        try {
          const translated = await translatePost(doc, lang);

          patch.execute([
            {
              set: {
                [`translations.${lang.id}`]: translated,
              },
            },
          ]);

          toast.push({
            status: "success",
            title: `${lang.flag} ${lang.title} translation complete!`,
            description: `Translations have been applied to the ${lang.title} section.`,
          });
        } catch (err: any) {
          console.error(`Translation failed for ${lang.title}:`, err);
          toast.push({
            status: "error",
            title: "Translation failed",
            description: err.message || `An error occurred while translating to ${lang.title}.`,
          });
        } finally {
          setIsTranslating(false);
        }
      },
    };
  };
}

/** Array of all auto-translate actions (Master "Translate All" + individual language actions) */
export const autoTranslateActions: DocumentActionComponent[] = [
  AutoTranslateAllAction,
  ...TARGET_LANGUAGES.map(createAutoTranslateAction),
];

/** Backward-compatibility alias */
export const AutoTranslateAction = AutoTranslateAllAction;
