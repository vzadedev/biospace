export async function generateWithOpenAI(
  apiKey: string,
  imageBase64: string,
  prompt: string
): Promise<string | null> {
  const base64 = imageBase64.replace(/^data:image\/\w+;base64,/, "");

  try {
    const buffer = Buffer.from(base64, "base64");
    const formData = new FormData();
    formData.append(
      "image",
      new Blob([buffer], { type: "image/png" }),
      "room.png"
    );
    formData.append("prompt", prompt);
    formData.append("n", "1");
    formData.append("size", "1024x1024");

    const response = await fetch("https://api.openai.com/v1/images/edits", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
      body: formData,
    });

    if (!response.ok) {
      console.error("[OpenAI images/edits]", response.status, await response.text());
      return null;
    }

    const data = (await response.json()) as {
      data?: { url?: string; b64_json?: string }[];
    };

    const item = data.data?.[0];
    if (item?.url) return item.url;
    if (item?.b64_json) return `data:image/png;base64,${item.b64_json}`;
    return null;
  } catch (error) {
    console.error("[OpenAI]", error);
    return null;
  }
}
