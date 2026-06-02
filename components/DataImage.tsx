"use client";

interface DataImageProps {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
}

/** Exibe data URLs e imagens remotas sem otimizador do Next (evita tela preta no mobile) */
export function DataImage({ src, alt, className = "", fill }: DataImageProps) {
  const baseClass = fill
    ? `absolute inset-0 h-full w-full object-cover ${className}`
    : className;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={baseClass}
      decoding="async"
      draggable={false}
    />
  );
}
