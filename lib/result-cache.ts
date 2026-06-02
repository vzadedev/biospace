import type { AiSource } from "./ai";
import type { DecorationItem, DecorationMood, DecorationStyle } from "./types";

const RESULT_CACHE_KEY = "biospace_result_cache";

export interface ResultCacheMeta {
  style: DecorationStyle;
  mood: DecorationMood;
  items: DecorationItem[];
  source: AiSource;
  message?: string;
  /** Hash curto para saber se o cache corresponde ao fluxo atual */
  flowKey: string;
}

export function buildFlowKey(
  originalImage: string,
  style: DecorationStyle,
  mood: DecorationMood
): string {
  const sample = originalImage.slice(0, 80) + originalImage.slice(-80);
  return `${style}:${mood}:${sample.length}:${sample}`;
}

export function getResultCacheMeta(): ResultCacheMeta | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(RESULT_CACHE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as ResultCacheMeta;
  } catch {
    return null;
  }
}

export function setResultCacheMeta(data: ResultCacheMeta): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(RESULT_CACHE_KEY, JSON.stringify(data));
  } catch {
    // Imagens ficam só em memória — não bloquear o fluxo
  }
}

export function clearResultCache(): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(RESULT_CACHE_KEY);
}

/** Imagens grandes ficam em memória (não no sessionStorage) */
let memoryImages: {
  flowKey: string;
  originalImage: string;
  generatedImage: string;
} | null = null;

export function setResultImages(
  flowKey: string,
  originalImage: string,
  generatedImage: string
): void {
  memoryImages = { flowKey, originalImage, generatedImage };
}

export function getResultImages(flowKey: string): {
  originalImage: string;
  generatedImage: string;
} | null {
  if (!memoryImages || memoryImages.flowKey !== flowKey) return null;
  return {
    originalImage: memoryImages.originalImage,
    generatedImage: memoryImages.generatedImage,
  };
}

export function clearResultImages(): void {
  memoryImages = null;
}
