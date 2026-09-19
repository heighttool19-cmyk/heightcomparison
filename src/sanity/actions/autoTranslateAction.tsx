import React, { useState } from "react";
import { DocumentActionProps, useDocumentOperation, DocumentActionComponent } from "sanity";
import { useToast, Card, Stack, Flex, Box, Text, Badge, Spinner, Button } from "@sanity/ui";
import { TranslateIcon, EarthGlobeIcon, CheckmarkCircleIcon, ClockIcon, ErrorOutlineIcon } from "@sanity/icons";
import { TARGET_LANGUAGES, TranslationLanguage } from "../languages";

type LangStatus = "idle" | "in-progress" | "success" | "error";

interface LangProgressState {
  status: LangStatus;
  modelUsed?: string;
  durationMs?: number;
  error?: string;
}

/** Helper to call the auto-translate API for a specific target language */
async function translatePost(doc: any, lang: TranslationLanguage): Promise<{ translated: any; modelUsed: string }> {
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

  return {
    translated: data.translated,
    modelUsed: data.modelUsed || "Free AI",
  };
}

/**
 * Master Action: Auto-Translate All Configured Target Languages
 *
 * Runs translation sequentially across all TARGET_LANGUAGES with live progress dialog,
 * saving each translated language immediately upon completion.
 */
export function AutoTranslateAllAction(props: DocumentActionProps) {
  const { patch } = useDocumentOperation(props.id, props.type);
  const toast = useToast();

  const [isOpen, setIsOpen] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [currentLangId, setCurrentLangId] = useState<string | null>(null);
  const [progressStates, setProgressStates] = useState<Record<string, LangProgressState>>(() => {
    const initial: Record<string, LangProgressState> = {};
    TARGET_LANGUAGES.forEach((l) => {
      initial[l.id] = { status: "idle" };
    });
    return initial;
  });

  if (props.type !== "post") {
    return null;
  }

  const doc: any = props.draft || props.published;
  const hasContent = Boolean(doc?.title && doc?.body?.length);
  const totalLanguages = TARGET_LANGUAGES.length;

  const completedCount = Object.values(progressStates).filter((s) => s.status === "success").length;
  const errorCount = Object.values(progressStates).filter((s) => s.status === "error").length;
  const percentComplete = Math.round((completedCount / totalLanguages) * 100);

  const runTranslationLoop = async () => {
    setIsTranslating(true);
    setIsOpen(true);

    // Reset progress states to idle
    const freshStates: Record<string, LangProgressState> = {};
    TARGET_LANGUAGES.forEach((l) => {
      freshStates[l.id] = { status: "idle" };
    });
    setProgressStates(freshStates);

    toast.push({
      status: "info",
      title: "Auto-Translation Started",
      description: `Translating post into ${totalLanguages} languages sequentially using Free AI...`,
    });

    for (let i = 0; i < TARGET_LANGUAGES.length; i++) {
      const lang = TARGET_LANGUAGES[i];
      setCurrentLangId(lang.id);

      setProgressStates((prev) => ({
        ...prev,
        [lang.id]: { status: "in-progress" },
      }));

      const startTime = Date.now();
      try {
        const { translated, modelUsed } = await translatePost(doc, lang);
        const durationMs = Date.now() - startTime;

        // Save immediately into document draft
        patch.execute([
          {
            set: {
              [`translations.${lang.id}`]: translated,
            },
          },
        ]);

        setProgressStates((prev) => ({
          ...prev,
          [lang.id]: {
            status: "success",
            modelUsed,
            durationMs,
          },
        }));
      } catch (err: any) {
        console.error(`Translation error for ${lang.title}:`, err);
        setProgressStates((prev) => ({
          ...prev,
          [lang.id]: {
            status: "error",
            error: err.message || "Failed to translate",
          },
        }));
      }

      // Small pause between translations to ensure UI fluidity
      await new Promise((resolve) => setTimeout(resolve, 250));
    }

    setIsTranslating(false);
    setCurrentLangId(null);

    toast.push({
      status: "success",
      title: "Translation Batch Completed",
      description: "Translations have been applied and saved to the document draft.",
    });
  };

  const dialogContent = (
    <Box padding={4}>
      <Stack space={4}>
        {/* Progress Overview Card */}
        <Card padding={3} radius={2} tone={isTranslating ? "primary" : errorCount === 0 ? "positive" : "caution"}>
          <Stack space={3}>
            <Flex align="center" justify="space-between">
              <Text size={1} weight="bold">
                {isTranslating
                  ? `Processing ${completedCount + 1} of ${totalLanguages}...`
                  : completedCount === totalLanguages
                  ? "🎉 All Translations Finished!"
                  : `Completed ${completedCount} of ${totalLanguages} Languages`}
              </Text>
              <Badge tone={isTranslating ? "primary" : "positive"}>
                {percentComplete}% Complete
              </Badge>
            </Flex>

            {/* Custom Modern Progress Bar */}
            <Box
              style={{
                width: "100%",
                height: "8px",
                backgroundColor: "rgba(0,0,0,0.1)",
                borderRadius: "4px",
                overflow: "hidden",
              }}
            >
              <Box
                style={{
                  width: `${percentComplete}%`,
                  height: "100%",
                  background: isTranslating
                    ? "linear-gradient(90deg, #3b82f6, #06b6d4)"
                    : "linear-gradient(90deg, #10b981, #059669)",
                  transition: "width 0.4s ease",
                  borderRadius: "4px",
                }}
              />
            </Box>

            <Text size={1} muted>
              {isTranslating
                ? "Connecting to Free OpenRouter AI models sequentially to ensure reliable generation."
                : `Successfully translated and saved ${completedCount} language sections to this document.`}
            </Text>
          </Stack>
        </Card>

        {/* Step-by-Step Language Checklist */}
        <Stack space={2}>
          {TARGET_LANGUAGES.map((lang) => {
            const state = progressStates[lang.id] || { status: "idle" };
            const isCurrent = currentLangId === lang.id;

            return (
              <Card
                key={lang.id}
                padding={3}
                radius={2}
                border
                tone={
                  state.status === "in-progress"
                    ? "primary"
                    : state.status === "success"
                    ? "positive"
                    : state.status === "error"
                    ? "critical"
                    : "default"
                }
              >
                <Flex align="center" justify="space-between">
                  <Flex align="center" gap={3}>
                    <Text size={3}>{lang.flag}</Text>
                    <Stack space={1}>
                      <Flex align="center" gap={2}>
                        <Text size={1} weight="semibold">
                          {lang.title}
                        </Text>
                        <Text size={1} muted>
                          ({lang.nativeLabel})
                        </Text>
                      </Flex>
                      {state.modelUsed && (
                        <Text size={0} muted>
                          Model: {state.modelUsed.replace(":free", "")} · {(state.durationMs ? (state.durationMs / 1000).toFixed(1) : 1)}s
                        </Text>
                      )}
                      {state.error && (
                        <Text size={0} style={{ color: "#e11d48" }}>
                          {state.error}
                        </Text>
                      )}
                    </Stack>
                  </Flex>

                  {/* Right Status Badge / Spinner */}
                  <Box>
                    {state.status === "idle" && (
                      <Flex align="center" gap={1}>
                        <ClockIcon style={{ opacity: 0.5 }} />
                        <Badge tone="default" mode="outline" fontSize={1}>
                          Queued
                        </Badge>
                      </Flex>
                    )}

                    {state.status === "in-progress" && (
                      <Flex align="center" gap={2}>
                        <Spinner size={1} />
                        <Badge tone="primary" fontSize={1}>
                          Translating...
                        </Badge>
                      </Flex>
                    )}

                    {state.status === "success" && (
                      <Flex align="center" gap={1}>
                        <CheckmarkCircleIcon style={{ color: "green" }} />
                        <Badge tone="positive" fontSize={1}>
                          Saved
                        </Badge>
                      </Flex>
                    )}

                    {state.status === "error" && (
                      <Flex align="center" gap={1}>
                        <ErrorOutlineIcon style={{ color: "red" }} />
                        <Badge tone="critical" fontSize={1}>
                          Error
                        </Badge>
                      </Flex>
                    )}
                  </Box>
                </Flex>
              </Card>
            );
          })}
        </Stack>
      </Stack>
    </Box>
  );

  return {
    label: isTranslating
      ? `Translating (${completedCount}/${totalLanguages})...`
      : `🌐 Auto-Translate All (${TARGET_LANGUAGES.map((l) => l.id.toUpperCase()).join(", ")})`,
    icon: EarthGlobeIcon,
    disabled: !hasContent || isTranslating,
    title: !hasContent
      ? "Add an English title and body before translating"
      : `Translate into all ${totalLanguages} target languages with live step-by-step progress`,
    dialog: isOpen
      ? {
          type: "dialog" as const,
          header: "🌐 Multilingual Auto-Translation",
          onClose: () => {
            if (!isTranslating) {
              setIsOpen(false);
            }
          },
          showCloseButton: !isTranslating,
          width: "medium" as const,
          content: dialogContent,
          footer: (
            <Box padding={3}>
              <Flex justify="space-between" align="center">
                <Text size={1} muted>
                  {isTranslating
                    ? "Translating in progress... Please do not close this window."
                    : "All changes are automatically saved to your draft."}
                </Text>
                <Button
                  text={isTranslating ? "Translating..." : "Done"}
                  tone="primary"
                  disabled={isTranslating}
                  onClick={() => setIsOpen(false)}
                />
              </Flex>
            </Box>
          ),
        }
      : null,
    onHandle: () => {
      runTranslationLoop();
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
        ? `Translating ${lang.title}...`
        : `${lang.flag} Auto-Translate ${lang.title}`,
      icon: TranslateIcon,
      disabled: !hasContent || isTranslating,
      title: !hasContent
        ? "Add an English title and body before translating"
        : `Automatically translate this post into ${lang.title} (${lang.nativeLabel}) using Free AI`,
      onHandle: async () => {
        setIsTranslating(true);
        toast.push({
          status: "info",
          title: `Translating to ${lang.title} (${lang.nativeLabel})...`,
          description: "Calling Free OpenRouter translation model...",
        });

        const startTime = Date.now();
        try {
          const { translated, modelUsed } = await translatePost(doc, lang);
          const duration = ((Date.now() - startTime) / 1000).toFixed(1);

          patch.execute([
            {
              set: {
                [`translations.${lang.id}`]: translated,
              },
            },
          ]);

          toast.push({
            status: "success",
            title: `${lang.flag} ${lang.title} Translation Complete!`,
            description: `Saved to draft in ${duration}s using ${modelUsed.replace(":free", "")}.`,
          });
        } catch (err: any) {
          console.error(`Translation failed for ${lang.title}:`, err);
          toast.push({
            status: "error",
            title: `Failed to translate to ${lang.title}`,
            description: err.message || "An error occurred during translation.",
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
