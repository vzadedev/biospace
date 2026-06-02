/** Reduz imagens base64 para caber no localStorage (~5MB) */
export async function compressImageDataUrl(
  dataUrl: string,
  maxWidth = 1280,
  quality = 0.82,
  timeoutMs = 20000
): Promise<string> {
  if (!dataUrl.startsWith("data:image")) return dataUrl;

  return new Promise((resolve) => {
    const img = new Image();
    const timer = window.setTimeout(() => {
      console.warn("[compress] timeout — usando original");
      resolve(dataUrl);
    }, timeoutMs);

    img.onload = () => {
      window.clearTimeout(timer);
      try {
        const scale = Math.min(1, maxWidth / img.width);
        const width = Math.max(1, Math.round(img.width * scale));
        const height = Math.max(1, Math.round(img.height * scale));
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(dataUrl);
          return;
        }

        // PNG com transparência vira preto em JPEG — fundo branco primeiro
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);

        const isPng = dataUrl.startsWith("data:image/png");
        const output = isPng
          ? canvas.toDataURL("image/jpeg", quality)
          : canvas.toDataURL("image/jpeg", quality);

        resolve(output.length < dataUrl.length ? output : dataUrl);
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
