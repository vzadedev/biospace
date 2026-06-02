"use client";

import Image from "next/image";
import { Camera } from "lucide-react";
import { useRef } from "react";

interface ImageUploadProps {
  preview: string | null;
  onImageSelect: (base64: string) => void;
}

export function ImageUpload({ preview, onImageSelect }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        onImageSelect(reader.result);
      }
    };
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
              Tire uma foto do ambiente ou escolha da galeria
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
