"use client";

import Image from "next/image";
import { Camera } from "lucide-react";
import { useRef, useState } from "react";
import { compressImageDataUrl } from "@/lib/image-compress";

interface ImageUploadProps {
  preview: string | null;
  onImageSelect: (base64: string) => void;
}

export function ImageUpload({ preview, onImageSelect }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  const handleFile = (file: File) => {
    setLoading(true);
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        if (typeof reader.result === "string") {
          const compressed = await compressImageDataUrl(reader.result, 1280, 0.82);
          onImageSelect(compressed);
        }
      } finally {
        setLoading(false);
      }
    };
    reader.onerror = () => setLoading(false);
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="w-full rounded-2xl border-2 border-dashed border-forest/40 bg-white p-8 transition-colors hover:border-forest hover:bg-sage/20"
      >
        {preview ? (
          <div className="relative mx-auto aspect-[4/3] w-full max-h-64 overflow-hidden rounded-xl">
            <Image
              src={preview}
              alt="Preview do ambiente"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-sage">
              <Camera className="h-7 w-7 text-forest" />
            </div>
            <p className="text-sm font-medium text-charcoal">
              {loading
                ? "Preparando imagem..."
                : "Tire uma foto do ambiente ou escolha da galeria"}
            </p>
          </div>
        )}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />
    </div>
  );
}
