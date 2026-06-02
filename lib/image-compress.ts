/** Reduz imagens base64 para caber no localStorage (~5MB) */
export async function compressImageDataUrl(
  dataUrl: string,
  maxWidth = 1280,
  quality = 0.72,
  timeoutMs = 15000
): Promise<string> {
  if (!dataUrl.startsWith("data:image")) return dataUrl;

  return new Promise((resolve, reject) => {
    const img = new Image();
    const timer = window.setTimeout(() => {
      reject(new Error("Timeout ao comprimir imagem"));
    }, timeoutMs);

    img.onload = () => {
      window.clearTimeout(timer);
      try {
        const scale = Math.min(1, maxWidth / img.width);
        const width = Math.round(img.width * scale);
        const height = Math.round(img.height * scale);
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(dataUrl);
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      } catch {
        resolve(dataUrl);
      }
    };
    img.onerror = () => {
      window.clearTimeout(timer);
      resolve(dataUrl);
    };
    img.src = dataUrl;
  });
}
