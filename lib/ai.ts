import type { DecorationItem, DecorationMood, DecorationStyle } from "./types";
import { MOOD_LABELS, STYLE_LABELS } from "./constants";
import { compressImageDataUrl } from "./image-compress";

export type AiSource = "google" | "openai" | "demo";

export function buildPrompt(style: DecorationStyle, mood: DecorationMood): string {
  const styleLabel = STYLE_LABELS[style];
  const moodLabel = MOOD_LABELS[mood];

  return `Redesign this room into a ${styleLabel} interior with a ${moodLabel} feeling. Add biophilic elements like plants, improve lighting, use realistic furniture and textures. Keep the same room structure but enhance decoration. Ultra realistic, high quality.`;
}

export interface GenerateDesignResult {
  imageUrl: string;
  usedFallback: boolean;
  source: AiSource;
  message?: string;
  items: DecorationItem[];
}

export async function generateDesign(
  imageBase64: string,
  style: DecorationStyle,
  mood: DecorationMood
): Promise<GenerateDesignResult> {
  const compressed = await compressImageDataUrl(imageBase64, 1024, 0.8);

  const response = await fetch("/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ imageBase64: compressed, style, mood }),
  });

  if (!response.ok) {
    const err = (await response.json().catch(() => null)) as {
      detail?: string;
    } | null;
    throw new Error(err?.detail ?? "Generation failed");
  }

  const data = (await response.json()) as {
    imageUrl: string;
    usedFallback?: boolean;
    source?: AiSource;
    message?: string;
    items?: DecorationItem[];
  };

  return {
    imageUrl: data.imageUrl,
    usedFallback: Boolean(data.usedFallback),
    source: data.source ?? (data.usedFallback ? "demo" : "google"),
    message: data.message,
    items: data.items ?? [],
  };
}
