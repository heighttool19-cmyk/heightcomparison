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

    const { title, excerpt, body, targetLocale = "de" } = await req.json();

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

    const targetLangName = targetLocale === "de" ? "German (de)" : targetLocale;
    const systemPrompt = `You are a professional translator translating English blog content into ${targetLangName}.
Requirements:
1. Translate accurately, keeping natural German idioms, tone, and casing.
2. Output ONLY a valid JSON object matching this exact schema:
{
  "title": "translated title",
  "excerpt": "translated excerpt",
  "spans": ["translated span 0", "translated span 1", ...],
  "imageAlts": ["translated alt 0", ...]
}
3. The number of elements in the 'spans' array must EXACTLY match the input spans count (${promptPayload.spans.length}).
4. The number of elements in the 'imageAlts' array must EXACTLY match the input imageAlts count (${promptPayload.imageAlts.length}).
5. Do NOT include markdown code blocks, explanation, or commentary. Output pure JSON.`;

    // 3. Call OpenRouter using google/gemini-2.5-flash (with deepseek-chat fallback)
    let model = "google/gemini-2.5-flash";
    let openRouterRes = await fetch("https://openrouter.ai/api/v1/chat/completions", {
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
        max_tokens: 6000,
        temperature: 0.2,
      }),
    });

    if (!openRouterRes.ok) {
      console.warn(`Gemini 2.5 flash returned ${openRouterRes.status}, falling back to DeepSeek-V3`);
      model = "deepseek/deepseek-chat";
      openRouterRes = await fetch("https://openrouter.ai/api/v1/chat/completions", {
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
          max_tokens: 6000,
          temperature: 0.2,
        }),
      });
    }

    if (!openRouterRes.ok) {
      const errorText = await openRouterRes.text();
      return NextResponse.json(
        { error: `OpenRouter API error: ${openRouterRes.status} - ${errorText}` },
        { status: 502 }
      );
    }

    const completionData = await openRouterRes.json();
    const rawContent = completionData.choices?.[0]?.message?.content?.trim() || "";

    // Clean markdown code blocks if the model wrapped output in ```json
    const cleanedJsonString = rawContent
      .replace(/^```(?:json)?\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();

    const parsedTranslation = JSON.parse(cleanedJsonString);

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
      modelUsed: model,
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
