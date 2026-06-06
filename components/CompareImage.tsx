"use client";

import { useState } from "react";
import { isValidImageDataUrl } from "@/lib/image-compress";

interface CompareImageProps {
  src: string;
  alt: string;
  fallbackSrc?: string;
}

/** img nativo — melhor para data URLs e mobile que componentes do compare-slider */
export function CompareImage({ src, alt, fallbackSrc }: CompareImageProps) {
  const [activeSrc, setActiveSrc] = useState(
    isValidImageDataUrl(src) ? src : (fallbackSrc ?? src)
  );

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={activeSrc}
      alt={alt}
      draggable={false}
      className="h-full w-full object-cover object-center select-none"
      style={{
        display: "block",
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
      onError={() => {
        if (fallbackSrc && activeSrc !== fallbackSrc) {
          setActiveSrc(fallbackSrc);
        }
      }}
    />
  );
}
