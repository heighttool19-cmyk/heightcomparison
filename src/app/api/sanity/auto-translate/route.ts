import { NextRequest, NextResponse } from "next/server";

interface SpanItem {
  blockIndex: number;
  spanIndex: number;
  text: string;
}

interface ImageAltItem {
  blockIndex: number;
  alt: string;
}

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "OPENROUTER_API_KEY is not configured on server" },
        { status: 500 }
      );
    }

    const { title, excerpt, body, targetLocale = "de", targetLocaleName } = await req.json();

    if (!title) {
      return NextResponse.json(
        { error: "English title is required for translation" },
        { status: 400 }
      );
    }

    // 1. Extract plain text spans and image alts from Portable Text body
    const spansToTranslate: SpanItem[] = [];
    const imageAltsToTranslate: ImageAltItem[] = [];

    if (Array.isArray(body)) {
      body.forEach((block: any, blockIndex: number) => {
        if (block._type === "block" && Array.isArray(block.children)) {
          block.children.forEach((child: any, spanIndex: number) => {
            if (
              child._type === "span" &&
              typeof child.text === "string" &&
              child.text.trim().length > 0
            ) {
              spansToTranslate.push({ blockIndex, spanIndex, text: child.text });
            }
          });
        } else if (
          block._type === "image" &&
          typeof block.alt === "string" &&
          block.alt.trim().length > 0
        ) {
          imageAltsToTranslate.push({ blockIndex, alt: block.alt });
        }
      });
    }

    // 2. Prepare payload for OpenRouter
    const promptPayload = {
      title,
      excerpt: excerpt || "",
      spans: spansToTranslate.map((s) => s.text),
      imageAlts: imageAltsToTranslate.map((a) => a.alt),
    };

    const localeMap: Record<string, string> = {
      de: "German",
      es: "Spanish",
      fr: "French",
      it: "Italian",
      pt: "Portuguese",
      nl: "Dutch",
      ar: "Arabic",
      ja: "Japanese",
    };
    const targetLangName = targetLocaleName || localeMap[targetLocale] || targetLocale;

    // Free OpenRouter models in order of priority & reliability
    const FREE_MODELS = [
      "inclusionai/ling-3.0-flash-vl:free",
      "nex-agi/nex-n2.5-mini:free",
      "deepseek/deepseek-v4-flash-0731:free",
      "inclusionai/ling-3.0-flash-fin:free",
    ];

    const systemPrompt = `You are an elite, highly accurate professional translator translating English blog content into ${targetLangName}.
Requirements:
1. Translate accurately into ${targetLangName}, keeping natural idioms, cultural nuances, proper grammar, and tone.
${targetLocale === "ar" ? "2. For Arabic, produce fluent Modern Standard Arabic (فصحى) with appropriate phrasing.\n" : ""}3. Output ONLY a valid JSON object matching this exact schema:
{
  "title": "translated title",
  "excerpt": "translated excerpt",
  "spans": ["translated span 0", "translated span 1", ...],
  "imageAlts": ["translated alt 0", ...]
}
4. The number of elements in the 'spans' array must EXACTLY match the input spans count (${promptPayload.spans.length}).
5. The number of elements in the 'imageAlts' array must EXACTLY match the input imageAlts count (${promptPayload.imageAlts.length}).
6. Do NOT include markdown code blocks, explanation, or commentary. Output pure JSON only.`;

    let parsedTranslation: any = null;
    let successfulModel = "";
    let lastError = "";

    // 3. Resilient model execution: iterate through free models until one succeeds
    for (const model of FREE_MODELS) {
      try {
        console.log(`[Auto-Translate] Attempting translation into ${targetLangName} using ${model}...`);
        const openRouterRes = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json",
            "HTTP-Referer": "https://heightcomparison.com",
            "X-Title": "Height Comparison Sanity Auto-Translate",
          },
          body: JSON.stringify({
            model,
            messages: [
              { role: "system", content: systemPrompt },
              { role: "user", content: JSON.stringify(promptPayload) },
            ],
            temperature: 0.1,
          }),
          signal: AbortSignal.timeout(18000), // 18s timeout per candidate model
        });

        if (!openRouterRes.ok) {
          const errText = await openRouterRes.text();
          console.warn(`[Auto-Translate] Model ${model} failed with status ${openRouterRes.status}: ${errText.slice(0, 120)}`);
          lastError = `Status ${openRouterRes.status}: ${errText.slice(0, 120)}`;
          continue;
        }

        const completionData = await openRouterRes.json();
        const rawContent = completionData.choices?.[0]?.message?.content?.trim() || "";

        if (!rawContent) {
          console.warn(`[Auto-Translate] Model ${model} returned empty content.`);
          continue;
        }

        // Clean markdown code blocks if the model wrapped output in ```json ... ```
        const cleanedJsonString = rawContent
          .replace(/^```(?:json)?\s*/i, "")
          .replace(/\s*```$/i, "")
          .trim();

        try {
          parsedTranslation = JSON.parse(cleanedJsonString);
        } catch {
          // Fallback: extract JSON object via regex if there was preamble text
          const jsonMatch = rawContent.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            parsedTranslation = JSON.parse(jsonMatch[0]);
          }
        }

        if (parsedTranslation && typeof parsedTranslation === "object") {
          successfulModel = model;
          console.log(`[Auto-Translate] Successfully translated into ${targetLangName} using ${model}`);
          break;
        }
      } catch (modelErr: any) {
        console.warn(`[Auto-Translate] Error with model ${model}:`, modelErr.message);
        lastError = modelErr.message;
      }
    }

    if (!parsedTranslation || !successfulModel) {
      return NextResponse.json(
        {
          error: `All free translation models failed. Last error: ${lastError}`,
          modelsAttempted: FREE_MODELS,
        },
        { status: 502 }
      );
    }

    // 4. Reconstruct Portable Text body
    const clonedBody = Array.isArray(body) ? JSON.parse(JSON.stringify(body)) : [];

    if (Array.isArray(parsedTranslation.spans)) {
      spansToTranslate.forEach((item, index) => {
        if (
          parsedTranslation.spans[index] !== undefined &&
          clonedBody[item.blockIndex]?.children?.[item.spanIndex]
        ) {
          clonedBody[item.blockIndex].children[item.spanIndex].text = parsedTranslation.spans[index];
        }
      });
    }

    if (Array.isArray(parsedTranslation.imageAlts)) {
      imageAltsToTranslate.forEach((item, index) => {
        if (
          parsedTranslation.imageAlts[index] !== undefined &&
          clonedBody[item.blockIndex]
        ) {
          clonedBody[item.blockIndex].alt = parsedTranslation.imageAlts[index];
        }
      });
    }

    return NextResponse.json({
      success: true,
      modelUsed: successfulModel,
      translated: {
        title: parsedTranslation.title || title,
        excerpt: parsedTranslation.excerpt || excerpt || "",
        body: clonedBody,
      },
    });
  } catch (error: any) {
    console.error("Auto-translate API error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to execute auto-translation" },
      { status: 500 }
    );
  }
}
