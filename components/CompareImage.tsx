"use client";

interface CompareImageProps {
  src: string;
  alt: string;
}

/** img nativo — melhor para data URLs e mobile que componentes do compare-slider */
export function CompareImage({ src, alt }: CompareImageProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      draggable={false}
      className="h-full w-full object-cover object-center select-none"
      style={{
        display: "block",
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    />
  );
}
