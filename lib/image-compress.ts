const MAX_STORAGE_BYTES = 450_000;

function drawToJpeg(
  source: CanvasImageSource,
  width: number,
  height: number,
  quality: number
): string {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("canvas unavailable");

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);
  ctx.drawImage(source, 0, 0, width, height);
  return canvas.toDataURL("image/jpeg", quality);
}

async function loadBitmap(dataUrl: string): Promise<ImageBitmap> {
  const response = await fetch(dataUrl);
  const blob = await response.blob();
  return createImageBitmap(blob);
}

function loadHtmlImage(dataUrl: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("image load failed"));
    img.src = dataUrl;
  });
}

async function renderJpeg(
  dataUrl: string,
  maxWidth: number,
  quality: number
): Promise<string> {
  let width = 0;
  let height = 0;
  let output = "";

  try {
    const bitmap = await loadBitmap(dataUrl);
    try {
      const scale = Math.min(1, maxWidth / bitmap.width);
      width = Math.max(1, Math.round(bitmap.width * scale));
      height = Math.max(1, Math.round(bitmap.height * scale));
      output = drawToJpeg(bitmap, width, height, quality);
    } finally {
      bitmap.close();
    }
  } catch {
    const img = await loadHtmlImage(dataUrl);
    const scale = Math.min(1, maxWidth / img.width);
    width = Math.max(1, Math.round(img.width * scale));
    height = Math.max(1, Math.round(img.height * scale));
    output = drawToJpeg(img, width, height, quality);
  }

  if (!output.startsWith("data:image/jpeg")) {
    throw new Error("invalid jpeg output");
  }

  return output;
}

/** Reduz imagens base64 para caber no localStorage (~5MB) */
export async function compressImageDataUrl(
  dataUrl: string,
  maxWidth = 1280,
  quality = 0.82,
  timeoutMs = 20000
): Promise<string> {
  if (!dataUrl.startsWith("data:image")) return dataUrl;
  if (typeof window === "undefined") return dataUrl;

  return new Promise((resolve) => {
    const timer = window.setTimeout(() => {
      console.warn("[compress] timeout — mantendo original");
      resolve(dataUrl);
    }, timeoutMs);

    void renderJpeg(dataUrl, maxWidth, quality)
      .then((output) => {
        window.clearTimeout(timer);
        resolve(output.length < dataUrl.length ? output : dataUrl);
      })
      .catch(() => {
        window.clearTimeout(timer);
        resolve(dataUrl);
      });
  });
}

/** Compressão agressiva para salvar em localStorage — nunca devolve PNG gigante */
export async function compressForStorage(dataUrl: string): Promise<string> {
  if (!dataUrl.startsWith("data:image")) return dataUrl;
  if (typeof window === "undefined") return dataUrl;

  const attempts: [number, number][] = [
    [960, 0.78],
    [720, 0.72],
    [480, 0.65],
  ];

  for (const [maxWidth, quality] of attempts) {
    try {
      const output = await renderJpeg(dataUrl, maxWidth, quality);
      if (output.length <= MAX_STORAGE_BYTES) return output;
    } catch (error) {
      console.warn("[compressForStorage]", maxWidth, error);
    }
  }

  try {
    return await renderJpeg(dataUrl, 360, 0.55);
  } catch {
    return dataUrl;
  }
}

export function isValidImageDataUrl(value: string | undefined): boolean {
  return (
    typeof value === "string" &&
    value.startsWith("data:image/") &&
    value.includes("base64,") &&
    value.length > 100
  );
}
