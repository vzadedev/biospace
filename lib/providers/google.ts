function parseBase64Image(imageBase64: string): {
  mimeType: string;
  data: string;
} {
  const match = imageBase64.match(/^data:(image\/[\w+.-]+);base64,(.+)$/);
  if (match) {
    return { mimeType: match[1], data: match[2] };
  }
  return { mimeType: "image/jpeg", data: imageBase64.replace(/^data:.*;base64,/, "") };
}

const MODELS = [
  "gemini-2.0-flash-exp-image-generation",
] as const;

export async function generateWithGoogle(
  apiKey: string,
  imageBase64: string,
  prompt: string
): Promise<{ imageUrl: string | null; error?: string }> {
  const { mimeType, data } = parseBase64Image(imageBase64);

  const body = {
    contents: [
      {
        parts: [
          {
            text: `${prompt}\n\nImportant: Keep the same room layout, walls, windows and camera angle. Only change decoration, plants, lighting and furniture style.`,
          },
          {
            inline_data: {
              mime_type: mimeType,
              data,
            },
          },
        ],
      },
    ],
    generationConfig: {
      responseModalities: ["TEXT", "IMAGE"],
    },
  };

  let lastError = "";

  for (const model of MODELS) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );

      if (!response.ok) {
        const errText = await response.text();
        lastError = `[${model}] ${response.status}: ${errText.slice(0, 200)}`;
        console.error(`[Gemini ${model}]`, response.status, errText.slice(0, 300));
        continue;
      }

      const result = (await response.json()) as {
        candidates?: {
          content?: {
            parts?: {
              inlineData?: { data?: string; mimeType?: string };
              inline_data?: { data?: string; mime_type?: string };
            }[];
          };
        }[];
      };

      const parts = result.candidates?.[0]?.content?.parts ?? [];
      for (const part of parts) {
        const inline = part.inlineData ?? part.inline_data;
        if (inline?.data) {
          const outMime =
            part.inlineData?.mimeType ??
            part.inline_data?.mime_type ??
            "image/png";
          return { imageUrl: `data:${outMime};base64,${inline.data}` };
        }
      }

      lastError = `[${model}] resposta sem imagem`;
    } catch (error) {
      lastError = `[${model}] ${error instanceof Error ? error.message : "erro de rede"}`;
      console.error(`[Gemini ${model}]`, error);
    }
  }

  return { imageUrl: null, error: lastError || "nenhum modelo retornou imagem" };
}
