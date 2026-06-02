export type AiProvider = "google" | "openai" | "none";

export function resolveAiProvider(): {
  provider: AiProvider;
  apiKey: string;
} {
  const googleKey =
    process.env.GOOGLE_API_KEY ??
    process.env.GEMINI_API_KEY ??
    "";

  const openaiKey = process.env.OPENAI_API_KEY ?? "";

  if (googleKey && !googleKey.includes("your-key")) {
    return { provider: "google", apiKey: googleKey };
  }

  if (openaiKey.startsWith("AIza")) {
    return { provider: "google", apiKey: openaiKey };
  }

  if (openaiKey.startsWith("sk-") && !openaiKey.includes("your-key")) {
    return { provider: "openai", apiKey: openaiKey };
  }

  return { provider: "none", apiKey: "" };
}
