import { NextRequest, NextResponse } from "next/server";
import { buildPrompt } from "@/lib/ai";
import { getDecorationItems } from "@/lib/decoration-items";
import { generateWithGoogle } from "@/lib/providers/google";
import { generateWithOpenAI } from "@/lib/providers/openai";
import { resolveAiProvider } from "@/lib/providers/keys";
import type { DecorationMood, DecorationStyle } from "@/lib/types";

const VALID_STYLES: DecorationStyle[] = [
  "moderno",
  "minimalista",
  "rustico",
  "boho",
  "industrial",
];

const VALID_MOODS: DecorationMood[] = [
  "relaxamento",
  "produtividade",
  "aconchego",
  "sofisticacao",
  "natureza",
];

/** Geração com Gemini pode levar ~15–30s — ajuste no plano Vercel se necessário */
export const maxDuration = 60;

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      imageBase64?: string;
      style?: DecorationStyle;
      mood?: DecorationMood;
    };

    const { imageBase64, style, mood } = body;

    if (!imageBase64 || !style || !mood) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!VALID_STYLES.includes(style) || !VALID_MOODS.includes(mood)) {
      return NextResponse.json(
        { error: "Invalid style or mood" },
        { status: 400 }
      );
    }

    const prompt = buildPrompt(style, mood);
    const items = getDecorationItems(style, mood);
    const { provider, apiKey } = resolveAiProvider();

    let imageUrl: string | null = null;
    let source: "google" | "openai" | "demo" = "demo";

    if (provider === "google" && apiKey) {
      imageUrl = await generateWithGoogle(apiKey, imageBase64, prompt);
      if (imageUrl) source = "google";
    } else if (provider === "openai" && apiKey) {
      imageUrl = await generateWithOpenAI(apiKey, imageBase64, prompt);
      if (imageUrl) source = "openai";
    }

    if (imageUrl) {
      return NextResponse.json({
        imageUrl,
        usedFallback: false,
        source,
        prompt,
        items,
      });
    }

    // Demo: keep the user's room instead of a random stock photo
    return NextResponse.json({
      imageUrl: imageBase64,
      usedFallback: true,
      source: "demo",
      prompt,
      items,
      message:
        provider === "none"
          ? "Configure GOOGLE_API_KEY ou OPENAI_API_KEY no .env.local"
          : "A API de imagens falhou — exibindo seu ambiente original (modo demonstração).",
    });
  } catch {
    return NextResponse.json(
      { error: "Generation failed" },
      { status: 500 }
    );
  }
}
